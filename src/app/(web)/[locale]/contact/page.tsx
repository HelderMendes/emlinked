import React from 'react';
import { DataGridCanvas } from '@/components/ui/data-grid-canvas';

interface ContactPageProps {
    params: Promise<{ locale: string }>;
}

const content = {
    nl: {
        title: 'Vraag een Demo aan',
        tagline: 'Ontdek hoe Emlinked uw vastgoedbeheer kan automatiseren.',
        formTitle: 'Demo Aanvragen',
        nameLabel: 'Naam',
        emailLabel: 'E-mailadres',
        portfolioLabel: 'Portefeuille omvang',
        messageLabel: 'Bericht / Vraag',
        submitButton: 'Verstuur aanvraag',
        successMsg:
            'Dank voor uw aanvraag. Wij nemen binnen 24 uur contact met u op.',
    },
    en: {
        title: 'Request a Demo',
        tagline:
            'Discover how Emlinked can automate your real estate operations.',
        formTitle: 'Demo Request',
        nameLabel: 'Full Name',
        emailLabel: 'Email Address',
        portfolioLabel: 'Portfolio Size',
        messageLabel: 'Message / Query',
        submitButton: 'Submit request',
        successMsg:
            'Thank you for your request. We will contact you within 24 hours.',
    },
} as const;

export default async function ContactPage({ params }: ContactPageProps) {
    const { locale } = await params;
    const t = content[locale as 'nl' | 'en'] || content.nl;

    return (
        <div className='flex flex-col min-h-screen'>
            {/* Hero Header */}
            <section className="relative px-6 py-20 md:py-28 overflow-hidden bg-[url('/hero/bkg_darkBlue.jpg')] bg-cover bg-center bg-no-repeat text-white border-b border-white/10">
                <DataGridCanvas className='pointer-events-none absolute inset-0 h-full w-full opacity-70 z-10' />

                {/* Ambient Background Glow */}
                <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber/5 rounded-full blur-[120px] pointer-events-none animate-float-glow z-0' />

                {/* Wave Animation with Orange Glow - Disabled
                <div className='absolute bottom-[-5%] left-0 w-full h-[20%] overflow-hidden pointer-events-none z-0 '>
                    <svg
                        className='absolute w-[200%] h-full'
                        viewBox='0 0 2000 120'
                        preserveAspectRatio='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <defs>
                            <linearGradient
                                id='wave-glow-contact'
                                x1='0%'
                                y1='0%'
                                x2='0%'
                                y2='100%'
                            >
                                <stop
                                    offset='0%'
                                    stopColor='#ff9400'
                                    stopOpacity='0.45'
                                />
                                <stop
                                    offset='15%'
                                    stopColor='#ff9400'
                                    stopOpacity='0.15'
                                />
                                <stop
                                    offset='60%'
                                    stopColor='#ff9400'
                                    stopOpacity='0'
                                />
                            </linearGradient>
                            <filter
                                id='glow-blur-contact'
                                x='-10%'
                                y='-10%'
                                width='120%'
                                height='120%'
                            >
                                <feGaussianBlur
                                    stdDeviation='5'
                                    result='blur'
                                />
                                <feMerge>
                                    <feMergeNode in='blur' />
                                    <feMergeNode in='SourceGraphic' />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Wave 1 }
                        <path
                            d='M0,60 C250,100 250,20 500,60 C750,100 750,20 1000,60 C1250,100 1250,20 1500,60 C1750,100 1750,20 2000,60 L2000,120 L0,120 Z'
                            fill='url(#wave-glow-contact)'
                            filter='url(#glow-blur-contact)'
                            className='animate-wave-slow'
                        />

                        {/* Wave 2 }
                        <path
                            d='M0,60 C150,10 350,110 500,60 C650,10 850,110 1000,60 C1150,10 1350,110 1500,60 C1650,10 1850,110 2000,60 L2000,120 L0,120 Z'
                            fill='url(#wave-glow-contact)'
                            filter='url(#glow-blur-contact)'
                            className='animate-wave-mid opacity-40'
                        />

                        {/* Wave 3 }
                        <path
                            d='M0,60 C200,90 300,30 500,60 C700,90 800,30 1000,60 C1200,90 1300,30 1500,60 C1700,90 1800,30 2000,60 L2000,120 L0,120 Z'
                            fill='url(#wave-glow-contact)'
                            filter='url(#glow-blur-contact)'
                            className='animate-wave-fast opacity-60'
                        />
                    </svg>
                </div>
                */}

                <div className="mx-auto max-w-4xl text-center flex flex-col gap-6 relative z-10">
                    <span className="inline-flex items-center gap-1.5 self-center rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold tracking-wider text-primary uppercase">
                        Get in Touch
                    </span>
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                        {t.title}
                    </h1>
                    <p className="text-lg text-slate-300 leading-relaxed">
                        {t.tagline}
                    </p>
                </div>
            </section>

            {/* Form Container */}
            <section className='px-6 py-20 bg-card border-b border-border'>
                <div className='mx-auto max-w-xl px-4 sm:px-6 lg:px-8'>
                    <div className='p-8 rounded-xl border border-border bg-background shadow-md'>
                        <h2 className='text-xl font-bold text-foreground mb-6'>
                            {t.formTitle}
                        </h2>
                        <form className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-1.5'>
                                <label className='text-sm font-semibold text-muted-foreground'>
                                    {t.nameLabel}
                                </label>
                                <input
                                    type='text'
                                    required
                                    className='h-10 px-3 rounded-md border border-border bg-card text-sm text-foreground focus:outline-none focus:border-primary'
                                />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <label className='text-sm font-semibold text-muted-foreground'>
                                    {t.emailLabel}
                                </label>
                                <input
                                    type='email'
                                    required
                                    className='h-10 px-3 rounded-md border border-border bg-card text-sm text-foreground focus:outline-none focus:border-primary'
                                />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <label className='text-sm font-semibold text-muted-foreground'>
                                    {t.portfolioLabel}
                                </label>
                                <select className='h-10 px-3 rounded-md border border-border bg-card text-sm text-foreground focus:outline-none focus:border-primary'>
                                    <option>&lt; 50 VHE (Units)</option>
                                    <option>50 - 250 VHE (Units)</option>
                                    <option>250 - 1000 VHE (Units)</option>
                                    <option>&gt; 1000 VHE (Units)</option>
                                </select>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <label className='text-sm font-semibold text-muted-foreground'>
                                    {t.messageLabel}
                                </label>
                                <textarea
                                    rows={4}
                                    className='p-3 rounded-md border border-border bg-card text-sm text-foreground focus:outline-none focus:border-primary'
                                />
                            </div>
                            <button
                                type='submit'
                                className='h-11 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/95 transition-all text-sm mt-4'
                            >
                                {t.submitButton}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
