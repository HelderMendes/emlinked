'use client';

import { useEffect, useState } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const [isEn, setIsEn] = useState(false);

    useEffect(() => {
        console.error(error);
        try {
            setIsEn(document.cookie.includes('emlinked_locale=en'));
        } catch {
            // ignore — default to nl
        }
    }, [error]);

    return (
        <section className='flex flex-col items-center justify-center text-center px-6 py-32 min-h-screen'>
            <span className='text-xs font-mono font-bold uppercase tracking-wider text-teal'>
                {isEn ? 'Something went wrong' : 'Er is iets misgegaan'}
            </span>
            <h1 className='font-display text-3xl md:text-4xl font-bold text-navy-900 tracking-tight mt-3'>
                {isEn
                    ? 'This page failed to load'
                    : 'Deze pagina kon niet worden geladen'}
            </h1>
            <p className='text-base text-navy-700 leading-relaxed mt-4 max-w-md'>
                {isEn
                    ? 'Please try again. If this keeps happening, contact us.'
                    : 'Probeer het opnieuw. Blijft dit gebeuren, neem dan contact met ons op.'}
            </p>
            <button
                type='button'
                onClick={reset}
                className='inline-flex items-center justify-center mt-8 h-11 px-6 rounded-lg bg-navy-900 hover:btn-gradient text-sm font-semibold text-white transition-colors cursor-pointer'
            >
                {isEn ? 'Try again' : 'Probeer opnieuw'}
            </button>
        </section>
    );
}
