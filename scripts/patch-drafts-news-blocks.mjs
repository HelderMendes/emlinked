import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'rqeokhhk',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skjSBxEdeLlVcAw5GslkZaSq6YI9FmEyNDtYbgUtpuY1WWhjwnTurCK7kPEF5H8CSqqvuzjJDY1IufoSGL3aGN2nybr50aU36VTaNPyJsr0i79AkizdIFvQ7HjHSkVinWhWl0eOYCUJ9mr0Qgu9huzx28x3941T1gbNMjQuK1hSNr4Fl1PCK',
  useCdn: false,
});

const nlBlocks = [
  {
    _key: 'hero_nieuws_nl',
    _type: 'heroBlock',
    badge: 'KENNISBANK & INZICHTEN',
    tagline: 'Nieuws, inzichten en *vastgoedbeheer tips*',
    description: 'Blijf op de hoogte van het laatste nieuws rondom vastgoedbeheer software, wetgeving, Box 3-ontwikkelingen en Microsoft Dynamics updates.',
  },
  {
    _key: 'cta_nieuws_nl',
    _type: 'ctaBlock',
    title: 'Blijf voorop lopen in de vastgoedmarkt',
    subtitle: 'Wil je sparren over software, wetgeving of de nieuwste functies in Business Central? Neem direct contact op met onze experts.',
    primaryCtaLabel: 'Neem contact op',
    primaryCtaUrl: '#demo',
  },
];

const enBlocks = [
  {
    _key: 'hero_nieuws_en',
    _type: 'heroBlock',
    badge: 'KNOWLEDGE BASE & INSIGHTS',
    tagline: 'News, insights, and *property management tips*',
    description: 'Stay informed with the latest news on real estate software, Box 3 legislation updates, and Microsoft Dynamics 365 developments.',
  },
  {
    _key: 'cta_nieuws_en',
    _type: 'ctaBlock',
    title: 'Stay ahead in the real estate market',
    subtitle: 'Want to discuss software, legislation, or the latest features in Business Central? Connect with our experts directly.',
    primaryCtaLabel: 'Get in touch',
    primaryCtaUrl: '#demo',
  },
];

async function syncDraftsAndPublished() {
  console.log('Patching published and draft for page-nieuws-nl...');
  await client.patch('page-nieuws-nl').set({ pageBlocks: nlBlocks }).commit();
  try {
    await client.patch('drafts.page-nieuws-nl').set({ pageBlocks: nlBlocks }).commit();
    console.log('Updated drafts.page-nieuws-nl');
  } catch (e) {
    console.log('No drafts.page-nieuws-nl draft found to patch');
  }

  console.log('Patching published and draft for page-nieuws-en...');
  await client.patch('page-nieuws-en').set({ pageBlocks: enBlocks }).commit();
  try {
    await client.patch('drafts.page-nieuws-en').set({ pageBlocks: enBlocks }).commit();
    console.log('Updated drafts.page-nieuws-en');
  } catch (e) {
    console.log('No drafts.page-nieuws-en draft found to patch');
  }

  console.log('Done syncing drafts and published pageBlocks!');
}

syncDraftsAndPublished().catch((err) => {
  console.error('Error syncing:', err);
  process.exit(1);
});
