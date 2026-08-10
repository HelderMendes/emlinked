'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Cookie, Settings, Check, X, Lock } from 'lucide-react';

interface CookieConsentBannerProps {
    locale?: string;
}

interface CookiePreferences {
    functional: boolean;
    analytics: boolean;
    marketing: boolean;
}

const COOKIE_NAME = 'emlinked_cookie_consent';

export default function CookieConsentBanner({
    locale = 'nl',
}: CookieConsentBannerProps) {
    const isEn = locale === 'en';
    const [isVisible, setIsVisible] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>({
        functional: true,
        analytics: false,
        marketing: false,
    });

    useEffect(() => {
        // Read stored consent from cookies
        const cookies = document.cookie.split('; ');
        const consentCookie = cookies.find((row) =>
            row.startsWith(`${COOKIE_NAME}=`),
        );

        if (!consentCookie) {
            // No prior consent choice -> display initial banner
            setIsVisible(true);
        } else {
            try {
                const parsed = JSON.parse(
                    decodeURIComponent(consentCookie.split('=')[1]),
                );
                setPreferences(parsed);
            } catch (e) {
                // Ignore parse errors
            }
        }

        // Listen for custom trigger from Footer link ("Cookie-instellingen")
        const handleOpenEvent = () => {
            setIsVisible(true);
            setShowPreferences(true);
        };

        window.addEventListener('open_cookie_preferences', handleOpenEvent);
        return () => {
            window.removeEventListener(
                'open_cookie_preferences',
                handleOpenEvent,
            );
        };
    }, []);

    const saveConsentCookie = (prefs: CookiePreferences) => {
        const value = encodeURIComponent(JSON.stringify(prefs));
        document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=31536000; SameSite=Lax`;
        setPreferences(prefs);
        setIsVisible(false);
        setShowPreferences(false);

        // Dispatch global event so analytics scripts (GA/PostHog) can react dynamically
        window.dispatchEvent(
            new CustomEvent('cookie_consent_updated', { detail: prefs }),
        );
    };

    const handleAcceptAll = () => {
        saveConsentCookie({
            functional: true,
            analytics: true,
            marketing: true,
        });
    };

    const handleRejectNonEssential = () => {
        saveConsentCookie({
            functional: true,
            analytics: false,
            marketing: false,
        });
    };

    const handleSaveCustom = () => {
        saveConsentCookie(preferences);
    };

    if (!isVisible) return null;

    return (
        <div className='fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-xl z-50 animate-in fade-in slide-in-from-bottom-5 duration-300'>
            <div className='bg-slate-900/95 border border-amber/30 text-white rounded-2xl p-5 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden'>
                {/* Top Ambient Glow */}
                <div className='absolute top-0 right-0 w-32 h-32 bg-amber/10 rounded-full blur-2xl pointer-events-none' />

                {/* HEADER ROW */}
                <div className='flex items-start justify-between gap-4 mb-3'>
                    <div className='flex items-center gap-2.5'>
                        <div className='p-2 rounded-xl bg-amber/15 border border-amber/30 text-amber shadow-xs shrink-0'>
                            <Cookie className='w-5 h-5' />
                        </div>
                        <h3 className='font-bold text-base md:text-lg text-white'>
                            {isEn
                                ? 'Cookie & Privacy Settings'
                                : 'Cookie- & Privacyinstellingen'}
                        </h3>
                    </div>

                    <button
                        onClick={() => setIsVisible(false)}
                        className='text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10'
                        aria-label={isEn ? 'Dismiss banner' : 'Sluit banner'}
                    >
                        <X className='w-4 h-4' />
                    </button>
                </div>

                {/* EXPLANATORY TEXT */}
                {!showPreferences ? (
                    <>
                        <p className='text-xs md:text-sm text-slate-300 leading-relaxed font-light mb-4'>
                            {isEn
                                ? 'We use cookies to ensure optimal functionality of our platform and to analyze traffic. Non-essential cookies are disabled until you consent.'
                                : 'Wij gebruiken cookies voor een optimale werking van ons vastgoedplatform en het analyseren van paginaverkeer. Niet-noodzakelijke cookies worden pas geladen na jouw toestemming.'}
                            <Link
                                href={
                                    isEn
                                        ? '/en/privacybeleid'
                                        : '/privacybeleid'
                                }
                                className='underline hover:text-amber ml-1 transition-colors'
                            >
                                {isEn ? 'Privacy policy' : 'Privacybeleid'}
                            </Link>
                        </p>

                        {/* EQUAL WEIGHT ACTION BUTTONS (GDPR Compliant: Accept All vs Reject Non-Essential) */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1'>
                            <button
                                onClick={handleRejectNonEssential}
                                className='w-full h-11 px-4 rounded-xl border border-white/20 hover:border-white/40 bg-slate-800/80 hover:bg-slate-800 text-xs md:text-sm font-semibold text-white transition-all duration-200 shadow-sm flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]'
                            >
                                <span>
                                    {isEn
                                        ? 'Necessary only'
                                        : 'Alleen noodzakelijk'}
                                </span>
                            </button>

                            <button
                                onClick={handleAcceptAll}
                                className='w-full h-11 px-4 rounded-xl border border-amber/50 bg-linear-to-r from-[#FF9500] via-[#FF5E00] to-[#FF3B00] hover:brightness-110 text-xs md:text-sm font-bold text-white transition-all duration-200 shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]'
                            >
                                <Check className='w-4 h-4' />
                                <span>
                                    {isEn ? 'Accept all' : 'Alles accepteren'}
                                </span>
                            </button>
                        </div>

                        <div className='pt-3 text-center sm:text-right'>
                            <button
                                onClick={() => setShowPreferences(true)}
                                className='text-xs text-amber hover:text-amber-light underline font-medium inline-flex items-center gap-1.5 transition-colors'
                            >
                                <Settings className='w-3.5 h-3.5' />
                                <span>
                                    {isEn
                                        ? 'Manage preferences'
                                        : 'Voorkeuren beheren'}
                                </span>
                            </button>
                        </div>
                    </>
                ) : (
                    /* SECOND LAYER: GRANULAR PREFERENCE DRAWER */
                    <div className='space-y-4 pt-1 animate-in fade-in duration-200'>
                        <p className='text-xs text-slate-300 leading-relaxed font-light'>
                            {isEn
                                ? 'Customize your cookie settings below. Essential cookies are required to deliver the core service.'
                                : 'Pas jouw cookie-voorkeuren aan. Noodzakelijke cookies zijn vereist voor de basisfunctionaliteit.'}
                        </p>

                        <div className='space-y-3 bg-slate-950/60 border border-white/10 rounded-xl p-3.5'>
                            {/* Functional (Locked Always Active) */}
                            <div className='flex items-center justify-between gap-3 pb-3 border-b border-white/10'>
                                <div>
                                    <div className='flex items-center gap-1.5 text-xs font-bold text-white'>
                                        <Lock className='w-3 h-3 text-emerald-400' />
                                        <span>
                                            {isEn
                                                ? 'Functional (Mandatory)'
                                                : 'Noodzakelijk & Functioneel'}
                                        </span>
                                    </div>
                                    <p className='text-[11px] text-slate-400 font-light mt-0.5'>
                                        {isEn
                                            ? 'Core ERP functionality, session tokens, and language preferences.'
                                            : 'Noodzakelijk voor navigatie, taalvoorkeur en beveiliging.'}
                                    </p>
                                </div>
                                <span className='text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md shrink-0'>
                                    {isEn ? 'Active' : 'Altijd actief'}
                                </span>
                            </div>

                            {/* Analytics (Default Off) */}
                            <div className='flex items-center justify-between gap-3 pb-3 border-b border-white/10'>
                                <div>
                                    <div className='text-xs font-bold text-white'>
                                        {isEn
                                            ? 'Analytical Cookies'
                                            : 'Analytische Cookies'}
                                    </div>
                                    <p className='text-[11px] text-slate-400 font-light mt-0.5'>
                                        {isEn
                                            ? 'Anonymous website usage stats to improve speed & user experience.'
                                            : 'Anonieme statistieken om de snelheid en gebruikerservaring te verbeteren.'}
                                    </p>
                                </div>
                                <input
                                    type='checkbox'
                                    checked={preferences.analytics}
                                    onChange={(e) =>
                                        setPreferences((prev) => ({
                                            ...prev,
                                            analytics: e.target.checked,
                                        }))
                                    }
                                    className='w-5 h-5 accent-amber rounded-md cursor-pointer shrink-0'
                                />
                            </div>

                            {/* Marketing (Default Off) */}
                            <div className='flex items-center justify-between gap-3'>
                                <div>
                                    <div className='text-xs font-bold text-white'>
                                        {isEn
                                            ? 'Marketing & Targeting'
                                            : 'Marketing & Tracking'}
                                    </div>
                                    <p className='text-[11px] text-slate-400 font-light mt-0.5'>
                                        {isEn
                                            ? 'Relevant commercial updates and software integration news.'
                                            : 'Relevant nieuws over vastgoedbeheer en software-integraties.'}
                                    </p>
                                </div>
                                <input
                                    type='checkbox'
                                    checked={preferences.marketing}
                                    onChange={(e) =>
                                        setPreferences((prev) => ({
                                            ...prev,
                                            marketing: e.target.checked,
                                        }))
                                    }
                                    className='w-5 h-5 accent-amber rounded-md cursor-pointer shrink-0'
                                />
                            </div>
                        </div>

                        {/* SAVE CUSTOM PREFERENCES */}
                        <div className='flex items-center justify-between gap-3 pt-1'>
                            <button
                                onClick={() => setShowPreferences(false)}
                                className='text-xs text-slate-400 hover:text-white underline transition-colors'
                            >
                                {isEn ? '← Back' : '← Terug'}
                            </button>

                            <button
                                onClick={handleSaveCustom}
                                className='h-10 px-5 rounded-xl border border-amber/40 bg-amber/15 hover:bg-amber text-xs font-bold text-amber hover:text-slate-950 transition-all duration-200 shadow-sm'
                            >
                                {isEn
                                    ? 'Save preferences'
                                    : 'Voorkeuren opslaan'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
