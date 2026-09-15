import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '../_lib/data';
import { heroFallback, withLocale } from '../_lib/content';

type HeroBlock = {
    label?: string;
    title?: string;
    subtitle?: string;
    ctaLabel?: string;
    ctaLink?: string;
};

function formatTitle(text: string) {
    const parts = text.split(/(\*[^*]+\*)/g);
    return parts.map((part, i) =>
        part.startsWith('*') && part.endsWith('*') && part.length > 2 ? (
            <span key={i} className='text-amber'>
                {part.slice(1, -1)}
            </span>
        ) : (
            part
        ),
    );
}

// Generative "portfolio network" illustration — nodes as managed properties,
// paths as the ledger connecting them. Built in-house rather than as a stock
// illustration, tinted to the brand's amber/emerald/navy tokens.
function PortfolioSphere() {
    const nodes = [
        [260, 70], [360, 110], [180, 150], [300, 190], [420, 160],
        [140, 240], [260, 270], [380, 260], [220, 340], [340, 350],
        [460, 300], [160, 400], [300, 420],
    ];
    const paths = [
        [0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [2, 5], [3, 6],
        [4, 7], [5, 8], [6, 8], [6, 9], [7, 10], [8, 11], [9, 12],
        [1, 4], [5, 11], [9, 10],
    ];

    return (
        <svg viewBox='0 0 520 480' className='w-full h-full' aria-hidden='true'>
            <defs>
                <radialGradient id='sphere-fill' cx='38%' cy='32%' r='75%'>
                    <stop offset='0%' stopColor='hsl(var(--amber-light))' stopOpacity='0.9' />
                    <stop offset='55%' stopColor='hsl(var(--emerald-accent))' stopOpacity='0.55' />
                    <stop offset='100%' stopColor='hsl(var(--navy-mid))' stopOpacity='0.35' />
                </radialGradient>
            </defs>
            <circle cx='290' cy='250' r='230' fill='url(#sphere-fill)' />
            <g stroke='rgba(15,20,31,0.35)' strokeWidth='1.25' fill='none'>
                {paths.map(([a, b], i) => {
                    const [x1, y1] = nodes[a];
                    const [x2, y2] = nodes[b];
                    const mx = (x1 + x2) / 2 + (i % 2 === 0 ? 18 : -18);
                    const my = (y1 + y2) / 2 + (i % 3 === 0 ? -14 : 14);
                    return <path key={i} d={`M${x1},${y1} Q${mx},${my} ${x2},${y2}`} />;
                })}
            </g>
            {nodes.map(([x, y], i) => (
                <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={i % 4 === 0 ? 8 : 5.5}
                    fill={i % 4 === 0 ? 'hsl(var(--amber))' : '#0f141f'}
                    stroke='white'
                    strokeWidth='2'
                />
            ))}
        </svg>
    );
}

export function Hero({ locale, block }: { locale: Locale; block?: HeroBlock }) {
    const fallback = heroFallback(locale);
    const href = (path?: string) => withLocale(path || '/contact', locale);

    return (
        <section className='relative overflow-hidden bg-stone-bg'>
            {/* Gradient mesh canvas */}
            <div
                className='absolute inset-0'
                style={{
                    background:
                        'radial-gradient(60% 55% at 15% 20%, hsl(var(--amber-pale)) 0%, transparent 60%), radial-gradient(55% 60% at 80% 10%, hsl(var(--emerald-accent) / 0.18) 0%, transparent 55%), radial-gradient(70% 70% at 60% 90%, hsl(var(--navy-mid) / 0.12) 0%, transparent 60%)',
                }}
            />

            <div className='relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-10 pb-40 md:pb-48'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'>
                    {/* Floating copy card */}
                    <div className='lg:col-span-6 relative z-10'>
                        <div className='bg-white/90 backdrop-blur-sm border border-white shadow-xl shadow-navy-dark/5 rounded-3xl p-8 md:p-10 max-w-xl'>
                            <span className='inline-flex items-center gap-2 rounded-full bg-amber-pale px-3 py-1 text-xs font-bold tracking-wide text-amber-hover'>
                                {block?.label || fallback.label}
                            </span>
                            <h1 className='mt-5 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-navy-dark leading-[1.12]'>
                                {formatTitle(block?.title || fallback.title)}
                            </h1>
                            <p className='mt-5 text-slate-600 text-base md:text-lg leading-relaxed'>
                                {block?.subtitle || fallback.subtitle}
                            </p>
                            <div className='mt-7'>
                                <Link
                                    href={href(block?.ctaLink)}
                                    className='inline-flex items-center gap-2 bg-navy-dark hover:bg-black text-white font-semibold px-6 py-3.5 rounded-full text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber'
                                >
                                    {block?.ctaLabel || fallback.ctaLabel}
                                    <ArrowRight className='w-4 h-4' />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Illustration */}
                    <div className='lg:col-span-6 relative h-[320px] sm:h-[420px] lg:h-[520px]'>
                        <div className='absolute inset-0 lg:-right-10 lg:scale-110'>
                            <PortfolioSphere />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
