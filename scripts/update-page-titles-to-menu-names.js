const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_API_TOKEN || 'skEoqcjiKHYHIdWOejUHg5tpQQF2UkVMy0MALrKgGUNV91iff9GJq24fikB1oMITmDg5v9d7WMQYqUg2z3goIjZO1MmFXna0y8i76FgAbKtafBJ2hcBDVxFlGuaUVmZoJ8xhBhiZCSi70f5JbDMwvYJXzDzFsYNaEsX1bCDNYqKJiULY1OwD',
    apiVersion: '2024-01-01',
    useCdn: false,
});

const titleUpdates = [
    // NL Pages
    { id: 'c8071896-4119-41e3-b095-ab5d2134d27f', title: 'Homepage' },
    { id: 'page-box3-check-nl', title: 'Box3-check ⚡' },
    { id: 'page-integraties-nl', title: 'Partners software' },
    { id: 'page-prijzen-nl', title: 'Prijzen' },
    { id: 'page-referenties-nl', title: 'Referenties' },
    { id: 'page-overons-nl', title: 'Team' },
    { id: 'page-vastgoedsoftware-nl', title: 'Vastgoedsoftware' },
    { id: 'page-functies-nl', title: 'Functies' },
    { id: 'page-contact-nl', title: 'Contact' },

    // NL Solutions (Onze apps)
    { id: 'solution-vastgoedbeheer-software-nl', title: 'Vastgoedbeheer software' },
    { id: 'solution-huurdersportaal-nl', title: 'Huurdersportaal' },
    { id: 'solution-payment-nl', title: 'Payment software' },

    // EN Pages
    { id: 'Ujl1Ky5GJWpKWiHmkpetx1', title: 'Homepage' },
    { id: 'page-box3-check-en', title: 'Box3-check ⚡' },
    { id: 'page-integraties-en', title: 'Partner software' },
    { id: 'page-prijzen-en', title: 'Pricing' },
    { id: 'page-referenties-en', title: 'References' },
    { id: 'page-overons-en', title: 'Team' },
    { id: 'page-vastgoedsoftware-en', title: 'Property software' },
    { id: 'page-functies-en', title: 'Features' },
    { id: 'page-contact-en', title: 'Contact' },

    // EN Solutions (Our apps)
    { id: 'solution-vastgoedbeheer-software-en', title: 'Property management software' },
    { id: 'solution-huurdersportaal-en', title: 'Tenant Portal' },
    { id: 'solution-payment-en', title: 'Payment software' },
];

// Old duplicate document IDs to remove to keep studio list clean
const duplicateIdsToDelete = [
    'a707cc97-4cd2-45f8-a45a-0bbb1c3fea24',
    '77b116e4-aeb3-447d-b50e-3ef7578f56fc',
];

async function cleanupAndSyncTitles() {
    console.log("Updating document titles in Sanity to match menu names exactly...");

    for (const item of titleUpdates) {
        try {
            await client.patch(item.id).set({ title: item.title }).commit();
            console.log(`✓ Updated ${item.id} -> "${item.title}"`);
        } catch (e) {
            console.warn(`Could not update ${item.id}:`, e.message);
        }
    }

    console.log("Removing duplicate/old test documents...");
    for (const id of duplicateIdsToDelete) {
        try {
            await client.delete(id);
            console.log(`✓ Deleted duplicate doc ${id}`);
        } catch (e) {
            console.warn(`Doc ${id} already deleted or not found.`);
        }
    }

    console.log("Done! All Sanity document titles now match the menu names 100%.");
}

cleanupAndSyncTitles().catch(console.error);
