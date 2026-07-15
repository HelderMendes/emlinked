import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

// export const metadata: Metadata = {
//     title: 'Emlinked | Estate Management Linked',
//     description: 'Premium software voor het beheer van vastgoedportefeuilles.',
// };

export const metadata: Metadata = {
    title: 'Emlinked | Vastgoedsoftware voor Business Central',
    description:
        'Emlinked helpt vastgoedprofessionals met software voor commercieel portefeuillebeheer in Microsoft Business Central.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='nl' className='h-full antialiased' suppressHydrationWarning>
            <body className='min-h-full flex flex-col'>
                <ThemeProvider
                    attribute='class'
                    defaultTheme='system'
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
