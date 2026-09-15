import React from 'react';

// Deliberately does NOT render the production Header/Footer/StickyAnnouncement
// stack from src/app/(web)/[locale]/layout.tsx — experiments in this group own
// their full chrome (see version01/_components/Nav + Footer).
export default function ExperimentsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
