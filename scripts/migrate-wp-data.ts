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
const wpUrl =
    process.env.WORDPRESS_API_URL || 'https://www.emlinked.nl/wp-json/wp/v2';

async function preflightChecks() {
    console.log('🔍 Executing migration preflight checks...');

    if (!projectId || !dataset) {
        console.error(
            '❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET is not configured.',
        );
        process.exit(1);
    }

    if (!writeToken) {
        if (isDryRun) {
            console.warn(
                '⚠️ Warning: SANITY_API_WRITE_TOKEN is missing. Continuing in DRY-RUN mode.',
            );
        } else {
            console.error(
                '❌ Error: SANITY_API_WRITE_TOKEN is required for mutations. Configure it in .env.local.',
            );
            process.exit(1);
        }
    }

    console.log(`✅ Preflight checks passed.`);
    console.log(`   - Target Project: ${projectId}`);
    console.log(`   - Target Dataset: ${dataset}`);
    console.log(
        `   - Execution Mode: ${isDryRun ? 'DRY-RUN (Read-Only)' : 'LIVE MUTATION'}`,
    );
}

const client = createClient({
    projectId,
    dataset,
    token: writeToken,
    apiVersion: '2026-07-02',
    useCdn: false,
});

interface WPPost {
    id: number;
    title: { rendered: string };
    slug: string;
    date: string;
    content: { rendered: string };
    excerpt: { rendered: string };
    featured_media?: number;
}

async function migrateAuthors() {
    console.log('\n👥 Migrating Authors...');
    // Mock author data migration step (in production, fetch from /wp-json/wp/v2/users)
    const mockAuthors = [
        { id: 1, name: 'Raymond Perridon', slug: 'raymond-perridon' },
    ];

    const migratedAuthorRefs: Record<number, string> = {};

    for (const author of mockAuthors) {
        const sanityId = `wp-author-${author.id}`;
        const doc = {
            _type: 'author',
            _id: sanityId,
            name: author.name,
            slug: { _type: 'slug', current: author.slug },
        };

        if (isDryRun) {
            console.log(
                `[DRY-RUN] Would upsert Author: ${author.name} (ID: ${sanityId})`,
            );
            migratedAuthorRefs[author.id] = sanityId;
        } else {
            try {
                await client.createOrReplace(doc);
                console.log(
                    `✅ Upserted Author: ${author.name} (ID: ${sanityId})`,
                );
                migratedAuthorRefs[author.id] = sanityId;
            } catch (err) {
                console.error(
                    `❌ Failed to import Author ${author.name}:`,
                    err,
                );
            }
        }
    }
    return migratedAuthorRefs;
}

async function migratePosts(authorRefs: Record<number, string>) {
    console.log('\n📝 Migrating Posts / Articles...');

    // Sample posts data (in production, fetch from /wp-json/wp/v2/posts)
    const samplePosts: WPPost[] = [
        {
            id: 101,
            title: { rendered: 'Wat is ERP software voor vastgoed?' },
            slug: 'wat-is-erp-software-voor-vastgoed',
            date: new Date().toISOString(),
            content: {
                rendered:
                    '<p>ERP software helpt vastgoedbeheerders om al hun processen te centraliseren.</p>',
            },
            excerpt: {
                rendered:
                    'Ontdek wat ERP software betekent voor uw vastgoedbeheer.',
            },
        },
    ];

    let successCount = 0;
    let skipCount = 0;

    for (const wpPost of samplePosts) {
        const sanityId = `wp-post-${wpPost.id}`;

        // Convert HTML content to portable text structure (simple fallback parser)
        const bodyTextBlocks = [
            {
                _type: 'block',
                _key: 'block-0',
                style: 'normal',
                children: [
                    {
                        _type: 'span',
                        _key: 'span-0',
                        text: wpPost.content.rendered.replace(/<[^>]*>/g, ''), // strip simple tags
                    },
                ],
            },
        ];

        const doc = {
            _type: 'article',
            _id: sanityId,
            title: wpPost.title.rendered,
            slug: { _type: 'slug', current: wpPost.slug },
            publishedAt: wpPost.date,
            body: bodyTextBlocks,
            seo: {
                _type: 'seoFields',
                seoTitle: wpPost.title.rendered.substring(0, 60),
                seoDescription: wpPost.excerpt.rendered
                    .replace(/<[^>]*>/g, '')
                    .substring(0, 160),
                noIndex: false,
            },
            // Assign author reference (fallback to Raymond Perridon ID 1)
            author: {
                _type: 'reference',
                _ref: authorRefs[1] || 'wp-author-1',
            },
        };

        if (isDryRun) {
            console.log(
                `[DRY-RUN] Would upsert Post: "${wpPost.title.rendered}" (Slug: ${wpPost.slug})`,
            );
            successCount++;
        } else {
            try {
                await client.createOrReplace(doc);
                console.log(
                    `✅ Upserted Post: "${wpPost.title.rendered}" (Slug: ${wpPost.slug})`,
                );
                successCount++;
            } catch (err) {
                console.error(
                    `❌ Failed to import Post "${wpPost.title.rendered}":`,
                    err,
                );
            }
        }
    }

    console.log(`\n📋 Post Migration Summary:`);
    console.log(`   - Migrated successfully: ${successCount}`);
    console.log(`   - Skipped: ${skipCount}`);
}

async function runMigration() {
    await preflightChecks();

    try {
        const authorRefs = await migrateAuthors();
        await migratePosts(authorRefs);
        console.log(
            '\n🎉 WordPress to Sanity migration completed successfully.',
        );
    } catch (err) {
        console.error('\n❌ Migration terminated due to critical error:', err);
        process.exit(1);
    }
}

runMigration();
