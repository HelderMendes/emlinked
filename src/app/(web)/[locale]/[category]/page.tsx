import React from 'react';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/client';
import { Metadata } from 'next';
import { PageBlockRenderer } from '@/components/blocks/PageBlockRenderer';

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
        return await client.fetch(
            `*[_type == "page" && (slug.current == $slug || slug.current == $slashSlug) && language == $locale][0] {
                title,
                pageBlocks[] {
                    ...,
                    _type,
                    _key,
                    image { asset-> { _id, url } },
                    heroImage { asset-> { _id, url } },
                    photo { asset-> { _id, url } },
                    logo { asset-> { _id, url } },
                    items[] {
                        ...,
                        image { asset-> { _id, url } },
                        logo { asset-> { _id, url } },
                        photo { asset-> { _id, url } }
                    },
                    features[] {
                        ...,
                        image { asset-> { _id, url } },
                        iconImage { asset-> { _id, url } }
                    },
                    sectionImage { asset-> { _id, url } },
                    integrations[] {
                        ...,
                        image { asset-> { _id, url } }
                    },
                    diagramImage { asset-> { _id, url } },
                    testimonials[] {
                        ...,
                        avatar { asset-> { _id, url } }
                    },
                    partners[] {
                        ...,
                        logo { asset-> { _id, url } }
                    },
                    members[] {
                        ...,
                        image { asset-> { _id, url } },
                        photo { asset-> { _id, url } }
                    }
                },
                seo {
                    seoTitle,
                    seoDescription,
                    noIndex,
                    structuredData
                }
            }`,
            { slug, slashSlug: `/${slug}`, locale },
            { cache: 'no-store' },
        );
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
    if (!pageData) return {};

    return {
        title: pageData.seo?.seoTitle || pageData.title,
        description: pageData.seo?.seoDescription,
        robots: pageData.seo?.noIndex ? 'noindex, nofollow' : 'index, follow',
    };
}

export default async function SlugPage({ params }: SlugPageProps) {
    const { locale, category } = await params;
    const pageData = await getSlugPageData(category, locale);

    if (!pageData) {
        notFound();
    }

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
