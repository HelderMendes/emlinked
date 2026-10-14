'use client';

import Script from 'next/script';

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
        const win = window as any;
        if (!win.grecaptcha || typeof win.grecaptcha.ready !== 'function') {
            resolve(null);
            return;
        }
        win.grecaptcha.ready(() => {
            win.grecaptcha
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
