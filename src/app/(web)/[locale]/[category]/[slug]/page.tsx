import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
    CheckCircle2,
    ArrowRight,
    Building2,
    Users,
    CreditCard,
    ShieldCheck,
    Zap,
    BarChart3,
    Bell,
    FileText,
    RefreshCw,
    Star,
    ChevronDown,
    Link2,
    CalendarCheck,
    Database,
} from 'lucide-react';
import { SolutionSimulators } from '@/components/SolutionSimulators';
import { sanityFetch } from '@/lib/sanity';
import { DataGridCanvas } from '@/components/ui/data-grid-canvas';
import { HeroSection } from '@/components/blocks/HeroSection';
import { buildMetadata, DEFAULT_DOMAIN } from '@/lib/seo';
import { VastgoedbeheerSoftwareModule } from '@/components/blocks/VastgoedbeheerSoftwareModule';
import { HuurdersportaalModule } from '@/components/blocks/HuurdersportaalModule';
import { PaymentSoftwareModule } from '@/components/blocks/PaymentSoftwareModule';

const IconMap: Record<string, React.ElementType> = {
    Building2,
    Users,
    CreditCard,
    ShieldCheck,
    Zap,
    BarChart3,
    Bell,
    FileText,
    RefreshCw,
    Star,
    ChevronDown,
    Link2,
    CalendarCheck,
    Database,
};

interface SolutionPageProps {
    params: Promise<{ locale: string; category: string; slug: string }>;
}

type SolutionContent = (typeof solutionsContent.nl)['vastgoedbeheer-software'];

async function getSolutionContent(locale: string, slug: string): Promise<any> {
    const normalizedSlug = slug === 'payment-software' ? 'payment' : slug;
    try {
        const query = `*[_type == "solutionPage" && language == $locale && (
            slug.current == $slug || 
            slug.current == $normSlug || 
            slug.current == $slashSlug || 
            slug.current == $slashNormSlug ||
            slug.current == $appsSlug ||
            slug.current == $slashAppsSlug
        )][0]`;
        const doc = await sanityFetch<any>({
            query,
            params: {
                locale,
                slug,
                normSlug: normalizedSlug,
                slashSlug: `/${slug}`,
                slashNormSlug: `/${normalizedSlug}`,
                appsSlug: `apps/${slug}`,
                slashAppsSlug: `/apps/${slug}`,
            },
        });

        if (doc) {
            return {
                ...doc,
                meta: {
                    seoTitle: doc.seo?.seoTitle || doc.seo?.title || doc.title,
                    seoDescription:
                        doc.seo?.seoDescription ||
                        doc.seo?.description ||
                        doc.tagline ||
                        '',
                    canonical: doc.seo?.canonical,
                    ogImage: doc.seo?.ogImage,
                    noIndex: doc.seo?.noIndex,
                },
                badge: doc.badge,
                heroIcon:
                    typeof doc.heroIcon === 'string'
                        ? doc.heroIcon
                        : 'Building2',
                title: doc.title,
                tagline: doc.tagline,
                description: doc.description,
                desc: doc.description,
                benefits: doc.benefits || [],
                features: (doc.features || []).map((f: any) => ({
                    iconName: typeof f.icon === 'string' ? f.icon : 'Zap',
                    icon: IconMap[f.icon] || FileText,
                    title: f.title,
                    text: f.text,
                })),
                proof: doc.proof || [],
                workflow: (doc.workflow || []).map((w: any) => ({
                    step: w.step,
                    iconName:
                        typeof w.icon === 'string' ? w.icon : 'CheckCircle2',
                    icon: IconMap[w.icon] || CheckCircle2,
                    title: w.title,
                    desc: w.desc,
                })),
                faq: doc.faq || [],
                relatedModules: (doc.relatedModules || []).map((m: any) => {
                    let modIconName = 'Link2';
                    if (m.slug === 'huurdersportaal') modIconName = 'Users';
                    if (m.slug === 'payment' || m.slug === 'payment-software')
                        modIconName = 'CreditCard';
                    if (m.slug === 'vastgoedbeheer-software')
                        modIconName = 'Building2';
                    return {
                        slug: m.slug,
                        iconName: modIconName,
                        icon: IconMap[modIconName] || Link2,
                        title: m.title,
                        desc: m.desc,
                    };
                }),
                simulatorTitle: doc.simulatorTitle,
                simulatorDesc: doc.simulatorDesc,
                cta: doc.cta || {
                    title: '',
                    desc: '',
                    primary: '',
                    secondary: '',
                },
            };
        }
    } catch (e) {
        console.error('Failed to fetch from Sanity:', e);
    }

    // Fallback to static content
    const localeContent =
        solutionsContent[locale as 'nl' | 'en'] || solutionsContent.nl;
    return (
        (localeContent as any)[slug] ||
        (localeContent as any)[normalizedSlug] ||
        null
    );
}

export async function generateMetadata({
    params,
}: SolutionPageProps): Promise<Metadata> {
    const { locale, category, slug } = await params;

    // Category routing validation
    const validCategories = ['apps', 'oplossingen', 'solutions'];
    if (!validCategories.includes(category)) return {};

    const content = await getSolutionContent(locale, slug);

    if (!content) return {};

    const fallbackTitle = content.title
        ? `${content.title} — Emlinked`
        : 'Emlinked Vastgoedbeheer Software';
    const fallbackDesc =
        content.desc ||
        content.tagline ||
        'Professionele vastgoedbeheer software native in Microsoft Business Central.';
    const canonicalUrl = `${DEFAULT_DOMAIN}${locale === 'en' ? `/en/apps/${slug}` : `/apps/${slug}`}`;

    return buildMetadata({
        seo: content.meta,
        fallbackTitle,
        fallbackDescription: fallbackDesc,
        canonicalUrl,
        locale,
    });
}

