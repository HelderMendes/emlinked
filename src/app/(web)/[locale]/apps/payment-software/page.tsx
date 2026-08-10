import React from 'react';
import { Metadata } from 'next';
import { sanityFetch } from '@/lib/sanity';
import { buildMetadata, DEFAULT_DOMAIN } from '@/lib/seo';
import { PaymentSoftwareModule } from '@/components/blocks/PaymentSoftwareModule';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PaymentSoftwarePageProps {
    params: Promise<{ locale: string }>;
}

async function getPaymentSoftwarePageData(locale: string) {
    try {
        return await sanityFetch<any>({
            query: `*[_type == "solutionPage" && (slug.current == "payment-software" || slug.current == "payment" || slug.current == "/apps/payment-software" || slug.current == "/payment-software") && language == $locale][0] {
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
        console.error('Failed to fetch payment-software page from Sanity:', e);
        return null;
    }
}

export async function generateMetadata({
    params,
}: PaymentSoftwarePageProps): Promise<Metadata> {
    const { locale } = await params;
    const doc = await getPaymentSoftwarePageData(locale);
    const isEn = locale === 'en';

    const fallbackTitle = isEn
        ? 'Payment Software — Automated Rent Collection & Reconciliation | emlinked'
        : 'Payment Software — Automatische Huurincasso & Bankaflettering | emlinked';
    const fallbackDesc = isEn
        ? 'Automated rent collection and automatic bank statement reconciliation directly in your Microsoft Business Central ERP.'
        : 'Geautomatiseerde incasso van huurpenningen en automatische aflettering van bankafschriften direct in uw Microsoft Business Central administratie.';

    const canonicalUrl = `${DEFAULT_DOMAIN}${isEn ? '/en/apps/payment-software' : '/apps/payment-software'}`;

    return buildMetadata({
        seo: doc?.seo,
        fallbackTitle,
        fallbackDescription: fallbackDesc,
        canonicalUrl,
        locale,
    });
}

export default async function PaymentSoftwarePage({
    params,
}: PaymentSoftwarePageProps) {
    const { locale } = await params;
    const doc = await getPaymentSoftwarePageData(locale);

    return <PaymentSoftwareModule doc={doc} locale={locale} />;
}
