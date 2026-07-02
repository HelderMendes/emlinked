import { defineField, defineType } from 'sanity';

export const seoFields = defineType({
    name: 'seoFields',
    title: 'SEO Fields',
    type: 'object',
    fields: [
        defineField({
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string',
            description:
                'The meta title of the page. Recommended under 60 characters.',
            validation: (Rule) =>
                Rule.max(60).warning(
                    'Titles longer than 60 characters might get truncated by search engines.',
                ),
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            rows: 3,
            description:
                'The meta description of the page. Recommended under 160 characters.',
            validation: (Rule) =>
                Rule.max(160).warning(
                    'Descriptions longer than 160 characters might get truncated by search engines.',
                ),
        }),
        defineField({
            name: 'canonical',
            title: 'Canonical URL',
            type: 'url',
            description:
                'Override the canonical URL. Leave empty to fallback to the default page URL.',
        }),
        defineField({
            name: 'ogImage',
            title: 'Open Graph Image',
            type: 'image',
            description:
                'Social sharing image (recommended size: 1200x630 px).',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'noIndex',
            title: 'No-Index',
            type: 'boolean',
            description: 'Instruct search engines NOT to index this page.',
            initialValue: false,
        }),
        defineField({
            name: 'structuredData',
            title: 'Custom Structured Data (JSON-LD)',
            type: 'text',
            rows: 5,
            description: 'Optional raw JSON-LD markup to embed on this page.',
            validation: (Rule) =>
                Rule.custom((value) => {
                    if (!value) return true;
                    try {
                        JSON.parse(value);
                        return true;
                    } catch (e) {
                        return 'Invalid JSON format. Please ensure the value is valid JSON.';
                    }
                }),
        }),
    ],
});