const solutionsContent = {
    nl: {
        'vastgoedbeheer-software': {
            meta: {
                title: 'Vastgoedbeheer Software — Automatiseer je Portefeuillebeheer',
                description:
                    'Beheer je commercieel vastgoed efficiënter met Emlinked. Automatische CPI-indexatie, huurprolongatie en realtime dashboards. Geïntegreerd met Business Central.',
                keywords:
                    'vastgoedbeheer software, commercieel vastgoed, portefeuillebeheer, CPI indexatie, huurprolongatie, Business Central vastgoed',
            },
            badge: 'Core SaaS Module',
            heroIcon: Building2,
            title: 'Vastgoedbeheer Software',
            tagline:
                'Jouw volledige vastgoedportefeuille — één platform, volledig in controle.',
            desc: 'Emlinked automatiseert alles van CPI-indexatie tot kwartaalfacturatie, zodat jij je tijd spendeert aan wat écht telt: groeien met jouw portefeuille. Natively geïntegreerd met Microsoft Dynamics 365 Business Central.',
            benefits: [
                'Geen handmatige huurverhogingen meer — CPI indexatie in één klik',
                'Automatische factuurverzending per e-mail of via portaal',
                'Realtime inzicht in rendement, leegstand en openstaande balansen',
                'Volledige audittrail per object, huurder en contract',
                'Schaalbaar van 10 tot 10.000 verhuurbare eenheden',
            ],
            features: [
                {
                    icon: Zap,
                    title: 'Automatische CPI Indexatie',
                    text: 'Indexeer al jouw huurprijzen op basis van de actuele CPI-cijfers (CBS) met één klik. Emlinked berekent automatisch de nieuwe huurprijs, genereert de aankondigingsbrief en verstuurt de notificatie per e-mail — zonder handmatig werk.',
                },
                {
                    icon: FileText,
                    title: 'Huurprolongatie & Facturatie',
                    text: 'Genereer en verstuur maandelijkse of kwartaalfacturen volledig automatisch. Emlinked koppelt elke factuur aan het juiste object, contract en grootboekrekening in Business Central. Geen enkel handmatig boekingswerk.',
                },
                {
                    icon: BarChart3,
                    title: 'Rendement Dashboards',
                    text: 'Realtime overzicht van je volledige portefeuille: bruto- en nettorendement per object, leegstand, openstaande debiteuren en vervaldata van contracten. Exporteer met één klik naar Excel of PDF voor je investeerdersrapportage.',
                },
            ],
            proof: [
                { stat: '87%', label: 'Tijdsbesparing bij indexaties' },
                { stat: '< 2 min', label: 'Van ontvangst naar boeking' },
                { stat: '100%', label: 'Afletter-nauwkeurigheid' },
            ],
            workflow: [
                {
                    step: '01',
                    icon: Link2,
                    title: 'Koppel je portefeuille',
                    desc: 'Importeer je bestaande objecten, huurcontracten en huurders via onze gestructureerde CSV-import of koppel direct vanuit Business Central. Eenmalig opzetten, daarna volledig automatisch.',
                },
                {
                    step: '02',
                    icon: CalendarCheck,
                    title: 'Automatiseer je processen',
                    desc: "Stel indexatieregels, facturatieschema's en betalingstermijnen in. Emlinked voert ze automatisch uit op de juiste datum — inclusief notificaties naar huurders en boekingen in Business Central.",
                },
                {
                    step: '03',
                    icon: Database,
                    title: 'Stuur op data',
                    desc: 'Volg rendement, leegstand en openstaande balansen realtime in je dashboard. Exporteer portefeuillerapporten naar Excel of PDF voor je investeerders, financiers of toezichthouders.',
                },
            ],
            faq: [
                {
                    q: 'Werkt Emlinked ook voor gemengde portefeuilles (wonen + commercieel)?',
                    a: 'Ja. Emlinked beheert zowel commercieel vastgoed (kantoren, winkels, bedrijfspanden) als woningportefeuilles. Je kunt per object het huurregime en de indexatiemethode instellen — CPI voor vrije sector, wettelijk voor sociale huur.',
                },
                {
                    q: 'Hoe lang duurt de implementatie?',
                    a: 'De gemiddelde onboarding duurt 2 tot 4 weken, afhankelijk van de grootte van je portefeuille. Ons implementatieteam begeleidt je bij de dataimport, Business Central koppeling en eerste gebruikerstest.',
                },
                {
                    q: 'Is Emlinked gekoppeld aan Microsoft Dynamics 365 Business Central?',
                    a: 'Ja, Emlinked is natively gebouwd op Business Central. Alle huurcontracten, facturen, betalingen en boekingen zijn volledig gesynchroniseerd met je Business Central omgeving — geen dubbele invoer, geen tussenliggende koppelingen.',
                },
                {
                    q: 'Kan ik Emlinked ook gebruiken als ik geen accountant in dienst heb?',
                    a: 'Absoluut. Emlinked automatiseert de financiële processen zodanig dat je voor dagelijkse huuroperaties geen boekhoudkundige kennis nodig hebt. Alle boekingen, afletter- en grootboekposten worden automatisch aangemaakt.',
                },
                {
                    q: 'Hoe zit het met AVG en gegevensbeveiliging?',
                    a: 'Emlinked is AVG-compliant en verwerkt alle data op Europese servers (EU-only hosting). Toegang is rolgebaseerd (RBAC), alle communicatie verloopt via TLS 1.3 en data-at-rest is versleuteld.',
                },
            ],
            relatedModules: [
                {
                    slug: 'huurdersportaal',
                    icon: Users,
                    title: 'Huurdersportaal',
                    desc: 'Geef je huurders een self-service portaal voor storingen, documenten en berichten.',
                },
                {
                    slug: 'payment',
                    icon: CreditCard,
                    title: 'Payment Software',
                    desc: 'Automatiseer huurincasso, bankaflettering en gesplitste eigenaarafdrachten.',
                },
            ],
            simulatorTitle: 'Bereken jouw indexatie',
            simulatorDesc:
                'Probeer de CPI-indexatiecalculator. Vul de huidige huurprijs en het CPI-percentage in en zie direct de nieuwe huurprijs, het financiële verschil én de automatisch gegenereerde notificatiebrief.',
            cta: {
                title: 'Klaar om jouw portefeuillebeheer te automatiseren?',
                desc: 'Plan een vrijblijvende demo en laat je zien hoe Emlinked jouw vastgoedbeheer proces volledig digitaliseert — van contract tot betaling.',
                primary: 'Demo aanvragen',
                secondary: 'Bekijk alle modules',
            },
        },
        huurdersportaal: {
            meta: {
                title: 'Huurdersportaal — Self-Service voor jouw Huurders',
                description:
                    'Geef jouw huurders een modern digitaal portaal voor storingsmeldingen, facturen en contracten. Minder telefoontjes, meer tevredenheid.',
                keywords:
                    'huurdersportaal, huurder self-service, storingsmeldingen software, huurder communicatie platform, digitaal vastgoedbeheer',
            },
            badge: 'Huurder Engagement',
            heroIcon: Users,
            title: 'Huurdersportaal',
            tagline:
                'Minder telefoontjes. Tevreden huurders. Meer tijd voor jouw beheer.',
            desc: 'Het Emlinked Huurdersportaal geeft jouw huurders 24/7 self-service toegang tot hun documenten, facturen en onderhoudsmeldingen — direct gesynchroniseerd met jouw back-office. Minder administratieve druk, hogere huurder tevredenheid.',
            benefits: [
                'Huurders melden storingen zelf — jij ontvangt ze meteen in jouw dashboard',
                'Online inzage in huurcontracten, servicekosten en huisregels',
                'Directe berichtgeving naar individuele huurders of complete objecten',
                'Automatische statusupdates per ticket — geen opvolgmails meer',
                'Volledig branded naar jouw vastgoedbeheer organisatie',
            ],
            features: [
                {
                    icon: Bell,
                    title: 'Storingen & Onderhoud',
                    text: "Huurders dienen via het portaal storingsmeldingen in met omschrijving en foto's. De melding verschijnt direct in jouw ticketoverzicht, inclusief prioriteit en categorie. Jij werkt het ticket af — de huurder ontvangt automatisch statusupdates.",
                },
                {
                    icon: FileText,
                    title: 'Documenten & Contracten',
                    text: 'Bied jouw huurders 24/7 veilige toegang tot alle relevante documenten: huurovereenkomst, splitsingsakte, huisregels en de jaarlijkse servicekostenafrekening. Geen PDF-verzoeken meer per e-mail.',
                },
                {
                    icon: RefreshCw,
                    title: 'Directe Communicatie',
                    text: 'Stuur gerichte berichten naar individuele huurders of naar alle huurders van een object — bijvoorbeeld bij gepland onderhoud of calamiteiten. Berichten worden bijgehouden in het dossier van de huurder.',
                },
            ],
            proof: [
                { stat: '60%', label: 'Minder telefonische vragen' },
                { stat: '4.7★', label: 'Gemiddelde huurder tevredenheid' },
                { stat: '< 5 min', label: 'Onboarding per huurder' },
            ],
            simulatorTitle: 'Probeer het ticketportaal',
            simulatorDesc:
                'Ervaar hoe jouw huurders storingen indienen. Dien een testmelding in en zie direct hoe deze in jouw beheer dashboard verschijnt — inclusief realtime statuswijzigingen.',
            cta: {
                title: 'Geef jouw huurders een premium service-ervaring',
                desc: 'Plan een demo en ontdek hoe je met het Emlinked Huurdersportaal de communicatie met jouw huurders volledig digitaliseert.',
                primary: 'Demo aanvragen',
                secondary: 'Bekijk alle modules',
            },
        },
        payment: {
            meta: {
                title: 'Payment Software — Automatische Huurincasso & Bankaflettering',
                description:
                    'Automatiseer jouw huurincasso, bankaflettering en betalingsopvolging met Emlinked Pay. PSD2 bankkoppeling, gesplitste eigenaarafdrachten en Business Central integratie.',
                keywords:
                    'huurincasso software, automatische bankaflettering, PSD2 vastgoed, split payments vastgoed, Business Central betaling, SEPA incasso',
            },
            badge: 'Emlinked Pay',
            heroIcon: CreditCard,
            title: 'Payment Software',
            tagline:
                'Van huurontvangst tot grootboekboeking — volledig automatisch.',
            desc: 'Emlinked Pay verbindt jouw bank via PSD2 of Direct Banking. Huurbetalingen worden real-time herkend, automatisch afgeletterd op de juiste debiteur en direct geboekt in Business Central. Gesplitste afdrachten naar meerdere eigenaren inclusief.',
            benefits: [
                'PSD2 en Direct Banking koppeling — bankafschriften automatisch ingelezen',
                'Real-time aflettering op huurder, object en contract',
                'Automatische incassofailures opvolging met aanmaningsflows',
                'Split payments: automatische verdeling over eigenaren en beheervergoeding',
                'Volledige integratie in Business Central grootboek',
            ],
            features: [
                {
                    icon: ShieldCheck,
                    title: 'PSD2 Bankkoppeling',
                    text: 'Verbind jouw zakelijke bankrekening veilig via PSD2 of Direct Banking. Bankafschriften worden automatisch dagelijks gesynchroniseerd. Emlinked herkent huurbetalingen op basis van betalingskenmerk en letert ze automatisch af op het openstaande saldo van de huurder.',
                },
                {
                    icon: RefreshCw,
                    title: 'Mislukte Incasso Opvolging',
                    text: 'Wanneer een incasso storneerd of een betaling uitblijft, start Emlinked automatisch de aanmaningsflow. Herinneringen, formele aanmaningen en escalaties worden verstuurd conform jouw eigen beleid — volledig gedocumenteerd in het huurdersdossier.',
                },
                {
                    icon: BarChart3,
                    title: 'Split Payments & Eigenaarafdrachten',
                    text: 'Definieer per object een verdeelsleutel: beheervergoeding, eigenaar A, eigenaar B. Zodra een huurbetaling binnenkomt, verdeelt Emlinked het bedrag automatisch en boekt elke afdracht op de juiste grootboekrekening. Geen handmatige verdeelberekeningen meer.',
                },
            ],
            proof: [
                { stat: '100%', label: 'Automatische afletter-nauwkeurigheid' },
                { stat: '3 sec', label: 'Van betaling naar boeking' },
                { stat: '€0', label: 'Handmatig afletter-werk' },
            ],
            simulatorTitle: 'Simuleer een gesplitste betaling',
            simulatorDesc:
                'Vul een ontvangen huursom in, configureer de verdeelsleutel tussen eigenaren en beheervergoeding, en zie direct hoe Emlinked de betaling automatisch boekt in het Business Central grootboek.',
            cta: {
                title: 'Stop met handmatig bankieren. Start met Emlinked Pay.',
                desc: 'Ontdek in een persoonlijke demo hoe Emlinked Pay jouw gehele betalingsproces automatiseert — van PSD2 koppeling tot grootboekboeking.',
                primary: 'Demo aanvragen',
                secondary: 'Bekijk alle modules',
            },
        },
    },
    en: {
        'vastgoedbeheer-software': {
            meta: {
                title: 'Property Management Software — Automate your Portfolio',
                description:
                    'Manage your commercial real estate portfolio with Emlinked. Automate CPI indexation, rent invoicing and get real-time yield dashboards. Native Business Central integration.',
                keywords:
                    'property management software, commercial real estate, portfolio management, CPI indexation, Business Central property',
            },
            badge: 'Core SaaS Module',
            heroIcon: Building2,
            title: 'Property Management Software',
            tagline:
                'Your entire property portfolio — one platform, complete control.',
            desc: 'Emlinked automates everything from CPI indexation to quarterly invoicing, so you spend your time growing your portfolio — not managing spreadsheets. Natively integrated with Microsoft Dynamics 365 Business Central.',
            benefits: [
                'No more manual rent increases — CPI indexation in one click',
                'Automatic invoice delivery via email or tenant portal',
                'Real-time visibility into yield, vacancy, and open balances',
                'Full audit trail per property, tenant, and contract',
                'Scales from 10 to 10,000 leasable units',
            ],
            features: [
                {
                    icon: Zap,
                    title: 'Automatic CPI Indexation',
                    text: 'Index all your rents against current CPI figures with one click. Emlinked calculates the new rent, generates the notice letter, and sends the notification email automatically — no manual steps.',
                },
                {
                    icon: FileText,
                    title: 'Rent Invoicing & Prolongation',
                    text: 'Generate and deliver monthly or quarterly rent invoices fully automatically. Emlinked maps every invoice to the correct property, contract, and G/L account in Business Central — zero manual bookkeeping.',
                },
                {
                    icon: BarChart3,
                    title: 'Yield & Portfolio Dashboards',
                    text: 'Real-time overview of your entire portfolio: gross and net yield per property, vacancy, open receivables, and contract expiry dates. Export to Excel or PDF for your investor reporting.',
                },
            ],
            proof: [
                { stat: '87%', label: 'Time saved on indexation' },
                { stat: '< 2 min', label: 'From receipt to booking' },
                { stat: '100%', label: 'Reconciliation accuracy' },
            ],
            workflow: [
                {
                    step: '01',
                    icon: Link2,
                    title: 'Connect your portfolio',
                    desc: 'Import your properties, lease contracts and tenants via our structured CSV import or connect directly from Business Central. One-time setup, fully automated from there.',
                },
                {
                    step: '02',
                    icon: CalendarCheck,
                    title: 'Automate your processes',
                    desc: 'Configure indexation rules, invoicing schedules and payment terms. Emlinked executes them automatically on the correct date — including tenant notifications and Business Central postings.',
                },
                {
                    step: '03',
                    icon: Database,
                    title: 'Manage by data',
                    desc: 'Track yield, vacancy and open balances in real-time in your dashboard. Export portfolio reports to Excel or PDF for your investors, lenders or supervisory boards.',
                },
            ],
            faq: [
                {
                    q: 'Does Emlinked work for mixed portfolios (residential + commercial)?',
                    a: 'Yes. Emlinked manages both commercial real estate (offices, retail, industrial) and residential portfolios. You can configure the lease type and indexation method per property.',
                },
                {
                    q: 'How long does implementation take?',
                    a: 'Average onboarding takes 2 to 4 weeks, depending on your portfolio size. Our implementation team guides you through data import, Business Central connection and initial user testing.',
                },
                {
                    q: 'Is Emlinked integrated with Microsoft Dynamics 365 Business Central?',
                    a: 'Yes, Emlinked is natively built on Business Central. All lease contracts, invoices, payments and ledger postings are fully synchronised with your Business Central environment — no double entry, no middleware.',
                },
                {
                    q: 'Can I use Emlinked without an in-house accountant?',
                    a: 'Absolutely. Emlinked automates financial processes so that for daily rental operations you need no accounting knowledge. All postings, reconciliations and ledger entries are created automatically.',
                },
                {
                    q: 'How does Emlinked handle data security and GDPR?',
                    a: 'Emlinked is GDPR-compliant and processes all data on European servers (EU-only hosting). Access is role-based (RBAC), all communication runs over TLS 1.3 and data-at-rest is encrypted.',
                },
            ],
            relatedModules: [
                {
                    slug: 'huurdersportaal',
                    icon: Users,
                    title: 'Tenant Portal',
                    desc: 'Give your tenants a self-service portal for maintenance, documents and messages.',
                },
                {
                    slug: 'payment',
                    icon: CreditCard,
                    title: 'Payment Software',
                    desc: 'Automate rent collection, bank reconciliation and split owner distributions.',
                },
            ],
            simulatorTitle: 'Calculate your indexation',
            simulatorDesc:
                'Try the CPI indexation calculator. Fill in the current rent and CPI percentage and instantly see the new rent, the financial delta, and the auto-generated tenant notification.',
            cta: {
                title: 'Ready to automate your property management?',
                desc: 'Schedule a free demo and see how Emlinked fully digitalises your property management process — from contract to payment.',
                primary: 'Request a Demo',
                secondary: 'View all modules',
            },
        },
        huurdersportaal: {
            meta: {
                title: 'Tenant Portal — Self-Service for your Tenants',
                description:
                    'Give your tenants a modern digital portal for maintenance requests, invoices, and contracts. Fewer calls, higher satisfaction.',
                keywords:
                    'tenant portal, tenant self-service, maintenance ticket software, tenant communication platform, digital property management',
            },
            badge: 'Tenant Engagement',
            heroIcon: Users,
            title: 'Tenant Portal',
            tagline:
                'Fewer calls. Happier tenants. More time for your property management.',
            desc: 'The Emlinked Tenant Portal gives your tenants 24/7 self-service access to their documents, invoices, and maintenance tickets — directly synchronised with your back office. Less admin pressure, higher tenant satisfaction.',
            benefits: [
                'Tenants report issues themselves — you receive them instantly in your dashboard',
                'Online access to lease agreements, service costs, and house rules',
                'Direct messaging to individual tenants or entire buildings',
                'Automatic status updates per ticket — no follow-up emails needed',
                'Fully branded to your property management organisation',
            ],
            features: [
                {
                    icon: Bell,
                    title: 'Maintenance & Tickets',
                    text: 'Tenants submit maintenance requests via the portal with descriptions and photos. The request instantly appears in your ticket overview with priority and category. You resolve the ticket — the tenant automatically receives status updates.',
                },
                {
                    icon: FileText,
                    title: 'Documents & Contracts',
                    text: 'Give your tenants 24/7 secure access to all relevant documents: lease agreement, building rules, and annual service cost statements. No more PDF requests by email.',
                },
                {
                    icon: RefreshCw,
                    title: 'Direct Communication',
                    text: 'Send targeted messages to individual tenants or all tenants in a property — for planned maintenance or emergencies. Messages are tracked in the tenant record.',
                },
            ],
            proof: [
                { stat: '60%', label: 'Fewer inbound calls' },
                { stat: '4.7★', label: 'Average tenant satisfaction' },
                { stat: '< 5 min', label: 'Tenant onboarding time' },
            ],
            simulatorTitle: 'Try the ticket portal',
            simulatorDesc:
                'Experience how your tenants submit maintenance requests. Submit a test ticket and watch it appear instantly in your admin dashboard — including live status changes.',
            cta: {
                title: 'Give your tenants a premium service experience',
                desc: 'Schedule a demo and discover how the Emlinked Tenant Portal fully digitalises your tenant communication.',
                primary: 'Request a Demo',
                secondary: 'View all modules',
            },
        },
        payment: {
            meta: {
                title: 'Payment Software — Automated Rent Collection & Reconciliation',
                description:
                    'Automate your rent collection, bank reconciliation, and payment follow-up with Emlinked Pay. PSD2 banking link, split payments, and Business Central integration.',
                keywords:
                    'rent collection software, bank reconciliation, PSD2 real estate, split payments property, Business Central payments, SEPA direct debit',
            },
            badge: 'Emlinked Pay',
            heroIcon: CreditCard,
            title: 'Payment Software',
            tagline: 'From rent receipt to ledger posting — fully automated.',
            desc: 'Emlinked Pay connects your bank via PSD2 or Direct Banking. Rent payments are recognised in real-time, automatically reconciled to the correct tenant, and posted directly in Business Central. Split payments to multiple owners included.',
            benefits: [
                'PSD2 and Direct Banking connection — bank statements auto-imported',
                'Real-time reconciliation per tenant, property, and contract',
                'Automated collection failure follow-up with dunning flows',
                'Split payments: automatic distribution to owners and management fee',
                'Full integration in Business Central general ledger',
            ],
            features: [
                {
                    icon: ShieldCheck,
                    title: 'PSD2 Banking Connection',
                    text: 'Securely connect your business bank account via PSD2 or Direct Banking. Bank statements are automatically synchronised daily. Emlinked recognises rent payments by payment reference and reconciles them automatically against the open tenant balance.',
                },
                {
                    icon: RefreshCw,
                    title: 'Failed Collection Follow-up',
                    text: 'When a direct debit fails or a payment is overdue, Emlinked automatically starts the dunning flow. Reminders, formal notices, and escalations are sent according to your own policy — fully documented in the tenant file.',
                },
                {
                    icon: BarChart3,
                    title: 'Split Payments & Owner Distributions',
                    text: 'Define a distribution key per property: management fee, Owner A, Owner B. As soon as a rent payment arrives, Emlinked automatically splits the amount and posts each distribution to the correct G/L account — no manual calculations.',
                },
            ],
            proof: [
                { stat: '100%', label: 'Reconciliation accuracy' },
                { stat: '3 sec', label: 'From payment to posting' },
                { stat: '€0', label: 'Manual reconciliation work' },
            ],
            simulatorTitle: 'Simulate a split payment',
            simulatorDesc:
                'Enter an incoming rent amount, configure the distribution key between owners and management fee, and see instantly how Emlinked books the payment in the Business Central ledger.',
            cta: {
                title: 'Stop manual banking. Start with Emlinked Pay.',
                desc: 'Discover in a personal demo how Emlinked Pay automates your entire payment process — from PSD2 connection to ledger posting.',
                primary: 'Request a Demo',
                secondary: 'View all modules',
            },
        },
    },
} as const;

