import React from 'react';

interface TeamPageProps {
    params: Promise<{ locale: string }>;
}

const content = {
    nl: {
        title: 'Het Team',
        tagline: 'Ontmoet de mensen achter Emlinked.',
        desc: 'Ons team bestaat uit gepassioneerde software developers, vastgoedexperts en integratie-engineers die elke dag werken aan het perfecte property management platform.',
        teamTitle: 'Onze specialisten',
    },
    en: {
        title: 'Our Team',
        tagline: 'Meet the people behind Emlinked.',
        desc: 'Our team consists of passionate software developers, real estate experts, and integration engineers working daily to build the ultimate property management platform.',
        teamTitle: 'Our Specialists',
    },
} as const;

export default async function TeamPage({ params }: TeamPageProps) {
    const { locale } = await params;
    const t = content[locale as 'nl' | 'en'] || content.nl;

    return (
        <div className='flex flex-col min-h-screen'>
            {/* Hero Header */}
            <section className='relative px-6 py-20 bg-radial from-card via-background to-background border-b border-border'>
                <div className='mx-auto max-w-4xl text-center flex flex-col gap-6'>
                    <span className='inline-flex items-center gap-1.5 self-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary'>
                        About Emlinked
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

            {/* Team grid placeholder */}
            <section className='px-6 py-20 bg-card border-b border-border'>
                <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-12'>
                    <h2 className='text-2xl font-bold text-foreground'>
                        {t.teamTitle}
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        <div className='p-6 rounded-lg border border-border bg-background flex flex-col items-center gap-4'>
                            <div className='h-24 w-24 rounded-full bg-muted flex items-center justify-center text-muted-foreground'>
                                Photo
                            </div>
                            <h3 className='font-bold text-foreground'>
                                Coen Mendes
                            </h3>
                            <p className='text-xs text-primary font-semibold uppercase tracking-wider'>
                                Founder & Lead Architect
                            </p>
                        </div>
                        <div className='p-6 rounded-lg border border-border bg-background flex flex-col items-center gap-4'>
                            <div className='h-24 w-24 rounded-full bg-muted flex items-center justify-center text-muted-foreground'>
                                Photo
                            </div>
                            <h3 className='font-bold text-foreground'>
                                Dynamics Expert
                            </h3>
                            <p className='text-xs text-primary font-semibold uppercase tracking-wider'>
                                Business Central Engineer
                            </p>
                        </div>
                        <div className='p-6 rounded-lg border border-border bg-background flex flex-col items-center gap-4'>
                            <div className='h-24 w-24 rounded-full bg-muted flex items-center justify-center text-muted-foreground'>
                                Photo
                            </div>
                            <h3 className='font-bold text-foreground'>
                                Support Lead
                            </h3>
                            <p className='text-xs text-primary font-semibold uppercase tracking-wider'>
                                Customer Operations
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
