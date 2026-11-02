import Link from 'next/link';
import { headers } from 'next/headers';

export default async function NotFound() {
    const headersList = await headers();
    const isEn = headersList.get('x-locale') === 'en';

    return (
        <section className='flex flex-col items-center justify-center text-center px-6 py-32 min-h-screen'>
            <span className='text-xs font-mono font-bold uppercase tracking-wider text-teal'>
                404
            </span>
            <h1 className='font-display text-3xl md:text-4xl font-bold text-navy-900 tracking-tight mt-3'>
                {isEn ? 'Page not found' : 'Pagina niet gevonden'}
            </h1>
            <p className='text-base text-navy-700 leading-relaxed mt-4 max-w-md'>
                {isEn
                    ? "This page doesn't exist or may have moved."
                    : 'Deze pagina bestaat niet (meer) of is verplaatst.'}
            </p>
            <Link
                href={isEn ? '/en' : '/'}
                className='inline-flex items-center justify-center mt-8 h-11 px-6 rounded-lg bg-navy-900 hover:btn-gradient text-sm font-semibold text-white transition-colors'
            >
                {isEn ? 'Back to homepage' : 'Terug naar de homepage'}
            </Link>
        </section>
    );
}
