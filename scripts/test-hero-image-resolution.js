import { createClient } from '@sanity/client';
import { getImageUrl } from '../src/sanity/image.ts';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
    apiVersion: '2024-07-01',
});

async function run() {
    const pageData = await client.fetch(
        `*[_type == "page" && (slug.current == "/referenties" || slug.current == "referenties") && language == "nl"][0] {
            title,
            pageBlocks[] {
                ...,
                _type,
                _key,
                image {
                    ...,
                    asset-> {
                        _id,
                        url
                    }
                },
                heroImage {
                    ...,
                    asset-> {
                        _id,
                        url
                    }
                }
            }
        }`,
    );

    const heroBlock = pageData?.pageBlocks?.find((b) => b._type === 'hero');
    console.log('Fetched hero block:', heroBlock);
    const heroImageUrl = getImageUrl(
        heroBlock?.image || heroBlock?.heroImage,
        heroBlock?.imagePath || '/emlinked/referenties/Levi-Bosboom.png',
    );
    console.log('Resolved heroImageUrl:', heroImageUrl);
}

run().catch(console.error);
