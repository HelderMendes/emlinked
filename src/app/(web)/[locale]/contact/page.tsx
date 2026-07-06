import React from 'react';

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
            <section className='relative px-6 py-20 bg-radial from-card via-background to-background border-b border-border'>
                <div className='mx-auto max-w-4xl text-center flex flex-col gap-6'>
                    <span className='inline-flex items-center gap-1.5 self-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary'>
                        Get in Touch
                    </span>
                    <h1 className='font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight'>
                        {t.title}
                    </h1>
                    <p className='text-xl text-muted-foreground leading-relaxed'>
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
