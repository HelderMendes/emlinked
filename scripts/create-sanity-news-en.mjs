import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'rqeokhhk',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skjSBxEdeLlVcAw5GslkZaSq6YI9FmEyNDtYbgUtpuY1WWhjwnTurCK7kPEF5H8CSqqvuzjJDY1IufoSGL3aGN2nybr50aU36VTaNPyJsr0i79AkizdIFvQ7HjHSkVinWhWl0eOYCUJ9mr0Qgu9huzx28x3941T1gbNMjQuK1hSNr4Fl1PCK',
  useCdn: false,
});

async function createEnglishNewsPage() {
  console.log('Creating page-nieuws-en document in Sanity...');
  
  const doc = {
    _id: 'page-nieuws-en',
    _type: 'page',
    title: 'News & Knowledge Base',
    language: 'en',
    slug: {
      _type: 'slug',
      current: 'news',
    },
    seo: {
      _type: 'seoFields',
      seoTitle: 'News & Knowledge Base Real Estate Management | Emlinked',
      seoDescription: 'Stay informed with the latest news on real estate software, Box 3 legislation updates, and Microsoft Dynamics 365 developments.',
    },
  };

  await client.createOrReplace(doc);
  console.log('Successfully created page-nieuws-en in Sanity!');
}

createEnglishNewsPage().catch((err) => {
  console.error('Error creating English news page:', err);
  process.exit(1);
});
