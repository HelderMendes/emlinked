import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
    Check, 
    ArrowRight, 
    Layers, 
    FileSpreadsheet, 
    FileCheck2, 
    Coins, 
    ArrowLeftRight, 
    Zap 
} from 'lucide-react';
import { sanityFetch } from '@/lib/sanity';

interface IntegrationsPageProps {
    params: Promise<{ locale: string }>;
}

async function getSanityPageData(locale: string) {
    try {
        return await sanityFetch<any>({
            query: `*[_type == "page" && slug.current == "integraties" && language == $locale][0] {
                title,
                seo {
                    seoTitle,
                    seoDescription,
                    canonical,
                    noIndex
                },
                pageBlocks[] {
                    _type,
                    _key,
                    label,
                    title,
                    subtitle,
                    desc,
                    sectionTitle,
                    integrations[] {
                        title,
                        badge,
                        description,
                        imagePlaceholder,
                        bullets,
                        link
                    },
                    buttonLabel,
                    buttonLink
                }
            }`,
            params: { locale }
        });
    } catch (e) {
        console.error('Failed to fetch integrations page from Sanity:', e);
        return null;
    }
}

export async function generateMetadata({
    params,
}: IntegrationsPageProps): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getSanityPageData(locale);
    const seo = pageData?.seo;

    const title = seo?.seoTitle || (isEn
        ? 'Partners & Software Integrations (Business Central) | Emlinked'
        : 'Partners & Software Integraties (Business Central) | Emlinked');

    const description = seo?.seoDescription || (isEn
        ? 'Connect Emlinked natively with Microsoft Dynamics 365 Business Central, Continia Document Capture, and Idyn Direct Banking.'
        : 'Koppel Emlinked direct met Microsoft Dynamics 365 Business Central, Continia Document Capture en Idyn Direct Banking.');

    const robots = seo?.noIndex ? 'noindex, nofollow' : 'index, follow';

    return {
        title,
        description,
        robots,
        alternates: {
            canonical: seo?.canonical || (isEn ? '/en/integraties' : '/integraties'),
        },
    };
}

