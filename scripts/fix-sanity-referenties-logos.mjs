import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'rqeokhhk',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skjSBxEdeLlVcAw5GslkZaSq6YI9FmEyNDtYbgUtpuY1WWhjwnTurCK7kPEF5H8CSqqvuzjJDY1IufoSGL3aGN2nybr50aU36VTaNPyJsr0i79AkizdIFvQ7HjHSkVinWhWl0eOYCUJ9mr0Qgu9huzx28x3941T1gbNMjQuK1hSNr4Fl1PCK',
  useCdn: false,
});

const cleanCasesNL = [
  {
    _key: 'case-1-levi',
    step: 'CASE 1: VASTGOEDBEHEER ROTTERDAM',
    title: 'Snel en soepel dagelijks beheer van omvangrijke portefeuilles',
    author: 'Levi Bosboom',
    role: 'Eigenaar - Vastgoedbeheer Rotterdam',
    company: 'Vastgoedbeheer Rotterdam',
    text: 'Emlinked is de schakel tussen de beheerder en het vastgoed. De gebruiksvriendelijkheid van het systeem zorgt voor een snelle en soepele verloop van de dagelijkse taken. Aanpassingen en verfijningen worden continu doorgevoerd.',
    quote: '“Emlinked is de schakel tussen de beheerder en het vastgoed. Wij zijn zeer enthousiast over emlinked en raden dit ook zeker aan andere partijen aan.”',
    feature: 'Maandafsluiting verkort van 5 werkdagen naar 4 uur & flexibele inrichting per gebruiker.',
    metricLabel: 'Maandafsluiting',
    photoPath: '/emlinked/referenties/Levi-Bosboom.png',
    logoPath: '/emlinked/referenties/VGBRgrootde.webp',
    tags: [
      'CPI Indexatie Automation',
      'Business Central Native',
      'Facturatie Geautomatiseerd',
      '100% Audit-Proof',
    ],
  },
  {
    _key: 'case-2-angelique',
    step: 'CASE 2: VAN OVERHAGEN VASTGOED',
    title: 'Al ruim 5 jaar een overzichtelijk en betrouwbaar beheerpakket',
    author: 'Angelique van Doorn-Franke',
    role: 'Vastgoedbeheerder - Van Overhagen Vastgoed B.V.',
    company: 'Van Overhagen Vastgoed B.V.',
    text: 'Zeker naar je geluisterd! Emlinked is een zeer gebruikersvriendelijk en overzichtelijk vastgoedbeheerpakket. Support is goed bereikbaar en communiceert helder met korte responstijden.',
    quote: '“Emlinked is een zeer gebruikersvriendelijk en overzichtelijk vastgoedbeheerpakket. We zijn al ruim 5 jaar een tevreden gebruiker. Verzoeken om het gebruik te vereenvoudigen worden altijd serieus meegenomen.”',
    feature: '99,4% geautomatiseerde contractverwerking & proactief contractbeheer.',
    metricLabel: 'Proactief Contractbeheer',
    photoPath: '/emlinked/referenties/Angelique.png',
    logoPath: '/emlinked/referenties/van-overhagen_logo.jpg',
    tags: [
      'Geen Schaduwbestanden',
      'Bankafschriften Sync',
      'Direct Boekhoudkundig Inzicht',
      'Support Responstijd < 1 uur',
    ],
  },
  {
    _key: 'case-3-michel',
    step: 'CASE 3: M2 CAPITAL REAL ESTATE',
    title: 'Snel, scherp en meedenkende support voor commercieel beheer',
    author: 'Michel De Waal',
    role: 'Directeur - M2 Capital Real Estate B.V.',
    company: 'M2 Capital Real Estate B.V.',
    text: 'Als commercieel vastgoedbeheerder is emlinked voor ons een grote toegevoegde waarde. Het geleverde product is uitstekend bruikbaar en de professionele support is snel en meedenkend.',
    quote: '“Als commercieel vastgoedbeheerder is emlinked voor ons een grote toegevoegde waarde. De professionele support vanuit de emlinked organisatie is uitstekend: snel, scherp en meedenkend!”',
    feature: 'Maximale grip op commercieel vastgoed & snelle afhandeling van verzoeken.',
    metricLabel: 'Commercieel Beheer',
    photoPath: '/emlinked/team/RaymondPerridon.jpg',
    logoPath: '/emlinked/referenties/M2-Capital.jpg',
    tags: [
      'Multi-Entity Beheer',
      'Rendementsrapportages',
      'Huurindexatie Automation',
      'Snel & Meedenkende Support',
    ],
  },
  {
    _key: 'case-4-sander',
    step: 'CASE 4: BAETLAND VASTGOED',
    title: 'Volledig in de cloud gebouwd door vastgoed- en IT-specialisten',
    author: 'Sander Bot',
    role: 'Manager Vastgoedbeheer - Baetland Vastgoed B.V.',
    company: 'Baetland Vastgoed B.V.',
    text: 'Meedenken in oplossingen: emlinked is ontwikkeld door een vastgoedontwikkelaar samen met een Microsoft softwarepartner. Overal en op alle devices goed te gebruiken met overzichtelijke tegels.',
    quote: '“Wij hebben gekozen voor emlinked doordat het volledig in de cloud is gebouwd door vastgoed- en Microsoft-specialisten. Resume: wij hebben geen spijt van onze keuze.”',
    feature: 'Flexibele cloudinrichting op alle devices & 0 spijt van de softwarekeuze.',
    metricLabel: 'Native Cloud Architecture',
    photoPath: '/emlinked/referenties/Sander-Bot.png',
    logoPath: '/emlinked/referenties/baetland.png',
    tags: [
      'Device-Onafhankelijk',
      'Grootboek Synchronisatie',
      'Geen Handmatige Exports',
      'Microsoft Ecosystem',
    ],
  },
  {
    _key: 'case-5-enterprise',
    step: 'CASE 5: ASSET MANAGEMENT & CONTROLLING',
    title: 'Geautomatiseerde verwerkingsstraten voor complexe portefeuilles',
    author: 'Asset Controller & Financieel Directeur',
    role: 'Institutioneel Vastgoedbeleggingsfonds',
    company: 'Asset Management & Controlling',
    text: 'Voor institutionele beleggers en beheerorganisaties waar CPI-indexaties, bankkoppelingen en geautomatiseerde facturatie naadloos samenkomen met Microsoft Business Central.',
    quote: '“Met de automatische CPI-indexaties en directe bank- en Business Central koppelingen verwerken we maandelijks duizenden contracten zonder enige handmatige foutmarge.”',
    feature: '100% audit-proof financiële verslaglegging & realtime kasstroominrichting.',
    metricLabel: 'Continuous Auditing Compliance',
    photoPath: '/emlinked/team/Manfred.jpg',
    logoPath: '/emlinked/referenties/avatar_partners.png',
    tags: [
      'SOX & VAT Compliance',
      'Multi-Currency Subledgers',
      'Automated Cashflow Sync',
      'Enterprise Security',
    ],
  },
];

