import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { ThemeProvider } from '@/components/ThemeProvider';
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Emlinked | Estate Management Linked",
  description: "Premium software voor het beheer van vastgoedportefeuilles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
          lang='nl'
          className={`${inter.variable} ${outfit.variable} h-full antialiased`}
          suppressHydrationWarning
      >
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
