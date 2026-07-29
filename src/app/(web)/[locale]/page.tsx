import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GlowingLink } from '@/components/ui/GlowingButton';
import { client } from '@/sanity/client';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    AiSecurity01Icon,
    CheckmarkBadge03Icon,
    StarAward01Icon,
} from '@hugeicons/core-free-icons';
import {
    AlertCircle,
    Info,
    TrendingUp,
    FileText,
    Cpu,
    Calendar,
    Database,
    BarChart3,
    CheckCircle2,
    CreditCard,
    RefreshCw,
    Zap,
    ArrowDownRight,
    Layers,
} from 'lucide-react';
import { Metadata } from 'next';
import { DataGridCanvas } from '@/components/ui/data-grid-canvas';
import { Box3CalculatorWidget } from '@/components/Box3CalculatorWidget';
import { HeroSection } from '@/components/blocks/HeroSection';

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
                    sectionTag,
                    sectionTitle,
                    sectionSubtitle,
                    features[] {
                        _key,
                        title,
                        description,
                        icon,
                        imagePath,
                        bullets,
                        ctaLabel,
                        ctaLink
                    },
                    // CTA Banner fields
                    tag,
                    title,
                    subtitle,
                    buttonLabel,
                    buttonLink,
                    // Integrations List fields
                    integrations[] {
                        _key,
                        title,
                        badge,
                        description,
                        imagePlaceholder,
                        bullets,
                        link
                    }
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
            return (
                <HugeiconsIcon
                    icon={CheckmarkBadge03Icon}
                    size={20}
                    className='shrink-0 transition-colors'
                />
            );
        case 'shield':
            return (
                <HugeiconsIcon
                    icon={AiSecurity01Icon}
                    size={20}
                    className='shrink-0 transition-colors'
                />
            );
        case 'star':
            return (
                <HugeiconsIcon
                    icon={StarAward01Icon}
                    size={20}
                    className='shrink-0 transition-colors'
                />
            );
        case 'warn':
        case 'alert':
            return <AlertCircle className='h-5 w-5 text-red-500 shrink-0' />;
        default:
            return <Info className='h-5 w-5 shrink-0' />;
    }
}

