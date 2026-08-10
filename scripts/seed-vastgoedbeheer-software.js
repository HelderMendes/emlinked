require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-07-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

const structuredDataJSON = JSON.stringify(
    {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': 'https://emlinked.nl/vastgoedbeheer-software#webpage',
                url: 'https://emlinked.nl/vastgoedbeheer-software',
                name: 'Vastgoedbeheer Software — Automatiseer uw Portefeuillebeheer | emlinked',
                description:
                    'Geavanceerde vastgoedbeheer software voor beheerders, retailketens en woningcorporaties. Volledig geautomatiseerd en native gekoppeld aan Business Central.',
                inLanguage: 'nl-NL',
                isPartOf: {
                    '@type': 'WebSite',
                    '@id': 'https://emlinked.nl/#website',
                },
            },
            {
                '@type': 'BreadcrumbList',
                '@id': 'https://emlinked.nl/vastgoedbeheer-software#breadcrumb',
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: 'https://emlinked.nl',
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Onze apps',
                        item: 'https://emlinked.nl/apps',
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: 'Vastgoedbeheer software',
                        item: 'https://emlinked.nl/vastgoedbeheer-software',
                    },
                ],
            },
            {
                '@type': 'SoftwareApplication',
                '@id': 'https://emlinked.nl/vastgoedbeheer-software#software',
                name: 'Emlinked Vastgoedbeheer Software',
                applicationCategory: 'BusinessApplication',
                operatingSystem:
                    'Web-based, Microsoft Dynamics 365 Business Central',
                softwareRequirements: 'Microsoft Dynamics 365 Business Central',
                description:
                    'De core SaaS module voor vastgoedbeheer. Automatiseer contracten, CPI-indexaties, servicekosten en metragebeheer native in Business Central.',
                publisher: {
                    '@type': 'Organization',
                    name: 'Emlinked',
                    url: 'https://emlinked.nl',
                },
            },
        ],
    },
    null,
    2,
);

const vastgoedbeheerDoc = {
    _type: 'solutionPage',
    title: 'Vastgoedbeheer software',
    language: 'nl',
    slug: { _type: 'slug', current: 'vastgoedbeheer-software' },
    badge: 'CORE SAAS MODULE VOOR VASTGOEDMANAGEMENT',
    tagline:
        'Professionele vastgoedbeheer software voor uw complete portefeuille',
    description:
        'Schaal uw vastgoedoperatie zonder administratieve chaos. Onze vastgoedbeheer software automatiseert uw huurovereenkomsten, periodieke CPI-indexaties, wisselende winkelmetrages en servicekostenafrekeningen native binnen Microsoft Dynamics 365 Business Central. Speciaal ontwikkeld voor portefeuilles vanaf 50 verhuureenheden.',
    seo: {
        seoTitle:
            'Vastgoedbeheer Software — Automatiseer uw Portefeuillebeheer | emlinked',
        seoDescription:
            'Geavanceerde vastgoedbeheer software voor beheerders, retailketens en woningcorporaties. Volledig geautomatiseerd en native gekoppeld aan Business Central.',
        canonical: 'https://emlinked.nl/vastgoedbeheer-software',
        noIndex: false,
        structuredData: structuredDataJSON,
    },
    benefits: [
        'Geen handmatige huurverhogingen meer — CPI indexatie in één klik',
        '100% native verwerking in Microsoft Dynamics 365 Business Central',
        'Geautomatiseerde en wet-compliant servicekostenafrekeningen',
        'Realtime inzicht in bruto/netto rendement, leegstand en balansen',
        'Ondersteunt retailmetrages, omzethuur en gemengde portefeuilles',
    ],
    proof: [
        { stat: '87%', label: 'Tijdsbesparing bij indexaties' },
        { stat: '< 2 min', label: 'Van ontvangst naar boeking' },
        { stat: '100%', label: 'Afletter-nauwkeurigheid' },
    ],
    features: [
        {
            _key: 'feature-1',
            icon: 'Zap',
            title: 'Geautomatiseerde CPI-Indexaties & Contractbeheer',
            text: 'Vergeet handmatige berekeningen op de eerste van de maand. Onze software voor vastgoedbeheer haalt automatisch de nieuwste CBS CPI-indexcijfers op, berekent de nieuwe huursommen en past deze direct toe op al uw lopende huurovereenkomsten.',
        },
        {
            _key: 'feature-2',
            icon: 'FileText',
            title: 'Dynamisch Metrage- & Retailbeheer',
            text: 'Speciaal ingericht voor de uitdagingen van retailketens en commercieel vastgoed. Beheer wisselende winkelindelingen, verschillende metrage-types, omzethuurafspraken en locatiespecifieke onderhoudscontracten centraal in één dashboard.',
        },
        {
            _key: 'feature-3',
            icon: 'BarChart3',
            title: 'Servicekosten & Subsidieafrekeningen',
            text: 'Bepaal, voorschot en verreken servicekosten transparant voor uw huurders of woningcorporatie. Alle voorschotten en werkelijke gemaakte kosten worden direct gematcht met inkoopfacturen via Document Capture.',
        },
    ],
    cta: {
        title: 'Ervaar de kracht van geautomatiseerd vastgoedbeheer',
        desc: 'Sluit aan bij professionele beheerders en controllers die hun administratieve lasten halveren met Emlinked. Vraag vandaag nog een vrijblijvende demonstratie aan en ontdek de voordelen voor uw portefeuille.',
        primary: 'Vastgoedbeheer software demo aanvragen',
        secondary: 'Bekijk onze tarieven & prijzen ➔',
    },
};

async function seed() {
    console.log('Seeding Vastgoedbeheer Software page in Sanity...');
    try {
        const docId = 'solution-vastgoedbeheer-software-nl';
        const draftDocId = 'drafts.solution-vastgoedbeheer-software-nl';

        await client.createOrReplace({
            _id: docId,
            ...vastgoedbeheerDoc,
        });
        console.log(`Successfully published ${docId}`);

        await client.createOrReplace({
            _id: draftDocId,
            ...vastgoedbeheerDoc,
        });
        console.log(`Successfully updated draft ${draftDocId}`);
    } catch (e) {
        console.error('Error seeding Sanity:', e);
    }
}

seed();
