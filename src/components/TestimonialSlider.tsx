'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Quote,
    ChevronLeft,
    ChevronRight,
    ArrowRight,
    MessageSquareQuote,
} from 'lucide-react';

export interface TestimonialItem {
    id: string;
    headline: string;
    quote: string;
    author: string;
    role: string;
    company: string;
    initials: string;
    note?: string;
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
        headline: 'Wij zijn zeer enthousiast..',
        quote: 'Emlinked is de schakel tussen de beheerder en het vastgoed, de gebruiksvriendelijkheid van het systeem zorgt voor snel en soepel verlopen van de dagelijkse taken. De mogelijkheden zijn uiteenlopend en kunnen voor iedere taak en gebruiker individueel naar haar/zijn hand gezet worden, hierdoor is het systeem altijd up to date. Daarnaast is het systeem continu in ontwikkeling, eventuele aanpassingen en toevoegingen voor het verfijnen van de software wordt altijd naar geluisterd en indien mogelijk ook toegepast. Wij zijn zeer enthousiast over emlinked en raden dit ook zeker aan andere partijen aan.',
        author: 'Levi Bosboom',
        role: 'Eigenaar',
        company: 'Vastgoedbeheer Rotterdam (VGBR)',
        initials: 'LB',
    },
    {
        id: 'van-overhagen',
        headline: 'Zeker naar je geluisterd!',
        quote: 'Emlinked is een zeer gebruikersvriendelijk en overzichtelijk vastgoedbeheerpakket. We zijn al ruim 5 jaar een tevreden gebruiker. Mocht je toch een keer vastlopen dan is de helpdesk/support goed bereikbaar en helder in oplossingen. Als je verzoeken hebt om het gebruik te vereenvoudigen dan wordt hier zeker naar geluisterd. De responstijd wordt duidelijk gecommuniceerd en is over het algemeen heel kort.',
        author: 'Angelique van Doorn-Franke',
        role: 'Vastgoedbeheerder',
        company: 'Van Overhagen Vastgoed B.V.',
        initials: 'AD',
    },
    {
        id: 'm2-capital',
        headline: 'Snel, scherp en meedenkend!',
        quote: 'Als commercieel vastgoedbeheerder is emlinked voor ons een grote toegevoegde waarde. Het geleverde product is zeer goed bruikbaar voor ons bedrijf. De professionele support vanuit de emlinked organisatie is uitstekend: snel, scherp en meedenkend! Wij zijn er zeer content mee.',
        author: 'Michel De Waal',
        role: 'Directeur',
        company: 'M2 Capital Real Estate B.V.',
        initials: 'MW',
    },
    {
        id: 'baetland',
        headline: 'Meedenken in oplossingen',
        quote: 'Iets meer dan een jaar geleden hebben wij voor onze vastgoedpoot gekozen voor emlinked. Deze keuze werd mede ingegeven doordat het een volledig in de cloud gebouwd programma is, ontwikkeld door een vastgoedontwikkelaar samen met een Microsoft softwarepartner. Een programma wat eenvoudig aangepast kan worden aan de behoefte van de klant. Wij hebben ervaren dat de medewerkers van emlinked meedenken in oplossingen en zorgen dat het programma zoveel mogelijk aan onze wensen wordt aangepast. Het programma is overal en op alle devices goed te gebruiken. De weergave in tegels maakt dat de gegevens overzichtelijk in beeld gebracht worden. Resume: wij hebben geen spijt van onze keuze voor emlinked.',
        note: '– Baetland Vastgoed was voorheen Deen Vastgoed –',
        author: 'Sander Bot',
        role: 'Manager Vastgoedbeheer',
        company: 'Baetland Vastgoed B.V.',
        initials: 'SB',
    },
];

