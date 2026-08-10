import React from 'react';
import { Metadata } from 'next';
import { sanityFetch } from '@/lib/sanity';
import { buildMetadata, DEFAULT_DOMAIN } from '@/lib/seo';
import { HuurdersportaalModule } from '@/components/blocks/HuurdersportaalModule';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface HuurdersportaalPageProps {
    params: Promise<{ locale: string }>;
}

async function getHuurdersportaalPageData(locale: string) {
    try {
        return await sanityFetch<any>({
            query: `*[_type == "solutionPage" && (slug.current == "huurdersportaal" || slug.current == "/apps/huurdersportaal" || slug.current == "/huurdersportaal") && language == $locale][0] {
                ...,
                seo {
                    seoTitle,
                    seoDescription,
                    canonical,
                    ogImage { asset-> { url } },
                    noIndex,
                    structuredData
                }
            }`,
            params: { locale },
        });
    } catch (e) {
        console.error('Failed to fetch huurdersportaal page from Sanity:', e);
        return null;
    }
}

export async function generateMetadata({
    params,
}: HuurdersportaalPageProps): Promise<Metadata> {
    const { locale } = await params;
    const doc = await getHuurdersportaalPageData(locale);
    const isEn = locale === 'en';

    const fallbackTitle = isEn
        ? 'Tenant Portal Software — Self-Service for Tenants | emlinked'
        : 'Huurdersportaal Software — Self-Service voor uw Huurders | emlinked';
    const fallbackDesc = isEn
        ? 'Reduce administrative pressure on your management team with our digital tenant portal. Real-time synced with Business Central.'
        : 'Verlaag de administratieve druk op uw beheerteam met ons digitale huurdersportaal. Laat huurders zelf reparatieverzoeken en documenten inzien. Realtime gesynchroniseerd.';

    const canonicalUrl = `${DEFAULT_DOMAIN}${isEn ? '/en/apps/huurdersportaal' : '/apps/huurdersportaal'}`;

    return buildMetadata({
        seo: doc?.seo,
        fallbackTitle,
        fallbackDescription: fallbackDesc,
        canonicalUrl,
        locale,
    });
}

export default async function HuurdersportaalPage({
    params,
}: HuurdersportaalPageProps) {
    const { locale } = await params;
    const doc = await getHuurdersportaalPageData(locale);

    return <HuurdersportaalModule doc={doc} locale={locale} />;
}
