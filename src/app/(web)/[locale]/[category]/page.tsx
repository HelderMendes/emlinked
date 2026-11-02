import React from 'react';
import { notFound } from 'next/navigation';
import { sanityFetch } from '@/lib/sanity';
import { Metadata } from 'next';
import { PortableText, PortableTextComponents } from 'next-sanity';
import { PageBlockRenderer } from '@/components/blocks/PageBlockRenderer';

export const revalidate = 60;

const legalPageComponents: PortableTextComponents = {
    block: {
        h2: ({ children }) => (
            <h2 className='font-display text-2xl md:text-3xl font-bold text-navy-900 pt-8 pb-2 leading-tight'>
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 className='font-display text-xl font-bold text-navy-900 pt-5 pb-1 leading-tight'>
                {children}
            </h3>
        ),
        normal: ({ children }) => (
            <p className='text-base text-navy-700 leading-relaxed my-3'>
                {children}
            </p>
        ),
    },
};

interface LegalPageData {
    title: string;
    body?: unknown;
    downloadUrl?: string;
    downloadLabel?: string;
    seo?: {
        seoTitle?: string;
        seoDescription?: string;
        noIndex?: boolean;
    };
}

async function getLegalPageData(
    slug: string,
    locale: string,
): Promise<LegalPageData | null> {
    try {
        return await sanityFetch<LegalPageData | null>({
            query: `*[_type == "legalPage" && (slug.current == $slug || slug.current == $slashSlug) && language == $locale][0] {
                title,
                body,
                downloadUrl,
                downloadLabel,
                seo { seoTitle, seoDescription, noIndex }
            }`,
            params: { slug, slashSlug: `/${slug}`, locale },
        });
    } catch (e) {
        console.error('Error fetching legalPage data from Sanity:', e);
        return null;
    }
}

interface SlugPageProps {
    params: Promise<{ locale: string; category: string }>;
}

// Generic catch-all for top-level `page` documents that don't have their
// own dedicated route folder (apps, over-ons, contact, ... still take
// priority — Next.js matches a static segment before falling back here).
// Lets any page duplicated in Studio with a new slug render immediately,
// without needing a hand-made route per duplicate.
//
// Lives in [category]/page.tsx (not a separate [slug]/page.tsx) because
// Next.js requires every dynamic segment at the same tree position to
// share one param name — this position is already named "category" by
// the sibling [category]/[slug]/page.tsx two-segment route.
async function getSlugPageData(slug: string, locale: string) {
    try {
        return await sanityFetch<any>({
            query: `*[_type == "page" && (slug.current == $slug || slug.current == $slashSlug) && language == $locale][0] {
                title,
                pageBlocks[] {
                    ...,
                    _type,
                    _key,
                    image { asset-> { _id, url }, alt },
                    heroImage { asset-> { _id, url }, alt },
                    photo { asset-> { _id, url }, alt },
                    logo { asset-> { _id, url }, alt },
                    items[] {
                        ...,
                        image { asset-> { _id, url }, alt },
                        logo { asset-> { _id, url }, alt },
                        photo { asset-> { _id, url }, alt }
                    },
                    features[] {
                        ...,
                        image { asset-> { _id, url }, alt },
                        iconImage { asset-> { _id, url }, alt }
                    },
                    sectionImage { asset-> { _id, url }, alt },
                    integrations[] {
                        ...,
                        image { asset-> { _id, url }, alt }
                    },
                    diagramImage { asset-> { _id, url }, alt },
                    testimonials[] {
                        ...,
                        avatar { asset-> { _id, url }, alt }
                    },
                    partners[] {
                        ...,
                        logo { asset-> { _id, url }, alt }
                    },
                    members[] {
                        ...,
                        image { asset-> { _id, url }, alt },
                        photo { asset-> { _id, url }, alt }
                    }
                },
                seo {
                    seoTitle,
                    seoDescription,
                    noIndex,
                    structuredData
                }
            }`,
            params: { slug, slashSlug: `/${slug}`, locale },
        });
    } catch (e) {
        console.error('Error fetching page data from Sanity:', e);
        return null;
    }
}

export async function generateMetadata({
    params,
}: SlugPageProps): Promise<Metadata> {
    const { locale, category } = await params;
    const pageData = await getSlugPageData(category, locale);
    if (pageData) {
        return {
            title: pageData.seo?.seoTitle || pageData.title,
            description: pageData.seo?.seoDescription,
            robots: pageData.seo?.noIndex
                ? 'noindex, nofollow'
                : 'index, follow',
        };
    }

    const legalData = await getLegalPageData(category, locale);
    if (!legalData) return {};

    return {
        title: legalData.seo?.seoTitle || legalData.title,
        description: legalData.seo?.seoDescription,
        robots: legalData.seo?.noIndex ? 'noindex, nofollow' : 'index, follow',
    };
}

export default async function SlugPage({ params }: SlugPageProps) {
    const { locale, category } = await params;
    const pageData = await getSlugPageData(category, locale);

    if (pageData) {
        const blocks = pageData.pageBlocks || [];
        const structuredData = pageData.seo?.structuredData;

        return (
            <div className='flex flex-col min-h-screen'>
                {structuredData && (
                    <script
                        type='application/ld+json'
                        dangerouslySetInnerHTML={{ __html: structuredData }}
                    />
                )}
                {blocks.map((block: any) => (
                    <PageBlockRenderer
                        key={block._key}
                        block={block}
                        locale={locale}
                        isHomepage={true}
                    />
                ))}
            </div>
        );
    }

    const legalData = await getLegalPageData(category, locale);
    if (!legalData) {
        notFound();
    }

    return (
        <div className='flex flex-col px-6 py-20'>
            <div className='max-w-3xl mx-auto w-full'>
                <h1 className='font-display text-3xl md:text-4xl font-bold text-navy-900 tracking-tight'>
                    {legalData.title}
                </h1>
                <div className='mt-4'>
                    {legalData.body ? (
                        <PortableText
                            value={legalData.body as any}
                            components={legalPageComponents}
                        />
                    ) : null}
                </div>
                {legalData.downloadUrl && (
                    <a
                        href={legalData.downloadUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center gap-2 mt-6 h-11 px-6 rounded-lg bg-navy-900 hover:btn-gradient text-sm font-semibold text-white transition-colors'
                    >
                        {legalData.downloadLabel || 'Download'}
                    </a>
                )}
            </div>
        </div>
    );
}
