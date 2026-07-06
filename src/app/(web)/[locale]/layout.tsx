import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface WebLayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

export default async function WebLayout({ children, params }: WebLayoutProps) {
    const { locale } = await params;

    return (
        <>
            <Header locale={locale} />
            <main className='flex-grow flex flex-col'>{children}</main>
            <Footer locale={locale} />
        </>
    );
}
