require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-07-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

const nlData = {
    _type: 'page',
    title: 'Over emlinked: Onze missie, visie & team',
    language: 'nl',
    slug: { _type: 'slug', current: 'over-ons' },
    seo: {
        seoTitle: 'Over emlinked | Onze Missie, Kernwaarden & Team Specialisten',
        seoDescription: 'Maak kennis met het team van emlinked. Mensgerichte interim & werving oplossingen met impact gekoppeld aan diepgaande vastgoed- en Business Central expertise.',
        canonical: 'https://emlinked.com/over-ons',
        noIndex: false,
    },
    pageBlocks: [
        {
            _type: 'heroBlock',
            _key: 'hero_over_ons_nl',
            badge: 'MENSGERICHT RECRUITMENT & SAAS',
            tagline: 'Mensgerichte Interim & Werving Oplossingen met Impact.',
            description: 'Wij verbinden toptalent en toonaangevende organisaties binnen de publieke en private sector door scherpe vakkennis, transparantie en een duurzame visie.',
            ctaLabel: 'Neem direct contact op',
            ctaLink: '#demo',
            secondaryCtaLabel: 'Bekijk onze oplossingen →',
            secondaryCtaLink: '/apps',
            proofText: 'Vertrouwd door professionele organisaties, vastgoedbeheerders en IT-leiders',
        },
        {
            _type: 'workflow',
            _key: 'mission_over_ons_nl',
            badge: 'ARCHITECTING MEANINGFUL MATCHES',
            title: 'De arbeidsmarkt vraagt om meer dan snelle transacties; het vereist strategische synergie.',
            subtitle: 'Bij emlinked combineren we diepgaande sectorkennis met geavanceerde wervingsmethodieken om professionals en opdrachtgevers naadloos te synchroniseren. Onze focus ligt op duurzame inzetbaarheid, wederzijdse groei en concrete resultaten binnen complexe interim- en vaste vraagstukken.',
        },
        {
            _type: 'trustBar',
            _key: 'values_over_ons_nl',
            title: 'Onze Kernwaarden',
            subtitle: 'De fundamenten van onze transparante en datagedreven werkwijze.',
            logos: [
                {
                    _key: 'val-1',
                    name: 'Transparantie & Integriteit',
                    subtitle: 'Geen vage beloftes, maar datagedreven en eerlijke communicatie in elk stadium van het recruitment- en softwareproces.',
                },
                {
                    _key: 'val-2',
                    name: 'Sectorspecifieke Expertise',
                    subtitle: 'Diepe domeinkennis binnen overheid, onderwijs, zorg, vastgoed en het bedrijfsleven garandeert trefzekere plaatsingen.',
                },
                {
                    _key: 'val-3',
                    name: 'Wendbaarheid & Maatwerk',
                    subtitle: 'Proactieve sourcing en flexibele interim-oplossingen die direct inspelen op veranderende organisatiebehoeften.',
                },
            ],
        },
        {
            _type: 'teamBlock',
            _key: 'team_over_ons_nl',
            sectionTitle: 'De specialisten achter de verbinding',
            sectionSubtitle: 'Ons multidisciplinaire team combineert executive search, recruitment automation en persoonlijke begeleiding om de juiste match te realiseren.',
            members: [
                {
                    _key: 'member-raymond',
                    name: 'Raymond Perridon',
                    role: 'Founder & Managing Partner',
                    focusArea: 'Executive Leadership & Strategie',
                    badge: 'Managing Partner',
                    photoPath: '/emlinked/team/RaymondPerridon.jpg',
                    bio: 'Oprichter en strategisch leider van emlinked. Met een brede visie op de veranderende arbeidsmarkt en vastgoedsector verbindt hij organisaties met hoogwaardig interim- en vast talent.',
                    linkedin: 'https://www.linkedin.com/company/emlinked/',
                    email: 'info@emlinked.com',
                },
                {
                    _key: 'member-iryna',
                    name: 'Iryna Samiliak',
                    role: 'Executive Recruitment & Operations Lead',
                    focusArea: 'Executive Search & Werving',
                    badge: 'Executive Search',
                    photoPath: '/emlinked/team/Iryna.jpg',
                    bio: 'Gespecialiseerd in het verbinden van C-level en senior talent binnen snelgroeiende organisaties. Combineert data-gedreven wervingsmethodieken met een persoonlijke, transparante aanpak.',
                    linkedin: 'https://www.linkedin.com/company/emlinked/',
                    email: 'info@emlinked.com',
                },
                {
                    _key: 'member-thorwald',
                    name: 'Thorwald',
                    role: 'Senior Interim Recruitment Specialist',
                    focusArea: 'Publieke & Private Sector Interim',
                    badge: 'Interim Management',
                    photoPath: '/emlinked/team/Thorwald.jpg',
                    bio: 'Focus op complexe interim vraagstukken binnen de overheid, zorg en vastgoed. Zorgt voor snelle schaalbaarheid en trefzekere interim plaatsingen met directe impact.',
                    linkedin: 'https://www.linkedin.com/company/emlinked/',
                    email: 'info@emlinked.com',
                },
                {
                    _key: 'member-manfred',
                    name: 'Manfred',
                    role: 'Business Central & Finance Consultant',
                    focusArea: 'ERP & Financiële Automatisering',
                    badge: 'Finance & ERP',
                    photoPath: '/emlinked/team/Manfred.jpg',
                    bio: 'Expert in Microsoft Dynamics 365 Business Central en geautomatiseerde bankaflettering. Helpt organisaties hun financiële processen foutloos te integreren.',
                    linkedin: 'https://www.linkedin.com/company/emlinked/',
                    email: 'info@emlinked.com',
                },
                {
                    _key: 'member-ebenezer',
                    name: 'Ebenezer',
                    role: 'Software Architecture & AL Engineer',
                    focusArea: 'Native Business Central Apps',
                    badge: 'Software Architecture',
                    photoPath: '/emlinked/team/Ebenezer.jpg',
                    bio: 'Verantwoordelijk voor de robuuste AL-codebase en cloud-architectuur van emlinked. Ontwikkelt native extensies die schaalbaar presteren in Business Central.',
                    linkedin: 'https://www.linkedin.com/company/emlinked/',
                    email: 'info@emlinked.com',
                },
                {
                    _key: 'member-elisabeth',
                    name: 'Elisabeth',
                    role: 'Customer Success & Onboarding Specialist',
                    focusArea: 'Onboarding & Support',
                    badge: 'Customer Success',
                    photoPath: '/emlinked/team/Elisabeth.jpg',
                    bio: 'Begeleidt opdrachtgevers en professionals tijdens de onboarding. Toegewijd aan maximale klanttevredenheid, heldere communicatie en langdurige samenwerking.',
                    linkedin: 'https://www.linkedin.com/company/emlinked/',
                    email: 'info@emlinked.com',
                },
            ],
        },
        {
            _type: 'ctaBlock',
            _key: 'cta_over_ons_nl',
            title: 'Klaar om je organisatie of carrière te versterken?',
            subtitle: 'Ontdek hoe onze gerichte aanpak het verschil maakt voor je interim-capaciteit of volgende carrièrestap.',
            primaryCtaLabel: 'Neem direct contact op',
            primaryCtaUrl: '#demo',
            secondaryCtaLabel: 'Bekijk onze oplossingen →',
            secondaryCtaUrl: '/apps',
        },
    ],
};

