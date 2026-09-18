'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DataGridCanvas } from '@/components/ui/data-grid-canvas';

import { BorderBeam } from 'border-beam';
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
    children?: React.ReactNode;
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
    // Was `true` — inert until this redesign gave the prop a visual effect.
    // Call sites that never passed it (over-ons, contact, nieuws, ...) would
    // have silently inherited the homepage's soft background. Defaulting to
    // false keeps every page's look unchanged unless explicitly opted in.
    isHomepage = false,
    locale = 'nl',
    titleClassName,
    customGraphic,
    children,
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

    // The homepage hero swaps the site-wide dark navy backdrop for a flat,
    // light, structural layout (version02) — every other page using
    // HeroSection (contact, apps, prijzen, ...) keeps today's dark-navy
    // hero untouched, rendered by the JSX further below.
    const soft = isHomepage;

    if (soft) {
        return (
            <section className='relative bg-stone-bg text-navy-900 border-b border-navy-900/10'>
                <div className='mx-auto max-w-9xl px-4 sm:px-6 lg:px-8 lg:py-20'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 border-x border-navy-900/10 lg:divide-x lg:divide-navy-900/10'>
                        {/* Left: eyebrow + headline */}
                        <div className='px-6 sm:px-10  flex flex-col gap-8'>
                            {label && <Badge color='navy'>{label}</Badge>}
                            <h1 className='font-hero font-semibold text-5xl/tight tracking-[-0.75px] text-[#1D1C1B]'>
                                {formatHeroTitle(title, false)}
                            </h1>
                        </div>

                        {/* Right: subtitle + CTAs */}
                        <div className='px-6 sm:px-10 flex flex-col justify-center gap-8'>
                            {subtitle && (
                                <p className='font-hero-body text-lg text-navy-700 leading-relaxed max-w-xl'>
                                    {subtitle}
                                </p>
                            )}

                            {(ctaLabel || secondaryCtaLabel) && (
                                <div className='flex flex-wrap gap-3'>
                                    {ctaLabel && ctaLink && (
                                        <Link
                                            href={getPath(ctaLink)}
                                            className='inline-flex items-center gap-2 justify-center  rounded-lg bg-navy-900 hover:bg-black py-3 px-4 text-sm font-semibold text-white transition-colors w-min whitespace-nowrap'
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
                                <p className='text-xs text-navy-500'>
                                    {effectiveProofText}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section
            className={cn(
                'relative px-6 py-10 md:py-16 overflow-hidden border-b transition-colors duration-300',
                soft
                    ? 'bg-stone-bg bg-mesh-brand text-navy-900 border-navy-900/10'
                    : 'bg-texture-navy text-white border-white/10',
                'dark:bg-linear-to-br dark:from-[#dc9ed4] dark:via-[#9ff1f5] dark:to-[#b6fcca] dark:animate-none dark:text-[#060e32] dark:border-teal/10',
            )}
        >
            {/* Animated Data Grid Canvas overlay — designed for the dark
                navy backdrop, so only render it there. */}
            {!soft && (
                <DataGridCanvas className='pointer-events-none absolute inset-0 h-full w-full opacity-70 z-999' />
            )}

            <div className='mx-auto max-w-7xl relative z-10'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
                    {/* Left Column: Copy & Actions */}
                    <div className='lg:col-span-7 flex flex-col gap-6 text-left'>
                        {label &&
                            (soft ? (
                                <span className='inline-flex items-center self-start rounded-full border border-navy-900/20 px-4 py-1.5 text-xs font-semibold tracking-wide text-navy-700'>
                                    {label}
                                </span>
                            ) : (
                                <Badge color='teal' dot dotPulse>
                                    {label}
                                </Badge>
                            ))}

                        <h1
                            className={cn(
                                'font-bold leading-[1.05] dark:text-[#060e32]',
                                soft
                                    ? 'font-hero tracking-[-0.02em]'
                                    : 'font-display tracking-tight',
                                soft ? 'text-navy-900' : 'text-white',
                                titleClassName ||
                                    'text-4xl sm:text-5xl lg:text-6xl',
                            )}
                        >
                            {formatHeroTitle(title)}
                        </h1>

                        {subtitle && (
                            <p
                                className={cn(
                                    'text-lg md:text-xl leading-relaxed font-light dark:text-[#060e32]/75',
                                    soft ? 'text-navy-700' : 'text-white/65',
                                )}
                            >
                                {subtitle}
                            </p>
                        )}

                        {/* CTAs rendered dynamically (0, 1, or 2 buttons based on Sanity) */}
                        {(ctaLabel || secondaryCtaLabel) && (
                            <div className='flex flex-col sm:flex-row gap-4 mt-2'>
                                {ctaLabel && ctaLink && (
                                    <Link
                                        href={getPath(ctaLink)}
                                        className='inline-flex h-12 items-center justify-center rounded-md bg-teal hover:bg-teal-hover px-6 text-sm font-semibold text-[#060e32] transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98]'
                                    >
                                        {ctaLabel}
                                    </Link>
                                )}
                                {secondaryCtaLabel && secondaryCtaLink && (
                                    <Link
                                        href={getPath(secondaryCtaLink)}
                                        className={cn(
                                            'inline-flex h-12 items-center justify-center rounded-md bg-transparent px-6 text-sm font-semibold transition-all text-center shadow-sm hover:scale-[1.02] active:scale-[0.98] duration-200 dark:border-[#060e32]/20 dark:text-[#060e32] dark:hover:bg-[#060e32]/5',
                                            soft
                                                ? 'border border-navy-900/15 text-navy-900 hover:bg-navy-900/5'
                                                : 'border border-white/20 text-white hover:bg-white/10',
                                        )}
                                    >
                                        {secondaryCtaLabel}
                                    </Link>
                                )}
                            </div>
                        )}

                        {/* Social proof bar: Text always renders when present; showProof controls avatar cluster vs clean dot */}
                        {effectiveProofText && (
                            <div
                                className={cn(
                                    'flex items-center gap-3 pt-6 border-t mt-2 dark:border-[#060e32]/10',
                                    soft
                                        ? 'border-navy-900/10'
                                        : 'border-white/10',
                                )}
                            >
                                {showProof && showProofAvatars ? (
                                    <div className='flex -space-x-2.5 overflow-visible relative shrink-0'>
                                        {/* Levi Bosboom */}
                                        <div className='relative group z-30 hover:z-50'>
                                            <Image
                                                src='/hero/levi-bosboom.png'
                                                alt='Levi Bosboom'
                                                width={32}
                                                height={32}
                                                className='w-8 h-8 rounded-full border-2 border-navy dark:border-[#FFFBEF] object-cover object-top hover:scale-110 transition-transform duration-200 cursor-pointer'
                                            />
                                            <div className='absolute top-full left-0 mt-1.5 w-max min-w-[200px] max-w-[250px] opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-9990 p-2.5 rounded-xl bg-[#FFFDF9] border border-teal/35 shadow-2xl text-left'>
                                                <div className='text-[12px] font-extrabold text-[#060e32] leading-tight'>
                                                    Levi Bosboom
                                                </div>
                                                <div className='text-[11px] text-[#060e32]/80 mt-0.5 leading-tight font-medium'>
                                                    Eigenaar, Vastgoedbeheer
                                                    Rotterdam
                                                </div>
                                                <div className='text-[10px] text-teal mt-1 tracking-widest'>
                                                    ★★★★★
                                                </div>
                                                <div className='absolute bottom-full left-3 border-4 border-transparent border-b-[#FFFDF9]' />
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
                                            <div className='absolute top-full left-0 mt-1.5 w-max min-w-[200px] max-w-[250px] opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-9990 p-2.5 rounded-xl bg-[#FFFDF9] border border-teal/35 shadow-2xl text-left'>
                                                <div className='text-[12px] font-extrabold text-[#060e32] leading-tight'>
                                                    Angelique van Doorn
                                                </div>
                                                <div className='text-[11px] text-[#060e32]/80 mt-0.5 leading-tight font-medium'>
                                                    Vastgoedbeheerder, Van
                                                    Overhagen
                                                </div>
                                                <div className='text-[10px] text-teal mt-1 tracking-widest'>
                                                    ★★★★★
                                                </div>
                                                <div className='absolute bottom-full left-3 border-4 border-transparent border-b-[#FFFDF9]' />
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
                                            <div className='absolute top-full left-0 mt-1.5 w-max min-w-[200px] max-w-[250px] opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-9990 p-2.5 rounded-xl bg-[#FFFDF9] border border-teal/35 shadow-2xl text-left'>
                                                <div className='text-[12px] font-extrabold text-[#060e32] leading-tight'>
                                                    Michel De Waal
                                                </div>
                                                <div className='text-[11px] text-[#060e32]/80 mt-0.5 leading-tight font-medium'>
                                                    Directeur, M2 Capital Real
                                                    Estate
                                                </div>
                                                <div className='text-[10px] text-teal mt-1 tracking-widest'>
                                                    ★★★★★
                                                </div>
                                                <div className='absolute bottom-full left-3 border-4 border-transparent border-b-[#FFFDF9]' />
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
                                            <div className='absolute top-full left-0 mt-1.5 w-max min-w-[200px] max-w-[250px] opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-9990 p-2.5 rounded-xl bg-[#FFFDF9] border border-teal/35 shadow-2xl text-left'>
                                                <div className='text-[12px] font-extrabold text-[#060e32] leading-tight'>
                                                    Sander Bot
                                                </div>
                                                <div className='text-[11px] text-[#060e32]/80 mt-0.5 leading-tight font-medium'>
                                                    Mede-eigenaar, Baetland
                                                    Vastgoed
                                                </div>
                                                <div className='text-[10px] text-teal mt-1 tracking-widest'>
                                                    ★★★★★
                                                </div>
                                                <div className='absolute bottom-full left-3 border-4 border-transparent border-b-[#FFFDF9]' />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0' />
                                )}
                                <span
                                    className={cn(
                                        'text-xs sm:text-sm font-light leading-snug dark:text-orange',
                                        soft
                                            ? 'text-navy-700'
                                            : 'text-white/80',
                                    )}
                                >
                                    {effectiveProofText}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Hero Graphic / Image */}
                    <div className='lg:col-span-5 hover:scale-[1.01] transition-transform duration-300 flex justify-center items-center relative'>
                        <BorderBeam
                            size='md'
                            colorVariant='orange'
                            strength={1.2}
                            className='w-full'
                        >
                            <div
                                className={cn(
                                    'relative w-full rounded-2xl overflow-hidden shadow-2xl border dark:border-teal/20',
                                    soft
                                        ? 'border-navy-900/10'
                                        : 'border-white/10',
                                )}
                            >
                                {customGraphic ? (
                                    customGraphic
                                ) : (
                                    <Image
                                        src={effectiveHeroImg}
                                        alt={title}
                                        width={600}
                                        height={500}
                                        className='w-full h-auto object-cover rounded-2xl'
                                        priority
                                    />
                                )}
                            </div>
                        </BorderBeam>
                    </div>
                </div>

                {children && (
                    <div
                        className={cn(
                            'mt-12 pt-6 border-t -mb-12 dark:border-teal/15',
                            soft ? 'border-navy-900/10' : 'border-white/10',
                        )}
                    >
                        {children}
                    </div>
                )}
            </div>
        </section>
    );
}
