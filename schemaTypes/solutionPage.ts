import { defineArrayMember, defineField, defineType } from 'sanity';

export const solutionPage = defineType({
    name: 'solutionPage',
    title: 'Onze Apps Page',
    type: 'document',
    fields: [
        // ── Core Document Metadata ─────────────────────────────────────
        defineField({
            name: 'title',
            title: 'Page Title',
            type: 'string',
            description:
                'Internal title for Sanity Studio (e.g. Vastgoedbeheer Software)',
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
                    { title: 'Deutsch', value: 'de' },
                    { title: 'Français', value: 'fr' },
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
                'The URL path for this page (e.g. apps/huurdersportaal or apps/vastgoedbeheer-software)',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),

        // ── Page Blocks (Modular Layout Builder) ─────────────────────────
        defineField({
            name: 'pageBlocks',
            title: 'Page Blocks (Modular Layout Builder)',
            type: 'array',
            description:
                'Assemble your page layout using modular content blocks so that we can reuse them whenever necessary.',
            of: [
                // 1. Hero Block
                defineArrayMember({
                    name: 'heroBlock',
                    title: 'Hero Section Block',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'badge',
                            title: 'Pill Badge Text',
                            type: 'string',
                        }),
                        defineField({
                            name: 'tagline',
                            title: 'Hero Tagline (H1 Title)',
                            type: 'string',
                        }),
                        defineField({
                            name: 'description',
                            title: 'Hero Subtitle Description',
                            type: 'text',
                            rows: 3,
                        }),
                        defineField({
                            name: 'heroImage',
                            title: 'Hero Image Path',
                            type: 'string',
                        }),
                    ],
                    preview: {
                        select: { title: 'tagline', subtitle: 'badge' },
                        prepare({ title, subtitle }) {
                            return {
                                title: `Hero Block: ${title || 'Untitled Tagline'}`,
                                subtitle: subtitle || 'Hero Section Banner',
                            };
                        },
                    },
                }),

                // 2. Comparison Matrix Block (Pain vs Solution)
                defineArrayMember({
                    name: 'comparisonBlock',
                    title: 'Comparison Matrix Block (Pain vs Solution)',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'badge',
                            title: 'Pill Badge Text',
                            type: 'string',
                        }),
                        defineField({
                            name: 'title',
                            title: 'Section Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'desc',
                            title: 'Section Description',
                            type: 'text',
                            rows: 3,
                        }),
                        defineField({
                            name: 'leftTitle',
                            title: 'Left Card Title (Legacy)',
                            type: 'string',
                        }),
                        defineField({
                            name: 'leftItems',
                            title: 'Left Card Items (Pain Points)',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    type: 'object',
                                    fields: [
                                        defineField({
                                            name: 'title',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'desc',
                                            type: 'text',
                                            rows: 2,
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        defineField({
                            name: 'rightTitle',
                            title: 'Right Card Title (Emlinked)',
                            type: 'string',
                        }),
                        defineField({
                            name: 'rightItems',
                            title: 'Right Card Items (Solutions/Benefits)',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    type: 'object',
                                    fields: [
                                        defineField({
                                            name: 'title',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'desc',
                                            type: 'text',
                                            rows: 2,
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                    preview: {
                        select: { title: 'title', subtitle: 'badge' },
                        prepare({ title, subtitle }) {
                            return {
                                title: `Comparison Block: ${title || 'Pain vs Solution'}`,
                                subtitle: subtitle || 'Section 2 Matrix',
                            };
                        },
                    },
                }),

                // 3. Feature Tabs Block
                defineArrayMember({
                    name: 'featureTabsBlock',
                    title: 'Feature Tabs Block',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'badge',
                            title: 'Pill Badge Text',
                            type: 'string',
                        }),
                        defineField({
                            name: 'title',
                            title: 'Section Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'tabs',
                            title: 'Feature Tabs',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    type: 'object',
                                    fields: [
                                        defineField({
                                            name: 'tabId',
                                            title: 'Tab ID',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'tabTitle',
                                            title: 'Tab Navigation Title',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'title',
                                            title: 'Feature Heading',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'text',
                                            title: 'Feature Description',
                                            type: 'text',
                                            rows: 3,
                                        }),
                                        defineField({
                                            name: 'bullets',
                                            title: 'Bullet Points',
                                            type: 'array',
                                            of: [
                                                defineArrayMember({
                                                    type: 'string',
                                                }),
                                            ],
                                        }),
                                        defineField({
                                            name: 'imagePath',
                                            title: 'Feature Image Path',
                                            type: 'string',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                    preview: {
                        select: { title: 'title', subtitle: 'badge' },
                        prepare({ title, subtitle }) {
                            return {
                                title: `Feature Tabs Block: ${title || 'Interactive Tabs'}`,
                                subtitle: subtitle || 'Section 3 Features',
                            };
                        },
                    },
                }),

                // 4. Stats / Social Proof Block
                defineArrayMember({
                    name: 'statsBlock',
                    title: 'Social Proof Stats Block',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'stats',
                            title: 'Key Statistics',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    type: 'object',
                                    fields: [
                                        defineField({
                                            name: 'stat',
                                            title: 'Value (e.g. 87% or < 2 min)',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'label',
                                            title: 'Label Description',
                                            type: 'string',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                    preview: {
                        prepare() {
                            return {
                                title: 'Stats Block: Social Proof Band',
                            };
                        },
                    },
                }),

                // 5. Workflow Block (3-Step Process)
                defineArrayMember({
                    name: 'workflowBlock',
                    title: 'Workflow Block (3-Step Process)',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Section Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'steps',
                            title: 'Workflow Steps',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    type: 'object',
                                    fields: [
                                        defineField({
                                            name: 'step',
                                            title: 'Step Number (01, 02, 03)',
                                            type: 'string',
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
                                            rows: 2,
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                    preview: {
                        select: { title: 'title' },
                        prepare({ title }) {
                            return {
                                title: `Workflow Block: ${title || '3-Step Process'}`,
                            };
                        },
                    },
                }),

                // 6. FAQ Accordion Block
                defineArrayMember({
                    name: 'faqBlock',
                    title: 'FAQ Accordion Block',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'FAQ Section Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'items',
                            title: 'FAQ Question & Answer Items',
                            type: 'array',
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
                                            rows: 3,
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                    preview: {
                        select: { title: 'title' },
                        prepare({ title }) {
                            return {
                                title: `FAQ Block: ${title || 'Frequently Asked Questions'}`,
                            };
                        },
                    },
                }),

                // 7. CTA Banner Block
                defineArrayMember({
                    name: 'ctaBlock',
                    title: 'CTA Banner Block',
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
                            name: 'primaryButtonText',
                            title: 'Primary Button Label',
                            type: 'string',
                        }),
                        defineField({
                            name: 'secondaryButtonText',
                            title: 'Secondary Button Label',
                            type: 'string',
                        }),
                    ],
                    preview: {
                        select: { title: 'title' },
                        prepare({ title }) {
                            return {
                                title: `CTA Banner Block: ${title || 'Call to Action'}`,
                            };
                        },
                    },
                }),

                // 8. Architecture & Integration Callout Block
                defineArrayMember({
                    name: 'architectureBlock',
                    title: 'Architecture & ERP Integration Block',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'tag',
                            title: 'Pill Badge Tag',
                            type: 'string',
                        }),
                        defineField({
                            name: 'title',
                            title: 'Main Heading Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'desc',
                            title: 'Description Text',
                            type: 'text',
                            rows: 3,
                        }),
                        defineField({
                            name: 'bullets',
                            title: 'Key Integration Bullets',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    type: 'string',
                                }),
                            ],
                        }),
                        defineField({
                            name: 'imagePath',
                            title: 'Illustration Image Path',
                            type: 'string',
                        }),
                    ],
                    preview: {
                        select: { title: 'title', tag: 'tag' },
                        prepare({ title, tag }) {
                            return {
                                title: `Architecture Block: ${title || 'ERP Integration'}`,
                                subtitle: tag || 'Native Integration Callout',
                            };
                        },
                    },
                }),
            ],
        }),

        // ── SEO Settings ──────────────────────────────────────────────────
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
                subtitle: `Oplossingen app (${subtitle ? subtitle.toUpperCase() : 'NL'})`,
            };
        },
    },
});
