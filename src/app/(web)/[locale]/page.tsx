import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GlowingLink } from '@/components/ui/GlowingButton';
import { client } from '@/sanity/client';
import { getImageUrl } from '@/sanity/image';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    AiSecurity01Icon,
    CheckmarkBadge03Icon,
    StarAward01Icon,
} from '@hugeicons/core-free-icons';
import {
    AlertCircle,
    Info,
    FileText,
    Cpu,
    Database,
    CheckCircle2,
    CreditCard,
    RefreshCw,
    Zap,
    ArrowDownRight,
    ArrowRight,
    Layers,
} from 'lucide-react';
import { Metadata } from 'next';
import { HeroSection } from '@/components/blocks/HeroSection';
import { Box3EcosystemSection } from '@/components/blocks/box3/Box3EcosystemSection';
import { Box3SolutionWorkflow } from '@/components/blocks/box3/Box3SolutionWorkflow';
import { TestimonialSlider } from '@/components/TestimonialSlider';
import { TeamBlock } from '@/components/blocks/TeamBlock';

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
            `*[_type == "page" && (slug.current == "home" || slug.current == "/" || slug.current == "/en/" || slug.current == "/en") && language == $locale][0].seo {
                seoTitle,
                seoDescription,
                canonical,
                noIndex
            }`,
            { locale },
            { cache: 'no-store' },
        );
    } catch (e) {
        console.error('Error fetching homepage metadata from Sanity:', e);
    }

    const title =
        seoData?.seoTitle ||
        (isEn
            ? 'emlinked — Professional Real Estate Management for Box 3 & Microsoft BC'
            : 'emlinked — Professionele Vastgoedbeheer Software voor Box 3 & Microsoft BC');

    const description =
        seoData?.seoDescription ||
        (isEn
            ? 'Manage your real estate portfolio natively inside Microsoft Dynamics 365 Business Central. No manual exports, automated CPI indexation and bank reconciliation.'
            : 'Beheer uw vastgoedportefeuille native binnen Microsoft Dynamics 365 Business Central. Geen handmatige exports, wel geautomatiseerde CPI-indexaties en aflettering.');

    const robots = seoData?.noIndex ? 'noindex, nofollow' : 'index, follow';

    return {
        title: {
            absolute: title,
        },
        description,
        robots,
        alternates: {
            canonical: seoData?.canonical || (isEn ? '/en' : '/'),
        },
    };
}

