'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeroSection } from '@/components/blocks/HeroSection';
import { Box3EcosystemSection } from '@/components/blocks/box3/Box3EcosystemSection';
import { Box3SolutionWorkflow } from '@/components/blocks/box3/Box3SolutionWorkflow';
import { TestimonialSlider } from '@/components/TestimonialSlider';
import { TeamBlock } from '@/components/blocks/TeamBlock';
import { AppsArchitectureSection } from '@/components/blocks/AppsArchitectureSection';
import { getImageUrl } from '@/sanity/image';
import { Badge } from '@/components/ui/Badge';
import { ColorIcon } from '@/components/ui/ColorIcon';
import { cn } from '@/lib/utils';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    AiSecurity01Icon,
    CheckmarkBadge03Icon,
    StarAward01Icon,
} from '@hugeicons/core-free-icons';
import {
    FileText,
    Cpu,
    Database,
    Zap,
    ArrowRight,
    Layers,
    Building2,
    ShieldCheck,
    CheckCircle2,
} from 'lucide-react';

interface PageBlockRendererProps {
    block: any;
    locale?: string;
    isHomepage?: boolean;
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
        default:
            return (
                <HugeiconsIcon
                    icon={StarAward01Icon}
                    size={20}
                    className='shrink-0 transition-colors text-teal'
                />
            );
    }
}

