'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { getImageUrl } from '@/sanity/image';
import { Badge } from '@/components/ui/Badge';

interface AppsArchitectureSectionProps {
    locale?: string;
    tag?: string;
    title?: string;
    subtitle?: string;
    sectionTag?: string;
    sectionTitle?: string;
    sectionSubtitle?: string;
    bullets?: Array<{ bold?: string; text: string }>;
    bgImage?: any;
    bgImagePath?: string;
    diagramImage?: any;
    diagramImagePath?: string;
    calloutImage?: any;
    calloutImagePath?: string;
}

export function AppsArchitectureSection({
    locale = 'nl',
    tag,
    title,
    subtitle,
    sectionTag,
    sectionTitle,
    sectionSubtitle,
    bullets: customBullets,
    bgImage,
    bgImagePath = '/emlinked/apps/bg_naadloze_integratie_section.jpg',
    diagramImage,
    diagramImagePath = '/emlinked/apps/naadloze-intergratie.png',
    calloutImage,
    calloutImagePath = '/emlinked/apps/samenwerken-binnen-ERP.jpg',
}: AppsArchitectureSectionProps) {
    const activeBullets = customBullets || [];
    const activeTag = tag || '';
    const activeTitle = title || '';
    const activeSubtitle = subtitle || '';

    const activeSectionTag = sectionTag || '';
    const activeSectionTitle = sectionTitle || '';
    const activeSectionSubtitle = sectionSubtitle || '';

    const resolvedBgImage = getImageUrl(bgImage, bgImagePath);
    const resolvedDiagramImage = getImageUrl(diagramImage, diagramImagePath);
    const resolvedCalloutImage = getImageUrl(calloutImage, calloutImagePath);

    return (
        <section className='relative px-6 py-20 text-navy-900 border-b border-navy-900/10 overflow-hidden bg-stone-bg'>
            {/* Custom Section Background Image - faint, light wash on top */}
            <Image
                src={resolvedBgImage}
                alt={activeTitle}
                fill
                priority
                sizes='100vw'
                className='object-cover object-center opacity-10 pointer-events-none'
            />
            <div className='absolute inset-0 bg-linear-to-b from-stone-bg/60 via-stone-bg/85 to-stone-bg pointer-events-none' />

            {/* Ambient Background Radial Glows */}
            <div className='absolute top-0 right-1/4 w-200 h-200 bg-teal-pale/40 blur-3xl pointer-events-none rounded-full opacity-90' />
            <div className='absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-teal-ultra blur-3xl pointer-events-none rounded-full opacity-60' />

            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 relative z-10'>
                {/* ── 1. TOP PART: CENTERED HEADER & SMALLER TOP PNG DIAGRAM ── */}
                <div className='max-w-4xl mx-auto flex flex-col items-center text-center space-y-6'>
                    <Badge color='teal' uppercase>
                        {activeTag}
                    </Badge>

                    <h2 className='font-display text-3xl md:text-4xl lg:text-[2.7rem]/12 font-bold tracking-tight text-navy-900'>
                        {activeTitle}
                    </h2>

                    <p className='text-navy-700 leading-relaxed text-base md:text-lg font-light max-w-3xl'>
                        {activeSubtitle}
                    </p>

                    {/* Centered Transparent PNG Architecture Diagram on Dark Background */}
                    <div className='relative w-full max-w-90 h-90 items-center justify-center mx-auto transition-all duration-300 mb-2'>
                        <Image
                            src={resolvedDiagramImage}
                            alt={activeTitle}
                            fill
                            sizes='360px'
                            className='object-contain hover:scale-105 transition-transform duration-500 drop-shadow-[0_15px_35px_rgba(0,0,0,0.25)] bg-transparent rounded-full'
                            priority
                        />
                    </div>
                </div>

                {/* ── 2. BOTTOM PART: BOX 3 STYLE BULLETS & 3D VISUAL ──────── */}
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-4 border-t border-navy-900/10'>
                    {/* Left Column: Title, Subtitle & Bullets matching Box 3 check styling */}
                    <div className='lg:col-span-7 flex flex-col gap-6 text-left'>
                        <Badge color='teal' uppercase>
                            {activeSectionTag}
                        </Badge>

                        <h3 className='font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-navy-900 leading-tight'>
                            {activeSectionTitle}
                        </h3>

                        <p className='text-navy-700 text-base md:text-lg leading-relaxed font-light'>
                            {activeSectionSubtitle}
                        </p>

                        {/* Bullets matching Frontpage Box 3 check styling */}
                        <div className='flex flex-col gap-4 my-1'>
                            {activeBullets.map((b, idx) => (
                                <div
                                    key={idx}
                                    className='flex items-start gap-3.5 group'
                                >
                                    <div className='h-7 w-7 rounded-xl bg-teal/20 border border-teal/40 flex items-center justify-center text-teal shrink-0 mt-0.5 shadow-sm group-hover:bg-teal group-hover:text-white transition-all duration-300'>
                                        <CheckCircle2 className='h-4 w-4' />
                                    </div>
                                    <div className='text-sm sm:text-base leading-relaxed text-navy-700 pt-0.5'>
                                        {b.bold && (
                                            <strong className='text-navy-900 font-semibold mr-1.5'>
                                                {b.bold}
                                            </strong>
                                        )}
                                        <span className='font-light text-navy-600'>
                                            {b.text}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: 3D Visual Workspace Image */}
                    <div className='lg:col-span-5 flex justify-center items-center'>
                        <div className='relative w-full max-w-md aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden border border-navy-900/10 shadow-xl group flex items-center justify-center hover:border-teal/60 transition-all duration-500'>
                            <Image
                                src={resolvedCalloutImage}
                                alt='Samenwerken binnen Business Central ERP'
                                fill
                                sizes='(max-width: 1024px) 100vw, 40vw'
                                className='object-cover object-center group-hover:scale-105 transition-transform duration-700'
                            />
                            <div className='absolute inset-0 bg-linear-to-t from-[#060e32]/50 via-transparent to-transparent pointer-events-none' />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
