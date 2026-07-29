import React from 'react';
import { Metadata } from 'next';
import { sanityFetch } from '@/lib/sanity';
import { DataGridCanvas } from '@/components/ui/data-grid-canvas';
import { HeroSection } from '@/components/blocks/HeroSection';

interface ReferentiesPageProps {
    params: Promise<{ locale: string }>;
}

async function getSanityPageData(locale: string) {
    try {
        return await sanityFetch<any>({
            query: `*[_type == "page" && slug.current == "referenties" && language == $locale][0] {
                title,
                tagline,
                desc,
                pageBlocks[] {
                    ...,
                    _type,
                    _key
                },
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
        console.error('Failed to fetch references page from Sanity:', e);
        return null;
    }
}

export async function generateMetadata({
    params,
}: ReferentiesPageProps): Promise<Metadata> {
    const { locale } = await params;
    const pageData = await getSanityPageData(locale);
    const seo = pageData?.seo;
    const isEn = locale === 'en';

    const title =
        seo?.seoTitle ||
        (isEn
            ? 'References & B2B Case Studies | Emlinked'
            : 'Referenties & Klantcases | Emlinked');

    const description =
        seo?.seoDescription ||
        (isEn
            ? 'Discover what real estate managers say about Emlinked. Real-world cases on service charge automation and tenant portal speed.'
            : 'Ontdek de ervaringen van professionele vastgoedbeheerders en beleggers met Emlinked. Concrete klantverhalen en resultaten.');

    const robots = seo?.noIndex ? 'noindex, nofollow' : 'index, follow';

    return {
        title,
        description,
        robots,
        alternates: {
            canonical:
                seo?.canonical || (isEn ? '/en/referenties' : '/referenties'),
        },
    };
}

const fallbackContent = {
    nl: {
        title: 'Referenties & Klantcases',
        tagline: 'Wat onze klanten zeggen over Emlinked.',
        desc: 'Vastgoedbeheerders en beleggers vertrouwen dagelijks op Emlinked om hun operationele en financiële processen te automatiseren.',
        casesTitle: 'Klantverhalen',
        testimonials: [
            {
                quote: 'Emlinked heeft onze verwerkingstijd voor servicekostenafrekeningen met 80% verminderd dankzij de directe koppeling met Business Central.',
                author: 'Financieel Directeur',
                role: 'Real Estate Asset Management',
            },
            {
                quote: 'Ons huurdersportaal van Emlinked neemt dagelijks tientallen telefoontjes weg. Storingen worden direct met de juiste foto’s geregistreerd.',
                author: 'Operationeel Manager',
                role: 'Portefeuillebeheer B.V.',
            },
        ],
    },
    en: {
        title: 'References & Customer Cases',
        tagline: 'What our clients say about Emlinked.',
        desc: 'Property managers and investors trust Emlinked daily to run their operational and financial sync loops.',
        casesTitle: 'Customer Success Stories',
        testimonials: [
            {
                quote: 'Emlinked has reduced our processing time for service charge settlements by 80% thanks to its direct integration with Business Central.',
                author: 'Finance Director',
                role: 'Real Estate Asset Management',
            },
            {
                quote: 'Our Emlinked tenant portal eliminates dozens of calls daily. Maintenance requests are logged autonomously with photo uploads.',
                author: 'Operations Manager',
                role: 'Portefeuillebeheer B.V.',
            },
        ],
    },
} as const;

export default async function ReferentiesPage({
    params,
}: ReferentiesPageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getSanityPageData(locale);
    const fall = isEn ? fallbackContent.en : fallbackContent.nl;

    const title = pageData?.title || fall.title;
    const tagline = pageData?.tagline || fall.tagline;

    // Use pageBlocks from Sanity if they exist, otherwise fallback
    const blocks = pageData?.pageBlocks || [
        {
            _type: 'testimonialSection',
            sectionTitle: fall.casesTitle,
            testimonials: fall.testimonials,
        },
    ];

    const heroBlock = blocks.find((b: any) => b._type === 'hero');
    const otherBlocks = blocks.filter((b: any) => b._type !== 'hero');

    return (
        <div className="flex flex-col min-h-screen bg-texture-navy text-white">
            {heroBlock ? (
                <HeroSection
                    label={heroBlock.label || (isEn ? 'CUSTOMER STORIES' : 'KLANTVERHALEN')}
                    title={heroBlock.title || title}
                    subtitle={heroBlock.subtitle || tagline}
                    imagePath={heroBlock.imagePath || '/hero/vastgoedportfeuille_aangifte-klaar.jpg'}
                    isHomepage={false}
                    locale={locale}
                />
            ) : (
                <HeroSection
                    label={isEn ? 'CUSTOMER STORIES' : 'KLANTVERHALEN'}
                    title={title}
                    subtitle={tagline}
                    imagePath='/hero/vastgoedportfeuille_aangifte-klaar.jpg'
                    isHomepage={false}
                    locale={locale}
                />
            )}

            {/* Dynamic blocks rendering */}
            {blocks.map((block: any, bIdx: number) => {
                if (block._type === 'testimonialSection') {
                    return (
                        <section
                            key={block._key || bIdx}
                            className='px-6 py-20 bg-white/[0.01] border-b border-white/5'
                        >
                            <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-12'>
                                {block.sectionTitle && (
                                    <h2 className='text-2xl font-bold text-white font-display'>
                                        {block.sectionTitle}
                                    </h2>
                                )}
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto'>
                                    {block.testimonials?.map(
                                        (t: any, idx: number) => (
                                            <div
                                                key={idx}
                                                className='p-8 rounded-xl border border-white/5 bg-white/[0.01] shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4'
                                            >
                                                <p className='text-xs text-slate-300 italic leading-relaxed'>
                                                    &ldquo;{t.quote}&rdquo;
                                                </p>
                                                <div className='text-[11px] text-primary font-semibold mt-2'>
                                                    — {t.author},{' '}
                                                    <span className='text-slate-400 font-normal'>
                                                        {t.role}
                                                    </span>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        </section>
                    );
                }

                return null;
            })}
        </div>
    );
}
