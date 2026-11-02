import { MetadataRoute } from 'next';
import { client } from '@/sanity/client';
import { DEFAULT_DOMAIN } from '@/lib/seo';

// Strips leading/trailing slashes so every doc's stored slug (which varies
// -- "/apps", "apps", "/pricing", "" for home, etc.) normalizes the same way
// before a locale prefix is added back.
function cleanSlug(slug: string | null | undefined): string {
    return (slug || '').replace(/^\/+|\/+$/g, '');
}

function pagePath(slug: string, language: string): string {
    const clean = cleanSlug(slug);
    if (language === 'en') return clean ? `/en/${clean}` : '/en';
    return clean ? `/${clean}` : '/';
}

function solutionPagePath(slug: string, language: string): string {
    const clean = cleanSlug(slug);
    return language === 'en' ? `/en/apps/${clean}` : `/apps/${clean}`;
}

function articlePath(slug: string, language: string): string {
    const clean = cleanSlug(slug);
    return language === 'en' ? `/en/news/${clean}` : `/nieuws/${clean}`;
}

interface SitemapDoc {
    slug: string | null;
    language: string;
    _updatedAt: string;
    noIndex?: boolean;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [pages, solutionPages, articles] = await Promise.all([
        client.fetch<SitemapDoc[]>(
            `*[_type == "page" && defined(slug.current)]{
                "slug": slug.current,
                language,
                _updatedAt,
                "noIndex": seo.noIndex
            }`,
        ),
        client.fetch<SitemapDoc[]>(
            `*[_type == "solutionPage" && defined(slug.current)]{
                "slug": slug.current,
                language,
                _updatedAt,
                "noIndex": seo.noIndex
            }`,
        ),
        client.fetch<SitemapDoc[]>(
            `*[_type == "article" && defined(slug.current)]{
                "slug": slug.current,
                language,
                _updatedAt,
                "noIndex": seo.noIndex
            }`,
        ),
    ]);

    const entries: MetadataRoute.Sitemap = [];

    for (const doc of pages) {
        if (doc.noIndex || !doc.slug) continue;
        entries.push({
            url: `${DEFAULT_DOMAIN}${pagePath(doc.slug, doc.language)}`,
            lastModified: doc._updatedAt,
        });
    }

    for (const doc of solutionPages) {
        if (doc.noIndex || !doc.slug) continue;
        entries.push({
            url: `${DEFAULT_DOMAIN}${solutionPagePath(doc.slug, doc.language)}`,
            lastModified: doc._updatedAt,
        });
    }

    for (const doc of articles) {
        if (doc.noIndex || !doc.slug) continue;
        entries.push({
            url: `${DEFAULT_DOMAIN}${articlePath(doc.slug, doc.language)}`,
            lastModified: doc._updatedAt,
        });
    }

    return entries;
}
