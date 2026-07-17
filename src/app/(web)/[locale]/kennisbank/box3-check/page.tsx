import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Star, AlertCircle, Info, BookOpen } from 'lucide-react';
import { Box3Calculator } from '@/components/Box3Calculator';
import { sanityFetch } from '@/lib/sanity';
import { DataGridCanvas } from '@/components/ui/data-grid-canvas';

interface Box3PageProps {
    params: Promise<{ locale: string }>;
}

async function getSanityPageData(locale: string) {
    try {
        return await sanityFetch<any>({
            query: `*[_type == "page" && slug.current == "box3-check" && language == $locale][0] {
                title,
                seo {
                    seoTitle,
                    seoDescription,
                    canonical,
                    noIndex
                },
                pageBlocks[] {
                    _type,
                    _key,
                    label,
                    title,
                    subtitle,
                    desc,
                    sectionTitle,
                    content,
                    buttonLabel,
                    buttonLink
                }
            }`,
            params: { locale },
        });
    } catch (e) {
        console.error('Failed to fetch Box 3 check page from Sanity:', e);
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
            ? 'Box 3 Tax Calculator for Real Estate Investors | Emlinked'
            : 'Box 3 Check: Bereken de Fiscale Impact op je Vastgoedportefeuille | emlinked');

    const description =
        seo?.seoDescription ||
        (isEn
            ? 'Calculate the impact of actual vs forfaitaire tax in Box 3 for your Dutch real estate portfolio based on the latest guidelines.'
            : 'Bereken direct de impact van de werkelijke versus forfaitaire heffing in Box 3 voor je vastgoedportefeuille op basis van de nieuwste wetgeving.');

    const robots = seo?.noIndex ? 'noindex, nofollow' : 'index, follow';

    return {
        title,
        description,
        robots,
        alternates: {
            canonical:
                seo?.canonical ||
                (isEn ? '/en/kennisbank/box3-check' : '/kennisbank/box3-check'),
        },
    };
}

// Simple internal renderer for Portable Text or Fallback Content
function BlockContentRenderer({ content }: { content: any }) {
    if (!content) return null;

    // If content is an array of strings (our local fallback representation)
    if (
        Array.isArray(content) &&
        content.every((item) => typeof item === 'string')
    ) {
        return (
            <div className='space-y-4'>
                {content.map((paragraph, index) => {
                    if (paragraph.startsWith('•')) {
                        return (
                            <li
                                key={index}
                                className='text-sm text-muted-foreground list-none flex items-start gap-2 pl-4'
                            >
                                <span className='text-primary font-bold'>
                                    •
                                </span>
                                <span>{paragraph.substring(1).trim()}</span>
                            </li>
                        );
                    }
                    return (
                        <p
                            key={index}
                            className='text-sm text-muted-foreground leading-relaxed'
                        >
                            {paragraph}
                        </p>
                    );
                })}
            </div>
        );
    }

    // If content is Sanity Portable Text
    if (Array.isArray(content)) {
        return (
            <div className='space-y-4'>
                {content.map((block: any, idx: number) => {
                    if (block._type === 'block') {
                        const style = block.style || 'normal';
                        const text =
                            block.children?.map((c: any) => c.text).join('') ||
                            '';

                        if (style === 'h1' || style === 'h2') {
                            return (
                                <h3
                                    key={idx}
                                    className='text-lg font-bold text-foreground mt-8 mb-4'
                                >
                                    {text}
                                </h3>
                            );
                        }
                        if (style === 'h3' || style === 'h4') {
                            return (
                                <h4
                                    key={idx}
                                    className='text-base font-bold text-foreground mt-6 mb-2'
                                >
                                    {text}
                                </h4>
                            );
                        }

                        // Handle bullet lists
                        if (block.listItem === 'bullet') {
                            return (
                                <li
                                    key={idx}
                                    className='text-sm text-muted-foreground list-none flex items-start gap-2 pl-4'
                                >
                                    <span className='text-primary font-bold'>
                                        •
                                    </span>
                                    <span>{text}</span>
                                </li>
                            );
                        }

                        return (
                            <p
                                key={idx}
                                className='text-sm text-muted-foreground leading-relaxed'
                            >
                                {text}
                            </p>
                        );
                    }
                    return null;
                })}
            </div>
        );
    }

    return null;
}

