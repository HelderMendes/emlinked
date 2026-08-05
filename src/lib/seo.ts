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

const DEFAULT_SITE_NAME = 'Emlinked';
export const DEFAULT_DOMAIN =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://emlinked.com';
const DEFAULT_OG_IMAGE = `${DEFAULT_DOMAIN}/og-image.png`;

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

    const title = seo?.seoTitle || seo?.title || fallbackTitle;
    const description =
        seo?.seoDescription || seo?.description || fallbackDescription;
    const canonical = seo?.canonical || canonicalUrl;
    const robots = seo?.noIndex ? 'noindex, nofollow' : 'index, follow';

    const ogImageUrl =
        typeof seo?.ogImage === 'string'
            ? seo.ogImage
            : seo?.ogImage?.asset?.url || DEFAULT_OG_IMAGE;

    return {
        title: title.includes('Emlinked')
            ? title
            : `${title} | ${DEFAULT_SITE_NAME}`,
        description,
        robots,
        alternates: {
            canonical,
        },
        openGraph: {
            title,
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
            title,
            description,
            images: [ogImageUrl],
        },
    };
}
