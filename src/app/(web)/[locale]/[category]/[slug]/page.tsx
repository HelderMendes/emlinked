import React from 'react';
import Link from 'next/link';
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
    try {
        const query = `*[_type == "solutionPage" && language == $locale && slug.current == $slug][0]`;
        const doc = await sanityFetch<any>({ query, params: { locale, slug } });

        if (doc) {
            return {
                meta: {
                    title: doc.seo?.title || doc.title,
                    description: doc.seo?.description || '',
                    keywords: doc.seo?.keywords || '',
                },
                badge: doc.badge,
                heroIcon: IconMap[doc.heroIcon] || Building2,
                title: doc.title,
                tagline: doc.tagline,
                desc: doc.description,
                benefits: doc.benefits || [],
                features: (doc.features || []).map((f: any) => ({
                    icon: IconMap[f.icon] || FileText,
                    title: f.title,
                    text: f.text,
                })),
                proof: doc.proof || [],
                workflow: (doc.workflow || []).map((w: any) => ({
                    step: w.step,
                    icon: IconMap[w.icon] || CheckCircle2,
                    title: w.title,
                    desc: w.desc,
                })),
                faq: doc.faq || [],
                relatedModules: (doc.relatedModules || []).map((m: any) => {
                    // map slug to standard icon
                    let modIcon = Link2;
                    if (m.slug === 'huurdersportaal') modIcon = Users;
                    if (m.slug === 'payment') modIcon = CreditCard;
                    if (m.slug === 'vastgoedbeheer-software')
                        modIcon = Building2;
                    return {
                        slug: m.slug,
                        icon: modIcon,
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
    return localeContent[slug as keyof typeof localeContent] as any;
}

export async function generateMetadata({
    params,
}: SolutionPageProps): Promise<Metadata> {
    const { locale, category, slug } = await params;

    // Category routing validation
    if (locale === 'nl' && category !== 'oplossingen') return {};
    if (locale === 'en' && category !== 'solutions') return {};

    const content = await getSolutionContent(locale, slug);

    if (!content) return {};

    return {
        title: `${content.meta.title} | Emlinked`,
        description: content.meta.description,
        keywords: content.meta.keywords,
        alternates: {
            canonical:
                locale === 'nl'
                    ? `/oplossingen/${slug}`
                    : `/en/solutions/${slug}`,
        },
    };
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
                primary: 'Demo inplannen',
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
                primary: 'Demo inplannen',
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
                primary: 'Demo inplannen',
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
                primary: 'Schedule a Demo',
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
                primary: 'Schedule a Demo',
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
                primary: 'Schedule a Demo',
                secondary: 'View all modules',
            },
        },
    },
} as const;

export default async function SolutionPage({ params }: SolutionPageProps) {
    const { locale, category, slug } = await params;

    // Category routing validation
    if (locale === 'nl' && category !== 'oplossingen') notFound();
    if (locale === 'en' && category !== 'solutions') notFound();

    const content = await getSolutionContent(locale, slug);

    if (!content) {
        notFound();
    }

    const isEn = locale === 'en';
    const HeroIcon = content.heroIcon;

    return (
        <div className='flex flex-col min-h-screen'>
            {/* ── Hero Header ─────────────────────────────────────────── */}
            <section className='relative px-6 py-24 bg-radial from-card via-background to-background border-b border-border overflow-hidden'>
                {/* subtle background glow */}
                <div className='absolute inset-0 pointer-events-none'>
                    <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl' />
                </div>

                <div className='mx-auto max-w-5xl text-center flex flex-col gap-6 relative z-10'>
                    <span className='inline-flex items-center gap-1.5 self-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary'>
                        <HeroIcon className='h-3.5 w-3.5' />
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
                    <div className='flex flex-wrap justify-center gap-4 mt-4'>
                        <Link
                            href={`/${locale}/contact`}
                            className='inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow hover:bg-primary/95 transition-all'
                        >
                            {content.cta.primary}
                            <ArrowRight className='ml-2 h-4 w-4' />
                        </Link>
                        <Link
                            href={`/${locale}/${category}`}
                            className='inline-flex h-11 items-center justify-center rounded-md border border-border px-6 text-sm font-medium text-foreground hover:bg-muted/50 transition-all'
                        >
                            {content.cta.secondary}
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Social Proof Stats Band ──────────────────────────────── */}
            <section className='border-b border-border bg-muted/30'>
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
            <section className='px-6 py-16 bg-background border-b border-border'>
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
            <section className='px-6 py-20 bg-card border-b border-border'>
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
                                    className='p-6 rounded-xl border border-border bg-background flex flex-col gap-4 hover:shadow-md hover:border-primary/30 transition-all group'
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
                <section className='px-6 py-20 bg-background border-b border-border'>
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
                <section className='px-6 py-20 bg-card border-b border-border'>
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
            <section className='px-6 py-20 bg-background border-b border-border'>
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

            {/* ── Related Modules ──────────────────────────────────────── */}
            {'relatedModules' in content && (
                <section className='px-6 py-16 bg-card border-b border-border'>
                    <div className='mx-auto max-w-5xl'>
                        <h2 className='text-lg font-bold text-foreground mb-1 text-center'>
                            {isEn
                                ? 'Complete the picture'
                                : 'Combineer met andere modules'}
                        </h2>
                        <p className='text-sm text-muted-foreground text-center mb-10'>
                            {isEn
                                ? 'Emlinked works best as an integrated suite.'
                                : 'Emlinked werkt het krachtigst als geïntegreerde suite.'}
                        </p>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                            {(
                                content as unknown as {
                                    relatedModules: {
                                        slug: string;
                                        icon: React.ElementType;
                                        title: string;
                                        desc: string;
                                    }[];
                                }
                            ).relatedModules.map((mod) => {
                                const ModIcon = mod.icon;
                                return (
                                    <Link
                                        key={mod.slug}
                                        href={`/${locale}/${category}/${mod.slug}`}
                                        className='group flex items-start gap-5 p-6 rounded-xl border border-border bg-background hover:border-primary/40 hover:shadow-md transition-all'
                                    >
                                        <div className='h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/15 transition-colors'>
                                            <ModIcon className='h-5 w-5' />
                                        </div>
                                        <div className='flex-1 text-left'>
                                            <div className='font-bold text-sm text-foreground mb-1 flex items-center gap-1.5'>
                                                {mod.title}
                                                <ArrowRight className='h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity' />
                                            </div>
                                            <p className='text-xs text-muted-foreground leading-relaxed'>
                                                {mod.desc}
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ── CTA Footer ───────────────────────────────────────────── */}
            <section className='px-6 py-20 bg-card'>
                <div className='mx-auto max-w-3xl text-center flex flex-col gap-6'>
                    <h2 className='text-2xl sm:text-3xl font-bold text-foreground'>
                        {content.cta.title}
                    </h2>
                    <p className='text-base text-muted-foreground leading-relaxed'>
                        {content.cta.desc}
                    </p>
                    <div className='flex flex-wrap justify-center gap-4'>
                        <Link
                            href={`/${locale}/contact`}
                            className='inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow hover:bg-primary/95 transition-all'
                        >
                            {content.cta.primary}
                            <ArrowRight className='ml-2 h-4 w-4' />
                        </Link>
                        <Link
                            href={`/${locale}/${category}`}
                            className='inline-flex h-11 items-center justify-center rounded-md border border-border px-8 text-sm font-medium text-foreground hover:bg-muted/50 transition-all'
                        >
                            {content.cta.secondary}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
