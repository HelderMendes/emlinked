'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

/**
 * Client Component wrapper for NextStudio.
 * Kept in a separate file so the parent page.tsx can remain a
 * Server Component and legally export `metadata` and `viewport`.
 */
export default function StudioClientPage() {
    return <NextStudio config={config} />;
}
