'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
    const featureTabsBlock = pageBlocks.find((b: any) => b._type === 'featureTabsBlock');
    const comparisonBlock = pageBlocks.find((b: any) => b._type === 'comparisonBlock');
    const architectureBlock = pageBlocks.find((b: any) => b._type === 'architectureBlock');
    const ctaBlock = pageBlocks.find((b: any) => b._type === 'ctaBlock');

    const heroBadge = heroBlock?.badge || doc?.badge || (isEn ? 'MICROSOFT DYNAMICS 365 NATIVE' : 'CORE SAAS MODULE VOOR VASTGOEDMANAGEMENT');
    const heroTagline = heroBlock?.tagline || doc?.tagline || doc?.title;
    const heroDescription = heroBlock?.description || doc?.description;

    const explicitHeroPath = heroBlock?.imagePath || heroBlock?.heroImagePath || doc?.imagePath || doc?.heroImagePath;
    const heroImageUrl =
        explicitHeroPath ||
        getImageUrl(
            heroBlock?.image ||
                heroBlock?.heroImage ||
                doc?.image ||
                doc?.heroImage,
            '/emlinked/apps/vastgoedbeheer-software/geautomatiseerde-business-central.png',
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

    const [activeTab, setActiveTab] = useState<
        'indexation' | 'retail' | 'service'
    >('indexation');

    return (
        <>
            {/* Inject JSON-LD Structured Data for AIO / GEO / Search Engines */}
            {jsonLdData && (
                <script
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{ __html: jsonLdData }}
                />
            )}

            {/* ── BLOCK 1: HERO SECTION (Exact bg-texture-navy matching Frontpage & Apps) ── */}
            <section className='relative px-6 py-10 md:py-16 overflow-hidden bg-texture-navy text-white border-b border-white/10'>
                {/* DataGridCanvas Overlay matching Frontpage & Apps */}
                <DataGridCanvas className='pointer-events-none absolute inset-0 h-full w-full opacity-70 z-999' />

                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10'>
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
                        {/* Left Copy */}
                        <div className='lg:col-span-7 flex flex-col gap-6 text-left'>
                            {/* Pill Badge dynamically bound to Sanity doc.badge */}
                            <span className='inline-flex items-center gap-3.5 self-start rounded-full bg-amber/15 border border-amber/35 px-4.5 py-1 text-xs font-bold tracking-wide text-amber'>
                                <span className='w-1.5 h-1.5 bg-amber rounded-full animate-ping'></span>
                                {heroBadge}
                            </span>
                            {/* H1 Title dynamically bound to Sanity */}
                            <h1 className='font-display font-bold tracking-tight text-white leading-[1.1] text-3xl sm:text-4xl lg:text-[2.75rem] text-balance'>
                                {heroTagline ? (
                                    formatHeroTitle(heroTagline)
                                ) : (
                                    <>
                                        Professionele{' '}
                                        <span className='text-amber bg-linear-to-r from-amber via-amber-light to-amber bg-clip-text font-extrabold'>
                                            vastgoedbeheer software
                                        </span>{' '}
                                        voor je complete portefeuille
                                    </>
                                )}
                            </h1>
                            {/* Subtitle dynamically bound to Sanity */}
                            <p className='text-lg md:text-xl text-white/70 leading-relaxed font-light max-w-2xl'>
                                {heroDescription || (
                                    <>
                                        Schaal je vastgoedoperatie zonder
                                        administratieve chaos. Onze{' '}
                                        <strong className='text-white font-medium'>
                                            vastgoedbeheer software
                                        </strong>{' '}
                                        automatiseert je huurovereenkomsten,
                                        periodieke{' '}
                                        <strong className='text-amber font-medium'>
                                            CPI-indexaties
                                        </strong>
                                        , wisselende winkelmetrages en
                                        servicekostenafrekeningen native binnen{' '}
                                        <strong className='text-white font-medium'>
                                            Microsoft Dynamics 365 Business
                                            Central
                                        </strong>
                                        . Speciaal ontwikkeld voor portefeuilles
                                        vanaf 50 verhuureenheden.
                                    </>
                                )}
                            </p>

                            {/* Primary & Secondary Action Buttons */}
                            <div className='flex flex-col sm:flex-row gap-4 mt-2'>
                                <GlowingLink
                                    href={heroBlock?.primaryCtaUrl || heroBlock?.ctaLink || '#demo'}
                                    className='inline-flex h-14 items-center justify-center rounded-2xl border-0 bg-linear-to-r from-[#FF9500] via-[#FF5E00] to-[#FF3B00] hover:brightness-110 px-8 text-base font-bold text-white transition-all duration-200 shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98]'
                                >
                                    <span className='flex items-center justify-center gap-2 text-white'>
                                        <span>
                                            {heroBlock?.primaryCtaLabel || heroBlock?.ctaLabel || (isEn ? 'Request a free live demo' : 'Gratis live demo aanvragen')}
                                        </span>
                                        <ArrowRight className='w-5 h-5 text-white' />
                                    </span>
                                </GlowingLink>

                                <Link
                                    href={heroBlock?.secondaryCtaUrl || heroBlock?.secondaryCtaLink || '/box3-check'}
                                    className='inline-flex h-14 items-center justify-center rounded-2xl border border-white/20 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 transition-all text-center shadow-sm hover:scale-[1.02] active:scale-[0.98] duration-200'
                                >
                                    {heroBlock?.secondaryCtaLabel || (isEn ? 'Check Box 3 impact' : 'Bereken je Box 3-impact')}
                                    <span className='ml-2 w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform'>
                                        ⚡
                                    </span>
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

                        {/* Right Column: High-Tech Graphic Card with Mockup Header & Metric Footer */}
                        <div className='lg:col-span-5 hover:scale-[1.01] transition-transform duration-300 flex justify-center items-center relative'>
                            <BorderBeam
                                size='md'
                                colorVariant='orange'
                                strength={1.2}
                                className='w-full'
                            >
                                <div className='relative w-full rounded-2xl bg-slate-950/90 backdrop-blur-xl shadow-2xl group overflow-hidden border border-white/15'>
                                    <div className='absolute -inset-1 bg-linear-to-r from-amber/30 via-indigo-500/20 to-amber/30 blur-xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none' />

                                    {/* Mockup Top Navigation Header */}
                                    <div className='relative z-10 flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-slate-950/90 text-xs text-white/70 font-mono'>
                                        <div className='flex items-center gap-2'>
                                            <div className='w-3 h-3 rounded-full bg-rose-500' />
                                            <div className='w-3 h-3 rounded-full bg-amber' />
                                            <div className='w-3 h-3 rounded-full bg-emerald-500' />
                                            <span className='ml-2 text-[11px] text-white/80 font-bold'>
                                                emlinked_core_v4.2
                                            </span>
                                        </div>
                                        <div className='inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] border border-emerald-500/40'>
                                            <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping' />
                                            <span>100% Synced BC</span>
                                        </div>
                                    </div>

                                    {/* Taller Showcase Image Container */}
                                    <div className='relative aspect-[1.08] w-full overflow-hidden bg-slate-950 flex flex-col justify-center items-center'>
                                        <Image
                                            src={heroImageUrl}
                                            alt={heroBlock?.title || 'Emlinked Core Vastgoedbeheer Software'}
                                            width={1200}
                                            height={1300}
                                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                                            priority
                                        />

                                        {/* Bottom Metric Badges Footer */}
                                        <div className='absolute bottom-3 left-3 right-3 grid grid-cols-3 gap-2 backdrop-blur-md bg-slate-950/90 p-3 rounded-xl border border-white/15 shadow-xl z-20'>
                                            <div>
                                                <div className='text-[10px] uppercase text-white/50 font-mono'>
                                                    Portefeuille
                                                </div>
                                                <div className='text-xs sm:text-sm font-bold text-white'>
                                                    142 Eenheden
                                                </div>
                                            </div>
                                            <div>
                                                <div className='text-[10px] uppercase text-white/50 font-mono'>
                                                    CPI Indexatie
                                                </div>
                                                <div className='text-xs sm:text-sm font-bold text-amber'>
                                                    +3.8% (CBS)
                                                </div>
                                            </div>
                                            <div>
                                                <div className='text-[10px] uppercase text-white/50 font-mono'>
                                                    ERP Status
                                                </div>
                                                <div className='text-xs sm:text-sm font-bold text-emerald-400'>
                                                    Realtime
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </BorderBeam>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Signals (Single Full-Width Line) */}
            <section className='bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] animate-none dark:text-[#060e32] dark:bg-navy-dark border-b border-gray-200 dark:border-white/5 py-2 px-6 md:px-10 shadow-sm'>
                <div className='max-w-7xl mx-auto flex items-center justify-center gap-9 flex-wrap'>
                    <div className='flex items-center gap-2 text-xs font-mono font-semibold text-darkBlue/75 dark:text-white/90 hover:text-amber dark:hover:text-amber transition-colors tracking-wide'>
                        <CheckCircle2 className='w-4 h-4 shrink-0' />
                        <span>Portefeuilles &gt; 50 verhuureenheden</span>
                    </div>
                    <div className='flex items-center gap-2 text-xs font-mono font-semibold text-darkBlue/75 dark:text-white/90 hover:text-amber dark:hover:text-amber transition-colors tracking-wide'>
                        <CheckCircle2 className='w-4 h-4 shrink-0' />
                        <span>100% Business Central Native</span>
                    </div>
                    <div className='flex items-center gap-2 text-xs font-mono font-semibold text-darkBlue/75 dark:text-white/90 hover:text-amber dark:hover:text-amber transition-colors tracking-wide'>
                        <CheckCircle2 className='w-4 h-4 shrink-0' />
                        <span>Geen schaduwbestanden</span>
                    </div>
                </div>
            </section>

            {/* ── BLOCK 2: OPERATIONAL BOTTLENECKS (Light Warm Cream Background matching Frontpage & Apps) ── */}
            <section className='px-6 py-20 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] text-[#060e32] border-b border-amber/10 relative z-10'>
                <div className='max-w-7xl mx-auto space-y-16'>
                    {/* Header */}
                    <div className='text-center max-w-3xl mx-auto space-y-4'>
                        <div className='flex justify-center mb-1'>
                            <div className='inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/15 px-4.5 py-1 text-xs font-bold tracking-wide text-amber uppercase backdrop-blur-md'>
                                <span className='w-1.5 h-1.5 bg-amber rounded-full animate-ping' />
                                <span>
                                    {comparisonBlock?.badge || (isEn ? 'NO MORE MANUAL WORK' : 'GEEN HANDMATIG WERK MEER')}
                                </span>
                            </div>
                        </div>

                        <h2 className='font-display text-3xl md:text-4xl lg:text-[2.5rem]/12 font-bold tracking-tight text-[#060e32]'>
                            {comparisonBlock?.title || (isEn
                                ? 'Why traditional real estate management software falls short'
                                : 'Waarom traditionele vastgoed administratie software tekortschiet')}
                        </h2>

                        <p className='text-[#060e32]/75 text-base md:text-lg leading-relaxed font-light'>
                            {comparisonBlock?.desc || (isEn
                                ? 'Many property managers waste precious hours weekly manually syncing property data with accounting ledgers. Emlinked bridges the gap between daily operations and your GL.'
                                : 'Veel beheerders verliezen wekelijks kostbare uren aan het handmatig synchroniseren van vastgoedgegevens met hun financiële administratie. Emlinked sluit het gat tussen de dagelijkse operatie en je grootboek.')}
                        </p>
                    </div>
                    {/* Side-by-Side Comparison Matrix */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch'>
                        {/* Left Card: Legacy Pain */}
                        <div className='relative rounded-2xl border border-black/20 bg-white p-8 space-y-6 shadow-xs flex flex-col justify-between'>
                            <CardBadge
                                imageSrc='/emlinked/apps/vastgoedbeheer-software/traditionele_vastgoedsoftware.jpg'
                                alt='Traditionele Vastgoedsoftware'
                                isLegacy={true}
                            />

                            <div className='space-y-6'>
                                <div className='border-b border-black/10 pb-4 pr-16'>
                                    <h3 className='text-lg font-bold text-amber'>
                                        {comparisonBlock?.leftTitle || (isEn ? 'TRADITIONAL PROPERTY SOFTWARE' : 'TRADITIONELE VASTGOEDSOFTWARE')}
                                    </h3>
                                </div>

                                <ul className='space-y-4 text-sm text-[#060e32]/80'>
                                    {(comparisonBlock?.leftItems && comparisonBlock.leftItems.length > 0) ? (
                                        comparisonBlock.leftItems.map((item: any, idx: number) => (
                                            <li key={idx} className='flex items-start gap-3'>
                                                <XCircle className='w-5 h-5 text-amber shrink-0 mt-0.5' />
                                                <div className='space-y-0.5'>
                                                    <strong className='text-[#060e32] block font-semibold text-sm'>
                                                        {item.title}
                                                    </strong>
                                                    <span className='text-slate-600 text-xs leading-relaxed block'>
                                                        {item.desc}
                                                    </span>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <>
                                            <li className='flex items-start gap-3'>
                                                <XCircle className='w-5 h-5 text-amber shrink-0 mt-0.5' />
                                                <div className='space-y-0.5'>
                                                    <strong className='text-[#060e32] block font-semibold text-sm'>
                                                        {isEn ? 'Manual Excel indexation imports' : 'Handmatige Excel-imports voor indexaties'}
                                                    </strong>
                                                    <span className='text-slate-600 text-xs leading-relaxed block'>
                                                        {isEn ? 'Error-prone copy-pasting of index numbers and contract lines.' : 'Foutgevoelig knippen en plakken van CBS-indexcijfers en contractregels op de 1e van de maand.'}
                                                    </span>
                                                </div>
                                            </li>
                                            <li className='flex items-start gap-3'>
                                                <XCircle className='w-5 h-5 text-amber shrink-0 mt-0.5' />
                                                <div className='space-y-0.5'>
                                                    <strong className='text-[#060e32] block font-semibold text-sm'>
                                                        {isEn ? 'API sync errors between tools and ERP' : 'API-fouten tussen losse tools en ERP'}
                                                    </strong>
                                                    <span className='text-slate-600 text-xs leading-relaxed block'>
                                                        {isEn ? 'External sync channels stall regularly, resulting in missing ledger entries.' : 'Externe synchronisatiekanalen vallen regelmatig stil, met ontbrekende debiteurenposten als gevolg.'}
                                                    </span>
                                                </div>
                                            </li>
                                            <li className='flex items-start gap-3'>
                                                <XCircle className='w-5 h-5 text-amber shrink-0 mt-0.5' />
                                                <div className='space-y-0.5'>
                                                    <strong className='text-[#060e32] block font-semibold text-sm'>
                                                        {isEn ? 'Delayed financial reporting' : 'Vertraagde financiële rapportages'}
                                                    </strong>
                                                    <span className='text-slate-600 text-xs leading-relaxed block'>
                                                        {isEn ? 'Yield and vacancy reports must be manually consolidated.' : 'Rapportages over leegstand en bruto/netto rendementen moeten handmatig worden geconsolideerd.'}
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
                                imageSrc='/emlinked/apps/vastgoedbeheer-software/native_vastgoedsoftware.jpg'
                                alt='Emlinked Native Vastgoedsoftware'
                                isLegacy={false}
                            />

                            <div className='space-y-6'>
                                <div className='border-b border-black/10 pb-4 pr-16'>
                                    <h3 className='text-lg font-bold text-amber'>
                                        {comparisonBlock?.rightTitle || (isEn ? 'EMLINKED NATIVE DYNAMICS MODULE' : 'EMLINKED NATIVE DYNAMICS MODULE')}
                                    </h3>
                                </div>

                                <ul className='space-y-4 text-sm text-[#060e32]'>
                                    {(comparisonBlock?.rightItems && comparisonBlock.rightItems.length > 0) ? (
                                        comparisonBlock.rightItems.map((item: any, idx: number) => (
                                            <li key={idx} className='flex items-start gap-3'>
                                                <CheckCircle2 className='w-5 h-5 text-amber shrink-0 mt-0.5' />
                                                <div className='space-y-0.5'>
                                                    <strong className='text-[#060e32] block font-semibold text-sm'>
                                                        {item.title}
                                                    </strong>
                                                    <span className='text-slate-600 text-xs leading-relaxed block'>
                                                        {item.desc}
                                                    </span>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <>
                                            <li className='flex items-start gap-3'>
                                                <CheckCircle2 className='w-5 h-5 text-amber shrink-0 mt-0.5' />
                                                <div className='space-y-0.5'>
                                                    <strong className='text-[#060e32] block font-semibold text-sm'>
                                                        {isEn ? 'Automated CPI indexations & rent invoicing' : 'Automatische CPI-indexatie & huurprolongatie'}
                                                    </strong>
                                                    <span className='text-slate-600 text-xs leading-relaxed block'>
                                                        {isEn ? 'Indexation data calculated and posted directly to lease contracts.' : 'CBS-data wordt automatisch ingelezen en rechtstreeks toegepast op je huurovereenkomsten.'}
                                                    </span>
                                                </div>
                                            </li>
                                            <li className='flex items-start gap-3'>
                                                <CheckCircle2 className='w-5 h-5 text-amber shrink-0 mt-0.5' />
                                                <div className='space-y-0.5'>
                                                    <strong className='text-[#060e32] block font-semibold text-sm'>
                                                        {isEn ? '100% Native Business Central processing' : '100% native verwerking in Business Central'}
                                                    </strong>
                                                    <span className='text-slate-600 text-xs leading-relaxed block'>
                                                        {isEn ? 'Zero external API sync scripts; journal entries post natively in your ERP.' : 'Geen externe koppelingen; journaalposten en facturen ontstaan direct in de ERP-database.'}
                                                    </span>
                                                </div>
                                            </li>
                                            <li className='flex items-start gap-3'>
                                                <CheckCircle2 className='w-5 h-5 text-amber shrink-0 mt-0.5' />
                                                <div className='space-y-0.5'>
                                                    <strong className='text-[#060e32] block font-semibold text-sm'>
                                                        {isEn ? 'Real-time portfolio visibility' : 'Realtime inzicht in je totale portefeuille'}
                                                    </strong>
                                                    <span className='text-slate-600 text-xs leading-relaxed block'>
                                                        {isEn ? 'Executive dashboards for controllers and directors at the click of a button.' : 'Executive dashboards voor controllers en vastgoeddirecties met één druk op de knop.'}
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

            {/* ── BLOCK 3: KEY MODULE FEATURES (Light Mode Canvas matching Frontpage & Apps) ── */}
            <section className='py-20 px-6 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] text-[#060e32] border-b border-amber/10 relative overflow-hidden'>
                <div className='max-w-7xl mx-auto space-y-8 relative z-10'>
                    {/* Header */}
                    <div className='text-center max-w-3xl mx-auto space-y-4 flex flex-col items-center'>
                        <span className='inline-flex items-center justify-center rounded-full border border-amber/40 bg-amber/15 px-6 py-1.5 text-xs font-mono font-bold tracking-widest text-amber uppercase backdrop-blur-md shadow-xs'>
                            FUNCTIONALITEITEN
                        </span>
                        <h2 className='font-display text-3xl md:text-4xl lg:text-[2.5rem]/12 font-bold tracking-tight text-[#060e32]'>
                            Krachtige functionaliteiten voor modern{' '}
                            <span className='text-amber'>vastgoedbeheer</span>
                        </h2>
                        <p className='text-[#060e32]/75 text-base md:text-lg font-light'>
                            Ontwikkeld om ingewikkelde contractvormen,
                            retailketen-metrages en corporatie-afrekeningen
                            moeiteloos te stroomlijnen.
                        </p>
                    </div>

                    {/* Feature Tabs */}
                    <div className='flex justify-center border-b border-black/10 gap-2 sm:gap-4 overflow-x-auto pb-px'>
                        <button
                            onClick={() => setActiveTab('indexation')}
                            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                                activeTab === 'indexation'
                                    ? 'border-amber text-amber bg-amber/15 rounded-t-lg'
                                    : 'border-transparent text-[#060e32]/60 hover:text-[#060e32]'
                            }`}
                        >
                            <Zap className='w-4 h-4' />
                            <span>1. CPI-Indexaties & Contracten</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('retail')}
                            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                                activeTab === 'retail'
                                    ? 'border-amber text-amber bg-amber/15 rounded-t-lg'
                                    : 'border-transparent text-[#060e32]/60 hover:text-[#060e32]'
                            }`}
                        >
                            <Building2 className='w-4 h-4' />
                            <span>2. Dynamisch Metrage & Retail</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('service')}
                            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                                activeTab === 'service'
                                    ? 'border-amber text-amber bg-amber/15 rounded-t-lg'
                                    : 'border-transparent text-[#060e32]/60 hover:text-[#060e32]'
                            }`}
                        >
                            <BarChart3 className='w-4 h-4' />
                            <span>3. Servicekosten & Subsidies</span>
                        </button>
                    </div>

                    {/* Tab Content (Direct Grid Layout with Top-Right Image Badge) */}
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'>
                        {activeTab === 'indexation' && (
                            <>
                                <div className='lg:col-span-6 space-y-6'>
                                    <h3 className='text-2xl sm:text-3xl font-bold text-[#060e32]'>
                                        {doc?.features?.[0]?.title ||
                                            'Geautomatiseerde CPI-Indexaties & Contractbeheer'}
                                    </h3>
                                    <p className='text-[#060e32]/80 leading-relaxed text-base font-light'>
                                        {doc?.features?.[0]?.text || (
                                            <>
                                                Vergeet handmatige berekeningen
                                                op de eerste van de maand. Onze{' '}
                                                <strong className='text-[#060e32] font-semibold'>
                                                    software voor vastgoedbeheer
                                                </strong>{' '}
                                                haalt automatisch de nieuwste
                                                CBS CPI-indexcijfers op,
                                                berekent de nieuwe huursommen en
                                                past deze direct toe op al je
                                                lopende huurovereenkomsten.
                                            </>
                                        )}
                                    </p>
                                    <ul className='space-y-2.5 text-sm text-[#060e32]/85'>
                                        <li className='flex items-center gap-2.5'>
                                            <Check className='w-4 h-4 text-amber shrink-0' />
                                            <span>
                                                Automatische indexatiebrieven
                                                per mail & portaal
                                            </span>
                                        </li>
                                        <li className='flex items-center gap-2.5'>
                                            <Check className='w-4 h-4 text-amber shrink-0' />
                                            <span>
                                                Ondersteuning voor CBS CPI alle
                                                huishoudens & deellijsten
                                            </span>
                                        </li>
                                        <li className='flex items-center gap-2.5'>
                                            <Check className='w-4 h-4 text-amber shrink-0' />
                                            <span>
                                                Audittrail per huurcontract
                                                direct in Business Central
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className='lg:col-span-6 relative pt-4 pr-4 sm:pt-6 sm:pr-6'>
                                    {/* Circular Top-Right Floating Badge */}
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
                                            src='/emlinked/apps/vastgoedbeheer-software/tab01-indexaties.jpg'
                                            alt='CPI Indexatie log UI card preview'
                                            width={1200}
                                            height={675}
                                            className='w-full h-auto rounded-lg border border-white/10'
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'retail' && (
                            <>
                                <div className='lg:col-span-6 space-y-6'>
                                    <h3 className='text-2xl sm:text-3xl font-bold text-[#060e32]'>
                                        {doc?.features?.[1]?.title ||
                                            'Dynamisch Metrage- & Retailbeheer'}
                                    </h3>
                                    <p className='text-[#060e32]/80 leading-relaxed text-base font-light'>
                                        {doc?.features?.[1]?.text || (
                                            <>
                                                Speciaal ingericht voor de
                                                uitdagingen van retailketens en
                                                commercieel vastgoed. Beheer
                                                wisselende winkelindelingen,
                                                verschillende metrage-types,
                                                omzethuurafspraken en
                                                locatiespecifieke
                                                onderhoudscontracten centraal in
                                                één dashboard.
                                            </>
                                        )}
                                    </p>
                                    <ul className='space-y-2.5 text-sm text-[#060e32]/85'>
                                        <li className='flex items-center gap-2.5'>
                                            <Check className='w-4 h-4 text-amber shrink-0' />
                                            <span>
                                                Flexibele splitsing en
                                                samenvoeging van verhuurbare
                                                eenheden (VVO / BVO)
                                            </span>
                                        </li>
                                        <li className='flex items-center gap-2.5'>
                                            <Check className='w-4 h-4 text-amber shrink-0' />
                                            <span>
                                                Omzethuurberekeningen met
                                                drempels en staffels
                                            </span>
                                        </li>
                                        <li className='flex items-center gap-2.5'>
                                            <Check className='w-4 h-4 text-amber shrink-0' />
                                            <span>
                                                Beheer van winkeliersvereniging
                                                bijdragen & promotiefondsen
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className='lg:col-span-6 relative pt-4 pr-4 sm:pt-6 sm:pr-6'>
                                    {/* Circular Top-Right Floating Badge */}
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
                                            src='/emlinked/apps/vastgoedbeheer-software/tab02-dynamisch.jpg'
                                            alt='Retail Metrage en Unit Indeling Blueprint UI'
                                            width={1200}
                                            height={675}
                                            className='w-full h-auto rounded-lg border border-white/10'
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'service' && (
                            <>
                                <div className='lg:col-span-6 space-y-6'>
                                    <h3 className='text-2xl sm:text-3xl font-bold text-[#060e32]'>
                                        {doc?.features?.[2]?.title ||
                                            'Servicekosten & Subsidieafrekeningen'}
                                    </h3>
                                    <p className='text-[#060e32]/80 leading-relaxed text-base font-light'>
                                        {doc?.features?.[2]?.text || (
                                            <>
                                                Bepaal, voorschot en verreken
                                                servicekosten transparant voor
                                                je huurders of woningcorporatie.
                                                Alle voorschotten en werkelijke
                                                gemaakte kosten worden direct
                                                gematcht met inkoopfacturen via
                                                Document Capture.
                                            </>
                                        )}
                                    </p>
                                    <ul className='space-y-2.5 text-sm text-[#060e32]/85'>
                                        <li className='flex items-center gap-2.5'>
                                            <Check className='w-4 h-4 text-amber shrink-0' />
                                            <span>
                                                Nauwkeurige
                                                kostenverdeelsleutels per m²,
                                                gewogen aandeel of vast bedrag
                                            </span>
                                        </li>
                                        <li className='flex items-center gap-2.5'>
                                            <Check className='w-4 h-4 text-amber shrink-0' />
                                            <span>
                                                Automatische koppeling met
                                                inkooporders & Continia OCR
                                                Document Capture
                                            </span>
                                        </li>
                                        <li className='flex items-center gap-2.5'>
                                            <Check className='w-4 h-4 text-amber shrink-0' />
                                            <span>
                                                Wet-compliant
                                                afrekeningsoverzichten klaar
                                                voor verzending
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className='lg:col-span-6 relative pt-4 pr-4 sm:pt-6 sm:pr-6'>
                                    {/* Circular Top-Right Floating Badge */}
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
                                            src='/emlinked/apps/vastgoedbeheer-software/tab03_servicekosten.jpg'
                                            alt='Service Charge Distribution Chart UI'
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

            {/* ── BLOCK 4: NATIVE BUSINESS CENTRAL INTEGRATION (Dark Section - Matching Screenshot Layout) ── */}
            <section className='px-6 py-24 bg-texture-navy text-white border-b border-white/10 relative overflow-hidden'>
                <div className='max-w-7xl mx-auto relative z-10'>
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
                        {/* Left Column: Copy & Bullets */}
                        <div className='lg:col-span-6 flex flex-col gap-6 text-left'>
                            <span className='inline-flex items-center justify-center self-start rounded-full border border-amber/50 bg-[#251b14]/90 px-5 py-1.5 text-xs font-mono font-bold tracking-widest text-amber uppercase backdrop-blur-md shadow-md'>
                                MICROSOFT BUSINESS CENTRAL INTEGRATIE
                            </span>

                            <h2 className='font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight'>
                                100% Realtime controle en automatische
                                aflettering
                            </h2>

                            <p className='text-white/75 text-base md:text-lg font-light leading-relaxed'>
                                Beheer al je vastgoedprocessen native in
                                Microsoft Dynamics 365 Business Central zonder
                                vertraging of risico van schaduwbestanden.
                            </p>

                            <div className='space-y-4 pt-2'>
                                <div className='flex items-start gap-3.5'>
                                    <div className='w-6 h-6 rounded-full border border-amber/60 bg-amber/15 flex items-center justify-center shrink-0 mt-0.5 shadow-sm'>
                                        <Check className='w-3.5 h-3.5 text-amber' />
                                    </div>
                                    <div className='text-sm text-white/80 leading-relaxed'>
                                        <strong className='text-white font-semibold'>
                                            Één centrale bron van waarheid:
                                        </strong>{' '}
                                        Geen losse databases, Excel-sheets of
                                        gevaarlijke API-koppelingen.
                                    </div>
                                </div>

                                <div className='flex items-start gap-3.5'>
                                    <div className='w-6 h-6 rounded-full border border-amber/60 bg-amber/15 flex items-center justify-center shrink-0 mt-0.5 shadow-sm'>
                                        <Check className='w-3.5 h-3.5 text-amber' />
                                    </div>
                                    <div className='text-sm text-white/80 leading-relaxed'>
                                        <strong className='text-white font-semibold'>
                                            Nul dubbele invoer:
                                        </strong>{' '}
                                        Huurovereenkomsten, indexaties en
                                        facturen landen direct als gevalideerde
                                        journaalposten in je grootboek.
                                    </div>
                                </div>

                                <div className='flex items-start gap-3.5'>
                                    <div className='w-6 h-6 rounded-full border border-amber/60 bg-amber/15 flex items-center justify-center shrink-0 mt-0.5 shadow-sm'>
                                        <Check className='w-3.5 h-3.5 text-amber' />
                                    </div>
                                    <div className='text-sm text-white/80 leading-relaxed'>
                                        <strong className='text-white font-semibold'>
                                            100% Realtime data-integriteit:
                                        </strong>{' '}
                                        Direct betrouwbaar inzicht voor
                                        accountant, directie en beheerteam.
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Requested Image Asset */}
                        <div className='lg:col-span-6 flex justify-center lg:justify-end'>
                            <div className='relative w-full rounded-2xl overflow-hidden border border-amber/30 shadow-2xl group bg-slate-950'>
                                <Image
                                    src='/emlinked/apps/vastgoedbeheer-software/native-dynamics-365.jpg'
                                    alt='Microsoft Business Central Integratie: 100% Realtime controle'
                                    width={1200}
                                    height={800}
                                    className='w-full h-auto object-cover rounded-2xl group-hover:scale-[1.01] transition-transform duration-500'
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── BLOCK 5: CALL TO ACTION BANNER (Exact Homepage Layout & Image Parity) ── */}
            <section className='py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] relative z-10'>
                <div className='mx-auto max-w-8xl px-0'>
                    <div className='border border-amber/30 rounded-3xl bg-texture-navy text-white p-6 sm:p-10 md:p-14 hover:shadow-[0_25px_60px_rgba(245,158,11,0.15)] transition-all duration-500 relative overflow-hidden group shadow-2xl backdrop-blur-xl'>
                        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10'>
                            {/* Left Column: Copy & Action Triggers */}
                            <div className='lg:col-span-8 flex flex-col gap-5 text-left'>
                                <span className='inline-flex items-center gap-2 self-start rounded-full bg-amber/15 border border-amber/35 px-5 py-1.5 text-xs font-bold tracking-widest text-amber uppercase backdrop-blur-md'>
                                    <span className='w-1.5 h-1.5 bg-amber rounded-full animate-ping' />
                                    {ctaBlock?.tag || doc?.cta?.tag || (isEn ? 'START AUTOMATING TODAY' : 'START MET AUTOMATISEREN')}
                                </span>

                                <h2 className='font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight'>
                                    {ctaBlock?.title || doc?.cta?.title ||
                                        (isEn
                                            ? 'Ready to modernize your real estate management software?'
                                            : 'Klaar om je vastgoedbeheer software te moderniseren?')}
                                </h2>

                                <p className='text-white/80 leading-relaxed font-light text-base md:text-lg max-w-2xl'>
                                    {ctaBlock?.desc || doc?.cta?.desc ||
                                        (isEn
                                            ? 'Experience how emlinked modular apps cut administrative burden in half and maximize financial control.'
                                            : 'Ervaar zelf hoe de modulaire apps van Emlinked je administratieve lasten halveren en je financiële controle vergroten.')}
                                </p>

                                {/* Primary & Secondary Action Buttons */}
                                <div className='flex flex-col sm:flex-row gap-4 pt-2'>
                                    <GlowingLink
                                        href='#demo'
                                        className='inline-flex h-14 items-center justify-center rounded-2xl border-0 bg-linear-to-r from-[#FF9500] via-[#FF5E00] to-[#FF3B00] hover:brightness-110 px-8 text-base font-bold text-white transition-all duration-200 shadow-lg shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98]'
                                    >
                                        <span className='flex items-center justify-center gap-2 text-white'>
                                            <span>
                                                {ctaBlock?.primaryButtonText || doc?.cta?.primary ||
                                                    (isEn ? 'Request a free live demo' : 'Gratis live demo aanvragen')}
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

                            {/* Right Column: Exact Homepage Illustration Image */}
                            <div className='lg:col-span-4 flex justify-start lg:justify-end'>
                                <Image
                                    src='/emlinked/apps/vastgoedbeheer-software/automatiseren_vastgoedbehher.jpg'
                                    alt={
                                        doc?.cta?.title ||
                                        'Klaar om je vastgoedbeheer software te moderniseren?'
                                    }
                                    width={700}
                                    height={500}
                                    className='w-full h-[350px] max-h-[350px] object-cover object-center rounded-2xl group-hover:scale-105 transition-transform duration-500 shadow-xl'
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
