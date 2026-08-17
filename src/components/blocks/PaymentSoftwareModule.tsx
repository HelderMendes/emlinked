'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
import { GlowingLink } from '@/components/ui/GlowingButton';
import { DataGridCanvas } from '@/components/ui/data-grid-canvas';
import { formatHeroTitle } from '@/components/blocks/HeroSection';
import { BorderBeam } from 'border-beam';
import { DEFAULT_DOMAIN } from '@/lib/seo';
import { getImageUrl } from '@/sanity/image';

function CardBadge({
    imageSrc,
    alt,
    isLegacy = false,
}: {
    imageSrc: string;
    alt: string;
    isLegacy?: boolean;
}) {
    return (
        <div
            className={`absolute -top-6 -right-6 sm:-top-7 sm:-right-7 z-30 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 sm:border-3 ${
                isLegacy
                    ? 'border-slate-300 bg-slate-200/95 shadow-xl'
                    : 'border-amber bg-slate-200/95 shadow-xl'
            } flex items-center justify-center p-2 group-hover:scale-110 transition-transform duration-300 pointer-events-none`}
        >
            <div className='relative w-10 h-10 sm:w-13 sm:h-13 rounded-full overflow-hidden'>
                <Image
                    src={imageSrc}
                    alt={alt}
                    fill
                    className='object-cover object-center scale-105'
                />
            </div>
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
    const featureTabsBlock = pageBlocks.find((b: any) => b._type === 'featureTabsBlock');
    const comparisonBlock = pageBlocks.find((b: any) => b._type === 'comparisonBlock');
    const ctaBlock = pageBlocks.find((b: any) => b._type === 'ctaBlock');

    const heroBadge = heroBlock?.badge || doc?.badge || (isEn ? 'AUTOMATED COLLECTION & RECONCILIATION' : 'FINANCIËLE AUTOMATISERING & INCASSO');
    const heroTagline = heroBlock?.tagline || doc?.tagline || doc?.title;
    const heroDescription = heroBlock?.description || doc?.description;

    const heroImageUrl = getImageUrl(
        heroBlock?.image || heroBlock?.heroImage || doc?.image || doc?.heroImage,
        heroBlock?.imagePath || heroBlock?.heroImagePath || doc?.imagePath || '/emlinked/apps/payment/payment-software-her0.webp',
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

    return (
        <>
            {/* Inject JSON-LD Structured Data */}
            {jsonLdData && (
                <script
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{ __html: jsonLdData }}
                />
            )}

            {/* ── BLOCK 1: HERO SECTION ── */}
            <section className='relative px-6 py-12 md:py-20 overflow-hidden bg-texture-navy text-white border-b border-white/10'>
                <DataGridCanvas className='pointer-events-none absolute inset-0 h-full w-full opacity-70 z-999' />

                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10'>
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
                        {/* Left Copy */}
                        <div className='lg:col-span-7 flex flex-col gap-6 text-left'>
                            <span className='inline-flex items-center gap-3.5 self-start rounded-full bg-amber/15 border border-amber/35 px-4.5 py-1 text-xs font-bold tracking-wide text-amber uppercase'>
                                <span className='w-1.5 h-1.5 bg-amber rounded-full animate-ping' />
                                {heroBadge}
                            </span>

                            <h1 className='font-display font-bold tracking-tight text-white leading-[1.1] text-3xl sm:text-4xl lg:text-[2.75rem] text-balance'>
                                {heroTagline ? (
                                    formatHeroTitle(heroTagline)
                                ) : (
                                    <>
                                        Geautomatiseerde huurincasso &{' '}
                                        <span className='text-amber font-extrabold'>
                                            bankaflettering direct in je ERP
                                        </span>
                                    </>
                                )}
                            </h1>

                            <p className='text-lg md:text-xl text-white/70 leading-relaxed font-light max-w-2xl'>
                                {heroDescription ||
                                    'Geen handmatige aflettering van bankafschriften meer. Onze huurincasso software automatiseert het volledige proces van SEPA-incasso’s, herinneringen en het matchen van inkomende huurbetalingen met je grootboek. Native geïntegreerd met Microsoft Dynamics 365 Business Central en Direct Banking.'}
                            </p>

                            <div className='flex flex-col sm:flex-row gap-4 mt-2'>
                                <GlowingLink
                                    href={heroBlock?.primaryCtaUrl || heroBlock?.ctaLink || '#demo'}
                                    className='inline-flex h-14 items-center justify-center rounded-2xl border-0 bg-linear-to-r from-[#FF9500] via-[#FF5E00] to-[#FF3B00] hover:brightness-110 px-8 text-base font-bold text-white transition-all duration-200 shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98]'
                                >
                                    <span className='flex items-center justify-center gap-2 text-white'>
                                        <span>
                                            {heroBlock?.primaryCtaLabel || heroBlock?.ctaLabel || (isEn ? 'Request a demo' : 'Vraag een demonstratie aan')}
                                        </span>
                                        <ArrowRight className='w-5 h-5 text-white' />
                                    </span>
                                </GlowingLink>

                                <Link
                                    href={heroBlock?.secondaryCtaUrl || heroBlock?.secondaryCtaLink || (isEn ? '/en/apps' : '/apps')}
                                    className='inline-flex h-14 items-center justify-center rounded-2xl border border-white/20 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 transition-all text-center shadow-sm hover:scale-[1.02] active:scale-[0.98] duration-200'
                                >
                                    {heroBlock?.secondaryCtaLabel || (isEn ? 'All Apps →' : 'Alle apps →')}
                                </Link>
                            </div>

                            {/* Social Proof Text Bar (Clean Text Only) */}
                            <div className='flex items-center gap-3 pt-4 border-t border-white/10 mt-1'>
                                <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0' />
                                <span className='text-xs sm:text-sm text-white/80 font-light leading-snug'>
                                    {heroBlock?.proofText || doc?.proofText || (isEn
                                        ? 'Trusted by professional real estate managers and investors in Europe'
                                        : 'Vertrouwd door professionele vastgoedbeheerders en beleggers in Nederland')}
                                </span>
                            </div>
                        </div>

                        {/* Right Hero Graphic Mockup */}
                        <div className='lg:col-span-5 relative flex items-center h-full'>
                            <BorderBeam
                                size='md'
                                colorVariant='orange'
                                strength={1.2}
                                className='w-full'
                            >
                                <div className='relative w-full rounded-2xl bg-slate-950/90 backdrop-blur-xl shadow-2xl group overflow-hidden border border-amber/40'>
                                    <div className='absolute -inset-1 bg-linear-to-r from-amber/30 via-indigo-500/20 to-amber/30 blur-xl opacity-60 pointer-events-none' />

                                    <div className='relative z-10 flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-slate-950/90 text-xs text-white/70 font-mono'>
                                        <div className='flex items-center gap-2'>
                                            <div className='w-3 h-3 rounded-full bg-rose-500' />
                                            <div className='w-3 h-3 rounded-full bg-amber' />
                                            <div className='w-3 h-3 rounded-full bg-emerald-500' />
                                        </div>
                                        <div className='inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] border border-emerald-500/40'>
                                            <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping' />
                                            <span>
                                                100% Direct Banking Sync
                                            </span>
                                        </div>
                                    </div>

                                    <div className='relative aspect-16/12 w-full overflow-hidden bg-slate-950 flex flex-col justify-center items-center'>
                                        <Image
                                            src={heroImageUrl}
                                            alt={heroBlock?.title || 'Payment Software Hero Mockup'}
                                            width={1400}
                                            height={1100}
                                            className='w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500'
                                            priority
                                        />
                                    </div>
                                </div>
                            </BorderBeam>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── BLOCK 2: OPERATIONAL BOTTLENECKS ── */}
            <section className='px-6 py-20 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] text-[#060e32] border-b border-amber/10 relative z-10'>
                <div className='max-w-7xl mx-auto space-y-16'>
                    {/* Header */}
                    <div className='text-center max-w-3xl mx-auto space-y-4'>
                        <div className='flex justify-center mb-1'>
                            <span className='inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/15 px-4.5 py-1.5 text-xs font-mono font-bold tracking-wider text-amber uppercase backdrop-blur-md shadow-xs'>
                                <span className='w-2 h-2 rounded-full bg-amber shrink-0' />
                                {comparisonBlock?.badge || doc?.comparisonSection?.badge ||
                                    (isEn ? '100% RECONCILIATION WITHOUT HUMAN ERRORS' : '100% RECONCILIATIE ZONDER MENSELIJKE FOUTEN')}
                            </span>
                        </div>

                        <h2 className='font-display text-3xl md:text-4xl lg:text-[2.5rem]/12 font-bold tracking-tight text-[#060e32]'>
                            {comparisonBlock?.title || doc?.comparisonSection?.title ||
                                (isEn
                                    ? 'Why manual rent payment processing holds you back'
                                    : 'Waarom handmatige verwerking van huurbetalingen je afremt')}
                        </h2>

                        <p className='text-[#060e32]/75 text-base md:text-lg leading-relaxed font-light'>
                            {comparisonBlock?.desc || doc?.comparisonSection?.desc ||
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
                                imageSrc='/emlinked/apps/vastgoedbeheer-software/traditionele_vastgoedsoftware.jpg'
                                alt='Handmatige Bankaflettering'
                                isLegacy={true}
                            />

                            <div className='space-y-6'>
                                <div className='border-b border-black/10 pb-4 pr-16'>
                                    <h3 className='text-lg font-bold text-amber uppercase'>
                                        {comparisonBlock?.leftTitle || doc?.comparisonSection?.leftTitle ||
                                            (isEn ? 'MANUAL BANK RECONCILIATION' : 'HANDMATIGE BANKAFLETTERING')}
                                    </h3>
                                </div>

                                <ul className='space-y-4 text-sm text-[#060e32]/80'>
                                    {(comparisonBlock?.leftItems || doc?.comparisonSection?.leftItems ||
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
                                        const isObj = typeof item === 'object' && item !== null;
                                        const titleText = isObj ? item.title : item;
                                        const descText = isObj ? item.desc : '';
                                        return (
                                            <li key={idx} className='flex items-start gap-3'>
                                                <XCircle className='w-5 h-5 text-amber shrink-0 mt-0.5' />
                                                <div className='space-y-0.5'>
                                                    <strong className='text-[#060e32] block font-semibold text-sm'>
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
                                imageSrc='/emlinked/apps/payment/automatiseren_payment.jpg'
                                alt='Emlinked Payment Engine'
                                isLegacy={false}
                            />

                            <div className='space-y-6'>
                                <div className='border-b border-black/10 pb-4 pr-16'>
                                    <h3 className='text-lg font-bold text-amber uppercase'>
                                        {comparisonBlock?.rightTitle || doc?.comparisonSection?.rightTitle ||
                                            (isEn ? 'EMLINKED PAYMENT ENGINE' : 'EMLINKED PAYMENT ENGINE')}
                                    </h3>
                                </div>

                                <ul className='space-y-4 text-sm text-[#060e32]/80'>
                                    {(comparisonBlock?.rightItems || doc?.comparisonSection?.rightItems || doc?.benefits ||
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
                                        const isObj = typeof item === 'object' && item !== null;
                                        const titleText = isObj ? item.title || item.benefit : item;
                                        const descText = isObj ? item.desc || item.description : '';
                                        return (
                                            <li key={idx} className='flex items-start gap-3'>
                                                <CheckCircle2 className='w-5 h-5 text-amber shrink-0 mt-0.5' />
                                                <div className='space-y-0.5'>
                                                    <strong className='text-[#060e32] block font-semibold text-sm'>
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

            {/* ── BLOCK 3: CORE FUNCTIONALITIES ── */}
            <section className='py-20 px-6 bg-texture-navy text-white border-b border-white/10 relative overflow-hidden'>
                <DataGridCanvas className='pointer-events-none absolute inset-0 h-full w-full opacity-70 z-999' />

                <div className='max-w-7xl mx-auto space-y-8 relative z-10'>
                    <div className='text-center max-w-3xl mx-auto space-y-4 flex flex-col items-center'>
                        <span className='inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/15 px-4.5 py-1.5 text-xs font-mono font-bold tracking-wider text-amber uppercase backdrop-blur-md shadow-xs'>
                            <span className='w-2 h-2 rounded-full bg-amber shrink-0 animate-ping' />
                            {featureTabsBlock?.badge || (isEn ? 'CAPABILITIES' : 'FUNCTIONALITEITEN')}
                        </span>
                        <h2 className='font-display text-3xl md:text-4xl lg:text-[2.5rem]/12 font-bold tracking-tight text-white'>
                            {featureTabsBlock?.title || (isEn
                                ? 'Complete control over your rent collection flow'
                                : 'Volledige controle over je huurincassostroom')}
                        </h2>
                        <p className='text-white/80 leading-relaxed text-base md:text-lg font-light max-w-3xl'>
                            {featureTabsBlock?.desc || doc?.featuresSectionDesc ||
                                (isEn
                                    ? 'Designed to effortlessly streamline SEPA direct debits, automatic reversal processing, and real-time bank reconciliation in Business Central.'
                                    : 'Ontwikkeld om SEPA-incasso’s, automatische storneerverwerking en realtime bankaflettering in Business Central moeiteloos te stroomlijnen.')}
                        </p>
                    </div>

                    {/* Feature Tabs Bar */}
                    <div className='flex justify-center border-b border-white/10 gap-2 sm:gap-4 overflow-x-auto pb-px'>
                        <button
                            onClick={() => setActiveTab('sepa')}
                            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                                activeTab === 'sepa'
                                    ? 'border-amber text-amber bg-amber/15 rounded-t-lg'
                                    : 'border-transparent text-white/60 hover:text-white'
                            }`}
                        >
                            <CreditCard className='w-4 h-4' />
                            <span>{isEn ? '1. SEPA Direct Debit Collection' : '1. SEPA Direct Debit Incasso'}</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('reconciliation')}
                            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                                activeTab === 'reconciliation'
                                    ? 'border-amber text-amber bg-amber/15 rounded-t-lg'
                                    : 'border-transparent text-white/60 hover:text-white'
                            }`}
                        >
                            <RefreshCw className='w-4 h-4' />
                            <span>{isEn ? '2. Real-time Bank Reconciliation' : '2. Realtime Bankreconciliatie'}</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('dunning')}
                            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                                activeTab === 'dunning'
                                    ? 'border-amber text-amber bg-amber/15 rounded-t-lg'
                                    : 'border-transparent text-white/60 hover:text-white'
                            }`}
                        >
                            <BarChart3 className='w-4 h-4' />
                            <span>{isEn ? '3. Reversal & Dunning Management' : '3. Storneer- & Aanmaningsbeheer'}</span>
                        </button>
                    </div>

                    {/* Feature Content */}
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'>
                        {activeTab === 'sepa' && (
                            <>
                                <div className='lg:col-span-6 space-y-6'>
                                    <h3 className='text-2xl sm:text-3xl font-bold text-white'>
                                        {doc?.features?.[0]?.title ||
                                            (isEn ? 'SEPA Direct Debit & Collection Automation' : 'SEPA Direct Debit & Incasso-automatisering')}
                                    </h3>
                                    <p className='text-white/70 leading-relaxed text-base font-light'>
                                        {doc?.features?.[0]?.text ||
                                            (isEn
                                                ? 'Generate and submit all monthly SEPA collection files to your bank with a single click. The software handles chargebacks automatically and schedules retries.'
                                                : 'Genereer en verstuur maandelijks met één druk op de knop alle SEPA-incassobestanden naar je bank. De software verwerkt storneringen automatisch en plant herhalingen in.')}
                                    </p>
                                    <ul className='space-y-2.5 text-sm text-white/80'>
                                        <li className='flex items-center gap-2.5'>
                                            <Check className='w-4 h-4 text-amber shrink-0' />
                                            <span>
                                                {isEn ? 'Automated generation of SEPA XML collection files' : 'Automatische generatie van SEPA XML incassobestanden'}
                                            </span>
                                        </li>
                                        <li className='flex items-center gap-2.5'>
                                            <Check className='w-4 h-4 text-amber shrink-0' />
                                            <span>
                                                {isEn ? 'Direct debits automatically retried upon failure' : 'Storneringen automatisch gedetecteerd & heraangeboden'}
                                            </span>
                                        </li>
                                        <li className='flex items-center gap-2.5'>
                                            <Check className='w-4 h-4 text-amber shrink-0' />
                                            <span>
                                                {isEn ? 'Integration with all major European banks' : 'Integratie met alle Nederlandse en Europese banken'}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className='lg:col-span-6 relative pt-4 pr-4 sm:pt-6 sm:pr-6'>
                                    <div className='absolute top-0 right-0 z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-amber-400 via-amber-500 to-orange-500 text-white flex flex-col items-center justify-center shadow-xl border-2 border-white pointer-events-none'>
                                        <span className='text-[9px] sm:text-[10px] font-bold tracking-widest uppercase opacity-95 leading-none mb-0.5'>
                                            APP
                                        </span>
                                        <span className='text-xl sm:text-2xl font-black leading-none'>
                                            01
                                        </span>
                                    </div>
                                    <div className='rounded-xl overflow-hidden shadow-2xl'>
                                        <Image
                                            src='/emlinked/apps/payment/tab01_SEPA-direct-debit-Incasso.jpg'
                                            alt='SEPA Direct Debit Incasso UI Preview'
                                            width={1200}
                                            height={675}
                                            className='w-full h-auto rounded-xl'
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'reconciliation' && (
                            <>
                                <div className='lg:col-span-6 space-y-6'>
                                    <h3 className='text-2xl sm:text-3xl font-bold text-white'>
                                        {doc?.features?.[1]?.title ||
                                            (isEn ? 'Real-time Bank Reconciliation via Direct Banking' : 'Realtime Bankreconciliatie via Direct Banking')}
                                    </h3>
                                    <p className='text-white/70 leading-relaxed text-base font-light'>
                                        {doc?.features?.[1]?.text ||
                                            (isEn
                                                ? 'Connect your bank account directly via Direct Banking or PSD2. Incoming rent payments are instantly matched against open invoices in your ledger.'
                                                : 'Koppel je bankrekening rechtstreeks via Direct Banking of PSD2. Inkomende betalingen worden op basis van kenmerk en bedrag direct gematcht met de openstaande posten in je boekhouding.')}
                                    </p>
                                    <ul className='space-y-2.5 text-sm text-white/80'>
                                        <li className='flex items-center gap-2.5'>
                                            <Check className='w-4 h-4 text-amber shrink-0' />
                                            <span>
                                                {isEn ? 'Direct Banking & CAMT.053 bank feeds imported automatically' : 'Direct Banking & CAMT.053 bankafschriften automatisch ingelezen'}
                                            </span>
                                        </li>
                                        <li className='flex items-center gap-2.5'>
                                            <Check className='w-4 h-4 text-amber shrink-0' />
                                            <span>
                                                {isEn ? '100% accurate matching engine per lease & tenant' : '100% accurate matche-engine op huurcontract en debiteurnummer'}
                                            </span>
                                        </li>
                                        <li className='flex items-center gap-2.5'>
                                            <Check className='w-4 h-4 text-amber shrink-0' />
                                            <span>
                                                {isEn ? 'Split payments across owners and management fees' : 'Split payments over eigenaren en beheervergoedingen'}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className='lg:col-span-6 relative pt-4 pr-4 sm:pt-6 sm:pr-6'>
                                    <div className='absolute top-0 right-0 z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-amber-400 via-amber-500 to-orange-500 text-white flex flex-col items-center justify-center shadow-xl border-2 border-white pointer-events-none'>
                                        <span className='text-[9px] sm:text-[10px] font-bold tracking-widest uppercase opacity-95 leading-none mb-0.5'>
                                            APP
                                        </span>
                                        <span className='text-xl sm:text-2xl font-black leading-none'>
                                            02
                                        </span>
                                    </div>
                                    <div className='rounded-xl overflow-hidden shadow-2xl'>
                                        <Image
                                            src='/emlinked/apps/payment/tab02_realtime-ankreconciliatie.jpg'
                                            alt='Realtime Bankreconciliatie UI Preview'
                                            width={1200}
                                            height={675}
                                            className='w-full h-auto rounded-xl'
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'dunning' && (
                            <>
                                <div className='lg:col-span-6 space-y-6'>
                                    <h3 className='text-2xl sm:text-3xl font-bold text-white'>
                                        {doc?.features?.[2]?.title ||
                                            (isEn ? 'Automated Credit Management & Dunning' : 'Geautomatiseerd Debiteurenbeheer')}
                                    </h3>
                                    <p className='text-white/70 leading-relaxed text-base font-light'>
                                        {doc?.features?.[2]?.text ||
                                            (isEn
                                                ? 'Prevent accumulating rent arrears. Configure flexible dunning workflows for automated email and SMS reminders when payments are overdue.'
                                                : 'Voorkom oplopende betalingsachterstanden. Stel flexibele herinneringsschema’s in voor automatische herinneringen per e-mail of SMS zodra een betalingstermijn verstrijkt.')}
                                    </p>
                                    <ul className='space-y-2.5 text-sm text-white/80'>
                                        <li className='flex items-center gap-2.5'>
                                            <Check className='w-4 h-4 text-amber shrink-0' />
                                            <span>
                                                {isEn ? 'Automated reminder & dunning flows via email / SMS' : 'Automatische herinneringen & aanmaningsflows per e-mail / SMS'}
                                            </span>
                                        </li>
                                        <li className='flex items-center gap-2.5'>
                                            <Check className='w-4 h-4 text-amber shrink-0' />
                                            <span>
                                                {isEn ? 'Clear accounts receivable aging reports per property' : 'Inzichtelijke debiteuren-aging rapportage per object'}
                                            </span>
                                        </li>
                                        <li className='flex items-center gap-2.5'>
                                            <Check className='w-4 h-4 text-amber shrink-0' />
                                            <span>
                                                {isEn ? 'Full audit trail in Business Central & tenant file' : 'Volledige audittrail in Business Central & huurdersdossier'}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className='lg:col-span-6 relative pt-4 pr-4 sm:pt-6 sm:pr-6'>
                                    <div className='absolute top-0 right-0 z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-amber-400 via-amber-500 to-orange-500 text-white flex flex-col items-center justify-center shadow-xl border-2 border-white pointer-events-none'>
                                        <span className='text-[9px] sm:text-[10px] font-bold tracking-widest uppercase opacity-95 leading-none mb-0.5'>
                                            APP
                                        </span>
                                        <span className='text-xl sm:text-2xl font-black leading-none'>
                                            03
                                        </span>
                                    </div>
                                    <div className='rounded-xl overflow-hidden shadow-2xl'>
                                        <Image
                                            src='/emlinked/apps/payment/tab03_storneer-aanmaningsbeheer.jpg'
                                            alt='Geautomatiseerd Debiteurenbeheer UI Preview'
                                            width={1200}
                                            height={675}
                                            className='w-full h-auto rounded-xl'
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* ── BLOCK 4: CALL TO ACTION BANNER ── */}
            <section className='py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] relative z-10'>
                <div className='mx-auto max-w-8xl px-0'>
                    <div className='border border-amber/30 rounded-3xl bg-texture-navy text-white p-6 sm:p-10 md:p-14 hover:shadow-[0_25px_60px_rgba(245,158,11,0.15)] transition-all duration-500 relative overflow-hidden group shadow-2xl backdrop-blur-xl'>
                        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10'>
                            <div className='lg:col-span-8 flex flex-col gap-5 text-left'>
                                <span className='inline-flex items-center gap-2 self-start rounded-full bg-amber/15 border border-amber/35 px-5 py-1.5 text-xs font-bold tracking-widest text-amber uppercase backdrop-blur-md'>
                                    <span className='w-1.5 h-1.5 bg-amber rounded-full animate-ping' />
                                    {ctaBlock?.tag || doc?.cta?.tag || (isEn ? 'REQUEST DEMO' : 'DEMO AANVRAGEN')}
                                </span>

                                <h2 className='font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight'>
                                    {ctaBlock?.title || doc?.cta?.title ||
                                        (isEn
                                            ? 'Ready to automate your rent collection and reconciliation?'
                                            : 'Klaar om je huurincasso en aflettering te automatiseren?')}
                                </h2>

                                <p className='text-white/75 text-base md:text-lg font-light leading-relaxed max-w-2xl'>
                                    {ctaBlock?.desc || doc?.cta?.desc ||
                                        (isEn
                                            ? 'Experience how our payment software speeds up credit management and processes bank reconciliation flawlessly in Business Central.'
                                            : 'Ervaar zelf hoe onze payment software je debiteurenbeheer versnelt en je bankaflettering foutloos verwerkt in Business Central.')}
                                </p>

                                <div className='flex flex-col sm:flex-row gap-4 pt-4'>
                                    <GlowingLink
                                        href='#demo'
                                        className='inline-flex h-14 items-center justify-center rounded-2xl border-0 bg-linear-to-r from-[#FF9500] via-[#FF5E00] to-[#FF3B00] hover:brightness-110 px-8 text-base font-bold text-white transition-all duration-200 shadow-lg shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98]'
                                    >
                                        <span className='flex items-center justify-center gap-2 text-white'>
                                            <span>
                                                {ctaBlock?.primaryButtonText || doc?.cta?.primary ||
                                                    (isEn ? 'Request Live Demo' : 'Live demo aanvragen')}
                                            </span>
                                            <ArrowRight className='h-5 w-5 text-white' />
                                        </span>
                                    </GlowingLink>

                                    <Link
                                        href={isEn ? '/en/apps' : '/apps'}
                                        className='inline-flex h-14 items-center justify-center rounded-2xl border border-white/20 hover:border-white/40 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98]'
                                    >
                                        <span>
                                            {isEn
                                                ? 'All Apps →'
                                                : 'Alle apps →'}
                                        </span>
                                    </Link>
                                </div>
                            </div>

                            <div className='lg:col-span-4 flex justify-start lg:justify-end'>
                                <Image
                                    src='/emlinked/apps/payment/automatiseren_payment.jpg'
                                    alt='Payment Software Illustratie'
                                    width={700}
                                    height={500}
                                    className='w-full h-[350px] max-h-[350px] object-cover object-center rounded-2xl group-hover:scale-105 transition-transform duration-500 shadow-xl'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
