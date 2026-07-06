import React from 'react';

interface ReferentiesPageProps {
    params: Promise<{ locale: string }>;
}

const content = {
    nl: {
        title: 'Referenties & Klantcases',
        tagline: 'Wat onze klanten zeggen over Emlinked.',
        desc: 'Vastgoedbeheerders en beleggers vertrouwen dagelijks op Emlinked om hun operationele en financiële processen te automatiseren.',
        casesTitle: 'Klantverhalen',
    },
    en: {
        title: 'References & Customer Cases',
        tagline: 'What our clients say about Emlinked.',
        desc: 'Property managers and investors trust Emlinked daily to run their operational and financial sync loops.',
        casesTitle: 'Customer Success Stories',
    },
} as const;

export default async function ReferentiesPage({
    params,
}: ReferentiesPageProps) {
    const { locale } = await params;
    const t = content[locale as 'nl' | 'en'] || content.nl;

    return (
        <div className='flex flex-col min-h-screen'>
            {/* Hero Header */}
            <section className='relative px-6 py-20 bg-radial from-card via-background to-background border-b border-border'>
                <div className='mx-auto max-w-4xl text-center flex flex-col gap-6'>
                    <span className='inline-flex items-center gap-1.5 self-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary'>
                        Customer Stories
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

            {/* Case Studies placeholders */}
            <section className='px-6 py-20 bg-card border-b border-border'>
                <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-12'>
                    <h2 className='text-2xl font-bold text-foreground'>
                        {t.casesTitle}
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 text-left'>
                        <div className='p-8 rounded-xl border border-border bg-background shadow-sm hover:shadow-md transition-all flex flex-col gap-4'>
                            <span className='text-xs font-semibold text-primary uppercase tracking-widest'>
                                Case Study 1
                            </span>
                            <h3 className='text-lg font-bold text-foreground'>
                                Optimale integratie bij mixed-use portefeuille
                            </h3>
                            <p className='text-sm text-muted-foreground leading-relaxed'>
                                &ldquo;Emlinked heeft onze verwerkingstijd voor
                                servicekostenafrekeningen met 80% verminderd
                                dankzij de directe koppeling met Business
                                Central.&rdquo;
                            </p>
                            <div className='text-xs text-muted-foreground font-semibold mt-2'>
                                — Financieel Directeur, Real Estate Asset
                                Management
                            </div>
                        </div>
                        <div className='p-8 rounded-xl border border-border bg-background shadow-sm hover:shadow-md transition-all flex flex-col gap-4'>
                            <span className='text-xs font-semibold text-primary uppercase tracking-widest'>
                                Case Study 2
                            </span>
                            <h3 className='text-lg font-bold text-foreground'>
                                Efficiënter huurderscontact via het portaal
                            </h3>
                            <p className='text-sm text-muted-foreground leading-relaxed'>
                                &ldquo;Ons huurdersportaal van Emlinked neemt
                                dagelijks tientallen telefoontjes weg. Storingen
                                worden direct met de juiste foto&rsquo;s
                                geregistreerd.&rdquo;
                            </p>
                            <div className='text-xs text-muted-foreground font-semibold mt-2'>
                                — Operationeel Manager, Portefeuillebeheer B.V.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
