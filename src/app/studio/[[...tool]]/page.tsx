/**
 * Sanity Studio route — Server Component
 *
 * Exports `metadata`, `viewport` and `dynamic` as required by next-sanity v13.
 * The actual Studio render lives in ./Studio.tsx (Client Component).
 */
export { metadata } from 'next-sanity/studio';
export { viewport } from 'next-sanity/studio';

export const dynamic = 'force-static';

import StudioClientPage from './Studio';

export default function StudioPage() {
    return <StudioClientPage />;
}
