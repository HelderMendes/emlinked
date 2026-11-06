'use client';

import { useDocsTranslation } from '@/components/docs/DocsTranslationContext';

interface DocsLocaleSwitchProps {
    locale: 'nl' | 'en';
}

export default function DocsLocaleSwitch({ locale }: DocsLocaleSwitchProps) {
    const { translatedPath } = useDocsTranslation();

    const setLocale = (loc: 'nl' | 'en') => {
        document.cookie = `emlinked_locale=${loc}; path=/; max-age=31536000; SameSite=Lax`;

        if (loc === locale) {
            window.location.reload();
            return;
        }

        // translatedPath is set by the current doc page once it resolves its
        // translationRef counterpart. Falls back to the other locale's docs
        // root when no link exists yet for this page.
        window.location.href =
            translatedPath ?? (loc === 'en' ? '/en/docs' : '/docs');
    };

    return (
        <div className='inline-flex items-center rounded-full border border-teal/30 bg-teal-pale/40 p-0.5 text-xs font-semibold'>
            <button
                onClick={() => setLocale('nl')}
                className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                    locale === 'nl'
                        ? 'bg-teal text-white'
                        : 'text-navy-900 hover:bg-teal-pale'
                }`}
            >
                🇳🇱 NL
            </button>
            <button
                onClick={() => setLocale('en')}
                className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                    locale === 'en'
                        ? 'bg-teal text-white'
                        : 'text-navy-900 hover:bg-teal-pale'
                }`}
            >
                🇬🇧 EN
            </button>
        </div>
    );
}
