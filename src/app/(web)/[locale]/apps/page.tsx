import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import {
    CheckCircle2,
    Quote,
    ArrowUpRight,
    ArrowRight,
    Zap,
} from 'lucide-react';
import { sanityFetch } from '@/lib/sanity';
import { HeroSection } from '@/components/blocks/HeroSection';
import { AppsArchitectureSection } from '@/components/blocks/AppsArchitectureSection';

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
                    },
                    testimonials[] {
                        ...
                    }
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
    const seo = pageData?.seo;

    const title = seo?.seoTitle;
    const description = seo?.seoDescription;
    const canonical =
        seo?.canonical || `https://emlinked.nl${isEn ? '/en/apps' : '/apps'}`;
    const robots = seo?.noIndex ? 'noindex, nofollow' : 'index, follow';

    return {
        title,
        description,
        robots,
        alternates: {
            canonical,
        },
        openGraph: {
            title,
            description,
            url: canonical,
            siteName: 'Emlinked',
            images: [
                {
                    url: '/assets/og/emlinked-apps-suite.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'Emlinked Modular Property Software Suite',
                },
            ],
            locale: isEn ? 'en_US' : 'nl_NL',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['/assets/og/emlinked-apps-suite.jpg'],
        },
    };
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
    const testimonialBlock = pageBlocks.find(
        (b: any) =>
            b._type === 'testimonialSection' ||
            b._type === 'testimonialsSection',
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
    const quoteItem = testimonialBlock?.testimonials?.[0];

    // Structured JSON-LD Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: pageData?.title || 'Emlinked Modulaire Vastgoedsoftware Suite',
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
            name: 'Emlinked',
            url: 'https://emlinked.nl',
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
                                    'Emlinked Modular Apps Platform'
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
                    <div className='max-w-7xl mx-auto space-y-8'>
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
                                            {/* Floating PNG Icon Badge on top-right corner */}
                                            <div className='absolute -top-5 -right-5 sm:-top-7 sm:-right-6 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-300 border-2 border-amber dark:border-slate-900 shadow-xl flex items-center justify-center p-2.5 group-hover:scale-110 transition-transform duration-300 pointer-events-none'>
                                                <div className='relative w-6 h-6 sm:w-7 sm:h-7'>
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
                                                aria-label={feature.title || 'App Module'}
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

            {/* SECTION 4: TRUST & SCALE QUALIFIER */}
            {testimonialBlock && (
                <section className='px-6 py-20 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] dark:bg-navy-dark relative z-10'>
                    <div className='max-w-6xl mx-auto'>
                        <div className='p-8 md:p-12 rounded-3xl border border-amber/20 bg-white dark:bg-slate-900/90 shadow-xl space-y-8 relative overflow-hidden'>
                            <div className='space-y-3 max-w-3xl text-left'>
                                {(testimonialBlock.sectionTag ||
                                    testimonialBlock.tag) && (
                                    <span className='inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/15 px-4.5 py-1.5 text-xs font-mono font-bold tracking-wider text-amber uppercase backdrop-blur-md shadow-xs'>
                                        <span className='w-2 h-2 rounded-full bg-amber shrink-0' />
                                        {testimonialBlock.sectionTag ||
                                            testimonialBlock.tag}
                                    </span>
                                )}
                                {testimonialBlock.sectionTitle && (
                                    <h2 className='font-display font-bold text-2xl md:text-4xl text-[#060e32] dark:text-white tracking-tight'>
                                        {testimonialBlock.sectionTitle}
                                    </h2>
                                )}
                                {(testimonialBlock.sectionSubtitle ||
                                    testimonialBlock.subtitle) && (
                                    <p className='text-sm md:text-base text-[#060e32]/75 dark:text-slate-300 leading-relaxed font-light'>
                                        {testimonialBlock.sectionSubtitle ||
                                            testimonialBlock.subtitle}
                                    </p>
                                )}
                            </div>

                            {/* Quote Card */}
                            {quoteItem && (
                                <div className='p-6 md:p-8 rounded-2xl border border-amber/30 bg-[#FFFBEF] dark:bg-amber/5 relative space-y-4 text-left shadow-sm'>
                                    <Quote className='h-8 w-8 text-amber/40 absolute top-4 right-4 pointer-events-none' />
                                    <p className='text-base md:text-lg italic text-[#060e32] dark:text-slate-200 leading-relaxed font-serif'>
                                        “{quoteItem.quote}”
                                    </p>
                                    <div className='flex items-center gap-3 pt-2 border-t border-amber/20'>
                                        <div className='h-10 w-10 rounded-full bg-amber/20 border border-amber/40 flex items-center justify-center text-amber font-bold text-sm'>
                                            {quoteItem.author
                                                ? quoteItem.author
                                                      .split(' ')
                                                      .map((n: string) => n[0])
                                                      .join('')
                                                      .slice(0, 2)
                                                : 'OD'}
                                        </div>
                                        <div>
                                            <h4 className='font-bold text-xs text-[#060e32] dark:text-white'>
                                                {quoteItem.author}
                                            </h4>
                                            {quoteItem.role && (
                                                <span className='text-[11px] text-amber font-mono font-semibold block'>
                                                    {quoteItem.role}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* SECTION 5: FINAL PRE-FOOTER CONVERSION CTA */}
            {ctaBlock && (
                <section className='px-6 py-20 bg-background max-w-5xl mx-auto text-center'>
                    <div className='p-10 md:p-16 rounded-3xl border border-white/10 bg-texture-navy text-white space-y-8 relative overflow-hidden shadow-2xl'>
                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber/15 blur-3xl pointer-events-none rounded-full' />

                        <div className='space-y-4 max-w-2xl mx-auto relative z-10'>
                            {ctaBlock.tag && (
                                <span className='inline-flex items-center justify-center rounded-full border border-amber/50 bg-[#251b14]/90 px-6 py-1.5 text-xs font-mono font-bold tracking-widest text-amber uppercase backdrop-blur-md shadow-md'>
                                    {ctaBlock.tag}
                                </span>
                            )}
                            {ctaBlock.title && (
                                <h2 className='font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight'>
                                    {ctaBlock.title}
                                </h2>
                            )}
                            {ctaBlock.subtitle && (
                                <p className='text-sm sm:text-base text-white/80 leading-relaxed font-light'>
                                    {ctaBlock.subtitle}
                                </p>
                            )}
                        </div>

                        {/* Primary & Secondary Buttons */}
                        <div className='flex flex-wrap items-center justify-center gap-4 relative z-10 pt-2'>
                            {ctaBlock.buttonLabel && (
                                <Link
                                    href={getPath(
                                        ctaBlock.buttonLink || '#demo',
                                    )}
                                    className='px-8 py-4 rounded-xl bg-amber hover:bg-amber-hover text-[#060e32] font-bold text-sm flex items-center gap-2 transition-all shadow-xl hover:scale-105'
                                >
                                    <span>{ctaBlock.buttonLabel}</span>
                                    <ArrowRight className='h-4 w-4' />
                                </Link>
                            )}

                            {ctaBlock.secondaryButtonLabel && (
                                <Link
                                    href={getPath(
                                        ctaBlock.secondaryButtonLink ||
                                            '/prijzen',
                                    )}
                                    className='px-7 py-4 rounded-xl bg-transparent border border-white/20 hover:bg-white/10 text-white font-semibold text-sm flex items-center gap-2 transition-all hover:border-amber/40'
                                >
                                    <span>{ctaBlock.secondaryButtonLabel}</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
