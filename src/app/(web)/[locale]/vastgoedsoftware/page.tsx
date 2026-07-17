import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
    Check,
    ArrowRight,
    Building2,
    Users,
    CreditCard,
    ShieldCheck,
    Database,
    TrendingUp,
    CheckCircle2,
} from 'lucide-react';
import { sanityFetch } from '@/lib/sanity';

interface VastgoedsoftwarePageProps {
    params: Promise<{ locale: string }>;
}

async function getSanityPageData(locale: string) {
    try {
        return await sanityFetch<any>({
            query: `*[_type == "page" && slug.current == "vastgoedsoftware" && language == $locale][0] {
                title,
                seo {
                    seoTitle,
                    seoDescription,
                    canonical,
                    noIndex
                }
            }`,
            params: { locale },
        });
    } catch (e) {
        console.error('Failed to fetch vastgoedsoftware page from Sanity:', e);
        return null;
    }
}

export async function generateMetadata({
    params,
}: VastgoedsoftwarePageProps): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getSanityPageData(locale);
    const seo = pageData?.seo;

    const title =
        seo?.seoTitle ||
        (isEn
            ? 'Native Microsoft Dynamics Property Software Suite | Emlinked'
            : 'Native Microsoft Dynamics Vastgoedsoftware Suite | Emlinked');

    const description =
        seo?.seoDescription ||
        (isEn
            ? 'Emlinked provides property management, tenant portals, and payment automation natively integrated inside Microsoft Dynamics 365 Business Central.'
            : 'Emlinked levert vastgoedbeheer, huurdersportalen en betalingsautomatisering native geïntegreerd binnen Microsoft Dynamics 365 Business Central.');

    const robots = seo?.noIndex ? 'noindex, nofollow' : 'index, follow';

    return {
        title,
        description,
        robots,
        alternates: {
            canonical:
                seo?.canonical ||
                (isEn ? '/en/vastgoedsoftware' : '/vastgoedsoftware'),
        },
    };
}

