import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { sanityFetch } from '@/lib/sanity';
import { HeroSection } from '@/components/blocks/HeroSection';
import { Box3Calculator } from '@/components/Box3Calculator';
import {
    Zap,
    ArrowRight,
    FileSpreadsheet,
    Link2Off,
    Receipt,
    Clock,
    Building2,
    ShieldCheck,
    BarChart3,
    Check,
    Scale,
    Layers,
    FileText,
    Sparkles,
    CheckCircle2,
} from 'lucide-react';

interface Box3PageProps {
    params: Promise<{ locale: string }>;
}

async function getSanityPageData(locale: string) {
    try {
        return await sanityFetch<any>({
            query: `*[_type == "page" && (slug.current == "box3-check" || slug.current == "/box3-check") && language == $locale][0] {
                title,
                pageBlocks,
                seo {
                    seoTitle,
                    seoDescription,
                    canonical,
                    noIndex
                }
            }`,
            params: { locale },
        });
    } catch (e) {
        console.error('Failed to fetch box3-check page from Sanity:', e);
        return null;
    }
}

export async function generateMetadata({
    params,
}: Box3PageProps): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getSanityPageData(locale);
    const seo = pageData?.seo;

    const title =
        seo?.seoTitle ||
        (isEn
            ? 'Box 3 Real Estate Check | Calculate Actual Yield | emlinked'
            : 'Box 3 Vastgoed Check | Bereken Werkelijk Rendement | emlinked');

    const description =
        seo?.seoDescription ||
        (isEn
            ? 'Calculate the impact of changing Box 3 legislation on your real estate portfolio for free. Discover your fiscal position and keep your yields audit-proof.'
            : 'Bereken gratis de impact van de Wet werkelijk rendement box 3 op uw vastgoedportefeuille. Ontdek uw fiscale positie en houd uw rendement op orde.');

    const robots = seo?.noIndex ? 'noindex, nofollow' : 'index, follow';

    return {
        title,
        description,
        robots,
        alternates: {
            canonical:
                seo?.canonical || (isEn ? '/en/box3-check' : '/box3-check'),
        },
        openGraph: {
            title,
            description,
            url: isEn
                ? 'https://www.emlinked.com/en/box3-check'
                : 'https://www.emlinked.com/box3-check',
            siteName: 'emlinked',
            locale: isEn ? 'en_US' : 'nl_NL',
            type: 'website',
        },
    };
}