export function TestimonialSlider({
    locale = 'nl',
    tag,
    title,
    subtitle,
    customTestimonials,
}: TestimonialSliderProps) {
    const isEn = locale === 'en';
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const testimonials =
        customTestimonials && customTestimonials.length > 0
            ? customTestimonials.map((t, idx) => ({
                  id: t._key || String(idx),
                  headline:
                      t.headline ||
                      t.title ||
                      (isEn ? 'Client Experience' : 'Klantervaring'),
                  quote: t.quote || '',
                  author: t.author || 'Vastgoedbeheerder',
                  role: t.role || 'Commercial Real Estate Management',
                  company: t.company || '',
                  initials: t.author
                      ? t.author
                            .split(' ')
                            .map((n: string) => n[0])
                            .join('')
                            .slice(0, 2)
                      : 'EM',
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

    // Auto-advance slider every 8 seconds
    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [isPaused, testimonials.length]);

    const handlePrev = (e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setCurrentIndex((prev) =>
            prev === 0 ? testimonials.length - 1 : prev - 1,
        );
    };

    const handleNext = (e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handleDotClick = (idx: number, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex(idx);
    };

    const current = testimonials[currentIndex];

    return (
        <section className='px-6 py-20 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] dark:bg-navy-dark relative z-10'>
            <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 space-y-8'>
                {/* Header (Centered) */}
                <div className='space-y-3 max-w-3xl mx-auto text-center flex flex-col items-center'>
                    <span className='inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/15 px-4.5 py-1.5 text-xs font-mono font-bold tracking-wider text-amber uppercase backdrop-blur-md shadow-xs'>
                        <span className='w-2 h-2 rounded-full bg-amber shrink-0' />
                        {activeTag}
                    </span>
                    <h2 className='font-display font-bold text-2xl md:text-4xl text-[#060e32] dark:text-white tracking-tight'>
                        {activeTitle}
                    </h2>
                    <p className='text-sm md:text-base text-[#060e32]/75 dark:text-slate-300 leading-relaxed font-light max-w-2xl'>
                        {activeSubtitle}
                    </p>
                </div>

                {/* Active Review Quote Card (Whole card links to /referenties page) */}
                <Link
                    href={getPath('/referenties')}
                    className=' p-6 md:p-8 rounded-2xl border border-neutral-300 hover:border-amber/50 bg-transparent dark:bg-amber/5 relative space-y-6 text-center shadow-sm hover:shadow-md transition-all duration-300 max-w-4xl mx-auto flex flex-col items-center cursor-pointer group'
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <MessageSquareQuote className='h-8 w-8 text-amber  absolute top-2 right-2 pointer-events-none group-hover:text-amber/70 transition-colors' />

                    <div className='space-y-2 max-w-3xl mx-auto text-center'>
                        <h3 className='font-extrabold font-display text-lg sm:text-xl text-amber tracking-tight group-hover:underline decoration-amber/40 underline-offset-4'>
                            “{current.headline}”
                        </h3>
                        {/* Clamped to only 2 lines */}
                        <p className='text-sm md:text-base text-[#060e32]/90 dark:text-slate-200 leading-relaxed font-light italic line-clamp-2'>
                            “{current.quote}”
                        </p>
                    </div>

                    {/* Author info & Navigation controls bar */}
                    <div className='flex items-center justify-between pt-4 border-t border-black/20 flex-wrap gap-4 w-full'>
                        <div className='flex items-center gap-3 text-left'>
                            <div className='h-10 w-10 rounded-full bg-amber/20 border border-amber/40 flex items-center justify-center text-amber font-bold text-xs font-mono shadow-sm shrink-0 group-hover:bg-amber group-hover:text-[#060e32] transition-colors'>
                                {current.initials}
                            </div>
                            <div>
                                <h4 className='font-bold text-sm text-amber dark:text-white'>
                                    {current.author}
                                </h4>
                                <span className='text-xs text-darkBlue font-mono font-semibold block'>
                                    {current.role} — {current.company}
                                </span>
                            </div>
                        </div>

                        {/* Slider Navigation Arrows & Dots (stop propagation so clicks don't trigger parent link) */}
                        <div
                            className='flex items-center gap-4 ml-auto sm:ml-0'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={handlePrev}
                                aria-label='Vorige referentie'
                                className='p-2 rounded-full border border-white bg-black/20 hover:bg-amber text-white transition-all duration-200 shadow-sm cursor-pointer'
                            >
                                <ChevronLeft className='h-4 w-4' />
                            </button>

                            <div className='flex items-center gap-2'>
                                {testimonials.map((t, idx) => (
                                    <button
                                        key={t.id}
                                        onClick={(e) => handleDotClick(idx, e)}
                                        aria-label={`Referentie ${idx + 1}`}
                                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                            idx === currentIndex
                                                ? 'w-6 bg-amber/40'
                                                : 'w-2 bg-black/20 hover:bg-amber'
                                        }`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={handleNext}
                                aria-label='Volgende referentie'
                                className='p-2 rounded-full border border-white bg-black/20 hover:bg-amber text-white transition-all duration-200 shadow-sm cursor-pointer'
                            >
                                <ChevronRight className='h-4 w-4' />
                            </button>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    );
}
