const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

async function syncAppsPageBlocks() {
    console.log(
        '🚀 Syncing all 5 page blocks for /apps in NL & EN into Sanity...\n',
    );

    // ── 1. DUTCH (page-apps-nl) ──
    const nlPageBlocks = [
        {
            _key: 'apps_hero_nl',
            _type: 'hero',
            label: 'DE MODULAIRE VASTGOEDSOFTWARE SUITE',
            title: 'Eén geïntegreerd vastgoedbeheer platform voor *Microsoft Business Central*',
            subtitle:
                'Met de modulaire vastgoedsoftware van Emlinked elimineer je handmatige Excel-lijsten, losse software-eilanden en dubbele administratie. Onze drie specialistische applicaties verbinden je dagelijkse vastgoedoperatie direct met je financiële administratie in Microsoft Dynamics 365 Business Central.',
            ctaLabel: 'Gratis demo aanvragen',
            ctaLink: '#demo',
            secondaryCtaLabel: 'Doe de Box 3-check ⚡',
            secondaryCtaLink: '/box3-check',
            imagePath: '/emlinked/apps/apps_hero.jpg',
        },
        {
            _key: 'apps_grid_nl',
            _type: 'featuresList',
            sectionTag: 'DRIE KRACHTIGE APPS',
            sectionTitle:
                'Kies de modules die je vastgoedorganisatie versterken',
            sectionSubtitle:
                'Met onze drie specialistische applicaties bouw je de ideale software-combinatie voor jouw vastgoedportfolio.',
            features: [
                {
                    _key: 'app_card_1_nl',
                    title: 'Vastgoedbeheer software',
                    badge: 'Core Operatie & Admin',
                    description:
                        'De operationele motor voor je retailportefeuille, woningbezit of commercieel vastgoed. Automatiseer ingewikkelde huurovereenkomsten, periodieke CPI-indexaties, wisselende metrage-types en locatiespecifieke onderhoudscontracten zonder risico op menselijke fouten..',
                    bullets: [
                        'Automatische CPI-indexaties & huurprolongaties',
                        'Flexibel contract- en metragebeheer voor retail en woningen',
                        'Native verwerking van journaalposten in Business Central',
                    ],
                    ctaLabel: 'Ontdek Vastgoedbeheer Software ➔',
                    ctaLink: '/apps/vastgoedbeheer-software',
                    imagePath:
                        '/emlinked/apps/vastgoedbeheer-sopftware_modules.jpg',
                },
                {
                    _key: 'app_card_2_nl',
                    title: 'Huurdersportaal software',
                    badge: 'Self-Service & Communicatie',
                    description:
                        'Verlaag de werkdruk op je beheerteam en verhoog de huurdertevredenheid. Via het digitale self-service portaal dienen huurders 24/7 reparatieverzoeken in, bekijken ze hun betalingshistorie en downloaden ze huurdocumenten.',
                    bullets: [
                        'Onderhoudsmeldingen direct doorgestuurd naar beheerders',
                        '24/7 inzicht in huurfacturen en betalingsstatus',
                        'Realtime data-synchronisatie met de centrale database',
                    ],
                    ctaLabel: 'Ontdek het Huurdersportaal ➔',
                    ctaLink: '/apps/huurdersportaal',
                    imagePath: '/emlinked/apps/huurdersportaal_modules.jpg',
                },
                {
                    _key: 'app_card_3_nl',
                    title: 'Payment software',
                    badge: 'Financiële Automatisering',
                    description:
                        "Geen handmatige aflettering meer. Automatiseer SEPA-incasso's en match inkomende betalingen direct met openstaande facturen in Business Central.",
                    bullets: [
                        'Geautomatiseerde SEPA Direct Debit incassostromen',
                        'Realtime bankreconciliatie via Direct Banking',
                        'Automatische herinneringen en dossieropbouw',
                    ],
                    ctaLabel: 'Payment Software ➔',
                    ctaLink: '/apps/payment-software',
                    imagePath: '/emlinked/apps/payment-software_modules.jpg',
                },
            ],
        },
        {
            _key: 'apps_architecture_nl',
            _type: 'architectureSection',
            tag: 'NAADLOZE INTEGRATIE',
            title: 'Hoe onze applicaties samenwerken binnen uw ERP',
            subtitle:
                'In tegenstelling tot traditionele vastgoedsoftware die werkt met ingewikkelde API-koppelingen en periodieke batch-imports, draait de software van Emlinked native binnen Microsoft Dynamics 365 Business Central. Dat betekent: één centrale bron van waarheid, nul dubbele invoer en 100% realtime data-integriteit.',
            sectionTag: 'MICROSOFT BUSINESS CENTRAL INTEGRATIE',
            sectionTitle: '100% Realtime controle en automatische aflettering',
            sectionSubtitle:
                'Beheer al je vastgoedprocessen native in Microsoft Dynamics 365 Business Central zonder vertraging of risico van schaduwbestanden.',
            bullets: [
                {
                    _key: 'bullet_1_nl',
                    bold: 'Één centrale bron van waarheid:',
                    text: 'Geen losse databases, Excel-sheets of gevaarlijke API-koppelingen.',
                },
                {
                    _key: 'bullet_2_nl',
                    bold: 'Nul dubbele invoer:',
                    text: 'Huurovereenkomsten, indexaties en facturen landen direct als gevalideerde journaalposten in je grootboek.',
                },
                {
                    _key: 'bullet_3_nl',
                    bold: '100% Realtime data-integriteit:',
                    text: 'Direct betrouwbaar inzicht voor accountant, directie en beheerteam.',
                },
            ],
            bgImagePath: '/emlinked/apps/bg_naadloze_integratie_section.jpg',
        },
        {
            _key: 'apps_testimonial_nl',
            _type: 'testimonialSection',
            sectionTitle:
                'Ontworpen voor portefeuilles vanaf 50 verhuureenheden',
            sectionSubtitle:
                'Of je nu een retailketen beheert met uiteenlopende winkelpanden, een woningcorporatie stuurt of een grote commerciële portefeuille beheert: onze applicaties zijn gebouwd om mee te schalen.',
            testimonials: [
                {
                    _key: 't_quote_1_nl',
                    author: 'Operations Director',
                    quote: 'Met de gecombineerde inzet van de vastgoedbeheer software en de payment engine verwerken wij honderden huurcontracten en indexaties zonder dat er één Excel-sheet aan te pas komt.',
                    role: 'Commercial Real Estate Management',
                },
            ],
        },
        {
            _key: 'apps_cta_nl',
            _type: 'ctaBanner',
            tag: 'START MET AUTOMATISEREN',
            title: 'Klaar om je vastgoedbeheer software te moderniseren?',
            subtitle:
                'Ervaar zelf hoe de modulaire apps van Emlinked je administratieve lasten halveren en je financiële controle vergroten.',
            buttonLabel: 'Gratis live demo aanvragen',
            buttonLink: '#demo',
            secondaryButtonLabel: 'Bekijk tarieven & prijzen ➔',
            secondaryButtonLink: '/prijzen',
        },
    ];

    await client
        .patch('page-apps-nl')
        .set({ pageBlocks: nlPageBlocks })
        .commit();
    console.log(
        '✓ Successfully synced all 5 blocks for page-apps-nl in Sanity!',
    );

    // ── 2. ENGLISH (page-apps-en) ──
    const enPageBlocks = [
        {
            _key: 'apps_hero_en',
            _type: 'hero',
            label: 'THE MODULAR PROPERTY SOFTWARE SUITE',
            title: 'One unified property management platform for *Microsoft Business Central*',
            subtitle:
                'With emlinked modular real estate software, eliminate manual spreadsheets, isolated software silos, and duplicate administration. Our three specialist applications connect your daily property operations directly to your financial ledgers in Microsoft Dynamics 365 Business Central.',
            ctaLabel: 'Request Free Demo',
            ctaLink: '#demo',
            secondaryCtaLabel: 'Check Box 3 impact ⚡',
            secondaryCtaLink: '/box3-check',
            imagePath: '/emlinked/apps/apps_hero.jpg',
        },
        {
            _key: 'apps_grid_en',
            _type: 'featuresList',
            sectionTag: 'THREE POWERFUL APPS',
            sectionTitle:
                'Choose the modules that empower your real estate organization',
            sectionSubtitle:
                'With our three specialist applications, build the ideal software combination for your property portfolio.',
            features: [
                {
                    _key: 'app_card_1_en',
                    title: 'Property Management Software',
                    badge: 'Core Operations & Accounting',
                    description:
                        'The operational engine for retail portfolios, residential housing, or commercial real estate. Automate complex lease agreements, CPI indexations, variable area metrics, and property-specific maintenance contracts with zero risk of human error.',
                    bullets: [
                        'Automatic CPI indexations & rent invoicing runs',
                        'Flexible contract & area management for retail and residential',
                        'Native posting of journal entries directly into Business Central',
                    ],
                    ctaLabel: 'Discover Property Management Software ➔',
                    ctaLink: '/apps/vastgoedbeheer-software',
                    imagePath:
                        '/emlinked/apps/vastgoedbeheer-sopftware_modules.jpg',
                },
                {
                    _key: 'app_card_2_en',
                    title: 'Tenant Portal Software',
                    badge: 'Self-Service & Communication',
                    description:
                        'Reduce workload for your property management team while boosting tenant satisfaction. Through the 24/7 digital self-service portal, tenants log repair requests, track payment status, and download lease documents.',
                    bullets: [
                        'Maintenance tickets routed directly to property managers',
                        '24/7 insight into rent invoices & payment statuses',
                        'Real-time data synchronization with central Business Central database',
                    ],
                    ctaLabel: 'Discover Tenant Portal ➔',
                    ctaLink: '/apps/huurdersportaal',
                    imagePath: '/emlinked/apps/huurdersportaal_modules.jpg',
                },
                {
                    _key: 'app_card_3_en',
                    title: 'Payment Software',
                    badge: 'Financial Automation',
                    description:
                        'No more manual reconciliation. Automate SEPA direct debit collection workflows and match incoming payments directly to open invoices inside Business Central.',
                    bullets: [
                        'Automated SEPA Direct Debit collection workflows',
                        'Real-time bank reconciliation via Direct Banking',
                        'Automatic payment reminders and collection tracking',
                    ],
                    ctaLabel: 'Discover Payment Software ➔',
                    ctaLink: '/apps/payment-software',
                    imagePath: '/emlinked/apps/payment-software_modules.jpg',
                },
            ],
        },
        {
            _key: 'apps_architecture_en',
            _type: 'architectureSection',
            tag: 'SEAMLESS INTEGRATION',
            title: 'How our applications work together inside your ERP',
            subtitle:
                'Unlike traditional real estate software that relies on complex API integrations and periodic batch imports, Emlinked software runs native inside Microsoft Dynamics 365 Business Central. That means: one central source of truth, zero duplicate data entry, and 100% realtime data integrity.',
            sectionTag: 'MICROSOFT BUSINESS CENTRAL INTEGRATION',
            sectionTitle: '100% Realtime Control & Automatic Posting',
            sectionSubtitle:
                'Manage all your real estate operations natively inside Business Central with zero latency or shadow file risks.',
            bullets: [
                {
                    _key: 'bullet_1_en',
                    bold: 'Single source of truth:',
                    text: 'No separate databases, spreadsheets, or fragile API sync scripts.',
                },
                {
                    _key: 'bullet_2_en',
                    bold: 'Zero duplicate entry:',
                    text: 'Lease contracts, indexations, and invoices post directly as validated journal entries into your GL.',
                },
                {
                    _key: 'bullet_3_en',
                    bold: '100% Realtime data integrity:',
                    text: 'Instant reliable insights for auditors, executives, and property managers.',
                },
            ],
            bgImagePath: '/emlinked/apps/bg_naadloze_integratie_section.jpg',
        },
        {
            _key: 'apps_testimonial_en',
            _type: 'testimonialSection',
            sectionTitle: 'Designed for portfolios from 50+ rental units up',
            sectionSubtitle:
                'Whether managing retail chains, housing portfolios, or commercial assets: our modular applications are engineered to scale seamlessly with your growth.',
            testimonials: [
                {
                    _key: 't_quote_1_en',
                    author: 'Operations Director',
                    quote: 'By deploying the combined property management software and payment engine, we process hundreds of lease contracts and indexations without ever touching an Excel spreadsheet.',
                    role: 'Commercial Real Estate Management',
                },
            ],
        },
        {
            _key: 'apps_cta_en',
            _type: 'ctaBanner',
            tag: 'START AUTOMATING TODAY',
            title: 'Ready to modernize your real estate management software?',
            subtitle:
                'Experience how emlinked modular apps cut administrative burden in half and maximize financial control.',
            buttonLabel: 'Request a free live demo',
            buttonLink: '#demo',
            secondaryButtonLabel: 'View pricing & plans ➔',
            secondaryButtonLink: '/prijzen',
        },
    ];

    await client
        .patch('page-apps-en')
        .set({ pageBlocks: enPageBlocks })
        .commit();
    console.log(
        '✓ Successfully synced all 5 blocks for page-apps-en in Sanity!',
    );
}

syncAppsPageBlocks();
