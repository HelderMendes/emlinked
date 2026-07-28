const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2024-01-01',
    useCdn: false,
});

async function checkEnHomepage() {
    const enHome = await client.fetch(`*[_id == "Ujl1Ky5GJWpKWiHmkpetx1"][0]`);
    console.log("EN Homepage pageBlocks:", JSON.stringify(enHome?.pageBlocks, null, 2));
}

checkEnHomepage().catch(console.error);
