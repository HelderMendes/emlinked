import React from 'react';
import Link from 'next/link';

import { Metadata } from 'next';

interface IntegrationsPageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({
    params,
}: IntegrationsPageProps): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === 'en';

    return {
        title: isEn
            ? 'Partners & Software Integrations (Business Central) | Emlinked'
            : 'Partners & Software Integraties (Business Central) | Emlinked',
        description: isEn
            ? 'Connect Emlinked natively with Microsoft Dynamics 365 Business Central, Continia Document Capture, and Idyn Direct Banking.'
            : 'Koppel Emlinked direct met Microsoft Dynamics 365 Business Central, Continia Document Capture en Idyn Direct Banking.',
        alternates: {
            canonical: isEn ? '/en/integraties' : '/integraties',
        },
    };
}

const content = {
    nl: {
        title: 'Partners & Software Integraties',
        tagline:
            'Verbind uw vastgoedmanagement rechtstreeks met uw financiële systemen.',
        intro: 'Geen losse databases en handmatige import/export bestanden. Emlinked integreert native met uw Microsoft Dynamics 365 Business Central back-office en marktleidende add-ons.',
        bcTitle: '1. Microsoft Dynamics 365 Business Central',
        bcBadge: 'Native Integratie',
        bcDesc: 'Emlinked is direct ingebed in uw Business Central omgeving. Huurders, contracten, prolongaties en indexaties worden in realtime gesynchroniseerd naar uw sub-administratie en grootboek. Geen synchronisatiefouten, 100% compliant.',
        continiaTitle: '2. Continia Document Capture',
        continiaBadge: 'Factuurverwerking & OCR',
        continiaDesc:
            'Digitaliseer uw inkomende kostenfacturen van leveranciers en aannemers. Continia leest de gegevens via OCR in, matcht ze met uw inkooporders in Emlinked en boekt ze direct op de juiste kostenplaatsen en objecten.',
        idynTitle: '3. Idyn Direct Banking',
        idynBadge: 'Telebankieren & PSD2',
        idynDesc:
            'Sluit uw bankrekening rechtstreeks aan op uw vastgoedadministratie. Huurbetalingen worden automatisch ingelezen en afgeletterd. Betalingen aan leveranciers of servicekosten-afrekeningen zet u met één klik klaar in uw bankportal.',
        cta: 'Plan een technische dieptesessie',
    },
    en: {
        title: 'Partners & Software Integrations',
        tagline:
            'Connect your property management directly with your financial systems.',
        intro: 'No isolated databases or manual import/export files. Emlinked integrates natively with your Microsoft Dynamics 365 Business Central ERP and market-leading add-ons.',
        bcTitle: '1. Microsoft Dynamics 365 Business Central',
        bcBadge: 'Native Sync',
        bcDesc: 'Emlinked is embedded directly within your Business Central ecosystem. Tenants, leases, invoices, and indexations sync in real-time to your sub-ledgers. 100% audit-compliant.',
        continiaTitle: '2. Continia Document Capture',
        continiaBadge: 'Invoice Scanning & OCR',
        continiaDesc:
            'Digitalize incoming cost invoices from contractors and suppliers. Continia scans details via OCR, matches them against Emlinked purchase orders, and records them to the correct property accounts.',
        idynTitle: '3. Idyn Direct Banking',
        idynBadge: 'Banking Link & PSD2',
        idynDesc:
            'Connect your bank accounts directly to your property database. Rent payments are auto-reconciled, and outgoing supplier payouts are queued securely inside your banking client in one click.',
        cta: 'Schedule a Technical Deep-dive',
    },
} as const;

