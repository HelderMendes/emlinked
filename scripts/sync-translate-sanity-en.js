const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

const DOC_PAIRS = [
    {
        name: 'Homepage',
        nlId: 'c8071896-4119-41e3-b095-ab5d2134d27f',
        enId: 'Ujl1Ky5GJWpKWiHmkpetx1',
        title: 'Homepage',
    },
    {
        name: 'Apps Platform',
        nlId: 'page-apps-nl',
        enId: 'page-apps-en',
        title: 'Our Property Software Apps & Modules',
    },
    {
        name: 'Vastgoedbeheer Software Solution',
        nlId: 'solution-vastgoedbeheer-software-nl',
        enId: 'solution-vastgoedbeheer-software-en',
        title: 'Property Management Software',
    },
    {
        name: 'Huurdersportaal Solution',
        nlId: 'solution-huurdersportaal-nl',
        enId: 'solution-huurdersportaal-en',
        title: 'Tenant Portal',
    },
    {
        name: 'Payment Software Solution',
        nlId: 'solution-payment-nl',
        enId: 'solution-payment-en',
        title: 'Payment Software',
    },
    {
        name: 'Box 3 Check Tool Page',
        nlId: 'page-box3-check-nl',
        enId: 'page-box3-check-en',
        title: 'Box 3 Real Estate Check ⚡',
    },
    {
        name: 'Partners & Software Page',
        nlId: 'page-partners-software-nl',
        enId: 'page-partners-software-en',
        title: 'Partners & Software Integrations',
    },
];

// Translation dictionary for common repeating strings and patterns
const TRANSLATIONS = {
    // Badges & Labels
    'ONZE STRATEGISCHE PARTNERS': 'OUR STRATEGIC PARTNERS',
    'STRATEGISCHE ECOSYSTEEM PARTNERS': 'STRATEGIC ECOSYSTEM PARTNERS',
    'MODULAIR VASTGOED PLATFORM': 'MODULAR REAL ESTATE PLATFORM',
    'NETWERK & INTEGRATIES': 'NETWORK & INTEGRATIONS',
    'FISCAAL VASTGOED INZICHT': 'FISCAL REAL ESTATE INSIGHTS',
    'BOX 3 REVOLUTIE': 'BOX 3 REVOLUTION',
    'DEMO AANVRAGEN': 'REQUEST A DEMO',
    'VOOR WIE IS DIT BENODIGD?': 'WHO IS THIS FOR?',
    'SNELLE IMPLEMENTATIE': 'FAST IMPLEMENTATION',
    'AUTOMATISEREN': 'AUTOMATION',

    // Titles
    'Gebouwd op bewezen enterprise software': 'Built on proven enterprise software',
    'Softwarepartners & *directe koppelingen* met je favoriete software': 'Software Partners & *Direct Integrations* with Your Favorite Software',
    'Software Partners & *Direct Integrations* with Your Favorite Software': 'Software Partners & *Direct Integrations* with Your Favorite Software',
    'Vastgoedbeheer en financiële administratie *native* in één systeem': 'Property management and financial accounting *native* in one system',
    'Modulaire Vastgoedsoftware Suite': 'Modular Property Management Software Suite',
    'Vastgoedbeheer Software': 'Property Management Software',
    'Huurdersportaal': 'Tenant Portal',
    'Payment Software': 'Payment Software',
    'Box 3 Vastgoed Check': 'Box 3 Real Estate Check',
    'Ervaar de kracht van emlinked en onze software-partners': 'Experience the power of emlinked and our software partners',
    'Klaar voor gestroomlijnd vastgoedbeheer?': 'Ready for streamlined real estate management?',

    // Subtitles
    'Door nauw samen te werken met gecertificeerde Microsoft ISV-partners bieden we een complete, toekomstbestendige vastgoedoplossing.': 'By working closely with certified Microsoft ISV partners, we deliver a complete, future-proof real estate management solution.',
    'emlinked is het resultaat van een unieke samenwerking tussen de vastgoedspecialisten van DRVM en Microsoft-partner faect. 100% cloud-native vastgoedsoftware — zonder omkijken naar handmatige updates of backups.': 'emlinked is engineered in close collaboration between DRVM real estate specialists and Microsoft partner faect. Built 100% natively in the cloud with zero hassle over manual backups or software updates.',
    'emlinked brengt commercieel, technisch en administratief vastgoedbeheer samen in één overzichtelijk platform. Zo werk je efficiënter, met minder fouten en meer grip op je portefeuille.': 'emlinked unifies commercial, technical, and administrative real estate management into one clear platform. Work more efficiently with total control over your portfolio.',
    'Beheer uw vastgoedportefeuille native binnen Microsoft Dynamics 365 Business Central. Geen handmatige exports, wel geautomatiseerde CPI-indexaties en aflettering.': 'Manage your real estate portfolio natively inside Microsoft Dynamics 365 Business Central. No manual exports, automated CPI indexation and bank reconciliation.',

    // Buttons & Links
    'Ontdek de integraties ↓': 'Explore integrations ↓',
    'Spreek met ons': 'Speak with us',
    'Vraag vrijblijvend een demo aan': 'Request a free demo',
    'Vraag een demo aan': 'Request a demo',
    'Bereken uw situatie →': 'Calculate your situation →',
    'Bekijk de modules': 'Explore the modules',

    // Value Tags
    '100% Cloud-Native ERP': '100% Cloud-Native ERP',
    'Gecertificeerde ISV Integraties': 'Certified ISV Integrations',
    'Automatische Updates & Backups': 'Automatic Updates & Backups',

    // Generic replacements
    'vastgoedbeheer': 'property management',
    'Vastgoedbeheer': 'Property Management',
    'huurdersportaal': 'tenant portal',
    'Huurdersportaal': 'Tenant Portal',
    'huurprolongatie': 'rent invoicing run',
    'aflettering': 'bank reconciliation',
};

