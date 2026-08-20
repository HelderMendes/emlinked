import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { sanityFetch } from '@/lib/sanity';
import { HeroSection } from '@/components/blocks/HeroSection';
import { NewsArticlesSection, NewsArticleItem } from '@/components/nieuws/NewsArticlesSection';
import { buildMetadata, DEFAULT_DOMAIN } from '@/lib/seo';
import { GlowingLink } from '@/components/ui/GlowingButton';

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
    const heroBlock = pageBlocks.find((b: any) => b._type === 'heroBlock' || b._type === 'hero');
    const ctaBlock = pageBlocks.find((b: any) => b._type === 'ctaBlock' || b._type === 'ctaBanner' || b._type === 'cta');

    const heroLabel = heroBlock?.badge || (isEn ? 'KNOWLEDGE BASE & INSIGHTS' : 'KENNISBANK & INZICHTEN');
    const heroTitle = heroBlock?.tagline || (isEn ? 'News, insights, and *property management tips*' : 'Nieuws, inzichten en *vastgoedbeheer tips*');
    const heroSub = heroBlock?.description || (isEn ? 'Stay informed with the latest news on real estate software, Box 3 legislation updates, and Microsoft Dynamics 365 developments.' : 'Blijf op de hoogte van het laatste nieuws rondom vastgoedbeheer software, wetgeving, Box 3-ontwikkelingen en Microsoft Dynamics updates.');

    const ctaTitle = ctaBlock?.title || (isEn ? 'Stay ahead in the real estate market' : 'Blijf voorop lopen in de vastgoedmarkt');
    const ctaSub = ctaBlock?.subtitle || (isEn ? 'Want to discuss software, legislation, or the latest features in Business Central? Connect with our experts directly.' : 'Wil je sparren over software, wetgeving of de nieuwste functies in Business Central? Neem direct contact op met onze experts.');
    const ctaBtn = ctaBlock?.primaryCtaLabel || (isEn ? 'Get in touch' : 'Neem direct contact op');

    // JSON-LD CollectionPage Schema
    const canonicalPageUrl = `${DEFAULT_DOMAIN}${isEn ? '/en/news' : '/nieuws'}`;
    const jsonLdData = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'CollectionPage',
                '@id': `${canonicalPageUrl}#webpage`,
                url: canonicalPageUrl,
                name: isEn ? 'News & Knowledge Base | emlinked' : 'Nieuws & Kennisbank | emlinked',
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
            <section className='px-6 py-20 relative z-10 max-w-7xl mx-auto'>
                <div className='relative rounded-3xl border border-amber/40 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 md:p-14 overflow-hidden text-center max-w-5xl mx-auto shadow-2xl text-white'>
                    <div className='absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber/10 rounded-full blur-[120px] pointer-events-none' />

                    <div className='relative z-10 space-y-6 max-w-3xl mx-auto'>
                        <span className='inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/15 px-4 py-1.5 text-xs font-mono font-bold tracking-wider text-amber uppercase backdrop-blur-md'>
                            <Mail className='w-3.5 h-3.5 text-amber' />
                            {isEn ? 'STAY INFORMED' : 'BLIJF OP DE HOOGTE'}
                        </span>

                        <h2 className='font-display font-bold text-3xl md:text-4xl lg:text-[2.75rem] text-white leading-tight'>
                            {ctaTitle}
                        </h2>

                        <p className='text-slate-300 text-base md:text-lg leading-relaxed font-light'>
                            {ctaSub}
                        </p>

                        <div className='flex flex-col sm:flex-row justify-center items-center gap-4 pt-4'>
                            <GlowingLink
                                href={isEn ? '/en/contact' : '/contact'}
                                className='inline-flex h-14 items-center justify-center rounded-2xl border-0 bg-gradient-to-r from-[#FF9500] via-[#FF5E00] to-[#FF3B00] hover:brightness-110 px-8 text-base font-bold text-white transition-all duration-200 shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98]'
                            >
                                <span className='flex items-center justify-center gap-2 text-white'>
                                    <span>{ctaBtn}</span>
                                    <ArrowRight className='w-5 h-5 text-white' />
                                </span>
                            </GlowingLink>

                            <Link
                                href={isEn ? '/en/apps' : '/apps'}
                                className='inline-flex h-14 items-center justify-center rounded-2xl border border-white/20 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 transition-all text-center shadow-sm hover:scale-[1.02] active:scale-[0.98] duration-200'
                            >
                                {isEn ? 'Explore our solutions →' : 'Bekijk onze oplossingen →'}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
