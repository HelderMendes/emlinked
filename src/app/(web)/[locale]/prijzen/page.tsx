import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { client } from '@/sanity/client';
import { HeroSection } from '@/components/blocks/HeroSection';
import { PricingCalculator } from '@/components/PricingCalculator';
import { Clock, ArrowRight } from 'lucide-react';
import { buildMetadata, DEFAULT_DOMAIN } from '@/lib/seo';
import { getImageUrl } from '@/sanity/image';
import { PageBlockRenderer } from '@/components/blocks/PageBlockRenderer';
import { Badge } from '@/components/ui/Badge';

interface PricingPageProps {
    params: Promise<{ locale: string }>;
}

async function getSanityPageData(locale: string) {
    try {
        return await client.fetch(
            `*[_type == "page" && (slug.current == "/prijzen" || slug.current == "prijzen" || slug.current == "pricing" || slug.current == "/pricing" || _id == "page-prijzen-" + $locale) && language == $locale][0] {
                title,
                pageBlocks[] {
                    ...,
                    _type,
                    _key,
                    features[] {
                        _key,
                        title,
                        description,
                        icon
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
        console.error('Failed to fetch pricing page from Sanity:', e);
        return null;
    }
}

export async function generateMetadata({
    params,
}: PricingPageProps): Promise<Metadata> {
    const { locale } = await params;
    const pageData = await getSanityPageData(locale);
    const isEn = locale === 'en';

    const fallbackTitle = isEn
        ? 'Transparent Pricing & Rates | emlinked'
        : 'Transparante Prijzen & Tarieven | emlinked';
    const fallbackDescription = isEn
        ? 'Easily calculate the monthly costs for your property management. Transparent subscription based on contract count, with flexible scaling.'
        : 'Bereken eenvoudig de maandelijkse kosten voor jouw vastgoedbeheer. Transparant abonnement gebaseerd op het aantal contracten, met flexibele opschaling.';
    const canonicalUrl = `${DEFAULT_DOMAIN}${isEn ? '/en/pricing' : '/prijzen'}`;

    return buildMetadata({
        seo: pageData?.seo,
        fallbackTitle,
        fallbackDescription,
        canonicalUrl,
        locale,
    });
}

export default async function PricingPage({ params }: PricingPageProps) {
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
    const calcBlock = blocks.find(
        (b: any) =>
            b._type === 'pricingCalculator' || b._type === 'calculatorBlock',
    );
    const strippenBlock = blocks.find(
        (b: any) => b._type === 'featuresList' || b._type === 'features',
    );
    const ctaBlock = blocks.find(
        (b: any) =>
            b._type === 'ctaBanner' ||
            b._type === 'ctaBlock' ||
            b._type === 'cta',
    );

    const defaultBlocks = [
        { _type: 'hero', ...heroBlock },
        { _type: 'pricingCalculator', ...calcBlock },
        { _type: 'featuresList', ...strippenBlock },
        { _type: 'ctaBanner', ...ctaBlock },
    ];

    const blocksToRender = blocks.length > 0 ? blocks : defaultBlocks;

    const renderHero = (b: any, key: any) => {
        const heroImageUrl = getImageUrl(
            b?.image || b?.heroImage,
            b?.heroImagePath || b?.imagePath || '/emlinked/prijzen-hero.jpg',
        );

        return (
            <React.Fragment key={key}>
                <HeroSection
                    label={
                        b?.label ||
                        (isEn
                            ? 'TRANSPARENT PRICING, SCALED EASILY'
                            : 'HELDERE PRIJZEN, EENVOUDIG OPGESCHAALD')
                    }
                    title={
                        b?.title ||
                        (isEn
                            ? 'A subscription tailored to your real estate portfolio'
                            : 'Een abonnement dat past bij jouw vastgoedportefeuille')
                    }
                    subtitle={
                        b?.subtitle ||
                        (isEn
                            ? 'emlinked offers a transparent subscription model that grows with your property management. Subscriptions start at €173.76 per month for 100 contracts (just €1.74 per contract), with lower rates per contract as your portfolio expands.'
                            : 'emlinked werkt met een transparant abonnement dat meegroeit met je vastgoedbeheer. Zo start het abonnement bij € 173,76 per maand voor 100 contracten (slechts € 1,74 per contract) en daalt de prijs per contract naarmate je portefeuille groeit.')
                    }
                    ctaLabel={
                        b?.ctaLabel ||
                        (isEn
                            ? 'Calculate your subscription ↓'
                            : 'Bereken je abonnement ↓')
                    }
                    ctaLink={b?.ctaLink || '#calculator'}
                    secondaryCtaLabel={
                        b?.secondaryCtaLabel ||
                        (isEn ? 'Talk to us' : 'Spreek met ons')
                    }
                    secondaryCtaLink={
                        b?.secondaryCtaLink ||
                        (isEn ? '/en/contact' : '/contact')
                    }
                    showProof={b?.showProof ?? true}
                    proofText={
                        b?.proofText ||
                        (isEn
                            ? 'Trusted by professional real estate managers & controllers'
                            : 'Vertrouwd door professionele vastgoedbeheerders en controllers')
                    }
                    imagePath={heroImageUrl}
                    isHomepage={false}
                    locale={locale}
                    titleClassName='text-3xl sm:text-4xl lg:text-[2.75rem]'
                />
            </React.Fragment>
        );
    };

    const renderPricingCalculator = (b: any, key: any) => (
        <React.Fragment key={key}>
            <PricingCalculator
                locale={locale}
                sectionTag={b?.sectionTag}
                sectionTitle={b?.sectionTitle}
                sectionSubtitle={b?.sectionSubtitle}
            />
        </React.Fragment>
    );

    const renderStrippenkaarten = (b: any, key: any) => (
        <section
            key={key}
            className='px-6 py-20 bg-card border-b border-black/20 text-foreground relative z-10'
        >
            <div className='max-w-7xl mx-auto space-y-12'>
                <div className='text-center max-w-3xl mx-auto space-y-4'>
                    <div className='flex justify-center mb-3'>
                        <Badge color='teal' uppercase dot>
                            {b?.sectionTag ||
                                (isEn
                                    ? 'FLEXIBLE SUPPORT'
                                    : 'FLEXIBELE ONDERSTEUNING')}
                        </Badge>
                    </div>

                    <h2 className='font-display text-2xl md:text-3xl lg:text-3.5xl font-bold tracking-tight text-darkblue'>
                        {b?.sectionTitle ||
                            (isEn
                                ? 'Prepaid Support Packs: The most cost-effective support'
                                : 'Strippenkaarten: De voordeligste oplossing voor de beste support')}
                    </h2>

                    <p className='text-muted-foreground text-base md:text-lg leading-relaxed font-light'>
                        {b?.sectionSubtitle ||
                            (isEn
                                ? 'All emlinked services and support can easily be paid using our prepaid support packs. Available in 5-hour, 10-hour, and 20-hour packs. The larger the pack, the higher the hourly discount.'
                                : 'Alle diensten en ondersteuning van emlinked kunnen eenvoudig betaald worden met onze strippenkaart. Onze strippenkaarten zijn verkrijgbaar in 5 uur, 10 uur en 20 uur. Hoe groter de strippenkaart, hoe hoger de korting op het uurtarief.')}
                    </p>
                </div>

                {/* 3 Strippenkaart Cards */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch'>
                    {/* 5 Hours */}
                    <div className='rounded-2xl border border-navy-900/10 bg-background p-8 space-y-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group'>
                        <div className='space-y-4'>
                            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/15 text-teal text-xs font-mono font-bold uppercase'>
                                <Clock className='w-3.5 h-3.5' />
                                <span>5 {isEn ? 'Hours' : 'Uur'}</span>
                            </div>
                            <h3 className='text-2xl font-bold text-navy-900'>
                                {isEn
                                    ? '5 Hour Support Pack'
                                    : '5 Uur Strippenkaart'}
                            </h3>
                            <div className='flex items-baseline gap-1.5'>
                                <span className='text-4xl font-extrabold text-navy-900'>
                                    € 550,-
                                </span>
                                <span className='text-xs text-navy-500'>
                                    (€ 110,- / uur)
                                </span>
                            </div>
                            <p className='text-sm text-navy-700 font-light leading-relaxed pt-2 border-t border-navy-900/10'>
                                {isEn
                                    ? 'Ideal for short questions, quick configurations, and light support.'
                                    : 'Ideaal voor korte vragen, snelle instellingen en lichte ondersteuning.'}
                            </p>
                        </div>
                        <Link
                            href={getPath('/contact')}
                            className='inline-flex h-12 items-center justify-center rounded-xl border border-navy-900/15 bg-transparent px-6 text-sm font-semibold text-navy-900 hover:bg-teal hover:text-navy-900 hover:border-teal transition-all duration-200 text-center'
                        >
                            {isEn
                                ? 'Order Support Pack'
                                : 'Bestel strippenkaart'}
                        </Link>
                    </div>

                    {/* 10 Hours */}
                    <div className='rounded-2xl border-2 border-teal/50 bg-background p-8 space-y-6 flex flex-col justify-between shadow-md relative overflow-hidden group hover:-translate-y-1 transition-all duration-300'>
                        <div className='absolute top-0 right-0 bg-teal text-navy-900 font-mono text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl tracking-wider'>
                            {isEn ? 'Popular Choice' : 'Meest gekozen'}
                        </div>
                        <div className='space-y-4'>
                            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/15 text-teal text-xs font-mono font-bold uppercase'>
                                <Clock className='w-3.5 h-3.5' />
                                <span>10 {isEn ? 'Hours' : 'Uur'}</span>
                            </div>
                            <h3 className='text-2xl font-bold text-navy-900'>
                                {isEn
                                    ? '10 Hour Support Pack'
                                    : '10 Uur Strippenkaart'}
                            </h3>
                            <div className='flex items-baseline gap-1.5'>
                                <span className='text-4xl font-extrabold text-navy-900'>
                                    € 899,-
                                </span>
                                <span className='text-xs text-navy-500'>
                                    (€ 89,90 / uur)
                                </span>
                            </div>
                            <p className='text-sm text-navy-700 font-light leading-relaxed pt-2 border-t border-navy-900/10'>
                                {isEn
                                    ? 'Perfect for periodic guidance, custom setup, and ongoing operational support.'
                                    : 'Perfect voor periodieke begeleiding en aanvullende inrichting.'}
                            </p>
                        </div>
                        <Link
                            href={getPath('/contact')}
                            className='inline-flex h-12 items-center gap-1.5 justify-center rounded-lg bg-navy-900 hover:btn-gradient px-6 text-sm font-semibold text-white transition-colors text-center'
                        >
                            {isEn
                                ? 'Order Support Pack'
                                : 'Bestel strippenkaart'}
                        </Link>
                    </div>

                    {/* 20 Hours */}
                    <div className='rounded-2xl border border-navy-900/10 bg-background p-8 space-y-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group'>
                        <div className='space-y-4'>
                            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/15 text-teal text-xs font-mono font-bold uppercase'>
                                <Clock className='w-3.5 h-3.5' />
                                <span>20 {isEn ? 'Hours' : 'Uur'}</span>
                            </div>
                            <h3 className='text-2xl font-bold text-navy-900'>
                                {isEn
                                    ? '20 Hour Support Pack'
                                    : '20 Uur Strippenkaart'}
                            </h3>
                            <div className='flex items-baseline gap-1.5'>
                                <span className='text-4xl font-extrabold text-navy-900'>
                                    € 1.599,-
                                </span>
                                <span className='text-xs text-navy-500'>
                                    (€ 79,95 / uur)
                                </span>
                            </div>
                            <p className='text-sm text-navy-700 font-light leading-relaxed pt-2 border-t border-navy-900/10'>
                                {isEn
                                    ? 'Best value for extensive project support, team onboarding, and custom training.'
                                    : 'De meest voordelige optie voor uitgebreide ondersteuning, projecten en trainingen op maat.'}
                            </p>
                        </div>
                        <Link
                            href={getPath('/contact')}
                            className='inline-flex h-12 items-center justify-center rounded-xl border border-black/20 dark:border-white/20 bg-transparent px-6 text-sm font-semibold text-[#060e32] dark:text-white hover:bg-teal hover:text-[#060e32] hover:border-teal transition-all duration-200 text-center'
                        >
                            {isEn
                                ? 'Order Support Pack'
                                : 'Bestel strippenkaart'}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );

    const renderCta = (b: any, key: any) => {
        const ctaImageUrl = getImageUrl(
            b?.image,
            b?.imagePath || '/hero/vastgoedportfeuille_aangifte-klaar.jpg',
        );

        return (
            <section
                key={key}
                className='lg:px-14 p-4 py-24 bg-linear-to-br from-teal-ultra via-stone-bg to-teal-pale/60 relative overflow-hidden z-10'
            >
                <div className='border border-teal/30 rounded-3xl bg-white/50 hover:shadow-[0_25px_60px_rgba(245,158,11,0.15)] transition-all duration-500 relative overflow-hidden group shadow-lg backdrop-blur-xl lg:px-8'>
                    <div className='text-navy-900 p-8 md:py-16 md:px-10 relative overflow-hidden'>
                        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10'>
                            <div className='lg:col-span-8 flex flex-col gap-5 text-left'>
                                <Badge color='teal' uppercase dot dotPulse>
                                    {b?.tag ||
                                        (isEn
                                            ? 'CONSULTATION'
                                            : 'ADVIESGESPREK')}
                                </Badge>

                                <h2 className='font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight bg-linear-to-br from-[#f12711] to-[#f5af19] bg-clip-text text-transparent'>
                                    {b?.title ||
                                        (isEn
                                            ? 'Questions about rates or a specific portfolio?'
                                            : 'Vragen over de tarieven of een specifieke portefeuille?')}
                                </h2>

                                <p className='text-navy-700 leading-relaxed font-light text-base md:text-lg max-w-2xl'>
                                    {b?.subtitle ||
                                        (isEn
                                            ? 'Our property management specialists are happy to advise you on the best setup for your organization.'
                                            : 'Onze vastgoedbeheerspecialisten denken graag met je mee over de beste inrichting voor jouw organisatie.')}
                                </p>

                                <div className='pt-2'>
                                    <Link
                                        href={getPath(
                                            b?.buttonLink || '/contact',
                                        )}
                                        className='inline-flex h-11 items-center gap-1.5 justify-center rounded-lg bg-navy-900 hover:btn-gradient px-6 text-sm font-semibold text-white transition-colors'
                                    >
                                        <span>
                                            {b?.buttonLabel ||
                                                (isEn
                                                    ? 'Schedule a consultation'
                                                    : 'Plan een vrijblijvend adviesgesprek')}
                                        </span>
                                        <ArrowRight className='h-4 w-4 text-white' />
                                    </Link>
                                </div>
                            </div>

                            <div className='lg:col-span-4 flex justify-start lg:justify-end'>
                                <Image
                                    src={ctaImageUrl}
                                    alt='Emlinked Pricing Consultation'
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
    };

    return (
        <div className='flex flex-col min-h-screen bg-background text-foreground'>
            {blocksToRender.map((block: any, idx: number) => {
                const key = block._key || `${block._type}-${idx}`;

                if (block._type === 'hero' || block._type === 'heroBlock') {
                    return renderHero(block, key);
                }

                if (
                    block._type === 'pricingCalculator' ||
                    block._type === 'calculatorBlock'
                ) {
                    return renderPricingCalculator(block, key);
                }

                if (
                    block._type === 'featuresList' ||
                    block._type === 'features'
                ) {
                    return renderStrippenkaarten(block, key);
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