const cleanCasesEN = [
  {
    _key: 'case-1-levi-en',
    step: 'CASE 1: VASTGOEDBEHEER ROTTERDAM',
    title: 'Smooth & Fast Daily Management of Large Portfolios',
    author: 'Levi Bosboom',
    role: 'Owner - Vastgoedbeheer Rotterdam',
    company: 'Vastgoedbeheer Rotterdam',
    text: 'Emlinked connects property managers directly with real estate operations. System user-friendliness ensures daily tasks run smoothly.',
    quote: '“Emlinked is the bridge between property managers and real estate. We are highly enthusiastic about emlinked.”',
    feature: 'Period close reduced from 5 days to 4 hours & flexible user configurations.',
    metricLabel: 'Monthly Closing',
    photoPath: '/emlinked/referenties/Levi-Bosboom.png',
    logoPath: '/emlinked/referenties/VGBRgrootde.webp',
    tags: [
      'CPI Indexation Automation',
      'Business Central Native',
      'Automated Billing',
      '100% Audit-Proof',
    ],
  },
  {
    _key: 'case-2-angelique-en',
    step: 'CASE 2: VAN OVERHAGEN REAL ESTATE',
    title: 'Over 5 Years of Reliable & Transparent Management',
    author: 'Angelique van Doorn-Franke',
    role: 'Property Manager - Van Overhagen Vastgoed B.V.',
    company: 'Van Overhagen Vastgoed B.V.',
    text: 'Emlinked is an extremely user-friendly property management suite. Clear support responses with fast resolution times.',
    quote: '“Emlinked is an easy-to-use and clear property management suite. We have been a satisfied user for over 5 years.”',
    feature: '99.4% automated contract processing & proactive contract tracking.',
    metricLabel: 'Proactive Contract Tracking',
    photoPath: '/emlinked/referenties/Angelique.png',
    logoPath: '/emlinked/referenties/van-overhagen_logo.jpg',
    tags: [
      'No Shadow Spreadsheets',
      'Bank Feed Sync',
      'Realtime Accounting Insight',
      'Support SLA < 1 Hour',
    ],
  },
  {
    _key: 'case-3-michel-en',
    step: 'CASE 3: M2 CAPITAL REAL ESTATE',
    title: 'Fast, Sharp & Solution-Oriented Support for Commercial Real Estate',
    author: 'Michel De Waal',
    role: 'Director - M2 Capital Real Estate B.V.',
    company: 'M2 Capital Real Estate B.V.',
    text: 'For commercial property management, emlinked adds immense value. Excellent product paired with sharp, fast support.',
    quote: '“As a commercial property manager, emlinked brings massive added value. Support is fast, sharp, and solution-oriented!”',
    feature: 'Maximum control over commercial portfolios & fast request turnarounds.',
    metricLabel: 'Commercial Management',
    photoPath: '/emlinked/team/RaymondPerridon.jpg',
    logoPath: '/emlinked/referenties/M2-Capital.jpg',
    tags: [
      'Multi-Entity Management',
      'Yield Reporting',
      'Rent Indexation Automation',
      'Proactive Support',
    ],
  },
  {
    _key: 'case-4-sander-en',
    step: 'CASE 4: BAETLAND REAL ESTATE',
    title: 'Fully Cloud-Native Built by Real Estate & IT Experts',
    author: 'Sander Bot',
    role: 'Real Estate Manager - Baetland Vastgoed B.V.',
    company: 'Baetland Vastgoed B.V.',
    text: 'Built for the cloud by real estate developers together with Microsoft software partners. Easy to use across all devices.',
    quote: '“We chose emlinked because it is 100% cloud-native built by real estate & Microsoft experts. We have zero regrets.”',
    feature: 'Flexible cloud configuration across all devices & zero regrets.',
    metricLabel: 'Native Cloud Architecture',
    photoPath: '/emlinked/referenties/Sander-Bot.png',
    logoPath: '/emlinked/referenties/baetland.png',
    tags: [
      'Device Independent',
      'General Ledger Sync',
      'No Manual Exports',
      'Microsoft Ecosystem',
    ],
  },
  {
    _key: 'case-5-enterprise-en',
    step: 'CASE 5: ASSET MANAGEMENT & CONTROLLING',
    title: 'Automated Processing Pipelines for Complex Portfolios',
    author: 'Asset Controller & Financial Director',
    role: 'Institutional Real Estate Fund',
    company: 'Asset Management & Controlling',
    text: 'For institutional investors where CPI indexation, bank feeds, and automated billing meet Microsoft Business Central.',
    quote: '“With automated CPI indexation and direct Business Central integration, we process thousands of contracts effortlessly each month.”',
    feature: '100% audit-proof financial reporting & real-time cash flow dashboards.',
    metricLabel: 'Continuous Auditing Compliance',
    photoPath: '/emlinked/team/Manfred.jpg',
    logoPath: '/emlinked/referenties/avatar_partners.png',
    tags: [
      'SOX & VAT Compliance',
      'Multi-Currency Subledgers',
      'Automated Cashflow Sync',
      'Enterprise Security',
    ],
  },
];

