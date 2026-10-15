import { Metadata } from 'next';

export interface SeoDataInput {
    seoTitle?: string;
    seoDescription?: string;
    canonical?: string;
    ogImage?:
        | {
              asset?: {
                  url?: string;
              };
          }
        | string;
    noIndex?: boolean;
    title?: string;
    description?: string;
}

export interface BuildMetadataOptions {
    seo?: SeoDataInput | null;
    fallbackTitle: string;
    fallbackDescription: string;
    canonicalUrl: string;
    locale: string;
    path?: string;
}

const DEFAULT_SITE_NAME = 'emlinked';
export const DEFAULT_DOMAIN =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://emlinked.com';
const DEFAULT_OG_IMAGE = `${DEFAULT_DOMAIN}/og-image.png`;

// NL path -> EN path, for routes whose slug differs per locale (keep in sync with src/proxy.ts)
const NL_EN_PATH_MAP: Array<[string, string]> = [
    ['/over-ons', '/about-us'],
    ['/prijzen', '/pricing'],
    ['/referenties', '/references'],
    ['/nieuws', '/news'],
    ['/apps/vastgoedbeheer-software', '/apps/property-management-software'],
    ['/apps/huurdersportaal', '/apps/tenant-portal'],
];

function toNlPath(enPath: string): string {
    for (const [nl, en] of NL_EN_PATH_MAP) {
        if (enPath === en || enPath.startsWith(en + '/')) {
            return nl + enPath.slice(en.length);
        }
    }
    return enPath;
}

function toEnPath(nlPath: string): string {
    for (const [nl, en] of NL_EN_PATH_MAP) {
        if (nlPath === nl || nlPath.startsWith(nl + '/')) {
            return en + nlPath.slice(nl.length);
        }
    }
    return nlPath;
}

/**
 * Derives the NL/EN hreflang alternate URLs for a page from its own canonical URL.
 * Works without per-page wiring: NL and EN paths mostly mirror each other 1:1
 * except for a small set of locale-specific slugs (see NL_EN_PATH_MAP above).
 */
export function getHreflangAlternates(
    canonicalUrl: string,
): { nl: string; en: string; 'x-default': string } {
    let pathname: string;
    try {
        pathname = new URL(canonicalUrl, DEFAULT_DOMAIN).pathname;
    } catch {
        pathname = '/';
    }

    const isEnPath = pathname === '/en' || pathname.startsWith('/en/');
    const bareEnPath = isEnPath
        ? pathname === '/en'
            ? '/'
            : pathname.slice(3)
        : null;

    const nlPath = isEnPath ? toNlPath(bareEnPath as string) : pathname;
    const enPath = isEnPath ? (bareEnPath as string) : toEnPath(pathname);

    const nlUrl = `${DEFAULT_DOMAIN}${nlPath}`;
    const enUrl = `${DEFAULT_DOMAIN}/en${enPath === '/' ? '' : enPath}`;

    return { nl: nlUrl, en: enUrl, 'x-default': nlUrl };
}

/**
 * Builds a standardized Next.js Metadata object including OpenGraph, Twitter, and canonical tags.
 */
export function buildMetadata({
    seo,
    fallbackTitle,
    fallbackDescription,
    canonicalUrl,
    locale,
}: BuildMetadataOptions): Metadata {
    const isEn = locale === 'en';

    let rawTitle = (seo?.seoTitle || seo?.title || fallbackTitle).trim();
    // Unescape HTML entities if present
    rawTitle = rawTitle.replace(/&amp;/g, '&');

    // Split on brand separator (| emlinked, - emlinked, etc.) and take the core title
    let title = rawTitle.split(/\s*(?:\||-|—|–)\s*emlinked/i)[0].trim();

    const description =
        seo?.seoDescription || seo?.description || fallbackDescription;
    const canonical = seo?.canonical || canonicalUrl;
    const robots = seo?.noIndex ? 'noindex, nofollow' : 'index, follow';

    const ogImageUrl =
        typeof seo?.ogImage === 'string'
            ? seo.ogImage
            : seo?.ogImage?.asset?.url || DEFAULT_OG_IMAGE;

    const titleWithBrand = `${title} | ${DEFAULT_SITE_NAME}`;

    return {
        title: {
            absolute: titleWithBrand,
        },
        description,
        robots,
        alternates: {
            canonical,
            languages: getHreflangAlternates(canonical),
        },
        openGraph: {
            title: titleWithBrand,
            description,
            url: canonical,
            siteName: DEFAULT_SITE_NAME,
            locale: isEn ? 'en_US' : 'nl_NL',
            type: 'website',
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: titleWithBrand,
            description,
            images: [ogImageUrl],
        },
    };
}
