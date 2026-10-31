'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl, type SanityImageLike } from '@/sanity/image';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { OutlineLinkButton } from '@/components/ui/OutlineLinkButton';

export interface HeroSectionProps {
    label?: string;
    title: string;
    subtitle?: string;
    ctaLabel?: string;
    ctaLink?: string;
    secondaryCtaLabel?: string;
    secondaryCtaLink?: string;
    showProof?: boolean;
    showProofAvatars?: boolean;
    proofText?: string;
    image?: SanityImageLike;
    imagePath?: string;
    isHomepage?: boolean;
    locale?: string;
    titleClassName?: string;
    customGraphic?: React.ReactNode;
    centered?: boolean;
    hideImage?: boolean;
    floatingLabels?: Array<{
        icon: React.ReactNode;
        value: string;
        label: string;
        position?: 'top-left' | 'bottom-right' | 'top-right' | 'bottom-left';
        iconVariant?: 'teal' | 'emerald' | 'navy';
    }>;
}

const floatingLabelIconClasses: Record<string, string> = {
    teal: 'rounded-lg bg-teal-pale text-teal',
    emerald: 'rounded-full bg-emerald-50 text-emerald-600',
    navy: 'rounded-lg bg-navy-50 text-navy-900',
};

const floatingLabelPositionClasses: Record<string, string> = {
    'top-left': 'top-10 -left-5 lg:left-0',
    'top-right': 'top-10 -right-5 lg:-right-4',
    'bottom-left': 'bottom-8 -left-5 lg:-left-2',
    'bottom-right': 'bottom-8 -right-5 lg:-right-4',
};

const PROOF_AVATARS = [
    {
        src: '/hero/levi-bosboom.png',
        name: 'Levi Bosboom',
        roleNl: 'Eigenaar - Vastgoedbeheer Rotterdam (VGBR)',
        roleEn: 'Owner - Vastgoedbeheer Rotterdam (VGBR)',
    },
    {
        src: '/hero/angelique.png',
        name: 'Angelique van Doorn-Franke',
        roleNl: 'Vastgoedbeheerder - Van Overhagen Vastgoed B.V.',
        roleEn: 'Property Manager - Van Overhagen Vastgoed B.V.',
    },
    {
        src: '/hero/MichelDeWaal.jpg',
        name: 'Michel De Waal',
        roleNl: 'Directeur - M2 Capital Real Estate B.V.',
        roleEn: 'Director - M2 Capital Real Estate B.V.',
    },
];

export function stripHeroTitleMarkup(titleText?: string): string {
    if (!titleText) return '';
    return titleText.replace(/\*/g, '');
}

// Sanity CDN URLs embed the asset's native pixel size (e.g. "...-1300x896.jpg"),
// letting the illustration box match its real proportions below lg instead of
// forcing a crop via a fixed aspect-ratio class.
function getNativeImageDimensions(
    imageUrl: string,
): { width: number; height: number } | null {
    const match = imageUrl.match(/-(\d+)x(\d+)\.\w+/);
    return match
        ? { width: parseInt(match[1], 10), height: parseInt(match[2], 10) }
        : null;
}

export function formatHeroTitle(
    titleText?: string | React.ReactNode,
    boldAccent: boolean = true,
) {
    if (!titleText) return null;
    if (typeof titleText !== 'string') return titleText;
    let formatted = titleText;
    if (!formatted.includes('*')) {
        formatted = formatted.replace('aangifte-klaar', '*aangifte-klaar*');
    }
    const parts = formatted.split(/(\*[^*]+\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
            return (
                <span
                    key={index}
                    className={cn(
                        'text-teal bg-linear-to-r from-teal via-teal-light to-teal bg-clip-text tracking-tight inline',
                        boldAccent ? 'font-extrabold' : 'font-normal',
                    )}
                >
                    {part.slice(1, -1)}
                </span>
            );
        }
        return part;
    });
}