async function updateSanityReferentiesLogos() {
  console.log('Patching clean logo paths in page-referenties-nl...');
  const nlDoc = await client.getDocument('page-referenties-nl');
  if (nlDoc && nlDoc.pageBlocks) {
    const updatedBlocks = nlDoc.pageBlocks.map((block) => {
      if (block._key === 'cases-section-nl' || block._type === 'workflow') {
        return {
          ...block,
          items: cleanCasesNL,
        };
      }
      return block;
    });
    await client.patch('page-referenties-nl').set({ pageBlocks: updatedBlocks }).commit();
    try {
      await client.patch('drafts.page-referenties-nl').set({ pageBlocks: updatedBlocks }).commit();
    } catch (e) {}
  }

  console.log('Patching clean logo paths in page-referenties-en...');
  const enDoc = await client.getDocument('page-referenties-en');
  if (enDoc && enDoc.pageBlocks) {
    const updatedBlocks = enDoc.pageBlocks.map((block) => {
      if (block._key === 'cases-section-en' || block._type === 'workflow') {
        return {
          ...block,
          items: cleanCasesEN,
        };
      }
      return block;
    });
    await client.patch('page-referenties-en').set({ pageBlocks: updatedBlocks }).commit();
    try {
      await client.patch('drafts.page-referenties-en').set({ pageBlocks: updatedBlocks }).commit();
    } catch (e) {}
  }

  console.log('Successfully patched all reference case logos in Sanity CMS!');
}

updateSanityReferentiesLogos().catch((err) => {
  console.error('Error updating logos:', err);
  process.exit(1);
});