export default async function SolutionPage({ params }: SolutionPageProps) {
    const { locale, category, slug } = await params;

    // Category routing validation
    const validCategories = ['apps', 'oplossingen', 'solutions'];
    if (!validCategories.includes(category)) notFound();

    const content = await getSolutionContent(locale, slug);

    if (!content) {
        notFound();
    }

    const isEn = locale === 'en';

    const safeDoc = JSON.parse(
        JSON.stringify(content, (key, value) =>
            typeof value === 'function' ? undefined : value,
        ),
    );

    if (
        slug === 'vastgoedbeheer-software' ||
        slug === 'property-management-software'
    ) {
        return <VastgoedbeheerSoftwareModule doc={safeDoc} locale={locale} />;
    }

    if (
        slug === 'huurdersportaal' ||
        slug === 'tenant-portal' ||
        slug === '/apps/huurdersportaal'
    ) {
        return <HuurdersportaalModule doc={safeDoc} locale={locale} />;
    }

    if (slug === 'payment-software' || slug === '/apps/payment-software') {
        return <PaymentSoftwareModule doc={safeDoc} locale={locale} />;
    }

    return (
        <div className='flex flex-col min-h-screen'>
            {/* Hero Section */}
            <HeroSection
                label={content.badge}
                title={content.title}
                subtitle={content.tagline}
                ctaLabel={content.cta?.primary}
                ctaLink='/contact'
                secondaryCtaLabel={content.cta?.secondary}
                secondaryCtaLink={`/${category}`}
                locale={locale}
            />

            {/* ── Social Proof Stats Band ──────────────────────────────── */}
            <section className='border-b border-black/20 bg-muted/30'>
                <div className='mx-auto max-w-5xl px-6 py-10'>
                    <div className='grid grid-cols-3 divide-x divide-border'>
                        {content.proof.map((item: any, idx: number) => (
                            <div key={idx} className='text-center px-4'>
                                <div className='text-2xl sm:text-3xl font-bold text-foreground'>
                                    {item.stat}
                                </div>
                                <div className='text-xs text-muted-foreground mt-1'>
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Benefits Checklist ───────────────────────────────────── */}
            <section className='px-6 py-16 bg-background border-b border-black/20'>
                <div className='mx-auto max-w-5xl'>
                    <h2 className='text-2xl font-bold text-foreground mb-8 text-center'>
                        {isEn
                            ? 'Everything included, out of the box'
                            : 'Alles inbegrepen, direct gebruiksklaar'}
                    </h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 max-w-3xl mx-auto'>
                        {content.benefits.map((b: any, idx: number) => (
                            <div key={idx} className='flex items-start gap-3'>
                                <CheckCircle2 className='h-4 w-4 text-primary mt-0.5 shrink-0' />
                                <span className='text-sm text-muted-foreground leading-snug'>
                                    {b}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Feature Cards ────────────────────────────────────────── */}
            <section className='px-6 py-20 bg-card border-b border-black/20'>
                <div className='mx-auto max-w-5xl'>
                    <h2 className='text-2xl font-bold text-foreground mb-2 text-center'>
                        {isEn ? 'Core features' : 'Kernfunctionaliteiten'}
                    </h2>
                    <p className='text-sm text-muted-foreground text-center mb-12 max-w-xl mx-auto'>
                        {isEn
                            ? 'A closer look at what makes Emlinked the smartest choice for your portfolio.'
                            : 'Een dieper blik op wat Emlinked de slimste keuze maakt voor jouw portefeuille.'}
                    </p>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        {content.features.map((feature: any, idx: number) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={idx}
                                    className='p-6 rounded-xl border border-black/20 bg-background flex flex-col gap-4 hover:shadow-md hover:border-primary/30 transition-all group'
                                >
                                    <div className='h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/15 transition-colors'>
                                        <Icon className='h-5 w-5' />
                                    </div>
                                    <h3 className='text-base font-bold text-foreground'>
                                        {feature.title}
                                    </h3>
                                    <p className='text-sm text-muted-foreground leading-relaxed'>
                                        {feature.text}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── How It Works (Workflow) ───────────────────────────────── */}
            {'workflow' in content && (
                <section className='px-6 py-20 bg-background border-b border-black/20'>
                    <div className='mx-auto max-w-5xl'>
                        <h2 className='text-2xl font-bold text-foreground mb-2 text-center'>
                            {isEn ? 'How it works' : 'Hoe werkt het?'}
                        </h2>
                        <p className='text-sm text-muted-foreground text-center mb-14 max-w-xl mx-auto'>
                            {isEn
                                ? 'From first setup to full automation in three clear steps.'
                                : 'Van eerste opzet tot volledige automatisering in drie duidelijke stappen.'}
                        </p>
                        <div className='relative'>
                            {/* connector line */}
                            <div className='hidden md:block absolute top-10 left-0 right-0 h-px bg-border mx-[14%]' />
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                                {(
                                    content as unknown as {
                                        workflow: {
                                            step: string;
                                            icon: React.ElementType;
                                            title: string;
                                            desc: string;
                                        }[];
                                    }
                                ).workflow.map((step, idx) => {
                                    const StepIcon = step.icon;
                                    return (
                                        <div
                                            key={idx}
                                            className='flex flex-col items-center text-center gap-4 relative z-10'
                                        >
                                            <div className='h-20 w-20 rounded-full bg-primary/10 border-4 border-background flex flex-col items-center justify-center gap-1 shadow-sm'>
                                                <StepIcon className='h-6 w-6 text-primary' />
                                                <span className='text-[9px] font-bold text-primary/60 tracking-widest'>
                                                    {step.step}
                                                </span>
                                            </div>
                                            <h3 className='font-bold text-foreground text-base'>
                                                {step.title}
                                            </h3>
                                            <p className='text-sm text-muted-foreground leading-relaxed max-w-xs'>
                                                {step.desc}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ── FAQ ──────────────────────────────────────────────────── */}
            {'faq' in content && (
                <section className='px-6 py-20 bg-card border-b border-black/20'>
                    <div className='mx-auto max-w-3xl'>
                        <h2 className='text-2xl font-bold text-foreground mb-2 text-center'>
                            {isEn
                                ? 'Frequently asked questions'
                                : 'Veelgestelde vragen'}
                        </h2>
                        <p className='text-sm text-muted-foreground text-center mb-12 max-w-xl mx-auto'>
                            {isEn
                                ? 'Everything you need to know before you get started.'
                                : 'Alles wat je wilt weten voordat je begint.'}
                        </p>
                        <div className='flex flex-col divide-y divide-border'>
                            {(
                                content as unknown as {
                                    faq: { q: string; a: string }[];
                                }
                            ).faq.map((item, idx) => (
                                <details
                                    key={idx}
                                    className='group py-5 cursor-pointer list-none [&::marker]:hidden'
                                >
                                    <summary className='flex items-center justify-between gap-4 font-semibold text-sm text-foreground select-none'>
                                        {item.q}
                                        <ChevronDown className='h-4 w-4 text-muted-foreground shrink-0 group-open:rotate-180 transition-transform duration-200' />
                                    </summary>
                                    <p className='mt-3 text-sm text-muted-foreground leading-relaxed'>
                                        {item.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Interactive Simulator ────────────────────────────────── */}
            <section className='px-6 py-20 bg-background border-b border-black/20'>
                <div className='mx-auto max-w-5xl text-center mb-4'>
                    <span className='inline-flex items-center gap-1.5 rounded-full bg-amber/10 px-3 py-1 text-xs font-semibold tracking-wide text-amber mb-4'>
                        <Star className='h-3 w-3' />
                        {isEn ? 'Interactive Demo' : 'Interactieve Demo'}
                    </span>
                    <h2 className='text-2xl font-bold text-foreground mb-2'>
                        {content.simulatorTitle}
                    </h2>
                    <p className='text-sm text-muted-foreground max-w-2xl mx-auto'>
                        {content.simulatorDesc}
                    </p>
                </div>
                <SolutionSimulators locale={locale} slug={slug} />
            </section>

            {/* ── Related Modules / 3-Apps Suite Grid ─────────────────────── */}
            <section className='px-6 py-20 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] dark:bg-navy-dark border-t border-b border-amber/15 relative z-10'>
                <div className='max-w-7xl mx-auto space-y-10'>
                    <div className='text-center max-w-3xl mx-auto space-y-3'>
                        <div className='flex justify-center mb-1'>
                            <span className='inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/15 px-4.5 py-1.5 text-xs font-mono font-bold tracking-wider text-amber uppercase backdrop-blur-md shadow-xs'>
                                <span className='w-2 h-2 rounded-full bg-amber shrink-0' />
                                {isEn
                                    ? 'DE MODULAIRE SUITE'
                                    : 'DE MODULAIRE SUITE'}
                            </span>
                        </div>
                        <h2 className='font-display font-bold text-3xl md:text-4xl lg:text-[2.5rem]/12 tracking-tight text-[#060e32] dark:text-white'>
                            {isEn
                                ? 'Discover all 3 integrated property apps'
                                : 'Ontdek de 3 geïntegreerde vastgoedbeheer apps'}
                        </h2>
                        <p className='text-sm sm:text-base text-[#060e32]/75 dark:text-slate-300 leading-relaxed font-light'>
                            {isEn
                                ? 'Emlinked delivers maximum efficiency when combining our specialized core apps for Microsoft Business Central.'
                                : 'Emlinked werkt het krachtigst als gecombineerde suite. Schakel de modules in die jouw vastgoedorganisatie versterken.'}
                        </p>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 text-left pt-2'>
                        {[
                            {
                                appSlug: 'vastgoedbeheer-software',
                                normSlug: 'vastgoedbeheer-software',
                                title: isEn
                                    ? 'Property Management'
                                    : 'Vastgoedbeheer Software',
                                badge: isEn
                                    ? 'Core Operations'
                                    : 'Core Operatie & Admin',
                                desc: isEn
                                    ? 'Automated CPI indexations, contract management & ledger posting in Business Central.'
                                    : 'De operationele motor voor je vastgoedportefeuille. Automatiseer contracten en indexaties.',
                                imagePath:
                                    '/emlinked/home/DrieKrachtigeApps_VastgoedbeheerSoftware.png',
                                iconPath:
                                    '/emlinked/apps/vastgoedbeheer_negatief.png',
                                appNo: '01',
                            },
                            {
                                appSlug: 'huurdersportaal',
                                normSlug: 'huurdersportaal',
                                title: isEn
                                    ? 'Tenant Portal'
                                    : 'Huurdersportaal',
                                badge: isEn
                                    ? 'Tenant Self-Service'
                                    : 'Self-Service & Communicatie',
                                desc: isEn
                                    ? '24/7 digital tenant self-service for maintenance requests, invoices & communications.'
                                    : 'Verlaag de werkdruk op je beheerteam. 24/7 inzicht in huurfacturen en storingsmeldingen.',
                                imagePath: '/emlinked/home/Huurdersportaal.png',
                                iconPath:
                                    '/emlinked/apps/huurdersportaal_negatief.png',
                                appNo: '02',
                            },
                            {
                                appSlug: 'payment-software',
                                normSlug: 'payment',
                                title: isEn
                                    ? 'Payment Software'
                                    : 'Payment Software',
                                badge: isEn
                                    ? 'Financial Automation'
                                    : 'Financiële Automatisering',
                                desc: isEn
                                    ? 'Automated SEPA Direct Debit collection & real-time PSD2 bank reconciliation.'
                                    : "Geen handmatige aflettering meer. SEPA-incasso's & bankaflettering direct in ERP.",
                                imagePath:
                                    '/emlinked/home/DrieKrachtigeApps_PaymentSoftware.png',
                                iconPath:
                                    '/emlinked/apps/payment_engine_negatief.png',
                                appNo: '03',
                            },
                        ].map((appItem) => {
                            const normalizedCurrentSlug =
                                slug === 'payment' ? 'payment-software' : slug;
                            const isCurrentApp =
                                normalizedCurrentSlug === appItem.appSlug ||
                                slug === appItem.normSlug;
                            const targetPath = `/${locale}/apps/${appItem.appSlug}`;

                            return (
                                <div
                                    key={appItem.appSlug}
                                    className={`relative p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-5 ${
                                        isCurrentApp
                                            ? 'border-amber bg-white dark:bg-slate-900 shadow-xl ring-2 ring-amber/30 scale-[1.01]'
                                            : 'border-black/15 bg-white dark:bg-slate-900/90 shadow-md hover:shadow-xl hover:border-amber/50'
                                    }`}
                                >
                                    {/* App Badge circle top right */}
                                    <div className='absolute -top-4 -right-4 z-30 w-11 h-11 rounded-full bg-[#060e32] border-2 border-amber text-amber font-mono font-extrabold text-xs flex items-center justify-center shadow-lg'>
                                        {appItem.appNo}
                                    </div>

                                    {/* Whole-card overlay link when not current app */}
                                    {!isCurrentApp && (
                                        <Link
                                            href={targetPath}
                                            className='absolute inset-0 z-20'
                                            aria-label={appItem.title}
                                        />
                                    )}

                                    <div className='space-y-4'>
                                        <div className='relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-950 border border-gray-200 dark:border-white/10'>
                                            <Image
                                                src={appItem.imagePath}
                                                alt={appItem.title}
                                                fill
                                                sizes='(max-width: 768px) 100vw, 33vw'
                                                className='object-cover opacity-95 group-hover:scale-105 transition-transform duration-500'
                                            />
                                            <div className='absolute top-3 left-3 z-20 pointer-events-none'>
                                                <span className='px-3 py-1 text-[10px] font-bold rounded-full bg-slate-900/90 border border-amber/30 text-amber shadow-lg backdrop-blur-md uppercase tracking-wider'>
                                                    {appItem.badge}
                                                </span>
                                            </div>
                                        </div>

                                        <div className='space-y-2 pt-1'>
                                            <h3 className='text-xl font-bold font-display text-[#060e32] dark:text-white flex items-center justify-between'>
                                                <span>{appItem.title}</span>
                                                {isCurrentApp && (
                                                    <span className='text-[10px] font-mono font-bold bg-amber/20 text-amber px-2 py-0.5 rounded uppercase border border-amber/30'>
                                                        {isEn
                                                            ? 'Active'
                                                            : 'Huidige module'}
                                                    </span>
                                                )}
                                            </h3>
                                            <p className='text-xs text-[#060e32]/75 dark:text-slate-300 leading-relaxed font-light'>
                                                {appItem.desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Single-Line Card Footer matching frontpage screenshot */}
                                    <div className='pt-3 border-t border-black/15 dark:border-white/10 flex items-center justify-between gap-4 z-30 mt-auto pointer-events-none'>
                                        <div className='flex items-center gap-2 text-xs font-semibold text-[#060e32]/85 dark:text-slate-200 truncate'>
                                            <CheckCircle2 className='w-4 h-4 text-amber shrink-0' />
                                            <span className='truncate'>
                                                {appItem.appSlug ===
                                                'huurdersportaal'
                                                    ? 'Self-service'
                                                    : 'Primary operational'}
                                            </span>
                                        </div>

                                        {isCurrentApp ? (
                                            <span className='text-[10px] font-mono font-bold text-amber uppercase tracking-wider bg-amber/10 border border-amber/20 px-2.5 py-1 rounded-md'>
                                                {isEn ? 'Active' : 'Actief'}
                                            </span>
                                        ) : (
                                            <div className='inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber group-hover:text-[#060e32] dark:group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200 shrink-0'>
                                                <span>MODULE</span>
                                                <ArrowRight className='w-3.5 h-3.5' />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Rich Frontpage-style Pre-Footer Conversion CTA Banner ───── */}
            <section className='px-6 py-20 bg-background max-w-5xl mx-auto text-center'>
                <div className='p-10 md:p-16 rounded-3xl border border-white/10 bg-texture-navy text-white space-y-8 relative overflow-hidden shadow-2xl'>
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber/15 blur-3xl pointer-events-none rounded-full' />

                    <div className='space-y-4 max-w-2xl mx-auto relative z-10'>
                        <span className='inline-flex items-center justify-center rounded-full border border-amber/50 bg-[#251b14]/90 px-6 py-1.5 text-xs font-mono font-bold tracking-widest text-amber uppercase backdrop-blur-md shadow-md'>
                            {isEn
                                ? 'START AUTOMATING TODAY'
                                : 'START MET AUTOMATISEREN'}
                        </span>
                        <h2 className='font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight'>
                            {content.cta.title ||
                                (isEn
                                    ? 'Ready to modernize your property software?'
                                    : 'Klaar om je vastgoedbeheer te moderniseren?')}
                        </h2>
                        <p className='text-sm sm:text-base text-white/80 leading-relaxed font-light'>
                            {content.cta.desc ||
                                (isEn
                                    ? 'Experience how Emlinked halves administrative workloads and boosts financial control directly inside Business Central.'
                                    : 'Ervaar zelf hoe Emlinked je administratieve lasten halveren en je financiële controle vergroten.')}
                        </p>
                    </div>

                    <div className='flex flex-wrap items-center justify-center gap-4 relative z-10 pt-2'>
                        <Link
                            href={`/${locale}/contact`}
                            className='px-8 py-4 rounded-xl bg-amber hover:bg-amber-hover text-[#060e32] font-bold text-sm flex items-center gap-2 transition-all shadow-xl hover:scale-105'
                        >
                            <span>
                                {content.cta.primary ||
                                    (isEn
                                        ? 'Request a Demo'
                                        : 'Gratis demo aanvragen')}
                            </span>
                            <ArrowRight className='h-4 w-4' />
                        </Link>
                        <Link
                            href={`/${locale}/apps`}
                            className='px-7 py-4 rounded-xl bg-transparent border border-white/20 hover:bg-white/10 text-white font-semibold text-sm flex items-center gap-2 transition-all hover:border-amber/40'
                        >
                            <span>
                                {content.cta.secondary ||
                                    (isEn
                                        ? 'View all 3 apps'
                                        : 'Bekijk alle 3 de apps')}
                            </span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
