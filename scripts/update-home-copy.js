require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-07-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

async function updateHomeCopy() {
    console.log('Checking for homepage documents in Sanity...');

    const query = `*[_type == "page" && slug.current == "home"]`;
    try {
        const homes = await client.fetch(query);
        console.log(`Found ${homes.length} homepage document(s).`);

        // Structure for Dutch Homepage
        const nlHeroBlock = {
            _type: 'hero',
            _key: 'hero_nl',
            label: 'NATIVE VASTGOEDMODULE VOOR DYNAMICS 365 BUSINESS CENTRAL',
            title: 'Vastgoedbeheer en financiële administratie *native* in één systeem',
            subtitle:
                'Emlinked automatiseert huurovereenkomsten, CPI-indexaties en bankreconciliatie rechtstreeks binnen Microsoft Dynamics. Geen losse databases, geen handmatige exports, maar 100% realtime controle.',
            ctaLabel: 'Demo inplannen',
            ctaLink: '#demo',
            secondaryCtaLabel: 'Koppeling ontdekken',
            secondaryCtaLink: '/integraties',
            showProof: true,
            proofText: 'Vertrouwd door professionele vastgoedbeheerders',
            cardTitle: 'LIVE PORTFOLIO METRICS',
            cardStats: [
                {
                    _key: 's1',
                    label: 'Foutloze CPI-Indexatie',
                    value: '100%',
                    badgeText: 'Geautomatiseerd',
                    badgeType: 'good',
                },
                {
                    _key: 's2',
                    label: 'Bankaflettering (PSD2)',
                    value: 'Direct',
                    badgeText: 'Reconciliatie',
                    badgeType: 'blue',
                },
                {
                    _key: 's3',
                    label: 'Business Central Boekingen',
                    value: 'Native',
                    badgeText: 'Grootboek-synchroon',
                    badgeType: 'warn',
                },
            ],
        };

        const nlTrustBarBlock = {
            _type: 'trustBar',
            _key: 'trustbar_nl',
            items: [
                {
                    _key: 't1',
                    text: 'Native Dynamics 365 Module',
                    icon: 'shield',
                },
                {
                    _key: 't2',
                    text: 'Realtime Bankreconciliatie',
                    icon: 'check',
                },
                { _key: 't3', text: '100% Data-integriteit', icon: 'star' },
            ],
        };

        // Structure for English Homepage
        const enHeroBlock = {
            _type: 'hero',
            _key: 'hero_en',
            label: 'NATIVE PROPERTY MODULE FOR DYNAMICS 365 BUSINESS CENTRAL',
            title: 'Property management and financial accounting *native* in one system',
            subtitle:
                'Emlinked automates leases, CPI indexations, and bank reconciliation directly within Microsoft Dynamics. No separate databases, no manual exports, but 100% real-time control.',
            ctaLabel: 'Book a Demo',
            ctaLink: '#demo',
            secondaryCtaLabel: 'Discover Integration',
            secondaryCtaLink: '/integraties',
            showProof: true,
            proofText: 'Trusted by professional real estate managers',
            cardTitle: 'LIVE PORTFOLIO METRICS',
            cardStats: [
                {
                    _key: 's1',
                    label: 'Error-free CPI Indexation',
                    value: '100%',
                    badgeText: 'Automated',
                    badgeType: 'good',
                },
                {
                    _key: 's2',
                    label: 'Bank Reconciliation (PSD2)',
                    value: 'Direct',
                    badgeText: 'Reconciled',
                    badgeType: 'blue',
                },
                {
                    _key: 's3',
                    label: 'Business Central Postings',
                    value: 'Native',
                    badgeText: 'Ledger Sync',
                    badgeType: 'warn',
                },
            ],
        };

        const enTrustBarBlock = {
            _type: 'trustBar',
            _key: 'trustbar_en',
            items: [
                {
                    _key: 't1',
                    text: 'Native Dynamics 365 Module',
                    icon: 'shield',
                },
                {
                    _key: 't2',
                    text: 'Real-time Bank Reconciliation',
                    icon: 'check',
                },
                { _key: 't3', text: '100% Data Integrity', icon: 'star' },
            ],
        };

        // If documents don't exist, we will create them. If they do, we will update their blocks.
        const nlHome = homes.find((h) => h.language === 'nl');
        if (nlHome) {
            console.log('Updating Dutch homepage copy in Sanity...');
            // Keep other blocks, but replace hero and trustBar if found or insert them at start
            let blocks = nlHome.pageBlocks || [];
            // Remove old hero and trustBar fallback items if matching keys exist, or filter them out
            blocks = blocks.filter(
                (b) => b._type !== 'hero' && b._type !== 'trustBar',
            );
            blocks.unshift(nlHeroBlock, nlTrustBarBlock);

            await client.patch(nlHome._id).set({ pageBlocks: blocks }).commit();
            console.log('Dutch homepage copy updated!');
        } else {
            console.log('Creating Dutch homepage document in Sanity...');
            const doc = {
                _type: 'page',
                title: 'Home',
                slug: { _type: 'slug', current: 'home' },
                language: 'nl',
                pageBlocks: [nlHeroBlock, nlTrustBarBlock],
                seo: {
                    seoTitle:
                        'Emlinked | Vastgoedsoftware voor Business Central',
                    seoDescription:
                        'Emlinked helpt vastgoedprofessionals met software voor commercieel portefeuillebeheer in Microsoft Business Central.',
                    noIndex: false,
                },
            };
            await client.create(doc);
            console.log('Dutch homepage document created!');
        }

        const enHome = homes.find((h) => h.language === 'en');
        if (enHome) {
            console.log('Updating English homepage copy in Sanity...');
            let blocks = enHome.pageBlocks || [];
            blocks = blocks.filter(
                (b) => b._type !== 'hero' && b._type !== 'trustBar',
            );
            blocks.unshift(enHeroBlock, enTrustBarBlock);

            await client.patch(enHome._id).set({ pageBlocks: blocks }).commit();
            console.log('English homepage copy updated!');
        } else {
            console.log('Creating English homepage document in Sanity...');
            const doc = {
                _type: 'page',
                title: 'Home EN',
                slug: { _type: 'slug', current: 'home' },
                language: 'en',
                pageBlocks: [enHeroBlock, enTrustBarBlock],
                seo: {
                    seoTitle:
                        'Emlinked | Property Software for Business Central',
                    seoDescription:
                        'Emlinked assists real estate professionals with native commercial portfolio management in Microsoft Business Central.',
                    noIndex: false,
                },
            };
            await client.create(doc);
            console.log('English homepage document created!');
        }
    } catch (e) {
        console.error('Error updating homepage copy in Sanity:', e);
    }
}

updateHomeCopy();
