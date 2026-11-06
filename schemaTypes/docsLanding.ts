import { defineField, defineType } from 'sanity';

export const docsLanding = defineType({
    name: 'docsLanding',
    title: 'Docs Landing Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Heading',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'intro',
            title: 'Intro Paragraph',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'body',
            title: 'Body Paragraph',
            type: 'text',
            rows: 4,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'msLinkPrefix',
            title: 'Microsoft Link Sentence (text before the link)',
            type: 'text',
            rows: 2,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'msLinkLabel',
            title: 'Microsoft Link Label',
            type: 'string',
            initialValue: 'Microsoft Dynamics 365',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'msLinkHref',
            title: 'Microsoft Link URL',
            type: 'url',
            validation: (Rule) =>
                Rule.required().uri({ scheme: ['http', 'https'] }),
        }),
    ],
    preview: {
        select: { title: 'title', subtitle: 'subtitle' },
    },
});
