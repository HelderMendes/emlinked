'use client';

import { useEffect } from 'react';
import { useDocsTranslation } from '@/components/docs/DocsTranslationContext';

export default function SetDocsTranslationPath({
    path,
}: {
    path: string | null;
}) {
    const { setTranslatedPath } = useDocsTranslation();

    useEffect(() => {
        setTranslatedPath(path);
        return () => setTranslatedPath(null);
    }, [path, setTranslatedPath]);

    return null;
}
