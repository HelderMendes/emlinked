require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
    apiVersion: '2024-01-01',
});

async function seedBox3CheckBlocks() {
    console.log('Seeding complete pageBlocks into Sanity for Box 3 Check pages...');

    const nlBlocks = [
        {
            _key: 'hero-block-nl',
            _type: 'hero',
            label: 'ADMINISTRATIEPLICHT 2028 · TWEEDE KAMER AKKOORD',
            title: 'Uw vastgoedportefeuille altijd *aangifte-klaar*.',
            subtitle:
                'emlinked beheert uw huurcontracten, kosten en financiële administratie in één gestroomlijnd systeem. Speciaal voor portefeuilles vanaf 50 verhuureenheden. Gebouwd op Microsoft Business Central.',
            ctaLabel: 'Gratis demo aanvragen',
            ctaLink: '/contact',
            secondaryCtaLabel: 'Bereken uw box 3-impact →',
            secondaryCtaLink: '#calculator',
            heroCard: {
                badge: 'MICROSOFT BUSINESS CENTRAL',
                title: 'Vastgoed Beheer Suite',
                status: '100% Synced',
            },
        },
        {
            _key: 'announcement-block-nl',
            _type: 'announcement',
            badge: 'Nieuw: Wet werkelijk rendement box 3',
            text: 'Vastgoedeigenaren krijgen een formele administratieplicht. Weet u al wat u moet bijhouden?',
            ctaLabel: 'Bereken uw situatie →',
            ctaLink: '#calculator',
        },
        {
            _key: 'voor-wie-block-nl',
            _type: 'featuresList',
            badge: 'Voor Wie',
            title: 'Vastgoedbeheer met 50+ eenheden loopt snel vast',
            subtitle:
                'Huurcontracten op één plek, onderhoudskosten elders, en de fiscale administratie verspreid over losse documenten. Vanaf 2028 verwacht de Belastingdienst dat u per pand exact kunt aantonen wat het werkelijke rendement is geweest.',
            fiscalContext: {
                badge: 'Wetgeving 2028',
                title: 'Fiscale Context: Wet werkelijk rendement box 3',
                text: 'Vastgoedeigenaren krijgen een formele administratie- en bewaarplicht. Huurinkomsten, onderhoudskosten en verbeteringskosten moeten per pand aantoonbaar zijn met brondocumenten.',
                image: '/emlinked/box3/box3-fiscalContext.jpg',
            },
            items: [
                {
                    _key: 'item-1',
                    title: 'Data verspreid over Excel-bestanden',
                    text: 'Versieconflicten en handmatige imports belemmeren een betrouwbaar totaaloverzicht.',
                },
                {
                    _key: 'item-2',
                    title: 'Beheer en boekhouding als losse eilanden',
                    text: 'Contractbeheer staat los van de financiën, met dubbel werk als gevolg.',
                },
                {
                    _key: 'item-3',
                    title: 'Kostendocumentatie niet op orde',
                    text: 'Facturen voor onderhoud ontbreken of zijn niet direct toegewezen aan het specifieke object.',
                },
                {
                    _key: 'item-4',
                    title: 'Accountant wacht altijd op u',
                    text: 'Kwartaal- en jaarafsluitingen duren lang omdat gegevens handmatig verzameld moeten worden.',
                },
            ],
        },
        {
            _key: 'workflow-block-nl',
            _type: 'workflow',
            badge: 'De Oplossing',
            title: 'Eén systeem. Van huurcontract tot belastingrapportage.',
            items: [
                {
                    _key: 'step-1',
                    step: '01',
                    title: 'Alle objecten en contracten centraal',
                    text: 'WOZ-waarden, huurcontracten, indexations en leegstand op één plek.',
                    feature: 'Automatische huurindexatie via CPI-koppeling',
                },
                {
                    _key: 'step-2',
                    step: '02',
                    title: 'Kosten automatisch geregistreerd',
                    text: 'Onderhoud, servicekosten en hypotheekrente direct aftrekbaar en georganiseerd voor uw belastingaangifte.',
                    feature: 'Box 3-aangifte exportfunctie',
                },
                {
                    _key: 'step-3',
                    step: '03',
                    title: 'Rapportages voor uw accountant',
                    text: 'Elk kwartaal een transparant en onderbouwd overzicht per pand.',
                    feature: 'Power BI & Excel-integratie',
                },
            ],
        },
        {
            _key: 'calculator-block-nl',
            _type: 'calculatorBlock',
            calculatorType: 'box3',
            badge: 'Gratis Tool · Geen registratie vereist',
            title: 'Blijft uw vastgoed rendabel na 2028?',
            subtitle:
                'Vul uw cijfers in. U ziet direct of u beter of slechter af bent onder de nieuwe box 3-regels voor werkelijk rendement.',
            featureTitle: 'Wat emlinked automatisch bijhoudt',
            featureItems: [
                'Netto huurresultaat per pand per jaar',
                'Onderhouds- en servicekosten met factuurkoppeling',
                'Hypotheekrente per pand — automatisch aftrekbaar',
                'WOZ-waarden en waardeontwikkeling',
                'Exporteerbaar voor uw accountant',
            ],
        },
        {
            _key: 'ecosystem-block-nl',
            _type: 'ecosystemSection',
            badge: 'MICROSOFT ECOSYSTEM',
            title: 'De betrouwbaarheid van Microsoft. De vakkennis van emlinked.',
            subtitle:
                'emlinked is ontwikkeld als een gecertificeerde oplossing op Microsoft Business Central — de ERP-standaard voor meer dan 50.000 bedrijven wereldwijd. U profiteert van enterprise-grade beveiliging, continuïteit en naadloze integratie met Excel en Power BI.',
            cardTitle: 'Microsoft Business Central',
            cardSubtitle: 'Certified Dynamics 365 Module',
            cardPoints: [
                'Native ERP grootboek integratie',
                'Automatische SEPA & bankaflettering',
                'Volledige audit trail voor de Belastingdienst',
            ],
            trustItems: [
                {
                    title: 'Enterprise Beveiliging',
                    desc: 'ISO 27001 & SOC 2 Gecertificeerd',
                },
                {
                    title: 'Power BI Analyses',
                    desc: 'Realtime financiële dashboards',
                },
                {
                    title: '50.000+ Bedrijven',
                    desc: 'Bewezen wereldwijd ERP fundament',
                },
            ],
        },
        {
            _key: 'cta-banner-block-nl',
            _type: 'ctaBanner',
            badge: 'Klaar voor 2028?',
            title: 'Houd uw vastgoedrendement audit-proof met emlinked',
            subtitle:
                'Vraag vandaag een vrijblijvende demonstratie aan en ontdek hoe onze modulaire Business Central software uw beheer transformeert.',
            buttonText: 'Gratis demonstratie plannen',
            buttonLink: '/contact',
        },
    ];

    const enBlocks = [
        {
            _key: 'hero-block-en',
            _type: 'hero',
            label: 'ADMINISTRATION OBLIGATION 2028 · PARLIAMENT APPROVED',
            title: 'Your real estate portfolio always *tax-audit ready*.',
            subtitle:
                'emlinked manages your lease agreements, operating costs, and financial administration in one streamlined system. Specifically engineered for portfolios from 50 rental units up. Built natively on Microsoft Business Central.',
            ctaLabel: 'Request Free Demo',
            ctaLink: '/contact',
            secondaryCtaLabel: 'Calculate Box 3 impact →',
            secondaryCtaLink: '#calculator',
            heroCard: {
                badge: 'MICROSOFT BUSINESS CENTRAL',
                title: 'Real Estate Management Suite',
                status: '100% Synced',
            },
        },
        {
            _key: 'announcement-block-en',
            _type: 'announcement',
            badge: 'New: Box 3 Actual Yield Act 2028',
            text: 'Property owners are subject to a formal recordkeeping obligation. Do you know what to track?',
            ctaLabel: 'Calculate your situation →',
            ctaLink: '#calculator',
        },
        {
            _key: 'voor-wie-block-en',
            _type: 'featuresList',
            badge: 'Target Audience',
            title: 'Real estate management with 50+ units gets stuck fast',
            subtitle:
                'Lease contracts stored in one place, maintenance expenses elsewhere, and tax records scattered across loose spreadsheets. From 2028, tax authorities require exact proof per property of your actual net yield.',
            fiscalContext: {
                badge: 'Audit Proof 2028',
                title: 'Tax Context: Actual Yield Act Box 3',
                text: 'Property owners are subject to a formal recordkeeping and retention obligation. Rental income, maintenance expenses, and improvement costs must be verifiable per property with source documents.',
                image: '/emlinked/box3/box3-fiscalContext.jpg',
            },
            items: [
                {
                    _key: 'item-1',
                    title: 'Data Scattered Across Excel',
                    text: 'Version conflicts and manual imports impede a reliable complete portfolio overview.',
                },
                {
                    _key: 'item-2',
                    title: 'Management & Finance Siloed',
                    text: 'Contract management is separated from financial ledgers, resulting in duplicate work.',
                },
                {
                    _key: 'item-3',
                    title: 'Cost Proof Missing',
                    text: 'Maintenance invoices are missing or not directly linked to specific properties.',
                },
                {
                    _key: 'item-4',
                    title: 'Accountant Waiting on You',
                    text: 'Quarterly and year-end closes take weeks because data has to be gathered manually.',
                },
            ],
        },
        {
            _key: 'workflow-block-en',
            _type: 'workflow',
            badge: 'The Solution',
            title: 'One system. From lease agreement to tax reporting.',
            items: [
                {
                    _key: 'step-1',
                    step: '01',
                    title: 'Centralize Properties & Contracts',
                    text: 'WOZ values, lease contracts, CPI indexations, and vacancies managed in one single place.',
                    feature: 'Automatic CPI Lease Indexation',
                },
                {
                    _key: 'step-2',
                    step: '02',
                    title: 'Expenses Logged Automatically',
                    text: 'Maintenance, service fees, and mortgage interest directly deductible and organized for tax audits.',
                    feature: 'Box 3 Audit Export Module',
                },
                {
                    _key: 'step-3',
                    step: '03',
                    title: 'Accountant Ready Reporting',
                    text: 'Every quarter a fully transparent, evidence-backed financial overview per property.',
                    feature: 'Power BI & Excel Integration',
                },
            ],
        },
        {
            _key: 'calculator-block-en',
            _type: 'calculatorBlock',
            calculatorType: 'box3',
            badge: 'Free Tool · No registration required',
            title: 'Will your real estate remain profitable after 2028?',
            subtitle:
                'Enter your figures below. See instantly whether you are better or worse off under the new Box 3 actual yield regulations.',
            featureTitle: 'What Emlinked automatically tracks',
            featureItems: [
                'Net rental return per property per year',
                'Maintenance & service costs with invoice OCR matching',
                'Mortgage interest per property — directly tax deductible',
                'WOZ property values & capital appreciation',
                '1-Click audit export for tax accountants',
            ],
        },
        {
            _key: 'ecosystem-block-en',
            _type: 'ecosystemSection',
            badge: 'MICROSOFT BUSINESS CENTRAL PLATFORM',
            title: 'The reliability of Microsoft. The expertise of emlinked.',
            subtitle:
                'emlinked is engineered as a certified solution on Microsoft Business Central — the ERP standard for over 50,000 companies globally. You benefit from enterprise security, business continuity, and native integration with Excel and Power BI.',
            cardTitle: 'Microsoft Business Central',
            cardSubtitle: 'Certified Dynamics 365 Module',
            cardPoints: [
                'Native ERP GL ledger integration',
                'Automatic SEPA & bank reconciliation',
                'Audit trail for tax accountants',
            ],
            trustItems: [
                {
                    title: 'Enterprise Security',
                    desc: 'ISO 27001 & SOC 2 Certified',
                },
                {
                    title: 'Power BI Analytics',
                    desc: 'Real-time financial dashboards',
                },
                {
                    title: '50,000+ Customers',
                    desc: 'Proven global ERP backbone',
                },
            ],
        },
        {
            _key: 'cta-banner-block-en',
            _type: 'ctaBanner',
            badge: 'Ready for 2028?',
            title: 'Keep your real estate yields audit-proof with emlinked',
            subtitle:
                'Request a non-binding demo today and discover how our modular Business Central software transforms your management.',
            buttonText: 'Schedule Free Demonstration',
            buttonLink: '/contact',
        },
    ];

    try {
        await client
            .patch('page-box3-check-nl')
            .set({ pageBlocks: nlBlocks })
            .commit();
        console.log('✓ Successfully updated page-box3-check-nl with 6 pageBlocks!');

        await client
            .patch('page-box3-check-en')
            .set({ pageBlocks: enBlocks })
            .commit();
        console.log('✓ Successfully updated page-box3-check-en with 6 pageBlocks!');
    } catch (e) {
        console.error('Failed to seed Sanity blocks:', e);
    }
}

seedBox3CheckBlocks();
