import { defineField, defineType } from 'sanity';

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
            title: 'Show Top Announcement Bar',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'announcementText',
            title: 'Announcement Text',
            type: 'string',
            description: 'Text shown in the top urgency/announcement bar.',
        }),
        defineField({
            name: 'announcementLink',
            title: 'Announcement Link',
            type: 'string',
            description: 'Optional link destination for the announcement bar.',
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
    ],
});
