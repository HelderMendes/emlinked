require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-07-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

const all18Articles = [
    // 1. Persbericht 2026
    {
        _id: 'art-persbericht-team-2026-nl',
        _type: 'article',
        title: 'emlinked versterkt team en zet koers voor verdere groei in 2026',
        language: 'nl',
        slug: {
            _type: 'slug',
            current:
                'emlinked-versterkt-team-en-zet-koers-voor-verdere-groei-in-2026',
        },
        category: 'Organisatie',
        excerpt:
            'Met de uitbreiding van ons team van wervingsspecialisten en software architecten versterkt emlinked haar marktpositie in vastgoedbeheer software en interim oplossingen.',
        readTime: '4 min leestijd',
        publishedAt: '2026-01-15T09:00:00Z',
        authorName: 'Raymond Perridon',
        imagePath:
            '/emlinked/news/Afbeeling-Iryna-en-Raymond-emlinked-versterkt-team-en-zet-koers-voor-verdere-groei-in-2026-1.png',
    },
    {
        _id: 'art-persbericht-team-2026-en',
        _type: 'article',
        title: 'emlinked expands team and sets course for further growth in 2026',
        language: 'en',
        slug: {
            _type: 'slug',
            current: 'emlinked-expands-team-and-sets-course-for-2026-growth',
        },
        category: 'Organisatie',
        excerpt:
            'With the expansion of our recruitment specialists and software architects, emlinked strengthens its position in real estate management software and interim solutions.',
        readTime: '4 min read',
        publishedAt: '2026-01-15T09:00:00Z',
        authorName: 'Raymond Perridon',
        imagePath:
            '/emlinked/news/Afbeeling-Iryna-en-Raymond-emlinked-versterkt-team-en-zet-koers-voor-verdere-groei-in-2026-1.png',
    },

    // 2. Wet Goed Verhuurderschap
    {
        _id: 'art-wet-goed-verhuurderschap-nl',
        _type: 'article',
        title: 'Wet Goed Verhuurderschap: Wat verandert er voor vastgoedbeheerders?',
        language: 'nl',
        slug: {
            _type: 'slug',
            current:
                'wet-goed-verhuurderschap-wat-verandert-er-voor-vastgoedbeheerders',
        },
        category: 'Wet & Regelgeving',
        excerpt:
            'Een compleet overzicht van de verplichtingen rond de Wet goed verhuurderschap en hoe je met de juiste software boetes en dossierachterstanden voorkomt.',
        readTime: '5 min leestijd',
        publishedAt: '2025-11-20T10:00:00Z',
        authorName: 'Raymond Perridon',
        imagePath: '/emlinked/news/Wet-Goed-Verhuurderschap-emlinked.jpg',
    },
    {
        _id: 'art-wet-goed-verhuurderschap-en',
        _type: 'article',
        title: 'Good Landlordship Act: What changes for real estate managers?',
        language: 'en',
        slug: {
            _type: 'slug',
            current: 'good-landlordship-act-what-changes-for-property-managers',
        },
        category: 'Wet & Regelgeving',
        excerpt:
            'A comprehensive guide to compliance requirements under the Dutch Good Landlordship Act and how automated software prevents administrative delays.',
        readTime: '5 min read',
        publishedAt: '2025-11-20T10:00:00Z',
        authorName: 'Raymond Perridon',
        imagePath: '/emlinked/news/Wet-Goed-Verhuurderschap-emlinked.jpg',
    },

    // 3. Vast huurcontract vs Flexibel
    {
        _id: 'art-vast-vs-flex-huurcontract-nl',
        _type: 'article',
        title: 'Vast huurcontract vs. Flexibel huurcontract: Juridische en financiële impact',
        language: 'nl',
        slug: {
            _type: 'slug',
            current:
                'vast-huurcontract-vs-flexibel-huurcontract-juridische-en-financiele-impact',
        },
        category: 'Vastgoedbeheer',
        excerpt:
            'De Wet vaste huurcontracten herstelt de vaste huurovereenkomst als norm. Wat betekent dit voor de exploitatierendementen van vastgoedbeleggers?',
        readTime: '6 min leestijd',
        publishedAt: '2025-09-12T11:00:00Z',
        authorName: 'Raymond Perridon',
        imagePath:
            '/emlinked/news/Vast_huurcontract_vs_flexibele_huurcontract_01-scaled.jpeg',
    },
    {
        _id: 'art-vast-vs-flex-huurcontract-en',
        _type: 'article',
        title: 'Permanent vs. Flexible Lease Agreements: Legal and financial impact',
        language: 'en',
        slug: {
            _type: 'slug',
            current:
                'permanent-vs-flexible-lease-agreements-legal-and-financial-impact',
        },
        category: 'Vastgoedbeheer',
        excerpt:
            'The Dutch Fixed Lease Act restores indefinite lease contracts as standard. What does this mean for property portfolio yields?',
        readTime: '6 min read',
        publishedAt: '2025-09-12T11:00:00Z',
        authorName: 'Raymond Perridon',
        imagePath:
            '/emlinked/news/Vast_huurcontract_vs_flexibele_huurcontract_01-scaled.jpeg',
    },

    // 4. Box 3 Rendement 2026
    {
        _id: 'art-box3-rendement-2026-nl',
        _type: 'article',
        title: 'Box 3 Rendement 2026: Werkelijk rendement vs. Forfaitaire heffing',
        language: 'nl',
        slug: {
            _type: 'slug',
            current:
                'box-3-rendement-2026-werkelijk-rendement-vs-forfaitaire-heffing',
        },
        category: 'Wet & Regelgeving',
        excerpt:
            'De juridische uitspraken rondom Box 3 dwingen vastgoedbeleggers om werkelijke inkomsten en direct toewijsbare kosten nauwkeurig te registreren.',
        readTime: '5 min leestijd',
        publishedAt: '2025-06-05T08:30:00Z',
        authorName: 'Manfred',
        imagePath: '/emlinked/news/Box3_Administratie.jpg',
    },
    {
        _id: 'art-box3-rendement-2026-en',
        _type: 'article',
        title: 'Box 3 Tax 2026: Actual returns vs. Statutory rate in the Netherlands',
        language: 'en',
        slug: {
            _type: 'slug',
            current: 'box-3-tax-2026-actual-returns-vs-statutory-rate',
        },
        category: 'Wet & Regelgeving',
        excerpt:
            'Supreme Court rulings force real estate investors to track actual rental yields and directly attributable maintenance expenses.',
        readTime: '5 min read',
        publishedAt: '2025-06-05T08:30:00Z',
        authorName: 'Manfred',
        imagePath: '/emlinked/news/Box3_Administratie.jpg',
    },

    // 5. Business Central 23
    {
        _id: 'art-bc23-incasso-nl',
        _type: 'article',
        title: 'Geautomatiseerde incasso & bankaflettering in Business Central 23',
        language: 'nl',
        slug: {
            _type: 'slug',
            current:
                'geautomatiseerde-incasso-en-bankaflettering-in-business-central-23',
        },
        category: 'ERP & Business Central',
        excerpt:
            'Hoe native SEPA-extensies en PSD2-bankkoppelingen handmatig afletterwerk met 95% verminderen voor professionele vastgoedbeheerders.',
        readTime: '4 min leestijd',
        publishedAt: '2025-03-18T14:00:00Z',
        authorName: 'Ebenezer',
        imagePath: '/emlinked/news/Business-Central-23.jpg',
    },
    {
        _id: 'art-bc23-incasso-en',
        _type: 'article',
        title: 'Automated direct debit & bank reconciliation in Business Central 23',
        language: 'en',
        slug: {
            _type: 'slug',
            current:
                'automated-direct-debit-and-bank-reconciliation-in-business-central-23',
        },
        category: 'ERP & Business Central',
        excerpt:
            'How native SEPA extensions and PSD2 banking APIs eliminate manual ledger matching by up to 95% for property management companies.',
        readTime: '4 min read',
        publishedAt: '2025-03-18T14:00:00Z',
        authorName: 'Ebenezer',
        imagePath: '/emlinked/news/Business-Central-23.jpg',
    },

    // 6. Online vastgoedbeheer software
    {
        _id: 'art-online-vastgoedbeheer-software-nl',
        _type: 'article',
        title: 'Online vastgoedbeheer software: De overstap van Excel naar ERP',
        language: 'nl',
        slug: {
            _type: 'slug',
            current:
                'online-vastgoedbeheer-software-de-overstap-van-excel-naar-erp',
        },
        category: 'Vastgoedbeheer',
        excerpt:
            'Excel voldoet bij kleine portefeuilles, maar leidt bij groei tot foutgevoelige indexaties en achterstallige incasso’s. Waarom overstappen op cloud ERP?',
        readTime: '5 min leestijd',
        publishedAt: '2025-01-10T10:00:00Z',
        authorName: 'Iryna Samiliak',
        imagePath: '/emlinked/news/Online-vastgoedbeheer-software-.jpg',
    },
    {
        _id: 'art-online-vastgoedbeheer-software-en',
        _type: 'article',
        title: 'Online real estate management software: Transitioning from Excel to ERP',
        language: 'en',
        slug: {
            _type: 'slug',
            current:
                'online-real-estate-management-software-transitioning-from-excel-to-erp',
        },
        category: 'Vastgoedbeheer',
        excerpt:
            'Excel works for small portfolios, but triggers error-prone indexations as portfolios scale. Why upgrade to native cloud ERP?',
        readTime: '5 min read',
        publishedAt: '2025-01-10T10:00:00Z',
        authorName: 'Iryna Samiliak',
        imagePath: '/emlinked/news/Online-vastgoedbeheer-software-.jpg',
    },

    // 7. iPhone & iPad App
    {
        _id: 'art-iphone-ipad-nl',
        _type: 'article',
        title: 'Nieuw: emlinked online vastgoedbeheer voor iPhone en iPad',
        language: 'nl',
        slug: {
            _type: 'slug',
            current: 'nieuw-emlinked-online-vastgoedbeheer-voor-iphone-en-ipad',
        },
        category: 'Vastgoedbeheer',
        excerpt:
            'Met de nieuwe emlinked mobiele extensie hebben vastgoedbeheerders en technische inspecteurs onderweg direct inzicht in de complete portefeuille.',
        readTime: '3 min leestijd',
        publishedAt: '2024-11-14T09:00:00Z',
        authorName: 'Ebenezer',
        imagePath: '/emlinked/news/iPhone_iPad.jpg',
    },
    {
        _id: 'art-iphone-ipad-en',
        _type: 'article',
        title: 'New: emlinked property management for iPhone and iPad',
        language: 'en',
        slug: {
            _type: 'slug',
            current: 'new-emlinked-property-management-for-iphone-and-ipad',
        },
        category: 'Vastgoedbeheer',
        excerpt:
            'With the new emlinked mobile application, property managers and field inspectors gain instant real-time access to portfolio data on the go.',
        readTime: '3 min read',
        publishedAt: '2024-11-14T09:00:00Z',
        authorName: 'Ebenezer',
        imagePath: '/emlinked/news/iPhone_iPad.jpg',
    },

    // 8. CBS CPI Wijziging
    {
        _id: 'art-cbs-cpi-nl',
        _type: 'article',
        title: 'CBS wijzigt Consumentenprijsindex (CPI): Wat betekent dit voor de huurindexatie?',
        language: 'nl',
        slug: {
            _type: 'slug',
            current: 'cbs-wijzigt-consumentenprijsindex-cpi',
        },
        category: 'Wet & Regelgeving',
        excerpt:
            'Het Centraal Bureau voor de Statistiek vernieuwt de berekeningsmethode van de CPI. Ontdek hoe emlinked de nieuwste cijfers automatisch verwerkt.',
        readTime: '4 min leestijd',
        publishedAt: '2024-09-08T11:00:00Z',
        authorName: 'Manfred',
        imagePath: '/emlinked/news/AdobeStock_306624188-scaled.jpeg',
    },
    {
        _id: 'art-cbs-cpi-en',
        _type: 'article',
        title: 'CBS updates Consumer Price Index (CPI): Impact on rent indexation',
        language: 'en',
        slug: {
            _type: 'slug',
            current: 'cbs-updates-consumer-price-index-cpi',
        },
        category: 'Wet & Regelgeving',
        excerpt:
            'Statistics Netherlands updates the CPI calculation model. Learn how emlinked automatically syncs CPI rates directly into Business Central.',
        readTime: '4 min read',
        publishedAt: '2024-09-08T11:00:00Z',
        authorName: 'Manfred',
        imagePath: '/emlinked/news/AdobeStock_306624188-scaled.jpeg',
    },

    // 9. Nieuw telefoonnummer
    {
        _id: 'art-nieuw-telefoonnummer-nl',
        _type: 'article',
        title: 'emlinked heeft een nieuw telefoonnummer en bereikbaarheid',
        language: 'nl',
        slug: {
            _type: 'slug',
            current: 'emlinked-heeft-een-nieuw-telefoonnummer',
        },
        category: 'Organisatie',
        excerpt:
            'Om onze klanten nog sneller te woord te staan, hebben we onze telefonische support- en advieslijnen gecentraliseerd.',
        readTime: '2 min leestijd',
        publishedAt: '2024-07-01T08:00:00Z',
        authorName: 'Elisabeth',
        imagePath: '/emlinked/news/nieuw-telefoon-nb-contact-emlinked.jpg',
    },
    {
        _id: 'art-nieuw-telefoonnummer-en',
        _type: 'article',
        title: 'emlinked launches new phone contact line',
        language: 'en',
        slug: {
            _type: 'slug',
            current: 'emlinked-launches-new-phone-contact-line',
        },
        category: 'Organisatie',
        excerpt:
            'To assist our clients faster, we have centralized our dedicated support and executive advice phone numbers.',
        readTime: '2 min read',
        publishedAt: '2024-07-01T08:00:00Z',
        authorName: 'Elisabeth',
        imagePath: '/emlinked/news/nieuw-telefoon-nb-contact-emlinked.jpg',
    },

    // 10. Verhuisd naar Naarden
    {
        _id: 'art-verhuisd-naarden-nl',
        _type: 'article',
        title: 'Wij zijn verhuisd naar een nieuwe locatie in Naarden!',
        language: 'nl',
        slug: { _type: 'slug', current: 'wij-zijn-verhuisd-naar-naarden' },
        category: 'Organisatie',
        excerpt:
            'Wegens aanhoudende groei is ons kantoor verhuisd naar een inspirerende nieuwe werkomgeving in Naarden.',
        readTime: '3 min leestijd',
        publishedAt: '2024-05-12T10:00:00Z',
        authorName: 'Raymond Perridon',
        imagePath: '/emlinked/news/verhuisd01.jpg',
    },
    {
        _id: 'art-verhuisd-naarden-en',
        _type: 'article',
        title: 'We have moved to our new office location in Naarden!',
        language: 'en',
        slug: {
            _type: 'slug',
            current: 'we-have-moved-to-our-new-office-in-naarden',
        },
        category: 'Organisatie',
        excerpt:
            'Due to ongoing expansion, our headquarters has relocated to a modern office in Naarden.',
        readTime: '3 min read',
        publishedAt: '2024-05-12T10:00:00Z',
        authorName: 'Raymond Perridon',
        imagePath: '/emlinked/news/verhuisd01.jpg',
    },

    // 11. Trainingsaanbod
    {
        _id: 'art-trainingsaanbod-nl',
        _type: 'article',
        title: 'emlinked trainingsaanbod: Haal het maximale uit vastgoedbeheer software',
        language: 'nl',
        slug: { _type: 'slug', current: 'emlinked-trainingsaanbod-2024' },
        category: 'Organisatie',
        excerpt:
            'Nieuwe interactieve workshops en trainingen voor vastgoedbeheerders en financieel medewerkers om ERP-processen optimaal te benutten.',
        readTime: '4 min leestijd',
        publishedAt: '2024-03-20T09:00:00Z',
        authorName: 'Elisabeth',
        imagePath: '/emlinked/news/emlinked-trainingsaanbod-2023.jpg',
    },
    {
        _id: 'art-trainingsaanbod-en',
        _type: 'article',
        title: 'emlinked training program: Maximize value from property software',
        language: 'en',
        slug: {
            _type: 'slug',
            current:
                'emlinked-training-program-maximize-value-from-property-software',
        },
        category: 'Organisatie',
        excerpt:
            'New interactive workshops for property managers and financial teams to optimize ERP workflows.',
        readTime: '4 min read',
        publishedAt: '2024-03-20T09:00:00Z',
        authorName: 'Elisabeth',
        imagePath: '/emlinked/news/emlinked-trainingsaanbod-2023.jpg',
    },

    // 12. 15 Miljard vastgoed
    {
        _id: 'art-15-miljard-vastgoed-nl',
        _type: 'article',
        title: 'Onze klanten beheren al meer dan € 15 miljard aan vastgoed met emlinked',
        language: 'nl',
        slug: {
            _type: 'slug',
            current:
                'our-clients-already-manage-over-15-billion-in-real-estate-with-emlinked',
        },
        category: 'Organisatie',
        excerpt:
            'Een belangrijke mijlpaal: meer dan 15 miljard euro aan residentieel en commercieel vastgoed wordt dagelijks geadministreerd via emlinked software.',
        readTime: '4 min leestijd',
        publishedAt: '2024-01-25T11:00:00Z',
        authorName: 'Raymond Perridon',
        imagePath: '/emlinked/news/AdobeStock_218593909-scaled.jpeg',
    },
    {
        _id: 'art-15-miljard-vastgoed-en',
        _type: 'article',
        title: 'Our clients manage over €15 billion in real estate assets with emlinked',
        language: 'en',
        slug: {
            _type: 'slug',
            current:
                'our-clients-already-manage-over-15-billion-in-real-estate-with-emlinked',
        },
        category: 'Organisatie',
        excerpt:
            'A major milestone: over 15 billion euros in residential and commercial real estate is managed daily through emlinked software.',
        readTime: '4 min read',
        publishedAt: '2024-01-25T11:00:00Z',
        authorName: 'Raymond Perridon',
        imagePath: '/emlinked/news/AdobeStock_218593909-scaled.jpeg',
    },

    // 13. Direct Banking
    {
        _id: 'art-direct-banking-nl',
        _type: 'article',
        title: 'Direct Banking: Geautomatiseerde banktransacties en betaalbestanden',
        language: 'nl',
        slug: {
            _type: 'slug',
            current:
                'direct-banking-banktransacties-bankafschriften-betaalbestanden',
        },
        category: 'ERP & Business Central',
        excerpt:
            'Ontdek hoe de Direct Banking module bankafschriften automatisch inleest en huuroverschrijvingen direct verwerkt.',
        readTime: '4 min leestijd',
        publishedAt: '2023-11-15T10:00:00Z',
        authorName: 'Manfred',
        imagePath: '/emlinked/news/Beveiligingsupdate-e1737542059999.jpg',
    },

    // 14. Huurdersportaal
    {
        _id: 'art-huurdersportaal-nl',
        _type: 'article',
        title: 'emlinked Huurdersportaal: 24/7 zelfservice voor huurders en verhuurders',
        language: 'nl',
        slug: { _type: 'slug', current: 'emlinked-huurdersportaal' },
        category: 'Vastgoedbeheer',
        excerpt:
            'Verhoog de tevredenheid van huurders met een 24/7 digitaal portaal voor onderhoudsverzoeken, huurnota’s en contractgegevens.',
        readTime: '4 min leestijd',
        publishedAt: '2023-09-10T14:00:00Z',
        authorName: 'Thorwald',
        imagePath: '/emlinked/news/AdobeStock_501059526-Converted.jpg',
    },

    // 15. 5 Redenen om systemen te updaten
    {
        _id: 'art-5-redenen-updaten-nl',
        _type: 'article',
        title: '5 redenen waarom het belangrijk is om uw vastgoedsoftware te updaten',
        language: 'nl',
        slug: {
            _type: 'slug',
            current:
                '5-redenen-waarom-het-belangrijk-is-om-uw-systemen-te-updaten',
        },
        category: 'ERP & Business Central',
        excerpt:
            'Verouderde legacy-systemen brengen beveilingsrisico’s en trage koppelingen met zich mee. 5 redenen om over te stappen op de nieuwste Business Central cloud-versie.',
        readTime: '5 min leestijd',
        publishedAt: '2023-07-04T09:30:00Z',
        authorName: 'Ebenezer',
        imagePath: '/emlinked/news/AdobeStock_331488823-scaled.jpeg',
    },

    // 16. Vastgoedbeleggers in beweging
    {
        _id: 'art-vastgoedbeleggers-in-beweging-nl',
        _type: 'article',
        title: 'Vastgoedbeleggers in beweging: Trends en marktontwikkelingen',
        language: 'nl',
        slug: { _type: 'slug', current: 'vastgoedbeleggers-in-beweging' },
        category: 'Vastgoedbeheer',
        excerpt:
            'Stijgende rentes en veranderende regelgeving vragen om scherpe sturing op rendement en actueel inzicht in vastgoedportefeuilles.',
        readTime: '5 min leestijd',
        publishedAt: '2023-05-18T11:00:00Z',
        authorName: 'Raymond Perridon',
        imagePath: '/emlinked/news/Vastgoedbeleggers-e1675968453160.jpg',
    },

    // 17. Voorstellen Nieuwe Box 3
    {
        _id: 'art-voorstellen-nieuwe-box3-nl',
        _type: 'article',
        title: 'Voorstellen nieuwe Box 3 wetgeving: Wat betekent dit voor verhuurd vastgoed?',
        language: 'nl',
        slug: { _type: 'slug', current: 'voorstellen-nieuwe-box-3' },
        category: 'Wet & Regelgeving',
        excerpt:
            'Een grondige analyse van het wetsvoorstel werkelijk rendement in Box 3 en de voorbereiding voor vastgoedbeleggers.',
        readTime: '5 min leestijd',
        publishedAt: '2023-03-22T10:00:00Z',
        authorName: 'Manfred',
        imagePath: '/emlinked/news/box3_admin02.jpg',
    },

    // 18. Update vastgoedbeheer software
    {
        _id: 'art-update-vastgoedbeheer-software-nl',
        _type: 'article',
        title: 'Nieuwe update emlinked vastgoedbeheer software beschikbaar',
        language: 'nl',
        slug: {
            _type: 'slug',
            current: 'nieuwe-update-emlinked-vastgoedbeheer-software',
        },
        category: 'ERP & Business Central',
        excerpt:
            'De nieuwste release brengt snellere CPI-indexatie berekeningen en een vernieuwd dashboard voor vastgoedbeheerders.',
        readTime: '4 min leestijd',
        publishedAt: '2023-01-15T09:00:00Z',
        authorName: 'Ebenezer',
        imagePath: '/emlinked/news/property-managemet.jpg',
    },
];

async function seedAll() {
    console.log('Seeding all 18 news articles into Sanity CMS...');
    try {
        for (const item of all18Articles) {
            const draftId = `drafts.${item._id}`;
            await client.createOrReplace(item);
            await client.createOrReplace({ ...item, _id: draftId });
            console.log(`Seeded article: ${item.slug.current} (${item.language})`);
        }
        console.log('Successfully seeded all 18 news articles into Sanity!');
    } catch (e) {
        console.error('Error seeding news articles:', e);
    }
}

seedAll();
