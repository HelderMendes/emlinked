require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-07-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

async function publishAllArticles() {
    console.log('🚀 Publishing all draft articles in Sanity...');
    try {
        const drafts = await client.fetch('*[_type == "article" && _id in path("drafts.**")]');
        console.log(`Found ${drafts.length} draft article documents.`);

        for (const draft of drafts) {
            const publishedId = draft._id.replace(/^drafts\./, '');
            const publishedDoc = { ...draft, _id: publishedId };
            delete publishedDoc._updatedAt;

            // Save published document
            await client.createOrReplace(publishedDoc);
            // Delete draft document so Sanity Studio marks it 100% Published
            await client.delete(draft._id);

            console.log(`  ✅ Published: ${publishedId}`);
        }

        console.log('🎉 Done! All news articles in Sanity are now 100% Published with 0 drafts remaining!');
    } catch (e) {
        console.error('Error publishing articles:', e);
    }
}

publishAllArticles();
