const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2024-01-01',
    useCdn: false,
});

const pagesToSeed = [
    // 1. VASTGOEDSOFTWARE
    {
        _id: 'page-vastgoedsoftware-nl',
        _type: 'page',
        language: 'nl',
        title: 'Vastgoedsoftware voor Microsoft Dynamics 365',
        slug: { _type: 'slug', current: 'vastgoedsoftware' },
        pageBlocks: [
            {
                _type: 'hero',
                label: 'NATIVE DYNAMICS 365 VASTGOEDSUITE',
                title: 'De complete vastgoedbeheer software binnen Business Central',
                subtitle: 'Emlinked integreert vastgoedbeheer, huurderscommunicatie en betalingsverwerking rechtstreeks in uw financiële hart. 100% realtime en zonder dubbele data-invoer.',
                ctaLabel: 'Vraag een demonstratie aan',
                ctaLink: '/contact',
                secondaryCtaLabel: 'Bekijk de modules',
                secondaryCtaLink: '#modules'
            },
            {
                _type: 'featuresList',
                sectionTag: 'DRIE DYNAMIC MODULES',
                sectionTitle: 'Eén naadloze suite voor professionele beheerders',
                sectionSubtitle: 'Kies voor de krachtige vastgoedbeheer module, het interactieve huurdersportaal of onze SEPA payment software.',
                features: [
                    {
                        title: 'Vastgoedbeheer Software',
                        description: 'Beheer contracten, huurindexaties, servicekosten en onderhoud natively binnen Business Central.',
                        imagePath: '/emlinked/home/DrieKrachtigeApps_VastgoedbeheerSoftware.png'
                    },
                    {
                        title: 'Huurdersportaal',
                        description: 'Self-service communicatie, onderhoudsmeldingen en digitaal ondertekenen voor uw huurders.',
                        imagePath: '/emlinked/home/Huurdersportaal.png'
                    },
                    {
                        title: 'Payment Software',
                        description: 'Automatische SEPA-incasso, PSD2 bankkoppeling en directe reconciliatie van huurontvangsten.',
                        imagePath: '/emlinked/home/DrieKrachtigeApps_PaymentSoftware.png'
                    }
                ]
            },
            {
                _type: 'ctaBanner',
                tag: 'DIGITALISEER UW PORTEFEUILLE',
                title: 'Transformeer uw vastgoedadministratie vandaag',
                subtitle: 'Sluit aan bij toonaangevende vastgoedbeheerders die vertrouwen op Emlinked en Microsoft Dynamics 365.',
                buttonLabel: 'Plan een adviesgesprek',
                buttonLink: '/contact'
            }
        ]
    },
    {
        _id: 'page-vastgoedsoftware-en',
        _type: 'page',
        language: 'en',
        title: 'Property Software for Microsoft Dynamics 365',
        slug: { _type: 'slug', current: 'vastgoedsoftware' },
        pageBlocks: [
            {
                _type: 'hero',
                label: 'NATIVE DYNAMICS 365 PROPERTY SUITE',
                title: 'Complete property management software inside Business Central',
                subtitle: 'Emlinked integrates lease management, tenant communication, and payment processing directly into your core financial system in real time.',
                ctaLabel: 'Request a live demo',
                ctaLink: '/contact',
                secondaryCtaLabel: 'Explore modules',
                secondaryCtaLink: '#modules'
            },
            {
                _type: 'featuresList',
                sectionTag: 'THREE POWERFUL APPS',
                sectionTitle: 'One seamless suite for professional property managers',
                sectionSubtitle: 'Choose our core property management module, interactive tenant portal, or automated SEPA payment software.',
                features: [
                    {
                        title: 'Property Management Software',
                        description: 'Manage contracts, indexations, service charges, and maintenance natively within Business Central.',
                        imagePath: '/emlinked/home/DrieKrachtigeApps_VastgoedbeheerSoftware.png'
                    },
                    {
                        title: 'Tenant Portal',
                        description: 'Self-service portal for tenant tickets, document sharing, and digital contract signing.',
                        imagePath: '/emlinked/home/Huurdersportaal.png'
                    },
                    {
                        title: 'Payment Software',
                        description: 'Automated SEPA direct debit, PSD2 bank feeds, and instant rent payment reconciliation.',
                        imagePath: '/emlinked/home/DrieKrachtigeApps_PaymentSoftware.png'
                    }
                ]
            },
            {
                _type: 'ctaBanner',
                tag: 'DIGITIZE YOUR PORTFOLIO',
                title: 'Transform your property management today',
                subtitle: 'Join leading real estate managers relying on Emlinked and Microsoft Dynamics 365.',
                buttonLabel: 'Schedule a consultation',
                buttonLink: '/contact'
            }
        ]
    },

    // 2. FUNCTIES
    {
        _id: 'page-functies-nl',
        _type: 'page',
        language: 'nl',
        title: 'Vastgoedbeheer Functies & Functionaliteiten',
        slug: { _type: 'slug', current: 'functies' },
        pageBlocks: [
            {
                _type: 'hero',
                label: 'FUNCTIONALITEITEN OVERZICHT',
                title: 'Alle vastgoedfunctionaliteiten native in Business Central',
                subtitle: 'Van automatische CPI-huurindexatie tot het digitaal afhandelen van servicekostenafrekeningen. Ontdek de mogelijkheden.',
                ctaLabel: 'Vraag een live demo aan',
                ctaLink: '/contact'
            },
            {
                _type: 'featuresList',
                sectionTag: 'KERNFUNCTIES',
                sectionTitle: 'Geautomatiseerde werkprocessen voor maximale efficiëntie',
                sectionSubtitle: 'Geen handmatige spreadsheets of losse softwarepakketten meer. Alles overzichtelijk georganiseerd.',
                features: [
                    {
                        title: 'CPI Huurindexatie',
                        description: 'Volautomatische berekening en verwerking van huurverhogingen op basis van de nieuwste CBS-indexcijfers.'
                    },
                    {
                        title: 'Huurprolongatie',
                        description: 'Genereer en verstuur automatisch maandelijkse of kwartaalmatige huurnota’s vanuit uw ERP.'
                    },
                    {
                        title: 'Servicekosten Afrekening',
                        description: 'Sluitende kostenregistratie en automatische herverdeling op basis van m² of gewogen verdeelsleutels.'
                    }
                ]
            }
        ]
    },
    {
        _id: 'page-functies-en',
        _type: 'page',
        language: 'en',
        title: 'Property Management Features & Functionalities',
        slug: { _type: 'slug', current: 'functies' },
        pageBlocks: [
            {
                _type: 'hero',
                label: 'FEATURES OVERVIEW',
                title: 'All property management features native in Business Central',
                subtitle: 'From automated CPI indexations to digital service charge reconciliation. Discover all possibilities.',
                ctaLabel: 'Request a live demo',
                ctaLink: '/contact'
            },
            {
                _type: 'featuresList',
                sectionTag: 'CORE FEATURES',
                sectionTitle: 'Automated workflows designed for maximum efficiency',
                sectionSubtitle: 'No more manual spreadsheets or disconnected third-party tools. Everything cleanly organized.',
                features: [
                    {
                        title: 'CPI Indexation',
                        description: 'Automated calculation and execution of rent increases based on national statistical indexes.'
                    },
                    {
                        title: 'Rent Invoicing Runs',
                        description: 'Generate and disburse recurring monthly or quarterly lease invoices directly from your ERP.'
                    },
                    {
                        title: 'Service Charge Reconciliation',
                        description: 'Full cost tracking and automated redistribution based on sq.m. or weighted allocation keys.'
                    }
                ]
            }
        ]
    },

    // 3. INTEGRATIES
    {
        _id: 'page-integraties-nl',
        _type: 'page',
        language: 'nl',
        title: 'Naadloze Vastgoed Software Koppelingen & Integraties',
        slug: { _type: 'slug', current: 'integraties' },
        pageBlocks: [
            {
                _type: 'hero',
                label: 'ENTERPRISE INTEGRATIES',
                title: 'Directe koppelingen met uw favoriete software tools',
                subtitle: 'Emlinked werkt native samen met Microsoft Dynamics 365, Continia Document Capture, PSD2 Banken en meer.',
                ctaLabel: 'Bekijk integraties',
                ctaLink: '#integraties'
            },
            {
                _type: 'integrationsList',
                sectionTag: 'ERP & FINTECH INTEGRATIES',
                sectionTitle: 'Realtime data-uitwisseling zonder koppelfouten',
                sectionSubtitle: 'Ontdek hoe onze native integraties handmatige administratie en foutgevoelige data-entry elimineren.',
                integrations: [
                    {
                        title: 'Microsoft Dynamics 365 Business Central',
                        badge: 'CORE ERP',
                        description: 'Volledige 2-way synchronisatie van het vastgoed- en financiële grootboek.'
                    },
                    {
                        title: 'Continia Document Capture',
                        badge: 'OCR INKOOP',
                        description: 'Automatische herkenning en verwerking van inkoopfacturen voor onderhoud en servicekosten.'
                    },
                    {
                        title: 'PSD2 / ISO 20022 Bankkoppelingen',
                        badge: 'REALTIME BANKING',
                        description: 'Directe bankkoppeling voor automatische huurincasso en realtime bankaflettering.'
                    }
                ]
            }
        ]
    },
    {
        _id: 'page-integraties-en',
        _type: 'page',
        language: 'en',
        title: 'Seamless Property Software Integrations & ERP Sync',
        slug: { _type: 'slug', current: 'integraties' },
        pageBlocks: [
            {
                _type: 'hero',
                label: 'ENTERPRISE INTEGRATIONS',
                title: 'Direct connections with your core software tools',
                subtitle: 'Emlinked connects natively with Microsoft Dynamics 365, Continia Document Capture, PSD2 Banks, and more.',
                ctaLabel: 'Explore integrations',
                ctaLink: '#integraties'
            },
            {
                _type: 'integrationsList',
                sectionTag: 'ERP & FINTECH INTEGRATIONS',
                sectionTitle: 'Real-time data flow with zero integration errors',
                sectionSubtitle: 'Discover how our native connections eliminate manual data entry and disjointed spreadsheets.',
                integrations: [
                    {
                        title: 'Microsoft Dynamics 365 Business Central',
                        badge: 'CORE ERP',
                        description: 'Full 2-way synchronization of property and financial ledgers.'
                    },
                    {
                        title: 'Continia Document Capture',
                        badge: 'OCR INVOICING',
                        description: 'Automated invoice recognition and processing for maintenance and utility costs.'
                    },
                    {
                        title: 'PSD2 / ISO 20022 Bank Feeds',
                        badge: 'REALTIME BANKING',
                        description: 'Direct banking API for automated direct debit and live payment reconciliation.'
                    }
                ]
            }
        ]
    },

    // 4. PRIJZEN
    {
        _id: 'page-prijzen-nl',
        _type: 'page',
        language: 'nl',
        title: 'Transparante Vastgoedsoftware Tarieven & Licenties',
        slug: { _type: 'slug', current: 'prijzen' },
        pageBlocks: [
            {
                _type: 'hero',
                label: 'EERLIJKE SCHAALBARE TARIEVEN',
                title: 'Eenvoudige licenties die meegroeien met uw vastgoedportefeuille',
                subtitle: 'Geen verborgen kosten. Kies het pakket dat past bij het aantal eenheden in uw portefeuille.',
                ctaLabel: 'Vraag een prijsopgave aan',
                ctaLink: '/contact'
            },
            {
                _type: 'pricingBlock',
                sectionTitle: 'Kies uw licentievorm',
                sectionSubtitle: 'Beschikbaar als SaaS licentie of gecombineerde Enterprise vastgoedsuite.',
                tiers: [
                    {
                        title: 'Starter Beheer',
                        subtitle: 'Voor beheerders tot 100 eenheden',
                        price: 'Op aanvraag',
                        unit: 'per maand',
                        badge: 'Populair bij MKB',
                        features: ['Core Vastgoedbeheer', 'Automatische CPI Indexatie', 'Standaard Rapportages', 'Email Support'],
                        ctaLabel: 'Vraag offerte aan',
                        ctaLink: '/contact'
                    },
                    {
                        title: 'Professional Suite',
                        subtitle: 'Voor professionele beheerders tot 1.000 eenheden',
                        price: 'Op aanvraag',
                        unit: 'per maand',
                        badge: 'Meest gekozen',
                        features: ['Alles in Starter', 'Inclusief Huurdersportaal', 'SEPA Payment Software', 'PSD2 Bankkoppeling', 'Dedicated Support'],
                        ctaLabel: 'Vraag offerte aan',
                        ctaLink: '/contact'
                    },
                    {
                        title: 'Enterprise Portfolio',
                        subtitle: 'Voor grote beleggers en corporaties',
                        price: 'Maatwerk',
                        unit: 'custom',
                        badge: 'Enterprise',
                        features: ['Onbeperkt aantal eenheden', 'Custom ERP Workflows', 'SLA Garanties', 'Dedicated Account Manager'],
                        ctaLabel: 'Contacteer Sales',
                        ctaLink: '/contact'
                    }
                ]
            }
        ]
    },
    {
        _id: 'page-prijzen-en',
        _type: 'page',
        language: 'en',
        title: 'Transparent Property Software Pricing & Licenses',
        slug: { _type: 'slug', current: 'prijzen' },
        pageBlocks: [
            {
                _type: 'hero',
                label: 'SCALABLE TRANSPARENT PRICING',
                title: 'Simple licensing tailored to your property portfolio size',
                subtitle: 'No hidden fees. Select the plan that matches your total managed units.',
                ctaLabel: 'Request custom quote',
                ctaLink: '/contact'
            },
            {
                _type: 'pricingBlock',
                sectionTitle: 'Choose your license tier',
                sectionSubtitle: 'Available as a SaaS subscription or full Enterprise property suite.',
                tiers: [
                    {
                        title: 'Starter Management',
                        subtitle: 'For portfolios up to 100 units',
                        price: 'On Request',
                        unit: 'per month',
                        badge: 'Popular for SMB',
                        features: ['Core Property Management', 'Automated CPI Indexation', 'Standard Reporting', 'Email Support'],
                        ctaLabel: 'Get quote',
                        ctaLink: '/contact'
                    },
                    {
                        title: 'Professional Suite',
                        subtitle: 'For portfolios up to 1,000 units',
                        price: 'On Request',
                        unit: 'per month',
                        badge: 'Most Popular',
                        features: ['All in Starter', 'Tenant Portal Included', 'SEPA Payment Software', 'PSD2 Bank Feeds', 'Priority Support'],
                        ctaLabel: 'Get quote',
                        ctaLink: '/contact'
                    },
                    {
                        title: 'Enterprise Portfolio',
                        subtitle: 'For institutional investors & corporations',
                        price: 'Custom',
                        unit: 'tailored',
                        badge: 'Enterprise',
                        features: ['Unlimited Units', 'Custom ERP Workflows', 'SLA Guarantees', 'Dedicated Account Manager'],
                        ctaLabel: 'Contact Sales',
                        ctaLink: '/contact'
                    }
                ]
            }
        ]
    },

    // 5. REFERENTIES
    {
        _id: 'page-referenties-nl',
        _type: 'page',
        language: 'nl',
        title: 'Referenties & Successen van Vastgoedbeheerders',
        slug: { _type: 'slug', current: 'referenties' },
        pageBlocks: [
            {
                _type: 'hero',
                label: 'KLANTCASES & SUCCESSEN',
                title: 'Waarom toonaangevende beheerders kiezen voor Emlinked',
                subtitle: 'Lees hoe vastgoedbeleggers en beheerders hun operationele efficiëntie met meer dan 60% verhoogden.',
                ctaLabel: 'Lees de klantstories',
                ctaLink: '#stories'
            },
            {
                _type: 'testimonialSection',
                sectionTitle: 'Ervaringen uit de praktijk',
                testimonials: [
                    {
                        quote: 'Met Emlinked verwerken wij onze huurindexaties en SEPA incasso’s binnen enkele minuten in Business Central. De tijdswinst is enorm.',
                        author: 'Jan-Willem de Ruiter',
                        role: 'Directeur Vastgoedbeheer • De Ruiter Investments'
                    },
                    {
                        quote: 'Het huurdersportaal heeft het aantal telefonische onderhoudsvragen met 45% verminderd. Onze huurders waarderen de realtime transparantie.',
                        author: 'Sophie van Dam',
                        role: 'Head of Operations • Urban Living Management'
                    }
                ]
            }
        ]
    },
    {
        _id: 'page-referenties-en',
        _type: 'page',
        language: 'en',
        title: 'Customer References & Property Management Cases',
        slug: { _type: 'slug', current: 'referenties' },
        pageBlocks: [
            {
                _type: 'hero',
                label: 'CASE STUDIES & REVIEWS',
                title: 'Why leading property managers rely on Emlinked',
                subtitle: 'Discover how real estate investors increased operational efficiency by over 60%.',
                ctaLabel: 'Read customer stories',
                ctaLink: '#stories'
            },
            {
                _type: 'testimonialSection',
                sectionTitle: 'What our clients say',
                testimonials: [
                    {
                        quote: 'With Emlinked, we execute lease indexations and SEPA direct debits in minutes inside Business Central. The efficiency gain is remarkable.',
                        author: 'Jan-Willem de Ruiter',
                        role: 'Managing Director • De Ruiter Investments'
                    },
                    {
                        quote: 'The Tenant Portal cut our maintenance phone inquiries by 45%. Tenants love the real-time visibility.',
                        author: 'Sophie van Dam',
                        role: 'Head of Operations • Urban Living Management'
                    }
                ]
            }
        ]
    },

    // 6. BOX 3 CHECK
    {
        _id: 'page-box3-check-nl',
        _type: 'page',
        language: 'nl',
        title: 'Box 3 Rendement Calculator & Fiscale Optimalisatie',
        slug: { _type: 'slug', current: 'kennisbank/box3-check' },
        pageBlocks: [
            {
                _type: 'hero',
                label: 'FISCALE OPTIMALISATIE ⚡',
                title: 'Bereken het werkelijke rendement en uw Box 3 belastingdruk',
                subtitle: 'Met de veranderende Box 3 wetgeving in 2028 is een sluitende kostenregistratie noodzakelijk. Ontdek uw fiscale voordeel.',
                ctaLabel: 'Start de Box 3 Check',
                ctaLink: '#calculator'
            },
            {
                _type: 'calculatorBlock',
                calculatorType: 'box3'
            }
        ]
    },
    {
        _id: 'page-box3-check-en',
        _type: 'page',
        language: 'en',
        title: 'Box 3 Yield Calculator & Tax Optimization',
        slug: { _type: 'slug', current: 'kennisbank/box3-check' },
        pageBlocks: [
            {
                _type: 'hero',
                label: 'TAX OPTIMIZATION ⚡',
                title: 'Calculate real portfolio yield and Box 3 tax impact',
                subtitle: 'With upcoming 2028 tax reforms, precise cost tracking is key to protecting real estate returns. Estimate your tax savings.',
                ctaLabel: 'Start Box 3 Calculator',
                ctaLink: '#calculator'
            },
            {
                _type: 'calculatorBlock',
                calculatorType: 'box3'
            }
        ]
    },

    // 7. OVER ONS
    {
        _id: 'page-overons-nl',
        _type: 'page',
        language: 'nl',
        title: 'De brug tussen vastgoed en Microsoft Dynamics 365',
        slug: { _type: 'slug', current: 'over-ons' },
        pageBlocks: [
            {
                _type: 'hero',
                label: 'OVER EMLINKED',
                title: 'De brug tussen vastgoedbeheer en financiële ERP precisie',
                subtitle: 'Emlinked is opgericht door vastgoedbeheerders en ERP-architecten met één missie: vastgoedbeheer 100% native maken binnen Microsoft Dynamics 365.',
                ctaLabel: 'Leer ons team kennen',
                ctaLink: '#team'
            },
            {
                _type: 'teamBlock',
                sectionTitle: 'Ons Management & Innovation Team',
                sectionSubtitle: 'Gedreven door passie voor vastgoed, technologie en financiële automatisering.',
                members: [
                    {
                        name: 'Helder Mendes',
                        role: 'Founder & Managing Director',
                        bio: 'Vastgoedtechnoloog met ruim 15 jaar ervaring in Microsoft Dynamics 365 implementaties.'
                    }
                ]
            }
        ]
    },
    {
        _id: 'page-overons-en',
        _type: 'page',
        language: 'en',
        title: 'The Bridge Between Property & Microsoft Dynamics 365',
        slug: { _type: 'slug', current: 'over-ons' },
        pageBlocks: [
            {
                _type: 'hero',
                label: 'ABOUT EMLINKED',
                title: 'The bridge between property management and ERP precision',
                subtitle: 'Emlinked was founded by real estate managers and ERP architects with a single mission: to make property management 100% native inside Microsoft Dynamics 365.',
                ctaLabel: 'Meet our team',
                ctaLink: '#team'
            },
            {
                _type: 'teamBlock',
                sectionTitle: 'Our Leadership Team',
                sectionSubtitle: 'Driven by passion for real estate, technology, and financial automation.',
                members: [
                    {
                        name: 'Helder Mendes',
                        role: 'Founder & Managing Director',
                        bio: 'Real estate technology specialist with over 15 years of experience in Microsoft Dynamics 365 implementations.'
                    }
                ]
            }
        ]
    },

    // 8. CONTACT
    {
        _id: 'page-contact-nl',
        _type: 'page',
        language: 'nl',
        title: 'Neem Contact op met Onze Vastgoed Experts',
        slug: { _type: 'slug', current: 'contact' },
        pageBlocks: [
            {
                _type: 'hero',
                label: 'DIRECT CONTACT',
                title: 'Klaar om uw vastgoedadministratie te transformeren?',
                subtitle: 'Neem vrijblijvend contact op met ons team voor een adviesgesprek of live demonstratie.',
                ctaLabel: 'Vraag demo aan',
                ctaLink: '#contactform'
            },
            {
                _type: 'ctaBanner',
                tag: 'SLUIT AAN BIJ DE TOP',
                title: 'Spreek direct met een van onze Dynamics vastgoed adviseurs',
                subtitle: 'Bel ons op +31 (0) 20 123 4567 of stuur een e-mail naar info@emlinked.nl.',
                buttonLabel: 'Stuur ons een e-mail',
                buttonLink: 'mailto:info@emlinked.nl'
            }
        ]
    },
    {
        _id: 'page-contact-en',
        _type: 'page',
        language: 'en',
        title: 'Get in Touch with Our Property ERP Experts',
        slug: { _type: 'slug', current: 'contact' },
        pageBlocks: [
            {
                _type: 'hero',
                label: 'DIRECT CONTACT',
                title: 'Ready to transform your property management?',
                subtitle: 'Get in touch with our team for a consultation or a live system demonstration.',
                ctaLabel: 'Request demo',
                ctaLink: '#contactform'
            },
            {
                _type: 'ctaBanner',
                tag: 'GET STARTED TODAY',
                title: 'Speak directly with a Dynamics 365 property specialist',
                subtitle: 'Call us at +31 (0) 20 123 4567 or email us at info@emlinked.com.',
                buttonLabel: 'Send us an email',
                buttonLink: 'mailto:info@emlinked.com'
            }
        ]
    }
];

async function seedAllPages() {
    console.log("Seeding all menu pages for NL and EN...");
    for (const doc of pagesToSeed) {
        await client.createOrReplace(doc);
        console.log(`✓ Seeded ${doc._id} (${doc.title})`);
    }
    console.log("All menu pages successfully created and published in Sanity!");
}

seedAllPages().catch(console.error);
