import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { client } from '@/sanity/client';
import { HeroSection } from '@/components/blocks/HeroSection';
import { buildMetadata, DEFAULT_DOMAIN } from '@/lib/seo';
import { getImageUrl } from '@/sanity/image';
import { PageBlockRenderer } from '@/components/blocks/PageBlockRenderer';
import { Box3CtaBanner } from '@/components/blocks/box3/Box3CtaBanner';
import { Badge } from '@/components/ui/Badge';
import {
    Building2,
    ShieldCheck,
    Check,
    Layers,
    Zap,
    Quote,
    Award,
    Sparkles,
    TrendingUp,
    ExternalLink,
} from 'lucide-react';

interface ReferentiesPageProps {
    params: Promise<{ locale: string }>;
}

async function getSanityPageData(locale: string) {
    try {
        return await client.fetch(
            `*[_type == "page" && (slug.current == "/referenties" || slug.current == "referenties" || slug.current == "/references" || slug.current == "references" || slug.current == "customer-cases" || _id == "page-referenties-" + $locale) && language == $locale][0] {
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
    const canonicalUrl = `${DEFAULT_DOMAIN}${isEn ? '/en/references' : '/referenties'}`;

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

    const blocks = pageData?.pageBlocks || [];
    const heroBlock = blocks.find(
        (b: any) => b._type === 'hero' || b._type === 'heroBlock',
    );
    const trustBarBlock = blocks.find((b: any) => b._type === 'trustBar');
    const casesBlock = blocks.find(
        (b: any) =>
            b._type === 'workflow' ||
            b._type === 'casesBlock' ||
            b._type === 'stepsBlock',
    );
    const ecosystemBlock = blocks.find(
        (b: any) =>
            b._type === 'ecosystemSection' || b._type === 'integrationsList',
    );
    const whyBlock = blocks.find(
        (b: any) =>
            b._type === 'architectureSection' ||
            b._type === 'architectureBlock',
    );
    const ctaBlock = blocks.find(
        (b: any) =>
            b._type === 'ctaBanner' ||
            b._type === 'ctaBlock' ||
            b._type === 'cta',
    );

    const defaultBlocks = [
        { _type: 'hero', ...heroBlock },
        { _type: 'workflow', ...casesBlock },
        { _type: 'ecosystemSection', ...ecosystemBlock },
        { _type: 'architectureSection', ...whyBlock },
        { _type: 'ctaBanner', ...ctaBlock },
    ];

    const blocksToRender = blocks.length > 0 ? blocks : defaultBlocks;

    const whyIcons = [
        <Building2 key='b' className='w-5 h-5' />,
        <Check key='c' className='w-5 h-5' />,
        <ShieldCheck key='s' className='w-5 h-5' />,
    ];

    // Structured JSON-LD Data for CollectionPage
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
        url: `${DEFAULT_DOMAIN}${isEn ? '/en/references' : '/referenties'}`,
        publisher: {
            '@type': 'Organization',
            name: 'emlinked',
            url: DEFAULT_DOMAIN,
        },
    };

    const renderHero = (b: any, key: any) => {
        return (
            <React.Fragment key={key}>
                <HeroSection
                    label={
                        b?.label ||
                        (isEn
                            ? 'PROVEN RESULTS IN REAL ESTATE AUTOMATION'
                            : 'BEWEZEN RESULTATEN IN VASTGOEDAUTOMATISERING')
                    }
                    title={
                        b?.title ||
                        (isEn
                            ? 'How industry leaders *scale operations*'
                            : 'Hoe toonaangevende beheerders hun *operatie schalen*')
                    }
                    subtitle={
                        b?.subtitle ||
                        (isEn
                            ? 'Discover how property managers, investors, and accounting firms scale operational efficiency with specialized emlinked solutions native in Microsoft Business Central.'
                            : 'Ontdek hoe vastgoedbeheerders, beleggers en administratiekantoren hun operationele efficiëntie verhogen met de gespecialiseerde oplossingen van emlinked native in Microsoft Business Central.')
                    }
                    ctaLabel={
                        b?.ctaLabel ||
                        (isEn
                            ? 'Schedule a consultation'
                            : 'Plan een adviesgesprek')
                    }
                    ctaLink={b?.ctaLink || '#contact'}
                    secondaryCtaLabel=''
                    secondaryCtaLink=''
                    showProof={false}
                    proofText=''
                    isHomepage={false}
                    locale={locale}
                    titleClassName='text-3xl sm:text-4xl lg:text-[2.75rem]'
                    image={b?.image || b?.heroImage}
                    imagePath={
                        b?.imagePath ||
                        '/emlinked/referenties/beheerders_referencties.jpg'
                    }
                    floatingLabels={[
                        {
                            icon: <Sparkles className='w-3.5 h-3.5' />,
                            value: b?.floatingLabels?.[0]?.value || '100%',
                            label:
                                b?.floatingLabels?.[0]?.label ||
                                (isEn
                                    ? 'Real estate focus'
                                    : 'Focus vastgoedsoftware'),
                        },
                        {
                            icon: <Building2 className='w-3.5 h-3.5' />,
                            value:
                                b?.floatingLabels?.[1]?.value || 'Enterprise',
                            label:
                                b?.floatingLabels?.[1]?.label ||
                                (isEn ? 'ERP integrations' : 'ERP-integraties'),
                        },
                    ]}
                />

                {/* Trust bar directly below the hero, light-styled to match */}
                <div className='bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] text-[#060e32] border-b border-teal/20 py-3.5 px-4 sm:px-6 lg:px-8 shadow-xs relative z-20'>
                    <div className='mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-navy-900/10'>
                        <div className='flex flex-col items-center p-3 space-y-1.5'>
                            <span className='font-display text-xl lg:text-2xl font-extrabold text-teal tracking-tight flex items-center gap-2'>
                                <Sparkles className='w-5 h-5 text-teal animate-pulse' />
                                100%
                            </span>
                            <p className='text-xs sm:text-sm text-navy-700 font-light max-w-xs'>
                                {trustBarBlock?.items?.[0]?.text ||
                                    (isEn
                                        ? 'Focus on real estate software & process automation'
                                        : 'Focus op vastgoedsoftware & procesautomatisering')}
                            </p>
                        </div>

                        <div className='flex flex-col items-center p-3 pt-5 md:pt-3 space-y-1.5'>
                            <span className='font-display text-xl lg:text-2xl font-extrabold text-navy-900 tracking-tight flex items-center gap-2'>
                                <Building2 className='w-5 h-5 text-teal' />
                                Enterprise
                            </span>
                            <p className='text-xs sm:text-sm text-navy-700 font-light max-w-xs'>
                                {trustBarBlock?.items?.[1]?.text ||
                                    (isEn
                                        ? 'Seamless ERP & financial accounting integrations'
                                        : 'Naadloze ERP- en financieel-administratieve integraties')}
                            </p>
                        </div>

                        <div className='flex flex-col items-center p-3 pt-5 md:pt-3 space-y-1.5'>
                            <span className='font-display text-xl lg:text-2xl font-extrabold text-teal tracking-tight flex items-center gap-2'>
                                <ShieldCheck className='w-5 h-5 text-teal' />
                                Continuïteit
                            </span>
                            <p className='text-xs sm:text-sm text-navy-700 font-light max-w-xs'>
                                {trustBarBlock?.items?.[2]?.text ||
                                    (isEn
                                        ? 'Decades of domain expertise in real estate software'
                                        : 'Decennialange domeinexpertise binnen de vastgoedsector')}
                            </p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    };

    const renderCases = (b: any, key: any) => {
        const caseItems = b?.items || [];
        return (
            <section
                key={key}
                className='px-6 py-20 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] text-foreground border-b border-black/10 relative z-10'
            >
                <div className='max-w-7xl mx-auto space-y-16'>
                    <div className='text-center max-w-3xl mx-auto space-y-4'>
                        <Badge
                            color='teal'
                            uppercase
                            dot
                            dotPulse
                            className='mx-auto'
                        >
                            <Award className='w-3.5 h-3.5 text-teal' />
                            {b?.badge ||
                                (isEn
                                    ? 'CUSTOMER CASES & EXPERIENCES'
                                    : 'KLANTCASES & ERVARINGEN')}
                        </Badge>

                        <h2 className='font-display text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-navy-900 leading-tight tracking-tight text-center'>
                            {b?.title ||
                                (isEn
                                    ? '5 Proven Case Studies in Property Management'
                                    : '5 Bewezen Praktijkcases in Vastgoedbeheer')}
                        </h2>

                        <p className='text-navy-900/80 text-base md:text-lg leading-relaxed font-light text-center max-w-2xl mx-auto'>
                            {b?.subtitle ||
                                (isEn
                                    ? 'Real results from property managers, investors, and accounting firms running on emlinked.'
                                    : 'Echte resultaten van vastgoedbeheerders, beleggers en administratiekantoren die werken met emlinked.')}
                        </p>
                    </div>

                    <div className='space-y-12'>
                        {caseItems.map((c: any, index: number) => {
                            const photoUrl = getImageUrl(
                                c.photo || c.image,
                                c.photoPath || c.imagePath,
                            );
                            const logoUrl = getImageUrl(c.logo, c.logoPath);
                            const companyName =
                                c.company || c.step || `Case ${index + 1}`;
                            const metricVal = c.feature;
                            const metricLbl =
                                c.metricLabel ||
                                (isEn ? 'Key Result' : 'Kernresultaat');
                            const tags = c.tags || [];

                            return (
                                <div
                                    key={c._key || index}
                                    className='rounded-xl border border-black/10 bg-white/80 p-8 md:p-12 shadow-md relative overflow-hidden group hover:border-teal/40 transition-all duration-300'
                                >
                                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-center'>
                                        <div className='lg:col-span-7 space-y-6'>
                                            <div className='flex items-start gap-5'>
                                                {photoUrl && (
                                                    <Image
                                                        src={photoUrl}
                                                        alt={
                                                            c.author ||
                                                            companyName
                                                        }
                                                        width={80}
                                                        height={80}
                                                        className='w-20 h-20 rounded-xl object-cover border-2 border-teal/50 shadow-lg shrink-0'
                                                    />
                                                )}
                                                <div className='space-y-1'>
                                                    <span className='text-xs font-mono font-bold text-teal uppercase tracking-wider block'>
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
                                                <div className='p-4 border-y-1 border-y-teal/60 flex items-center gap-4 text-darkblue leading-tight text-teal'>
                                                    <Zap className='w-7 h-7 text-teal shrink-0' />
                                                    <div>
                                                        <span className='text-sm font-mono font-bold  text-black/65 uppercase block '>
                                                            {metricLbl}
                                                        </span>
                                                        <span className='font-medium mt-0.5'>
                                                            {metricVal}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Customer Quote */}
                                            {c.quote && (
                                                <blockquote className='relative ml-4 pl-6 italic text-sm text-foreground/90 font-medium'>
                                                    <Quote className='w-4 h-4 text-teal/40 absolute -left-2.5 -top-1' />
                                                    {c.quote}
                                                    {c.author && (
                                                        <footer className='text-sm font-bold text-teal not-italic mt-2'>
                                                            — {c.author}
                                                            {c.role
                                                                ? `, ${c.role}`
                                                                : ''}
                                                        </footer>
                                                    )}
                                                </blockquote>
                                            )}
                                        </div>

                                        {/* Right Column Visual Card: Official Company Logo & Technical Specs */}
                                        <div className='lg:col-span-5 relative'>
                                            <div className='relative rounded-xl bg-gray-100 p-6 text-navy-900 border border-navy-900/10 shadow-md space-y-5 overflow-hidden'>
                                                {/* Header Bar */}
                                                <div className='flex items-center justify-between border-b border-navy-900/10 pb-3'>
                                                    <span className='text-xs font-mono text-teal font-bold uppercase tracking-wider'>
                                                        {companyName}
                                                    </span>
                                                    <span className='px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-mono font-bold uppercase flex items-center gap-1.5 shrink-0'>
                                                        <span className='w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse' />
                                                        {isEn
                                                            ? 'Verified'
                                                            : 'Geverifieerd'}
                                                    </span>
                                                </div>

                                                {/* Logo */}
                                                <div className='flex flex-col items-center justify-center -mt-6'>
                                                    {logoUrl ? (
                                                        <div className='relative my-3 w-full bg-white rounded-xl flex items-center justify-center  group-hover:bg-white transition-all duration-300'>
                                                            <Image
                                                                src={logoUrl}
                                                                alt={
                                                                    companyName
                                                                }
                                                                width={400}
                                                                height={200}
                                                                className='w-[70%] h-auto object-contain transition-transform duration-300 group-hover:scale-98 p-3 bg-white rounded-md max-h-28'
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className='text-xl font-bold text-teal font-mono text-center py-6'>
                                                            {companyName}
                                                        </div>
                                                    )}
                                                    <div className='flex items-center justify-between w-full text-[11px] font-mono'>
                                                        <span className='text-navy-500 font-semibold truncate'>
                                                            {c.author ||
                                                                (isEn
                                                                    ? 'Verified Customer'
                                                                    : 'Geverifieerde Klant')}
                                                        </span>
                                                        <span className='text-teal font-bold shrink-0 ml-2'>
                                                            ERP Native
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Case-Specific Technical Highlights */}
                                                {tags.length > 0 && (
                                                    <div className='space-y-2 pt-1'>
                                                        <div className='text-[11px] font-mono text-navy-500 uppercase tracking-wider flex items-center justify-between'>
                                                            <span>
                                                                {isEn
                                                                    ? 'Specifications & Tags'
                                                                    : 'Specificaties & Tags'}
                                                            </span>
                                                            <span className='text-teal font-bold'>
                                                                Business Central
                                                            </span>
                                                        </div>
                                                        <div className='grid grid-cols-2 gap-2 text-xs font-medium text-navy-700'>
                                                            {tags.map(
                                                                (
                                                                    tag: string,
                                                                    tIdx: number,
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            tIdx
                                                                        }
                                                                        className='flex items-center gap-1.5 bg-stone-bg px-2.5 py-1.5 rounded-lg border border-navy-900/10 hover:border-teal/30 transition-colors'
                                                                    >
                                                                        <Check className='w-3.5 h-3.5 text-teal shrink-0' />
                                                                        <span className='truncate text-[11px]'>
                                                                            {
                                                                                tag
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {c.companyUrl && (
                                                    <div className='w-full pt-3 border-t border-navy-900/10 flex items-center justify-start'>
                                                        <a
                                                            href={c.companyUrl}
                                                            target='_blank'
                                                            rel='noopener noreferrer'
                                                            className='inline-flex items-center gap-2 text-xs font-bold text-navy-900 hover:text-teal transition-colors group/link'
                                                        >
                                                            <span className='w-5 h-5 rounded-full bg-teal/15 text-teal border border-teal/40 flex items-center justify-center shrink-0 shadow-xs group-hover/link:bg-teal group-hover/link:text-white transition-colors'>
                                                                <ExternalLink className='w-3 h-3' />
                                                            </span>
                                                            <span>
                                                                {isEn
                                                                    ? 'Visit company website'
                                                                    : 'Bezoek bedrijfswebsite'}
                                                            </span>
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    };

    const renderEcosystem = (b: any, key: any) => {
        const partnerItems = b?.items || [];
        return (
            <section
                key={key}
                className='px-6 py-20 bg-stone-bg text-navy-900 border-b border-navy-900/10 relative overflow-hidden'
            >
                <div className='max-w-7xl mx-auto space-y-12 text-center relative z-10'>
                    <div className='max-w-3xl mx-auto space-y-4'>
                        <Badge color='teal' uppercase className='mx-auto'>
                            <Layers className='w-3.5 h-3.5 text-teal' />
                            {b?.badge ||
                                (isEn
                                    ? 'OUR PARTNERS & ECOSYSTEM'
                                    : 'ONZE PARTNERS & ECOSYSTEEM')}
                        </Badge>

                        <h2 className='font-display text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-navy-900 leading-tight tracking-tight'>
                            {b?.title ||
                                (isEn
                                    ? 'Certified Integrations & Tech Synergies'
                                    : 'Gecertificeerde integraties & technologische synergie')}
                        </h2>

                        <p className='text-navy-700 text-base md:text-lg font-light leading-relaxed max-w-3xl mx-auto'>
                            {b?.subtitle ||
                                (isEn
                                    ? 'Our software works seamlessly connected. We build robust two-way integrations with top financial platforms, bank feeds, and specialized tools.'
                                    : 'Onze software functioneert niet op een eiland. Wij zorgen voor robuuste tweewegkoppelingen met de meest gebruikte financiële platforms, bankkoppelingen en sectorspecifieke tools.')}
                        </p>
                    </div>

                    {partnerItems.length > 0 && (
                        <div className='bg-white rounded-xl border border-navy-900/10 shadow-md overflow-hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 divide-y sm:divide-y-0 md:divide-x divide-navy-900/10 text-center max-w-7xl mx-auto py-6'>
                            {partnerItems.map((p: any, idx: number) => (
                                <div
                                    key={p._key || idx}
                                    className='px-6 flex flex-col items-center justify-center gap-2 group hover:bg-stone-bg transition-colors duration-300'
                                >
                                    <span className='text-xs font-mono font-bold text-teal uppercase tracking-wider'>
                                        {p.tag || p.category || 'Integration'}
                                    </span>
                                    <span className='text-sm md:text-base text-navy-700 text-center group-hover:text-teal transition-colors leading-snug'>
                                        {p.name || p.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        );
    };

    const renderWhyChooseUs = (b: any, key: any) => {
        const whyBullets = b?.bullets || [];
        return (
            <section
                key={key}
                className='px-6 py-20 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] border-b border-black/10 text-foreground relative z-10'
            >
                <div className='max-w-7xl mx-auto space-y-12'>
                    <div className='text-center max-w-3xl mx-auto space-y-4'>
                        <Badge
                            color='teal'
                            uppercase
                            dot
                            dotPulse
                            className='mx-auto'
                        >
                            <TrendingUp className='w-3.5 h-3.5 text-teal' />
                            {b?.tag ||
                                (isEn
                                    ? 'WHY LEADERS CHOOSE EMLINKED'
                                    : 'WAAROM MARKTLEIDERS KIEZEN VOOR EMLINKED')}
                        </Badge>

                        <h2 className='font-display text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-navy-900 leading-tight tracking-tight'>
                            {b?.title ||
                                (isEn
                                    ? 'Designed for Complex Portfolios'
                                    : 'Ontworpen voor complexe vastgoedportefeuilles')}
                        </h2>
                    </div>

                    {whyBullets.length > 0 && (
                        <div className='bg-white/80 rounded-xl border border-black/10 shadow-sm p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10 text-left max-w-7xl mx-auto'>
                            {whyBullets.map((bItem: any, idx: number) => {
                                const titleStr = bItem.bold
                                    ? bItem.bold.replace(/:$/, '')
                                    : bItem.title || '';
                                return (
                                    <div
                                        key={bItem._key || idx}
                                        className='px-4 py-5 md:py-2 md:px-6 flex flex-col items-start justify-start text-left space-y-3 group'
                                    >
                                        <div className='flex items-center gap-3 w-full'>
                                            <div className='w-10 h-10 rounded-lg border-2 border-teal/60 bg-[#F4F7FA] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:border-teal-hover transition-all duration-300 text-navy-900'>
                                                {
                                                    whyIcons[
                                                        idx % whyIcons.length
                                                    ]
                                                }
                                            </div>
                                            <h3 className='text-sm md:text-base font-bold text-[#060e32] text-left leading-tight'>
                                                {titleStr}
                                            </h3>
                                        </div>
                                        <p className='text-sm leading-relaxed font-light text-left'>
                                            {bItem.text}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        );
    };

    const renderCta = (b: any, key: any) => (
        <div id='contact' key={key}>
            <Box3CtaBanner
                ctaBadge={b?.tag || (isEn ? 'CONSULTATION' : 'ADVIESGESPREK')}
                ctaTitle={
                    b?.title ||
                    (isEn
                        ? 'Ready to elevate your property management?'
                        : 'Klaar om je vastgoedadministratie naar het volgende niveau te tillen?')
                }
                ctaSubtitle={
                    b?.subtitle ||
                    (isEn
                        ? 'Discuss your case with our specialists and discover immediate automation gains.'
                        : 'Bespreek je casus met onze specialisten en ontdek direct waar automatiseringswinst te behalen valt.')
                }
                ctaButtonText={
                    b?.buttonLabel ||
                    (isEn
                        ? 'Request a live demo'
                        : 'Vraag een demonstratie aan')
                }
                ctaButtonLink={
                    b?.buttonLink || (isEn ? '/en/contact' : '/contact')
                }
                isEn={isEn}
                image={b?.image}
                imagePath={
                    b?.imagePath || '/emlinked/referenties/adviesgesprek.jpg'
                }
            />
        </div>
    );

    return (
        <main className='flex-1 text-navy-900 bg-stone-bg'>
            {/* JSON-LD Structured Data */}
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {blocksToRender.map((block: any, idx: number) => {
                const key = block._key || `${block._type}-${idx}`;

                if (block._type === 'hero' || block._type === 'heroBlock') {
                    return renderHero(block, key);
                }

                if (
                    block._type === 'workflow' ||
                    block._type === 'casesBlock' ||
                    block._type === 'stepsBlock'
                ) {
                    return renderCases(block, key);
                }

                if (
                    block._type === 'ecosystemSection' ||
                    block._type === 'integrationsList'
                ) {
                    return renderEcosystem(block, key);
                }

                if (
                    block._type === 'architectureSection' ||
                    block._type === 'architectureBlock'
                ) {
                    return renderWhyChooseUs(block, key);
                }

                if (
                    block._type === 'ctaBanner' ||
                    block._type === 'ctaBlock' ||
                    block._type === 'cta'
                ) {
                    return renderCta(block, key);
                }

                return (
                    <PageBlockRenderer
                        key={key}
                        block={block}
                        locale={locale}
                    />
                );
            })}
        </main>
    );
}
