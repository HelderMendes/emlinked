'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
    CreditCard,
    ArrowRight,
    CheckCircle2,
    XCircle,
    Check,
    Building2,
    ShieldCheck,
    RefreshCw,
    BarChart3,
    Database,
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
        <div className='absolute -top-5 -right-5 sm:-top-6 sm:-right-6 z-30 size-12 sm:size-14 rounded-xl bg-teal text-white flex items-center justify-center shadow-sm border-2 border-white pointer-events-none'>
            <ColorIcon
                src={icon}
                alt={alt}
                className='w-6 h-6 sm:w-7 sm:h-7 text-white'
                sizePx={28}
            />
        </div>
    );
}

interface PaymentSoftwareModuleProps {
    doc?: any;
    locale?: string;
}

export function PaymentSoftwareModule({
    doc,
    locale = 'nl',
}: PaymentSoftwareModuleProps) {
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
            ? 'AUTOMATED COLLECTION & RECONCILIATION'
            : 'FINANCIËLE AUTOMATISERING & INCASSO');
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
        explicitHeroPath || '/emlinked/apps/payment/payment-software-her0.webp',
    );

    const sepaTab =
        featureTabsBlock?.tabs?.find((t: any) => t.tabId === 'sepa') ||
        featureTabsBlock?.tabs?.[0];
    const reconciliationTab =
        featureTabsBlock?.tabs?.find(
            (t: any) => t.tabId === 'reconciliation',
        ) || featureTabsBlock?.tabs?.[1];
    const dunningTab =
        featureTabsBlock?.tabs?.find((t: any) => t.tabId === 'dunning') ||
        featureTabsBlock?.tabs?.[2];

    const tab0Img = getImageUrl(
        sepaTab?.image,
        sepaTab?.imagePath ||
            '/emlinked/apps/payment/tab01_SEPA-direct-debit-Incasso.jpg',
    );
    const tab1Img = getImageUrl(
        reconciliationTab?.image,
        reconciliationTab?.imagePath ||
            '/emlinked/apps/payment/tab02_realtime-ankreconciliatie.jpg',
    );
    const tab2Img = getImageUrl(
        dunningTab?.image,
        dunningTab?.imagePath ||
            '/emlinked/apps/payment/tab03_storneer-aanmaningsbeheer.jpg',
    );
    const ctaImageUrl = getImageUrl(
        ctaBlock?.image,
        ctaBlock?.imagePath ||
            '/emlinked/apps/payment/automatiseren_payment.jpg',
    );

    const archTag =
        architectureBlock?.tag || (isEn ? 'ERP INTEGRATION' : 'ERP INTEGRATIE');
    const archTitle =
        architectureBlock?.title ||
        (isEn
            ? '100% Real-Time Banking Sync in Business Central'
            : '100% Realtime Bankkoppeling in Business Central');
    const archDesc =
        architectureBlock?.desc ||
        (isEn
            ? "The Emlinked Payment Engine isn't a disconnected tool. Every SEPA collection, bank reconciliation, and dunning notice syncs directly with your central Business Central database."
            : 'De Emlinked Payment Engine staat niet los van je boekhouding. Elke SEPA-incasso, bankaflettering en aanmaning wordt direct gesynchroniseerd met je centrale Business Central database.');
    const defaultArchBullets = isEn
        ? [
              {
                  bold: 'One central source of truth:',
                  text: 'No separate banking portals or shadow files next to your ERP.',
              },
              {
                  bold: 'Zero duplicate entry:',
                  text: 'Collections, reconciliations, and reminders post directly as validated journal entries.',
              },
              {
                  bold: '100% real-time data integrity:',
                  text: 'Instantly reliable insight for accountants, management, and your team.',
              },
          ]
        : [
              {
                  bold: 'Één centrale bron van waarheid:',
                  text: 'Geen losse bankportalen of schaduwbestanden naast je ERP.',
              },
              {
                  bold: 'Nul dubbele invoer:',
                  text: "Incasso's, afletteringen en aanmaningen landen direct als gevalideerde journaalposten.",
              },
              {
                  bold: '100% Realtime data-integriteit:',
                  text: 'Direct betrouwbaar inzicht voor accountant, directie en beheerteam.',
              },
          ];
    const archBullets = architectureBlock?.bullets?.length
        ? architectureBlock.bullets.map((text: string) => ({ bold: '', text }))
        : defaultArchBullets;
    const archImage = getImageUrl(
        architectureBlock?.image,
        architectureBlock?.imagePath ||
            '/emlinked/apps/payment/automatiseren_payment.jpg',
    );

    // Structured JSON-LD from Sanity or user blueprint
    const jsonLdData = doc?.seo?.structuredData
        ? typeof doc.seo.structuredData === 'string'
            ? doc.seo.structuredData
            : JSON.stringify(doc.seo.structuredData)
        : JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                  {
                      '@type': 'WebPage',
                      '@id': `${DEFAULT_DOMAIN}/apps/payment-software#webpage`,
                      url: `${DEFAULT_DOMAIN}/apps/payment-software`,
                      name: 'Payment Software — Automatische Huurincasso & Bankaflettering | emlinked',
                      description:
                          'Geautomatiseerde incasso van huurpenningen en automatische aflettering van bankafschriften direct in uw Microsoft Business Central administratie.',
                      inLanguage: 'nl-NL',
                      isPartOf: {
                          '@type': 'WebSite',
                          '@id': `${DEFAULT_DOMAIN}/#website`,
                      },
                  },
                  {
                      '@type': 'BreadcrumbList',
                      '@id': `${DEFAULT_DOMAIN}/apps/payment-software#breadcrumb`,
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
                              name: 'Payment software',
                              item: `${DEFAULT_DOMAIN}/apps/payment-software`,
                          },
                      ],
                  },
                  {
                      '@type': 'SoftwareApplication',
                      '@id': `${DEFAULT_DOMAIN}/apps/payment-software#software`,
                      name: 'Emlinked Payment Software',
                      applicationCategory: 'BusinessApplication',
                      operatingSystem: 'Web-based, Direct Banking Integration',
                      softwareRequirements:
                          'Microsoft Dynamics 365 Business Central',
                      description:
                          'Geautomatiseerde huurincasso software met SEPA Direct Debit en realtime bankreconciliatie gekoppeld aan Microsoft Business Central.',
                      publisher: {
                          '@type': 'Organization',
                          name: 'Emlinked',
                          url: DEFAULT_DOMAIN,
                      },
                  },
              ],
          });

    const [activeTab, setActiveTab] = useState<
        'sepa' | 'reconciliation' | 'dunning'
    >('sepa');

    const renderHero = (block: any, key: any) => (
        <HeroSection
            key={key}
            locale={locale}
            label={heroBadge}
            title={
                heroTagline ||
                (isEn
                    ? 'Automated rent collection & bank reconciliation inside your ERP'
                    : 'Geautomatiseerde huurincasso & bankaflettering direct in je ERP')
            }
            titleClassName='text-3xl sm:text-4xl lg:text-[2.75rem]'
            subtitle={
                heroDescription ||
                (isEn
                    ? 'No more manual bank statement reconciliation. Our payment software automates SEPA direct debits, payment reminders, and matching incoming payments with your general ledger. Natively integrated with Microsoft Dynamics 365 Business Central and Direct Banking.'
                    : 'Geen handmatige aflettering van bankafschriften meer. Onze huurincasso software automatiseert het volledige proces van SEPA-incasso’s, herinneringen en het matchen van inkomende huurbetalingen met je grootboek. Native geïntegreerd met Microsoft Dynamics 365 Business Central en Direct Banking.')
            }
            ctaLabel={
                heroBlock?.primaryCtaLabel ||
                heroBlock?.ctaLabel ||
                (isEn ? 'Request a demo' : 'Vraag een demonstratie aan')
            }
            ctaLink={heroBlock?.primaryCtaUrl || heroBlock?.ctaLink || '#demo'}
            secondaryCtaLabel={
                heroBlock?.secondaryCtaLabel ||
                (isEn ? 'All Apps' : 'Alle apps')
            }
            secondaryCtaLink={
                heroBlock?.secondaryCtaUrl ||
                heroBlock?.secondaryCtaLink ||
                (isEn ? '/en/apps' : '/apps')
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
                        alt={heroBlock?.title || 'Emlinked Payment Software'}
                        fill
                        sizes='(max-width: 1024px) 100vw, 55vw'
                        className='object-cover lg:mask-[linear-gradient(to_right,transparent,black_22%)]'
                        priority
                    />

                    <div className='absolute z-20 left-0 top-10 flex items-center gap-2.5 bg-white rounded-xl px-3.5 py-3 shadow-xl'>
                        <span className='w-7 h-7 rounded-lg bg-teal-pale text-teal flex items-center justify-center shrink-0'>
                            <ShieldCheck className='w-3.5 h-3.5' />
                        </span>
                        <div>
                            <p className='text-[11px] font-bold text-navy-900 leading-none'>
                                Geautomatiseerd
                            </p>
                            <p className='text-[9px] text-navy-500 mt-1'>
                                {isEn ? 'Direct Debit' : 'SEPA Incasso'}
                            </p>
                        </div>
                    </div>

                    <div className='absolute z-20 right-0 bottom-8 flex items-center gap-2.5 bg-white rounded-xl px-3.5 py-3 shadow-xl'>
                        <span className='w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0'>
                            <Database className='w-3.5 h-3.5' />
                        </span>
                        <div>
                            <p className='text-[11px] font-bold text-navy-900 leading-none'>
                                95% Match
                            </p>
                            <p className='text-[9px] text-navy-500 mt-1'>
                                {isEn ? 'Reconciliation' : 'Aflettering'}
                            </p>
                        </div>
                    </div>
                </>
            }
        />
    );

    const renderComparison = (block: any, key: any) => (
        <section
            key={key}
            className='px-6 py-20 bg-background text-navy-900 border-b border-teal/10 relative z-10'
        >
            <div className='max-w-7xl mx-auto space-y-16'>
                {/* Header */}
                <div className='text-center max-w-3xl mx-auto space-y-4'>
                    <div className='flex justify-center mb-3'>
                        <Badge color='teal' uppercase dot>
                            {comparisonBlock?.badge ||
                                doc?.comparisonSection?.badge ||
                                (isEn
                                    ? '100% RECONCILIATION WITHOUT HUMAN ERRORS'
                                    : '100% RECONCILIATIE ZONDER MENSELIJKE FOUTEN')}
                        </Badge>
                    </div>

                    <h2 className='font-display text-3xl md:text-4xl lg:text-[2.5rem]/12 font-bold tracking-tight text-navy-900'>
                        {comparisonBlock?.title ||
                            doc?.comparisonSection?.title ||
                            (isEn
                                ? 'Why manual rent payment processing holds you back'
                                : 'Waarom handmatige verwerking van huurbetalingen je afremt')}
                    </h2>

                    <p className='text-navy-900/75 text-base md:text-lg leading-relaxed font-light'>
                        {comparisonBlock?.desc ||
                            doc?.comparisonSection?.desc ||
                            (isEn
                                ? 'As portfolios grow, manually checking bank statements and sending reminders wastes hours weekly. Our real estate payment software automates transactions and gives real-time collection insight.'
                                : 'Bij groeiende portefeuilles kost het handmatig controleren van bankafschriften en versturen van aanmaningen veel tijd. Onze vastgoed betaalsoftware verwerkt transacties automatisch en geeft realtime inzicht in betalingsachterstanden.')}
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
                                <h3 className='text-lg font-bold text-teal uppercase'>
                                    {comparisonBlock?.leftTitle ||
                                        doc?.comparisonSection?.leftTitle ||
                                        (isEn
                                            ? 'MANUAL BANK RECONCILIATION'
                                            : 'HANDMATIGE BANKAFLETTERING')}
                                </h3>
                            </div>

                            <ul className='space-y-4 text-sm text-navy-900/80'>
                                {(
                                    comparisonBlock?.leftItems ||
                                    doc?.comparisonSection?.leftItems ||
                                    (isEn
                                        ? [
                                              {
                                                  title: 'Hours wasted monthly on manual reconciliation',
                                                  desc: 'Manually matching bank statements with general ledger accounts costs managers hours every week.',
                                              },
                                              {
                                                  title: 'Manual tracking of failed debits & chargebacks',
                                                  desc: 'Chargebacks and rejected SEPA debits are noticed too late in disconnected tools.',
                                              },
                                              {
                                                  title: 'Delayed reminders for late rent payments',
                                                  desc: 'Lack of automated triggers results in reminders and dunning notices being sent weeks late.',
                                              },
                                              {
                                                  title: 'Risk of incorrect journal posts in the ERP',
                                                  desc: 'Manual retyping causes data discrepancies and correction entries at month-end.',
                                              },
                                          ]
                                        : [
                                              {
                                                  title: 'Uren per maand kwijt aan het handmatig afletteren',
                                                  desc: 'Handmatig matchen van bankafschriften en grootboekrekeningen kost beheerders wekelijks veel tijd.',
                                              },
                                              {
                                                  title: 'Mislukte incasso’s en storno’s handmatig opsporen',
                                                  desc: 'Storneringen en geweigerde SEPA-opdrachten worden te laat opgemerkt in losse systemen.',
                                              },
                                              {
                                                  title: 'Vertraagde herinneringen bij betalingsachterstand',
                                                  desc: 'Geen automatische triggers waardoor herinneringen en aanmaningen pas na weken verstuurd worden.',
                                              },
                                              {
                                                  title: 'Risico op foutieve journaalposten in het ERP',
                                                  desc: 'Handmatig overtypen leidt tot dataverschillen en correctieboekingen aan het einde van de maand.',
                                              },
                                          ])
                                ).map((item: any, idx: number) => {
                                    const isObj =
                                        typeof item === 'object' &&
                                        item !== null;
                                    const titleText = isObj ? item.title : item;
                                    const descText = isObj ? item.desc : '';
                                    return (
                                        <li
                                            key={idx}
                                            className='flex items-start gap-3'
                                        >
                                            <XCircle className='w-5 h-5 text-teal shrink-0 mt-0.5' />
                                            <div className='space-y-0.5'>
                                                <strong className='text-navy-900 block font-semibold text-sm'>
                                                    {titleText}
                                                </strong>
                                                {descText && (
                                                    <span className='text-slate-600 text-xs leading-relaxed block'>
                                                        {descText}
                                                    </span>
                                                )}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>

                    {/* Right Card: Emlinked Native Solution */}
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
                                <h3 className='text-lg font-bold text-teal uppercase'>
                                    {comparisonBlock?.rightTitle ||
                                        doc?.comparisonSection?.rightTitle ||
                                        (isEn
                                            ? 'EMLINKED PAYMENT ENGINE'
                                            : 'EMLINKED PAYMENT ENGINE')}
                                </h3>
                            </div>

                            <ul className='space-y-4 text-sm text-navy-900/80'>
                                {(
                                    comparisonBlock?.rightItems ||
                                    doc?.comparisonSection?.rightItems ||
                                    doc?.benefits ||
                                    (isEn
                                        ? [
                                              {
                                                  title: 'Automatic bank reconciliation via PSD2 & Direct Banking',
                                                  desc: 'Incoming payments are matched in real-time to open rent invoices in your ledger.',
                                              },
                                              {
                                                  title: 'Automated SEPA direct debit retry workflows',
                                                  desc: 'Failed collections are automatically re-submitted with chargeback tracking.',
                                              },
                                              {
                                                  title: 'Direct triggers for dunning workflows',
                                                  desc: 'Reminders and legal notices are sent precisely on schedule according to your policy.',
                                              },
                                              {
                                                  title: '100% accurate journal entries native in Business Central',
                                                  desc: 'Directly updated in your ERP ledger without manual steps or shadow files.',
                                              },
                                          ]
                                        : [
                                              {
                                                  title: 'Automatische bankreconciliatie via PSD2 & Direct Banking',
                                                  desc: 'Inkomende betalingen worden realtime gekoppeld aan de juiste openstaande huurfacturen.',
                                              },
                                              {
                                                  title: 'Geautomatiseerde SEPA-heraanbiedingen',
                                                  desc: "Mislukte incasso's worden automatisch opnieuw ingediend met storneeropvolging.",
                                              },
                                              {
                                                  title: 'Directe triggers voor herinneringstrajecten',
                                                  desc: 'Aanmaningen en herinneringen worden exact op tijd verzonden volgens vooraf ingestelde schema’s.',
                                              },
                                              {
                                                  title: '100% accurate journaalposten native in Business Central',
                                                  desc: 'Direct bijgewerkt in je ERP-grootboek zonder handmatige tussenkomst of schaduwbestanden.',
                                              },
                                          ])
                                ).map((item: any, idx: number) => {
                                    const isObj =
                                        typeof item === 'object' &&
                                        item !== null;
                                    const titleText = isObj
                                        ? item.title || item.benefit
                                        : item;
                                    const descText = isObj
                                        ? item.desc || item.description
                                        : '';
                                    return (
                                        <li
                                            key={idx}
                                            className='flex items-start gap-3'
                                        >
                                            <CheckCircle2 className='w-5 h-5 text-teal shrink-0 mt-0.5' />
                                            <div className='space-y-0.5'>
                                                <strong className='text-navy-900 block font-semibold text-sm'>
                                                    {titleText}
                                                </strong>
                                                {descText && (
                                                    <span className='text-slate-600 text-xs leading-relaxed block'>
                                                        {descText}
                                                    </span>
                                                )}
                                            </div>
                                        </li>
                                    );
                                })}
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
                <div className='text-center max-w-3xl mx-auto space-y-4 flex flex-col items-center'>
                    <Badge
                        color='teal'
                        uppercase
                        dot
                        dotPulse
                        className='self-center'
                    >
                        {featureTabsBlock?.badge ||
                            (isEn ? 'CAPABILITIES' : 'FUNCTIONALITEITEN')}
                    </Badge>
                    <h2 className='font-display text-3xl md:text-4xl lg:text-[2.5rem]/12 font-bold tracking-tight text-navy-900'>
                        {featureTabsBlock?.title ||
                            (isEn
                                ? 'Complete control over your rent collection flow'
                                : 'Volledige controle over je huurincassostroom')}
                    </h2>
                    <p className='text-navy-900/75 text-base md:text-lg font-light max-w-3xl'>
                        {featureTabsBlock?.desc ||
                            doc?.featuresSectionDesc ||
                            (isEn
                                ? 'Designed to effortlessly streamline SEPA direct debits, automatic reversal processing, and real-time bank reconciliation in Business Central.'
                                : 'Ontwikkeld om SEPA-incasso’s, automatische storneerverwerking en realtime bankaflettering in Business Central moeiteloos te stroomlijnen.')}
                    </p>
                </div>

                {/* Feature Tabs Bar */}
                <div className='flex justify-center border-b border-black/10 gap-2 sm:gap-4 overflow-x-auto pb-px'>
                    <button
                        onClick={() => setActiveTab('sepa')}
                        className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                            activeTab === 'sepa'
                                ? 'border-teal text-teal bg-teal/15 rounded-t-lg'
                                : 'border-transparent text-navy-900/60 hover:text-navy-900'
                        }`}
                    >
                        <CreditCard className='w-4 h-4' />
                        <span>
                            1.{' '}
                            {(
                                sepaTab?.tabTitle ||
                                (isEn
                                    ? 'SEPA Direct Debit Collection'
                                    : 'SEPA Direct Debit Incasso')
                            ).replace(/^\d+\.\s*/, '')}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('reconciliation')}
                        className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                            activeTab === 'reconciliation'
                                ? 'border-teal text-teal bg-teal/15 rounded-t-lg'
                                : 'border-transparent text-navy-900/60 hover:text-navy-900'
                        }`}
                    >
                        <RefreshCw className='w-4 h-4' />
                        <span>
                            2.{' '}
                            {(
                                reconciliationTab?.tabTitle ||
                                (isEn
                                    ? 'Real-time Bank Reconciliation'
                                    : 'Realtime Bankreconciliatie')
                            ).replace(/^\d+\.\s*/, '')}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('dunning')}
                        className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                            activeTab === 'dunning'
                                ? 'border-teal text-teal bg-teal/15 rounded-t-lg'
                                : 'border-transparent text-navy-900/60 hover:text-navy-900'
                        }`}
                    >
                        <BarChart3 className='w-4 h-4' />
                        <span>
                            3.{' '}
                            {(
                                dunningTab?.tabTitle ||
                                (isEn
                                    ? 'Reversal & Dunning Management'
                                    : 'Storneer- & Aanmaningsbeheer')
                            ).replace(/^\d+\.\s*/, '')}
                        </span>
                    </button>
                </div>

                {/* Feature Content */}
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'>
                    {activeTab === 'sepa' && (
                        <>
                            <div className='lg:col-span-6 space-y-6 px-3'>
                                <h3 className='font-semibold text-2xl md:text-3xl lg:text-4xl tracking-tight text-teal leading-tight'>
                                    {sepaTab?.title ||
                                        doc?.features?.[0]?.title ||
                                        (isEn
                                            ? 'SEPA Direct Debit & Collection Automation'
                                            : 'SEPA Direct Debit & Incasso-automatisering')}
                                </h3>
                                <p className='text-navy-900/75 text-base md:text-lg font-light leading-relaxed'>
                                    {sepaTab?.text ||
                                        doc?.features?.[0]?.text ||
                                        (isEn
                                            ? 'Generate and submit all monthly SEPA collection files to your bank with a single click. The software handles chargebacks automatically and schedules retries.'
                                            : 'Genereer en verstuur maandelijks met één druk op de knop alle SEPA-incassobestanden naar je bank. De software verwerkt storneringen automatisch en plant herhalingen in.')}
                                </p>
                                <ul className='text-navy-900/85 ml-4'>
                                    {sepaTab?.bullets?.length ? (
                                        sepaTab.bullets.map(
                                            (b: string, i: number) => (
                                                <li
                                                    key={i}
                                                    className='flex items-start gap-2.5 mb-2.5'
                                                >
                                                    <Check className='size-5 text-teal shrink-0 mt-2' />
                                                    <span>{b}</span>
                                                </li>
                                            ),
                                        )
                                    ) : (
                                        <>
                                            <li className='flex items-start gap-2.5 mb-2.5'>
                                                <Check className='size-5 text-teal shrink-0 mt-2' />
                                                <span>
                                                    {isEn
                                                        ? 'Automated generation of SEPA XML collection files'
                                                        : 'Automatische generatie van SEPA XML incassobestanden'}
                                                </span>
                                            </li>
                                            <li className='flex items-start gap-2.5 mb-2.5'>
                                                <Check className='size-5 text-teal shrink-0 mt-2' />
                                                <span>
                                                    {isEn
                                                        ? 'Direct debits automatically retried upon failure'
                                                        : 'Storneringen automatisch gedetecteerd & heraangeboden'}
                                                </span>
                                            </li>
                                            <li className='flex items-start gap-2.5 mb-2.5'>
                                                <Check className='size-5 text-teal shrink-0 mt-2' />
                                                <span>
                                                    {isEn
                                                        ? 'Integration with all major European banks'
                                                        : 'Integratie met alle Nederlandse en Europese banken'}
                                                </span>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                            <div className='lg:col-span-6 relative pt-4 pr-4 sm:pt-6 sm:pr-6'>
                                {/* Square with round corners Top-Right Floating Badge */}
                                <div className='absolute top-0 right-0 z-20 w-22 h-12 rounded-xl bg-teal text-white flex items-center justify-center gap-1 shadow-xl border-2 border-white pointer-events-none'>
                                    <CreditCard className='size-6.5 -mr-1' />
                                    <span className='font-light text-2xl tracking-tighter ml-1.5'>
                                        1.
                                    </span>
                                </div>
                                <div className='rounded-xl overflow-hidden shadow-sm'>
                                    <Image
                                        src={tab0Img}
                                        alt={
                                            sepaTab?.title ||
                                            'SEPA Direct Debit Incasso UI Preview'
                                        }
                                        width={1200}
                                        height={675}
                                        className='w-full h-auto rounded-lg border border-white/10'
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'reconciliation' && (
                        <>
                            <div className='lg:col-span-6 space-y-6 px-3'>
                                <h3 className='font-semibold text-2xl md:text-3xl lg:text-4xl tracking-tight text-teal leading-tight'>
                                    {reconciliationTab?.title ||
                                        doc?.features?.[1]?.title ||
                                        (isEn
                                            ? 'Real-time Bank Reconciliation via Direct Banking'
                                            : 'Realtime Bankreconciliatie via Direct Banking')}
                                </h3>
                                <p className='text-navy-900/75 text-base md:text-lg font-light leading-relaxed'>
                                    {reconciliationTab?.text ||
                                        doc?.features?.[1]?.text ||
                                        (isEn
                                            ? 'Connect your bank account directly via Direct Banking or PSD2. Incoming rent payments are instantly matched against open invoices in your ledger.'
                                            : 'Koppel je bankrekening rechtstreeks via Direct Banking of PSD2. Inkomende betalingen worden op basis van kenmerk en bedrag direct gematcht met de openstaande posten in je boekhouding.')}
                                </p>
                                <ul className='text-navy-900/85 ml-4'>
                                    {reconciliationTab?.bullets?.length ? (
                                        reconciliationTab.bullets.map(
                                            (b: string, i: number) => (
                                                <li
                                                    key={i}
                                                    className='flex items-start gap-2.5 mb-2.5'
                                                >
                                                    <Check className='size-5 text-teal shrink-0 mt-2' />
                                                    <span>{b}</span>
                                                </li>
                                            ),
                                        )
                                    ) : (
                                        <>
                                            <li className='flex items-start gap-2.5 mb-2.5'>
                                                <Check className='size-5 text-teal shrink-0 mt-2' />
                                                <span>
                                                    {isEn
                                                        ? 'Direct Banking & CAMT.053 bank feeds imported automatically'
                                                        : 'Direct Banking & CAMT.053 bankafschriften automatisch ingelezen'}
                                                </span>
                                            </li>
                                            <li className='flex items-start gap-2.5 mb-2.5'>
                                                <Check className='size-5 text-teal shrink-0 mt-2' />
                                                <span>
                                                    {isEn
                                                        ? '100% accurate matching engine per lease & tenant'
                                                        : '100% accurate matche-engine op huurcontract en debiteurnummer'}
                                                </span>
                                            </li>
                                            <li className='flex items-start gap-2.5 mb-2.5'>
                                                <Check className='size-5 text-teal shrink-0 mt-2' />
                                                <span>
                                                    {isEn
                                                        ? 'Split payments across owners and management fees'
                                                        : 'Split payments over eigenaren en beheervergoedingen'}
                                                </span>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                            <div className='lg:col-span-6 relative pt-4 pr-4 sm:pt-6 sm:pr-6'>
                                {/* Square with round corners Top-Right Floating Badge */}
                                <div className='absolute top-0 right-0 z-20 w-22 h-12 rounded-xl bg-teal text-white flex items-center justify-center gap-1 shadow-xl border-2 border-white pointer-events-none'>
                                    <RefreshCw className='size-6.5 -mr-1' />
                                    <span className='font-light text-2xl tracking-tighter ml-1.5'>
                                        2.
                                    </span>
                                </div>
                                <div className='rounded-xl overflow-hidden shadow-sm'>
                                    <Image
                                        src={tab1Img}
                                        alt={
                                            reconciliationTab?.title ||
                                            'Realtime Bankreconciliatie UI Preview'
                                        }
                                        width={1200}
                                        height={675}
                                        className='w-full h-auto rounded-lg border border-white/10'
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'dunning' && (
                        <>
                            <div className='lg:col-span-6 space-y-6 px-3'>
                                <h3 className='font-semibold text-2xl md:text-3xl lg:text-4xl tracking-tight text-teal leading-tight'>
                                    {dunningTab?.title ||
                                        doc?.features?.[2]?.title ||
                                        (isEn
                                            ? 'Automated Credit Management & Dunning'
                                            : 'Geautomatiseerd Debiteurenbeheer')}
                                </h3>
                                <p className='text-navy-900/75 text-base md:text-lg font-light leading-relaxed'>
                                    {dunningTab?.text ||
                                        doc?.features?.[2]?.text ||
                                        (isEn
                                            ? 'Prevent accumulating rent arrears. Configure flexible dunning workflows for automated email and SMS reminders when payments are overdue.'
                                            : 'Voorkom oplopende betalingsachterstanden. Stel flexibele herinneringsschema’s in voor automatische herinneringen per e-mail of SMS zodra een betalingstermijn verstrijkt.')}
                                </p>
                                <ul className='text-navy-900/85 ml-4'>
                                    {dunningTab?.bullets?.length ? (
                                        dunningTab.bullets.map(
                                            (b: string, i: number) => (
                                                <li
                                                    key={i}
                                                    className='flex items-start gap-2.5 mb-2.5'
                                                >
                                                    <Check className='size-5 text-teal shrink-0 mt-2' />
                                                    <span>{b}</span>
                                                </li>
                                            ),
                                        )
                                    ) : (
                                        <>
                                            <li className='flex items-start gap-2.5 mb-2.5'>
                                                <Check className='size-5 text-teal shrink-0 mt-2' />
                                                <span>
                                                    {isEn
                                                        ? 'Automated reminder & dunning flows via email / SMS'
                                                        : 'Automatische herinneringen & aanmaningsflows per e-mail / SMS'}
                                                </span>
                                            </li>
                                            <li className='flex items-start gap-2.5 mb-2.5'>
                                                <Check className='size-5 text-teal shrink-0 mt-2' />
                                                <span>
                                                    {isEn
                                                        ? 'Clear accounts receivable aging reports per property'
                                                        : 'Inzichtelijke debiteuren-aging rapportage per object'}
                                                </span>
                                            </li>
                                            <li className='flex items-start gap-2.5 mb-2.5'>
                                                <Check className='size-5 text-teal shrink-0 mt-2' />
                                                <span>
                                                    {isEn
                                                        ? 'Full audit trail in Business Central & tenant file'
                                                        : 'Volledige audittrail in Business Central & huurdersdossier'}
                                                </span>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                            <div className='lg:col-span-6 relative pt-4 pr-4 sm:pt-6 sm:pr-6'>
                                {/* Square with round corners Top-Right Floating Badge */}
                                <div className='absolute top-0 right-0 z-20 w-22 h-12 rounded-xl bg-teal text-white flex items-center justify-center gap-1 shadow-xl border-2 border-white pointer-events-none'>
                                    <BarChart3 className='size-6.5 -mr-1' />
                                    <span className='font-light text-2xl tracking-tighter ml-1.5'>
                                        3.
                                    </span>
                                </div>
                                <div className='rounded-xl overflow-hidden shadow-sm'>
                                    <Image
                                        src={tab2Img}
                                        alt={
                                            dunningTab?.title ||
                                            'Geautomatiseerd Debiteurenbeheer UI Preview'
                                        }
                                        width={1200}
                                        height={675}
                                        className='w-full h-auto rounded-lg border border-white/10'
                                    />
                                </div>
                            </div>
                        </>
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

                        <div className='space-y-4 pt-2'>
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
                        <div className='lg:col-span-8 flex flex-col gap-5 text-left'>
                            <Badge color='teal' uppercase dot dotPulse>
                                {ctaBlock?.tag ||
                                    doc?.cta?.tag ||
                                    (isEn ? 'REQUEST DEMO' : 'DEMO AANVRAGEN')}
                            </Badge>

                            <h2 className='font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight bg-linear-to-br from-[#f12711] to-[#f5af19] bg-clip-text text-transparent'>
                                {ctaBlock?.title ||
                                    doc?.cta?.title ||
                                    (isEn
                                        ? 'Ready to automate your rent collection and reconciliation?'
                                        : 'Klaar om je huurincasso en aflettering te automatiseren?')}
                            </h2>

                            <p className='text-navy-700 text-base md:text-lg font-light leading-relaxed max-w-2xl'>
                                {ctaBlock?.desc ||
                                    doc?.cta?.desc ||
                                    (isEn
                                        ? 'Experience how our payment software speeds up credit management and processes bank reconciliation flawlessly in Business Central.'
                                        : 'Ervaar zelf hoe onze payment software je debiteurenbeheer versnelt en je bankaflettering foutloos verwerkt in Business Central.')}
                            </p>

                            <div className='flex flex-col sm:flex-row gap-4 pt-2'>
                                <Link
                                    href='#demo'
                                    className='inline-flex h-11 items-center gap-1.5 justify-center rounded-lg bg-navy-900 hover:btn-gradient px-6 text-sm font-semibold text-white transition-colors'
                                >
                                    <span>
                                        {ctaBlock?.primaryButtonText ||
                                            doc?.cta?.primary ||
                                            (isEn
                                                ? 'Request Live Demo'
                                                : 'Live demo aanvragen')}
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

                        <div className='lg:col-span-4 flex justify-start lg:justify-end'>
                            <Image
                                src={ctaImageUrl}
                                alt={
                                    ctaBlock?.title ||
                                    'Payment Software Illustratie'
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
            {/* Inject JSON-LD Structured Data */}
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
