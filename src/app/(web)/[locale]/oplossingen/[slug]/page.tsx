import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Metadata } from 'next';

interface SolutionPageProps {
    params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({
    params,
}: SolutionPageProps): Promise<Metadata> {
    const { locale, slug } = await params;
    const localeContent =
        solutionsContent[locale as 'nl' | 'en'] || solutionsContent.nl;
    const content = localeContent[slug as keyof typeof localeContent];

    if (!content) return {};

    const prefix =
        locale === 'nl' ? 'Vastgoedbeheer Software' : 'Property Management';

    return {
        title: `${content.title} | ${prefix} | Emlinked`,
        description: `${content.tagline} ${content.desc}`.substring(0, 160),
        alternates: {
            canonical:
                locale === 'nl'
                    ? `/oplossingen/${slug}`
                    : `/en/oplossingen/${slug}`,
        },
    };
}

const solutionsContent = {
    nl: {
        'vastgoedbeheer-software': {
            title: 'Vastgoedbeheer Software',
            badge: 'Core SaaS Module',
            tagline:
                'Volledige controle over uw commerciële en mixed-use vastgoedportefeuille.',
            desc: 'Stroomlijn contractbeheer, automatiseer indexaties en facturatie, en krijg realtime grip op uw rendement. Direct verbonden met Microsoft Dynamics 365 Business Central.',
            features: [
                {
                    title: 'Automatische Indexatie',
                    text: 'Indexeer huurprijzen op basis van CPI-cijfers met één klik. Inclusief automatische e-mail notificaties naar huurders.',
                },
                {
                    title: 'Huurprolongatie',
                    text: 'Genereer en verstuur automatisch maandelijkse of kwartaalfacturen. Geen handmatige acties meer vereist.',
                },
                {
                    title: 'Rapportage & Dashboards',
                    text: 'Realtime inzicht in leegstand, rendement, openstaande betalingen en verhuurprestaties per object.',
                },
            ],
        },
        huurdersportaal: {
            title: 'Huurdersportaal',
            badge: 'Tenant Engagement',
            tagline: 'Geef uw huurders een moderne, digitale service-ervaring.',
            desc: 'Een intuïtief self-service portaal waar huurders documenten inzien, facturen betalen en storingen registreren. Volledig gesynchroniseerd met uw back-office.',
            features: [
                {
                    title: 'Online Storingsmeldingen',
                    text: "Huurders dienen direct serviceverzoeken in met foto's. Meldingen stromen automatisch in uw ticketsysteem.",
                },
                {
                    title: 'Documenten & Contracten',
                    text: 'Bied 24/7 veilige toegang tot huurcontracten, huisregels en servicekostenspecificaties.',
                },
                {
                    title: 'Directe Communicatie',
                    text: 'Stuur belangrijke berichten of updates over onderhoud direct naar de inbox van uw huurders.',
                },
            ],
        },
        payment: {
            title: 'Payment Software',
            badge: 'Automated Transactions',
            tagline: "Automatiseer uw huurincasso's en bankaflettering.",
            desc: 'Koppel uw bank via PSD2 of Direct Banking. Huurbetalingen worden realtime verwerkt en automatisch afgeletterd in het grootboek van Business Central.',
            features: [
                {
                    title: 'Direct Banking Koppeling',
                    text: 'Synchroniseer dagelijks bankafschriften en zet betalingen klaar in uw telebankier-module.',
                },
                {
                    title: 'Mislukte Incasso Opvolging',
                    text: 'Automatische herinneringstaken en aanmaningen bij storneringen of betalingsachterstanden.',
                },
                {
                    title: 'Split Payments',
                    text: 'Verdeel ontvangen huurstromen automatisch over verschillende eigenaren of beheerders.',
                },
            ],
        },
    },
    en: {
        'vastgoedbeheer-software': {
            title: 'Property Management Software',
            badge: 'Core SaaS Module',
            tagline:
                'Complete control over your commercial and mixed-use property portfolios.',
            desc: 'Streamline contract management, automate indexation and billing, and access real-time yield analytics. Natively integrated with Microsoft Dynamics 365 Business Central.',
            features: [
                {
                    title: 'Automated Indexation',
                    text: 'Index rents based on CPI metrics in one click. Includes automated notification emails to tenants.',
                },
                {
                    title: 'Rent Invoicing',
                    text: 'Generate and deliver monthly or quarterly invoices automatically. No manual steps required.',
                },
                {
                    title: 'Reporting & Dashboards',
                    text: 'Real-time visibility into occupancy, yields, open balances, and leasing performance.',
                },
            ],
        },
        huurdersportaal: {
            title: 'Tenant Portal',
            badge: 'Tenant Engagement',
            tagline:
                'Provide your tenants with a modern, digital service experience.',
            desc: 'An intuitive self-service portal where tenants can view lease documents, pay invoices, and register maintenance requests.',
            features: [
                {
                    title: 'Online Support Tickets',
                    text: 'Tenants submit maintenance requests directly with photos, flowing instantly to your support desk.',
                },
                {
                    title: 'Docs & Contracts Access',
                    text: '24/7 secure access to leases, building rules, and service cost specifications.',
                },
                {
                    title: 'Direct Messaging',
                    text: 'Send critical building updates or messages directly to the inbox of your tenants.',
                },
            ],
        },
        payment: {
            title: 'Payment Software',
            badge: 'Automated Transactions',
            tagline: 'Automate your rent collection and bank reconciliation.',
            desc: 'Connect your banks securely. Rent payments are processed in real-time and auto-reconciled within your Business Central ledger.',
            features: [
                {
                    title: 'Direct Banking Link',
                    text: 'Synchronize bank statements daily and queue payments directly inside your banking client.',
                },
                {
                    title: 'Collection Follow-up',
                    text: 'Automated reminders and dunning letters triggered immediately on failed direct debits.',
                },
                {
                    title: 'Split Payments',
                    text: 'Distribute incoming rent flows automatically between different owners or portfolios.',
                },
            ],
        },
    },
} as const;

export default async function SolutionPage({ params }: SolutionPageProps) {
    const { locale, slug } = await params;

    const localeContent =
        solutionsContent[locale as 'nl' | 'en'] || solutionsContent.nl;
    const content = localeContent[slug as keyof typeof localeContent];

    if (!content) {
        notFound();
    }

    const isEn = locale === 'en';

    return (
        <div className='flex flex-col min-h-screen'>
            {/* Hero Header */}
            <section className='relative px-6 py-20 bg-radial from-card via-background to-background border-b border-border'>
                <div className='mx-auto max-w-5xl text-center flex flex-col gap-6'>
                    <span className='inline-flex items-center gap-1.5 self-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary'>
                        {content.badge}
                    </span>
                    <h1 className='font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground'>
                        {content.title}
                    </h1>
                    <p className='text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
                        {content.tagline}
                    </p>
                    <p className='text-base text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed'>
                        {content.desc}
                    </p>
                    <div className='flex justify-center gap-4 mt-4'>
                        <Link
                            href={`/${locale}/contact`}
                            className='inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow hover:bg-primary/95 transition-all'
                        >
                            {isEn ? 'Schedule a Demo' : 'Demo inplannen'}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Feature List */}
            <section className='px-6 py-20 bg-card border-b border-border'>
                <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        {content.features.map((feature, idx) => (
                            <div
                                key={idx}
                                className='p-6 rounded-lg border border-border bg-background flex flex-col gap-4 hover:shadow-md transition-all'
                            >
                                <div className='h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm'>
                                    {idx + 1}
                                </div>
                                <h3 className='text-lg font-bold text-foreground'>
                                    {feature.title}
                                </h3>
                                <p className='text-sm text-muted-foreground leading-relaxed'>
                                    {feature.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
