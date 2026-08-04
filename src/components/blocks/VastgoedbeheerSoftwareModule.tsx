'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Zap,
    FileText,
    BarChart3,
    CheckCircle2,
    XCircle,
    ArrowRight,
    Building2,
    ShieldCheck,
    Database,
    Sparkles,
    Check,
    Cpu,
    ArrowUpRight,
} from 'lucide-react';
import { GlowingLink } from '@/components/ui/GlowingButton';
import { DataGridCanvas } from '@/components/ui/data-grid-canvas';

interface VastgoedbeheerSoftwareModuleProps {
    doc?: any;
    locale?: string;
}

export function VastgoedbeheerSoftwareModule({
    doc,
    locale = 'nl',
}: VastgoedbeheerSoftwareModuleProps) {
    const isEn = locale === 'en';

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
                      '@id': 'https://emlinked.nl/vastgoedbeheer-software#webpage',
                      url: 'https://emlinked.nl/vastgoedbeheer-software',
                      name: 'Vastgoedbeheer Software — Automatiseer uw Portefeuillebeheer | Emlinked',
                      description:
                          'Geavanceerde vastgoedbeheer software voor beheerders, retailketens en woningcorporaties. Volledig geautomatiseerd en native gekoppeld aan Business Central.',
                      inLanguage: 'nl-NL',
                      isPartOf: {
                          '@type': 'WebSite',
                          '@id': 'https://emlinked.nl/#website',
                      },
                  },
                  {
                      '@type': 'BreadcrumbList',
                      '@id': 'https://emlinked.nl/vastgoedbeheer-software#breadcrumb',
                      itemListElement: [
                          {
                              '@type': 'ListItem',
                              position: 1,
                              name: 'Home',
                              item: 'https://emlinked.nl',
                          },
                          {
                              '@type': 'ListItem',
                              position: 2,
                              name: 'Onze apps',
                              item: 'https://emlinked.nl/apps',
                          },
                          {
                              '@type': 'ListItem',
                              position: 3,
                              name: 'Vastgoedbeheer software',
                              item: 'https://emlinked.nl/vastgoedbeheer-software',
                          },
                      ],
                  },
                  {
                      '@type': 'SoftwareApplication',
                      '@id': 'https://emlinked.nl/vastgoedbeheer-software#software',
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
                          url: 'https://emlinked.nl',
                      },
                  },
              ],
          });

    const [activeTab, setActiveTab] = useState<
        'indexation' | 'retail' | 'service'
    >('indexation');

    return (
        <div className='flex flex-col min-h-screen bg-[#060e32] text-white selection:bg-amber/30 selection:text-amber'>
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

                {/* Ambient Radial Glows */}
                <div className='absolute top-0 right-1/4 w-[600px] h-[600px] bg-amber/10 blur-3xl pointer-events-none rounded-full opacity-70' />

                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10'>
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
                        {/* Left Copy */}
                        <div className='lg:col-span-7 flex flex-col gap-6 text-left'>
                            {/* Pill Badge dynamically bound to Sanity doc.badge */}
                            <span className='inline-flex items-center gap-3.5 self-start rounded-full bg-amber/15 border border-amber/35 px-4.5 py-1 text-xs font-bold tracking-wide text-amber'>
                                <span className='w-1.5 h-1.5 bg-amber rounded-full animate-ping'></span>
                                {doc?.badge ||
                                    'CORE SAAS MODULE VOOR VASTGOEDMANAGEMENT'}
                            </span>

                            {/* H1 Title dynamically bound to Sanity doc.tagline */}
                            <h1 className='font-display font-bold tracking-tight text-white leading-[1.1] text-3xl sm:text-4xl lg:text-[2.75rem] text-balance'>
                                {doc?.tagline || doc?.title || (
                                    <>
                                        Professionele{' '}
                                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-amber via-amber-light to-amber font-extrabold'>
                                            vastgoedbeheer software
                                        </span>{' '}
                                        voor uw complete portefeuille
                                    </>
                                )}
                            </h1>

                            {/* Subtitle dynamically bound to Sanity doc.description */}
                            <p className='text-lg md:text-xl text-white/70 leading-relaxed font-light max-w-2xl'>
                                {doc?.description || (
                                    <>
                                        Schaal uw vastgoedoperatie zonder
                                        administratieve chaos. Onze{' '}
                                        <strong className='text-white font-medium'>
                                            vastgoedbeheer software
                                        </strong>{' '}
                                        automatiseert uw huurovereenkomsten, periodieke{' '}
                                        <strong className='text-amber font-medium'>
                                            CPI-indexaties
                                        </strong>
                                        , wisselende winkelmetrages en
                                        servicekostenafrekeningen native binnen{' '}
                                        <strong className='text-white font-medium'>
                                            Microsoft Dynamics 365 Business Central
                                        </strong>
                                        . Speciaal ontwikkeld voor portefeuilles vanaf
                                        50 verhuureenheden.
                                    </>
                                )}
                            </p>

                            {/* Primary & Secondary Action Buttons (Equal Height h-14) */}
                            <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2'>
                                <GlowingLink
                                    href='/contact'
                                    className='h-14 px-8 bg-amber hover:bg-amber-light text-[#060e32] font-extrabold rounded-xl shadow-lg shadow-amber/25 transition-all duration-200 hover:scale-[1.02] flex items-center justify-center text-center'
                                >
                                    <span className='flex items-center justify-center gap-2'>
                                        <span>Gratis live demo aanvragen</span>
                                        <ArrowRight className='w-5 h-5' />
                                    </span>
                                </GlowingLink>

                                <Link
                                    href='/box3-check'
                                    className='h-14 px-6 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all duration-200 backdrop-blur-md flex items-center justify-center gap-2 group text-center'
                                >
                                    <span>Bereken uw Box 3-impact ⚡</span>
                                    <ArrowRight className='w-4 h-4 text-white/70 group-hover:translate-x-1 transition-transform' />
                                </Link>
                            </div>

                            {/* Trust Signals (Single Full-Width Line) */}
                            <div className='pt-6 border-t border-white/10 flex items-center justify-between gap-2 text-xs sm:text-sm text-white/75 font-mono w-full whitespace-nowrap overflow-x-auto'>
                                <div className='flex items-center gap-2 shrink-0'>
                                    <CheckCircle2 className='w-4 h-4 text-emerald-400 shrink-0' />
                                    <span>
                                        Portefeuilles &gt; 50 verhuureenheden
                                    </span>
                                </div>
                                <div className='flex items-center gap-2 shrink-0'>
                                    <CheckCircle2 className='w-4 h-4 text-emerald-400 shrink-0' />
                                    <span>100% Business Central Native</span>
                                </div>
                                <div className='flex items-center gap-2 shrink-0'>
                                    <CheckCircle2 className='w-4 h-4 text-emerald-400 shrink-0' />
                                    <span>Geen schaduwbestanden</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: High-Tech Graphic Card (Higher & No Outer Padding/Inner Image Border) */}
                        <div className='lg:col-span-5 relative flex items-center h-full'>
                            <div className='relative w-full rounded-2xl bg-slate-950/90 backdrop-blur-xl shadow-2xl group overflow-hidden border border-white/15'>
                                <div className='absolute -inset-1 bg-gradient-to-r from-amber/30 via-indigo-500/20 to-amber/30 blur-xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none' />

                                {/* Mockup Top Navigation */}
                                <div className='relative z-10 flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-slate-950/90 text-xs text-white/70 font-mono'>
                                    <div className='flex items-center gap-2'>
                                        <div className='w-3 h-3 rounded-full bg-rose-500' />
                                        <div className='w-3 h-3 rounded-full bg-amber' />
                                        <div className='w-3 h-3 rounded-full bg-emerald-500' />
                                        <span className='ml-2 text-[11px] text-white/80'>
                                            emlinked_core_v4.2
                                        </span>
                                    </div>
                                    <div className='inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] border border-emerald-500/40'>
                                        <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping' />
                                        <span>100% Synced BC</span>
                                    </div>
                                </div>

                                {/* Showcase Image (Flush Edge-to-Edge, Borderless & Higher Aspect Ratio) */}
                                <div className='relative aspect-16/11 w-full overflow-hidden bg-slate-950 flex flex-col justify-center items-center'>
                                    <Image
                                        src='/emlinked/apps/vastgoedbeheer-software/apps_vastgoedbeheer-hero.jpg'
                                        alt='Emlinked Core Vastgoedbeheer Dashboard Mockup'
                                        width={1400}
                                        height={950}
                                        className='w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500'
                                        priority
                                    />

                                    {/* Overlay Metric Badges */}
                                    <div className='absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2 backdrop-blur-md bg-slate-950/90 p-3 rounded-xl border border-white/15 shadow-xl'>
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
                        </div>
                    </div>
                </div>
            </section>

            {/* ── BLOCK 2: OPERATIONAL BOTTLENECKS (Light Warm Cream Background matching Frontpage & Apps) ── */}
            <section className='px-6 py-20 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] text-[#060e32] border-b border-amber/10 relative z-10'>
                <div className='max-w-7xl mx-auto space-y-16'>
                    {/* Header */}
                    <div className='text-center max-w-3xl mx-auto space-y-4'>
                        <div className='flex justify-center mb-1'>
                            <span className='inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/15 px-4.5 py-1.5 text-xs font-mono font-bold tracking-wider text-amber uppercase backdrop-blur-md shadow-xs'>
                                <span className='w-2 h-2 rounded-full bg-amber shrink-0'></span>
                                GEEN HANDMATIG WERK MEER
                            </span>
                        </div>

                        <h2 className='font-display text-3xl md:text-4xl lg:text-[2.5rem]/12 font-bold tracking-tight text-[#060e32]'>
                            Waarom traditionele vastgoed administratie software
                            tekortschiet
                        </h2>

                        <p className='text-[#060e32]/75 text-base md:text-lg leading-relaxed font-light'>
                            Veel beheerders verliezen wekelijks kostbare uren
                            aan het handmatig synchroniseren van
                            vastgoedgegevens met hun financiële administratie.
                            Emlinked sluit het gat tussen de dagelijkse operatie
                            en uw grootboek.
                        </p>
                    </div>

                    {/* Side-by-Side Comparison Matrix */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch'>
                        {/* Left Card: Legacy Pain */}
                        <div className='rounded-2xl border border-black/20 bg-white p-8 space-y-6 shadow-xs flex flex-col justify-between'>
                            <div className='space-y-6'>
                                <div className='flex items-center justify-between border-b border-black/10 pb-4'>
                                    <h3 className='text-lg font-bold text-amber'>
                                        TRADITIONELE VASTGOEDSOFTWARE
                                    </h3>
                                    <span className='text-xs font-mono px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-bold border border-black/10'>
                                        Verouderd
                                    </span>
                                </div>

                                <ul className='space-y-4 text-sm text-[#060e32]/80'>
                                    <li className='flex items-start gap-3'>
                                        <XCircle className='w-5 h-5 text-amber shrink-0 mt-0.5' />
                                        <div className='space-y-0.5'>
                                            <strong className='text-[#060e32] block font-semibold text-sm'>
                                                Handmatige Excel-imports voor
                                                indexaties
                                            </strong>
                                            <span className='text-slate-600 text-xs leading-relaxed block'>
                                                Foutgevoelig knippen en plakken
                                                van CBS-indexcijfers en
                                                contractregels op de 1e van de
                                                maand.
                                            </span>
                                        </div>
                                    </li>
                                    <li className='flex items-start gap-3'>
                                        <XCircle className='w-5 h-5 text-amber shrink-0 mt-0.5' />
                                        <div className='space-y-0.5'>
                                            <strong className='text-[#060e32] block font-semibold text-sm'>
                                                API-fouten tussen losse tools en
                                                ERP
                                            </strong>
                                            <span className='text-slate-600 text-xs leading-relaxed block'>
                                                Externe synchronisatiekanalen
                                                vallen regelmatig stil, met
                                                ontbrekende debiteurenposten als
                                                gevolg.
                                            </span>
                                        </div>
                                    </li>
                                    <li className='flex items-start gap-3'>
                                        <XCircle className='w-5 h-5 text-amber shrink-0 mt-0.5' />
                                        <div className='space-y-0.5'>
                                            <strong className='text-[#060e32] block font-semibold text-sm'>
                                                Foutgevoelige herberekeningen
                                                van servicekosten
                                            </strong>
                                            <span className='text-slate-600 text-xs leading-relaxed block'>
                                                Onduidelijke
                                                voorschotberekeningen en
                                                moeizame afrekeningen aan het
                                                einde van het boekjaar.
                                            </span>
                                        </div>
                                    </li>
                                    <li className='flex items-start gap-3'>
                                        <XCircle className='w-5 h-5 text-amber shrink-0 mt-0.5' />
                                        <div className='space-y-0.5'>
                                            <strong className='text-[#060e32] block font-semibold text-sm'>
                                                Vertraagde financiële
                                                rapportages
                                            </strong>
                                            <span className='text-slate-600 text-xs leading-relaxed block'>
                                                Rapportages over leegstand en
                                                bruto/netto rendementen moeten
                                                handmatig worden geconsolideerd.
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Right Card: Emlinked Solution */}
                        <div className='rounded-2xl border border-black/20 bg-white p-8 space-y-6 shadow-xs flex flex-col justify-between relative'>
                            <div className='space-y-6'>
                                <div className='flex items-center justify-between border-b border-black/10 pb-4'>
                                    <h3 className='text-lg font-bold text-amber'>
                                        EMLINKED NATIVE DYNAMICS MODULE
                                    </h3>
                                    <span className='text-xs font-mono px-3 py-1 rounded-full bg-amber/10 text-amber-900 font-bold border border-amber/30'>
                                        100% Geautomatiseerd
                                    </span>
                                </div>

                                <ul className='space-y-4 text-sm text-[#060e32]'>
                                    <li className='flex items-start gap-3'>
                                        <CheckCircle2 className='w-5 h-5 text-amber shrink-0 mt-0.5' />
                                        <div className='space-y-0.5'>
                                            <strong className='text-[#060e32] block font-semibold text-sm'>
                                                Automatische CPI-indexatie &
                                                huurprolongatie
                                            </strong>
                                            <span className='text-slate-600 text-xs leading-relaxed block'>
                                                CBS-data wordt automatisch
                                                ingelezen en rechtstreeks
                                                toegepast op uw
                                                huurovereenkomsten.
                                            </span>
                                        </div>
                                    </li>
                                    <li className='flex items-start gap-3'>
                                        <CheckCircle2 className='w-5 h-5 text-amber shrink-0 mt-0.5' />
                                        <div className='space-y-0.5'>
                                            <strong className='text-[#060e32] block font-semibold text-sm'>
                                                100% native verwerking in
                                                Business Central
                                            </strong>
                                            <span className='text-slate-600 text-xs leading-relaxed block'>
                                                Geen externe koppelingen;
                                                journaalposten en facturen
                                                ontstaan direct in de
                                                ERP-database.
                                            </span>
                                        </div>
                                    </li>
                                    <li className='flex items-start gap-3'>
                                        <CheckCircle2 className='w-5 h-5 text-amber shrink-0 mt-0.5' />
                                        <div className='space-y-0.5'>
                                            <strong className='text-[#060e32] block font-semibold text-sm'>
                                                Geautomatiseerde en
                                                wet-compliant afrekening
                                            </strong>
                                            <span className='text-slate-600 text-xs leading-relaxed block'>
                                                Matching van werkelijk gemaakte
                                                inkoopfacturen met voorschotten
                                                via Document Capture.
                                            </span>
                                        </div>
                                    </li>
                                    <li className='flex items-start gap-3'>
                                        <CheckCircle2 className='w-5 h-5 text-amber shrink-0 mt-0.5' />
                                        <div className='space-y-0.5'>
                                            <strong className='text-[#060e32] block font-semibold text-sm'>
                                                Realtime inzicht in uw totale
                                                portefeuille
                                            </strong>
                                            <span className='text-slate-600 text-xs leading-relaxed block'>
                                                Executive dashboards voor
                                                controllers en vastgoeddirecties
                                                met één druk op de knop.
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Split-Screen Visual Showcase */}
                    <div className='rounded-2xl border border-slate-200 bg-white p-4 shadow-xl overflow-hidden'>
                        <div className='text-xs font-mono text-slate-500 mb-3 px-2 flex items-center justify-between'>
                            <span>
                                ARCHITECTUUR VISUALISATIE: TRADITIONEEL VS
                                NATIVE ERP
                            </span>
                            <span className='text-amber font-bold'>
                                Nieuwe Standaard
                            </span>
                        </div>
                        <Image
                            src='https://placehold.co/1000x600/0f172a/f59e0b?text=Split-Screen+Comparison:+Legacy+Excel+vs+Emlinked+Native+ERP'
                            alt='Split-screen vergelijking tussen handmatige vastgoedadministratie en Emlinked native ERP'
                            width={1000}
                            height={600}
                            className='w-full h-auto object-cover rounded-xl border border-slate-100'
                        />
                    </div>
                </div>
            </section>

            {/* ── BLOCK 3: KEY MODULE FEATURES (FOR RETAIL & COOPERATIVES) (Dark Navy Background) ── */}
            <section className='py-20 px-6 bg-[#060e32] text-white border-b border-white/10 relative overflow-hidden'>
                <div className='max-w-7xl mx-auto space-y-16 relative z-10'>
                    {/* Header */}
                    <div className='text-center max-w-3xl mx-auto space-y-4 flex flex-col items-center'>
                        <span className='inline-flex items-center justify-center rounded-full border border-amber/50 bg-[#251b14]/90 px-6 py-1.5 text-xs font-mono font-bold tracking-widest text-amber uppercase backdrop-blur-md shadow-md'>
                            FUNCTIONALITEITEN
                        </span>
                        <h2 className='font-display text-3xl md:text-4xl lg:text-[2.5rem]/12 font-bold tracking-tight text-white'>
                            Krachtige functionaliteiten voor modern{' '}
                            <span className='text-amber'>vastgoedbeheer</span>
                        </h2>
                        <p className='text-white/70 text-base md:text-lg font-light'>
                            Ontwikkeld om ingewikkelde contractvormen,
                            retailketen-metrages en corporatie-afrekeningen
                            moeiteloos te stroomlijnen.
                        </p>
                    </div>

                    {/* Feature Tabs */}
                    <div className='flex justify-center border-b border-white/10 gap-2 sm:gap-4 overflow-x-auto pb-px'>
                        <button
                            onClick={() => setActiveTab('indexation')}
                            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                                activeTab === 'indexation'
                                    ? 'border-amber text-amber bg-amber/10'
                                    : 'border-transparent text-white/60 hover:text-white'
                            }`}
                        >
                            <Zap className='w-4 h-4' />
                            <span>1. CPI-Indexaties & Contracten</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('retail')}
                            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                                activeTab === 'retail'
                                    ? 'border-amber text-amber bg-amber/10'
                                    : 'border-transparent text-white/60 hover:text-white'
                            }`}
                        >
                            <Building2 className='w-4 h-4' />
                            <span>2. Dynamisch Metrage & Retail</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('service')}
                            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                                activeTab === 'service'
                                    ? 'border-amber text-amber bg-amber/10'
                                    : 'border-transparent text-white/60 hover:text-white'
                            }`}
                        >
                            <BarChart3 className='w-4 h-4' />
                            <span>3. Servicekosten & Subsidies</span>
                        </button>
                    </div>

                    {/* Tab Content Cards */}
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/70 p-8 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl'>
                        {activeTab === 'indexation' && (
                            <>
                                <div className='lg:col-span-6 space-y-6'>
                                    <span className='inline-flex items-center gap-2 text-xs font-mono text-amber uppercase tracking-widest bg-amber/15 px-3 py-1 rounded-full border border-amber/30'>
                                        FEATURE 01
                                    </span>
                                    <h3 className='text-2xl sm:text-3xl font-bold text-white'>
                                        Geautomatiseerde CPI-Indexaties &
                                        Contractbeheer
                                    </h3>
                                    <p className='text-white/75 leading-relaxed text-base font-light'>
                                        Vergeet handmatige berekeningen op de
                                        eerste van de maand. Onze{' '}
                                        <strong className='text-white font-medium'>
                                            software voor vastgoedbeheer
                                        </strong>{' '}
                                        haalt automatisch de nieuwste CBS
                                        CPI-indexcijfers op, berekent de nieuwe
                                        huursommen en past deze direct toe op al
                                        uw lopende huurovereenkomsten.
                                    </p>
                                    <ul className='space-y-2.5 text-sm text-white/80'>
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
                                <div className='lg:col-span-6'>
                                    <div className='rounded-xl border border-white/15 bg-slate-950 p-2 overflow-hidden shadow-2xl'>
                                        <Image
                                            src='https://placehold.co/800x450/0f172a/10b981?text=Indexation+Log+Card+(CBS+CPI+Sync)'
                                            alt='CPI Indexatie log UI card preview'
                                            width={800}
                                            height={450}
                                            className='w-full h-auto rounded-lg border border-white/10'
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'retail' && (
                            <>
                                <div className='lg:col-span-6 space-y-6'>
                                    <span className='inline-flex items-center gap-2 text-xs font-mono text-amber uppercase tracking-widest bg-amber/15 px-3 py-1 rounded-full border border-amber/30'>
                                        FEATURE 02
                                    </span>
                                    <h3 className='text-2xl sm:text-3xl font-bold text-white'>
                                        Dynamisch Metrage- & Retailbeheer
                                    </h3>
                                    <p className='text-white/75 leading-relaxed text-base font-light'>
                                        Speciaal ingericht voor de uitdagingen
                                        van retailketens en commercieel
                                        vastgoed. Beheer wisselende
                                        winkelindelingen, verschillende
                                        metrage-types, omzethuurafspraken en
                                        locatiespecifieke onderhoudscontracten
                                        centraal in één dashboard.
                                    </p>
                                    <ul className='space-y-2.5 text-sm text-white/80'>
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
                                <div className='lg:col-span-6'>
                                    <div className='rounded-xl border border-white/15 bg-slate-950 p-2 overflow-hidden shadow-2xl'>
                                        <Image
                                            src='https://placehold.co/800x450/0f172a/3b82f6?text=Retail+Metrage+%26+Unit+Indeling+Blueprint'
                                            alt='Retail Metrage en Unit Indeling Blueprint UI'
                                            width={800}
                                            height={450}
                                            className='w-full h-auto rounded-lg border border-white/10'
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'service' && (
                            <>
                                <div className='lg:col-span-6 space-y-6'>
                                    <span className='inline-flex items-center gap-2 text-xs font-mono text-amber uppercase tracking-widest bg-amber/15 px-3 py-1 rounded-full border border-amber/30'>
                                        FEATURE 03
                                    </span>
                                    <h3 className='text-2xl sm:text-3xl font-bold text-white'>
                                        Servicekosten & Subsidieafrekeningen
                                    </h3>
                                    <p className='text-white/75 leading-relaxed text-base font-light'>
                                        Bepaal, voorschot en verreken
                                        servicekosten transparant voor uw
                                        huurders of woningcorporatie. Alle
                                        voorschotten en werkelijke gemaakte
                                        kosten worden direct gematcht met
                                        inkoopfacturen via Document Capture.
                                    </p>
                                    <ul className='space-y-2.5 text-sm text-white/80'>
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
                                <div className='lg:col-span-6'>
                                    <div className='rounded-xl border border-white/15 bg-slate-950 p-2 overflow-hidden shadow-2xl'>
                                        <Image
                                            src='https://placehold.co/800x450/0f172a/8b5cf6?text=Service+Charge+Distribution+Chart'
                                            alt='Service Charge Distribution Chart UI'
                                            width={800}
                                            height={450}
                                            className='w-full h-auto rounded-lg border border-white/10'
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* ── BLOCK 4: NATIVE BUSINESS CENTRAL INTEGRATION (Dark Section) ── */}
            <section className='py-20 px-6 bg-[#02030A] text-white border-b border-white/10 relative overflow-hidden'>
                <div className='max-w-7xl mx-auto space-y-12 relative z-10'>
                    <div className='text-center max-w-3xl mx-auto space-y-4 flex flex-col items-center'>
                        <span className='inline-flex items-center justify-center rounded-full border border-amber/50 bg-[#251b14]/90 px-6 py-1.5 text-xs font-mono font-bold tracking-widest text-amber uppercase backdrop-blur-md shadow-md'>
                            NATIVE DYNAMICS 365
                        </span>
                        <h2 className='font-display text-3xl md:text-4xl lg:text-[2.5rem]/12 font-bold tracking-tight text-white'>
                            Volledig geïntegreerd in uw{' '}
                            <span className='text-amber'>
                                Microsoft ERP-omgeving
                            </span>
                        </h2>
                        <p className='text-white/70 text-base md:text-lg font-light leading-relaxed'>
                            Waarom kiezen voor een losstaand pakket als u uw{' '}
                            <strong className='text-white font-medium'>
                                vastgoed beheer software
                            </strong>{' '}
                            rechtstreeks in Business Central kunt laten draaien?
                            Elke mutatie, contractwijziging of huurincasso wordt
                            direct verwerkt als gevalideerde journaalpost.
                        </p>
                    </div>

                    {/* Architecture Graphic */}
                    <div className='relative rounded-2xl border border-white/15 bg-slate-950 p-4 backdrop-blur-xl shadow-2xl overflow-hidden'>
                        <Image
                            src='https://placehold.co/1200x500/020617/6366f1?text=Native+ERP+Link+Diagram:+Business+Central+%2b+Emlinked+Modules'
                            alt='Native ERP Koppeling diagram van Emlinked met Microsoft Dynamics 365 Business Central'
                            width={1200}
                            height={500}
                            className='w-full h-auto object-cover rounded-xl border border-white/10'
                        />

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10 mt-4 text-xs text-white/70'>
                            <div className='flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-white/10'>
                                <Database className='w-5 h-5 text-amber shrink-0' />
                                <div>
                                    <strong className='text-white block font-semibold'>
                                        Geen Schaduwbestanden
                                    </strong>
                                    <span className='text-white/60 text-xs'>
                                        Alle stamdata leeft in uw centrale
                                        Business Central database.
                                    </span>
                                </div>
                            </div>
                            <div className='flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-white/10'>
                                <Cpu className='w-5 h-5 text-amber shrink-0' />
                                <div>
                                    <strong className='text-white block font-semibold'>
                                        Zero API-Latency
                                    </strong>
                                    <span className='text-white/60 text-xs'>
                                        Directe verwerking zonder externe
                                        sync-tunnels of wachttijden.
                                    </span>
                                </div>
                            </div>
                            <div className='flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-white/10'>
                                <ShieldCheck className='w-5 h-5 text-amber shrink-0' />
                                <div>
                                    <strong className='text-white block font-semibold'>
                                        Accountant Proof
                                    </strong>
                                    <span className='text-white/60 text-xs'>
                                        100% audit-trail conform Nederlandse
                                        accountancy richtlijnen.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── BLOCK 5: CALL TO ACTION BANNER (Dark Navy Floating Card on Light Warm Canvas matching Screenshots) ── */}
            <section className='py-20 px-6 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] relative z-10'>
                <div className='max-w-6xl mx-auto'>
                    <div className='relative rounded-3xl bg-[#060e32] border border-white/10 p-10 sm:p-14 text-white shadow-2xl overflow-hidden'>
                        {/* Background Glows */}
                        <div className='absolute -right-20 -top-20 w-80 h-80 bg-amber/15 rounded-full blur-3xl pointer-events-none' />

                        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10'>
                            <div className='lg:col-span-8 space-y-6 text-left flex flex-col items-start'>
                                <span className='inline-flex items-center justify-center rounded-full border border-amber/50 bg-[#251b14]/90 px-6 py-1.5 text-xs font-mono font-bold tracking-widest text-amber uppercase backdrop-blur-md shadow-md'>
                                    DEMO AANVRAGEN
                                </span>

                                <h2 className='font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight'>
                                    {doc?.cta?.title ||
                                        'Ervaar de kracht van geautomatiseerd vastgoedbeheer'}
                                </h2>

                                <p className='text-white/75 text-base sm:text-lg font-light leading-relaxed max-w-2xl'>
                                    {doc?.cta?.desc ||
                                        'Sluit aan bij professionele beheerders en controllers die hun administratieve lasten halveren met Emlinked. Vraag vandaag nog een vrijblijvende demonstratie aan en ontdek de voordelen voor uw portefeuille.'}
                                </p>

                                <div className='flex flex-wrap items-center gap-4 pt-2'>
                                    <GlowingLink
                                        href='/contact'
                                        className='px-8 py-4 bg-amber hover:bg-amber-light text-[#060e32] font-extrabold rounded-xl shadow-lg shadow-amber/25 transition-all duration-200 hover:scale-[1.02] text-center'
                                    >
                                        <span className='flex items-center justify-center gap-2'>
                                            <span>
                                                {doc?.cta?.primary ||
                                                    'Vastgoedbeheer software demo aanvragen'}
                                            </span>
                                            <ArrowRight className='w-5 h-5' />
                                        </span>
                                    </GlowingLink>

                                    <Link
                                        href='/prijzen'
                                        className='px-6 py-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all duration-200 backdrop-blur-md flex items-center justify-center gap-2 text-center'
                                    >
                                        <span>
                                            {doc?.cta?.secondary ||
                                                'Bekijk onze tarieven & prijzen ➔'}
                                        </span>
                                    </Link>
                                </div>
                            </div>

                            {/* Right Image Graphic */}
                            <div className='lg:col-span-4 relative flex justify-center'>
                                <div className='relative w-full aspect-4/3 rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-slate-900/80 p-1'>
                                    <Image
                                        src='https://placehold.co/600x450/0f172a/f59e0b?text=Business+Central+Core+Engine'
                                        alt='Emlinked Business Central Integration'
                                        width={600}
                                        height={450}
                                        className='w-full h-full object-cover rounded-xl'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
