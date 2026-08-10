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

import { buildMetadata, DEFAULT_DOMAIN } from '@/lib/seo';

export async function generateMetadata({
    params,
}: ReferentiesPageProps): Promise<Metadata> {
    const { locale } = await params;
    const pageData = await getSanityPageData(locale);
    const isEn = locale === 'en';

    const fallbackTitle = isEn
        ? 'References & Customer Cases Real Estate Software'
        : 'Referenties & Klantcases Vastgoedsoftware';
    const fallbackDescription = isEn
        ? 'Read how professional property managers, retail chains, and controllers automate their real estate administration with emlinked software.'
        : 'Lees hoe professionele vastgoedbeheerders, retailketens en controllers hun administratie automatiseren met de vastgoedsoftware van emlinked.';
    const canonicalUrl = `${DEFAULT_DOMAIN}${isEn ? '/en/referenties' : '/referenties'}`;

    return buildMetadata({
        seo: pageData?.seo,
        fallbackTitle,
        fallbackDescription,
        canonicalUrl,
        locale,
    });
}

const fallbackContent = {
    nl: {
        title: 'Klantcases en ervaringen met emlinked',
        tagline:
            'Lees hoe professionele vastgoedbeheerders, retailketens en controllers hun administratie automatiseren.',
        desc: 'Vastgoedbeheerders en beleggers vertrouwen dagelijks op emlinked om hun operationele en financiële processen te automatiseren.',
        casesTitle: 'Klantverhalen',
        testimonials: [
            {
                quote: 'emlinked heeft onze verwerkingstijd voor servicekostenafrekeningen met 80% verminderd dankzij de directe koppeling met Business Central.',
                author: 'Financieel Directeur',
                role: 'Real Estate Asset Management',
            },
            {
                quote: 'Ons huurdersportaal van emlinked neemt dagelijks tientallen telefoontjes weg. Storingen worden direct met de juiste foto’s geregistreerd.',
                author: 'Operationeel Manager',
                role: 'Commercieel Vastgoedbeheerder',
            },
        ],
    },
    en: {
        title: 'Customer cases and experiences with emlinked',
        tagline:
            'Read how professional property managers, retail chains, and controllers automate their real estate administration.',
        desc: 'Real estate managers and investors rely on emlinked every day to automate their operational and financial workflows.',
        casesTitle: 'Customer Cases',
        testimonials: [
            {
                quote: 'emlinked reduced our service charge reconciliation workload by 80% through direct Business Central integration.',
                author: 'Finance Director',
                role: 'Real Estate Asset Management',
            },
            {
                quote: 'Our tenant portal from emlinked cuts dozens of daily calls. Maintenance tickets get logged cleanly with photos.',
                author: 'Operations Manager',
                role: 'Commercial Property Manager',
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

    const title =
        pageData?.title ||
        (isEn ? fallbackContent.en.title : fallbackContent.nl.title);
    const tagline =
        pageData?.tagline ||
        (isEn ? fallbackContent.en.tagline : fallbackContent.nl.tagline);
    const desc =
        pageData?.desc ||
        (isEn ? fallbackContent.en.desc : fallbackContent.nl.desc);

    const blocks = pageData?.pageBlocks || [
        {
            _type: 'testimonialSection',
            sectionTitle: isEn ? 'Customer Stories' : 'Klantverhalen',
            testimonials: isEn
                ? fallbackContent.en.testimonials
                : fallbackContent.nl.testimonials,
        },
    ];

    const getPath = (path: string) => {
        if (locale === 'nl') return path;
        return `/en${path === '/' ? '' : path}`;
    };

    const heroBlock = blocks.find((b: any) => b._type === 'hero');
    const otherBlocks = blocks.filter((b: any) => b._type !== 'hero');

    return (
        <div className='flex flex-col min-h-screen bg-texture-navy text-white'>
            {heroBlock ? (
                <HeroSection
                    label={
                        heroBlock.label ||
                        (isEn ? 'PROVEN RESULTS' : 'BEWEZEN RESULTAAT')
                    }
                    title={heroBlock.title || title}
                    subtitle={heroBlock.subtitle || tagline}
                    imagePath={
                        heroBlock.imagePath ||
                        '/hero/vastgoedportfeuille_aangifte-klaar.jpg'
                    }
                    isHomepage={false}
                    locale={locale}
                />
            ) : (
                <HeroSection
                    label={isEn ? 'PROVEN RESULTS' : 'BEWEZEN RESULTAAT'}
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