function getIcon(iconName: string) {
    switch (iconName?.toLowerCase()) {
        case 'check':
            return (
                <HugeiconsIcon
                    icon={CheckmarkBadge03Icon}
                    size={24}
                    className='shrink-0 transition-colors'
                />
            );
        case 'shield':
            return (
                <HugeiconsIcon
                    icon={AiSecurity01Icon}
                    size={24}
                    className='shrink-0 transition-colors'
                />
            );
        case 'star':
            return (
                <HugeiconsIcon
                    icon={StarAward01Icon}
                    size={24}
                    className='shrink-0 transition-colors'
                />
            );
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
                    className='text-transparent bg-clip-text bg-linear-to-r from-amber to-amber-light font-extrabold tracking-tight'
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
            ctaLabel: isEn ? 'Request a Demo' : 'Demo aanvragen',
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
                        return (
                            <HeroSection
                                key={block._key}
                                label={block.label}
                                title={block.title || 'Uw vastgoedportefeuille altijd *automatisch* aangifte-klaar'}
                                subtitle={block.subtitle}
                                ctaLabel={block.ctaLabel || 'Gratis Demo Aanvragen'}
                                ctaLink={block.ctaLink || '/contact'}
                                secondaryCtaLabel={block.secondaryCtaLabel}
                                secondaryCtaLink={block.secondaryCtaLink}
                                showProof={block.showProof ?? true}
                                proofText={block.proofText}
                                imagePath={block.imagePath || '/hero/vastgoedportfeuille_aangifte-klaar.jpg'}
                                isHomepage={true}
                                locale={locale}
                            />
                        );
                    }
                    case 'trustBar': {
                        const items = block.items || [];
                        return (
                            <section
                                key={block._key}
                                className='bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] animate-none dark:text-[#060e32] dark:bg-navy-dark border-b border-gray-200 dark:border-white/5 py-2 px-6 md:px-10 shadow-sm'
                            >
                                <div className='max-w-8xl mx-auto flex items-center justify-center gap-9 flex-wrap'>
                                    {items.map((item: any) => (
                                        <div
                                            key={item._key}
                                            className='flex items-center gap-2 text-xs font-mono font-semibold text-darkBlue/75 dark:text-white/90 hover:text-amber dark:hover:text-amber transition-colors tracking-wide'
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
                        let sectionTag = block.sectionTag || '';
                        let sectionSubtitle = block.sectionSubtitle || '';

                        if (!sectionTag && sectionSubtitle.includes(' — ')) {
                            const parts = sectionSubtitle.split(' — ');
                            sectionTag = parts[0].trim();
                            sectionSubtitle = parts.slice(1).join(' — ').trim();
                        }

                        const sectionTitle = block.sectionTitle || '';
                        const features = block.features || [];
                        const isBox3Block =
                            block._key === 'box3-check-lead-magnet' ||
                            sectionTag.toUpperCase().includes('BOX 3') ||
                            sectionTag.toUpperCase().includes('FISCALE') ||
                            sectionTitle.includes('Box 3');

                        if (isBox3Block) {
                            return (
                                <section
                                    key={block._key}
                                    className='px-6 py-24 bg-background border-b border-border relative overflow-hidden'
                                >
                                    {/* Ambient Glow Orbs */}
                                    <div className='absolute right-0 top-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber/5 rounded-full blur-[140px] pointer-events-none' />

                                    <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 relative z-10'>
                                        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
                                            {/* Left Column: Text, Bullets, CTA */}
                                            <div className='lg:col-span-7 flex flex-col gap-6 text-left'>
                                                {sectionTag && (
                                                    <span className='inline-flex items-center gap-2 self-start rounded-full bg-amber/15 border border-amber/35 px-4 py-1 text-xs font-bold tracking-widest text-amber uppercase backdrop-blur-md'>
                                                        <span className='w-1.5 h-1.5 bg-amber rounded-full animate-ping' />
                                                        {sectionTag}
                                                    </span>
                                                )}
                                                <h2 className='font-display text-3xl md:text-4xl lg:text-[2.7rem] font-bold tracking-tight text-foreground leading-[1.2]'>
                                                    {sectionTitle}
                                                </h2>
                                                {sectionSubtitle && (
                                                    <p className='text-muted-foreground text-base md:text-lg leading-relaxed font-light'>
                                                        {sectionSubtitle}
                                                    </p>
                                                )}
                                                <div className='flex flex-col gap-4 my-2'>
                                                    {features.map(
                                                        (feat: any) => (
                                                            <div
                                                                key={feat._key}
                                                                className='flex items-start gap-3.5 group'
                                                            >
                                                                <div className='h-7 w-7 rounded-xl bg-amber/15 border border-amber/35 flex items-center justify-center text-amber shrink-0 mt-0.5 shadow-sm group-hover:bg-amber group-hover:text-navy transition-all duration-300'>
                                                                    <CheckCircle2 className='h-4 w-4' />
                                                                </div>
                                                                <span className='text-base font-semibold text-foreground/90 leading-snug pt-0.5'>
                                                                    {feat.title}
                                                                </span>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                                <div className='pt-3'>
                                                    <GlowingLink
                                                        href={getPath(
                                                            '/kennisbank/box3-check',
                                                        )}
                                                        className='h-13 px-8  inline-flex '
                                                    >
                                                        Start de gratis Box
                                                        3-check ⚡
                                                    </GlowingLink>
                                                </div>
                                            </div>

                                            {/* Right Column: Fiscale Optimalisatie Illustration Image (Calculator Widget commented out below) */}
                                            <div className='lg:col-span-5 flex justify-center items-center'>
                                                <div className='relative w-full max-w-md max-h-[650px] rounded-2xl overflow-hidden group flex items-center justify-center'>
                                                    <Image
                                                        src='/emlinked/home/FiscaleOptimalisatie_Box3.jpg'
                                                        alt={sectionTitle}
                                                        width={700}
                                                        height={500}
                                                        className='w-full max-h-[650px] object-cover object-top rounded-2xl group-hover:scale-105 transition-transform duration-500'
                                                        priority
                                                    />
                                                </div>
                                                {/* Reusable Box 3 Calculator Widget Component (Commented out for now):
                                                    <Box3CalculatorWidget />
                                                */}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            );
                        }

                        // Render Onze Apps (3-Card Grid Layout)
                        return (
                            <section
                                key={block._key}
                                className='px-6 py-20 bg-card border-b border-border'
                            >
                                <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-12'>
                                    <div className='max-w-3xl mx-auto flex flex-col gap-3 text-center'>
                                        {sectionTag && (
                                            <div className='flex justify-center mb-1'>
                                                <span className='inline-flex items-center gap-2 rounded-full border-amber border bg-amber px-8 py-1 text-xs font-bold tracking-wide text-white uppercase'>
                                                    <span className='w-1.5 h-1.5 bg-white rounded-full animate-ping mr-3' />
                                                    {sectionTag}
                                                </span>
                                            </div>
                                        )}
                                        <h2 className='font-display text-3xl md:text-4xl lg:text-[2.7rem]/12 font-bold tracking-tight text-darkblue'>
                                            {sectionTitle}
                                        </h2>
                                        {sectionSubtitle && (
                                            <p className='text-muted-foreground leading-relaxed text-lg'>
                                                {sectionSubtitle}
                                            </p>
                                        )}
                                    </div>

                                    {/* Clean 3-App Responsive Grid Layout */}
                                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 text-left'>
                                        {features
                                            .slice(0, 3)
                                            .map(
                                                (
                                                    feature: any,
                                                    index: number,
                                                ) => {
                                                    const imagePath =
                                                        feature.imagePath &&
                                                        feature.imagePath !==
                                                            'payment-flow-animation'
                                                            ? feature.imagePath
                                                            : index === 0
                                                              ? '/emlinked/home/DrieKrachtigeApps_VastgoedbeheerSoftware.png'
                                                              : index === 1
                                                                ? '/emlinked/home/Huurdersportaal.png'
                                                                : '/emlinked/home/DrieKrachtigeApps_PaymentSoftware.png';

                                                    return (
                                                        <div
                                                            key={
                                                                feature._key ||
                                                                index
                                                            }
                                                            className='p-6 md:p-8 rounded-2xl border border-black/20 bg-background flex flex-col justify-between gap-6 hover:shadow-2xl hover:-translate-y-1.5 hover:border-amber/40 transition-all duration-300 group cursor-pointer relative'
                                                        >
                                                            {/* Circular App Badge - Center placed at top-right of outside card div */}
                                                            <div className='absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 z-30 w-13 h-13 rounded-full bg-amber/80 text-white shadow-xl border-2 border-white dark:border-[#060e32] flex flex-col items-center justify-center font-extrabold text-[10px] uppercase tracking-tight leading-none group-hover:scale-110 transition-transform duration-300'>
                                                                <span>APP</span>
                                                                <span className='text-[20px] font-black text-white mt-0.5'>
                                                                    0{index + 1}
                                                                </span>
                                                            </div>

                                                            <div className='absolute -right-16 -top-16 w-32 h-32 bg-amber/5 rounded-full blur-2xl group-hover:bg-amber/15 transition-all duration-500 overflow-hidden' />

                                                            <div className='flex flex-col gap-4 z-10'>
                                                                {/* Visual Preview Container */}
                                                                <div className='relative w-full h-52 rounded-xl overflow-hidden bg-texture-navy/5 border border-border/50 group-hover:border-amber/30 transition-colors'>
                                                                    {imagePath &&
                                                                    imagePath !==
                                                                        'payment-flow-animation' ? (
                                                                        <Image
                                                                            src={
                                                                                imagePath
                                                                            }
                                                                            alt={
                                                                                feature.title
                                                                            }
                                                                            fill
                                                                            priority={
                                                                                index ===
                                                                                0
                                                                            }
                                                                            className='object-cover group-hover:scale-105 transition-transform duration-500'
                                                                        />
                                                                    ) : (
                                                                        /* App 3 Payment Software Visual Mockup */
                                                                        <div className='relative w-full h-full bg-texture-navy p-5 flex flex-col justify-between text-white overflow-hidden'>
                                                                            <div className='absolute -right-12 -bottom-12 w-40 h-40 bg-amber/20 rounded-full blur-2xl' />
                                                                            <div className='flex items-center justify-between border-b border-white/10 pb-2.5'>
                                                                                <span className='text-[11px] font-bold text-amber uppercase tracking-wider flex items-center gap-1.5'>
                                                                                    <CreditCard className='h-3.5 w-3.5' />{' '}
                                                                                    SEPA
                                                                                    Incasso
                                                                                    &
                                                                                    Banking
                                                                                </span>
                                                                                <span className='bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase'>
                                                                                    Realtime
                                                                                    Sync
                                                                                </span>
                                                                            </div>
                                                                            <div className='flex flex-col gap-2.5 my-1'>
                                                                                <div className='flex justify-between items-center bg-white/5 p-2 rounded-lg border border-white/10 text-xs'>
                                                                                    <span className='text-white/80 font-medium'>
                                                                                        Huurincasso
                                                                                        SEPA
                                                                                        Batch
                                                                                    </span>
                                                                                    <span className='font-bold text-emerald-400'>
                                                                                        €
                                                                                        142.500,-
                                                                                    </span>
                                                                                </div>
                                                                                <div className='flex justify-between items-center bg-white/5 p-2 rounded-lg border border-white/10 text-xs'>
                                                                                    <span className='text-white/80 font-medium'>
                                                                                        Automatisch
                                                                                        Afletteren
                                                                                    </span>
                                                                                    <span className='font-bold text-amber'>
                                                                                        100%
                                                                                        Match
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            <div className='text-[9px] text-white/50 italic'>
                                                                                Directe
                                                                                PSD2
                                                                                bankkoppeling
                                                                                met
                                                                                Business
                                                                                Central
                                                                                grootboek.
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                <h3 className='text-xl font-bold text-amber tracking-tight group-hover:text-foreground transition-colors'>
                                                                    {
                                                                        feature.title
                                                                    }
                                                                </h3>
                                                                <p className='text-sm text-muted-foreground leading-relaxed font-light'>
                                                                    {
                                                                        feature.description
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    );
                                                },
                                            )}
                                    </div>
                                </div>
                            </section>
                        );
                    }
                    case 'integrationsList': {
                        const sectionTag =
                            block.sectionTag || 'ERP INTEGRATIE';
                        const sectionTitle =
                            block.sectionTitle ||
                            'De directe koppeling met Microsoft Dynamics 365 Business Central';
                        const sectionSubtitle =
                            block.sectionSubtitle ||
                            'Veel platformen beloven een koppeling, maar Emlinked werkt native binnen uw ERP-omgeving. Dit betekent: geen handmatige exports, geen gecompliceerde API-fouten en absolute data-integriteit. Elke operationele mutatie landt direct als gevalideerde journaalpost in uw grootboek.';
                        const integrations = block.integrations || [];

                        return (
                            <section
                                key={block._key}
                                className='px-6 py-24 bg-texture-navy text-white border-b border-white/10 relative overflow-hidden'
                            >
                                {/* Ambient Glow Orbs matching Hero */}
                                <div className='absolute -left-20 top-1/4 w-96 h-96 bg-amber/15 rounded-full blur-[120px] pointer-events-none' />
                                <div className='absolute -right-20 bottom-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none' />

                                <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-14 relative z-10'>
                                    <div className='max-w-3xl mx-auto flex flex-col gap-4 text-center'>
                                        {sectionTag && (
                                            <div className='flex justify-center mb-1'>
                                                <span className='inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/15 px-6 py-1.5 text-xs font-bold tracking-widest text-amber uppercase backdrop-blur-md'>
                                                    <span className='w-1.5 h-1.5 bg-amber rounded-full animate-ping' />
                                                    {sectionTag}
                                                </span>
                                            </div>
                                        )}
                                        <h2 className='font-display text-3xl md:text-4xl lg:text-[2.7rem]/12 font-bold tracking-tight text-white'>
                                            {sectionTitle}
                                        </h2>
                                        {sectionSubtitle && (
                                            <p className='text-white/75 leading-relaxed text-base md:text-lg font-light'>
                                                {sectionSubtitle}
                                            </p>
                                        )}
                                    </div>

                                    {/* Connected Enterprise Architecture Diagram Grid */}
                                    <div className='relative grid grid-cols-1 lg:grid-cols-3 gap-8 text-left'>
                                        {/* Horizontal Architecture Connecting Line (Desktop) */}
                                        <div className='hidden lg:block absolute top-[5.2rem] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-amber/20 via-amber/60 to-amber/20 z-0 pointer-events-none'>
                                            <div className='absolute top-1/2 left-[30%] -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-amber shadow-[0_0_10px_#f59e0b] animate-ping' />
                                            <div className='absolute top-1/2 left-[70%] -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-amber shadow-[0_0_10px_#f59e0b] animate-ping' />
                                        </div>

                                        {integrations.map(
                                            (item: any, idx: number) => {
                                                const defaultFooterSpec =
                                                    idx === 0
                                                        ? 'Direct DB Schema'
                                                        : idx === 1
                                                          ? 'Continia OCR Engine'
                                                          : 'PSD2 / ISO 20022';
                                                const defaultStatusText =
                                                    idx === 0
                                                        ? 'Core Database'
                                                        : idx === 1
                                                          ? 'Auto-Matching'
                                                          : 'Live Reconciled';
                                                const footerSpec =
                                                    item.footerSpec ||
                                                    defaultFooterSpec;
                                                const statusText =
                                                    item.statusText ||
                                                    defaultStatusText;

                                                const nodeLabel =
                                                    idx === 0
                                                        ? '2-Way Sync'
                                                        : idx === 1
                                                          ? 'Inbound Feed'
                                                          : 'Realtime Feed';

                                                return (
                                                    <div
                                                        key={item._key || idx}
                                                        className='p-8 rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-xl text-white hover:border-amber/50 hover:bg-white/[0.07] hover:shadow-[0_20px_50px_rgba(245,158,11,0.12)] transition-all duration-300 relative overflow-hidden group flex flex-col justify-between gap-6 z-10'
                                                    >
                                                        {/* Glowing background accent */}
                                                        <div className='absolute -right-16 -top-16 w-36 h-36 bg-amber/10 rounded-full blur-2xl group-hover:bg-amber/20 transition-all duration-500' />

                                                        <div className='flex flex-col gap-4 z-10'>
                                                            <div className='flex items-center justify-between'>
                                                                <div className='h-12 w-12 rounded-xl bg-amber/15 border border-amber/35 flex items-center justify-center text-amber font-bold text-lg group-hover:scale-110 transition-transform shadow-md'>
                                                                    {idx ===
                                                                    0 ? (
                                                                        <Database className='h-6 w-6' />
                                                                    ) : idx ===
                                                                      1 ? (
                                                                        <FileText className='h-6 w-6' />
                                                                    ) : (
                                                                        <Cpu className='h-6 w-6' />
                                                                    )}
                                                                </div>

                                                                {/* Dynamic Node Flow Indicator */}
                                                                <span className='text-[10px] font-bold text-amber bg-amber/10 border border-amber/30 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5'>
                                                                    {idx ===
                                                                    0 ? (
                                                                        <RefreshCw className='h-3 w-3 animate-spin-slow' />
                                                                    ) : idx ===
                                                                      1 ? (
                                                                        <ArrowDownRight className='h-3 w-3' />
                                                                    ) : (
                                                                        <Zap className='h-3 w-3 text-amber' />
                                                                    )}
                                                                    {nodeLabel}
                                                                </span>
                                                            </div>

                                                            <div className='flex flex-col gap-1 mt-2'>
                                                                {item.badge && (
                                                                    <span className='text-[10px] font-bold text-amber/90 uppercase tracking-widest'>
                                                                        {
                                                                            item.badge
                                                                        }
                                                                    </span>
                                                                )}
                                                                <h3 className='text-2xl font-bold text-white tracking-tight'>
                                                                    {item.title}
                                                                </h3>
                                                            </div>
                                                            <p className='font-normal text-white/75 leading-relaxed text-sm'>
                                                                {
                                                                    item.description
                                                                }
                                                            </p>
                                                        </div>

                                                        {/* Differentiated Technical Status Footer */}
                                                        <div className='pt-4 border-t border-white/10 flex items-center justify-between text-xs z-10'>
                                                            <span className='text-amber font-mono font-semibold tracking-wide flex items-center gap-1.5'>
                                                                <Layers className='h-3.5 w-3.5 text-amber/80' />
                                                                {footerSpec}
                                                            </span>
                                                            <span className='text-emerald-400 font-semibold text-[11px] flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-md'>
                                                                <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse' />
                                                                {statusText}
                                                            </span>
                                                        </div>
                                                    </div>
                                                );
                                            },
                                        )}
                                    </div>
                                </div>
                            </section>
                        );
                    }
                    case 'ctaBanner': {
                        const tag = block.tag || 'DIGITALISERING';
                        const title =
                            block.title ||
                            'Klaar om uw vastgoedbeheer te digitaliseren?';
                        const subtitle =
                            block.subtitle ||
                            'Sluit aan bij de professionele beheerders die handmatig werk hebben geëlimineerd en kiezen voor 100% realtime controle binnen Business Central.';
                        const buttonLabel =
                            block.buttonLabel ||
                            'Vraag een live demonstratie aan';
                        const buttonLink = block.buttonLink || '/contact';

                        return (
                            <section
                                key={block._key}
                                className='px-6 py-24 bg-background relative overflow-hidden'
                            >
                                <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8'>
                                    <div className='border border-amber/30 rounded-3xl bg-texture-navy text-white p-10 md:p-16 hover:shadow-[0_25px_60px_rgba(245,158,11,0.15)] transition-all duration-500 relative overflow-hidden group shadow-2xl backdrop-blur-xl'>
                                        {/* Ambient Glow Orbs matching Hero */}
                                        <div className='absolute -left-24 -bottom-24 w-96 h-96 bg-amber/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-amber/30 transition-all duration-700' />
                                        <div className='absolute -right-24 -top-24 w-96 h-96 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-600/25 transition-all duration-700' />

                                        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10'>
                                            <div className='lg:col-span-8 flex flex-col gap-5 text-left'>
                                                {tag && (
                                                    <span className='inline-flex items-center gap-2 self-start rounded-full bg-amber/15 border border-amber/35 px-5 py-1.5 text-xs font-bold tracking-widest text-amber uppercase backdrop-blur-md'>
                                                        <span className='w-1.5 h-1.5 bg-amber rounded-full animate-ping' />
                                                        {tag}
                                                    </span>
                                                )}
                                                <h2 className='font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight'>
                                                    {title}
                                                </h2>
                                                <p className='text-white/80 leading-relaxed font-light text-base md:text-lg max-w-2xl'>
                                                    {subtitle}
                                                </p>
                                            </div>
                                            {buttonLabel && buttonLink && (
                                                <div className='lg:col-span-4 flex justify-start lg:justify-end'>
                                                    <GlowingLink
                                                        href={getPath(
                                                            buttonLink,
                                                        )}
                                                        className='h-14 px-9 text-base w-full lg:w-auto font-bold shadow-xl hover:shadow-amber/30'
                                                    >
                                                        {buttonLabel}
                                                    </GlowingLink>
                                                </div>
                                            )}
                                        </div>
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
