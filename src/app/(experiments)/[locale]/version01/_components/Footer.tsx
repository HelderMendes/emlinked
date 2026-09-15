import Link from 'next/link';
import Image from 'next/image';
import { Mail, Globe } from 'lucide-react';
import type { Locale } from '../_lib/data';
import { withLocale } from '../_lib/content';

export function Footer({ locale }: { locale: Locale }) {
    const isEn = locale === 'en';
    const href = (path: string) => withLocale(path, locale);

    const columns = [
        {
            heading: isEn ? 'Apps' : 'Apps',
            links: [
                { label: isEn ? 'Property management' : 'Vastgoedbeheer software', path: '/apps/vastgoedbeheer-software' },
                { label: isEn ? 'Tenant portal' : 'Huurdersportaal', path: '/apps/huurdersportaal' },
                { label: 'Payment software', path: '/apps/payment-software' },
                { label: 'Box3-check', path: '/box3-check' },
            ],
        },
        {
            heading: isEn ? 'Company' : 'Bedrijf',
            links: [
                { label: isEn ? 'About us' : 'Over ons', path: '/over-ons' },
                { label: isEn ? 'References' : 'Referenties', path: '/referenties' },
                { label: isEn ? 'News' : 'Nieuws', path: '/nieuws' },
                { label: isEn ? 'Pricing' : 'Prijzen', path: '/prijzen' },
            ],
        },
        {
            heading: isEn ? 'Resources' : 'Resources',
            links: [
                { label: isEn ? 'Knowledge base' : 'Kennisbank', path: '/kennisbank' },
                { label: isEn ? 'Partner software' : 'Partners software', path: '/partners-software' },
                { label: isEn ? 'Contact' : 'Contact', path: '/contact' },
            ],
        },
        {
            heading: 'Legal',
            links: [
                { label: isEn ? 'Privacy policy' : 'Privacybeleid', path: '/privacybeleid' },
                { label: isEn ? 'Terms of service' : 'Algemene voorwaarden', path: '/algemene-voorwaarden' },
            ],
        },
    ];

    return (
        <footer className='bg-navy-dark text-white/50 text-xs rounded-t-[40px] overflow-hidden'>
            <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-12 pb-8'>
                <div className='flex flex-col sm:flex-row items-center justify-between gap-4 pb-10 border-b border-white/10'>
                    <Link
                        href={href('/contact')}
                        className='inline-flex items-center bg-white hover:bg-amber-pale text-navy-dark font-semibold text-sm px-6 py-3 rounded-full transition-colors'
                    >
                        {isEn ? 'Request a demo' : 'Vraag een demo aan'}
                    </Link>
                    <div className='flex items-center gap-2 text-white/70'>
                        <Link
                            href='/version01'
                            aria-current={locale === 'nl' ? 'page' : undefined}
                            className={locale === 'nl' ? 'text-white font-semibold' : 'hover:text-white'}
                        >
                            NL
                        </Link>
                        <span className='text-white/20'>/</span>
                        <Link
                            href='/en/version01'
                            aria-current={locale === 'en' ? 'page' : undefined}
                            className={locale === 'en' ? 'text-white font-semibold' : 'hover:text-white'}
                        >
                            EN
                        </Link>
                    </div>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-5 gap-8 py-10'>
                    <div className='col-span-2 md:col-span-1'>
                        <Image
                            src='/emlinked/Emlinked_logo__liggend_white.png'
                            alt='emlinked'
                            width={120}
                            height={26}
                            className='h-6 w-auto opacity-80 mb-3'
                        />
                        <p className='leading-relaxed max-w-[20ch]'>
                            {isEn
                                ? 'Real estate portfolio management, natively inside Dynamics 365.'
                                : 'Vastgoedportefeuillebeheer, native binnen Dynamics 365.'}
                        </p>
                    </div>
                    {columns.map((col) => (
                        <div key={col.heading} className='space-y-3'>
                            <h3 className='text-white font-semibold text-[11px] uppercase tracking-wider'>
                                {col.heading}
                            </h3>
                            <ul className='space-y-2'>
                                {col.links.map((link) => (
                                    <li key={link.path}>
                                        <Link href={href(link.path)} className='hover:text-white transition-colors'>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className='flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10'>
                    <p>© {new Date().getFullYear()} emlinked. {isEn ? 'All rights reserved.' : 'Alle rechten voorbehouden.'}</p>
                    <div className='flex items-center gap-4'>
                        <Link href={href('/over-ons')} aria-label='Website' className='hover:text-white transition-colors'>
                            <Globe className='w-4 h-4' />
                        </Link>
                        <Link href={href('/contact')} aria-label='Email' className='hover:text-white transition-colors'>
                            <Mail className='w-4 h-4' />
                        </Link>
                        <span className='text-white/30 ml-2'>version01 — design concept, not indexed</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
