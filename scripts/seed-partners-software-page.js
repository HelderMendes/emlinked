require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
    apiVersion: '2024-01-01',
});

async function seedPartnersSoftwarePage() {
    console.log('Seeding partners-software page into Sanity...');

    const nlDoc = {
        _id: 'page-partners-software-nl',
        _type: 'page',
        title: 'Partners & Software Integraties',
        language: 'nl',
        slug: {
            _type: 'slug',
            current: 'partners-software',
        },
        seo: {
            _type: 'seo',
            seoTitle: 'Partners & Software Integraties (Business Central) | emlinked',
            seoDescription:
                'Ontdek alle strategische software-partners van emlinked. Naadloze, gecertificeerde integraties met Microsoft Business Central, Continia Document Capture en Idyn Direct Banking.',
            canonical: 'https://www.emlinked.nl/partners-software',
            noIndex: false,
        },
        pageBlocks: [
            {
                _key: 'hero-block-nl',
                _type: 'hero',
                label: 'STRATEGISCHE ECOSYSTEEM PARTNERS',
                title: 'Softwarepartners & *directe koppelingen* met je favoriete software',
                subtitle:
                    'emlinked is het resultaat van een unieke samenwerking tussen de vastgoedspecialisten van DRVM en Microsoft-partner faect. 100% cloud-native vastgoedsoftware — zonder omkijken naar handmatige updates of backups.',
                ctaLabel: 'Ontdek de integraties ↓',
                ctaLink: '/apps',
                secondaryCtaLabel: 'Spreek met ons',
                secondaryCtaLink: '/contact',
                imagePath: '/emlinked/partners/partners_hero.jpg',
            },
            {
                _key: 'partners-section-nl',
                _type: 'partnersSection',
                badge: 'ONZE STRATEGISCHE PARTNERS',
                title: 'Gebouwd op bewezen enterprise software',
                subtitle:
                    'Door nauw samen te werken met gecertificeerde Microsoft ISV-partners bieden we een complete, toekomstbestendige vastgoedoplossing.',
                partners: [
                    {
                        _key: 'partner-ms',
                        name: 'Microsoft Dynamics 365 Business Central',
                        badge: 'FOUNDATION ERP',
                        logoUrl:
                            '/emlinked/partners/Microsoft_Dynamics_Business-e1670413242458-2048x613.png',
                        description:
                            'Het fundament van emlinked is Microsoft Dynamics 365 Business Central, een oplossing voor bedrijfsbeheer voor kleine en middelgrote organisaties. Met Business Central beheren bedrijven hun volledige bedrijfsvoering — waaronder financiële administratie, contractbeheer, projectmanagement, inkoop en services. Emlinked maakt gebruik van deze schitterende Microsoft-mogelijkheid om Business Central volledig geschikt te maken voor vastgoedbeheer.',
                        featureTitle:
                            'Snel te implementeren & eenvoudig in gebruik',
                        featureText:
                            'Emlinked is snel te implementeren, gemakkelijk te configureren en eenvoud is het leidende principe achter de innovatie van ons productontwerp, de ontwikkeling en de bruikbaarheid.',
                        websiteUrl:
                            'https://dynamics.microsoft.com/nl-nl/business-central/overview/',
                    },
                    {
                        _key: 'partner-continia',
                        name: 'Continia Software — Document Capture',
                        badge: 'SLIMME FACTUURVERWERKING & OCR',
                        logoUrl:
                            '/emlinked/partners/Continia-e1670413209950.png',
                        description:
                            'Continia Software is een toonaangevende leverancier van oplossingen voor Business Central, die zorgen voor volledige transparantie, zodat je je kunt concentreren op belangrijkere zaken.',
                        featureTitle: 'OCR scanning beschikbaar voor emlinked',
                        featureText:
                            'Elimineer repetitieve handmatige gegevensinvoer met de intelligente OCR van Document Capture. De software vermindert het aantal fouten en bespaart je tijd door tekst te herkennen en direct in de juiste velden in je Business Central te plaatsen.',
                        websiteUrl: 'https://www.continia.com',
                    },
                    {
                        _key: 'partner-idyn',
                        name: 'Idyn — Direct Banking',
                        badge: 'AUTOMATISCHE BANKKOPPELING',
                        logoUrl:
                            '/emlinked/partners/IDYN_Direct-Banking-e1670413366713.png',
                        description:
                            'Vereenvoudig je bankprocessen. Direct Banking synchroniseert je bankrekeningen automatisch met emlinked (Microsoft Dynamics 365 Business Central). Hierdoor werken je inkomende en uitgaande transactieprocessen op een geïntegreerde manier.',
                        featureTitle: 'Volledig geïntegreerde bankaflettering',
                        featureText:
                            'Geen bestanden meer downloaden. Geen handmatige uploads. Geen gedoe. Direct Banking is direct beschikbaar binnen emlinked voor automatische verwerking van al je huurtransacties.',
                        websiteUrl: 'https://www.idyn.nl',
                    },
                ],
            },
            {
                _key: 'cta-banner-nl',
                _type: 'ctaBanner',
                badge: 'Klaar voor gestroomlijnd vastgoedbeheer?',
                title: 'Ervaar de kracht van emlinked en onze software-partners',
                subtitle:
                    'emlinked brengt commercieel, technisch en administratief vastgoedbeheer samen in één overzichtelijk platform. Zo werk je efficiënter, met minder fouten en meer grip op je portefeuille.',
                buttonText: 'Vraag vrijblijvend een demo aan',
                buttonLink: '/contact',
                imagePath: '/emlinked/partners/klaar-voor-gestroomlijnd.jpg',
            },
        ],
    };

    const enDoc = {
        _id: 'page-partners-software-en',
        _type: 'page',
        title: 'Partners & Software Integrations',
        language: 'en',
        slug: {
            _type: 'slug',
            current: 'partners-software',
        },
        seo: {
            _type: 'seo',
            seoTitle:
                'Partners & Software Integrations (Business Central) | emlinked',
            seoDescription:
                'Explore all strategic software partners of emlinked. Seamless, certified integrations with Microsoft Business Central, Continia Document Capture, and Idyn Direct Banking.',
            canonical: 'https://www.emlinked.nl/en/partners-software',
            noIndex: false,
        },
        pageBlocks: [
            {
                _key: 'hero-block-en',
                _type: 'hero',
                label: 'STRATEGIC ECOSYSTEM PARTNERS',
                title: 'Software Partners & *Direct Integrations* with Your Favorite Software',
                subtitle:
                    'emlinked is engineered in close collaboration between DRVM real estate specialists and Microsoft partner faect. Built 100% natively in the cloud with zero hassle over manual backups or software updates.',
                ctaLabel: 'Explore integrations ↓',
                ctaLink: '/en/apps',
                secondaryCtaLabel: 'Speak with us',
                secondaryCtaLink: '/en/contact',
                imagePath: '/emlinked/partners/partners_hero.jpg',
            },
            {
                _key: 'partners-section-en',
                _type: 'partnersSection',
                badge: 'OUR STRATEGIC PARTNERS',
                title: 'Built on proven enterprise software',
                subtitle:
                    'By working closely with certified Microsoft ISV partners, we deliver a complete, future-proof real estate management solution.',
                partners: [
                    {
                        _key: 'partner-ms-en',
                        name: 'Microsoft Dynamics 365 Business Central',
                        badge: 'FOUNDATION ERP',
                        logoUrl:
                            '/emlinked/partners/Microsoft_Dynamics_Business-e1670413242458-2048x613.png',
                        description:
                            'The foundation of emlinked is Microsoft Dynamics 365 Business Central, a premier business management solution for SMBs. With Business Central, companies manage their entire operations — including financial accounting, lease agreements, project management, purchasing, and services.',
                        featureTitle: 'Fast implementation & ease of use',
                        featureText:
                            'emlinked is fast to deploy, easy to configure, and simplicity is the guiding principle behind our product design, engineering, and usability.',
                        websiteUrl:
                            'https://dynamics.microsoft.com/en-us/business-central/overview/',
                    },
                    {
                        _key: 'partner-continia-en',
                        name: 'Continia Software — Document Capture',
                        badge: 'SMART INVOICE PROCESSING & OCR',
                        logoUrl:
                            '/emlinked/partners/Continia-e1670413209950.png',
                        description:
                            'Continia Software is a leading provider of Business Central solutions that provide total transparency so you can focus on what matters most.',
                        featureTitle: 'OCR scanning available for emlinked',
                        featureText:
                            'Eliminate repetitive manual data entry with Document Capture intelligent OCR. The software reduces errors and saves time by capturing text and placing it directly into the correct fields in your Business Central.',
                        websiteUrl: 'https://www.continia.com',
                    },
                    {
                        _key: 'partner-idyn-en',
                        name: 'Idyn — Direct Banking',
                        badge: 'AUTOMATED BANK INTEGRATION',
                        logoUrl:
                            '/emlinked/partners/IDYN_Direct-Banking-e1670413366713.png',
                        description:
                            'Streamline your banking workflows. Direct Banking automatically synchronizes your bank accounts with emlinked (Microsoft Dynamics 365 Business Central). This keeps incoming and outgoing transaction processes seamlessly aligned.',
                        featureTitle: 'Fully integrated bank reconciliation',
                        featureText:
                            'No more file downloads. No manual uploads. No friction. Direct Banking is natively accessible within emlinked for instant rent transaction reconciliation.',
                        websiteUrl: 'https://www.idyn.nl',
                    },
                ],
            },
            {
                _key: 'cta-banner-en',
                _type: 'ctaBanner',
                badge: 'Ready for streamlined real estate management?',
                title: 'Experience the power of emlinked and our software partners',
                subtitle:
                    'emlinked unifies commercial, technical, and administrative real estate management into one clear platform. Work more efficiently with total control over your portfolio.',
                buttonText: 'Request a free demo',
                buttonLink: '/contact',
                imagePath: '/emlinked/partners/klaar-voor-gestroomlijnd.jpg',
            },
        ],
    };

    try {
        await client.createOrReplace(nlDoc);
        console.log('✓ Successfully created/updated page-partners-software-nl!');
        await client.createOrReplace(enDoc);
        console.log('✓ Successfully created/updated page-partners-software-en!');
    } catch (err) {
        console.error('Error seeding partners-software page:', err);
    }
}

seedPartnersSoftwarePage();
