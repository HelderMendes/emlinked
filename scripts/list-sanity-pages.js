const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2024-01-01',
    useCdn: false,
});

async function listDocs() {
    const pages = await client.fetch(`*[_type in ["page", "solutionPage"]]{ _id, _type, title, slug, language }`);
    console.log("Existing pages in Sanity:", pages);
}

listDocs().catch(console.error);
