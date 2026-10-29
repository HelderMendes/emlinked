import { defineField, defineType } from 'sanity';

export const doc = defineType({
    name: 'doc',
    title: 'Documentation',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
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
                        language: (document as { language?: string }).language,
                    };
                    const query = `!defined(*[_type == "doc" && !(_id in [$draft, $published]) && slug.current == $slug && language == $language][0]._id)`;
                    return await client.fetch(query, params);
                },
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'docCategory' }],
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
            initialValue: 'nl',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'order',
            title: 'Navigation Order',
            type: 'number',
            description: 'Used to sort pages inside the sidebar category list.',
            validation: (Rule) => Rule.min(0),
        }),
        defineField({
            name: 'pdfFile',
            title: 'PDF Attachment',
            type: 'file',
            options: { accept: '.pdf' },
            description: 'Use for release notes or any manual page distributed as a PDF.',
        }),
        defineField({
            name: 'body',
            title: 'Body Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    marks: {
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'External Link',
                                fields: [
                                    {
                                        name: 'href',
                                        type: 'url',
                                        title: 'URL',
                                        validation: (Rule) =>
                                            Rule.uri({
                                                scheme: [
                                                    'http',
                                                    'https',
                                                    'mailto',
                                                    'tel',
                                                ],
                                                allowRelative: true,
                                            }).required(),
                                    },
                                    {
                                        name: 'blank',
                                        type: 'boolean',
                                        title: 'Open in new tab',
                                        initialValue: true,
                                    },
                                ],
                            },
                            {
                                name: 'internalLink',
                                type: 'object',
                                title: 'Internal Link',
                                fields: [
                                    {
                                        name: 'reference',
                                        type: 'reference',
                                        title: 'Reference',
                                        to: [
                                            { type: 'page' },
                                            { type: 'article' },
                                            { type: 'doc' },
                                            { type: 'solutionPage' },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative Text',
                            description: 'Important for SEO and accessibility.',
                            validation: (Rule) => Rule.required(),
                        },
                    ],
                },
                {
                    type: 'object',
                    name: 'imageGrid',
                    title: 'Image Grid (2 columns)',
                    fields: [
                        defineField({
                            name: 'items',
                            title: 'Images',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    name: 'item',
                                    fields: [
                                        defineField({
                                            name: 'image',
                                            title: 'Image',
                                            type: 'image',
                                            options: { hotspot: true },
                                            validation: (Rule) =>
                                                Rule.required(),
                                        }),
                                        defineField({
                                            name: 'caption',
                                            title: 'Caption',
                                            type: 'string',
                                        }),
                                    ],
                                    preview: {
                                        select: {
                                            media: 'image',
                                            title: 'caption',
                                        },
                                    },
                                },
                            ],
                            validation: (Rule) => Rule.min(2).max(4),
                        }),
                    ],
                    preview: {
                        select: { items: 'items' },
                        prepare({ items }) {
                            return {
                                title: `Image Grid (${items?.length || 0} images)`,
                            };
                        },
                    },
                },
                {
                    type: 'object',
                    name: 'codeBlock',
                    title: 'Code Block',
                    fields: [
                        defineField({
                            name: 'language',
                            title: 'Language',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'HTML', value: 'html' },
                                    {
                                        title: 'JavaScript',
                                        value: 'javascript',
                                    },
                                    {
                                        title: 'TypeScript',
                                        value: 'typescript',
                                    },
                                    { title: 'CSS', value: 'css' },
                                    { title: 'JSON', value: 'json' },
                                    { title: 'Bash / Shell', value: 'bash' },
                                    { title: 'YAML', value: 'yaml' },
                                ],
                            },
                        }),
                        defineField({
                            name: 'code',
                            title: 'Code Content',
                            type: 'text',
                        }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'seo',
            title: 'SEO Settings',
            type: 'seoFields',
        }),
    ],
});
