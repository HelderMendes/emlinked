'use client';

import React, { use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface LoginPageProps {
    params: Promise<{ locale: string }>;
}

const content = {
    nl: {
        title: 'Inloggen Emlinked Portal',
        subtitle: 'Toegang tot de beschermde documentatie en releases.',
        emailLabel: 'E-mailadres',
        passwordLabel: 'Wachtwoord',
        buttonText: 'Inloggen (Simulatie)',
        notice: 'Opmerking: Klik op de knop om in te loggen en de documentatie te ontgrendelen.',
    },
    en: {
        title: 'Login Emlinked Portal',
        subtitle: 'Access the protected documentation and release notes.',
        emailLabel: 'Email Address',
        passwordLabel: 'Password',
        buttonText: 'Sign In (Simulation)',
        notice: 'Note: Click the button to log in and unlock the documentation portal.',
    },
} as const;

export default function LoginPage({ params }: LoginPageProps) {
    const { locale } = use(params);
    const router = useRouter();
    const searchParams = useSearchParams();

    const callbackUrl = searchParams.get('callbackUrl') || '/docs';
    const t = content[locale as 'nl' | 'en'] || content.nl;

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Set cookie valid for 1 hour
        document.cookie = 'emlinked_session=true; path=/; max-age=3600';

        // Redirect back to callback URL
        router.push(callbackUrl);
    };

    return (
        <div className='flex-grow flex items-center justify-center py-20 px-6 bg-radial from-card via-background to-background'>
            <div className='w-full max-w-md p-8 rounded-xl border border-border bg-card shadow-2xl flex flex-col gap-6'>
                {/* Header */}
                <div className='text-center space-y-2'>
                    <span className='font-display text-2xl font-bold tracking-tight text-primary'>
                        em<span className='text-foreground'>linked</span>
                    </span>
                    <h1 className='text-xl font-bold text-foreground mt-2'>
                        {t.title}
                    </h1>
                    <p className='text-xs text-muted-foreground'>
                        {t.subtitle}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-xs font-semibold text-muted-foreground'>
                            {t.emailLabel}
                        </label>
                        <input
                            type='email'
                            defaultValue='admin@emlinked.com'
                            disabled
                            className='h-10 px-3 rounded-md border border-border bg-muted/30 text-xs text-muted-foreground cursor-not-allowed'
                        />
                    </div>

                    <div className='flex flex-col gap-1.5'>
                        <label className='text-xs font-semibold text-muted-foreground'>
                            {t.passwordLabel}
                        </label>
                        <input
                            type='password'
                            defaultValue='••••••••'
                            disabled
                            className='h-10 px-3 rounded-md border border-border bg-muted/30 text-xs text-muted-foreground cursor-not-allowed'
                        />
                    </div>

                    <button
                        type='submit'
                        className='h-11 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/95 transition-all text-xs cursor-pointer mt-2'
                    >
                        {t.buttonText}
                    </button>
                </form>

                <p className='text-[10px] text-center text-muted-foreground/75 leading-relaxed'>
                    {t.notice}
                </p>
            </div>
        </div>
    );
}
