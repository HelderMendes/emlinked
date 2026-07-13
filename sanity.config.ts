import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { documentInternationalization } from '@sanity/document-internationalization';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
    name: 'default',
    title: 'emlinked',

    projectId,
    dataset,

    basePath: '/studio',

    plugins: [
        structureTool({
            structure: (S) =>
                S.list()
                    .title('Content')
                    .items([
                        S.listItem()
                            .title('Pages')
                            .child(
                                S.list()
                                    .title('Pages')
                                    .items([
                                        S.documentTypeListItem('page').title(
                                            'General Pages',
                                        ),
                                        S.documentTypeListItem(
                                            'solutionPage',
                                        ).title('Solution Pages'),
                                    ]),
                            ),
                        S.listItem()
                            .title('Blog / News')
                            .child(
                                S.list()
                                    .title('Blog / Nieuws')
                                    .items([
                                        S.documentTypeListItem('article').title(
                                            'Articles',
                                        ),
                                        S.documentTypeListItem('author').title(
                                            'Authors',
                                        ),
                                    ]),
                            ),
                        S.divider(),
                        S.documentTypeListItem('siteSettings').title(
                            'Site Settings',
                        ),
                    ]),
        }),
        visionTool(),

        documentInternationalization({
            supportedLanguages: [
                { id: 'nl', title: 'Nederlands' },
                { id: 'en', title: 'English' },
            ],
            schemaTypes: ['solutionPage', 'page', 'article'],
        }),
    ],

    schema: {
        types: schemaTypes,
    },
});
