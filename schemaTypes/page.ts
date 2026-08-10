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
                            description:
                                'Pill text above title (e.g., "Nieuw: Microsoft Dynamics 365 BC Koppeling")',
                        }),
                        defineField({
                            name: 'title',
                            title: 'Hero Title',
                            type: 'string',
                            description:
                                'tekst tussen *deze text is emlinked orange*',
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
                            name: 'heroCard',
                            title: 'Right Column Hero Preview Card',
                            type: 'object',
                            fields: [
                                defineField({
                                    name: 'badge',
                                    title: 'Badge Tag',
                                    type: 'string',
                                }),
                                defineField({
                                    name: 'title',
                                    title: 'Card Title',
                                    type: 'string',
                                }),
                                defineField({
                                    name: 'status',
                                    title: 'Sync Status Text',
                                    type: 'string',
                                }),
                            ],
                        }),
                        defineField({
                            name: 'imagePath',
                            title: 'Right Column Image Path (Optional)',
                            type: 'string',
                            description:
                                'Relative path to image (e.g., /hero/vastgoedportfeuille_aangifte-klaar.jpg)',
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            label: 'label',
                        },
                        prepare({ title, label }) {
                            return {
                                title: `Hero: ${title || label || 'Untitled Hero'}`,
                                subtitle: label
                                    ? `Label: ${label}`
                                    : 'Hero Block',
                            };
                        },
                    },
                }),
                defineArrayMember({
                    name: 'announcement',
                    title: 'Urgency Announcement Bar',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'badge',
                            title: 'Badge Text',
                            type: 'string',
                        }),
                        defineField({
                            name: 'text',
                            title: 'Announcement Text',
                            type: 'string',
                        }),
                        defineField({
                            name: 'ctaLabel',
                            title: 'CTA Label',
                            type: 'string',
                        }),
                        defineField({
                            name: 'ctaLink',
                            title: 'CTA Link',
                            type: 'string',
                        }),
                    ],
                    preview: {
                        select: {
                            badge: 'badge',
                            text: 'text',
                        },
                        prepare({ badge, text }) {
                            return {
                                title: `Announcement: ${badge || text || 'Notification Bar'}`,
                                subtitle: text || 'Urgency Notification Bar',
                            };
                        },
                    },
                }),
                defineArrayMember({
                    name: 'workflow',
                    title: 'Solution Workflow Steps',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'badge',
                            title: 'Section Badge',
                            type: 'string',
                        }),
                        defineField({
                            name: 'title',
                            title: 'Section Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'items',
                            title: 'Workflow Steps',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    type: 'object',
                                    fields: [
                                        defineField({
                                            name: 'step',
                                            title: 'Step Number (e.g. 01)',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'title',
                                            title: 'Step Title',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'text',
                                            title: 'Step Text / Description',
                                            type: 'text',
                                            rows: 2,
                                        }),
                                        defineField({
                                            name: 'feature',
                                            title: 'Feature Tagline',
                                            type: 'string',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            badge: 'badge',
                        },
                        prepare({ title, badge }) {
                            return {
                                title: `Workflow: ${title || badge || 'Solution Steps'}`,
                                subtitle: badge || 'Workflow Steps Block',
                            };
                        },
                    },
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
                                        defineField({
                                            name: 'text',
                                            title: 'Text',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'icon',
                                            title: 'Icon (e.g. check, shield, star)',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'link',
                                            title: 'Link (Optional)',
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
                                title: 'Trust Bar',
                                subtitle: 'Partner & Trust Bar Items',
                            };
                        },
                    },
                }),
                defineArrayMember({
                    name: 'featuresList',
                    title: 'Features List',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'badge',
                            title: 'Section Badge (e.g. "Voor Wie")',
                            type: 'string',
                        }),
                        defineField({
                            name: 'title',
                            title: 'Section Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'subtitle',
                            title: 'Section Subtitle',
                            type: 'text',
                            rows: 3,
                        }),
                        defineField({
                            name: 'fiscalContext',
                            title: 'Fiscale Context Callout Box',
                            type: 'object',
                            fields: [
                                defineField({
                                    name: 'badge',
                                    title: 'Badge',
                                    type: 'string',
                                }),
                                defineField({
                                    name: 'title',
                                    title: 'Title',
                                    type: 'string',
                                }),
                                defineField({
                                    name: 'text',
                                    title: 'Text Description',
                                    type: 'text',
                                    rows: 3,
                                }),
                                defineField({
                                    name: 'image',
                                    title: 'Image Path',
                                    type: 'string',
                                }),
                            ],
                        }),
                        defineField({
                            name: 'items',
                            title: 'Feature Items / Pain Points',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    type: 'object',
                                    fields: [
                                        defineField({
                                            name: 'title',
                                            title: 'Item Title',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'text',
                                            title: 'Item Description',
                                            type: 'text',
                                            rows: 2,
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        defineField({
                            name: 'sectionTag',
                            title: 'Section Subtitle / Tag (e.g. "MODULAIR EN FLEXIBEL")',
                            type: 'string',
                        }),
                        defineField({
                            name: 'sectionTitle',
                            title: 'Section Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'sectionSubtitle',
                            title: 'Intro Paragraph / Subtitle',
                            type: 'text',
                            rows: 3,
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
                                            name: 'badge',
                                            title: 'Category Badge / Label (e.g. "Core Operatie & Admin")',
                                            type: 'string',
                                            description:
                                                'Pill badge overlayed on top-left of the module image',
                                        }),
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
                                        defineField({
                                            name: 'imagePath',
                                            title: 'Main Module Image Path (Grote Afbeelding)',
                                            type: 'string',
                                            description:
                                                'Pad naar de grote preview afbeelding (bijv. "/emlinked/apps/vastgoedbeheer-sopftware_modules.jpg")',
                                        }),
                                        defineField({
                                            name: 'iconPath',
                                            title: 'Top-Right PNG Icon Badge Path (Icoontje)',
                                            type: 'string',
                                            description:
                                                'Pad naar het PNG-icoontje rechtsboven op de kaart (bijv. "/emlinked/apps/vastgoedbeheer.png")',
                                        }),
                                        defineField({
                                            name: 'bullets',
                                            title: 'Bullet Points (Optional)',
                                            type: 'array',
                                            of: [
                                                defineArrayMember({
                                                    type: 'string',
                                                }),
                                            ],
                                        }),
                                        defineField({
                                            name: 'ctaLabel',
                                            title: 'CTA Label (Optional)',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'ctaLink',
                                            title: 'CTA Link (Optional)',
                                            type: 'string',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            sectionTitle: 'sectionTitle',
                            badge: 'badge',
                            tag: 'sectionTag',
                        },
                        prepare({ title, sectionTitle, badge, tag }) {
                            const mainTitle =
                                title ||
                                sectionTitle ||
                                badge ||
                                tag ||
                                'Features Block';
                            return {
                                title: `Features: ${mainTitle}`,
                                subtitle:
                                    badge || tag
                                        ? `Badge: ${badge || tag}`
                                        : 'Features Block',
                            };
                        },
                    },
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
                            name: 'badge',
                            title: 'Section Badge (e.g. "Klaar voor 2028?")',
                            type: 'string',
                        }),
                        defineField({
                            name: 'tag',
                            title: 'Alternative Tag Badge',
                            type: 'string',
                        }),
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
                            name: 'buttonText',
                            title: 'Primary Button Text',
                            type: 'string',
                        }),
                        defineField({
                            name: 'buttonLabel',
                            title: 'Alternative Button Label',
                            type: 'string',
                        }),
                        defineField({
                            name: 'buttonLink',
                            title: 'Button Link',
                            type: 'string',
                        }),
                        defineField({
                            name: 'imagePath',
                            title: 'Right Column Image Path (Optional)',
                            type: 'string',
                            description:
                                'Relative path to image (e.g. /emlinked/box3/box3-automatiseren.jpg)',
                        }),
                    ],
                }),
                defineArrayMember({
                    name: 'ecosystemSection',
                    title: 'Microsoft Ecosystem Platform Section',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'badge',
                            title: 'Section Tag / Badge',
                            type: 'string',
                            description:
                                'Top pill tag (e.g. "MICROSOFT ECOSYSTEM")',
                        }),
                        defineField({
                            name: 'title',
                            title: 'Headline Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'subtitle',
                            title: 'Body Text / Subtitle',
                            type: 'text',
                            rows: 3,
                        }),
                        defineField({
                            name: 'cardTitle',
                            title: 'Right Card Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'cardSubtitle',
                            title: 'Right Card Subtitle',
                            type: 'string',
                        }),
                        defineField({
                            name: 'cardPoints',
                            title: 'Right Card Check Bullet Points',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    type: 'string',
                                }),
                            ],
                        }),
                        defineField({
                            name: 'trustItems',
                            title: 'Bottom Trust Grid Items',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    type: 'object',
                                    fields: [
                                        defineField({
                                            name: 'title',
                                            title: 'Item Title',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'desc',
                                            title: 'Item Description',
                                            type: 'string',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            badge: 'badge',
                        },
                        prepare({ title, badge }) {
                            return {
                                title: `Ecosystem: ${title || badge || 'Microsoft Ecosystem'}`,
                                subtitle: badge || 'Ecosystem Platform Block',
                            };
                        },
                    },
                }),
                defineArrayMember({
                    name: 'partnersSection',
                    title: 'Partners & Software Integrations Section',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'badge',
                            title: 'Section Tag / Badge',
                            type: 'string',
                        }),
                        defineField({
                            name: 'title',
                            title: 'Section Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'subtitle',
                            title: 'Section Subtitle / Intro Paragraph',
                            type: 'text',
                            rows: 3,
                        }),
                        defineField({
                            name: 'valueTags',
                            title: 'Strategic Value Tags (Pills under subtitle)',
                            type: 'array',
                            of: [{ type: 'string' }],
                            description:
                                'Optional tag pills displayed below subtitle (e.g. "100% Cloud-Native ERP", "Gecertificeerde ISV Integraties")',
                        }),
                        defineField({
                            name: 'partners',
                            title: 'Partners List',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    type: 'object',
                                    fields: [
                                        defineField({
                                            name: 'name',
                                            title: 'Partner Name',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'badge',
                                            title: 'Partner Category Badge (e.g. "Native ERP")',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'logoUrl',
                                            title: 'Logo Image Path',
                                            type: 'string',
                                            description:
                                                'Relative path in public directory (e.g. /emlinked/partners/Continia-e1670413209950.png)',
                                        }),
                                        defineField({
                                            name: 'description',
                                            title: 'Partner Description',
                                            type: 'text',
                                            rows: 3,
                                        }),
                                        defineField({
                                            name: 'featureTitle',
                                            title: 'Feature Highlight Title',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'featureText',
                                            title: 'Feature Highlight Text',
                                            type: 'text',
                                            rows: 3,
                                        }),
                                        defineField({
                                            name: 'websiteUrl',
                                            title: 'Partner Website Link',
                                            type: 'string',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            badge: 'badge',
                        },
                        prepare({ title, badge }) {
                            return {
                                title: `Partners: ${title || badge || 'Partners Section'}`,
                                subtitle:
                                    badge || 'Partners & Integrations Block',
                            };
                        },
                    },
                }),
                defineArrayMember({
                    name: 'integrationsList',
                    title: 'Integrations List',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'sectionTag',
                            title: 'Section Tag (e.g. "ERP INTEGRATIE")',
                            type: 'string',
                        }),
                        defineField({
                            name: 'sectionTitle',
                            title: 'Section Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'sectionSubtitle',
                            title: 'Intro Paragraph / Subtitle',
                            type: 'text',
                            rows: 3,
                        }),
                        defineField({
                            name: 'integrations',
                            title: 'Integrations',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    type: 'object',
                                    fields: [
                                        defineField({
                                            name: 'title',
                                            title: 'Integration Title',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'badge',
                                            title: 'Badge Text',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'description',
                                            title: 'Description',
                                            type: 'text',
                                            rows: 3,
                                        }),
                                        defineField({
                                            name: 'imagePlaceholder',
                                            title: 'Image Placeholder Name',
                                            type: 'string',
                                            description:
                                                'e.g. BC-Integration-Flowchart.webp',
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
                                            name: 'link',
                                            title: 'Link (Optional)',
                                            type: 'string',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
                defineArrayMember({
                    name: 'calculatorBlock',
                    title: 'Calculator Block',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'badge',
                            title: 'Section Badge',
                            type: 'string',
                        }),
                        defineField({
                            name: 'title',
                            title: 'Section Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'subtitle',
                            title: 'Section Subtitle',
                            type: 'text',
                            rows: 2,
                        }),
                        defineField({
                            name: 'calculatorType',
                            title: 'Calculator Type',
                            type: 'string',
                            options: {
                                list: [
                                    {
                                        title: 'Box 3 Calculator',
                                        value: 'box3',
                                    },
                                ],
                            },
                            initialValue: 'box3',
                        }),
                        defineField({
                            name: 'featureTitle',
                            title: 'Left Column Feature List Title',
                            type: 'string',
                            description:
                                'Headline above feature list (e.g. "Wat emlinked automatisch bijhoudt")',
                        }),
                        defineField({
                            name: 'featureItems',
                            title: 'Left Column Feature List Items',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    type: 'string',
                                }),
                            ],
                            description:
                                'List of bullet features displayed on the left side of the calculator',
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            badge: 'badge',
                        },
                        prepare({ title, badge }) {
                            return {
                                title: `Calculator: ${title || badge || 'Box 3 Calculator'}`,
                                subtitle: badge || 'Calculator Widget Block',
                            };
                        },
                    },
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
                                            validation: (Rule) =>
                                                Rule.required(),
                                        },
                                    ],
                                },
                            ],
                        }),
                    ],
                }),
                defineArrayMember({
                    name: 'pricingBlock',
                    title: 'Pricing Block',
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
                            name: 'tiers',
                            title: 'Pricing Tiers',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    type: 'object',
                                    fields: [
                                        defineField({
                                            name: 'title',
                                            title: 'Tier Title',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'subtitle',
                                            title: 'Tier Subtitle',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'price',
                                            title: 'Price',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'unit',
                                            title: 'Unit',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'badge',
                                            title: 'Badge',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'features',
                                            title: 'Features List',
                                            type: 'array',
                                            of: [
                                                defineArrayMember({
                                                    type: 'string',
                                                }),
                                            ],
                                        }),
                                        defineField({
                                            name: 'ctaLabel',
                                            title: 'CTA Label',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'ctaLink',
                                            title: 'CTA Link',
                                            type: 'string',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
                defineArrayMember({
                    name: 'teamBlock',
                    title: 'Team Block',
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
                            name: 'members',
                            title: 'Team Members',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    type: 'object',
                                    fields: [
                                        defineField({
                                            name: 'name',
                                            title: 'Member Name',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'role',
                                            title: 'Member Role',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'bio',
                                            title: 'Biography',
                                            type: 'text',
                                            rows: 3,
                                        }),
                                        defineField({
                                            name: 'image',
                                            title: 'Avatar Image',
                                            type: 'image',
                                        }),
                                    ],
                                }),
                            ],
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
