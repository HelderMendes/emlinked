import type { Locale } from '../_lib/data';
import { Nav } from './Nav';
import { Hero } from './Hero';
import { TrustStrip } from './TrustStrip';
import { Modules } from './Modules';
import { PersonaSection } from './PersonaSection';
import { StoriesSection } from './StoriesSection';
import { MapSection } from './MapSection';
import { FeedbackBand } from './FeedbackBand';
import { Footer } from './Footer';

type HeroBlockData = {
    _type: 'hero';
    _key: string;
    label?: string;
    title?: string;
    subtitle?: string;
    ctaLabel?: string;
    ctaLink?: string;
    secondaryCtaLabel?: string;
    secondaryCtaLink?: string;
    cardStats?: { _key: string; label?: string; value?: string }[];
};
type TrustBarBlockData = {
    _type: 'trustBar';
    _key: string;
    items?: { _key: string; text?: string }[];
};
type FeaturesListBlockData = {
    _type: 'featuresList';
    _key: string;
    sectionTag?: string;
    sectionTitle?: string;
    sectionSubtitle?: string;
    features?: {
        _key: string;
        title?: string;
        description?: string;
        ctaLabel?: string;
        ctaLink?: string;
        bullets?: string[];
    }[];
};
type IntegrationsListBlockData = {
    _type: 'integrationsList';
    _key: string;
    sectionTag?: string;
    sectionTitle?: string;
    sectionSubtitle?: string;
    integrations?: {
        _key: string;
        title?: string;
        badge?: string;
        description?: string;
        bullets?: string[];
    }[];
};
type CtaBannerBlockData = {
    _type: 'ctaBanner';
    _key: string;
    tag?: string;
    title?: string;
    subtitle?: string;
    buttonLabel?: string;
    buttonLink?: string;
};
type PageBlock =
    | HeroBlockData
    | TrustBarBlockData
    | FeaturesListBlockData
    | IntegrationsListBlockData
    | CtaBannerBlockData
    | { _type: string; _key: string };

function findBlock<T extends PageBlock['_type']>(
    blocks: PageBlock[],
    type: T,
): Extract<PageBlock, { _type: T }> | undefined {
    return blocks.find((b): b is Extract<PageBlock, { _type: T }> => b._type === type);
}

export function Version01Page({
    locale,
    pageData,
}: {
    locale: Locale;
    pageData: { pageBlocks?: PageBlock[] } | null;
}) {
    const blocks = pageData?.pageBlocks || [];

    const heroBlock = findBlock(blocks, 'hero');
    const trustBarBlock = findBlock(blocks, 'trustBar');
    const featuresBlock = findBlock(blocks, 'featuresList');

    return (
        <div className='flex flex-col min-h-screen bg-stone-bg'>
            <Nav locale={locale} />
            <Hero locale={locale} block={heroBlock} />
            <TrustStrip locale={locale} items={trustBarBlock?.items} />
            <Modules
                locale={locale}
                sectionTag={featuresBlock?.sectionTag}
                sectionTitle={featuresBlock?.sectionTitle}
                sectionSubtitle={featuresBlock?.sectionSubtitle}
                features={featuresBlock?.features}
            />
            <PersonaSection locale={locale} />
            <StoriesSection locale={locale} />
            <MapSection locale={locale} />
            <FeedbackBand locale={locale} />
            <Footer locale={locale} />
        </div>
    );
}
