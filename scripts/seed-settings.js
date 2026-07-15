require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-07-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

const nlMenu = [
    {
        _type: 'menuDropdown',
        _key: 'menu_nl_1',
        title: 'Vastgoedsoftware',
        path: '/vastgoedsoftware',
        links: [
            {
                _key: 'link_nl_1_1',
                title: 'Vastgoedbeheer',
                path: '/oplossingen/vastgoedbeheer-software',
                description: 'De core SaaS module voor vastgoedmanagement.',
            },
            {
                _key: 'link_nl_1_2',
                title: 'Huurdersportaal',
                path: '/oplossingen/huurdersportaal',
                description:
                    'Self-service portaal voor communicatie & meldingen.',
            },
            {
                _key: 'link_nl_1_3',
                title: 'Payment Software',
                path: '/oplossingen/payment',
                description: 'Geautomatiseerde betalingstransacties.',
            },
            {
                _key: 'link_nl_1_4',
                title: 'Referenties',
                path: '/referenties',
                description: 'Klantverhalen en succesvolle implementaties.',
            },
        ],
    },
    {
        _type: 'menuDropdown',
        _key: 'menu_nl_2',
        title: 'Functionaliteiten',
        path: '/functies',
        links: [
            {
                _key: 'link_nl_2_1',
                title: 'CPI Indexatie',
                path: '/kennisbank/box3-check',
                description:
                    'Automatische huurverhogingen op basis van CBS-indexen.',
            },
            {
                _key: 'link_nl_2_2',
                title: 'Huurprolongatie',
                path: '/oplossingen/vastgoedbeheer-software',
                description: 'Geautomatiseerde kwartaal- en maandfacturatie.',
            },
            {
                _key: 'link_nl_2_3',
                title: 'Business Central Koppeling',
                path: '/integraties',
                description: 'Native Dynamics Business Central integratie.',
            },
        ],
    },
    {
        _type: 'menuLink',
        _key: 'menu_nl_3',
        title: 'Over ons',
        path: '/over-ons',
    },
    {
        _type: 'menuLink',
        _key: 'menu_nl_4',
        title: 'Nieuws',
        path: '/nieuws',
    },
    {
        _type: 'menuLink',
        _key: 'menu_nl_5',
        title: 'Prijzen',
        path: '/prijzen',
    },
];

const enMenu = [
    {
        _type: 'menuDropdown',
        _key: 'menu_en_1',
        title: 'Property Software',
        path: '/vastgoedsoftware',
        links: [
            {
                _key: 'link_en_1_1',
                title: 'Property Management',
                path: '/oplossingen/vastgoedbeheer-software',
                description: 'Core SaaS property management module.',
            },
            {
                _key: 'link_en_1_2',
                title: 'Tenant Portal',
                path: '/oplossingen/huurdersportaal',
                description: 'Self-service portal for support tickets.',
            },
            {
                _key: 'link_en_1_3',
                title: 'Payment Software',
                path: '/oplossingen/payment',
                description: 'Automated billing transactions.',
            },
            {
                _key: 'link_en_1_4',
                title: 'References',
                path: '/referenties',
                description: 'Customer success stories and references.',
            },
        ],
    },
    {
        _type: 'menuDropdown',
        _key: 'menu_en_2',
        title: 'Capabilities',
        path: '/functies',
        links: [
            {
                _key: 'link_en_2_1',
                title: 'CPI Indexation',
                path: '/kennisbank/box3-check',
                description: 'Automated CBS-based lease adjustments.',
            },
            {
                _key: 'link_en_2_2',
                title: 'Rent Invoicing',
                path: '/oplossingen/vastgoedbeheer-software',
                description: 'Recurring billing runs.',
            },
            {
                _key: 'link_en_2_3',
                title: 'Business Central Integration',
                path: '/integraties',
                description: 'Native Dynamics Business Central ledger sync.',
            },
        ],
    },
    {
        _type: 'menuLink',
        _key: 'menu_en_3',
        title: 'About Us',
        path: '/over-ons',
    },
    {
        _type: 'menuLink',
        _key: 'menu_en_4',
        title: 'News',
        path: '/nieuws',
    },
    {
        _type: 'menuLink',
        _key: 'menu_en_5',
        title: 'Pricing',
        path: '/prijzen',
    },
];

async function seed() {
    console.log('Seeding site settings...');

    const nlDoc = {
        _id: 'siteSettings-nl',
        _type: 'siteSettings',
        title: 'Nederlandse Instellingen',
        language: 'nl',
        announcementActive: true,
        announcementText:
            'Belangrijke update: Emlinked is nu volledig gecertificeerd voor Dynamics 365 Business Central v24.',
        announcementLink: '/integraties',
        phone: '+31 (0)88 707 7000',
        email: 'support@emlinked.nl',
        address: 'Keizersgracht 241, 1016 EA Amsterdam',
        linkedinUrl: 'https://linkedin.com/company/emlinked',
        twitterUrl: 'https://x.com/emlinked',
        calendlyUrl: 'https://calendly.com',
        navigationMenu: nlMenu,
    };

    const enDoc = {
        _id: 'siteSettings-en',
        _type: 'siteSettings',
        title: 'English Settings',
        language: 'en',
        announcementActive: true,
        announcementText:
            'Important update: Emlinked is now fully certified for Dynamics 365 Business Central v24.',
        announcementLink: '/integraties',
        phone: '+31 (0)88 707 7000',
        email: 'support@emlinked.com',
        address: 'Keizersgracht 241, 1016 EA Amsterdam',
        linkedinUrl: 'https://linkedin.com/company/emlinked',
        twitterUrl: 'https://x.com/emlinked',
        calendlyUrl: 'https://calendly.com',
        navigationMenu: enMenu,
    };

    try {
        await client.createOrReplace(nlDoc);
        console.log('Successfully seeded Dutch Settings!');
        await client.createOrReplace(enDoc);
        console.log('Successfully seeded English Settings!');
    } catch (e) {
        console.error('Error seeding site settings:', e);
    }
}

seed();
