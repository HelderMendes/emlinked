import React from 'react';
import Link from 'next/link';
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
    BarChart3 
} from 'lucide-react';
import { Metadata } from 'next';

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
            `*[_type == "page" && slug.current == "home" && language == $locale][0].seo {
                seoTitle,
                seoDescription,
                canonical,
                noIndex
            }`,
            { locale }
        );
    } catch (e) {
        console.error('Error fetching homepage metadata from Sanity:', e);
    }

    const title = seoData?.seoTitle || (isEn
        ? 'Property Management Software for Professional Portfolios | Emlinked'
        : 'Vastgoedbeheer Software voor Professionele Portefeuilles | Emlinked');

    const description = seoData?.seoDescription || (isEn
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
            `*[_type == "page" && slug.current == "home" && language == $locale][0] {
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
            { locale }
        );
    } catch (e) {
        console.error('Error fetching homepage data from Sanity:', e);
        return null;
    }
}

function getTrustIcon(iconName: string) {
    switch (iconName?.toLowerCase()) {
        case 'check':
            return <Check className="h-5 w-5 text-amber flex-shrink-0" />;
        case 'shield':
            return <Shield className="h-5 w-5 text-amber flex-shrink-0" />;
        case 'star':
            return <Star className="h-5 w-5 text-amber fill-amber flex-shrink-0" />;
        case 'warn':
        case 'alert':
            return <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />;
        default:
            return <Info className="h-5 w-5 text-amber flex-shrink-0" />;
    }
}

function getIcon(iconName: string) {
    switch (iconName?.toLowerCase()) {
        case 'check':
            return <Check className="h-6 w-6" />;
        case 'shield':
            return <Shield className="h-6 w-6" />;
        case 'star':
            return <Star className="h-6 w-6" />;
        case 'trending-up':
            return <TrendingUp className="h-6 w-6" />;
        case 'file-text':
            return <FileText className="h-6 w-6" />;
        case 'cpu':
            return <Cpu className="h-6 w-6" />;
        case 'calendar':
            return <Calendar className="h-6 w-6" />;
        case 'database':
            return <Database className="h-6 w-6" />;
        case 'bar-chart-3':
            return <BarChart3 className="h-6 w-6" />;
        default:
            return <Info className="h-6 w-6" />;
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
                <span key={index} className="text-transparent bg-clip-text bg-gradient-to-r from-amber to-amber-light font-extrabold tracking-tight">
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
            label: isEn ? 'DE STANDAARD VOOR MODERN VASTGOEDBEHEER' : 'DE STANDAARD VOOR MODERN VASTGOEDBEHEER',
            title: isEn ? 'Uw vastgoedportefeuille altijd automatisch aangifte-klaar' : 'Je vastgoedportefeuille altijd *automatisch* aangifte-klaar',
            subtitle: isEn 
                ? 'Emlinked is the first fully integrated platform for commercial and mixed-use real estate management. Natively synced with Microsoft Dynamics 365 Business Central.'
                : 'Beheer huurcontracten, kosten en de volledige financiële administratie in één centraal systeem. Volledig voorbereid op de Box 3-aangifte en gebouwd op het betrouwbare fundament van Microsoft Dynamics 365 Business Central.',
            ctaLabel: isEn ? 'Request Free Demo' : 'Gratis Demo Aanvragen',
            ctaLink: '/contact',
            secondaryCtaLabel: isEn ? 'Calculate Box 3' : 'Bereken je Box 3 voordeel',
            secondaryCtaLink: '/kennisbank/box3-check',
            showProof: true,
            proofText: isEn ? 'Trusted by professional real estate managers' : 'Vertrouwd door professionele vastgoedbeheerders',
            cardTitle: 'LIVE PORTFOLIO METRICS',
            cardStats: [
                { _key: 's1', label: isEn ? 'Rent Flow Indexed' : 'Huurstromen Geïndexeerd', value: '100%', badgeText: 'Automatisch', badgeType: 'good' },
                { _key: 's2', label: isEn ? 'Active Contracts' : 'Actief beheer', value: '1.240+', badgeText: 'Microsoft BC', badgeType: 'blue' },
                { _key: 's3', label: isEn ? 'Box 3 Status' : 'Box 3 Status', value: 'Gereed', badgeText: 'Belastingdienst-proof', badgeType: 'warn' }
            ]
        },
        {
            _type: 'trustBar',
            _key: 'fallback-trustbar',
            items: [
                { _key: 't1', text: '100% Box 3 Compliant', icon: 'shield' },
                { _key: 't2', text: 'Gecertificeerde Microsoft BC Koppeling', icon: 'check' },
                { _key: 't3', text: 'ISAE 3402 Type II Gecertificeerd', icon: 'star' }
            ]
        }
    ];

    const structuredData = pageData?.seo?.structuredData;

    return (
        <div className='flex flex-col min-h-screen'>
            {structuredData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: structuredData }}
                />
            )}
            {blocks.map((block: any) => {
                switch (block._type) {
                    case 'hero': {
                        const heroLabel = block.label || 'DE STANDAARD VOOR MODERN VASTGOEDBEHEER';
                        const heroTitle = block.title || 'Uw vastgoedportefeuille altijd *automatisch* aangifte-klaar';
                        const heroSubtitle = block.subtitle || '';
                        const primaryCtaLabel = block.ctaLabel || 'Gratis Demo Aanvragen';
                        const primaryCtaLink = block.ctaLink || '/contact';
                        const secondaryCtaLabel = block.secondaryCtaLabel || '';
                        const secondaryCtaLink = block.secondaryCtaLink || '';
                        const showProof = block.showProof ?? true;
                        const proofText = block.proofText || '';
                        const cardTitle = block.cardTitle || 'LIVE PORTFOLIO METRICS';
                        const cardStats = block.cardStats || [];

                        return (
                            <section key={block._key} className='relative px-6 py-20 md:py-32 overflow-hidden bg-gradient-to-br from-[#030616] via-[#091236] to-[#01020a] animate-hero-gradient text-white dark:bg-gradient-to-br dark:from-[#FFFBEF] dark:via-[#FFFDF9] dark:to-[#FFF3D4] dark:animate-none dark:text-[#060e32] border-b border-white/10 dark:border-amber/10 transition-colors duration-300'>
                                {/* Ambient Background Glow */}
                                <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber/5 rounded-full blur-[120px] pointer-events-none animate-float-glow' />

                                {/* Visual Watermarks */}
                                <div className='absolute right-[-60px] top-[-60px] w-[520px] h-auto opacity-[0.06] dark:opacity-[0.03] pointer-events-none select-none text-white dark:text-[#060e32] font-display text-[300px] leading-none font-bold'>
                                    EM
                                </div>
                                <div className='absolute left-[-30px] bottom-[-40px] w-[260px] h-auto opacity-[0.04] dark:opacity-[0.02] pointer-events-none select-none text-amber font-display text-[150px] leading-none font-bold'>
                                    EM
                                </div>

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
                                                    href={getPath(primaryCtaLink)}
                                                    className="inline-flex h-12 items-center justify-center rounded-md bg-amber hover:bg-amber-hover px-6 text-sm font-semibold text-white transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                                                >
                                                    {primaryCtaLabel}
                                                </Link>
                                                {secondaryCtaLabel && secondaryCtaLink && (
                                                    <Link href={getPath(secondaryCtaLink)} className='inline-flex h-12 items-center justify-center rounded-md border border-white/20 dark:border-[#060e32]/20 bg-transparent px-6 text-sm font-semibold text-white dark:text-[#060e32] hover:bg-white/10 dark:hover:bg-[#060e32]/5 transition-all text-center shadow-sm hover:scale-[1.02] active:scale-[0.98] duration-200'>
                                                        {secondaryCtaLabel}
                                                    </Link>
                                                )}
                                            </div>

                                            {showProof && (
                                                <div className='flex items-center gap-4 pt-6 border-t border-white/10 dark:border-[#060e32]/10 mt-2'>
                                                    <div className='flex -space-x-2'>
                                                        <span className='w-8 h-8 rounded-full border-2 border-navy dark:border-[#FFFBEF] bg-amber flex items-center justify-center text-[10px] font-bold text-navy'>HM</span>
                                                        <span className='w-8 h-8 rounded-full border-2 border-navy dark:border-[#FFFBEF] bg-navy-mid flex items-center justify-center text-[10px] font-bold text-amber'>ML</span>
                                                        <span className='w-8 h-8 rounded-full border-2 border-navy dark:border-[#FFFBEF] bg-amber-light flex items-center justify-center text-[10px] font-bold text-navy'>EM</span>
                                                    </div>
                                                    <span className='text-xs text-white/55 dark:text-[#060e32]/60 font-light'>
                                                        {proofText}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Right Column */}
                                        <div className='lg:col-span-5 hover:scale-[1.01] transition-transform duration-300'>
                                            <div className='bg-white/[0.03] dark:bg-white/80 border border-white/10 dark:border-[#060e32]/10 rounded-2xl p-7 backdrop-blur-md relative overflow-hidden shadow-2xl dark:shadow-xl hover:shadow-2xl dark:hover:border-[#060e32]/20 transition-all duration-300'>
                                                <div className='absolute right-[-20px] top-[-20px] w-28 h-28 opacity-[0.03] dark:opacity-[0.02] pointer-events-none select-none text-white dark:text-[#060e32] font-bold text-8xl'>
                                                    EM
                                                </div>
                                                <div className="flex items-center gap-2 mb-4">
                                                    <h3 className='text-xs font-semibold text-white/40 dark:text-[#060e32]/45 uppercase tracking-widest'>
                                                        {cardTitle}
                                                    </h3>
                                                    <span className="flex h-2 w-2 relative">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                                    </span>
                                                </div>
                                                <div className='flex flex-col gap-1'>
                                                    {cardStats.map((stat: any) => {
                                                        let badgeClass = 'bg-white/10 text-white/70 dark:bg-[#060e32]/5 dark:text-[#060e32]/80';
                                                        if (stat.badgeType === 'good') {
                                                            badgeClass = 'bg-amber/20 text-amber dark:bg-amber/10 dark:text-amber-hover';
                                                        } else if (stat.badgeType === 'warn') {
                                                            badgeClass = 'bg-red-600/20 text-red-300 dark:text-red-600';
                                                        } else if (stat.badgeType === 'blue') {
                                                            badgeClass = 'bg-blue-500/20 text-blue-300 dark:text-blue-600';
                                                        }
                                                        return (
                                                            <div key={stat._key} className='flex justify-between items-center py-3 border-b border-white/5 dark:border-[#060e32]/5 last:border-b-0'>
                                                                <span className='text-sm text-white/50 dark:text-[#060e32]/55'>{stat.label}</span>
                                                                <div className='flex items-center gap-2.5'>
                                                                    <span className='text-sm font-medium text-white dark:text-[#060e32]'>{stat.value}</span>
                                                                    {stat.badgeText && (
                                                                        <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${badgeClass}`}>
                                                                            {stat.badgeText}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                
                                                {/* Mini Sparkline SVG Chart */}
                                                <div className='mt-6 rounded-xl border border-white/5 dark:border-[#060e32]/5 p-4 bg-white/[0.01] dark:bg-[#060e32]/5 flex flex-col gap-2'>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-[10px] text-white/40 dark:text-[#060e32]/45 uppercase tracking-wider font-semibold">
                                                            {locale === 'en' ? 'Rent index trend' : 'Huurindex trend'}
                                                        </span>
                                                        <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-0.5">
                                                            +3.4% {locale === 'en' ? 'this month' : 'deze maand'}
                                                        </span>
                                                    </div>
                                                    <div className="h-16 w-full flex items-end">
                                                        <svg className="w-full h-full text-amber stroke-[2]" viewBox="0 0 100 30" preserveAspectRatio="none">
                                                            <defs>
                                                                <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="0%" stopColor="#FE9400" stopOpacity="0.25"/>
                                                                    <stop offset="100%" stopColor="#FE9400" stopOpacity="0"/>
                                                                </linearGradient>
                                                            </defs>
                                                            <path 
                                                                d="M0,25 Q15,10 30,20 T60,5 T90,8 L100,12" 
                                                                fill="none" 
                                                                stroke="currentColor" 
                                                                className="text-amber"
                                                            />
                                                            <path 
                                                                d="M0,25 Q15,10 30,20 T60,5 T90,8 L100,12 L100,30 L0,30 Z" 
                                                                fill="url(#chart-glow)"
                                                                stroke="none"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        );
                    }
                    case 'trustBar': {
                        const items = block.items || [];
                        return (
                            <section key={block._key} className='bg-white dark:bg-navy-dark border-b border-gray-200 dark:border-white/5 py-4 px-6 md:px-10 shadow-sm'>
                                <div className='max-w-8xl mx-auto flex items-center justify-center gap-9 flex-wrap'>
                                    {items.map((item: any) => (
                                        <div key={item._key} className='flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-white/75 hover:text-amber dark:hover:text-amber transition-colors'>
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
                            <section key={block._key} className='px-6 py-20 bg-card border-b border-border'>
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
                                            <div key={feature._key} className='p-8 rounded-2xl border border-border bg-background flex flex-col gap-4 hover:shadow-2xl hover:-translate-y-2 hover:border-amber/30 transition-all duration-300 group cursor-pointer relative overflow-hidden'>
                                                {/* Card Corner Glow */}
                                                <div className="absolute -right-16 -top-16 w-32 h-32 bg-amber/5 rounded-full blur-2xl group-hover:bg-amber/15 transition-all duration-500" />
                                                
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
                            <section key={block._key} className='px-6 py-20 bg-background'>
                                <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 border border-border/80 rounded-2xl bg-card p-8 md:p-12 hover:shadow-xl transition-all duration-300 relative overflow-hidden group'>
                                    {/* Ambient Glow Blob */}
                                    <div className='absolute -left-20 -bottom-20 w-80 h-80 bg-amber/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-amber/15 transition-all duration-500' />
                                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'>
                                        <div className='lg:col-span-8 flex flex-col gap-4 text-left'>
                                            <span className='text-xs font-semibold text-primary uppercase tracking-widest'>
                                                {locale === 'en' ? 'Product Focus' : 'Platform Focus'}
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
                                                <GlowingLink href={getPath(buttonLink)} className="h-12 text-sm w-full lg:w-auto">
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
