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
                                                    .filter('_type == "page" && language == "nl"')
                                                    .schemaType('page')
                                            ),
                                        S.listItem()
                                            .title('Oplossingen')
                                            .child(
                                                S.documentList()
                                                    .title('Oplossingen (NL)')
                                                    .filter('_type == "solutionPage" && language == "nl"')
                                                    .schemaType('solutionPage')
                                            ),
                                        S.listItem()
                                            .title('Blog / Nieuws')
                                            .child(
                                                S.documentList()
                                                    .title('Artikelen (NL)')
                                                    .filter('_type == "article" && language == "nl"')
                                                    .schemaType('article')
                                            ),
                                    ])
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
                                                    .filter('_type == "page" && language == "en"')
                                                    .schemaType('page')
                                            ),
                                        S.listItem()
                                            .title('Solutions')
                                            .child(
                                                S.documentList()
                                                    .title('Solutions (EN)')
                                                    .filter('_type == "solutionPage" && language == "en"')
                                                    .schemaType('solutionPage')
                                            ),
                                        S.listItem()
                                            .title('Blog / News')
                                            .child(
                                                S.documentList()
                                                    .title('Articles (EN)')
                                                    .filter('_type == "article" && language == "en"')
                                                    .schemaType('article')
                                            ),
                                    ])
                            ),
                        S.divider(),
                        S.listItem()
                            .title('Auteurs / Authors')
                            .child(
                                S.documentTypeList('author').title('Auteurs')
                            ),
                        S.divider(),
                        S.listItem()
                            .title('Nederlandse Instellingen')
                            .icon(() => '⚙️')
                            .child(
                                S.document()
                                    .schemaType('siteSettings')
                                    .documentId('siteSettings-nl')
                                    .title('Nederlandse Instellingen')
                            ),
                        S.listItem()
                            .title('English Settings')
                            .icon(() => '⚙️')
                            .child(
                                S.document()
                                    .schemaType('siteSettings')
                                    .documentId('siteSettings-en')
                                    .title('English Settings')
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
