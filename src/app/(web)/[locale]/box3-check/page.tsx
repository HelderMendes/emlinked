import type { Metadata } from 'next';
import {
    FileSpreadsheet,
    Link2Off,
    Receipt,
    Clock,
} from 'lucide-react';
import { sanityFetch } from '@/lib/sanity';
import { HeroSection } from '@/components/blocks/HeroSection';
import { Box3Calculator } from '@/components/Box3Calculator';
import { Box3HeroDashboardCard } from '@/components/blocks/box3/Box3HeroDashboardCard';
import { Box3UrgencyBar } from '@/components/blocks/box3/Box3UrgencyBar';
import { Box3VoorWieSection } from '@/components/blocks/box3/Box3VoorWieSection';
import { Box3SolutionWorkflow } from '@/components/blocks/box3/Box3SolutionWorkflow';
import { Box3EcosystemSection } from '@/components/blocks/box3/Box3EcosystemSection';
import { Box3CtaBanner } from '@/components/blocks/box3/Box3CtaBanner';

interface Box3PageProps {
    params: Promise<{ locale: string }>;
}

async function getSanityPageData(locale: string) {
    try {
        return await sanityFetch<any>({
            query: `*[_type == "page" && (slug.current == "box3-check" || slug.current == "/box3-check" || slug.current == "kennisbank/box3-check" || _id == "page-box3-check-" + $locale) && language == $locale][0] {
                title,
                pageBlocks[] {
                    ...,
                    _type,
                    _key,
                    features[] {
                        ...,
                        bullets
                    },
                    items[] {
                        ...
                    }
                },
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

import { buildMetadata, DEFAULT_DOMAIN } from '@/lib/seo';

export async function generateMetadata({
    params,
}: Box3PageProps): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getSanityPageData(locale);

    const fallbackTitle = isEn
        ? 'Box 3 Real Estate Check | Calculate Actual Yield'
        : 'Box 3 Vastgoed Check | Bereken Werkelijk Rendement';
    const fallbackDescription = isEn
        ? 'Calculate the impact of changing Box 3 legislation on your real estate portfolio for free. Discover your fiscal position and keep your yields audit-proof.'
        : 'Bereken gratis de impact van de Wet werkelijk rendement box 3 op uw vastgoedportefeuille. Ontdek uw fiscale positie en houd uw rendement op orde.';
    const canonicalUrl = `${DEFAULT_DOMAIN}${isEn ? '/en/box3-check' : '/box3-check'}`;

    return buildMetadata({
        seo: pageData?.seo,
        fallbackTitle,
        fallbackDescription,
        canonicalUrl,
        locale,
    });
}

export default async function Box3CheckPage({ params }: Box3PageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getSanityPageData(locale);

    // Dynamic Sanity pageBlocks extractions
    const pageBlocks = pageData?.pageBlocks || [];
    const heroBlock = pageBlocks.find((b: any) => b._type === 'hero');
    const announcementBlock = pageBlocks.find(
        (b: any) =>
            b._type === 'announcement' ||
            b._type === 'notificationBar' ||
            b._type === 'urgencyBar',
    );
    const voorWieBlock = pageBlocks.find(
        (b: any) =>
            b._type === 'featuresList' ||
            b._key === 'voor-wie' ||
            b.badge === 'Voor Wie' ||
            b.badge === 'Target Audience',
    );
    const workflowBlock = pageBlocks.find(
        (b: any) =>
            b._type === 'workflow' ||
            b._type === 'stepsBlock' ||
            b._key === 'de-oplossing' ||
            b.badge === 'De Oplossing' ||
            b.badge === 'The Solution' ||
            (b.title && b.title.toLowerCase().includes('systeem')),
    );
    const calculatorBlock = pageBlocks.find(
        (b: any) =>
            b._type === 'calculatorBlock' ||
            b.calculatorType === 'box3' ||
            b._key === 'calculator-block-nl' ||
            b._key === 'calculator-block-en',
    );
    const ecosystemBlock = pageBlocks.find(
        (b: any) =>
            b._type === 'ecosystemSection' ||
            b._type === 'integrationsList' ||
            b._key === 'ecosystem-block-nl' ||
            b._key === 'ecosystem-block-en',
    );
    const ctaBlock = pageBlocks.find(
        (b: any) => b._type === 'ctaBanner' || b._type === 'cta',
    );

    const painPointIcons = [
        <FileSpreadsheet className='w-4.5 h-4.5 text-[#060e32]' key='1' />,
        <Link2Off className='w-4.5 h-4.5 text-[#060e32]' key='2' />,
        <Receipt className='w-4.5 h-4.5 text-[#060e32]' key='3' />,
        <Clock className='w-4.5 h-4.5 text-[#060e32]' key='4' />,
    ];

    const voorWieItems = voorWieBlock?.items?.map((item: any, idx: number) => ({
        icon: painPointIcons[idx % painPointIcons.length],
        title: item.title,
        text: item.text || item.description,
    }));

    return (
        <main className='flex-1 text-white bg-slate-950'>
            {/* SECTION B: Hero Section with Clean Dashboard Preview Card */}
            <HeroSection
                label={heroBlock?.label}
                title={heroBlock?.title}
                subtitle={heroBlock?.subtitle}
                ctaLabel={heroBlock?.ctaLabel}
                ctaLink={heroBlock?.ctaLink}
                secondaryCtaLabel={heroBlock?.secondaryCtaLabel}
                secondaryCtaLink={heroBlock?.secondaryCtaLink}
                showProof={heroBlock?.showProof ?? true}
                showProofAvatars={false}
                proofText={heroBlock?.proofText}
                customGraphic={
                    <Box3HeroDashboardCard
                        isEn={isEn}
                        badge={heroBlock?.heroCard?.badge}
                        title={heroBlock?.heroCard?.title}
                        status={heroBlock?.heroCard?.status}
                    />
                }
            />

            {/* SECTION B2: Post-Hero Box 3 Urgency Notification Bar */}
            <Box3UrgencyBar
                announcementBadge={announcementBlock?.badge}
                announcementText={announcementBlock?.text}
                announcementCtaLabel={announcementBlock?.ctaLabel}
                announcementCtaLink={announcementBlock?.ctaLink}
            />

            {/* SECTION C: Problem & Fiscale Context (#voor-wie) */}
            <Box3VoorWieSection
                voorWieBadge={voorWieBlock?.badge}
                voorWieTitle={voorWieBlock?.title}
                voorWieSubtitle={
                    voorWieBlock?.subtitle || voorWieBlock?.description
                }
                fiscalContextBadge={voorWieBlock?.fiscalContext?.badge}
                fiscalContextTitle={voorWieBlock?.fiscalContext?.title}
                fiscalContextText={voorWieBlock?.fiscalContext?.text}
                voorWieItems={voorWieItems}
            />

            {/* SECTION D: Solution Workflow (#wat-het-doet) */}
            <Box3SolutionWorkflow
                workflowBadge={workflowBlock?.badge}
                workflowTitle={workflowBlock?.title}
                workflowItems={workflowBlock?.items}
                isEn={isEn}
            />

            {/* SECTION E: Interactive Box 3 Calculator (#calculator) */}
            <Box3Calculator
                isEn={isEn}
                badge={calculatorBlock?.badge}
                title={calculatorBlock?.title}
                subtitle={calculatorBlock?.subtitle}
                featureTitle={calculatorBlock?.featureTitle}
                featureItems={calculatorBlock?.featureItems}
            />

            {/* SECTION F: Microsoft Business Central Positioning */}
            <Box3EcosystemSection
                isEn={isEn}
                badge={ecosystemBlock?.badge}
                title={ecosystemBlock?.title}
                subtitle={ecosystemBlock?.subtitle}
                cardTitle={ecosystemBlock?.cardTitle}
                cardSubtitle={ecosystemBlock?.cardSubtitle}
                cardPoints={ecosystemBlock?.cardPoints}
                trustItems={ecosystemBlock?.trustItems}
            />

            {/* SECTION G: Final Pre-Footer Conversion CTA */}
            <Box3CtaBanner
                ctaBadge={ctaBlock?.badge}
                ctaTitle={ctaBlock?.title}
                ctaSubtitle={ctaBlock?.subtitle}
                ctaButtonText={ctaBlock?.buttonText}
                ctaButtonLink={ctaBlock?.buttonLink}
                isEn={isEn}
                imagePath={ctaBlock?.imagePath}
            />
        </main>
    );
}
