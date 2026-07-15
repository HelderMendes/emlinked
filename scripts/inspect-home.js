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
    console.log('Querying all page documents...');
    const docs = await client.fetch(`*[_type == "page"]`);
    console.log(`Found ${docs.length} document(s):`);
    docs.forEach((d) => {
        console.log(JSON.stringify(d, null, 2));
    });
}

inspect();
