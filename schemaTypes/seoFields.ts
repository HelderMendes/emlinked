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
    ],
});
