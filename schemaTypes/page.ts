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
                    title: 'Hero Block',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Hero Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'subtitle',
                            title: 'Hero Subtitle',
                            type: 'text',
                            rows: 2,
                        }),
                        defineField({
                            name: 'ctaLabel',
                            title: 'CTA Button Label',
                            type: 'string',
                        }),
                        defineField({
                            name: 'ctaLink',
                            title: 'CTA Button Link',
                            type: 'string',
                        }),
                        defineField({
                            name: 'backgroundImage',
                            title: 'Background Image',
                            type: 'image',
                            options: { hotspot: true },
                        }),
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
            ],
        }),
        defineField({
            name: 'seo',
            title: 'SEO Settings',
            type: 'seoFields',
        }),
    ],
});