export default async function IntegrationsPage({
    params,
}: IntegrationsPageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';
    
    // Fetch from Sanity
    const pageData = await getSanityPageData(locale);

    // Helpers
    const getPath = (path: string) => {
        if (locale === 'nl') return path;
        return `/en${path === '/' ? '' : path}`;
    };

    // Blueprint defaults if Sanity content is missing
    const fallbackTitle = isEn ? 'Partners & Software Integrations' : 'Partners & Software Integraties';
    const fallbackTagline = isEn 
        ? 'Connect your property management directly with your financial systems.'
        : 'Verbind uw vastgoedmanagement rechtstreeks met uw financiële systemen.';
    const fallbackIntro = isEn
        ? 'No isolated databases or manual import/export files. Emlinked integrates natively with your Microsoft Dynamics 365 Business Central ERP and market-leading add-ons.'
        : 'Geen losse databases en handmatige import/export bestanden. Emlinked integreert native met uw Microsoft Dynamics 365 Business Central back-office en marktleidende add-ons.';

    const fallbackBlocks = [
        {
            _type: 'integrationsList',
            sectionTitle: isEn ? 'Our Integrations' : 'Onze Koppelingen & Integraties',
            integrations: [
                {
                    title: isEn ? 'Microsoft Dynamics 365 Business Central' : 'Microsoft Dynamics 365 Business Central',
                    badge: isEn ? 'Native Integration' : 'Native Integratie',
                    description: isEn
                        ? 'Emlinked is embedded directly within your Business Central ecosystem. Tenants, leases, invoices, and indexations sync in real-time to your sub-ledgers. 100% audit-compliant.'
                        : 'Emlinked is direct ingebed in uw Business Central omgeving. Huurders, contracten, prolongaties en indexaties worden in realtime gesynchroniseerd naar uw sub-administratie en grootboek. Geen synchronisatiefouten, 100% compliant.',
                    imagePlaceholder: 'BC-Integration-Flowchart.webp',
                    bullets: isEn ? [
                        'Automated Rent Invoicing: Invoices created in Emlinked are pushed directly to G/L journals.',
                        'Real-time Sync: Tenant updates and indexations are mirrored in BC immediately.',
                        'Full Audit Trail: Keep complete records compliant with corporate accounting.'
                    ] : [
                        'Geautomatiseerde Huurfacturatie: Gegenereerde huurfacturen en servicekostenafrekeningen uit emlinked worden direct als openstaande posten ingeschoten in Business Central.',
                        'Realtime Synchronisatie: Wijzigingen in huurdersgegevens, contractmutaties en indexeringen worden direct overgenomen, zodat uw financiële administratie altijd up-to-date is.',
                        'Volledige Audit Trail: Behoud maximale controle met een transparante en foutloze synchronisatie die voldoet aan de strengste accountancy-eisen.'
                    ],
                    link: '/integraties/business-central',
                },
                {
                    title: 'Continia Document Capture',
                    badge: isEn ? 'Invoice Scanning & OCR' : 'Factuurverwerking & OCR',
                    description: isEn
                        ? 'Digitalize incoming cost invoices from contractors and suppliers. Continia scans details via OCR, matches them against Emlinked purchase orders, and records them to the correct property accounts.'
                        : 'Digitaliseer uw inkomende kostenfacturen van leveranciers en aannemers. Continia leest de gegevens via OCR in, matcht ze met uw inkooporders in Emlinked en boekt ze direct op de juiste kostenplaatsen en objecten.',
                    imagePlaceholder: 'Document-Capture-OCR.webp',
                    bullets: isEn ? [
                        'Advanced OCR: Invoices scanned at line level automatically.',
                        'Automatic Matching: Match cost invoices to maintenance tickets inside Emlinked.',
                        'Digital Approval: Routes digital approval cards to managers or owners.'
                    ] : [
                        'Geavanceerde OCR-Herkenning: PDF-facturen worden automatisch uitgelezen op kop- en regelniveau.',
                        'Automatische Matching: Facturen worden direct gekoppeld aan de bijbehorende onderhoudsbon of het actieve exploitatiebudget binnen emlinked.',
                        'Digitaal Goedkeuringsproces: Zet fiatteringsflows op waarbij de juiste beheerder of eigenaar direct via een digitaal portaal akkoord geeft voor betaling.'
                    ],
                    link: '/integraties/document-capture',
                },
                {
                    title: 'Idyn Direct Banking',
                    badge: isEn ? 'Banking Link & PSD2' : 'Telebankieren & PSD2',
                    description: isEn
                        ? 'Connect your bank accounts directly to your property database. Rent payments are auto-reconciled, and outgoing supplier payouts are queued securely inside your banking client in one click.'
                        : 'Sluit uw bankrekening rechtstreeks aan op uw vastgoedadministratie. Huurbetalingen worden automatisch ingelezen en afgeletterd. Betalingen aan leveranciers of servicekosten-afrekeningen zet u met één klik klaar in uw bankportal.',
                    imagePlaceholder: 'Direct-Banking-Matching.webp',
                    bullets: isEn ? [
                        'Automatic Reconciliation: Rent receipts matched to open invoices in real time.',
                        'Batch Payments: Outbound supplier payouts pushed to your bank portal.',
                        'Real-time Cashflow: Secure bank feeds without uploading MT940 files.'
                    ] : [
                        'Automatisch Afletteren: Ontvangen huurbetalingen worden realtime ingelezen en automatisch gematcht met de openstaande huurfacturen op basis van unieke betalingskenmerken.',
                        'Directe Betaalbestanden: Betalingen aan crediteuren, leveranciers of de periodieke afdrachten aan vastgoedeigenaren worden direct klaargezet in uw zakelijke bankomgeving.',
                        'Optimale Cashflow: Altijd direct inzicht in uw actuele liquiditeit en openstaande posten, zonder handmatige bankafschriften (MT940/CAMT) te hoeven uploaden.'
                    ],
                    link: '/integraties/direct-banking',
                }
            ]
        },
        {
            _type: 'ctaBanner',
            title: isEn ? 'Ready to fully automate your real estate ledger?' : 'Wilt u uw vastgoed administratie volledig automatiseren?',
            subtitle: isEn
                ? 'Discover how our integrations drive operational speed. Request a demo with our integration specialists today.'
                : 'Ontdek hoe onze integraties uw operationele efficiëntie direct naar een hoger niveau tillen. Vraag vandaag nog een gerichte demo aan met een van onze integratiespecialisten.',
            buttonLabel: isEn ? 'Request Demo' : 'Demo Aanvragen',
            buttonLink: '/contact',
        }
    ];

    // Combine or fallback
    const title = pageData?.title || fallbackTitle;
    const blocks = pageData?.pageBlocks || fallbackBlocks;

    // Helper to get visual indicator for the right side of the card
    const renderVisualMockup = (placeholder: string) => {
        let icon = <Layers className="h-10 w-10 text-primary" />;
        let titleText = 'Data Pipeline';
        let detail = 'API Sync';

        if (placeholder.includes('BC')) {
            icon = <ArrowLeftRight className="h-10 w-10 text-primary" />;
            titleText = 'Microsoft Dynamics BC';
            detail = 'Native Ledger Integration';
        } else if (placeholder.includes('Capture')) {
            icon = <FileCheck2 className="h-10 w-10 text-primary animate-pulse" />;
            titleText = 'OCR Engine';
            detail = 'Continia Document Extraction';
        } else if (placeholder.includes('Banking')) {
            icon = <Coins className="h-10 w-10 text-primary" />;
            titleText = 'Direct Banking Hub';
            detail = 'PSD2 Automated Reconciliation';
        }

        return (
            <div className="w-full h-56 rounded-xl bg-gradient-to-br from-card to-background border border-border/80 p-5 flex flex-col justify-between shadow-inner relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none" />
                <div className="flex justify-between items-start">
                    <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                        {icon}
                    </div>
                    <span className="text-[9px] bg-primary/10 text-primary font-bold uppercase px-2.5 py-1 rounded-full">
                        {detail}
                    </span>
                </div>
                <div className="space-y-1.5 text-left">
                    <div className="text-xs font-bold text-foreground">{titleText}</div>
                    <div className="w-full bg-muted/40 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-4/5 animate-pulse rounded-full" />
                    </div>
                    <div className="flex justify-between text-[8px] text-muted-foreground font-mono">
                        <span>pipeline: open</span>
                        <span>100% sync rate</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Header */}
            <section className="relative px-6 py-24 bg-radial from-card via-background to-background border-b border-border overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
                </div>
                <div className="mx-auto max-w-4xl text-center flex flex-col gap-6 relative z-10 animate-fadeIn">
                    <span className="inline-flex items-center gap-1.5 self-center rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
                        {isEn ? 'Ecosystem Integrations' : 'Ecosysteem Integraties'}
                    </span>
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
                        {title}
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                        {pageData?.tagline || fallbackTagline}
                    </p>
                    <p className="text-sm text-muted-foreground/85 max-w-2xl mx-auto leading-relaxed">
                        {pageData?.desc || fallbackIntro}
                    </p>
                </div>
            </section>

            {/* Dynamic Blocks */}
            {blocks.map((block: any) => {
                if (block._type === 'integrationsList') {
                    return (
                        <section key={block._key || 'integrations'} className="px-6 py-20 bg-background border-b border-border">
                            <div className="mx-auto max-w-5xl">
                                {block.sectionTitle && (
                                    <h2 className="text-2xl font-bold text-foreground text-center mb-16 font-display uppercase tracking-wide">
                                        {block.sectionTitle}
                                    </h2>
                                )}
                                <div className="flex flex-col gap-20">
                                    {block.integrations.map((integration: any, idx: number) => (
                                        <div 
                                            key={idx}
                                            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center group/card"
                                        >
                                            {/* Content side */}
                                            <div className="md:col-span-7 text-left space-y-4">
                                                <div className="flex items-center gap-3 flex-wrap">
                                                    <h3 className="text-2xl font-bold text-foreground font-display">
                                                        {integration.title}
                                                    </h3>
                                                    {integration.badge && (
                                                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary uppercase tracking-wider">
                                                            {integration.badge}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-muted-foreground leading-relaxed text-sm">
                                                    {integration.description}
                                                </p>
                                                
                                                {/* Bullet Checklist */}
                                                {integration.bullets && integration.bullets.length > 0 && (
                                                    <div className="space-y-2 pt-2">
                                                        {integration.bullets.map((bullet: string, bIdx: number) => (
                                                            <div key={bIdx} className="flex items-start gap-2.5">
                                                                <Check className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                                                                <span className="text-xs text-muted-foreground/90 leading-snug">
                                                                    {bullet}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {integration.link && (
                                                    <div className="pt-3">
                                                        <Link
                                                            href={getPath(integration.link)}
                                                            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover group/link transition-colors"
                                                        >
                                                            {isEn ? 'Learn more' : 'Lees meer'}
                                                            <ArrowRight className="h-3 w-3 group-hover/link:translate-x-1 transition-transform" />
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Visual / Mockup side */}
                                            <div className="md:col-span-5 w-full">
                                                {renderVisualMockup(integration.imagePlaceholder || '')}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    );
                }

                if (block._type === 'ctaBanner') {
                    return (
                        <section key={block._key || 'cta'} className="px-6 py-24 bg-card border-b border-border relative overflow-hidden">
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-primary/5 rounded-full blur-3xl" />
                            </div>
                            <div className="mx-auto max-w-4xl text-center flex flex-col gap-6 relative z-10">
                                <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-display">
                                    {block.title}
                                </h2>
                                <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                                    {block.subtitle}
                                </p>
                                <div className="flex justify-center mt-4">
                                    <Link
                                        href={getPath(block.buttonLink || '/contact')}
                                        className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/95 transition-all text-center flex-row gap-2 cursor-pointer group"
                                    >
                                        {block.buttonLabel || (isEn ? 'Contact us' : 'Neem contact op')}
                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </section>
                    );
                }

                return null;
            })}
        </div>
    );
}
