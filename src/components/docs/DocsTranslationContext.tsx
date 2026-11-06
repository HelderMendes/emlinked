'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';

interface DocsTranslationContextValue {
    translatedPath: string | null;
    setTranslatedPath: (path: string | null) => void;
}

const DocsTranslationContext =
    createContext<DocsTranslationContextValue | null>(null);

export function DocsTranslationProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [translatedPath, setTranslatedPath] = useState<string | null>(
        null,
    );
    const value = useMemo(
        () => ({ translatedPath, setTranslatedPath }),
        [translatedPath],
    );

    return (
        <DocsTranslationContext.Provider value={value}>
            {children}
        </DocsTranslationContext.Provider>
    );
}

export function useDocsTranslation() {
    const ctx = useContext(DocsTranslationContext);
    if (!ctx) {
        throw new Error(
            'useDocsTranslation must be used within a DocsTranslationProvider',
        );
    }
    return ctx;
}
