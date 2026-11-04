const CATEGORY_MAP: Record<
    string,
    { key: string; nl: string; en: string }
> = {
    bedrijfsnieuws: {
        key: 'Bedrijfsnieuws',
        nl: 'Bedrijfsnieuws',
        en: 'Company news',
    },
    organisatie: {
        key: 'Bedrijfsnieuws',
        nl: 'Bedrijfsnieuws',
        en: 'Company news',
    },
    organization: {
        key: 'Bedrijfsnieuws',
        nl: 'Bedrijfsnieuws',
        en: 'Company news',
    },
    'company news': {
        key: 'Bedrijfsnieuws',
        nl: 'Bedrijfsnieuws',
        en: 'Company news',
    },
    'wet- en regelgeving': {
        key: 'Wet- en regelgeving',
        nl: 'Wet- en regelgeving',
        en: 'Legislation & regulation',
    },
    'wet & regelgeving': {
        key: 'Wet- en regelgeving',
        nl: 'Wet- en regelgeving',
        en: 'Legislation & regulation',
    },
    'legislation & regulation': {
        key: 'Wet- en regelgeving',
        nl: 'Wet- en regelgeving',
        en: 'Legislation & regulation',
    },
    'legislation & tax': {
        key: 'Wet- en regelgeving',
        nl: 'Wet- en regelgeving',
        en: 'Legislation & regulation',
    },
    vastgoedbeheer: {
        key: 'Vastgoedbeheer',
        nl: 'Vastgoedbeheer',
        en: 'Property management',
    },
    'property management': {
        key: 'Vastgoedbeheer',
        nl: 'Vastgoedbeheer',
        en: 'Property management',
    },
    'business central & erp': {
        key: 'Business Central & ERP',
        nl: 'Business Central & ERP',
        en: 'Business Central & ERP',
    },
    'erp & business central': {
        key: 'Business Central & ERP',
        nl: 'Business Central & ERP',
        en: 'Business Central & ERP',
    },
    vastgoedbeleggen: {
        key: 'Vastgoedbeleggen',
        nl: 'Vastgoedbeleggen',
        en: 'Real estate investment',
    },
    'beleggen & portefeuille': {
        key: 'Vastgoedbeleggen',
        nl: 'Vastgoedbeleggen',
        en: 'Real estate investment',
    },
    'real estate investment': {
        key: 'Vastgoedbeleggen',
        nl: 'Vastgoedbeleggen',
        en: 'Real estate investment',
    },
    'investing & portfolio': {
        key: 'Vastgoedbeleggen',
        nl: 'Vastgoedbeleggen',
        en: 'Real estate investment',
    },
};

export function normalizeArticleCategoryKey(
    category: string | undefined,
): string {
    if (!category) return '';
    const entry = CATEGORY_MAP[category.trim().toLowerCase()];
    return entry ? entry.key : category.trim();
}

export function formatArticleCategory(
    category: string | undefined,
    isEn: boolean,
): string {
    if (!category) return '';
    const entry = CATEGORY_MAP[category.trim().toLowerCase()];
    if (!entry) return category;
    return isEn ? entry.en : entry.nl;
}