export default async function Box3CheckPage({ params }: Box3PageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';

    // Fetch from Sanity
    const pageData = await getSanityPageData(locale);

    // Helper to prepend locale for links
    const getPath = (path: string) => {
        if (locale === 'nl') return path;
        return `/en${path === '/' ? '' : path}`;
    };

    // Blueprint defaults if Sanity content is missing
    const fallbackTitle = isEn
        ? 'Box 3 Check: Calculate Fiscal Impact'
        : 'Box 3 Check: Bereken de Fiscale Impact op je Vastgoedportefeuille';
    const fallbackTagline = isEn
        ? 'Forfaitaire yield vs. actual return: discover which is most tax-efficient.'
        : 'Fictief forfait vs. aantoonbaar werkelijk rendement: doe direct de check.';
    const fallbackIntro = isEn
        ? 'Determine the impact of the latest Dutch High Court Box 3 tax ruling. Input your portfolio parameters below.'
        : 'Handmatige berekeningen en onzekerheid over de nieuwe Box 3 heffing kosten tijd. Gebruik onze interactieve rekentool om direct de fiscale heffing onder beide stelsels te vergelijken op basis van de nieuwste Hoge Raad richtlijnen.';

    const fallbackBlocks = [
        {
            _type: 'calculatorBlock',
            calculatorType: 'box3',
        },
        {
            _type: 'richText',
            sectionTitle: isEn
                ? 'Forfaitaire vs. Actual return: What changes?'
                : 'Fictief vs. Werkelijk Rendement: Wat Verandert Er?',
            content: isEn
                ? [
                      'In recent years, the taxation of wealth in Box 3 has shifted significantly. Previously, the Tax Authority assumed a fixed, forfaitaire yield on assets including rented properties (approx 6.04% for overige bezittingen in 2026).',
                      'The Dutch High Court (Hoge Raad) ruled that this is in violation of human rights if actual yields are lower. You are now permitted to file based on actual net yield: gross rent receipts minus operating maintenance costs and mortgage interest paid.',
                  ]
                : [
                      'De afgelopen jaren is er veel te doen geweest rondom de belastingheffing in Box 3. Voorheen ging de Belastingdienst uit van een vast, fictief rendement (forfait) op je overige bezittingen, waaronder verhuurd vastgoed. Dit forfait ligt voor 2026 rond de 6,04%.',
                      'De Hoge Raad heeft echter geoordeeld dat deze methode in strijd is met het Europees Verdrag voor de Rechten van de Mens. Indien je werkelijke rendement lager is dan het forfaitaire rendement, mag je worden belast op basis van je werkelijke rendement. Dit werkelijke rendement omvat de bruto huurinkomsten minus de aantoonbare exploitatiekosten en de werkelijke rentelasten van je hypotheek.',
                  ],
        },
        {
            _type: 'richText',
            sectionTitle: isEn
                ? 'What expenses are deductible?'
                : 'Welke Kosten mag je Aftrekken als Vastgoedbelegger?',
            content: isEn
                ? [
                      'Under the actual yield system, the definition of deductible operating expenses is essential. You can reduce your gross rent base with:',
                      '• Maintenance and property repair expenses.',
                      '• Technical and administrative management fees.',
                      '• Standard property insurances (opstal, glass).',
                      '• Actual interest paid on portfolio mortgages.',
                  ]
                : [
                      'Onder het stelsel van werkelijk rendement is de definitie van aftrekbare kosten cruciaal. Je mag onder andere de volgende posten in mindering brengen op je bruto huurinkomsten:',
                      '• Onderhouds- en herstelkosten van de panden.',
                      '• Beheerskosten (bijvoorbeeld administratief of technisch beheer).',
                      '• Verzekeringen (opstal, glas, etc.).',
                      '• Werkelijk betaalde hypotheekrente.',
                  ],
        },
        {
            _type: 'richText',
            sectionTitle: isEn
                ? 'How Emlinked automates Box 3 reporting'
                : 'Hoe emlinked Software je Box 3 Rapportage Automatiseert',
            content: isEn
                ? [
                      'Manually collecting banking statements, ledger entries, and maintenance invoices is time-consuming. Emlinked is engineered to automate this fully.',
                      'With direct banking sync and automated invoice processing, all income and operating expenses are reconciled to the correct properties. The system yields an audit-proof Box 3 report in one click, ready for tax filing.',
                  ]
                : [
                      'Het handmatig bijhouden van alle huurstromen, exploitatiekosten en hypotheekrentes is een tijdrovende klus. emlinked is speciaal ontworpen om dit proces volledig te automatiseren.',
                      'Door de directe koppeling met je bankrekening en inkoopfactuurverwerking (via Continia Document Capture) worden alle kosten en opbrengsten automatisch gecategoriseerd en gekoppeld aan de juiste objecten. Hierdoor genereert het platform met één klik een Box 3 rapportage die direct klaar is voor je belastingaangifte.',
                  ],
        },
        {
            _type: 'ctaBanner',
            title: isEn
                ? 'Always ready for tax season'
                : 'Altijd aangifte-klaar met emlinked',
            subtitle: isEn
                ? 'Discover how Emlinked automates property bookkeeping and Box 3 reporting. Request a custom demo today.'
                : 'Benieuwd hoe we jouw vastgoedadministratie en Box 3 rapportages kunnen automatiseren? Vraag vandaag nog een demo aan.',
            buttonLabel: isEn ? 'Request Demo' : 'Demo Aanvragen',
            buttonLink: '/contact',
        },
    ];

    const title = pageData?.title || fallbackTitle;
    const blocks = pageData?.pageBlocks || fallbackBlocks;

    return (
        <div className='flex flex-col min-h-screen'>
            {/* Hero Header */}
            <section className="relative px-6 py-20 md:py-28 overflow-hidden bg-[url('/hero/bkg_darkBlue.jpg')] bg-cover bg-center bg-no-repeat text-white border-b border-white/10">
                <DataGridCanvas className='pointer-events-none absolute inset-0 h-full w-full opacity-70 z-10' />

                {/* Ambient Background Glow */}
                <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber/5 rounded-full blur-[120px] pointer-events-none animate-float-glow z-0' />

                {/* Wave Animation with Orange Glow - Disabled
                <div className='absolute bottom-[-5%] left-0 w-full h-[20%] overflow-hidden pointer-events-none z-0 '>
                    <svg
                        className='absolute w-[200%] h-full'
                        viewBox='0 0 2000 120'
                        preserveAspectRatio='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <defs>
                            <linearGradient
                                id='wave-glow-box3'
                                x1='0%'
                                y1='0%'
                                x2='0%'
                                y2='100%'
                            >
                                <stop
                                    offset='0%'
                                    stopColor='#ff9400'
                                    stopOpacity='0.45'
                                />
                                <stop
                                    offset='15%'
                                    stopColor='#ff9400'
                                    stopOpacity='0.15'
                                />
                                <stop
                                    offset='60%'
                                    stopColor='#ff9400'
                                    stopOpacity='0'
                                />
                            </linearGradient>
                            <filter
                                id='glow-blur-box3'
                                x='-10%'
                                y='-10%'
                                width='120%'
                                height='120%'
                            >
                                <feGaussianBlur
                                    stdDeviation='5'
                                    result='blur'
                                />
                                <feMerge>
                                    <feMergeNode in='blur' />
                                    <feMergeNode in='SourceGraphic' />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Wave 1 }
                        <path
                            d='M0,60 C250,100 250,20 500,60 C750,100 750,20 1000,60 C1250,100 1250,20 1500,60 C1750,100 1750,20 2000,60 L2000,120 L0,120 Z'
                            fill='url(#wave-glow-box3)'
                            filter='url(#glow-blur-box3)'
                            className='animate-wave-slow'
                        />

                        {/* Wave 2 }
                        <path
                            d='M0,60 C150,10 350,110 500,60 C650,10 850,110 1000,60 C1150,10 1350,110 1500,60 C1650,10 1850,110 2000,60 L2000,120 L0,120 Z'
                            fill='url(#wave-glow-box3)'
                            filter='url(#glow-blur-box3)'
                            className='animate-wave-mid opacity-40'
                        />

                        {/* Wave 3 }
                        <path
                            d='M0,60 C200,90 300,30 500,60 C700,90 800,30 1000,60 C1200,90 1300,30 1500,60 C1700,90 1800,30 2000,60 L2000,120 L0,120 Z'
                            fill='url(#wave-glow-box3)'
                            filter='url(#glow-blur-box3)'
                            className='animate-wave-fast opacity-60'
                        />
                    </svg>
                </div>
                */}

                <div className="mx-auto max-w-4xl text-center flex flex-col gap-6 relative z-10 animate-fadeIn">
                    <span className="inline-flex items-center gap-1.5 self-center rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold tracking-wider text-primary uppercase">
                        {isEn ? 'Knowledge Base' : 'Kennisbank'}
                    </span>
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                        {title}
                    </h1>
                    <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
                        {pageData?.tagline || fallbackTagline}
                    </p>
                    {(pageData?.desc || fallbackIntro) && (
                        <p className="text-xs text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            {pageData?.desc || fallbackIntro}
                        </p>
                    )}
                </div>
            </section>

            {/* Blocks Iteration */}
            {blocks.map((block: any, idx: number) => {
                const blockKey = block._key || `${block._type}-${idx}`;

                if (block._type === 'calculatorBlock') {
                    return (
                        <section
                            key={blockKey}
                            className='py-12 bg-background border-b border-border'
                        >
                            <div className='mx-auto max-w-6xl text-center px-4 mb-4'>
                                <span className='inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary mb-4 uppercase'>
                                    <Star className='h-3 w-3' />
                                    {isEn
                                        ? 'Interactive Tool'
                                        : 'Interactieve Calculator'}
                                </span>
                                <h2 className='text-2xl font-bold text-foreground mb-2 font-display'>
                                    {isEn
                                        ? 'Calculate your Fiscals'
                                        : 'Bereken je Fiscale Druk'}
                                </h2>
                                <p className='text-sm text-muted-foreground max-w-2xl mx-auto'>
                                    {isEn
                                        ? 'Adjust the sliders to simulate and compare Box 3 taxes.'
                                        : 'Pas de schuifregelaars aan en ontdek direct welk belastingregime het gunstigst is voor jouw situatie.'}
                                </p>
                            </div>
                            <Box3Calculator />
                        </section>
                    );
                }

                if (block._type === 'richText') {
                    return (
                        <section
                            key={blockKey}
                            className='px-6 py-16 bg-card border-b border-border text-left'
                        >
                            <div className='mx-auto max-w-3xl'>
                                {block.sectionTitle && (
                                    <h2 className='text-2xl font-bold text-foreground mb-6 font-display'>
                                        {block.sectionTitle}
                                    </h2>
                                )}
                                <BlockContentRenderer content={block.content} />
                            </div>
                        </section>
                    );
                }

                if (block._type === 'ctaBanner') {
                    return (
                        <section
                            key={blockKey}
                            className='px-6 py-24 bg-background border-b border-border relative overflow-hidden'
                        >
                            <div className='absolute inset-0 pointer-events-none'>
                                <div className='absolute bottom-0 left-1/4 w-[350px] h-[350px] bg-primary/5 rounded-full blur-3xl' />
                            </div>
                            <div className='mx-auto max-w-4xl text-center flex flex-col gap-6 relative z-10'>
                                <h2 className='text-3xl sm:text-4xl font-bold text-foreground font-display'>
                                    {block.title}
                                </h2>
                                <p className='text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto'>
                                    {block.subtitle}
                                </p>
                                <div className='flex justify-center mt-4'>
                                    <Link
                                        href={getPath(
                                            block.buttonLink || '/contact',
                                        )}
                                        className='inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/95 transition-all text-center flex-row gap-2 cursor-pointer group'
                                    >
                                        {block.buttonLabel ||
                                            (isEn
                                                ? 'Contact us'
                                                : 'Neem contact op')}
                                        <ArrowRight className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
                                    </Link>
                                </div>
                            </div>
                        </section>
                    );
                }

                return null;
            })}
        </div>
    );
}
