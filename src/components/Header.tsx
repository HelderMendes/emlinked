'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { DemoModal } from '@/components/DemoModal';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BsRocketTakeoff,
    BsBuilding,
    BsChatSquareText,
    BsCreditCard2Back,
    BsPeopleFill,
    BsGraphUpArrow,
    BsReceipt,
    BsBank2,
    BsArrowUpRight,
} from 'react-icons/bs';
import { BorderBeam } from 'border-beam';

// Maps a submenu link title to a representative icon so the mega-menu
// reads as a scannable grid instead of a wall of text.
function getSubIcon(title: string) {
    const t = title.toLowerCase();
    if (t.includes('vastgoedbeheer') || t.includes('property management'))
        return BsBuilding;
    if (t.includes('huurdersportaal') || t.includes('tenant'))
        return BsChatSquareText;
    if (t.includes('payment') || t.includes('betal'))
        return BsCreditCard2Back;
    if (t.includes('referenties') || t.includes('references'))
        return BsPeopleFill;
    if (t.includes('indexatie') || t.includes('indexation') || t.includes('cpi'))
        return BsGraphUpArrow;
    if (t.includes('prolongatie') || t.includes('invoicing') || t.includes('facturatie'))
        return BsReceipt;
    if (t.includes('boekhouding') || t.includes('accounting'))
        return BsBank2;
    return BsArrowUpRight;
}

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
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();
    const t = translations[locale as 'nl' | 'en'] || translations.nl;
    const isEn = locale === 'en';
    const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(
        isEn ? 'Our apps' : 'Onze apps',
    );
    const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

    // Fallback menu structure if Sanity settings are empty
    const defaultMenu = isEn
        ? [
              {
                  _type: 'menuDropdown',
                  title: 'Our apps',
                  path: '/apps',
                  links: [
                      {
                          title: 'Property management software',
                          path: '/apps/vastgoedbeheer-software',
                          description: 'Core SaaS property management module.',
                      },
                      {
                          title: 'Tenant Portal',
                          path: '/apps/huurdersportaal',
                          description:
                              'Self-service portal for support tickets.',
                      },
                      {
                          title: 'Payment software',
                          path: '/apps/payment-software',
                          description: 'Automated billing transactions.',
                      },
                  ],
              },
              {
                  _type: 'menuLink',
                  title: 'Box3-check ⚡',
                  path: '/box3-check',
              },
              {
                  _type: 'menuLink',
                  title: 'Partner software',
                  path: '/partners-software',
              },
              { _type: 'menuLink', title: 'Pricing', path: '/prijzen' },
              { _type: 'menuLink', title: 'References', path: '/referenties' },
              { _type: 'menuLink', title: 'About us', path: '/over-ons' },
              { _type: 'menuLink', title: 'News', path: '/nieuws' },
          ]
        : [
              {
                  _type: 'menuDropdown',
                  title: 'Onze apps',
                  path: '/apps',
                  links: [
                      {
                          title: 'Vastgoedbeheer software',
                          path: '/apps/vastgoedbeheer-software',
                          description:
                              'De core SaaS module voor vastgoedmanagement.',
                      },
                      {
                          title: 'Huurdersportaal',
                          path: '/apps/huurdersportaal',
                          description:
                              'Self-service portaal voor communicatie & meldingen.',
                      },
                      {
                          title: 'Payment software',
                          path: '/apps/payment-software',
                          description:
                              'Geautomatiseerde betalingstransacties & bankaflettering.',
                      },
                  ],
              },
              {
                  _type: 'menuLink',
                  title: 'Box3-check ⚡',
                  path: '/box3-check',
              },
              {
                  _type: 'menuLink',
                  title: 'Partners software',
                  path: '/partners-software',
              },
              { _type: 'menuLink', title: 'Prijzen', path: '/prijzen' },
              { _type: 'menuLink', title: 'Referenties', path: '/referenties' },
              { _type: 'menuLink', title: 'Over ons', path: '/over-ons' },
              { _type: 'menuLink', title: 'Nieuws', path: '/nieuws' },
          ];

    const menuItems = (settings as any)?.navigationMenu || defaultMenu;

    const headerRef = useRef<HTMLElement>(null);
    const mobileDropdownRef = useRef<HTMLDivElement>(null);
    const desktopDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);

        // Close mobile menu & language dropdown when clicking/tapping outside
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            const target = event.target as Node;
            if (headerRef.current && !headerRef.current.contains(target)) {
                setMobileMenuOpen(false);
            }
            const isInsideMobile = mobileDropdownRef.current?.contains(target);
            const isInsideDesktop =
                desktopDropdownRef.current?.contains(target);
            if (!isInsideMobile && !isInsideDesktop) {
                setLangDropdownOpen(false);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setMobileMenuOpen(false);
                setLangDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        window.addEventListener('keydown', handleKeyDown);

        // Listen for #demo hash triggers and click events
        const handleHashChange = () => {
            if (window.location.hash === '#demo') {
                setIsDemoModalOpen(true);
                window.history.replaceState(null, '', window.location.pathname);
            }
        };

        const handleDemoClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('a, button');
            if (target) {
                const href = target.getAttribute('href');
                if (href === '#demo' || href?.endsWith('#demo')) {
                    e.preventDefault();
                    setIsDemoModalOpen(true);
                }
            }
        };

        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        document.addEventListener('click', handleDemoClick);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('hashchange', handleHashChange);
            document.removeEventListener('click', handleDemoClick);
        };
    }, []);

    // Close mobile menu on path changes & reset default expanded submenu
    useEffect(() => {
        setMobileMenuOpen(false);
        setMobileSubmenu(isEn ? 'Our apps' : 'Onze apps');
    }, [pathname, isEn]);

    // Helper to prepend locale for links and translate categories/slugs
    const getPath = (path: string) => {
        if (locale === 'nl') {
            return path;
        }

        let translatedPath = path;
        translatedPath = translatedPath.replace(
            '/apps/vastgoedbeheer-software',
            '/solutions/property-management-software',
        );
        translatedPath = translatedPath.replace(
            '/apps/huurdersportaal',
            '/solutions/tenant-portal',
        );
        translatedPath = translatedPath.replace(
            '/apps/payment-software',
            '/solutions/payment-software',
        );
        translatedPath = translatedPath.replace(
            '/apps/payment',
            '/solutions/payment-software',
        );
        translatedPath = translatedPath.replace('/apps', '/solutions');
        translatedPath = translatedPath.replace('/over-ons', '/about-us');
        translatedPath = translatedPath.replace('/nieuws', '/news');

        return `/en${translatedPath === '/' ? '' : translatedPath}`;
    };

    const getLocalePath = (targetLocale: string) => {
        if (!pathname) return targetLocale === 'nl' ? '/' : '/en';

        let path = pathname;

        if (targetLocale === 'en') {
            path = path.replace(
                '/apps/vastgoedbeheer-software',
                '/solutions/property-management-software',
            );
            path = path.replace(
                '/apps/huurdersportaal',
                '/solutions/tenant-portal',
            );
            path = path.replace(
                '/apps/payment-software',
                '/solutions/payment-software',
            );
            path = path.replace('/apps/payment', '/solutions/payment-software');
            path = path.replace('/apps', '/solutions');
            path = path.replace('/over-ons', '/about-us');
            path = path.replace('/nieuws', '/news');

            if (!path.startsWith('/en')) {
                path = `/en${path === '/' ? '' : path}`;
            }
            return path;
        } else {
            if (path.startsWith('/en')) {
                path = path.replace('/en', '') || '/';
            }
            path = path.replace(
                '/solutions/property-management-software',
                '/apps/vastgoedbeheer-software',
            );
            path = path.replace(
                '/solutions/tenant-portal',
                '/apps/huurdersportaal',
            );
            path = path.replace('/solutions/payment-software', '/apps/payment');
            path = path.replace('/solutions', '/apps');
            path = path.replace('/about-us', '/over-ons');
            path = path.replace('/news', '/nieuws');
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
        <header
            ref={headerRef}
            className='sticky top-0 z-50 w-full xl:border-t-6 border-amber bg-white/95 backdrop-blur-md transition-all duration-300 shadow-md text-foreground'
        >
            {/* Row 1: Full-Width 50/50 Top CTA Bar (Only visible on < xl screens) */}
            <div className='flex xl:hidden w-full border-b border-amber/20 items-stretch font-semibold text-xs sm:text-sm bg-white'>
                <button
                    onClick={() => setIsDemoModalOpen(true)}
                    className='w-1/2 bg-amber text-white hover:bg-amber-hover flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-none transition-colors cursor-pointer font-bold shadow-xs'
                >
                    <span>{isEn ? 'Request a Demo' : 'Demo aanvragen'}</span>
                </button>
                <Link
                    href='/docs'
                    className='w-1/2 bg-darkBlue text-amber hover:bg-navy flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-none border-l border-amber/30 transition-colors cursor-pointer font-semibold'
                >
                    <BsRocketTakeoff className='h-3.5 w-3.5 shrink-0 text-amber' />
                    <span>{t.mijnEmlinked}</span>
                </Link>
            </div>

            {/* Row 2 on Mobile/Tablet (< xl) OR Main Header Row on Desktop (>= xl) */}
            <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8'>
                {/* Mobile / Medium Bar (< xl) */}
                <div className='flex xl:hidden h-16 items-center justify-between gap-2'>
                    {/* Left: Brand Logo */}
                    <div className='flex items-center shrink-0'>
                        <Link
                            href={getPath('/')}
                            className='flex items-center'
                            aria-label='emlinked - Vastgoedbeheer Software'
                            title='emlinked - Vastgoedbeheer Software'
                        >
                            <img
                                src={logoSrc}
                                alt='emlinked - Vastgoedbeheer Software'
                                className='w-auto h-8 transition-all'
                            />
                        </Link>
                    </div>

                    {/* Middle: Centered Mobile Menu Pill Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber/10 border border-amber/30 text-amber font-semibold text-xs uppercase tracking-wider hover:bg-amber/20 active:scale-95 transition-all cursor-pointer'
                        aria-label='Toggle Menu'
                    >
                        <svg
                            className='h-4 w-4'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='2'
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
                        <span>
                            {mobileMenuOpen
                                ? isEn
                                    ? 'Sluit'
                                    : 'Sluit'
                                : 'Menu'}
                        </span>
                    </button>

                    {/* Right: Language Selector Dropdown */}
                    <div className='relative shrink-0' ref={mobileDropdownRef}>
                        <button
                            onClick={() =>
                                setLangDropdownOpen(!langDropdownOpen)
                            }
                            className='p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer'
                            aria-label='Select Language'
                        >
                            <svg
                                className='size-5 stroke-[1.5]'
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
                            <div className='absolute right-0 mt-2 w-44 origin-top-right rounded-lg border border-amber/30 bg-[#FFFDF9] text-[#060e32] p-1 shadow-2xl transition-all z-50'>
                                <Link
                                    href={getLocalePath('nl')}
                                    onClick={() => {
                                        document.cookie =
                                            'emlinked_locale=nl; path=/; max-age=31536000; SameSite=Lax';
                                        setLangDropdownOpen(false);
                                    }}
                                    className='flex items-center justify-between px-2 py-1 text-sm font-semibold rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-800 dark:hover:bg-slate-200 hover:text-white dark:hover:text-slate-900 transition-all'
                                >
                                    <div className='flex items-center gap-2'>
                                        <span className='text-lg mr-1'>🇳🇱</span>
                                        <span>Nederlands</span>
                                    </div>
                                    {locale === 'nl' && (
                                        <svg
                                            className='size-5 text-primary'
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

                                <Link
                                    href={getLocalePath('en')}
                                    onClick={() => {
                                        document.cookie =
                                            'emlinked_locale=en; path=/; max-age=31536000; SameSite=Lax';
                                        setLangDropdownOpen(false);
                                    }}
                                    className='flex items-center justify-between px-2 py-1 text-sm font-semibold rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-800 dark:hover:bg-slate-200 hover:text-white dark:hover:text-slate-900 transition-all'
                                >
                                    <div className='flex items-center gap-2'>
                                        <span className='text-lg mr-1'>🇬🇧</span>
                                        <span>English</span>
                                    </div>
                                    {locale === 'en' && (
                                        <svg
                                            className='size-5 text-primary'
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
                </div>

                {/* Desktop Bar (>= xl) */}
                <div className='hidden xl:flex h-16 items-center justify-between gap-4'>
                    {/* Logo & Brand Title */}
                    <div className='flex items-center shrink-0'>
                        <Link
                            href={getPath('/')}
                            className='flex items-center'
                            aria-label='emlinked - Vastgoedbeheer Software'
                            title='emlinked - Vastgoedbeheer Software'
                        >
                            <img
                                src={logoSrc}
                                alt='emlinked - Vastgoedbeheer Software'
                                className='w-auto h-9 transition-all'
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <nav className='hidden xl:flex items-center justify-center gap-1.5 2xl:gap-2 grow mt-1'>
                        {menuItems.map((item: any, idx: number) => {
                            const isDropdown = item._type === 'menuDropdown';
                            const isDropdownActive =
                                isDropdown &&
                                (item.links?.some((l: any) =>
                                    isActive(l.path),
                                ) ||
                                    isActive(item.path));

                            if (isDropdown) {
                                return (
                                    <div
                                        key={idx}
                                        className='group relative py-2'
                                    >
                                        {item.path ? (
                                            <Link
                                                href={getPath(item.path)}
                                                className={`flex items-center gap-1.5 text-[13px] 2xl:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap px-3 py-1.5 rounded-lg ${
                                                    isDropdownActive
                                                        ? 'text-amber bg-amber/10 font-bold shadow-xs'
                                                        : 'text-foreground/80 hover:text-amber hover:bg-amber/5'
                                                }`}
                                            >
                                                {item.title}
                                                <svg
                                                    className='h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 text-amber/80'
                                                    viewBox='0 0 20 20'
                                                    fill='currentColor'
                                                >
                                                    <path
                                                        fillRule='evenodd'
                                                        d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                                                        clipRule='evenodd'
                                                    />
                                                </svg>
                                            </Link>
                                        ) : (
                                            <button
                                                className={`flex items-center gap-1.5 text-[13px] 2xl:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap px-3 py-1.5 rounded-lg ${
                                                    isDropdownActive
                                                        ? 'text-amber bg-amber/10 font-bold shadow-xs'
                                                        : 'text-foreground/80 hover:text-amber hover:bg-amber/5'
                                                }`}
                                            >
                                                {item.title}
                                                <svg
                                                    className='h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 text-amber/80'
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
                                        )}
                                        <div className='absolute left-1/2 -translate-x-1/2 mt-2 w-80 origin-top rounded-xl border border-amber/30 p-2 shadow-2xl transition-all opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto z-50 bg-[#FFFDF9] text-[#060e32]'>
                                            <div className='flex flex-col gap-1'>
                                                {item.links?.map(
                                                    (
                                                        subLink: any,
                                                        sIdx: number,
                                                    ) => {
                                                        const isDemo =
                                                            subLink.path ===
                                                            '#demo';
                                                        const active = isActive(
                                                            subLink.path,
                                                        );
                                                        const SubIcon =
                                                            getSubIcon(
                                                                subLink.title,
                                                            );

                                                        const subContent = (
                                                            <div className='flex items-start gap-3'>
                                                                <div
                                                                    className={`p-2 rounded-lg shrink-0 transition-colors ${active ? 'bg-amber text-white' : 'bg-amber/10 text-amber group-hover/item:bg-amber group-hover/item:text-white'}`}
                                                                >
                                                                    <SubIcon className='w-4 h-4' />
                                                                </div>
                                                                <div className='flex flex-col gap-0.5'>
                                                                    <span
                                                                        className={`block text-[13px] font-bold leading-tight ${active ? 'text-amber' : 'text-foreground group-hover/item:text-amber'}`}
                                                                    >
                                                                        {
                                                                            subLink.title
                                                                        }
                                                                    </span>
                                                                    {subLink.description && (
                                                                        <span className='block text-[11px] leading-snug text-muted-foreground'>
                                                                            {
                                                                                subLink.description
                                                                            }
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );

                                                        const cellClass = `group/item block rounded-lg p-2.5 transition-all duration-200 text-left w-full ${active ? 'bg-amber/10 border border-amber/20' : 'hover:bg-amber/5'}`;

                                                        if (isDemo) {
                                                            return (
                                                                <button
                                                                    key={sIdx}
                                                                    onClick={() =>
                                                                        setIsDemoModalOpen(
                                                                            true,
                                                                        )
                                                                    }
                                                                    className={`cursor-pointer ${cellClass}`}
                                                                >
                                                                    {subContent}
                                                                </button>
                                                            );
                                                        }

                                                        return (
                                                            <Link
                                                                key={sIdx}
                                                                href={getPath(
                                                                    subLink.path,
                                                                )}
                                                                className={
                                                                    cellClass
                                                                }
                                                            >
                                                                {subContent}
                                                            </Link>
                                                        );
                                                    },
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            // Single link
                            const isDemo = item.path === '#demo';
                            const active = isActive(item.path);

                            if (isDemo) {
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => setIsDemoModalOpen(true)}
                                        className='text-[13px] 2xl:text-sm font-semibold transition-all duration-200 text-foreground/80 hover:text-amber hover:bg-amber/5 px-3 py-1.5 rounded-lg cursor-pointer'
                                    >
                                        {item.title}
                                    </button>
                                );
                            }

                            return (
                                <Link
                                    key={idx}
                                    href={getPath(item.path)}
                                    className={`text-[13px] 2xl:text-sm font-semibold transition-all duration-200 px-3 py-1.5 rounded-lg ${
                                        active
                                            ? 'text-amber bg-amber/10 font-bold shadow-xs'
                                            : 'text-foreground/80 hover:text-amber hover:bg-amber/5'
                                    }`}
                                >
                                    {item.title}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right side: Desktop Global Actions */}
                    <div className='flex items-center gap-3 sm:gap-4 shrink-0 justify-end'>
                        {/* Globe Language Selector Dropdown */}
                        <div className='relative' ref={desktopDropdownRef}>
                            <button
                                onClick={() =>
                                    setLangDropdownOpen(!langDropdownOpen)
                                }
                                className='p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer flex items-center justify-center'
                                aria-label='Select Language'
                            >
                                <svg
                                    className='size-6 stroke-[1.5]'
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
                                <div className='absolute right-0 mt-2 w-48 origin-top-right rounded-lg border border-amber/30 bg-[#FFFDF9] text-[#060e32] p-1 shadow-2xl transition-all z-50'>
                                    <Link
                                        href={getLocalePath('nl')}
                                        onClick={() => {
                                            document.cookie =
                                                'emlinked_locale=nl; path=/; max-age=31536000; SameSite=Lax';
                                            setLangDropdownOpen(false);
                                        }}
                                        className='flex items-center justify-between px-2 py-1 text-sm font-semibold rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-800 dark:hover:bg-slate-200 hover:text-white dark:hover:text-slate-900 transition-all'
                                    >
                                        <div className='flex items-center gap-2'>
                                            <span className='text-xl mr-1'>
                                                🇳🇱
                                            </span>
                                            <span>Nederlands</span>
                                        </div>
                                        {locale === 'nl' && (
                                            <svg
                                                className='size-6 text-primary'
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

                                    <Link
                                        href={getLocalePath('en')}
                                        onClick={() => {
                                            document.cookie =
                                                'emlinked_locale=en; path=/; max-age=31536000; SameSite=Lax';
                                            setLangDropdownOpen(false);
                                        }}
                                        className='flex items-center justify-between px-2 py-1 text-sm font-semibold rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-800 dark:hover:bg-slate-200 hover:text-white dark:hover:text-slate-900 transition-all'
                                    >
                                        <div className='flex items-center gap-2'>
                                            <span className='text-xl mr-1'>
                                                🇬🇧
                                            </span>
                                            <span>English</span>
                                        </div>
                                        {locale === 'en' && (
                                            <svg
                                                className='size-6 text-primary'
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

                        {/* Demo aanvragen Button */}
                        <BorderBeam
                            size='line'
                            colorVariant='ocean'
                            strength={1}
                        >
                            <button
                                onClick={() => setIsDemoModalOpen(true)}
                                className='inline-flex items-center gap-1.5 px-4 py-2 font-semibold rounded-md border transition-all duration-300 bg-orange border-primary text-primary-foreground cursor-pointer shadow-sm text-sm hover:bg-darkBlue hover:border-darkBlue hover:text-orange dark:bg-darkBlue'
                            >
                                {isEn ? 'Request a Demo' : 'Demo aanvragen'}
                            </button>
                        </BorderBeam>

                        {/* Sign In Button / Portal Access */}
                        <Link
                            href='/docs'
                            className='inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md border transition-all duration-300 bg-orange border-darkBlue text-darkBlue hover:bg-darkBlue hover:border-darkBlue hover:text-orange dark:bg-darkBlue dark:border-orange dark:text-orange dark:hover:bg-orange dark:hover:border-darkBlue dark:hover:text-darkBlue'
                        >
                            <BsRocketTakeoff className='h-4 w-4 shrink-0' />
                            <span className='text-sm'>{t.mijnEmlinked}</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer (Animated with Framer Motion) */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Tap-to-dismiss backdrop overlay (starts below header bar) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className='fixed inset-x-0 top-[104px] bottom-0 z-40 bg-slate-950/40 xl:hidden cursor-pointer'
                            aria-hidden='true'
                        />

                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className='relative z-50 xl:hidden border-t border-amber/20 bg-white dark:bg-card overflow-hidden shadow-xl'
                        >
                            <nav className='flex flex-col p-4 gap-1'>
                                {menuItems.map((item: any, idx: number) => {
                                    const key = `mobile-nav-${idx}`;
                                    if (item._type === 'menuDropdown') {
                                        const isOpen =
                                            mobileSubmenu === item.title;
                                        return (
                                            <div
                                                key={key}
                                                className='border-b border-amber/10 py-3 transition-colors'
                                            >
                                                <div className='flex w-full items-center justify-between py-1'>
                                                    {item.path ? (
                                                        <Link
                                                            href={getPath(
                                                                item.path,
                                                            )}
                                                            onClick={() =>
                                                                setMobileMenuOpen(
                                                                    false,
                                                                )
                                                            }
                                                            className={`text-sm font-semibold transition-colors cursor-pointer ${
                                                                isActive(
                                                                    item.path,
                                                                )
                                                                    ? 'text-amber font-bold'
                                                                    : 'text-foreground hover:text-amber'
                                                            }`}
                                                        >
                                                            {item.title}
                                                        </Link>
                                                    ) : (
                                                        <span
                                                            onClick={() =>
                                                                toggleMobileSubmenu(
                                                                    item.title,
                                                                )
                                                            }
                                                            className='text-sm font-semibold text-foreground cursor-pointer'
                                                        >
                                                            {item.title}
                                                        </span>
                                                    )}
                                                    <button
                                                        onClick={() =>
                                                            toggleMobileSubmenu(
                                                                item.title,
                                                            )
                                                        }
                                                        className='p-1 rounded-md text-foreground/50 hover:text-amber hover:bg-amber/10 active:scale-95 transition-all cursor-pointer'
                                                        aria-label='Toggle Submenu'
                                                    >
                                                        <svg
                                                            className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-amber' : 'text-foreground/50'}`}
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
                                                </div>
                                                {isOpen && (
                                                    <div className='pl-5 pr-1 pt-1.5 flex flex-col gap-0.5 mt-1'>
                                                        {item.links?.map(
                                                            (
                                                                subLink: any,
                                                                sIdx: number,
                                                            ) => {
                                                                const isDemo =
                                                                    subLink.path ===
                                                                    '#demo';
                                                                const active =
                                                                    isActive(
                                                                        subLink.path,
                                                                    );
                                                                const SubIcon =
                                                                    getSubIcon(
                                                                        subLink.title,
                                                                    );
                                                                const itemClass = `flex items-center gap-3 text-xs transition-all py-2.5 px-2 border-t border-amber/10 rounded-lg w-full text-left cursor-pointer active:scale-[0.98] active:bg-amber/10 ${active ? 'text-amber font-bold bg-amber/5' : 'text-foreground/80 hover:text-amber hover:bg-amber/5'}`;

                                                                if (isDemo) {
                                                                    return (
                                                                        <button
                                                                            key={
                                                                                sIdx
                                                                            }
                                                                            onClick={() => {
                                                                                setIsDemoModalOpen(
                                                                                    true,
                                                                                );
                                                                                setMobileMenuOpen(
                                                                                    false,
                                                                                );
                                                                            }}
                                                                            className={
                                                                                itemClass
                                                                            }
                                                                        >
                                                                            <SubIcon className='w-4 h-4 text-amber shrink-0' />
                                                                            <span>
                                                                                {
                                                                                    subLink.title
                                                                                }
                                                                            </span>
                                                                        </button>
                                                                    );
                                                                }
                                                                return (
                                                                    <Link
                                                                        key={
                                                                            sIdx
                                                                        }
                                                                        href={getPath(
                                                                            subLink.path,
                                                                        )}
                                                                        onClick={() =>
                                                                            setMobileMenuOpen(
                                                                                false,
                                                                            )
                                                                        }
                                                                        className={
                                                                            itemClass
                                                                        }
                                                                    >
                                                                        <SubIcon
                                                                            className={`w-4 h-4 shrink-0 ${active ? 'text-amber' : 'text-amber/70'}`}
                                                                        />
                                                                        <span>
                                                                            {
                                                                                subLink.title
                                                                            }
                                                                        </span>
                                                                    </Link>
                                                                );
                                                            },
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    }

                                    const isDemo = item.path === '#demo';
                                    if (isDemo) {
                                        return (
                                            <div
                                                key={key}
                                                className='border-b border-amber/10 py-3'
                                            >
                                                <button
                                                    onClick={() => {
                                                        setIsDemoModalOpen(
                                                            true,
                                                        );
                                                        setMobileMenuOpen(
                                                            false,
                                                        );
                                                    }}
                                                    className='text-sm font-semibold block text-left w-full text-foreground hover:text-amber transition-colors cursor-pointer'
                                                >
                                                    {item.title}
                                                </button>
                                            </div>
                                        );
                                    }

                                    return (
                                        <div
                                            key={key}
                                            className='border-b border-amber/10 py-3'
                                        >
                                            <Link
                                                href={getPath(item.path)}
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                                className={`text-sm font-semibold block transition-colors ${isActive(item.path) ? 'text-amber font-bold' : 'text-foreground hover:text-amber'}`}
                                            >
                                                {item.title}
                                            </Link>
                                        </div>
                                    );
                                })}
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <DemoModal
                isOpen={isDemoModalOpen}
                onClose={() => setIsDemoModalOpen(false)}
                locale={locale}
                settings={settings}
            />
        </header>
    );
}
