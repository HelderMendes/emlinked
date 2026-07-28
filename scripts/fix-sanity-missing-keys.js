require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');
const crypto = require('crypto');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2024-01-01',
    useCdn: false,
});

function randomKey() {
    return crypto.randomBytes(8).toString('hex');
}

function addKeysRecursively(obj) {
    if (!obj || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
        return obj.map((item) => {
            if (item && typeof item === 'object' && !Array.isArray(item)) {
                if (!item._key) {
                    item._key = randomKey();
                }
                return addKeysRecursively(item);
            }
            return addKeysRecursively(item);
        });
    }

    const newObj = {};
    for (const [key, val] of Object.entries(obj)) {
        newObj[key] = addKeysRecursively(val);
    }
    return newObj;
}

async function fixMissingKeys() {
    console.log("Fetching all documents from Sanity to fix missing _key properties...");
    const docs = await client.fetch(`*[_type in ["page", "solutionPage", "siteSettings"]]`);
    
    let updatedCount = 0;
    for (const doc of docs) {
        const fixedDoc = addKeysRecursively(doc);
        await client.createOrReplace(fixedDoc);
        console.log(`✓ Fixed _key properties for document: ${doc._id} (${doc.title || doc._type})`);
        updatedCount++;
    }

    console.log(`Successfully fixed missing keys across ${updatedCount} Sanity documents!`);
}

fixMissingKeys().catch(console.error);