export default async function Box3CheckPage({ params }: Box3PageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getSanityPageData(locale);

    // Dynamic Sanity override fallback
    const heroBlock = pageData?.pageBlocks?.find(
        (b: any) => b._type === 'hero',
    );

    const heroLabel =
        heroBlock?.label ||
        (isEn
            ? 'ADMINISTRATION OBLIGATION 2028 · PARLIAMENT APPROVED'
            : 'ADMINISTRATIEPLICHT 2028 · TWEEDE KAMER AKKOORD');
    const heroTitle =
        heroBlock?.title ||
        (isEn
            ? 'Your real estate portfolio always *tax-audit ready*.'
            : 'Uw vastgoedportefeuille altijd *aangifte-klaar*.');
    const heroSubtitle =
        heroBlock?.subtitle ||
        (isEn
            ? 'emlinked manages your lease agreements, operating costs, and financial administration in one streamlined system. Specifically engineered for portfolios from 50 rental units up. Built natively on Microsoft Business Central.'
            : 'emlinked beheert uw huurcontracten, kosten en financiële administratie in één gestroomlijnd systeem. Speciaal voor portefeuilles vanaf 50 verhuureenheden. Gebouwd op Microsoft Business Central.');

    return (
        <main className='flex-1 text-white bg-slate-950'>
            {/* ========================================================================= */}
            {/* SECTION B: Hero Section with Clean Dashboard Preview Card                  */}
            {/* ========================================================================= */}
            <HeroSection
                label={heroLabel}
                title={heroTitle}
                subtitle={heroSubtitle}
                ctaLabel={isEn ? 'Request Free Demo' : 'Gratis demo aanvragen'}
                ctaLink='/contact'
                secondaryCtaLabel={
                    isEn
                        ? 'Calculate Box 3 impact →'
                        : 'Bereken uw box 3-impact →'
                }
                secondaryCtaLink='#calculator'
                showProof={true}
                proofText={
                    isEn
                        ? 'Used by owners of 50 to 500+ units across the Netherlands'
                        : 'Gebruikt door eigenaren van 50 tot 500+ verhuureenheden in heel Nederland'
                }
                locale={locale}
                customGraphic={
                    <div className='w-full bg-slate-900/90 border border-amber/30 rounded-2xl p-6 md:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden'>
                        <div className='flex items-center justify-between border-b border-white/10 pb-4 mb-5'>
                            <div>
                                <span className='text-[10px] font-mono font-bold text-amber uppercase tracking-widest block'>
                                    {isEn
                                        ? 'Portfolio Overview · Live'
                                        : 'Portefeuille-overzicht · Live'}
                                </span>
                                <h3 className='text-sm font-bold text-white mt-0.5'>
                                    {isEn
                                        ? 'Box 3 Compliance Status'
                                        : 'Box 3-Status & Metrics'}
                                </h3>
                            </div>
                            <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold'>
                                <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse' />
                                {isEn ? 'Active' : 'Actueel'}
                            </span>
                        </div>

                        <div className='space-y-3.5'>
                            {[
                                {
                                    label: isEn
                                        ? 'Total Properties'
                                        : 'Totale Objecten',
                                    val: '48',
                                    badge: isEn ? 'Active' : 'Actueel',
                                    bStyle: 'bg-white/10 text-white/80 border border-white/10',
                                },
                                {
                                    label: isEn
                                        ? 'Occupancy Rate'
                                        : 'Bezettingsgraad',
                                    val: '96,4%',
                                    badge: isEn ? '↑ Good' : '↑ Goed',
                                    bStyle: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold',
                                },
                                {
                                    label: isEn
                                        ? 'Rental Income YTD'
                                        : 'Huurinkomsten YTD',
                                    val: '€ 387.200',
                                    badge: null,
                                    bStyle: '',
                                },
                                {
                                    label: isEn
                                        ? 'Expenses Logged'
                                        : 'Kosten Geregistreerd',
                                    val: '€ 41.800',
                                    badge: isEn ? 'Deductible' : 'Aftrekbaar',
                                    bStyle: 'bg-amber/20 text-amber border border-amber/30 font-bold',
                                },
                                {
                                    label: isEn
                                        ? 'Box 3 Status 2028'
                                        : 'Box 3-Status 2028',
                                    val: '✓ Aangifte-klaar',
                                    badge: null,
                                    bStyle: '',
                                },
                                {
                                    label: isEn
                                        ? 'Open CPI Indexations'
                                        : 'Openstaande Indexaties',
                                    val: '3',
                                    badge: isEn
                                        ? 'Action Required'
                                        : 'Actie vereist',
                                    bStyle: 'bg-amber/20 text-amber font-semibold',
                                },
                            ].map((row, idx) => (
                                <div
                                    key={idx}
                                    className='flex justify-between items-center py-2 border-b border-white/5 last:border-b-0 text-xs md:text-sm'
                                >
                                    <span className='text-white/60 font-medium'>
                                        {row.label}
                                    </span>
                                    <span className='font-semibold text-white flex items-center gap-2'>
                                        <span>{row.val}</span>
                                        {row.badge && (
                                            <span
                                                className={`text-[10px] px-2 py-0.5 rounded-md font-mono ${row.bStyle}`}
                                            >
                                                {row.badge}
                                            </span>
                                        )}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className='mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50'>
                            <span>Microsoft Business Central</span>
                            <span className='text-amber font-mono font-bold'>
                                100% Synced
                            </span>
                        </div>
                    </div>
                }
            />

            {/* ========================================================================= */}
            {/* SECTION C: Problem & Fiscale Context (#voor-wie) - LIGHT SECTION           */}
            {/* ========================================================================= */}
            <section
                id='voor-wie'
                className='py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] text-[#060e32] border-b border-amber/20'
            >
                <div className='max-w-7xl mx-auto space-y-12'>
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
                        <div className='lg:col-span-6 space-y-3'>
                            <span className='text-xs font-mono font-bold text-amber uppercase tracking-widest bg-amber/15 border border-amber/40 px-4 py-1.5 rounded-full inline-block backdrop-blur-md shadow-xs'>
                                {isEn ? 'Target Audience' : 'Voor Wie'}
                            </span>
                            <h2 className='font-display text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[#060e32] leading-tight tracking-tight'>
                                {isEn
                                    ? 'Real estate management with 50+ units gets stuck fast'
                                    : 'Vastgoedbeheer met 50+ eenheden loopt snel vast'}
                            </h2>
                        </div>
                        <div className='lg:col-span-6 space-y-4'>
                            <p className='text-[#060e32]/80 text-base md:text-lg leading-relaxed font-light'>
                                {isEn
                                    ? 'Lease contracts stored in one place, maintenance expenses elsewhere, and tax records scattered across loose spreadsheets. From 2028, tax authorities require exact proof per property of your actual net yield.'
                                    : 'Huurcontracten op één plek, onderhoudskosten elders, en de fiscale administratie verspreid over losse documenten. Vanaf 2028 verwacht de Belastingdienst dat u per pand exact kunt aantonen wat het werkelijke rendement is geweest.'}
                            </p>
                        </div>
                    </div>

                    {/* Fiscale Context Callout Box */}
                    <div className='p-6 md:p-8 rounded-2xl bg-white/90 border border-amber/40 shadow-xl relative overflow-hidden backdrop-blur-md'>
                        <div className='flex items-start gap-4'>
                            <div className='p-3 rounded-xl bg-amber/15 text-amber shrink-0 mt-1 border border-amber/30'>
                                <Scale className='w-6 h-6' />
                            </div>
                            <div className='space-y-2'>
                                <h3 className='text-base md:text-lg font-bold text-[#060e32]'>
                                    {isEn
                                        ? '⚖️ Tax Context: Actual Yield Act Box 3'
                                        : '⚖️ Fiscale Context: Wet werkelijk rendement box 3'}
                                </h3>
                                <p className='text-xs md:text-sm text-[#060e32]/85 leading-relaxed font-light'>
                                    {isEn
                                        ? 'Property owners are subject to a formal recordkeeping and retention obligation. Rental income, maintenance expenses, and improvement costs must be verifiable per property with source documents.'
                                        : 'Vastgoedeigenaren krijgen een formele administratie- en bewaarplicht. Huurinkomsten, onderhoudskosten en verbeteringskosten moeten per pand aantoonbaar zijn met brondocumenten.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 4 Pain Points Grid */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {[
                            {
                                icon: (
                                    <FileSpreadsheet className='w-6 h-6 text-amber' />
                                ),
                                title: isEn
                                    ? 'Data Scattered Across Excel'
                                    : 'Data verspreid over Excel-bestanden',
                                text: isEn
                                    ? 'Version conflicts and manual imports impede a reliable complete portfolio overview.'
                                    : 'Versieconflicten en handmatige imports belemmeren een betrouwbaar totaaloverzicht.',
                            },
                            {
                                icon: (
                                    <Link2Off className='w-6 h-6 text-amber' />
                                ),
                                title: isEn
                                    ? 'Management & Finance Siloed'
                                    : 'Beheer en boekhouding als losse eilanden',
                                text: isEn
                                    ? 'Contract management is separated from financial ledgers, resulting in duplicate work.'
                                    : 'Contractbeheer staat los van de financiën, met dubbel werk als gevolg.',
                            },
                            {
                                icon: (
                                    <Receipt className='w-6 h-6 text-amber' />
                                ),
                                title: isEn
                                    ? 'Cost Proof Missing'
                                    : 'Kostendocumentatie niet op orde',
                                text: isEn
                                    ? 'Maintenance invoices are missing or not directly linked to specific properties.'
                                    : 'Facturen voor onderhoud ontbreken of zijn niet direct toegewezen aan het specifieke object.',
                            },
                            {
                                icon: <Clock className='w-6 h-6 text-amber' />,
                                title: isEn
                                    ? 'Accountant Waiting on You'
                                    : 'Accountant wacht altijd op u',
                                text: isEn
                                    ? 'Quarterly and year-end closes take weeks because data has to be gathered manually.'
                                    : 'Kwartaal- en jaarafsluitingen duren lang omdat gegevens handmatig verzameld moeten worden.',
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className='p-6 rounded-2xl bg-white border border-amber/20 hover:border-amber/50 shadow-md hover:shadow-xl transition-all duration-300 space-y-3 group'
                            >
                                <div className='p-3 rounded-xl bg-amber/15 w-fit group-hover:scale-110 transition-transform border border-amber/30'>
                                    {item.icon}
                                </div>
                                <h3 className='text-base font-bold text-[#060e32]'>
                                    {item.title}
                                </h3>
                                <p className='text-xs text-[#060e32]/75 leading-relaxed font-light'>
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* SECTION D: Solution Workflow (#wat-het-doet)                              */}
            {/* ========================================================================= */}
            <section
                id='wat-het-doet'
                className='py-20 px-6 bg-slate-950 border-b border-white/10'
            >
                <div className='max-w-7xl mx-auto space-y-12'>
                    <div className='text-center max-w-3xl mx-auto space-y-4'>
                        <span className='text-xs font-bold text-amber uppercase tracking-widest bg-amber/15 border border-amber/30 px-3.5 py-1 rounded-full inline-block'>
                            {isEn ? 'The Solution' : 'De Oplossing'}
                        </span>
                        <h2 className='font-display text-3xl md:text-4xl font-extrabold text-white'>
                            {isEn
                                ? 'One system. From lease agreement to tax reporting.'
                                : 'Eén systeem. Van huurcontract tot belastingrapportage.'}
                        </h2>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        {[
                            {
                                step: '01',
                                title: isEn
                                    ? 'Centralize Properties & Contracts'
                                    : 'Alle objecten en contracten centraal',
                                text: isEn
                                    ? 'WOZ values, lease contracts, CPI indexations, and vacancies managed in one single place.'
                                    : 'WOZ-waarden, huurcontracten, indexations en leegstand op één plek.',
                                feature: isEn
                                    ? 'Automatic CPI Lease Indexation'
                                    : 'Automatische huurindexatie via CPI-koppeling',
                            },
                            {
                                step: '02',
                                title: isEn
                                    ? 'Expenses Logged Automatically'
                                    : 'Kosten automatisch geregistreerd',
                                text: isEn
                                    ? 'Maintenance, service fees, and mortgage interest directly deductible and organized for tax audits.'
                                    : 'Onderhoud, servicekosten en hypotheekrente direct aftrekbaar en georganiseerd voor uw belastingaangifte.',
                                feature: isEn
                                    ? 'Box 3 Audit Export Module'
                                    : 'Box 3-aangifte exportfunctie',
                            },
                            {
                                step: '03',
                                title: isEn
                                    ? 'Accountant Ready Reporting'
                                    : 'Rapportages voor uw accountant',
                                text: isEn
                                    ? 'Every quarter a fully transparent, evidence-backed financial overview per property.'
                                    : 'Elk kwartaal een transparant en onderbouwd overzicht per pand.',
                                feature: isEn
                                    ? 'Power BI & Excel Integration'
                                    : 'Power BI & Excel-integratie',
                            },
                        ].map((card, idx) => (
                            <div
                                key={idx}
                                className='p-8 rounded-3xl bg-slate-900/80 border border-white/10 hover:border-amber/40 transition-all duration-300 space-y-4 flex flex-col justify-between group'
                            >
                                <div className='space-y-4'>
                                    <span className='text-3xl font-mono font-extrabold text-amber/40 group-hover:text-amber transition-colors'>
                                        {card.step}
                                    </span>
                                    <h3 className='text-xl font-bold text-white'>
                                        {card.title}
                                    </h3>
                                    <p className='text-xs md:text-sm text-white/75 leading-relaxed font-light'>
                                        {card.text}
                                    </p>
                                </div>
                                <div className='pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-bold text-amber'>
                                    <CheckCircle2 className='w-4 h-4 shrink-0' />
                                    <span>{card.feature}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* SECTION E: Interactive Box 3 Calculator (#calculator)                      */}
            {/* ========================================================================= */}
            <Box3Calculator isEn={isEn} />

            {/* ========================================================================= */}
            {/* SECTION F: Microsoft Business Central Positioning                         */}
            {/* ========================================================================= */}
            <section className='py-20 px-6 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] text-[#060e32] border-t border-amber/20'>
                <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
                    <div className='lg:col-span-7 space-y-6'>
                        <span className='inline-flex items-center gap-2 text-xs font-bold text-[#060e32] uppercase tracking-widest bg-amber/20 border border-amber/40 px-3.5 py-1 rounded-full'>
                            <Building2 className='w-4 h-4 text-amber' />
                            {isEn
                                ? 'Microsoft Business Central Platform'
                                : 'Microsoft Ecosystem'}
                        </span>
                        <h2 className='font-display text-3xl md:text-4xl font-extrabold text-[#060e32] leading-tight'>
                            {isEn
                                ? 'The reliability of Microsoft. The expertise of emlinked.'
                                : 'De betrouwbaarheid van Microsoft. De vakkennis van emlinked.'}
                        </h2>
                        <p className='text-[#060e32]/80 text-base md:text-lg font-light leading-relaxed'>
                            {isEn
                                ? 'emlinked is engineered as a certified solution on Microsoft Business Central — the ERP standard for over 50,000 companies globally. You benefit from enterprise security, business continuity, and native integration with Excel and Power BI.'
                                : 'emlinked is ontwikkeld als een gecertificeerde oplossing op Microsoft Business Central — de ERP-standaard voor meer dan 50.000 bedrijven wereldwijd. U profiteert van enterprise-grade beveiliging, continuïteit en naadloze integratie met Excel en Power BI.'}
                        </p>
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2'>
                            {[
                                {
                                    title: isEn
                                        ? 'Enterprise Security'
                                        : 'Enterprise Beveiliging',
                                    desc: isEn
                                        ? 'ISO 27001 & SOC 2 Certified'
                                        : 'ISO 27001 & SOC 2 Gecertificeerd',
                                },
                                {
                                    title: isEn
                                        ? 'Power BI Analytics'
                                        : 'Power BI Analyses',
                                    desc: isEn
                                        ? 'Real-time financial dashboards'
                                        : 'Realtime financiële dashboards',
                                },
                                {
                                    title: isEn
                                        ? '50,000+ Customers'
                                        : '50.000+ Bedrijven',
                                    desc: isEn
                                        ? 'Proven global ERP backbone'
                                        : 'Bewezen wereldwijd ERP fundament',
                                },
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className='p-4 rounded-2xl bg-white/80 border border-amber/20 shadow-sm space-y-1'
                                >
                                    <h4 className='text-xs font-bold text-[#060e32]'>
                                        {item.title}
                                    </h4>
                                    <p className='text-[11px] text-[#060e32]/70 font-light'>
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='lg:col-span-5 flex justify-center'>
                        <div className='relative w-full max-w-md p-8 rounded-3xl bg-[#060e32] text-white border border-amber/30 shadow-2xl space-y-6'>
                            <div className='flex items-center gap-4 border-b border-white/10 pb-4'>
                                <Image
                                    src='/emlinked/emlinked-icon.png'
                                    alt='Microsoft Business Central'
                                    width={48}
                                    height={48}
                                    className='w-12 h-12 rounded-xl object-contain bg-white/10 p-1.5'
                                />
                                <div>
                                    <h3 className='font-bold text-base text-white'>
                                        Microsoft Business Central
                                    </h3>
                                    <span className='text-xs text-amber font-mono'>
                                        Certified Dynamics 365 Module
                                    </span>
                                </div>
                            </div>
                            <ul className='space-y-3 text-xs md:text-sm text-white/80'>
                                <li className='flex items-center gap-3'>
                                    <Check className='w-4 h-4 text-amber shrink-0' />
                                    <span>
                                        {isEn
                                            ? 'Native ERP GL ledger integration'
                                            : 'Native ERP grootboek integratie'}
                                    </span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <Check className='w-4 h-4 text-amber shrink-0' />
                                    <span>
                                        {isEn
                                            ? 'Automatic SEPA & bank reconciliation'
                                            : 'Automatische SEPA & bankaflettering'}
                                    </span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <Check className='w-4 h-4 text-amber shrink-0' />
                                    <span>
                                        {isEn
                                            ? 'Audit trail for tax accountants'
                                            : 'Volledige audit trail voor de Belastingdienst'}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* SECTION G: Final Pre-Footer Callout Banner                                 */}
            {/* ========================================================================= */}
            <section className='py-20 px-6 bg-slate-950'>
                <div className='max-w-7xl mx-auto p-8 md:p-14 rounded-3xl bg-texture-navy border border-amber/40 text-center flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden'>
                    <div className='absolute -top-24 -right-24 w-96 h-96 bg-amber/15 rounded-full blur-3xl pointer-events-none' />
                    <span className='text-xs font-bold text-amber uppercase tracking-widest bg-amber/15 border border-amber/30 px-3.5 py-1 rounded-full'>
                        {isEn
                            ? 'Get Ready for 2028'
                            : 'Klaar voor de Wet werkelijk rendement'}
                    </span>
                    <h2 className='text-3xl md:text-4xl font-extrabold text-white max-w-3xl leading-tight'>
                        {isEn
                            ? 'Make your real estate portfolio 100% tax-audit proof'
                            : 'Maak uw vastgoedportefeuille 100% aangifte-klaar'}
                    </h2>
                    <p className='text-sm md:text-base text-white/80 max-w-2xl font-light leading-relaxed'>
                        {isEn
                            ? 'Discover how Emlinked automates rental invoicing, cost tracking, and bank reconciliation natively inside Microsoft Business Central.'
                            : 'Ervaar zelf hoe Emlinked uw huurfacturatie, kostenregistratie en bankaflettering volautomatisch verwerkt binnen Microsoft Business Central.'}
                    </p>
                    <div className='flex flex-col sm:flex-row gap-4 pt-2'>
                        <Link
                            href='/contact'
                            className='inline-flex h-12 items-center justify-center rounded-xl bg-amber hover:bg-amber-hover px-8 text-sm font-bold text-[#060e32] transition-all duration-200 shadow-xl hover:scale-105'
                        >
                            <span>
                                {isEn
                                    ? 'Request a Demo'
                                    : 'Gratis demonstratie aanvragen'}
                            </span>
                            <ArrowRight className='ml-2 w-4 h-4' />
                        </Link>
                        <a
                            href='#calculator'
                            className='inline-flex h-12 items-center justify-center rounded-xl border border-white/20 hover:bg-white/10 px-8 text-sm font-bold text-white transition-all duration-200'
                        >
                            <span>
                                {isEn
                                    ? 'Calculate your yield'
                                    : 'Bereken uw situatie'}
                            </span>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
