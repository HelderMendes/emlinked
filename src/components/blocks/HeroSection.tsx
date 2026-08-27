'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DataGridCanvas } from '@/components/ui/data-grid-canvas';

import { BorderBeam } from 'border-beam';

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
    imagePath?: string;
    isHomepage?: boolean;
    locale?: string;
    titleClassName?: string;
    customGraphic?: React.ReactNode;
    children?: React.ReactNode;
}

export function formatHeroTitle(titleText?: string | React.ReactNode) {
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
                    className='text-amber bg-linear-to-r from-amber via-amber-light to-amber bg-clip-text font-extrabold tracking-tight inline'
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
    imagePath = '/hero/vastgoedportfeuille_aangifte-klaar.jpg',
    isHomepage = true,
    locale = 'nl',
    titleClassName,
    customGraphic,
    children,
}: HeroSectionProps) {
    const isEn = locale === 'en';
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
        <section className='relative px-6 py-10 md:py-16 overflow-hidden bg-texture-navy text-white dark:bg-linear-to-br dark:from-[#FFFBEF] dark:via-[#FFFDF9] dark:to-[#FFF3D4] dark:animate-none dark:text-[#060e32] border-b border-white/10 dark:border-amber/10 transition-colors duration-300'>
            {/* Animated Data Grid Canvas overlay */}
            <DataGridCanvas className='pointer-events-none absolute inset-0 h-full w-full opacity-70 z-999' />

            <div className='mx-auto max-w-7xl relative z-10'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
                    {/* Left Column: Copy & Actions */}
                    <div className='lg:col-span-7 flex flex-col gap-6 text-left'>
                        {label && (
                            <span className='inline-flex items-center gap-3.5 self-start rounded-full bg-amber/15 border border-amber/35 px-4.5 py-1 text-xs font-bold tracking-wide text-amber'>
                                <span className='w-1.5 h-1.5 bg-amber rounded-full animate-ping' />
                                {label}
                            </span>
                        )}

                        <h1
                            className={`font-display font-bold tracking-tight text-white dark:text-[#060e32] leading-[1.1] ${titleClassName || 'text-4xl sm:text-5xl lg:text-6xl'}`}
                        >
                            {formatHeroTitle(title)}
                        </h1>

                        {subtitle && (
                            <p className='text-lg md:text-xl text-white/65 dark:text-[#060e32]/75 leading-relaxed font-light'>
                                {subtitle}
                            </p>
                        )}

                        {/* CTAs rendered dynamically (0, 1, or 2 buttons based on Sanity) */}
                        {(ctaLabel || secondaryCtaLabel) && (
                            <div className='flex flex-col sm:flex-row gap-4 mt-2'>
                                {ctaLabel && ctaLink && (
                                    <Link
                                        href={getPath(ctaLink)}
                                        className='inline-flex h-12 items-center justify-center rounded-md bg-amber hover:bg-amber-hover px-6 text-sm font-semibold text-[#060e32] transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98]'
                                    >
                                        {ctaLabel}
                                    </Link>
                                )}
                                {secondaryCtaLabel && secondaryCtaLink && (
                                    <Link
                                        href={getPath(secondaryCtaLink)}
                                        className='inline-flex h-12 items-center justify-center rounded-md border border-white/20 dark:border-[#060e32]/20 bg-transparent px-6 text-sm font-semibold text-white dark:text-[#060e32] hover:bg-white/10 dark:hover:bg-[#060e32]/5 transition-all text-center shadow-sm hover:scale-[1.02] active:scale-[0.98] duration-200'
                                    >
                                        {secondaryCtaLabel}
                                    </Link>
                                )}
                            </div>
                        )}

                        {/* Social proof bar: Text always renders when present; showProof controls avatar cluster vs clean dot */}
                        {effectiveProofText && (
                            <div className='flex items-center gap-3 pt-6 border-t border-white/10 dark:border-[#060e32]/10 mt-2'>
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
                                            <div className='absolute top-full left-0 mt-1.5 w-max min-w-[200px] max-w-[250px] opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-9990 p-2.5 rounded-xl bg-[#FFFDF9] border border-amber/35 shadow-2xl text-left'>
                                                <div className='text-[12px] font-extrabold text-[#060e32] leading-tight'>
                                                    Levi Bosboom
                                                </div>
                                                <div className='text-[11px] text-[#060e32]/80 mt-0.5 leading-tight font-medium'>
                                                    Eigenaar, Vastgoedbeheer
                                                    Rotterdam
                                                </div>
                                                <div className='text-[10px] text-amber mt-1 tracking-widest'>
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
                                            <div className='absolute top-full left-0 mt-1.5 w-max min-w-[200px] max-w-[250px] opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-9990 p-2.5 rounded-xl bg-[#FFFDF9] border border-amber/35 shadow-2xl text-left'>
                                                <div className='text-[12px] font-extrabold text-[#060e32] leading-tight'>
                                                    Angelique van Doorn
                                                </div>
                                                <div className='text-[11px] text-[#060e32]/80 mt-0.5 leading-tight font-medium'>
                                                    Vastgoedbeheerder, Van
                                                    Overhagen
                                                </div>
                                                <div className='text-[10px] text-amber mt-1 tracking-widest'>
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
                                            <div className='absolute top-full left-0 mt-1.5 w-max min-w-[200px] max-w-[250px] opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-9990 p-2.5 rounded-xl bg-[#FFFDF9] border border-amber/35 shadow-2xl text-left'>
                                                <div className='text-[12px] font-extrabold text-[#060e32] leading-tight'>
                                                    Michel De Waal
                                                </div>
                                                <div className='text-[11px] text-[#060e32]/80 mt-0.5 leading-tight font-medium'>
                                                    Directeur, M2 Capital Real
                                                    Estate
                                                </div>
                                                <div className='text-[10px] text-amber mt-1 tracking-widest'>
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
                                            <div className='absolute top-full left-0 mt-1.5 w-max min-w-[200px] max-w-[250px] opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-9990 p-2.5 rounded-xl bg-[#FFFDF9] border border-amber/35 shadow-2xl text-left'>
                                                <div className='text-[12px] font-extrabold text-[#060e32] leading-tight'>
                                                    Sander Bot
                                                </div>
                                                <div className='text-[11px] text-[#060e32]/80 mt-0.5 leading-tight font-medium'>
                                                    Mede-eigenaar, Baetland
                                                    Vastgoed
                                                </div>
                                                <div className='text-[10px] text-amber mt-1 tracking-widest'>
                                                    ★★★★★
                                                </div>
                                                <div className='absolute bottom-full left-3 border-4 border-transparent border-b-[#FFFDF9]' />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0' />
                                )}
                                <span className='text-xs sm:text-sm text-white/80 dark:text-orange font-light leading-snug'>
                                    {effectiveProofText}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Hero Graphic / Image */}
                    {/* Right Column: Hero Graphic / Real Estate Management Dashboard Mockup */}
                    <div className='lg:col-span-5 hover:scale-[1.01] transition-transform duration-300 flex justify-center items-center relative'>
                        <BorderBeam
                            size='md'
                            colorVariant='orange'
                            strength={1.2}
                            className='w-full'
                        >
                            <div className='relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-slate-900/90 backdrop-blur-xl p-5 md:p-6 text-white'>
                                {customGraphic ? (
                                    customGraphic
                                ) : (
                                    <div className='flex flex-col gap-4.5'>
                                        {/* Dashboard Header Bar */}
                                        <div className='flex items-center justify-between border-b border-white/10 pb-3.5'>
                                            <div className='flex items-center gap-2.5'>
                                                <div className='w-3 h-3 rounded-full bg-emerald-400 animate-pulse' />
                                                <span className='text-xs font-bold tracking-wider uppercase text-white/90'>
                                                    {isEn ? 'Real Estate Portfolio View' : 'Vastgoedportefeuille Live'}
                                                </span>
                                            </div>
                                            <span className='inline-flex items-center gap-1.5 rounded-full bg-amber/20 border border-amber/40 px-2.5 py-0.5 text-[11px] font-semibold text-amber'>
                                                <span>Box 3 & BC Native</span>
                                            </span>
                                        </div>

                                        {/* Main KPI Stat Cards */}
                                        <div className='grid grid-cols-2 gap-3'>
                                            <div className='rounded-xl bg-white/5 border border-white/10 p-3.5 flex flex-col justify-between hover:bg-white/10 transition-colors'>
                                                <span className='text-[11px] text-white/60 font-medium'>
                                                    {isEn ? 'Total Rental Assets' : 'Totale Portefeuille'}
                                                </span>
                                                <div className='mt-1 text-2xl font-bold text-white tracking-tight'>
                                                    142 <span className='text-xs font-normal text-emerald-400'>units</span>
                                                </div>
                                                <div className='mt-1.5 flex items-center text-[10px] text-emerald-400 font-semibold gap-1'>
                                                    <span>↑ 99.4% Bezettingsgraad</span>
                                                </div>
                                            </div>

                                            <div className='rounded-xl bg-white/5 border border-white/10 p-3.5 flex flex-col justify-between hover:bg-white/10 transition-colors'>
                                                <span className='text-[11px] text-white/60 font-medium'>
                                                    {isEn ? 'Monthly Rent Roll' : 'Maandelijkse Huurstroom'}
                                                </span>
                                                <div className='mt-1 text-2xl font-bold text-amber tracking-tight'>
                                                    €184.250
                                                </div>
                                                <div className='mt-1.5 flex items-center text-[10px] text-white/70 font-medium gap-1'>
                                                    <span>✓ CPI Geindexeerd</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Operation Activity Widget */}
                                        <div className='rounded-xl bg-white/5 border border-white/10 p-3.5 flex flex-col gap-2.5'>
                                            <div className='flex items-center justify-between text-xs font-semibold text-white/90'>
                                                <span>{isEn ? 'Automated Workflows' : 'Geautomatiseerd Beheer'}</span>
                                                <span className='text-[11px] text-emerald-400 font-medium'>100% Synchroon</span>
                                            </div>

                                            <div className='space-y-2 text-[12px]'>
                                                <div className='flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5'>
                                                    <div className='flex items-center gap-2'>
                                                        <span className='w-2 h-2 rounded-full bg-emerald-400' />
                                                        <span className='text-white/80 font-medium'>Bankaflettering Huur</span>
                                                    </div>
                                                    <span className='text-emerald-400 font-semibold text-[11px]'>Afgeletterd</span>
                                                </div>

                                                <div className='flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5'>
                                                    <div className='flex items-center gap-2'>
                                                        <span className='w-2 h-2 rounded-full bg-amber' />
                                                        <span className='text-white/80 font-medium'>Box 3 Rendement Berekening</span>
                                                    </div>
                                                    <span className='text-amber font-semibold text-[11px]'>Aangifte-klaar</span>
                                                </div>

                                                <div className='flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5'>
                                                    <div className='flex items-center gap-2'>
                                                        <span className='w-2 h-2 rounded-full bg-sky-400' />
                                                        <span className='text-white/80 font-medium'>Dynamics 365 BC Sync</span>
                                                    </div>
                                                    <span className='text-sky-300 font-medium text-[11px]'>Direct Verwerkt</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Platform Footer Banner */}
                                        <div className='flex items-center justify-between pt-1 border-t border-white/10 text-[11px] text-white/50'>
                                            <span>Real Estate Core Ops v4.2</span>
                                            <span className='text-white/80 font-medium'>85% Vastgoed | 15% BC Engine</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </BorderBeam>
                    </div>
                </div>

                {children && (
                    <div className='mt-12 pt-6 border-t border-white/10 dark:border-amber/15 -mb-12'>
                        {children}
                    </div>
                )}
            </div>
        </section>
    );
}
