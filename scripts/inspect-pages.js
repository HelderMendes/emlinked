require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-07-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

async function run() {
    console.log('Querying pages in Sanity database...');
    const pages = await client.fetch(
        `*[_type in ["page", "solutionPage"]] { _id, _type, title, slug, language }`,
    );
    console.log(`Found ${pages.length} pages:`);
    pages.forEach((p) => {
        console.log(
            `- Title: ${p.title}, Type: ${p._type}, Slug: ${p.slug?.current}, Lang: ${p.language}`,
        );
    });
}

run();
