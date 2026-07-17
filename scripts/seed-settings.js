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
        title: 'Onze apps',
        path: '/vastgoedsoftware',
        links: [
            {
                _key: 'link_nl_1_1',
                title: 'Vastgoedbeheer software',
                path: '/oplossingen/vastgoedbeheer-software',
                description: 'De core SaaS module voor vastgoedmanagement.',
            },
            {
                _key: 'link_nl_1_2',
                title: 'Huurdersportaal',
                path: '/oplossingen/huurdersportaal',
                description: 'Self-service portaal voor communicatie & meldingen.',
            },
            {
                _key: 'link_nl_1_3',
                title: 'Payment software',
                path: '/oplossingen/payment',
                description: 'Geautomatiseerde betalingstransacties.',
            },
        ],
    },
    {
        _type: 'menuLink',
        _key: 'menu_nl_2',
        title: 'Box3-check ⚡',
        path: '/kennisbank/box3-check',
    },
    {
        _type: 'menuLink',
        _key: 'menu_nl_3',
        title: 'Partners software',
        path: '/integraties',
    },
    {
        _type: 'menuLink',
        _key: 'menu_nl_4',
        title: 'Prijzen',
        path: '/prijzen',
    },
    {
        _type: 'menuLink',
        _key: 'menu_nl_5',
        title: 'Referenties',
        path: '/referenties',
    },
    {
        _type: 'menuLink',
        _key: 'menu_nl_6',
        title: 'Team',
        path: '/over-ons',
    },
    {
        _type: 'menuLink',
        _key: 'menu_nl_7',
        title: 'Nieuws',
        path: '/nieuws',
    },
];

