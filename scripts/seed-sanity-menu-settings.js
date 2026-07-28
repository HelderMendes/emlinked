const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2024-01-01',
    useCdn: false,
});

const nlMenu = [
    {
        _type: 'menuDropdown',
        _key: 'menu-onze-apps-nl',
        title: 'Onze apps',
        path: '/vastgoedsoftware',
        links: [
            {
                _key: 'app-vastgoedbeheer',
                title: 'Vastgoedbeheer software',
                path: '/oplossingen/vastgoedbeheer-software',
                description: 'De core SaaS module voor vastgoedmanagement.',
            },
            {
                _key: 'app-huurdersportaal',
                title: 'Huurdersportaal',
                path: '/oplossingen/huurdersportaal',
                description:
                    'Self-service portaal voor communicatie & meldingen.',
            },
            {
                _key: 'app-payment-software',
                title: 'Payment software',
                path: '/oplossingen/payment',
                description: 'Geautomatiseerde betalingstransacties.',
            },
        ],
    },
    {
        _type: 'menuLink',
        _key: 'menu-box3-nl',
        title: 'Box3-check ⚡',
        path: '/kennisbank/box3-check',
    },
    {
        _type: 'menuLink',
        _key: 'menu-partners-nl',
        title: 'Partners software',
        path: '/integraties',
    },
    {
        _type: 'menuLink',
        _key: 'menu-prijzen-nl',
        title: 'Prijzen',
        path: '/prijzen',
    },
    {
        _type: 'menuLink',
        _key: 'menu-referenties-nl',
        title: 'Referenties',
        path: '/referenties',
    },
    {
        _type: 'menuLink',
        _key: 'menu-team-nl',
        title: 'Team',
        path: '/team',
    },
];

const enMenu = [
    {
        _type: 'menuDropdown',
        _key: 'menu-our-apps-en',
        title: 'Our apps',
        path: '/vastgoedsoftware',
        links: [
            {
                _key: 'app-property-management-en',
                title: 'Property management software',
                path: '/oplossingen/vastgoedbeheer-software',
                description: 'Core SaaS property management module.',
            },
            {
                _key: 'app-tenant-portal-en',
                title: 'Tenant Portal',
                path: '/oplossingen/huurdersportaal',
                description: 'Self-service portal for support tickets.',
            },
            {
                _key: 'app-payment-software-en',
                title: 'Payment software',
                path: '/oplossingen/payment',
                description: 'Automated billing transactions.',
            },
        ],
    },
    {
        _type: 'menuLink',
        _key: 'menu-box3-en',
        title: 'Box3-check ⚡',
        path: '/kennisbank/box3-check',
    },
    {
        _type: 'menuLink',
        _key: 'menu-partners-en',
        title: 'Partner software',
        path: '/integraties',
    },
    {
        _type: 'menuLink',
        _key: 'menu-pricing-en',
        title: 'Pricing',
        path: '/prijzen',
    },
    {
        _type: 'menuLink',
        _key: 'menu-references-en',
        title: 'References',
        path: '/referenties',
    },
    {
        _type: 'menuLink',
        _key: 'menu-team-en',
        title: 'Team',
        path: '/team',
    },
];

async function updateSiteSettings() {
    console.log("Updating siteSettings-nl and siteSettings-en in Sanity...");

    await client.createIfNotExists({
        _id: 'siteSettings-nl',
        _type: 'siteSettings',
        language: 'nl',
        siteName: 'emlinked',
    });
    await client.patch('siteSettings-nl').set({ navigationMenu: nlMenu }).commit();
    console.log("✓ Updated siteSettings-nl navigation menu!");

    await client.createIfNotExists({
        _id: 'siteSettings-en',
        _type: 'siteSettings',
        language: 'en',
        siteName: 'emlinked',
    });
    await client.patch('siteSettings-en').set({ navigationMenu: enMenu }).commit();
    console.log("✓ Updated siteSettings-en navigation menu!");
}

updateSiteSettings().catch(console.error);
