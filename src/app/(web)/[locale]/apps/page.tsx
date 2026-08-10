// Force Next.js HMR recompile for metadata
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { sanityFetch } from '@/lib/sanity';
import { HeroSection } from '@/components/blocks/HeroSection';
import { AppsArchitectureSection } from '@/components/blocks/AppsArchitectureSection';
import { TestimonialSlider } from '@/components/TestimonialSlider';
import { GlowingLink } from '@/components/ui/GlowingButton';

import { buildMetadata, DEFAULT_DOMAIN } from '@/lib/seo';

interface AppsPageProps {
    params: Promise<{ locale: string }>;
}

async function getSanityPageData(locale: string) {
    try {
        return await sanityFetch<any>({
            query: `*[_type == "page" && (_id == "page-apps-" + $locale || slug.current == "apps" || slug.current == "/apps") && language == $locale][0] {
                title,
                pageBlocks[] {
                    ...,
                    _type,
                    _key,
                    features[] {
                        ...,
                        bullets
                    }
                },
                seo {
                    seoTitle,
                    seoDescription,
                    canonical,
                    ogImage { asset-> { url } },
                    noIndex
                }
            }`,
            params: { locale },
        });
    } catch (e) {
        console.error('Failed to fetch apps page from Sanity:', e);
        return null;
    }
}

export async function generateMetadata({
    params,
}: AppsPageProps): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getSanityPageData(locale);

    const fallbackTitle = isEn
        ? 'emlinked Modular Property Software Suite'
        : 'emlinked Modulaire Vastgoed Software Suite';
    const fallbackDesc = isEn
        ? 'Explore the modular ERP software suite for Microsoft Dynamics 365 Business Central.'
        : 'Ontdek de modulaire ERP software suite voor Microsoft Dynamics 365 Business Central.';
    const canonicalUrl = `${DEFAULT_DOMAIN}${isEn ? '/en/apps' : '/apps'}`;

    return buildMetadata({
        seo: pageData?.seo,
        fallbackTitle,
        fallbackDescription: fallbackDesc,
        canonicalUrl,
        locale,
    });
}

