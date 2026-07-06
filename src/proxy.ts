import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import redirectsData from './redirects.json'

const redirectsMap = redirectsData as Record<string, { destination: string; status: number }>
const LOCALES = ['nl', 'en'];
const DEFAULT_LOCALE = 'nl';

export function proxy(request: NextRequest) {
    const url = request.nextUrl.clone();

    // 1. Bypass static files, API routes, and Sanity Studio
    const pathname = url.pathname.toLowerCase();
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/studio') ||
        pathname.startsWith('/docs') || // Bypasses locale prefixing for documentation
        pathname.includes('.') // matches favicon.ico, sitemap.xml, robots.txt, images, etc.
    ) {
        return NextResponse.next();
    }

    // Normalize trailing slash (except root)
    let normalizedPathname = pathname;
    if (normalizedPathname.endsWith('/') && normalizedPathname !== '/') {
        normalizedPathname = normalizedPathname.slice(0, -1);
    }

    // 2. Check for legacy domain / path redirects
    const host = request.headers.get('host') || '';
    const isLegacyDomain = host.includes('emlinked.nl');

    const legacyAbsoluteUrl = `https://www.emlinked.nl${normalizedPathname}${url.search}`;
    const legacyAbsoluteUrlNoSearch = `https://www.emlinked.nl${normalizedPathname}`;

    let redirect: { destination: string; status: number } | undefined =
        redirectsMap[legacyAbsoluteUrl] ||
        redirectsMap[legacyAbsoluteUrlNoSearch] ||
        redirectsMap[normalizedPathname];

    // Bypass root homepage redirects from relative paths unless on legacy domain
    if (normalizedPathname === '/' && !isLegacyDomain) {
        redirect = undefined;
    }

    if (redirect) {
        if (redirect.status === 410) {
            return new NextResponse(null, { status: 410 });
        }

        if (redirect.destination) {
            const destinationUrl = new URL(
                redirect.destination,
                'https://www.emlinked.com',
            );
            if (!redirect.destination.includes('?')) {
                destinationUrl.search = url.search;
            }
            return NextResponse.redirect(destinationUrl, {
                status: redirect.status,
            });
        }
    }

    // Handle global domain-level fallback from .nl to .com for non-mapped URLs
    if (isLegacyDomain) {
        const targetUrl = new URL(
            url.pathname + url.search,
            'https://www.emlinked.com',
        );
        return NextResponse.redirect(targetUrl, 301);
    }

    // 3. Authentication Gate for `/docs`
    if (normalizedPathname.startsWith('/docs')) {
        const sessionCookie = request.cookies.get('emlinked_session');

        if (!sessionCookie) {
            // Resolve preferred locale for login redirection (sends to clean login page for Dutch, /en/login for English)
            let detectedLocale = DEFAULT_LOCALE;
            const acceptLanguage = request.headers.get('accept-language');
            if (acceptLanguage) {
                const preferred = acceptLanguage
                    .split(',')[0]
                    .split('-')[0]
                    .toLowerCase();
                if (LOCALES.includes(preferred)) {
                    detectedLocale = preferred;
                }
            }

            const loginPrefix = detectedLocale === 'nl' ? '' : '/en';
            const loginUrl = new URL(
                `${loginPrefix}/login?callbackUrl=${encodeURIComponent(url.pathname + url.search)}`,
                request.url,
            );
            return NextResponse.redirect(loginUrl, 307);
        }
    }

    // 4. Default Language Bypass & Locale Routing
    const pathSegments = normalizedPathname.split('/');
    const firstPathSegment = pathSegments[1]; // segments[0] is empty because path starts with '/'
    const hasLocale = LOCALES.includes(firstPathSegment);

    if (!hasLocale) {
        // If no locale is specified:
        // 1. Check if the user has an explicit language preference stored in a cookie
        const localeCookie = request.cookies.get('emlinked_locale')?.value;
        let detectedLocale = DEFAULT_LOCALE;

        if (localeCookie && LOCALES.includes(localeCookie)) {
            detectedLocale = localeCookie;
        } else {
            // 2. Fallback to Accept-Language headers if no cookie is set
            const acceptLanguage = request.headers.get('accept-language');
            if (acceptLanguage) {
                const preferred = acceptLanguage
                    .split(',')[0]
                    .split('-')[0]
                    .toLowerCase();
                if (preferred === 'en') {
                    detectedLocale = 'en';
                }
            }
        }

        if (detectedLocale === 'en') {
            const targetUrl = new URL(
                `/en${normalizedPathname}${url.search}`,
                request.url,
            );
            const response = NextResponse.redirect(targetUrl, 307);
            response.cookies.set('emlinked_locale', 'en', { path: '/', maxAge: 31536000, sameSite: 'lax' });
            return response;
        } else {
            // Transparently rewrite to /nl/... so the user sees clean URLs without the /nl prefix
            const rewriteUrl = new URL(
                `/nl${normalizedPathname}${url.search}`,
                request.url,
            );
            const response = NextResponse.rewrite(rewriteUrl);
            // If they didn't have a cookie, initialize it to 'nl'
            if (!localeCookie) {
                response.cookies.set('emlinked_locale', 'nl', { path: '/', maxAge: 31536000, sameSite: 'lax' });
            }
            return response;
        }
    }

    // If user requests /nl/... explicitly, redirect (301) to clean, locale-free URL (SEO consolidation)
    if (firstPathSegment === 'nl') {
        const cleanPathname = normalizedPathname.substring(3) || '/';
        const targetUrl = new URL(`${cleanPathname}${url.search}`, request.url);
        const response = NextResponse.redirect(targetUrl, 301);
        response.cookies.set('emlinked_locale', 'nl', { path: '/', maxAge: 31536000, sameSite: 'lax' });
        return response;
    }

    // If they explicitly visit an /en/ route, make sure their cookie gets synced to 'en'
    if (firstPathSegment === 'en') {
        const response = NextResponse.next();
        const localeCookie = request.cookies.get('emlinked_locale')?.value;
        if (localeCookie !== 'en') {
            response.cookies.set('emlinked_locale', 'en', { path: '/', maxAge: 31536000, sameSite: 'lax' });
        }
        return response;
    }

    return NextResponse.next();
}

export const config = {
    // Run proxy on all pathnames except assets, api, next internals, and studio
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|studio).*)'],
};
