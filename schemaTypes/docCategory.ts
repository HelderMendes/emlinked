import { defineField, defineType } from 'sanity';

export const docCategory = defineType({
    name: 'docCategory',
    title: 'Documentation Category',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Category Name',
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
                        language: (document as any).language,
                    };
                    const query = `!defined(*[_type == "docCategory" && !(_id in [$draft, $published]) && slug.current == $slug && language == $language][0]._id)`;
                    return await client.fetch(query, params);
                },
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'order',
            title: 'Navigation Order',
            type: 'number',
            description: 'Used to sort categories in the sidebar.',
            validation: (Rule) => Rule.min(0),
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
    ],
    orderings: [
        {
            title: 'Navigation Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
    preview: {
        select: { title: 'title' },
    },
});
