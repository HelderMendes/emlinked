import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { client } from '@/sanity/client';
import { HeroSection } from '@/components/blocks/HeroSection';
import { GlowingLink } from '@/components/ui/GlowingButton';
import { buildMetadata, DEFAULT_DOMAIN } from '@/lib/seo';
import { getImageUrl } from '@/sanity/image';
import { PageBlockRenderer } from '@/components/blocks/PageBlockRenderer';
import { Badge } from '@/components/ui/Badge';
import {
    ArrowRight,
    Building2,
    ShieldCheck,
    Check,
    Layers,
    Zap,
    Quote,
    Award,
    Sparkles,
    TrendingUp,
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
        const heroImageUrl = getImageUrl(
            b?.image || b?.heroImage,
            b?.imagePath || '/emlinked/referenties/beheerders_referencties.jpg',
        );

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
                    imagePath={heroImageUrl}
                    isHomepage={false}
                    locale={locale}
                    titleClassName='text-3xl sm:text-4xl lg:text-[2.75rem]'
                >
                    {/* Integrated Trust Bar sharing the Hero background */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10'>
                        <div className='flex flex-col items-center p-3 space-y-1.5'>
                            <span className='font-display text-xl lg:text-2xl font-extrabold text-teal tracking-tight flex items-center gap-2'>
                                <Sparkles className='w-5 h-5 text-teal animate-pulse' />
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
                                <Building2 className='w-5 h-5 text-teal' />
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
                            <span className='font-display text-xl lg:text-2xl font-extrabold text-teal tracking-tight flex items-center gap-2'>
                                <ShieldCheck className='w-5 h-5 text-teal' />
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
                        <div className='flex justify-center mb-1'>
                            <Badge color='teal' uppercase>
                                <Award className='w-3.5 h-3.5 text-teal' />
                                {b?.badge ||
                                    (isEn
                                        ? 'CUSTOMER CASES & EXPERIENCES'
                                        : 'KLANTCASES & ERVARINGEN')}
                            </Badge>
                        </div>

                        <h2 className='font-display text-3xl md:text-4xl font-bold tracking-tight text-darkblue dark:text-white'>
                            {b?.title ||
                                (isEn
                                    ? '5 Proven Case Studies in Property Management'
                                    : '5 Bewezen Praktijkcases in Vastgoedbeheer')}
                        </h2>
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
                                                        className='w-20 h-20 rounded-2xl object-cover border-2 border-teal/50 shadow-lg shrink-0'
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
                                                <div className='p-4 rounded-xl bg-teal/10 border border-teal/30 flex items-center gap-4 text-darkblue dark:text-white leading-tight'>
                                                    <Zap className='w-7 h-7 text-teal shrink-0' />
                                                    <div>
                                                        <span className='text-[11px] font-mono font-bold text-teal uppercase block mb-1'>
                                                            {metricLbl}
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
                                                    <Quote className='w-4 h-4 text-teal/40 absolute -left-2.5 -top-1' />
                                                    {c.quote}
                                                    {c.author && (
                                                        <footer className='text-xs font-bold text-teal not-italic mt-2'>
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
                                            <div className='relative rounded-2xl bg-texture-navy p-6 text-white border border-white/15 shadow-2xl space-y-5 overflow-hidden'>
                                                {/* Header Bar */}
                                                <div className='flex items-center justify-between border-b border-white/10 pb-3'>
                                                    <span className='text-xs font-mono text-teal font-bold uppercase tracking-wider truncate max-w-[200px]'>
                                                        {companyName}
                                                    </span>
                                                    <span className='px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold uppercase flex items-center gap-1.5 shrink-0'>
                                                        <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse' />
                                                        {isEn
                                                            ? 'Verified'
                                                            : 'Geverifieerd'}
                                                    </span>
                                                </div>

                                                {/* Logo */}
                                                <div className='flex flex-col items-center justify-center -mt-6'>
                                                    {logoUrl ? (
                                                        <div className='relative my-3 w-full bg-transparent rounded-xl flex items-center justify-center shadow-lg group-hover:bg-transparent transition-all duration-300'>
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
                                                        <div className='text-xl font-bold text-teal font-mono text-center py-6'>
                                                            {companyName}
                                                        </div>
                                                    )}
                                                    <div className='flex items-center justify-between w-full text-[11px] font-mono'>
                                                        <span className='text-slate-300 font-semibold truncate'>
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
                                                        <div className='text-[11px] font-mono text-white/60 uppercase tracking-wider flex items-center justify-between'>
                                                            <span>
                                                                {isEn
                                                                    ? 'Specifications & Tags'
                                                                    : 'Specificaties & Tags'}
                                                            </span>
                                                            <span className='text-teal font-bold'>
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
                                                                        key={
                                                                            tIdx
                                                                        }
                                                                        className='flex items-center gap-1.5 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/10 hover:border-teal/30 transition-colors'
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
                className='px-6 py-20 bg-texture-navy text-white border-b border-white/10 relative z-10 overflow-hidden'
            >
                <div className='max-w-7xl mx-auto space-y-12 text-center relative z-10'>
                    <div className='max-w-3xl mx-auto space-y-4'>
                        <Badge color='teal' uppercase>
                            <Layers className='w-3.5 h-3.5 text-teal' />
                            {b?.badge ||
                                (isEn
                                    ? 'OUR PARTNERS & ECOSYSTEM'
                                    : 'ONZE PARTNERS & ECOSYSTEEM')}
                        </Badge>

                        <h2 className='font-display text-3xl md:text-4xl font-bold tracking-tight text-white'>
                            {b?.title ||
                                (isEn
                                    ? 'Certified Integrations & Tech Synergies'
                                    : 'Gecertificeerde integraties & technologische synergie')}
                        </h2>

                        <p className='text-white/80 text-base md:text-lg font-light leading-relaxed max-w-3xl mx-auto'>
                            {b?.subtitle ||
                                (isEn
                                    ? 'Our software works seamlessly connected. We build robust two-way integrations with top financial platforms, bank feeds, and specialized tools.'
                                    : 'Onze software functioneert niet op een eiland. Wij zorgen voor robuuste tweewegkoppelingen met de meest gebruikte financiële platforms, bankkoppelingen en sectorspecifieke tools.')}
                        </p>
                    </div>

                    {partnerItems.length > 0 && (
                        <div className='bg-slate-900/80 rounded-2xl border border-white/10 shadow-xl backdrop-blur-md overflow-hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 divide-y sm:divide-y-0 md:divide-x divide-white/10 text-center max-w-7xl mx-auto py-6'>
                            {partnerItems.map((p: any, idx: number) => (
                                <div
                                    key={p._key || idx}
                                    className='px-6 flex flex-col items-center justify-center gap-2 group hover:bg-white/5 transition-colors duration-300'
                                >
                                    <span className='text-xs font-mono font-bold text-teal uppercase tracking-wider'>
                                        {p.tag || p.category || 'Integration'}
                                    </span>
                                    <span className='text-sm md:text-base text-white/80 text-center group-hover:text-teal transition-colors leading-snug'>
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
                        <Badge color='teal' uppercase>
                            <TrendingUp className='w-3.5 h-3.5 text-teal' />
                            {b?.tag ||
                                (isEn
                                    ? 'WHY LEADERS CHOOSE EMLINKED'
                                    : 'WAAROM MARKTLEIDERS KIEZEN VOOR EMLINKED')}
                        </Badge>

                        <h2 className='font-display text-3xl md:text-4xl font-bold tracking-tight text-darkblue dark:text-white'>
                            {b?.title ||
                                (isEn
                                    ? 'Designed for Complex Portfolios'
                                    : 'Ontworpen voor complexe vastgoedportefeuilles')}
                        </h2>
                    </div>

                    {whyBullets.length > 0 && (
                        <div className='bg-white/80 rounded-xl border border-black/10 shadow-sm p-5 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10 text-left max-w-7xl mx-auto'>
                            {whyBullets.map((bItem: any, idx: number) => {
                                const titleStr = bItem.bold
                                    ? bItem.bold.replace(/:$/, '')
                                    : bItem.title || '';
                                return (
                                    <div
                                        key={bItem._key || idx}
                                        className='px-4 py-5 md:py-2 md:px-6 flex flex-col items-start justify-start text-left space-y-2 group'
                                    >
                                        <div className='flex items-center gap-3 w-full'>
                                            <div className='w-10 h-10 rounded-full border-2 border-teal bg-[#F4F7FA] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:border-teal-hover transition-all duration-300 text-black'>
                                                {
                                                    whyIcons[
                                                        idx % whyIcons.length
                                                    ]
                                                }
                                            </div>
                                            <h3 className='text-sm md:text-base font-bold text-[#060e32] dark:text-white text-left leading-tight'>
                                                {titleStr}
                                            </h3>
                                        </div>
                                        <p className='text-xs md:text-sm text-[#060e32]/75 dark:text-muted-foreground leading-relaxed font-light text-left'>
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

    const renderCta = (b: any, key: any) => {
        const ctaImageUrl = getImageUrl(
            b?.image,
            b?.imagePath || '/emlinked/referenties/adviesgesprek.jpg',
        );

        return (
            <section
                key={key}
                className='py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] relative z-10'
                id='contact'
            >
                <div className='mx-auto max-w-8xl px-0'>
                    <div className='border border-teal/30 rounded-3xl bg-texture-navy text-white p-6 sm:p-10 md:p-14 hover:shadow-[0_25px_60px_rgba(245,158,11,0.15)] transition-all duration-500 relative overflow-hidden group shadow-2xl backdrop-blur-xl'>
                        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10'>
                            <div className='lg:col-span-8 flex flex-col gap-5 text-left'>
                                <Badge color='teal' uppercase dot dotPulse>
                                    {b?.tag ||
                                        (isEn
                                            ? 'CONSULTATION'
                                            : 'ADVIESGESPREK')}
                                </Badge>

                                <h2 className='font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight'>
                                    {b?.title ||
                                        (isEn
                                            ? 'Ready to elevate your property management?'
                                            : 'Klaar om je vastgoedadministratie naar het volgende niveau te tillen?')}
                                </h2>

                                <p className='text-white/75 text-base md:text-lg font-light leading-relaxed max-w-2xl'>
                                    {b?.subtitle ||
                                        (isEn
                                            ? 'Discuss your case with our specialists and discover immediate automation gains.'
                                            : 'Bespreek je casus met onze specialisten en ontdek direct waar automatiseringswinst te behalen valt.')}
                                </p>

                                <div className='pt-4 flex flex-col sm:flex-row gap-4'>
                                    <GlowingLink
                                        href={getPath(
                                            b?.buttonLink || '/contact',
                                        )}
                                        className='inline-flex h-14 items-center justify-center rounded-2xl border-0 bg-linear-to-r from-[#FF9500] via-[#FF5E00] to-[#FF3B00] hover:brightness-110 px-8 text-base font-bold text-white transition-all duration-200 shadow-lg shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98]'
                                    >
                                        <span className='flex items-center justify-center gap-2 text-white'>
                                            <span>
                                                {b?.buttonLabel ||
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
        );
    };

    return (
        <div className='flex flex-col min-h-screen bg-background text-foreground'>
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
        </div>
    );
}
