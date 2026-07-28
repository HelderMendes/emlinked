const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_API_TOKEN || 'skEoqcjiKHYHIdWOejUHg5tpQQF2UkVMy0MALrKgGUNV91iff9GJq24fikB1oMITmDg5v9d7WMQYqUg2z3goIjZO1MmFXna0y8i76FgAbKtafBJ2hcBDVxFlGuaUVmZoJ8xhBhiZCSi70f5JbDMwvYJXzDzFsYNaEsX1bCDNYqKJiULY1OwD',
    apiVersion: '2024-01-01',
    useCdn: false,
});

async function checkHomepage() {
    const nlHome = await client.fetch(`*[_id == "c8071896-4119-41e3-b095-ab5d2134d27f"][0]`);
    console.log("NL Homepage pageBlocks:", JSON.stringify(nlHome?.pageBlocks, null, 2));
}

checkHomepage().catch(console.error);
