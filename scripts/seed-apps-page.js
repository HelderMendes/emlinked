require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-07-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

async function seedAppsPage() {
    console.log('Seeding "Onze apps" overview page to Sanity...');

    const appsNLDoc = {
        _id: 'page-apps-nl',
        _type: 'page',
        language: 'nl',
        title: 'Onze Vastgoedsoftware Apps & Modules',
        slug: { _type: 'slug', current: 'apps' },
        seo: {
            seoTitle: 'Native Microsoft Dynamics Vastgoedsoftware Suite | emlinked',
            seoDescription: 'Ontdek de modulaire vastgoedsoftware van emlinked. Geïntegreerde applicaties voor vastgoedbeheer, huurdersportalen en geautomatiseerde betalingen direct in Business Central.',
            canonical: 'https://emlinked.nl/apps',
            noIndex: false,
        },
        pageBlocks: [
            {
                _type: 'hero',
                _key: 'apps_hero_nl',
                label: 'DE MODULAIRE VASTGOEDSOFTWARE SUITE',
                title: 'Eén geïntegreerd vastgoedbeheer platform voor Microsoft Business Central',
                subtitle:
                    'Met de modulaire vastgoedsoftware van Emlinked elimineer je handmatige Excel-lijsten, losse software-eilanden en dubbele administratie. Onze drie specialistische applicaties verbinden je dagelijkse vastgoedoperatie direct met je financiële administratie in Microsoft Dynamics 365 Business Central.',
                ctaLabel: 'Gratis demo aanvragen',
                ctaLink: '#demo',
                secondaryCtaLabel: 'Doe de Box 3-check ⚡',
                secondaryCtaLink: '/box3-check',
                imagePath: '/emlinked/apps/apps_hero.png',
            },
            {
                _type: 'featuresList',
                _key: 'apps_grid_nl',
                sectionTag: 'DRIE KRACHTIGE APPS',
                sectionTitle: 'Kies de modules die je vastgoedorganisatie versterken',
                sectionSubtitle:
                    'Met onze drie specialistische applicaties bouw je de ideale software-combinatie voor jouw vastgoedportfolio.',
                features: [
                    {
                        _key: 'app_card_1',
                        badge: 'Core Operatie & Admin',
                        title: 'Vastgoedbeheer software',
                        description:
                            'De operationele motor voor je retailportefeuille, woningbezit of commercieel vastgoed. Automatiseer ingewikkelde huurovereenkomsten, periodieke CPI-indexaties, wisselende metrage-types en locatiespecifieke onderhoudscontracten zonder risico op menselijke fouten.',
                        bullets: [
                            'Automatische CPI-indexaties & huurprolongaties',
                            'Flexibel contract- en metragebeheer voor retail en woningen',
                            'Native verwerking van journaalposten in Business Central',
                        ],
                        ctaLabel: 'Ontdek Vastgoedbeheer Software ➔',
                        ctaLink: '/vastgoedbeheer-software',
                        imagePath: '/emlinked/apps/app_vastgoedbeheer.png',
                    },
                    {
                        _key: 'app_card_2',
                        badge: 'Self-Service & Communicatie',
                        title: 'Huurdersportaal software',
                        description:
                            'Verlaag de werkdruk op je beheerteam en verhoog de huurdertevredenheid. Via het digitale self-service portaal dienen huurders 24/7 reparatieverzoeken in, bekijken ze hun betalingshistorie en downloaden ze huurdocumenten.',
                        bullets: [
                            'Onderhoudsmeldingen direct doorgestuurd naar beheerders',
                            '24/7 inzicht in huurfacturen en betalingsstatus',
                            'Realtime data-synchronisatie met de centrale database',
                        ],
                        ctaLabel: 'Ontdek het Huurdersportaal ➔',
                        ctaLink: '/huurdersportaal',
                        imagePath: '/emlinked/apps/app_huurdersportaal.png',
                    },
                    {
                        _key: 'app_card_3',
                        badge: 'Financiële Automatisering',
                        title: 'Payment software',
                        description:
                            'Geen handmatige aflettering meer. Automatiseer SEPA-incasso\'s en match inkomende betalingen direct met openstaande facturen in Business Central.',
                        bullets: [
                            'Geautomatiseerde SEPA Direct Debit incassostromen',
                            'Realtime bankreconciliatie via Direct Banking',
                            'Automatische herinneringen en dossieropbouw',
                        ],
                        ctaLabel: 'Payment Software ➔',
                        ctaLink: '/payment-software',
                        imagePath: '/emlinked/apps/app_payment.png',
                    },
                ],
            },
            {
                _type: 'testimonialSection',
                _key: 'apps_testimonial_nl',
                sectionTitle: 'Ontworpen voor portefeuilles vanaf 50 verhuureenheden',
                sectionSubtitle:
                    'Of je nu een retailketen beheert met uiteenlopende winkelpanden, een woningcorporatie stuurt of een grote commerciële portefeuille beheert: onze applicaties zijn gebouwd om mee te schalen.',
                testimonials: [
                    {
                        _key: 't_quote_1',
                        quote:
                            'Met de gecombineerde inzet van de vastgoedbeheer software en de payment engine verwerken wij honderden huurcontracten en indexaties zonder dat er één Excel-sheet aan te pas komt.',
                        author: 'Operations Director',
                        role: 'Commercial Real Estate Management',
                    },
                ],
            },
            {
                _type: 'ctaBanner',
                _key: 'apps_cta_nl',
                tag: 'START MET AUTOMATISEREN',
                title: 'Klaar om je vastgoedbeheer software te moderniseren?',
                subtitle:
                    'Ervaar zelf hoe de modulaire apps van Emlinked je administratieve lasten halveren en je financiële controle vergroten.',
                buttonLabel: 'Gratis live demo aanvragen',
                buttonLink: '#demo',
                secondaryButtonLabel: 'Bekijk tarieven & prijzen ➔',
                secondaryButtonLink: '/prijzen',
            },
        ],
    };

    const appsENDoc = {
        _id: 'page-apps-en',
        _type: 'page',
        language: 'en',
        title: 'Our Property Software Apps & Modules',
        slug: { _type: 'slug', current: 'apps' },
        seo: {
            seoTitle: 'Native Microsoft Dynamics Property Software Suite | emlinked',
            seoDescription: 'Discover Emlinked modular real estate software. Integrated applications for property management, tenant portals, and automated payments directly inside Business Central.',
            canonical: 'https://emlinked.nl/en/apps',
            noIndex: false,
        },
        pageBlocks: [
            {
                _type: 'hero',
                _key: 'apps_hero_en',
                label: 'MODULAR PROPERTY SOFTWARE SUITE',
                title: 'One integrated property management platform for Microsoft Business Central',
                subtitle:
                    'Eliminate manual Excel sheets, isolated software silos, and duplicate administration. Our three specialized applications connect your daily operations directly with your financial accounting in Business Central.',
                ctaLabel: 'Request a free demo',
                ctaLink: '/contact',
                secondaryCtaLabel: 'Check Box 3 impact ⚡',
                secondaryCtaLink: '/box3-check',
                imagePath: '/emlinked/apps/apps_hero.png',
            },
        ],
    };

    try {
        await client.createOrReplace(appsNLDoc);
        console.log('Successfully seeded NL "page-apps-nl" document in Sanity.');
        await client.createOrReplace(appsENDoc);
        console.log('Successfully seeded EN "page-apps-en" document in Sanity.');
    } catch (err) {
        console.error('Sanity seed warning (falling back gracefully on page):', err.message);
    }
}

seedAppsPage();
