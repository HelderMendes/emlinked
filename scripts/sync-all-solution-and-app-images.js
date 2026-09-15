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

async function getOrUploadAsset(rawPath) {
    if (!rawPath || typeof rawPath !== 'string') return null;
    let cleanPath = rawPath.trim();
    if (cleanPath.startsWith('/')) cleanPath = cleanPath.slice(1);

    const localFilePath = path.join(PUBLIC_DIR, cleanPath);
    if (!fs.existsSync(localFilePath)) {
        console.warn(`⚠️ File not found on disk: ${localFilePath}`);
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
        console.log(`  ✅ Uploaded -> ${assetDoc._id}`);
        return imageRefObj;
    } catch (e) {
        console.error(`  ❌ Failed upload ${localFilePath}:`, e.message);
        return null;
    }
}

async function run() {
    console.log(
        '🚀 Starting synchronization of Sanity solution and app images...',
    );

    // 1. Solution Payment (NL & EN)
    const paymentHeroAsset = await getOrUploadAsset(
        'emlinked/apps/payment/payment-software-her0.webp',
    );
    const paymentTab0Asset = await getOrUploadAsset(
        'emlinked/apps/payment/tab01_SEPA-direct-debit-Incasso.jpg',
    );
    const paymentTab1Asset = await getOrUploadAsset(
        'emlinked/apps/payment/tab02_realtime-ankreconciliatie.jpg',
    );
    const paymentTab2Asset = await getOrUploadAsset(
        'emlinked/apps/payment/tab03_storneer-aanmaningsbeheer.jpg',
    );
    const paymentCtaAsset = await getOrUploadAsset(
        'emlinked/apps/payment/automatiseren_payment.jpg',
    );

    for (const docId of ['solution-payment-nl', 'solution-payment-en']) {
        const doc = await client.getDocument(docId);
        if (!doc) {
            console.warn(`Doc not found: ${docId}`);
            continue;
        }
        const blocks = doc.pageBlocks || [];
        for (const block of blocks) {
            if (block._type === 'heroBlock') {
                block.imagePath =
                    '/emlinked/apps/payment/payment-software-her0.webp';
                if (paymentHeroAsset) block.heroImage = paymentHeroAsset;
            }
            if (block._type === 'featureTabsBlock') {
                if (!block.tabs || block.tabs.length === 0) {
                    block.tabs = [{}, {}, {}];
                }
                if (block.tabs[0]) {
                    block.tabs[0].imagePath =
                        '/emlinked/apps/payment/tab01_SEPA-direct-debit-Incasso.jpg';
                    if (paymentTab0Asset)
                        block.tabs[0].image = paymentTab0Asset;
                }
                if (block.tabs[1]) {
                    block.tabs[1].imagePath =
                        '/emlinked/apps/payment/tab02_realtime-ankreconciliatie.jpg';
                    if (paymentTab1Asset)
                        block.tabs[1].image = paymentTab1Asset;
                }
                if (block.tabs[2]) {
                    block.tabs[2].imagePath =
                        '/emlinked/apps/payment/tab03_storneer-aanmaningsbeheer.jpg';
                    if (paymentTab2Asset)
                        block.tabs[2].image = paymentTab2Asset;
                }
            }
            if (block._type === 'ctaBlock') {
                block.imagePath =
                    '/emlinked/apps/payment/automatiseren_payment.jpg';
                if (paymentCtaAsset) block.image = paymentCtaAsset;
            }
        }
        await client.patch(docId).set({ pageBlocks: blocks }).commit();
        console.log(`✅ Patched ${docId}`);
    }

    // 2. Solution Huurdersportaal (NL & EN)
    const portalHeroAsset = await getOrUploadAsset(
        'emlinked/apps/huurdersportaal/Huurdersportaal.webp',
    );
    const portalTab0Asset = await getOrUploadAsset(
        'emlinked/apps/huurdersportaal/tab01_reparatie-onderhoudsbeheer.jpg',
    );
    const portalTab1Asset = await getOrUploadAsset(
        'emlinked/apps/huurdersportaal/tab02_facturen-betalingshistorie.jpg',
    );
    const portalTab2Asset = await getOrUploadAsset(
        'emlinked/apps/huurdersportaal/tab03_centraal-documentenarchief.jpg',
    );
    const portalCtaAsset = await getOrUploadAsset(
        'emlinked/apps/huurdersportaal/automatiseren_huurdersportaal.jpg',
    );

    for (const docId of [
        'solution-huurdersportaal-nl',
        'solution-huurdersportaal-en',
    ]) {
        const doc = await client.getDocument(docId);
        if (!doc) {
            console.warn(`Doc not found: ${docId}`);
            continue;
        }
        const blocks = doc.pageBlocks || [];
        for (const block of blocks) {
            if (block._type === 'heroBlock') {
                block.imagePath =
                    '/emlinked/apps/huurdersportaal/Huurdersportaal.webp';
                if (portalHeroAsset) block.heroImage = portalHeroAsset;
            }
            if (block._type === 'featureTabsBlock') {
                if (!block.tabs || block.tabs.length === 0) {
                    block.tabs = [{}, {}, {}];
                }
                if (block.tabs[0]) {
                    block.tabs[0].imagePath =
                        '/emlinked/apps/huurdersportaal/tab01_reparatie-onderhoudsbeheer.jpg';
                    if (portalTab0Asset) block.tabs[0].image = portalTab0Asset;
                }
                if (block.tabs[1]) {
                    block.tabs[1].imagePath =
                        '/emlinked/apps/huurdersportaal/tab02_facturen-betalingshistorie.jpg';
                    if (portalTab1Asset) block.tabs[1].image = portalTab1Asset;
                }
                if (block.tabs[2]) {
                    block.tabs[2].imagePath =
                        '/emlinked/apps/huurdersportaal/tab03_centraal-documentenarchief.jpg';
                    if (portalTab2Asset) block.tabs[2].image = portalTab2Asset;
                }
            }
            if (block._type === 'architectureBlock') {
                block.imagePath =
                    '/emlinked/apps/huurdersportaal/automatiseren_huurdersportaal.jpg';
                if (portalCtaAsset) block.image = portalCtaAsset;
            }
            if (block._type === 'ctaBlock') {
                block.imagePath =
                    '/emlinked/apps/huurdersportaal/automatiseren_huurdersportaal.jpg';
                if (portalCtaAsset) block.image = portalCtaAsset;
            }
        }
        await client.patch(docId).set({ pageBlocks: blocks }).commit();
        console.log(`✅ Patched ${docId}`);
    }

    // 3. Solution Vastgoedbeheer Software (NL & EN)
    const vgHeroAsset = await getOrUploadAsset(
        'emlinked/apps/vastgoedbeheer-software/geautomatiseerde-business-central.png',
    );
    const vgTab0Asset = await getOrUploadAsset(
        'emlinked/apps/vastgoedbeheer-software/tab01-indexaties.jpg',
    );
    const vgTab1Asset = await getOrUploadAsset(
        'emlinked/apps/vastgoedbeheer-software/tab02-dynamisch.jpg',
    );
    const vgTab2Asset = await getOrUploadAsset(
        'emlinked/apps/vastgoedbeheer-software/tab03_servicekosten.jpg',
    );
    const vgArchAsset = await getOrUploadAsset(
        'emlinked/apps/vastgoedbeheer-software/native_vastgoedsoftware.jpg',
    );
    const vgCtaAsset = await getOrUploadAsset(
        'emlinked/apps/vastgoedbeheer-software/automatiseren_vastgoedbehher.jpg',
    );

    for (const docId of [
        'solution-vastgoedbeheer-software-nl',
        'solution-vastgoedbeheer-software-en',
    ]) {
        const doc = await client.getDocument(docId);
        if (!doc) {
            console.warn(`Doc not found: ${docId}`);
            continue;
        }
        const blocks = doc.pageBlocks || [];
        for (const block of blocks) {
            if (block._type === 'heroBlock') {
                block.imagePath =
                    '/emlinked/apps/vastgoedbeheer-software/geautomatiseerde-business-central.png';
                if (vgHeroAsset) block.heroImage = vgHeroAsset;
            }
            if (block._type === 'featureTabsBlock') {
                if (!block.tabs || block.tabs.length < 3) {
                    block.tabs = [
                        block.tabs?.[0] || {},
                        block.tabs?.[1] || {},
                        block.tabs?.[2] || {
                            _key: 'tab_servicekosten',
                            tabId: 'service',
                            tabTitle: docId.includes('-en')
                                ? '3. Service Charges'
                                : '3. Servicekosten',
                            title: docId.includes('-en')
                                ? 'Service Charges & Subsidy Settlements'
                                : 'Servicekosten & Subsidieafrekeningen',
                            text: docId.includes('-en')
                                ? 'Transparent service charge settlements.'
                                : 'Bepaal, voorschot en verreken servicekosten transparant.',
                        },
                    ];
                }
                if (block.tabs[0]) {
                    block.tabs[0].imagePath =
                        '/emlinked/apps/vastgoedbeheer-software/tab01-indexaties.jpg';
                    if (vgTab0Asset) block.tabs[0].image = vgTab0Asset;
                }
                if (block.tabs[1]) {
                    block.tabs[1].imagePath =
                        '/emlinked/apps/vastgoedbeheer-software/tab02-dynamisch.jpg';
                    if (vgTab1Asset) block.tabs[1].image = vgTab1Asset;
                }
                if (block.tabs[2]) {
                    block.tabs[2].imagePath =
                        '/emlinked/apps/vastgoedbeheer-software/tab03_servicekosten.jpg';
                    if (vgTab2Asset) block.tabs[2].image = vgTab2Asset;
                }
            }
            if (block._type === 'architectureBlock') {
                block.imagePath =
                    '/emlinked/apps/vastgoedbeheer-software/native_vastgoedsoftware.jpg';
                if (vgArchAsset) block.image = vgArchAsset;
            }
            if (block._type === 'ctaBlock') {
                block.imagePath =
                    '/emlinked/apps/vastgoedbeheer-software/automatiseren_vastgoedbehher.jpg';
                if (vgCtaAsset) block.image = vgCtaAsset;
            }
        }
        await client.patch(docId).set({ pageBlocks: blocks }).commit();
        console.log(`✅ Patched ${docId}`);
    }

    // 4. Apps Overview Pages (page-apps-nl & page-apps-en)
    const app0BadgeAsset = await getOrUploadAsset(
        'emlinked/apps/vastgoedbeheer.png',
    );
    const app1BadgeAsset = await getOrUploadAsset(
        'emlinked/apps/huurdersportaal.png',
    );
    const app2BadgeAsset = await getOrUploadAsset(
        'emlinked/apps/payment_engine.png',
    );
    const appsDiagramAsset = await getOrUploadAsset(
        'emlinked/apps/naadloze-intergratie.png',
    );
    const appsCalloutAsset = await getOrUploadAsset(
        'emlinked/apps/samenwerken-binnen-ERP.jpg',
    );
    const appsBgAsset = await getOrUploadAsset(
        'emlinked/apps/bg_naadloze_integratie_section.jpg',
    );
    const appsCtaAsset = await getOrUploadAsset(
        'emlinked/apps/bewezen_resultaat.png',
    );

    for (const docId of ['page-apps-nl', 'page-apps-en']) {
        const doc = await client.getDocument(docId);
        if (!doc) continue;
        const blocks = doc.pageBlocks || [];
        for (const block of blocks) {
            if (block._type === 'featuresList' && block.features) {
                if (block.features[0]) {
                    block.features[0].iconPath =
                        '/emlinked/apps/vastgoedbeheer.png';
                    if (app0BadgeAsset)
                        block.features[0].iconImage = app0BadgeAsset;
                }
                if (block.features[1]) {
                    block.features[1].iconPath =
                        '/emlinked/apps/huurdersportaal.png';
                    if (app1BadgeAsset)
                        block.features[1].iconImage = app1BadgeAsset;
                }
                if (block.features[2]) {
                    block.features[2].iconPath =
                        '/emlinked/apps/payment_engine.png';
                    if (app2BadgeAsset)
                        block.features[2].iconImage = app2BadgeAsset;
                }
            }
            if (block._type === 'architectureSection') {
                block.diagramImagePath =
                    '/emlinked/apps/naadloze-intergratie.png';
                if (appsDiagramAsset) block.diagramImage = appsDiagramAsset;
                block.calloutImagePath =
                    '/emlinked/apps/samenwerken-binnen-ERP.jpg';
                if (appsCalloutAsset) block.calloutImage = appsCalloutAsset;
                block.bgImagePath =
                    '/emlinked/apps/bg_naadloze_integratie_section.jpg';
                if (appsBgAsset) block.bgImage = appsBgAsset;
            }
            if (block._type === 'ctaBanner') {
                block.imagePath = '/emlinked/apps/bewezen_resultaat.png';
                if (appsCtaAsset) block.image = appsCtaAsset;
            }
        }
        await client.patch(docId).set({ pageBlocks: blocks }).commit();
        console.log(`✅ Patched ${docId}`);
    }

    console.log(
        '🎉 All solution and app page blocks successfully synchronized with Sanity CDN assets!',
    );
}

run().catch(console.error);
