require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-07-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

const articles = [
    // 1. Article 1 (Featured)
    {
        _id: 'article-emlinked-versterkt-team-2026-nl',
        _type: 'article',
        title: 'emlinked versterkt team en zet koers voor verdere groei in 2026',
        language: 'nl',
        slug: { _type: 'slug', current: 'emlinked-versterkt-team-en-zet-koers-voor-verdere-groei-in-2026' },
        category: 'Organisatie',
        excerpt: 'Met de uitbreiding van ons team van wervingsspecialisten en software architecten versterkt emlinked haar marktpositie in vastgoedbeheer software en interim oplossingen.',
        readTime: '4 min leestijd',
        publishedAt: '2026-01-15T09:00:00Z',
        authorName: 'Raymond Perridon',
        imagePath: '/emlinked/news/Afbeeling-Iryna-en-Raymond-emlinked-versterkt-team-en-zet-koers-voor-verdere-groei-in-2026-1.png',
        seo: {
            seoTitle: 'emlinked versterkt team & koers voor 2026 | emlinked Nieuws',
            seoDescription: 'Lees hoe emlinked haar team uitbreidt met executive werving en Business Central specialisten om vastgoedbeheerders nog sneller te ondersteunen.',
            canonical: 'https://emlinked.com/nieuws/emlinked-versterkt-team-en-zet-koers-voor-verdere-groei-in-2026',
            noIndex: false,
        },
        body: [
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: 'Strategische uitbreiding voor maximale klantwaarde' }],
            },
            {
                _type: 'block',
                style: 'normal',
                children: [
                    {
                        _type: 'span',
                        text: 'Het nieuwe jaar staat bij emlinked in het teken van versnelde innovatie en verdere verdieping van onze dienstverlening. Door de aanhoudende vraag naar zowel gekwalificeerde interim specialisten als geavanceerde vastgoedbeheer apps op het Microsoft Dynamics 365 platform, breiden we ons kernteam verder uit.',
                    },
                ],
            },
            {
                _type: 'block',
                style: 'h3',
                children: [{ _type: 'span', text: 'Koppeling van Werving en Technologie' }],
            },
            {
                _type: 'block',
                style: 'normal',
                children: [
                    {
                        _type: 'span',
                        text: 'Onze unieke formule – de combinatie van hoogwaardige wervings- en interim-oplossingen met eigen native Business Central software – stelt organisaties in staat om operationele knelpunten direct op te lossen. Met het versterkte team kunnen we interim functies sneller invullen en software-ontwikkelingen met nog kortere oplevertijden realiseren.',
                    },
                ],
            },
        ],
    },
    {
        _id: 'article-emlinked-versterkt-team-2026-en',
        _type: 'article',
        title: 'emlinked expands team and sets course for further growth in 2026',
        language: 'en',
        slug: { _type: 'slug', current: 'emlinked-expands-team-and-sets-course-for-2026-growth' },
        category: 'Organisatie',
        excerpt: 'With the expansion of our recruitment specialists and software architects, emlinked strengthens its position in real estate management software and interim solutions.',
        readTime: '4 min read',
        publishedAt: '2026-01-15T09:00:00Z',
        authorName: 'Raymond Perridon',
        imagePath: '/emlinked/news/Afbeeling-Iryna-en-Raymond-emlinked-versterkt-team-en-zet-koers-voor-verdere-groei-in-2026-1.png',
        seo: {
            seoTitle: 'emlinked Expands Team & Sets Course for 2026 | emlinked News',
            seoDescription: 'Learn how emlinked expands its team with executive search and Business Central specialists to support property managers faster.',
            canonical: 'https://emlinked.com/en/news/emlinked-expands-team-and-sets-course-for-2026-growth',
            noIndex: false,
        },
        body: [
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: 'Strategic expansion for maximum client value' }],
            },
            {
                _type: 'block',
                style: 'normal',
                children: [
                    {
                        _type: 'span',
                        text: 'The new year at emlinked marks accelerated innovation and deeper client engagement. Driven by sustained demand for qualified interim specialists and native real estate management apps on Microsoft Dynamics 365 Business Central, we are expanding our core team.',
                    },
                ],
            },
        ],
    },

    // 2. Article 2: Wet Goed Verhuurderschap
    {
        _id: 'article-wet-goed-verhuurderschap-nl',
        _type: 'article',
        title: 'Wet Goed Verhuurderschap: Wat verandert er voor vastgoedbeheerders?',
        language: 'nl',
        slug: { _type: 'slug', current: 'wet-goed-verhuurderschap-wat-verandert-er-voor-vastgoedbeheerders' },
        category: 'Wet & Regelgeving',
        excerpt: 'Een compleet overzicht van de verplichtingen rond de Wet goed verhuurderschap en hoe je met de juiste software boetes en dossierachterstanden voorkomt.',
        readTime: '5 min leestijd',
        publishedAt: '2025-11-20T10:00:00Z',
        authorName: 'Raymond Perridon',
        imagePath: '/emlinked/news/Wet-Goed-Verhuurderschap-emlinked.jpg',
        seo: {
            seoTitle: 'Wet Goed Verhuurderschap & Vastgoedbeheer | emlinked Nieuws',
            seoDescription: 'Blijf compliant met de Wet goed verhuurderschap. Ontdek de impact op verhuurvergunningen, administratie en transparante huurcontracten.',
            canonical: 'https://emlinked.com/nieuws/wet-goed-verhuurderschap-wat-verandert-er-voor-vastgoedbeheerders',
            noIndex: false,
        },
        body: [
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: 'Strengere handhaving en verplichte verhuurvergunningen' }],
            },
            {
                _type: 'block',
                style: 'normal',
                children: [
                    {
                        _type: 'span',
                        text: 'De Wet goed verhuurderschap stelt landelijke regels aan het gedrag van verhuurders en beheerorganisaties. Het voorkomen van discriminatie, intimidatie en buitensporige borgsommen staat hierbij centraal.',
                    },
                ],
            },
        ],
    },
    {
        _id: 'article-wet-goed-verhuurderschap-en',
        _type: 'article',
        title: 'Good Landlordship Act: What changes for real estate managers?',
        language: 'en',
        slug: { _type: 'slug', current: 'good-landlordship-act-what-changes-for-property-managers' },
        category: 'Wet & Regelgeving',
        excerpt: 'A comprehensive guide to compliance requirements under the Dutch Good Landlordship Act and how automated software prevents administrative delays.',
        readTime: '5 min read',
        publishedAt: '2025-11-20T10:00:00Z',
        authorName: 'Raymond Perridon',
        imagePath: '/emlinked/news/Wet-Goed-Verhuurderschap-emlinked.jpg',
        seo: {
            seoTitle: 'Good Landlordship Act & Property Management | emlinked News',
            seoDescription: 'Stay compliant with Dutch rental housing regulations. Discover the impact on permits, documentation, and tenant agreements.',
            canonical: 'https://emlinked.com/en/news/good-landlordship-act-what-changes-for-property-managers',
            noIndex: false,
        },
        body: [
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: 'Stricter enforcement and mandatory rental licensing' }],
            },
        ],
    },

    // 3. Article 3: Vast huurcontract vs. Flexibel
    {
        _id: 'article-vast-vs-flex-huurcontract-nl',
        _type: 'article',
        title: 'Vast huurcontract vs. Flexibel huurcontract: Juridische en financiële impact',
        language: 'nl',
        slug: { _type: 'slug', current: 'vast-huurcontract-vs-flexibel-huurcontract-juridische-en-financiele-impact' },
        category: 'Vastgoedbeheer',
        excerpt: 'De Wet vaste huurcontracten herstelt de vaste huurovereenkomst als norm. Wat betekent dit voor de exploitatierendementen van vastgoedbeleggers?',
        readTime: '6 min leestijd',
        publishedAt: '2025-09-12T11:00:00Z',
        authorName: 'Raymond Perridon',
        imagePath: '/emlinked/news/Vast_huurcontract_vs_flexibele_huurcontract_01-scaled.jpeg',
        seo: {
            seoTitle: 'Vast vs. Flexibel Huurcontract Impact | emlinked Nieuws',
            seoDescription: 'Analyse van de Wet vaste huurcontracten. Hoe beheerders huurovereenkomsten juridisch waterdicht en administratief efficiënt verwerken.',
            canonical: 'https://emlinked.com/nieuws/vast-huurcontract-vs-flexibel-huurcontract-juridische-en-financiele-impact',
            noIndex: false,
        },
        body: [
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: 'Herstel van de vaste huurovereenkomst als norm' }],
            },
        ],
    },
    {
        _id: 'article-vast-vs-flex-huurcontract-en',
        _type: 'article',
        title: 'Permanent vs. Flexible Lease Agreements: Legal and financial impact',
        language: 'en',
        slug: { _type: 'slug', current: 'permanent-vs-flexible-lease-agreements-legal-and-financial-impact' },
        category: 'Vastgoedbeheer',
        excerpt: 'The Dutch Fixed Lease Act restores indefinite lease contracts as standard. What does this mean for property portfolio yields?',
        readTime: '6 min read',
        publishedAt: '2025-09-12T11:00:00Z',
        authorName: 'Raymond Perridon',
        imagePath: '/emlinked/news/Vast_huurcontract_vs_flexibele_huurcontract_01-scaled.jpeg',
        seo: {
            seoTitle: 'Permanent vs. Flexible Lease Agreement Impact | emlinked News',
            seoDescription: 'Analysis of Dutch lease law updates. How property managers maintain legally sound lease documentation.',
            canonical: 'https://emlinked.com/en/news/permanent-vs-flexible-lease-agreements-legal-and-financial-impact',
            noIndex: false,
        },
        body: [
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: 'Restoration of indefinite leases as the standard' }],
            },
        ],
    },

    // 4. Article 4: Box 3 Rendement 2026
    {
        _id: 'article-box3-rendement-2026-nl',
        _type: 'article',
        title: 'Box 3 Rendement 2026: Werkelijk rendement vs. Forfaitaire heffing',
        language: 'nl',
        slug: { _type: 'slug', current: 'box-3-rendement-2026-werkelijk-rendement-vs-forfaitaire-heffing' },
        category: 'Wet & Regelgeving',
        excerpt: 'De juridische uitspraken rondom Box 3 dwingen vastgoedbeleggers om werkelijke inkomsten en direct toewijsbare kosten nauwkeurig te registreren.',
        readTime: '5 min leestijd',
        publishedAt: '2025-06-05T08:30:00Z',
        authorName: 'Manfred',
        imagePath: '/emlinked/news/Box3_Administratie.jpg',
        seo: {
            seoTitle: 'Box 3 Rendement 2026 & Vastgoed | emlinked Nieuws',
            seoDescription: 'Bereken werkelijk rendement vs. forfaitaire heffing in Box 3. Geautomatiseerde administratie voor vastgoedbeleggers in Business Central.',
            canonical: 'https://emlinked.com/nieuws/box-3-rendement-2026-werkelijk-rendement-vs-forfaitaire-heffing',
            noIndex: false,
        },
        body: [
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: 'Oplossingen voor de Box 3 tegenbewijsregeling' }],
            },
        ],
    },
    {
        _id: 'article-box3-rendement-2026-en',
        _type: 'article',
        title: 'Box 3 Tax 2026: Actual returns vs. Statutory rate in the Netherlands',
        language: 'en',
        slug: { _type: 'slug', current: 'box-3-tax-2026-actual-returns-vs-statutory-rate' },
        category: 'Wet & Regelgeving',
        excerpt: 'Supreme Court rulings force real estate investors to track actual rental yields and directly attributable maintenance expenses.',
        readTime: '5 min read',
        publishedAt: '2025-06-05T08:30:00Z',
        authorName: 'Manfred',
        imagePath: '/emlinked/news/Box3_Administratie.jpg',
        seo: {
            seoTitle: 'Box 3 Tax 2026 & Property Yields | emlinked News',
            seoDescription: 'Calculate actual vs. statutory Box 3 returns in Dutch real estate. Automated ledger management with emlinked apps.',
            canonical: 'https://emlinked.com/en/news/box-3-tax-2026-actual-returns-vs-statutory-rate',
            noIndex: false,
        },
        body: [
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: 'Navigating Dutch Box 3 tax proof rules' }],
            },
        ],
    },

    // 5. Article 5: Business Central 23 Incasso
    {
        _id: 'article-bc23-incasso-nl',
        _type: 'article',
        title: 'Geautomatiseerde incasso & bankaflettering in Business Central 23',
        language: 'nl',
        slug: { _type: 'slug', current: 'geautomatiseerde-incasso-en-bankaflettering-in-business-central-23' },
        category: 'ERP & Business Central',
        excerpt: 'Hoe native SEPA-extensies en PSD2-bankkoppelingen handmatig afletterwerk met 95% verminderen voor professionele vastgoedbeheerders.',
        readTime: '4 min leestijd',
        publishedAt: '2025-03-18T14:00:00Z',
        authorName: 'Ebenezer',
        imagePath: '/emlinked/news/Business-Central-23.jpg',
        seo: {
            seoTitle: 'Automatisering Bankaflettering BC 23 | emlinked Nieuws',
            seoDescription: 'Ontdek hoe emlinked SEPA incasso en bankaflettering integreert in Microsoft Dynamics 365 Business Central.',
            canonical: 'https://emlinked.com/nieuws/geautomatiseerde-incasso-en-bankaflettering-in-business-central-23',
            noIndex: false,
        },
        body: [
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: 'Van handmatige mutaties naar realtime bankverwerking' }],
            },
        ],
    },
    {
        _id: 'article-bc23-incasso-en',
        _type: 'article',
        title: 'Automated direct debit & bank reconciliation in Business Central 23',
        language: 'en',
        slug: { _type: 'slug', current: 'automated-direct-debit-and-bank-reconciliation-in-business-central-23' },
        category: 'ERP & Business Central',
        excerpt: 'How native SEPA extensions and PSD2 banking APIs eliminate manual ledger matching by up to 95% for property management companies.',
        readTime: '4 min read',
        publishedAt: '2025-03-18T14:00:00Z',
        authorName: 'Ebenezer',
        imagePath: '/emlinked/news/Business-Central-23.jpg',
        seo: {
            seoTitle: 'Bank Reconciliation Automation BC 23 | emlinked News',
            seoDescription: 'Discover how emlinked integrates SEPA direct debit and banking APIs into Microsoft Dynamics 365 Business Central.',
            canonical: 'https://emlinked.com/en/news/automated-direct-debit-and-bank-reconciliation-in-business-central-23',
            noIndex: false,
        },
        body: [
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: 'From manual entry to real-time bank reconciliation' }],
            },
        ],
    },

    // 6. Article 6: Online vastgoedbeheer software
    {
        _id: 'article-online-vastgoedbeheer-software-nl',
        _type: 'article',
        title: 'Online vastgoedbeheer software: De overstap van Excel naar ERP',
        language: 'nl',
        slug: { _type: 'slug', current: 'online-vastgoedbeheer-software-de-overstap-van-excel-naar-erp' },
        category: 'Vastgoedbeheer',
        excerpt: 'Excel voldoet bij kleine portefeuilles, maar leidt bij groei tot foutgevoelige indexaties en achterstallige incasso’s. Waarom overstappen op cloud ERP?',
        readTime: '5 min leestijd',
        publishedAt: '2025-01-10T10:00:00Z',
        authorName: 'Iryna Samiliak',
        imagePath: '/emlinked/news/Online-vastgoedbeheer-software-.jpg',
        seo: {
            seoTitle: 'Overstap van Excel naar Vastgoedbeheer ERP | emlinked Nieuws',
            seoDescription: 'Wanneer is de overstap van Excel naar vastgoedbeheer software noodzakelijk? Praktische tips voor schaalbare portefeuilleadministratie.',
            canonical: 'https://emlinked.com/nieuws/online-vastgoedbeheer-software-de-overstap-van-excel-naar-erp',
            noIndex: false,
        },
        body: [
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: 'De grens van Excel bij groeiende vastgoedportefeuilles' }],
            },
        ],
    },
    {
        _id: 'article-online-vastgoedbeheer-software-en',
        _type: 'article',
        title: 'Online real estate management software: Transitioning from Excel to ERP',
        language: 'en',
        slug: { _type: 'slug', current: 'online-real-estate-management-software-transitioning-from-excel-to-erp' },
        category: 'Vastgoedbeheer',
        excerpt: 'Excel works for small portfolios, but triggers error-prone indexations as portfolios scale. Why upgrade to native cloud ERP?',
        readTime: '5 min read',
        publishedAt: '2025-01-10T10:00:00Z',
        authorName: 'Iryna Samiliak',
        imagePath: '/emlinked/news/Online-vastgoedbeheer-software-.jpg',
        seo: {
            seoTitle: 'Transitioning from Excel to Property Management ERP | emlinked News',
            seoDescription: 'When is it time to upgrade from spreadsheets to property management software? Practical steps for scalable portfolio administration.',
            canonical: 'https://emlinked.com/en/news/online-real-estate-management-software-transitioning-from-excel-to-erp',
            noIndex: false,
        },
        body: [
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: 'The limits of spreadsheets in expanding property portfolios' }],
            },
        ],
    },
];

async function seed() {
    console.log('Seeding Nieuws articles into Sanity CMS...');
    try {
        for (const item of articles) {
            const draftId = `drafts.${item._id}`;
            await client.createOrReplace(item);
            await client.createOrReplace({ ...item, _id: draftId });
            console.log(`Seeded article: ${item._id} (${item.language})`);
        }
        console.log('Successfully seeded all news articles into Sanity!');
    } catch (e) {
        console.error('Error seeding news articles into Sanity:', e);
    }
}

seed();
