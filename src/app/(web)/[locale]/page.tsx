import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GlowingLink } from '@/components/ui/GlowingButton';
import { client } from '@/sanity/client';
import {
    Check,
    Shield,
    Star,
    AlertCircle,
    Info,
    TrendingUp,
    FileText,
    Cpu,
    Calendar,
    Database,
    BarChart3,
} from 'lucide-react';
import { Metadata } from 'next';
import { DataGridCanvas } from '@/components/ui/data-grid-canvas';

interface HomePageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({
    params,
}: HomePageProps): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === 'en';

    let seoData: any = null;
    try {
        seoData = await client.fetch(
            `*[_type == "page" && (slug.current == "home" || slug.current == "/" || slug.current == "/en/") && language == $locale][0].seo {
                seoTitle,
                seoDescription,
                canonical,
                noIndex
            }`,
            { locale },
        );
    } catch (e) {
        console.error('Error fetching homepage metadata from Sanity:', e);
    }

    const title =
        seoData?.seoTitle ||
        (isEn
            ? 'Property Management Software for Professional Portfolios | Emlinked'
            : 'Vastgoedbeheer Software voor Professionele Portefeuilles | Emlinked');

    const description =
        seoData?.seoDescription ||
        (isEn
            ? 'Emlinked is the first fully integrated platform for commercial and mixed-use real estate management. Natively synced with Microsoft Dynamics 365 Business Central.'
            : 'Emlinked is het eerste, volledig geïntegreerde platform voor commercieel en mixed-use vastgoedbeheer. Native gekoppeld aan Microsoft Dynamics 365 Business Central.');

    const robots = seoData?.noIndex ? 'noindex, nofollow' : 'index, follow';

    return {
        title,
        description,
        robots,
        alternates: {
            canonical: seoData?.canonical || (isEn ? '/en' : '/'),
        },
    };
}

// GROQ query to retrieve the homepage document by slug
async function getHomepageData(locale: string) {
    try {
        return await client.fetch(
            `*[_type == "page" && (slug.current == "home" || slug.current == "/" || slug.current == "/en/") && language == $locale][0] {
                title,
                pageBlocks[] {
                    _type,
                    _key,
                    // Hero fields
                    label,
                    title,
                    subtitle,
                    ctaLabel,
                    ctaLink,
                    secondaryCtaLabel,
                    secondaryCtaLink,
                    showProof,
                    proofText,
                    cardTitle,
                    cardStats[] {
                        _key,
                        label,
                        value,
                        badgeText,
                        badgeType
                    },
                    // TrustBar items
                    items[] {
                        _key,
                        text,
                        icon,
                        link
                    },
                    // Features list fields
                    sectionTitle,
                    sectionSubtitle,
                    features[] {
                        _key,
                        title,
                        description,
                        icon
                    },
                    // CTA Banner fields
                    buttonLabel,
                    buttonLink
                },
                seo {
                    structuredData
                }
            }`,
            { locale },
        );
    } catch (e) {
        console.error('Error fetching homepage data from Sanity:', e);
        return null;
    }
}

function getTrustIcon(iconName: string) {
    switch (iconName?.toLowerCase()) {
        case 'check':
            return <Check className='h-5 w-5 text-amber flex-shrink-0' />;
        case 'shield':
            return <Shield className='h-5 w-5 text-amber flex-shrink-0' />;
        case 'star':
            return (
                <Star className='h-5 w-5 text-amber fill-amber flex-shrink-0' />
            );
        case 'warn':
        case 'alert':
            return (
                <AlertCircle className='h-5 w-5 text-red-500 flex-shrink-0' />
            );
        default:
            return <Info className='h-5 w-5 text-amber flex-shrink-0' />;
    }
}

function getIcon(iconName: string) {
    switch (iconName?.toLowerCase()) {
        case 'check':
            return <Check className='h-6 w-6' />;
        case 'shield':
            return <Shield className='h-6 w-6' />;
        case 'star':
            return <Star className='h-6 w-6' />;
        case 'trending-up':
            return <TrendingUp className='h-6 w-6' />;
        case 'file-text':
            return <FileText className='h-6 w-6' />;
        case 'cpu':
            return <Cpu className='h-6 w-6' />;
        case 'calendar':
            return <Calendar className='h-6 w-6' />;
        case 'database':
            return <Database className='h-6 w-6' />;
        case 'bar-chart-3':
            return <BarChart3 className='h-6 w-6' />;
        default:
            return <Info className='h-6 w-6' />;
    }
}

