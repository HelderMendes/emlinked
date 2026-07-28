const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_API_TOKEN || 'skEoqcjiKHYHIdWOejUHg5tpQQF2UkVMy0MALrKgGUNV91iff9GJq24fikB1oMITmDg5v9d7WMQYqUg2z3goIjZO1MmFXna0y8i76FgAbKtafBJ2hcBDVxFlGuaUVmZoJ8xhBhiZCSi70f5JbDMwvYJXzDzFsYNaEsX1bCDNYqKJiULY1OwD',
    apiVersion: '2024-01-01',
    useCdn: false,
});

const nlBlocks = [
    {
        _key: 'hero_nl',
        _type: 'hero',
        label: 'DE STANDAARD VOOR MODERN VASTGOEDBEHEER',
        title: 'Uw vastgoedportefeuille altijd *automatisch* aangifte-klaar',
        subtitle: 'Met Emlinked vastgoedbeheer software beheer je je huurcontracten, operationele kosten en financiële administratie native in één systeem. Speciaal ontwikkeld voor vastgoedportefeuilles vanaf 50 verhuureenheden. Volledig geïntegreerd met Microsoft Business Central.',
        ctaLabel: 'Gratis demo aanvragen',
        ctaLink: '/contact',
        secondaryCtaLabel: 'Koppeling ontdekken',
        secondaryCtaLink: '/integraties',
        showProof: true,
        proofText: 'Vertrouwd door professionele vastgoedbeheerders en controllers',
        cardTitle: 'LIVE PORTFOLIO METRICS',
        cardStats: [
            {
                _key: 's1',
                badgeText: 'Geautomatiseerd',
                badgeType: 'good',
                label: 'Foutloze CPI-Indexatie',
                value: '100%',
            },
            {
                _key: 's2',
                badgeText: 'Reconciliatie',
                badgeType: 'blue',
                label: 'Bankaflettering (PSD2)',
                value: 'Direct',
            },
            {
                _key: 's3',
                badgeText: 'Grootboek-synchroon',
                badgeType: 'good',
                label: 'Business Central Boekingen',
                value: 'Native',
            },
        ],
    },
    {
        _key: 'trustbar_nl',
        _type: 'trustBar',
        items: [
            {
                _key: 't1',
                icon: 'shield',
                text: 'Gebouwd op Microsoft Business Central',
            },
            {
                _key: 't2',
                icon: 'check',
                text: 'Realtime bankreconciliatie & aflettering',
            },
            {
                _key: 't3',
                icon: 'star',
                text: 'Eén centrale bron voor al je operationele data',
            },
        ],
    },
    {
        _key: 'features-core-block',
        _type: 'featuresList',
        sectionTag: 'MODULAIR EN FLEXIBEL',
        sectionTitle: 'Drie krachtige apps, één naadloze workflow',
        sectionSubtitle: 'Onze applicaties werken perfect samen om de kloof tussen je dagelijkse operationele taken en de financiële kern van je organisatie te dichten. Kies de modules die je beheer optimaliseren.',
        features: [
            {
                _key: 'app1',
                title: 'Vastgoedbeheer software',
                description: 'De operationele motor voor je vastgoedportefeuille. Automatiseer complexe huurovereenkomsten, periodieke CPI-indexaties, servicekostenberekeningen en metrage-beheer zonder handmatige Excel-lijsten.',
                icon: 'trending-up',
                imagePath: '/emlinked/home/DrieKrachtigeApps_VastgoedbeheerSoftware.png',
            },
            {
                _key: 'app2',
                title: 'Huurdersportaal',
                description: 'Geef je huurders de regie en verlaag de administratieve druk. Via het self-service portaal dienen huurders zelf reparatieverzoeken in, downloaden ze documenten en communiceren ze direct met je beheerteam.',
                icon: 'file-text',
                imagePath: '/emlinked/home/Huurdersportaal.png',
            },
            {
                _key: 'app3',
                title: 'Payment software',
                description: 'Automatiseer je volledige huurincasso en betaalstromen. Dankzij de directe banking-koppeling worden SEPA-incasso’s klaargezet, huurpenningen automatisch geïnd en openstaande posten direct afgeletterd.',
                icon: 'cpu',
                imagePath: '/emlinked/home/DrieKrachtigeApps_PaymentSoftware.png',
            },
        ],
    },
    {
        _key: 'integrations-partner-block',
        _type: 'integrationsList',
        sectionTag: 'ERP INTEGRATIE',
        sectionTitle: 'De directe koppeling met Microsoft Dynamics 365 Business Central',
        sectionSubtitle: 'Veel platformen beloven een koppeling, maar Emlinked werkt native binnen je ERP-omgeving. Dit betekent: geen handmatige exports, geen gecompliceerde API-fouten en absolute data-integriteit. Elke operationele mutatie landt direct als gevalideerde journaalpost in je grootboek.',
        integrations: [
            {
                _key: 'i1',
                title: 'Business Central',
                badge: 'ERP Core',
                description: 'Je volledige financiële administratie en vastgoedbeheer in één gedeelde database.',
                footerSpec: 'Direct DB Schema',
                statusText: 'Core Database',
                imagePlaceholder: 'business-central',
            },
            {
                _key: 'i2',
                title: 'Document Capture',
                badge: 'Factuurverwerking',
                description: 'Automatische herkenning en verwerking van inkoopfacturen voor onderhoud en servicekosten.',
                footerSpec: 'Continia OCR Engine',
                statusText: 'Auto-Matching',
                imagePlaceholder: 'document-capture',
            },
            {
                _key: 'i3',
                title: 'Direct Banking',
                badge: 'PSD2 Bankkoppeling',
                description: 'Directe, beveiligde bankkoppeling voor automatische aflettering van je bankafschriften.',
                footerSpec: 'PSD2 / ISO 20022',
                statusText: 'Live Reconciled',
                imagePlaceholder: 'direct-banking',
            },
        ],
    },
    {
        _key: 'box3-check-lead-magnet',
        _type: 'featuresList',
        sectionTag: 'FISCALE OPTIMALISATIE',
        sectionTitle: 'Zekerheid over je vastgoedportefeuille? Doe de Box 3-check ⚡',
        sectionSubtitle: 'De voortdurend veranderende wet- en regelgeving rondom de Box 3-belasting vraagt om proactief beheer. Is je portefeuille optimaal gestructureerd voor de nieuwste fiscale normen? Onze geïntegreerde rekentool geeft je direct inzicht.',
        features: [
            {
                _key: 'b1',
                title: 'Bereken binnen 2 minuten je fiscale risico’s.',
                description: 'Direct helder inzicht in je portefeuille en fiscale hefboom.',
                icon: 'check',
            },
            {
                _key: 'b2',
                title: 'Ontvang een concreet optimalisatierapport in je mailbox.',
                description: 'Praktische actiepunten klaar voor overleg met je accountant.',
                icon: 'check',
            },
            {
                _key: 'b3',
                title: 'Ontdek hoe je je operationele kosten efficiënter kunt doorbelasten.',
                description: 'Maximale aftrekbaarheid van onderhouds- en beheerlasten.',
                icon: 'check',
            },
        ],
    },
    {
        _key: 'cta-bottom-block',
        _type: 'ctaBanner',
        tag: 'DIGITALISERING',
        title: 'Klaar om je vastgoedbeheer te digitaliseren?',
        subtitle: 'Sluit aan bij de professionele beheerders die handmatig werk hebben geëlimineerd en kiezen voor 100% realtime controle binnen Business Central.',
        buttonLabel: 'Vraag een live demonstratie aan',
        buttonLink: '/contact',
    },
];

