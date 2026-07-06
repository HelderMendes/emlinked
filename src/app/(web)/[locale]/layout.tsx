import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { client } from '@/sanity/client';

interface WebLayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

async function getSiteSettings(locale: string) {
    try {
        return await client.fetch(
            `*[_type == "siteSettings" && language == $locale][0] {
                announcementActive,
                announcementText,
                announcementLink,
                phone,
                email,
                address,
                linkedinUrl,
                twitterUrl
            }`,
            { locale }
        );
    } catch (e) {
        console.error('Error fetching site settings from Sanity:', e);
        return null;
    }
}

export default async function WebLayout({ children, params }: WebLayoutProps) {
    const { locale } = await params;
    const settings = await getSiteSettings(locale);

    return (
        <>
            <Header locale={locale} settings={settings} />
            <main className='flex-grow flex flex-col'>{children}</main>
            <Footer locale={locale} settings={settings} />
        </>
    );
}
