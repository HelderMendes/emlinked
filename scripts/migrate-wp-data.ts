import { createClient } from '@sanity/client';
import axios from 'axios';
import dotenv from 'dotenv';

// Load local environment variables
dotenv.config({ path: '.env.local' });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const writeToken = process.env.SANITY_API_WRITE_TOKEN;

// Arguments parsing
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const wpUrl = process.env.WORDPRESS_API_URL || 'https://emlinked.nl/wp-json/wp/v2';

async function preflightChecks() {
  console.log('🔍 Executing migration preflight checks...');

  if (!projectId || !dataset) {
    console.error('❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET is not configured.');
    process.exit(1);
  }

  if (!writeToken) {
    if (isDryRun) {
      console.warn('⚠️ Warning: SANITY_API_WRITE_TOKEN is missing. Continuing in DRY-RUN mode.');
    } else {
      console.error('❌ Error: SANITY_API_WRITE_TOKEN is required for live mutations. Configure it in .env.local.');
      process.exit(1);
    }
  }

  console.log(`✅ Preflight checks passed.`);
  console.log(`   - Target Project: ${projectId}`);
  console.log(`   - Target Dataset: ${dataset}`);
  console.log(`   - Execution Mode: ${isDryRun ? 'DRY-RUN (Read-Only)' : 'LIVE MUTATION'}`);
}

const client = createClient({
  projectId,
  dataset,
  token: writeToken,
  apiVersion: '2026-07-02',
  useCdn: false,
});

interface WPUser {
  id: number;
  name: string;
  slug: string;
}

interface WPPost {
  id: number;
  title: { rendered: string };
  slug: string;
  date: string;
  content: { rendered: string };
  excerpt: { rendered: string };
  author: number;
}

// Paginated data fetcher from WordPress
async function fetchWordPressData<T>(endpoint: string): Promise<T[]> {
  let allData: T[] = [];
  let page = 1;
  const perPage = 20;

  console.log(`🌐 Fetching data from: ${wpUrl}/${endpoint}`);

  while (page <= 25) { // Protect against infinite loops by capping pages
    try {
      const response = await axios.get<T[]>(`${wpUrl}/${endpoint}`, {
        params: {
          page,
          per_page: perPage,
        },
        timeout: 10000,
      });

      if (response.data && response.data.length > 0) {
        allData = allData.concat(response.data);
        console.log(`   Fetched page ${page} (${response.data.length} items)`);
        page++;
      } else {
        break;
      }
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        // 400 Bad Request indicates page limit reached in WordPress REST API
        break;
      }
      console.warn(`⚠️ Warning: Failed to fetch page ${page} of ${endpoint}. Stopping.`, err.message);
      break;
    }
  }

  return allData;
}

// Converts HTML paragraphs and headers to Portable Text blocks
function parseHtmlToBlocks(html: string): any[] {
  const blocks: any[] = [];
  let blockKeyIndex = 0;

  // Split tags regex
  const tagsRegex = /<(p|h2|h3|ul|ol|li)[^>]*>([\s\S]*?)<\/\1>/gi;
  let match;

  while ((match = tagsRegex.exec(html)) !== null) {
    const tagName = match[1].toLowerCase();
    const tagContent = match[2].replace(/<[^>]*>/g, '').trim();

    if (!tagContent) continue;

    const key = `block-${blockKeyIndex++}`;

    if (tagName === 'h2' || tagName === 'h3') {
      blocks.push({
        _type: 'block',
        _key: key,
        style: tagName,
        children: [
          {
            _type: 'span',
            _key: `span-${key}`,
            text: tagContent,
          },
        ],
      });
    } else {
      blocks.push({
        _type: 'block',
        _key: key,
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: `span-${key}`,
            text: tagContent,
          },
        ],
      });
    }
  }

  // Fallback block if parsing matched nothing
  if (blocks.length === 0) {
    blocks.push({
      _type: 'block',
      _key: 'block-fallback',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'span-fallback',
          text: html.replace(/<[^>]*>/g, '').trim(),
        },
      ],
    });
  }

  return blocks;
}