// GROQ query to retrieve the homepage document by slug or ID
async function getHomepageData(locale: string) {
    try {
        const pageId = locale === 'en' ? 'page-home-en' : 'page-home-nl';
        return await client.fetch(
            `*[_type == "page" && (_id == $pageId || slug.current == "home" || slug.current == "/" || slug.current == "/en/" || slug.current == "/en") && language == $locale][0] {
                title,
                pageBlocks[] {
                    ...,
                    _type,
                    _key,
                    image {
                        asset-> {
                            _id,
                            url
                        }
                    },
                    heroImage {
                        asset-> {
                            _id,
                            url
                        }
                    },
                    photo {
                        asset-> {
                            _id,
                            url
                        }
                    },
                    logo {
                        asset-> {
                            _id,
                            url
                        }
                    },
                    items[] {
                        ...,
                        image { asset-> { _id, url } },
                        logo { asset-> { _id, url } },
                        photo { asset-> { _id, url } }
                    },
                    features[] {
                        ...,
                        image { asset-> { _id, url } }
                    },
                    integrations[] {
                        ...
                    },
                    members[] {
                        ...,
                        photo { asset-> { _id, url } }
                    }
                },
                seo {
                    structuredData
                }
            }`,
            { pageId, locale },
            { cache: 'no-store' },
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

export default async function HomePage({ params }: HomePageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getHomepageData(locale);
    console.log(
        '🔍 [HomePage Debug] locale:',
        locale,
        'fetched document _id:',
        pageData?._id,
        'title:',
        pageData?.title,
        'blocks count:',
        pageData?.pageBlocks?.length,
    );

    const getPath = (path: string) => {
        if (locale === 'nl') return path;
        return `/en${path === '/' ? '' : path}`;
    };

    // Extract dynamic blocks 100% from Sanity CMS
    const blocks = pageData?.pageBlocks || [];

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
                                title={
                                    block.title ||
                                    (isEn
                                        ? 'Your real estate portfolio always *automatically* tax & audit ready'
                                        : 'Uw vastgoedportefeuille altijd *automatisch* aangifte-klaar')
                                }
                                titleClassName='text-3xl sm:text-4xl lg:text-[2.75rem]'
                                subtitle={block.subtitle}
                                ctaLabel={
                                    block.ctaLabel ||
                                    (isEn
                                        ? 'Request Free Demo'
                                        : 'Gratis Demo Aanvragen')
                                }
                                ctaLink={block.ctaLink || '/contact'}
                                secondaryCtaLabel={block.secondaryCtaLabel}
                                secondaryCtaLink={block.secondaryCtaLink}
                                showProof={block.showProof ?? true}
                                proofText={block.proofText}
                                imagePath={
                                    getImageUrl(block.image || block.heroImage, block.imagePath) ||
                                    '/hero/vastgoedportfeuille_aangifte-klaar.jpg'
                                }
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
                                className='bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] animate-none dark:text-[#060e32] dark:bg-navy-dark border-b border-gray-200 dark:border-white/5 py-3 px-4 sm:px-6 lg:px-8 shadow-sm'
                            >
                                <div className='max-w-7xl mx-auto flex items-center justify-center gap-6 sm:gap-9 flex-wrap'>
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
                                    className='px-4 sm:px-6 lg:px-8 py-10 md:py-16 lg:py-20 bg-background border-b border-slate-300 relative overflow-hidden'
                                >
                                    <div className='mx-auto max-w-7xl relative z-10'>
                                        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
                                            {/* Left Column: Text, Bullets, CTA */}
                                            <div className='lg:col-span-7 flex flex-col gap-6 text-left'>
                                                {sectionTag && (
                                                    <span className='inline-flex items-center gap-2 self-start rounded-full bg-amber/15 border border-amber/40 px-4.5 py-1.5 text-xs font-mono font-bold tracking-wider text-amber uppercase backdrop-blur-md shadow-xs'>
                                                        <span className='w-2 h-2 rounded-full bg-amber shrink-0' />
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
                                                            '/box3-check',
                                                        )}
                                                        className='h-13 px-8  inline-flex '
                                                    >
                                                        {isEn
                                                            ? 'Start free Box 3 check ⚡'
                                                            : 'Start de gratis Box 3-check ⚡'}
                                                    </GlowingLink>
                                                </div>
                                            </div>

                                            {/* Right Column: Fiscale Optimalisatie Illustration Image (Calculator Widget commented out below) */}
                                            <div className='lg:col-span-5 flex justify-center items-center'>
                                                <div className='relative w-full max-w-md max-h-[650px] rounded-2xl overflow-hidden group flex items-center justify-center'>
                                                    <Image
                                                        src='/emlinked/home/zekerheid-over-je-vastgoedportefeuille.jpg'
                                                        alt={sectionTitle}
                                                        width={800}
                                                        height={1000}
                                                        className='w-full max-h-[700px] object-cover object-bottom rounded-2xl group-hover:scale-105 transition-transform duration-500'
                                                        priority
                                                    />
                                                </div>
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
                                className='px-6 py-20 bg-card border-b border-black/20'
                            >
                                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-12'>
                                    <div className='max-w-3xl mx-auto flex flex-col gap-3 text-center'>
                                        {sectionTag && (
                                            <div className='flex justify-center mb-1'>
                                                <span className='inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/15 px-5 py-1.5 text-xs font-mono font-bold tracking-wider text-amber uppercase backdrop-blur-md shadow-xs'>
                                                    <span className='w-2 h-2 rounded-full bg-amber shrink-0' />
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

                                                    const appUrls = [
                                                        '/apps/vastgoedbeheer-software',
                                                        '/apps/huurdersportaal',
                                                        '/apps/payment-software',
                                                    ];
                                                    const appUrl = getPath(
                                                        feature.ctaLink &&
                                                            feature.ctaLink.startsWith(
                                                                '/',
                                                            )
                                                            ? feature.ctaLink
                                                            : appUrls[index] ||
                                                                  '/apps',
                                                    );

                                                    let rawTag =
                                                        feature.bullets?.[0] ||
                                                        '';
                                                    if (
                                                        !rawTag ||
                                                        rawTag ===
                                                            'trending-up' ||
                                                        rawTag ===
                                                            'file-text' ||
                                                        rawTag === 'cpu'
                                                    ) {
                                                        if (index === 0)
                                                            rawTag =
                                                                'Core SaaS Module';
                                                        if (index === 1)
                                                            rawTag =
                                                                'Self-service module';
                                                        if (index === 2)
                                                            rawTag =
                                                                'Primary operational module';
                                                    }
                                                    const tagText = rawTag
                                                        .replace(/\)$/, '')
                                                        .trim();

                                                    return (
                                                        <div
                                                            key={
                                                                feature._key ||
                                                                index
                                                            }
                                                            className='px-6 md:px-8 pt-6 md:pt-8 md:pb-6 pb-5 rounded-2xl border border-black/20 bg-background flex flex-col justify-between gap-3.5 hover:shadow-xl hover:-translate-y-1.5 hover:border-amber/40 transition-all duration-300 group relative'
                                                        >
                                                            {/* Whole-card overlay link for optimal UX */}
                                                            <Link
                                                                href={appUrl}
                                                                className='absolute inset-0 z-20'
                                                                aria-label={
                                                                    feature.title
                                                                }
                                                            />

                                                            {/* Circular App Badge - Center placed at top-right of outside card div */}
                                                            <div className='absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 z-30 w-13 h-13 rounded-full bg-amber/80 text-white shadow-xl border-2 border-white dark:border-[#060e32] flex flex-col items-center justify-center font-extrabold text-[10px] uppercase tracking-tight leading-none group-hover:scale-110 transition-transform duration-300 pointer-events-none'>
                                                                <span>APP</span>
                                                                <span className='text-[20px] font-black text-white mt-0.5'>
                                                                    0{index + 1}
                                                                </span>
                                                            </div>

                                                            <div className='absolute -right-16 -top-16 w-32 h-32 bg-amber/5 rounded-full blur-2xl group-hover:bg-amber/15 transition-all duration-500 overflow-hidden pointer-events-none' />

                                                            <div className='flex flex-col gap-4 z-10 pointer-events-none'>
                                                                {/* Visual Preview Container */}
                                                                <div className='relative w-full h-52 rounded-xl overflow-hidden bg-texture-navy/5 border border-black/20/50 group-hover:border-amber/30 transition-colors'>
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
                                                                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
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

                                                                {/* App Card Title (Placed AFTER the Image Container) */}
                                                                <div className='flex items-center gap-3 mt-1'>
                                                                    <h3 className='text-xl font-bold text-[#060e32] dark:text-white group-hover:text-amber transition-colors'>
                                                                        {
                                                                            feature.title
                                                                        }
                                                                    </h3>
                                                                </div>

                                                                <p className='text-sm text-muted-foreground leading-relaxed font-light'>
                                                                    {
                                                                        feature.description
                                                                    }
                                                                </p>
                                                            </div>

                                                            {/* Single-Line Card Footer: Tag (Left) + Action Link (Right) */}
                                                            <div className='pt-2 border-t border-black/20/40 flex items-center justify-between gap-4 z-30 mt-auto pointer-events-none'>
                                                                <div className='flex items-center gap-2 text-xs font-medium text-muted-foreground truncate'>
                                                                    <CheckCircle2 className='w-3.5 h-3.5 text-amber shrink-0' />
                                                                    <span className='truncate'>
                                                                        {
                                                                            tagText
                                                                        }
                                                                    </span>
                                                                </div>

                                                                <div className='inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber group-hover:text-foreground group-hover:translate-x-0.5 transition-all duration-200 shrink-0'>
                                                                    <span>
                                                                        {feature.ctaLabel &&
                                                                        feature.ctaLabel.trim()
                                                                            ? feature.ctaLabel.trim()
                                                                            : isEn
                                                                              ? 'View module'
                                                                              : 'Bekijk module'}
                                                                    </span>
                                                                    <ArrowRight className='w-3.5 h-3.5' />
                                                                </div>
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
                            block.sectionTag ||
                            (isEn ? 'ERP INTEGRATION' : 'ERP INTEGRATIE');
                        const sectionTitle =
                            block.sectionTitle ||
                            (isEn
                                ? 'Native connection with Microsoft Dynamics 365 Business Central'
                                : 'De directe koppeling met Microsoft Dynamics 365 Business Central');
                        const sectionSubtitle =
                            block.sectionSubtitle ||
                            (isEn
                                ? 'Many platforms promise an integration, but emlinked runs natively inside your ERP environment. That means zero manual CSV exports, no complex API sync errors, and absolute data integrity. Every operational entry lands directly as a validated journal post in your ledger.'
                                : 'Veel platformen beloven een koppeling, maar emlinked werkt native binnen uw ERP-omgeving. Dit betekent: geen handmatige exports, geen gecompliceerde API-fouten en absolute data-integriteit. Elke operationele mutatie landt direct als gevalideerde journaalpost in uw grootboek.');
                        const integrations = block.integrations || [];

                        return (
                            <section
                                key={block._key}
                                className='px-6 py-24 bg-texture-navy text-white border-b border-white/10 relative overflow-hidden'
                            >
                                <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-14 relative z-10'>
                                    <div className='max-w-3xl mx-auto flex flex-col gap-4 text-center'>
                                        {sectionTag && (
                                            <div className='flex justify-center mb-1'>
                                                <span className='inline-flex items-center justify-center rounded-full border border-amber/50 bg-[#251b14]/90 px-6 py-1.5 text-xs font-mono font-bold tracking-widest text-amber uppercase backdrop-blur-md shadow-md'>
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
                                        <div className='hidden lg:block absolute top-[5.2rem] left-[15%] right-[15%] h-[2px] bg-linear-to-r from-amber/20 via-amber/60 to-amber/20 z-0 pointer-events-none'>
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
                                                        className='p-8 rounded-2xl border border-white/15 bg-white/4 backdrop-blur-xl text-white hover:border-amber/50 hover:bg-white/[0.07] hover:shadow-[0_20px_50px_rgba(245,158,11,0.12)] transition-all duration-300 relative overflow-hidden group flex flex-col justify-between gap-6 z-10'
                                                    >
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
                        const tag =
                            block.tag ||
                            (isEn ? 'DIGITALIZATION' : 'DIGITALISERING');
                        const title =
                            block.title ||
                            (isEn
                                ? 'Ready to digitize your property management?'
                                : 'Klaar om uw vastgoedbeheer te digitaliseren?');
                        const subtitle =
                            block.subtitle ||
                            (isEn
                                ? 'Join leading property managers who eliminated manual tasks and chose 100% real-time control within Business Central.'
                                : 'Sluit aan bij de professionele beheerders die handmatig werk hebben geëlimineerd en kiezen voor 100% realtime controle binnen Business Central.');
                        const buttonLabel =
                            block.buttonLabel ||
                            (isEn
                                ? 'Request a free demo'
                                : 'Vraag een live demonstratie aan');
                        const buttonLink = block.buttonLink || '/contact';

                        return (
                            <section
                                key={block._key}
                                className='px-6 py-24 bg-background relative overflow-hidden'
                            >
                                <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8'>
                                    <div className='border border-amber/30 rounded-3xl bg-texture-navy text-white p-10 md:p-16 hover:shadow-[0_25px_60px_rgba(245,158,11,0.15)] transition-all duration-500 relative overflow-hidden group shadow-2xl backdrop-blur-xl'>
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
                                                {buttonLabel && buttonLink && (
                                                    <GlowingLink
                                                        href={getPath(
                                                            buttonLink,
                                                        )}
                                                        className='h-14 px-12 text-base mr-auto font-bold shadow-xl hover:shadow-amber/30'
                                                    >
                                                        {buttonLabel}
                                                    </GlowingLink>
                                                )}
                                            </div>
                                            <div className='lg:col-span-4 flex justify-start lg:justify-end'>
                                                <Image
                                                    src='/emlinked/home/Vastgoedbeheer_automatiseren.jpg'
                                                    alt={block.title}
                                                    width={700}
                                                    height={500}
                                                    className='w-full h-[350px] max-h-[350px] object-cover object-center rounded-2xl group-hover:scale-105 transition-transform duration-500 shadow-xl'
                                                    priority
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        );
                    }
                    case 'ecosystemSection':
                    case 'ecosystem': {
                        return (
                            <Box3EcosystemSection
                                key={block._key}
                                isEn={isEn}
                                badge={block.badge}
                                title={block.title}
                                subtitle={block.subtitle}
                                cardTitle={block.cardTitle}
                                cardSubtitle={block.cardSubtitle}
                                cardPoints={block.cardPoints}
                                trustItems={block.trustItems}
                            />
                        );
                    }
                    case 'workflow':
                    case 'workflowBlock': {
                        return (
                            <Box3SolutionWorkflow
                                key={block._key}
                                workflowBadge={block.badge}
                                workflowTitle={block.title}
                                workflowItems={block.items}
                                isEn={isEn}
                            />
                        );
                    }
                    case 'testimonialSection':
                    case 'testimonial': {
                        return (
                            <TestimonialSlider
                                key={block._key}
                                title={block.title || block.sectionTitle}
                                subtitle={block.subtitle || block.sectionSubtitle}
                            />
                        );
                    }
                    case 'teamBlock':
                    case 'team': {
                        return (
                            <TeamBlock
                                key={block._key}
                                sectionTitle={block.title || block.sectionTitle}
                                sectionSubtitle={block.subtitle || block.sectionSubtitle}
                                members={block.members}
                                locale={locale}
                            />
                        );
                    }
                    default:
                        return null;
                }
            })}
        </div>
    );
}
