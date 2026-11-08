'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound() {
    const pathname = usePathname() || '';
    const isEn = pathname === '/en' || pathname.startsWith('/en/');

    return (
        <section className='flex flex-col items-center justify-center text-center px-6 py-32 grow'>
            <meta name='robots' content='noindex, nofollow' />
            <span className='text-[180px] leading-50 font-semibold uppercase tracking-tight text-teal'>
                404
            </span>
            <h1 className='font-display text-3xl md:text-4xl font-bold text-navy-900 tracking-tight -mt-2'>
                {isEn ? 'Page not found' : 'Pagina niet gevonden'}
            </h1>
            <p className='text-4xl text-navy-700 leading-relaxed mt-4 max-w-md'>
                {isEn
                    ? "This page doesn't exist!"
                    : 'Deze pagina bestaat niet!'}
            </p>
            <div className='mt-12 flex flex-col sm:flex-row items-center justify-center gap-4'>
                <Link
                    href={isEn ? '/en' : '/'}
                    className='inline-flex items-center justify-center h-11 px-6 rounded-lg bg-navy-900 hover:btn-gradient text-sm font-semibold text-white transition-colors'
                >
                    {isEn ? 'Back to homepage' : 'Terug naar de homepage'}
                </Link>
                <Link
                    href={isEn ? '/en/contact' : '/contact'}
                    className='inline-flex items-center justify-center h-11 px-6 rounded-lg border border-navy-900/20 bg-white hover:border-teal text-sm font-semibold text-navy-900 transition-colors'
                >
                    {isEn ? 'Request a demo' : 'Vraag een demo aan'}
                </Link>
            </div>
        </section>
    );
}
