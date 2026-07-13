'use client';

import React from 'react';
import Link from 'next/link';

interface FooterProps {
    locale?: string;
    settings?: {
        phone?: string;
        email?: string;
        address?: string;
        linkedinUrl?: string;
        twitterUrl?: string;
    };
}

const translations = {
    nl: {
        tagline: 'Emlinked brengt commercieel, technisch en administratief vastgoedbeheer samen in één overzichtelijk platform. Zo werk je efficiënter, met minder fouten en meer grip op je portefeuille.',
        phone: '+31 (0) 88 707 7000',
        address: 'Gooimeer 12, 1411 DE Naarden',
        demoLabel: 'Vraag vrijblijvend een demo aan',
        contactLabel: 'Direct contact',
        placeholderName: 'Naam',
        placeholderPhone: 'Telefoon',
        placeholderEmail: 'Email',
        sendButton: 'Stuur',
        rights: '© 2010 - 2026 Emlinked. Alle rechten voorbehouden.',
        disclaimer: 'Privacybeleid',
        terms: 'Algemene voorwaarden',
        support: 'Help & Ondersteuning',
        docs: 'Documentatie center',
        
        // Navigation headers
        product: 'Product',
        integrations: 'Integraties',
        company: 'Organisatie',
        resources: 'Support & Info',

        // Link labels
        vastgoedbeheer: 'Vastgoedbeheer Software',
        huurdersportaal: 'Huurdersportaal',
        payment: 'Payment Software',
        businessCentral: 'Dynamics 365 ERP Sync',
        documentCapture: 'Document Capture (OCR)',
        directBanking: 'Direct Banking (PSD2)',
        box3: 'Box 3 Calculator ⚡',
        team: 'Het Team',
        referenties: 'Referenties',
        blog: 'Nieuws & Blog',
        contact: 'Contact Opnemen'
    },
    en: {
        tagline: 'Emlinked brings commercial, technical, and financial property management together in one clear platform. Work more efficiently with total control over your portfolio.',
        phone: '+31 (0) 88 707 7000',
        address: 'Gooimeer 12, 1411 DE Naarden',
        demoLabel: 'Request a free demo session',
        contactLabel: 'Get in Touch',
        placeholderName: 'Name',
        placeholderPhone: 'Phone',
        placeholderEmail: 'Email',
        sendButton: 'Send',
        rights: '© 2010 - 2026 Emlinked. All rights reserved.',
        disclaimer: 'Privacy Policy',
        terms: 'Terms & Conditions',
        support: 'Help & Support',
        docs: 'Docs Portal',

        // Navigation headers
        product: 'Product',
        integrations: 'Integrations',
        company: 'Company',
        resources: 'Resources',

        // Link labels
        vastgoedbeheer: 'Property Management',
        huurdersportaal: 'Tenant Portal',
        payment: 'Payment Software',
        businessCentral: 'Dynamics 365 ERP Sync',
        documentCapture: 'Document Capture (OCR)',
        directBanking: 'Direct Banking (PSD2)',
        box3: 'Box 3 Calculator ⚡',
        team: 'Our Team',
        referenties: 'References',
        blog: 'News & Blog',
        contact: 'Contact Sales'
    }
} as const;

