import { defineArrayMember, defineField, defineType } from 'sanity';

export const solutionPage = defineType({
    name: 'solutionPage',
    title: 'Solution Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Page Title',
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
            initialValue: 'nl',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'URL Slug',
            type: 'slug',
            description:
                'The URL path for this page (e.g. property-management-software)',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),

        // ── Meta ────────────────────────────────────────────────────────
        defineField({
            name: 'badge',
            title: 'Badge Text',
            type: 'string',
            description:
                'Short pill label shown above the hero title (e.g. "Core SaaS Module")',
        }),
        defineField({
            name: 'heroIcon',
            title: 'Hero Icon',
            type: 'string',
            description: 'Lucide icon name (e.g. Building2, Users, CreditCard)',
            options: {
                list: [
                    { title: 'Building2 (Vastgoedbeheer)', value: 'Building2' },
                    { title: 'Users (Huurdersportaal)', value: 'Users' },
                    { title: 'CreditCard (Payment)', value: 'CreditCard' },
                ],
            },
        }),

        // ── Hero ─────────────────────────────────────────────────────────
        defineField({
            name: 'tagline',
            title: 'Hero Tagline',
            type: 'string',
            description: 'Large subtitle below the page title',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Hero Description',
            type: 'text',
            rows: 3,
            description: 'Paragraph below the tagline',
        }),

        // ── Proof Stats ──────────────────────────────────────────────────
        defineField({
            name: 'proof',
            title: 'Social Proof Stats',
            type: 'array',
            description: 'Up to 3 key statistics shown in the stats band',
            validation: (Rule) => Rule.max(3),
            of: [
                defineArrayMember({
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'stat',
                            title: 'Statistic',
                            type: 'string',
                            description: 'e.g. 87% or < 2 min',
                        }),
                        defineField({
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                            description: 'e.g. Tijdsbesparing bij indexaties',
                        }),
                    ],
                    preview: {
                        select: { title: 'stat', subtitle: 'label' },
                    },
                }),
            ],
        }),

        // ── Benefits Checklist ───────────────────────────────────────────
        defineField({
            name: 'benefits',
            title: 'Benefits Checklist',
            type: 'array',
            description:
                'Bullet points shown in the "Alles inbegrepen" section',
            of: [defineArrayMember({ type: 'string' })],
        }),

        // ── Feature Cards ────────────────────────────────────────────────
        defineField({
            name: 'features',
            title: 'Feature Cards',
            type: 'array',
            description:
                '3 core feature cards with icon, title and description',
            of: [
                defineArrayMember({
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'icon',
                            title: 'Icon Name',
                            type: 'string',
                            description:
                                'Lucide icon name (e.g. Zap, FileText, BarChart3)',
                        }),
                        defineField({
                            name: 'title',
                            title: 'Feature Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'text',
                            title: 'Feature Description',
                            type: 'text',
                            rows: 3,
                        }),
                    ],
                    preview: {
                        select: { title: 'title', subtitle: 'text' },
                    },
                }),
            ],
        }),

        // ── Workflow Steps ───────────────────────────────────────────────
        defineField({
            name: 'workflow',
            title: 'Workflow Steps',
            type: 'array',
            description:
                '"Hoe werkt het?" — 3-step process shown with icons and connector line',
            validation: (Rule) => Rule.max(3),
            of: [
                defineArrayMember({
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'step',
                            title: 'Step Number',
                            type: 'string',
                            description: 'e.g. 01, 02, 03',
                        }),
                        defineField({
                            name: 'icon',
                            title: 'Icon Name',
                            type: 'string',
                            description:
                                'Lucide icon name (e.g. Link2, CalendarCheck, Database)',
                        }),
                        defineField({
                            name: 'title',
                            title: 'Step Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'desc',
                            title: 'Step Description',
                            type: 'text',
                            rows: 3,
                        }),
                    ],
                    preview: {
                        select: { title: 'step', subtitle: 'title' },
                    },
                }),
            ],
        }),

        // ── FAQ ──────────────────────────────────────────────────────────
        defineField({
            name: 'faq',
            title: 'FAQ',
            type: 'array',
            description:
                'Accordion FAQ items — eligible for Google Featured Snippets',
            of: [
                defineArrayMember({
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'q',
                            title: 'Question',
                            type: 'string',
                        }),
                        defineField({
                            name: 'a',
                            title: 'Answer',
                            type: 'text',
                            rows: 4,
                        }),
                    ],
                    preview: {
                        select: { title: 'q', subtitle: 'a' },
                    },
                }),
            ],
        }),

        // ── Simulator ────────────────────────────────────────────────────
        defineField({
            name: 'simulatorTitle',
            title: 'Simulator Section Title',
            type: 'string',
        }),
        defineField({
            name: 'simulatorDesc',
            title: 'Simulator Section Description',
            type: 'text',
            rows: 2,
        }),

        // ── Related Modules ──────────────────────────────────────────────
        defineField({
            name: 'relatedModules',
            title: 'Related Modules (Cross-sell)',
            type: 'array',
            description: 'Links to other solution pages shown at the bottom',
            of: [
                defineArrayMember({
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'slug',
                            title: 'Target Slug',
                            type: 'string',
                            description: 'e.g. huurdersportaal or payment',
                            options: {
                                list: [
                                    {
                                        title: 'Huurdersportaal',
                                        value: 'huurdersportaal',
                                    },
                                    {
                                        title: 'Payment Software',
                                        value: 'payment',
                                    },
                                    {
                                        title: 'Vastgoedbeheer Software',
                                        value: 'vastgoedbeheer-software',
                                    },
                                ],
                            },
                        }),
                        defineField({
                            name: 'title',
                            title: 'Card Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'desc',
                            title: 'Card Description',
                            type: 'string',
                        }),
                    ],
                    preview: {
                        select: { title: 'title', subtitle: 'slug' },
                    },
                }),
            ],
        }),

        // ── CTA ──────────────────────────────────────────────────────────
        defineField({
            name: 'cta',
            title: 'CTA Footer Section',
            type: 'object',
            fields: [
                defineField({
                    name: 'title',
                    title: 'CTA Title',
                    type: 'string',
                }),
                defineField({
                    name: 'desc',
                    title: 'CTA Description',
                    type: 'text',
                    rows: 2,
                }),
                defineField({
                    name: 'primary',
                    title: 'Primary Button Label',
                    type: 'string',
                }),
                defineField({
                    name: 'secondary',
                    title: 'Secondary Button Label',
                    type: 'string',
                }),
            ],
        }),

        // ── SEO ──────────────────────────────────────────────────────────
        defineField({
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                defineField({
                    name: 'title',
                    title: 'SEO Title',
                    type: 'string',
                    description: 'Max 60 characters',
                    validation: (Rule) =>
                        Rule.max(60).warning('Keep under 60 characters'),
                }),
                defineField({
                    name: 'description',
                    title: 'SEO Description',
                    type: 'text',
                    rows: 2,
                    description: 'Max 160 characters',
                    validation: (Rule) =>
                        Rule.max(160).warning('Keep under 160 characters'),
                }),
                defineField({
                    name: 'keywords',
                    title: 'Keywords',
                    type: 'string',
                    description: 'Comma-separated keywords',
                }),
            ],
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
                subtitle: `/${subtitle === 'nl' ? '' : subtitle + '/'}oplossingen/...`,
            };
        },
    },
});
