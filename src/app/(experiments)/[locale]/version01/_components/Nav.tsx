import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Search } from 'lucide-react';
import type { Locale } from '../_lib/data';
import { getNavItems, withLocale } from '../_lib/content';

export function Nav({ locale }: { locale: Locale }) {
    const isEn = locale === 'en';
    const nav = getNavItems(locale);
    const href = (path: string) => withLocale(path, locale);

    return (
        <header className='sticky top-0 z-50'>
            {/* Utility bar */}
            <div className='bg-navy-dark text-white/60 text-[13px]'>
                <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between'>
                    <nav className='hidden md:flex items-center gap-5'>
                        <Link href={href('/kennisbank')} className='hover:text-white transition-colors'>
                            {isEn ? 'Knowledge base' : 'Kennisbank'}
                        </Link>
                        <Link href={href('/contact')} className='hover:text-white transition-colors'>
                            {isEn ? 'Contact us' : 'Contact opnemen'}
                        </Link>
                    </nav>
                    <div className='flex items-center gap-4 ml-auto'>
                        <div className='flex items-center gap-2'>
                            <Link
                                href='/version01'
                                aria-current={locale === 'nl' ? 'page' : undefined}
                                className={locale === 'nl' ? 'text-white font-semibold' : 'hover:text-white transition-colors'}
                            >
                                NL
                            </Link>
                            <span className='text-white/20'>/</span>
                            <Link
                                href='/en/version01'
                                aria-current={locale === 'en' ? 'page' : undefined}
                                className={locale === 'en' ? 'text-white font-semibold' : 'hover:text-white transition-colors'}
                            >
                                EN
                            </Link>
                        </div>
                        <Link href={href('/login')} className='hover:text-white transition-colors'>
                            {isEn ? 'Sign in' : 'Inloggen'}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Primary nav — light canvas */}
            <div className='bg-white border-b border-slate-200 text-sm'>
                <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[76px]'>
                    <Link href={href('/')} className='shrink-0'>
                        <Image
                            src='/emlinked/Emlinked_logo__liggend.svg'
                            alt='emlinked'
                            width={140}
                            height={30}
                            className='h-8 w-auto'
                            priority
                        />
                    </Link>

                    <nav className='hidden lg:flex items-center gap-1'>
                        {/* CSS-only mega-menu */}
                        <div className='relative group'>
                            <button className='flex items-center gap-1 font-medium text-navy-dark px-4 h-[76px] whitespace-nowrap'>
                                {isEn ? 'Products' : 'Onze apps'}
                                <ChevronDown className='w-3.5 h-3.5 text-slate-400 group-hover:text-navy-dark transition-colors' />
                            </button>
                            <div className='invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[600px]'>
                                <div className='bg-white text-navy-dark rounded-2xl border border-slate-200 shadow-xl grid grid-cols-3 gap-1 p-2'>
                                    {nav.apps.map((item) => (
                                        <Link
                                            key={item.path}
                                            href={href(item.path)}
                                            className='p-4 rounded-xl hover:bg-amber-pale/60 transition-colors flex flex-col gap-1.5'
                                        >
                                            <span className='text-[11px] font-bold uppercase tracking-wider text-amber'>App</span>
                                            <span className='text-sm font-bold text-navy-dark leading-tight'>{item.title}</span>
                                            <span className='text-xs text-slate-500 leading-snug'>{item.description}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {nav.flat.map((item) => (
                            <Link
                                key={item.path}
                                href={href(item.path)}
                                className='font-medium text-navy-dark/70 hover:text-navy-dark px-4 h-[76px] flex items-center whitespace-nowrap transition-colors'
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>

                    <div className='flex items-center gap-3'>
                        <button
                            aria-label={isEn ? 'Search' : 'Zoeken'}
                            className='hidden sm:flex items-center justify-center w-9 h-9 rounded-full text-navy-dark/60 hover:bg-slate-100 hover:text-navy-dark transition-colors'
                        >
                            <Search className='w-4 h-4' />
                        </button>
                        <Link
                            href={href('/contact')}
                            className='inline-flex items-center bg-navy-dark hover:bg-black text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber'
                        >
                            {isEn ? 'Request demo' : 'Demo aanvragen'}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
