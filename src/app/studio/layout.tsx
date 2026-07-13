import type { ReactNode } from 'react';

/**
 * Dedicated layout for the Sanity Studio route (/studio).
 * Renders children directly — bypasses the root layout's
 * Header, Footer and ThemeProvider so the Studio can
 * manage its own DOM structure.
 */
export default function StudioLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
