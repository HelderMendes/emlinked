require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-07-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const uploadedAssetsCache = new Map();

// Helper to resolve clean path & upload asset to Sanity CDN
async function getOrUploadAsset(rawPath) {
    if (!rawPath || typeof rawPath !== 'string') return null;

    let cleanPath = rawPath.trim();
    if (!cleanPath) return null;

    // Handle known path aliases/remappings if any
    if (cleanPath.startsWith('/')) {
        cleanPath = cleanPath.slice(1);
    }

    const localFilePath = path.join(PUBLIC_DIR, cleanPath);
    if (!fs.existsSync(localFilePath)) {
        console.warn(
            `⚠️ File not found on disk: ${localFilePath} (from string: ${rawPath})`,
        );
        return null;
    }

    if (uploadedAssetsCache.has(localFilePath)) {
        return uploadedAssetsCache.get(localFilePath);
    }

    console.log(`📤 Uploading asset to Sanity CDN: ${cleanPath}...`);
    try {
        const stream = fs.createReadStream(localFilePath);
        const filename = path.basename(localFilePath);
        const assetDoc = await client.assets.upload('image', stream, {
            filename,
        });
        const imageRefObj = {
            _type: 'image',
            asset: {
                _type: 'reference',
                _ref: assetDoc._id,
            },
        };
        uploadedAssetsCache.set(localFilePath, imageRefObj);
        console.log(`  ✅ Uploaded successfully -> Asset ID: ${assetDoc._id}`);
        return imageRefObj;
    } catch (e) {
        console.error(`  ❌ Failed to upload ${localFilePath}:`, e.message);
        return null;
    }
}

async function processBlock(block) {
    if (!block || typeof block !== 'object') return block;

    let updated = false;

    // 1. Block-level image fields
    if (block.imagePath && !block.image) {
        const assetObj = await getOrUploadAsset(block.imagePath);
        if (assetObj) {
            block.image = assetObj;
            updated = true;
        }
    }

    if (block.heroImagePath && !block.heroImage) {
        const assetObj = await getOrUploadAsset(block.heroImagePath);
        if (assetObj) {
            block.heroImage = assetObj;
            updated = true;
        }
    }

    if (block.bgImagePath && !block.bgImage) {
        const assetObj = await getOrUploadAsset(block.bgImagePath);
        if (assetObj) {
            block.bgImage = assetObj;
            updated = true;
        }
    }

    // fiscalContext callout
    if (block.fiscalContext && typeof block.fiscalContext === 'object') {
        if (block.fiscalContext.imagePath && !block.fiscalContext.image) {
            const assetObj = await getOrUploadAsset(
                block.fiscalContext.imagePath,
            );
            if (assetObj) {
                block.fiscalContext.image = assetObj;
                updated = true;
            }
        }
    }

    // 2. Array items in blocks
    // Features list (homepage & apps)
    if (Array.isArray(block.features)) {
        for (const feature of block.features) {
            if (feature.imagePath && !feature.image) {
                const assetObj = await getOrUploadAsset(feature.imagePath);
                if (assetObj) {
                    feature.image = assetObj;
                    updated = true;
                }
            }
            if (feature.iconPath && !feature.iconImage) {
                const assetObj = await getOrUploadAsset(feature.iconPath);
                if (assetObj) {
                    feature.iconImage = assetObj;
                    updated = true;
                }
            }
        }
    }

    // Items array (workflow / trustBar / pain points)
    if (Array.isArray(block.items)) {
        for (const item of block.items) {
            if (item.photoPath && !item.photo) {
                const assetObj = await getOrUploadAsset(item.photoPath);
                if (assetObj) {
                    item.photo = assetObj;
                    updated = true;
                }
            }
            if (item.logoPath && !item.logo) {
                const assetObj = await getOrUploadAsset(item.logoPath);
                if (assetObj) {
                    item.logo = assetObj;
                    updated = true;
                }
            }
            if (item.imagePath && !item.image) {
                const assetObj = await getOrUploadAsset(item.imagePath);
                if (assetObj) {
                    item.image = assetObj;
                    updated = true;
                }
            }
        }
    }

    // Integrations array
    if (Array.isArray(block.integrations)) {
        for (const integration of block.integrations) {
            if (integration.imagePlaceholder && !integration.image) {
                const assetObj = await getOrUploadAsset(
                    integration.imagePlaceholder,
                );
                if (assetObj) {
                    integration.image = assetObj;
                    updated = true;
                }
            }
        }
    }

    // Partners array
    if (Array.isArray(block.partners)) {
        for (const partner of block.partners) {
            if (partner.logoUrl && !partner.logo) {
                const assetObj = await getOrUploadAsset(partner.logoUrl);
                if (assetObj) {
                    partner.logo = assetObj;
                    updated = true;
                }
            }
        }
    }

    // Members array (team)
    if (Array.isArray(block.members)) {
        for (const member of block.members) {
            if (member.photoPath && !member.image) {
                const assetObj = await getOrUploadAsset(member.photoPath);
                if (assetObj) {
                    member.image = assetObj;
                    updated = true;
                }
            }
        }
    }

    // Feature tabs array (solution pages)
    if (Array.isArray(block.tabs)) {
        for (const tab of block.tabs) {
            if (tab.imagePath && !tab.image) {
                const assetObj = await getOrUploadAsset(tab.imagePath);
                if (assetObj) {
                    tab.image = assetObj;
                    updated = true;
                }
            }
        }
    }

    return block;
}

async function run() {
    console.log(
        '🚀 Starting Sanity CDN image asset upload & linking migration...',
    );
    const documents = await client.fetch(
        `*[_type in ["page", "solutionPage"]]`,
    );
    console.log(`📋 Found ${documents.length} document(s) in Sanity.`);

    for (const doc of documents) {
        console.log(
            `\n📄 Processing Document: ID = "${doc._id}", Title = "${doc.title}", Lang = "${doc.language}"`,
        );

        let docModified = false;
        const blocks = doc.pageBlocks || [];

        for (let i = 0; i < blocks.length; i++) {
            const originalBlockJson = JSON.stringify(blocks[i]);
            await processBlock(blocks[i]);
            if (JSON.stringify(blocks[i]) !== originalBlockJson) {
                docModified = true;
            }
        }

        if (docModified) {
            console.log(`  💾 Patching document in Sanity: ${doc._id}...`);
            await client.patch(doc._id).set({ pageBlocks: blocks }).commit();
            console.log(`  ✅ Successfully patched ${doc._id}`);
        } else {
            console.log(
                `  ℹ️ No missing image assets to upload for ${doc._id}`,
            );
        }
    }

    console.log(
        '\n🎉 Migration complete! All images uploaded to Sanity CDN and linked to page blocks.',
    );
}

run().catch((err) => {
    console.error('💥 Migration failed:', err);
    process.exit(1);
});