const enMenu = [
    {
        _type: 'menuDropdown',
        _key: 'menu_en_1',
        title: 'Our apps',
        path: '/vastgoedsoftware',
        links: [
            {
                _key: 'link_en_1_1',
                title: 'Property Management Software',
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
        ],
    },
    {
        _type: 'menuLink',
        _key: 'menu_en_2',
        title: 'Box3 Check ⚡',
        path: '/kennisbank/box3-check',
    },
    {
        _type: 'menuLink',
        _key: 'menu_en_3',
        title: 'Partners Software',
        path: '/integraties',
    },
    {
        _type: 'menuLink',
        _key: 'menu_en_4',
        title: 'Pricing',
        path: '/prijzen',
    },
    {
        _type: 'menuLink',
        _key: 'menu_en_5',
        title: 'References',
        path: '/referenties',
    },
    {
        _type: 'menuLink',
        _key: 'menu_en_6',
        title: 'Team',
        path: '/over-ons',
    },
    {
        _type: 'menuLink',
        _key: 'menu_en_7',
        title: 'News',
        path: '/nieuws',
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

        // Seed pricing pages
        const nlPricingPage = {
            _id: 'page-prijzen-nl',
            _type: 'page',
            title: 'Flexibele Prijzen',
            language: 'nl',
            slug: { _type: 'slug', current: 'prijzen' },
            tagline: 'Transparante tarieven afgestemd op de omvang van uw vastgoedportefeuille.',
            desc: 'Of u nu een groeiende particuliere belegger bent of een grote corporatie met duizenden verhuureenheden (VHE), Emlinked groeit met u mee. Neem contact op voor een offerte op maat.',
            pageBlocks: [
                {
                    _type: 'pricingBlock',
                    _key: 'block_pricing_nl',
                    sectionTitle: 'Tarieven',
                    sectionSubtitle: 'Kies het plan dat past bij uw verhuurportefeuille. Alle prijzen zijn transparant en native geïntegreerd met uw Business Central grootboek.',
                    tiers: [
                        {
                            title: 'Professional',
                            subtitle: 'Voor middelgrote portefeuilles',
                            price: 'Vanaf € 299',
                            unit: 'per maand',
                            badge: 'Populair',
                            features: [
                                'Tot 250 verhuureenheden (VHE)',
                                'Native Business Central Sync',
                                'Automatische indexaties & facturatie',
                                'Koppeling met 1 bankrekening (PSD2)',
                                'Standaard Helpdesk support',
                            ],
                            ctaLabel: 'Demo inplannen',
                            ctaLink: '/contact',
                        },
                        {
                            title: 'Enterprise',
                            subtitle: 'Voor grootschalig beheer & corporaties',
                            price: 'Op aanvraag',
                            unit: 'maatwerk',
                            badge: 'Custom',
                            features: [
                                'Onbeperkt aantal verhuureenheden',
                                'Multi-entity administratie support',
                                'Meerdere bankrekeningen gekoppeld',
                                'Continia & Idyn add-ons integratie',
                                'Dedicated accountmanager & SLA',
                            ],
                            ctaLabel: 'Offerte aanvragen',
                            ctaLink: '/contact',
                        }
                    ]
                }
            ]
        };

        const enPricingPage = {
            _id: 'page-prijzen-en',
            _type: 'page',
            title: 'Flexible Pricing',
            language: 'en',
            slug: { _type: 'slug', current: 'prijzen' },
            tagline: 'Transparent rates tailored to the size of your property portfolio.',
            desc: 'Whether you are a growing private investor or a large enterprise managing thousands of units, Emlinked scales with you. Contact us for a custom proposal.',
            pageBlocks: [
                {
                    _type: 'pricingBlock',
                    _key: 'block_pricing_en',
                    sectionTitle: 'Pricing Plans',
                    sectionSubtitle: 'Choose the plan that fits your rental portfolio. All rates are native and integrated with Microsoft Dynamics.',
                    tiers: [
                        {
                            title: 'Professional',
                            subtitle: 'For mid-sized portfolios',
                            price: 'From € 299',
                            unit: 'per month',
                            badge: 'Popular',
                            features: [
                                'Up to 250 units (VHE)',
                                'Native Business Central Sync',
                                'Automated rent indexation & billing',
                                'Single bank account link (PSD2)',
                                'Standard support desk access',
                            ],
                            ctaLabel: 'Schedule Demo',
                            ctaLink: '/contact',
                        },
                        {
                            title: 'Enterprise',
                            subtitle: 'For institutional portfolios & funds',
                            price: 'On request',
                            unit: 'custom terms',
                            badge: 'Custom',
                            features: [
                                'Unlimited units',
                                'Multi-entity company setups',
                                'Multiple bank account syncs',
                                'Full Continia & Idyn integrations',
                                'Dedicated Account Manager & SLA',
                            ],
                            ctaLabel: 'Request Quote',
                            ctaLink: '/contact',
                        }
                    ]
                }
            ]
        };

        // Seed over ons pages
        const nlOverOnsPage = {
            _id: 'page-overons-nl',
            _type: 'page',
            title: 'De brug tussen vastgoed en',
            language: 'nl',
            slug: { _type: 'slug', current: 'over-ons' },
            tagline: 'Emlinked is ontstaan vanuit één duidelijke frustratie: het gat tussen operationeel vastgoedbeheer en de financiële administratie. Wij lossen dit op door software native te integreren in uw Microsoft ERP.',
            pageBlocks: [
                {
                    _type: 'teamBlock',
                    _key: 'block_team_nl',
                    sectionTitle: 'Onze Specialisten',
                    sectionSubtitle: 'De ontwikkelaars en vastgoedexperts die dagelijks bouwen aan de stabiliteit en kracht van Emlinked.',
                    members: [
                        {
                            name: 'Coen Mendes',
                            role: 'Oprichter & Lead Architect',
                            bio: 'Met meer dan 15 jaar ervaring in ERP-architecturen richtte Coen Emlinked op om de dagelijkse afletterings- en dubbele boekingsproblemen definitief op te lossen.'
                        },
                        {
                            name: 'Dynamics & BC Specialist',
                            role: 'Lead Business Central Engineer',
                            bio: 'Specialist in Microsoft Dynamics AL development en extensies. Verantwoordelijk voor de native werking en databasekoppelingen binnen BC.'
                        },
                        {
                            name: 'Customer Success & Support',
                            role: 'Support Lead',
                            bio: 'Zorgt voor een soepele onboarding en begeleidt de implementatietrajecten bij professionele vastgoedbeheerders.'
                        }
                    ]
                }
            ]
        };

        const enOverOnsPage = {
            _id: 'page-overons-en',
            _type: 'page',
            title: 'The Bridge Between Property &',
            language: 'en',
            slug: { _type: 'slug', current: 'over-ons' },
            tagline: 'Emlinked was founded to solve the structural disconnect between property operations and financial administrations. We build native extensions that live directly inside Microsoft Dynamics.',
            pageBlocks: [
                {
                    _type: 'teamBlock',
                    _key: 'block_team_en',
                    sectionTitle: 'Meet Our Specialists',
                    sectionSubtitle: 'The engineers and property software experts building Emlinked every day.',
                    members: [
                        {
                            name: 'Coen Mendes',
                            role: 'Founder & Lead Architect',
                            bio: 'With over 15 years of experience in ERP architectures, Coen founded Emlinked to solve the reconciliation bottleneck between property operations and accounting.'
                        },
                        {
                            name: 'Dynamics & BC Specialist',
                            role: 'Lead Business Central Engineer',
                            bio: 'Expert in Microsoft Dynamics extensions and AL language. Responsible for the native integration and database synchronization.'
                        },
                        {
                            name: 'Customer Success & Support',
                            role: 'Support Lead',
                            bio: 'Dedicated to ensuring seamless onboarding and providing technical assistance for institutional real estate managers.'
                        }
                    ]
                }
            ]
        };

        // Seed references pages
        const nlReferentiesPage = {
            _id: 'page-referenties-nl',
            _type: 'page',
            title: 'Referenties & Klantcases',
            language: 'nl',
            slug: { _type: 'slug', current: 'referenties' },
            tagline: 'Wat onze klanten zeggen over Emlinked.',
            desc: 'Vastgoedbeheerders en beleggers vertrouwen dagelijks op Emlinked om hun operationele en financiële processen te automatiseren.',
            pageBlocks: [
                {
                    _type: 'testimonialSection',
                    _key: 'block_testimonials_nl',
                    sectionTitle: 'Klantverhalen',
                    testimonials: [
                        {
                            quote: 'Emlinked heeft onze verwerkingstijd voor servicekostenafrekeningen met 80% verminderd dankzij de directe koppeling met Business Central.',
                            author: 'Financieel Directeur',
                            role: 'Real Estate Asset Management'
                        },
                        {
                            quote: 'Ons huurdersportaal van Emlinked neemt dagelijks tientallen telefoontjes weg. Storingen worden direct met de juiste foto’s geregistreerd.',
                            author: 'Operationeel Manager',
                            role: 'Portefeuillebeheer B.V.'
                        }
                    ]
                }
            ]
        };

        const enReferentiesPage = {
            _id: 'page-referenties-en',
            _type: 'page',
            title: 'References & Customer Cases',
            language: 'en',
            slug: { _type: 'slug', current: 'referenties' },
            tagline: 'What our clients say about Emlinked.',
            desc: 'Property managers and investors trust Emlinked daily to run their operational and financial sync loops.',
            pageBlocks: [
                {
                    _type: 'testimonialSection',
                    _key: 'block_testimonials_en',
                    sectionTitle: 'Customer Success Stories',
                    testimonials: [
                        {
                            quote: 'Emlinked has reduced our processing time for service charge settlements by 80% thanks to its direct integration with Business Central.',
                            author: 'Finance Director',
                            role: 'Real Estate Asset Management'
                        },
                        {
                            quote: 'Our Emlinked tenant portal eliminates dozens of calls daily. Maintenance requests are logged autonomously with photo uploads.',
                            author: 'Operations Manager',
                            role: 'Portefeuillebeheer B.V.'
                        }
                    ]
                }
            ]
        };

        await client.createOrReplace(nlPricingPage);
        await client.createOrReplace(enPricingPage);
        await client.createOrReplace(nlOverOnsPage);
        await client.createOrReplace(enOverOnsPage);
        await client.createOrReplace(nlReferentiesPage);
        await client.createOrReplace(enReferentiesPage);
        console.log('Successfully seeded dynamic page documents!');

    } catch (e) {
        console.error('Error seeding site settings:', e);
    }
}

seed();
