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
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Releases', value: 'releases' },
                    { title: 'Vastgoed Beheer', value: 'vastgoed-beheer' },
                    { title: 'Financieel Beheer', value: 'financieel-beheer' },
                    {
                        title: 'Kosten Administratie',
                        value: 'kosten-administratie',
                    },
                    { title: 'Service Beheer', value: 'service-beheer' },
                    {
                        title: 'Instellen Emlinked',
                        value: 'instellen-emlinked',
                    },
                ],
            },
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
            name: 'body',
            title: 'Body Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    marks: {
                        annotations: [
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
