import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '../_lib/data';
import { withLocale, modulesFallback } from '../_lib/content';

type Feature = {
    _key: string;
    title?: string;
    description?: string;
    ctaLabel?: string;
    ctaLink?: string;
};

const APP_PATHS = [
    '/apps/vastgoedbeheer-software',
    '/apps/huurdersportaal',
    '/apps/payment-software',
];

const TAGS = ['App 01', 'App 02', 'App 03'];

// Three generative thumbnails, one per module — geometric compositions in
// place of stock photography, tinted to the brand palette.
function WireframeCubes() {
    return (
        <svg viewBox='0 0 300 220' className='w-full h-full'>
            <rect width='300' height='220' fill='#0f141f' />
            <g stroke='hsl(var(--amber))' strokeWidth='1.4' fill='none' opacity='0.9'>
                <path d='M70 130 L70 90 L110 70 L150 90 L150 130 L110 150 Z' />
                <path d='M70 90 L110 110 L150 90' />
                <path d='M110 110 L110 150' />
                <path d='M150 130 L190 110 L230 130 L230 170 L190 190 L150 170 Z' />
                <path d='M150 130 L190 150 L230 130' />
                <path d='M190 150 L190 190' />
            </g>
            <g stroke='white' strokeOpacity='0.25' strokeWidth='1'>
                <path d='M40 60 L60 50 L80 60 L80 80 L60 90 L40 80 Z' />
            </g>
        </svg>
    );
}

function FlowRibbon() {
    return (
        <svg viewBox='0 0 300 220' className='w-full h-full'>
            <defs>
                <linearGradient id='ribbon' x1='0' y1='0' x2='1' y2='1'>
                    <stop offset='0%' stopColor='hsl(var(--amber))' />
                    <stop offset='100%' stopColor='hsl(var(--emerald-accent))' />
                </linearGradient>
            </defs>
            <rect width='300' height='220' fill='#111827' />
            <path
                d='M60 60 C 140 60, 100 130, 180 130 S 260 60, 240 160'
                stroke='url(#ribbon)'
                strokeWidth='16'
                strokeLinecap='round'
                fill='none'
            />
            <circle cx='60' cy='60' r='7' fill='white' />
            <circle cx='240' cy='160' r='7' fill='white' />
        </svg>
    );
}

function PaymentGrid() {
    return (
        <svg viewBox='0 0 300 220' className='w-full h-full'>
            <rect width='300' height='220' fill='#151b2c' />
            <rect x='40' y='40' width='80' height='80' rx='10' fill='hsl(var(--amber))' opacity='0.85' />
            <circle cx='210' cy='70' r='42' fill='hsl(var(--emerald-accent))' opacity='0.6' />
            <rect x='150' y='120' width='110' height='60' rx='10' fill='white' opacity='0.08' />
            <rect x='165' y='135' width='80' height='8' rx='4' fill='white' opacity='0.5' />
            <rect x='165' y='150' width='50' height='8' rx='4' fill='hsl(var(--amber))' />
        </svg>
    );
}

const THUMBS = [WireframeCubes, FlowRibbon, PaymentGrid];

export function Modules({
    locale,
    sectionTag,
    sectionTitle,
    sectionSubtitle,
    features,
}: {
    locale: Locale;
    sectionTag?: string;
    sectionTitle?: string;
    sectionSubtitle?: string;
    features?: Feature[];
}) {
    const isEn = locale === 'en';
    const href = (path: string) => withLocale(path, locale);
    const list: Feature[] =
        features && features.length > 0 ? features.slice(0, 3) : modulesFallback(locale);

    return (
        <section className='bg-white py-20'>
            <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8'>
                <div className='max-w-2xl mb-10 space-y-3'>
                    <span className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-500'>
                        {sectionTag || (isEn ? 'Core modules' : 'Kernmodules')}
                    </span>
                    <h2 className='text-2xl md:text-3xl font-bold tracking-tight text-navy-dark'>
                        {sectionTitle ||
                            (isEn ? 'Three apps, one workflow' : 'Drie apps, één workflow')}
                    </h2>
                    {sectionSubtitle && (
                        <p className='text-slate-600 text-base leading-relaxed'>{sectionSubtitle}</p>
                    )}
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {list.map((feature, index) => {
                        const Thumb = THUMBS[index % THUMBS.length];
                        const path = feature.ctaLink?.startsWith('/')
                            ? feature.ctaLink
                            : APP_PATHS[index] || '/apps';

                        return (
                            <Link key={feature._key} href={href(path)} className='group block'>
                                <div className='relative aspect-4/3 rounded-2xl overflow-hidden'>
                                    <Thumb />
                                    <span className='absolute top-3 left-3 bg-white/90 text-navy-dark text-[11px] font-bold px-2.5 py-1 rounded-md'>
                                        {TAGS[index % TAGS.length]}
                                    </span>
                                </div>
                                <div className='bg-slate-50 group-hover:bg-amber-pale/40 rounded-2xl p-5 -mt-3 pt-6 relative transition-colors'>
                                    <h3 className='text-base font-bold text-navy-dark mb-1.5'>
                                        {feature.title}
                                    </h3>
                                    <p className='text-sm text-slate-600 leading-relaxed mb-4'>
                                        {feature.description}
                                    </p>
                                    <span className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border border-slate-200 group-hover:border-navy-dark transition-colors'>
                                        <ArrowRight className='w-3.5 h-3.5 text-navy-dark' />
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
