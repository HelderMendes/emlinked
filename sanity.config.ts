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
                            .title('Nederlandse Content')
                            .icon(() => '🇳🇱')
                            .child(
                                S.list()
                                    .title('Nederlandse Content')
                                    .items([
                                        S.listItem()
                                            .title("Pagina's")
                                            .child(
                                                S.documentList()
                                                    .title("Pagina's (NL)")
                                                    .filter(
                                                        '_type == "page" && language == "nl"',
                                                    )
                                                    .apiVersion('2024-07-01')
                                                    .schemaType('page'),
                                            ),
                                        S.listItem()
                                            .title('Onze apps')
                                            .child(
                                                S.documentList()
                                                    .title('Onze apps (NL)')
                                                    .filter(
                                                        '_type == "solutionPage" && language == "nl"',
                                                    )
                                                    .apiVersion('2024-07-01')
                                                    .schemaType('solutionPage'),
                                            ),
                                        S.listItem()
                                            .title('Blog / Nieuws')
                                            .child(
                                                S.documentList()
                                                    .title('Artikelen (NL)')
                                                    .filter(
                                                        '_type == "article" && language == "nl"',
                                                    )
                                                    .apiVersion('2024-07-01')
                                                    .schemaType('article'),
                                            ),
                                    ]),
                            ),
                        S.listItem()
                            .title('English Content')
                            .icon(() => '🇬🇧')
                            .child(
                                S.list()
                                    .title('English Content')
                                    .items([
                                        S.listItem()
                                            .title('Pages')
                                            .child(
                                                S.documentList()
                                                    .title('Pages (EN)')
                                                    .filter(
                                                        '_type == "page" && language == "en"',
                                                    )
                                                    .apiVersion('2024-07-01')
                                                    .schemaType('page'),
                                            ),
                                        S.listItem()
                                            .title('Our Apps')
                                            .child(
                                                S.documentList()
                                                    .title('Our Apps (EN)')
                                                    .filter(
                                                        '_type == "solutionPage" && language == "en"',
                                                    )
                                                    .apiVersion('2024-07-01')
                                                    .schemaType('solutionPage'),
                                            ),
                                        S.listItem()
                                            .title('Blog / News')
                                            .child(
                                                S.documentList()
                                                    .title('Articles (EN)')
                                                    .filter(
                                                        '_type == "article" && language == "en"',
                                                    )
                                                    .apiVersion('2024-07-01')
                                                    .schemaType('article'),
                                            ),
                                    ]),
                            ),
                        S.divider(),
                        S.listItem()
                            .title('Mijn emlinked / Handleidingen (NL)')
                            .icon(() => '📚')
                            .child(
                                S.list()
                                    .title('Mijn emlinked / Handleidingen (NL)')
                                    .items([
                                        S.listItem()
                                            .title('Categorieën')
                                            .child(
                                                S.documentList()
                                                    .title('Categorieën (NL)')
                                                    .filter(
                                                        '_type == "docCategory" && language == "nl"',
                                                    )
                                                    .apiVersion('2024-07-01')
                                                    .schemaType('docCategory')
                                                    .defaultOrdering([
                                                        {
                                                            field: 'order',
                                                            direction: 'asc',
                                                        },
                                                    ])
                                                    .child((categoryId) =>
                                                        S.documentList()
                                                            .title(
                                                                'Handleidingen',
                                                            )
                                                            .filter(
                                                                '_type == "doc" && references($categoryId)',
                                                            )
                                                            .params({
                                                                categoryId,
                                                            })
                                                            .apiVersion(
                                                                '2024-07-01',
                                                            )
                                                            .schemaType('doc')
                                                            .defaultOrdering([
                                                                {
                                                                    field: 'order',
                                                                    direction:
                                                                        'asc',
                                                                },
                                                            ]),
                                                    ),
                                            ),
                                    ]),
                            ),
                        S.listItem()
                            .title('My emlinked / Manuals (EN)')
                            .icon(() => '📚')
                            .child(
                                S.list()
                                    .title('My emlinked / Manuals (EN)')
                                    .items([
                                        S.listItem()
                                            .title('Categories')
                                            .child(
                                                S.documentList()
                                                    .title('Categories (EN)')
                                                    .filter(
                                                        '_type == "docCategory" && language == "en"',
                                                    )
                                                    .apiVersion('2024-07-01')
                                                    .schemaType('docCategory')
                                                    .defaultOrdering([
                                                        {
                                                            field: 'order',
                                                            direction: 'asc',
                                                        },
                                                    ])
                                                    .child((categoryId) =>
                                                        S.documentList()
                                                            .title('Manuals')
                                                            .filter(
                                                                '_type == "doc" && references($categoryId)',
                                                            )
                                                            .params({
                                                                categoryId,
                                                            })
                                                            .apiVersion(
                                                                '2024-07-01',
                                                            )
                                                            .schemaType('doc')
                                                            .defaultOrdering([
                                                                {
                                                                    field: 'order',
                                                                    direction:
                                                                        'asc',
                                                                },
                                                            ]),
                                                    ),
                                            ),
                                    ]),
                            ),
                        S.divider(),
                        S.listItem()
                            .title('Auteurs / Authors')
                            .child(
                                S.documentTypeList('author').title('Auteurs'),
                            ),
                        S.divider(),
                        S.listItem()
                            .title('Nederlandse Instellingen')
                            .icon(() => '⚙️')
                            .child(
                                S.document()
                                    .schemaType('siteSettings')
                                    .documentId('siteSettings-nl')
                                    .title('Nederlandse Instellingen'),
                            ),
                        S.listItem()
                            .title('English Settings')
                            .icon(() => '⚙️')
                            .child(
                                S.document()
                                    .schemaType('siteSettings')
                                    .documentId('siteSettings-en')
                                    .title('English Settings'),
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
            apiVersion: '2024-07-01',
        }),
    ],

    schema: {
        types: schemaTypes,
    },
});
