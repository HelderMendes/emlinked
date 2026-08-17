const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

async function translateAppsPage() {
    console.log('🚀 Starting /apps Sanity English Translation Script...\n');

    // 1. Fetch current NL document
    const nlDoc = await client.fetch('*[_id == "page-apps-nl"][0]');
    if (!nlDoc) {
        console.error('❌ NL document page-apps-nl not found in Sanity!');
        return;
    }

    console.log('✓ Found NL document page-apps-nl with title:', nlDoc.title);

    // 2. Construct 100% translated English pageBlocks for page-apps-en
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
            secondaryCtaLink: '/en/box3-check',
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
                    ctaLink: '/en/apps/property-management-software',
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
                    ctaLink: '/en/apps/tenant-portal',
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
                    ctaLink: '/en/apps/payment-software',
                    imagePath: '/emlinked/apps/payment-software_modules.jpg',
                },
            ],
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
                    role: 'Commercial Real Estate Management',
                    quote: 'By deploying the combined property management software and payment engine, we process hundreds of lease contracts and indexations without ever touching an Excel spreadsheet.',
                },
            ],
        },
        {
            _key: 'apps_cta_en',
            _type: 'ctaBanner',
            badge: 'START AUTOMATING TODAY',
            title: 'Ready to modernize your real estate management software?',
            subtitle:
                'Experience how emlinked modular apps cut administrative burden in half and maximize financial control.',
            buttonText: 'Request a free live demo',
            buttonLink: '#demo',
            secondaryButtonText: 'View pricing & plans ➔',
            secondaryButtonLink: '/en/pricing',
        },
    ];

    const enSeo = {
        _type: 'seoFields',
        seoTitle:
            'Native Microsoft Dynamics Property Software Suite | emlinked',
        seoDescription:
            'Explore the modular real estate software suite for Microsoft Dynamics 365 Business Central. Integrated applications for property management, tenant portals, and payment automation.',
        canonical: 'https://emlinked.com/en/apps',
    };

    const enPayload = {
        _id: 'page-apps-en',
        _type: 'page',
        title: 'Our Property Software Apps & Modules',
        language: 'en',
        slug: { _type: 'slug', current: 'apps' },
        pageBlocks: enPageBlocks,
        seo: enSeo,
    };

    await client.createOrReplace(enPayload);
    console.log(
        '✓ Successfully translated and updated page-apps-en in Sanity!',
    );
}

translateAppsPage();
