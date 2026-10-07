// Force Next.js HMR recompile for metadata
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { sanityFetch } from '@/lib/sanity';
import { HeroSection } from '@/components/blocks/HeroSection';
import { AppsArchitectureSection } from '@/components/blocks/AppsArchitectureSection';
import { TestimonialSlider } from '@/components/TestimonialSlider';
import { getImageUrl } from '@/sanity/image';
import { cn } from '@/lib/utils';

import { buildMetadata, DEFAULT_DOMAIN } from '@/lib/seo';
import { Badge } from '@/components/ui/Badge';
import { OutlineLinkButton } from '@/components/ui/OutlineLinkButton';

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
                    image { asset-> { _id, url } },
                    heroImage { asset-> { _id, url } },
                    bgImage { asset-> { _id, url } },
                    features[] {
                        ...,
                        image { asset-> { _id, url } },
                        iconImage { asset-> { _id, url } },
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
        let cleanPath = path;
        if (cleanPath.startsWith('/en/')) {
            cleanPath = cleanPath.replace(/^\/en/, '');
        }
        return cleanPath || '/';
    };

    // Extract dynamic blocks from Sanity (100% dynamic CMS content)
    const pageBlocks = pageData?.pageBlocks || [];
    const heroBlock = pageBlocks.find((b: any) => b._type === 'hero');
    const featuresBlock = pageBlocks.find(
        (b: any) => b._type === 'featuresList',
    );
    const architectureBlock = pageBlocks.find(
        (b: any) => b._type === 'architectureSection',
    );
    const testimonialBlock = pageBlocks.find(
        (b: any) => b._type === 'testimonialSection',
    );
    const ctaBlock = pageBlocks.find((b: any) => b._type === 'ctaBanner');

    // PNG Icon paths for the 3 apps
    const appIcons = [
        '/emlinked/apps/vastgoedbeheer_negatief.png',
        '/emlinked/apps/huurdersportaal_negatief.png',
        '/emlinked/apps/payment_engine_negatief.png',
    ];

    // Same pastel-wash / accent-color rotation as the homepage's
    // "Drie apps, één workflow" cards.
    const cardWash = ['bg-teal-pale/50', 'bg-emerald-50', 'bg-navy-50'];
    const iconColor = [
        'text-teal bg-white',
        'text-emerald-600 bg-white',
        'text-navy-700 bg-white',
    ];

    // Checkmark colors per app module
    const checkmarkColors = [
        'text-teal',
        'text-emerald-600',
        'text-navy-700',
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

    const renderHero = (b: any, key: any) => {
        const blk = b || heroBlock;
        if (!blk) return null;
        return (
            <React.Fragment key={key}>
                <HeroSection
                    label={blk.label}
                    title={blk.title}
                    titleClassName='text-3xl sm:text-4xl lg:text-[2.75rem]'
                    subtitle={blk.subtitle}
                    ctaLabel={blk.ctaLabel}
                    ctaLink={blk.ctaLink}
                    secondaryCtaLabel={blk.secondaryCtaLabel}
                    secondaryCtaLink={blk.secondaryCtaLink}
                    showProof={blk.showProof ?? false}
                    imagePath={
                        getImageUrl(
                            blk.image || blk.heroImage,
                            blk.imagePath,
                        ) || '/emlinked/apps/hero-apps.jpg'
                    }
                    customGraphic={
                        <>
                            <Image
                                src={
                                    getImageUrl(
                                        blk.image || blk.heroImage,
                                        blk.imagePath,
                                    ) || '/emlinked/apps/hero-apps.jpg'
                                }
                                alt={
                                    blk.title ||
                                    'emlinked Modular Apps Platform'
                                }
                                fill
                                sizes='(max-width: 1024px) 100vw, 55vw'
                                className='object-cover lg:mask-[linear-gradient(to_right,transparent,black_22%)]'
                                priority
                            />

                            {/* Floating module chips — same recipe as the
                                homepage hero's stat chips. */}
                            <div className='absolute z-20 left-0 top-10 flex items-center gap-2.5 bg-white rounded-xl px-3.5 py-3 shadow-xl'>
                                <span className='w-7 h-7 rounded-lg bg-teal-pale flex items-center justify-center shrink-0 relative'>
                                    <Image
                                        src='/emlinked/apps/vastgoedbeheer.png'
                                        alt='Vastgoedbeheer'
                                        fill
                                        sizes='20px'
                                        className='object-contain p-1'
                                    />
                                </span>
                                <div>
                                    <p className='text-[11px] font-bold text-navy-900 leading-none'>
                                        Vastgoedbeheer
                                    </p>
                                    <p className='text-[9px] text-navy-500 mt-1'>
                                        01 · Core Engine
                                    </p>
                                </div>
                            </div>

                            <div className='absolute z-20 right-0 top-10 flex items-center gap-2.5 bg-white rounded-xl px-3.5 py-3 shadow-xl'>
                                <span className='w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 relative'>
                                    <Image
                                        src='/emlinked/apps/huurdersportaal.png'
                                        alt='Huurdersportaal'
                                        fill
                                        sizes='20px'
                                        className='object-contain p-1'
                                    />
                                </span>
                                <div>
                                    <p className='text-[11px] font-bold text-navy-900 leading-none'>
                                        Huurdersportaal
                                    </p>
                                    <p className='text-[9px] text-navy-500 mt-1'>
                                        02 · Self-Service
                                    </p>
                                </div>
                            </div>

                            <div className='absolute z-20 right-0 bottom-8 flex items-center gap-2.5 bg-white rounded-xl px-3.5 py-3 shadow-xl'>
                                <span className='w-7 h-7 rounded-lg bg-navy-50 flex items-center justify-center shrink-0 relative'>
                                    <Image
                                        src='/emlinked/apps/payment_engine.png'
                                        alt='Payment Engine'
                                        fill
                                        sizes='20px'
                                        className='object-contain p-1'
                                    />
                                </span>
                                <div>
                                    <p className='text-[11px] font-bold text-navy-900 leading-none'>
                                        Payment Engine
                                    </p>
                                    <p className='text-[9px] text-navy-500 mt-1'>
                                        03 · Automated SEPA
                                    </p>
                                </div>
                            </div>
                        </>
                    }
                    isHomepage={false}
                    locale={locale}
                />
            </React.Fragment>
        );
    };

    const renderFeatures = (b: any, key: any) => {
        const blk = b || featuresBlock;
        if (!blk) return null;
        return (
            <section
                key={key}
                className='px-6 py-24 bg-background relative z-10'
            >
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8'>
                    {/* Section Header */}
                    <div className='text-center max-w-3xl mx-auto space-y-4'>
                        {(featuresBlock.sectionTag || featuresBlock.tag) && (
                            <div className='flex justify-center mb-1'>
                                <Badge color='teal' uppercase dot>
                                    {featuresBlock.sectionTag ||
                                        featuresBlock.tag}
                                </Badge>
                            </div>
                        )}
                        {(featuresBlock.sectionTitle ||
                            featuresBlock.title) && (
                            <h2 className='font-display font-bold text-3xl md:text-4xl lg:text-[2.7rem]/12 tracking-tight text-navy-900'>
                                {featuresBlock.sectionTitle ||
                                    featuresBlock.title}
                            </h2>
                        )}
                        {(featuresBlock.sectionSubtitle ||
                            featuresBlock.subtitle) && (
                            <p className='text-sm sm:text-base text-navy-900/75 leading-relaxed font-light'>
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
                                    getImageUrl(
                                        feature.image,
                                        feature.imagePath,
                                    ) ||
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
                                    (isEn ? 'Discover module' : 'Ontdek module');
                                const bullets = feature.bullets || [];
                                const badge = feature.badge || '';
                                const checkColor =
                                    checkmarkColors[index] ||
                                    checkmarkColors[0];

                                const cardIcon =
                                    getImageUrl(
                                        feature.iconImage,
                                        feature.iconPath,
                                    ) || appIcons[index];

                                return (
                                    <div
                                        key={feature._key || index}
                                        className={cn(
                                            'rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group relative',
                                            cardWash[index % cardWash.length],
                                        )}
                                    >
                                        {/* Whole-card overlay link for optimal UX */}
                                        <Link
                                            href={getPath(appUrl)}
                                            className='absolute inset-0 z-20'
                                            aria-label={
                                                feature.title || 'App Module'
                                            }
                                        />

                                        <div
                                            className={cn(
                                                'absolute top-4 right-4 z-30 w-11 h-11 rounded-md shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 pointer-events-none',
                                                iconColor[
                                                    index % iconColor.length
                                                ],
                                            )}
                                        >
                                            <div className='relative w-6 h-6'>
                                                <Image
                                                    src={cardIcon}
                                                    alt={
                                                        feature.title ||
                                                        'App Module'
                                                    }
                                                    fill
                                                    sizes='24px'
                                                    className='object-contain'
                                                />
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-4 p-6 md:p-8 pb-4 z-10 pointer-events-none'>
                                            <h3
                                                className={cn(
                                                    'text-xl font-bold font-display transition-colors pr-12 group-hover:bg-linear-to-br group-hover:from-[#f12711] group-hover:to-[#f5af19] group-hover:bg-clip-text group-hover:text-transparent',
                                                    checkmarkColors[
                                                        index %
                                                            checkmarkColors.length
                                                    ],
                                                )}
                                            >
                                                {feature.title}
                                            </h3>
                                            <p className='text-sm text-navy-600 leading-relaxed font-light'>
                                                {feature.description}
                                            </p>

                                            {bullets.length > 0 && (
                                                <ul className='flex flex-col gap-2'>
                                                    {bullets.map(
                                                        (
                                                            feat: string,
                                                            fIdx: number,
                                                        ) => (
                                                            <li
                                                                key={fIdx}
                                                                className='flex items-start gap-2.5 text-xs text-navy-700 font-medium'
                                                            >
                                                                <CheckCircle2
                                                                    className={cn(
                                                                        'h-4 w-4 shrink-0 mt-0.5',
                                                                        checkColor,
                                                                    )}
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

                                        {/* mt-auto pins image + link to the
                                            card's bottom edge, matching the
                                            homepage featuresList cards. */}
                                        <div className='flex flex-col mt-auto'>
                                            {imagePath && (
                                                <div className='relative w-full h-56 px-4 pb-4'>
                                                    <div className='relative w-full h-full rounded-xl overflow-hidden'>
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
                                                            className='object-cover group-hover:scale-105 transition-transform duration-500'
                                                        />
                                                        {badge && (
                                                            <div className='absolute top-3 left-3 z-20 pointer-events-none'>
                                                                <span className='px-3 py-1 text-[11px] font-bold rounded-full bg-white/90 text-navy-900 shadow-md backdrop-blur-sm tracking-wide'>
                                                                    {badge}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            <div className='flex justify-end px-6 md:px-8 pb-4 z-10 pointer-events-none'>
                                                <div
                                                    className={cn(
                                                        'inline-flex items-center gap-1.5 text-sm font-semibold group-hover:translate-x-0.5 transition-all duration-200 w-min whitespace-nowrap',
                                                        checkmarkColors[
                                                            index %
                                                                checkmarkColors.length
                                                        ],
                                                    )}
                                                >
                                                    <span>{ctaLabel}</span>
                                                    <ArrowRight className='w-3.5 h-3.5' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </section>
        );
    };

    const renderArchitecture = (b: any, key: any) => {
        const blk = b || architectureBlock;
        return (
            <React.Fragment key={key}>
                <AppsArchitectureSection
                    locale={locale}
                    tag={blk?.tag}
                    title={blk?.title}
                    subtitle={blk?.subtitle}
                    sectionTag={blk?.sectionTag}
                    sectionTitle={blk?.sectionTitle}
                    sectionSubtitle={blk?.sectionSubtitle}
                    bullets={blk?.bullets}
                    bgImage={blk?.bgImage}
                    bgImagePath={blk?.bgImagePath}
                    diagramImage={blk?.diagramImage}
                    diagramImagePath={blk?.diagramImagePath}
                    calloutImage={blk?.calloutImage}
                    calloutImagePath={blk?.calloutImagePath}
                />
            </React.Fragment>
        );
    };

    const renderTestimonial = (b: any, key: any) => {
        const blk = b || testimonialBlock;
        return (
            <React.Fragment key={key}>
                <TestimonialSlider
                    locale={locale}
                    tag={blk?.sectionTag}
                    title={blk?.sectionTitle}
                    subtitle={blk?.sectionSubtitle}
                    customTestimonials={blk?.testimonials}
                />
            </React.Fragment>
        );
    };

    const renderCta = (b: any, key: any) => {
        const blk = b || ctaBlock;
        if (!blk) return null;
        return (
            <section
                key={key}
                className='px-6 py-24 bg-linear-to-br from-teal-ultra via-stone-bg to-teal-pale/60 relative overflow-hidden z-10'
            >
                <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8'>
                    <div className='text-navy-900 p-10 md:p-16 relative overflow-hidden'>
                        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10'>
                            {/* Left Column: Copy & Action Triggers */}
                            <div className='lg:col-span-8 flex flex-col gap-5 text-left'>
                                {ctaBlock.tag && (
                                    <Badge
                                        color='teal'
                                        uppercase
                                        dot
                                        dotPulse
                                    >
                                        {ctaBlock.tag}
                                    </Badge>
                                )}
                                <h2 className='font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight bg-linear-to-br from-[#f12711] to-[#f5af19] bg-clip-text text-transparent'>
                                    {ctaBlock.title}
                                </h2>
                                {ctaBlock.subtitle && (
                                    <p className='text-navy-700 leading-relaxed font-light text-base md:text-lg max-w-2xl'>
                                        {ctaBlock.subtitle}
                                    </p>
                                )}

                                {/* Primary & Secondary Action Buttons */}
                                <div className='flex flex-col sm:flex-row gap-4 pt-2'>
                                    {ctaBlock.buttonLabel && (
                                        <Link
                                            href='#demo'
                                            className='inline-flex h-14 items-center justify-center rounded-2xl bg-navy-900 hover:btn-gradient px-8 text-base font-bold text-white transition-all duration-200 shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                                        >
                                            <span className='flex items-center justify-center gap-2 text-white'>
                                                <span>
                                                    {ctaBlock.buttonLabel}
                                                </span>
                                                <ArrowRight className='h-5 w-5 text-white' />
                                            </span>
                                        </Link>
                                    )}

                                    {ctaBlock.secondaryButtonLabel && (
                                        <OutlineLinkButton
                                            href={getPath(
                                                ctaBlock.secondaryButtonLink ||
                                                    '/integraties',
                                            )}
                                            color='navy'
                                        >
                                            <span>
                                                {ctaBlock.secondaryButtonLabel}
                                            </span>
                                        </OutlineLinkButton>
                                    )}
                                </div>
                            </div>

                            {/* Right Column: Preserved Apps Image Asset */}
                            <div className='lg:col-span-4 flex justify-start lg:justify-end'>
                                <Image
                                    src={
                                        getImageUrl(
                                            ctaBlock.image,
                                            ctaBlock.imagePath,
                                        ) ||
                                        '/emlinked/apps/bewezen_resultaat.png'
                                    }
                                    alt={ctaBlock.title || 'Bewezen resultaat'}
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
    };

    const blocksToRender =
        pageBlocks.length > 0
            ? pageBlocks
            : [
                  { _type: 'hero', _key: 'default_hero' },
                  { _type: 'featuresList', _key: 'default_features' },
                  { _type: 'architectureSection', _key: 'default_arch' },
                  { _type: 'testimonialSection', _key: 'default_test' },
                  { _type: 'ctaBanner', _key: 'default_cta' },
              ];

    return (
        <div className='flex flex-col min-h-screen bg-background'>
            {/* Structured Data script */}
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {blocksToRender.map((block: any, idx: number) => {
                const key = block._key || idx;
                switch (block._type) {
                    case 'hero':
                    case 'heroBlock':
                        return renderHero(block, key);
                    case 'featuresList':
                    case 'features':
                        return renderFeatures(block, key);
                    case 'architectureSection':
                    case 'architectureBlock':
                    case 'architecture':
                        return renderArchitecture(block, key);
                    case 'testimonialSection':
                    case 'testimonial':
                        return renderTestimonial(block, key);
                    case 'ctaBanner':
                    case 'ctaBlock':
                    case 'cta':
                        return renderCta(block, key);
                    default:
                        return null;
                }
            })}
        </div>
    );
}
