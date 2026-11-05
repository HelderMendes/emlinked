import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyAnnouncement from '@/components/StickyAnnouncement';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import { sanityFetch } from '@/lib/sanity';

interface WebLayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

async function getSiteSettings(locale: string) {
    try {
        const id = `siteSettings-${locale}`;
        return await sanityFetch<any>({
            query: `*[_id == $id][0] {
                announcementActive,
                announcementMode,
                announcementText,
                announcementTitle,
                announcementCtaLabel,
                announcementPillText,
                announcementReviews,
                announcementLink,
                announcementNewsItems[]-> {
                    title,
                    excerpt,
                    "slug": slug.current
                },
                phone,
                email,
                address,
                linkedinUrl,
                twitterUrl,
                navigationMenu
            }`,
            params: { id },
        });
    } catch (e) {
        console.error('Error fetching site settings from Sanity:', e);
        return null;
    }
}

export default async function WebLayout({ children, params }: WebLayoutProps) {
    const { locale } = await params;
    const settings = await getSiteSettings(locale);

    const isEn = locale === 'en';

    return (
        <>
            <a
                href='#main-content'
                className='sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-navy-900 focus:text-white focus:text-xs focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal'
            >
                {isEn ? 'Skip to main content' : 'Direct naar hoofdinhoud'}
            </a>
            <Header locale={locale} settings={settings} />
            <main id='main-content' className='grow flex flex-col'>
                {children}
            </main>
            <Footer locale={locale} settings={settings} />
            <StickyAnnouncement locale={locale} settings={settings} />
            <CookieConsentBanner locale={locale} />
        </>
    );
}
