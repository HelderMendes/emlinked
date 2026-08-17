const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

async function syncPrijzenPage() {
    console.log('🚀 Updating /prijzen pages (page-prijzen-nl & page-prijzen-en) in Sanity...\n');

    // 1. Dutch Document (page-prijzen-nl)
    const docNL = {
        _id: 'page-prijzen-nl',
        _type: 'page',
        title: 'Prijzen & Tarieven',
        language: 'nl',
        slug: { _type: 'slug', current: '/prijzen' },
        seo: {
            _type: 'seoFields',
            seoTitle: 'Transparante Prijzen & Tarieven | emlinked',
            seoDescription: 'Bereken eenvoudig de maandelijkse kosten voor jouw vastgoedbeheer. Transparant abonnement gebaseerd op het aantal contracten, met flexibele opschaling.',
            canonical: 'https://www.emlinked.nl/prijzen'
        },
        pageBlocks: [
            {
                _key: 'hero_prijzen_nl',
                _type: 'hero',
                label: 'HELDERE PRIJZEN, EENVOUDIG OPGESCHAALD',
                title: 'Een abonnement dat past bij jouw vastgoedportefeuille',
                subtitle: 'emlinked werkt met een transparant abonnement dat meegroeit met je vastgoedbeheer. Zo start het abonnement bij € 173,76 per maand voor 100 contracten (slechts € 1,74 per contract) en daalt de prijs per contract naarmate je portefeuille groeit.',
                ctaLabel: 'Bereken je abonnement ↓',
                ctaLink: '#calculator',
                secondaryCtaLabel: 'Spreek met ons',
                secondaryCtaLink: '/contact',
                showProof: true,
                proofText: 'Vertrouwd door professionele vastgoedbeheerders en controllers',
                imagePath: '/hero/vastgoedportfeuille_aangifte-klaar.jpg'
            },
            {
                _key: 'calc_section_nl',
                _type: 'pricingCalculator',
                sectionTag: 'BEREKEN JE ABONNEMENT',
                sectionTitle: 'Bereken je abonnement',
                sectionSubtitle: 'Beheer tot 100 contracten vanaf € 173,76 per maand (inclusief 1 gebruiker).'
            },
            {
                _key: 'strippenkaarten_section_nl',
                _type: 'featuresList',
                sectionTag: 'FLEXIBELE ONDERSTEUNING',
                sectionTitle: 'Strippenkaarten: De voordeligste oplossing voor de beste support',
                sectionSubtitle: 'Alle diensten en ondersteuning van emlinked kunnen eenvoudig betaald worden met onze strippenkaart. Onze strippenkaarten zijn verkrijgbaar in 5 uur, 10 uur en 20 uur. Hoe groter de strippenkaart, hoe hoger de korting op het uurtarief.',
                features: [
                    {
                        _key: 'sk_5u',
                        title: '5 Uur Strippenkaart (€ 550,-)',
                        description: 'Ideaal voor korte vragen, snelle instellingen en lichte ondersteuning.',
                        icon: 'check'
                    },
                    {
                        _key: 'sk_10u',
                        title: '10 Uur Strippenkaart (€ 899,-)',
                        description: 'Perfect voor periodieke begeleiding en aanvullende inrichting.',
                        icon: 'check'
                    },
                    {
                        _key: 'sk_20u',
                        title: '20 Uur Strippenkaart (€ 1.599,-)',
                        description: 'De meest voordelige optie voor uitgebreide ondersteuning, projecten en trainingen op maat.',
                        icon: 'check'
                    }
                ]
            },
            {
                _key: 'cta_prijzen_nl',
                _type: 'ctaBanner',
                tag: 'ADVIESGESPREK',
                title: 'Vragen over de tarieven of een specifieke portefeuille?',
                subtitle: 'Onze vastgoedbeheerspecialisten denken graag met je mee over de beste inrichting voor jouw organisatie.',
                buttonLabel: 'Plan een vrijblijvend adviesgesprek',
                buttonLink: '/contact'
            }
        ]
    };

    // 2. English Document (page-prijzen-en)
    const docEN = {
        _id: 'page-prijzen-en',
        _type: 'page',
        title: 'Pricing',
        language: 'en',
        slug: { _type: 'slug', current: 'prijzen' },
        seo: {
            _type: 'seoFields',
            seoTitle: 'Transparent Pricing & Rates | emlinked',
            seoDescription:
                'Easily calculate the monthly costs for your property management. Transparent subscription based on contract count, with flexible scaling.',
            canonical: 'https://www.emlinked.com/en/pricing',
        },
        pageBlocks: [
            {
                _key: 'hero_prijzen_en',
                _type: 'hero',
                label: 'TRANSPARENT PRICING, SCALED EASILY',
                title: 'A subscription tailored to your real estate portfolio',
                subtitle:
                    'emlinked offers a transparent subscription model that grows with your property management. Subscriptions start at €173.76 per month for 100 contracts (just €1.74 per contract), with lower rates per contract as your portfolio expands.',
                ctaLabel: 'Calculate your subscription ↓',
                ctaLink: '#calculator',
                secondaryCtaLabel: 'Talk to us',
                secondaryCtaLink: '/en/contact',
                showProof: true,
                proofText:
                    'Trusted by professional real estate managers & controllers',
                imagePath: '/hero/vastgoedportfeuille_aangifte-klaar.jpg',
            },
            {
                _key: 'calc_section_en',
                _type: 'pricingCalculator',
                sectionTag: 'CALCULATE YOUR SUBSCRIPTION',
                sectionTitle: 'Calculate your subscription',
                sectionSubtitle:
                    'Manage up to 100 contracts from €173.76 per month (includes 1 user).',
            },
            {
                _key: 'strippenkaarten_section_en',
                _type: 'featuresList',
                sectionTag: 'FLEXIBLE SUPPORT',
                sectionTitle:
                    'Prepaid Support Packs: The most cost-effective support',
                sectionSubtitle:
                    'All emlinked services and support can easily be paid using our prepaid support packs. Available in 5-hour, 10-hour, and 20-hour packs. The larger the pack, the higher the hourly discount.',
                features: [
                    {
                        _key: 'sk_5u_en',
                        title: '5 Hour Support Pack (€ 550,-)',
                        description:
                            'Ideal for quick questions, fast configuration, and light support.',
                        icon: 'check',
                    },
                    {
                        _key: 'sk_10u_en',
                        title: '10 Hour Support Pack (€ 899,-)',
                        description:
                            'Perfect for periodic guidance and ongoing setup assistance.',
                        icon: 'check',
                    },
                    {
                        _key: 'sk_20u_en',
                        title: '20 Hour Support Pack (€ 1.599,-)',
                        description:
                            'The most cost-effective option for comprehensive support, projects, and tailored training.',
                        icon: 'check',
                    },
                ],
            },
            {
                _key: 'cta_prijzen_en',
                _type: 'ctaBanner',
                tag: 'CONSULTATION',
                title: 'Questions about rates or a specific portfolio?',
                subtitle:
                    'Our property management specialists are happy to advise you on the best setup for your organization.',
                buttonLabel: 'Schedule a consultation',
                buttonLink: '/en/contact',
            },
        ],
    };

    try {
        await client.createOrReplace(docNL);
        console.log('✅ Updated page-prijzen-nl in Sanity');
        await client.createOrReplace(docEN);
        console.log('✅ Updated page-prijzen-en in Sanity');
    } catch (e) {
        console.error('❌ Failed to update Sanity pricing pages:', e);
    }
}

syncPrijzenPage();