function translateText(str) {
    if (!str || typeof str !== 'string') return str;

    // Check direct dictionary match first
    if (TRANSLATIONS[str]) {
        return TRANSLATIONS[str];
    }

    let translated = str;

    // Common term replacements
    translated = translated
        .replace(/emlinked brengt commercieel, technisch en administratief vastgoedbeheer samen in één overzichtelijk platform\./gi, 'emlinked unifies commercial, technical, and administrative real estate management into one clear platform.')
        .replace(/Ervaar de kracht van emlinked/gi, 'Experience the power of emlinked')
        .replace(/Klaar voor gestroomlijnd vastgoedbeheer\?/gi, 'Ready for streamlined real estate management?')
        .replace(/Vraag vrijblijvend een demo aan/gi, 'Request a free demo')
        .replace(/Ontdek alle strategische software-partners van emlinked\./gi, 'Explore all strategic software partners of emlinked.')
        .replace(/Naadloze, gecertificeerde integraties met Microsoft Business Central, Continia Document Capture en Idyn Direct Banking\./gi, 'Seamless, certified integrations with Microsoft Business Central, Continia Document Capture, and Idyn Direct Banking.')
        .replace(/Gecertificeerde ISV-partners & Native Extensies/gi, 'Certified ISV Partners & Native Extensions')
        .replace(/Snel te implementeren & eenvoudig in gebruik/gi, 'Fast implementation & ease of use')
        .replace(/OCR scanning beschikbaar voor emlinked/gi, 'OCR scanning available for emlinked')
        .replace(/Volledig geïntegreerde bankaflettering/gi, 'Fully integrated bank reconciliation')
        .replace(/SLIMME FACTUURVERWERKING & OCR/gi, 'SMART INVOICE PROCESSING & OCR')
        .replace(/GEAUTOMATISEERDE BANKKOPPELING/gi, 'AUTOMATED BANK INTEGRATION');

    return translated;
}

function updateHref(url) {
    if (!url || typeof url !== 'string') return url;
    if (url === '/contact') return '/en/contact';
    if (url === '/apps') return '/en/apps';
    if (url === '/prijzen') return '/en/pricing';
    if (url === '/referenties') return '/en/referenties';
    if (url === '/over-ons') return '/en/over-ons';
    if (url === '/box3-check') return '/en/box3-check';
    if (url === '/partners-software') return '/en/partners-software';
    if (url.startsWith('/apps/')) return `/en${url}`;
    return url;
}

function translateObject(obj) {
    if (!obj || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
        return obj.map(item => translateObject(item));
    }

    const newObj = { ...obj };

    for (const key of Object.keys(newObj)) {
        if (key === '_id' || key === '_rev' || key === '_createdAt' || key === '_updatedAt') continue;

        if (key === 'language') {
            newObj[key] = 'en';
            continue;
        }

        if (key === 'ctaLink' || key === 'secondaryCtaLink' || key === 'buttonLink' || key === 'canonical' || key === 'link') {
            newObj[key] = updateHref(newObj[key]);
            continue;
        }

        if (typeof newObj[key] === 'string') {
            newObj[key] = translateText(newObj[key]);
        } else if (typeof newObj[key] === 'object') {
            newObj[key] = translateObject(newObj[key]);
        }
    }

    return newObj;
}

async function syncAndTranslateEnPages() {
    console.log('🚀 Starting Sanity English Translation & Synchronization Process...\n');

    for (const pair of DOC_PAIRS) {
        try {
            console.log(`Processing: ${pair.name} (NL: ${pair.nlId} ➔ EN: ${pair.enId})...`);

            const nlDoc = await client.fetch('*[_id == $nlId][0]', { nlId: pair.nlId });
            if (!nlDoc) {
                console.warn(`  ⚠️ NL document not found for ${pair.nlId}, skipping.`);
                continue;
            }

            const enDoc = await client.fetch('*[_id == $enId][0]', { enId: pair.enId });

            // Translate pageBlocks & SEO from NL document
            const translatedBlocks = translateObject(nlDoc.pageBlocks || []);
            const translatedSeo = translateObject(nlDoc.seo || {});

            if (translatedSeo?.canonical) {
                translatedSeo.canonical = translatedSeo.canonical.replace('emlinked.nl/', 'emlinked.nl/en/');
            }

            const patchPayload = {
                title: pair.title || translateText(nlDoc.title),
                language: 'en',
                pageBlocks: translatedBlocks,
                seo: translatedSeo,
            };

            if (nlDoc.tagline) patchPayload.tagline = translateText(nlDoc.tagline);
            if (nlDoc.desc) patchPayload.desc = translateText(nlDoc.desc);

            if (enDoc) {
                await client.patch(pair.enId).set(patchPayload).commit();
                console.log(`  ✓ Updated existing EN document ${pair.enId}`);
            } else {
                await client.createIfNotExists({
                    _id: pair.enId,
                    _type: nlDoc._type || 'page',
                    slug: { _type: 'slug', current: pair.enId.replace('page-', '').replace('solution-', '') },
                    ...patchPayload,
                });
                console.log(`  ✓ Created new EN document ${pair.enId}`);
            }
        } catch (err) {
            console.error(`  ❌ Error processing ${pair.name}:`, err.message);
        }
    }

    console.log('\n🎉 Sanity English content translation process completed successfully!');
}

syncAndTranslateEnPages();
