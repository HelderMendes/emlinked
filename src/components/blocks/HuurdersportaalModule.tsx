'use client';

import React, { useState } from 'react';
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

interface HuurdersportaalModuleProps {
    doc?: any;
    locale?: string;
}

export function HuurdersportaalModule({
    doc,
    locale = 'nl',
}: HuurdersportaalModuleProps) {
    const isEn = locale === 'en';

    // Extract Sanity modular pageBlocks
    const pageBlocks = doc?.pageBlocks || [];
    const heroBlock = pageBlocks.find((b: any) => b._type === 'heroBlock');
    const featureTabsBlock = pageBlocks.find(
        (b: any) => b._type === 'featureTabsBlock',
    );
    const maintenanceTab =
        featureTabsBlock?.tabs?.find((t: any) => t.tabId === 'maintenance') ||
        featureTabsBlock?.tabs?.[0];
    const invoicesTab =
        featureTabsBlock?.tabs?.find((t: any) => t.tabId === 'invoices') ||
        featureTabsBlock?.tabs?.[1];
    const documentsTab =
        featureTabsBlock?.tabs?.find((t: any) => t.tabId === 'documents') ||
        featureTabsBlock?.tabs?.[2];

    const tab0Img = getImageUrl(
        maintenanceTab?.image,
        maintenanceTab?.imagePath ||
            '/emlinked/apps/huurdersportaal/tab01_reparatie-onderhoudsbeheer.jpg',
    );
    const tab1Img = getImageUrl(
        invoicesTab?.image,
        invoicesTab?.imagePath ||
            '/emlinked/apps/huurdersportaal/tab02_facturen-betalingshistorie.jpg',
    );
    const tab2Img = getImageUrl(
        documentsTab?.image,
        documentsTab?.imagePath ||
            '/emlinked/apps/huurdersportaal/tab03_centraal-documentenarchief.jpg',
    );

    const comparisonBlock = pageBlocks.find(
        (b: any) => b._type === 'comparisonBlock',
    );
    const architectureBlock = pageBlocks.find(
        (b: any) => b._type === 'architectureBlock',
    );
    const ctaBlock = pageBlocks.find((b: any) => b._type === 'ctaBlock');
    const ctaImageUrl = getImageUrl(
        ctaBlock?.image,
        ctaBlock?.imagePath ||
            '/emlinked/apps/huurdersportaal/automatiseren_huurdersportaal.jpg',
    );

    const heroBadge =
        heroBlock?.badge ||
        doc?.badge ||
        (isEn
            ? 'SELF-SERVICE & TENANT COMMUNICATION'
            : 'SELF-SERVICE & HUURDERCOMMUNICATIE');
    const heroTagline = heroBlock?.tagline || doc?.tagline || doc?.title;
    const heroDescription = heroBlock?.description || doc?.description;

    const explicitHeroPath =
        heroBlock?.imagePath ||
        heroBlock?.heroImagePath ||
        doc?.imagePath ||
        doc?.heroImagePath;
    const heroImageUrl =
        explicitHeroPath ||
        getImageUrl(
            heroBlock?.image ||
                heroBlock?.heroImage ||
                doc?.image ||
                doc?.heroImage,
            '/emlinked/apps/huurdersportaal/Huurdersportaal.webp',
        );

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
                      name: 'Huurdersportaal Software — Self-Service voor uw Huurders | emlinked',
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

    const renderHero = (block: any, key: any) => (
        <HeroSection
            key={key}
            locale={locale}
            label={heroBadge}
            title={
                heroTagline ||
                (isEn
                    ? 'A digital tenant portal for efficient communication & maintenance'
                    : 'Digitaal huurdersportaal voor efficiënte communicatie & onderhoud')
            }
            titleClassName='text-3xl sm:text-4xl lg:text-[2.75rem]'
            subtitle={
                heroDescription ||
                (isEn
                    ? 'Reduce the call load on your management team and increase tenant satisfaction. Our tenant portal lets residents and commercial tenants submit maintenance requests, view invoices, and communicate 24/7 — fully synced with your central real estate administration.'
                    : 'Verlaag de telefoondruk op je beheerteam en verhoog de tevredenheid van je huurders. Met onze huurdersportaal software regelen je bewoners en zakelijke huurders 24/7 zelf hun reparatieverzoeken, inzien van huurfacturen en communicatie. Volledig gesynchroniseerd met je centrale vastgoedadministratie.')
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
                        alt={
                            heroBlock?.title ||
                            'Emlinked Huurdersportaal Software'
                        }
                        fill
                        sizes='(max-width: 1024px) 100vw, 55vw'
                        className='object-cover lg:mask-[linear-gradient(to_right,transparent,black_22%)]'
                        priority
                    />

                    <div className='absolute z-20 left-0 top-10 flex items-center gap-2.5 bg-white rounded-xl px-3.5 py-3 shadow-xl'>
                        <span className='w-7 h-7 rounded-lg bg-teal-pale text-teal flex items-center justify-center shrink-0'>
                            <Smartphone className='w-3.5 h-3.5' />
                        </span>
                        <div>
                            <p className='text-[11px] font-bold text-navy-900 leading-none'>
                                24/7 Active
                            </p>
                            <p className='text-[9px] text-navy-500 mt-1'>
                                {isEn ? 'Portal Status' : 'Portaal Status'}
                            </p>
                        </div>
                    </div>

                    <div className='absolute z-20 right-0 bottom-8 flex items-center gap-2.5 bg-white rounded-xl px-3.5 py-3 shadow-xl'>
                        <span className='w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0'>
                            <Clock className='w-3.5 h-3.5' />
                        </span>
                        <div>
                            <p className='text-[11px] font-bold text-navy-900 leading-none'>
                                &lt; 15 min
                            </p>
                            <p className='text-[9px] text-navy-500 mt-1'>
                                {isEn ? 'Avg Response' : 'Gem. Responstijd'}
                            </p>
                        </div>
                    </div>
                </>
            }
        />
    );

    const renderComparison = (block: any, key: any) => (
        // ── BLOCK 2: OPERATIONAL BOTTLENECKS ── */}
        <section
            key={key}
            className='px-6 py-20 bg-background text-navy-900 border-b border-teal/10 relative z-10'
        >
            <div className='max-w-7xl mx-auto space-y-16'>
                {/* Header */}
                <div className='text-center max-w-3xl mx-auto space-y-4'>
                    <div className='flex justify-center mb-1'>
                        <Badge color='teal' uppercase dot>
                            {comparisonBlock?.badge ||
                                doc?.comparisonSection?.badge ||
                                (isEn
                                    ? 'FEWER CALLS, MORE OVERVIEW'
                                    : 'MINDER TELEFOONTJES, MEER OVERZICHT')}
                        </Badge>
                    </div>

                    <h2 className='font-display text-3xl md:text-4xl lg:text-[2.5rem]/12 font-bold tracking-tight text-navy-900'>
                        {comparisonBlock?.title ||
                            doc?.comparisonSection?.title ||
                            (isEn
                                ? 'Why outdated communication workflows cost time and money'
                                : 'Waarom een verouderde communicatiestroom tijd en geld kost')}
                    </h2>

                    <p className='text-navy-900/75 text-base md:text-lg leading-relaxed font-light'>
                        {comparisonBlock?.desc ||
                            doc?.comparisonSection?.desc ||
                            (isEn
                                ? 'Scattered emails, WhatsApp messages, and phone calls lead to lost maintenance requests and frustrated tenants. An online tenant self-service portal centralises all interactions in one place.'
                                : 'Losse e-mails, WhatsApp-berichten en telefonische meldingen leiden tot zoekgeraakte onderhoudsverzoeken en gefrustreerde huurders. Een online huurder zelfservice portaal centraliseert alle interacties op één plek.')}
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
                                            ? 'MANUAL TENANT COMMUNICATION'
                                            : 'HANDMATIGE HUURDERCOMMUNICATIE')}
                                </h3>
                            </div>

                            <ul className='space-y-4 text-sm text-navy-900/80'>
                                {(
                                    comparisonBlock?.leftItems ||
                                    doc?.comparisonSection?.leftItems ||
                                    (isEn
                                        ? [
                                              {
                                                  title: 'Endless emails and phone calls for simple questions',
                                                  desc: 'Property managers spend hours daily answering repetitive questions about invoices and lease terms.',
                                              },
                                              {
                                                  title: 'Unregistered phone calls for repair requests',
                                                  desc: 'Maintenance requests get lost or delayed due to a lack of central ticketing.',
                                              },
                                              {
                                                  title: 'Tenant uncertainty regarding maintenance status',
                                                  desc: 'Tenants call continuously for status updates without a transparent real-time timeline.',
                                              },
                                              {
                                                  title: 'Error-prone manual entry in separate tools',
                                                  desc: 'No direct synchronization with the core ERP or accounting ledger.',
                                              },
                                          ]
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
                                            ? 'EMLINKED DIGITAL TENANT PORTAL'
                                            : 'EMLINKED DIGITAAL HUURDERSPORTAAL')}
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
                                                  title: '24/7 Self-service for tenants',
                                                  desc: 'Instant digital access to contracts, specifications, and service costs without manager intervention.',
                                              },
                                              {
                                                  title: 'Centralized repair & maintenance management',
                                                  desc: 'Maintenance tickets with photos delivered directly into the dashboard with real-time status tracking.',
                                              },
                                              {
                                                  title: 'Automatic status updates via email & SMS',
                                                  desc: 'Prevents follow-up calls through automated notifications per repair request.',
                                              },
                                              {
                                                  title: 'Direct connection to central property ERP',
                                                  desc: '100% synchronized with Microsoft Dynamics 365 Business Central and your general ledger.',
                                              },
                                          ]
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
        // ── BLOCK 3: CORE FUNCTIONALITIES ── */}
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
                                ? 'Everything your tenants expect in one digital portal'
                                : 'Alles wat je huurder verwacht in één online omgeving')}
                    </h2>
                    <p className='text-navy-900/75 text-base md:text-lg font-light max-w-3xl'>
                        {featureTabsBlock?.desc ||
                            doc?.featuresSectionDesc ||
                            (isEn
                                ? 'Designed to streamline 24/7 self-service, maintenance requests, invoice access, and document management for tenants.'
                                : 'Ontwikkeld om 24/7 self-service, storingsmeldingen, factuurinzicht en documentenbeheer voor huurders moeiteloos te stroomlijnen.')}
                    </p>
                </div>

                {/* Feature Tabs Bar */}
                <div className='flex justify-center border-b border-black/10 gap-2 sm:gap-4 overflow-x-auto pb-px'>
                    <button
                        onClick={() => setActiveTab('maintenance')}
                        className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                            activeTab === 'maintenance'
                                ? 'border-teal text-teal bg-teal/15 rounded-t-lg'
                                : 'border-transparent text-navy-900/60 hover:text-navy-900'
                        }`}
                    >
                        <Wrench className='w-4 h-4' />
                        <span>
                            1.{' '}
                            {(
                                maintenanceTab?.tabTitle ||
                                (isEn
                                    ? 'Repair & Maintenance'
                                    : 'Reparatie- & Onderhoudsbeheer')
                            ).replace(/^\d+\.\s*/, '')}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('invoices')}
                        className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                            activeTab === 'invoices'
                                ? 'border-teal text-teal bg-teal/15 rounded-t-lg'
                                : 'border-transparent text-navy-900/60 hover:text-navy-900'
                        }`}
                    >
                        <FileText className='w-4 h-4' />
                        <span>
                            2.{' '}
                            {(
                                invoicesTab?.tabTitle ||
                                (isEn
                                    ? 'Invoices & Payment History'
                                    : 'Facturen & Betalingshistorie')
                            ).replace(/^\d+\.\s*/, '')}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('documents')}
                        className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                            activeTab === 'documents'
                                ? 'border-teal text-teal bg-teal/15 rounded-t-lg'
                                : 'border-transparent text-navy-900/60 hover:text-navy-900'
                        }`}
                    >
                        <MessageSquare className='w-4 h-4' />
                        <span>
                            3.{' '}
                            {(
                                documentsTab?.tabTitle ||
                                (isEn
                                    ? 'Central Document Vault'
                                    : 'Centraal Documentenarchief')
                            ).replace(/^\d+\.\s*/, '')}
                        </span>
                    </button>
                </div>

                {/* Feature Content */}
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'>
                    {activeTab === 'maintenance' && (
                        <>
                            <div className='lg:col-span-6 space-y-6 px-3'>
                                <h3 className='font-semibold text-2xl md:text-3xl lg:text-4xl tracking-tight text-teal leading-tight'>
                                    {maintenanceTab?.title ||
                                        doc?.features?.[0]?.title ||
                                        (isEn
                                            ? 'Digital Repair & Maintenance Management'
                                            : 'Digitaal Reparatie- & Onderhoudsbeheer')}
                                </h3>
                                <p className='text-navy-900/75 text-base md:text-lg font-light leading-relaxed'>
                                    {maintenanceTab?.text ||
                                        doc?.features?.[0]?.text ||
                                        (isEn
                                            ? 'Tenants report damage or maintenance requests 24/7 via their smartphone. They select the category, attach photos, and track contractor progress live in the portal.'
                                            : 'Huurders melden 24/7 schade of onderhoud via hun smartphone. Ze selecteren de categorie, voegen foto’s toe en volgen de status van de ingeschakelde aannemer live in het portaal.')}
                                </p>
                                <ul className='text-navy-900/85 ml-4'>
                                    {maintenanceTab?.bullets?.length ? (
                                        maintenanceTab.bullets.map(
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
                                                        ? 'Submit maintenance tickets with photo attachments'
                                                        : 'Storingsmeldingen indienen inclusief fotobijlagen'}
                                                </span>
                                            </li>
                                            <li className='flex items-start gap-2.5 mb-2.5'>
                                                <Check className='size-5 text-teal shrink-0 mt-2' />
                                                <span>
                                                    {isEn
                                                        ? 'Real-time progress timeline per repair ticket'
                                                        : 'Realtime voortgangs-timeline per herstelverzoek'}
                                                </span>
                                            </li>
                                            <li className='flex items-start gap-2.5 mb-2.5'>
                                                <Check className='size-5 text-teal shrink-0 mt-2' />
                                                <span>
                                                    {isEn
                                                        ? 'Direct integration with contractors & maintenance planning'
                                                        : 'Directe koppeling met aannemers & onderhoudsplanning'}
                                                </span>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                            <div className='lg:col-span-6 relative pt-4 pr-4 sm:pt-6 sm:pr-6'>
                                {/* Square with round corners Top-Right Floating Badge */}
                                <div className='absolute top-0 right-0 z-20 w-22 h-12 rounded-xl bg-teal text-white flex items-center justify-center gap-1 shadow-xl border-2 border-white pointer-events-none opacity-75'>
                                    <Wrench className='size-6.5 -mr-1' />
                                    <span className='font-light text-2xl tracking-tighter ml-1.5'>
                                        1.
                                    </span>
                                </div>
                                <div className='rounded-xl overflow-hidden shadow-sm'>
                                    <Image
                                        src={tab0Img}
                                        alt={
                                            maintenanceTab?.title ||
                                            'Reparatie en Onderhoudsbeheer UI Preview'
                                        }
                                        width={1200}
                                        height={675}
                                        className='w-full h-auto rounded-lg border border-white/10'
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'invoices' && (
                        <>
                            <div className='lg:col-span-6 space-y-6 px-3'>
                                <h3 className='font-semibold text-2xl md:text-3xl lg:text-4xl tracking-tight text-teal leading-tight'>
                                    {invoicesTab?.title ||
                                        doc?.features?.[1]?.title ||
                                        (isEn
                                            ? 'Insight into Invoices & Payment History'
                                            : 'Inzicht in Facturen & Betalingshistorie')}
                                </h3>
                                <p className='text-navy-900/75 text-base md:text-lg font-light leading-relaxed'>
                                    {invoicesTab?.text ||
                                        doc?.features?.[1]?.text ||
                                        (isEn
                                            ? 'Provide tenants instant visibility into their current rent invoices, service cost breakdowns, and payment statuses. This prevents unnecessary inquiries to finance teams.'
                                            : 'Geef huurders direct inzicht in hun actuele huurfacturen, specificaties van de servicekosten en betalingsstatus. Dit voorkomt onnodige vragen aan de financiële afdeling.')}
                                </p>
                                <ul className='text-navy-900/85 ml-4'>
                                    {invoicesTab?.bullets?.length ? (
                                        invoicesTab.bullets.map(
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
                                                        ? 'Monthly rent specifications & service cost overviews'
                                                        : 'Maandelijkse huurspecificaties & servicekostenoverzichten'}
                                                </span>
                                            </li>
                                            <li className='flex items-start gap-2.5 mb-2.5'>
                                                <Check className='size-5 text-teal shrink-0 mt-2' />
                                                <span>
                                                    {isEn
                                                        ? 'Payment status (Paid / Pending) instantly visible'
                                                        : 'Betalingsstatus (Voldaan / In afwachting) direct zichtbaar'}
                                                </span>
                                            </li>
                                            <li className='flex items-start gap-2.5 mb-2.5'>
                                                <Check className='size-5 text-teal shrink-0 mt-2' />
                                                <span>
                                                    {isEn
                                                        ? 'Downloadable PDF invoices for accounting'
                                                        : 'Downloadbare PDF-facturen voor administratie'}
                                                </span>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                            <div className='lg:col-span-6 relative pt-4 pr-4 sm:pt-6 sm:pr-6'>
                                {/* Square with round corners Top-Right Floating Badge */}
                                <div className='absolute top-0 right-0 z-20 w-22 h-12 rounded-xl bg-teal text-white flex items-center justify-center gap-1 shadow-xl border-2 border-white pointer-events-none opacity-75'>
                                    <FileText className='size-6.5 -mr-1' />
                                    <span className='font-light text-2xl tracking-tighter ml-1.5'>
                                        2.
                                    </span>
                                </div>
                                <div className='rounded-xl overflow-hidden shadow-sm'>
                                    <Image
                                        src={tab1Img}
                                        alt={
                                            invoicesTab?.title ||
                                            'Facturen en Betalingshistorie UI Preview'
                                        }
                                        width={1200}
                                        height={675}
                                        className='w-full h-auto rounded-lg border border-white/10'
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'documents' && (
                        <>
                            <div className='lg:col-span-6 space-y-6 px-3'>
                                <h3 className='font-semibold text-2xl md:text-3xl lg:text-4xl tracking-tight text-teal leading-tight'>
                                    {documentsTab?.title ||
                                        doc?.features?.[2]?.title ||
                                        (isEn
                                            ? 'Central Document Archive'
                                            : 'Centraal Documentenarchief')}
                                </h3>
                                <p className='text-navy-900/75 text-base md:text-lg font-light leading-relaxed'>
                                    {documentsTab?.text ||
                                        doc?.features?.[2]?.text ||
                                        (isEn
                                            ? 'From lease agreements and handover reports to general terms and house rules: all relevant documents stored securely in a personal digital file.'
                                            : 'Van huurovereenkomsten en opleverrapporten tot algemene voorwaarden en huisregels: alle relevante documenten staan veilig opgeslagen in een persoonlijk digitaal dossier.')}
                                </p>
                                <ul className='text-navy-900/85 ml-4'>
                                    {documentsTab?.bullets?.length ? (
                                        documentsTab.bullets.map(
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
                                                        ? 'Secure 24/7 encrypted storage of contracts'
                                                        : 'Veilige 24/7 versleutelde opslag van contracten'}
                                                </span>
                                            </li>
                                            <li className='flex items-start gap-2.5 mb-2.5'>
                                                <Check className='size-5 text-teal shrink-0 mt-2' />
                                                <span>
                                                    {isEn
                                                        ? 'Handover reports, deed documents, and house rules'
                                                        : 'Opleverrapporten, splitsingsakten en huisregels'}
                                                </span>
                                            </li>
                                            <li className='flex items-start gap-2.5 mb-2.5'>
                                                <Check className='size-5 text-teal shrink-0 mt-2' />
                                                <span>
                                                    {isEn
                                                        ? 'No more manual email requests for documents'
                                                        : 'Geen handmatige e-mailverzoeken meer voor documenten'}
                                                </span>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                            <div className='lg:col-span-6 relative pt-4 pr-4 sm:pt-6 sm:pr-6'>
                                {/* Square with round corners Top-Right Floating Badge */}
                                <div className='absolute top-0 right-0 z-20 w-22 h-12 rounded-xl bg-teal text-white flex items-center justify-center gap-1 shadow-xl border-2 border-white pointer-events-none opacity-75'>
                                    <MessageSquare className='size-6.5 -mr-1' />
                                    <span className='font-light text-2xl tracking-tighter ml-1.5'>
                                        3.
                                    </span>
                                </div>
                                <div className='rounded-xl overflow-hidden shadow-sm'>
                                    <Image
                                        src={tab2Img}
                                        alt={
                                            documentsTab?.title ||
                                            'Documentenarchief UI Preview'
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

    const renderArchitecture = (block: any, key: any) => {
        const defaultArchBullets = isEn
            ? [
                  {
                      bold: 'Direct Maintenance Orders:',
                      text: 'Requests logged by tenants automatically generate repair work orders in Business Central.',
                  },
                  {
                      bold: 'Zero Double Entry:',
                      text: 'Payment status and contract renewals synchronize in real-time.',
                  },
                  {
                      bold: 'Role-Based Access:',
                      text: 'Secure authentication for tenants, managers, and external maintenance contractors.',
                  },
              ]
            : [
                  {
                      bold: 'Directe Werkorders:',
                      text: 'Onderhoudsmeldingen van huurders worden direct werkorders in Business Central.',
                  },
                  {
                      bold: 'Nul Dubbele Invoer:',
                      text: 'Betalingsstatussen en contractinzicht worden realtime bijgewerkt in het grootboek.',
                  },
                  {
                      bold: 'Rollen & Rechten:',
                      text: 'Veilig rollensysteem voor huurders, beheerders en servicepartners.',
                  },
              ];

        const bTag =
            block?.tag ||
            architectureBlock?.tag ||
            (isEn ? 'ERP INTEGRATION' : 'ERP INTEGRATIE');
        const bTitle =
            block?.title ||
            architectureBlock?.title ||
            (isEn
                ? '24/7 Digital Self-Service & Realtime ERP Synchronization'
                : '24/7 Digital Self-Service & Realtime ERP Synchronisatie');
        const bDesc =
            block?.desc ||
            architectureBlock?.desc ||
            (isEn
                ? 'The Emlinked tenant portal connects directly to Microsoft Business Central without middle-tier delay.'
                : 'Het Emlinked huurdersportaal is geen losstaand eiland. Alle meldingen, contractwijzigingen en betalingen worden direct gesynchroniseerd met je centrale Business Central database.');
        const bBullets = block?.bullets?.length
            ? block.bullets.map((text: string) => ({ bold: '', text }))
            : architectureBlock?.bullets?.length
              ? architectureBlock.bullets.map((text: string) => ({
                    bold: '',
                    text,
                }))
              : defaultArchBullets;
        const bImage =
            getImageUrl(
                block?.image || architectureBlock?.image,
                block?.imagePath || architectureBlock?.imagePath,
            ) ||
            '/emlinked/apps/huurdersportaal/automatiseren_huurdersportaal.jpg';

        return (
            <section
                key={key}
                className='px-6 py-20 md:py-24 text-navy-900 relative z-10 overflow-hidden bg-background'
            >
                <div className='max-w-7xl mx-auto relative z-10'>
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
                        <div className='lg:col-span-6 flex flex-col gap-6 text-left'>
                            <Badge color='teal' uppercase dot>
                                {bTag}
                            </Badge>
                            <h2 className='font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-navy-900 leading-tight'>
                                {bTitle}
                            </h2>
                            <p className='text-navy-900/75 text-base md:text-lg font-light leading-relaxed'>
                                {bDesc}
                            </p>
                            <div className='space-y-4 pt-2'>
                                {bBullets.map((bullet: any, bIdx: number) => (
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
                        <div className='lg:col-span-6 flex justify-center lg:justify-end'>
                            <div className='relative w-full rounded-2xl overflow-hidden border border-black/10 shadow-sm group bg-white'>
                                <Image
                                    src={bImage}
                                    alt={bTitle}
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
    };

    const renderCta = (block: any, key: any) => (
        // ── BLOCK 4: CALL TO ACTION BANNER ── */}
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
                                        ? 'Ready to digitalise your tenant communication?'
                                        : 'Klaar om je huurdercommunicatie te digitaliseren?')}
                            </h2>

                            <p className='text-navy-700 text-base md:text-lg font-light leading-relaxed max-w-2xl'>
                                {ctaBlock?.desc ||
                                    doc?.cta?.desc ||
                                    (isEn
                                        ? 'Discover how our tenant portal streamlines communication and saves your property managers hours of manual work.'
                                        : 'Ontdek hoe ons huurdersportaal de communicatie stroomlijnt en je beheerders uren handmatig werk bespaart.')}
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
                                                ? 'Request Demo'
                                                : 'Demo aanvragen')}
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
                                    'Huurdersportaal Illustratie'
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