const enData = {
    _type: 'page',
    title: 'About emlinked: Our mission, vision & team',
    language: 'en',
    slug: { _type: 'slug', current: 'about-us' },
    seo: {
        seoTitle: 'About emlinked | Our Mission, Core Values & Specialist Team',
        seoDescription: 'Meet the emlinked team. Human-centric interim & recruitment solutions with impact powered by deep real estate and Business Central expertise.',
        canonical: 'https://emlinked.com/en/about-us',
        noIndex: false,
    },
    pageBlocks: [
        {
            _type: 'heroBlock',
            _key: 'hero_over_ons_en',
            badge: 'HUMAN-CENTRIC RECRUITMENT & SAAS',
            tagline: 'Human-Centric Interim & Recruitment Solutions with Impact.',
            description: 'We connect top talent and leading organizations across the public and private sectors through sharp domain knowledge, transparency, and a sustainable vision.',
            ctaLabel: 'Get in touch directly',
            ctaLink: '#demo',
            secondaryCtaLabel: 'Explore our solutions →',
            secondaryCtaLink: '/en/apps',
            proofText: 'Trusted by professional organizations, real estate managers, and IT leaders',
        },
        {
            _type: 'workflow',
            _key: 'mission_over_ons_en',
            badge: 'ARCHITECTING MEANINGFUL MATCHES',
            title: 'The labor market demands more than quick transactions; it requires strategic synergy.',
            subtitle: 'At emlinked, we combine deep sector expertise with advanced recruitment methodologies to seamlessly synchronize professionals and clients. Our focus is on long-term employability, mutual growth, and tangible results across complex interim and permanent challenges.',
        },
        {
            _type: 'trustBar',
            _key: 'values_over_ons_en',
            title: 'Our Core Values',
            subtitle: 'The foundation of our transparent and data-driven way of working.',
            logos: [
                {
                    _key: 'val-1',
                    name: 'Transparency & Integrity',
                    subtitle: 'No vague promises, but data-driven and honest communication at every stage of the recruitment and software lifecycle.',
                },
                {
                    _key: 'val-2',
                    name: 'Sector-Specific Expertise',
                    subtitle: 'Deep domain knowledge within government, education, healthcare, real estate, and business guarantees precise placements.',
                },
                {
                    _key: 'val-3',
                    name: 'Agility & Tailored Solutions',
                    subtitle: 'Proactive sourcing and flexible interim solutions that immediately respond to evolving organizational needs.',
                },
            ],
        },
        {
            _type: 'teamBlock',
            _key: 'team_over_ons_en',
            sectionTitle: 'The Specialists Behind the Connection',
            sectionSubtitle: 'Our multidisciplinary team combines executive search, recruitment automation, and personal guidance to deliver the perfect match.',
            members: [
                {
                    _key: 'member-raymond',
                    name: 'Raymond Perridon',
                    role: 'Founder & Managing Partner',
                    focusArea: 'Executive Leadership & Strategy',
                    badge: 'Managing Partner',
                    photoPath: '/emlinked/team/RaymondPerridon.jpg',
                    bio: 'Founder and strategic leader at emlinked. With a broad vision for the evolving labor market and real estate sector, he connects organizations with top interim and permanent talent.',
                    linkedin: 'https://www.linkedin.com/company/emlinked/',
                    email: 'info@emlinked.com',
                },
                {
                    _key: 'member-iryna',
                    name: 'Iryna Samiliak',
                    role: 'Executive Recruitment & Operations Lead',
                    focusArea: 'Executive Search & Recruitment',
                    badge: 'Executive Search',
                    photoPath: '/emlinked/team/Iryna.jpg',
                    bio: 'Specialized in connecting C-level and senior talent within fast-growing organizations. Combines data-driven sourcing with a personal, transparent touch.',
                    linkedin: 'https://www.linkedin.com/company/emlinked/',
                    email: 'info@emlinked.com',
                },
                {
                    _key: 'member-thorwald',
                    name: 'Thorwald',
                    role: 'Senior Interim Recruitment Specialist',
                    focusArea: 'Public & Private Sector Interim',
                    badge: 'Interim Management',
                    photoPath: '/emlinked/team/Thorwald.jpg',
                    bio: 'Focused on complex interim challenges across government, healthcare, and real estate. Delivers rapid scalability and high-impact interim placements.',
                    linkedin: 'https://www.linkedin.com/company/emlinked/',
                    email: 'info@emlinked.com',
                },
                {
                    _key: 'member-manfred',
                    name: 'Manfred',
                    role: 'Business Central & Finance Consultant',
                    focusArea: 'ERP & Financial Automation',
                    badge: 'Finance & ERP',
                    photoPath: '/emlinked/team/Manfred.jpg',
                    bio: 'Expert in Microsoft Dynamics 365 Business Central and automated bank reconciliation. Helps organizations integrate financial workflows flawlessly.',
                    linkedin: 'https://www.linkedin.com/company/emlinked/',
                    email: 'info@emlinked.com',
                },
                {
                    _key: 'member-ebenezer',
                    name: 'Ebenezer',
                    role: 'Software Architecture & AL Engineer',
                    focusArea: 'Native Business Central Apps',
                    badge: 'Software Architecture',
                    photoPath: '/emlinked/team/Ebenezer.jpg',
                    bio: 'Responsible for emlinked’s robust AL codebase and cloud architecture. Builds high-performance native extensions for Business Central.',
                    linkedin: 'https://www.linkedin.com/company/emlinked/',
                    email: 'info@emlinked.com',
                },
                {
                    _key: 'member-elisabeth',
                    name: 'Elisabeth',
                    role: 'Customer Success & Onboarding Specialist',
                    focusArea: 'Onboarding & Support',
                    badge: 'Customer Success',
                    photoPath: '/emlinked/team/Elisabeth.jpg',
                    bio: 'Guides clients and professionals through onboarding. Dedicated to maximum satisfaction, clear communication, and long-term partnerships.',
                    linkedin: 'https://www.linkedin.com/company/emlinked/',
                    email: 'info@emlinked.com',
                },
            ],
        },
        {
            _type: 'ctaBlock',
            _key: 'cta_over_ons_en',
            title: 'Ready to strengthen your organization or career?',
            subtitle: 'Discover how our targeted approach makes the difference for your interim capacity or next career move.',
            primaryCtaLabel: 'Get in touch directly',
            primaryCtaUrl: '#demo',
            secondaryCtaLabel: 'Explore our solutions →',
            secondaryCtaUrl: '/en/apps',
        },
    ],
};

async function seed() {
    console.log('Seeding Over Ons / About Us page into Sanity with 6 team members...');
    try {
        const nlDocId = 'page-over-ons-nl';
        const nlDraftId = 'drafts.page-over-ons-nl';

        await client.createOrReplace({ _id: nlDocId, ...nlData });
        await client.createOrReplace({ _id: nlDraftId, ...nlData });
        console.log('Published & Draft seeded for NL: page-over-ons-nl');

        const enDocId = 'page-over-ons-en';
        const enDraftId = 'drafts.page-over-ons-en';

        await client.createOrReplace({ _id: enDocId, ...enData });
        await client.createOrReplace({ _id: enDraftId, ...enData });
        console.log('Published & Draft seeded for EN: page-over-ons-en');

        console.log('Successfully seeded Over Ons pages into Sanity!');
    } catch (e) {
        console.error('Error seeding Over Ons page into Sanity:', e);
    }
}

seed();
