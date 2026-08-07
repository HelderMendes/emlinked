import React from 'react';
import Image from 'next/image';
import { Scale } from 'lucide-react';

interface Box3VoorWieSectionProps {
    voorWieBadge: string;
    voorWieTitle: string;
    voorWieSubtitle: string;
    fiscalContextBadge: string;
    fiscalContextTitle: string;
    fiscalContextText: string;
    voorWieItems: Array<{
        icon: React.ReactNode;
        title: string;
        text: string;
    }>;
}

export function Box3VoorWieSection({
    voorWieBadge,
    voorWieTitle,
    voorWieSubtitle,
    fiscalContextBadge,
    fiscalContextTitle,
    fiscalContextText,
    voorWieItems,
}: Box3VoorWieSectionProps) {
    return (
        <section
            id='voor-wie'
            className='py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] text-[#060e32] border-b border-amber/20'
        >
            <div className='max-w-7xl mx-auto space-y-12'>
                {/* Centered Section Header: Badge, Title & Subtitle Text */}
                <div className='text-center max-w-3xl mx-auto space-y-4'>
                    <span className='inline-flex items-center gap-2 text-xs font-bold text-amber uppercase tracking-widest bg-amber/15 border border-amber/35 px-5 py-1.5 rounded-full shadow-xs mx-auto'>
                        <span className='w-1.5 h-1.5 bg-amber rounded-full animate-ping' />
                        <span>{voorWieBadge}</span>
                    </span>
                    <h2 className='font-display text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[#060e32] leading-tight tracking-tight text-center'>
                        {voorWieTitle}
                    </h2>
                    <p className='text-[#060e32]/80 text-base md:text-lg leading-relaxed font-light text-center max-w-2xl mx-auto'>
                        {voorWieSubtitle}
                    </p>
                </div>

                {/* Unified Hero Feature Card: Fiscale Context (Left) + 3D Illustration (Right) */}
                <div className='rounded-2xl bg-white/80 border border-black/10 grid grid-cols-1 lg:grid-cols-12 items-stretch group hover:border-amber/50 shadow-sm  overflow-hidden transition-all duration-300 max-w-7xl mx-auto'>
                    {/* Left: Fiscale Context Info */}
                    <div className='lg:col-span-6 p-8 md:p-10 flex flex-col justify-center gap-5 text-left relative z-10'>
                        <div className='flex items-center justify-between w-full'>
                            <div className='w-12 h-12 rounded-full bg-linear-to-br from-amber-400 via-amber-500 to-orange-500 text-white shrink-0 shadow-lg shadow-orange-500/20 border border-white/40 flex items-center justify-center'>
                                <Scale className='w-6 h-6 text-white' />
                            </div>
                            <span className='px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest bg-[#FFEED8] text-[#D97706] border border-[#FCD34D] shadow-xs'>
                                {fiscalContextBadge}
                            </span>
                        </div>
                        <div className='space-y-3'>
                            <h3 className='text-xl md:text-2xl font-bold text-[#060e32] tracking-tight'>
                                {fiscalContextTitle}
                            </h3>
                            <p className='text-sm md:text-base text-[#060e32]/80 leading-relaxed font-light'>
                                {fiscalContextText}
                            </p>
                        </div>
                    </div>

                    {/* Right: Integrated Image */}
                    <div className='lg:col-span-6 relative min-h-[300px] lg:min-h-full overflow-hidden bg-slate-950'>
                        <Image
                            src='/emlinked/box3/box3-fiscalContext.jpg'
                            alt='Wet werkelijk rendement box 3 - Fiscale Context'
                            fill
                            className='object-cover object-center group-hover:scale-105 transition-transform duration-700'
                        />
                        <div className='absolute inset-0 bg-linear-to-r from-white/10 via-transparent to-transparent pointer-events-none' />
                    </div>
                </div>

                {/* 4 Pain Points: Single Outer Box Container with Vertical Dividers */}
                <div className='bg-white/80 rounded-2xl border border-black/10 shadow-sm p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-black/10 text-left max-w-7xl mx-auto'>
                    {voorWieItems.map((item: any, idx: number) => (
                        <div
                            key={idx}
                            className='px-4 py-5 lg:py-2 flex flex-col items-start justify-start text-left space-y-3 group'
                        >
                            <div className='flex items-center gap-3 w-full'>
                                <div className='w-10 h-10 rounded-full border-2 border-amber bg-[#F4F7FA] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:border-amber-hover transition-all duration-300'>
                                    {item.icon}
                                </div>
                                <h3 className='text-sm md:text-base font-bold text-[#060e32] text-left leading-tight'>
                                    {item.title}
                                </h3>
                            </div>
                            <p className='text-xs text-[#060e32]/75 leading-relaxed font-light text-left'>
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
