import { defineField, defineType } from 'sanity';

// Lightweight schema for simple text-only pages (Disclaimer & Privacy
// statement, Algemene voorwaarden, Help & Ondersteuning) — unlike `page`,
// these have no modular pageBlocks, just a title and a plain rich-text body.
export const legalPage = defineType({
    name: 'legalPage',
    title: 'Legal / Simple Text Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'language',
            title: 'Language',
            type: 'string',
            options: {
                list: [
                    { title: 'Nederlands', value: 'nl' },
                    { title: 'English', value: 'en' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
                isUnique: async (slug, context) => {
                    const { document, getClient } = context;
                    if (!document) return true;
                    const client = getClient({ apiVersion: '2023-01-01' });
                    const id = document._id.replace(/^drafts\./, '');
                    const params = {
                        draft: `drafts.${id}`,
                        published: id,
                        slug,
                        language: (document as { language?: string })
                            .language,
                    };
                    const query = `!defined(*[_type == "legalPage" && !(_id in [$draft, $published]) && slug.current == $slug && language == $language][0]._id)`;
                    return await client.fetch(query, params);
                },
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'downloadUrl',
            title: 'Download Link (e.g. /NLdigital-Voorwaarden-2025-NL.pdf)',
            type: 'string',
            description:
                'Optional — shows a download button below the body text, for pages that point to a PDF (e.g. Algemene voorwaarden).',
        }),
        defineField({
            name: 'downloadLabel',
            title: 'Download Button Label',
            type: 'string',
        }),
        defineField({
            name: 'seo',
            title: 'SEO Settings',
            type: 'seoFields',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'language',
        },
        prepare({ title, subtitle }) {
            return {
                title,
                subtitle: subtitle ? subtitle.toUpperCase() : '',
            };
        },
    },
});
