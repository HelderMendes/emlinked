import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface IntegrationSlugPageProps {
    params: Promise<{ locale: string; slug: string }>;
}

const integrationsContent = {
    nl: {
        'business-central': {
            title: 'Microsoft Dynamics 365 Business Central',
            subtitle: 'De enige native vastgoedkoppeling voor uw ERP',
            desc: 'Emlinked is direct ingebed in de Microsoft Dynamics 365 Business Central architectuur. Geen losse databases of tijdelijke koppelingen, maar directe synchronisatie van uw vastgoedportefeuille.',
            points: [
                'Volledige synchronisatie van huurders, objecten en contracten naar het grootboek.',
                'Automatische journaalposten bij prolongatie en huurfacturatie.',
                'Automatische indexering op basis van CBS/CPI indexcijfers direct verwerkt.',
                'Volledige audit-trail en compliance voor accountantscontroles.',
            ],
            schemaDescription:
                'Native vastgoedbeheer koppeling voor Microsoft Dynamics 365 Business Central.',
        },
        'document-capture': {
            title: 'Continia Document Capture',
            subtitle:
                'Geautomatiseerde verwerking van inkomende inkoopfacturen',
            desc: 'Digitaliseer de inkomende facturenstroom van aannemers en leveranciers. Continia scant documenten via OCR en matcht ze automatisch met uw inkooporders in Emlinked.',
            points: [
                'Automatische OCR-herkenning van leveranciersgegevens en bedragen.',
                'Directe matching met geregistreerde inkooporders en servicecontracten.',
                'Snelle fiatteringsflow via web of mobiel voor beheerders.',
                'Directe boeking op de juiste kostenplaatsen en verhuureenheden.',
            ],
            schemaDescription:
                'Factuurverwerking en OCR koppeling voor Emlinked vastgoedsoftware.',
        },
        'direct-banking': {
            title: 'Idyn Direct Banking',
            subtitle: 'Realtime telebankieren en automatische bankaflettering',
            desc: 'Koppel uw bank via PSD2 of Direct Banking. Betalingen van huurders worden direct afgeletterd in uw sub-administratie en betalingen aan leveranciers staan meteen klaar.',
            points: [
                'Dagelijkse automatische inlezing van bankafschriften.',
                'Intelligente matching van huurdersbetalingen op factuurnummer.',
                'Eenvoudig klaarzetten van betaalbatches voor leveranciers.',
                'Ondersteuning voor alle grote Nederlandse en Europese banken.',
            ],
            schemaDescription:
                'Telebankieren en PSD2 bankkoppeling voor automatische huuraflettering.',
        },
    },
    en: {
        'business-central': {
            title: 'Microsoft Dynamics 365 Business Central',
            subtitle: 'The only native property management link for your ERP',
            desc: 'Emlinked is embedded directly within the Microsoft Dynamics 365 Business Central ecosystem. No isolated sub-ledgers, but real-time sync of your real estate portfolio data.',
            points: [
                'Full synchronization of tenants, assets, and leases to the general ledger.',
                'Automatic journal entries upon rent invoicing and dunning.',
                'CPI-based indexations processed natively within ERP journals.',
                'Complete audit trails and compliance for corporate accounting.',
            ],
            schemaDescription:
                'Native real estate management sync for Microsoft Dynamics 365 Business Central.',
        },
        'document-capture': {
            title: 'Continia Document Capture',
            subtitle: 'Automated contractor and supplier invoice scanning',
            desc: 'Digitalize incoming cost invoices. Continia scans documents via OCR, reads invoice headers, and matches them automatically against Emlinked purchase orders.',
            points: [
                'Automatic OCR capture of contractor data and line items.',
                'Direct matching with active maintenance contracts and orders.',
                'Approval flows via web or mobile apps for operations managers.',
                'Automated accounting postings to correct property entities.',
            ],
            schemaDescription:
                'Invoice processing and OCR scanning for Emlinked property software.',
        },
        'direct-banking': {
            title: 'Idyn Direct Banking',
            subtitle: 'Real-time bank feed reconciliation and PSD2 link',
            desc: 'Link your bank accounts directly. Rent payments are auto-reconciled within your ledger, and supplier payout batches are queued instantly inside your bank portal.',
            points: [
                'Daily automated import of bank statement feeds.',
                'Intelligent matching of incoming rents based on invoice numbers.',
                'Quick setup of outgoing bank transfer files.',
                'Support for major Dutch and European commercial banks.',
            ],
            schemaDescription:
                'Bank integration and PSD2 connectivity for automated rent reconciliation.',
        },
    },
} as const;

