'use client';

import React, { useState } from 'react';
import { Loader2, Check, AlertCircle, Send } from 'lucide-react';
import {
    getRecaptchaToken,
    RecaptchaV3Script,
    RecaptchaAttribution,
} from '@/components/RecaptchaV3';

interface ContactFormProps {
    locale?: string;
}

const translations = {
    nl: {
        formTitle: 'Stuur ons een bericht',
        nameLabel: 'Naam',
        companyLabel: 'Bedrijf',
        emailLabel: 'E-mail',
        phoneLabel: 'Telefoon',
        subjectLabel: 'Onderwerp',
        messageLabel: 'Bericht',
        submitButton: 'Verstuur bericht',
        sendingButton: 'Versturen...',
        successTitle: 'Bericht verstuurd!',
        successMessage:
            'Dank voor uw bericht. Wij nemen zo snel mogelijk contact met u op.',
        errorFallback: 'Er is iets misgegaan. Probeer het later opnieuw.',
    },
    en: {
        formTitle: 'Send us a message',
        nameLabel: 'Name',
        companyLabel: 'Company',
        emailLabel: 'Email',
        phoneLabel: 'Phone',
        subjectLabel: 'Subject',
        messageLabel: 'Message',
        submitButton: 'Send message',
        sendingButton: 'Sending...',
        successTitle: 'Message sent!',
        successMessage:
            "Thank you for your message. We'll get back to you as soon as possible.",
        errorFallback: 'Something went wrong. Please try again later.',
    },
} as const;

export function ContactForm({ locale = 'nl' }: ContactFormProps) {
    const isEn = locale === 'en';
    const t = translations[isEn ? 'en' : 'nl'];
    const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<
        'idle' | 'submitting' | 'success' | 'error'
    >('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            const recaptchaToken = recaptchaSiteKey
                ? await getRecaptchaToken(recaptchaSiteKey, 'contact_form')
                : null;

            const fullMessage = subject
                ? `${isEn ? 'Subject' : 'Onderwerp'}: ${subject}\n\n${message}`
                : message;

            const res = await fetch('/api/demo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    company,
                    message: fullMessage,
                    recaptchaToken,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setErrorMessage(data.error || t.errorFallback);
                setStatus('error');
                return;
            }

            setStatus('success');
        } catch {
            setErrorMessage(t.errorFallback);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className='flex flex-col items-center justify-center gap-3 py-10 text-center'>
                <div className='w-14 h-14 rounded-full bg-emerald-500/15 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center'>
                    <Check className='w-7 h-7' />
                </div>
                <h3 className='font-display text-xl font-bold text-navy-900'>
                    {t.successTitle}
                </h3>
                <p className='text-sm text-navy-600 max-w-sm'>
                    {t.successMessage}
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <h2 className='font-display text-xl font-bold text-navy-900 mb-1'>
                {t.formTitle}
            </h2>

            {status === 'error' && (
                <div className='p-3 bg-red-500/10 border border-red-500/20 text-red-600 rounded-lg flex items-start gap-2 text-xs'>
                    <AlertCircle className='h-4 w-4 shrink-0 mt-0.5' />
                    <span>{errorMessage}</span>
                </div>
            )}

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='flex flex-col gap-1.5'>
                    <label className='text-[10px] font-extrabold text-navy-900 uppercase tracking-wider font-mono'>
                        {t.nameLabel}{' '}
                        <span className='text-teal'>*</span>
                    </label>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={status === 'submitting'}
                        className='w-full h-10 px-3 rounded-lg border border-navy-900/15 bg-white text-xs text-navy-900 placeholder:text-navy-900/40 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal disabled:opacity-60'
                    />
                </div>
                <div className='flex flex-col gap-1.5'>
                    <label className='text-[10px] font-extrabold text-navy-900 uppercase tracking-wider font-mono'>
                        {t.companyLabel}
                    </label>
                    <input
                        type='text'
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        disabled={status === 'submitting'}
                        className='w-full h-10 px-3 rounded-lg border border-navy-900/15 bg-white text-xs text-navy-900 placeholder:text-navy-900/40 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal disabled:opacity-60'
                    />
                </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='flex flex-col gap-1.5'>
                    <label className='text-[10px] font-extrabold text-navy-900 uppercase tracking-wider font-mono'>
                        {t.emailLabel}{' '}
                        <span className='text-teal'>*</span>
                    </label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={status === 'submitting'}
                        className='w-full h-10 px-3 rounded-lg border border-navy-900/15 bg-white text-xs text-navy-900 placeholder:text-navy-900/40 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal disabled:opacity-60'
                    />
                </div>
                <div className='flex flex-col gap-1.5'>
                    <label className='text-[10px] font-extrabold text-navy-900 uppercase tracking-wider font-mono'>
                        {t.phoneLabel}
                    </label>
                    <input
                        type='tel'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={status === 'submitting'}
                        className='w-full h-10 px-3 rounded-lg border border-navy-900/15 bg-white text-xs text-navy-900 placeholder:text-navy-900/40 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal disabled:opacity-60'
                    />
                </div>
            </div>

            <div className='flex flex-col gap-1.5'>
                <label className='text-[10px] font-extrabold text-navy-900 uppercase tracking-wider font-mono'>
                    {t.subjectLabel}
                </label>
                <input
                    type='text'
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    disabled={status === 'submitting'}
                    className='w-full h-10 px-3 rounded-lg border border-navy-900/15 bg-white text-xs text-navy-900 placeholder:text-navy-900/40 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal disabled:opacity-60'
                />
            </div>

            <div className='flex flex-col gap-1.5'>
                <label className='text-[10px] font-extrabold text-navy-900 uppercase tracking-wider font-mono'>
                    {t.messageLabel}{' '}
                    <span className='text-teal'>*</span>
                </label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    disabled={status === 'submitting'}
                    className='w-full p-3 rounded-lg border border-navy-900/15 bg-white text-xs text-navy-900 placeholder:text-navy-900/40 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal disabled:opacity-60'
                />
            </div>

            <button
                type='submit'
                disabled={status === 'submitting'}
                className='w-full h-11 bg-navy-900 hover:btn-gradient text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:scale-[1.01] active:scale-[0.99] duration-150 mt-2'
            >
                {status === 'submitting' ? (
                    <>
                        <Loader2 className='h-4 w-4 animate-spin' />
                        <span>{t.sendingButton}</span>
                    </>
                ) : (
                    <>
                        <Send className='h-4 w-4' />
                        <span>{t.submitButton}</span>
                    </>
                )}
            </button>

            <RecaptchaAttribution locale={locale} />
            <RecaptchaV3Script siteKey={recaptchaSiteKey} active={true} />
        </form>
    );
}