async function migrateAuthors() {
  console.log('\n👥 Fetching and Migrating Authors...');
  
  let wpUsers: WPUser[] = [];
  try {
    wpUsers = await fetchWordPressData<WPUser>('users');
  } catch (err) {
    console.warn("⚠️ Users endpoint failed. Falling back to default author list.");
    wpUsers = [{ id: 1, name: 'Raymond Perridon', slug: 'raymond-perridon' }];
  }

  const migratedAuthorRefs: Record<number, string> = {};

  for (const author of wpUsers) {
    const sanityId = `wp-author-${author.id}`;
    const doc = {
      _type: 'author',
      _id: sanityId,
      name: author.name,
      slug: { _type: 'slug', current: author.slug },
    };

    if (isDryRun) {
      console.log(`[DRY-RUN] Would upsert Author: ${author.name} (ID: ${sanityId})`);
      migratedAuthorRefs[author.id] = sanityId;
    } else {
      try {
        await client.createOrReplace(doc);
        console.log(`✅ Upserted Author: ${author.name} (ID: ${sanityId})`);
        migratedAuthorRefs[author.id] = sanityId;
      } catch (err) {
        console.error(`❌ Failed to import Author ${author.name}:`, err);
      }
    }
  }
  return migratedAuthorRefs;
}

async function migratePosts(authorRefs: Record<number, string>) {
  console.log('\n📝 Fetching and Migrating Posts...');

  let wpPosts: WPPost[] = [];
  try {
    wpPosts = await fetchWordPressData<WPPost>('posts');
  } catch (err: any) {
    console.error("❌ Critical: Failed to retrieve posts from WordPress.", err.message);
    return;
  }

  if (wpPosts.length === 0) {
    console.log("ℹ️ No posts discovered on WordPress API endpoint.");
    return;
  }

  let successCount = 0;
  let failCount = 0;

  for (const wpPost of wpPosts) {
    const sanityId = `wp-post-${wpPost.id}`;
    const parsedBlocks = parseHtmlToBlocks(wpPost.content.rendered);
    const authorRef = authorRefs[wpPost.author] || 'wp-author-1'; // Default author fallback

    const doc = {
      _type: 'article',
      _id: sanityId,
      title: wpPost.title.rendered,
      slug: { _type: 'slug', current: wpPost.slug },
      publishedAt: wpPost.date,
      body: parsedBlocks,
      seo: {
        _type: 'seoFields',
        seoTitle: wpPost.title.rendered.substring(0, 60),
        seoDescription: wpPost.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
        noIndex: false,
      },
      author: {
        _type: 'reference',
        _ref: authorRef,
      },
    };

    if (isDryRun) {
      console.log(`[DRY-RUN] Would upsert Post: "${wpPost.title.rendered}" (Slug: ${wpPost.slug})`);
      successCount++;
    } else {
      try {
        await client.createOrReplace(doc);
        console.log(`✅ Upserted Post: "${wpPost.title.rendered}" (Slug: ${wpPost.slug})`);
        successCount++;
      } catch (err) {
        console.error(`❌ Failed to import Post "${wpPost.title.rendered}":`, err);
        failCount++;
      }
    }
  }

  console.log(`\n📋 Post Migration Summary:`);
  console.log(`   - Migrated successfully: ${successCount}`);
  console.log(`   - Failed: ${failCount}`);
}

async function runMigration() {
  await preflightChecks();

  try {
    const authorRefs = await migrateAuthors();
    await migratePosts(authorRefs);
    console.log('\n🎉 WordPress to Sanity migration process completed.');
  } catch (err) {
    console.error('\n❌ Migration terminated due to critical error:', err);
    process.exit(1);
  }
}

runMigration();
