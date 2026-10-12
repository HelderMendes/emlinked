'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
    Zap,
    BarChart3,
    ArrowRight,
    Building2,
    Check,
    CheckCircle2,
    XCircle,
} from 'lucide-react';
import Link from 'next/link';
import { HeroSection } from '@/components/blocks/HeroSection';
import { DEFAULT_DOMAIN } from '@/lib/seo';
import { getImageUrl } from '@/sanity/image';
import { Badge } from '@/components/ui/Badge';
import { OutlineLinkButton } from '@/components/ui/OutlineLinkButton';
import { ColorIcon } from '@/components/ui/ColorIcon';

function CardBadge({ icon, alt }: { icon: string; alt: string }) {
    return (
        <div className='absolute top-1 right-1 z-30 size-13 rounded-xl bg-teal text-white flex items-center justify-center shadow-sm border-2 border-white pointer-events-none'>
            <ColorIcon
                src={icon}
                alt={alt}
                // className='size-8 text-white'
                className='size-8 text-white [&_path]:stroke-4 [&_svg]:stroke-4'
                sizePx={44}
            />
        </div>
    );
}

interface VastgoedbeheerSoftwareModuleProps {
    doc?: any;
    locale?: string;
}

export function VastgoedbeheerSoftwareModule({
    doc,
    locale = 'nl',
}: VastgoedbeheerSoftwareModuleProps) {
    const isEn = locale === 'en';

    // Extract Sanity modular pageBlocks
    const pageBlocks = doc?.pageBlocks || [];
    const heroBlock = pageBlocks.find((b: any) => b._type === 'heroBlock');
    const featureTabsBlock = pageBlocks.find(
        (b: any) => b._type === 'featureTabsBlock',
    );
    const comparisonBlock = pageBlocks.find(
        (b: any) => b._type === 'comparisonBlock',
    );
    const architectureBlock = pageBlocks.find(
        (b: any) => b._type === 'architectureBlock',
    );
    const ctaBlock = pageBlocks.find((b: any) => b._type === 'ctaBlock');

    const heroBadge =
        heroBlock?.badge ||
        doc?.badge ||
        (isEn
            ? 'MICROSOFT DYNAMICS 365 NATIVE'
            : 'CORE SAAS MODULE VOOR VASTGOEDMANAGEMENT');
    const heroTagline = heroBlock?.tagline || doc?.tagline || doc?.title;
    const heroDescription = heroBlock?.description || doc?.description;

    const explicitHeroPath =
        heroBlock?.imagePath ||
        heroBlock?.heroImagePath ||
        doc?.imagePath ||
        doc?.heroImagePath;
    const heroImageUrl = getImageUrl(
        heroBlock?.image ||
            heroBlock?.heroImage ||
            doc?.image ||
            doc?.heroImage,
        explicitHeroPath ||
            '/emlinked/apps/vastgoedbeheer-software/geautomatiseerde-business-central.png',
    );

    // Sanity-driven feature tabs, falling back to the shipped defaults per index
    const defaultFeatureTabs = [
        {
            tabId: 'indexation',
            icon: Zap,
            navLabel: isEn
                ? '1. CPI Indexation & Contracts'
                : '1. CPI-Indexaties & Contracten',
            title: isEn
                ? 'Automated CPI Indexation & Contract Management'
                : 'Geautomatiseerde CPI-Indexaties & Contractbeheer',
            text: isEn
                ? 'Forget manual calculations on the first of the month. Our real estate management software automatically retrieves the latest CBS CPI index figures, recalculates the new rent amounts, and applies them directly to all active lease agreements.'
                : 'Vergeet handmatige berekeningen op de eerste van de maand. Onze software voor vastgoedbeheer haalt automatisch de nieuwste CBS CPI-indexcijfers op, berekent de nieuwe huursommen en past deze direct toe op al je lopende huurovereenkomsten.',
            bullets: isEn
                ? [
                      'Automated indexation letters by email & portal',
                      'Supports CBS CPI all-household & sub-lists',
                      'Full audit trail per lease directly in Business Central',
                  ]
                : [
                      'Automatische indexatiebrieven per mail & portaal',
                      'Ondersteuning voor CBS CPI alle huishoudens & deellijsten',
                      'Audittrail per huurcontract direct in Business Central',
                  ],
            image: '/emlinked/apps/vastgoedbeheer-software/tab01-indexaties.jpg',
            imageAlt: isEn
                ? 'CPI indexation log UI card preview'
                : 'CPI Indexatie log UI card preview',
        },
        {
            tabId: 'retail',
            icon: Building2,
            navLabel: isEn
                ? '2. Dynamic Floor Area & Retail'
                : '2. Dynamisch Metrage & Retail',
            title: isEn
                ? 'Dynamic Floor Area & Retail Management'
                : 'Dynamisch Metrage- & Retailbeheer',
            text: isEn
                ? 'Purpose-built for the challenges of retail chains and commercial real estate. Manage changing store layouts, floor area types, turnover-rent agreements, and location-specific maintenance contracts centrally in a single dashboard.'
                : 'Speciaal ingericht voor de uitdagingen van retailketens en commercieel vastgoed. Beheer wisselende winkelindelingen, verschillende metrage-types, omzethuurafspraken en locatiespecifieke onderhoudscontracten centraal in één dashboard.',
            bullets: isEn
                ? [
                      'Flexible splitting and merging of rentable units (LFA / GFA)',
                      'Turnover-rent calculations with thresholds and tiers',
                      'Management of retailer association contributions & promotion funds',
                  ]
                : [
                      'Flexibele splitsing en samenvoeging van verhuurbare eenheden (VVO / BVO)',
                      'Omzethuurberekeningen met drempels en staffels',
                      'Beheer van winkeliersvereniging bijdragen & promotiefondsen',
                  ],
            image: '/emlinked/apps/vastgoedbeheer-software/tab02-dynamisch.jpg',
            imageAlt: isEn
                ? 'Retail floor area and unit layout blueprint UI'
                : 'Retail Metrage en Unit Indeling Blueprint UI',
        },
        {
            tabId: 'service',
            icon: BarChart3,
            navLabel: isEn
                ? '3. Service Charges & Subsidies'
                : '3. Servicekosten & Subsidies',
            title: isEn
                ? 'Service Charges & Subsidy Settlements'
                : 'Servicekosten & Subsidieafrekeningen',
            text: isEn
                ? 'Determine, advance, and settle service charges transparently for tenants or housing corporations. All advances and actual costs incurred are matched directly against purchase invoices via Document Capture.'
                : 'Bepaal, voorschot en verreken servicekosten transparant voor je huurders of woningcorporatie. Alle voorschotten en werkelijke gemaakte kosten worden direct gematcht met inkoopfacturen via Document Capture.',
            bullets: isEn
                ? [
                      'Precise cost allocation keys per m², weighted share, or fixed amount',
                      'Automatic linkage with purchase orders & Continia OCR Document Capture',
                      'Legally compliant settlement statements ready to send',
                  ]
                : [
                      'Nauwkeurige kostenverdeelsleutels per m², gewogen aandeel of vast bedrag',
                      'Automatische koppeling met inkooporders & Continia OCR Document Capture',
                      'Wet-compliant afrekeningsoverzichten klaar voor verzending',
                  ],
            image: '/emlinked/apps/vastgoedbeheer-software/tab03_servicekosten.jpg',
            imageAlt: isEn
                ? 'Service charge distribution chart UI'
                : 'Service Charge Distribution Chart UI',
        },
    ] as const;

    const featureTabs = defaultFeatureTabs.map((def, idx) => {
        const sanityTab = featureTabsBlock?.tabs?.[idx];
        return {
            ...def,
            navLabel: sanityTab?.tabTitle || def.navLabel,
            title: sanityTab?.title || def.title,
            text: sanityTab?.text || def.text,
            bullets: sanityTab?.bullets?.length
                ? sanityTab.bullets
                : def.bullets,
            image:
                getImageUrl(sanityTab?.image, sanityTab?.imagePath) ||
                def.image,
        };
    });

    const archTag =
        architectureBlock?.tag ||
        (isEn
            ? 'MICROSOFT BUSINESS CENTRAL INTEGRATION'
            : 'MICROSOFT BUSINESS CENTRAL INTEGRATIE');
    const archTitle =
        architectureBlock?.title ||
        (isEn
            ? '100% Realtime Control & Automatic Posting'
            : '100% Realtime controle en automatische aflettering');
    const archDesc =
        architectureBlock?.desc ||
        (isEn
            ? 'Manage all your real estate processes natively inside Microsoft Dynamics 365 Business Central, with zero latency or shadow-file risk.'
            : 'Beheer al je vastgoedprocessen native in Microsoft Dynamics 365 Business Central zonder vertraging of risico van schaduwbestanden.');
    const defaultArchBullets = isEn
        ? [
              {
                  bold: 'One central source of truth:',
                  text: 'No separate databases, spreadsheets, or fragile API connections.',
              },
              {
                  bold: 'Zero duplicate entry:',
                  text: 'Leases, indexations, and invoices land directly as validated journal entries in your GL.',
              },
              {
                  bold: '100% realtime data integrity:',
                  text: 'Instantly reliable insight for accountants, management, and your team.',
              },
          ]
        : [
              {
                  bold: 'Één centrale bron van waarheid:',
                  text: 'Geen losse databases, Excel-sheets of gevaarlijke API-koppelingen.',
              },
              {
                  bold: 'Nul dubbele invoer:',
                  text: 'Huurovereenkomsten, indexaties en facturen landen direct als gevalideerde journaalposten in je grootboek.',
              },
              {
                  bold: '100% Realtime data-integriteit:',
                  text: 'Direct betrouwbaar inzicht voor accountant, directie en beheerteam.',
              },
          ];
    const archBullets = architectureBlock?.bullets?.length
        ? architectureBlock.bullets.map((text: string) => ({ bold: '', text }))
        : defaultArchBullets;
    const archImage =
        getImageUrl(architectureBlock?.image, architectureBlock?.imagePath) ||
        '/emlinked/apps/vastgoedbeheer-software/native-dynamics-365.jpg';

    const ctaImageUrl = getImageUrl(
        ctaBlock?.image,
        ctaBlock?.imagePath ||
            '/emlinked/apps/vastgoedbeheer-software/automatiseren_vastgoedbehher.jpg',
    );

    // Structured JSON-LD from Sanity or default blueprint fallback
    const jsonLdData = doc?.seo?.structuredData
        ? typeof doc.seo.structuredData === 'string'
            ? doc.seo.structuredData
            : JSON.stringify(doc.seo.structuredData)
        : JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                  {
                      '@type': 'WebPage',
                      '@id': `${DEFAULT_DOMAIN}/apps/vastgoedbeheer-software#webpage`,
                      url: `${DEFAULT_DOMAIN}/apps/vastgoedbeheer-software`,
                      name: 'Vastgoedbeheer Software — Automatiseer je Portefeuillebeheer | emlinked',
                      description:
                          'Geavanceerde vastgoedbeheer software voor beheerders, retailketens en woningcorporaties. Volledig geautomatiseerd en native gekoppeld aan Microsoft Dynamics 365 Business Central.',
                      inLanguage: 'nl-NL',
                      isPartOf: {
                          '@type': 'WebSite',
                          '@id': `${DEFAULT_DOMAIN}/#website`,
                      },
                  },
                  {
                      '@type': 'BreadcrumbList',
                      '@id': `${DEFAULT_DOMAIN}/apps/vastgoedbeheer-software#breadcrumb`,
                      itemListElement: [
                          {
                              '@type': 'ListItem',
                              position: 1,
                              name: 'Home',
                              item: DEFAULT_DOMAIN,
                          },
                          {
                              '@type': 'ListItem',
                              position: 2,
                              name: 'Onze apps',
                              item: `${DEFAULT_DOMAIN}/apps`,
                          },
                          {
                              '@type': 'ListItem',
                              position: 3,
                              name: 'Vastgoedbeheer software',
                              item: `${DEFAULT_DOMAIN}/apps/vastgoedbeheer-software`,
                          },
                      ],
                  },
                  {
                      '@type': 'SoftwareApplication',
                      '@id': `${DEFAULT_DOMAIN}/apps/vastgoedbeheer-software#software`,
                      name: 'Emlinked Vastgoedbeheer Software',
                      applicationCategory: 'BusinessApplication',
                      operatingSystem:
                          'Web-based, Microsoft Dynamics 365 Business Central',
                      softwareRequirements:
                          'Microsoft Dynamics 365 Business Central',
                      description:
                          'De core SaaS module voor vastgoedbeheer. Automatiseer contracten, CPI-indexaties, servicekosten en metragebeheer native in Business Central.',
                      publisher: {
                          '@type': 'Organization',
                          name: 'Emlinked',
                          url: DEFAULT_DOMAIN,
                      },
                  },
                  {
                      '@type': 'FAQPage',
                      '@id': `${DEFAULT_DOMAIN}/apps/vastgoedbeheer-software#faq`,
                      mainEntity: [
                          {
                              '@type': 'Question',
                              name: 'Hoe werkt de koppeling met Microsoft Dynamics 365 Business Central?',
                              acceptedAnswer: {
                                  '@type': 'Answer',
                                  text: "Emlinked draait 100% native binnen Business Central. Dat betekent dat er geen losse API-koppeling of schaduwdatabase nodig is. Alle journaalposten, huurincasso's en indexaties ontstaan direct in je ERP-grootboek.",
                              },
                          },
                          {
                              '@type': 'Question',
                              name: 'Hoe worden CBS CPI-indexaties geautomatiseerd?',
                              acceptedAnswer: {
                                  '@type': 'Answer',
                                  text: 'De software leest automatisch de nieuwste indexcijfers in van het Centraal Bureau voor de Statistiek (CBS), herberekent de huurtermijnen en verstuurt desgewenst automatisch de indexatiebrieven per e-mail en huurdersportaal.',
                              },
                          },
                      ],
                  },
              ],
          });

    const [activeTab, setActiveTab] = useState<string>(
        featureTabs[0]?.tabId ?? 'indexation',
    );

    const renderHero = (block: any, key: any) => (
        <React.Fragment key={key}>
            <HeroSection
                locale={locale}
                label={heroBadge}
                title={
                    heroTagline ||
                    (isEn
                        ? 'Professional real estate management software for your entire portfolio'
                        : 'Professionele vastgoedbeheer software voor je complete portefeuille')
                }
                titleClassName='text-3xl sm:text-4xl lg:text-[2.75rem]'
                subtitle={
                    heroDescription ||
                    (isEn
                        ? 'Scale your real estate operation without administrative chaos. Our real estate management software automates your lease agreements, periodic CPI indexations, variable retail floor areas and service cost settlements, native within Microsoft Dynamics 365 Business Central. Purpose-built for portfolios from 50 rental units.'
                        : 'Schaal je vastgoedoperatie zonder administratieve chaos. Onze vastgoedbeheer software automatiseert je huurovereenkomsten, periodieke CPI-indexaties, wisselende winkelmetrages en servicekostenafrekeningen native binnen Microsoft Dynamics 365 Business Central. Speciaal ontwikkeld voor portefeuilles vanaf 50 verhuureenheden.')
                }
                ctaLabel={
                    heroBlock?.primaryCtaLabel ||
                    heroBlock?.ctaLabel ||
                    (isEn
                        ? 'Request a free live demo'
                        : 'Gratis live demo aanvragen')
                }
                ctaLink={
                    heroBlock?.primaryCtaUrl || heroBlock?.ctaLink || '#demo'
                }
                secondaryCtaLabel={
                    heroBlock?.secondaryCtaLabel ||
                    (isEn ? 'Check Box 3 impact' : 'Bereken je Box 3-impact')
                }
                secondaryCtaLink={
                    heroBlock?.secondaryCtaUrl ||
                    heroBlock?.secondaryCtaLink ||
                    '/box3-check'
                }
                showProof
                showProofAvatars={false}
                proofText={
                    heroBlock?.proofText ||
                    doc?.proofText ||
                    (isEn
                        ? 'Trusted by professional real estate managers and investors in Europe'
                        : 'Vertrouwd door professionele vastgoedbeheerders en beleggers in Nederland')
                }
                customGraphic={
                    <>
                        <Image
                            src={heroImageUrl}
                            alt={
                                heroBlock?.title ||
                                'Emlinked Core Vastgoedbeheer Software'
                            }
                            fill
                            sizes='(max-width: 1024px) 100vw, 55vw'
                            className='object-cover lg:mask-[linear-gradient(to_right,transparent,black_22%)]'
                            priority
                        />

                        <div className='absolute z-20 left-0 top-10 flex items-center gap-2.5 bg-white rounded-xl px-3.5 py-3 shadow-xl'>
                            <span className='w-7 h-7 rounded-lg bg-teal-pale text-teal flex items-center justify-center shrink-0'>
                                <Building2 className='w-3.5 h-3.5' />
                            </span>
                            <div>
                                <p className='text-[11px] font-bold text-navy-900 leading-none'>
                                    142 Eenheden
                                </p>
                                <p className='text-[9px] text-navy-500 mt-1'>
                                    Portefeuille
                                </p>
                            </div>
                        </div>

                        <div className='absolute z-20 right-0 bottom-8 flex items-center gap-2.5 bg-white rounded-xl px-3.5 py-3 shadow-xl'>
                            <span className='w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0'>
                                <BarChart3 className='w-3.5 h-3.5' />
                            </span>
                            <div>
                                <p className='text-[11px] font-bold text-navy-900 leading-none'>
                                    +3.8% (CBS)
                                </p>
                                <p className='text-[9px] text-navy-500 mt-1'>
                                    CPI Indexatie
                                </p>
                            </div>
                        </div>
                    </>
                }
            />
        </React.Fragment>
    );

    const renderComparison = (block: any, key: any) => (
        <section
            key={key}
            className='px-6 py-20 bg-background text-navy-900 border-b border-teal/10 relative z-10'
        >
            <div className='max-w-7xl mx-auto space-y-16'>
                {/* Header */}
                <div className='text-center max-w-3xl mx-auto space-y-4'>
                    <div className='flex justify-center  mb-1'>
                        <Badge color='teal' uppercase dot dotPulse>
                            <span>
                                {comparisonBlock?.badge ||
                                    (isEn
                                        ? 'NO MORE MANUAL WORK'
                                        : 'GEEN HANDMATIG WERK MEER')}
                            </span>
                        </Badge>
                    </div>

                    <h2 className='font-display text-3xl md:text-4xl lg:text-[2.5rem]/12 font-bold tracking-tight text-navy-900'>
                        {comparisonBlock?.title ||
                            (isEn
                                ? 'Why traditional real estate management software falls short'
                                : 'Waarom traditionele vastgoed administratie software tekortschiet')}
                    </h2>

                    <p className='text-navy-900/75 text-base md:text-lg leading-relaxed font-light'>
                        {comparisonBlock?.desc ||
                            (isEn
                                ? 'Many property managers waste precious hours weekly manually syncing property data with accounting ledgers. Emlinked bridges the gap between daily operations and your GL.'
                                : 'Veel beheerders verliezen wekelijks kostbare uren aan het handmatig synchroniseren van vastgoedgegevens met hun financiële administratie. Emlinked sluit het gat tussen de dagelijkse operatie en je grootboek.')}
                    </p>
                </div>
                {/* Side-by-Side Comparison Matrix */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch'>
                    {/* Left Card: Legacy Pain */}
                    <div className='relative rounded-2xl border border-black/20 bg-white p-8 space-y-6 shadow-xs flex flex-col justify-between'>
                        <CardBadge
                            icon='/emlinked/apps/traditional–Property–software.svg'
                            alt={
                                isEn
                                    ? 'Traditional Property Software'
                                    : 'Traditionele Vastgoedsoftware'
                            }
                        />

                        <div className='space-y-6'>
                            <div className='border-b border-black/10 pb-4 pr-16'>
                                <h3 className='text-lg font-bold text-teal'>
                                    {comparisonBlock?.leftTitle ||
                                        (isEn
                                            ? 'TRADITIONAL PROPERTY SOFTWARE'
                                            : 'TRADITIONELE VASTGOEDSOFTWARE')}
                                </h3>
                            </div>

                            <ul className='space-y-4 text-sm text-navy-900/80'>
                                {comparisonBlock?.leftItems &&
                                comparisonBlock.leftItems.length > 0 ? (
                                    comparisonBlock.leftItems.map(
                                        (item: any, idx: number) => (
                                            <li
                                                key={idx}
                                                className='flex items-start gap-3'
                                            >
                                                <XCircle className='w-5 h-5 text-teal shrink-0 mt-0.5' />
                                                <div className='space-y-0.5'>
                                                    <strong className='text-navy-900 block font-semibold text-sm'>
                                                        {item.title}
                                                    </strong>
                                                    <span className='text-slate-600 text-xs leading-relaxed block'>
                                                        {item.desc}
                                                    </span>
                                                </div>
                                            </li>
                                        ),
                                    )
                                ) : (
                                    <>
                                        <li className='flex items-start gap-3'>
                                            <XCircle className='w-5 h-5 text-teal shrink-0 mt-0.5' />
                                            <div className='space-y-0.5'>
                                                <strong className='text-navy-900 block font-semibold text-sm'>
                                                    {isEn
                                                        ? 'Manual Excel indexation imports'
                                                        : 'Handmatige Excel-imports voor indexaties'}
                                                </strong>
                                                <span className='text-slate-600 text-xs leading-relaxed block'>
                                                    {isEn
                                                        ? 'Error-prone copy-pasting of index numbers and contract lines.'
                                                        : 'Foutgevoelig knippen en plakken van CBS-indexcijfers en contractregels op de 1e van de maand.'}
                                                </span>
                                            </div>
                                        </li>
                                        <li className='flex items-start gap-3'>
                                            <XCircle className='w-5 h-5 text-teal shrink-0 mt-0.5' />
                                            <div className='space-y-0.5'>
                                                <strong className='text-navy-900 block font-semibold text-sm'>
                                                    {isEn
                                                        ? 'API sync errors between tools and ERP'
                                                        : 'API-fouten tussen losse tools en ERP'}
                                                </strong>
                                                <span className='text-slate-600 text-xs leading-relaxed block'>
                                                    {isEn
                                                        ? 'External sync channels stall regularly, resulting in missing ledger entries.'
                                                        : 'Externe synchronisatiekanalen vallen regelmatig stil, met ontbrekende debiteurenposten als gevolg.'}
                                                </span>
                                            </div>
                                        </li>
                                        <li className='flex items-start gap-3'>
                                            <XCircle className='w-5 h-5 text-teal shrink-0 mt-0.5' />
                                            <div className='space-y-0.5'>
                                                <strong className='text-navy-900 block font-semibold text-sm'>
                                                    {isEn
                                                        ? 'Delayed financial reporting'
                                                        : 'Vertraagde financiële rapportages'}
                                                </strong>
                                                <span className='text-slate-600 text-xs leading-relaxed block'>
                                                    {isEn
                                                        ? 'Yield and vacancy reports must be manually consolidated.'
                                                        : 'Rapportages over leegstand en bruto/netto rendementen moeten handmatig worden geconsolideerd.'}
                                                </span>
                                            </div>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Right Card: Emlinked Solution */}
                    <div className='relative rounded-2xl border border-black/20 bg-white p-8 space-y-6 shadow-xs flex flex-col justify-between'>
                        <CardBadge
                            icon='/emlinked/apps/native_ERP.svg'
                            alt={
                                isEn
                                    ? 'Emlinked Native ERP'
                                    : 'Emlinked Native ERP'
                            }
                        />

                        <div className='space-y-6'>
                            <div className='border-b border-black/10 pb-4 pr-16'>
                                <h3 className='text-lg font-bold text-teal'>
                                    {comparisonBlock?.rightTitle ||
                                        (isEn
                                            ? 'EMLINKED NATIVE DYNAMICS MODULE'
                                            : 'EMLINKED NATIVE DYNAMICS MODULE')}
                                </h3>
                            </div>

                            <ul className='space-y-4 text-sm text-navy-900'>
                                {comparisonBlock?.rightItems &&
                                comparisonBlock.rightItems.length > 0 ? (
                                    comparisonBlock.rightItems.map(
                                        (item: any, idx: number) => (
                                            <li
                                                key={idx}
                                                className='flex items-start gap-3'
                                            >
                                                <CheckCircle2 className='w-5 h-5 text-teal shrink-0 mt-0.5' />
                                                <div className='space-y-0.5'>
                                                    <strong className='text-navy-900 block font-semibold text-sm'>
                                                        {item.title}
                                                    </strong>
                                                    <span className='text-slate-600 text-xs leading-relaxed block'>
                                                        {item.desc}
                                                    </span>
                                                </div>
                                            </li>
                                        ),
                                    )
                                ) : (
                                    <>
                                        <li className='flex items-start gap-3'>
                                            <CheckCircle2 className='w-5 h-5 text-teal shrink-0 mt-0.5' />
                                            <div className='space-y-0.5'>
                                                <strong className='text-navy-900 block font-semibold text-sm'>
                                                    {isEn
                                                        ? 'Automated CPI indexations & rent invoicing'
                                                        : 'Automatische CPI-indexatie & huurprolongatie'}
                                                </strong>
                                                <span className='text-slate-600 text-xs leading-relaxed block'>
                                                    {isEn
                                                        ? 'Indexation data calculated and posted directly to lease contracts.'
                                                        : 'CBS-data wordt automatisch ingelezen en rechtstreeks toegepast op je huurovereenkomsten.'}
                                                </span>
                                            </div>
                                        </li>
                                        <li className='flex items-start gap-3'>
                                            <CheckCircle2 className='w-5 h-5 text-teal shrink-0 mt-0.5' />
                                            <div className='space-y-0.5'>
                                                <strong className='text-navy-900 block font-semibold text-sm'>
                                                    {isEn
                                                        ? '100% Native Business Central processing'
                                                        : '100% native verwerking in Business Central'}
                                                </strong>
                                                <span className='text-slate-600 text-xs leading-relaxed block'>
                                                    {isEn
                                                        ? 'Zero external API sync scripts; journal entries post natively in your ERP.'
                                                        : 'Geen externe koppelingen; journaalposten en facturen ontstaan direct in de ERP-database.'}
                                                </span>
                                            </div>
                                        </li>
                                        <li className='flex items-start gap-3'>
                                            <CheckCircle2 className='w-5 h-5 text-teal shrink-0 mt-0.5' />
                                            <div className='space-y-0.5'>
                                                <strong className='text-navy-900 block font-semibold text-sm'>
                                                    {isEn
                                                        ? 'Real-time portfolio visibility'
                                                        : 'Realtime inzicht in je totale portefeuille'}
                                                </strong>
                                                <span className='text-slate-600 text-xs leading-relaxed block'>
                                                    {isEn
                                                        ? 'Executive dashboards for controllers and directors at the click of a button.'
                                                        : 'Executive dashboards voor controllers en vastgoeddirecties met één druk op de knop.'}
                                                </span>
                                            </div>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

    const renderFeatureTabs = (block: any, key: any) => (
        <section
            key={key}
            className='py-20 px-6 bg-background text-navy-900 border-b border-teal/10 relative overflow-hidden'
        >
            <div className='max-w-7xl mx-auto space-y-8 relative z-10'>
                {/* Header */}
                <div className='text-center max-w-3xl mx-auto space-y-4 flex flex-col items-center'>
                    <Badge
                        color='teal'
                        uppercase
                        dot
                        dotPulse
                        className='self-center'
                    >
                        {featureTabsBlock?.badge ||
                            (isEn ? 'FUNCTIONALITIES' : 'FUNCTIONALITEITEN')}
                    </Badge>
                    <h2 className='font-display text-3xl md:text-4xl lg:text-[2.5rem]/12 font-bold tracking-tight text-navy-900'>
                        {featureTabsBlock?.title ||
                            (isEn ? (
                                <>
                                    Powerful functionalities for modern{' '}
                                    <span className='text-teal'>
                                        real estate management
                                    </span>
                                </>
                            ) : (
                                <>
                                    Krachtige functionaliteiten voor modern{' '}
                                    <span className='text-teal'>
                                        vastgoedbeheer
                                    </span>
                                </>
                            ))}
                    </h2>
                    <p className='text-navy-900/75 text-base md:text-lg font-light'>
                        {isEn
                            ? 'Built to effortlessly streamline complex lease structures, retail-chain floor areas, and housing corporation settlements.'
                            : 'Ontwikkeld om ingewikkelde contractvormen, retailketen-metrages en corporatie-afrekeningen moeiteloos te stroomlijnen.'}
                    </p>
                </div>

                {/* Feature Tabs */}
                <div className='flex justify-center border-b border-black/10 gap-2 sm:gap-4 overflow-x-auto pb-px'>
                    {featureTabs.map((tab, idx) => {
                        const TabIcon = tab.icon;
                        return (
                            <button
                                key={tab.tabId}
                                onClick={() => setActiveTab(tab.tabId)}
                                className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                                    activeTab === tab.tabId
                                        ? 'border-teal text-teal bg-teal/15 rounded-t-lg'
                                        : 'border-transparent text-navy-900/60 hover:text-navy-900'
                                }`}
                            >
                                <TabIcon className='w-4 h-4' />
                                <span>
                                    {idx + 1}.{' '}
                                    {tab.navLabel.replace(/^\d+\.\s*/, '')}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content (Direct Grid Layout with Top-Right Image Badge) */}
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'>
                    {featureTabs.map(
                        (tab, idx) =>
                            activeTab === tab.tabId && (
                                <React.Fragment key={tab.tabId}>
                                    <div className='lg:col-span-6 space-y-6 px-3'>
                                        {/* <h3 className='text-2xl sm:text-3xl font-bold text-navy-900'> */}
                                        <h3 className='font-semibold text-2xl md:text-3xl lg:text-4xl tracking-tight text-teal leading-tight'>
                                            {tab.title}
                                        </h3>
                                        <p className='text-navy-900/75 text-base md:text-lg font-light leading-relaxed'>
                                            {tab.text}
                                        </p>

                                        <ul className='  text-navy-900/85 ml-4'>
                                            {tab.bullets.map(
                                                (
                                                    bullet: string,
                                                    bIdx: number,
                                                ) => (
                                                    <li
                                                        key={bIdx}
                                                        className='flex items-start gap-2.5 mb-2.5'
                                                    >
                                                        <Check className='size-5 text-teal shrink-0 mt-2' />
                                                        <span>{bullet}</span>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                    <div className='lg:col-span-6 relative pt-4 pr-4 sm:pt-6 sm:pr-6'>
                                        {/* Square with round corners Top-Right Floating Badge */}
                                        <div className='absolute top-0 right-0 z-20 w-22  h-12 rounded-xl bg-teal text-white flex items-center justify-center gap-1 shadow-xl border-2 border-white pointer-events-none'>
                                            <tab.icon className='size-6.5 -mr-1' />
                                            <span className='font-light text-2xl tracking-tighter ml-1.5'>
                                                {idx + 1}.
                                            </span>
                                        </div>

                                        <div className='rounded-xl overflow-hidden shadow-sm'>
                                            <Image
                                                src={tab.image}
                                                alt={tab.imageAlt}
                                                width={1200}
                                                height={675}
                                                className='w-full h-auto rounded-lg border border-white/10'
                                            />
                                        </div>
                                    </div>
                                </React.Fragment>
                            ),
                    )}
                </div>
            </div>
        </section>
    );

    const renderArchitecture = (block: any, key: any) => (
        <section
            key={key}
            className='px-6 py-20 md:py-24 bg-background text-navy-900 border-b border-teal/10 relative z-10 overflow-hidden'
        >
            <div className='max-w-7xl mx-auto relative z-10'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
                    {/* Left Column: Copy & Bullets */}
                    <div className='lg:col-span-6 flex flex-col gap-6 text-left'>
                        <Badge color='teal' uppercase dot>
                            {archTag}
                        </Badge>

                        <h2 className='font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-navy-900 leading-tight'>
                            {archTitle}
                        </h2>

                        <p className='text-navy-900/75 text-base md:text-lg font-light leading-relaxed'>
                            {archDesc}
                        </p>

                        <div className='space-y-4 pt-2 ml-4'>
                            {archBullets.map((bullet: any, bIdx: number) => (
                                <div
                                    key={bIdx}
                                    className='flex items-start gap-3.5'
                                >
                                    <div className='w-6 h-6 rounded-full border border-teal/40 bg-teal/15 flex items-center justify-center shrink-0 mt-0.5 shadow-xs'>
                                        <Check className='w-3.5 h-3.5 text-teal' />
                                    </div>
                                    <div className='text-sm md:text-base text-navy-900/85 leading-relaxed'>
                                        {bullet.bold && (
                                            <strong className='text-navy-900 font-semibold mr-1'>
                                                {bullet.bold}
                                            </strong>
                                        )}
                                        {bullet.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Requested Image Asset */}
                    <div className='lg:col-span-6 flex justify-center lg:justify-end'>
                        <div className='relative w-full rounded-2xl overflow-hidden border border-black/10 shadow-sm group bg-white'>
                            <Image
                                src={archImage}
                                alt={archTitle}
                                width={1200}
                                height={800}
                                className='w-full h-auto object-cover rounded-2xl group-hover:scale-[1.01] transition-transform duration-500 border border-teal/40'
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

    const renderCta = (block: any, key: any) => (
        <section
            key={key}
            className='lg:px-14 p-4 py-24 bg-linear-to-br from-teal-ultra via-stone-bg to-teal-pale/60 relative overflow-hidden z-10'
        >
            <div className='border border-teal/30 rounded-3xl bg-white/50 hover:shadow-[0_25px_60px_rgba(245,158,11,0.15)] transition-all duration-500 relative overflow-hidden group shadow-lg backdrop-blur-xl lg:px-8'>
                <div className='text-navy-900 p-8 md:py-16 md:px-10 relative overflow-hidden'>
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10'>
                        {/* Left Column: Copy & Action Triggers */}
                        <div className='lg:col-span-8 flex flex-col gap-5 text-left'>
                            <Badge color='teal' uppercase dot dotPulse>
                                {ctaBlock?.tag ||
                                    doc?.cta?.tag ||
                                    (isEn
                                        ? 'START AUTOMATING TODAY'
                                        : 'START MET AUTOMATISEREN')}
                            </Badge>

                            <h2 className='font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight bg-linear-to-br from-[#f12711] to-[#f5af19] bg-clip-text text-transparent'>
                                {ctaBlock?.title ||
                                    doc?.cta?.title ||
                                    (isEn
                                        ? 'Ready to modernize your real estate management software?'
                                        : 'Klaar om je vastgoedbeheer software te moderniseren?')}
                            </h2>

                            <p className='text-navy-700 leading-relaxed font-light text-base md:text-lg max-w-2xl'>
                                {ctaBlock?.desc ||
                                    doc?.cta?.desc ||
                                    (isEn
                                        ? 'Experience how emlinked modular apps cut administrative burden in half and maximize financial control.'
                                        : 'Ervaar zelf hoe de modulaire apps van Emlinked je administratieve lasten halveren en je financiële controle vergroten.')}
                            </p>

                            {/* Primary & Secondary Action Buttons */}
                            <div className='flex flex-col sm:flex-row gap-4 pt-2'>
                                <Link
                                    href='#demo'
                                    className='inline-flex h-11 items-center gap-1.5 justify-center rounded-lg bg-navy-900 hover:btn-gradient px-6 text-sm font-semibold text-white transition-colors'
                                >
                                    <span>
                                        {ctaBlock?.primaryButtonText ||
                                            doc?.cta?.primary ||
                                            (isEn
                                                ? 'Request a free live demo'
                                                : 'Gratis live demo aanvragen')}
                                    </span>
                                    <ArrowRight className='h-4 w-4 text-white' />
                                </Link>

                                <OutlineLinkButton
                                    href={isEn ? '/en/apps' : '/apps'}
                                    color='navy'
                                >
                                    <span>
                                        {isEn ? 'All Apps' : 'Alle apps'}
                                    </span>
                                </OutlineLinkButton>
                            </div>
                        </div>

                        {/* Right Column: Exact Homepage Illustration Image */}
                        <div className='lg:col-span-4 flex justify-start lg:justify-end'>
                            <Image
                                src={ctaImageUrl}
                                alt={
                                    ctaBlock?.title ||
                                    doc?.cta?.title ||
                                    'Klaar om je vastgoedbeheer software te moderniseren?'
                                }
                                width={700}
                                height={500}
                                className='w-full h-[310px] max-h-[310px] object-cover object-center rounded-lg group-hover:scale-105 transition-transform duration-500 shadow-lg border border-amber-600/40'
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

    const blocksToRender =
        pageBlocks.length > 0
            ? pageBlocks
            : [
                  { _type: 'heroBlock', _key: 'default_hero' },
                  { _type: 'comparisonBlock', _key: 'default_comp' },
                  { _type: 'featureTabsBlock', _key: 'default_tabs' },
                  { _type: 'architectureBlock', _key: 'default_arch' },
                  { _type: 'ctaBlock', _key: 'default_cta' },
              ];

    return (
        <>
            {/* Inject JSON-LD Structured Data for AIO / GEO / Search Engines */}
            {jsonLdData && (
                <script
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{ __html: jsonLdData }}
                />
            )}

            {blocksToRender.map((block: any, idx: number) => {
                const key = block._key || idx;
                switch (block._type) {
                    case 'heroBlock':
                    case 'hero':
                        return renderHero(block, key);
                    case 'comparisonBlock':
                        return renderComparison(block, key);
                    case 'featureTabsBlock':
                        return renderFeatureTabs(block, key);
                    case 'architectureBlock':
                    case 'architectureSection':
                        return renderArchitecture(block, key);
                    case 'ctaBlock':
                    case 'ctaBanner':
                    case 'cta':
                        return renderCta(block, key);
                    default:
                        return null;
                }
            })}
        </>
    );
}
