import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

/**
 * Read-only client for use in Next.js Server Components and Route Handlers.
 * Reads from the CDN by default. Add SANITY_API_TOKEN to .env.local for
 * authenticated / draft access (use `useCdn: false` in that case).
 */
export const sanityClient = createClient({
    projectId,
    dataset,
    apiVersion: '2024-07-01', // keep pinned; update intentionally
    useCdn: false, // false = bypass CDN for authenticated / draft reads
    token: process.env.SANITY_API_TOKEN,
});

/**
 * Convenience wrapper for GROQ queries in Server Components.
 *
 * Usage:
 * ```ts
 * const pages = await sanityFetch<SanityPage[]>({
 *   query: `*[_type == "page" && language == $locale]`,
 *   params: { locale: 'nl' },
 * })
 * ```
 */
export async function sanityFetch<T>({
    query,
    params = {},
}: {
    query: string;
    params?: Record<string, unknown>;
}): Promise<T> {
    return sanityClient.fetch<T>(query, params);
}
