import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'rqeokhhk',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skjSBxEdeLlVcAw5GslkZaSq6YI9FmEyNDtYbgUtpuY1WWhjwnTurCK7kPEF5H8CSqqvuzjJDY1IufoSGL3aGN2nybr50aU36VTaNPyJsr0i79AkizdIFvQ7HjHSkVinWhWl0eOYCUJ9mr0Qgu9huzx28x3941T1gbNMjQuK1hSNr4Fl1PCK',
  useCdn: false,
});

const nlMembers = [
  {
    _key: 'member-raymond',
    name: 'Raymond Perridon',
    role: 'Founder & Managing Partner',
    focusArea: 'Executive Leadership & Strategie',
    badge: 'Managing Partner',
    photoPath: '/emlinked/team/RaymondPerridon.jpg',
    bio: 'Oprichter en strategisch leider van emlinked. Met een brede visie op de veranderende arbeidsmarkt en vastgoedsector verbindt hij organisaties met hoogwaardig interim- en vast talent.',
    fullBio: 'De Entrepreneur van emlinked. Raymond heeft een historie in de IT-industrie, maar raakte gedurende zijn loopbaan gespecialiseerd in het vastgoed.\n\nAls vastgoedondernemer en strategisch leider weet Raymond als geen ander wat u nodig heeft om succesvol in het vastgoed te ondernemen en organisatiedoelstellingen waar te maken.',
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
    fullBio: 'Iryna Samiliak is een daadkrachtige en analytische professional met een sterke achtergrond in vastgoedprocessen en softwareontwikkeling. Door haar natuurlijke vermogen om structuur te brengen in complexe omgevingen weet zij processen te stroomlijnen en teams effectief samen te laten werken.\n\nMet haar strategische blik en hands‑on mentaliteit zorgt Iryna ervoor dat ons platform en onze dienstverlening blijven aansluiten op wat vastgoedprofessionals écht nodig hebben. Wie met Iryna werkt, merkt meteen haar focus, rust en het plezier waarmee zij elke uitdaging benadert.',
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
    fullBio: 'Thorwald is een ervaren interim recruitment specialist met een diepgaand inzicht in zowel de publieke als de private sector. Met zijn grondige kennis van vastgoedbeheer en organisatiestructuren weet hij in no-time de juiste interim professionals te matchen op kritieke posities.\n\nThorwald combineert daadkracht met mensgerichte communicatie, waardoor vraagstukken niet alleen snel maar ook duurzaam opgelost worden.',
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
    fullBio: 'Manfred combineert diepgaande financiële expertise met technische meesterschap in Microsoft Dynamics 365 Business Central. Als specialist in geautomatiseerde SEPA-incasso\'s en bankaflettering transformeert hij complexe vastgoedboekhoudingen tot gestroomlijnde, geautomatiseerde workflows.\n\nZijn focus ligt op het elimineren van handmatige fouten en het maximaliseren van de financiële efficiëntie voor vastgoedbeheerders.',
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
    fullBio: 'Ebenezer is de drijvende kracht achter de technische architectuur en AL-ontwikkeling van emlinked. Met zijn passie voor schaalbare SaaS-oplossingen bouwt hij native Business Central extensies die dagelijks duizenden vastgoedtransacties en huurcontracten verwerken.\n\nZijn werk garandeert dat het emlinked platform extreem snel, veilig en toekomstbestendig blijft.',
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
    fullBio: 'Elisabeth staat garant voor een vlekkeloze onboarding en ondersteuning van vastgoedbeheerders en controllers. Zij begeleidt organisaties van de eerste inrichting tot het dagelijkse gebruik van emlinked, met oog voor detail en persoonlijke aandacht.\n\nDankzij haar toegankelijke aanpak voelen klanten zich direct thuis in het platform.',
    linkedin: 'https://www.linkedin.com/company/emlinked/',
    email: 'info@emlinked.com',
  },
];

const enMembers = [
  {
    _key: 'member-raymond',
    name: 'Raymond Perridon',
    role: 'Founder & Managing Partner',
    focusArea: 'Executive Leadership & Strategy',
    badge: 'Managing Partner',
    photoPath: '/emlinked/team/RaymondPerridon.jpg',
    bio: 'Founder and strategic leader at emlinked. With a broad vision for the evolving labor market and real estate sector, he connects organizations with top interim and permanent talent.',
    fullBio: 'The Entrepreneur behind emlinked. Raymond has a strong background in the IT industry and specialized in real estate throughout his career.\n\nAs a real estate entrepreneur and strategic leader, Raymond understands firsthand what it takes to succeed in real estate operations and achieve organizational goals.',
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
    fullBio: 'Iryna Samiliak is a decisive and analytical professional with a strong background in real estate processes and software development. With her natural ability to bring structure to complex environments, she streamlines operations and aligns team collaboration.\n\nWith her strategic perspective and hands-on mindset, Iryna ensures that our platform and services continually align with what real estate professionals truly need. Working with Iryna means experiencing focus, clarity, and dedication.',
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
    fullBio: 'Thorwald is an experienced interim recruitment specialist with deep insights across public and private sectors. With extensive knowledge of property management and organizational structures, he swiftly matches high-impact interim professionals to critical roles.',
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
    fullBio: 'Manfred combines deep financial expertise with technical mastery in Microsoft Dynamics 365 Business Central. As a specialist in automated SEPA direct debits and bank reconciliation, he transforms complex property accounting into streamlined workflows.',
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
    fullBio: 'Ebenezer is the driving technical force behind emlinked’s AL architecture and cloud core. Passionate about scalable SaaS systems, he builds native Business Central extensions processing thousands of real estate transactions daily.',
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
    fullBio: 'Elisabeth ensures seamless onboarding and support for real estate managers and controllers. She guides client organizations from initial configuration to daily operational excellence.',
    linkedin: 'https://www.linkedin.com/company/emlinked/',
    email: 'info@emlinked.com',
  },
];

async function updatePages() {
  console.log('Patching page-over-ons-nl in Sanity...');
  const nlPage = await client.getDocument('page-over-ons-nl');
  if (nlPage) {
    const updatedBlocks = (nlPage.pageBlocks || []).map((block) => {
      if (block._type === 'teamBlock' || block._type === 'team') {
        return {
          ...block,
          _type: 'teamBlock',
          sectionTitle: 'De specialisten achter de verbinding',
          sectionSubtitle: 'Ons multidisciplinaire team combineert executive search, recruitment automation en persoonlijke begeleiding om de juiste match te realiseren.',
          members: nlMembers,
        };
      }
      return block;
    });

    await client
      .patch('page-over-ons-nl')
      .set({ pageBlocks: updatedBlocks })
      .commit();
    console.log('Successfully updated page-over-ons-nl');
  }

  console.log('Patching page-over-ons-en in Sanity...');
  const enPage = await client.getDocument('page-over-ons-en');
  if (enPage) {
    const updatedBlocks = (enPage.pageBlocks || []).map((block) => {
      if (block._type === 'teamBlock' || block._type === 'team') {
        return {
          ...block,
          _type: 'teamBlock',
          sectionTitle: 'The Specialists Behind the Connection',
          sectionSubtitle: 'Our multidisciplinary team combines executive search, recruitment automation, and personal guidance to deliver the perfect match.',
          members: enMembers,
        };
      }
      return block;
    });

    await client
      .patch('page-over-ons-en')
      .set({ pageBlocks: updatedBlocks })
      .commit();
    console.log('Successfully updated page-over-ons-en');
  }
}

updatePages().catch((err) => {
  console.error('Error updating Sanity:', err);
  process.exit(1);
});
