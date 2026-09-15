import type { Locale } from '../_lib/data';
import { mapFallback } from '../_lib/content';

// Abstract portfolio-spread globe — dot markers stand in for regions with
// managed properties, styled after the map/network illustration language
// without depicting a literal (and easy to get subtly wrong) map of NL.
function SpreadGlobe() {
    const markers = [
        [230, 90], [300, 130], [190, 170], [260, 210], [330, 190],
        [210, 260], [280, 290], [160, 230], [310, 330],
    ];
    return (
        <svg viewBox='0 0 440 400' className='w-full h-full'>
            <defs>
                <radialGradient id='globe-fill' cx='35%' cy='30%' r='75%'>
                    <stop offset='0%' stopColor='hsl(var(--navy-mid))' />
                    <stop offset='60%' stopColor='hsl(var(--navy))' />
                    <stop offset='100%' stopColor='hsl(var(--navy-dark))' />
                </radialGradient>
            </defs>
            <circle cx='240' cy='210' r='190' fill='url(#globe-fill)' />
            <g stroke='white' strokeOpacity='0.12' fill='none'>
                <ellipse cx='240' cy='210' rx='190' ry='60' />
                <ellipse cx='240' cy='210' rx='190' ry='120' />
                <path d='M50 210 A190 190 0 0 1 430 210' />
            </g>
            {markers.map(([x, y], i) => (
                <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={i === 1 ? 7 : 5}
                    fill={i === 1 ? 'hsl(var(--amber))' : 'white'}
                    fillOpacity={i === 1 ? 1 : 0.85}
                />
            ))}
        </svg>
    );
}

export function MapSection({ locale }: { locale: Locale }) {
    const data = mapFallback(locale);

    return (
        <section className='bg-white py-20 border-t border-slate-200'>
            <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-center'>
                    <div className='lg:col-span-5 space-y-6'>
                        <span className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-500'>
                            {data.tag}
                        </span>
                        <h2 className='text-2xl md:text-3xl font-bold tracking-tight text-navy-dark leading-snug'>
                            {data.title}
                        </h2>
                        <p className='text-slate-600 text-base leading-relaxed'>{data.subtitle}</p>

                        <div className='grid grid-cols-2 gap-3 pt-2'>
                            {data.stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className='bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5'
                                >
                                    <span className='block text-xl font-bold text-navy-dark'>
                                        {stat.value}
                                    </span>
                                    <span className='block text-xs text-slate-500 mt-0.5'>
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='lg:col-span-7 h-[320px] md:h-[420px]'>
                        <SpreadGlobe />
                    </div>
                </div>
            </div>
        </section>
    );
}
