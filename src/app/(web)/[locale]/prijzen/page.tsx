import React from 'react';
import Link from 'next/link';

interface PricingPageProps {
    params: Promise<{ locale: string }>;
}

const content = {
    nl: {
        title: 'Flexibele Prijzen',
        tagline:
            'Transparante tarieven afgestemd op de omvang van uw vastgoedportefeuille.',
        desc: 'Of u nu een groeiende particuliere belegger bent of een grote corporatie met duizenden verhuureenheden (VHE), Emlinked groeit met u mee. Neem contact op voor een offerte op maat.',
        tier1Title: 'Professional',
        tier1Sub: 'Voor middelgrote portefeuilles',
        tier1Price: 'Vanaf € 299',
        tier1Unit: 'per maand',
        tier1Features: [
            'Tot 250 verhuureenheden (VHE)',
            'Native Business Central Sync',
            'Automatische indexaties & facturatie',
            'Koppeling met 1 bankrekening (PSD2)',
            'Standaard Helpdesk support',
        ],
        tier2Title: 'Enterprise',
        tier2Sub: 'Voor grootschalig beheer & corporaties',
        tier2Price: 'Op aanvraag',
        tier2Unit: 'maatwerk',
        tier2Features: [
            'Onbeperkt aantal verhuureenheden',
            'Multi-entity administratie support',
            'Meerdere bankrekeningen gekoppeld',
            'Continia & Idyn add-ons integratie',
            'Dedicated accountmanager & SLA',
        ],
        ctaButton: 'Demo inplannen',
        quoteButton: 'Offerte aanvragen',
    },
    en: {
        title: 'Flexible Pricing',
        tagline:
            'Transparent rates tailored to the size of your property portfolio.',
        desc: 'Whether you are a growing private investor or a large enterprise managing thousands of units, Emlinked scales with you. Contact us for a custom proposal.',
        tier1Title: 'Professional',
        tier1Sub: 'For mid-sized portfolios',
        tier1Price: 'From € 299',
        tier1Unit: 'per month',
        tier1Features: [
            'Up to 250 units (VHE)',
            'Native Business Central Sync',
            'Automated rent indexation & billing',
            'Single bank account link (PSD2)',
            'Standard support desk access',
        ],
        tier2Title: 'Enterprise',
        tier2Sub: 'For institutional portfolios & funds',
        tier2Price: 'On request',
        tier2Unit: 'custom terms',
        tier2Features: [
            'Unlimited units',
            'Multi-entity company setups',
            'Multiple bank account syncs',
            'Full Continia & Idyn integrations',
            'Dedicated Account Manager & SLA',
        ],
        ctaButton: 'Schedule Demo',
        quoteButton: 'Request Quote',
    },
} as const;

export default async function PricingPage({ params }: PricingPageProps) {
    const { locale } = await params;
    const t = content[locale as 'nl' | 'en'] || content.nl;

    return (
        <div className='flex flex-col min-h-screen'>
            {/* Hero Header */}
            <section className='relative px-6 py-20 bg-radial from-card via-background to-background border-b border-border'>
                <div className='mx-auto max-w-4xl text-center flex flex-col gap-6'>
                    <span className='inline-flex items-center gap-1.5 self-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary'>
                        Pricing Plans
                    </span>
                    <h1 className='font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight'>
                        {t.title}
                    </h1>
                    <p className='text-xl text-muted-foreground leading-relaxed'>
                        {t.tagline}
                    </p>
                    <p className='text-base text-muted-foreground/80 max-w-2xl mx-auto'>
                        {t.desc}
                    </p>
                </div>
            </section>

            {/* Pricing Cards Grid */}
            <section className='px-6 py-20 bg-card border-b border-border'>
                <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto'>
                        {/* Professional Tier */}
                        <div className='p-8 rounded-xl border border-border bg-background flex flex-col justify-between hover:shadow-lg transition-all'>
                            <div className='flex flex-col gap-4'>
                                <h2 className='text-xl font-bold text-foreground'>
                                    {t.tier1Title}
                                </h2>
                                <p className='text-xs text-muted-foreground'>
                                    {t.tier1Sub}
                                </p>
                                <div className='flex items-baseline gap-1.5 mt-2'>
                                    <span className='text-3xl font-bold text-foreground'>
                                        {t.tier1Price}
                                    </span>
                                    <span className='text-xs text-muted-foreground'>
                                        {t.tier1Unit}
                                    </span>
                                </div>
                                <div className='border-t border-border my-2'></div>
                                <ul className='space-y-3'>
                                    {t.tier1Features.map((feat, idx) => (
                                        <li
                                            key={idx}
                                            className='flex items-center gap-2 text-sm text-muted-foreground'
                                        >
                                            <svg
                                                className='h-4 w-4 text-primary shrink-0'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                strokeWidth='2.5'
                                                stroke='currentColor'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    d='M4.5 12.75l6 6 9-13.5'
                                                />
                                            </svg>
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Link
                                href={`/${locale}/contact`}
                                className='inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow hover:bg-primary/95 transition-all text-center mt-8 w-full'
                            >
                                {t.ctaButton}
                            </Link>
                        </div>

                        {/* Enterprise Tier */}
                        <div className='p-8 rounded-xl border-2 border-primary bg-background flex flex-col justify-between hover:shadow-lg transition-all relative'>
                            <div className='absolute top-0 right-8 -translate-y-1/2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full'>
                                Custom
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h2 className='text-xl font-bold text-foreground'>
                                    {t.tier2Title}
                                </h2>
                                <p className='text-xs text-muted-foreground'>
                                    {t.tier2Sub}
                                </p>
                                <div className='flex items-baseline gap-1.5 mt-2'>
                                    <span className='text-3xl font-bold text-foreground'>
                                        {t.tier2Price}
                                    </span>
                                    <span className='text-xs text-muted-foreground'>
                                        {t.tier2Unit}
                                    </span>
                                </div>
                                <div className='border-t border-border my-2'></div>
                                <ul className='space-y-3'>
                                    {t.tier2Features.map((feat, idx) => (
                                        <li
                                            key={idx}
                                            className='flex items-center gap-2 text-sm text-muted-foreground'
                                        >
                                            <svg
                                                className='h-4 w-4 text-primary shrink-0'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                strokeWidth='2.5'
                                                stroke='currentColor'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    d='M4.5 12.75l6 6 9-13.5'
                                                />
                                            </svg>
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Link
                                href={`/${locale}/contact`}
                                className='inline-flex h-11 items-center justify-center rounded-md bg-foreground hover:bg-foreground/90 text-background px-6 text-sm font-medium shadow transition-all text-center mt-8 w-full'
                            >
                                {t.quoteButton}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
