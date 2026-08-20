import { defineField, defineType } from 'sanity';

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'isFeatured',
      title: 'Uitgelicht Artikel / Featured Spotlight',
      type: 'boolean',
      description: 'Vink dit aan om dit artikel als het grote uitgelichte spotlight-artikel bovenaan de nieuwspagina te tonen.',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Organisatie', value: 'Organisatie' },
          { title: 'Wet & Regelgeving', value: 'Wet & Regelgeving' },
          { title: 'Vastgoedbeheer', value: 'Vastgoedbeheer' },
          { title: 'ERP & Business Central', value: 'ERP & Business Central' },
        ],
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'keyTakeaways',
      title: 'Key Takeaways / Belangrijkste Inzichten',
      type: 'array',
      description: 'Bullet points rendered in the Key Takeaways highlight box on the article detail page.',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'readTime',
      title: 'Estimated Read Time',
      type: 'string',
      description: 'e.g. "4 min leestijd"',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
    }),
    defineField({
      name: 'author',
      title: 'Author Reference',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'imagePath',
      title: 'Image File Path (Fallback)',
      type: 'string',
      description: 'e.g. /emlinked/news/Afbeeling-Iryna-en-Raymond-emlinked-versterkt-team-en-zet-koers-voor-verdere-groei-in-2026-1.png',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image (Sanity CDN Upload)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      description: 'The body text of the article. Use H2 for main section headers (best for SEO) and H3/H4 for sub-sections.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2 (Main Section Header - SEO)', value: 'h2' },
            { title: 'H3 (Sub-section Header)', value: 'h3' },
            { title: 'H4 (Minor Header)', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                        allowRelative: true,
                      }).required(),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true,
                  },
                ],
              },
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
                      { type: 'solutionPage' },
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
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoFields',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'mainImage',
    },
  },
});
