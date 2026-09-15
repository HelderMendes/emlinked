import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '../_lib/data';
import { withLocale, storiesFallback } from '../_lib/content';

export function StoriesSection({ locale }: { locale: Locale }) {
    const isEn = locale === 'en';
    const href = withLocale('/referenties', locale);
    const stories = storiesFallback(locale);

    return (
        <section className='bg-stone-bg py-20 border-t border-slate-200'>
            <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8'>
                <div className='flex items-end justify-between mb-10'>
                    <h2 className='text-2xl md:text-3xl font-bold tracking-tight text-navy-dark'>
                        {isEn ? 'What professional managers say' : 'Wat professionele beheerders zeggen'}
                    </h2>
                    <Link
                        href={href}
                        className='hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[#0073bb] hover:text-[#005ea2]'
                    >
                        {isEn ? 'All references' : 'Alle referenties'}
                        <ArrowRight className='w-3.5 h-3.5' />
                    </Link>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {stories.map((story) => (
                        <Link
                            key={story._key}
                            href={href}
                            className='group grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-0 bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow'
                        >
                            <div className='relative h-48 sm:h-full'>
                                <Image
                                    src={story.image}
                                    alt={story.title}
                                    fill
                                    sizes='200px'
                                    className='object-cover'
                                />
                                <span className='absolute top-3 left-3 bg-white/90 text-navy-dark text-[11px] font-bold px-2.5 py-1 rounded-md'>
                                    {story.tag}
                                </span>
                            </div>
                            <div className='p-6 flex flex-col justify-center gap-2'>
                                <h3 className='text-base font-bold text-navy-dark leading-snug'>
                                    {story.title}
                                </h3>
                                <p className='text-sm text-slate-600 leading-relaxed'>
                                    {story.description}
                                </p>
                                <span className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 border border-slate-200 group-hover:border-navy-dark transition-colors mt-2'>
                                    <ArrowRight className='w-3.5 h-3.5 text-navy-dark' />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
