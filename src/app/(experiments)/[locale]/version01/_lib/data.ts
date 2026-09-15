import { client } from '@/sanity/client';

export type Locale = 'nl' | 'en';

// Same GROQ shape as the production homepage (src/app/(web)/[locale]/page.tsx),
// reused here so version01 renders the real Sanity content through a new layout.
export async function getHomepageData(locale: Locale) {
    try {
        const pageId = locale === 'en' ? 'page-home-en' : 'page-home-nl';
        return await client.fetch(
            `*[_type == "page" && (_id == $pageId || slug.current == "home" || slug.current == "/" || slug.current == "/en/" || slug.current == "/en") && language == $locale][0] {
                title,
                pageBlocks[] {
                    _type,
                    _key,
                    label,
                    title,
                    subtitle,
                    ctaLabel,
                    ctaLink,
                    secondaryCtaLabel,
                    secondaryCtaLink,
                    showProof,
                    proofText,
                    cardTitle,
                    cardStats[] {
                        _key,
                        label,
                        value,
                        badgeText,
                        badgeType
                    },
                    items[] {
                        _key,
                        text,
                        icon,
                        link
                    },
                    sectionTag,
                    sectionTitle,
                    sectionSubtitle,
                    features[] {
                        _key,
                        title,
                        description,
                        icon,
                        bullets,
                        ctaLabel,
                        ctaLink
                    },
                    tag,
                    buttonLabel,
                    buttonLink,
                    integrations[] {
                        _key,
                        title,
                        badge,
                        description,
                        bullets,
                        link
                    }
                }
            }`,
            { pageId, locale },
            { cache: 'no-store' },
        );
    } catch (e) {
        console.error('[version01] Error fetching homepage data from Sanity:', e);
        return null;
    }
}
