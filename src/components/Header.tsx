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
    const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    const [announcementHovered, setAnnouncementHovered] = useState(false);
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();
    const t = translations[locale as 'nl' | 'en'] || translations.nl;
    const isEn = locale === 'en';
    const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

    // Fallback menu structure if Sanity settings are empty
    const defaultMenu = isEn
        ? [
              {
                  _type: 'menuDropdown',
                  title: 'Property Software',
                  path: '/vastgoedsoftware',
                  links: [
                      {
                          title: 'Property Management',
                          path: '/oplossingen/vastgoedbeheer-software',
                          description: 'Core SaaS property management module.',
                      },
                      {
                          title: 'Tenant Portal',
                          path: '/oplossingen/huurdersportaal',
                          description:
                              'Self-service portal for support tickets.',
                      },
                      {
                          title: 'Payment Software',
                          path: '/oplossingen/payment',
                          description: 'Automated billing transactions.',
                      },
                  ],
              },
              {
                  _type: 'menuDropdown',
                  title: 'Features',
                  path: '/functies',
                  links: [
                      {
                          title: 'CPI Indexation',
                          path: '/kennisbank/box3-check',
                          description: 'Automated CBS-based lease adjustments.',
                      },
                      {
                          title: 'Rent Invoicing',
                          path: '/oplossingen/vastgoedbeheer-software',
                          description: 'Recurring billing runs.',
                      },
                      {
                          title: 'Accounting Integration',
                          path: '/integraties',
                          description:
                              'Native Dynamics Business Central ledger sync.',
                      },
                  ],
              },
              {
                  _type: 'menuLink',
                  title: 'Integrations',
                  path: '/integraties',
              },
              { _type: 'menuLink', title: 'Pricing', path: '/prijzen' },
              { _type: 'menuLink', title: 'References', path: '/referenties' },
              {
                  _type: 'menuLink',
                  title: 'Knowledge Base',
                  path: '/kennisbank/box3-check',
              },
          ]
        : [
              {
                  _type: 'menuDropdown',
                  title: 'Vastgoedsoftware',
                  path: '/vastgoedsoftware',
                  links: [
                      {
                          title: 'Vastgoedbeheer',
                          path: '/oplossingen/vastgoedbeheer-software',
                          description:
                              'De core SaaS module voor vastgoedmanagement.',
                      },
                      {
                          title: 'Huurdersportaal',
                          path: '/oplossingen/huurdersportaal',
                          description:
                              'Self-service portaal voor communicatie & meldingen.',
                      },
                      {
                          title: 'Payment Software',
                          path: '/oplossingen/payment',
                          description: 'Geautomatiseerde betalingstransacties.',
                      },
                  ],
              },
              {
                  _type: 'menuDropdown',
                  title: 'Functies',
                  path: '/functies',
                  links: [
                      {
                          title: 'CPI Indexatie',
                          path: '/kennisbank/box3-check',
                          description:
                              'Automatische huurverhogingen op basis van CBS-indexen.',
                      },
                      {
                          title: 'Huurprolongatie',
                          path: '/oplossingen/vastgoedbeheer-software',
                          description:
                              'Geautomatiseerde kwartaal- en maandfacturatie.',
                      },
                      {
                          title: 'Boekhouding',
                          path: '/integraties',
                          description:
                              'Native Dynamics Business Central koppeling.',
                      },
                  ],
              },
              { _type: 'menuLink', title: 'Integraties', path: '/integraties' },
              { _type: 'menuLink', title: 'Tarieven', path: '/prijzen' },
              { _type: 'menuLink', title: 'Referenties', path: '/referenties' },
              {
                  _type: 'menuLink',
                  title: 'Kennisbank',
                  path: '/kennisbank/box3-check',
              },
          ];

    const menuItems = (settings as any)?.navigationMenu || defaultMenu;

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

        // Listen for #demo hash triggers
        const handleHashChange = () => {
            if (window.location.hash === '#demo') {
                setIsDemoModalOpen(true);
                window.history.replaceState(null, '', window.location.pathname);
            }
        };
        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('hashchange', handleHashChange);
        };
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
                    <div className='flex items-center shrink-0'>
                        <Link
                            href={getPath('/')}
                            className='flex items-center'
                            aria-label='emlinked - Vastgoedsoftware voor Business Central'
                            title='emlinked - Vastgoedsoftware voor Business Central'
                        >
                            <img
                                src={logoSrc}
                                alt='emlinked logo'
                                className='w-auto h-11 transition-all'
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation Links (Mathematically centered) */}
                    <nav className='hidden xl:flex items-center justify-center gap-6 grow'>
                        {menuItems.map((item: any, idx: number) => {
                            if (item._type === 'menuDropdown') {
                                return (
                                    <div
                                        key={idx}
                                        className='group relative py-2'
                                    >
                                        {item.path ? (
                                            <Link
                                                href={getPath(item.path)}
                                                className={`flex items-center gap-1.5 text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                                                    item.links?.some((l: any) =>
                                                        isActive(l.path),
                                                    ) || isActive(item.path)
                                                        ? 'text-primary'
                                                        : 'text-muted-foreground hover:text-foreground'
                                                }`}
                                            >
                                                {item.title}
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
                                            </Link>
                                        ) : (
                                            <button
                                                className={`flex items-center gap-1.5 text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                                                    item.links?.some((l: any) =>
                                                        isActive(l.path),
                                                    )
                                                        ? 'text-primary'
                                                        : 'text-muted-foreground hover:text-foreground'
                                                }`}
                                            >
                                                {item.title}
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
                                        )}
                                        <div className='absolute left-1/2 -translate-x-1/2 mt-2 w-[560px] max-w-[92vw] origin-top rounded-xl border border-border bg-card p-2 shadow-2xl ring-1 ring-black/5 transition-all opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto z-50'>
                                            <div className='grid grid-cols-2 gap-1'>
                                                {item.links?.map(
                                                    (
                                                        subLink: any,
                                                        sIdx: number,
                                                    ) => {
                                                        const isDemo =
                                                            subLink.path ===
                                                            '#demo';
                                                        const isLast =
                                                            sIdx ===
                                                            item.links.length -
                                                                1;
                                                        const isOdd =
                                                            item.links
                                                                .length %
                                                                2 !==
                                                            0;
                                                        const Icon =
                                                            getSubIcon(
                                                                subLink.title,
                                                            );
                                                        const active =
                                                            isActive(
                                                                subLink.path,
                                                            );
                                                        const subContent = (
                                                            <>
                                                                <span
                                                                    className={`flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors ${active ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}
                                                                >
                                                                    <Icon className='size-4.5' />
                                                                </span>
                                                                <span className='min-w-0'>
                                                                    <span
                                                                        className={`block text-[13px] font-bold leading-tight ${active ? 'text-primary' : 'text-foreground'}`}
                                                                    >
                                                                        {
                                                                            subLink.title
                                                                        }
                                                                    </span>
                                                                    {subLink.description && (
                                                                        <span className='mt-0.5 block text-[12px] leading-snug text-muted-foreground line-clamp-2'>
                                                                            {
                                                                                subLink.description
                                                                            }
                                                                        </span>
                                                                    )}
                                                                </span>
                                                            </>
                                                        );

                                                        const cellClass = `flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-muted/50 ${isLast && isOdd ? 'col-span-2' : ''}`;

                                                        if (isDemo) {
                                                            return (
                                                                <button
                                                                    key={sIdx}
                                                                    onClick={() =>
                                                                        setIsDemoModalOpen(
                                                                            true,
                                                                        )
                                                                    }
                                                                    className={`text-left cursor-pointer ${cellClass}`}
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
                                                                className={cellClass}
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
                            if (isDemo) {
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => setIsDemoModalOpen(true)}
                                        className='text-sm font-semibold transition-colors text-muted-foreground hover:text-foreground cursor-pointer'
                                    >
                                        {item.title}
                                    </button>
                                );
                            }

                            return (
                                <Link
                                    key={idx}
                                    href={getPath(item.path)}
                                    className={`text-sm font-semibold transition-colors ${
                                        isActive(item.path)
                                            ? 'text-primary'
                                            : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    {item.title}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right side: Global Actions (Aligned to right column) */}
                    <div className='flex items-center gap-3 sm:gap-4 shrink-0 justify-end'>
                        {/* Docs Book Icon - Commented out to reduce header noise
                        <Link
                            href='/docs'
                            className={`p-1 rounded-md hover:bg-muted transition-all ${
                                pathname?.startsWith('/docs')
                                    ? 'text-amber bg-muted/40'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                            title={t.docs}
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
                                    d='M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-16.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-16.25v14.25'
                                />
                            </svg>
                        </Link>
                        */}

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
                                <div className='absolute right-0 mt-2 w-48 origin-top-right rounded-lg border border-border bg-card p-0.5 shadow-xl transition-all z-50'>
                                    {/* NL Language */}
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

                                    {/* EN Language */}
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

                        {/* Sun/Moon Theme Toggle Switch */}
                        <button
                            onClick={toggleTheme}
                            className='p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer'
                            aria-label='Switch Theme'
                        >
                            {mounted &&
                            (theme === 'dark' ||
                                (theme === 'system' &&
                                    window.matchMedia(
                                        '(prefers-color-scheme: dark)',
                                    ).matches)) ? (
                                <svg
                                    className='size-6 stroke-[1.5]'
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
                                    className='size-6 stroke-[1.5]'
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

                        {/* Demo inplannen Button */}
                        <button
                            onClick={() => setIsDemoModalOpen(true)}
                            className='inline-flex items-center gap-1.5 px-4 py-2  font-semibold rounded-md border transition-all duration-300 bg-primary border-primary text-primary-foreground hover:bg-primary/90 cursor-pointer shadow-sm text-sm'
                        >
                            {isEn ? 'Book Demo' : 'Demo inplannen'}
                        </button>

                        {/* Sign In Button / Portal Access - Restored original Mijn Emlinked Design with Badtz Star Effect */}
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
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className='xl:hidden border-t border-border bg-card overflow-hidden shadow-inner'
                    >
                        <nav className='flex flex-col gap-1 p-4'>
                            {menuItems.map((item: any, idx: number) => {
                                const key = `mobile-nav-${idx}`;
                                if (item._type === 'menuDropdown') {
                                    const isOpen = mobileSubmenu === item.title;
                                    return (
                                        <div
                                            key={key}
                                            className='border-b border-border/60 py-2'
                                        >
                                            <button
                                                onClick={() =>
                                                    toggleMobileSubmenu(
                                                        item.title,
                                                    )
                                                }
                                                className='flex w-full items-center justify-between text-sm font-semibold text-foreground py-1'
                                            >
                                                <span>{item.title}</span>
                                                <svg
                                                    className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-amber' : 'text-white/70 dark:text-slate-500'}`}
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
                                            {isOpen && (
                                                <div className='pl-4 pr-2 py-2 flex flex-col gap-3.5 bg-muted/20 rounded-md mt-1'>
                                                    {item.path && (
                                                        <Link
                                                            href={getPath(item.path)}
                                                            onClick={() => setMobileMenuOpen(false)}
                                                            className='text-xs font-semibold text-primary hover:text-primary/80 transition-colors pb-1.5 border-b border-border/20'
                                                        >
                                                            {isEn ? '→ Overview' : '→ Overzicht'}
                                                        </Link>
                                                    )}
                                                    {item.links?.map(
                                                        (
                                                            subLink: any,
                                                            sIdx: number,
                                                        ) => {
                                                            const isDemo =
                                                                subLink.path ===
                                                                '#demo';
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
                                                                        className='text-xs font-medium text-left text-white/70 dark:text-slate-500 hover:text-primary transition-colors cursor-pointer'
                                                                    >
                                                                        {
                                                                            subLink.title
                                                                        }
                                                                    </button>
                                                                );
                                                            }
                                                            return (
                                                                <Link
                                                                    key={sIdx}
                                                                    href={getPath(
                                                                        subLink.path,
                                                                    )}
                                                                    onClick={() =>
                                                                        setMobileMenuOpen(
                                                                            false,
                                                                        )
                                                                    }
                                                                    className={`text-xs font-medium ${isActive(subLink.path) ? 'text-amber' : 'text-white/70 dark:text-slate-500'}`}
                                                                >
                                                                    {
                                                                        subLink.title
                                                                    }
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
                                            className='border-b border-border/60 py-2.5'
                                        >
                                            <button
                                                onClick={() => {
                                                    setIsDemoModalOpen(true);
                                                    setMobileMenuOpen(false);
                                                }}
                                                className='text-sm font-semibold block text-left w-full text-foreground hover:text-primary transition-colors cursor-pointer'
                                            >
                                                {item.title}
                                            </button>
                                        </div>
                                    );
                                }

                                return (
                                    <div
                                        key={key}
                                        className='border-b border-border/60 py-2.5'
                                    >
                                        <Link
                                            href={getPath(item.path)}
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                            className={`text-sm font-semibold block ${isActive(item.path) ? 'text-primary' : 'text-foreground'}`}
                                        >
                                            {item.title}
                                        </Link>
                                    </div>
                                );
                            })}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hover Trigger Tab + Sliding Announcement Box */}
            {settings?.announcementActive && settings?.announcementText && (
                <div
                    className='fixed right-0 top-[150px] z-9999 pointer-events-auto'
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

                                {settings.announcementLink &&
                                    (settings.announcementLink === '#demo' ? (
                                        <button
                                            onClick={() =>
                                                setIsDemoModalOpen(true)
                                            }
                                            className='inline-flex items-center gap-1 text-xs text-amber-light hover:text-amber font-semibold transition-all hover:translate-x-0.5 cursor-pointer text-left w-max'
                                        >
                                            <span>
                                                {locale === 'en'
                                                    ? 'Book a Demo'
                                                    : 'Demo inplannen'}
                                            </span>
                                            <span>&rarr;</span>
                                        </button>
                                    ) : (
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
                                    ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            <DemoModal
                isOpen={isDemoModalOpen}
                onClose={() => setIsDemoModalOpen(false)}
                calendlyUrl={(settings as any)?.calendlyUrl}
            />
        </header>
    );
}
