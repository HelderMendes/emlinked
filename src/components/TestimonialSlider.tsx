'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/sanity/image';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

export interface TestimonialItem {
    id: string;
    quote: string;
    author: string;
    role: string;
    initials: string;
    avatar?: any;
}

interface TestimonialSliderProps {
    locale?: string;
    tag?: string;
    title?: string;
    subtitle?: string;
    customTestimonials?: any[];
}

const nameColor = [
    'text-teal-hover',
    'text-emerald-600',
    'text-navy-700',
    'text-teal-hover',
];

export function TestimonialSlider({
    locale = 'nl',
    tag,
    title,
    subtitle,
    customTestimonials,
}: TestimonialSliderProps) {
    const testimonials: TestimonialItem[] = (customTestimonials || []).map(
        (t, idx) => ({
            id: t._key || String(idx),
            quote: t.quote || '',
            author: t.author || '',
            role: t.role || '',
            initials: t.author
                ? t.author
                      .split(' ')
                      .map((n: string) => n[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()
                : 'EM',
            avatar: t.avatar,
        }),
    );

    const activeTag = tag || '';
    const activeTitle = title || '';
    const activeSubtitle = subtitle || '';

    const getPath = (path: string) => {
        if (locale === 'nl') return path;
        return `/en${path}`;
    };

    return (
        <section className='px-6 py-20 bg-linear-to-br from-teal-ultra via-stone-bg to-teal-pale/60 relative z-10'>
            <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 flex flex-col gap-12'>
                {/* Header (centered) */}
                <div className='flex flex-col items-center gap-4 text-center max-w-3xl mx-auto'>
                    <div className='flex justify-center'>
                        <Badge color='teal' uppercase dot>
                            {activeTag}
                        </Badge>
                    </div>
                    {/* <h2 className='font-display font-bold text-2xl md:text-4xl bg-linear-to-br from-[#f12711] to-[#f5af19] bg-clip-text text-transparent tracking-tight'> */}
                    <h2 className='font-display font-bold text-2xl md:text-4xl text-navy-900 tracking-tight'>
                        {activeTitle}
                    </h2>
                    <p className='text-sm md:text-base text-[#060e32]/75 leading-relaxed font-light'>
                        {activeSubtitle}
                    </p>
                </div>

                {/* Testimonial cards, 2 columns x 2 rows */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    {testimonials.map((t, idx) => {
                        const avatarUrl = getImageUrl(t.avatar, undefined);
                        return (
                            <Link
                                key={t.id}
                                href={getPath('/referenties')}
                                className='p-6 rounded-2xl border border-navy-900/10 hover:border-teal/40 hover:shadow-lg transition-all duration-300 flex flex-col gap-4 group bg-white/95'
                            >
                                <p className='  text-navy-700/75 leading-relaxed font-medium text-center'>
                                    “{t.quote}”
                                </p>
                                <div className='flex items-center gap-3 pt-2 border-t border-navy-900/10'>
                                    {avatarUrl ? (
                                        <Image
                                            src={avatarUrl}
                                            alt={t.author}
                                            width={40}
                                            height={40}
                                            className='w-10 h-10 rounded-full object-cover shrink-0'
                                        />
                                    ) : (
                                        <div className='h-10 w-10 rounded-full bg-white border border-teal/35 flex items-center justify-center text-teal font-bold text-xs font-mono shrink-0'>
                                            {t.initials}
                                        </div>
                                    )}
                                    <div>
                                        <h4
                                            className={cn(
                                                'font-bold text-sm',
                                                nameColor[
                                                    idx % nameColor.length
                                                ],
                                            )}
                                        >
                                            {t.author}
                                        </h4>
                                        {t.role && (
                                            <span className='text-xs text-navy-500 block'>
                                                {t.role}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
