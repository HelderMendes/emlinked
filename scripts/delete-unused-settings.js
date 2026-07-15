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
    const ids = [
        '160f9be3-f486-4ae5-a2b5-0cbf1c05ea5f',
        '5fb14a67-2827-42ca-91e2-be74a0147471',
    ];
    console.log('Deleting deprecated siteSettings documents...');
    for (const id of ids) {
        try {
            await client.delete(id);
            console.log(`Deleted document: ${id}`);
        } catch (e) {
            console.error(`Failed to delete document ${id}:`, e.message);
        }
    }
}

run();
