import React from 'react';
import { Metadata } from 'next';
import { Landmark, Scale, Users } from 'lucide-react';
import { sanityFetch } from '@/lib/sanity';
import { HeroSection } from '@/components/blocks/HeroSection';
import {
    NewsArticlesSection,
    NewsArticleItem,
} from '@/components/nieuws/NewsArticlesSection';
import { buildMetadata, DEFAULT_DOMAIN } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface NieuwsPageProps {
    params: Promise<{ locale: string }>;
}

async function getSanityArticles(locale: string): Promise<NewsArticleItem[]> {
    try {
        const data = await sanityFetch<any[]>({
            query: `*[_type == "article" && language == $locale] | order(publishedAt desc) {
                _id,
                title,
                "slug": slug.current,
                category,
                excerpt,
                readTime,
                publishedAt,
                authorName,
                imagePath,
                mainImage,
                isFeatured
            }`,
            params: { locale },
        });
        return data || [];
    } catch (e) {
        console.error('Failed to fetch articles from Sanity:', e);
        return [];
    }
}

async function getSanityNewsPageData(locale: string) {
    try {
        const pageId = locale === 'en' ? 'page-nieuws-en' : 'page-nieuws-nl';
        return await sanityFetch<any>({
            query: `*[_type == "page" && (_id == $pageId || (slug.current == $slug && language == $locale))][0] {
                _id,
                title,
                "slug": slug.current,
                pageBlocks[] {
                    _key,
                    _type,
                    label,
                    title,
                    subtitle,
                    ctaLabel,
                    ctaLink,
                    primaryCtaLabel,
                    primaryCtaUrl,
                    secondaryCtaLabel,
                    secondaryCtaUrl,
                    floatingLabels[] { value, label },
                    imagePath,
                    image { asset-> { url } }
                },
                featuredArticle->{
                    _id,
                    title,
                    "slug": slug.current,
                    category,
                    excerpt,
                    readTime,
                    publishedAt,
                    authorName,
                    imagePath,
                    mainImage
                },
                seo {
                    seoTitle,
                    seoDescription,
                    canonical,
                    noIndex,
                    structuredData
                }
            }`,
            params: {
                pageId,
                slug: locale === 'en' ? 'news' : 'nieuws',
                locale,
            },
        });
    } catch (e) {
        console.error('Failed to fetch news page data from Sanity:', e);
        return null;
    }
}

export async function generateMetadata({
    params,
}: NieuwsPageProps): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getSanityNewsPageData(locale);

    const fallbackTitle = isEn
        ? 'Real Estate News & Insights'
        : 'Vastgoed Nieuws & Inzichten';
    const fallbackDescription = isEn
        ? 'Stay informed on real estate management, investing, and property ownership: software news, Box 3 legislation updates, and Microsoft Dynamics 365 developments — for managers, owners, and investors.'
        : 'Nieuws en inzichten over vastgoedbeheer, beleggen en eigendom: software, wetgeving, Box 3-ontwikkelingen en Microsoft Dynamics updates — voor vastgoedbeheerders, eigenaren en beleggers.';
    const canonicalUrl = `${DEFAULT_DOMAIN}${isEn ? '/en/news' : '/nieuws'}`;

    return buildMetadata({
        seo: pageData?.seo,
        fallbackTitle,
        fallbackDescription,
        canonicalUrl,
        locale,
    });
}