export default async function AppsPage({ params }: AppsPageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getSanityPageData(locale);

    const getPath = (path: string) => {
        if (!path) return '/';
        if (path === '#demo' || path.startsWith('#')) return path;
        if (locale === 'nl') return path;
        return `/en${path === '/' ? '' : path}`;
    };

    // Extract dynamic blocks from Sanity (100% dynamic CMS content)
    const pageBlocks = pageData?.pageBlocks || [];
    const heroBlock = pageBlocks.find((b: any) => b._type === 'hero');
    const featuresBlock = pageBlocks.find(
        (b: any) => b._type === 'featuresList',
    );
    const ctaBlock = pageBlocks.find((b: any) => b._type === 'ctaBanner');

    // PNG Icon paths for the 3 apps
    const appIcons = [
        '/emlinked/apps/vastgoedbeheer_negatief.png',
        '/emlinked/apps/huurdersportaal_negatief.png',
        '/emlinked/apps/payment_engine_negatief.png',
    ];

    // Checkmark colors per app module
    const checkmarkColors = [
        'text-amber',
        'text-cyan-500 dark:text-cyan-400',
        'text-emerald-500 dark:text-emerald-400',
    ];

    const rawFeatures = featuresBlock?.features || [];

    // Structured JSON-LD Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: pageData?.title || 'emlinked Modulaire Vastgoedsoftware Suite',
        operatingSystem: 'Microsoft Dynamics 365 Business Central Cloud',
        applicationCategory: 'BusinessApplication',
        description:
            pageData?.seo?.seoDescription ||
            'Native vastgoedbeheer software, huurdersportaal en geautomatiseerde SEPA payment engine gebouwd voor Microsoft Dynamics 365 Business Central.',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
        },
        publisher: {
            '@type': 'Organization',
            name: 'emlinked',
            url: DEFAULT_DOMAIN,
        },
    };

    return (
        <div className='flex flex-col min-h-screen bg-background'>
            {/* Structured Data script */}
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* SECTION 1: HERO OVERVIEW */}
            {heroBlock && (
                <HeroSection
                    label={heroBlock.label}
                    title={heroBlock.title}
                    titleClassName='text-3xl sm:text-4xl lg:text-[2.75rem]'
                    subtitle={heroBlock.subtitle}
                    ctaLabel={heroBlock.ctaLabel}
                    ctaLink={heroBlock.ctaLink}
                    secondaryCtaLabel={heroBlock.secondaryCtaLabel}
                    secondaryCtaLink={heroBlock.secondaryCtaLink}
                    showProof={false}
                    imagePath={
                        heroBlock.imagePath || '/emlinked/apps/hero-apps.jpg'
                    }
                    customGraphic={
                        <div className='relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 dark:border-amber/20 group'>
                            <Image
                                src={
                                    heroBlock.imagePath ||
                                    '/emlinked/apps/hero-apps.jpg'
                                }
                                alt={
                                    heroBlock.title ||
                                    'emlinked Modular Apps Platform'
                                }
                                width={600}
                                height={400}
                                className='w-full h-auto object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700'
                                priority
                            />
                            {/* Floating 3-App Overlay Cards with PNG Icons simulating the 3 modular apps */}
                            <div className='absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/20 to-transparent p-4 sm:p-5 flex flex-col justify-between pointer-events-none'>
                                <div className='flex justify-end items-end'>
                                    <span className='px-3 py-1 rounded-full bg-slate-900/90 border border-amber/40 text-amber font-mono text-[11px] font-bold shadow-md backdrop-blur-md flex items-center gap-2.5'>
                                        Microsoft Business Central Core Hub
                                        <span className='h-2 w-2 rounded-full bg-emerald-400 animate-ping' />
                                    </span>
                                </div>

                                <div className='grid grid-cols-3 gap-2 sm:gap-3 pt-1'>
                                    <div className='p-1 sm:p-2 rounded-xl bg-slate-900/85 border border-amber/40 text-center backdrop-blur-md shadow-xl hover:border-amber transition-colors flex flex-col items-center justify-center'>
                                        <div className='relative w-6 h-6 my-1 '>
                                            <Image
                                                src='/emlinked/apps/vastgoedbeheer.png'
                                                alt='Vastgoedbeheer'
                                                fill
                                                className='object-contain'
                                            />
                                        </div>
                                        <span className='text-[10px] sm:text-[11px] font-bold text-white block leading-tight truncate'>
                                            Vastgoedbeheer
                                        </span>
                                        <span className='text-[8px] sm:text-[9px] text-amber font-mono block uppercase tracking-wider font-semibold'>
                                            01 • Core Engine
                                        </span>
                                    </div>

                                    <div className='p-1 sm:p-2 rounded-xl bg-slate-900/85 border border-amber/40 text-center backdrop-blur-md shadow-xl hover:border-cyan-400 transition-colors flex flex-col items-center justify-center'>
                                        <div className='relative w-6 h-6 my-1 '>
                                            <Image
                                                src='/emlinked/apps/huurdersportaal.png'
                                                alt='Huurdersportaal'
                                                fill
                                                className='object-contain'
                                            />
                                        </div>
                                        <span className='text-[10px] sm:text-[11px] font-bold text-white block leading-tight truncate'>
                                            Huurdersportaal
                                        </span>
                                        <span className='text-[8px] sm:text-[9px] text-cyan-400 font-mono block uppercase tracking-wider font-semibold'>
                                            02 • Self-Service
                                        </span>
                                    </div>

                                    <div className='p-1 sm:p-2 rounded-xl bg-slate-900/85 border border-amber/40 text-center backdrop-blur-md shadow-xl hover:border-emerald-400 transition-colors flex flex-col items-center justify-center'>
                                        <div className='relative w-6 h-6 my-1 '>
                                            <Image
                                                src='/emlinked/apps/payment_engine.png'
                                                alt='Payment Engine'
                                                fill
                                                className='object-contain'
                                            />
                                        </div>
                                        <span className='text-[10px] sm:text-[11px] font-bold text-white block leading-tight truncate'>
                                            Payment Engine
                                        </span>
                                        <span className='text-[8px] sm:text-[9px] text-emerald-400 font-mono block uppercase tracking-wider font-semibold'>
                                            03 • Automated SEPA
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    isHomepage={false}
                    locale={locale}
                />
            )}

            {/* SECTION 2: THE THREE CORE APPS (Refined Product Module Cards) */}
            {featuresBlock && (
                <section className='px-6 py-20 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] dark:bg-navy-dark border-b border-amber/10 relative z-10'>
                    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8'>
                        {/* Section Header */}
                        <div className='text-center max-w-3xl mx-auto space-y-4'>
                            {(featuresBlock.sectionTag ||
                                featuresBlock.tag) && (
                                <div className='flex justify-center mb-1'>
                                    <span className='inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/15 px-4.5 py-1.5 text-xs font-mono font-bold tracking-wider text-amber uppercase backdrop-blur-md shadow-xs'>
                                        <span className='w-2 h-2 rounded-full bg-amber shrink-0' />
                                        {featuresBlock.sectionTag ||
                                            featuresBlock.tag}
                                    </span>
                                </div>
                            )}
                            {(featuresBlock.sectionTitle ||
                                featuresBlock.title) && (
                                <h2 className='font-display font-bold text-3xl md:text-4xl lg:text-[2.7rem]/12 tracking-tight text-[#060e32] dark:text-white'>
                                    {featuresBlock.sectionTitle ||
                                        featuresBlock.title}
                                </h2>
                            )}
                            {(featuresBlock.sectionSubtitle ||
                                featuresBlock.subtitle) && (
                                <p className='text-sm sm:text-base text-[#060e32]/75 dark:text-slate-300 leading-relaxed font-light'>
                                    {featuresBlock.sectionSubtitle ||
                                        featuresBlock.subtitle}
                                </p>
                            )}
                        </div>

                        {/* 3 Bespoke Product Module Cards Grid */}
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 text-left pt-4'>
                            {rawFeatures
                                .slice(0, 3)
                                .map((feature: any, index: number) => {
                                    const imagePath =
                                        feature.imagePath ||
                                        (index === 0
                                            ? '/emlinked/apps/vastgoedbeheer-sopftware_modules.jpg'
                                            : index === 1
                                              ? '/emlinked/apps/huurdersportaal_modules.jpg'
                                              : '/emlinked/apps/payment-software_modules.jpg');
                                    const appUrl =
                                        feature.ctaLink ||
                                        (index === 0
                                            ? '/apps/vastgoedbeheer-software'
                                            : index === 1
                                              ? '/apps/huurdersportaal'
                                              : '/apps/payment-software');
                                    const ctaLabel =
                                        feature.ctaLabel ||
                                        (isEn
                                            ? 'Ontdek Module ➔'
                                            : 'Ontdek Module ➔');
                                    const bullets = feature.bullets || [];
                                    const badge =
                                        feature.badge ||
                                        (index === 0
                                            ? 'Core Operatie & Admin'
                                            : index === 1
                                              ? 'Self-Service & Communicatie'
                                              : 'Financiële Automatisering');
                                    const checkColor =
                                        checkmarkColors[index] ||
                                        checkmarkColors[0];

                                    const cardIcon =
                                        feature.iconPath || appIcons[index];

                                    return (
                                        <div
                                            key={feature._key || index}
                                            className='relative p-6 rounded-2xl border border-black/20 bg-white dark:bg-slate-900/90 shadow-md hover:shadow-xl hover:border-amber/50 space-y-5 flex flex-col justify-between transition-all duration-300 group'
                                        >
                                            {/* Floating PNG Icon Badge on top-right corner (Enlarged) */}
                                            <div className='absolute -top-6 -right-6 sm:-top-7 sm:-right-7 z-30 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-200/95 dark:bg-slate-800 border-2 sm:border-3 border-amber shadow-2xl flex items-center justify-center p-2 group-hover:scale-110 transition-transform duration-300 pointer-events-none'>
                                                <div className='relative w-10 h-10 sm:w-13 sm:h-13'>
                                                    <Image
                                                        src={cardIcon}
                                                        alt={
                                                            feature.title ||
                                                            'App Module'
                                                        }
                                                        fill
                                                        className='object-contain'
                                                    />
                                                </div>
                                            </div>

                                            {/* Whole-card overlay link for optimal UX */}
                                            <Link
                                                href={getPath(appUrl)}
                                                className='absolute inset-0 z-20'
                                                aria-label={
                                                    feature.title ||
                                                    'App Module'
                                                }
                                            />

                                            <div className='space-y-5'>
                                                {/* 1. TOP IMAGE PREVIEW CONTAINER WITH TOP-LEFT OVERLAY CATEGORY BADGE */}
                                                {imagePath && (
                                                    <div className='relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-950 border border-gray-200 dark:border-white/10 group-hover:border-amber/30 transition-colors'>
                                                        <Image
                                                            src={imagePath}
                                                            alt={
                                                                feature.title ||
                                                                'Module Preview'
                                                            }
                                                            fill
                                                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                                            priority={
                                                                index === 0
                                                            }
                                                            className='object-cover opacity-95 group-hover:scale-105 transition-transform duration-500'
                                                        />

                                                        {/* Category Badge Pill Overlay inside Top-Left of Image */}
                                                        {badge && (
                                                            <div className='absolute top-3 left-3 z-20 pointer-events-none'>
                                                                <span className='px-3 py-1 text-[11px] font-bold rounded-full bg-slate-900/90 border border-amber/30 text-amber shadow-lg backdrop-blur-md tracking-wide'>
                                                                    {badge}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {/* 2. TITLE & DESCRIPTION */}
                                                <div className='space-y-2 pt-1'>
                                                    <h3 className='text-2xl font-bold font-display text-[#060e32] dark:text-white group-hover:text-amber transition-colors'>
                                                        {feature.title}
                                                    </h3>
                                                    <p className='text-sm text-[#060e32]/75 dark:text-slate-300 leading-relaxed font-light'>
                                                        {feature.description}
                                                    </p>
                                                </div>

                                                {/* 3. PRODUCT FEATURE BULLETS */}
                                                {bullets.length > 0 && (
                                                    <ul className='space-y-2 pt-1'>
                                                        {bullets.map(
                                                            (
                                                                feat: string,
                                                                fIdx: number,
                                                            ) => (
                                                                <li
                                                                    key={fIdx}
                                                                    className='flex items-start gap-2.5 text-xs text-[#060e32]/85 dark:text-slate-200 font-medium'
                                                                >
                                                                    <CheckCircle2
                                                                        className={`h-4 w-4 shrink-0 mt-0.5 ${checkColor}`}
                                                                    />
                                                                    <span className='leading-snug'>
                                                                        {feat}
                                                                    </span>
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                )}
                                            </div>

                                            {/* 4. SINGLE-LINE CARD FOOTER MATCHING FRONTPAGE & IMAGE */}
                                            <div className='pt-3 border-t border-black/15 dark:border-white/10 flex items-center justify-between gap-4 z-30 mt-auto pointer-events-none'>
                                                <div className='flex items-center gap-2 text-xs font-semibold text-[#060e32]/85 dark:text-slate-200 truncate'>
                                                    <CheckCircle2 className='w-4 h-4 text-amber shrink-0' />
                                                    <span className='truncate'>
                                                        {index === 0
                                                            ? 'Primary operational'
                                                            : index === 1
                                                              ? 'Self-service'
                                                              : 'Primary operational'}
                                                    </span>
                                                </div>

                                                <div className='inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber group-hover:text-[#060e32] dark:group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200 shrink-0'>
                                                    <span>MODULE</span>
                                                    <ArrowRight className='w-3.5 h-3.5' />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </section>
            )}

            {/* SECTION 3: SYSTEM ARCHITECTURE */}
            <AppsArchitectureSection locale={locale} />

            {/* SECTION 4: TRUST & SCALE REVIEWS SLIDER */}
            <TestimonialSlider locale={locale} />

            {/* SECTION 5: FINAL PRE-FOOTER CONVERSION CTA (Exact Homepage Layout Parity) */}
            {ctaBlock && (
                <section className='py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] relative overflow-hidden z-10'>
                    <div className='mx-auto max-w-8xl px-0'>
                        <div className='border border-amber/30 rounded-3xl bg-texture-navy text-white p-6 sm:p-10 md:p-14 hover:shadow-[0_25px_60px_rgba(245,158,11,0.15)] transition-all duration-500 relative overflow-hidden group shadow-2xl backdrop-blur-xl'>
                            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10'>
                                {/* Left Column: Copy & Action Triggers */}
                                <div className='lg:col-span-8 flex flex-col gap-5 text-left'>
                                    <span className='inline-flex items-center gap-2 self-start rounded-full bg-amber/15 border border-amber/35 px-5 py-1.5 text-xs font-bold tracking-widest text-amber uppercase backdrop-blur-md'>
                                        <span className='w-1.5 h-1.5 bg-amber rounded-full animate-ping' />
                                        {ctaBlock.tag ||
                                            'START MET AUTOMATISEREN'}
                                    </span>
                                    <h2 className='font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight'>
                                        {ctaBlock.title ||
                                            'Klaar om je vastgoedbeheer te digitaliseren?'}
                                    </h2>
                                    <p className='text-white/80 leading-relaxed font-light text-base md:text-lg max-w-2xl'>
                                        {ctaBlock.subtitle ||
                                            'Sluit aan bij de professionele beheerders die handmatig werk hebben geëlimineerd en kiezen voor 100% realtime controle binnen Business Central.'}
                                    </p>

                                    {/* Primary & Secondary Action Buttons */}
                                    <div className='flex flex-col sm:flex-row gap-4 pt-2'>
                                        {ctaBlock.buttonLabel && (
                                            <GlowingLink
                                                href='#demo'
                                                className='inline-flex h-14 items-center justify-center rounded-2xl border-0 bg-linear-to-r from-[#FF9500] via-[#FF5E00] to-[#FF3B00] hover:brightness-110 px-8 text-base font-bold text-white transition-all duration-200 shadow-lg shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98]'
                                            >
                                                <span className='flex items-center justify-center gap-2 text-white'>
                                                    <span>
                                                        {ctaBlock.buttonLabel}
                                                    </span>
                                                    <ArrowRight className='h-5 w-5 text-white' />
                                                </span>
                                            </GlowingLink>
                                        )}

                                        {ctaBlock.secondaryButtonLabel && (
                                            <Link
                                                href={getPath(
                                                    ctaBlock.secondaryButtonLink ||
                                                        '/integraties',
                                                )}
                                                className='inline-flex h-14 items-center justify-center rounded-2xl border border-white/20 hover:border-white/40 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98]'
                                            >
                                                <span>
                                                    {
                                                        ctaBlock.secondaryButtonLabel
                                                    }
                                                </span>
                                            </Link>
                                        )}
                                    </div>
                                </div>

                                {/* Right Column: Preserved Apps Image Asset */}
                                <div className='lg:col-span-4 flex justify-start lg:justify-end'>
                                    <Image
                                        src='/emlinked/apps/bewezen_resultaat.png'
                                        alt={
                                            ctaBlock.title ||
                                            'Bewezen resultaat'
                                        }
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
            )}
        </div>
    );
}
