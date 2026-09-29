'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeroSection } from '@/components/blocks/HeroSection';
import { Box3EcosystemSection } from '@/components/blocks/box3/Box3EcosystemSection';
import { Box3SolutionWorkflow } from '@/components/blocks/box3/Box3SolutionWorkflow';
import { TestimonialSlider } from '@/components/TestimonialSlider';
import { TeamBlock } from '@/components/blocks/TeamBlock';
import { AppsArchitectureSection } from '@/components/blocks/AppsArchitectureSection';
import { GlowingLink } from '@/components/ui/GlowingButton';
import { getImageUrl } from '@/sanity/image';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    AiSecurity01Icon,
    CheckmarkBadge03Icon,
    StarAward01Icon,
} from '@hugeicons/core-free-icons';
import {
    FileText,
    Cpu,
    Database,
    Zap,
    ArrowRight,
    Layers,
    Building2,
    ShieldCheck,
} from 'lucide-react';

interface PageBlockRendererProps {
    block: any;
    locale?: string;
    isHomepage?: boolean;
}

function getTrustIcon(iconName: string) {
    switch (iconName?.toLowerCase()) {
        case 'check':
            return (
                <HugeiconsIcon
                    icon={CheckmarkBadge03Icon}
                    size={20}
                    className='shrink-0 transition-colors'
                />
            );
        case 'shield':
            return (
                <HugeiconsIcon
                    icon={AiSecurity01Icon}
                    size={20}
                    className='shrink-0 transition-colors'
                />
            );
        case 'star':
        default:
            return (
                <HugeiconsIcon
                    icon={StarAward01Icon}
                    size={20}
                    className='shrink-0 transition-colors text-teal'
                />
            );
    }
}

