import React from 'react';
import { Metadata } from 'next';
import { sanityFetch } from '@/lib/sanity';
import { HeroSection } from '@/components/blocks/HeroSection';
import { Box3Calculator } from '@/components/Box3Calculator';
import { BookOpen, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface Box3PageProps {
    params: Promise<{ locale: string }>;
}

async function getSanityPageData(locale: string) {
    try {
        return await sanityFetch<any>({
            query: `*[_type == "page" && slug.current == "box3-check" && language == $locale][0] {
                title,
                seo {
                    seoTitle,
                    seoDescription,
                    canonical,
                    noIndex
                }
            }`,
            params: { locale },
        });
    } catch (e) {
        console.error('Failed to fetch box3-check page from Sanity:', e);
        return null;
    }
}

export async function generateMetadata({
    params,
}: Box3PageProps): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getSanityPageData(locale);
    const seo = pageData?.seo;

    const title =
        seo?.seoTitle ||
        (isEn
            ? 'Box 3 Check: Calculate Fiscal Impact on Real Estate | Emlinked'
            : 'Box 3 Check: Bereken de Fiscale Impact op uw Vastgoed | Emlinked');

    const description =
        seo?.seoDescription ||
        (isEn
            ? 'Calculate the tax impact of changing Box 3 regulations on your real estate portfolio in 2 minutes. Get direct insights and a personalized report.'
            : 'Bereken binnen 2 minuten de fiscale impact van de veranderende Box 3 wetgeving op uw vastgoedportefeuille. Direct inzicht en gepersonaliseerd rapport.');

    const robots = seo?.noIndex ? 'noindex, nofollow' : 'index, follow';

    return {
        title,
        description,
        robots,
        alternates: {
            canonical:
                seo?.canonical || (isEn ? '/en/box3-check' : '/box3-check'),
        },
    };
}

export default async function Box3CheckPage({ params }: Box3PageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';

    return (
        <main className="flex-1 bg-[url('/hero/bkg_darkBlue.jpg')] bg-cover bg-center bg-no-repeat text-white">
            <HeroSection
                label={isEn ? 'FISCAL OPTIMIZATION' : 'FISCALE OPTIMALISATIE'}
                title={
                    isEn
                        ? 'Calculate the Box 3 impact on *your real estate portfolio*'
                        : 'Bereken de Box 3-impact op *uw vastgoedportefeuille*'
                }
                subtitle={
                    isEn
                        ? 'Calculate the tax impact of changing Box 3 legislation on your real estate portfolio within 2 minutes. Get instant insight and a personalized report.'
                        : 'Bereken binnen 2 minuten de fiscale impact van de veranderende Box 3 wetgeving op uw vastgoedportefeuille. Direct inzicht en gepersonaliseerd rapport.'
                }
                locale={locale}
            />

            <section className='px-6 py-12 max-w-6xl mx-auto space-y-12'>
                {/* Calculator Component */}
                <div className='p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/10 shadow-2xl'>
                    <Box3Calculator />
                </div>

                {/* Explanatory Content */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <div className='p-8 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4'>
                        <div className='flex items-center gap-3 text-amber font-bold text-lg'>
                            <BookOpen className='h-6 w-6' />
                            <h3>
                                {isEn
                                    ? 'Forfaitaire vs. Actual return'
                                    : 'Fictief vs. Werkelijk Rendement'}
                            </h3>
                        </div>
                        <p className='text-sm text-slate-300 leading-relaxed'>
                            {isEn
                                ? 'The Dutch High Court (Hoge Raad) ruled that property investors may be taxed on actual net yields if they are lower than the statutory forfaitaire percentage. Net yield includes gross rent minus maintenance, insurances, and actual interest.'
                                : 'De Hoge Raad heeft geoordeeld dat u bij verhuurd vastgoed mag uitgaan van het werkelijke rendement als dit lagere belastingen oplevert dan het fictieve forfait. Het werkelijke rendement omvat de netto bruto-huur minus aantoonbare exploitatiekosten en hypotheekrente.'}
                        </p>
                    </div>

                    <div className='p-8 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4'>
                        <div className='flex items-center gap-3 text-amber font-bold text-lg'>
                            <AlertCircle className='h-6 w-6' />
                            <h3>
                                {isEn
                                    ? 'Native ERP Portfolio Audit'
                                    : 'Portefeuille Audit in Business Central'}
                            </h3>
                        </div>
                        <p className='text-sm text-slate-300 leading-relaxed'>
                            {isEn
                                ? 'Emlinked automatically tracks historical lease income, CBS indexations, and maintenance invoices directly inside Business Central so your tax reporting is 100% audit-proof.'
                                : 'Emlinked registreert al uw huurontvangsten, CBS-indexeringen en onderhoudsfacturen automatisch binnen Business Central, waardoor uw belastingaangifte gegarandeerd onderbouwd is.'}
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
