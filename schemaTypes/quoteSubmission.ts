import { defineField, defineType } from 'sanity';

export const quoteSubmission = defineType({
    name: 'quoteSubmission',
    title: 'Offerte-aanvraag',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Naam',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'email',
            title: 'E-mailadres',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'phone',
            title: 'Telefoonnummer',
            type: 'string',
        }),
        defineField({
            name: 'company',
            title: 'Bedrijf',
            type: 'string',
        }),
        defineField({
            name: 'locale',
            title: 'Taal',
            type: 'string',
        }),
        defineField({
            name: 'oneTimeItems',
            title: 'Eenmalige kosten',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'label', type: 'string', title: 'Label' }),
                        defineField({ name: 'amount', type: 'string', title: 'Bedrag' }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'monthlyItems',
            title: 'Maandelijkse onderdelen',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'label', type: 'string', title: 'Label' }),
                        defineField({ name: 'amount', type: 'string', title: 'Bedrag' }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'baseMonthlyPrice',
            title: 'Basisabonnement (maand)',
            type: 'string',
        }),
        defineField({
            name: 'monthlyAdditions',
            title: 'Extra maandkosten',
            type: 'string',
        }),
        defineField({
            name: 'supportFee',
            title: 'Supportkosten',
            type: 'string',
        }),
        defineField({
            name: 'totalOneTime',
            title: 'Totaal eenmalig',
            type: 'string',
        }),
        defineField({
            name: 'totalMonthly',
            title: 'Totaal per maand',
            type: 'string',
        }),
        defineField({
            name: 'emailStatus',
            title: 'E-mailstatus',
            type: 'string',
            options: {
                list: [
                    { title: 'Verzonden', value: 'sent' },
                    { title: 'Mislukt', value: 'failed' },
                ],
            },
        }),
        defineField({
            name: 'submittedAt',
            title: 'Aangevraagd op',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'email',
        },
    },
});
