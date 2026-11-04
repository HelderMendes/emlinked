'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const COOKIE_NAME = 'emlinked_cookie_consent';

interface CookiePreferences {
    functional?: boolean;
    analytics?: boolean;
    marketing?: boolean;
}

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

function readStoredConsent(): CookiePreferences | null {
    if (typeof document === 'undefined') return null;
    const cookies = document.cookie.split('; ');
    const row = cookies.find((c) => c.startsWith(`${COOKIE_NAME}=`));
    if (!row) return null;
    try {
        return JSON.parse(decodeURIComponent(row.split('=')[1]));
    } catch {
        return null;
    }
}

function applyConsentUpdate(prefs: CookiePreferences) {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
        return;
    }
    const analyticsGranted = prefs.analytics ? 'granted' : 'denied';
    const marketingGranted = prefs.marketing ? 'granted' : 'denied';

    window.gtag('consent', 'update', {
        analytics_storage: analyticsGranted,
        ad_storage: marketingGranted,
        ad_user_data: marketingGranted,
        ad_personalization: marketingGranted,
    });
}

export function GoogleAnalytics() {
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    useEffect(() => {
        if (!measurementId) return;

        // Sync stored cookie preferences if visitor already made a choice
        const stored = readStoredConsent();
        if (stored) {
            applyConsentUpdate(stored);
        }

        const handleConsentEvent = (event: Event) => {
            const customEvent = event as CustomEvent<CookiePreferences>;
            if (customEvent.detail) {
                applyConsentUpdate(customEvent.detail);
            }
        };

        window.addEventListener('cookie_consent_updated', handleConsentEvent);
        return () => {
            window.removeEventListener(
                'cookie_consent_updated',
                handleConsentEvent,
            );
        };
    }, [measurementId]);

    if (!measurementId) {
        return null;
    }

    return (
        <>
            <Script
                id='ga-consent-default'
                strategy='afterInteractive'
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        window.gtag = gtag;
                        gtag('consent', 'default', {
                            'analytics_storage': 'granted',
                            'ad_storage': 'denied',
                            'ad_user_data': 'denied',
                            'ad_personalization': 'denied',
                            'wait_for_update': 500
                        });
                        try {
                            var match = document.cookie.split('; ').find(function(r){ return r.indexOf('${COOKIE_NAME}=') === 0; });
                            if (match) {
                                var prefs = JSON.parse(decodeURIComponent(match.split('=')[1]));
                                gtag('consent', 'update', {
                                    'analytics_storage': prefs.analytics ? 'granted' : 'denied',
                                    'ad_storage': prefs.marketing ? 'granted' : 'denied',
                                    'ad_user_data': prefs.marketing ? 'granted' : 'denied',
                                    'ad_personalization': prefs.marketing ? 'granted' : 'denied'
                                });
                            }
                        } catch (e) {}
                        gtag('js', new Date());
                        gtag('config', '${measurementId}', {
                            'anonymize_ip': true,
                            'linker': {
                                'domains': ['emlinked.com', 'www.emlinked.com', 'emlinked.nl', 'www.emlinked.nl']
                            }
                        });
                    `,
                }}
            />
            <Script
                id='ga-gtag-script'
                strategy='afterInteractive'
                src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            />
        </>
    );
}
