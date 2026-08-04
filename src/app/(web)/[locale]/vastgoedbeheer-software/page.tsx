import React from 'react';
import { Metadata } from 'next';
import { sanityFetch } from '@/lib/sanity';
import { buildMetadata } from '@/lib/seo';
import { VastgoedbeheerSoftwareModule } from '@/components/blocks/VastgoedbeheerSoftwareModule';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface VastgoedbeheerPageProps {
    params: Promise<{ locale: string }>;
}

async function getVastgoedbeheerPageData(locale: string) {
    try {
        return await sanityFetch<any>({
            query: `*[_type == "solutionPage" && (slug.current == "vastgoedbeheer-software" || slug.current == "/apps/vastgoedbeheer-software" || slug.current == "/vastgoedbeheer-software") && language == $locale][0] {
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
        console.error('Failed to fetch vastgoedbeheer-software page from Sanity:', e);
        return null;
    }
}

export async function generateMetadata({
    params,
}: VastgoedbeheerPageProps): Promise<Metadata> {
    const { locale } = await params;
    const doc = await getVastgoedbeheerPageData(locale);
    const isEn = locale === 'en';

    const fallbackTitle = isEn
        ? 'Vastgoedbeheer Software — Automate your Portfolio Management | Emlinked'
        : 'Vastgoedbeheer Software — Automatiseer uw Portefeuillebeheer | Emlinked';
    const fallbackDesc = isEn
        ? 'Advanced real estate management software for property managers, retail chains, and housing corporations. 100% native Business Central integration.'
        : 'Geavanceerde vastgoedbeheer software voor beheerders, retailketens en woningcorporaties. Volledig geautomatiseerd en native gekoppeld aan Business Central.';
    
    const canonicalUrl = `https://emlinked.nl${isEn ? '/en/vastgoedbeheer-software' : '/vastgoedbeheer-software'}`;

    return buildMetadata({
        seo: doc?.seo,
        fallbackTitle,
        fallbackDescription: fallbackDesc,
        canonicalUrl,
        locale,
    });
}

export default async function VastgoedbeheerSoftwarePage({
    params,
}: VastgoedbeheerPageProps) {
    const { locale } = await params;
    const doc = await getVastgoedbeheerPageData(locale);

    return <VastgoedbeheerSoftwareModule doc={doc} locale={locale} />;
}
