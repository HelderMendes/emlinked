import { defineArrayMember, defineField, defineType } from 'sanity';

export const page = defineType({
    name: 'page',
    title: 'Page',
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
                    { title: 'Deutsch', value: 'de' },
                    { title: 'Français', value: 'fr' },
                ],
            },
            initialValue: 'nl',
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
            name: 'pageBlocks',
            title: 'Page Blocks',
            type: 'array',
            description:
                'Assemble your page layout using modular content blocks.',
            of: [
                defineArrayMember({
                    name: 'hero',
                    title: 'Hero Block (Client Specs)',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'label',
                            title: 'Urgency Label / Badge',
                            type: 'string',
                            description: 'Pill text above title (e.g., "Nieuw: Microsoft Dynamics 365 BC Koppeling")',
                        }),
                        defineField({
                            name: 'title',
                            title: 'Hero Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'subtitle',
                            title: 'Hero Subtitle',
                            type: 'text',
                            rows: 3,
                        }),
                        defineField({
                            name: 'ctaLabel',
                            title: 'Primary CTA Label',
                            type: 'string',
                        }),
                        defineField({
                            name: 'ctaLink',
                            title: 'Primary CTA Link',
                            type: 'string',
                        }),
                        defineField({
                            name: 'secondaryCtaLabel',
                            title: 'Secondary CTA Label',
                            type: 'string',
                        }),
                        defineField({
                            name: 'secondaryCtaLink',
                            title: 'Secondary CTA Link',
                            type: 'string',
                        }),
                        defineField({
                            name: 'showProof',
                            title: 'Show Social Proof Bar',
                            type: 'boolean',
                            initialValue: true,
                        }),
                        defineField({
                            name: 'proofText',
                            title: 'Social Proof Text',
                            type: 'string',
                            description: 'Text displayed next to avatars',
                        }),
                        defineField({
                            name: 'cardTitle',
                            title: 'Dashboard Preview Card Title',
                            type: 'string',
                            initialValue: 'LIVE PORTFOLIO METRICS',
                        }),
                        defineField({
                            name: 'cardStats',
                            title: 'Dashboard Preview Stats',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    type: 'object',
                                    fields: [
                                        defineField({ name: 'label', title: 'Stat Label', type: 'string' }),
                                        defineField({ name: 'value', title: 'Stat Value', type: 'string' }),
                                        defineField({ name: 'badgeText', title: 'Badge Text (Optional)', type: 'string' }),
                                        defineField({
                                            name: 'badgeType',
                                            title: 'Badge Color Theme',
                                            type: 'string',
                                            options: {
                                                list: [
                                                    { title: 'Amber / Good', value: 'good' },
                                                    { title: 'Blue / Neutral', value: 'blue' },
                                                    { title: 'Red / Warn', value: 'warn' },
                                                ]
                                            },
                                            initialValue: 'good',
                                        })
                                    ]
                                })
                            ]
                        })
                    ],
                }),
                defineArrayMember({
                    name: 'trustBar',
                    title: 'Trust Bar',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'items',
                            title: 'Trust Items',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    type: 'object',
                                    fields: [
                                        defineField({ name: 'text', title: 'Text', type: 'string' }),
                                        defineField({ name: 'icon', title: 'Icon (e.g. check, shield, star)', type: 'string' }),
                                        defineField({ name: 'link', title: 'Link (Optional)', type: 'string' }),
                                    ]
                                })
                            ]
                        })
                    ],
                }),
                defineArrayMember({
                    name: 'featuresList',
                    title: 'Features List',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'sectionTitle',
                            title: 'Section Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'sectionSubtitle',
                            title: 'Section Subtitle',
                            type: 'text',
                            rows: 2,
                        }),
                        defineField({
                            name: 'features',
                            title: 'Features',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    type: 'object',
                                    fields: [
                                        defineField({
                                            name: 'title',
                                            title: 'Feature Title',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'description',
                                            title: 'Feature Description',
                                            type: 'text',
                                            rows: 3,
                                        }),
                                        defineField({
                                            name: 'icon',
                                            title: 'Feature Icon',
                                            type: 'string',
                                            description:
                                                'Lucide icon identifier',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
                defineArrayMember({
                    name: 'faqSection',
                    title: 'FAQ Section',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'sectionTitle',
                            title: 'Section Title',
                            type: 'string',
                            initialValue: 'Veelgestelde Vragen',
                        }),
                        defineField({
                            name: 'faqs',
                            title: 'FAQs',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    type: 'object',
                                    fields: [
                                        defineField({
                                            name: 'question',
                                            title: 'Question',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'answer',
                                            title: 'Answer',
                                            type: 'text',
                                            rows: 3,
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
                defineArrayMember({
                    name: 'testimonialSection',
                    title: 'Testimonials Section',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'sectionTitle',
                            title: 'Section Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'testimonials',
                            title: 'Testimonials',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    type: 'object',
                                    fields: [
                                        defineField({
                                            name: 'quote',
                                            title: 'Quote',
                                            type: 'text',
                                            rows: 3,
                                        }),
                                        defineField({
                                            name: 'author',
                                            title: 'Author',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'role',
                                            title: 'Author Role / Company',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'avatar',
                                            title: 'Author Avatar',
                                            type: 'image',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
                defineArrayMember({
                    name: 'ctaBanner',
                    title: 'CTA Banner',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'subtitle',
                            title: 'Subtitle',
                            type: 'text',
                            rows: 2,
                        }),
                        defineField({
                            name: 'buttonLabel',
                            title: 'Button Label',
                            type: 'string',
                        }),
                        defineField({
                            name: 'buttonLink',
                            title: 'Button Link',
                            type: 'string',
                        }),
                    ],
                }),
                defineArrayMember({
                    name: 'integrationsList',
                    title: 'Integrations List',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'sectionTitle',
                            title: 'Section Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'integrations',
                            title: 'Integrations',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    type: 'object',
                                    fields: [
                                        defineField({ name: 'title', title: 'Integration Title', type: 'string' }),
                                        defineField({ name: 'badge', title: 'Badge Text', type: 'string' }),
                                        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
                                        defineField({ name: 'imagePlaceholder', title: 'Image Placeholder Name', type: 'string', description: 'e.g. BC-Integration-Flowchart.webp' }),
                                        defineField({
                                            name: 'bullets',
                                            title: 'Bullet Points',
                                            type: 'array',
                                            of: [defineArrayMember({ type: 'string' })]
                                        }),
                                        defineField({ name: 'link', title: 'Link (Optional)', type: 'string' }),
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                defineArrayMember({
                    name: 'calculatorBlock',
                    title: 'Calculator Block',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'calculatorType',
                            title: 'Calculator Type',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Box 3 Calculator', value: 'box3' }
                                ]
                            },
                            initialValue: 'box3',
                        })
                    ]
                }),
                defineArrayMember({
                    name: 'richText',
                    title: 'Rich Text Content',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'sectionTitle',
                            title: 'Section Title (Optional)',
                            type: 'string',
                        }),
                        defineField({
                            name: 'content',
                            title: 'Content',
                            type: 'array',
                            of: [
                                { type: 'block' },
                                {
                                    type: 'image',
                                    options: { hotspot: true },
                                    fields: [
                                        {
                                            name: 'alt',
                                            type: 'string',
                                            title: 'Alternative Text',
                                            validation: (Rule) => Rule.required(),
                                        }
                                    ]
                                }
                            ]
                        })
                    ]
                }),
            ],
        }),
        defineField({
            name: 'seo',
            title: 'SEO Settings',
            type: 'seoFields',
        }),
    ],
});
