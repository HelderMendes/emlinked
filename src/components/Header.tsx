'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { BsRocketTakeoff } from 'react-icons/bs';

interface HeaderProps {
    locale?: string;
    settings?: {
        announcementActive?: boolean;
        announcementText?: string;
        announcementLink?: string;
        phone?: string;
        email?: string;
        address?: string;
    };
}

const translations = {
    nl: {
        vastgoedsoftware: 'Vastgoedsoftware',
        oplossingen: 'Software Oplossingen',
        diensten: 'Diensten',
        prijzen: 'Prijzen',
        overons: 'Over ons',
        nieuws: 'Nieuws',
        mijnEmlinked: 'Mijn emlinked',

        // Submenu links
        vastgoedbeheer: 'Vastgoedbeheer Software',
        vastgoedbeheerDesc: 'De core SaaS module voor vastgoedmanagement.',
        huurdersportaal: 'Huurdersportaal',
        huurdersportaalDesc: 'Self-service portaal voor communicatie & meldingen.',
        payment: 'Payment Software',
        paymentDesc: 'Geautomatiseerde betalingstransacties.',
        team: 'Het Team',
        box3: 'Box 3 Check ⚡',
        integrations: 'Integraties',
        referenties: 'Referenties',
        docs: 'Documentatie'
    },
    en: {
        vastgoedsoftware: 'Property Software',
        oplossingen: 'Software Solutions',
        diensten: 'Services',
        prijzen: 'Pricing',
        overons: 'About us',
        nieuws: 'News',
        mijnEmlinked: 'My emlinked',

        // Submenu links
        vastgoedbeheer: 'Property Management Software',
        vastgoedbeheerDesc: 'Core SaaS property management module.',
        huurdersportaal: 'Tenant Portal',
        huurdersportaalDesc: 'Self-service portal for support tickets.',
        payment: 'Payment Software',
        paymentDesc: 'Automated billing transactions.',
        team: 'Our Team',
        box3: 'Box 3 Calculator ⚡',
        integrations: 'Integrations',
        referenties: 'References',
        docs: 'Docs Portal'
    }
} as const;