export function PageBlockRenderer({
    block,
    locale = 'nl',
    isHomepage = false,
}: PageBlockRendererProps) {
    if (!block || !block._type) return null;

    const isEn = locale === 'en';

    const getPath = (path: string) => {
        if (!path) return isEn ? '/en' : '/';
        if (path.startsWith('#')) return path;
        if (isEn) {
            if (path.startsWith('/en')) return path;
            return `/en${path === '/' ? '' : path}`;
        }
        return path;
    };

    switch (block._type) {
        case 'hero':
        case 'heroBlock': {
            return (
                <HeroSection
                    key={block._key}
                    label={block.label || block.tagline}
                    title={block.title}
                    titleClassName={
                        isHomepage
                            ? 'text-3xl sm:text-4xl lg:text-[2.75rem]'
                            : undefined
                    }
                    subtitle={block.subtitle || block.description}
                    ctaLabel={block.ctaLabel}
                    ctaLink={block.ctaLink}
                    secondaryCtaLabel={block.secondaryCtaLabel}
                    secondaryCtaLink={block.secondaryCtaLink}
                    showProof={block.showProof ?? true}
                    proofText={block.proofText}
                    imagePath={
                        getImageUrl(
                            block.image || block.heroImage,
                            block.imagePath,
                        ) ||
                        (isHomepage
                            ? '/hero/vastgoedbeheer-dashboard-illustration.jpg'
                            : '/hero/vastgoedportfeuille_aangifte-klaar.jpg')
                    }
                    isHomepage={isHomepage}
                    locale={locale}
                />
            );
        }

        case 'trustBar':
        case 'trust': {
            const items = block.items || [];
            if (!items.length) return null;
            return (
                <section
                    key={block._key}
                    className='bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] animate-none dark:text-[#060e32] dark:bg-navy-dark border-b border-gray-200 dark:border-white/5 py-3 px-4 sm:px-6 lg:px-8 shadow-sm'
                >
                    <div className='max-w-7xl mx-auto flex items-center justify-center gap-6 sm:gap-9 flex-wrap'>
                        {items.map((item: any) => (
                            <div
                                key={item._key || item.text}
                                className='flex items-center gap-2 text-xs font-mono font-semibold text-darkBlue/75 dark:text-white/90 hover:text-teal dark:hover:text-teal transition-colors tracking-wide'
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
            let sectionTag = block.sectionTag || block.badge || '';
            let sectionSubtitle = block.sectionSubtitle || block.subtitle || '';

            if (!sectionTag && sectionSubtitle.includes(' — ')) {
                const parts = sectionSubtitle.split(' — ');
                sectionTag = parts[0].trim();
                sectionSubtitle = parts.slice(1).join(' — ').trim();
            }

            const sectionTitle = block.sectionTitle || block.title || '';
            const features = block.features || block.items || [];

            // Box3 lead-magnet block: centered header, with its 3 features
            // rendered as bullet points between the intro text and the CTA
            // button instead of a 3-col card grid.
            const isPortfolioHealth = block._key === 'box3-check-lead-magnet';

            const resolvedSectionImg = getImageUrl(
                block.sectionImage,
                block.sectionImagePath,
            );

            return (
                <section
                    key={block._key}
                    className='px-6 py-24 bg-background relative overflow-hidden'
                >
                    <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-10 relative z-10'>
                        <div
                            className={cn(
                                'flex flex-col gap-6 items-center text-center',
                                isPortfolioHealth
                                    ? 'max-w-[850px] mx-auto'
                                    : 'max-w-4xl mx-auto',
                            )}
                        >
                            {sectionTag && (
                                <div className='flex justify-center mb-1'>
                                    <Badge color='teal' uppercase>
                                        {sectionTag}
                                    </Badge>
                                </div>
                            )}
                            {sectionTitle && (
                                <h2
                                    className={cn(
                                        'font-display text-3xl md:text-4xl lg:text-[2.7rem]/12 font-bold tracking-tight',
                                        isPortfolioHealth
                                            ? 'bg-linear-to-br from-[#f12711] to-[#f5af19] bg-clip-text text-transparent'
                                            : 'text-foreground',
                                    )}
                                >
                                    {sectionTitle}
                                </h2>
                            )}
                            {sectionSubtitle && (
                                <p className='text-muted-foreground leading-relaxed text-base md:text-lg font-light'>
                                    {sectionSubtitle}
                                </p>
                            )}

                            {isPortfolioHealth && features.length > 0 && (
                                <div className='flex flex-col gap-3 text-left w-full max-w-200 mt-6'>
                                    {features.map(
                                        (feature: any, idx: number) => (
                                            <div
                                                key={feature._key || idx}
                                                className='flex items-start gap-3'
                                            >
                                                <CheckCircle2 className='w-5 h-5 text-teal shrink-0 mt-0.5' />
                                                <div className='text-sm leading-relaxed'>
                                                    {feature.title && (
                                                        <strong className='text-navy-900 font-semibold mr-1.5'>
                                                            {feature.title}:
                                                        </strong>
                                                    )}
                                                    <span className='font-light text-navy-600'>
                                                        {feature.description}
                                                    </span>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            )}

                            {block.sectionCtaLabel && block.sectionCtaLink && (
                                <Link
                                    href={getPath(block.sectionCtaLink)}
                                    className={cn(
                                        'inline-flex h-11 items-center gap-1.5 justify-center rounded-lg border bg-transparent px-6 text-sm font-semibold transition-colors hover:border-teal hover:text-teal-900 border-navy-900 text-navy-900 hover:bg-navy-900/5 whitespace-nowrap',
                                        isPortfolioHealth ? 'mt-8' : 'mt-2',
                                    )}
                                >
                                    {block.sectionCtaLabel}
                                </Link>
                            )}
                            {resolvedSectionImg && (
                                <div className='relative w-full aspect-video mt-2 rounded-xl overflow-hidden'>
                                    <Image
                                        src={resolvedSectionImg}
                                        alt={sectionTitle}
                                        fill
                                        sizes='(max-width: 1024px) 100vw, 33vw'
                                        className='object-cover'
                                    />
                                </div>
                            )}
                        </div>

                        {!isPortfolioHealth && (
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-left'>
                                {features.map((feature: any, idx: number) => {
                                    // The hardcoded "three apps" screenshots and
                                    // links only belong to the homepage apps
                                    // grid — every other featuresList block on
                                    // the site (Box3 lead magnet, differentiator
                                    // cards, ...) reuses this same schema/case
                                    // and must NOT inherit unrelated app
                                    // screenshots or /apps/* links as a fallback.
                                    const isAppsGrid =
                                        block._key === 'features-core-block';

                                    const resolvedImg = getImageUrl(
                                        feature.image,
                                        feature.imagePath || feature.photoPath,
                                    );
                                    const fallbackImg = isAppsGrid
                                        ? idx === 0
                                            ? '/emlinked/home/DrieKrachtigeApps01_VastgoedbeheerSoftware.webp'
                                            : idx === 1
                                              ? '/emlinked/home/DrieKrachtigeApps02_Huurdersportaal.webp'
                                              : '/emlinked/home/DrieKrachtigeApps03_PaymentSoftware.webp'
                                        : undefined;
                                    const cardImg = resolvedImg || fallbackImg;

                                    const resolvedIconBadge = getImageUrl(
                                        feature.iconImage,
                                        feature.iconPath,
                                    );

                                    const appsGridLink = isAppsGrid
                                        ? idx === 0
                                            ? '/apps/vastgoedbeheer-software'
                                            : idx === 1
                                              ? '/apps/huurdersportaal'
                                              : '/apps/payment-software'
                                        : undefined;
                                    const linkTarget =
                                        feature.ctaLink || appsGridLink;

                                    // version02: card wash rotation lifted from
                                    // the integrationsList section below — teal /
                                    // emerald / navy pastel per card, matching
                                    // the frontpage's layout (v4) recolored with
                                    // our own accent instead of v4's orange/blue.
                                    const cardWash = [
                                        'bg-teal-pale/50',
                                        'bg-emerald-50',
                                        'bg-navy-50',
                                    ];
                                    const iconColor = [
                                        'text-teal bg-white',
                                        'text-emerald-600 bg-white',
                                        'text-navy-700 bg-white',
                                    ];
                                    const linkColor = [
                                        'text-teal',
                                        'text-emerald-600',
                                        'text-navy-700',
                                    ];
                                    const DefaultIcon = [
                                        Building2,
                                        ShieldCheck,
                                        Zap,
                                    ][idx % 3];

                                    return (
                                        <div
                                            key={feature._key || idx}
                                            className={cn(
                                                'rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group relative',
                                                cardWash[idx % cardWash.length],
                                            )}
                                        >
                                            {linkTarget && (
                                                <Link
                                                    href={getPath(linkTarget)}
                                                    className='absolute inset-0 z-20'
                                                    aria-label={feature.title}
                                                />
                                            )}

                                            <div
                                                className={cn(
                                                    'absolute top-1 right-1 z-30 w-11 h-11 rounded-md shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 pointer-events-none ',
                                                    iconColor[
                                                        idx % iconColor.length
                                                    ],
                                                )}
                                            >
                                                <ColorIcon
                                                    src={resolvedIconBadge}
                                                    alt={
                                                        feature.title || 'Icon'
                                                    }
                                                    className='w-7 h-7'
                                                    sizePx={28}
                                                    fallback={
                                                        <DefaultIcon className='size-7' />
                                                    }
                                                />
                                            </div>

                                            <div className='flex flex-col gap-3 p-4  z-10 pointer-events-none'>
                                                <h3
                                                    className={cn(
                                                        'text-xl font-bold transition-colors group-hover:bg-linear-to-br group-hover:from-[#f12711] group-hover:to-[#f5af19] group-hover:bg-clip-text group-hover:text-transparent pr-12',
                                                        linkColor[
                                                            idx %
                                                                linkColor.length
                                                        ],
                                                    )}
                                                >
                                                    {feature.title}
                                                </h3>

                                                <p className='text-sm text-navy-600 leading-relaxed font-light'>
                                                    {feature.description}
                                                </p>
                                            </div>

                                            {/* mt-auto pins image + link to the card's
                                            bottom edge regardless of how much the
                                            description above wraps. */}
                                            <div className='flex flex-col mt-auto'>
                                                {cardImg && (
                                                    <div className='relative w-full h-56 px-4 pb-4'>
                                                        <div className='relative w-full h-full rounded-xl overflow-hidden'>
                                                            <Image
                                                                src={cardImg}
                                                                alt={
                                                                    feature.title ||
                                                                    'Module'
                                                                }
                                                                fill
                                                                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                                                className='object-cover group-hover:scale-105 transition-transform duration-500'
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                <div className='flex justify-end px-6 md:px-8 pb-4 z-10 pointer-events-none'>
                                                    <div
                                                        className={cn(
                                                            'inline-flex items-center gap-1.5 text-sm font-semibold group-hover:translate-x-0.5 transition-all duration-200 w-min whitespace-nowrap',
                                                            linkColor[
                                                                idx %
                                                                    linkColor.length
                                                            ],
                                                        )}
                                                    >
                                                        <span>
                                                            {feature.ctaLabel ||
                                                                (isEn
                                                                    ? 'Discover more'
                                                                    : 'Bekijk module')}
                                                        </span>
                                                        <ArrowRight className='w-3.5 h-3.5' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>
            );
        }

        case 'integrationsList': {
            const sectionTag = block.sectionTag || '';
            const sectionTitle = block.sectionTitle || '';
            const sectionSubtitle = block.sectionSubtitle || '';
            const integrations = block.integrations || block.items || [];

            // version02: soft light-warm canvas instead of the dark navy
            // texture, one pastel wash per card (teal/emerald/navy-50) in
            // place of a flat dark-glass treatment.
            const cardWash = ['bg-teal-pale/50', 'bg-emerald-50', 'bg-navy-50'];

            const resolvedDiagramImg = getImageUrl(
                block.diagramImage,
                block.diagramImagePath,
            );

            return (
                <section
                    key={block._key}
                    // className='px-6 py-24 bg-stone-bg text-navy-900 border-b border-navy-900/10 relative overflow-hidden'
                    className='px-6 py-24 bg-linear-to-br from-teal-ultra via-stone-bg to-teal-pale/60 relative overflow-hidden'
                >
                    <div className='absolute -top-24 -left-24 w-96 h-96 rounded-full bg-teal-pale/40 blur-3xl pointer-events-none' />

                    <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-14'>
                        {/* Centered header + diagram — one Sanity section,
                            not a dark header card stitched to a light body. */}
                        <div className='max-w-3xl mx-auto flex flex-col items-center gap-5 text-center'>
                            {sectionTag && (
                                <div className='flex justify-center'>
                                    <Badge color='teal' uppercase>
                                        {sectionTag}
                                    </Badge>
                                </div>
                            )}
                            <h2 className='font-display text-3xl md:text-4xl lg:text-[2.7rem]/12 font-bold tracking-tight bg-linear-to-br from-[#f12711] to-[#f5af19] bg-clip-text '>
                                {sectionTitle}
                            </h2>
                            {sectionSubtitle && (
                                <p className='text-navy-700 leading-relaxed text-base md:text-lg font-light'>
                                    {sectionSubtitle}
                                </p>
                            )}
                        </div>

                        {resolvedDiagramImg && (
                            <div className='relative w-full max-w-2xl mx-auto aspect-video -mt-5'>
                                <Image
                                    src={resolvedDiagramImg}
                                    alt={sectionTitle}
                                    fill
                                    sizes='(max-width: 1024px) 100vw, 672px'
                                    className='object-cover rounded-2xl shad'
                                />
                            </div>
                        )}

                        <div className='relative grid grid-cols-1 lg:grid-cols-3 gap-8 text-left'>
                            {integrations.map((item: any, idx: number) => {
                                const cardIconImg = getImageUrl(
                                    item.image,
                                    undefined,
                                );
                                const footerSpec =
                                    item.footerSpec ||
                                    (idx === 0
                                        ? 'Direct DB Schema'
                                        : idx === 1
                                          ? 'Continia OCR Engine'
                                          : 'PSD2 / ISO 20022');
                                const nodeLabel =
                                    idx === 0
                                        ? '2-Way Sync'
                                        : idx === 1
                                          ? 'Inbound Feed'
                                          : 'Realtime Feed';

                                return (
                                    <div
                                        key={item._key || idx}
                                        className={cn(
                                            'p-8 rounded-2xl border border-navy-900/10 text-navy-900 hover:border-teal/40 hover:shadow-lg transition-all duration-300 relative overflow-hidden group flex flex-col justify-between gap-6 z-10',
                                            cardWash[idx % cardWash.length],
                                        )}
                                    >
                                        <div className='flex flex-col gap-4 z-10'>
                                            <div
                                                className={cn(
                                                    'flex items-center justify-center text-teal font-bold text-lg overflow-hidden',
                                                    cardIconImg
                                                        ? 'h-24 w-full px-6'
                                                        : 'h-12 w-12 rounded-xl bg-white border border-teal/35 shadow-xs',
                                                )}
                                            >
                                                {cardIconImg ? (
                                                    <div className='relative w-full h-full'>
                                                        <Image
                                                            src={cardIconImg}
                                                            alt={
                                                                item.title ||
                                                                'Integration'
                                                            }
                                                            fill
                                                            sizes='(max-width: 768px) 100vw, 33vw'
                                                            className='object-contain object-left'
                                                        />
                                                    </div>
                                                ) : idx === 0 ? (
                                                    <Database className='h-6 w-6' />
                                                ) : idx === 1 ? (
                                                    <FileText className='h-6 w-6' />
                                                ) : (
                                                    <Cpu className='h-6 w-6' />
                                                )}
                                            </div>

                                            <div className='flex flex-col gap-1 mt-2'>
                                                {item.badge && (
                                                    <span className='text-[10px] font-bold text-teal-hover uppercase tracking-widest'>
                                                        {item.badge}
                                                    </span>
                                                )}
                                                <h3 className='text-2xl font-bold text-navy-900 tracking-tight'>
                                                    {item.title}
                                                </h3>
                                            </div>
                                            <p className='font-normal text-navy-600 leading-relaxed text-sm'>
                                                {item.description}
                                            </p>
                                        </div>

                                        <div className='pt-4 border-t border-navy-900/10 flex items-center justify-between text-xs z-10'>
                                            <span className='text-teal-hover font-mono font-semibold tracking-wide flex items-center gap-1.5'>
                                                <Layers className='h-3.5 w-3.5 text-teal/80' />
                                                {footerSpec}
                                            </span>
                                            <span className='text-emerald-700 font-semibold text-[11px] flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md'>
                                                <span className='w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse' />
                                                {nodeLabel}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            );
        }

        case 'ctaBanner':
        case 'ctaBlock':
        case 'cta': {
            const tag = block.tag || block.badge || '';
            const title = block.title || '';
            const subtitle = block.subtitle || '';
            const buttonLabel = block.buttonLabel || block.buttonText || '';
            const buttonLink = block.buttonLink || '';

            return (
                <section
                    key={block._key}
                    className='p-6 bg-linear-to-br from-teal-ultra via-stone-bg to-teal-pale/60 relative overflow-hidden'
                >
                    <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8'>
                        <div className='text-navy-900 p-10 md:p-16 relative overflow-hidden'>
                            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10'>
                                <div className='lg:col-span-8 flex flex-col gap-5 text-left'>
                                    {tag && (
                                        <Badge
                                            color='teal'
                                            uppercase
                                            dot
                                            dotPulse
                                        >
                                            {tag}
                                        </Badge>
                                    )}
                                    <h2 className='font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight bg-linear-to-br from-[#f12711] to-[#f5af19] bg-clip-text text-transparent'>
                                        {title}
                                    </h2>
                                    <p className='text-navy-700 leading-relaxed font-light text-base md:text-lg max-w-2xl'>
                                        {subtitle}
                                    </p>
                                    {block.bullets &&
                                        block.bullets.length > 0 && (
                                            <div className='flex flex-col gap-3 max-w-2xl ml-6 mb-2'>
                                                {block.bullets.map(
                                                    (b: any, i: number) => (
                                                        <div
                                                            key={b._key || i}
                                                            className='flex items-start gap-3'
                                                        >
                                                            <CheckCircle2 className='w-5 h-5 text-teal shrink-0 mt-0.5' />
                                                            <div className='text-sm leading-relaxed'>
                                                                {b.title && (
                                                                    <strong className='text-navy-900 font-semibold mr-1.5'>
                                                                        {
                                                                            b.title
                                                                        }
                                                                    </strong>
                                                                )}
                                                                <span className='font-light text-navy-700'>
                                                                    {b.text}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        )}
                                    {buttonLabel && buttonLink && (
                                        <Link
                                            href={getPath(buttonLink)}
                                            className='inline-flex items-center justify-center rounded-lg bg-navy-900 hover:btn-gradient py-3 px-12 text-base font-bold text-white shadow-xl transition-colors mr-auto mt-3'
                                        >
                                            {buttonLabel}
                                        </Link>
                                    )}
                                </div>
                                <div className='lg:col-span-4 flex justify-start lg:justify-end'>
                                    <Image
                                        src={
                                            getImageUrl(
                                                block.image,
                                                block.imagePath,
                                            ) ||
                                            '/emlinked/home/Vastgoedbeheer_automatiseren.jpg'
                                        }
                                        alt={title}
                                        width={700}
                                        height={900}
                                        className='w-full lg:w-112 h-120 mt-6 max-w-xl mx-auto object-cover object-center rounded-2xl group-hover:scale-105 transition-transform duration-500 shadow-lg'
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
                    locale={locale}
                    tag={block.tag || block.sectionTag}
                    title={block.title || block.sectionTitle}
                    subtitle={block.subtitle || block.sectionSubtitle}
                    customTestimonials={block.testimonials}
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

        case 'architectureSection': {
            return (
                <AppsArchitectureSection
                    key={block._key}
                    tag={block.tag || block.badge}
                    title={block.title || block.sectionTitle}
                    subtitle={block.subtitle || block.sectionSubtitle}
                    sectionTag={block.sectionTag}
                    sectionTitle={block.sectionTitle}
                    sectionSubtitle={block.sectionSubtitle}
                    bullets={block.bullets}
                    bgImagePath={
                        getImageUrl(block.bgImage, block.bgImagePath) ||
                        undefined
                    }
                    locale={locale}
                />
            );
        }

        default:
            return null;
    }
}
