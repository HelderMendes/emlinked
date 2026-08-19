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
                            title: 'Right Column Image Path (Optional String)',
                            type: 'string',
                            description:
                                'Relative path to image (e.g., /hero/vastgoedportfeuille_aangifte-klaar.jpg)',
                        }),
                        defineField({
                            name: 'image',
                            title: 'Right Column Image (Sanity Asset Upload)',
                            type: 'image',
                            options: { hotspot: true },
                            description:
                                'Upload custom graphic directly to Sanity CDN',
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
                                            title: 'Case Label / Step (e.g. CASE 1: VASTGOEDBEHEER ROTTERDAM)',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'title',
                                            title: 'Headline Title',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'text',
                                            title: 'Main Description Paragraph',
                                            type: 'text',
                                            rows: 3,
                                        }),
                                        defineField({
                                            name: 'feature',
                                            title: 'Metric Value / Highlight Title (e.g. 5 werkdagen → 4 uur)',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'metricLabel',
                                            title: 'Metric Label / Subtitle (e.g. Maandafsluiting Verkort)',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'quote',
                                            title: 'Customer Testimonial Quote',
                                            type: 'text',
                                            rows: 3,
                                        }),
                                        defineField({
                                            name: 'author',
                                            title: 'Author Name (e.g. Levi Bosboom)',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'role',
                                            title: 'Author Role / Function (e.g. Eigenaar - Vastgoedbeheer Rotterdam)',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'company',
                                            title: 'Company Name (e.g. Vastgoedbeheer Rotterdam)',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'photo',
                                            title: 'Author Photo Avatar (Sanity Image)',
                                            type: 'image',
                                            options: { hotspot: true },
                                        }),
                                        defineField({
                                            name: 'photoPath',
                                            title: 'Author Photo Image Path (Fallback string)',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'logo',
                                            title: 'Company Logo Image (Sanity Image)',
                                            type: 'image',
                                            options: { hotspot: true },
                                        }),
                                        defineField({
                                            name: 'logoPath',
                                            title: 'Company Logo Image Path (Fallback string)',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'tags',
                                            title: 'Technical Specification Tags',
                                            type: 'array',
                                            of: [{ type: 'string' }],
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
                    name: 'architectureSection',
                    title: 'System Architecture (Seamless Integration)',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'tag',
                            title: 'Pill Badge Tag (e.g. "NAADLOZE INTEGRATIE")',
                            type: 'string',
                        }),
                        defineField({
                            name: 'title',
                            title: 'Main Heading',
                            type: 'string',
                        }),
                        defineField({
                            name: 'subtitle',
                            title: 'Description Text',
                            type: 'text',
                            rows: 3,
                        }),
                        defineField({
                            name: 'sectionTag',
                            title: 'Secondary ERP Badge',
                            type: 'string',
                        }),
                        defineField({
                            name: 'sectionTitle',
                            title: 'Secondary Heading',
                            type: 'string',
                        }),
                        defineField({
                            name: 'sectionSubtitle',
                            title: 'Secondary Subtitle',
                            type: 'text',
                            rows: 2,
                        }),
                        defineField({
                            name: 'bullets',
                            title: 'Architecture Key Benefits',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    type: 'object',
                                    fields: [
                                        defineField({
                                            name: 'bold',
                                            title: 'Bold Prefix',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'text',
                                            title: 'Bullet Text',
                                            type: 'string',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        defineField({
                            name: 'bgImagePath',
                            title: 'Background Image Path',
                            type: 'string',
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            tag: 'tag',
                        },
                        prepare({ title, tag }) {
                            return {
                                title: `Architecture: ${title || 'Seamless Integration'}`,
                                subtitle: tag || 'System Architecture Block',
                            };
                        },
                    },
                }),
                defineArrayMember({
                    name: 'featuresList',
                    title: 'Features List',
                    type: 'object',
                    fields: [
                        // --- Box 3 Layout Specific Fields (Hidden when using Apps Grid layout) ---
                        defineField({
                            name: 'badge',
                            title: 'Section Badge (e.g. "Voor Wie")',
                            type: 'string',
                            hidden: ({ parent }) =>
                                Boolean(
                                    parent?.features &&
                                    parent.features.length > 0,
                                ),
                        }),
                        defineField({
                            name: 'title',
                            title: 'Section Title',
                            type: 'string',
                            hidden: ({ parent }) =>
                                Boolean(
                                    parent?.features &&
                                    parent.features.length > 0,
                                ),
                        }),
                        defineField({
                            name: 'subtitle',
                            title: 'Section Subtitle',
                            type: 'text',
                            rows: 3,
                            hidden: ({ parent }) =>
                                Boolean(
                                    parent?.features &&
                                    parent.features.length > 0,
                                ),
                        }),
                        defineField({
                            name: 'fiscalContext',
                            title: 'Fiscale Context Callout Box',
                            type: 'object',
                            hidden: ({ parent }) =>
                                Boolean(
                                    parent?.features &&
                                    parent.features.length > 0,
                                ),
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
                            hidden: ({ parent }) =>
                                Boolean(
                                    parent?.features &&
                                    parent.features.length > 0,
                                ),
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

                        // --- Apps / Homepage Grid Specific Fields (Hidden when using Box 3 Callout layout) ---
                        defineField({
                            name: 'sectionTag',
                            title: 'Section Subtitle / Tag (e.g. "MODULAIR EN FLEXIBEL")',
                            type: 'string',
                            hidden: ({ parent }) =>
                                Boolean(
                                    parent?.fiscalContext ||
                                    (parent?.items && parent.items.length > 0),
                                ),
                        }),
                        defineField({
                            name: 'sectionTitle',
                            title: 'Section Title',
                            type: 'string',
                            hidden: ({ parent }) =>
                                Boolean(
                                    parent?.fiscalContext ||
                                    (parent?.items && parent.items.length > 0),
                                ),
                        }),
                        defineField({
                            name: 'sectionSubtitle',
                            title: 'Intro Paragraph / Subtitle',
                            type: 'text',
                            rows: 3,
                            hidden: ({ parent }) =>
                                Boolean(
                                    parent?.fiscalContext ||
                                    (parent?.items && parent.items.length > 0),
                                ),
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
                            name: 'sectionTag',
                            title: 'Pill Badge Tag (e.g. "KLANTEN & REFERENTIES")',
                            type: 'string',
                        }),
                        defineField({
                            name: 'sectionTitle',
                            title: 'Section Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'sectionSubtitle',
                            title: 'Section Subtitle / Description Body',
                            type: 'text',
                            rows: 2,
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
                            title: 'Right Column Image Path (Optional String)',
                            type: 'string',
                            description:
                                'Relative path to image (e.g. /emlinked/box3/box3-automatiseren.jpg)',
                        }),
                        defineField({
                            name: 'image',
                            title: 'Right Column Image (Sanity Asset Upload)',
                            type: 'image',
                            options: { hotspot: true },
                            description:
                                'Upload banner graphic directly to Sanity CDN',
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
                            name: 'items',
                            title: 'Partner / Ecosystem Items (5 Boxes)',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    type: 'object',
                                    fields: [
                                        defineField({
                                            name: 'name',
                                            title: 'Partner / Software Name',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'tag',
                                            title: 'Category Tag (e.g. ERP Native, Financieel)',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'badge',
                                            title: 'Alternative Badge (Optional)',
                                            type: 'string',
                                        }),
                                    ],
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
                    name: 'pricingCalculator',
                    title: 'Interactive Pricing Calculator',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'sectionTag',
                            title: 'Section Badge Tag',
                            type: 'string',
                        }),
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
                    ],
                    preview: {
                        select: {
                            title: 'sectionTitle',
                            tag: 'sectionTag',
                        },
                        prepare({ title, tag }) {
                            return {
                                title: `Calculator: ${title || 'Interactive Pricing Calculator'}`,
                                subtitle: tag || 'Pricing Calculator Block',
                            };
                        },
                    },
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
                                            name: 'focusArea',
                                            title: 'Focus Area / Domain Expertise',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'badge',
                                            title: 'Badge Tag',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'photoPath',
                                            title: 'Photo File Path (Fallback)',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'linkedin',
                                            title: 'LinkedIn URL',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'email',
                                            title: 'Direct Email',
                                            type: 'string',
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
                defineArrayMember({
                    name: 'heroBlock',
                    title: 'Hero Block (Modular)',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'badge',
                            title: 'Badge Tag',
                            type: 'string',
                        }),
                        defineField({
                            name: 'tagline',
                            title: 'Tagline / Headline',
                            type: 'string',
                        }),
                        defineField({
                            name: 'description',
                            title: 'Description',
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
                            name: 'proofText',
                            title: 'Proof Bar Text',
                            type: 'string',
                        }),
                        defineField({
                            name: 'imagePath',
                            title: 'Image File Path (Optional)',
                            type: 'string',
                        }),
                        defineField({
                            name: 'image',
                            title: 'Hero Image (Sanity Asset)',
                            type: 'image',
                            options: { hotspot: true },
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'tagline',
                            subtitle: 'badge',
                        },
                        prepare({ title, subtitle }) {
                            return {
                                title: `Hero Block: ${title || 'Untitled'}`,
                                subtitle: subtitle || 'Hero Section',
                            };
                        },
                    },
                }),
                defineArrayMember({
                    name: 'ctaBlock',
                    title: 'CTA Conversion Block',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'CTA Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'subtitle',
                            title: 'CTA Subtitle',
                            type: 'text',
                            rows: 2,
                        }),
                        defineField({
                            name: 'primaryCtaLabel',
                            title: 'Primary CTA Label',
                            type: 'string',
                        }),
                        defineField({
                            name: 'primaryCtaUrl',
                            title: 'Primary CTA URL',
                            type: 'string',
                        }),
                        defineField({
                            name: 'secondaryCtaLabel',
                            title: 'Secondary CTA Label',
                            type: 'string',
                        }),
                        defineField({
                            name: 'secondaryCtaUrl',
                            title: 'Secondary CTA URL',
                            type: 'string',
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            subtitle: 'subtitle',
                        },
                        prepare({ title, subtitle }) {
                            return {
                                title: `CTA: ${title || 'Call to Action'}`,
                                subtitle: subtitle || 'Conversion Banner',
                            };
                        },
                    },
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
