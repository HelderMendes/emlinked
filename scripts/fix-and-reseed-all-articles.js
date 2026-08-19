require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-07-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

const newsDir = path.join(process.cwd(), 'public/emlinked/news');

async function uploadImageAsset(fileName) {
    const filePath = path.join(newsDir, fileName);
    if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ Warning: Image file not found: ${filePath}`);
        return null;
    }

    try {
        console.log(`📤 Uploading image asset to Sanity CDN: ${fileName}...`);
        const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
            filename: fileName,
        });
        console.log(`  ✅ Uploaded asset: ${asset._id}`);
        return asset._id;
    } catch (e) {
        console.error(`❌ Failed to upload asset ${fileName}:`, e.message);
        return null;
    }
}

// Generate random 12-char key for Sanity block items
function generateKey() {
    return Math.random().toString(36).substring(2, 14);
}

const articlesData = [
    {
        baseId: 'emlinked-versterkt-team-2026',
        imageFile: 'persbericht-emlinked-vastgoedsoftware.png',
        category: 'Organisatie',
        date: '2026-01-15T09:00:00Z',
        author: 'Raymond Perridon',
        nl: {
            title: 'emlinked versterkt team en zet koers voor verdere groei in 2026',
            slug: 'emlinked-versterkt-team-en-zet-koers-voor-verdere-groei-in-2026',
            excerpt: 'Met de uitbreiding van ons team van wervingsspecialisten en software architecten versterkt emlinked haar marktpositie in vastgoedbeheer software en interim oplossingen.',
            readTime: '4 min leestijd',
            body: [
                'Het nieuwe jaar staat bij emlinked in het teken van versnelde innovatie en verdere verdieping van onze dienstverlening. Door de aanhoudende vraag naar zowel gekwalificeerde interim specialisten als geavanceerde vastgoedbeheer apps op het Microsoft Dynamics 365 platform, breiden we ons kernteam verder uit.',
                'Onze unieke formule – de combinatie van hoogwaardige wervings- en interim-oplossingen met eigen native Business Central software – stelt organisaties in staat om operationele knelpunten direct op te lossen. Met het versterkte team kunnen we interim functies sneller invullen en software-ontwikkelingen met nog kortere oplevertijden realiseren.',
                'Als gespecialiseerde partner voor woningcorporaties, commerciële vastgoedbeheerders en publieke organisaties blijven we investeren in datagedreven recruitment en naadloze ERP-integraties.',
            ],
        },
        en: {
            title: 'emlinked expands team and sets course for further growth in 2026',
            slug: 'emlinked-expands-team-and-sets-course-for-2026-growth',
            excerpt: 'With the expansion of our recruitment specialists and software architects, emlinked strengthens its position in real estate management software and interim solutions.',
            readTime: '4 min read',
            body: [
                'The new year at emlinked marks accelerated innovation and deeper client engagement. Driven by sustained demand for qualified interim specialists and native real estate management apps on Microsoft Dynamics 365 Business Central, we are expanding our core team.',
                'Our unique formula – combining executive interim placement with proprietary Business Central extensions – allows property organizations to resolve operational bottlenecks immediately. With our expanded team, we deliver faster placements and shorter software release cycles.',
                'As a specialized partner for housing associations, commercial property managers, and public sector organizations, we continue investing in data-driven recruitment and seamless ERP integrations.',
            ],
        },
    },

    {
        baseId: 'wet-goed-verhuurderschap',
        imageFile: 'wet-goed-verhuurderschap.jpg',
        category: 'Wet & Regelgeving',
        date: '2025-11-20T10:00:00Z',
        author: 'Raymond Perridon',
        nl: {
            title: 'Wet Goed Verhuurderschap: Wat verandert er voor vastgoedbeheerders?',
            slug: 'wet-goed-verhuurderschap-wat-verandert-er-voor-vastgoedbeheerders',
            excerpt: 'Een compleet overzicht van de verplichtingen rond de Wet goed verhuurderschap en hoe je met de juiste software boetes en dossierachterstanden voorkomt.',
            readTime: '5 min leestijd',
            body: [
                'De Wet goed verhuurderschap stelt landelijke regels aan het gedrag van verhuurders en beheerorganisaties. Het voorkomen van discriminatie, intimidatie en buitensporige borgsommen staat hierbij centraal.',
                'Voor vastgoedbeheerders betekent dit dat verhuurdossiers, schriftelijke overeenkomsten en informatievoorziening aan huurders tot in detail op orde moeten zijn. Met geautomatiseerde software-Workflows worden verplichte bijlagen en vergunning-statussen automatisch geregistreerd.',
            ],
        },
        en: {
            title: 'Good Landlordship Act: What changes for real estate managers?',
            slug: 'good-landlordship-act-what-changes-for-property-managers',
            excerpt: 'A comprehensive guide to compliance requirements under the Dutch Good Landlordship Act and how automated software prevents administrative delays.',
            readTime: '5 min read',
            body: [
                'The Dutch Good Landlordship Act enforces national standards for landlord and property manager conduct. Preventing discrimination, intimidation, and excessive security deposits is central to the legislation.',
                'Property managers must ensure tenant onboarding files and written disclosure notices are fully compliant. Automated ERP workflows simplify record-keeping and audit trails.',
            ],
        },
    },

    {
        baseId: 'vast-vs-flex-huurcontract',
        imageFile: 'vast-huurcontract-vs-flexibel-huurcontract.jpeg',
        category: 'Vastgoedbeheer',
        date: '2025-09-12T11:00:00Z',
        author: 'Raymond Perridon',
        nl: {
            title: 'Vast huurcontract vs. Flexibel huurcontract: Juridische en financiële impact',
            slug: 'vast-huurcontract-vs-flexibel-huurcontract-juridische-en-financiele-impact',
            excerpt: 'De Wet vaste huurcontracten herstelt de vaste huurovereenkomst als norm. Wat betekent dit voor de exploitatierendementen van vastgoedbeleggers?',
            readTime: '6 min leestijd',
            body: [
                'De Wet vaste huurcontracten heeft tijdelijke huurovereenkomsten voor zelfstandige woonruimte aan banden gelegd. Vastgoedbeheerders stappen massaal over op contracten voor onbepaalde tijd.',
                'Dit heeft directe gevolgen voor huurderretentie, mutatiekosten en leegstandsrisico. Met geavanceerde contractmodule in Business Central stuur je proactief op contractduur en indexatie.',
            ],
        },
        en: {
            title: 'Permanent vs. Flexible Lease Agreements: Legal and financial impact',
            slug: 'permanent-vs-flexible-lease-agreements-legal-and-financial-impact',
            excerpt: 'The Dutch Fixed Lease Act restores indefinite lease contracts as standard. What does this mean for property portfolio yields?',
            readTime: '6 min read',
            body: [
                'The Dutch Fixed Lease Act restricts temporary residential lease contracts. Property managers are switching back to indefinite lease agreements as the industry baseline.',
                'This directly influences tenant retention, turnover costs, and vacancy management. Advanced Business Central contract management tools enable proactive portfolio optimization.',
            ],
        },
    },

    {
        baseId: 'box3-rendement-2026',
        imageFile: 'voorstellen-nieuwe-box-3.jpg',
        category: 'Wet & Regelgeving',
        date: '2025-06-05T08:30:00Z',
        author: 'Manfred',
        nl: {
            title: 'Box 3 Rendement 2026: Werkelijk rendement vs. Forfaitaire heffing',
            slug: 'box-3-rendement-2026-werkelijk-rendement-vs-forfaitaire-heffing',
            excerpt: 'De juridische uitspraken rondom Box 3 dwingen vastgoedbeleggers om werkelijke inkomsten en direct toewijsbare kosten nauwkeurig te registreren.',
            readTime: '5 min leestijd',
            body: [
                'Na recente uitspraken van de Hoge Raad moeten vastgoedbeleggers bewijzen wanneer hun werkelijke rendement lager is dan het forfaitaire rendement.',
                'Onze vastgoedbeheer software categoriseert automatisch bruto huurontvangsten en direct aftrekbare exploitatiekosten om een sluitend tegenbewijsdossier op te stellen.',
            ],
        },
        en: {
            title: 'Box 3 Tax 2026: Actual returns vs. Statutory rate in the Netherlands',
            slug: 'box-3-tax-2026-actual-returns-vs-statutory-rate',
            excerpt: 'Supreme Court rulings force real estate investors to track actual rental yields and directly attributable maintenance expenses.',
            readTime: '5 min read',
            body: [
                'Following landmark Dutch Supreme Court rulings, property investors must document when actual investment yields fall below the statutory rate.',
                'emlinked software automatically categorizes gross rental income and deductible maintenance expenses for accurate tax substantiation.',
            ],
        },
    },

    {
        baseId: 'bc23-incasso',
        imageFile: 'emlinked-nu-beschikbaar-op.jpg',
        category: 'ERP & Business Central',
        date: '2025-03-18T14:00:00Z',
        author: 'Ebenezer',
        nl: {
            title: 'Geautomatiseerde incasso & bankaflettering in Business Central 23',
            slug: 'geautomatiseerde-incasso-en-bankaflettering-in-business-central-23',
            excerpt: 'Hoe native SEPA-extensies en PSD2-bankkoppelingen handmatig afletterwerk met 95% verminderen voor professionele vastgoedbeheerders.',
            readTime: '4 min leestijd',
            body: [
                'Met de nieuwste Business Central 23 release introduceert emlinked directe bankintegraties die bankafschriften in CAMT.053 en MT940 formaat automatisch verwerken.',
                'Het resultaat is 95% minder handmatig afletterwerk en directe verwerking van maandelijkse SEPA-huurincasso’s.',
            ],
        },
        en: {
            title: 'Automated direct debit & bank reconciliation in Business Central 23',
            slug: 'automated-direct-debit-and-bank-reconciliation-in-business-central-23',
            excerpt: 'How native SEPA extensions and PSD2 banking APIs eliminate manual ledger matching by up to 95% for property management companies.',
            readTime: '4 min read',
            body: [
                'With the Business Central 23 release, emlinked introduces direct banking integration that automatically imports CAMT.053 bank statements.',
                'Achieve up to 95% reduction in manual ledger matching and streamline automated SEPA rent collection runs.',
            ],
        },
    },

    {
        baseId: 'online-vastgoedbeheer-software',
        imageFile: 'versterk-uw-business-met.jpg',
        category: 'Vastgoedbeheer',
        date: '2025-01-10T10:00:00Z',
        author: 'Iryna Samiliak',
        nl: {
            title: 'Online vastgoedbeheer software: De overstap van Excel naar ERP',
            slug: 'online-vastgoedbeheer-software-de-overstap-van-excel-naar-erp',
            excerpt: 'Excel voldoet bij kleine portefeuilles, maar leidt bij groei tot foutgevoelige indexaties en achterstallige incasso’s. Waarom overstappen op cloud ERP?',
            readTime: '5 min leestijd',
            body: [
                'Bij groeiende vastgoedportefeuilles worden losse spreadsheets al snel onoverzichtelijk en foutgevoelig.',
                'Met de overstap naar cloud ERP geef je huurders, beheerders en eigenaren 24/7 inzicht in huurfacturen, indexaties en onderhoudsmeldingen.',
            ],
        },
        en: {
            title: 'Online real estate management software: Transitioning from Excel to ERP',
            slug: 'online-real-estate-management-software-transitioning-from-excel-to-erp',
            excerpt: 'Excel works for small portfolios, but triggers error-prone indexations as portfolios scale. Why upgrade to native cloud ERP?',
            readTime: '5 min read',
            body: [
                'For expanding real estate portfolios, spreadsheets quickly turn into error-prone operational risks.',
                'Upgrading to cloud ERP provides real-time access for property managers, tenants, and owners across invoices, CPI indexations, and maintenance tickets.',
            ],
        },
    },

    {
        baseId: 'iphone-ipad-app',
        imageFile: 'voor-iphone-en-ipad.jpg',
        category: 'Vastgoedbeheer',
        date: '2024-11-14T09:00:00Z',
        author: 'Ebenezer',
        nl: {
            title: 'Nieuw: emlinked online vastgoedbeheer voor iPhone en iPad',
            slug: 'nieuw-emlinked-online-vastgoedbeheer-voor-iphone-en-ipad',
            excerpt: 'Met de nieuwe emlinked mobiele extensie hebben vastgoedbeheerders en technische inspecteurs onderweg direct inzicht in de complete portefeuille.',
            readTime: '3 min leestijd',
            body: [
                'Met de mobiele emlinked app voer je inspecties op locatie uit, voeg je foto’s toe aan opleverrapporten en raadpleeg je huurcontracten op je iPad of iPhone.',
            ],
        },
        en: {
            title: 'New: emlinked property management for iPhone and iPad',
            slug: 'new-emlinked-property-management-for-iphone-and-ipad',
            excerpt: 'With the new emlinked mobile application, property managers and field inspectors gain instant real-time access to portfolio data on the go.',
            readTime: '3 min read',
            body: [
                'Perform property inspections on site, attach inspection photos to handover reports, and access lease documents directly on iPhone and iPad.',
            ],
        },
    },

    {
        baseId: 'cbs-cpi',
        imageFile: 'cbs-wijzigt.jpg',
        category: 'Wet & Regelgeving',
        date: '2024-09-08T11:00:00Z',
        author: 'Manfred',
        nl: {
            title: 'CBS wijzigt Consumentenprijsindex (CPI): Wat betekent dit voor de huurindexatie?',
            slug: 'cbs-wijzigt-consumentenprijsindex-cpi',
            excerpt: 'Het Centraal Bureau voor de Statistiek vernieuwt de berekeningsmethode van de CPI. Ontdek hoe emlinked de nieuwste cijfers automatisch verwerkt.',
            readTime: '4 min leestijd',
            body: [
                'De vernieuwde rekenmethode van het CBS beïnvloedt de maandelijkse huuraanpassingspercentages. emlinked haalt de nieuwste CPI-reeks automatisch op via API.',
            ],
        },
        en: {
            title: 'CBS updates Consumer Price Index (CPI): Impact on rent indexation',
            slug: 'cbs-updates-consumer-price-index-cpi',
            excerpt: 'Statistics Netherlands updates the CPI calculation model. Learn how emlinked automatically syncs CPI rates directly into Business Central.',
            readTime: '4 min read',
            body: [
                'Statistics Netherlands has updated its CPI calculation methodology. emlinked automatically fetches the latest indexation rates via automated API calls.',
            ],
        },
    },

    {
        baseId: 'nieuw-telefoonnummer',
        imageFile: 'emlinked-heeft-een-nieuw-telefoonnummer.jpg',
        category: 'Organisatie',
        date: '2024-07-01T08:00:00Z',
        author: 'Elisabeth',
        nl: {
            title: 'emlinked heeft een nieuw telefoonnummer en bereikbaarheid',
            slug: 'emlinked-heeft-een-nieuw-telefoonnummer',
            excerpt: 'Om onze klanten nog sneller te woord te staan, hebben we onze telefonische support- en advieslijnen gecentraliseerd.',
            readTime: '2 min leestijd',
            body: [
                'Vanaf heden is ons team bereikbaar via een centraal telefoonnummer. Zo word je direct doorverbonden met de juiste consultant of interim recruiter.',
            ],
        },
        en: {
            title: 'emlinked launches new phone contact line',
            slug: 'emlinked-launches-new-phone-contact-line',
            excerpt: 'To assist our clients faster, we have centralized our dedicated support and executive advice phone numbers.',
            readTime: '2 min read',
            body: [
                'Our client desk is now accessible via a unified contact line, instantly connecting you with the right Business Central consultant or recruitment partner.',
            ],
        },
    },

    {
        baseId: 'verhuisd-naarden',
        imageFile: 'wij-zijn-verhuisd-naar-naarden.jpg',
        category: 'Organisatie',
        date: '2024-05-12T10:00:00Z',
        author: 'Raymond Perridon',
        nl: {
            title: 'Wij zijn verhuisd naar een nieuwe locatie in Naarden!',
            slug: 'wij-zijn-verhuisd-naar-naarden',
            excerpt: 'Wegens aanhoudende groei is ons kantoor verhuisd naar een inspirerende nieuwe werkomgeving in Naarden.',
            readTime: '3 min leestijd',
            body: [
                'Ons team groeit! Om onze klanten en interim kandidaten in een inspirerende omgeving te ontvangen, zijn we verhuisd naar Naarden.',
            ],
        },
        en: {
            title: 'We have moved to our new office location in Naarden!',
            slug: 'we-have-moved-to-our-new-office-in-naarden',
            excerpt: 'Due to ongoing expansion, our headquarters has relocated to a modern office in Naarden.',
            readTime: '3 min read',
            body: [
                'We have moved! To accommodate our growing team and welcome clients in a modern setting, emlinked has relocated to Naarden.',
            ],
        },
    },

    {
        baseId: 'trainingsaanbod-2024',
        imageFile: 'emlinked-trainingsaanbod-2024.jpg',
        category: 'Organisatie',
        date: '2024-03-20T09:00:00Z',
        author: 'Elisabeth',
        nl: {
            title: 'emlinked trainingsaanbod: Haal het maximale uit vastgoedbeheer software',
            slug: 'emlinked-trainingsaanbod-2024',
            excerpt: 'Nieuwe interactieve workshops en trainingen voor vastgoedbeheerders en financieel medewerkers om ERP-processen optimaal te benutten.',
            readTime: '4 min leestijd',
            body: [
                'Met onze praktijkgerichte trainingen leren financieel beheerders en verhuurmakelaars hoe ze indexaties, incasso’s en jaarafrekeningen 100% foutloos verwerken.',
            ],
        },
        en: {
            title: 'emlinked training program: Maximize value from property software',
            slug: 'emlinked-training-program-maximize-value-from-property-software',
            excerpt: 'New interactive workshops for property managers and financial teams to optimize ERP workflows.',
            readTime: '4 min read',
            body: [
                'Our practical workshops train financial property managers and leasing officers to execute indexations and reconciliation runs flawlessly.',
            ],
        },
    },

    {
        baseId: '15-miljard-vastgoed',
        imageFile: 'onze-klanten-beheren-al.jpg',
        category: 'Organisatie',
        date: '2024-01-25T11:00:00Z',
        author: 'Raymond Perridon',
        nl: {
            title: 'Onze klanten beheren al meer dan € 15 miljard aan vastgoed met emlinked',
            slug: 'onze-klanten-beheren-al-meer-dan-15-miljard-aan-vastgoed-met-emlinked',
            excerpt: 'Een belangrijke mijlpaal: meer dan 15 miljard euro aan residentieel en commercieel vastgoed wordt dagelijks geadministreerd via emlinked software.',
            readTime: '4 min leestijd',
            body: [
                'We zijn trots op het vertrouwen van onze opdrachtgevers. Meer dan 15 miljard euro aan vastgoedportefeuilles wordt momenteel beheerd met onze software.',
            ],
        },
        en: {
            title: 'Our clients manage over €15 billion in real estate assets with emlinked',
            slug: 'our-clients-manage-over-15-billion-in-real-estate-assets-with-emlinked',
            excerpt: 'A major milestone: over 15 billion euros in residential and commercial real estate is managed daily through emlinked software.',
            readTime: '4 min read',
            body: [
                'A landmark milestone: over €15 billion in commercial and residential property portfolios is managed daily using emlinked applications.',
            ],
        },
    },

    {
        baseId: 'direct-banking',
        imageFile: 'direct-banking.jpeg',
        category: 'ERP & Business Central',
        date: '2023-11-15T10:00:00Z',
        author: 'Manfred',
        nl: {
            title: 'Direct Banking: Geautomatiseerde banktransacties en betaalbestanden',
            slug: 'direct-banking-banktransacties-bankafschriften-betaalbestanden',
            excerpt: 'Ontdek hoe de Direct Banking module bankafschriften automatisch inleest en huuroverschrijvingen direct verwerkt.',
            readTime: '4 min leestijd',
            body: [
                'Met de Direct Banking module koppel je Nederlandse grootbanken rechtstreeks aan Business Central voor automatische aflettering.',
            ],
        },
        en: {
            title: 'Direct Banking: Automated transaction matching and payment files',
            slug: 'direct-banking-automated-transactions-and-payment-files',
            excerpt: 'Discover how Direct Banking automatically imports bank statements and matches tenant rent payments.',
            readTime: '4 min read',
            body: [
                'Direct Banking integrates Dutch financial institutions with Business Central for real-time ledger reconciliation.',
            ],
        },
    },

    {
        baseId: 'huurdersportaal-release',
        imageFile: 'emlinked-huurdersportaal.jpeg',
        category: 'Vastgoedbeheer',
        date: '2023-09-10T14:00:00Z',
        author: 'Thorwald',
        nl: {
            title: 'emlinked Huurdersportaal: 24/7 zelfservice voor huurders en verhuurders',
            slug: 'emlinked-huurdersportaal',
            excerpt: 'Verhoog de tevredenheid van huurders met een 24/7 digitaal portaal voor onderhoudsverzoeken, huurnota’s en contractgegevens.',
            readTime: '4 min leestijd',
            body: [
                'Het emlinked huurdersportaal geeft huurders digitaal inzicht in hun huurcontracten, betalingshistorie en reparatieverzoeken.',
            ],
        },
        en: {
            title: 'emlinked Tenant Portal: 24/7 self-service for tenants and property managers',
            slug: 'emlinked-tenant-portal-self-service',
            excerpt: 'Boost tenant satisfaction with a 24/7 portal for repair requests, rent statements, and lease agreements.',
            readTime: '4 min read',
            body: [
                'The emlinked tenant portal provides digital access to lease documents, payment statements, and maintenance tickets.',
            ],
        },
    },

    {
        baseId: '5-redenen-updaten',
        imageFile: '5-redenen-waarom.jpg',
        category: 'ERP & Business Central',
        date: '2023-07-04T09:30:00Z',
        author: 'Ebenezer',
        nl: {
            title: '5 redenen waarom het belangrijk is om uw vastgoedsoftware te updaten',
            slug: '5-redenen-waarom-het-belangrijk-is-om-uw-systemen-te-updaten',
            excerpt: 'Verouderde legacy-systemen brengen beveilingsrisico’s en trage koppelingen met zich mee. 5 redenen om over te stappen op de nieuwste Business Central cloud-versie.',
            readTime: '5 min leestijd',
            body: [
                'Regelmatige updates van je ERP-software waarborgen AVG-compliance, beveiligen gevoelige persoonsgegevens en bieden toegang tot de nieuwste AI-functies.',
            ],
        },
        en: {
            title: '5 reasons why updating your real estate management software is essential',
            slug: '5-reasons-why-updating-your-real-estate-software-is-essential',
            excerpt: 'Legacy systems introduce security vulnerabilities and slow integrations. 5 key reasons to upgrade to Business Central cloud.',
            readTime: '5 min read',
            body: [
                'Regular ERP software updates ensure GDPR compliance, protect tenant data, and unlock new AI automation tools.',
            ],
        },
    },

    {
        baseId: 'vastgoedbeleggers-in-beweging',
        imageFile: 'vastgoedbeleggers-in-beweging.jpg',
        category: 'Vastgoedbeheer',
        date: '2023-05-18T11:00:00Z',
        author: 'Raymond Perridon',
        nl: {
            title: 'Vastgoedbeleggers in beweging: Trends en marktontwikkelingen',
            slug: 'vastgoedbeleggers-in-beweging',
            excerpt: 'Stijgende rentes en veranderende regelgeving vragen om scherpe sturing op rendement en actueel inzicht in vastgoedportefeuilles.',
            readTime: '5 min leestijd',
            body: [
                'In een dynamische vastgoedmarkt maken actuele portefeuillecijfers het verschil tussen rendement en leegstand.',
            ],
        },
        en: {
            title: 'Real estate investors on the move: Industry trends and market updates',
            slug: 'real-estate-investors-on-the-move-trends-and-market-updates',
            excerpt: 'Changing interest rates and rental regulations require data-driven portfolio management and yield optimization.',
            readTime: '5 min read',
            body: [
                'In a shifting real estate market, real-time portfolio metrics empower investors to maximize rental yields.',
            ],
        },
    },

    {
        baseId: 'voorstellen-nieuwe-box3',
        imageFile: 'box-3-administratie-niet.jpg',
        category: 'Wet & Regelgeving',
        date: '2023-03-22T10:00:00Z',
        author: 'Manfred',
        nl: {
            title: 'Voorstellen nieuwe Box 3 wetgeving: Wat betekent dit voor verhuurd vastgoed?',
            slug: 'voorstellen-nieuwe-box-3',
            excerpt: 'Een grondige analyse van het wetsvoorstel werkelijk rendement in Box 3 en de voorbereiding voor vastgoedbeleggers.',
            readTime: '5 min leestijd',
            body: [
                'De overgang naar een stelsel van werkelijk rendement vraagt om een gedetailleerde uitsplitsing van verhuurinkomsten en onderhoudskosten.',
            ],
        },
        en: {
            title: 'New Dutch Box 3 proposals: Implications for rental property portfolios',
            slug: 'new-dutch-box-3-proposals-implications-for-rental-property-portfolios',
            excerpt: 'An in-depth analysis of actual return proposals in Box 3 tax rules and how property investors should prepare.',
            readTime: '5 min read',
            body: [
                'Transitioning to actual investment returns requires meticulous ledger tracking of gross rents and maintenance costs.',
            ],
        },
    },

    {
        baseId: 'nieuwe-update-vastgoedbeheer',
        imageFile: 'nieuwe-update-emlinked-vastgoedbeheer.jpeg',
        category: 'ERP & Business Central',
        date: '2023-01-15T09:00:00Z',
        author: 'Ebenezer',
        nl: {
            title: 'Nieuwe update emlinked vastgoedbeheer software beschikbaar',
            slug: 'nieuwe-update-emlinked-vastgoedbeheer-software',
            excerpt: 'De nieuwste release brengt snellere CPI-indexatie berekeningen en een vernieuwd dashboard voor vastgoedbeheerders.',
            readTime: '4 min leestijd',
            body: [
                'Met trots lanceren we de nieuwste update van emlinked vastgoedbeheer software met nog snellere indexaties en rapportages.',
            ],
        },
        en: {
            title: 'New update available for emlinked property management software',
            slug: 'new-update-available-for-emlinked-property-management-software',
            excerpt: 'The latest release brings faster CPI indexation calculations and a redesigned dashboard for property managers.',
            readTime: '4 min read',
            body: [
                'We are proud to release the latest update of emlinked property management software, featuring faster indexation runs and improved analytics.',
            ],
        },
    },
];

async function fixAndReseed() {
    console.log('🧹 Cleaning up legacy article documents in Sanity...');
    const oldArticles = await client.fetch('*[_type == "article"]{ _id }');
    for (const doc of oldArticles) {
        await client.delete(doc._id);
        console.log(`  Deleted document: ${doc._id}`);
    }

    console.log('🚀 Starting fresh asset upload and document re-seeding...');
    const imageAssetCache = {};

    for (const item of articlesData) {
        let assetId = imageAssetCache[item.imageFile];
        if (!assetId && item.imageFile) {
            assetId = await uploadImageAsset(item.imageFile);
            if (assetId) {
                imageAssetCache[item.imageFile] = assetId;
            }
        }

        const imageField = assetId
            ? {
                  _type: 'image',
                  asset: { _type: 'reference', _ref: assetId },
              }
            : undefined;

        // Clean slug (strip leading/trailing slashes)
        const cleanSlugNl = item.nl.slug.replace(/^\/+|\/+$/g, '');
        const cleanSlugEn = item.en.slug.replace(/^\/+|\/+$/g, '');

        // Build Body Blocks with unique _key values
        const bodyNl = item.nl.body.map((paragraph) => ({
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
                {
                    _type: 'span',
                    _key: generateKey(),
                    text: paragraph,
                },
            ],
        }));

        const bodyEn = item.en.body.map((paragraph) => ({
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [
                {
                    _type: 'span',
                    _key: generateKey(),
                    text: paragraph,
                },
            ],
        }));

        // Seed NL Document
        const nlDocId = `article-${item.baseId}-nl`;
        const nlDoc = {
            _id: nlDocId,
            _type: 'article',
            title: item.nl.title,
            language: 'nl',
            slug: { _type: 'slug', current: cleanSlugNl },
            category: item.category,
            excerpt: item.nl.excerpt,
            readTime: item.nl.readTime,
            publishedAt: item.date,
            authorName: item.author,
            imagePath: `/emlinked/news/${item.imageFile}`,
            mainImage: imageField,
            seo: {
                seoTitle: `${item.nl.title} | emlinked`,
                seoDescription: item.nl.excerpt,
                canonical: `https://emlinked.com/nieuws/${cleanSlugNl}`,
                noIndex: false,
            },
            body: bodyNl,
        };

        await client.createOrReplace(nlDoc);
        await client.createOrReplace({ ...nlDoc, _id: `drafts.${nlDocId}` });
        console.log(`  ✅ Seeded NL: ${cleanSlugNl} (keys & canonical clean)`);

        // Seed EN Document
        const enDocId = `article-${item.baseId}-en`;
        const enDoc = {
            _id: enDocId,
            _type: 'article',
            title: item.en.title,
            language: 'en',
            slug: { _type: 'slug', current: cleanSlugEn },
            category: item.category,
            excerpt: item.en.excerpt,
            readTime: item.en.readTime,
            publishedAt: item.date,
            authorName: item.author,
            imagePath: `/emlinked/news/${item.imageFile}`,
            mainImage: imageField,
            seo: {
                seoTitle: `${item.en.title} | emlinked`,
                seoDescription: item.en.excerpt,
                canonical: `https://emlinked.com/en/news/${cleanSlugEn}`,
                noIndex: false,
            },
            body: bodyEn,
        };

        await client.createOrReplace(enDoc);
        await client.createOrReplace({ ...enDoc, _id: `drafts.${enDocId}` });
        console.log(`  ✅ Seeded EN: ${cleanSlugEn} (keys & canonical clean)`);
    }

    console.log('🎉 Fix and re-seed complete! All 36 documents in Sanity are 100% valid with keys, clean slugs, and canonical URL schema fields!');
}

fixAndReseed();
