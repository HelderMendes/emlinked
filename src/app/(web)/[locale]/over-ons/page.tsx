import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
    ShieldCheck, 
    Lightbulb, 
    HeartHandshake, 
    Target, 
    Sparkles, 
    ArrowRight 
} from 'lucide-react';
import { sanityFetch } from '@/lib/sanity';
import { DataGridCanvas } from '@/components/ui/data-grid-canvas';
import { HeroSection } from '@/components/blocks/HeroSection';

interface OverOnsPageProps {
    params: Promise<{ locale: string }>;
}

async function getSanityPageData(locale: string) {
    try {
        return await sanityFetch<any>({
            query: `*[_type == "page" && slug.current == "team" && language == $locale][0] {
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
        console.error('Failed to fetch team page from Sanity:', e);
        return null;
    }
}

import { buildMetadata, DEFAULT_DOMAIN } from '@/lib/seo';

export async function generateMetadata({
    params,
}: OverOnsPageProps): Promise<Metadata> {
    const { locale } = await params;
    const pageData = await getSanityPageData(locale);
    const isEn = locale === 'en';

    const fallbackTitle = isEn
        ? 'About emlinked | Our Vision, Philosophy & Team'
        : 'Over emlinked | Onze Visie, Filosofie & Team';
    const fallbackDescription = isEn
        ? 'Get to know the team behind emlinked. We build the smartest native real estate management software solutions for Microsoft Dynamics 365 Business Central.'
        : 'Maak kennis met het team achter emlinked. Wij bouwen de slimste, native vastgoedbeheer software-oplossingen voor Microsoft Dynamics 365 Business Central.';
    const canonicalUrl = `${DEFAULT_DOMAIN}${isEn ? '/en/over-ons' : '/over-ons'}`;

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
        title: 'Over emlinked: Onze missie, visie & team',
        tagline:
            'Maak kennis met het team achter emlinked. Wij bouwen de slimste, native vastgoedbeheer software-oplossingen voor Microsoft Dynamics 365 Business Central.',
        philosophyTitle: 'Onze Filosofie',
        philosophyDesc:
            'emlinked is ontstaan vanuit de overtuiging dat operationeel vastgoedbeheer en de financiële boekhouding in één en hetzelfde systeem moeten plaatsvinden.',
        team: [
            {
                name: 'Software Architecture Team',
                role: 'Dynamics 365 Engineers',
                bio: 'Gespecialiseerd in native AL-ontwikkeling en de nieuwste Microsoft Dynamics 365 Business Central architectuur.',
            },
            {
                name: 'Real Estate & Finance Consultants',
                role: 'Vastgoed & Fiscale Specialisten',
                bio: 'Deskundigen in CPI-indexering, Box 3 regelgeving en geautomatiseerde bankaflettering.',
            },
            {
                name: 'Customer Success & Support',
                role: 'Support Lead',
                bio: 'Toegewijd aan een vlekkeloze onboarding en ondersteuning van professionele vastgoedbeheerders.',
            },
        ],
        values: [
            {
                title: '100% Data Integriteit',
                description:
                    'Één centrale waarheid in Business Central zonder losse databases of importfouten.',
            },
            {
                title: 'Continue Automatisering',
                description:
                    'Geen handmatige Excel-berekeningen meer voor indexaties en servicekosten.',
            },
            {
                title: 'Enterprise Kwaliteit',
                description:
                    'Robuuste software die voldoet aan de strengste eisen van beheerders en beleggers.',
            },
        ],
    },
    en: {
        title: 'About emlinked: Our mission, vision & team',
        tagline:
            'Get to know the team behind emlinked. We build the smartest native real estate management software solutions for Microsoft Dynamics 365 Business Central.',
        philosophyTitle: 'Our Philosophy',
        philosophyDesc:
            'emlinked was founded on the conviction that operational real estate management and financial accounting must take place inside one single system.',
        team: [
            {
                name: 'Software Architecture Team',
                role: 'Dynamics 365 Engineers',
                bio: 'Specialized in native AL development and modern Microsoft Dynamics 365 Business Central architecture.',
            },
            {
                name: 'Real Estate & Finance Consultants',
                role: 'Real Estate & Tax Specialists',
                bio: 'Experts in CPI indexations, Box 3 regulations, and automated bank reconciliations.',
            },
            {
                name: 'Customer Success & Support',
                role: 'Support Lead',
                bio: 'Dedicated to ensuring seamless onboarding and providing technical assistance for institutional real estate managers.',
            },
        ],
        values: [
            {
                title: '100% Data Integrity',
                description:
                    'We believe in a single source of truth inside Microsoft Dynamics Business Central.',
            },
            {
                title: 'Continuous Automation',
                description:
                    'Manual tasks like CPI indexation and bank reconciliation cost hours of valuable time. We automate them.',
            },
            {
                title: 'Enterprise Quality',
                description:
                    'We build software that matches the stability and security requirements of commercial and residential managers.',
            },
        ],
    },
} as const;

export default async function OverOnsPage({ params }: OverOnsPageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getSanityPageData(locale);
    const fall = isEn ? fallbackContent.en : fallbackContent.nl;

    const title = pageData?.title || fall.title;
    const tagline = pageData?.tagline || fall.tagline;

    // Use pageBlocks from Sanity if they exist, otherwise use fallback structure
    const blocks = pageData?.pageBlocks || [
        {
            _type: 'teamBlock',
            sectionTitle: isEn ? 'Meet Our Specialists' : 'Onze Specialisten',
            members: fall.team
        }
    ];

    const getPath = (path: string) => {
        if (locale === 'nl') return path;
        return `/en${path === '/' ? '' : path}`;
    };

    const getValueIcon = (index: number) => {
        if (index === 0) return <ShieldCheck className="h-6 w-6 text-amber" />;
        if (index === 1) return <Lightbulb className="h-6 w-6 text-amber" />;
        return <HeartHandshake className="h-6 w-6 text-amber" />;
    };

    return (
        <main className="flex-1 bg-[url('/hero/bkg_darkBlue.jpg')] bg-cover bg-center bg-no-repeat text-white">
            {/* Hero Section */}
            <HeroSection
                label={isEn ? 'ORGANIZATION & TEAM' : 'ORGANISATIE & TEAM'}
                title={title}
                subtitle={tagline}
                locale={locale}
            />

            {/* Our Story & Philosophy */}
            <section className='px-6 py-12 relative z-10 max-w-7xl mx-auto'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
                    <div className='space-y-6 text-left'>
                        <span className='text-xs font-bold text-amber uppercase tracking-wider'>
                            {isEn ? 'OUR ORIGIN STORY' : 'ONS VERHAAL'}
                        </span>
                        <h2 className='font-display font-bold text-3xl md:text-4xl text-white'>
                            {isEn
                                ? 'Eliminating the Double-Entry Tax'
                                : 'Het elimineren van de dubbele invoer'}
                        </h2>
                        <div className='space-y-4 text-xs text-slate-300 leading-relaxed'>
                            <p>
                                {isEn
                                    ? 'Traditionally, property managers use separate tools to manage tenants and invoices, while their financial ledger lives inside a heavy ERP. This creates constant manual exporting, bank reconciliation errors, and out-of-sync databases.'
                                    : 'Traditioneel gebruiken vastgoedbeheerders losse softwarepakketten voor contracten en huurders, terwijl de financiële administratie in een zwaar ERP-systeem draait. Dit leidt tot handmatig exporteren, foutgevoelig afletterwerk en niet-synchrone databases.'}
                            </p>
                            <p>
                                {isEn
                                    ? 'We built emlinked to bridge this gap. By developing directly inside Dynamics 365 Business Central, property management functions become native ERP features. Huurprolongatie, bankaflettering, and CPI indexation happen where the transactions belong: in the general ledger.'
                                    : 'We hebben emlinked gebouwd om deze kloof te dichten. Door software direct binnen Dynamics 365 Business Central te ontwikkelen, worden vastgoedfunctionaliteiten onderdeel van het ERP. Huurprolongatie, bankaflettering en CPI-indexatie gebeuren direct in de boekhouding.'}
                            </p>
                        </div>
                    </div>

                    {/* Visual Card / Philosophy Statement */}
                    <div className='relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-12 text-left overflow-hidden'>
                        <div className='absolute top-0 right-0 w-48 h-48 bg-amber/5 rounded-full blur-[80px]' />
                        <div className='space-y-6 relative z-10'>
                            <div className='h-10 w-10 rounded-lg bg-white/[0.04] flex items-center justify-center border border-white/10 text-amber'>
                                <Target className='h-5 w-5' />
                            </div>
                            <h3 className='font-display font-bold text-xl text-white'>
                                {fall.philosophyTitle}
                            </h3>
                            <blockquote className='text-xs italic text-slate-300 border-l-2 border-primary pl-4 py-1'>
                                {fall.philosophyDesc}
                            </blockquote>
                            <p className='text-[10px] text-muted-foreground'>
                                — Coen Mendes, Founder & Lead Architect
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className='px-6 py-16 relative z-10 max-w-7xl mx-auto border-t border-white/5'>
                <div className='text-center max-w-2xl mx-auto space-y-4 mb-12'>
                    <h2 className='font-display font-bold text-3xl text-white'>
                        {isEn ? 'What We Stand For' : 'Waar we in geloven'}
                    </h2>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {fall.values.map((val, idx) => (
                        <div
                            key={idx}
                            className='rounded-xl border border-white/5 bg-white/[0.01] p-6 text-left space-y-4'
                        >
                            <div className='h-11 w-11 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0'>
                                {getValueIcon(idx)}
                            </div>
                            <h3 className='font-display font-bold text-lg text-white'>
                                {val.title}
                            </h3>
                            <p className='text-xs text-slate-300 leading-relaxed'>
                                {val.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Dynamic blocks rendering */}
            {blocks.map((block: any, bIdx: number) => {
                if (block._type === 'teamBlock') {
                    return (
                        <section
                            key={block._key || bIdx}
                            className='px-6 py-16 relative z-10 max-w-7xl mx-auto border-t border-white/5'
                        >
                            <div className='text-center max-w-2xl mx-auto space-y-4 mb-12'>
                                <h2 className='font-display font-bold text-3xl text-white'>
                                    {block.sectionTitle}
                                </h2>
                                {block.sectionSubtitle && (
                                    <p className='text-xs text-muted-foreground leading-relaxed'>
                                        {block.sectionSubtitle}
                                    </p>
                                )}
                            </div>
                            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                                {block.members?.map(
                                    (member: any, idx: number) => (
                                        <div
                                            key={idx}
                                            className='rounded-xl border border-white/10 bg-white/[0.01] p-8 text-left flex flex-col justify-between hover:border-amber/20 transition-all'
                                        >
                                            <div className='space-y-4'>
                                                <div className='space-y-1'>
                                                    <h3 className='font-display font-bold text-xl text-white'>
                                                        {member.name}
                                                    </h3>
                                                    <p className='text-xs text-primary font-semibold tracking-wider'>
                                                        {member.role}
                                                    </p>
                                                </div>
                                                <p className='text-xs text-slate-300 leading-relaxed pt-2'>
                                                    {member.bio}
                                                </p>
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                        </section>
                    );
                }

                if (block._type === 'ctaBanner') {
                    return (
                        <section
                            key={block._key || bIdx}
                            className='px-6 py-16 relative z-10 max-w-7xl mx-auto'
                        >
                            <div className='relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-8 md:p-14 overflow-hidden text-center max-w-4xl mx-auto'>
                                <div className='absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber/5 rounded-full blur-[100px] pointer-events-none' />
                                <div className='relative z-10 space-y-6 max-w-2xl mx-auto'>
                                    <h2 className='font-display font-bold text-3xl md:text-4xl text-white'>
                                        {block.title}
                                    </h2>
                                    <p className='text-xs text-muted-foreground leading-relaxed'>
                                        {block.subtitle}
                                    </p>
                                    <div className='flex flex-col sm:flex-row justify-center items-center gap-4 pt-4'>
                                        <Link
                                            href='#demo'
                                            className='h-11 px-6 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold rounded-lg flex items-center gap-2 transition-all shadow-md'
                                        >
                                            {isEn
                                                ? 'Request a Demo'
                                                : 'Demo aanvragen'}
                                            <ArrowRight className='h-4.5 w-4.5' />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    );
                }

                return null;
            })}
        </main>
    );
}
