'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    MessageSquare,
    Wrench,
    FileText,
    Check,
    CheckCircle2,
    XCircle,
    ArrowRight,
    Smartphone,
    Shield,
    Clock,
    Users,
} from 'lucide-react';
import { GlowingLink } from '@/components/ui/GlowingButton';
import { DataGridCanvas } from '@/components/ui/data-grid-canvas';
import { formatHeroTitle } from '@/components/blocks/HeroSection';
import { BorderBeam } from 'border-beam';
import { DEFAULT_DOMAIN } from '@/lib/seo';

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

interface HuurdersportaalModuleProps {
    doc?: any;
    locale?: string;
}

export function HuurdersportaalModule({
    doc,
    locale = 'nl',
}: HuurdersportaalModuleProps) {
    const isEn = locale === 'en';

    // Structured JSON-LD from Sanity or user-provided blueprint
    const jsonLdData = doc?.seo?.structuredData
        ? typeof doc.seo.structuredData === 'string'
            ? doc.seo.structuredData
            : JSON.stringify(doc.seo.structuredData)
        : JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                  {
                      '@type': 'WebPage',
                      '@id': `${DEFAULT_DOMAIN}/apps/huurdersportaal#webpage`,
                      url: `${DEFAULT_DOMAIN}/apps/huurdersportaal`,
                      name: 'Huurdersportaal Software — Self-Service voor uw Huurders | Emlinked',
                      description:
                          'Verlaag de administratieve druk op uw beheerteam met ons digitale huurdersportaal.',
                      inLanguage: 'nl-NL',
                      isPartOf: {
                          '@type': 'WebSite',
                          '@id': `${DEFAULT_DOMAIN}/#website`,
                      },
                  },
                  {
                      '@type': 'BreadcrumbList',
                      '@id': `${DEFAULT_DOMAIN}/apps/huurdersportaal#breadcrumb`,
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
                              name: 'Huurdersportaal',
                              item: `${DEFAULT_DOMAIN}/apps/huurdersportaal`,
                          },
                      ],
                  },
                  {
                      '@type': 'SoftwareApplication',
                      '@id': `${DEFAULT_DOMAIN}/apps/huurdersportaal#software`,
                      name: 'Emlinked Huurdersportaal Software',
                      applicationCategory: 'BusinessApplication',
                      operatingSystem: 'Web-based, Mobile Responsive',
                      softwareRequirements:
                          'Microsoft Dynamics 365 Business Central',
                      description:
                          'Online huurdersportaal voor self-service communicatie, onderhoudsmeldingen en documentenbeheer direct gesynchroniseerd met de Emlinked vastgoedsoftware suite.',
                      publisher: {
                          '@type': 'Organization',
                          name: 'Emlinked',
                          url: DEFAULT_DOMAIN,
                      },
                  },
              ],
          });

    const [activeTab, setActiveTab] = useState<
        'maintenance' | 'invoices' | 'documents'
    >('maintenance');

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
                                {doc?.badge ||
                                    'SELF-SERVICE & HUURDERCOMMUNICATIE'}
                            </span>

                            <h1 className='font-display font-bold tracking-tight text-white leading-[1.1] text-3xl sm:text-4xl lg:text-[2.75rem] text-balance'>
                                {doc?.tagline ? (
                                    formatHeroTitle(doc.tagline)
                                ) : (
                                    <>
                                        Digitaal huurdersportaal voor{' '}
                                        <span className='text-amber font-extrabold'>
                                            efficiënte communicatie & onderhoud
                                        </span>
                                    </>
                                )}
                            </h1>

                            <p className='text-lg md:text-xl text-white/70 leading-relaxed font-light max-w-2xl'>
                                {doc?.description ||
                                    'Verlaag de telefoondruk op je beheerteam en verhoog de tevredenheid van je huurders. Met onze huurdersportaal software regelen je bewoners en zakelijke huurders 24/7 zelf hun reparatieverzoeken, inzien van huurfacturen en communicatie. Volledig gesynchroniseerd met je centrale vastgoedadministratie.'}
                            </p>

                            <div className='flex flex-col sm:flex-row gap-4 mt-2'>
                                <GlowingLink
                                    href='#demo'
                                    className='inline-flex h-12 items-center justify-center rounded-md bg-amber hover:bg-amber-hover px-6 text-sm font-semibold text-[#060e32] transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98]'
                                >
                                    <span className='flex items-center justify-center gap-2'>
                                        <span>Vraag een demonstratie aan</span>
                                        <ArrowRight className='w-5 h-5' />
                                    </span>
                                </GlowingLink>

                                <Link
                                    href='/apps'
                                    className='inline-flex h-12 items-center justify-center rounded-md border border-white/20 bg-transparent px-6 text-sm font-semibold text-white hover:bg-white/10 transition-all text-center shadow-sm hover:scale-[1.02] active:scale-[0.98] duration-200'
                                >
                                    Bekijk alle apps
                                </Link>
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
                                            <span>24/7 Live Self-Service</span>
                                        </div>
                                    </div>

                                    <div className='relative aspect-12/11 w-full overflow-hidden bg-slate-950 flex flex-col justify-center items-center'>
                                        <Image
                                            src='/emlinked/apps/huurdersportaal/huurderesportaal_hero.png'
                                            alt='Huurdersportaal Software UI Self-Service Mockup'
                                            width={1400}
                                            height={875}
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

            {/* ── BLOCK 2: OPERATIONAL BOTTLENECKS (Light Warm Cream Background matching Vastgoedbeheer Software) ── */}
            <section className='px-6 py-20 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] text-[#060e32] border-b border-amber/10 relative z-10'>
                <div className='max-w-7xl mx-auto space-y-16'>
                    {/* Header */}
                    <div className='text-center max-w-3xl mx-auto space-y-4'>
                        <div className='flex justify-center mb-1'>
                            <span className='inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/15 px-4.5 py-1.5 text-xs font-mono font-bold tracking-wider text-amber uppercase backdrop-blur-md shadow-xs'>
                                <span className='w-2 h-2 rounded-full bg-amber shrink-0' />
                                {doc?.comparisonSection?.badge ||
                                    'MINDER TELEFOONTJES, MEER OVERZICHT'}
                            </span>
                        </div>

                        <h2 className='font-display text-3xl md:text-4xl lg:text-[2.5rem]/12 font-bold tracking-tight text-[#060e32]'>
                            {doc?.comparisonSection?.title || (
                                <>
                                    Waarom een verouderde communicatiestroom{' '}
                                    <span className='text-amber'>
                                        tijd en geld kost
                                    </span>
                                </>
                            )}
                        </h2>

                        <p className='text-[#060e32]/75 text-base md:text-lg leading-relaxed font-light'>
                            {doc?.comparisonSection?.desc ||
                                'Losse e-mails, WhatsApp-berichten en telefonische meldingen leiden tot zoekgeraakte onderhoudsverzoeken en gefrustreerde huurders. Een online huurder zelfservice portaal centraliseert alle interacties op één plek.'}
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
                                    <h3 className='text-lg font-bold text-amber uppercase'>
                                        {doc?.comparisonSection?.leftTitle ||
                                            'HANDMATIGE HUURDERCOMMUNICATIE'}
                                    </h3>
                                </div>

                                <ul className='space-y-4 text-sm text-[#060e32]/80'>
                                    {(doc?.comparisonSection?.leftItems &&
                                    doc.comparisonSection.leftItems.length > 0
                                        ? doc.comparisonSection.leftItems
                                        : [
                                              {
                                                  title: 'Eindeloze e-mails en telefoontjes over simpele vragen',
                                                  desc: 'Beheerders besteden dagelijks uren aan het beantwoorden van herhalende vragen over facturen en contracten.',
                                              },
                                              {
                                                  title: 'Niet-geregistreerde telefonische storingsmeldingen',
                                                  desc: 'Onderhoudsverzoeken gaan verloren of worden te laat opgepakt door gebrek aan centrale ticketing.',
                                              },
                                              {
                                                  title: 'Onduidelijkheid bij huurders over status van onderhoud',
                                                  desc: 'Huurders blijven bellen voor updates omdat er geen transparante realtime voortgangs-timeline is.',
                                              },
                                              {
                                                  title: 'Foutgevoelige handmatige verwerking in losse systemen',
                                                  desc: 'Geen directe integratie met het centrale ERP of de financiële administratie.',
                                              },
                                          ]
                                    ).map((item: any, idx: number) => {
                                        const isObj =
                                            typeof item === 'object' &&
                                            item !== null;
                                        const titleText = isObj
                                            ? item.title
                                            : item;
                                        const descText = isObj ? item.desc : '';
                                        return (
                                            <li
                                                key={idx}
                                                className='flex items-start gap-3'
                                            >
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
                        <div className='relative rounded-2xl border border-amber/40 bg-white p-8 space-y-6 shadow-xl flex flex-col justify-between'>
                            <CardBadge
                                imageSrc='/emlinked/apps/huurdersportaal/automatiseren_huurdersportaal.jpg'
                                alt='Emlinked Digitaal Huurdersportaal'
                                isLegacy={false}
                            />

                            <div className='space-y-6'>
                                <div className='border-b border-black/10 pb-4 pr-16'>
                                    <h3 className='text-lg font-bold text-amber uppercase'>
                                        {doc?.comparisonSection?.rightTitle ||
                                            'EMLINKED DIGITAAL HUURDERSPORTAAL'}
                                    </h3>
                                </div>

                                <ul className='space-y-4 text-sm text-[#060e32]/80'>
                                    {(doc?.comparisonSection?.rightItems &&
                                    doc.comparisonSection.rightItems.length > 0
                                        ? doc.comparisonSection.rightItems
                                        : doc?.benefits &&
                                            doc.benefits.length > 0
                                          ? doc.benefits
                                          : [
                                                {
                                                    title: '24/7 Self-service voor huurders',
                                                    desc: 'Direct digitaal inzien van contracten, specificaties en servicekosten zonder beheerder.',
                                                },
                                                {
                                                    title: 'Gecentraliseerd reparatie- & onderhoudsbeheer',
                                                    desc: "Storingsmeldingen met foto's direct in het dashboard inclusief realtime status updates.",
                                                },
                                                {
                                                    title: 'Automatische status-updates via e-mail & SMS',
                                                    desc: 'Voorkomt opvolg-telefoontjes door automatische statusnotificaties per herstelverzoek.',
                                                },
                                                {
                                                    title: 'Directe koppeling met je centrale vastgoedsoftware',
                                                    desc: '100% gesynchroniseerd met Microsoft Dynamics 365 Business Central en je grootboek.',
                                                },
                                            ]
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

            {/* ── BLOCK 3: CORE FUNCTIONALITIES (Dark Navy Canvas matching alternating theme rhythm) ── */}
            <section className='py-20 px-6 bg-texture-navy text-white border-b border-white/10 relative overflow-hidden'>
                <DataGridCanvas className='pointer-events-none absolute inset-0 h-full w-full opacity-70 z-999' />

                <div className='max-w-7xl mx-auto space-y-8 relative z-10'>
                    <div className='text-center max-w-3xl mx-auto space-y-4 flex flex-col items-center'>
                        <span className='inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/15 px-4.5 py-1.5 text-xs font-mono font-bold tracking-wider text-amber uppercase backdrop-blur-md shadow-xs'>
                            <span className='w-2 h-2 rounded-full bg-amber shrink-0 animate-ping' />
                            FUNCTIONALITEITEN
                        </span>
                        <h2 className='font-display text-3xl md:text-4xl lg:text-[2.5rem]/12 font-bold tracking-tight text-white'>
                            Alles wat je huurder verwacht in{' '}
                            <span className='text-amber'>
                                één online omgeving
                            </span>
                        </h2>
                        <p className='text-white/80 leading-relaxed text-base md:text-lg font-light max-w-3xl'>
                            {doc?.featuresSectionDesc ||
                                'Ontwikkeld om 24/7 self-service, storingsmeldingen, factuurinzicht en documentenbeheer voor huurders moeiteloos te stroomlijnen.'}
                        </p>
                    </div>

                    {/* Feature Tabs Bar */}
                    <div className='flex justify-center border-b border-white/10 gap-2 sm:gap-4 overflow-x-auto pb-px'>
                        <button
                            onClick={() => setActiveTab('maintenance')}
                            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                                activeTab === 'maintenance'
                                    ? 'border-amber text-amber bg-amber/15 rounded-t-lg'
                                    : 'border-transparent text-white/60 hover:text-white'
                            }`}
                        >
                            <Wrench className='w-4 h-4' />
                            <span>1. Reparatie- & Onderhoudsbeheer</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('invoices')}
                            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                                activeTab === 'invoices'
                                    ? 'border-amber text-amber bg-amber/15 rounded-t-lg'
                                    : 'border-transparent text-white/60 hover:text-white'
                            }`}
                        >
                            <FileText className='w-4 h-4' />
                            <span>2. Facturen & Betalingshistorie</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('documents')}
                            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                                activeTab === 'documents'
                                    ? 'border-amber text-amber bg-amber/15 rounded-t-lg'
                                    : 'border-transparent text-white/60 hover:text-white'
                            }`}
                        >
                            <MessageSquare className='w-4 h-4' />
                            <span>3. Centraal Documentenarchief</span>
                        </button>
                    </div>

                    {/* Feature Content */}
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'>
                        {activeTab === 'maintenance' && (
                            <>
                                <div className='lg:col-span-6 space-y-6'>
                                    <h3 className='text-2xl sm:text-3xl font-bold text-white'>
                                        {doc?.features?.[0]?.title ||
                                            'Digitaal Reparatie- & Onderhoudsbeheer'}
                                    </h3>
                                    <p className='text-white/70 leading-relaxed text-base font-light'>
                                        {doc?.features?.[0]?.text ||
                                            'Huurders melden 24/7 schade of onderhoud via hun smartphone. Ze selecteren de categorie, voegen foto’s toe en volgen de status van de ingeschakelde aannemer live in het portaal.'}
                                    </p>
                                    <ul className='space-y-2.5 text-sm text-white/80'>
                                        <li className='flex items-center gap-2.5'>
                                            <Check className='w-4 h-4 text-amber shrink-0' />
                                            <span>
                                                Storingsmeldingen indienen
                                                inclusief fotobijlagen
                                            </span>
                                        </li>
                                        <li className='flex items-center gap-2.5'>
                                            <Check className='w-4 h-4 text-amber shrink-0' />
                                            <span>
                                                Realtime voortgangs-timeline per
                                                herstelverzoek
                                            </span>
                                        </li>
                                        <li className='flex items-center gap-2.5'>
                                            <Check className='w-4 h-4 text-amber shrink-0' />
                                            <span>
                                                Directe koppeling met aannemers
                                                & onderhoudsplanning
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className='lg:col-span-6 relative pt-4 pr-4 sm:pt-6 sm:pr-6'>
                                    <div className='absolute top-0 right-0 z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-amber-400 via-amber-500 to-orange-500 text-white flex flex-col items-center justify-center shadow-xl border-2 border-white pointer-events-none'>
                                        <span className='text-[9px] sm:text-[10px] font-bold tracking-widest uppercase opacity-95 leading-none mb-0.5'>
                                            FEATURE
                                        </span>
                                        <span className='text-xl sm:text-2xl font-black leading-none'>
                                            01
                                        </span>
                                    </div>
                                    <div className='rounded-xl overflow-hidden shadow-2xl'>
                                        <Image
                                            src='/emlinked/apps/huurdersportaal/tab01_reparatie-onderhoudsbeheer.jpg'
                                            alt='Reparatie en Onderhoudsbeheer UI Preview'
                                            width={1200}
                                            height={675}
                                            className='w-full h-auto rounded-xl'
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'invoices' && (
                            <>
                                <div className='lg:col-span-6 space-y-6'>
                                    <h3 className='text-2xl sm:text-3xl font-bold text-white'>
                                        {doc?.features?.[1]?.title ||
                                            'Inzicht in Facturen & Betalingshistorie'}
                                    </h3>
                                    <p className='text-white/70 leading-relaxed text-base font-light'>
                                        {doc?.features?.[1]?.text ||
                                            'Geef huurders direct inzicht in hun actuele huurfacturen, specificaties van de servicekosten en betalingsstatus. Dit voorkomt onnodige vragen aan de financiële afdeling.'}
                                    </p>
                                    <ul className='space-y-2.5 text-sm text-white/80'>
                                        <li className='flex items-center gap-2.5'>
                                            <Check className='w-4 h-4 text-amber shrink-0' />
                                            <span>
                                                Maandelijkse huurspecificaties &
                                                servicekostenoverzichten
                                            </span>
                                        </li>
                                        <li className='flex items-center gap-2.5'>
                                            <Check className='w-4 h-4 text-amber shrink-0' />
                                            <span>
                                                Betalingsstatus (Voldaan / In
                                                afwachting) direct zichtbaar
                                            </span>
                                        </li>
                                        <li className='flex items-center gap-2.5'>
                                            <Check className='w-4 h-4 text-amber shrink-0' />
                                            <span>
                                                Downloadbare PDF-facturen voor
                                                administratie
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className='lg:col-span-6 relative pt-4 pr-4 sm:pt-6 sm:pr-6'>
                                    <div className='absolute top-0 right-0 z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-amber-400 via-amber-500 to-orange-500 text-white flex flex-col items-center justify-center shadow-xl border-2 border-white pointer-events-none'>
                                        <span className='text-[9px] sm:text-[10px] font-bold tracking-widest uppercase opacity-95 leading-none mb-0.5'>
                                            FEATURE
                                        </span>
                                        <span className='text-xl sm:text-2xl font-black leading-none'>
                                            02
                                        </span>
                                    </div>
                                    <div className='rounded-xl overflow-hidden shadow-2xl'>
                                        <Image
                                            src='/emlinked/apps/huurdersportaal/tab02_facturen-betalingshistorie.jpg'
                                            alt='Facturen en Betalingshistorie UI Preview'
                                            width={1200}
                                            height={675}
                                            className='w-full h-auto rounded-xl'
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'documents' && (
                            <>
                                <div className='lg:col-span-6 space-y-6'>
                                    <h3 className='text-2xl sm:text-3xl font-bold text-white'>
                                        {doc?.features?.[2]?.title ||
                                            'Centraal Documentenarchief'}
                                    </h3>
                                    <p className='text-white/70 leading-relaxed text-base font-light'>
                                        {doc?.features?.[2]?.text ||
                                            'Van huurovereenkomsten en opleverrapporten tot algemene voorwaarden en huisregels: alle relevante documenten staan veilig opgeslagen in een persoonlijk digitaal dossier.'}
                                    </p>
                                    <ul className='space-y-2.5 text-sm text-white/80'>
                                        <li className='flex items-center gap-2.5'>
                                            <Check className='w-4 h-4 text-amber shrink-0' />
                                            <span>
                                                Veilige 24/7 versleutelde opslag
                                                van contracten
                                            </span>
                                        </li>
                                        <li className='flex items-center gap-2.5'>
                                            <Check className='w-4 h-4 text-amber shrink-0' />
                                            <span>
                                                Opleverrapporten,
                                                splitsingsakten en huisregels
                                            </span>
                                        </li>
                                        <li className='flex items-center gap-2.5'>
                                            <Check className='w-4 h-4 text-amber shrink-0' />
                                            <span>
                                                Geen handmatige e-mailverzoeken
                                                meer voor documenten
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className='lg:col-span-6 relative pt-4 pr-4 sm:pt-6 sm:pr-6'>
                                    <div className='absolute top-0 right-0 z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-amber-400 via-amber-500 to-orange-500 text-white flex flex-col items-center justify-center shadow-xl border-2 border-white pointer-events-none'>
                                        <span className='text-[9px] sm:text-[10px] font-bold tracking-widest uppercase opacity-95 leading-none mb-0.5'>
                                            FEATURE
                                        </span>
                                        <span className='text-xl sm:text-2xl font-black leading-none'>
                                            03
                                        </span>
                                    </div>
                                    <div className='rounded-xl overflow-hidden shadow-2xl'>
                                        <Image
                                            src='/emlinked/apps/huurdersportaal/tab03_centraal-documentenarchief.jpg'
                                            alt='Documentenarchief UI Preview'
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
            <section className='py-20 px-6 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] relative z-10'>
                <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8'>
                    <div className='border border-amber/30 rounded-3xl bg-texture-navy text-white p-10 md:p-16 hover:shadow-[0_25px_60px_rgba(245,158,11,0.15)] transition-all duration-500 relative overflow-hidden group shadow-2xl backdrop-blur-xl'>
                        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10'>
                            <div className='lg:col-span-8 flex flex-col gap-5 text-left'>
                                <span className='inline-flex items-center gap-2 self-start rounded-full bg-amber/15 border border-amber/35 px-5 py-1.5 text-xs font-bold tracking-widest text-amber uppercase backdrop-blur-md'>
                                    <span className='w-1.5 h-1.5 bg-amber rounded-full animate-ping' />
                                    {doc?.cta?.tag || 'DEMO AANVRAGEN'}
                                </span>

                                <h2 className='font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight'>
                                    {doc?.cta?.title ||
                                        'Klaar om je huurdercommunicatie te digitaliseren?'}
                                </h2>

                                <p className='text-white/75 text-base md:text-lg font-light leading-relaxed max-w-2xl'>
                                    {doc?.cta?.desc ||
                                        'Ontdek hoe ons huurdersportaal de communicatie stroomlijnt en je beheerders uren handmatig werk bespaart.'}
                                </p>

                                <div className='flex flex-col sm:flex-row gap-4 pt-4'>
                                    <GlowingLink
                                        href='#demo'
                                        className='inline-flex h-14 items-center justify-center rounded-xl bg-amber hover:bg-amber-hover px-8 text-base font-semibold text-[#060e32] transition-all duration-200 shadow-md hover:scale-[1.02] active:scale-[0.98]'
                                    >
                                        <span className='flex items-center justify-center gap-2'>
                                            <span>
                                                {doc?.cta?.primary ||
                                                    'Demo aanvragen'}
                                            </span>
                                            <ArrowRight className='h-5 w-5' />
                                        </span>
                                    </GlowingLink>

                                    <Link
                                        href='/vastgoedbeheer-software'
                                        className='inline-flex h-14 items-center justify-center rounded-xl border border-white/20 hover:border-amber/40 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 transition-all duration-200 shadow-sm'
                                    >
                                        <span>
                                            {doc?.cta?.secondary ||
                                                'Bekijk vastgoedbeheer software →'}
                                        </span>
                                    </Link>
                                </div>
                            </div>

                            <div className='lg:col-span-4 flex justify-start lg:justify-end'>
                                <Image
                                    src='/emlinked/apps/huurdersportaal/automatiseren_huurdersportaal.jpg'
                                    alt='Huurdersportaal Illustratie'
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
