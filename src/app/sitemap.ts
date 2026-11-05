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
    const clean = cleanSlug(slug).replace(/^(?:en\/)?apps\//, '');
    return language === 'en' ? `/en/apps/${clean}` : `/apps/${clean}`;
}

function articlePath(slug: string, language: string): string {
    const clean = cleanSlug(slug).replace(/^(?:en\/)?(?:nieuws|news)\//, '');
    return language === 'en' ? `/en/news/${clean}` : `/nieuws/${clean}`;
}

interface SitemapDoc {
    slug: string | null;
    language: string;
    _updatedAt: string;
    noIndex?: boolean;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [pages, solutionPages, articles, legalPages] = await Promise.all([
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
        client.fetch<SitemapDoc[]>(
            `*[_type == "legalPage" && defined(slug.current)]{
                "slug": slug.current,
                language,
                _updatedAt,
                "noIndex": seo.noIndex
            }`,
        ),
    ]);

    const seen = new Set<string>();
    const entries: MetadataRoute.Sitemap = [];

    const addEntry = (url: string, lastModified: string) => {
        if (seen.has(url)) return;
        seen.add(url);
        entries.push({ url, lastModified });
    };

    for (const doc of pages) {
        if (doc.noIndex || !doc.slug) continue;
        addEntry(
            `${DEFAULT_DOMAIN}${pagePath(doc.slug, doc.language)}`,
            doc._updatedAt,
        );
    }

    for (const doc of solutionPages) {
        if (doc.noIndex || !doc.slug) continue;
        addEntry(
            `${DEFAULT_DOMAIN}${solutionPagePath(doc.slug, doc.language)}`,
            doc._updatedAt,
        );
    }

    for (const doc of articles) {
        if (doc.noIndex || !doc.slug) continue;
        addEntry(
            `${DEFAULT_DOMAIN}${articlePath(doc.slug, doc.language)}`,
            doc._updatedAt,
        );
    }

    for (const doc of legalPages) {
        if (doc.noIndex || !doc.slug) continue;
        addEntry(
            `${DEFAULT_DOMAIN}${pagePath(doc.slug, doc.language)}`,
            doc._updatedAt,
        );
    }

    return entries;
}

