'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Locale } from '../_lib/data';
import { personaFallback } from '../_lib/content';

export function PersonaSection({ locale }: { locale: Locale }) {
    const { prefix, segments } = personaFallback(locale);
    const [activeKey, setActiveKey] = useState(segments[0].key);
    const [open, setOpen] = useState(false);
    const active = segments.find((s) => s.key === activeKey) || segments[0];

    return (
        <section className='bg-white pb-20'>
            <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8'>
                <div className='relative inline-block'>
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-navy-dark leading-tight'>
                        {prefix}{' '}
                        <button
                            type='button'
                            onClick={() => setOpen((v) => !v)}
                            aria-expanded={open}
                            className='inline-flex items-center gap-1.5 text-amber-hover underline decoration-amber/40 decoration-4 underline-offset-4 hover:decoration-amber transition-colors'
                        >
                            {active.label}
                            <ChevronDown
                                className={`w-6 h-6 transition-transform ${open ? 'rotate-180' : ''}`}
                            />
                        </button>
                    </h2>

                    {open && (
                        <div className='absolute left-0 top-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-20 min-w-[260px]'>
                            {segments.map((segment) => (
                                <button
                                    key={segment.key}
                                    type='button'
                                    onClick={() => {
                                        setActiveKey(segment.key);
                                        setOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2.5 rounded-xl text-base transition-colors ${
                                        segment.key === activeKey
                                            ? 'bg-amber-pale text-navy-dark font-semibold'
                                            : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    {segment.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <p className='mt-4 max-w-2xl text-lg text-slate-600 leading-relaxed'>
                    emlinked is {active.headline}
                    <br />
                    {active.copy}
                </p>
            </div>
        </section>
    );
}
