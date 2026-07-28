const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2024-01-01',
    useCdn: false,
});

async function checkHomepage() {
    const nlHome = await client.fetch(`*[_id == "c8071896-4119-41e3-b095-ab5d2134d27f"][0]`);
    console.log("NL Homepage pageBlocks:", JSON.stringify(nlHome?.pageBlocks, null, 2));
}

checkHomepage().catch(console.error);
