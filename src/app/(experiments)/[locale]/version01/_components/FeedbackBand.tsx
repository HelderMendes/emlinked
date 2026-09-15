'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import type { Locale } from '../_lib/data';
import { feedbackFallback, withLocale } from '../_lib/content';

export function FeedbackBand({ locale }: { locale: Locale }) {
    const copy = feedbackFallback(locale);
    const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);
    const contactHref = withLocale('/contact', locale);

    return (
        <section className='bg-white py-16'>
            <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8'>
                <div
                    className='rounded-3xl px-8 py-10 md:px-12 md:py-12'
                    style={{
                        background:
                            'linear-gradient(120deg, hsl(var(--amber-pale)) 0%, hsl(var(--amber-light) / 0.5) 100%)',
                    }}
                >
                    {answer === null && (
                        <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
                            <div>
                                <h2 className='text-xl md:text-2xl font-bold text-navy-dark'>
                                    {copy.question}
                                </h2>
                                <p className='text-sm text-navy-dark/70 mt-1'>{copy.subtitle}</p>
                            </div>
                            <div className='flex gap-3 shrink-0'>
                                <button
                                    type='button'
                                    onClick={() => setAnswer('yes')}
                                    className='inline-flex items-center gap-2 bg-navy-dark hover:bg-black text-white font-semibold px-5 py-3 rounded-full text-sm transition-colors'
                                >
                                    {copy.yes}
                                    <ThumbsUp className='w-4 h-4' />
                                </button>
                                <button
                                    type='button'
                                    onClick={() => setAnswer('no')}
                                    className='inline-flex items-center gap-2 bg-white/70 hover:bg-white text-navy-dark font-semibold px-5 py-3 rounded-full text-sm transition-colors border border-navy-dark/10'
                                >
                                    {copy.no}
                                    <ThumbsDown className='w-4 h-4' />
                                </button>
                            </div>
                        </div>
                    )}

                    {answer === 'yes' && (
                        <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
                            <p className='text-lg font-semibold text-navy-dark'>{copy.thanksYes}</p>
                            <Link
                                href={contactHref}
                                className='inline-flex items-center bg-navy-dark hover:bg-black text-white font-semibold px-5 py-3 rounded-full text-sm transition-colors shrink-0'
                            >
                                {copy.yes}
                            </Link>
                        </div>
                    )}

                    {answer === 'no' && (
                        <p className='text-lg font-semibold text-navy-dark'>{copy.thanksNo}</p>
                    )}
                </div>
            </div>
        </section>
    );
}