export default async function IntegrationsPage({
    params,
}: IntegrationsPageProps) {
    const { locale } = await params;
    const t = content[locale as 'nl' | 'en'] || content.nl;

    // Helper to prepend locale for links
    const getPath = (path: string) => {
        if (locale === 'nl') {
            return path;
        }
        return `/en${path === '/' ? '' : path}`;
    };

    return (
        <div className='flex flex-col min-h-screen'>
            {/* Hero Header */}
            <section className='relative px-6 py-20 bg-radial from-card via-background to-background border-b border-border'>
                <div className='mx-auto max-w-4xl text-center flex flex-col gap-6'>
                    <span className='inline-flex items-center gap-1.5 self-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary'>
                        Ecosystem Integrations
                    </span>
                    <h1 className='font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight'>
                        {t.title}
                    </h1>
                    <p className='text-xl text-muted-foreground leading-relaxed'>
                        {t.tagline}
                    </p>
                    <p className='text-base text-muted-foreground/80 max-w-2xl mx-auto'>
                        {t.intro}
                    </p>
                </div>
            </section>

            {/* Integration Blocks */}
            <section className='px-6 py-20 bg-card border-b border-border'>
                <div className='mx-auto max-w-5xl flex flex-col gap-12'>
                    {/* Microsoft Dynamics 365 */}
                    <div className='p-8 rounded-xl border border-border bg-background shadow-sm hover:shadow-md transition-all flex flex-col gap-4'>
                        <div className='flex items-center justify-between gap-4'>
                            <h2 className='text-2xl font-bold text-foreground'>
                                {t.bcTitle}
                            </h2>
                            <span className='inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary'>
                                {t.bcBadge}
                            </span>
                        </div>
                        <p className='text-muted-foreground leading-relaxed text-sm'>
                            {t.bcDesc}
                        </p>
                        <div className='mt-2'>
                            <Link
                                href={getPath('/integraties/business-central')}
                                className='text-xs font-semibold text-primary hover:underline flex items-center gap-1'
                            >
                                {locale === 'en'
                                    ? 'Learn more about Business Central integration'
                                    : 'Lees meer over de Business Central koppeling'}{' '}
                                →
                            </Link>
                        </div>
                    </div>

                    {/* Continia Document Capture */}
                    <div className='p-8 rounded-xl border border-border bg-background shadow-sm hover:shadow-md transition-all flex flex-col gap-4'>
                        <div className='flex items-center justify-between gap-4'>
                            <h2 className='text-2xl font-bold text-foreground'>
                                {t.continiaTitle}
                            </h2>
                            <span className='inline-flex items-center rounded-full bg-blue-500/10 px-2 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400'>
                                {t.continiaBadge}
                            </span>
                        </div>
                        <p className='text-muted-foreground leading-relaxed text-sm'>
                            {t.continiaDesc}
                        </p>
                        <div className='mt-2'>
                            <Link
                                href={getPath('/integraties/document-capture')}
                                className='text-xs font-semibold text-primary hover:underline flex items-center gap-1'
                            >
                                {locale === 'en'
                                    ? 'Learn more about invoice processing'
                                    : 'Lees meer over automatische factuurverwerking'}{' '}
                                →
                            </Link>
                        </div>
                    </div>

                    {/* Idyn Direct Banking */}
                    <div className='p-8 rounded-xl border border-border bg-background shadow-sm hover:shadow-md transition-all flex flex-col gap-4'>
                        <div className='flex items-center justify-between gap-4'>
                            <h2 className='text-2xl font-bold text-foreground'>
                                {t.idynTitle}
                            </h2>
                            <span className='inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-semibold text-green-600 dark:text-green-400'>
                                {t.idynBadge}
                            </span>
                        </div>
                        <p className='text-muted-foreground leading-relaxed text-sm'>
                            {t.idynDesc}
                        </p>
                        <div className='mt-2'>
                            <Link
                                href={getPath('/integraties/direct-banking')}
                                className='text-xs font-semibold text-primary hover:underline flex items-center gap-1'
                            >
                                {locale === 'en'
                                    ? 'Learn more about Direct Banking PSD2'
                                    : 'Lees meer over bankenkoppeling'}{' '}
                                →
                            </Link>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className='flex justify-center mt-6'>
                        <Link
                            href={getPath('/contact')}
                            className='inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-base font-medium text-primary-foreground shadow hover:bg-primary/95 transition-all text-center'
                        >
                            {t.cta}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
