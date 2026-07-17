import React from 'react';
import { Metadata } from 'next';
import { sanityFetch } from '@/lib/sanity';
import { DataGridCanvas } from '@/components/ui/data-grid-canvas';

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
    const desc = pageData?.desc || fall.desc;

    // Use pageBlocks from Sanity if they exist, otherwise fallback
    const blocks = pageData?.pageBlocks || [
        {
            _type: 'testimonialSection',
            sectionTitle: fall.casesTitle,
            testimonials: fall.testimonials,
        },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[url('/hero/bkg_darkBlue.jpg')] bg-cover bg-center bg-no-repeat text-white">
            {/* Hero Header */}
            <section className="relative px-6 py-20 md:py-28 overflow-hidden bg-[url('/hero/bkg_darkBlue.jpg')] bg-cover bg-center bg-no-repeat text-white border-b border-white/10">
                <DataGridCanvas className='pointer-events-none absolute inset-0 h-full w-full opacity-70 z-10' />

                {/* Ambient Background Glow */}
                <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber/5 rounded-full blur-[120px] pointer-events-none animate-float-glow z-0' />

                {/* Wave Animation with Orange Glow - Disabled
                <div className='absolute bottom-[-5%] left-0 w-full h-[20%] overflow-hidden pointer-events-none z-0 '>
                    <svg
                        className='absolute w-[200%] h-full'
                        viewBox='0 0 2000 120'
                        preserveAspectRatio='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <defs>
                            <linearGradient
                                id='wave-glow-referenties'
                                x1='0%'
                                y1='0%'
                                x2='0%'
                                y2='100%'
                            >
                                <stop
                                    offset='0%'
                                    stopColor='#ff9400'
                                    stopOpacity='0.45'
                                />
                                <stop
                                    offset='15%'
                                    stopColor='#ff9400'
                                    stopOpacity='0.15'
                                />
                                <stop
                                    offset='60%'
                                    stopColor='#ff9400'
                                    stopOpacity='0'
                                />
                            </linearGradient>
                            <filter
                                id='glow-blur-referenties'
                                x='-10%'
                                y='-10%'
                                width='120%'
                                height='120%'
                            >
                                <feGaussianBlur
                                    stdDeviation='5'
                                    result='blur'
                                />
                                <feMerge>
                                    <feMergeNode in='blur' />
                                    <feMergeNode in='SourceGraphic' />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Wave 1 }
                        <path
                            d='M0,60 C250,100 250,20 500,60 C750,100 750,20 1000,60 C1250,100 1250,20 1500,60 C1750,100 1750,20 2000,60 L2000,120 L0,120 Z'
                            fill='url(#wave-glow-referenties)'
                            filter='url(#glow-blur-referenties)'
                            className='animate-wave-slow'
                        />

                        {/* Wave 2 }
                        <path
                            d='M0,60 C150,10 350,110 500,60 C650,10 850,110 1000,60 C1150,10 1350,110 1500,60 C1650,10 1850,110 2000,60 L2000,120 L0,120 Z'
                            fill='url(#wave-glow-referenties)'
                            filter='url(#glow-blur-referenties)'
                            className='animate-wave-mid opacity-40'
                        />

                        {/* Wave 3 }
                        <path
                            d='M0,60 C200,90 300,30 500,60 C700,90 800,30 1000,60 C1200,90 1300,30 1500,60 C1700,90 1800,30 2000,60 L2000,120 L0,120 Z'
                            fill='url(#wave-glow-referenties)'
                            filter='url(#glow-blur-referenties)'
                            className='animate-wave-fast opacity-60'
                        />
                    </svg>
                </div>
                */}

                <div className="mx-auto max-w-4xl text-center flex flex-col gap-6 relative z-10">
                    <span className="inline-flex items-center gap-1.5 self-center rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold tracking-wider text-primary uppercase">
                        {isEn ? 'CUSTOMER STORIES' : 'KLANTVERHALEN'}
                    </span>
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                        {title}
                    </h1>
                    <p className="text-lg text-slate-300 leading-relaxed">
                        {tagline}
                    </p>
                    {desc && (
                        <p className="text-xs text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            {desc}
                        </p>
                    )}
                </div>
            </section>

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
