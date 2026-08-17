import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { client } from '@/sanity/client';
import { HeroSection } from '@/components/blocks/HeroSection';
import { GlowingLink } from '@/components/ui/GlowingButton';
import { buildMetadata, DEFAULT_DOMAIN } from '@/lib/seo';
import { getImageUrl } from '@/sanity/image';
import {
    CheckCircle2,
    ArrowRight,
    Building2,
    TrendingUp,
    ShieldCheck,
    Check,
    Layers,
    Zap,
    Quote,
    Award,
    Sparkles,
} from 'lucide-react';

interface ReferentiesPageProps {
    params: Promise<{ locale: string }>;
}

async function getSanityPageData(locale: string) {
    try {
        return await client.fetch(
            `*[_type == "page" && (slug.current == "/referenties" || slug.current == "referenties") && language == $locale][0] {
                title,
                pageBlocks[] {
                    ...,
                    _type,
                    _key,
                    image {
                        ...,
                        asset-> {
                            _id,
                            url
                        }
                    },
                    heroImage {
                        ...,
                        asset-> {
                            _id,
                            url
                        }
                    },
                    items[] {
                        ...,
                        _key,
                        image {
                            ...,
                            asset-> {
                                _id,
                                url
                            }
                        },
                        photo {
                            ...,
                            asset-> {
                                _id,
                                url
                            }
                        },
                        logo {
                            ...,
                            asset-> {
                                _id,
                                url
                            }
                        }
                    },
                    bullets[] {
                        ...,
                        _key
                    }
                },
                seo {
                    seoTitle,
                    seoDescription,
                    canonical,
                    noIndex
                }
            }`,
            { locale },
            { cache: 'no-store' },
        );
    } catch (e) {
        console.error('Failed to fetch references page from Sanity:', e);
        return null;
    }
}

export async function generateMetadata({
    params,
}: ReferentiesPageProps): Promise<Metadata> {
    const { locale } = await params;
    const pageData = await getSanityPageData(locale);
    const isEn = locale === 'en';

    const fallbackTitle = isEn
        ? 'Customer Cases & References | Property Management Software | emlinked'
        : 'Klantcases & Referenties | Vastgoedbeheer Software | emlinked';
    const fallbackDescription = isEn
        ? 'Discover what customers say about emlinked: Vastgoedbeheer Rotterdam, Van Overhagen Vastgoed, M2 Capital, and Baetland Vastgoed. Read all 5 case studies.'
        : 'Ontdek wat klanten zeggen over emlinked: Vastgoedbeheer Rotterdam, Van Overhagen Vastgoed, M2 Capital en Baetland Vastgoed. Lees alle 5 klantcases.';
    const canonicalUrl = `${DEFAULT_DOMAIN}${isEn ? '/en/referenties' : '/referenties'}`;

    return buildMetadata({
        seo: pageData?.seo,
        fallbackTitle,
        fallbackDescription,
        canonicalUrl,
        locale,
    });
}