const enBlocks = [
    {
        _key: 'hero_en',
        _type: 'hero',
        label: 'THE STANDARD FOR MODERN PROPERTY MANAGEMENT',
        title: 'Your real estate portfolio always *tax-ready* and automated',
        subtitle: 'With Emlinked property management software, manage your leases, operational costs, and accounting natively in one system. Purpose-built for portfolios over 50 units. Natively synced with Microsoft Business Central.',
        ctaLabel: 'Request a Free Demo',
        ctaLink: '/contact',
        secondaryCtaLabel: 'Explore Integrations',
        secondaryCtaLink: '/integraties',
        showProof: true,
        proofText: 'Trusted by professional real estate managers & controllers',
        cardTitle: 'LIVE PORTFOLIO METRICS',
        cardStats: [
            {
                _key: 's1',
                badgeText: 'Automated',
                badgeType: 'good',
                label: 'Error-free CPI Indexation',
                value: '100%',
            },
            {
                _key: 's2',
                badgeText: 'Reconciled',
                badgeType: 'blue',
                label: 'Bank Reconciliation (PSD2)',
                value: 'Instant',
            },
            {
                _key: 's3',
                badgeText: 'Ledger-Synced',
                badgeType: 'good',
                label: 'Business Central Postings',
                value: 'Native',
            },
        ],
    },
    {
        _key: 'trustbar_en',
        _type: 'trustBar',
        items: [
            {
                _key: 't1',
                icon: 'shield',
                text: 'Built on Microsoft Business Central',
            },
            {
                _key: 't2',
                icon: 'check',
                text: 'Real-time Bank Reconciliation & Matching',
            },
            {
                _key: 't3',
                icon: 'star',
                text: 'Single Source of Truth for Operational Data',
            },
        ],
    },
    {
        _key: 'features-core-block-en',
        _type: 'featuresList',
        sectionTag: 'MODULAR AND FLEXIBLE',
        sectionTitle: 'Three powerful apps, one seamless workflow',
        sectionSubtitle: 'Our applications work together seamlessly to close the gap between daily operations and your organization’s core financial ledger.',
        features: [
            {
                _key: 'app1',
                title: 'Property management software',
                description: 'The operational core engine for your real estate portfolio. Automate complex leases, periodic CPI indexations, service charge calculations, and space management without manual spreadsheets.',
                icon: 'trending-up',
                imagePath: '/emlinked/home/DrieKrachtigeApps_VastgoedbeheerSoftware.png',
            },
            {
                _key: 'app2',
                title: 'Tenant Portal',
                description: 'Empower tenants while reducing administrative workload. Through the self-service portal, tenants submit maintenance requests, download documents, and communicate with your team.',
                icon: 'file-text',
                imagePath: '/emlinked/home/Huurdersportaal.png',
            },
            {
                _key: 'app3',
                title: 'Payment software',
                description: 'Automate your entire rent collection and payment workflows. Direct banking integration stages SEPA direct debits, collects rent, and reconciles open items instantly.',
                icon: 'cpu',
                imagePath: '/emlinked/home/DrieKrachtigeApps_PaymentSoftware.png',
            },
        ],
    },
    {
        _key: 'integrations-partner-block-en',
        _type: 'integrationsList',
        sectionTag: 'ERP INTEGRATION',
        sectionTitle: 'Direct native integration with Microsoft Dynamics 365 Business Central',
        sectionSubtitle: 'Many platforms promise integration, but Emlinked works natively within your ERP environment: no manual CSV exports, no complex API breaks, and absolute data integrity. Every operational change posts immediately to your general ledger.',
        integrations: [
            {
                _key: 'i1',
                title: 'Business Central',
                badge: 'ERP Core',
                description: 'Your complete financial accounting and property management in a single shared database.',
                footerSpec: 'Direct DB Schema',
                statusText: 'Core Database',
                imagePlaceholder: 'business-central',
            },
            {
                _key: 'i2',
                title: 'Document Capture',
                badge: 'Invoice OCR',
                description: 'Automated recognition and processing of purchase invoices for maintenance and utility costs.',
                footerSpec: 'Continia OCR Engine',
                statusText: 'Auto-Matching',
                imagePlaceholder: 'document-capture',
            },
            {
                _key: 'i3',
                title: 'Direct Banking',
                badge: 'PSD2 Banking',
                description: 'Secure direct bank feeds for automated reconciliation of bank statements.',
                footerSpec: 'PSD2 / ISO 20022',
                statusText: 'Live Reconciled',
                imagePlaceholder: 'direct-banking',
            },
        ],
    },
    {
        _key: 'box3-check-lead-magnet-en',
        _type: 'featuresList',
        sectionTag: 'TAX OPTIMIZATION',
        sectionTitle: 'Certainty about your real estate portfolio? Try the Box 3 Check ⚡',
        sectionSubtitle: 'Evolving tax regulations around real estate require proactive portfolio management. Is your portfolio optimized for upcoming tax reforms? Our calculator gives instant clarity.',
        features: [
            {
                _key: 'b1',
                title: 'Calculate your tax risks in under 2 minutes.',
                description: 'Instant visibility into your portfolio yield and leverage.',
                icon: 'check',
            },
            {
                _key: 'b2',
                title: 'Receive an actionable optimization report in your inbox.',
                description: 'Clear action items ready for discussion with your accountant.',
                icon: 'check',
            },
            {
                _key: 'b3',
                title: 'Discover how to pass through operational expenses efficiently.',
                description: 'Maximize tax deductibility for maintenance and management fees.',
                icon: 'check',
            },
        ],
    },
    {
        _key: 'cta-bottom-block-en',
        _type: 'ctaBanner',
        tag: 'DIGITIZATION',
        title: 'Ready to digitize your real estate operations?',
        subtitle: 'Join leading property managers who eliminated manual work and chose 100% real-time control inside Business Central.',
        buttonLabel: 'Request a Live Demo',
        buttonLink: '/contact',
    },
];

async function updateHomepageSanityContent() {
    console.log("Seeding full homepage content to Sanity Cloud (NL & EN)...");

    // Patch NL Homepage
    await client
        .patch('c8071896-4119-41e3-b095-ab5d2134d27f')
        .set({ pageBlocks: nlBlocks })
        .commit();
    console.log("✓ Updated NL Homepage pageBlocks in Sanity!");

    // Patch EN Homepage
    await client
        .patch('Ujl1Ky5GJWpKWiHmkpetx1')
        .set({ pageBlocks: enBlocks })
        .commit();
    console.log("✓ Updated EN Homepage pageBlocks in Sanity!");
}

updateHomepageSanityContent().catch(console.error);
