'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/sanity/image';
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
    image?: any;
    imagePath?: string;
    isHomepage?: boolean;
    locale?: string;
    titleClassName?: string;
    customGraphic?: React.ReactNode;
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

/**
 * Site-wide hero — light stone background, Expose/Zodiak type, teal accent,
 * framed illustration with decorative orbs. Originally a homepage-only
 * variant (version02); now the only template, used on every page. The
 * floating stat chips are homepage-only decoration (their copy is tied to
 * the specific dashboard illustration used there, not real per-page data).
 */
export function HeroSection({
    label = 'DE STANDAARD VOOR MODERN VASTGOEDBEHEER',
    title,
    subtitle,
    ctaLabel = 'Gratis demo aanvragen',
    ctaLink = '/contact',
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
}: HeroSectionProps) {
    const isEn = locale === 'en';
    const effectiveHeroImg = getImageUrl(image, imagePath);
    const effectiveProofText =
        proofText !== undefined
            ? proofText
            : isEn
              ? 'Trusted by professional real estate managers & controllers'
              : 'Vertrouwd door professionele vastgoedbeheerders en controllers';

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
        <section className='relative bg-stone-bg text-navy-900 overflow-hidden'>
            <div className='w-full px-4 sm:px-6 lg:px-12 xl:px-24 py-14 lg:py-24'>
                <div className='grid grid-cols-1 lg:grid-cols-[0.91fr_1.09fr] gap-12 lg:gap-10 items-center'>
                    {/* Left: copy */}
                    <div className='flex flex-col text-center lg:text-left items-center lg:items-start'>
                        {label && (
                            <Badge color='navy' dot className='mb-6'>
                                {label}
                            </Badge>
                        )}
                        <h1
                            className={cn(
                                'font-hero font-semibold leading-[1.1] tracking-[-0.02em] text-[#1D1C1B] max-w-xl',
                                titleClassName || 'text-4xl sm:text-5xl',
                            )}
                        >
                            {formatHeroTitle(title, false)}
                        </h1>

                        {subtitle && (
                            <p className='font-hero-body text-lg text-navy-700 leading-relaxed max-w-[550px] mt-6'>
                                {subtitle}
                            </p>
                        )}

                        {(ctaLabel || secondaryCtaLabel) && (
                            <div className='flex flex-wrap gap-3 mt-8 justify-center lg:justify-start'>
                                {ctaLabel && ctaLink && (
                                    <Link
                                        href={getPath(ctaLink)}
                                        className='inline-flex items-center gap-2 justify-center rounded-lg bg-navy-900 hover:bg-black py-3 px-4 text-sm font-semibold text-white transition-colors whitespace-nowrap'
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
                                        <Image
                                            src='/hero/levi-bosboom.png'
                                            alt='Levi Bosboom'
                                            width={32}
                                            height={32}
                                            className='w-8 h-8 rounded-full border-2 border-white object-cover object-top'
                                        />
                                        <Image
                                            src='/hero/angelique.png'
                                            alt='Angelique van Doorn-Franke'
                                            width={32}
                                            height={32}
                                            className='w-8 h-8 rounded-full border-2 border-white object-cover object-top'
                                        />
                                        <Image
                                            src='/hero/MichelDeWaal.jpg'
                                            alt='Michel De Waal'
                                            width={32}
                                            height={32}
                                            className='w-8 h-8 rounded-full border-2 border-white object-cover object-top'
                                        />
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

                    {/* Right: hero art — decorative orbs + framed illustration */}
                    <div className='relative min-h-[340px] lg:min-h-140 flex items-center justify-center'>
                        <div className='absolute w-140 h-140 rounded-full bg-teal-pale/50 blur-3xl -right-10 top-0 pointer-events-none' />
                        <div className='absolute w-28 h-28 rounded-full bg-teal-ultra blur-2xl left-4 bottom-4 pointer-events-none' />

                        <div className='relative z-10 w-full aspect-4/3'>
                            {customGraphic ? (
                                customGraphic
                            ) : (
                                <Image
                                    src={effectiveHeroImg}
                                    alt={title}
                                    fill
                                    sizes='(max-width: 1024px) 100vw, 55vw'
                                    className='object-cover lg:mask-[linear-gradient(to_right,transparent,black_22%)]'
                                    priority
                                />
                            )}
                        </div>

                        {isHomepage && (
                            <>
                                <div className='absolute z-20 left-0 top-10 flex items-center gap-2.5 bg-white rounded-xl px-3.5 py-3 shadow-xl'>
                                    <span className='w-7 h-7 rounded-lg bg-teal-pale text-teal flex items-center justify-center shrink-0'>
                                        <ArrowUpRight className='w-3.5 h-3.5' />
                                    </span>
                                    <div>
                                        <p className='text-[11px] font-bold text-navy-900 leading-none'>
                                            € 2,45M
                                        </p>
                                        <p className='text-[9px] text-navy-500 mt-1'>
                                            Portefeuillewaarde
                                        </p>
                                    </div>
                                </div>

                                <div className='absolute z-20 right-0 bottom-8 flex items-center gap-2.5 bg-white rounded-xl px-3.5 py-3 shadow-xl'>
                                    <span className='w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0'>
                                        <svg
                                            className='w-3.5 h-3.5'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            stroke='currentColor'
                                            strokeWidth='3'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                d='M4.5 12.75l6 6 9-13.5'
                                            />
                                        </svg>
                                    </span>
                                    <div>
                                        <p className='text-[11px] font-bold text-navy-900 leading-none'>
                                            Bankaflettering
                                        </p>
                                        <p className='text-[9px] text-navy-500 mt-1'>
                                            100% Synced
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