export default async function ReferentiesPage({
    params,
}: ReferentiesPageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getSanityPageData(locale);

    const getPath = (path: string) => {
        if (!path) return isEn ? '/en' : '/';
        if (path.startsWith('#')) return path;
        if (isEn) {
            if (path.startsWith('/en')) return path;
            return `/en${path === '/' ? '' : path}`;
        }
        return path;
    };

    const blocks = pageData?.pageBlocks || [];
    const heroBlock = blocks.find((b: any) => b._type === 'hero');
    const trustBarBlock = blocks.find((b: any) => b._type === 'trustBar');
    const casesBlock = blocks.find((b: any) => b._type === 'workflow');
    const ecosystemBlock = blocks.find(
        (b: any) => b._type === 'ecosystemSection',
    );
    const whyBlock = blocks.find((b: any) => b._type === 'architectureSection');
    const ctaBlock = blocks.find((b: any) => b._type === 'ctaBanner');

    const heroImageUrl = getImageUrl(
        heroBlock?.image || heroBlock?.heroImage,
        heroBlock?.imagePath ||
            '/emlinked/referenties/beheerders_referencties.jpg',
    );

    const ctaImageUrl = getImageUrl(
        ctaBlock?.image,
        ctaBlock?.imagePath || '/emlinked/referenties/adviesgesprek.jpg',
    );

    // Dynamic case items from Sanity or fallback
    const caseItems = casesBlock?.items || [];

    // Partner Integration Logos (dynamically sourced from Sanity CMS ecosystemBlock)
    const partnerLogos = ecosystemBlock?.items?.length
        ? ecosystemBlock.items.map((item: any) => ({
              name: item.name || item.title || item.partnerName,
              tag: item.tag || item.badge || item.category || 'Integration',
          }))
        : [
              { name: 'Microsoft Business Central', tag: 'ERP Native' },
              { name: 'Exact Software', tag: 'Financieel' },
              { name: 'Twinfield', tag: 'Boekhouding' },
              { name: 'AFAS Software', tag: 'ERP Integration' },
              { name: 'Mollie Payments', tag: 'Betalingen' },
          ];

    // Structured JSON-LD Data for CollectionPage & Reviews
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name:
            pageData?.seo?.seoTitle ||
            (isEn
                ? 'References & Customer Cases | emlinked'
                : 'Referenties & Klantcases | emlinked'),
        description:
            pageData?.seo?.seoDescription ||
            (isEn
                ? 'Discover what customers say about emlinked in 5 real estate case studies.'
                : 'Ontdek wat klanten zeggen over emlinked in 5 praktijkcases.'),
        url: `${DEFAULT_DOMAIN}${isEn ? '/en/referenties' : '/referenties'}`,
        publisher: {
            '@type': 'Organization',
            name: 'emlinked',
            url: DEFAULT_DOMAIN,
        },
    };

    const defaultWhyBullets = [
        {
            icon: <Building2 className='w-5 h-5' />,
            title: isEn ? 'Sector-Specific Depth' : 'Sectorspecifieke diepgang',
            text: isEn
                ? 'Not generic accounting software with a real estate label, but solutions engineered from line one for complex real estate challenges.'
                : 'Geen generieke administratiesoftware met een vastgoedlabel, maar oplossingen die vanaf de eerste regel code zijn ontworpen voor complexe vastgoedvraagstukken.',
        },
        {
            icon: <Check className='w-5 h-5' />,
            title: isEn
                ? 'Transparent Implementation'
                : 'Transparante implementatie',
            text: isEn
                ? 'Predictable timelines and pragmatic guidance by consultants who understand both IT and real estate accounting.'
                : 'Voorspelbare doorlooptijden en pragmatische begeleiding door consultants die zowel IT als vastgoedboekhouding begrijpen.',
        },
        {
            icon: <ShieldCheck className='w-5 h-5' />,
            title: isEn
                ? 'Future-Proof Architecture'
                : 'Toekomstvaste architectuur',
            text: isEn
                ? 'Continuous compliance with regulations around rental management, CPI indexation, and fiscal reporting.'
                : 'Continue compliance met wet- en regelgeving rondom verhuur, CPI-indexering en fiscale verantwoording.',
        },
    ];

    const whyBulletsToRender = whyBlock?.bullets?.length
        ? whyBlock.bullets.map((b: any, idx: number) => ({
              icon: defaultWhyBullets[idx % defaultWhyBullets.length].icon,
              title: b.bold
                  ? b.bold.replace(':', '')
                  : defaultWhyBullets[idx % defaultWhyBullets.length].title,
              text:
                  b.text ||
                  defaultWhyBullets[idx % defaultWhyBullets.length].text,
          }))
        : defaultWhyBullets;

    return (
        <div className='flex flex-col min-h-screen bg-background text-foreground'>
            {/* JSON-LD Structured Data */}
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* ── SECTION 1: HERO HEADER WITH INTEGRATED TRUST BAR ── */}
            <HeroSection
                label={
                    heroBlock?.label ||
                    (isEn
                        ? 'PROVEN RESULTS IN REAL ESTATE AUTOMATION'
                        : 'BEWEZEN RESULTATEN IN VASTGOEDAUTOMATISERING')
                }
                title={
                    heroBlock?.title ||
                    (isEn
                        ? 'How industry leaders *scale operations*'
                        : 'Hoe toonaangevende beheerders hun *operatie schalen*')
                }
                subtitle={
                    heroBlock?.subtitle ||
                    (isEn
                        ? 'Discover how property managers, investors, and accounting firms scale operational efficiency with specialized emlinked solutions native in Microsoft Business Central.'
                        : 'Ontdek hoe vastgoedbeheerders, beleggers en administratiekantoren hun operationele efficiëntie verhogen met de gespecialiseerde oplossingen van emlinked native in Microsoft Business Central.')
                }
                ctaLabel={
                    heroBlock?.ctaLabel ||
                    (isEn
                        ? 'Schedule a consultation'
                        : 'Plan een adviesgesprek')
                }
                ctaLink={heroBlock?.ctaLink || '#contact'}
                secondaryCtaLabel=''
                secondaryCtaLink=''
                showProof={false}
                proofText=''
                imagePath={heroImageUrl}
                isHomepage={false}
                locale={locale}
                titleClassName='text-3xl sm:text-4xl lg:text-[2.75rem]'
            >
                {/* Integrated Trust Bar sharing the Hero background */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10'>
                    <div className='flex flex-col items-center p-3 space-y-1.5'>
                        <span className='font-display text-xl lg:text-2xl font-extrabold text-amber tracking-tight flex items-center gap-2'>
                            <Sparkles className='w-5 h-5 text-amber animate-pulse' />
                            100%
                        </span>
                        <p className='text-xs sm:text-sm text-white/80 font-light max-w-xs'>
                            {trustBarBlock?.items?.[0]?.text ||
                                (isEn
                                    ? 'Focus on real estate software & process automation'
                                    : 'Focus op vastgoedsoftware & procesautomatisering')}
                        </p>
                    </div>

                    <div className='flex flex-col items-center p-3 pt-5 md:pt-3 space-y-1.5'>
                        <span className='font-display text-xl lg:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2'>
                            <Building2 className='w-5 h-5 text-amber' />
                            Enterprise
                        </span>
                        <p className='text-xs sm:text-sm text-white/80 font-light max-w-xs'>
                            {trustBarBlock?.items?.[1]?.text ||
                                (isEn
                                    ? 'Seamless ERP & financial accounting integrations'
                                    : 'Naadloze ERP- en financieel-administratieve integraties')}
                        </p>
                    </div>

                    <div className='flex flex-col items-center p-3 pt-5 md:pt-3 space-y-1.5'>
                        <span className='font-display text-xl lg:text-2xl font-extrabold text-amber tracking-tight flex items-center gap-2'>
                            <ShieldCheck className='w-5 h-5 text-amber' />
                            Continuïteit
                        </span>
                        <p className='text-xs sm:text-sm text-white/80 font-light max-w-xs'>
                            {trustBarBlock?.items?.[2]?.text ||
                                (isEn
                                    ? 'Decades of domain expertise in real estate software'
                                    : 'Decennialange domeinexpertise binnen de vastgoedsector')}
                        </p>
                    </div>
                </div>
            </HeroSection>

            {/* ── SECTION 3: ALL 5 KLANTCASES & SUCCESVERHALEN ── */}
            <section className='px-6 py-20 bg-background text-foreground border-b border-black/10 relative z-10'>
                <div className='max-w-7xl mx-auto space-y-16'>
                    <div className='text-center max-w-3xl mx-auto space-y-4'>
                        <div className='flex justify-center mb-1'>
                            <span className='inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/15 px-4.5 py-1.5 text-xs font-mono font-bold tracking-wider text-amber uppercase backdrop-blur-md shadow-xs'>
                                <Award className='w-3.5 h-3.5 text-amber' />
                                {casesBlock?.badge ||
                                    (isEn
                                        ? 'CUSTOMER CASES & EXPERIENCES'
                                        : 'KLANTCASES & ERVARINGEN')}
                            </span>
                        </div>

                        <h2 className='font-display text-3xl md:text-4xl font-bold tracking-tight text-darkblue dark:text-white'>
                            {casesBlock?.title ||
                                (isEn
                                    ? '5 Proven Case Studies in Property Management'
                                    : '5 Bewezen Praktijkcases in Vastgoedbeheer')}
                        </h2>
                    </div>

                    <div className='space-y-12'>
                        {caseItems.map((c: any, index: number) => {
                            const isEven = index % 2 === 0;

                            // Fallback data mapping per case study index
                            const defaultCaseDetails = [
                                {
                                    photo: '/emlinked/referenties/Levi-Bosboom.png',
                                    logo: '/emlinked/referenties/uitvoeringlogoVGBRgrootdefkopie-1920w.jpg-q18f9wtaq1lzgm2gwkdj3ckc22h78mokvvl2hegfmo.webp',
                                    company: 'Vastgoedbeheer Rotterdam',
                                    metric: '5 werkdagen → 4 uur',
                                    metricLabel: 'Maandafsluiting',
                                    tags: [
                                        'CPI Indexatie Automation',
                                        'Business Central Native',
                                        'Facturatie Geautomatiseerd',
                                        '100% Audit-Proof',
                                    ],
                                },
                                {
                                    photo: '/emlinked/referenties/Angelique.png',
                                    logo: '/emlinked/referenties/van-overhagen_logo.jpg',
                                    company: 'Van Overhagen Vastgoed B.V.',
                                    metric: '99,4% Geautomatiseerd',
                                    metricLabel: 'Proactief Contractbeheer',
                                    tags: [
                                        'Geen Schaduwbestanden',
                                        'Bankafschriften Sync',
                                        'Direct Boekhoudkundig Inzicht',
                                        'Support Responstijd < 1 uur',
                                    ],
                                },
                                {
                                    photo: '/hero/MichelDeWaal.jpg',
                                    logo: '/emlinked/referenties/M2-Capital-scaled-q18f9yozgvbbg98kmfueb0zrfvy5vs9ejmm8ohkbo8.jpg',
                                    company: 'M2 Capital Real Estate B.V.',
                                    metric: '100% Realtime Portefeuille-Grip',
                                    metricLabel: 'Commercieel Beheer',
                                    tags: [
                                        'Multi-Entity Beheer',
                                        'Rendementsrapportages',
                                        'Huurindexatie Automation',
                                        'Snel & Meedenkende Support',
                                    ],
                                },
                                {
                                    photo: '/emlinked/referenties/Sander-Bot.png',
                                    logo: '/emlinked/referenties/Unknown-q18f9r675burerlhe91bxaavcb3tp2dlbvom61e9ds.png',
                                    company: 'Baetland Vastgoed B.V.',
                                    metric: '0 Spijt Choice Guarantee',
                                    metricLabel: 'Native Cloud Architecture',
                                    tags: [
                                        'Device-Onafhankelijk',
                                        'Grootboek Synchronisatie',
                                        'Geen Handmatige Exports',
                                        'Microsoft Ecosystem',
                                    ],
                                },
                                {
                                    photo: '/emlinked/referenties/beheerders_referencties_hero-illustration.jpg',
                                    logo: '/emlinked/referenties/avatar_partners.png',
                                    company: 'Asset Management & Controlling',
                                    metric: 'Duizenden Contracten / Maand',
                                    metricLabel:
                                        'Continuous Auditing Compliance',
                                    tags: [
                                        'SOX & VAT Compliance',
                                        'Multi-Currency Subledgers',
                                        'Automated Cashflow Sync',
                                        'Enterprise Security',
                                    ],
                                },
                            ];

                            const details =
                                defaultCaseDetails[
                                    index % defaultCaseDetails.length
                                ];
                            const photoUrl = getImageUrl(
                                c.photo || c.image,
                                c.imagePath || details.photo,
                            );
                            const logoUrl = getImageUrl(
                                c.logo,
                                c.logoPath || details.logo,
                            );
                            const companyName = c.company || details.company;
                            const metricVal = c.feature || details.metric;
                            const tags = c.tags || details.tags;

                            return (
                                <div
                                    key={c._key || index}
                                    className='rounded-xl border border-black/10 bg-card p-8 md:p-12 shadow-md relative overflow-hidden group hover:border-amber/40 transition-all duration-300'
                                >
                                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-center'>
                                        <div className='lg:col-span-7 space-y-6'>
                                            <div className='flex items-start gap-5'>
                                                {photoUrl && (
                                                    <Image
                                                        src={photoUrl}
                                                        alt={
                                                            c.author ||
                                                            'Emlinked Customer Case'
                                                        }
                                                        width={80}
                                                        height={80}
                                                        className='w-20 h-20 rounded-2xl object-cover border-2 border-amber/50 shadow-lg shrink-0'
                                                    />
                                                )}
                                                <div className='space-y-1'>
                                                    <span className='text-xs font-mono font-bold text-amber uppercase tracking-wider block'>
                                                        {c.step ||
                                                            `CASE ${index + 1}`}
                                                    </span>
                                                    <h3 className='font-display text-xl md:text-2xl font-bold text-darkblue dark:text-white leading-tight'>
                                                        {c.title}
                                                    </h3>
                                                </div>
                                            </div>

                                            <p className='text-muted-foreground text-base leading-relaxed font-light'>
                                                {c.text}
                                            </p>

                                            {/* Key Metric Banner */}
                                            {metricVal && (
                                                <div className='p-4 rounded-xl bg-amber/10 border border-amber/30 flex items-center gap-4 text-darkblue dark:text-white leading-tight'>
                                                    <Zap className='w-7 h-7 text-amber shrink-0' />
                                                    <div>
                                                        <span className='text-[11px] font-mono font-bold text-amber uppercase block mb-1'>
                                                            {
                                                                details.metricLabel
                                                            }
                                                        </span>
                                                        <span className='text-sm font-bold'>
                                                            {metricVal}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Customer Quote */}
                                            {c.quote && (
                                                <blockquote className='relative ml-4 pl-6 italic text-sm text-foreground/90 font-medium'>
                                                    <Quote className='w-4 h-4 text-amber/40 absolute -left-2.5 -top-1' />
                                                    {c.quote}
                                                    {c.author && (
                                                        <footer className='text-xs font-bold text-amber not-italic mt-2'>
                                                            — {c.author},{' '}
                                                            {c.role}
                                                        </footer>
                                                    )}
                                                </blockquote>
                                            )}
                                        </div>

                                        {/* Right Column Visual Card: Official Company Logo & Technical Specs */}
                                        <div className='lg:col-span-5 relative'>
                                            <div className='relative rounded-2xl bg-texture-navy p-6 text-white border border-white/15 shadow-2xl space-y-5 overflow-hidden'>
                                                {/* Header Bar */}
                                                <div className='flex items-center justify-between border-b border-white/10 pb-3'>
                                                    <span className='text-xs font-mono text-amber font-bold uppercase tracking-wider truncate max-w-[200px]'>
                                                        {companyName}
                                                    </span>
                                                    <span className='px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold uppercase flex items-center gap-1.5 shrink-0'>
                                                        <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse' />
                                                        Geverifieerd
                                                    </span>
                                                </div>

                                                {/* Logo */}
                                                <div className='flex flex-col items-center justify-center -mt-6'>
                                                    {logoUrl ? (
                                                        <div className='relative my-3 w-full bg-transparent rounded-xl my-0.5-2 flex items-center justify-center shadow-lg group-hover:bg-transparent transition-all duration-300'>
                                                            <Image
                                                                src={logoUrl}
                                                                alt={
                                                                    companyName
                                                                }
                                                                width={400}
                                                                height={200}
                                                                className='w-[70%] h-auto object-contain transition-transform duration-300 group-hover:scale-105 p-3 bg-white rounded-md max-h-28'
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className='text-xl font-bold text-amber font-mono text-center bg-red-600'>
                                                            {companyName}
                                                        </div>
                                                    )}
                                                    <div className='flex items-center justify-between w-full text-[11px] font-mono'>
                                                        <span className='text-slate-300 font-semibold truncate'>
                                                            {c.author ||
                                                                'Geverifieerde Klant'}
                                                        </span>
                                                        <span className='text-amber font-bold shrink-0 ml-2'>
                                                            ERP Native
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Case-Specific Technical Highlights */}
                                                <div className='space-y-2 pt-1'>
                                                    <div className='text-[11px] font-mono text-white/60 uppercase tracking-wider flex items-center justify-between'>
                                                        <span>
                                                            Specificaties & Tags
                                                        </span>
                                                        <span className='text-amber font-bold'>
                                                            Business Central
                                                        </span>
                                                    </div>
                                                    <div className='grid grid-cols-2 gap-2 text-xs font-medium text-white/90'>
                                                        {tags.map(
                                                            (
                                                                tag: string,
                                                                tIdx: number,
                                                            ) => (
                                                                <div
                                                                    key={tIdx}
                                                                    className='flex items-center gap-1.5 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/10 hover:border-amber/30 transition-colors'
                                                                >
                                                                    <Check className='w-3.5 h-3.5 text-amber shrink-0' />
                                                                    <span className='truncate text-[11px]'>
                                                                        {tag}
                                                                    </span>
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── SECTION 4: ONZE PARTNERS & ECOSYSTEEM (Dark Navy Section) ── */}
            <section className='px-6 py-20 bg-texture-navy text-white border-b border-white/10 relative z-10 overflow-hidden'>
                <div className='max-w-7xl mx-auto space-y-12 text-center relative z-10'>
                    <div className='max-w-3xl mx-auto space-y-4'>
                        <span className='inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/15 px-4.5 py-1.5 text-xs font-mono font-bold tracking-wider text-amber uppercase backdrop-blur-md shadow-xs'>
                            <Layers className='w-3.5 h-3.5 text-amber' />
                            {ecosystemBlock?.badge ||
                                (isEn
                                    ? 'PARTNER ECOSYSTEM & INTEGRATIONS'
                                    : 'ONZE PARTNERS & ECOSYSTEEM')}
                        </span>

                        <h2 className='font-display text-3xl md:text-4xl font-bold tracking-tight text-white'>
                            {ecosystemBlock?.title ||
                                (isEn
                                    ? 'Certified Integrations & Technological Synergy'
                                    : 'Gecertificeerde integraties & technologische synergie')}
                        </h2>

                        <p className='text-white/80 text-base md:text-lg font-light leading-relaxed max-w-3xl mx-auto'>
                            {ecosystemBlock?.subtitle ||
                                (isEn
                                    ? 'Our software works seamlessly connected. We build robust two-way integrations with top financial platforms, bank feeds, and specialized tools.'
                                    : 'Onze software functioneert niet op een eiland. Wij zorgen voor robuuste tweewegkoppelingen met de meest gebruikte financiële platforms, bankkoppelingen en sectorspecifieke tools.')}
                        </p>
                    </div>

                    {/* Single Horizontal Card Container with Vertical Dividers (Dark Theme Negative Pattern) */}
                    <div className='bg-slate-900/80 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md overflow-hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 divide-y sm:divide-y-0 md:divide-x divide-white/10 text-center max-w-7xl mx-auto py-6'>
                        {partnerLogos.map((p: any, idx: number) => (
                            <div
                                key={idx}
                                className='px-6 flex flex-col items-center justify-center gap-2 group hover:bg-white/5 transition-colors duration-300'
                            >
                                <span className='text-xs font-mono font-bold text-amber uppercase tracking-wider'>
                                    {p.tag}
                                </span>
                                <span className='text-sm md:text-base text-white/80 text-center group-hover:text-amber transition-colors leading-snug'>
                                    {p.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION 5: WAAROM MARKTLEIDERS KIEZEN VOOR EMLINKED ── */}
            <section className='px-6 py-20 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] border-b border-black/10 text-foreground relative z-10'>
                <div className='max-w-7xl mx-auto space-y-12'>
                    <div className='text-center max-w-3xl mx-auto space-y-4'>
                        <span className='inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/15 px-4.5 py-1.5 text-xs font-mono font-bold tracking-wider text-amber uppercase backdrop-blur-md'>
                            <TrendingUp className='w-3.5 h-3.5 text-amber' />
                            {whyBlock?.tag ||
                                (isEn
                                    ? 'WHY MARKET LEADERS CHOOSE EMLINKED'
                                    : 'WAAROM MARKTLEIDERS KIEZEN VOOR EMLINKED')}
                        </span>

                        <h2 className='font-display text-3xl md:text-4xl font-bold tracking-tight text-darkblue dark:text-white'>
                            {whyBlock?.title ||
                                (isEn
                                    ? 'Designed Specifically for Complex Real Estate Portfolios'
                                    : 'Ontworpen voor complexe vastgoedportefeuilles')}
                        </h2>
                    </div>

                    {/* Single Horizontal Card Container with Vertical Dividers (Box3 Style) */}
                    <div className='bg-white/80 rounded-xl border border-black/10 shadow-sm p-5 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10 text-left max-w-7xl mx-auto'>
                        {whyBulletsToRender.map((bItem: any, idx: number) => (
                            <div
                                key={idx}
                                className='px-4 py-5 md:py-2 md:px-6 flex flex-col items-start justify-start text-left space-y-2 group'
                            >
                                <div className='flex items-center gap-3 w-full'>
                                    <div className='w-10 h-10 rounded-full border-2 border-amber bg-[#F4F7FA] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:border-amber-hover transition-all duration-300 text-black'>
                                        {bItem.icon}
                                    </div>
                                    <h3 className='text-sm md:text-base font-bold text-[#060e32] dark:text-white text-left leading-tight'>
                                        {bItem.title}
                                    </h3>
                                </div>
                                <p className='text-xs md:text-sm text-[#060e32]/75 dark:text-muted-foreground leading-relaxed font-light text-left'>
                                    {bItem.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION 6: PRE-FOOTER CTA (Informal Tone) ── */}
            <section
                className='py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] relative z-10'
                id='contact'
            >
                <div className='mx-auto max-w-8xl px-0'>
                    <div className='border border-amber/30 rounded-3xl bg-texture-navy text-white p-6 sm:p-10 md:p-14 hover:shadow-[0_25px_60px_rgba(245,158,11,0.15)] transition-all duration-500 relative overflow-hidden group shadow-2xl backdrop-blur-xl'>
                        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10'>
                            <div className='lg:col-span-8 flex flex-col gap-5 text-left'>
                                <span className='inline-flex items-center gap-2 self-start rounded-full bg-amber/15 border border-amber/35 px-5 py-1.5 text-xs font-bold tracking-widest text-amber uppercase backdrop-blur-md'>
                                    <span className='w-1.5 h-1.5 bg-amber rounded-full animate-ping' />
                                    {ctaBlock?.tag ||
                                        (isEn
                                            ? 'CONSULTATION'
                                            : 'ADVIESGESPREK')}
                                </span>

                                <h2 className='font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight'>
                                    {ctaBlock?.title ||
                                        (isEn
                                            ? 'Ready to elevate your property management?'
                                            : 'Klaar om je vastgoedadministratie naar het volgende niveau te tillen?')}
                                </h2>

                                <p className='text-white/75 text-base md:text-lg font-light leading-relaxed max-w-2xl'>
                                    {ctaBlock?.subtitle ||
                                        (isEn
                                            ? 'Discuss your case with our specialists and discover immediate automation gains.'
                                            : 'Bespreek je casus met onze specialisten en ontdek direct waar automatiseringswinst te behalen valt.')}
                                </p>

                                <div className='pt-4 flex flex-col sm:flex-row gap-4'>
                                    <GlowingLink
                                        href={getPath(
                                            ctaBlock?.buttonLink || '/contact',
                                        )}
                                        className='inline-flex h-14 items-center justify-center rounded-2xl border-0 bg-linear-to-r from-[#FF9500] via-[#FF5E00] to-[#FF3B00] hover:brightness-110 px-8 text-base font-bold text-white transition-all duration-200 shadow-lg shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98]'
                                    >
                                        <span className='flex items-center justify-center gap-2 text-white'>
                                            <span>
                                                {ctaBlock?.buttonLabel ||
                                                    (isEn
                                                        ? 'Request a live demo'
                                                        : 'Vraag een demonstratie aan')}
                                            </span>
                                            <ArrowRight className='h-5 w-5 text-white' />
                                        </span>
                                    </GlowingLink>
                                </div>
                            </div>

                            <div className='lg:col-span-4 flex justify-start lg:justify-end'>
                                <Image
                                    src={ctaImageUrl}
                                    alt='Emlinked Consultation'
                                    width={700}
                                    height={500}
                                    className='w-full h-[320px] max-h-[320px] object-cover object-top rounded-2xl group-hover:scale-105 transition-transform duration-500 shadow-xl border border-white/15'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