export async function generateMetadata({
    params,
}: IntegrationSlugPageProps): Promise<Metadata> {
    const { locale, slug } = await params;
    const localeContent =
        integrationsContent[locale as 'nl' | 'en'] || integrationsContent.nl;
    const content = localeContent[slug as keyof typeof localeContent];

    if (!content) return {};

    const prefix = locale === 'nl' ? 'Integratie' : 'Integration';

    return {
        title: `${content.title} | ${prefix} | Emlinked`,
        description: `${content.subtitle}. ${content.desc}`.substring(0, 160),
        alternates: {
            canonical:
                locale === 'nl'
                    ? `/integraties/${slug}`
                    : `/en/integraties/${slug}`,
        },
    };
}

export default async function IntegrationSlugPage({
    params,
}: IntegrationSlugPageProps) {
    const { locale, slug } = await params;
    const localeContent =
        integrationsContent[locale as 'nl' | 'en'] || integrationsContent.nl;
    const content = localeContent[slug as keyof typeof localeContent];

    if (!content) {
        notFound();
    }

    const isEn = locale === 'en';

    // Define JSON-LD SoftwareApplication Schema
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: `Emlinked - ${content.title}`,
        operatingSystem: 'All',
        applicationCategory: 'BusinessApplication',
        description: content.schemaDescription,
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'EUR',
        },
    };

    return (
        <div className='flex flex-col min-h-screen'>
            {/* Inject Schema Markup */}
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Header */}
            <section className='relative px-6 py-20 bg-radial from-card via-background to-background border-b border-border'>
                <div className='mx-auto max-w-4xl text-center flex flex-col gap-6'>
                    <Link
                        href={
                            locale === 'nl' ? '/integraties' : '/en/integraties'
                        }
                        className='inline-flex items-center gap-1.5 self-center text-xs font-semibold text-primary hover:underline'
                    >
                        ←{' '}
                        {isEn
                            ? 'Back to integrations'
                            : 'Terug naar integraties'}
                    </Link>
                    <h1 className='font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight'>
                        {content.title}
                    </h1>
                    <p className='text-xl text-primary font-bold'>
                        {content.subtitle}
                    </p>
                    <p className='text-base text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed'>
                        {content.desc}
                    </p>
                </div>
            </section>

            {/* Details list */}
            <section className='px-6 py-20 bg-card border-b border-border'>
                <div className='mx-auto max-w-3xl flex flex-col gap-12'>
                    <div className='space-y-6'>
                        <h2 className='text-xl font-bold text-foreground'>
                            {isEn
                                ? 'Key Features & Benefits'
                                : 'Belangrijkste voordelen'}
                        </h2>
                        <ul className='space-y-4'>
                            {content.points.map((point, idx) => (
                                <li
                                    key={idx}
                                    className='flex items-start gap-3 text-sm text-muted-foreground leading-relaxed'
                                >
                                    <span className='h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5'>
                                        ✓
                                    </span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CTA Banner */}
                    <div className='p-8 rounded-xl bg-muted/20 border border-border flex flex-col sm:flex-row items-center justify-between gap-6'>
                        <div>
                            <h4 className='font-bold text-foreground text-sm'>
                                {isEn
                                    ? 'Want to see this sync in action?'
                                    : 'Deze koppeling live in actie zien?'}
                            </h4>
                            <p className='text-xs text-muted-foreground mt-1'>
                                {isEn
                                    ? 'Schedule a technical session with our developers.'
                                    : 'Plan direct een technische sessie in met een van onze specialisten.'}
                            </p>
                        </div>
                        <Link
                            href={locale === 'nl' ? '/contact' : '/en/contact'}
                            className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-xs font-semibold text-primary-foreground shadow hover:bg-primary/95 transition-all shrink-0'
                        >
                            {isEn ? 'Contact Sales' : 'Contact Opnemen'}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
