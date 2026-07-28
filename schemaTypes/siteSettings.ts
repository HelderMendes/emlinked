import { defineArrayMember, defineField, defineType } from 'sanity';

export const siteSettings = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Settings Profile Name',
            type: 'string',
            initialValue: 'Global Site Settings',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'language',
            title: 'Language Code',
            type: 'string',
            options: {
                list: [
                    { title: 'Nederlands', value: 'nl' },
                    { title: 'English', value: 'en' },
                    { title: 'Deutsch', value: 'de' },
                ],
            },
            initialValue: 'nl',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'announcementActive',
            title: 'Show Bottom Announcement Pill',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'announcementText',
            title: 'Announcement Subtitle / Text',
            type: 'string',
            description:
                'Body description text shown inside the announcement card.',
        }),
        defineField({
            name: 'announcementTitle',
            title: 'Announcement Title',
            type: 'string',
            description: 'Main heading title inside the announcement card.',
        }),
        defineField({
            name: 'announcementCtaLabel',
            title: 'Announcement CTA Button Label',
            type: 'string',
            description:
                'Text shown on the action button (e.g. "Gratis demo aanvragen").',
        }),
        defineField({
            name: 'announcementPillText',
            title: 'Announcement Collapsed Pill Text',
            type: 'string',
            description:
                'Label shown next to the rating stars when collapsed (e.g. "4.9 van 5").',
        }),
        defineField({
            name: 'announcementReviews',
            title: 'Announcement Card Reviews',
            type: 'array',
            description:
                'Provide up to 2 stars reviews shown at the bottom of the card.',
            of: [
                defineArrayMember({
                    name: 'review',
                    title: 'Review Item',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'text',
                            title: 'Review Quote / Text',
                            type: 'text',
                            rows: 2,
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'author',
                            title: 'Author / Subtitle',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                    ],
                    preview: {
                        select: { title: 'author', subtitle: 'text' },
                    },
                }),
            ],
        }),
        defineField({
            name: 'announcementLink',
            title: 'Announcement Link Target',
            type: 'string',
            description:
                'Optional link destination (use "#demo" to open the demo form).',
        }),
        defineField({
            name: 'phone',
            title: 'Corporate Phone',
            type: 'string',
            initialValue: '+31 (0)88 707 7000',
        }),
        defineField({
            name: 'email',
            title: 'Corporate Email',
            type: 'string',
            initialValue: 'support@emlinked.com',
        }),
        defineField({
            name: 'address',
            title: 'Corporate Address',
            type: 'string',
            initialValue: 'Keizersgracht 241, 1016 EA Amsterdam',
        }),
        defineField({
            name: 'linkedinUrl',
            title: 'LinkedIn Profile URL',
            type: 'url',
            initialValue: 'https://linkedin.com',
        }),
        defineField({
            name: 'twitterUrl',
            title: 'X / Twitter Profile URL',
            type: 'url',
            initialValue: 'https://x.com',
        }),
        defineField({
            name: 'calendlyUrl',
            title: 'Calendly Booking URL',
            type: 'url',
            description:
                'The URL for scheduling meetings (e.g. https://calendly.com/your-team).',
            initialValue: 'https://calendly.com',
        }),
        defineField({
            name: 'navigationMenu',
            title: 'Header Navigation Menu',
            type: 'array',
            description: 'Configure menu links and dropdowns dynamically.',
            of: [
                defineArrayMember({
                    name: 'menuLink',
                    title: 'Direct Link',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Link Title',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'path',
                            title: 'Path / URL',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                    ],
                    preview: {
                        select: { title: 'title', subtitle: 'path' },
                    },
                }),
                defineArrayMember({
                    name: 'menuDropdown',
                    title: 'Dropdown Group',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Group Title',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'path',
                            title: 'Group Overview Path / URL',
                            type: 'string',
                            description:
                                'Optional. Path to navigate to when the group title itself is clicked on desktop.',
                        }),
                        defineField({
                            name: 'links',
                            title: 'Sub Links',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    type: 'object',
                                    fields: [
                                        defineField({
                                            name: 'title',
                                            title: 'Link Title',
                                            type: 'string',
                                            validation: (Rule) =>
                                                Rule.required(),
                                        }),
                                        defineField({
                                            name: 'path',
                                            title: 'Path / URL',
                                            type: 'string',
                                            validation: (Rule) =>
                                                Rule.required(),
                                        }),
                                        defineField({
                                            name: 'description',
                                            title: 'Short Description (Optional)',
                                            type: 'string',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                    preview: {
                        select: { title: 'title' },
                        prepare({ title }) {
                            return { title, subtitle: 'Dropdown menu group' };
                        },
                    },
                }),
            ],
        }),
    ],
});