export default function Header({ locale = 'nl', settings }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    const [announcementHovered, setAnnouncementHovered] = useState(false);
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();
    const t = translations[locale as 'nl' | 'en'] || translations.nl;

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);

        // Close dropdown when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setLangDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close mobile menu on path changes
    useEffect(() => {
        setMobileMenuOpen(false);
        setMobileSubmenu(null);
    }, [pathname]);

    // Helper to prepend locale for links and translate categories/slugs
    const getPath = (path: string) => {
        if (locale === 'nl') {
            return path;
        }
        
        let translatedPath = path;
        translatedPath = translatedPath.replace('/oplossingen/vastgoedbeheer-software', '/solutions/property-management-software');
        translatedPath = translatedPath.replace('/oplossingen/huurdersportaal', '/solutions/tenant-portal');
        translatedPath = translatedPath.replace('/oplossingen/payment', '/solutions/payment-software');
        translatedPath = translatedPath.replace('/oplossingen', '/solutions');
        
        return `/en${translatedPath === '/' ? '' : translatedPath}`;
    };

    const getLocalePath = (targetLocale: string) => {
        if (!pathname) return targetLocale === 'nl' ? '/' : '/en';
        
        let path = pathname;
        
        if (targetLocale === 'en') {
            path = path.replace('/oplossingen/vastgoedbeheer-software', '/solutions/property-management-software');
            path = path.replace('/oplossingen/huurdersportaal', '/solutions/tenant-portal');
            path = path.replace('/oplossingen/payment', '/solutions/payment-software');
            path = path.replace('/oplossingen', '/solutions');
            
            if (!path.startsWith('/en')) {
                path = `/en${path === '/' ? '' : path}`;
            }
            return path;
        } else {
            if (path.startsWith('/en')) {
                path = path.replace('/en', '') || '/';
            }
            path = path.replace('/solutions/property-management-software', '/oplossingen/vastgoedbeheer-software');
            path = path.replace('/solutions/tenant-portal', '/oplossingen/huurdersportaal');
            path = path.replace('/solutions/payment-software', '/oplossingen/payment');
            path = path.replace('/solutions', '/oplossingen');
            return path;
        }
    };

    // Active link check
    const isActive = (path: string) => {
        const fullPath = getPath(path);
        if (fullPath === '/' || fullPath === '/en') {
            return pathname === fullPath;
        }
        return pathname?.startsWith(fullPath);
    };

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const logoSrc =
        mounted && theme === 'dark'
            ? '/emlinked/Emlinked_logo__liggend_white.png'
            : '/emlinked/Emlinked_logo__liggend.svg';

    const toggleMobileSubmenu = (menu: string) => {
        setMobileSubmenu(mobileSubmenu === menu ? null : menu);
    };

    return (
        <header className='sticky top-0 z-50 w-full border-t-4 border-amber bg-background/95 backdrop-blur-md transition-all duration-300 shadow-md text-foreground'>
            {/* Orange Top border line (now border-t-4 on header tag) */}

            <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8'>
                <div className='flex h-20 items-center justify-between gap-4'>
                    {/* Left: Mobile Hamburger Trigger (Only on Mobile) */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className='xl:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted focus:outline-none cursor-pointer transition-colors'
                        aria-label='Toggle Menu'
                    >
                        <svg
                            className='h-6 w-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                        >
                            {mobileMenuOpen ? (
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            ) : (
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                                />
                            )}
                        </svg>
                    </button>

                    {/* Logo & Brand Title (Aligned to left column) */}
                    <div className='flex-shrink-0 flex items-center xl:w-1/4'>
                        <Link
                            href={getPath('/')}
                            className='flex items-center'
                            title='emlinked - Vastgoedbeheer Software'
                        >
                            <img
                                src={logoSrc}
                                alt='emlinked - Vastgoedbeheer software homepage'
                                className='w-auto h-11 transition-all'
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation Links (Mathematically centered) */}
                    <nav className='hidden xl:flex items-center justify-center gap-6 xl:w-2/4'>
                        {/* Vastgoedsoftware */}
                        <div className='group relative py-2'>
                            <button
                                className={`flex items-center gap-1.5 text-sm font-semibold transition-colors cursor-pointer ${
                                    isActive(
                                        '/oplossingen/vastgoedbeheer-software',
                                    ) ||
                                    isActive('/oplossingen/huurdersportaal') ||
                                    isActive('/oplossingen/payment')
                                        ? 'text-primary'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                {t.vastgoedsoftware}
                                <svg
                                    className='h-3.5 w-3.5 transition-transform group-hover:rotate-180'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            </button>
                            <div className='absolute left-0 mt-2 w-72 origin-top-left rounded-lg border border-border bg-card p-2 shadow-lg transition-all opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'>
                                <Link
                                    href={getPath(
                                        '/oplossingen/vastgoedbeheer-software',
                                    )}
                                    className='block rounded-md p-2 hover:bg-muted/50 transition-colors'
                                >
                                    <div
                                        className={`text-xs font-bold ${isActive('/oplossingen/vastgoedbeheer-software') ? 'text-amber' : 'text-foreground'}`}
                                    >
                                        {t.vastgoedbeheer}
                                    </div>
                                    <div className='text-[10px] text-muted-foreground'>
                                        {t.vastgoedbeheerDesc}
                                    </div>
                                </Link>
                                <Link
                                    href={getPath(
                                        '/oplossingen/huurdersportaal',
                                    )}
                                    className='block rounded-md p-2 hover:bg-muted/50 transition-colors'
                                >
                                    <div
                                        className={`text-xs font-bold ${isActive('/oplossingen/huurdersportaal') ? 'text-amber' : 'text-foreground'}`}
                                    >
                                        {t.huurdersportaal}
                                    </div>
                                    <div className='text-[10px] text-muted-foreground'>
                                        {t.huurdersportaalDesc}
                                    </div>
                                </Link>
                                <Link
                                    href={getPath('/oplossingen/payment')}
                                    className='block rounded-md p-2 hover:bg-muted/50 transition-colors'
                                >
                                    <div
                                        className={`text-xs font-bold ${isActive('/oplossingen/payment') ? 'text-amber' : 'text-foreground'}`}
                                    >
                                        {t.payment}
                                    </div>
                                    <div className='text-[10px] text-muted-foreground'>
                                        {t.paymentDesc}
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Software Oplossingen */}
                        <div className='group relative py-2'>
                            <button
                                className={`flex items-center gap-1.5 text-sm font-semibold transition-colors cursor-pointer ${
                                    isActive('/integraties') ||
                                    isActive('/kennisbank/box3-check')
                                        ? 'text-amber'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                {t.oplossingen}
                                <svg
                                    className='h-3.5 w-3.5 transition-transform group-hover:rotate-180'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            </button>
                            <div className='absolute left-0 mt-2 w-72 origin-top-left rounded-lg border border-border bg-card p-2 shadow-lg transition-all opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'>
                                <Link
                                    href={getPath('/integraties')}
                                    className='block rounded-md p-2 hover:bg-muted/50 transition-colors'
                                >
                                    <div
                                        className={`text-xs font-bold ${isActive('/integraties') ? 'text-amber' : 'text-foreground'}`}
                                    >
                                        {t.integrations}
                                    </div>
                                    <div className='text-[10px] text-muted-foreground'>
                                        Koppelingen met Business Central,
                                        Document Capture en Telebankieren.
                                    </div>
                                </Link>
                                <Link
                                    href={getPath('/kennisbank/box3-check')}
                                    className='block rounded-md p-2 hover:bg-muted/50 transition-colors'
                                >
                                    <div
                                        className={`text-xs font-bold ${isActive('/kennisbank/box3-check') ? 'text-amber' : 'text-foreground'}`}
                                    >
                                        {t.box3}
                                    </div>
                                    <div className='text-[10px] text-muted-foreground'>
                                        Bereken de impact van Box 3 wetgeving op
                                        uw vastgoed.
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Diensten */}
                        <div className='group relative py-2'>
                            <button
                                className={`flex items-center gap-1.5 text-sm font-semibold transition-colors cursor-pointer ${
                                    isActive('/referenties')
                                        ? 'text-amber'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                {t.diensten}
                                <svg
                                    className='h-3.5 w-3.5 transition-transform group-hover:rotate-180'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            </button>
                            <div className='absolute left-0 mt-2 w-72 origin-top-left rounded-lg border border-border bg-card p-2 shadow-lg transition-all opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'>
                                <Link
                                    href={getPath('/referenties')}
                                    className='block rounded-md p-2 hover:bg-muted/50 transition-colors'
                                >
                                    <div
                                        className={`text-xs font-bold ${isActive('/referenties') ? 'text-amber' : 'text-foreground'}`}
                                    >
                                        {t.referenties}
                                    </div>
                                    <div className='text-[10px] text-muted-foreground'>
                                        Ontdek ervaringen van vastgoedbeheerders
                                        en beleggers.
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Prijzen */}
                        <Link
                            href={getPath('/prijzen')}
                            className={`text-sm font-semibold transition-colors ${
                                isActive('/prijzen')
                                    ? 'text-amber'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {t.prijzen}
                        </Link>

                        {/* Over ons */}
                        <div className='group relative py-2'>
                            <button
                                className={`flex items-center gap-1.5 text-sm font-semibold transition-colors cursor-pointer ${
                                    isActive('/team')
                                        ? 'text-amber'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                {t.overons}
                                <svg
                                    className='h-3.5 w-3.5 transition-transform group-hover:rotate-180'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            </button>
                            <div className='absolute left-0 mt-2 w-72 origin-top-left rounded-lg border border-border bg-card p-2 shadow-lg transition-all opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'>
                                <Link
                                    href={getPath('/team')}
                                    className='block rounded-md p-2 hover:bg-muted/50 transition-colors'
                                >
                                    <div
                                        className={`text-xs font-bold ${isActive('/team') ? 'text-amber' : 'text-foreground'}`}
                                    >
                                        {t.team}
                                    </div>
                                    <div className='text-[10px] text-muted-foreground'>
                                        Maak kennis met ons specialistische
                                        team.
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Nieuws */}
                        <Link
                            href={getPath('/blog')}
                            className={`text-sm font-semibold transition-colors ${
                                isActive('/blog')
                                    ? 'text-amber'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {t.nieuws}
                        </Link>
                    </nav>

                    {/* Right side: Global Actions (Aligned to right column) */}
                    <div className='flex items-center gap-3 sm:gap-4 shrink-0 xl:w-1/4 justify-end'>
                        {/* Docs Book Icon */}
                        <Link
                            href='/docs'
                            className={`p-2 rounded-md hover:bg-muted transition-all ${
                                pathname?.startsWith('/docs')
                                    ? 'text-amber bg-muted/40'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                            title={t.docs}
                        >
                            <svg
                                className='h-5 w-5 stroke-[1.75]'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-16.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-16.25v14.25'
                                />
                            </svg>
                        </Link>

                        {/* Globe Language Selector Dropdown */}
                        <div className='relative' ref={dropdownRef}>
                            <button
                                onClick={() =>
                                    setLangDropdownOpen(!langDropdownOpen)
                                }
                                className='p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer'
                                aria-label='Select Language'
                            >
                                <svg
                                    className='size-7 stroke-[1.75]'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253'
                                    />
                                </svg>
                            </button>

                            {langDropdownOpen && (
                                <div className='absolute right-0 mt-2 w-48 origin-top-right rounded-lg border border-border bg-card p-0.5 shadow-xl transition-all z-50'>
                                    {/* NL Language */}
                                    <Link
                                        href={getLocalePath('nl')}
                                        onClick={() => {
                                            document.cookie =
                                                'emlinked_locale=nl; path=/; max-age=31536000; SameSite=Lax';
                                            setLangDropdownOpen(false);
                                        }}
                                        className='flex items-center justify-between px-2 py-1 text-xs font-semibold rounded-md text-white/70 dark:text-slate-600 hover:bg-white/10 dark:hover:bg-slate-100 hover:text-white dark:hover:text-slate-900 transition-all'
                                    >
                                        <div className='flex items-center gap-2'>
                                            <span>🇳🇱</span>
                                            <span>Nederlands</span>
                                        </div>
                                        {locale === 'nl' && (
                                            <svg
                                                className='size-8 text-primary'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                stroke='currentColor'
                                                strokeWidth='3'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    d='M4.5 12.75l6 6 9-13.5'
                                                />
                                            </svg>
                                        )}
                                    </Link>

                                    {/* EN Language */}
                                    <Link
                                        href={getLocalePath('en')}
                                        onClick={() => {
                                            document.cookie =
                                                'emlinked_locale=en; path=/; max-age=31536000; SameSite=Lax';
                                            setLangDropdownOpen(false);
                                        }}
                                        className='flex items-center justify-between px-2 py-1 text-xs font-semibold rounded-md text-white/70 dark:text-slate-600 hover:bg-white/10 dark:hover:bg-slate-100 hover:text-white dark:hover:text-slate-900 transition-all'
                                    >
                                        <div className='flex items-center gap-2'>
                                            <span>🇬🇧</span>
                                            <span>English</span>
                                        </div>
                                        {locale === 'en' && (
                                            <svg
                                                className='size-8 text-primary'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                stroke='currentColor'
                                                strokeWidth='3'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    d='M4.5 12.75l6 6 9-13.5'
                                                />
                                            </svg>
                                        )}
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Sun/Moon Theme Toggle Switch */}
                        <button
                            onClick={toggleTheme}
                            className='p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer'
                            aria-label='Switch Theme'
                        >
                            {mounted &&
                            (theme === 'dark' ||
                                (theme === 'system' &&
                                    window.matchMedia(
                                        '(prefers-color-scheme: dark)',
                                    ).matches)) ? (
                                <svg
                                    className='size-7 stroke-[1.75]'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className='h-5 w-5 stroke-[1.75]'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z'
                                    />
                                </svg>
                            )}
                        </button>

                        {/* Sign In Button / Portal Access - Restored original Mijn Emlinked Design with Badtz Star Effect */}
                        <Link
                            href='/docs'
                            className='inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md border transition-all duration-300 bg-[#ff9400] border-white text-white hover:bg-white hover:border-[#ff9400] hover:text-[#ff9400] dark:bg-[#060e32] dark:border-[#ff9400] dark:text-[#ff9400] dark:hover:bg-[#ff9400] dark:hover:border-[#060e32] dark:hover:text-[#060e32]'
                        >
                            <BsRocketTakeoff className='h-4 w-4 shrink-0' />
                            <span>{t.mijnEmlinked}</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer (Animated with Framer Motion) */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className='xl:hidden border-t border-border bg-card overflow-hidden shadow-inner'
                    >
                        <nav className='flex flex-col gap-1 p-4'>
                            {/* Vastgoedsoftware Accordion */}
                            <div className='border-b border-border/60 py-2'>
                                <button
                                    onClick={() =>
                                        toggleMobileSubmenu('vastgoed')
                                    }
                                    className='flex w-full items-center justify-between text-sm font-semibold text-foreground py-1'
                                >
                                    <span>{t.vastgoedsoftware}</span>
                                    <svg
                                        className={`h-4 w-4 transition-transform duration-200 ${mobileSubmenu === 'vastgoed' ? 'rotate-180 text-amber' : 'text-white/70 dark:text-slate-500'}`}
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                        strokeWidth='2.5'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                                        />
                                    </svg>
                                </button>
                                {mobileSubmenu === 'vastgoed' && (
                                    <div className='pl-4 pr-2 py-2 flex flex-col gap-3.5 bg-muted/20 rounded-md mt-1'>
                                        <Link
                                            href={getPath(
                                                '/oplossingen/vastgoedbeheer-software',
                                            )}
                                            className={`text-xs font-medium ${isActive('/oplossingen/vastgoedbeheer-software') ? 'text-amber' : 'text-white/70 dark:text-slate-500'}`}
                                        >
                                            {t.vastgoedbeheer}
                                        </Link>
                                        <Link
                                            href={getPath(
                                                '/oplossingen/huurdersportaal',
                                            )}
                                            className={`text-xs font-medium ${isActive('/oplossingen/huurdersportaal') ? 'text-amber' : 'text-white/70 dark:text-slate-500'}`}
                                        >
                                            {t.huurdersportaal}
                                        </Link>
                                        <Link
                                            href={getPath(
                                                '/oplossingen/payment',
                                            )}
                                            className={`text-xs font-medium ${isActive('/oplossingen/payment') ? 'text-amber' : 'text-white/70 dark:text-slate-500'}`}
                                        >
                                            {t.payment}
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Software Oplossingen Accordion */}
                            <div className='border-b border-border/60 py-2'>
                                <button
                                    onClick={() =>
                                        toggleMobileSubmenu('oplossingen')
                                    }
                                    className='flex w-full items-center justify-between text-sm font-semibold text-foreground py-1'
                                >
                                    <span>{t.oplossingen}</span>
                                    <svg
                                        className={`h-4 w-4 transition-transform duration-200 ${mobileSubmenu === 'oplossingen' ? 'rotate-180 text-amber' : 'text-white/70 dark:text-slate-500'}`}
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                        strokeWidth='2.5'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                                        />
                                    </svg>
                                </button>
                                {mobileSubmenu === 'oplossingen' && (
                                    <div className='pl-4 pr-2 py-2 flex flex-col gap-3.5 bg-muted/20 rounded-md mt-1'>
                                        <Link
                                            href={getPath('/integraties')}
                                            className={`text-xs font-medium ${isActive('/integraties') ? 'text-amber' : 'text-white/70 dark:text-slate-500'}`}
                                        >
                                            {t.integrations}
                                        </Link>
                                        <Link
                                            href={getPath(
                                                '/kennisbank/box3-check',
                                            )}
                                            className={`text-xs font-medium ${isActive('/kennisbank/box3-check') ? 'text-amber' : 'text-white/70 dark:text-slate-500'}`}
                                        >
                                            {t.box3}
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Diensten Accordion */}
                            <div className='border-b border-border/60 py-2'>
                                <button
                                    onClick={() =>
                                        toggleMobileSubmenu('diensten')
                                    }
                                    className='flex w-full items-center justify-between text-sm font-semibold text-foreground py-1'
                                >
                                    <span>{t.diensten}</span>
                                    <svg
                                        className={`h-4 w-4 transition-transform duration-200 ${mobileSubmenu === 'diensten' ? 'rotate-180 text-amber' : 'text-white/70 dark:text-slate-500'}`}
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                        strokeWidth='2.5'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                                        />
                                    </svg>
                                </button>
                                {mobileSubmenu === 'diensten' && (
                                    <div className='pl-4 pr-2 py-2 flex flex-col gap-3.5 bg-muted/20 rounded-md mt-1'>
                                        <Link
                                            href={getPath('/referenties')}
                                            className={`text-xs font-medium ${isActive('/referenties') ? 'text-amber' : 'text-white/70 dark:text-slate-500'}`}
                                        >
                                            {t.referenties}
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Prijzen link */}
                            <div className='border-b border-border/60 py-2.5'>
                                <Link
                                    href={getPath('/prijzen')}
                                    className={`text-sm font-semibold block ${isActive('/prijzen') ? 'text-primary' : 'text-foreground'}`}
                                >
                                    {t.prijzen}
                                </Link>
                            </div>

                            {/* Over ons Accordion */}
                            <div className='border-b border-border/60 py-2'>
                                <button
                                    onClick={() =>
                                        toggleMobileSubmenu('overons')
                                    }
                                    className='flex w-full items-center justify-between text-sm font-semibold text-foreground py-1'
                                >
                                    <span>{t.overons}</span>
                                    <svg
                                        className={`h-4 w-4 transition-transform duration-200 ${mobileSubmenu === 'overons' ? 'rotate-180 text-amber' : 'text-white/70 dark:text-slate-500'}`}
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                        strokeWidth='2.5'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                                        />
                                    </svg>
                                </button>
                                {mobileSubmenu === 'overons' && (
                                    <div className='pl-4 pr-2 py-2 flex flex-col gap-3.5 bg-muted/20 rounded-md mt-1'>
                                        <Link
                                            href={getPath('/team')}
                                            className={`text-xs font-medium ${isActive('/team') ? 'text-amber' : 'text-muted-foreground'}`}
                                        >
                                            {t.team}
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Nieuws link */}
                            <div className='py-2.5'>
                                <Link
                                    href={getPath('/blog')}
                                    className={`text-sm font-semibold block ${isActive('/blog') ? 'text-primary' : 'text-foreground'}`}
                                >
                                    {t.nieuws}
                                </Link>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hover Trigger Tab + Sliding Announcement Box */}
            {settings?.announcementActive && settings?.announcementText && (
                <div
                    className='fixed right-0 top-[150px] z-[9999] pointer-events-auto'
                    onMouseEnter={() => setAnnouncementHovered(true)}
                    onMouseLeave={() => setAnnouncementHovered(false)}
                >
                    <AnimatePresence>
                        {!announcementHovered ? (
                            /* Small Fixed Tab Badge */
                            <motion.div
                                key='announcement-tab'
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                                transition={{
                                    type: 'spring',
                                    damping: 25,
                                    stiffness: 150,
                                }}
                                className='bg-amber text-navy font-bold text-[11px] px-4 py-3 rounded-l-xl shadow-xl flex items-center gap-2 cursor-pointer border-l border-y border-white/20 select-none hover:bg-amber-light'
                            >
                                <span className='w-1.5 h-1.5 bg-navy rounded-full animate-pulse' />
                                <span>
                                    {locale === 'en'
                                        ? 'Important announcement'
                                        : 'Belangrijke aankondiging'}
                                </span>
                            </motion.div>
                        ) : (
                            /* Sliding Large Announcement Box */
                            <motion.div
                                key='announcement-card'
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: -12 }} // x: -12 offset to sit nicely on viewport
                                exit={{ opacity: 0, x: 100 }}
                                transition={{
                                    type: 'spring',
                                    damping: 22,
                                    stiffness: 120,
                                }}
                                className='w-[340px] p-5 rounded-xl bg-navy/95 border border-white/10 shadow-2xl backdrop-blur-md flex flex-col gap-3 text-left'
                            >
                                <div className='flex items-center justify-between'>
                                    <span className='bg-amber text-navy text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider'>
                                        {locale === 'en'
                                            ? 'Important Announcement'
                                            : 'Belangrijke aankondiging'}
                                    </span>
                                </div>

                                <p className='text-xs text-white/90 leading-relaxed font-sans font-medium'>
                                    {settings.announcementText}
                                </p>

                                {settings.announcementLink && (
                                    <Link
                                        href={getPath(
                                            settings.announcementLink,
                                        )}
                                        className='inline-flex items-center gap-1 text-xs text-amber-light hover:text-amber font-semibold transition-all hover:translate-x-0.5'
                                    >
                                        <span>
                                            {locale === 'en'
                                                ? 'Read more'
                                                : 'Lees meer'}
                                        </span>
                                        <span>&rarr;</span>
                                    </Link>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </header>
    );
}
