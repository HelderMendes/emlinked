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

export const defaultTestimonials: TestimonialItem[] = [
    {
        id: 'vgbr',
        quote: 'Emlinked is de schakel tussen de beheerder en het vastgoed. Wij zijn zeer enthousiast over emlinked en raden dit ook zeker aan andere partijen aan.',
        author: 'Levi Bosboom',
        role: 'Eigenaar - Vastgoedbeheer Rotterdam (VGBR)',
        initials: 'LB',
    },
    {
        id: 'van-overhagen',
        quote: 'Emlinked is een zeer gebruikersvriendelijk en overzichtelijk vastgoedbeheerpakket. We zijn al ruim 5 jaar een tevreden gebruiker.',
        author: 'Angelique van Doorn-Franke',
        role: 'Vastgoedbeheerder - Van Overhagen Vastgoed B.V.',
        initials: 'AD',
    },
    {
        id: 'm2-capital',
        quote: 'Als commercieel vastgoedbeheerder is emlinked voor ons een grote toegevoegde waarde. Snel, scherp en meedenkend!',
        author: 'Michel De Waal',
        role: 'Directeur - M2 Capital Real Estate B.V.',
        initials: 'MW',
    },
    {
        id: 'baetland',
        quote: 'Wij hebben gekozen voor emlinked doordat het volledig in de cloud is gebouwd door vastgoed- en Microsoft-specialisten. Geen spijt van onze keuze.',
        author: 'Sander Bot',
        role: 'Manager Vastgoedbeheer - Baetland Vastgoed B.V.',
        initials: 'SB',
    },
];

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
    const isEn = locale === 'en';

    const testimonials: TestimonialItem[] =
        customTestimonials && customTestimonials.length > 0
            ? customTestimonials.map((t, idx) => ({
                  id: t._key || String(idx),
                  quote: t.quote || '',
                  author: t.author || 'Vastgoedbeheerder',
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
              }))
            : defaultTestimonials;

    const activeTag =
        tag || (isEn ? 'CLIENT REVIEWS' : 'KLANTEN & REFERENTIES');
    const activeTitle =
        title ||
        (isEn
            ? 'Trusted by leading real estate managers'
            : 'Vertrouwd door toonaangevende vastgoedbeheerders');
    const activeSubtitle =
        subtitle ||
        (isEn
            ? 'Discover how professional property managers and controllers automate operations daily with Emlinked.'
            : 'Ontdek hoe professionele beheerders en controllers dagelijks tijd besparen en geautomatiseerd werken met Emlinked.');

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
                    <h2 className='font-display font-bold text-2xl md:text-4xl bg-linear-to-br from-[#f12711] to-[#f5af19] bg-clip-text text-transparent tracking-tight'>
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
