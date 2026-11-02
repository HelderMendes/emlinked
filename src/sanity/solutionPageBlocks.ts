import type { SanityImageLike } from './image';

export interface FloatingLabelInput {
    _key?: string;
    value?: string;
    label?: string;
}

export interface HeroBlockData {
    _type: 'heroBlock';
    _key?: string;
    badge?: string;
    tagline?: string;
    description?: string;
    primaryCtaLabel?: string;
    primaryCtaUrl?: string;
    secondaryCtaLabel?: string;
    secondaryCtaUrl?: string;
    proofText?: string;
    floatingLabels?: FloatingLabelInput[];
    heroImagePath?: string;
    heroImage?: SanityImageLike;
    // Legacy alias field names some module fallback chains still check
    // defensively (real schema only ever populates the names above).
    ctaLabel?: string;
    ctaLink?: string;
    secondaryCtaLink?: string;
    image?: SanityImageLike;
    imagePath?: string;
}

export interface ComparisonItemInput {
    _key?: string;
    title?: string;
    desc?: string;
}

export interface ComparisonBlockData {
    _type: 'comparisonBlock';
    _key?: string;
    badge?: string;
    title?: string;
    desc?: string;
    leftTitle?: string;
    leftItems?: ComparisonItemInput[];
    rightTitle?: string;
    rightItems?: ComparisonItemInput[];
}

export interface FeatureTabInput {
    _key?: string;
    tabId?: string;
    tabTitle?: string;
    title?: string;
    text?: string;
    bullets?: string[];
    imagePath?: string;
    image?: SanityImageLike;
}

export interface FeatureTabsBlockData {
    _type: 'featureTabsBlock';
    _key?: string;
    badge?: string;
    title?: string;
    desc?: string;
    tabs?: FeatureTabInput[];
}

export interface StatItemInput {
    _key?: string;
    stat?: string;
    label?: string;
}

export interface StatsBlockData {
    _type: 'statsBlock';
    _key?: string;
    stats?: StatItemInput[];
}

export interface WorkflowStepInput {
    _key?: string;
    step?: string;
    title?: string;
    desc?: string;
}

export interface WorkflowBlockData {
    _type: 'workflowBlock';
    _key?: string;
    title?: string;
    steps?: WorkflowStepInput[];
}

export interface FaqItemInput {
    _key?: string;
    q?: string;
    a?: string;
}

export interface FaqBlockData {
    _type: 'faqBlock';
    _key?: string;
    title?: string;
    items?: FaqItemInput[];
}

export interface ArchitectureBlockData {
    _type: 'architectureBlock';
    _key?: string;
    tag?: string;
    title?: string;
    desc?: string;
    bullets?: string[];
    imagePath?: string;
    image?: SanityImageLike;
}

export interface CtaBlockData {
    _type: 'ctaBlock';
    _key?: string;
    tag?: string;
    title?: string;
    desc?: string;
    primaryButtonText?: string;
    secondaryButtonText?: string;
    imagePath?: string;
    image?: SanityImageLike;
}

export type SolutionPageBlock =
    | HeroBlockData
    | ComparisonBlockData
    | FeatureTabsBlockData
    | StatsBlockData
    | WorkflowBlockData
    | FaqBlockData
    | CtaBlockData
    | ArchitectureBlockData;

export function isHeroBlock(b: SolutionPageBlock): b is HeroBlockData {
    return b._type === 'heroBlock';
}

export function isComparisonBlock(
    b: SolutionPageBlock,
): b is ComparisonBlockData {
    return b._type === 'comparisonBlock';
}

export function isFeatureTabsBlock(
    b: SolutionPageBlock,
): b is FeatureTabsBlockData {
    return b._type === 'featureTabsBlock';
}

export function isArchitectureBlock(
    b: SolutionPageBlock,
): b is ArchitectureBlockData {
    return b._type === 'architectureBlock';
}

export function isCtaBlock(b: SolutionPageBlock): b is CtaBlockData {
    return b._type === 'ctaBlock';
}

// Legacy/unused-in-schema fallback shapes still read defensively by the
// solutionPage modules (doc?.comparisonSection, doc?.features, etc.) —
// the current solutionPage schema never populates these top-level fields
// (content lives in pageBlocks instead), but the optional chaining means
// they're harmless no-ops at runtime. Typed here to match actual usage
// rather than silently widening back to `any`.
export interface SolutionPageDoc {
    _id?: string;
    title?: string;
    language?: string;
    slug?: { current?: string } | string;
    pageBlocks?: SolutionPageBlock[];
    badge?: string;
    tagline?: string;
    description?: string;
    proofText?: string;
    image?: SanityImageLike;
    imagePath?: string;
    heroImage?: SanityImageLike;
    heroImagePath?: string;
    comparisonSection?: {
        badge?: string;
        title?: string;
        desc?: string;
        leftTitle?: string;
        leftItems?: ComparisonItemInput[];
        rightTitle?: string;
        rightItems?: ComparisonItemInput[];
    };
    benefits?: ComparisonItemInput[];
    featuresSectionDesc?: string;
    features?: Array<{ title?: string; text?: string }>;
    cta?: {
        tag?: string;
        title?: string;
        desc?: string;
        primary?: string;
    };
    seo?: {
        structuredData?: string | Record<string, unknown>;
    };
}