export default function Footer({ locale = 'nl', settings }: FooterProps) {
    const t = translations[locale as 'nl' | 'en'] || translations.nl;

    // Helper to prepend locale for links and translate categories/slugs
    const getPath = (path: string) => {
        if (locale === 'nl') {
            return path;
        }

        let translatedPath = path;
        translatedPath = translatedPath.replace(
            '/oplossingen/vastgoedbeheer-software',
            '/solutions/property-management-software',
        );
        translatedPath = translatedPath.replace(
            '/oplossingen/huurdersportaal',
            '/solutions/tenant-portal',
        );
        translatedPath = translatedPath.replace(
            '/oplossingen/payment',
            '/solutions/payment-software',
        );
        translatedPath = translatedPath.replace('/oplossingen', '/solutions');

        return `/en${translatedPath === '/' ? '' : translatedPath}`;
    };

    return (
        <footer className='w-full bg-background text-foreground border-t border-border pt-16 pb-12 transition-all'>
            <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8'>
                {/* 1. Dynamic Callback Callout Banner */}
                <div className='bg-[#ff9400] text-[#060e32] p-6 md:p-8 rounded-xl flex flex-col lg:flex-row items-center justify-between gap-6 mb-16 max-w-7xl mx-auto shadow-2xl relative overflow-hidden'>
                    {/* Background accents for Schematic-vibe */}
                    <div className='absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#060e32_1px,transparent_1px)] [background-size:16px_16px]'></div>

                    <div className='text-center lg:text-left shrink-0 z-10'>
                        <span className='text-[10px] md:text-xs font-bold uppercase tracking-widest block opacity-90 font-mono'>
                            {t.demoLabel}
                        </span>
                        <span className='font-display text-2xl md:text-3xl font-extrabold tracking-tight uppercase leading-none block mt-1'>
                            {t.contactLabel}
                        </span>
                    </div>

                    <form className='flex flex-col sm:flex-row gap-3 w-full lg:w-auto items-stretch z-10'>
                        <input
                            type='text'
                            placeholder={t.placeholderName}
                            required
                            className='bg-transparent border border-[#060e32]/30 placeholder-[#060e32]/60 px-4 py-2.5 text-xs text-[#060e32] focus:outline-none focus:border-[#060e32] focus:ring-1 focus:ring-[#060e32] rounded transition-all w-full sm:w-40'
                        />
                        <input
                            type='text'
                            placeholder={t.placeholderPhone}
                            required
                            className='bg-transparent border border-[#060e32]/30 placeholder-[#060e32]/60 px-4 py-2.5 text-xs text-[#060e32] focus:outline-none focus:border-[#060e32] focus:ring-1 focus:ring-[#060e32] rounded transition-all w-full sm:w-40'
                        />
                        <input
                            type='email'
                            placeholder={t.placeholderEmail}
                            required
                            className='bg-transparent border border-[#060e32]/30 placeholder-[#060e32]/60 px-4 py-2.5 text-xs text-[#060e32] focus:outline-none focus:border-[#060e32] focus:ring-1 focus:ring-[#060e32] rounded transition-all w-full sm:w-40'
                        />
                        <button
                            type='submit'
                            className='bg-[#060e32] text-white hover:bg-[#060e32]/95 hover:scale-[1.02] active:scale-[0.98] font-bold text-[10px] uppercase tracking-wider px-6 py-2.5 rounded shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0'
                        >
                            <span>{t.sendButton}</span>
                            <svg
                                className='h-3.5 w-3.5 shrink-0'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                strokeWidth='2.5'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
                                />
                            </svg>
                        </button>
                    </form>
                </div>

                {/* 2. Main Footer Navigation Grid */}
                <div className='grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 max-w-7xl mx-auto pb-12 border-b border-border'>
                    {/* Brand Info (Col span 4) */}
                    <div className='md:col-span-4 flex flex-col gap-5'>
                        <Link href={getPath('/')} className='inline-flex'>
                            <img
                                src='/emlinked/Emlinked_logo__liggend.svg'
                                alt='emlinked - Vastgoedbeheer software homepage'
                                className='w-auto h-12 transition-opacity hover:opacity-90 dark:hidden'
                            />
                            <img
                                src='/emlinked/Emlinked_logo__liggend_white.png'
                                alt='emlinked - Vastgoedbeheer software homepage'
                                className='w-auto h-12 transition-opacity hover:opacity-90 hidden dark:block'
                            />
                        </Link>
                        <p className='text-xs text-muted-foreground leading-relaxed'>
                            {t.tagline}
                        </p>
                        {/* Address & Phone details */}
                        <div className='flex flex-col gap-2 mt-2 text-xs text-muted-foreground'>
                            <a
                                href={
                                    settings?.phone
                                        ? `tel:${settings.phone.replace(/[^\d+]/g, '')}`
                                        : 'tel:+310887077000'
                                }
                                className='flex items-center gap-2 hover:text-[#ff9400] transition-colors'
                            >
                                <svg
                                    className='h-3.5 w-3.5 text-[#ff9400] shrink-0'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M2.25 6.622c0-1.27.75-2.385 1.815-2.852a11.247 11.247 0 0113.821 2.852c1.066.467 1.815 1.581 1.815 2.852a46.211 46.211 0 01-19.451 0z'
                                    />
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M2.25 6.622a46.211 46.211 0 0019.45 0v11.127a46.21 46.21 0 01-19.45 0V6.622z'
                                    />
                                </svg>
                                <span>{settings?.phone || t.phone}</span>
                            </a>
                            <span className='flex items-center gap-2'>
                                <svg
                                    className='h-3.5 w-3.5 text-[#ff9400] shrink-0'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
                                    />
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                                    />
                                </svg>
                                <span>{settings?.address || t.address}</span>
                            </span>
                        </div>
                    </div>

                    {/* Links Column 1: Product (Col span 2) */}
                    <div className='md:col-span-2 flex flex-col gap-4'>
                        <h4 className='text-xs font-bold uppercase tracking-wider text-foreground font-mono'>
                            {t.product}
                        </h4>
                        <ul className='flex flex-col gap-2.5 text-xs text-muted-foreground'>
                            <li>
                                <Link
                                    href={getPath(
                                        '/oplossingen/vastgoedbeheer-software',
                                    )}
                                    className='hover:text-[#ff9400] transition-colors'
                                >
                                    {t.vastgoedbeheer}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={getPath(
                                        '/oplossingen/huurdersportaal',
                                    )}
                                    className='hover:text-[#ff9400] transition-colors'
                                >
                                    {t.huurdersportaal}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={getPath('/oplossingen/payment')}
                                    className='hover:text-[#ff9400] transition-colors'
                                >
                                    {t.payment}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Links Column 2: Integrations (Col span 2) */}
                    <div className='md:col-span-2 flex flex-col gap-4'>
                        <h4 className='text-xs font-bold uppercase tracking-wider text-foreground font-mono'>
                            {t.integrations}
                        </h4>
                        <ul className='flex flex-col gap-2.5 text-xs text-muted-foreground'>
                            <li>
                                <Link
                                    href={getPath(
                                        '/integraties/business-central',
                                    )}
                                    className='hover:text-[#ff9400] transition-colors'
                                >
                                    {t.businessCentral}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={getPath(
                                        '/integraties/document-capture',
                                    )}
                                    className='hover:text-[#ff9400] transition-colors'
                                >
                                    {t.documentCapture}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={getPath(
                                        '/integraties/direct-banking',
                                    )}
                                    className='hover:text-[#ff9400] transition-colors'
                                >
                                    {t.directBanking}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={getPath('/kennisbank/box3-check')}
                                    className='text-[#ff9400] font-semibold hover:underline'
                                >
                                    {t.box3}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Links Column 3: Company (Col span 2) */}
                    <div className='md:col-span-2 flex flex-col gap-4'>
                        <h4 className='text-xs font-bold uppercase tracking-wider text-foreground font-mono'>
                            {t.company}
                        </h4>
                        <ul className='flex flex-col gap-2.5 text-xs text-muted-foreground'>
                            <li>
                                <Link
                                    href={getPath('/team')}
                                    className='hover:text-[#ff9400] transition-colors'
                                >
                                    {t.team}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={getPath('/referenties')}
                                    className='hover:text-[#ff9400] transition-colors'
                                >
                                    {t.referenties}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={getPath('/blog')}
                                    className='hover:text-[#ff9400] transition-colors'
                                >
                                    {t.blog}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={getPath('/contact')}
                                    className='hover:text-[#ff9400] transition-colors font-semibold'
                                >
                                    {t.contact}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Links Column 4: Resources (Col span 2) */}
                    <div className='md:col-span-2 flex flex-col gap-4'>
                        <h4 className='text-xs font-bold uppercase tracking-wider text-foreground font-mono'>
                            {t.resources}
                        </h4>
                        <ul className='flex flex-col gap-2.5 text-xs text-muted-foreground'>
                            <li>
                                <Link
                                    href='/docs'
                                    className='hover:text-[#ff9400] transition-colors'
                                >
                                    {t.docs}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={getPath('/help')}
                                    className='hover:text-[#ff9400] transition-colors'
                                >
                                    {t.support}
                                </Link>
                            </li>
                        </ul>
                        {/* Social icons */}
                        <div className='flex gap-3 mt-1.5'>
                            <a
                                href={
                                    settings?.linkedinUrl ||
                                    'https://linkedin.com'
                                }
                                target='_blank'
                                rel='noopener noreferrer'
                                className='h-7 w-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[#ff9400] transition-colors'
                                aria-label='LinkedIn'
                            >
                                <svg
                                    className='h-3.5 w-3.5'
                                    fill='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
                                </svg>
                            </a>
                            <a
                                href={settings?.twitterUrl || 'https://x.com'}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='h-7 w-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[#ff9400] transition-colors'
                                aria-label='X (Twitter)'
                            >
                                <svg
                                    className='h-3 w-3'
                                    fill='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* 3. Bottom Legal Copyright Bar */}
                <div className='mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left max-w-7xl mx-auto'>
                    <p className='text-[10px] text-muted-foreground'>
                        {t.rights}
                    </p>
                    <div className='flex flex-wrap justify-center gap-4 md:gap-6 text-[10px] text-muted-foreground'>
                        <Link
                            href={getPath('/privacybeleid')}
                            className='hover:text-[#ff9400] transition-colors'
                        >
                            {t.disclaimer}
                        </Link>
                        <span className='text-white/10 dark:text-slate-200'>
                            |
                        </span>
                        <Link
                            href={getPath('/algemene-voorwaarden')}
                            className='hover:text-[#ff9400] transition-colors'
                        >
                            {t.terms}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
