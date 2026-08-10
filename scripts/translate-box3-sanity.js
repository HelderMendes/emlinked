const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

async function translateBox3Page() {
    console.log('🚀 Starting Box 3 Check Sanity Translation Script...\n');

    // 1. Full Dutch voor-wie block definition to ensure NL source is 100% complete
    const completeVoorWieNL = {
        _key: 'voor-wie-block-nl',
        _type: 'featuresList',
        badge: 'Voor Wie',
        title: 'Vastgoedbeheer met 50+ eenheden loopt snel vast',
        description:
            'Huurcontracten op één plek, onderhoudskosten elders, en de fiscale administratie verspreid over losse documenten. Vanaf 2028 verwacht de Belastingdienst dat u per pand exact kunt aantonen wat het werkelijke rendement is geweest.',
        fiscalContext: {
            badge: 'Wetgeving 2028',
            title: 'Fiscale Context: Wet werkelijk rendement box 3',
            text: 'Vastgoedeigenaren krijgen een formele administratie- en bewaarplicht. Huurinkomsten, onderhoudskosten en verbeteringskosten moeten per pand aantoonbaar zijn met brondocumenten.',
        },
        items: [
            {
                _key: 'pain-1',
                title: 'Data verspreid over Excel-bestanden',
                text: 'Versieconflicten en handmatige imports belemmeren een betrouwbaar totaaloverzicht.',
            },
            {
                _key: 'pain-2',
                title: 'Beheer en boekhouding als losse eilanden',
                text: 'Contractbeheer staat los van de financiën, met dubbel werk als gevolg.',
            },
            {
                _key: 'pain-3',
                title: 'Kostendocumentatie niet op orde',
                text: 'Facturen voor onderhoud ontbreken of zijn niet direct toegewezen aan het specifieke object.',
            },
            {
                _key: 'pain-4',
                title: 'Accountant wacht altijd op u',
                text: 'Kwartaal- en jaarafsluitingen duren lang omdat gegevens handmatig verzameld moeten worden.',
            },
        ],
    };

    // 2. Fetch current NL document
    const nlDoc = await client.fetch('*[_id == "page-box3-check-nl"][0]');
    if (!nlDoc) {
        console.error('❌ NL document page-box3-check-nl not found in Sanity!');
        return;
    }

    // Ensure NL document has complete pageBlocks
    let nlBlocks = nlDoc.pageBlocks || [];
    const voorWieIndex = nlBlocks.findIndex(
        (b) => b._type === 'featuresList' || b._key === 'voor-wie-block-nl',
    );
    if (voorWieIndex !== -1) {
        nlBlocks[voorWieIndex] = completeVoorWieNL;
    } else {
        nlBlocks.splice(2, 0, completeVoorWieNL);
    }

    // Patch NL document to make sure it's 100% complete
    await client
        .patch('page-box3-check-nl')
        .set({ pageBlocks: nlBlocks })
        .commit();
    console.log(
        '✓ Verified and updated NL document page-box3-check-nl in Sanity!',
    );

    // 3. Construct 100% translated English pageBlocks for page-box3-check-en
    const enPageBlocks = [
        {
            _key: 'hero-block-en',
            _type: 'hero',
            label: 'ADMINISTRATION OBLIGATION 2028 · PARLIAMENT APPROVED',
            title: 'Your real estate portfolio always *tax-audit ready*.',
            subtitle:
                'emlinked manages your lease agreements, operating costs, and financial administration in one streamlined system. Specifically engineered for portfolios from 50 rental units up. Built natively on Microsoft Business Central.',
            ctaLabel: 'Request Free Demo',
            ctaLink: '/en/contact',
            secondaryCtaLabel: 'Calculate Box 3 impact →',
            secondaryCtaLink: '#calculator',
            proofText: 'Designed for 50+ property portfolios',
            heroCard: {
                badge: 'MICROSOFT BUSINESS CENTRAL',
                title: 'Real Estate Management Suite',
                status: '100% Synced',
            },
        },
        {
            _key: 'announcement-block-en',
            _type: 'announcement',
            badge: 'New · Box 3 Act 2028',
            text: 'Property owners get a formal recordkeeping obligation. Do you know what to track?',
            ctaLabel: 'Calculate your situation →',
            ctaLink: '#calculator',
        },
        {
            _key: 'voor-wie-block-en',
            _type: 'featuresList',
            badge: 'Target Audience',
            title: 'Real estate management with 50+ units gets stuck fast',
            description:
                'Lease contracts stored in one place, maintenance expenses elsewhere, and tax records scattered across loose spreadsheets. From 2028, tax authorities require exact proof per property of your actual net yield.',
            fiscalContext: {
                badge: 'Audit Proof 2028',
                title: 'Tax Context: Actual Yield Act Box 3',
                text: 'Property owners are subject to a formal recordkeeping and retention obligation. Rental income, maintenance expenses, and improvement costs must be verifiable per property with source documents.',
            },
            items: [
                {
                    _key: 'pain-1-en',
                    title: 'Data Scattered Across Excel',
                    text: 'Version conflicts and manual imports impede a reliable complete portfolio overview.',
                },
                {
                    _key: 'pain-2-en',
                    title: 'Management & Finance Siloed',
                    text: 'Contract management is separated from financial ledgers, resulting in duplicate work.',
                },
                {
                    _key: 'pain-3-en',
                    title: 'Cost Proof Missing',
                    text: 'Maintenance invoices are missing or not directly linked to specific properties.',
                },
                {
                    _key: 'pain-4-en',
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
                    _key: 'step-1-en',
                    step: '01',
                    title: 'Centralize Properties & Contracts',
                    text: 'WOZ values, lease contracts, CPI indexations, and vacancies managed in one single place.',
                    feature: 'Automatic CPI Lease Indexation',
                },
                {
                    _key: 'step-2-en',
                    step: '02',
                    title: 'Expenses Logged Automatically',
                    text: 'Maintenance, service fees, and mortgage interest directly deductible and organized for tax audits.',
                    feature: 'Box 3 Audit Export Module',
                },
                {
                    _key: 'step-3-en',
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
            badge: 'Free Tool · No Registration Required',
            calculatorType: 'box3',
            title: 'Will your real estate remain profitable after 2028?',
            subtitle:
                'Enter your figures. See instantly whether you are better or worse off under the new Box 3 actual yield rules.',
            featureTitle: 'What emlinked automatically tracks',
            featureItems: [
                'Net rental yield per property per year',
                'Maintenance and service charge invoices',
                'Mortgage interest per property — automatically deductible',
                'WOZ property values & value appreciation',
                'Exportable for your accountant',
            ],
        },
        {
            _key: 'ecosystem-block-en',
            _type: 'ecosystemSection',
            badge: 'MICROSOFT ECOSYSTEM',
            title: 'The reliability of Microsoft. The expertise of emlinked.',
            subtitle:
                'emlinked is engineered as a certified solution on Microsoft Business Central — the ERP standard for over 50,000 companies worldwide. Benefit from enterprise-grade security, continuity, and seamless integration with Excel and Power BI.',
            cardTitle: 'Microsoft Business Central',
            cardSubtitle: 'Certified Dynamics 365 Module',
            cardPoints: [
                'Native ERP general ledger integration',
                'Automated SEPA & bank reconciliation',
                'Full audit trail for tax authorities',
            ],
            trustItems: [
                {
                    _key: 't1-en',
                    title: 'Enterprise Security',
                    desc: 'ISO 27001 & SOC 2 Certified',
                },
                {
                    _key: 't2-en',
                    title: 'Power BI Analytics',
                    desc: 'Real-time financial dashboards',
                },
                {
                    _key: 't3-en',
                    title: '50,000+ Companies',
                    desc: 'Proven global ERP foundation',
                },
            ],
        },
        {
            _key: 'cta-banner-block-en',
            _type: 'ctaBanner',
            badge: 'Ready for 2028?',
            title: 'Keep your real estate yields audit-proof with emlinked',
            subtitle:
                'Request a non-binding demonstration today and discover how our modular Business Central software transforms your management.',
            buttonText: 'Schedule Free Demonstration',
            buttonLink: '/en/contact',
            imagePath: '/emlinked/box3/box3-automatiseren.jpg',
        },
    ];

    const enSeo = {
        _type: 'seoFields',
        seoTitle:
            'Box 3 Check: Calculate the Tax Impact on Your Real Estate | emlinked',
        seoDescription:
            'Calculate the tax impact of changing Box 3 legislation on your real estate portfolio in 2 minutes. Immediate insight and personalized report.',
        canonical: 'https://emlinked.com/en/box3-check',
    };

    const enPayload = {
        _id: 'page-box3-check-en',
        _type: 'page',
        title: 'Box 3 Real Estate Check ⚡',
        language: 'en',
        slug: { _type: 'slug', current: 'box3-check' },
        pageBlocks: enPageBlocks,
        seo: enSeo,
    };

    await client.createOrReplace(enPayload);
    console.log(
        '✓ Successfully translated and updated page-box3-check-en in Sanity!',
    );
}

translateBox3Page();
