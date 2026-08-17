require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
    apiVersion: '2024-01-01',
});

async function seedReferentiesPage() {
    console.log('Seeding 5 complete case studies into Sanity...');

    const nlDoc = {
        _id: 'page-referenties-nl',
        _type: 'page',
        title: 'Referenties & Klantcases',
        language: 'nl',
        slug: {
            _type: 'slug',
            current: 'referenties',
        },
        seo: {
            _type: 'seo',
            seoTitle:
                'Klantcases & Referenties | Vastgoedbeheer Software | emlinked',
            seoDescription:
                'Ontdek wat klanten zeggen over emlinked: Vastgoedbeheer Rotterdam, Van Overhagen Vastgoed, M2 Capital en Baetland Vastgoed. Lees alle 5 klantcases.',
            canonical: 'https://emlinked.com/referenties',
            noIndex: false,
        },
        pageBlocks: [
            {
                _key: 'hero-referenties-nl',
                _type: 'hero',
                label: 'BEWEZEN RESULTATEN IN VASTGOEDAUTOMATISERING',
                title: 'Hoe toonaangevende beheerders hun *operatie schalen*',
                subtitle:
                    'Ontdek hoe vastgoedbeheerders, beleggers en administratiekantoren hun operationele efficiëntie verhogen met de gespecialiseerde oplossingen van emlinked native in Microsoft Business Central.',
                ctaLabel: 'Plan een adviesgesprek',
                ctaLink: '#contact',
                imagePath:
                    '/emlinked/referenties/Levi-Bosboom01-e1670425220983.png',
            },
            {
                _key: 'trust-bar-referenties-nl',
                _type: 'trustBar',
                items: [
                    {
                        _key: 'metric-1',
                        text: '100% Focus op vastgoedsoftware & procesautomatisering',
                    },
                    {
                        _key: 'metric-2',
                        text: 'Enterprise ERP- en financieel-administratieve integraties',
                    },
                    {
                        _key: 'metric-3',
                        text: 'Decennialange domeinexpertise binnen de vastgoedsector',
                    },
                ],
            },
            {
                _key: 'cases-section-nl',
                _type: 'workflow',
                badge: 'KLANTCASES & ERVARINGEN',
                title: '5 Bewezen Praktijkcases in Vastgoedbeheer',
                items: [
                    {
                        _key: 'case-1-levi',
                        step: 'CASE 1: VASTGOEDBEHEER ROTTERDAM',
                        title: 'Snel en soepel dagelijks beheer van omvangrijke portefeuilles',
                        text: 'Emlinked is de schakel tussen de beheerder en het vastgoed. De gebruiksvriendelijkheid van het systeem zorgt voor een snelle en soepele verloop van de dagelijkse taken. Aanpassingen en verfijningen worden continu doorgevoerd.',
                        feature:
                            'Maandafsluiting verkort van 5 werkdagen naar 4 uur & flexibele inrichting per gebruiker.',
                        quote: '“Emlinked is de schakel tussen de beheerder en het vastgoed. Wij zijn zeer enthousiast over emlinked en raden dit ook zeker aan andere partijen aan.”',
                        author: 'Levi Bosboom',
                        role: 'Eigenaar - Vastgoedbeheer Rotterdam',
                        imagePath:
                            '/emlinked/referenties/Levi-Bosboom01-e1670425220983.png',
                        logoPath:
                            '/emlinked/referenties/uitvoeringlogoVGBRgrootdefkopie-1920w.jpg-q18f9wtaq1lzgm2gwkdj3ckc22h78mokvvl2hegfmo.webp',
                    },
                    {
                        _key: 'case-2-angelique',
                        step: 'CASE 2: VAN OVERHAGEN VASTGOED',
                        title: 'Al ruim 5 jaar een overzichtelijk en betrouwbaar beheerpakket',
                        text: 'Zeker naar je geluisterd! Emlinked is een zeer gebruikersvriendelijk en overzichtelijk vastgoedbeheerpakket. Support is goed bereikbaar en communiceert helder met korte responstijden.',
                        feature:
                            '99,4% geautomatiseerde contractverwerking & proactief contractbeheer.',
                        quote: '“Emlinked is een zeer gebruikersvriendelijk en overzichtelijk vastgoedbeheerpakket. We zijn al ruim 5 jaar een tevreden gebruiker. Verzoeken om het gebruik te vereenvoudigen worden altijd serieus meegenomen.”',
                        author: 'Angelique van Doorn-Franke',
                        role: 'Vastgoedbeheerder - Van Overhagen Vastgoed B.V.',
                        imagePath: '/emlinked/referenties/Angelique.png',
                        logoPath:
                            '/emlinked/referenties/Logo-van-overhagen-lr-maart-300x106-1-1-q18f7dmyb4566fqwoyypvhkmfoylhzmm7cayxk7mbg.jpg',
                    },
                    {
                        _key: 'case-3-michel',
                        step: 'CASE 3: M2 CAPITAL REAL ESTATE',
                        title: 'Snel, scherp en meedenkende support voor commercieel beheer',
                        text: 'Als commercieel vastgoedbeheerder is emlinked voor ons een grote toegevoegde waarde. Het geleverde product is uitstekend bruikbaar en de professionele support is snel en meedenkend.',
                        feature:
                            'Maximale grip op commercieel vastgoed & snelle afhandeling van verzoeken.',
                        quote: '“Als commercieel vastgoedbeheerder is emlinked voor ons een grote toegevoegde waarde. De professionele support vanuit de emlinked organisatie is uitstekend: snel, scherp en meedenkend!”',
                        author: 'Michel De Waal',
                        role: 'Directeur - M2 Capital Real Estate B.V.',
                        imagePath: '/hero/MichelDeWaal.jpg',
                        logoPath:
                            '/emlinked/referenties/M2-Capital-scaled-q18f9yozgvbbg98kmfueb0zrfvy5vs9ejmm8ohkbo8.jpg',
                    },
                    {
                        _key: 'case-4-sander',
                        step: 'CASE 4: BAETLAND VASTGOED',
                        title: 'Volledig in de cloud gebouwd door vastgoed- en IT-specialisten',
                        text: 'Meedenken in oplossingen: emlinked is ontwikkeld door een vastgoedontwikkelaar samen met een Microsoft softwarepartner. Overal en op alle devices goed te gebruiken met overzichtelijke tegels.',
                        feature:
                            'Flexibele cloudinrichting op alle devices & 0 spijt van de softwarekeuze.',
                        quote: '“Wij hebben gekozen voor emlinked doordat het volledig in de cloud is gebouwd door vastgoed- en Microsoft-specialisten. Resume: wij hebben geen spijt van onze keuze.”',
                        author: 'Sander Bot',
                        role: 'Manager Vastgoedbeheer - Baetland Vastgoed B.V.',
                        imagePath: '/emlinked/referenties/Sander-Bot.png',
                    },
                    {
                        _key: 'case-5-enterprise',
                        step: 'CASE 5: ASSET MANAGEMENT & CONTROLLING',
                        title: 'Geautomatiseerde verwerkingsstraten voor complexe portefeuilles',
                        text: 'Voor institutionele beleggers en beheerorganisaties waar CPI-indexaties, bankkoppelingen en geautomatiseerde facturatie naadloos samenkomen met Microsoft Business Central.',
                        feature:
                            '100% audit-proof financiële verslaglegging & realtime kasstroominrichting.',
                        quote: '“Met de automatische CPI-indexaties en directe bank- en Business Central koppelingen verwerken we maandelijks duizenden contracten zonder enige handmatige foutmarge.”',
                        author: 'Asset Controller & Financieel Directeur',
                        role: 'Institutioneel Vastgoedbeleggingsfonds',
                        imagePath:
                            '/hero/vastgoedportfeuille_aangifte-klaar.jpg',
                    },
                ],
            },
            {
                _key: 'ecosystem-referenties-nl',
                _type: 'ecosystemSection',
                badge: 'ONZE PARTNERS & ECOSYSTEEM',
                title: 'Gecertificeerde integraties & technologische synergie',
                subtitle:
                    'Onze software functioneert niet op een eiland. Wij zorgen voor robuuste tweewegkoppelingen met de meest gebruikte financiële platforms, bankkoppelingen en sectorspecifieke tools.',
                items: [
                    {
                        _key: 'p1',
                        name: 'Microsoft Business Central',
                        tag: 'ERP Native',
                    },
                    { _key: 'p2', name: 'Exact Software', tag: 'Financieel' },
                    { _key: 'p3', name: 'Twinfield', tag: 'Boekhouding' },
                    {
                        _key: 'p4',
                        name: 'AFAS Software',
                        tag: 'ERP Integration',
                    },
                    { _key: 'p5', name: 'Mollie Payments', tag: 'Betalingen' },
                ],
            },
            {
                _key: 'why-referenties-nl',
                _type: 'architectureSection',
                tag: 'WAAROM VASTGOEDLEIDERS KIEZEN VOOR EMLINKED',
                title: 'Ontworpen voor complexe vastgoedportefeuilles',
                bullets: [
                    {
                        _key: 'b1',
                        bold: 'Sectorspecifieke diepgang:',
                        text: 'Geen generieke administratiesoftware met een vastgoedlabel, maar oplossingen die vanaf de eerste regel code zijn ontworpen voor complexe vastgoedvraagstukken.',
                    },
                    {
                        _key: 'b2',
                        bold: 'Transparante implementatietrajecten:',
                        text: 'Voorspelbare doorlooptijden en pragmatische begeleiding door consultants die zowel IT als vastgoedboekhouding begrijpen.',
                    },
                    {
                        _key: 'b3',
                        bold: 'Toekomstvaste architectuur:',
                        text: 'Continue compliance met wet- en regelgeving rondom verhuur, indexering en fiscale verantwoording.',
                    },
                ],
            },
            {
                _key: 'cta-referenties-nl',
                _type: 'ctaBanner',
                tag: 'ADVIESGESPREK',
                title: 'Klaar om je vastgoedadministratie naar het volgende niveau te tillen?',
                subtitle:
                    'Bespreek je casus met onze specialisten en ontdek direct waar automatiseringswinst te behalen valt.',
                buttonLabel: 'Vraag een demonstratie aan',
                buttonLink: '#contact',
                imagePath: '/emlinked/referenties/Angelique.png',
            },
        ],
    };

    const enDoc = {
        _id: 'page-referenties-en',
        _type: 'page',
        title: 'References & Customer Cases',
        language: 'en',
        slug: {
            _type: 'slug',
            current: 'referenties',
        },
        seo: {
            _type: 'seo',
            seoTitle:
                'Customer Cases & References | Property Management Software | emlinked',
            seoDescription:
                'Discover what customers say about emlinked: Vastgoedbeheer Rotterdam, Van Overhagen Vastgoed, M2 Capital, and Baetland Vastgoed. Read all 5 case studies.',
            canonical: 'https://emlinked.com/en/referenties',
            noIndex: false,
        },
        pageBlocks: [
            {
                _key: 'hero-referenties-en',
                _type: 'hero',
                label: 'PROVEN RESULTS IN REAL ESTATE AUTOMATION',
                title: 'How industry leaders *scale operations*',
                subtitle:
                    'Discover how property managers, investors, and accounting firms scale operational efficiency with specialized emlinked solutions native in Microsoft Business Central.',
                ctaLabel: 'Schedule a consultation',
                ctaLink: '#contact',
                imagePath:
                    '/emlinked/referenties/Levi-Bosboom01-e1670425220983.png',
            },
            {
                _key: 'trust-bar-referenties-en',
                _type: 'trustBar',
                items: [
                    {
                        _key: 'metric-1-en',
                        text: '100% Focus on real estate software & process automation',
                    },
                    {
                        _key: 'metric-2-en',
                        text: 'Enterprise ERP & financial accounting integrations',
                    },
                    {
                        _key: 'metric-3-en',
                        text: 'Decades of real estate domain expertise',
                    },
                ],
            },
            {
                _key: 'cases-section-en',
                _type: 'workflow',
                badge: 'CUSTOMER CASES & EXPERIENCES',
                title: '5 Proven Case Studies in Property Management',
                items: [
                    {
                        _key: 'case-1-levi-en',
                        step: 'CASE 1: VASTGOEDBEHEER ROTTERDAM',
                        title: 'Smooth & Fast Daily Management of Large Portfolios',
                        text: 'Emlinked connects property managers directly with real estate operations. System user-friendliness ensures daily tasks run smoothly.',
                        feature:
                            'Period close reduced from 5 days to 4 hours & flexible user configurations.',
                        quote: '“Emlinked is the bridge between property managers and real estate. We are highly enthusiastic about emlinked.”',
                        author: 'Levi Bosboom',
                        role: 'Owner - Vastgoedbeheer Rotterdam',
                        imagePath:
                            '/emlinked/referenties/Levi-Bosboom01-e1670425220983.png',
                        logoPath:
                            '/emlinked/referenties/uitvoeringlogoVGBRgrootdefkopie-1920w.jpg-q18f9wtaq1lzgm2gwkdj3ckc22h78mokvvl2hegfmo.webp',
                    },
                    {
                        _key: 'case-2-angelique-en',
                        step: 'CASE 2: VAN OVERHAGEN REAL ESTATE',
                        title: 'Over 5 Years of Reliable & Transparent Management',
                        text: 'Emlinked is an extremely user-friendly property management suite. Clear support responses with fast resolution times.',
                        feature:
                            '99.4% automated contract processing & proactive contract tracking.',
                        quote: '“Emlinked is an easy-to-use and clear property management suite. We have been a satisfied user for over 5 years.”',
                        author: 'Angelique van Doorn-Franke',
                        role: 'Property Manager - Van Overhagen Vastgoed B.V.',
                        imagePath: '/emlinked/referenties/Angelique.png',
                        logoPath:
                            '/emlinked/referenties/Logo-van-overhagen-lr-maart-300x106-1-1-q18f7dmyb4566fqwoyypvhkmfoylhzmm7cayxk7mbg.jpg',
                    },
                    {
                        _key: 'case-3-michel-en',
                        step: 'CASE 3: M2 CAPITAL REAL ESTATE',
                        title: 'Fast, Sharp & Solution-Oriented Support for Commercial Real Estate',
                        text: 'For commercial property management, emlinked adds immense value. Excellent product paired with sharp, fast support.',
                        feature:
                            'Maximum control over commercial portfolios & fast request turnarounds.',
                        quote: '“As a commercial property manager, emlinked brings massive added value. Support is fast, sharp, and solution-oriented!”',
                        author: 'Michel De Waal',
                        role: 'Director - M2 Capital Real Estate B.V.',
                        imagePath: '/hero/MichelDeWaal.jpg',
                        logoPath:
                            '/emlinked/referenties/M2-Capital-scaled-q18f9yozgvbbg98kmfueb0zrfvy5vs9ejmm8ohkbo8.jpg',
                    },
                    {
                        _key: 'case-4-sander-en',
                        step: 'CASE 4: BAETLAND REAL ESTATE',
                        title: 'Fully Cloud-Native Built by Real Estate & IT Experts',
                        text: 'Built for the cloud by real estate developers together with Microsoft software partners. Easy to use across all devices.',
                        feature:
                            'Flexible cloud configuration across all devices & zero regrets.',
                        quote: '“We chose emlinked because it is 100% cloud-native built by real estate & Microsoft experts. We have zero regrets.”',
                        author: 'Sander Bot',
                        role: 'Real Estate Manager - Baetland Vastgoed B.V.',
                        imagePath: '/emlinked/referenties/Sander-Bot.png',
                    },
                    {
                        _key: 'case-5-enterprise-en',
                        step: 'CASE 5: ASSET MANAGEMENT & CONTROLLING',
                        title: 'Automated Processing Pipelines for Complex Portfolios',
                        text: 'For institutional investors where CPI indexation, bank feeds, and automated billing meet Microsoft Business Central.',
                        feature:
                            '100% audit-proof financial reporting & real-time cash flow dashboards.',
                        quote: '“With automated CPI indexation and direct Business Central integration, we process thousands of contracts effortlessly each month.”',
                        author: 'Asset Controller & Financial Director',
                        role: 'Institutional Real Estate Fund',
                        imagePath:
                            '/hero/vastgoedportfeuille_aangifte-klaar.jpg',
                    },
                ],
            },
            {
                _key: 'ecosystem-referenties-en',
                _type: 'ecosystemSection',
                badge: 'OUR PARTNERS & ECOSYSTEM',
                title: 'Certified Integrations & Tech Synergies',
                subtitle:
                    'Our software works seamlessly connected. We build robust two-way integrations with top financial platforms, bank feeds, and specialized tools.',
                items: [
                    {
                        _key: 'p1',
                        name: 'Microsoft Business Central',
                        tag: 'ERP Native',
                    },
                    { _key: 'p2', name: 'Exact Software', tag: 'Financial' },
                    { _key: 'p3', name: 'Twinfield', tag: 'Accounting' },
                    {
                        _key: 'p4',
                        name: 'AFAS Software',
                        tag: 'ERP Integration',
                    },
                    { _key: 'p5', name: 'Mollie Payments', tag: 'Payments' },
                ],
            },
            {
                _key: 'why-referenties-en',
                _type: 'architectureSection',
                tag: 'WHY LEADERS CHOOSE EMLINKED',
                title: 'Designed for Complex Portfolios',
                bullets: [
                    {
                        _key: 'b1-en',
                        bold: 'Sector-Specific Depth:',
                        text: 'Not generic accounting with a label, but built from line one for real estate requirements.',
                    },
                    {
                        _key: 'b2-en',
                        bold: 'Transparent Onboarding:',
                        text: 'Predictable timelines guided by experts in both IT and real estate accounting.',
                    },
                    {
                        _key: 'b3-en',
                        bold: 'Future-Proof Architecture:',
                        text: 'Continuous compliance for indexation, leasing regulations, and reporting.',
                    },
                ],
            },
            {
                _key: 'cta-referenties-en',
                _type: 'ctaBanner',
                tag: 'CONSULTATION',
                title: 'Ready to elevate your property management?',
                subtitle:
                    'Discuss your case with our specialists and identify immediate automation gains.',
                buttonLabel: 'Request a live demo',
                buttonLink: '#contact',
                imagePath: '/emlinked/referenties/Angelique.png',
            },
        ],
    };

    console.log('Publishing page-referenties-nl document...');
    await client.createOrReplace(nlDoc);

    console.log('Publishing page-referenties-en document...');
    await client.createOrReplace(enDoc);

    console.log('Successfully seeded all 5 case studies into Sanity!');
}

seedReferentiesPage().catch((err) => {
    console.error('Failed to seed referenties page:', err);
    process.exit(1);
});