export default async function VastgoedsoftwarePage({
    params,
}: VastgoedsoftwarePageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';

    const getPath = (path: string) => {
        if (locale === 'nl') return path;
        return `/en${path === '/' ? '' : path}`;
    };

    const modules = [
        {
            icon: <Building2 className='h-8 w-8 text-amber' />,
            title: isEn ? 'Property Management' : 'Vastgoedbeheer',
            subtitle: isEn ? 'The Core SaaS Module' : 'De core SaaS module',
            description: isEn
                ? 'Centralize your entire real estate administration. Automate leases, CPI indexations, dynamic costs, and keep your ledger synchronous with Business Central.'
                : 'De centrale database voor al uw vastgoedobjecten, huurders en contracten. Automatiseer indexaties en prolongaties native in Microsoft Dynamics.',
            link: '/oplossingen/vastgoedbeheer-software',
            features: isEn
                ? [
                      'Real-time Contract Management',
                      'Automatic CPI Indexation',
                      'Tenant & Property Database',
                  ]
                : [
                      'Realtime Contractbeheer',
                      'Automatische CPI-indexering',
                      'Gedetailleerde Huurderskaart',
                  ],
            badge: isEn ? 'Most Popular' : 'Meest gekozen',
        },
        {
            icon: <Users className='h-8 w-8 text-amber' />,
            title: isEn ? 'Tenant Portal' : 'Huurdersportaal',
            subtitle: isEn
                ? 'Tenant Self-Service'
                : 'Self-service voor huurders',
            description: isEn
                ? 'Empower your tenants with self-service capabilities. Let them download invoices, check payment history, and log maintenance tickets autonomously.'
                : 'Geef uw huurders de controle met een eigen online portal. Documenten inzien, facturen downloaden en onderhoudsmeldingen indienen zonder tussenkomst.',
            link: '/oplossingen/huurdersportaal',
            features: isEn
                ? [
                      '24/7 Digital Self-Service',
                      'Direct Invoicing Overview',
                      'Easy Maintenance Logging',
                  ]
                : [
                      '24/7 Digitale service',
                      'Factuur- & betalingsoverzicht',
                      'Directe Storingsmeldingen',
                  ],
            badge: isEn ? 'Enterprise' : 'Klantservice',
        },
        {
            icon: <CreditCard className='h-8 w-8 text-amber' />,
            title: isEn ? 'Payment Software' : 'Payment Software',
            subtitle: isEn
                ? 'Reconciliation Automation'
                : 'PSD2 & Bankaflettering',
            description: isEn
                ? 'Directly link bank statements to rent invoices. Auto-reconcile tenant transactions and eliminate manual data exports or double-entry ledgers.'
                : 'Automatiseer uw bankaflettering. Koppel bankrekeningen direct via PSD2-koppelingen en CAMT.053 bestanden om transacties realtime te matchen.',
            link: '/oplossingen/payment',
            features: isEn
                ? [
                      'Direct PSD2 Bank Sync',
                      'Automated Ledger Matching',
                      'Zero Manual File Transfers',
                  ]
                : [
                      'Directe Bankkoppeling',
                      'Geautomatiseerd afletteren',
                      'Geen handmatige MT940 exports',
                  ],
            badge: isEn ? 'New Integration' : 'Nieuw',
        },
    ];

    // FAQ schema for SEO / LLM citations
    const faqs = [
        {
            q: isEn
                ? 'Is Emlinked a separate software database?'
                : 'Is Emlinked een losstaande softwaredatabase?',
            a: isEn
                ? 'No, Emlinked is a native extension built directly on top of Microsoft Dynamics 365 Business Central. All properties, leases, and transactions live in your central ERP database, guaranteeing 100% data integrity.'
                : 'Nee, Emlinked is een native extensie die draait binnen Microsoft Dynamics 365 Business Central. Al uw vastgoed- en financiële data staat in één centrale database. Geen synchronisatie-koppelingen nodig.',
        },
        {
            q: isEn
                ? 'Does it support automated CPI indexations?'
                : 'Ondersteunt het platform automatische CPI-indexering?',
            a: isEn
                ? 'Yes, Emlinked fetches CBS indexation values automatically, calculates the adjusted rent value based on the lease parameters, and updates the billing data without requiring manual Excel calculations.'
                : 'Ja. Emlinked haalt de nieuwste CPI-cijfers van het CBS automatisch op, berekent de nieuwe huurprijs volgens de contractvoorwaarden en voert dit door in de huurprolongatie.',
        },
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
            },
        })),
    };

    return (
        <main className="flex-1 bg-[url('/hero/bkg_darkBlue.jpg')] bg-cover bg-center bg-no-repeat text-white">
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <section className='relative px-6 py-20 md:py-28 overflow-hidden bg-[radial-gradient(circle_at_30%_20%,rgba(255,148,0,0.08),transparent_50%)]'>
                <div className='absolute inset-0 bg-[linear-gradient(to_bottom,rgba(6,14,50,0.8),#060e32)] z-0' />
                <div className='max-w-7xl mx-auto text-center relative z-10 space-y-6'>
                    <span className='inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-primary/10 border border-primary/20 text-primary'>
                        <Database className='h-3.5 w-3.5' />
                        {isEn
                            ? 'MODULAR PROPERTY SUITE'
                            : 'MODULAIR VASTGOEDPLATFORM'}
                    </span>
                    <h1 className='font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight max-w-4xl mx-auto leading-tight'>
                        {isEn
                            ? 'Native Real Estate Software for '
                            : 'Native Vastgoedsoftware voor '}
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-amber to-amber-light'>
                            Microsoft Dynamics
                        </span>
                    </h1>
                    <p className='text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed'>
                        {isEn
                            ? 'Manage your properties, tenants, and financial transactions natively inside one single system. Choose the modules that fit your B2B portfolio operations.'
                            : 'Beheer uw vastgoedobjecten, huurders en betalingsstromen direct binnen uw Microsoft Dynamics ERP. Geen dubbele invoer, maximale controle.'}
                    </p>
                </div>
            </section>

            {/* Modules Grid */}
            <section className='px-6 py-12 relative z-10 max-w-7xl mx-auto'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {modules.map((mod, idx) => (
                        <div
                            key={idx}
                            className='group relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 flex flex-col justify-between hover:border-amber/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber/5'
                        >
                            <div className='space-y-6'>
                                <div className='flex justify-between items-start'>
                                    <div className='h-14 w-14 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-amber/20 transition-colors'>
                                        {mod.icon}
                                    </div>
                                    <span className='px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-white/[0.06] border border-white/10 text-muted-foreground'>
                                        {mod.badge}
                                    </span>
                                </div>

                                <div className='space-y-2'>
                                    <span className='text-[10px] font-bold text-amber uppercase tracking-wider'>
                                        {mod.subtitle}
                                    </span>
                                    <h2 className='font-display font-bold text-2xl text-white'>
                                        {mod.title}
                                    </h2>
                                    <p className='text-xs text-muted-foreground leading-relaxed pt-1'>
                                        {mod.description}
                                    </p>
                                </div>

                                <ul className='space-y-2.5 pt-4 border-t border-white/5'>
                                    {mod.features.map((feat, fIdx) => (
                                        <li
                                            key={fIdx}
                                            className='flex items-center gap-2.5 text-xs text-slate-300'
                                        >
                                            <CheckCircle2 className='h-4 w-4 text-emerald-500 shrink-0' />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className='pt-8'>
                                <Link
                                    href={getPath(mod.link)}
                                    className='inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-semibold hover:bg-amber hover:border-amber hover:text-black transition-all'
                                >
                                    {isEn ? 'Read Details' : 'Details Bekijken'}
                                    <ArrowRight className='h-4 w-4' />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Integration CTA Block */}
            <section className='px-6 py-20 relative z-10 max-w-7xl mx-auto'>
                <div className='relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-8 md:p-14 overflow-hidden text-center max-w-4xl mx-auto'>
                    <div className='absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber/5 rounded-full blur-[100px] pointer-events-none' />
                    <div className='relative z-10 space-y-6 max-w-2xl mx-auto'>
                        <h2 className='font-display font-bold text-3xl md:text-4xl text-white'>
                            {isEn
                                ? 'Streamline Your Entire B2B Administration'
                                : 'Stroomlijn uw volledige vastgoedadministratie'}
                        </h2>
                        <p className='text-xs text-muted-foreground leading-relaxed'>
                            {isEn
                                ? 'Deploy the modular power of Emlinked inside your Microsoft Dynamics environment. Contact our integration specialists for a live technical demonstration.'
                                : 'Koppel uw vastgoedbeheer direct aan uw financiële administratie en bankreconciliatie. Neem contact op voor een technische demonstratie.'}
                        </p>
                        <div className='flex flex-col sm:flex-row justify-center items-center gap-4 pt-4'>
                            <Link
                                href='#demo'
                                className='h-11 px-6 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold rounded-lg flex items-center gap-2 transition-all shadow-md'
                            >
                                {isEn ? 'Request a Demo' : 'Demo aanvragen'}
                                <ArrowRight className='h-4.5 w-4.5' />
                            </Link>
                            <Link
                                href={getPath('/integraties')}
                                className='h-11 px-6 border border-white/10 hover:bg-white/[0.04] text-xs font-bold rounded-lg flex items-center transition-all'
                            >
                                {isEn
                                    ? 'Explore Integrations'
                                    : 'Koppelingen Ontdekken'}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
