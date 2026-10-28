import { seoFields } from './seoFields'
import { page } from './page'
import { author } from './author'
import { article } from './article'
import { doc } from './doc';
import { docCategory } from './docCategory';
import { siteSettings } from './siteSettings';
import { solutionPage } from './solutionPage';
import { quoteSubmission } from './quoteSubmission';

export const schemaTypes = [
    seoFields,
    page,
    author,
    article,
    doc,
    docCategory,
    siteSettings,
    solutionPage,
    quoteSubmission,
];

