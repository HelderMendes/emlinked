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

export async function generateMetadata({
    params,
}: OverOnsPageProps): Promise<Metadata> {
    const { locale } = await params;
    const pageData = await getSanityPageData(locale);
    const seo = pageData?.seo;
    const isEn = locale === 'en';

    const title = seo?.seoTitle || (isEn
        ? 'About Emlinked | Our Vision, Philosophy & Team'
        : 'Over Emlinked | Onze Visie, Filosofie & Team');

    const description = seo?.seoDescription || (isEn
        ? 'Learn about Emlinked, our mission to automate real estate accounting natively inside Dynamics 365, and the team behind it.'
        : 'Lees het verhaal van Emlinked, onze missie om vastgoedbeheer native te automatiseren in Microsoft Dynamics 365, en maak kennis met ons team.');

    const robots = seo?.noIndex ? 'noindex, nofollow' : 'index, follow';

    return {
        title,
        description,
        robots,
        alternates: {
            canonical: seo?.canonical || (isEn ? '/en/team' : '/team'),
        },
    };
}

const fallbackContent = {
    nl: {
        title: 'De brug tussen vastgoed en',
        titleHighlight: 'Finance',
        tagline: 'Emlinked is ontstaan vanuit één duidelijke frustratie: het gat tussen operationeel vastgoedbeheer en de financiële administratie. Wij lossen dit op door software native te integreren in uw Microsoft ERP.',
        philosophyTitle: 'Onze Filosofie',
        philosophyQuote: '"Vastgoedbeheer is niet alleen operationeel, het is in de kern financieel. De enige manier om datakwaliteit te garanderen, is door het huurcontract en het grootboek in exact dezelfde database te beheren."',
        team: [
            {
                name: 'Coen Mendes',
                role: 'Oprichter & Lead Architect',
                bio: 'Met meer dan 15 jaar ervaring in ERP-architecturen richtte Coen Emlinked op om de dagelijkse afletterings- en dubbele boekingsproblemen definitief op te lossen.'
            },
            {
                name: 'Dynamics & BC Specialist',
                role: 'Lead Business Central Engineer',
                bio: 'Specialist in Microsoft Dynamics AL development en extensies. Verantwoordelijk voor de native werking en databasekoppelingen binnen BC.'
            },
            {
                name: 'Customer Success & Support',
                role: 'Support Lead',
                bio: 'Zorgt voor een soepele onboarding en begeleidt de implementatietrajecten bij professionele vastgoedbeheerders.'
            }
        ],
        values: [
            {
                title: '100% Data-integriteit',
                description: 'Wij geloven in één bron van waarheid. Door rechtstreeks binnen Microsoft Dynamics te bouwen, elimineren we losse databases en synchronisatiefouten.'
            },
            {
                title: 'Continu Automatiseren',
                description: 'Handmatig werk zoals CBS-indexering en bankaflettering kost uren tijd. Wij automatiseren deze loops zodat teams zich kunnen richten op groei.'
            },
            {
                title: 'Enterprise Kwaliteit',
                description: 'Onze software voldoet aan de strengste stabiliteits-, beveiligings- en compliance-eisen van grote retail- en woningportefeuilles.'
            }
        ]
    },
    en: {
        title: 'The Bridge Between Property &',
        titleHighlight: 'Finance',
        tagline: 'Emlinked was founded to solve the structural disconnect between property operations and financial administrations. We build native extensions that live directly inside Microsoft Dynamics.',
        philosophyTitle: 'Our Philosophy',
        philosophyQuote: '"Property management is not just operational; it is fundamentally financial. The only way to guarantee data integrity is to keep the ledger and the contract in the exact same database."',
        team: [
            {
                name: 'Coen Mendes',
                role: 'Founder & Lead Architect',
                bio: 'With over 15 years of experience in ERP architectures, Coen founded Emlinked to solve the reconciliation bottleneck between property operations and accounting.'
            },
            {
                name: 'Dynamics & BC Specialist',
                role: 'Lead Business Central Engineer',
                bio: 'Expert in Microsoft Dynamics extensions and AL language. Responsible for the native integration and database synchronization.'
            },
            {
                name: 'Customer Success & Support',
                role: 'Support Lead',
                bio: 'Dedicated to ensuring seamless onboarding and providing technical assistance for institutional real estate managers.'
            }
        ],
        values: [
            {
                title: '100% Data Integrity',
                description: 'We believe in a single source of truth. By building directly inside Microsoft Dynamics, we eliminate separate databases and data syncing errors.'
            },
            {
                title: 'Continuous Automation',
                description: 'Manual tasks like CPI indexation and bank reconciliation cost hours of valuable time. We automate them so teams can focus on asset growth.'
            },
            {
                title: 'Enterprise Quality',
                description: 'We build software that matches the stability and security requirements of large scale retail, commercial, and residential managers.'
            }
        ]
    }
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
                label={isEn ? 'ABOUT EMLINKED' : 'OVER EMLINKED'}
                title={
                    title +
                    (fall.titleHighlight ? ` *${fall.titleHighlight}*` : '')
                }
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
                                    ? 'We built Emlinked to bridge this gap. By developing directly inside Dynamics 365 Business Central, property management functions become native ERP features. Huurprolongatie, bankaflettering, and CPI indexation happen where the transactions belong: in the general ledger.'
                                    : 'We hebben Emlinked gebouwd om deze kloof te dichten. Door software direct binnen Dynamics 365 Business Central te ontwikkelen, worden vastgoedfunctionaliteiten onderdeel van het ERP. Huurprolongatie, bankaflettering en CPI-indexatie gebeuren direct in de boekhouding.'}
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
                                {fall.philosophyQuote}
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