export function HeroSection({
    label,
    title,
    subtitle,
    ctaLabel,
    ctaLink,
    secondaryCtaLabel,
    secondaryCtaLink,
    showProof = true,
    showProofAvatars = true,
    proofText,
    image,
    imagePath = '/hero/vastgoedportfeuille_aangifte-klaar.jpg',
    isHomepage = false,
    locale = 'nl',
    titleClassName,
    customGraphic,
    centered = false,
    hideImage = false,
    floatingLabels,
}: HeroSectionProps) {
    const isEn = locale === 'en';
    const effectiveHeroImg = getImageUrl(image, imagePath);
    const heroImgDims = getNativeImageDimensions(effectiveHeroImg);
    const effectiveProofText = proofText || '';

    const getPath = (path: string) => {
        if (!path) return isEn ? '/en' : '/';
        if (path === '#demo' || path.startsWith('#')) return path;
        if (isEn) {
            if (path.startsWith('/en')) return path;
            return `/en${path === '/' ? '' : path}`;
        }
        return path;
    };

    return (
        <section className='relative bg-stone-bg text-navy-900'>
            <div className='w-full px-4 sm:px-6 lg:px-12 xl:px-24 pt-12 pb-8'>
                <div
                    className={cn(
                        'grid grid-cols-1 gap-12 lg:gap-10 items-center',
                        centered || hideImage
                            ? 'justify-items-center'
                            : 'lg:grid-cols-[0.91fr_1.09fr]',
                    )}
                >
                    {/* Left: copy (centered: just "copy", full width, no lg left-align) */}
                    <div
                        className={cn(
                            'flex flex-col items-center text-center',
                            !(centered || hideImage) &&
                                'lg:text-left lg:items-start',
                        )}
                    >
                        {label && (
                            <Badge
                                color='navy'
                                dot
                                className={cn(
                                    'self-center mb-4',
                                    !(centered || hideImage) && 'lg:self-start',
                                )}
                            >
                                {label}
                            </Badge>
                        )}
                        <h1
                            className={cn(
                                'font-hero font-semibold leading-[1.1] tracking-[-0.02em] text-[#1D1C1B] max-w-3xl',
                                titleClassName || 'text-4xl sm:text-5xl',
                            )}
                        >
                            {formatHeroTitle(title, false)}
                        </h1>

                        {subtitle && (
                            <p className='font-hero-body text-lg text-navy-700 leading-relaxed max-w-3xl mt-6'>
                                {subtitle}
                            </p>
                        )}

                        {(ctaLabel || secondaryCtaLabel) && (
                            <div
                                className={cn(
                                    'flex flex-wrap gap-3 mt-8 justify-center',
                                    !(centered || hideImage) &&
                                        'lg:justify-start',
                                )}
                            >
                                {ctaLabel && ctaLink && (
                                    <Link
                                        href={getPath(ctaLink)}
                                        className='inline-flex items-center gap-2 justify-center rounded-lg bg-navy-900 hover:btn-gradient py-3 px-4 text-sm font-semibold text-white transition-colors whitespace-nowrap'
                                    >
                                        {ctaLabel}
                                        <ArrowUpRight className='w-4 h-4' />
                                    </Link>
                                )}
                                {secondaryCtaLabel && secondaryCtaLink && (
                                    <OutlineLinkButton
                                        href={getPath(secondaryCtaLink)}
                                        color='navy'
                                    >
                                        {secondaryCtaLabel}
                                        <ArrowUpRight className='w-4 h-4' />
                                    </OutlineLinkButton>
                                )}
                            </div>
                        )}

                        {effectiveProofText && (
                            <div className='flex items-center gap-3 mt-10'>
                                {showProof && showProofAvatars ? (
                                    <div className='flex -space-x-2.5 overflow-visible relative shrink-0'>
                                        {PROOF_AVATARS.map((person, idx) => (
                                            <div
                                                key={person.name}
                                                className='relative group hover:z-50'
                                                style={{
                                                    zIndex:
                                                        PROOF_AVATARS.length -
                                                        idx,
                                                }}
                                            >
                                                <Image
                                                    src={person.src}
                                                    alt={person.name}
                                                    width={32}
                                                    height={32}
                                                    className='w-8 h-8 rounded-full border-2 border-white object-cover object-top hover:scale-110 transition-transform duration-200 cursor-pointer'
                                                />
                                                <div className='absolute top-full left-0 mt-1.5 w-max min-w-[190px] max-w-[240px] opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-50 p-2.5 rounded-lg bg-navy-900 border border-white/10 shadow-xl text-left'>
                                                    <div className='text-[12px] font-bold text-teal leading-tight'>
                                                        {person.name}
                                                    </div>
                                                    <div className='text-[11px] text-white/70 mt-0.5 leading-tight'>
                                                        {isEn
                                                            ? person.roleEn
                                                            : person.roleNl}
                                                    </div>
                                                    <div className='text-[10px] text-teal mt-1'>
                                                        ★★★★★
                                                    </div>
                                                    <div className='absolute bottom-full left-3 border-4 border-transparent border-b-navy-900' />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <span className='w-2 h-2 rounded-full bg-teal shrink-0' />
                                )}
                                <p className='text-xs text-navy-500 text-left'>
                                    {effectiveProofText}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right: hero art — decorative orbs + framed illustration.
                        Centered variant shrinks this to 2/3 width, stacked
                        below the copy instead of sitting beside it.
                        Skipped entirely when hideImage is set. */}
                    {!hideImage && (
                        <div
                            className={cn(
                                'relative w-full lg:min-h-140 lg:flex lg:items-center lg:justify-center lg:max-w-none lg:mx-0',
                                centered && 'w-full lg:w-2/3',
                            )}
                        >
                            {/* Mobile/tablet (<lg): plain intrinsic-sized image.
                                Self-sizes from its own width via h-auto — never
                                depends on an ancestor having a resolved height,
                                unlike the fill-based desktop version below. */}
                            {customGraphic ? (
                                <div className='w-full max-w-2xl mx-auto lg:hidden'>
                                    {customGraphic}
                                </div>
                            ) : (
                                <Image
                                    src={effectiveHeroImg}
                                    alt={stripHeroTitleMarkup(title)}
                                    width={heroImgDims?.width ?? 1300}
                                    height={heroImgDims?.height ?? 896}
                                    sizes='100vw'
                                    className='w-full max-w-2xl mx-auto h-auto rounded-xl lg:hidden'
                                    priority
                                />
                            )}

                            <div className='hidden lg:block absolute inset-0 overflow-hidden'>
                                <div className='absolute w-140 h-140 rounded-full bg-teal-pale/50 blur-3xl -right-10 top-0 pointer-events-none' />
                                <div className='absolute w-28 h-28 rounded-full bg-teal-ultra blur-2xl left-4 bottom-4 pointer-events-none' />

                                <div
                                    className={cn(
                                        'relative z-10 w-full',
                                        isHomepage ||
                                            (floatingLabels &&
                                                floatingLabels.length > 0)
                                            ? 'absolute inset-x-0 top-19 bottom-[49px]'
                                            : 'aspect-video',
                                    )}
                                >
                                    {customGraphic ? (
                                        customGraphic
                                    ) : (
                                        <Image
                                            src={effectiveHeroImg}
                                            alt={stripHeroTitleMarkup(title)}
                                            fill
                                            sizes='55vw'
                                            className='object-cover lg:mask-[linear-gradient(to_right,transparent,black_22%)]'
                                            priority
                                        />
                                    )}
                                </div>
                            </div>

                            {!customGraphic &&
                                floatingLabels?.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className={cn(
                                            'absolute z-20 hidden md:flex items-center gap-2.5 bg-white rounded-lg px-3.5 py-3 shadow-md',
                                            floatingLabelPositionClasses[
                                                item.position ||
                                                    (idx % 2 === 0
                                                        ? 'top-left'
                                                        : 'bottom-right')
                                            ],
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                'relative w-7 h-7 flex items-center justify-center shrink-0',
                                                floatingLabelIconClasses[
                                                    item.iconVariant ||
                                                        (idx % 2 === 0
                                                            ? 'teal'
                                                            : 'emerald')
                                                ],
                                            )}
                                        >
                                            {item.icon}
                                        </span>
                                        <div>
                                            <p className='text-[12px] font-bold text-navy-900 leading-none'>
                                                {item.value}
                                            </p>
                                            <p className='text-[11px] text-navy-500 mt-0.5'>
                                                {item.label}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
