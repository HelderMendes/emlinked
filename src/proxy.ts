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
    const host = (request.headers.get('host') || '').toLowerCase();
    const isLegacyDomain = host.includes('emlinked.nl');
    const isWwwCom = host === 'www.emlinked.com';

    const legacyAbsoluteUrl = `https://www.emlinked.nl${normalizedPathname}${url.search}`;
    const legacyAbsoluteUrlNoSearch = `https://www.emlinked.nl${normalizedPathname}`;

    const potentialAbsoluteRedirect =
        redirectsMap[legacyAbsoluteUrl] ||
        redirectsMap[legacyAbsoluteUrlNoSearch];

    // Only apply legacy-domain-keyed redirects when actually visiting the
    // legacy .nl domain — these paths are matched purely on pathname, so
    // without this guard they'd also fire on localhost/preview/the new
    // .com domain itself whenever a route happens to share the old path
    // (e.g. /contact exists on both the old and new site).
    let redirect: { destination: string; status: number } | undefined =
        isLegacyDomain ? potentialAbsoluteRedirect : undefined;

    // Only apply relative path redirects if on legacy domain or if destination is a local relative route
    if (!redirect && redirectsMap[normalizedPathname]) {
        const potentialRedirect = redirectsMap[normalizedPathname];
        if (isLegacyDomain || potentialRedirect.destination.startsWith('/')) {
            redirect = potentialRedirect;
        }
    }

    // Bypass root homepage redirects from relative paths unless on legacy domain
    if (normalizedPathname === '/' && !isLegacyDomain) {
        redirect = undefined;
    }

    if (redirect) {
        if (redirect.status === 410) {
            return new NextResponse(null, { status: 410 });
        }

        if (redirect.destination) {
            const baseOrigin =
                isLegacyDomain || isWwwCom
                    ? 'https://emlinked.com'
                    : request.url;
            const destinationUrl = new URL(redirect.destination, baseOrigin);
            if (!redirect.destination.includes('?')) {
                destinationUrl.search = url.search;
            }
            return NextResponse.redirect(destinationUrl, {
                status: redirect.status,
            });
        }
    }

    // Handle global domain-level fallback from .nl or www.emlinked.com to apex emlinked.com
    if (isLegacyDomain || isWwwCom) {
        const targetUrl = new URL(
            url.pathname + url.search,
            'https://emlinked.com',
        );
        return NextResponse.redirect(targetUrl, 301);
    }

    // 3. `/docs` (Mijn emlinked / My emlinked documentation portal) bypasses locale prefixing
    if (normalizedPathname.startsWith('/docs')) {
        return NextResponse.next();
    }

    // Legacy WordPress prefix redirects (/category/*, /tag/*, /author/*, /blog/*, /wp-content/*, /wp-includes/*, /wp-admin/*)
    if (
        normalizedPathname.startsWith('/category/') ||
        normalizedPathname.startsWith('/tag/') ||
        normalizedPathname.startsWith('/author/') ||
        normalizedPathname.startsWith('/blog/')
    ) {
        return NextResponse.redirect(new URL('/nieuws', request.url), 301);
    }
    if (
        normalizedPathname.startsWith('/wp-content/') ||
        normalizedPathname.startsWith('/wp-includes/') ||
        normalizedPathname.startsWith('/wp-admin/')
    ) {
        return NextResponse.redirect(new URL('/', request.url), 301);
    }

    // 301 redirect any URL containing uppercase characters to lowercase (e.g. /Box3-check -> /box3-check)
    if (url.pathname !== pathname) {
        const targetUrl = new URL(
            `${normalizedPathname}${url.search}`,
            request.url,
        );
        return NextResponse.redirect(targetUrl, 301);
    }

    // 4. Default Language Bypass & Locale Routing
    const pathSegments = normalizedPathname.split('/');
    const firstPathSegment = pathSegments[1]; // segments[0] is empty because path starts with '/'
    const hasLocale = LOCALES.includes(firstPathSegment);

    if (!hasLocale) {
        // Redirect explicit English slugs visited without /en prefix directly to /en/...
        const isExplicitEnglishPath =
            normalizedPathname === '/news' ||
            normalizedPathname.startsWith('/news/') ||
            normalizedPathname === '/about-us' ||
            normalizedPathname === '/pricing' ||
            normalizedPathname === '/references' ||
            normalizedPathname === '/apps/property-management-software' ||
            normalizedPathname === '/apps/tenant-portal';

        if (isExplicitEnglishPath) {
            const targetUrl = new URL(
                `/en${normalizedPathname}${url.search}`,
                request.url,
            );
            const response = NextResponse.redirect(targetUrl, 301);
            response.cookies.set('emlinked_locale', 'en', { path: '/', maxAge: 31536000, sameSite: 'lax' });
            return response;
        }

        // If no locale is specified:
        // Only redirect root ('/') to '/en' if the visitor explicitly selected English via the language switcher cookie.
        // Never redirect '/' based on Accept-Language, so crawlers, Search Console, and emlinked.nl -> emlinked.com redirects
        // always receive a clean 200 OK on the Dutch root homepage without a 307/302 hop.
        const localeCookie = request.cookies.get('emlinked_locale')?.value;

        if (localeCookie === 'en' && normalizedPathname === '/') {
            const targetUrl = new URL(
                `/en${url.search}`,
                request.url,
            );
            return NextResponse.redirect(targetUrl, 307);
        } else {
            // Transparently rewrite to /nl/... so the user sees clean URLs without the /nl prefix
            const rewriteUrl = new URL(
                `/nl${normalizedPathname}${url.search}`,
                request.url,
            );
            const requestHeaders = new Headers(request.headers);
            requestHeaders.set('x-locale', 'nl');
            const response = NextResponse.rewrite(rewriteUrl, {
                request: { headers: requestHeaders },
            });
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
        let internalPath = normalizedPathname;

        // 301 redirect legacy / unvetted English URLs to official English URLs
        if (normalizedPathname === '/en/referenties' || normalizedPathname === '/en/customer-cases') {
            const targetUrl = new URL(`/en/references${url.search}`, request.url);
            return NextResponse.redirect(targetUrl, 301);
        }
        if (normalizedPathname === '/en/prijzen') {
            const targetUrl = new URL(`/en/pricing${url.search}`, request.url);
            return NextResponse.redirect(targetUrl, 301);
        }
        if (normalizedPathname === '/en/over-ons') {
            const targetUrl = new URL(`/en/about-us${url.search}`, request.url);
            return NextResponse.redirect(targetUrl, 301);
        }
        if (normalizedPathname === '/en/nieuws') {
            const targetUrl = new URL(`/en/news${url.search}`, request.url);
            return NextResponse.redirect(targetUrl, 301);
        }
        if (normalizedPathname.startsWith('/en/nieuws/')) {
            const targetPath = normalizedPathname.replace('/en/nieuws/', '/en/news/');
            const targetUrl = new URL(`${targetPath}${url.search}`, request.url);
            return NextResponse.redirect(targetUrl, 301);
        }
        if (normalizedPathname === '/en/apps/vastgoedbeheer-software') {
            const targetUrl = new URL(`/en/apps/property-management-software${url.search}`, request.url);
            return NextResponse.redirect(targetUrl, 301);
        }
        if (normalizedPathname === '/en/apps/huurdersportaal') {
            const targetUrl = new URL(`/en/apps/tenant-portal${url.search}`, request.url);
            return NextResponse.redirect(targetUrl, 301);
        }
        if (normalizedPathname === '/en/privacybeleid') {
            const targetUrl = new URL(`/en/privacy-policy${url.search}`, request.url);
            return NextResponse.redirect(targetUrl, 301);
        }
        if (normalizedPathname === '/en/algemene-voorwaarden') {
            const targetUrl = new URL(`/en/terms-and-conditions${url.search}`, request.url);
            return NextResponse.redirect(targetUrl, 301);
        }

        // Translate English URL slugs in browser to internal filesystem folder names
        if (internalPath === '/en/about-us') internalPath = '/en/over-ons';
        if (internalPath.startsWith('/en/news/')) {
            internalPath = internalPath.replace('/en/news/', '/en/nieuws/');
        } else if (internalPath === '/en/news') {
            internalPath = '/en/nieuws';
        }
        if (internalPath === '/en/references') internalPath = '/en/referenties';
        if (internalPath === '/en/pricing') internalPath = '/en/prijzen';
        if (internalPath === '/en/apps/property-management-software')
            internalPath = '/en/apps/vastgoedbeheer-software';
        if (internalPath === '/en/apps/tenant-portal')
            internalPath = '/en/apps/huurdersportaal';
        if (internalPath.startsWith('/en/docs'))
            internalPath = internalPath.replace('/en/docs', '/docs');

        const localeCookie = request.cookies.get('emlinked_locale')?.value;
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-locale', 'en');

        if (internalPath !== normalizedPathname) {
            const rewriteUrl = new URL(
                `${internalPath}${url.search}`,
                request.url,
            );
            const response = NextResponse.rewrite(rewriteUrl, {
                request: { headers: requestHeaders },
            });
            if (localeCookie !== 'en') {
                response.cookies.set('emlinked_locale', 'en', {
                    path: '/',
                    maxAge: 31536000,
                    sameSite: 'lax',
                });
            }
            return response;
        }

        const response = NextResponse.next({
            request: { headers: requestHeaders },
        });
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