export default async function NieuwsPage({ params }: NieuwsPageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getSanityNewsPageData(locale);
    const articles = await getSanityArticles(locale);

    const pageBlocks = pageData?.pageBlocks || [];
    const heroBlock = pageBlocks.find(
        (b: any) => b._type === 'heroBlock' || b._type === 'hero',
    );

    const heroLabel =
        heroBlock?.label ||
        (isEn
            ? 'PROPERTY MANAGEMENT KNOWLEDGE BASE'
            : 'VASTGOEDBEHEER KENNISBANK');
    const heroTitle =
        heroBlock?.title ||
        (isEn
            ? 'News, insights, and *property management tips*'
            : 'Nieuws, inzichten en *vastgoedbeheer tips*');
    const heroSub =
        heroBlock?.subtitle ||
        (isEn
            ? 'Stay informed on real estate management, investing, and property ownership: software news, Box 3 legislation updates, and Microsoft Dynamics 365 developments — for managers, owners, and investors.'
            : 'Nieuws en inzichten over vastgoedbeheer, beleggen en eigendom: software, wetgeving, Box 3-ontwikkelingen en Microsoft Dynamics updates — voor vastgoedbeheerders, eigenaren en beleggers.');
    const heroCtaLabel =
        heroBlock?.ctaLabel || (isEn ? 'Book a demo' : 'Plan een demo');
    const heroCtaLink = heroBlock?.ctaLink || '#demo';

    const floatingLabelPresets = [
        {
            position: 'top-left' as const,
            iconVariant: 'teal' as const,
            icon: <Landmark className='w-3.5 h-3.5' />,
            fallbackValue: isEn ? '€15 billion+' : '€15 miljard+',
            fallbackLabel: isEn
                ? 'Real estate under management'
                : 'Vastgoed onder beheer',
        },
        {
            position: 'top-right' as const,
            iconVariant: 'emerald' as const,
            icon: <Scale className='w-3.5 h-3.5' />,
            fallbackValue: isEn ? 'Box 3 & Legislation' : 'Box 3 & Wetgeving',
            fallbackLabel: isEn ? 'Latest updates' : 'Actuele updates',
        },
        {
            position: 'bottom-right' as const,
            iconVariant: 'navy' as const,
            icon: <Users className='w-3.5 h-3.5' />,
            fallbackValue: isEn
                ? 'Managers & Investors'
                : 'Beheerders & Beleggers',
            fallbackLabel: isEn
                ? 'For the whole real estate chain'
                : 'Voor de hele vastgoedketen',
        },
    ];
    const heroFloatingLabels = floatingLabelPresets.map((preset, idx) => ({
        icon: preset.icon,
        position: preset.position,
        iconVariant: preset.iconVariant,
        value: heroBlock?.floatingLabels?.[idx]?.value || preset.fallbackValue,
        label: heroBlock?.floatingLabels?.[idx]?.label || preset.fallbackLabel,
    }));

    // JSON-LD CollectionPage Schema
    const canonicalPageUrl = `${DEFAULT_DOMAIN}${isEn ? '/en/news' : '/nieuws'}`;
    const jsonLdData = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'CollectionPage',
                '@id': `${canonicalPageUrl}#webpage`,
                url: canonicalPageUrl,
                name: isEn
                    ? 'Real Estate News & Insights | emlinked'
                    : 'Vastgoed Nieuws & Inzichten | emlinked',
                description: heroSub,
                inLanguage: isEn ? 'en-US' : 'nl-NL',
                isPartOf: {
                    '@type': 'WebSite',
                    '@id': `${DEFAULT_DOMAIN}/#website`,
                },
            },
            {
                '@type': 'ItemList',
                '@id': `${canonicalPageUrl}#itemlist`,
                itemListElement: articles.map((article, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    url: `${DEFAULT_DOMAIN}${isEn ? '/en/news' : '/nieuws'}/${article.slug}`,
                    name: article.title,
                })),
            },
        ],
    });

    return (
        <main className='flex-1 bg-background text-foreground relative overflow-hidden'>
            {/* Inject JSON-LD */}
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: jsonLdData }}
            />

            {/* ── HERO SECTION (DARK TEXTURE NAVY) ── */}
            <div className='bg-texture-navy text-white relative'>
                <HeroSection
                    label={heroLabel}
                    title={heroTitle}
                    subtitle={heroSub}
                    ctaLabel={heroCtaLabel}
                    ctaLink={heroCtaLink}
                    image={heroBlock?.image}
                    imagePath={heroBlock?.imagePath}
                    locale={locale}
                    showProof={false}
                    floatingLabels={heroFloatingLabels}
                />
            </div>

            {/* ── ARTICLES SECTION (LIGHT / INTERACTIVE FILTER) ── */}
            <NewsArticlesSection
                articles={articles}
                pinnedArticle={pageData?.featuredArticle}
                locale={locale}
            />
        </main>
    );
}