export function PageBlockRenderer({
    block,
    locale = 'nl',
    isHomepage = false,
}: PageBlockRendererProps) {
    if (!block || !block._type) return null;

    const isEn = locale === 'en';

    const getPath = (path: string) => {
        if (!path) return isEn ? '/en' : '/';
        if (path.startsWith('#')) return path;
        if (isEn) {
            if (path.startsWith('/en')) return path;
            return `/en${path === '/' ? '' : path}`;
        }
        return path;
    };

    switch (block._type) {
        case 'hero':
        case 'heroBlock': {
            return (
                <HeroSection
                    key={block._key}
                    label={block.label || block.tagline}
                    title={block.title}
                    titleClassName={
                        isHomepage
                            ? 'text-3xl sm:text-4xl lg:text-[2.75rem]'
                            : undefined
                    }
                    subtitle={block.subtitle || block.description}
                    ctaLabel={block.ctaLabel}
                    ctaLink={block.ctaLink}
                    secondaryCtaLabel={block.secondaryCtaLabel}
                    secondaryCtaLink={block.secondaryCtaLink}
                    showProof={block.showProof ?? true}
                    proofText={block.proofText}
                    imagePath={
                        getImageUrl(
                            block.image || block.heroImage,
                            block.imagePath,
                        ) ||
                        (isHomepage
                            ? '/hero/vastgoedbeheer-dashboard-illustration.jpg'
                            : '/hero/vastgoedportfeuille_aangifte-klaar.jpg')
                    }
                    isHomepage={isHomepage}
                    locale={locale}
                />
            );
        }

        case 'trustBar':
        case 'trust': {
            const items = block.items || [];
            if (!items.length) return null;
            return (
                <section
                    key={block._key}
                    className='bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] animate-none dark:text-[#060e32] dark:bg-navy-dark border-b border-gray-200 dark:border-white/5 py-3 px-4 sm:px-6 lg:px-8 shadow-sm'
                >
                    <div className='max-w-7xl mx-auto flex items-center justify-center gap-6 sm:gap-9 flex-wrap'>
                        {items.map((item: any) => (
                            <div
                                key={item._key || item.text}
                                className='flex items-center gap-2 text-xs font-mono font-semibold text-darkBlue/75 dark:text-white/90 hover:text-teal dark:hover:text-teal transition-colors tracking-wide'
                            >
                                {getTrustIcon(item.icon)}
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </section>
            );
        }

        case 'featuresList': {
            let sectionTag = block.sectionTag || block.badge || '';
            let sectionSubtitle = block.sectionSubtitle || block.subtitle || '';

            if (!sectionTag && sectionSubtitle.includes(' — ')) {
                const parts = sectionSubtitle.split(' — ');
                sectionTag = parts[0].trim();
                sectionSubtitle = parts.slice(1).join(' — ').trim();
            }

            const sectionTitle = block.sectionTitle || block.title || '';
            const features = block.features || block.items || [];

            return (
                <section
                    key={block._key}
                    className='px-6 py-24 bg-background relative overflow-hidden'
                >
                    <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-14 relative z-10'>
                        <div className='max-w-3xl mx-auto flex flex-col gap-4 text-center'>
                            {sectionTag && (
                                <div className='flex justify-center mb-1'>
                                    <Badge color='teal' uppercase>
                                        {sectionTag}
                                    </Badge>
                                </div>
                            )}
                            {sectionTitle && (
                                <h2 className='font-display text-3xl md:text-4xl lg:text-[2.7rem]/12 font-bold tracking-tight text-foreground'>
                                    {sectionTitle}
                                </h2>
                            )}
                            {sectionSubtitle && (
                                <p className='text-muted-foreground leading-relaxed text-base md:text-lg font-light'>
                                    {sectionSubtitle}
                                </p>
                            )}
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-left'>
                            {features.map((feature: any, idx: number) => {
                                // The hardcoded "three apps" screenshots and
                                // links only belong to the homepage apps
                                // grid — every other featuresList block on
                                // the site (Box3 lead magnet, differentiator
                                // cards, ...) reuses this same schema/case
                                // and must NOT inherit unrelated app
                                // screenshots or /apps/* links as a fallback.
                                const isAppsGrid =
                                    block._key === 'features-core-block';

                                const resolvedImg = getImageUrl(
                                    feature.image,
                                    feature.imagePath || feature.photoPath,
                                );
                                const fallbackImg = isAppsGrid
                                    ? idx === 0
                                        ? '/emlinked/home/DrieKrachtigeApps01_VastgoedbeheerSoftware.webp'
                                        : idx === 1
                                          ? '/emlinked/home/DrieKrachtigeApps02_Huurdersportaal.webp'
                                          : '/emlinked/home/DrieKrachtigeApps03_PaymentSoftware.webp'
                                    : undefined;
                                const cardImg = resolvedImg || fallbackImg;

                                const resolvedIconBadge = getImageUrl(
                                    feature.iconImage,
                                    feature.iconPath,
                                );

                                const appsGridLink = isAppsGrid
                                    ? idx === 0
                                        ? '/apps/vastgoedbeheer-software'
                                        : idx === 1
                                          ? '/apps/huurdersportaal'
                                          : '/apps/payment-software'
                                    : undefined;
                                const linkTarget =
                                    feature.ctaLink || appsGridLink;

                                // version02: card wash rotation lifted from
                                // the integrationsList section below — teal /
                                // emerald / navy pastel per card, matching
                                // the frontpage's layout (v4) recolored with
                                // our own accent instead of v4's orange/blue.
                                const cardWash = [
                                    'bg-teal-pale/50',
                                    'bg-emerald-50',
                                    'bg-navy-50',
                                ];
                                const iconColor = [
                                    'text-teal bg-white',
                                    'text-emerald-600 bg-white',
                                    'text-navy-700 bg-white',
                                ];
                                const linkColor = [
                                    'text-teal',
                                    'text-emerald-600',
                                    'text-navy-700',
                                ];
                                const DefaultIcon = [
                                    Building2,
                                    ShieldCheck,
                                    Zap,
                                ][idx % 3];

                                return (
                                    <div
                                        key={feature._key || idx}
                                        className={cn(
                                            'rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group relative',
                                            cardWash[idx % cardWash.length],
                                        )}
                                    >
                                        {linkTarget && (
                                            <Link
                                                href={getPath(linkTarget)}
                                                className='absolute inset-0 z-20'
                                                aria-label={feature.title}
                                            />
                                        )}

                                        <div className='flex flex-col gap-4 p-6 md:p-8 pb-4 z-10 pointer-events-none'>
                                            <div
                                                className={cn(
                                                    'w-11 h-11 rounded-xl shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300',
                                                    iconColor[
                                                        idx % iconColor.length
                                                    ],
                                                )}
                                            >
                                                {resolvedIconBadge ? (
                                                    <div className='relative w-6 h-6'>
                                                        <Image
                                                            src={
                                                                resolvedIconBadge
                                                            }
                                                            alt={
                                                                feature.title ||
                                                                'Icon'
                                                            }
                                                            fill
                                                            className='object-contain'
                                                        />
                                                    </div>
                                                ) : (
                                                    <DefaultIcon className='w-5 h-5' />
                                                )}
                                            </div>

                                            <h3 className='text-xl font-bold text-navy-900 group-hover:text-teal transition-colors'>
                                                {feature.title}
                                            </h3>

                                            <p className='text-sm text-navy-600 leading-relaxed font-light'>
                                                {feature.description}
                                            </p>

                                            <div
                                                className={cn(
                                                    'inline-flex items-center gap-1.5 text-sm font-semibold group-hover:translate-x-0.5 transition-all duration-200 w-min whitespace-nowrap',
                                                    linkColor[
                                                        idx % linkColor.length
                                                    ],
                                                )}
                                            >
                                                <span>
                                                    {feature.ctaLabel ||
                                                        (isEn
                                                            ? 'Discover more'
                                                            : 'Bekijk module')}
                                                </span>
                                                <ArrowRight className='w-3.5 h-3.5' />
                                            </div>
                                        </div>

                                        {cardImg && (
                                            <div className='relative w-full h-44 mt-2'>
                                                <Image
                                                    src={cardImg}
                                                    alt={
                                                        feature.title ||
                                                        'Module'
                                                    }
                                                    fill
                                                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                                    className='object-cover group-hover:scale-105 transition-transform duration-500'
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            );
        }

        case 'integrationsList': {
            const sectionTag =
                block.sectionTag ||
                (isEn ? 'ERP INTEGRATION' : 'ERP INTEGRATIE');
            const sectionTitle =
                block.sectionTitle ||
                (isEn
                    ? 'Native connection with Microsoft Dynamics 365 Business Central'
                    : 'De directe koppeling met Microsoft Dynamics 365 Business Central');
            const sectionSubtitle =
                block.sectionSubtitle ||
                (isEn
                    ? 'Many platforms promise an integration, but emlinked runs natively inside your ERP environment.'
                    : 'Veel platformen beloven een koppeling, maar emlinked werkt native binnen uw ERP-omgeving.');
            const integrations = block.integrations || block.items || [];

            // version02: soft light-warm canvas instead of the dark navy
            // texture, one pastel wash per card (teal/emerald/navy-50) in
            // place of a flat dark-glass treatment.
            const cardWash = ['bg-teal-pale/50', 'bg-emerald-50', 'bg-navy-50'];

            const diagramIcons = [Database, FileText, Cpu];
            const diagramPos = [
                'top-0 left-0',
                'top-6 right-0',
                'bottom-0 right-6',
            ];
            const connectorRotate = [
                '-rotate-[143deg]',
                '-rotate-[34deg]',
                'rotate-[38deg]',
            ];

            return (
                <section
                    key={block._key}
                    className='px-6 py-24 bg-stone-bg text-navy-900 border-b border-navy-900/10 relative overflow-hidden'
                >
                    <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 flex flex-col gap-14 relative z-10'>
                        {/* Hub-and-spoke hero: Emlinked as the connected
                            center of the ERP, not a bolt-on integration —
                            the site's one deliberate dark section, giving
                            this claim visual weight against the light pages
                            around it (frontpage/v4 layout reference). */}
                        <div className='rounded-3xl bg-navy-900 text-white p-8 sm:p-12 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-hidden relative'>
                            <div className='absolute -top-24 -left-24 w-72 h-72 rounded-full bg-teal/10 blur-3xl pointer-events-none' />

                            <div className='flex flex-col gap-5 text-left relative z-10'>
                                {sectionTag && (
                                    <Badge color='teal' uppercase dot>
                                        {sectionTag}
                                    </Badge>
                                )}
                                <h2 className='font-display text-3xl md:text-4xl lg:text-[2.7rem]/12 font-bold tracking-tight text-white'>
                                    {sectionTitle}
                                </h2>
                                {sectionSubtitle && (
                                    <p className='text-white/70 leading-relaxed text-base md:text-lg font-light'>
                                        {sectionSubtitle}
                                    </p>
                                )}
                            </div>

                            <div className='relative min-h-72 flex items-center justify-center z-10'>
                                {[0, 1, 2].map((i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            'absolute top-1/2 left-1/2 w-32 border-t border-dashed border-white/25 origin-left pointer-events-none',
                                            connectorRotate[i],
                                        )}
                                    />
                                ))}

                                <div className='relative z-10 w-40 text-center rounded-2xl bg-teal border border-teal p-4'>
                                    <span className='w-8 h-8 mx-auto rounded-full bg-white text-teal font-black text-lg flex items-center justify-center'>
                                        e
                                    </span>
                                    <b className='block text-xs font-bold mt-2'>
                                        Emlinked
                                    </b>
                                    <small className='block text-[10px] text-white/85 mt-1'>
                                        {isEn
                                            ? 'Real estate platform'
                                            : 'Vastgoedplatform'}
                                    </small>
                                </div>

                                {integrations
                                    .slice(0, 3)
                                    .map((item: any, idx: number) => {
                                        const NodeIcon = diagramIcons[idx];
                                        return (
                                            <div
                                                key={item._key || idx}
                                                className={cn(
                                                    'absolute z-10 min-w-36 rounded-2xl bg-[#1d3b62] border border-white/10 p-3.5',
                                                    diagramPos[idx],
                                                )}
                                            >
                                                <NodeIcon className='w-4.5 h-4.5 text-teal' />
                                                <b className='block text-[11px] font-bold mt-1.5'>
                                                    {item.title}
                                                </b>
                                                <small className='block text-[9px] text-white/60 mt-1'>
                                                    {item.badge}
                                                </small>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>

                        <div className='relative grid grid-cols-1 lg:grid-cols-3 gap-8 text-left'>
                            {integrations.map((item: any, idx: number) => {
                                const footerSpec =
                                    item.footerSpec ||
                                    (idx === 0
                                        ? 'Direct DB Schema'
                                        : idx === 1
                                          ? 'Continia OCR Engine'
                                          : 'PSD2 / ISO 20022');
                                const statusText =
                                    item.statusText ||
                                    (idx === 0
                                        ? 'Core Database'
                                        : idx === 1
                                          ? 'Auto-Matching'
                                          : 'Live Reconciled');
                                const nodeLabel =
                                    idx === 0
                                        ? '2-Way Sync'
                                        : idx === 1
                                          ? 'Inbound Feed'
                                          : 'Realtime Feed';

                                return (
                                    <div
                                        key={item._key || idx}
                                        className={cn(
                                            'p-8 rounded-2xl border border-navy-900/10 text-navy-900 hover:border-teal/40 hover:shadow-lg transition-all duration-300 relative overflow-hidden group flex flex-col justify-between gap-6 z-10',
                                            cardWash[idx % cardWash.length],
                                        )}
                                    >
                                        <div className='flex flex-col gap-4 z-10'>
                                            <div className='flex items-center justify-between'>
                                                <div className='h-12 w-12 rounded-xl bg-white border border-teal/35 flex items-center justify-center text-teal font-bold text-lg shadow-xs'>
                                                    {idx === 0 ? (
                                                        <Database className='h-6 w-6' />
                                                    ) : idx === 1 ? (
                                                        <FileText className='h-6 w-6' />
                                                    ) : (
                                                        <Cpu className='h-6 w-6' />
                                                    )}
                                                </div>
                                                <Badge color='teal' uppercase>
                                                    {nodeLabel}
                                                </Badge>
                                            </div>

                                            <div className='flex flex-col gap-1 mt-2'>
                                                {item.badge && (
                                                    <span className='text-[10px] font-bold text-teal-hover uppercase tracking-widest'>
                                                        {item.badge}
                                                    </span>
                                                )}
                                                <h3 className='text-2xl font-bold text-navy-900 tracking-tight'>
                                                    {item.title}
                                                </h3>
                                            </div>
                                            <p className='font-normal text-navy-600 leading-relaxed text-sm'>
                                                {item.description}
                                            </p>
                                        </div>

                                        <div className='pt-4 border-t border-navy-900/10 flex items-center justify-between text-xs z-10'>
                                            <span className='text-teal-hover font-mono font-semibold tracking-wide flex items-center gap-1.5'>
                                                <Layers className='h-3.5 w-3.5 text-teal/80' />
                                                {footerSpec}
                                            </span>
                                            <span className='text-emerald-700 font-semibold text-[11px] flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md'>
                                                <span className='w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse' />
                                                {statusText}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            );
        }

        case 'ctaBanner':
        case 'ctaBlock':
        case 'cta': {
            const tag =
                block.tag ||
                block.badge ||
                (isEn ? 'DIGITALIZATION' : 'DIGITALISERING');
            const title =
                block.title ||
                (isEn
                    ? 'Ready to digitize your property management?'
                    : 'Klaar om uw vastgoedbeheer te digitaliseren?');
            const subtitle =
                block.subtitle ||
                (isEn
                    ? 'Join leading property managers who eliminated manual tasks.'
                    : 'Sluit aan bij de professionele beheerders die handmatig werk hebben geëlimineerd.');
            const buttonLabel =
                block.buttonLabel ||
                block.buttonText ||
                (isEn
                    ? 'Request a free demo'
                    : 'Vraag een live demonstratie aan');
            const buttonLink = block.buttonLink || '/contact';

            return (
                <section
                    key={block._key}
                    className='px-6 py-24 bg-background relative overflow-hidden'
                >
                    <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8'>
                        <div className='border border-teal/30 rounded-3xl bg-linear-to-br from-teal-ultra via-stone-bg to-teal-pale/60 text-navy-900 p-10 md:p-16 hover:shadow-[0_25px_60px_rgba(245,158,11,0.15)] transition-all duration-500 relative overflow-hidden group shadow-lg'>
                            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10'>
                                <div className='lg:col-span-8 flex flex-col gap-5 text-left'>
                                    {tag && (
                                        <Badge
                                            color='teal'
                                            uppercase
                                            dot
                                            dotPulse
                                        >
                                            {tag}
                                        </Badge>
                                    )}
                                    <h2 className='font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-navy-900 leading-tight'>
                                        {title}
                                    </h2>
                                    <p className='text-navy-700 leading-relaxed font-light text-base md:text-lg max-w-2xl'>
                                        {subtitle}
                                    </p>
                                    {buttonLabel && buttonLink && (
                                        <GlowingLink
                                            href={getPath(buttonLink)}
                                            className='h-14 px-12 text-base mr-auto font-bold shadow-xl hover:shadow-teal/30'
                                        >
                                            {buttonLabel}
                                        </GlowingLink>
                                    )}
                                </div>
                                <div className='lg:col-span-4 flex justify-start lg:justify-end'>
                                    <Image
                                        src={
                                            getImageUrl(
                                                block.image,
                                                block.imagePath,
                                            ) ||
                                            '/emlinked/home/Vastgoedbeheer_automatiseren.jpg'
                                        }
                                        alt={title}
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
            );
        }

        case 'ecosystemSection':
        case 'ecosystem': {
            return (
                <Box3EcosystemSection
                    key={block._key}
                    isEn={isEn}
                    badge={block.badge}
                    title={block.title}
                    subtitle={block.subtitle}
                    cardTitle={block.cardTitle}
                    cardSubtitle={block.cardSubtitle}
                    cardPoints={block.cardPoints}
                    trustItems={block.trustItems}
                />
            );
        }

        case 'workflow':
        case 'workflowBlock': {
            return (
                <Box3SolutionWorkflow
                    key={block._key}
                    workflowBadge={block.badge}
                    workflowTitle={block.title}
                    workflowItems={block.items}
                    isEn={isEn}
                />
            );
        }

        case 'testimonialSection':
        case 'testimonial': {
            return (
                <TestimonialSlider
                    key={block._key}
                    title={block.title || block.sectionTitle}
                    subtitle={block.subtitle || block.sectionSubtitle}
                />
            );
        }

        case 'teamBlock':
        case 'team': {
            return (
                <TeamBlock
                    key={block._key}
                    sectionTitle={block.title || block.sectionTitle}
                    sectionSubtitle={block.subtitle || block.sectionSubtitle}
                    members={block.members}
                    locale={locale}
                />
            );
        }

        case 'architectureSection': {
            return (
                <AppsArchitectureSection
                    key={block._key}
                    tag={block.tag || block.badge}
                    title={block.title || block.sectionTitle}
                    subtitle={block.subtitle || block.sectionSubtitle}
                    sectionTag={block.sectionTag}
                    sectionTitle={block.sectionTitle}
                    sectionSubtitle={block.sectionSubtitle}
                    bullets={block.bullets}
                    bgImagePath={
                        getImageUrl(block.bgImage, block.bgImagePath) ||
                        undefined
                    }
                    locale={locale}
                />
            );
        }

        default:
            return null;
    }
}
