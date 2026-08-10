const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

async function syncEnHomepage() {
    console.log(
        '🚀 Updating English Homepage document (Ujl1Ky5GJWpKWiHmkpetx1) in Sanity...\n',
    );

    const enHomepageData = {
        title: 'Homepage',
        seo: {
            _type: 'seoFields',
            seoTitle:
                'emlinked — Professional Real Estate Management Software for Microsoft BC',
            seoDescription:
                'Manage your real estate portfolio natively inside Microsoft Dynamics 365 Business Central. Automated CPI indexation, SEPA direct debits, and real-time bank reconciliation.',
        },
        pageBlocks: [
            {
                _key: 'hero_nl',
                _type: 'hero',
                label: 'MICROSOFT DYNAMICS 365 BC NATIVE',
                title: 'Your real estate portfolio always *automatically* tax & audit ready',
                subtitle:
                    'Manage your lease agreements, operating costs, and financial accounting natively in one unified system. Purpose-built for real estate portfolios of 50+ units. Fully integrated with Microsoft Business Central.',
                ctaLabel: 'Request free demo',
                ctaLink: '/en/contact',
                secondaryCtaLabel: 'Property Management',
                secondaryCtaLink: '/en/apps/property-management-software',
                showProof: true,
                proofText:
                    'Trusted by professional real estate managers & investors across Europe',
                cardTitle: 'Real Estate ERP Core',
                cardStats: [
                    {
                        _key: 'stat1',
                        label: 'Automated Reconciliation',
                        value: '100%',
                        badgeText: 'Live Bank Feed',
                        badgeType: 'success',
                    },
                    {
                        _key: 'stat2',
                        label: 'CPI Indexation Time',
                        value: '< 2 min',
                        badgeText: 'Auto-Calculated',
                        badgeType: 'warning',
                    },
                    {
                        _key: 'stat3',
                        label: 'Time Saved per Month',
                        value: '15+ hrs',
                        badgeText: 'Automated Workflow',
                        badgeType: 'info',
                    },
                ],
            },
            {
                _key: 'trustbar_nl',
                _type: 'trustBar',
                items: [
                    {
                        _key: 't1',
                        icon: 'shield',
                        text: 'Built natively on Microsoft Business Central',
                    },
                    {
                        _key: 't2',
                        icon: 'check',
                        text: 'Real-time bank reconciliation & direct matching',
                    },
                    {
                        _key: 't3',
                        icon: 'star',
                        text: 'Single source of truth for all operational data',
                    },
                ],
            },
            {
                _key: 'features-core-block',
                _type: 'featuresList',
                sectionTag: 'MODULAR & FLEXIBLE',
                sectionTitle: 'Three powerful apps, one seamless workflow',
                sectionSubtitle:
                    'Our applications work together seamlessly to close the gap between your daily operational tasks and your core financial ledger. Select the modules that optimize your property management.',
                features: [
                    {
                        _key: 'app1',
                        title: 'Property Management',
                        description:
                            'From property assets and lease agreements to CPI indexations and lease renewals: automate recurring tasks and dispatch rent adjustments automatically via email. Invoices featuring QR codes and payment links help tenants pay faster, while overdue items trigger instant reminder flows. Expenses are automatically allocated across rental units, and bank transactions match directly against open invoices — keeping your general ledger accurate 24/7.',
                        icon: 'trending-up',
                        imagePath:
                            '/emlinked/home/DrieKrachtigeApps_VastgoedbeheerSoftware.png',
                    },
                    {
                        _key: 'app2',
                        title: 'Tenant Portal',
                        description:
                            'Through the self-service portal, tenants enjoy 24/7 access to their lease account. They can easily review and download invoices, contract documents, and lease agreements, as well as submit repair requests with photos. All tickets and communication are logged centrally, providing clear visibility on progress and speeding up resolution.',
                        icon: 'file-text',
                        imagePath: '/emlinked/home/Huurdersportaal.png',
                    },
                    {
                        _key: 'app3',
                        title: 'Payment software Paylinked',
                        description:
                            'Easily embed QR codes and payment links onto your rent invoices so tenants can pay quickly and securely. This eliminates manual entry errors, accelerates receivables, and improves your monthly cash flow.',
                        icon: 'cpu',
                        imagePath:
                            '/emlinked/home/DrieKrachtigeApps_PaymentSoftware.png',
                    },
                ],
            },
            {
                _key: 'integrations-partner-block',
                _type: 'integrationsList',
                sectionTag: 'ERP INTEGRATION',
                sectionTitle:
                    'Native connection with Microsoft Dynamics 365 Business Central',
                sectionSubtitle:
                    'Many platforms promise an integration, but emlinked runs natively inside your ERP environment. That means zero manual CSV exports, no complex API sync errors, and absolute data integrity. Every operational entry lands directly as a validated journal post in your ledger.',
                integrations: [
                    {
                        _key: 'i1',
                        title: 'Business Central',
                        badge: 'ERP Core',
                        description:
                            'Manage your complete financial administration and real estate portfolio within one integrated environment. From lease administration and contract management to invoice processing, bank feeds, and reporting.',
                        statusText: 'Core Database',
                        footerSpec: 'Direct DB Schema',
                        imagePlaceholder: 'business-central',
                    },
                    {
                        _key: 'i2',
                        title: 'Document Capture',
                        badge: 'Efficient Invoice Processing',
                        description:
                            'Save time and eliminate errors with intelligent OCR that automatically recognizes invoice data inside Business Central. Purchase invoices are routed straight to approval workflows.',
                        statusText: 'Auto-Matching',
                        footerSpec: 'Continia OCR Engine',
                        imagePlaceholder: 'document-capture',
                    },
                    {
                        _key: 'i3',
                        title: 'Direct Banking',
                        badge: 'PSD2 Bank Feed',
                        description:
                            'Securely connect your bank for automatic statement reconciliation and streamlined payment processing. Bank statements flow automatically into Business Central — reducing processing time by up to 80%.',
                        statusText: 'Live Reconciled',
                        footerSpec: 'PSD2 / ISO 20022',
                        imagePlaceholder: 'direct-banking',
                    },
                ],
            },
            {
                _key: 'box3-check-lead-magnet',
                _type: 'featuresList',
                sectionTag: 'PORTFOLIO HEALTH',
                sectionTitle:
                    'Want certainty over your real estate portfolio? Run the Box 3 Check ⚡',
                sectionSubtitle:
                    'Evolving fiscal regulations around real estate assets require proactive portfolio management. Is your portfolio structured optimally for current tax standards? Our integrated calculator provides immediate clarity.',
                features: [
                    {
                        _key: 'b1',
                        title: 'Assess your fiscal status in under 2 minutes.',
                        description:
                            'Gain instant insight into your portfolio structure and tax leverage.',
                        icon: 'check',
                    },
                    {
                        _key: 'b2',
                        title: 'Receive an actionable optimization report.',
                        description:
                            'Clear recommendations ready for discussion with your tax advisor.',
                        icon: 'check',
                    },
                    {
                        _key: 'b3',
                        title: 'Maximize deductibility of management costs.',
                        description:
                            'Discover how to allocate operational expenses efficiently.',
                        icon: 'check',
                    },
                ],
            },
            {
                _key: 'cta-bottom-block',
                _type: 'ctaBanner',
                tag: 'DIGITALIZATION',
                title: 'Ready to digitize your property management?',
                subtitle:
                    'Join leading property managers who eliminated manual tasks and chose 100% real-time control within emlinked.',
                buttonLabel: 'Request a free demo',
                buttonLink: '/en/contact',
            },
        ],
    };

    try {
        const res = await client
            .patch('Ujl1Ky5GJWpKWiHmkpetx1')
            .set(enHomepageData)
            .commit();
        console.log(
            '✅ Successfully updated EN Homepage document in Sanity:',
            res._id,
        );
    } catch (e) {
        console.error('❌ Failed to update EN Homepage document:', e);
    }
}

syncEnHomepage();
