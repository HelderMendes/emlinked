require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-07-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

async function seedHomepageBlueprint() {
    console.log('Seeding strategic homepage blueprint to Sanity...');

    const nlPageBlocks = [
        {
            _type: 'hero',
            _key: 'hero_nl',
            label: 'De native vastgoedmodule voor Dynamics 365 Business Central',
            title: 'Uw vastgoedportefeuille altijd aangifte-klaar',
            subtitle:
                'Met Emlinked vastgoedbeheer software beheert u uw huurcontracten, operationele kosten en financiële administratie native in één systeem. Speciaal ontwikkeld voor vastgoedportefeuilles vanaf 50 verhuureenheden. Volledig geïntegreerd met Microsoft Business Central.',
            ctaLabel: 'Gratis demo aanvragen',
            ctaLink: '#demo',
            secondaryCtaLabel: 'Bereken uw Box 3-impact',
            secondaryCtaLink: '/box3-check',
            showProof: true,
            proofText:
                'Vertrouwd door professionele vastgoedbeheerders en controllers',
            cardTitle: 'LIVE PORTFOLIO METRICS',
            cardStats: [
                {
                    _key: 's1',
                    label: 'Foutloze CPI-Indexatie',
                    value: '100%',
                    badgeText: 'Geautomatiseerd',
                    badgeType: 'good',
                },
                {
                    _key: 's2',
                    label: 'Bankaflettering (PSD2)',
                    value: 'Direct',
                    badgeText: 'Reconciliatie',
                    badgeType: 'blue',
                },
                {
                    _key: 's3',
                    label: 'Business Central Boekingen',
                    value: 'Native',
                    badgeText: 'Grootboek-synchroon',
                    badgeType: 'good',
                },
            ],
        },
        {
            _type: 'trustBar',
            _key: 'trustbar_nl',
            items: [
                {
                    _key: 't1',
                    text: 'Gebouwd op Microsoft Business Central',
                    icon: 'shield',
                },
                {
                    _key: 't2',
                    text: 'Realtime bankreconciliatie & aflettering',
                    icon: 'check',
                },
                {
                    _key: 't3',
                    text: 'Eén centrale bron voor al uw operationele data',
                    icon: 'star',
                },
            ],
        },
        {
            _type: 'featuresList',
            _key: 'features-core-block',
            sectionTag: 'MODULAIR EN FLEXIBEL',
            sectionTitle: 'Drie krachtige apps, één naadloze workflow',
            sectionSubtitle:
                'Onze applicaties werken perfect samen om de kloof tussen uw dagelijkse operationele taken en de financiële kern van uw organisatie te dichten. Kies de modules die uw beheer optimaliseren.',
            features: [
                {
                    _key: 'app1',
                    title: 'Vastgoedbeheer software',
                    description:
                        'De operationele motor voor uw retailportefeuille of woningbezit. Automatiseer complexe huurovereenkomsten, periodieke CPI-indexaties, servicekostenberekeningen en beheer flexibele metrage-types zonder handmatige Excel-lijsten.',
                    icon: 'trending-up',
                    imagePath:
                        '/emlinked/home/DrieKrachtigeApps_VastgoedbeheerSoftware.png',
                },
                {
                    _key: 'app2',
                    title: 'Huurdersportaal',
                    description:
                        'Geef uw huurders de regie en verlaag de administratieve druk. Via het self-service portaal dienen huurders zelf reparatieverzoeken in, downloaden ze documenten en communiceren ze direct met uw beheerteam. Realtime gesynchroniseerd met uw database.',
                    icon: 'file-text',
                    imagePath: '/emlinked/home/Huurdersportaal.png',
                },
                {
                    _key: 'app3',
                    title: 'Payment software',
                    description:
                        "Automatiseer uw volledige huurincasso en betaalstromen. Dankzij de directe banking-koppeling worden SEPA-incasso's klaargezet, huurpenningen automatisch geïnd en openstaande posten direct afgeletterd.",
                    icon: 'cpu',
                    imagePath:
                        '/emlinked/home/DrieKrachtigeApps_PaymentSoftware.png',
                },
            ],
        },
        {
            _type: 'integrationsList',
            _key: 'integrations-partner-block',
            sectionTag: 'ERP INTEGRATIE',
            sectionTitle:
                'De directe koppeling met Microsoft Dynamics 365 Business Central',
            sectionSubtitle:
                'Veel platformen beloven een koppeling, maar Emlinked werkt native binnen uw ERP-omgeving. Dit betekent: geen handmatige exports, geen gecompliceerde API-fouten en absolute data-integriteit. Elke operationele mutatie landt direct als gevalideerde journaalpost in uw grootboek.',
            integrations: [
                {
                    _key: 'i1',
                    title: 'Business Central',
                    description:
                        'Uw volledige financiële administratie en vastgoedbeheer in één gedeelde database.',
                    badge: 'ERP Core',
                    footerSpec: 'Direct DB Schema',
                    statusText: 'Core Database',
                    imagePlaceholder: 'business-central',
                },
                {
                    _key: 'i2',
                    title: 'Document Capture',
                    description:
                        'Automatische herkenning en verwerking van inkoopfacturen voor onderhoud en servicekosten.',
                    badge: 'Factuurverwerking',
                    footerSpec: 'Continia OCR Engine',
                    statusText: 'Auto-Matching',
                    imagePlaceholder: 'document-capture',
                },
                {
                    _key: 'i3',
                    title: 'Direct Banking',
                    description:
                        'Directe, beveiligde bankkoppeling voor automatische aflettering van uw bankafschriften.',
                    badge: 'PSD2 Bankkoppeling',
                    footerSpec: 'PSD2 / ISO 20022',
                    statusText: 'Live Reconciled',
                    imagePlaceholder: 'direct-banking',
                },
            ],
        },
        {
            _type: 'featuresList',
            _key: 'box3-check-lead-magnet',
            sectionTag: 'FISCALE OPTIMALISATIE',
            sectionTitle:
                'Zekerheid over uw vastgoedportefeuille? Doe de Box 3-check ⚡',
            sectionSubtitle:
                'De voortdurend veranderende wet- en regelgeving rondom de Box 3-belasting vraagt om proactief beheer. Is uw portefeuille optimaal gestructureerd voor de nieuwste fiscale normen? Onze geïntegreerde rekentool geeft u direct inzicht.',
            features: [
                {
                    _key: 'b1',
                    title: "Bereken binnen 2 minuten uw fiscale risico's.",
                    description:
                        'Direct helder inzicht in uw portefeuille en fiscale hefboom.',
                    icon: 'check',
                },
                {
                    _key: 'b2',
                    title: 'Ontvang een concreet optimalisatierapport in uw mailbox.',
                    description:
                        'Praktische actiepunten klaar voor overleg met uw accountant.',
                    icon: 'check',
                },
                {
                    _key: 'b3',
                    title: 'Ontdek hoe u uw operationele kosten efficiënter kunt doorbelasten.',
                    description:
                        'Maximale aftrekbaarheid van onderhouds- en beheerlasten.',
                    icon: 'check',
                },
            ],
        },
        {
            _type: 'ctaBanner',
            _key: 'cta-bottom-block',
            tag: 'DIGITALISERING',
            title: 'Klaar om uw vastgoedbeheer te digitaliseren?',
            subtitle:
                'Sluit aan bij de professionele beheerders die handmatig werk hebben geëlimineerd en kiezen voor 100% realtime controle binnen Business Central.',
            buttonLabel: 'Vraag een live demonstratie aan',
            buttonLink: '/contact',
        },
    ];

    try {
        // Patch Dutch home document
        const nlDocId = 'c8071896-4119-41e3-b095-ab5d2134d27f';
        await client.patch(nlDocId).set({ pageBlocks: nlPageBlocks }).commit();
        console.log('Dutch homepage patched successfully in Sanity!');

        // Patch English home document if present
        const enDocId = 'Ujl1Ky5GJWpKWiHmkpetx1';
        const enDoc = await client.getDocument(enDocId);
        if (enDoc) {
            console.log('Patching English homepage document...');
            await client
                .patch(enDocId)
                .set({ pageBlocks: nlPageBlocks })
                .commit();
            console.log('English homepage patched successfully in Sanity!');
        }
    } catch (err) {
        console.error('Error seeding Sanity homepage blueprint:', err);
    }
}

seedHomepageBlueprint();
