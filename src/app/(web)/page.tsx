import React from 'react';
import Link from 'next/link';

export default function HomePage() {
    return (
        <div className='flex flex-col min-h-screen'>
            {/* Hero Section */}
            <section className='relative px-6 py-20 md:py-32 overflow-hidden bg-radial from-card via-background to-background border-b border-border'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
                        {/* Left Content Column */}
                        <div className='lg:col-span-7 flex flex-col gap-6 text-left'>
                            <span className='inline-flex items-center gap-1.5 self-start rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary'>
                                Nieuw: Microsoft Dynamics 365 Business Central
                                Koppeling
                            </span>
                            <h1 className='font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]'>
                                Vastgoedbeheer Software voor Professionele
                                Portefeuilles
                            </h1>
                            <p className='text-lg md:text-xl text-muted-foreground leading-relaxed'>
                                Emlinked is het eerste, volledig geïntegreerde
                                platform voor commercieel en mixed-use
                                vastgoedbeheer. Stroomlijn uw administratie,
                                beheer huurstromen en stuur realtime op
                                rendement.
                            </p>
                            <div className='flex flex-col sm:flex-row gap-4 mt-2'>
                                <Link
                                    href='/contact'
                                    className='inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 text-base font-medium text-primary-foreground shadow hover:bg-primary/95 transition-all text-center'
                                >
                                    Vraag direct demo aan
                                </Link>
                                <Link
                                    href='/functionaliteiten/contractbeheer'
                                    className='inline-flex h-12 items-center justify-center rounded-md border border-border bg-card px-6 text-base font-medium text-foreground shadow-sm hover:bg-muted/50 transition-all text-center'
                                >
                                    Bekijk functionaliteiten
                                </Link>
                            </div>
                        </div>

                        {/* Right Graphic Mockup */}
                        <div className='lg:col-span-5 relative w-full h-80 md:h-[450px] rounded-xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col'>
                            {/* Header of Mockup */}
                            <div className='h-10 border-b border-border bg-muted/30 px-4 flex items-center gap-1.5'>
                                <span className='h-3 w-3 rounded-full bg-red-500/80'></span>
                                <span className='h-3 w-3 rounded-full bg-yellow-500/80'></span>
                                <span className='h-3 w-3 rounded-full bg-green-500/80'></span>
                                <span className='text-[10px] text-muted-foreground ml-2 font-mono'>
                                    dashboard.emlinked.com
                                </span>
                            </div>
                            {/* Content of Mockup */}
                            <div className='flex-grow p-6 flex flex-col gap-6 font-sans'>
                                <div className='flex items-center justify-between'>
                                    <div className='h-6 w-32 rounded bg-muted'></div>
                                    <div className='h-6 w-20 rounded bg-primary/20'></div>
                                </div>
                                <div className='grid grid-cols-3 gap-4'>
                                    <div className='h-20 rounded border border-border p-3 flex flex-col justify-between'>
                                        <span className='text-[10px] text-muted-foreground'>
                                            Totale Huurstroom
                                        </span>
                                        <span className='font-bold text-sm'>
                                            € 428.500
                                        </span>
                                    </div>
                                    <div className='h-20 rounded border border-border p-3 flex flex-col justify-between'>
                                        <span className='text-[10px] text-muted-foreground'>
                                            Bezetting
                                        </span>
                                        <span className='font-bold text-sm text-green-600'>
                                            98.4%
                                        </span>
                                    </div>
                                    <div className='h-20 rounded border border-border p-3 flex flex-col justify-between'>
                                        <span className='text-[10px] text-muted-foreground'>
                                            Open Tickets
                                        </span>
                                        <span className='font-bold text-sm text-red-500'>
                                            2 Actief
                                        </span>
                                    </div>
                                </div>
                                <div className='flex-grow rounded border border-border p-4 flex flex-col gap-3 justify-center'>
                                    <div className='h-3 w-3/4 rounded bg-muted'></div>
                                    <div className='h-3 w-1/2 rounded bg-muted'></div>
                                    <div className='h-3 w-5/6 rounded bg-muted'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature grid Section */}
            <section className='px-6 py-20 bg-card border-b border-border'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-12'>
                    <div className='max-w-2xl mx-auto flex flex-col gap-4'>
                        <h2 className='font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground'>
                            Ontworpen voor vastgoedprofessionals
                        </h2>
                        <p className='text-muted-foreground'>
                            Emlinked brengt uw beheer naar het hoogste
                            kwaliteitsniveau door handmatige processen te
                            elimineren.
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-left'>
                        {/* Feature 1 */}
                        <div className='p-6 rounded-lg border border-border bg-background flex flex-col gap-4 hover:shadow-md transition-all'>
                            <div className='h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary'>
                                <svg
                                    className='h-6 w-6'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth='1.5'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
                                    />
                                </svg>
                            </div>
                            <h3 className='text-lg font-bold text-foreground'>
                                Contractbeheer
                            </h3>
                            <p className='text-sm text-muted-foreground'>
                                Automatische indexering, prolongatie en
                                servicekostenafrekening voor al uw huurders.
                                Geen Excel-sheets meer nodig.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className='p-6 rounded-lg border border-border bg-background flex flex-col gap-4 hover:shadow-md transition-all'>
                            <div className='h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary'>
                                <svg
                                    className='h-6 w-6'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth='1.5'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                    />
                                </svg>
                            </div>
                            <h3 className='text-lg font-bold text-foreground'>
                                Financieel Beheer
                            </h3>
                            <p className='text-sm text-muted-foreground'>
                                Centraal beheer van uw huurstroom, automatische
                                facturatie, bankkoppelingen en
                                betalingsherinneringen.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className='p-6 rounded-lg border border-border bg-background flex flex-col gap-4 hover:shadow-md transition-all'>
                            <div className='h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary'>
                                <svg
                                    className='h-6 w-6'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth='1.5'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
                                    />
                                </svg>
                            </div>
                            <h3 className='text-lg font-bold text-foreground'>
                                Huurdersportaal
                            </h3>
                            <p className='text-sm text-muted-foreground'>
                                Geef huurders een modern portaal voor documenten
                                en online storingsmeldingen, rechtstreeks
                                gesynchroniseerd met uw back-office.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dynamics 365 callout */}
            <section className='px-6 py-20 bg-background'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border border-border rounded-2xl bg-card p-8 md:p-12'>
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'>
                        <div className='lg:col-span-8 flex flex-col gap-4 text-left'>
                            <span className='text-xs font-semibold text-primary uppercase tracking-widest'>
                                Unieke Differentiator
                            </span>
                            <h2 className='font-display text-3xl font-bold tracking-tight text-foreground'>
                                Zonder moeite gekoppeld aan Microsoft Dynamics
                                365 Business Central
                            </h2>
                            <p className='text-muted-foreground'>
                                Andere vastgoedsoftware dwingt u tot losse
                                boekhoudpakketten. Emlinked integreert native in
                                uw Dynamics 365 ERP. Financiële stromen,
                                audit-trails en indexaties lopen volledig
                                synchroon in één betrouwbaar systeem.
                            </p>
                        </div>
                        <div className='lg:col-span-4 flex justify-end'>
                            <Link
                                href='/integraties/microsoft-dynamics-365'
                                className='inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 text-base font-medium text-primary-foreground shadow hover:bg-primary/95 transition-all text-center w-full lg:w-auto'
                            >
                                Ontdek de Business Central koppeling
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
