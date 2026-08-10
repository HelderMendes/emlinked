const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

async function syncSubpagesPageBlocks() {
    console.log(
        '🚀 Syncing pageBlocks for all 3 solution subpages (NL & EN) in Sanity...\n',
    );

    // ─────────────────────────────────────────────────────────────────────────
    // 1. PAYMENT SOFTWARE (4 Blocks: Hero, Comparison, Workflows, CTA)
    // ─────────────────────────────────────────────────────────────────────────
    const paymentBlocksNL = [
        {
            _key: 'hero_payment_nl',
            _type: 'heroBlock',
            badge: 'AUTOMATISCHE INCASSO & RECONCILIATIE',
            tagline:
                'Geautomatiseerde huurincasso & *bankaflettering direct in je ERP*',
            description:
                'Geen handmatige aflettering van bankafschriften meer. Onze huurincasso software automatiseert het volledige proces van SEPA-incasso’s, herinneringen en het matchen van inkomende huurbetalingen met je grootboek. Native geïntegreerd met Microsoft Dynamics 365 Business Central en Direct Banking.',
            heroImage: '/emlinked/apps/payment/automatiseren_payment.jpg',
        },
        {
            _key: 'comp_payment_nl',
            _type: 'comparisonBlock',
            badge: 'HANDMATIG VS GEAUTOMATISEERD',
            title: 'Geen losse journaalposten of handmatige incassobestanden meer',
            desc: 'Vergelijk de traditionele manier van debiteurenbeheer en bankaflettering met de geautomatiseerde engine van Emlinked.',
            leftTitle: 'TRADITIONEEL DEBITEURENBEHEER',
            leftItems: [
                {
                    title: 'Handmatige SEPA-bestanden uploaden',
                    desc: 'Losse CSV- of XML-bestanden genereren en handmatig uploaden bij de bank.',
                },
                {
                    title: 'Foutgevoelige bankaflettering',
                    desc: 'Honderden bankafschriften regel voor regel matchen met openstaande huurfacturen.',
                },
                {
                    title: 'Trage herinnerings- en aanmaningsprocessen',
                    desc: 'Aanmaningen worden pas weken na het verstrijken van de betalingstermijn verstuurd.',
                },
            ],
            rightTitle: 'EMLINKED PAYMENT ENGINE',
            rightItems: [
                {
                    title: '100% Geautomatiseerde SEPA-incasso',
                    desc: 'SEPA-batches worden automatisch gegenereerd en via Direct Banking verwerkt.',
                },
                {
                    title: 'Realtime automatische reconciliatie',
                    desc: 'Inkomende betalingen worden op basis van kenmerk en bedrag direct afgeletterd in Business Central.',
                },
                {
                    title: 'Automatische dossieropbouw & herinneringen',
                    desc: 'Herinneringen worden automatisch klaargezet volgens jouw instellingen.',
                },
            ],
        },
        {
            _key: 'tabs_payment_nl',
            _type: 'featureTabsBlock',
            badge: 'FINANCIËLE WORKFLOWS',
            title: 'Drie krachtige pijlers voor je betalingsorganisatie',
            tabs: [
                {
                    tabId: 'sepa',
                    tabTitle: 'SEPA Direct Debit',
                    title: 'Automatische SEPA-incasso uit te voeren met 1 klik',
                    text: 'Genereer SEPA-incassobestanden voor honderden huurders tegelijk en verstuur ze direct naar de bank via Direct Banking.',
                    bullets: [
                        'Ondersteuning voor Standaard B2C en Zakelijk B2B',
                        'Automatische storneringsverwerking',
                        'Directe journaalposten in het grootboek',
                    ],
                    imagePath: '/emlinked/apps/payment-software_modules.jpg',
                },
                {
                    tabId: 'reconciliation',
                    tabTitle: 'Bank Reconciliatie',
                    title: 'Realtime automatische aflettering van huurfacturen',
                    text: 'Geen handmatig uitzoekwerk meer. Inkomende bankafschriften worden automatisch gematcht met openstaande facturen.',
                    bullets: [
                        'Matchingspercentage > 95%',
                        'Automatisch verwerken van deelbetalingen',
                        'Volledige audit trail voor accountants',
                    ],
                    imagePath:
                        '/emlinked/apps/payment/bankaflettering_preview.jpg',
                },
                {
                    tabId: 'dunning',
                    tabTitle: 'Herinneringen & Aanmaningen',
                    title: 'Automatische dossieropbouw en debiteurenbeheer',
                    text: 'Houd controle op achterstanden. Verstuur vriendelijke herinneringen of formele aanmaningen op basis van vastgestelde termijnen.',
                    bullets: [
                        'Instelbare herinneringstermijnen per huurderstype',
                        'Digitale betalingslinks (iDEAL / QR)',
                        'Overzichtelijk dashboard met openstaande posten',
                    ],
                    imagePath:
                        '/emlinked/apps/payment/herinneringen_preview.jpg',
                },
            ],
        },
        {
            _key: 'cta_payment_nl',
            _type: 'ctaBlock',
            title: 'Klaar om je huurincasso 100% te automatiseren?',
            desc: 'Ervaar zelf hoe onze payment software je debiteurenbeheer versnelt en je bankaflettering foutloos verwerkt in Business Central.',
            primaryButtonText: 'Live demo aanvragen',
            secondaryButtonText: 'Bekijk tarieven & prijzen →',
        },
    ];

    const paymentBlocksEN = [
        {
            _key: 'hero_payment_en',
            _type: 'heroBlock',
            badge: 'AUTOMATED COLLECTION & RECONCILIATION',
            tagline:
                'Automated rent collection & *bank reconciliation inside your ERP*',
            description:
                'No more manual bank statement reconciliation. Our payment software automates SEPA direct debits, payment reminders, and matching incoming payments with your general ledger. Natively integrated with Microsoft Dynamics 365 Business Central and Direct Banking.',
            heroImage: '/emlinked/apps/payment/automatiseren_payment.jpg',
        },
        {
            _key: 'comp_payment_en',
            _type: 'comparisonBlock',
            badge: 'MANUAL VS AUTOMATED',
            title: 'No more manual journal entries or bank upload files',
            desc: 'Compare traditional accounts receivable management with emlinked automated financial engine.',
            leftTitle: 'TRADITIONAL RECEIVABLES MANAGEMENT',
            leftItems: [
                {
                    title: 'Manual SEPA file uploads',
                    desc: 'Generating CSV or XML files and manually uploading them to banking portals.',
                },
                {
                    title: 'Error-prone bank matching',
                    desc: 'Matching hundreds of bank lines line-by-line against open rent invoices.',
                },
                {
                    title: 'Delayed reminder runs',
                    desc: 'Dunning letters sent weeks late due to manual spreadsheet tracking.',
                },
            ],
            rightTitle: 'EMLINKED PAYMENT ENGINE',
            rightItems: [
                {
                    title: '100% Automated SEPA Direct Debit',
                    desc: 'SEPA batches generated and transmitted via Direct Banking automatically.',
                },
                {
                    title: 'Real-time automatic reconciliation',
                    desc: 'Incoming payments matched against open invoices inside Business Central.',
                },
                {
                    title: 'Automated dunning & payment links',
                    desc: 'Reminders triggered automatically based on your customized workflow rules.',
                },
            ],
        },
        {
            _key: 'tabs_payment_en',
            _type: 'featureTabsBlock',
            badge: 'FINANCIAL WORKFLOWS',
            title: 'Three powerful pillars for your payment operations',
            tabs: [
                {
                    tabId: 'sepa',
                    tabTitle: 'SEPA Direct Debit',
                    title: 'Automated SEPA Direct Debit in 1 click',
                    text: 'Generate SEPA collection batches for hundreds of tenants simultaneously and transmit them directly via Direct Banking.',
                    bullets: [
                        'Support for Standard B2C and Business B2B mandates',
                        'Automatic chargeback & reversal handling',
                        'Direct journal entries in general ledger',
                    ],
                    imagePath: '/emlinked/apps/payment-software_modules.jpg',
                },
                {
                    tabId: 'reconciliation',
                    tabTitle: 'Bank Reconciliation',
                    title: 'Real-time automatic matching of rent invoices',
                    text: 'Eliminate manual line matching. Incoming bank statements are automatically reconciled against open invoices.',
                    bullets: [
                        'Match rate > 95%',
                        'Automated partial payment handling',
                        'Full audit trail for auditors',
                    ],
                    imagePath:
                        '/emlinked/apps/payment/bankaflettering_preview.jpg',
                },
                {
                    tabId: 'dunning',
                    tabTitle: 'Dunning & Reminders',
                    title: 'Automated collections & reminder workflows',
                    text: 'Stay on top of arrears. Send friendly reminders or formal dunning letters based on customizable schedules.',
                    bullets: [
                        'Configurable grace periods per tenant category',
                        'Digital payment links (iDEAL / QR)',
                        'Clear receivables dashboard',
                    ],
                    imagePath:
                        '/emlinked/apps/payment/herinneringen_preview.jpg',
                },
            ],
        },
        {
            _key: 'cta_payment_en',
            _type: 'ctaBlock',
            title: 'Ready to 100% automate your rent collections?',
            desc: 'Experience how our payment software accelerates receivables and eliminates reconciliation errors in Business Central.',
            primaryButtonText: 'Request Live Demo',
            secondaryButtonText: 'View Pricing & Plans →',
        },
    ];

    await client
        .patch('solution-payment-nl')
        .set({ pageBlocks: paymentBlocksNL })
        .commit();
    await client.delete('drafts.solution-payment-nl').catch(() => {});

    await client
        .patch('solution-payment-en')
        .set({ pageBlocks: paymentBlocksEN })
        .commit();
    await client.delete('drafts.solution-payment-en').catch(() => {});
    console.log(
        '✓ Successfully synced 4 pageBlocks for solution-payment (NL & EN)',
    );

    // ─────────────────────────────────────────────────────────────────────────
    // 2. HUURDERSPORTAAL (5 Blocks: Hero, Comparison, Feature Tabs, Architecture Callout, CTA)
    // ─────────────────────────────────────────────────────────────────────────
    const portalBlocksNL = [
        {
            _key: 'hero_portal_nl',
            _type: 'heroBlock',
            badge: 'SELF-SERVICE & HUURDERCOMMUNICATIE',
            tagline: '24/7 Digitaal Huurdersportaal *gekoppeld aan je ERP*',
            description:
                'Verhoog de tevredenheid van je huurders en verlaag de werkdruk op je beheerteam. Via het Emlinked huurdersportaal melden huurders 24/7 reparaties, bekijken ze betalingen en downloaden ze huurovereenkomsten.',
            heroImage:
                '/emlinked/apps/huurdersportaal/automatiseren_huurdersportaal.jpg',
        },
        {
            _key: 'comp_portal_nl',
            _type: 'comparisonBlock',
            badge: 'TRADITIONEEL VS EMLINKED PORTAAL',
            title: 'Waarom een verouderde communicatiestroom tijd en geld kost',
            desc: 'Vergelijk de traditionele manier van huurdercommunicatie met het digitale self-service portaal van Emlinked.',
            leftTitle: 'TRADITIONELE COMMUNICATIE',
            leftItems: [
                {
                    title: 'Moeizame telefoontjes en e-mails',
                    desc: 'Onderhoudsmeldingen komen binnen via telefoon en losse e-mails.',
                },
                {
                    title: 'Geen realtime statusupdates voor huurders',
                    desc: 'Huurders bellen regelmatig om te vragen naar de status van hun melding.',
                },
                {
                    title: 'Handmatige verwerking in beheersysteem',
                    desc: 'Beheerders moeten meldingen handmatig overtypen in de administratie.',
                },
            ],
            rightTitle: 'EMLINKED HUURDERSPORTAAL',
            rightItems: [
                {
                    title: '24/7 Digital Self-Service',
                    desc: 'Huurders dienen 24/7 reparatieverzoeken in met foto’s en toelichting.',
                },
                {
                    title: 'Realtime inzicht & automatische updates',
                    desc: 'Huurders zien direct de status van hun melding en betalingen.',
                },
                {
                    title: 'Directe koppeling met Business Central',
                    desc: 'Reparatieverzoeken worden direct doorgestuurd naar de juiste beheerder of leverancier.',
                },
            ],
        },
        {
            _key: 'tabs_portal_nl',
            _type: 'featureTabsBlock',
            badge: 'PORTAAL FUNCTIONALITEITEN',
            title: 'Alles wat je huurder verwacht in één online omgeving',
            tabs: [
                {
                    tabId: 'maintenance',
                    tabTitle: 'Onderhoudsverzoeken',
                    title: '24/7 Onderhoudsmeldingen indienen met foto’s',
                    text: 'Huurders melden gebreken eenvoudig digitaal. Inclusief foto-upload en voorkeurstijden voor herstel.',
                    bullets: [
                        'Categorisering per type onderhoud',
                        'Directe toewijzing aan aannemers',
                        'Automatische SMS/E-mail notificaties',
                    ],
                    imagePath: '/emlinked/apps/huurdersportaal_modules.jpg',
                },
                {
                    tabId: 'finance',
                    tabTitle: 'Financieel Inzicht',
                    title: '24/7 Inzicht in huurfacturen en betalingshistorie',
                    text: 'Minder vragen aan de debiteurenadministratie. Huurders downloaden zelf facturen en betalen achterstanden via iDEAL.',
                    bullets: [
                        'Overzicht openstaande en voldane facturen',
                        'iDEAL betalingskoppeling',
                        'Jaarlijkse servicekostenafrekening inzien',
                    ],
                    imagePath:
                        '/emlinked/apps/huurdersportaal/financieel_inzicht_preview.jpg',
                },
                {
                    tabId: 'documents',
                    tabTitle: 'Documenten & Contracten',
                    title: 'Alle contracten en reglementen op één plek',
                    text: 'Huurcontracten, alarminstructies en huurdersreglementen zijn altijd inzichtelijk.',
                    bullets: [
                        'Digitale ondertekening van verlengingen',
                        'Veilige documentopslag per pand',
                        'Overdraagbaar dossier bij oplevering',
                    ],
                    imagePath:
                        '/emlinked/apps/huurdersportaal/documenten_preview.jpg',
                },
            ],
        },
        {
            _key: 'arch_portal_nl',
            _type: 'architectureBlock',
            tag: 'ERP INTEGRATIE',
            title: '24/7 Digital Self-Service & Realtime ERP Synchronisatie',
            desc: 'Het Emlinked huurdersportaal is geen losstaand eiland. Alle meldingen, contractwijzigingen en betalingen worden direct gesynchroniseerd met je centrale Business Central database.',
            bullets: [
                'Volledige integratie met Microsoft Business Central',
                'Nul vertraging bij het aanmaken van werkorders',
                'Veilig rollensysteem voor huurders, beheerders en leveranciers',
            ],
            imagePath:
                '/emlinked/apps/huurdersportaal/automatiseren_huurdersportaal.jpg',
        },
        {
            _key: 'cta_portal_nl',
            _type: 'ctaBlock',
            title: 'Klaar om je huurdercommunicatie te automatiseren?',
            desc: 'Ontdek hoe ons huurdersportaal de communicatie stroomlijnt en je beheerders uren handmatig werk bespaart.',
            primaryButtonText: 'Demo aanvragen',
            secondaryButtonText: 'Bekijk vastgoedbeheer software →',
        },
    ];

    const portalBlocksEN = [
        {
            _key: 'hero_portal_en',
            _type: 'heroBlock',
            badge: 'SELF-SERVICE & TENANT COMMUNICATION',
            tagline: '24/7 Digital Tenant Portal *connected to your ERP*',
            description:
                'Boost tenant satisfaction while reducing property manager workload. Through the emlinked tenant portal, tenants log maintenance tickets 24/7, review payment history, and access lease agreements.',
            heroImage:
                '/emlinked/apps/huurdersportaal/automatiseren_huurdersportaal.jpg',
        },
        {
            _key: 'comp_portal_en',
            _type: 'comparisonBlock',
            badge: 'TRADITIONAL VS EMLINKED PORTAL',
            title: 'Why outdated communication channels waste time & money',
            desc: 'Compare traditional tenant support methods against emlinked digital self-service portal.',
            leftTitle: 'TRADITIONAL SUPPORT',
            leftItems: [
                {
                    title: 'Time-consuming phone calls & emails',
                    desc: 'Maintenance requests handled via phone tag and unorganized email threads.',
                },
                {
                    title: 'No real-time status updates',
                    desc: 'Tenants constantly calling managers to ask for work order updates.',
                },
                {
                    title: 'Manual data entry in ERP',
                    desc: 'Property managers retyping maintenance requests manually into ledgers.',
                },
            ],
            rightTitle: 'EMLINKED TENANT PORTAL',
            rightItems: [
                {
                    title: '24/7 Digital Self-Service',
                    desc: 'Tenants submit repair requests 24/7 with photos and details.',
                },
                {
                    title: 'Real-time visibility & notifications',
                    desc: 'Tenants track work order progress and payment receipts live.',
                },
                {
                    title: 'Native Business Central integration',
                    desc: 'Maintenance tickets generate work orders directly inside your ERP.',
                },
            ],
        },
        {
            _key: 'tabs_portal_en',
            _type: 'featureTabsBlock',
            badge: 'PORTAL FEATURES',
            title: 'Everything your tenant expects in one digital portal',
            tabs: [
                {
                    tabId: 'maintenance',
                    tabTitle: 'Maintenance Requests',
                    title: '24/7 Repair ticket submission with photos',
                    text: 'Tenants submit maintenance requests digitally with photo uploads and access time preferences.',
                    bullets: [
                        'Categorization by maintenance type',
                        'Direct dispatch to contractors',
                        'Automated SMS/Email status updates',
                    ],
                    imagePath: '/emlinked/apps/huurdersportaal_modules.jpg',
                },
                {
                    tabId: 'finance',
                    tabTitle: 'Financial Overview',
                    title: '24/7 Insight into invoices & payment history',
                    text: 'Fewer balance inquiries. Tenants download invoices independently and pay open balances via digital payment links.',
                    bullets: [
                        'Overview of open and settled invoices',
                        'Integrated payment links',
                        'Annual service charge reconciliation statements',
                    ],
                    imagePath:
                        '/emlinked/apps/huurdersportaal/financieel_inzicht_preview.jpg',
                },
                {
                    tabId: 'documents',
                    tabTitle: 'Lease Documents',
                    title: 'All contracts and house rules in one secure hub',
                    text: 'Lease contracts, emergency protocols, and building regulations are accessible anytime.',
                    bullets: [
                        'Digital extension signatures',
                        'Secure property document vault',
                        'Handover records storage',
                    ],
                    imagePath:
                        '/emlinked/apps/huurdersportaal/documenten_preview.jpg',
                },
            ],
        },
        {
            _key: 'arch_portal_en',
            _type: 'architectureBlock',
            tag: 'ERP INTEGRATION',
            title: '24/7 Digital Self-Service & Realtime ERP Sync',
            desc: 'The emlinked tenant portal is not a standalone silo. All maintenance tickets, contract updates, and payments synchronize in real time with your central Business Central database.',
            bullets: [
                'Full integration with Microsoft Business Central',
                'Zero delay in work order creation',
                'Role-based access security for tenants, managers, and vendors',
            ],
            imagePath:
                '/emlinked/apps/huurdersportaal/automatiseren_huurdersportaal.jpg',
        },
        {
            _key: 'cta_portal_en',
            _type: 'ctaBlock',
            title: 'Ready to automate tenant communications?',
            desc: 'Discover how our tenant portal streamlines tenant support and saves property managers hours of manual work.',
            primaryButtonText: 'Request Demo',
            secondaryButtonText: 'View Property Management Software →',
        },
    ];

    await client
        .patch('solution-huurdersportaal-nl')
        .set({ pageBlocks: portalBlocksNL })
        .commit();
    await client.delete('drafts.solution-huurdersportaal-nl').catch(() => {});

    await client
        .patch('solution-huurdersportaal-en')
        .set({ pageBlocks: portalBlocksEN })
        .commit();
    await client.delete('drafts.solution-huurdersportaal-en').catch(() => {});
    console.log(
        '✓ Successfully synced 5 pageBlocks for solution-huurdersportaal (NL & EN)',
    );

    // ─────────────────────────────────────────────────────────────────────────
    // 3. VASTGOEDBEHEER SOFTWARE (5 Blocks: Hero, Modules Grid, Comparison, Architecture, CTA)
    // ─────────────────────────────────────────────────────────────────────────
    const vastgoedBlocksNL = [
        {
            _key: 'hero_vg_nl',
            _type: 'heroBlock',
            badge: 'MICROSOFT DYNAMICS 365 NATIVE',
            tagline:
                'Vastgoedbeheer software *geautomatiseerd in Business Central*',
            description:
                'Geavanceerde vastgoedbeheer software voor beheerders, retailketens en woningcorporaties. Beheer huurovereenkomsten, CPI-indexaties en onderhoud native in Microsoft Business Central.',
            heroImage:
                '/emlinked/apps/vastgoedbeheer-software/automatiseren_vastgoedbehher.jpg',
        },
        {
            _key: 'tabs_vg_nl',
            _type: 'featureTabsBlock',
            badge: 'MODULE OVERZICHT',
            title: 'Vastgoedbeheer Software Modules & Functies',
            tabs: [
                {
                    tabId: 'contract',
                    tabTitle: 'Contractbeheer',
                    title: 'Flexibel contractbeheer voor al je vastgoed',
                    text: 'Beheer complexe huurovereenkomsten voor retail, woningen en kantoren op één centrale plek.',
                    bullets: [
                        'Automatische verlengingen & opzegtermijnen',
                        'Metrage- en huurprijsberekeningen',
                        'Documentkoppeling per object',
                    ],
                    imagePath:
                        '/emlinked/apps/vastgoedbeheer-sopftware_modules.jpg',
                },
                {
                    tabId: 'cpi',
                    tabTitle: 'CPI-Indexaties',
                    title: 'Foutloze automatische CPI-indexatieruns',
                    text: 'Voer jaarlijkse of periodieke indexaties uit voor honderden contracten tegelijk zonder Excel-fouten.',
                    bullets: [
                        'Koppeling met CBS-indexcijfers',
                        'Automatische doorrekening naar facturatie',
                        'Indexatiebrieven in bulk versturen',
                    ],
                    imagePath:
                        '/emlinked/apps/vastgoedbeheer-software/native-dynamics-365.jpg',
                },
            ],
        },
        {
            _key: 'comp_vg_nl',
            _type: 'comparisonBlock',
            badge: 'TRADITIONEEL VS NATIVE ERP',
            title: 'Waarom traditionele vastgoed administratie software tekortschiet',
            desc: 'Vergelijk de risico’s van losse software-eilanden met de native kracht van Emlinked binnen Business Central.',
            leftTitle: 'TRADITIONELE VASTGOEDSOFTWARE',
            leftItems: [
                {
                    title: 'Handmatige Excel-imports voor indexaties',
                    desc: 'Foutgevoelig knippen en plakken van CBS-indexcijfers en contractregels.',
                },
                {
                    title: 'API-fouten tussen losse tools en ERP',
                    desc: 'Externe synchronisatiekanalen vallen regelmatig stil met ontbrekende posten.',
                },
                {
                    title: 'Vertraagde financiële rapportages',
                    desc: 'Rapportages over rendement en leegstand moeten handmatig geconsolideerd worden.',
                },
            ],
            rightTitle: 'EMLINKED NATIVE ERP',
            rightItems: [
                {
                    title: 'Automatische CPI-indexaties & huurprolongaties',
                    desc: 'Indexaties worden automatisch berekend en verwerkt in het grootboek.',
                },
                {
                    title: 'Nul API-koppelingen — 100% Native',
                    desc: 'Alle vastgoeddata leeft native binnen Microsoft Business Central.',
                },
                {
                    title: 'Realtime dashboards & Power BI rapportages',
                    desc: 'Direct inzicht in netto rendementen en bezettingsgraden.',
                },
            ],
        },
        {
            _key: 'arch_vg_nl',
            _type: 'architectureBlock',
            tag: 'ERP ARCHITECTUUR',
            title: '100% Realtime controle en automatische aflettering in Business Central',
            desc: 'Beheer al je vastgoedprocessen native in Microsoft Dynamics 365 Business Central zonder vertraging of risico van schaduwbestanden.',
            bullets: [
                'Ingebouwd in Microsoft Dynamics 365 Business Central',
                'Nul schaduwbestanden of dubbele invoer',
                'Volledig audit-ready voor accountants en Belastingdienst 2028',
            ],
            imagePath:
                '/emlinked/apps/vastgoedbeheer-software/native_vastgoedsoftware.jpg',
        },
        {
            _key: 'cta_vg_nl',
            _type: 'ctaBlock',
            title: 'Klaar om je vastgoedbeheer software te moderniseren?',
            desc: 'Ervaar zelf hoe de modulaire apps van Emlinked je administratieve lasten halveren en je financiële controle vergroten.',
            primaryButtonText: 'Gratis live demo aanvragen',
            secondaryButtonText: 'Bekijk tarieven & prijzen →',
        },
    ];

    const vastgoedBlocksEN = [
        {
            _key: 'hero_vg_en',
            _type: 'heroBlock',
            badge: 'MICROSOFT DYNAMICS 365 NATIVE',
            tagline:
                'Property management software *automated inside Business Central*',
            description:
                'Advanced real estate management software for property managers, retail chains, and housing corporations. Manage lease agreements, CPI indexations, and maintenance natively in Microsoft Business Central.',
            heroImage:
                '/emlinked/apps/vastgoedbeheer-software/automatiseren_vastgoedbehher.jpg',
        },
        {
            _key: 'tabs_vg_en',
            _type: 'featureTabsBlock',
            badge: 'MODULE OVERVIEW',
            title: 'Property Management Software Modules & Capabilities',
            tabs: [
                {
                    tabId: 'contract',
                    tabTitle: 'Lease Management',
                    title: 'Flexible contract management for all real estate assets',
                    text: 'Manage complex lease agreements for retail, residential, and commercial portfolios in one unified system.',
                    bullets: [
                        'Automated renewal & notice period tracking',
                        'Area metric and rental calculations',
                        'Document vault per asset',
                    ],
                    imagePath:
                        '/emlinked/apps/vastgoedbeheer-sopftware_modules.jpg',
                },
                {
                    tabId: 'cpi',
                    tabTitle: 'CPI Indexations',
                    title: 'Error-free automated CPI indexation runs',
                    text: 'Execute annual or periodic indexations across hundreds of lease contracts simultaneously without spreadsheet errors.',
                    bullets: [
                        'Direct integration with official statistics indices',
                        'Automatic flow-through to invoicing runs',
                        'Bulk indexation letter dispatch',
                    ],
                    imagePath:
                        '/emlinked/apps/vastgoedbeheer-software/native-dynamics-365.jpg',
                },
            ],
        },
        {
            _key: 'comp_vg_en',
            _type: 'comparisonBlock',
            badge: 'TRADITIONAL VS NATIVE ERP',
            title: 'Why traditional property management software fails',
            desc: 'Compare the risks of isolated software silos with emlinked native power inside Business Central.',
            leftTitle: 'TRADITIONAL PROPERTY SOFTWARE',
            leftItems: [
                {
                    title: 'Manual Excel indexation imports',
                    desc: 'Error-prone copy-pasting of index statistics and contract lines.',
                },
                {
                    title: 'API errors between tools and ERP',
                    desc: 'External sync scripts frequently stall, causing missing ledger posts.',
                },
                {
                    title: 'Delayed financial reporting',
                    desc: 'Yield and occupancy reports require tedious manual spreadsheet consolidation.',
                },
            ],
            rightTitle: 'EMLINKED NATIVE ERP',
            rightItems: [
                {
                    title: 'Automated CPI indexations & rent invoicing',
                    desc: 'Indexations calculated and posted automatically into general ledgers.',
                },
                {
                    title: 'Zero API sync scripts — 100% Native',
                    desc: 'All property management data lives natively inside Business Central.',
                },
                {
                    title: 'Real-time dashboards & Power BI reporting',
                    desc: 'Instant visibility into net yields and occupancy rates.',
                },
            ],
        },
        {
            _key: 'arch_vg_en',
            _type: 'architectureBlock',
            tag: 'ERP ARCHITECTURE',
            title: '100% Realtime Control & Automatic Posting in Business Central',
            desc: 'Manage all your real estate operations natively inside Microsoft Dynamics 365 Business Central with zero latency or shadow file risks.',
            bullets: [
                'Built natively inside Microsoft Dynamics 365 Business Central',
                'Zero shadow files or duplicate data entry',
                '100% audit-ready for auditors and tax compliance',
            ],
            imagePath:
                '/emlinked/apps/vastgoedbeheer-software/native_vastgoedsoftware.jpg',
        },
        {
            _key: 'cta_vg_en',
            _type: 'ctaBlock',
            title: 'Ready to modernize your property management software?',
            desc: 'Experience how emlinked modular apps cut administrative burden in half and maximize financial control.',
            primaryButtonText: 'Request a free live demo',
            secondaryButtonText: 'View pricing & plans →',
        },
    ];

    await client
        .patch('solution-vastgoedbeheer-software-nl')
        .set({ pageBlocks: vastgoedBlocksNL })
        .commit();
    await client
        .delete('drafts.solution-vastgoedbeheer-software-nl')
        .catch(() => {});

    await client
        .patch('solution-vastgoedbeheer-software-en')
        .set({ pageBlocks: vastgoedBlocksEN })
        .commit();
    await client
        .delete('drafts.solution-vastgoedbeheer-software-en')
        .catch(() => {});
    console.log(
        '✓ Successfully synced 5 pageBlocks for solution-vastgoedbeheer-software (NL & EN)',
    );

    console.log(
        '\n🎉 ALL 3 SUBPAGES ARE NOW 100% SYNCED WITH MATCHING PAGEBLOCK COUNTS IN SANITY!',
    );
}

syncSubpagesPageBlocks();
