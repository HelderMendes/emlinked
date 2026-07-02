import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function WebLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main className='flex-grow flex flex-col'>{children}</main>
            <Footer />
        </>
    );
}
