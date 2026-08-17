import { createClient } from '@sanity/client';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
    apiVersion: '2024-07-01',
});

async function run() {
    const docs = await client.fetch(
        `*[_type == "page" && (slug.current == "/referenties" || slug.current == "referenties" || _id == "drafts.page-referenties-nl")]`,
    );
    console.log('Docs found:', docs.length);
    for (const doc of docs) {
        console.log(
            '\n--- Document ID:',
            doc._id,
            '(language:',
            doc.language,
            ')',
        );
        const heroBlock = doc.pageBlocks?.find((b) => b._type === 'hero');
        console.log('Hero block:', JSON.stringify(heroBlock, null, 2));
    }
}

run().catch(console.error);
