import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getHomepageData, type Locale } from './_lib/data';
import { Version01Page } from './_components/Version01Page';

interface PageProps {
    params: Promise<{ locale: string }>;
}

function isLocale(value: string): value is Locale {
    return value === 'nl' || value === 'en';
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: `emlinked — version01 design concept (${locale.toUpperCase()})`,
        robots: 'noindex, nofollow',
    };
}

export default async function Version01Route({ params }: PageProps) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();

    const pageData = await getHomepageData(locale);
    return <Version01Page locale={locale} pageData={pageData} />;
}
