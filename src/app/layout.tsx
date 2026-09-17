import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';
import { Inter, Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});
// version02: homepage hero headline only (see HeroSection.tsx `soft` branch)
// — tight, geometric grotesk closer to the reference look than General Sans.
const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['600', '700'],
    variable: '--font-hero',
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
                spaceGrotesk.variable,
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
