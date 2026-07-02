'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className='sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-all duration-300'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='flex h-16 items-center justify-between'>
                    {/* Logo */}
                    <div className='flex-shrink-0'>
                        <Link href='/' className='flex items-center gap-2'>
                            <span className='font-display text-2xl font-bold tracking-tight text-primary'>
                                em
                                <span className='text-foreground'>linked</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className='hidden md:flex items-center gap-6'>
                        {/* Oplossingen Menu */}
                        <div className='group relative py-2'>
                            <button className='flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer'>
                                Oplossingen
                                <svg
                                    className='h-4 w-4 transition-transform group-hover:rotate-180'
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
                            <div className='absolute left-0 mt-2 w-64 origin-top-left rounded-lg border border-border bg-card p-2 shadow-lg transition-all opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'>
                                <Link
                                    href='/oplossingen/vastgoedbeheerders'
                                    className='block rounded-md p-2 hover:bg-muted/50 transition-colors'
                                >
                                    <div className='text-sm font-semibold text-foreground'>
                                        Vastgoedbeheerders
                                    </div>
                                    <div className='text-xs text-muted-foreground'>
                                        Optimaliseer operatie &
                                        huurderscommunicatie.
                                    </div>
                                </Link>
                                <Link
                                    href='/oplossingen/vastgoedeigenaren'
                                    className='block rounded-md p-2 hover:bg-muted/50 transition-colors'
                                >
                                    <div className='text-sm font-semibold text-foreground'>
                                        Vastgoedeigenaren & Beleggers
                                    </div>
                                    <div className='text-xs text-muted-foreground'>
                                        Stuur op rendement en realtime portfolio
                                        analytics.
                                    </div>
                                </Link>
                                <Link
                                    href='/oplossingen/commercieel-vastgoed'
                                    className='block rounded-md p-2 hover:bg-muted/50 transition-colors'
                                >
                                    <div className='text-sm font-semibold text-foreground'>
                                        Commercieel Vastgoed
                                    </div>
                                    <div className='text-xs text-muted-foreground'>
                                        Beheer kantoren, winkels en mixed-use
                                        complexen.
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Functionaliteiten Menu */}
                        <div className='group relative py-2'>
                            <button className='flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer'>
                                Functionaliteiten
                                <svg
                                    className='h-4 w-4 transition-transform group-hover:rotate-180'
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
                            <div className='absolute left-0 mt-2 w-64 origin-top-left rounded-lg border border-border bg-card p-2 shadow-lg transition-all opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'>
                                <Link
                                    href='/functionaliteiten/contractbeheer'
                                    className='block rounded-md p-2 hover:bg-muted/50 transition-colors'
                                >
                                    <div className='text-sm font-semibold text-foreground'>
                                        Contractbeheer
                                    </div>
                                    <div className='text-xs text-muted-foreground'>
                                        Geautomatiseerde verlengingen,
                                        indexaties en servicekosten.
                                    </div>
                                </Link>
                                <Link
                                    href='/functionaliteiten/financieel-beheer'
                                    className='block rounded-md p-2 hover:bg-muted/50 transition-colors'
                                >
                                    <div className='text-sm font-semibold text-foreground'>
                                        Financieel Beheer
                                    </div>
                                    <div className='text-xs text-muted-foreground'>
                                        Volledige debiteuren/crediteuren
                                        administratie.
                                    </div>
                                </Link>
                                <Link
                                    href='/functionaliteiten/huurdersportaal'
                                    className='block rounded-md p-2 hover:bg-muted/50 transition-colors'
                                >
                                    <div className='text-sm font-semibold text-foreground'>
                                        Huurdersportaal & App
                                    </div>
                                    <div className='text-xs text-muted-foreground'>
                                        Self-service ticketregistratie en
                                        communicatie.
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Integraties Dropdown (Focus: Business Central) */}
                        <div className='group relative py-2'>
                            <button className='flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer'>
                                Integraties
                                <svg
                                    className='h-4 w-4 transition-transform group-hover:rotate-180'
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
                            <div className='absolute left-0 mt-2 w-64 origin-top-left rounded-lg border border-border bg-card p-2 shadow-lg transition-all opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'>
                                <Link
                                    href='/integraties/microsoft-dynamics-365'
                                    className='block rounded-md p-2 hover:bg-muted/50 transition-colors border-l-2 border-primary'
                                >
                                    <div className='text-sm font-semibold text-foreground flex items-center gap-1.5'>
                                        Business Central Koppeling
                                        <span className='inline-flex items-center rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary'>
                                            Native
                                        </span>
                                    </div>
                                    <div className='text-xs text-muted-foreground'>
                                        De enige true-native vastgoed integratie
                                        met Dynamics 365.
                                    </div>
                                </Link>
                                <Link
                                    href='/integraties'
                                    className='block rounded-md p-2 hover:bg-muted/50 transition-colors'
                                >
                                    <div className='text-sm font-semibold text-foreground'>
                                        Overige Integraties
                                    </div>
                                    <div className='text-xs text-muted-foreground'>
                                        Koppelingen met banken, slimmeters en
                                        boekhoudtools.
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <Link
                            href='/tarieven'
                            className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
                        >
                            Tarieven
                        </Link>

                        <Link
                            href='/kennisbank'
                            className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
                        >
                            Kennisbank
                        </Link>
                    </nav>

                    {/* CTA & Actions */}
                    <div className='hidden md:flex items-center gap-4'>
                        <Link
                            href='/contact'
                            className='inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/95 transition-all'
                        >
                            Demo Aanvragen
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className='flex md:hidden'>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className='inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none'
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
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className='md:hidden border-b border-border bg-card p-4'>
                    <nav className='flex flex-col gap-4'>
                        <div className='font-semibold text-xs uppercase tracking-wider text-muted-foreground'>
                            Oplossingen
                        </div>
                        <Link
                            href='/oplossingen/vastgoedbeheerders'
                            className='pl-2 text-sm text-foreground hover:text-primary transition-colors'
                        >
                            Vastgoedbeheerders
                        </Link>
                        <Link
                            href='/oplossingen/vastgoedeigenaren'
                            className='pl-2 text-sm text-foreground hover:text-primary transition-colors'
                        >
                            Vastgoedeigenaren & Beleggers
                        </Link>
                        <Link
                            href='/oplossingen/commercieel-vastgoed'
                            className='pl-2 text-sm text-foreground hover:text-primary transition-colors'
                        >
                            Commercieel Vastgoed
                        </Link>

                        <div className='font-semibold text-xs uppercase tracking-wider text-muted-foreground mt-2'>
                            Functionaliteiten
                        </div>
                        <Link
                            href='/functionaliteiten/contractbeheer'
                            className='pl-2 text-sm text-foreground hover:text-primary transition-colors'
                        >
                            Contractbeheer
                        </Link>
                        <Link
                            href='/functionaliteiten/financieel-beheer'
                            className='pl-2 text-sm text-foreground hover:text-primary transition-colors'
                        >
                            Financieel Beheer
                        </Link>
                        <Link
                            href='/functionaliteiten/huurdersportaal'
                            className='pl-2 text-sm text-foreground hover:text-primary transition-colors'
                        >
                            Huurdersportaal & App
                        </Link>

                        <div className='font-semibold text-xs uppercase tracking-wider text-muted-foreground mt-2'>
                            Integraties
                        </div>
                        <Link
                            href='/integraties/microsoft-dynamics-365'
                            className='pl-2 text-sm font-semibold text-primary'
                        >
                            Business Central Koppeling
                        </Link>
                        <Link
                            href='/integraties'
                            className='pl-2 text-sm text-foreground hover:text-primary transition-colors'
                        >
                            Overige Integraties
                        </Link>

                        <div className='border-t border-border my-2'></div>

                        <Link
                            href='/tarieven'
                            className='text-sm font-medium text-foreground hover:text-primary transition-colors'
                        >
                            Tarieven
                        </Link>
                        <Link
                            href='/kennisbank'
                            className='text-sm font-medium text-foreground hover:text-primary transition-colors'
                        >
                            Kennisbank
                        </Link>
                        <Link
                            href='/contact'
                            className='inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/95 transition-all text-center'
                        >
                            Demo Aanvragen
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