function formatHeroTitle(title: string) {
    let formatted = title;
    if (!formatted.includes('*')) {
        formatted = formatted.replace('aangifte-klaar', '*aangifte-klaar*');
    }
    const parts = formatted.split(/(\*[^*]+\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('*') && part.endsWith('*')) {
            return (
                <span
                    key={index}
                    className='text-transparent bg-clip-text bg-gradient-to-r from-amber to-amber-light font-extrabold tracking-tight'
                >
                    {part.slice(1, -1)}
                </span>
            );
        }
        return part;
    });
}

export default async function HomePage({ params }: HomePageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getHomepageData(locale);

    const getPath = (path: string) => {
        if (locale === 'nl') return path;
        return `/en${path === '/' ? '' : path}`;
    };

    // Extract dynamic blocks or fall back to translated blueprint Defaults
    const blocks = pageData?.pageBlocks || [
        {
            _type: 'hero',
            _key: 'fallback-hero',
            label: isEn
                ? 'NATIVE PROPERTY MODULE FOR DYNAMICS 365 BUSINESS CENTRAL'
                : 'NATIVE VASTGOEDMODULE VOOR DYNAMICS 365 BUSINESS CENTRAL',
            title: isEn
                ? 'Property management and financial accounting *native* in one system'
                : 'Vastgoedbeheer en financiële administratie *native* in één systeem',
            subtitle: isEn
                ? 'Emlinked automates leases, CPI indexations, and bank reconciliation directly within Microsoft Dynamics. No separate databases, no manual exports, but 100% real-time control.'
                : 'Emlinked automatiseert huurovereenkomsten, CPI-indexaties en bankreconciliatie rechtstreeks binnen Microsoft Dynamics. Geen losse databases, geen handmatige exports, maar 100% realtime controle.',
            ctaLabel: isEn ? 'Book a Demo' : 'Demo inplannen',
            ctaLink: '#demo',
            secondaryCtaLabel: isEn
                ? 'Discover Integration'
                : 'Koppeling ontdekken',
            secondaryCtaLink: '/integraties',
            showProof: true,
            proofText: isEn
                ? 'Trusted by professional real estate managers'
                : 'Vertrouwd door professionele vastgoedbeheerders',
            cardTitle: 'LIVE PORTFOLIO METRICS',
            cardStats: [
                {
                    _key: 's1',
                    label: isEn
                        ? 'Error-free CPI Indexation'
                        : 'Foutloze CPI-Indexatie',
                    value: '100%',
                    badgeText: isEn ? 'Automated' : 'Geautomatiseerd',
                    badgeType: 'good',
                },
                {
                    _key: 's2',
                    label: isEn
                        ? 'Bank Reconciliation (PSD2)'
                        : 'Bankaflettering (PSD2)',
                    value: 'Direct',
                    badgeText: isEn ? 'Reconciled' : 'Reconciliatie',
                    badgeType: 'blue',
                },
                {
                    _key: 's3',
                    label: isEn
                        ? 'Business Central Postings'
                        : 'Business Central Boekingen',
                    value: 'Native',
                    badgeText: isEn ? 'Ledger Sync' : 'Grootboek-synchroon',
                    badgeType: 'warn',
                },
            ],
        },
        {
            _type: 'trustBar',
            _key: 'fallback-trustbar',
            items: [
                {
                    _key: 't1',
                    text: 'Native Dynamics 365 Module',
                    icon: 'shield',
                },
                {
                    _key: 't2',
                    text: isEn
                        ? 'Real-time Bank Reconciliation'
                        : 'Realtime Bankreconciliatie',
                    icon: 'check',
                },
                {
                    _key: 't3',
                    text: isEn
                        ? '100% Data Integrity'
                        : '100% Data-integriteit',
                    icon: 'star',
                },
            ],
        },
    ];

    const structuredData = pageData?.seo?.structuredData;

    return (
        <div className='flex flex-col min-h-screen'>
            {structuredData && (
                <script
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{ __html: structuredData }}
                />
            )}
            {blocks.map((block: any) => {
                switch (block._type) {
                    case 'hero': {
                        const heroLabel =
                            block.label ||
                            'DE STANDAARD VOOR MODERN VASTGOEDBEHEER';
                        const heroTitle =
                            block.title ||
                            'Uw vastgoedportefeuille altijd *automatisch* aangifte-klaar';
                        const heroSubtitle = block.subtitle || '';
                        const primaryCtaLabel =
                            block.ctaLabel || 'Gratis Demo Aanvragen';
                        const primaryCtaLink = block.ctaLink || '/contact';
                        const secondaryCtaLabel = block.secondaryCtaLabel || '';
                        const secondaryCtaLink = block.secondaryCtaLink || '';
                        const showProof = block.showProof ?? true;
                        const proofText = block.proofText || '';
                        const cardTitle =
                            block.cardTitle || 'LIVE PORTFOLIO METRICS';
                        const cardStats = block.cardStats || [];

                        return (
                            <section
                                key={block._key}
                                className='relative px-6 py-14 md:py-26 overflow-hidden bg-[url("/hero/bkg_darkBlue.jpg")] bg-cover bg-center bg-no-repeat text-white dark:bg-gradient-to-br dark:from-[#FFFBEF] dark:via-[#FFFDF9] dark:to-[#FFF3D4] dark:animate-none dark:text-[#060e32] border-b border-white/10 dark:border-amber/10 transition-colors duration-300'
                            >
                                <DataGridCanvas className='pointer-events-none absolute inset-0 h-full w-full opacity-70 z-999' />

                                {/* Ambient Background Glow */}
                                <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber/5 rounded-full blur-[120px] pointer-events-none animate-float-glow' />

                                {/* Wave Animation with Orange Glow */}
                                <div className='absolute bottom-[-5%] left-0 w-full h-[20%] overflow-hidden pointer-events-none z-0 '>
                                    <svg
                                        className='absolute w-[200%] h-full'
                                        viewBox='0 0 2000 120'
                                        preserveAspectRatio='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <defs>
                                            <linearGradient
                                                id='wave-glow'
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
                                                id='glow-blur'
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

                                        {/* Wave 1 */}
                                        <path
                                            d='M0,60 C250,100 250,20 500,60 C750,100 750,20 1000,60 C1250,100 1250,20 1500,60 C1750,100 1750,20 2000,60 L2000,120 L0,120 Z'
                                            fill='url(#wave-glow)'
                                            filter='url(#glow-blur)'
                                            className='animate-wave-slow'
                                        />

                                        {/* Wave 2 */}
                                        <path
                                            d='M0,60 C150,10 350,110 500,60 C650,10 850,110 1000,60 C1150,10 1350,110 1500,60 C1650,10 1850,110 2000,60 L2000,120 L0,120 Z'
                                            fill='url(#wave-glow)'
                                            filter='url(#glow-blur)'
                                            className='animate-wave-mid opacity-40'
                                        />

                                        {/* Wave 3 */}
                                        <path
                                            d='M0,60 C200,90 300,30 500,60 C700,90 800,30 1000,60 C1200,90 1300,30 1500,60 C1700,90 1800,30 2000,60 L2000,120 L0,120 Z'
                                            fill='url(#wave-glow)'
                                            filter='url(#glow-blur)'
                                            className='animate-wave-fast opacity-60'
                                        />
                                    </svg>
                                </div>

                                {/* Visual Watermarks */}
                                {/* <div className='absolute right-[-60px] top-[-60px] w-[520px] h-auto opacity-[0.06] dark:opacity-[0.03] pointer-events-none select-none text-white dark:text-[#060e32] font-display text-[300px] leading-none font-bold'>
                                    EM
                                </div>
                                <div className='absolute left-[-30px] bottom-[-40px] w-[260px] h-auto opacity-[0.04] dark:opacity-[0.02] pointer-events-none select-none text-amber font-display text-[150px] leading-none font-bold'>
                                    EM
                                </div> */}

                                <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 relative z-10'>
                                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
                                        {/* Left Column */}
                                        <div className='lg:col-span-7 flex flex-col gap-6 text-left'>
                                            <span className='inline-flex items-center gap-1.5 self-start rounded-full bg-amber/15 border border-amber/35 px-3.5 py-1 text-xs font-bold tracking-wide text-amber'>
                                                <span className='w-1.5 h-1.5 bg-amber rounded-full animate-ping' />
                                                {heroLabel}
                                            </span>
                                            <h1 className='font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white dark:text-[#060e32] leading-[1.1]'>
                                                {formatHeroTitle(heroTitle)}
                                            </h1>
                                            <p className='text-lg md:text-xl text-white/65 dark:text-[#060e32]/75 leading-relaxed font-light'>
                                                {heroSubtitle}
                                            </p>
                                            <div className='flex flex-col sm:flex-row gap-4 mt-2'>
                                                <Link
                                                    href={getPath(
                                                        primaryCtaLink,
                                                    )}
                                                    className='inline-flex h-12 items-center justify-center rounded-md bg-amber hover:bg-amber-hover px-6 text-sm font-semibold text-white transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98]'
                                                >
                                                    {primaryCtaLabel}
                                                </Link>
                                                {secondaryCtaLabel &&
                                                    secondaryCtaLink && (
                                                        <Link
                                                            href={getPath(
                                                                secondaryCtaLink,
                                                            )}
                                                            className='inline-flex h-12 items-center justify-center rounded-md border border-white/20 dark:border-[#060e32]/20 bg-transparent px-6 text-sm font-semibold text-white dark:text-[#060e32] hover:bg-white/10 dark:hover:bg-[#060e32]/5 transition-all text-center shadow-sm hover:scale-[1.02] active:scale-[0.98] duration-200'
                                                        >
                                                            {secondaryCtaLabel}
                                                        </Link>
                                                    )}
                                            </div>

                                            {showProof && (
                                                <div className='flex items-center gap-4 pt-6 border-t border-white/10 dark:border-[#060e32]/10 mt-2'>
                                                    <div className='flex -space-x-2.5 overflow-visible relative'>
                                                        {/* Levi Bosboom */}
                                                        <div className='relative group z-30 hover:z-50'>
                                                            <Image
                                                                src='/hero/levi-bosboom.png'
                                                                alt='Levi Bosboom'
                                                                width={32}
                                                                height={32}
                                                                className='w-8 h-8 rounded-full border-2 border-navy dark:border-[#FFFBEF] object-cover object-top hover:scale-110 transition-transform duration-200 cursor-pointer'
                                                            />
                                                            {/* Tooltip */}
                                                            <div className='absolute top-full left-0 mt-2 w-max min-w-[190px] max-w-[240px] opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-50 p-2.5 rounded-lg bg-darkBlue/95 dark:bg-white/95 border border-white/10 dark:border-navy/10 shadow-xl text-left'>
                                                                <div className='text-[12px] font-bold text-amber leading-tight'>
                                                                    Levi Bosboom
                                                                </div>
                                                                <div className='text-[11px] text-white/70 dark:text-navy/70 mt-0.5 leading-tight'>
                                                                    Eigenaar,
                                                                    Vastgoedbeheer
                                                                    Rotterdam
                                                                </div>
                                                                <div className='text-[10px] text-amber mt-1'>
                                                                    ★★★★★
                                                                </div>
                                                                {/* Arrow */}
                                                                <div className='absolute bottom-full left-3 border-4 border-transparent border-b-darkBlue/95 dark:border-b-white/95' />
                                                            </div>
                                                        </div>

                                                        {/* Angelique */}
                                                        <div className='relative group z-25 hover:z-50'>
                                                            <Image
                                                                src='/hero/angelique.png'
                                                                alt='Angelique van Doorn-Franke'
                                                                width={32}
                                                                height={32}
                                                                className='w-8 h-8 rounded-full border-2 border-navy dark:border-[#FFFBEF] object-cover object-top hover:scale-110 transition-transform duration-200 cursor-pointer'
                                                            />
                                                            {/* Tooltip */}
                                                            <div className='absolute top-full left-0 mt-2 w-max min-w-[190px] max-w-[240px] opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-50 p-2.5 rounded-lg bg-darkBlue/95 dark:bg-white/95 border border-white/10 dark:border-navy/10 shadow-xl text-left'>
                                                                <div className='text-[12px] font-bold text-amber leading-tight'>
                                                                    Angelique
                                                                    van Doorn
                                                                </div>
                                                                <div className='text-[11px] text-white/70 dark:text-navy/70 mt-0.5 leading-tight'>
                                                                    Vastgoedbeheerder,
                                                                    Van
                                                                    Overhagen
                                                                </div>
                                                                <div className='text-[10px] text-amber mt-1'>
                                                                    ★★★★★
                                                                </div>
                                                                {/* Arrow */}
                                                                <div className='absolute bottom-full left-3 border-4 border-transparent border-b-darkBlue/95 dark:border-b-white/95' />
                                                            </div>
                                                        </div>

                                                        {/* Michel */}
                                                        <div className='relative group z-20 hover:z-50'>
                                                            <Image
                                                                src='/hero/MichelDeWaal.jpg'
                                                                alt='Michel De Waal'
                                                                width={32}
                                                                height={32}
                                                                className='w-8 h-8 rounded-full border-2 border-navy dark:border-[#FFFBEF] object-cover object-top hover:scale-110 transition-transform duration-200 cursor-pointer'
                                                            />
                                                            {/* Tooltip */}
                                                            <div className='absolute top-full left-0 mt-2 w-max min-w-[190px] max-w-[240px] opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-50 p-2.5 rounded-lg bg-darkBlue/95 dark:bg-white/95 border border-white/10 dark:border-navy/10 shadow-xl text-left'>
                                                                <div className='text-[12px] font-bold text-amber leading-tight'>
                                                                    Michel De
                                                                    Waal
                                                                </div>
                                                                <div className='text-[11px] text-white/70 dark:text-navy/70 mt-0.5 leading-tight'>
                                                                    Directeur,
                                                                    M2 Capital
                                                                    Real Estate
                                                                </div>
                                                                <div className='text-[10px] text-amber mt-1'>
                                                                    ★★★★★
                                                                </div>
                                                                {/* Arrow */}
                                                                <div className='absolute bottom-full left-3 border-4 border-transparent border-b-darkBlue/95 dark:border-b-white/95' />
                                                            </div>
                                                        </div>

                                                        {/* Sander */}
                                                        <div className='relative group z-15 hover:z-50'>
                                                            <Image
                                                                src='/hero/sander-bot.png'
                                                                alt='Sander Bot'
                                                                width={32}
                                                                height={32}
                                                                className='w-8 h-8 rounded-full border-2 border-navy dark:border-[#FFFBEF] object-cover object-top hover:scale-110 transition-transform duration-200 cursor-pointer'
                                                            />
                                                            {/* Tooltip */}
                                                            <div className='absolute top-full left-0 mt-2 w-max min-w-[190px] max-w-[240px] opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-50 p-2.5 rounded-lg bg-darkBlue/95 dark:bg-white/95 border border-white/10 dark:border-navy/10 shadow-xl text-left'>
                                                                <div className='text-[12px] font-bold text-amber leading-tight'>
                                                                    Sander Bot
                                                                </div>
                                                                <div className='text-[11px] text-white/70 dark:text-navy/70 mt-0.5 leading-tight'>
                                                                    Mede-eigenaar,
                                                                    Baetland
                                                                    Vastgoed
                                                                </div>
                                                                <div className='text-[10px] text-amber mt-1'>
                                                                    ★★★★★
                                                                </div>
                                                                {/* Arrow */}
                                                                <div className='absolute bottom-full left-3 border-4 border-transparent border-b-darkBlue/95 dark:border-b-white/95' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className='text-sm text-white/65 dark:text-orange font-light'>
                                                        {proofText}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Right Column */}
                                        <div className='lg:col-span-5 hover:scale-[1.01] transition-transform duration-300'>
                                            <h3>
                                                <Image
                                                    src='/hero/vastgoedportfeuille_aangifte-klaar.jpg'
                                                    alt='hero-image'
                                                    width={500}
                                                    height={500}
                                                    className='w-full h-auto rounded-2xl'
                                                    priority
                                                />
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        );
                    }
                    case 'trustBar': {
                        const items = block.items || [];
                        return (
                            <section
                                key={block._key}
                                className='bg-white dark:bg-navy-dark border-b border-gray-200 dark:border-white/5 py-4 px-6 md:px-10 shadow-sm'
                            >
                                <div className='max-w-8xl mx-auto flex items-center justify-center gap-9 flex-wrap'>
                                    {items.map((item: any) => (
                                        <div
                                            key={item._key}
                                            className='flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-white/75 hover:text-amber dark:hover:text-amber transition-colors'
                                        >
                                            {getTrustIcon(item.icon)}
                                            <span>{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        );
                    }
                    case 'featuresList': {
                        const sectionTitle = block.sectionTitle || '';
                        const sectionSubtitle = block.sectionSubtitle || '';
                        const features = block.features || [];

                        return (
                            <section
                                key={block._key}
                                className='px-6 py-20 bg-card border-b border-border'
                            >
                                <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-12'>
                                    <div className='max-w-3xl mx-auto flex flex-col gap-4'>
                                        <h2 className='font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground'>
                                            {sectionTitle}
                                        </h2>
                                        {sectionSubtitle && (
                                            <p className='text-muted-foreground leading-relaxed'>
                                                {sectionSubtitle}
                                            </p>
                                        )}
                                    </div>

                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-left'>
                                        {features.map((feature: any) => (
                                            <div
                                                key={feature._key}
                                                className='p-8 rounded-2xl border border-border bg-background flex flex-col gap-4 hover:shadow-2xl hover:-translate-y-2 hover:border-amber/30 transition-all duration-300 group cursor-pointer relative overflow-hidden'
                                            >
                                                {/* Card Corner Glow */}
                                                <div className='absolute -right-16 -top-16 w-32 h-32 bg-amber/5 rounded-full blur-2xl group-hover:bg-amber/15 transition-all duration-500' />

                                                <div className='h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 z-10'>
                                                    {getIcon(feature.icon)}
                                                </div>
                                                <h3 className='text-lg font-bold text-foreground z-10'>
                                                    {feature.title}
                                                </h3>
                                                <p className='text-sm text-muted-foreground leading-relaxed z-10'>
                                                    {feature.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        );
                    }
                    case 'ctaBanner': {
                        const title = block.title || '';
                        const subtitle = block.subtitle || '';
                        const buttonLabel = block.buttonLabel || '';
                        const buttonLink = block.buttonLink || '';

                        return (
                            <section
                                key={block._key}
                                className='px-6 py-20 bg-background'
                            >
                                <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 border border-border/80 rounded-2xl bg-card p-8 md:p-12 hover:shadow-xl transition-all duration-300 relative overflow-hidden group'>
                                    {/* Ambient Glow Blob */}
                                    <div className='absolute -left-20 -bottom-20 w-80 h-80 bg-amber/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-amber/15 transition-all duration-500' />
                                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'>
                                        <div className='lg:col-span-8 flex flex-col gap-4 text-left'>
                                            <span className='text-xs font-semibold text-primary uppercase tracking-widest'>
                                                {locale === 'en'
                                                    ? 'Product Focus'
                                                    : 'Platform Focus'}
                                            </span>
                                            <h2 className='font-display text-3xl font-bold tracking-tight text-foreground'>
                                                {title}
                                            </h2>
                                            <p className='text-muted-foreground leading-relaxed'>
                                                {subtitle}
                                            </p>
                                        </div>
                                        {buttonLabel && buttonLink && (
                                            <div className='lg:col-span-4 flex justify-end'>
                                                <GlowingLink
                                                    href={getPath(buttonLink)}
                                                    className='h-12 text-sm w-full lg:w-auto'
                                                >
                                                    {buttonLabel}
                                                </GlowingLink>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>
                        );
                    }
                    default:
                        return null;
                }
            })}
        </div>
    );
}
