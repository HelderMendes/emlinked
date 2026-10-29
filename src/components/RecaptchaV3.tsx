'use client';

import Script from 'next/script';

interface Grecaptcha {
    ready: (callback: () => void) => void;
    execute: (
        siteKey: string,
        options: { action: string },
    ) => Promise<string>;
}

/**
 * Fetches a fresh v3 token right before a submit. v3 has no visible
 * widget and no "complete the challenge" step — grecaptcha.ready()
 * handles the case where the script is still loading when this is
 * called, same guarantee the explicit v2 API gave render() callers.
 */
export function getRecaptchaToken(
    siteKey: string,
    action: string,
): Promise<string | null> {
    return new Promise((resolve) => {
        const grecaptcha = (window as Window & { grecaptcha?: Grecaptcha })
            .grecaptcha;
        if (!grecaptcha || typeof grecaptcha.ready !== 'function') {
            resolve(null);
            return;
        }
        grecaptcha.ready(() => {
            grecaptcha
                .execute(siteKey, { action })
                .then((token: string) => resolve(token))
                .catch(() => resolve(null));
        });
    });
}

/**
 * Loads the v3 script (render=SITE_KEY, not render=explicit — v3 has no
 * widget to explicitly render). Shared by every form using getRecaptchaToken
 * so the script is only requested once per mounted form, gated on whichever
 * "active" condition that form uses (isOpen for modals, mounted for the
 * always-visible footer form).
 */
export function RecaptchaV3Script({
    siteKey,
    active,
}: {
    siteKey?: string;
    active: boolean;
}) {
    if (!siteKey || !active) return null;
    return (
        <Script
            src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
            strategy='afterInteractive'
        />
    );
}

/**
 * Google requires this attribution wherever the reCAPTCHA badge is hidden
 * (see .grecaptcha-badge rule in globals.css) — ToS: the badge or this text,
 * one of the two must be visible near the protected form.
 */
export function RecaptchaAttribution({
    locale,
    className,
}: {
    locale?: string;
    className?: string;
}) {
    const isEn = locale === 'en';
    return (
        <p className={className ?? 'text-[10px] text-navy-500/70 leading-relaxed'}>
            {isEn ? (
                <>
                    This site is protected by reCAPTCHA and the Google{' '}
                    <a
                        href='https://policies.google.com/privacy'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='underline hover:text-teal'
                    >
                        Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a
                        href='https://policies.google.com/terms'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='underline hover:text-teal'
                    >
                        Terms of Service
                    </a>{' '}
                    apply.
                </>
            ) : (
                <>
                    Deze site wordt beschermd door reCAPTCHA en het{' '}
                    <a
                        href='https://policies.google.com/privacy'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='underline hover:text-teal'
                    >
                        privacybeleid
                    </a>{' '}
                    en de{' '}
                    <a
                        href='https://policies.google.com/terms'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='underline hover:text-teal'
                    >
                        servicevoorwaarden
                    </a>{' '}
                    van Google zijn van toepassing.
                </>
            )}
        </p>
    );
}
