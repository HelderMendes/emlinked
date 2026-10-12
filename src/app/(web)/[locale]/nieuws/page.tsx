import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { sanityFetch } from '@/lib/sanity';
import { HeroSection } from '@/components/blocks/HeroSection';
import {
    NewsArticlesSection,
    NewsArticleItem,
} from '@/components/nieuws/NewsArticlesSection';
import { buildMetadata, DEFAULT_DOMAIN } from '@/lib/seo';
import { Badge } from '@/components/ui/Badge';
import { OutlineLinkButton } from '@/components/ui/OutlineLinkButton';

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
        ? 'News & Knowledge Base Real Estate Management'
        : 'Nieuws & Kennisbank Vastgoedbeheer';
    const fallbackDescription = isEn
        ? 'Stay informed with the latest news on real estate software, Box 3 legislation updates, and Microsoft Dynamics 365 developments.'
        : 'Blijf op de hoogte van het laatste nieuws rondom vastgoedbeheer software, wetgeving, Box 3-ontwikkelingen en Microsoft Dynamics updates.';
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
    const ctaBlock = pageBlocks.find(
        (b: any) =>
            b._type === 'ctaBlock' ||
            b._type === 'ctaBanner' ||
            b._type === 'cta',
    );

    const heroLabel =
        heroBlock?.badge ||
        (isEn ? 'KNOWLEDGE BASE & INSIGHTS' : 'KENNISBANK & INZICHTEN');
    const heroTitle =
        heroBlock?.tagline ||
        (isEn
            ? 'News, insights, and *property management tips*'
            : 'Nieuws, inzichten en *vastgoedbeheer tips*');
    const heroSub =
        heroBlock?.description ||
        (isEn
            ? 'Stay informed with the latest news on real estate software, Box 3 legislation updates, and Microsoft Dynamics 365 developments.'
            : 'Blijf op de hoogte van het laatste nieuws rondom vastgoedbeheer software, wetgeving, Box 3-ontwikkelingen en Microsoft Dynamics updates.');

    const ctaTitle =
        ctaBlock?.title ||
        (isEn
            ? 'Stay ahead in the real estate market'
            : 'Blijf voorop lopen in de vastgoedmarkt');
    const ctaSub =
        ctaBlock?.subtitle ||
        (isEn
            ? 'Want to discuss software, legislation, or the latest features in Business Central? Connect with our experts directly.'
            : 'Wil je sparren over software, wetgeving of de nieuwste functies in Business Central? Neem direct contact op met onze experts.');
    const ctaBtn =
        ctaBlock?.primaryCtaLabel ||
        (isEn ? 'Get in touch' : 'Neem direct contact op');

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
                    ? 'News & Knowledge Base | emlinked'
                    : 'Nieuws & Kennisbank | emlinked',
                description: heroSub,
                inLanguage: isEn ? 'en-US' : 'nl-NL',
                isPartOf: {
                    '@type': 'WebSite',
                    '@id': `${DEFAULT_DOMAIN}/#website`,
                },
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
            <div className='bg-texture-navy text-white relative border-b border-white/10'>
                <HeroSection
                    label={heroLabel}
                    title={heroTitle}
                    subtitle={heroSub}
                    locale={locale}
                    showProof={false}
                />
            </div>

            {/* ── ARTICLES SECTION (LIGHT / INTERACTIVE FILTER) ── */}
            <NewsArticlesSection
                articles={articles}
                pinnedArticle={pageData?.featuredArticle}
                locale={locale}
            />

            {/* ── CTA CONVERSION BANNER ── */}
            <section className='lg:px-14 p-4 py-24 bg-linear-to-br from-teal-ultra via-stone-bg to-teal-pale/60 relative overflow-hidden z-10'>
                <div className='border border-teal/30 rounded-3xl bg-white/50 hover:shadow-[0_25px_60px_rgba(245,158,11,0.15)] transition-all duration-500 relative overflow-hidden group shadow-lg backdrop-blur-xl lg:px-8 max-w-5xl mx-auto'>
                    <div className='text-navy-900 p-8 md:py-16 md:px-10 relative overflow-hidden text-center'>
                        <div className='relative z-10 space-y-5 max-w-3xl mx-auto'>
                            <Badge color='teal' uppercase className='mx-auto'>
                                <Mail className='w-3.5 h-3.5 text-teal' />
                                {isEn ? 'STAY INFORMED' : 'BLIJF OP DE HOOGTE'}
                            </Badge>

                            <h2 className='font-display font-bold text-3xl md:text-4xl lg:text-[2.75rem] leading-tight bg-linear-to-br from-[#f12711] to-[#f5af19] bg-clip-text text-transparent'>
                                {ctaTitle}
                            </h2>

                            <p className='text-navy-700 text-base md:text-lg leading-relaxed font-light'>
                                {ctaSub}
                            </p>

                            <div className='flex flex-col sm:flex-row justify-center items-center gap-4 pt-2'>
                                <Link
                                    href={isEn ? '/en/contact' : '/contact'}
                                    className='inline-flex h-11 items-center gap-1.5 justify-center rounded-lg bg-navy-900 hover:btn-gradient px-6 text-sm font-semibold text-white transition-colors'
                                >
                                    <span>{ctaBtn}</span>
                                    <ArrowRight className='h-4 w-4 text-white' />
                                </Link>

                                <OutlineLinkButton
                                    href={isEn ? '/en/apps' : '/apps'}
                                    color='navy'
                                >
                                    {isEn
                                        ? 'Explore our solutions'
                                        : 'Bekijk onze oplossingen'}
                                </OutlineLinkButton>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
