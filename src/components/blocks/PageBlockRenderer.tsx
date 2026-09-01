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
import { HugeiconsIcon } from '@hugeicons/react';
import {
    AiSecurity01Icon,
    CheckmarkBadge03Icon,
    StarAward01Icon,
} from '@hugeicons/core-free-icons';
import {
    AlertCircle,
    Info,
    FileText,
    Cpu,
    Database,
    CheckCircle2,
    CreditCard,
    RefreshCw,
    Zap,
    ArrowDownRight,
    ArrowRight,
    Layers,
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
                    className='shrink-0 transition-colors text-amber'
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
                    titleClassName={isHomepage ? 'text-3xl sm:text-4xl lg:text-[2.75rem]' : undefined}
                    subtitle={block.subtitle || block.description}
                    ctaLabel={block.ctaLabel}
                    ctaLink={block.ctaLink}
                    secondaryCtaLabel={block.secondaryCtaLabel}
                    secondaryCtaLink={block.secondaryCtaLink}
                    showProof={block.showProof ?? true}
                    proofText={block.proofText}
                    imagePath={
                        getImageUrl(block.image || block.heroImage, block.imagePath) ||
                        '/hero/vastgoedportfeuille_aangifte-klaar.jpg'
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
                                className='flex items-center gap-2 text-xs font-mono font-semibold text-darkBlue/75 dark:text-white/90 hover:text-amber dark:hover:text-amber transition-colors tracking-wide'
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
                                    <span className='inline-flex items-center justify-center rounded-full border border-amber/50 bg-[#251b14]/90 px-6 py-1.5 text-xs font-mono font-bold tracking-widest text-amber uppercase backdrop-blur-md shadow-md'>
                                        {sectionTag}
                                    </span>
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
                                const resolvedImg = getImageUrl(
                                    feature.image,
                                    feature.imagePath || feature.photoPath,
                                );
                                const fallbackImg =
                                    idx === 0
                                        ? '/emlinked/home/DrieKrachtigeApps01_VastgoedbeheerSoftware.webp'
                                        : idx === 1
                                          ? '/emlinked/home/DrieKrachtigeApps02_Huurdersportaal.webp'
                                          : '/emlinked/home/DrieKrachtigeApps03_PaymentSoftware.webp';
                                const cardImg = resolvedImg || fallbackImg;

                                const linkTarget =
                                    feature.ctaLink ||
                                    (idx === 0
                                        ? '/apps'
                                        : idx === 1
                                          ? '/apps'
                                          : '/apps');

                                const tagText =
                                    idx === 0
                                        ? isEn ? 'Primary operational module' : 'Basis beheermodule'
                                        : idx === 1
                                          ? isEn ? 'Self-service module' : 'Self-service module'
                                          : isEn ? 'Automated banking module' : 'Automatische bankmodule';

                                return (
                                    <div
                                        key={feature._key || idx}
                                        className='px-6 md:px-8 pt-6 md:pt-8 md:pb-6 pb-5 rounded-2xl border border-black/20 bg-background flex flex-col justify-between gap-3.5 hover:shadow-xl hover:-translate-y-1.5 hover:border-amber/40 transition-all duration-300 group relative'
                                    >
                                        {linkTarget && (
                                            <Link
                                                href={getPath(linkTarget)}
                                                className='absolute inset-0 z-20'
                                                aria-label={feature.title}
                                            />
                                        )}

                                        <div className='absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 z-30 w-13 h-13 rounded-full bg-amber/80 text-white shadow-xl border-2 border-white dark:border-[#060e32] flex flex-col items-center justify-center font-extrabold text-[10px] uppercase tracking-tight leading-none group-hover:scale-110 transition-transform duration-300 pointer-events-none'>
                                            <span>APP</span>
                                            <span className='text-[20px] font-black text-white mt-0.5'>
                                                0{idx + 1}
                                            </span>
                                        </div>

                                        <div className='flex flex-col gap-4 z-10 pointer-events-none'>
                                            <div className='relative w-full h-52 rounded-xl overflow-hidden bg-texture-navy/5 border border-black/20/50 group-hover:border-amber/30 transition-colors'>
                                                <Image
                                                    src={cardImg}
                                                    alt={feature.title || 'Module'}
                                                    fill
                                                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                                    className='object-cover group-hover:scale-105 transition-transform duration-500'
                                                />
                                            </div>

                                            <div className='flex items-center gap-3 mt-1'>
                                                <h3 className='text-xl font-bold text-[#060e32] dark:text-white group-hover:text-amber transition-colors'>
                                                    {feature.title}
                                                </h3>
                                            </div>

                                            <p className='text-sm text-muted-foreground leading-relaxed font-light'>
                                                {feature.description}
                                            </p>
                                        </div>

                                        <div className='pt-2 border-t border-black/20/40 flex items-center justify-between gap-4 z-30 mt-auto pointer-events-none'>
                                            <div className='flex items-center gap-2 text-xs font-medium text-muted-foreground truncate'>
                                                <CheckCircle2 className='w-3.5 h-3.5 text-amber shrink-0' />
                                                <span className='truncate'>{tagText}</span>
                                            </div>

                                            <div className='inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber group-hover:text-foreground group-hover:translate-x-0.5 transition-all duration-200 shrink-0'>
                                                <span>
                                                    {feature.ctaLabel || (isEn ? 'Learn more →' : 'Bekijk module →')}
                                                </span>
                                                <ArrowRight className='w-3.5 h-3.5' />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            );
        }

        case 'integrationsList': {
            const sectionTag = block.sectionTag || (isEn ? 'ERP INTEGRATION' : 'ERP INTEGRATIE');
            const sectionTitle = block.sectionTitle || (isEn ? 'Native connection with Microsoft Dynamics 365 Business Central' : 'De directe koppeling met Microsoft Dynamics 365 Business Central');
            const sectionSubtitle = block.sectionSubtitle || (isEn ? 'Many platforms promise an integration, but emlinked runs natively inside your ERP environment.' : 'Veel platformen beloven een koppeling, maar emlinked werkt native binnen uw ERP-omgeving.');
            const integrations = block.integrations || block.items || [];

            return (
                <section
                    key={block._key}
                    className='px-6 py-24 bg-texture-navy text-white border-b border-white/10 relative overflow-hidden'
                >
                    <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-14 relative z-10'>
                        <div className='max-w-3xl mx-auto flex flex-col gap-4 text-center'>
                            {sectionTag && (
                                <div className='flex justify-center mb-1'>
                                    <span className='inline-flex items-center justify-center rounded-full border border-amber/50 bg-[#251b14]/90 px-6 py-1.5 text-xs font-mono font-bold tracking-widest text-amber uppercase backdrop-blur-md shadow-md'>
                                        {sectionTag}
                                    </span>
                                </div>
                            )}
                            <h2 className='font-display text-3xl md:text-4xl lg:text-[2.7rem]/12 font-bold tracking-tight text-white'>
                                {sectionTitle}
                            </h2>
                            {sectionSubtitle && (
                                <p className='text-white/75 leading-relaxed text-base md:text-lg font-light'>
                                    {sectionSubtitle}
                                </p>
                            )}
                        </div>

                        <div className='relative grid grid-cols-1 lg:grid-cols-3 gap-8 text-left'>
                            {integrations.map((item: any, idx: number) => {
                                const footerSpec = item.footerSpec || (idx === 0 ? 'Direct DB Schema' : idx === 1 ? 'Continia OCR Engine' : 'PSD2 / ISO 20022');
                                const statusText = item.statusText || (idx === 0 ? 'Core Database' : idx === 1 ? 'Auto-Matching' : 'Live Reconciled');
                                const nodeLabel = idx === 0 ? '2-Way Sync' : idx === 1 ? 'Inbound Feed' : 'Realtime Feed';

                                return (
                                    <div
                                        key={item._key || idx}
                                        className='p-8 rounded-2xl border border-white/15 bg-white/4 backdrop-blur-xl text-white hover:border-amber/50 hover:bg-white/[0.07] transition-all duration-300 relative overflow-hidden group flex flex-col justify-between gap-6 z-10'
                                    >
                                        <div className='flex flex-col gap-4 z-10'>
                                            <div className='flex items-center justify-between'>
                                                <div className='h-12 w-12 rounded-xl bg-amber/15 border border-amber/35 flex items-center justify-center text-amber font-bold text-lg shadow-md'>
                                                    {idx === 0 ? <Database className='h-6 w-6' /> : idx === 1 ? <FileText className='h-6 w-6' /> : <Cpu className='h-6 w-6' />}
                                                </div>
                                                <span className='text-[10px] font-bold text-amber bg-amber/10 border border-amber/30 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5'>
                                                    {nodeLabel}
                                                </span>
                                            </div>

                                            <div className='flex flex-col gap-1 mt-2'>
                                                {item.badge && (
                                                    <span className='text-[10px] font-bold text-amber/90 uppercase tracking-widest'>
                                                        {item.badge}
                                                    </span>
                                                )}
                                                <h3 className='text-2xl font-bold text-white tracking-tight'>
                                                    {item.title}
                                                </h3>
                                            </div>
                                            <p className='font-normal text-white/75 leading-relaxed text-sm'>
                                                {item.description}
                                            </p>
                                        </div>

                                        <div className='pt-4 border-t border-white/10 flex items-center justify-between text-xs z-10'>
                                            <span className='text-amber font-mono font-semibold tracking-wide flex items-center gap-1.5'>
                                                <Layers className='h-3.5 w-3.5 text-amber/80' />
                                                {footerSpec}
                                            </span>
                                            <span className='text-emerald-400 font-semibold text-[11px] flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-md'>
                                                <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse' />
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
            const tag = block.tag || block.badge || (isEn ? 'DIGITALIZATION' : 'DIGITALISERING');
            const title = block.title || (isEn ? 'Ready to digitize your property management?' : 'Klaar om uw vastgoedbeheer te digitaliseren?');
            const subtitle = block.subtitle || (isEn ? 'Join leading property managers who eliminated manual tasks.' : 'Sluit aan bij de professionele beheerders die handmatig werk hebben geëlimineerd.');
            const buttonLabel = block.buttonLabel || block.buttonText || (isEn ? 'Request a free demo' : 'Vraag een live demonstratie aan');
            const buttonLink = block.buttonLink || '/contact';

            return (
                <section
                    key={block._key}
                    className='px-6 py-24 bg-background relative overflow-hidden'
                >
                    <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8'>
                        <div className='border border-amber/30 rounded-3xl bg-texture-navy text-white p-10 md:p-16 hover:shadow-[0_25px_60px_rgba(245,158,11,0.15)] transition-all duration-500 relative overflow-hidden group shadow-2xl backdrop-blur-xl'>
                            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10'>
                                <div className='lg:col-span-8 flex flex-col gap-5 text-left'>
                                    {tag && (
                                        <span className='inline-flex items-center gap-2 self-start rounded-full bg-amber/15 border border-amber/35 px-5 py-1.5 text-xs font-bold tracking-widest text-amber uppercase backdrop-blur-md'>
                                            <span className='w-1.5 h-1.5 bg-amber rounded-full animate-ping' />
                                            {tag}
                                        </span>
                                    )}
                                    <h2 className='font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight'>
                                        {title}
                                    </h2>
                                    <p className='text-white/80 leading-relaxed font-light text-base md:text-lg max-w-2xl'>
                                        {subtitle}
                                    </p>
                                    {buttonLabel && buttonLink && (
                                        <GlowingLink
                                            href={getPath(buttonLink)}
                                            className='h-14 px-12 text-base mr-auto font-bold shadow-xl hover:shadow-amber/30'
                                        >
                                            {buttonLabel}
                                        </GlowingLink>
                                    )}
                                </div>
                                <div className='lg:col-span-4 flex justify-start lg:justify-end'>
                                    <Image
                                        src={
                                            getImageUrl(block.image, block.imagePath) ||
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
                    locale={locale}
                />
            );
        }

        default:
            return null;
    }
}
