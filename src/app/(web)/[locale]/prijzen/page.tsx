import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { sanityFetch } from '@/lib/sanity';
import { DataGridCanvas } from '@/components/ui/data-grid-canvas';

interface PricingPageProps {
    params: Promise<{ locale: string }>;
}

async function getSanityPageData(locale: string) {
    try {
        return await sanityFetch<any>({
            query: `*[_type == "page" && slug.current == "prijzen" && language == $locale][0] {
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
        console.error('Failed to fetch pricing page from Sanity:', e);
        return null;
    }
}

export async function generateMetadata({
    params,
}: PricingPageProps): Promise<Metadata> {
    const { locale } = await params;
    const pageData = await getSanityPageData(locale);
    const seo = pageData?.seo;
    const isEn = locale === 'en';

    const title = seo?.seoTitle || (isEn
        ? 'Flexible B2B Pricing Plans | Emlinked'
        : 'Flexibele Prijzen & Tarieven | Emlinked');

    const description = seo?.seoDescription || (isEn
        ? 'Transparent B2B rates tailored to the size of your property portfolio. Native Microsoft Dynamics 365 BC integration.'
        : 'Transparante tarieven afgestemd op de omvang van uw vastgoedportefeuille. Native Microsoft Dynamics 365 BC integratie.');

    const robots = seo?.noIndex ? 'noindex, nofollow' : 'index, follow';

    return {
        title,
        description,
        robots,
        alternates: {
            canonical: seo?.canonical || (isEn ? '/en/prijzen' : '/prijzen'),
        },
    };
}

const fallbackContent = {
    nl: {
        title: 'Flexibele Prijzen',
        tagline: 'Transparante tarieven afgestemd op de omvang van uw vastgoedportefeuille.',
        desc: 'Of u nu een groeiende particuliere belegger bent of een grote corporatie met duizenden verhuureenheden (VHE), Emlinked groeit met u mee. Neem contact op voor een offerte op maat.',
        tiers: [
            {
                title: 'Professional',
                subtitle: 'Voor middelgrote portefeuilles',
                price: 'Vanaf € 299',
                unit: 'per maand',
                badge: 'Populair',
                features: [
                    'Tot 250 verhuureenheden (VHE)',
                    'Native Business Central Sync',
                    'Automatische indexaties & facturatie',
                    'Koppeling met 1 bankrekening (PSD2)',
                    'Standaard Helpdesk support',
                ],
                ctaLabel: 'Demo aanvragen',
                ctaLink: '/contact',
            },
            {
                title: 'Enterprise',
                subtitle: 'Voor grootschalig beheer & corporaties',
                price: 'Op aanvraag',
                unit: 'maatwerk',
                badge: 'Custom',
                features: [
                    'Onbeperkt aantal verhuureenheden',
                    'Multi-entity administratie support',
                    'Meerdere bankrekeningen gekoppeld',
                    'Continia & Idyn add-ons integratie',
                    'Dedicated accountmanager & SLA',
                ],
                ctaLabel: 'Offerte aanvragen',
                ctaLink: '/contact',
            }
        ]
    },
    en: {
        title: 'Flexible Pricing',
        tagline: 'Transparent rates tailored to the size of your property portfolio.',
        desc: 'Whether you are a growing private investor or a large enterprise managing thousands of units, Emlinked scales with you. Contact us for a custom proposal.',
        tiers: [
            {
                title: 'Professional',
                subtitle: 'For mid-sized portfolios',
                price: 'From € 299',
                unit: 'per month',
                badge: 'Popular',
                features: [
                    'Up to 250 units (VHE)',
                    'Native Business Central Sync',
                    'Automated rent indexation & billing',
                    'Single bank account link (PSD2)',
                    'Standard support desk access',
                ],
                ctaLabel: 'Request a Demo',
                ctaLink: '/contact',
            },
            {
                title: 'Enterprise',
                subtitle: 'For institutional portfolios & funds',
                price: 'On request',
                unit: 'custom terms',
                badge: 'Custom',
                features: [
                    'Unlimited units',
                    'Multi-entity company setups',
                    'Multiple bank account syncs',
                    'Full Continia & Idyn integrations',
                    'Dedicated Account Manager & SLA',
                ],
                ctaLabel: 'Request Quote',
                ctaLink: '/contact',
            }
        ]
    }
} as const;

export default async function PricingPage({ params }: PricingPageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getSanityPageData(locale);

    const title = pageData?.title || (isEn ? fallbackContent.en.title : fallbackContent.nl.title);
    const tagline = pageData?.tagline || (isEn ? fallbackContent.en.tagline : fallbackContent.nl.tagline);
    const desc = pageData?.desc || (isEn ? fallbackContent.en.desc : fallbackContent.nl.desc);

    // If blocks are defined in Sanity, we map over them. If not, we fallback to default tiers layout.
    const blocks = pageData?.pageBlocks || [
        {
            _type: 'pricingBlock',
            sectionTitle: isEn ? 'Pricing Plans' : 'Tarieven',
            tiers: isEn ? fallbackContent.en.tiers : fallbackContent.nl.tiers
        }
    ];

    const getPath = (path: string) => {
        if (locale === 'nl') return path;
        return `/en${path === '/' ? '' : path}`;
    };

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
                                id='wave-glow-pricing'
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
                                id='glow-blur-pricing'
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
                            fill='url(#wave-glow-pricing)'
                            filter='url(#glow-blur-pricing)'
                            className='animate-wave-slow'
                        />

                        {/* Wave 2 }
                        <path
                            d='M0,60 C150,10 350,110 500,60 C650,10 850,110 1000,60 C1150,10 1350,110 1500,60 C1650,10 1850,110 2000,60 L2000,120 L0,120 Z'
                            fill='url(#wave-glow-pricing)'
                            filter='url(#glow-blur-pricing)'
                            className='animate-wave-mid opacity-40'
                        />

                        {/* Wave 3 }
                        <path
                            d='M0,60 C200,90 300,30 500,60 C700,90 800,30 1000,60 C1200,90 1300,30 1500,60 C1750,90 1800,30 2000,60 L2000,120 L0,120 Z'
                            fill='url(#wave-glow-pricing)'
                            filter='url(#glow-blur-pricing)'
                            className='animate-wave-fast opacity-60'
                        />
                    </svg>
                </div>
                */}

                <div className="mx-auto max-w-4xl text-center flex flex-col gap-6 relative z-10">
                    <span className="inline-flex items-center gap-1.5 self-center rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold tracking-wider text-primary uppercase">
                        {isEn ? 'PRICING PLANS' : 'PRIJSTARIEVEN'}
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
                if (block._type === 'pricingBlock') {
                    return (
                        <section key={block._key || bIdx} className="px-6 py-16 bg-white/[0.01] border-b border-white/5">
                            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                                {block.sectionTitle && (
                                    <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
                                        <h2 className="font-display font-bold text-3xl text-white">
                                            {block.sectionTitle}
                                        </h2>
                                        {block.sectionSubtitle && (
                                            <p className="text-xs text-muted-foreground leading-relaxed">
                                                {block.sectionSubtitle}
                                            </p>
                                        )}
                                    </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
                                    {block.tiers?.map((tier: any, idx: number) => {
                                        const isCustom = tier.badge === 'Custom' || tier.badge === 'maatwerk';
                                        return (
                                            <div
                                                key={idx}
                                                className={`p-8 rounded-xl bg-white/[0.01] flex flex-col justify-between hover:shadow-lg hover:shadow-amber/5 transition-all border ${
                                                    isCustom ? 'border-2 border-primary relative' : 'border-white/5'
                                                }`}
                                            >
                                                {tier.badge && isCustom && (
                                                    <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                                                        {tier.badge}
                                                    </div>
                                                )}
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="text-xl font-bold text-white">
                                                                {tier.title}
                                                            </h3>
                                                            <p className="text-[11px] text-muted-foreground pt-1">
                                                                {tier.subtitle}
                                                            </p>
                                                        </div>
                                                        {tier.badge && !isCustom && (
                                                            <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-white/[0.06] border border-white/10 text-amber uppercase tracking-wider">
                                                                {tier.badge}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-baseline gap-1.5 mt-2">
                                                        <span className="text-3xl font-extrabold text-white">
                                                            {tier.price}
                                                        </span>
                                                        <span className="text-xs text-slate-400">
                                                            {tier.unit}
                                                        </span>
                                                    </div>
                                                    <div className="border-t border-white/5 my-2"></div>
                                                    <ul className="space-y-3">
                                                        {tier.features?.map((feat: string, fIdx: number) => (
                                                            <li
                                                                key={fIdx}
                                                                className="flex items-center gap-2 text-xs text-slate-300"
                                                            >
                                                                <svg
                                                                    className="h-4 w-4 text-primary shrink-0"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth="2.5"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M4.5 12.75l6 6 9-13.5"
                                                                    />
                                                                </svg>
                                                                {feat}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <Link
                                                    href={getPath(tier.ctaLink || '/contact')}
                                                    className={`inline-flex h-11 items-center justify-center rounded-md px-6 text-xs font-bold transition-all text-center mt-8 w-full ${
                                                        isCustom
                                                            ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-md'
                                                            : 'bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white'
                                                    }`}
                                                >
                                                    {tier.ctaLabel}
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    );
                }

                if (block._type === 'ctaBanner') {
                    return (
                        <section key={block._key || bIdx} className="px-6 py-16 bg-background">
                            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-8 md:p-14 overflow-hidden text-center max-w-4xl mx-auto">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber/5 rounded-full blur-[100px] pointer-events-none" />
                                <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                                    <h2 className="font-display font-bold text-3xl text-white">
                                        {block.title}
                                    </h2>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        {block.subtitle}
                                    </p>
                                    {block.buttonLabel && (
                                        <div className="pt-4">
                                            <Link
                                                href={getPath(block.buttonLink || '/contact')}
                                                className="inline-flex h-11 px-6 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold rounded-lg items-center transition-all shadow-md"
                                            >
                                                {block.buttonLabel}
                                            </Link>
                                        </div>
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
