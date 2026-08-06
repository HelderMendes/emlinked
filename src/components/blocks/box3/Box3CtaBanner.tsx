import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface Box3CtaBannerProps {
    ctaBadge: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButtonText: string;
    ctaButtonLink: string;
    isEn: boolean;
}

export function Box3CtaBanner({
    ctaBadge,
    ctaTitle,
    ctaSubtitle,
    ctaButtonText,
    ctaButtonLink,
    isEn,
}: Box3CtaBannerProps) {
    return (
        <section className='py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] relative z-10'>
            <div className='mx-auto max-w-8xl px-0'>
                <div className='border border-amber/30 rounded-3xl bg-texture-navy text-white p-6 sm:p-10 md:p-14 hover:shadow-[0_25px_60px_rgba(245,158,11,0.15)] transition-all duration-500 relative overflow-hidden group shadow-2xl backdrop-blur-xl'>
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10'>
                        {/* Left Column: Copy & Actions */}
                        <div className='lg:col-span-8 flex flex-col gap-5 text-left'>
                            <span className='inline-flex items-center gap-2 self-start rounded-full bg-amber/15 border border-amber/35 px-5 py-1.5 text-xs font-bold tracking-widest text-amber uppercase backdrop-blur-md'>
                                <span className='w-1.5 h-1.5 bg-amber rounded-full animate-ping' />
                                {ctaBadge}
                            </span>
                            <h2 className='font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight'>
                                {ctaTitle}
                            </h2>
                            <p className='text-white/80 leading-relaxed font-light text-base md:text-lg max-w-2xl'>
                                {ctaSubtitle}
                            </p>

                            <div className='flex flex-col sm:flex-row gap-4 pt-2'>
                                <Link
                                    href={ctaButtonLink}
                                    className='inline-flex h-14 items-center justify-center rounded-2xl border-0 bg-linear-to-r from-[#FF9500] via-[#FF5E00] to-[#FF3B00] hover:brightness-110 px-8 text-base font-bold text-white transition-all duration-200 shadow-lg shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98]'
                                >
                                    <span className='flex items-center justify-center gap-2 text-white'>
                                        <span>{ctaButtonText}</span>
                                        <ArrowRight className='h-5 w-5 text-white' />
                                    </span>
                                </Link>
                                <a
                                    href='#calculator'
                                    className='inline-flex h-14 items-center justify-center rounded-2xl border border-white/20 hover:border-white/40 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98]'
                                >
                                    <span>
                                        {isEn
                                            ? 'Calculate your yield →'
                                            : 'Bereken uw situatie →'}
                                    </span>
                                </a>
                            </div>
                        </div>

                        {/* Right Column: CTA Illustration Image */}
                        <div className='lg:col-span-4 flex justify-start lg:justify-end'>
                            <Image
                                src='/emlinked/box3/box3-automatiseren.jpg'
                                alt='Maak uw vastgoedportefeuille 100% aangifte-klaar'
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
