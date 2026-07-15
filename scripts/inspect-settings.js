require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-07-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

async function inspect() {
    console.log('Querying siteSettings documents in database...');
    const docs = await client.fetch(`*[_type == "siteSettings"]`);
    console.log(`Found ${docs.length} document(s):`);
    docs.forEach((d) => {
        console.log(
            `ID: ${d._id}, Language: ${d.language}, Title: ${d.title}, Menu:`,
            JSON.stringify(d.navigationMenu, null, 2),
        );
    });
}

inspect();
