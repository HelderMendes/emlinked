const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

async function cleanAppsEnDocument() {
    console.log('🚀 Cleaning duplicate and unused fields in page-apps-en...\n');

    const enDoc = await client.fetch('*[_id == "page-apps-en"][0]');
    if (!enDoc) {
        console.error('❌ Document page-apps-en not found');
        return;
    }

    const cleanedBlocks = enDoc.pageBlocks.map((block) => {
        if (block._type === 'ctaBanner') {
            return {
                _key: block._key || 'apps_cta_en',
                _type: 'ctaBanner',
                tag: block.tag || block.badge || 'START AUTOMATING TODAY',
                title: block.title || 'Ready to modernize your real estate management software?',
                subtitle: block.subtitle || 'Experience how emlinked modular apps cut administrative burden in half and maximize financial control.',
                buttonLabel: block.buttonLabel || block.buttonText || 'Request a free live demo',
                buttonLink: block.buttonLink || '#demo',
                secondaryButtonLabel: block.secondaryButtonLabel || block.secondaryButtonText || 'View pricing & plans ➔',
                secondaryButtonLink: block.secondaryButtonLink || '/prijzen',
            };
        }
        return block;
    });

    await client
        .patch('page-apps-en')
        .set({ pageBlocks: cleanedBlocks })
        .commit();

    console.log('✓ Successfully cleaned page-apps-en in Sanity! Duplicate fields (badge, buttonText, secondaryButtonText) removed.');
}

cleanAppsEnDocument();
