'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Script from 'next/script';
import {
    createQuoteContactSchema,
    flattenQuoteContactErrors,
    type QuoteContactFieldErrors,
} from '@/lib/validation/quote';
import {
    Sparkles,
    Check,
    X,
    Building2,
    Mail,
    User,
    Loader2,
    Send,
} from 'lucide-react';
import { PhoneInput } from '@/components/ui/PhoneInput';

export type QuoteRequestItem = {
    category: string;
    label?: string;
    priceFormatted: string;
};

interface QuoteRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    locale?: string;
    title?: string;
    subtitle?: string;
    oneTimeItems: QuoteRequestItem[];
    monthlyItems?: QuoteRequestItem[];
    totalOneTime?: string;
    totalMonthly?: string;
    baseMonthlyPrice?: string;
    monthlyAdditions?: string;
    supportFee?: string;
}

// Shared lead-capture modal: contact form + zod validation + reCAPTCHA +
// submit to /api/quote. Used by the full pricing calculator and by any
// single-item purchase flow (e.g. Strippenkaarten) — the monthly
// subscription breakdown only renders when monthlyItems is non-empty.
export function QuoteRequestModal({
    isOpen,
    onClose,
    locale = 'nl',
    title,
    subtitle,
    oneTimeItems,
    monthlyItems = [],
    totalOneTime = '€ 0,00',
    totalMonthly = '€ 0,00',
    baseMonthlyPrice = '€ 0,00',
    monthlyAdditions = '€ 0,00',
    supportFee = '€ 0,00',
}: QuoteRequestModalProps) {
    const isEn = locale === 'en';

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<QuoteContactFieldErrors>({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
    });

    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const recaptchaContainerRef = useRef<HTMLDivElement>(null);
    const recaptchaWidgetIdRef = useRef<number | null>(null);
    const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    useEffect(() => {
        if (!isOpen || !recaptchaSiteKey || !mounted) return;

        const renderWidget = () => {
            const win = window as any;
            if (
                win.grecaptcha &&
                recaptchaContainerRef.current &&
                recaptchaWidgetIdRef.current === null
            ) {
                try {
                    recaptchaWidgetIdRef.current = win.grecaptcha.render(
                        recaptchaContainerRef.current,
                        {
                            sitekey: recaptchaSiteKey,
                            callback: (token: string) =>
                                setRecaptchaToken(token),
                            'expired-callback': () => setRecaptchaToken(null),
                            'error-callback': () => setRecaptchaToken(null),
                        },
                    );
                } catch (err) {
                    console.error('reCAPTCHA render error:', err);
                }
            }
        };

        const win = window as any;
        if (win.grecaptcha) {
            renderWidget();
        } else {
            window.addEventListener('recaptcha-ready', renderWidget);
        }

        return () => {
            window.removeEventListener('recaptcha-ready', renderWidget);
            const win = window as any;
            if (win.grecaptcha && recaptchaWidgetIdRef.current !== null) {
                try {
                    win.grecaptcha.reset(recaptchaWidgetIdRef.current);
                } catch (e) {}
                recaptchaWidgetIdRef.current = null;
            }
            setRecaptchaToken(null);
        };
    }, [isOpen, recaptchaSiteKey, mounted]);

    const handleClose = () => {
        onClose();
        setIsSubmitted(false);
        setSubmitError(null);
        setFieldErrors({});
        setFormData({ name: '', email: '', phone: '', company: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);
        setFieldErrors({});

        const contactSchema = createQuoteContactSchema(isEn);
        const validation = contactSchema.safeParse(formData);
        if (!validation.success) {
            setFieldErrors(flattenQuoteContactErrors(validation.error));
            setSubmitError(
                isEn
                    ? 'Please check the highlighted fields.'
                    : 'Controleer de gemarkeerde velden.',
            );
            return;
        }

        if (recaptchaSiteKey && !recaptchaToken) {
            setSubmitError(
                isEn
                    ? 'Please complete the reCAPTCHA check.'
                    : 'Voltooi de reCAPTCHA-controle.',
            );
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    oneTimeItems,
                    monthlyItems,
                    baseMonthlyPrice,
                    monthlyAdditions,
                    supportFee,
                    totalOneTime,
                    totalMonthly,
                    locale,
                    recaptchaToken,
                }),
            });

            if (!res.ok) {
                const errData = await res.json();
                if (errData.fieldErrors) setFieldErrors(errData.fieldErrors);
                throw new Error(
                    errData.error ||
                        (isEn
                            ? 'Failed to send quote request.'
                            : 'Fout bij het verzenden van de offerte.'),
                );
            }

            setIsSubmitted(true);
        } catch (err: any) {
            console.error('Submit quote error:', err);
            setSubmitError(
                err.message ||
                    (isEn
                        ? 'An unexpected error occurred.'
                        : 'Er is een onverwachte fout opgetreden.'),
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className='fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn'>
            <div className='relative w-full max-w-xl rounded-2xl bg-white p-6 sm:p-8 text-[#060e32] shadow-2xl border border-teal/30 max-h-[90vh] overflow-y-auto'>
                <button
                    type='button'
                    onClick={handleClose}
                    className='absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors'
                >
                    <X className='w-5 h-5' />
                </button>

                {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className='space-y-2 text-left border-b border-slate-100 pb-4'>
                            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/15 text-teal text-[10px] font-mono font-bold uppercase'>
                                <Sparkles className='w-3.5 h-3.5' />
                                {isEn ? 'QUOTE CONFIGURATION' : 'OFFERTE CONFIGURATIE'}
                            </div>
                            <h3 className='text-2xl font-bold text-[#060e32]'>
                                {title ||
                                    (isEn
                                        ? 'Receive your custom proposal'
                                        : 'Ontvang je persoonlijke offerte')}
                            </h3>
                            <p className='text-xs text-slate-600 font-light'>
                                {subtitle ||
                                    (isEn
                                        ? 'Fill in your details below. We will send the full specification and pricing breakdown to your email.'
                                        : 'Vul je gegevens in. We sturen de volledige specificatie en kostenopbouw direct naar je e-mailadres.')}
                            </p>
                        </div>

                        {oneTimeItems.length > 0 && (
                            <div className='p-3 rounded-lg bg-slate-100 border border-slate-200 space-y-2 text-xs font-mono text-left'>
                                <span className='block text-[10px] font-bold uppercase tracking-wider text-slate-500'>
                                    {isEn ? 'One-time Costs' : 'Eenmalige Kosten'}
                                </span>

                                <div className='divide-y divide-slate-200/60'>
                                    {oneTimeItems.map((item, idx) => (
                                        <div key={idx} className='py-1'>
                                            <div className='flex justify-between items-center font-medium text-[#060e32]'>
                                                <span>{item.category}</span>
                                                <span className='font-semibold'>
                                                    {item.priceFormatted}
                                                </span>
                                            </div>
                                            {item.label && (
                                                <div className='pl-3 pt-0.5 text-[11px] text-slate-500 font-normal'>
                                                    <span>• {item.label}</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className='flex justify-between items-center pt-2 border-t border-slate-300'>
                                    <span className='text-[10px] font-semibold uppercase tracking-wide text-navy-700'>
                                        {isEn
                                            ? 'Total One-time Costs'
                                            : 'Totaal – Eenmalige Kosten'}
                                    </span>
                                    <span className='text-xs font-bold text-[#060e32]'>
                                        {totalOneTime}
                                    </span>
                                </div>
                            </div>
                        )}

                        {monthlyItems.length > 0 && (
                            <div className='p-4 rounded-lg bg-white border border-teal/30 divide-y divide-slate-200 text-xs font-mono max-h-60 overflow-y-auto text-left'>
                                {monthlyItems.map((item, idx) => (
                                    <div key={idx} className='py-1 text-slate-700'>
                                        <div className='flex justify-between items-center font-medium'>
                                            <span>{item.category}</span>
                                            <span className='font-semibold text-[#060e32]'>
                                                {item.priceFormatted}
                                            </span>
                                        </div>
                                        {item.label && (
                                            <div className='pl-3 pt-0.5 text-[11px] text-teal-800 font-normal'>
                                                <span>• {item.label}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <div className='pt-3 space-y-1.5 border-t border-slate-300'>
                                    <div className='flex justify-between text-slate-700 text-xs'>
                                        <span>
                                            {isEn
                                                ? 'emlinked Base Monthly Subscription'
                                                : 'emlinked Basis Maand Abonnement'}
                                        </span>
                                        <span className='font-semibold text-slate-900'>
                                            {baseMonthlyPrice}
                                        </span>
                                    </div>
                                    <div className='flex justify-between text-slate-700 text-xs'>
                                        <span>
                                            {isEn
                                                ? 'Monthly Subscriptions – Extra Services'
                                                : 'Maand Abonnement – Extra Diensten'}
                                        </span>
                                        <span className='font-semibold text-slate-900'>
                                            {monthlyAdditions}
                                        </span>
                                    </div>
                                    <div className='flex justify-between text-teal-700 text-xs'>
                                        <span>Support fee (20%)</span>
                                        <span className='font-semibold'>
                                            {supportFee}
                                        </span>
                                    </div>
                                    <div className='flex justify-between items-center text-slate-900 text-sm pt-2 border-t border-slate-300 font-extrabold'>
                                        <span className='uppercase text-xs tracking-wider text-teal-700'>
                                            {isEn
                                                ? 'Total Monthly Subscription'
                                                : 'TOTAAL – MAAND ABONNEMENT'}
                                        </span>
                                        <span className='text-base text-[#060e32] font-mono'>
                                            {totalMonthly}{' '}
                                            <span className='text-xs text-slate-500 font-normal font-sans'>
                                                / mnd
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className='space-y-4 text-left'>
                            <div>
                                <label className='block text-[10px] font-bold uppercase tracking-wider text-[#060e32]/80 mb-1'>
                                    {isEn ? 'Full Name *' : 'Naam *'}
                                </label>
                                <div className='relative'>
                                    <User className='w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' />
                                    <input
                                        type='text'
                                        required
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        placeholder={
                                            isEn
                                                ? 'e.g. John Doe'
                                                : 'bijv. Jan de Vries'
                                        }
                                        className={`w-full rounded-md border bg-white pl-10 pr-4 py-1.5 text-sm text-[#060e32] focus:outline-hidden focus:ring-2 ${
                                            fieldErrors.name
                                                ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
                                                : 'border-slate-300 focus:border-teal focus:ring-teal/30'
                                        }`}
                                    />
                                </div>
                                {fieldErrors.name && (
                                    <p className='mt-1 text-[11px] text-red-600'>
                                        {fieldErrors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className='block text-[10px] font-bold uppercase tracking-wider text-[#060e32]/80 mb-1'>
                                    {isEn ? 'Email Address *' : 'E-mailadres *'}
                                </label>
                                <div className='relative'>
                                    <Mail className='w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' />
                                    <input
                                        type='email'
                                        required
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                        placeholder='jan@organisatie.nl'
                                        className={`w-full rounded-md border bg-white pl-10 pr-4 py-1.5 text-sm text-[#060e32] focus:outline-hidden focus:ring-2 ${
                                            fieldErrors.email
                                                ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
                                                : 'border-slate-300 focus:border-teal focus:ring-teal/30'
                                        }`}
                                    />
                                </div>
                                {fieldErrors.email && (
                                    <p className='mt-1 text-[11px] text-red-600'>
                                        {fieldErrors.email}
                                    </p>
                                )}
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-[10px] font-bold uppercase tracking-wider text-[#060e32]/80 mb-1'>
                                        {isEn ? 'Phone Number *' : 'Telefoonnummer *'}
                                    </label>
                                    <PhoneInput
                                        value={formData.phone}
                                        onChange={(v) =>
                                            setFormData({ ...formData, phone: v })
                                        }
                                        locale={locale}
                                        required
                                        className={
                                            fieldErrors.phone
                                                ? 'rounded-md border-red-400 focus-within:border-red-400 focus-within:ring-red-200'
                                                : 'rounded-md border-slate-300'
                                        }
                                    />
                                    {fieldErrors.phone && (
                                        <p className='mt-1 text-[11px] text-red-600'>
                                            {fieldErrors.phone}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className='block text-[10px] font-bold uppercase tracking-wider text-[#060e32]/80 mb-1'>
                                        {isEn ? 'Company Name' : 'Bedrijfsnaam'}
                                    </label>
                                    <div className='relative'>
                                        <Building2 className='w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' />
                                        <input
                                            type='text'
                                            value={formData.company}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    company: e.target.value,
                                                })
                                            }
                                            placeholder={
                                                isEn
                                                    ? 'Real Estate B.V.'
                                                    : 'Vastgoed Beheer B.V.'
                                            }
                                            className='w-full rounded-md border border-slate-300 bg-white pl-10 pr-4 py-1.5 text-sm text-[#060e32] focus:border-teal focus:outline-hidden focus:ring-2 focus:ring-teal/30'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {recaptchaSiteKey && (
                            <div className='py-1'>
                                <div
                                    ref={recaptchaContainerRef}
                                    className='g-recaptcha'
                                />
                            </div>
                        )}

                        {submitError && (
                            <div className='p-3 rounded-md bg-red-50 text-red-700 text-xs border border-red-200'>
                                {submitError}
                            </div>
                        )}

                        <button
                            type='submit'
                            disabled={isSubmitting}
                            className='w-full h-13 rounded-lg border-0 bg-navy-900 hover:btn-gradient px-6 text-base font-bold text-white transition-all duration-200 shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed'
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className='w-4 h-4 animate-spin' />
                                    <span>
                                        {isEn
                                            ? 'Sending calculation...'
                                            : 'Berekening verzenden...'}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <Send className='w-4 h-4' />
                                    <span>
                                        {isEn
                                            ? 'Receive your calculation'
                                            : 'Ontvang je berekening'}
                                    </span>
                                </>
                            )}
                        </button>
                    </form>
                ) : (
                    <div className='py-2 text-center space-y-4'>
                        <div className='w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto'>
                            <Check className='w-8 h-8' />
                        </div>
                        <h3 className='text-3xl font-bold text-[#060e32] mb-6'>
                            {isEn
                                ? 'Quote Sent Successfully!'
                                : 'Offerte Succesvol Verzonden!'}
                        </h3>
                        <p className='text-slate-800 font-semibold max-w-md mx-auto'>
                            {isEn ? 'Thank you!' : 'Bedankt voor je aanvraag!'}
                        </p>
                        <p className='text-slate-600 max-w-md mx-auto mb-8 -mt-2'>
                            {isEn
                                ? 'The customized PDF specification has been sent to your email. One of our specialists will reach out within 1 business day.'
                                : 'De offerte-specificatie is zojuist naar je mailbox verzonden. Een van onze vastgoedbeheerspecialisten neemt zo snel mogelijk contact met je op.'}
                        </p>
                        <button
                            type='button'
                            onClick={handleClose}
                            className='inline-flex h-11 px-8 rounded-md bg-slate-900 text-white font-semibold items-center justify-center hover:bg-slate-800 transition-colors'
                        >
                            {isEn ? 'Close' : 'Sluiten'}
                        </button>
                    </div>
                )}
            </div>
        </div>,
        document.body,
    );
}

export function QuoteRequestRecaptchaScripts({ active }: { active: boolean }) {
    if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || !active) return null;
    return (
        <>
            <Script
                id='recaptcha-load-callback'
                strategy='afterInteractive'
                dangerouslySetInnerHTML={{
                    __html: `
                        window.onRecaptchaLoad = function() {
                            window.dispatchEvent(new Event('recaptcha-ready'));
                        };
                    `,
                }}
            />
            <Script
                src='https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit'
                strategy='afterInteractive'
                onLoad={() => {
                    window.dispatchEvent(new Event('recaptcha-ready'));
                }}
            />
        </>
    );
}
