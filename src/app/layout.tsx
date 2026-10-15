import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { client } from '@/sanity/client';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});
// version02 homepage hero (see HeroSection.tsx `soft` branch): Expose for the
// headline, Zodiak for hero body copy — self-hosted from Fontshare (ITF Free
// Font License), replacing the earlier Space Grotesk / General Sans pairing.
const expose = localFont({
    src: '../fonts/expose/Expose-Variable.woff2',
    weight: '400 900',
    variable: '--font-hero',
    display: 'swap',
});
const zodiak = localFont({
    src: [
        { path: '../fonts/zodiak/Zodiak-Variable.woff2', weight: '100 900', style: 'normal' },
        { path: '../fonts/zodiak/Zodiak-Variable-Italic.woff2', weight: '100 900', style: 'italic' },
    ],
    variable: '--font-hero-body',
    display: 'swap',
});


const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://emlinked.com';

async function getDefaultSeoSettings(locale: string) {
    try {
        return await client.fetch(
            `*[_type == "siteSettings" && language == $locale][0]{
                defaultSeoTitle,
                defaultSeoDescription,
                defaultOgImage { asset-> { url } }
            }`,
            { locale },
            { cache: 'no-store' },
        );
    } catch (e) {
        console.error('Error fetching default SEO settings from Sanity:', e);
        return null;
    }
}

export async function generateMetadata(): Promise<Metadata> {
    const headersList = await headers();
    const locale = headersList.get('x-locale') === 'en' ? 'en' : 'nl';
    const settings = await getDefaultSeoSettings(locale);

    const fallbackTitle =
        locale === 'en'
            ? 'Emlinked | Real Estate Software for Business Central'
            : 'Emlinked | Vastgoedsoftware voor Business Central';
    const fallbackDescription =
        locale === 'en'
            ? 'Emlinked helps real estate professionals with software for commercial portfolio management in Microsoft Business Central.'
            : 'Emlinked helpt vastgoedprofessionals met software voor commercieel portefeuillebeheer in Microsoft Business Central.';

    return {
        metadataBase: new URL(baseUrl),
        title: {
            default: settings?.defaultSeoTitle || fallbackTitle,
            template: '%s | emlinked',
        },
        description: settings?.defaultSeoDescription || fallbackDescription,
        alternates: {
            canonical: './',
        },
        openGraph: {
            siteName: 'emlinked',
            locale: locale === 'en' ? 'en_US' : 'nl_NL',
            type: 'website',
            ...(settings?.defaultOgImage?.asset?.url
                ? { images: [{ url: settings.defaultOgImage.asset.url }] }
                : {}),
        },
    };
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const headersList = await headers();
    const lang = headersList.get('x-locale') === 'en' ? 'en' : 'nl';

    return (
        <html
            lang={lang}
            className={cn(
                'h-full antialiased',
                'font-sans',
                inter.variable,
                expose.variable,
                zodiak.variable,
            )}
            suppressHydrationWarning
        >
            <body className='min-h-full flex flex-col'>
                <ThemeProvider
                    attribute='class'
                    defaultTheme='light'
                    forcedTheme='light'
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
