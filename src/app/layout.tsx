import type { Metadata } from 'next';
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


// export const metadata: Metadata = {
//     title: 'Emlinked | Estate Management Linked',
//     description: 'Premium software voor het beheer van vastgoedportefeuilles.',
// };

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://emlinked.com';

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {
        default: 'Emlinked | Vastgoedsoftware voor Business Central',
        template: '%s | emlinked',
    },
    description:
        'Emlinked helpt vastgoedprofessionals met software voor commercieel portefeuillebeheer in Microsoft Business Central.',
    alternates: {
        canonical: './',
    },
    openGraph: {
        siteName: 'emlinked',
        locale: 'nl_NL',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang='nl'
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
