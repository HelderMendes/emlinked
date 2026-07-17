'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, MapPin, Phone, Check, AlertCircle, Loader2 } from 'lucide-react';
import { BsLinkedin, BsTwitterX } from 'react-icons/bs';
import Script from 'next/script';

interface DemoModalProps {
    isOpen: boolean;
    onClose: () => void;
    calendlyUrl?: string;
    locale?: string;
    settings?: {
        phone?: string;
        email?: string;
        address?: string;
        linkedinUrl?: string;
        twitterUrl?: string;
    };
}

const translations = {
    nl: {
        title: 'Demo aanvraag',
        subtitle: 'We horen graag van je. Ons team staat voor je klaar.',
        formTitle: 'Demo aanvragen',
        formSubtitle: 'Vul je gegevens in voor een live 1-op-1 demonstratie van ons platform.',
        
        firstNameLabel: 'Voornaam',
        lastNameLabel: 'Achternaam',
        emailLabel: 'E-mailadres',
        phoneLabel: 'Telefoonnummer',
        companyLabel: 'Organisatie',
        portfolioLabel: 'Omvang portefeuille',
        messageLabel: 'Bericht / Vraag',
        
        placeholderFirstName: 'Sander',
        placeholderLastName: 'de Bruijn',
        placeholderEmail: 'sander@bedrijf.nl',
        placeholderPhone: '+31 (0) 6 12345678',
        placeholderCompany: 'Vastgoedbeheer B.V.',
        placeholderMessage: 'Laat een bericht achter...',
        
        chatTitle: 'Stuur een e-mail',
        chatDesc: 'Ons team beantwoordt al je vragen.',
        officeTitle: 'Kantoor',
        officeDesc: 'Kom langs op ons hoofdkantoor.',
        phoneTitle: 'Bellen',
        phoneDesc: 'Maandag t/m vrijdag van 9:00 tot 17:00.',
        
        submitBtn: 'Demo aanvragen',
        sendingBtn: 'Verzenden...',
        successTitle: 'Demo aanvraag verzonden!',
        successMessage: 'Beste {name}, we hebben je aanvraag in goede orde ontvangen. Ons team neemt zo snel mogelijk contact met je op.',
        closeBtn: 'Sluiten',
        
        errorRecaptcha: 'Bevestig a.u.b. dat je geen robot bent.',
        portfolioOption1: 'Minder dan 10 objecten',
        portfolioOption2: '10 tot 50 objecten',
        portfolioOption3: '50 tot 250 objecten',
        portfolioOption4: 'Meer dan 250 objecten',
    },
    en: {
        title: 'Request a Demo',
        subtitle: 'We would love to hear from you. Our team is here to help.',
        formTitle: 'Request a Demo',
        formSubtitle: 'Fill in your details for a live 1-on-1 demonstration of our platform.',
        
        firstNameLabel: 'First name',
        lastNameLabel: 'Last name',
        emailLabel: 'Email address',
        phoneLabel: 'Phone number',
        companyLabel: 'Company / Organization',
        portfolioLabel: 'Portfolio size',
        messageLabel: 'Message',
        
        placeholderFirstName: 'Alex',
        placeholderLastName: 'Smith',
        placeholderEmail: 'alex@company.com',
        placeholderPhone: '+31 (0) 6 12345678',
        placeholderCompany: 'Property Management Ltd.',
        placeholderMessage: 'Leave us a message...',
        
        chatTitle: 'Email us',
        chatDesc: 'Our friendly team is here to help.',
        officeTitle: 'Office',
        officeDesc: 'Come say hello at our office HQ.',
        phoneTitle: 'Phone',
        phoneDesc: 'Mon-Fri from 9:00 to 17:00.',
        
        submitBtn: 'Request Demo',
        sendingBtn: 'Sending...',
        successTitle: 'Request submitted!',
        successMessage: 'Dear {name}, we have received your request. Our team will contact you as soon as possible.',
        closeBtn: 'Close',
        
        errorRecaptcha: 'Please verify that you are not a robot.',
        portfolioOption1: 'Less than 10 properties',
        portfolioOption2: '10 to 50 properties',
        portfolioOption3: '50 to 250 properties',
        portfolioOption4: 'More than 250 properties',
    }
} as const;

export function DemoModal({ isOpen, onClose, locale = 'nl', settings }: DemoModalProps) {
    const t = translations[locale as 'nl' | 'en'] || translations.nl;
    
    const [mounted, setMounted] = useState(false);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    
    // Form fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [portfolioSize, setPortfolioSize] = useState<string>(t.portfolioOption2);
    const [message, setMessage] = useState('');
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

    const recaptchaContainerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<number | null>(null);

    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    useEffect(() => {
        setMounted(true);
    }, []);

    // Handle escape key to close modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Handle reCAPTCHA script load and element rendering
    useEffect(() => {
        if (!isOpen || !siteKey || !mounted) return;

        const renderWidget = () => {
            const win = window as any;
            if (win.grecaptcha && recaptchaContainerRef.current && widgetIdRef.current === null) {
                try {
                    widgetIdRef.current = win.grecaptcha.render(recaptchaContainerRef.current, {
                        sitekey: siteKey,
                        callback: (token: string) => setRecaptchaToken(token),
                        'expired-callback': () => setRecaptchaToken(null),
                        'error-callback': () => setRecaptchaToken(null),
                    });
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
            if (win.grecaptcha && widgetIdRef.current !== null) {
                try {
                    // Reset widget on unmount to prevent duplicated render calls
                    win.grecaptcha.reset(widgetIdRef.current);
                } catch (e) {}
                widgetIdRef.current = null;
            }
        };
    }, [isOpen, siteKey, mounted]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // reCAPTCHA client validation
        if (siteKey && !recaptchaToken) {
            setStatus('error');
            setErrorMessage(t.errorRecaptcha);
            return;
        }

        setStatus('submitting');
        setErrorMessage('');

        try {
            const res = await fetch('/api/demo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: `${firstName} ${lastName}`.trim(),
                    email,
                    phone,
                    company,
                    portfolioSize,
                    message,
                    recaptchaToken,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Er is een fout opgetreden.');
            }

            setStatus('success');
        } catch (err: any) {
            setStatus('error');
            setErrorMessage(err.message || 'Verzending mislukt. Probeer het later opnieuw.');
        }
    };

    const handleClose = () => {
        // Reset states
        setStatus('idle');
        setErrorMessage('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setCompany('');
        setPortfolioSize(t.portfolioOption2);
        setMessage('');
        setRecaptchaToken(null);
        const win = window as any;
        if (win.grecaptcha && widgetIdRef.current !== null) {
            try {
                win.grecaptcha.reset(widgetIdRef.current);
            } catch (e) {}
        }
        onClose();
    };

    if (!mounted) return null;

    const emailDisplay = settings?.email || 'info@emlinked.nl';
    const phoneDisplay = settings?.phone || '+31 (0) 88 707 7000';
    const addressDisplay = settings?.address || 'Gooimeer 12, 1411 DE Naarden';

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className='fixed inset-0 z-9999 flex items-center justify-center p-4 overflow-y-auto'>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className='fixed inset-0 bg-background/80 backdrop-blur-sm pointer-events-auto'
                    />

                    {/* Modal Box */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                        className='relative w-full max-w-4xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row pointer-events-auto z-10 my-8'
                    >
                        {/* Close button */}
                        <button
                            onClick={handleClose}
                            className='absolute top-4 right-4 h-8 w-8 rounded-full bg-muted/40 hover:bg-muted/80 flex items-center justify-center text-foreground hover:text-foreground/80 transition-colors z-20 cursor-pointer'
                            aria-label='Sluit modal'
                        >
                            <X className='h-4 w-4' />
                        </button>

                        {/* Left Column - Contact Details (Aesthetic Brand Panel) */}
                        <div className='w-full md:w-[320px] bg-gradient-to-br from-[#060e32] to-[#0c1a52] text-white p-8 flex flex-col justify-between relative overflow-hidden shrink-0'>
                            <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,var(--color-primary)/8,transparent_50%)] pointer-events-none' />

                            <div className='space-y-8 relative z-10 text-left'>
                                <div>
                                    <h3 className='font-display font-extrabold text-2xl tracking-tight text-white uppercase'>
                                        {t.title}
                                    </h3>
                                    <p className='text-xs text-slate-300 mt-2 leading-relaxed'>
                                        {t.subtitle}
                                    </p>
                                </div>

                                <div className='space-y-6 pt-4 border-t border-white/10'>
                                    {/* Email */}
                                    <div className='flex gap-4 items-start'>
                                        <div className='h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#ff9400] shrink-0'>
                                            <Mail className='h-4.5 w-4.5' />
                                        </div>
                                        <div>
                                            <h4 className='text-xs font-bold text-white uppercase tracking-wider font-mono'>
                                                {t.chatTitle}
                                            </h4>
                                            <p className='text-[10px] text-slate-400 mt-0.5'>{t.chatDesc}</p>
                                            <a href={`mailto:${emailDisplay}`} className='text-xs font-semibold text-[#ff9400] hover:underline mt-1 block'>
                                                {emailDisplay}
                                            </a>
                                        </div>
                                    </div>

                                    {/* Office */}
                                    <div className='flex gap-4 items-start'>
                                        <div className='h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#ff9400] shrink-0'>
                                            <MapPin className='h-4.5 w-4.5' />
                                        </div>
                                        <div>
                                            <h4 className='text-xs font-bold text-white uppercase tracking-wider font-mono'>
                                                {t.officeTitle}
                                            </h4>
                                            <p className='text-[10px] text-slate-400 mt-0.5'>{t.officeDesc}</p>
                                            <span className='text-xs font-semibold text-slate-200 mt-1 block leading-snug'>
                                                {addressDisplay}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className='flex gap-4 items-start'>
                                        <div className='h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#ff9400] shrink-0'>
                                            <Phone className='h-4.5 w-4.5' />
                                        </div>
                                        <div>
                                            <h4 className='text-xs font-bold text-white uppercase tracking-wider font-mono'>
                                                {t.phoneTitle}
                                            </h4>
                                            <p className='text-[10px] text-slate-400 mt-0.5'>{t.phoneDesc}</p>
                                            <a href={`tel:${phoneDisplay.replace(/[^\d+]/g, '')}`} className='text-xs font-semibold text-[#ff9400] hover:underline mt-1 block'>
                                                {phoneDisplay}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Socials & Brand tag */}
                            <div className='relative z-10 pt-8 border-t border-white/10 flex items-center justify-between mt-8'>
                                <div className='flex gap-3'>
                                    <a
                                        href={settings?.linkedinUrl || 'https://linkedin.com'}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='h-7 w-7 rounded-md border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#ff9400] transition-colors'
                                        aria-label='LinkedIn'
                                    >
                                        <BsLinkedin className='h-3.5 w-3.5' />
                                    </a>
                                    <a
                                        href={settings?.twitterUrl || 'https://x.com'}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='h-7 w-7 rounded-md border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#ff9400] transition-colors'
                                        aria-label='X (Twitter)'
                                    >
                                        <BsTwitterX className='h-3 w-3' />
                                    </a>
                                </div>
                                <span className='text-[9px] font-bold text-slate-400 font-mono tracking-widest uppercase'>emlinked</span>
                            </div>
                        </div>

                        {/* Right Column - Form */}
                        <div className='flex-1 bg-card/40 p-8 flex flex-col justify-center text-left overflow-y-auto max-h-[90vh] md:max-h-none'>
                            {status === 'success' ? (
                                <div className='text-center py-12 max-w-md mx-auto space-y-5 animate-scaleIn'>
                                    <div className='h-14 w-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/20'>
                                        <Check className='h-6 w-6' />
                                    </div>
                                    <div className='space-y-2'>
                                        <h4 className='font-display font-bold text-xl text-foreground'>
                                            {t.successTitle}
                                        </h4>
                                        <p className='text-xs text-muted-foreground leading-relaxed'>
                                            {t.successMessage.replace('{name}', `${firstName} ${lastName}`.trim())}
                                        </p>
                                    </div>
                                    <div className='pt-4'>
                                        <button
                                            onClick={handleClose}
                                            className='h-10 px-6 border border-border hover:bg-muted/50 text-xs font-semibold rounded-lg transition-all cursor-pointer'
                                        >
                                            {t.closeBtn}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className='space-y-6'>
                                    <div>
                                        <h4 className='font-display font-extrabold text-xl text-foreground tracking-tight'>
                                            {t.formTitle}
                                        </h4>
                                        <p className='text-xs text-muted-foreground mt-1.5 leading-relaxed'>
                                            {t.formSubtitle}
                                        </p>
                                    </div>

                                    {status === 'error' && (
                                        <div className='p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg flex items-start gap-2 text-xs animate-fadeIn'>
                                            <AlertCircle className='h-4 w-4 shrink-0 mt-0.5' />
                                            <span>{errorMessage}</span>
                                        </div>
                                    )}

                                    {/* Name Fields */}
                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                        <div className='flex flex-col gap-1.5'>
                                            <label className='text-[10px] font-bold text-muted-foreground uppercase tracking-wider font-mono'>
                                                {t.firstNameLabel} <span className='text-primary'>*</span>
                                            </label>
                                            <input
                                                type='text'
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                placeholder={t.placeholderFirstName}
                                                className='w-full h-10 px-3 rounded-lg border border-border bg-background text-xs text-foreground focus:outline-none focus:border-primary'
                                                required
                                                disabled={status === 'submitting'}
                                            />
                                        </div>
                                        <div className='flex flex-col gap-1.5'>
                                            <label className='text-[10px] font-bold text-muted-foreground uppercase tracking-wider font-mono'>
                                                {t.lastNameLabel} <span className='text-primary'>*</span>
                                            </label>
                                            <input
                                                type='text'
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                placeholder={t.placeholderLastName}
                                                className='w-full h-10 px-3 rounded-lg border border-border bg-background text-xs text-foreground focus:outline-none focus:border-primary'
                                                required
                                                disabled={status === 'submitting'}
                                            />
                                        </div>
                                    </div>

                                    {/* Contact Fields */}
                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                        <div className='flex flex-col gap-1.5'>
                                            <label className='text-[10px] font-bold text-muted-foreground uppercase tracking-wider font-mono'>
                                                {t.emailLabel} <span className='text-primary'>*</span>
                                            </label>
                                            <input
                                                type='email'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder={t.placeholderEmail}
                                                className='w-full h-10 px-3 rounded-lg border border-border bg-background text-xs text-foreground focus:outline-none focus:border-primary'
                                                required
                                                disabled={status === 'submitting'}
                                            />
                                        </div>
                                        <div className='flex flex-col gap-1.5'>
                                            <label className='text-[10px] font-bold text-muted-foreground uppercase tracking-wider font-mono'>
                                                {t.phoneLabel} <span className='text-primary'>*</span>
                                            </label>
                                            <input
                                                type='tel'
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder={t.placeholderPhone}
                                                className='w-full h-10 px-3 rounded-lg border border-border bg-background text-xs text-foreground focus:outline-none focus:border-primary'
                                                required
                                                disabled={status === 'submitting'}
                                            />
                                        </div>
                                    </div>

                                    {/* Company & Portfolio size */}
                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                        <div className='flex flex-col gap-1.5'>
                                            <label className='text-[10px] font-bold text-muted-foreground uppercase tracking-wider font-mono'>
                                                {t.companyLabel} <span className='text-primary'>*</span>
                                            </label>
                                            <input
                                                type='text'
                                                value={company}
                                                onChange={(e) => setCompany(e.target.value)}
                                                placeholder={t.placeholderCompany}
                                                className='w-full h-10 px-3 rounded-lg border border-border bg-background text-xs text-foreground focus:outline-none focus:border-primary'
                                                required
                                                disabled={status === 'submitting'}
                                            />
                                        </div>
                                        <div className='flex flex-col gap-1.5'>
                                            <label className='text-[10px] font-bold text-muted-foreground uppercase tracking-wider font-mono'>
                                                {t.portfolioLabel}
                                            </label>
                                            <select
                                                value={portfolioSize}
                                                onChange={(e) => setPortfolioSize(e.target.value)}
                                                className='w-full h-10 px-3 rounded-lg border border-border bg-background text-xs text-foreground focus:outline-none focus:border-primary'
                                                disabled={status === 'submitting'}
                                            >
                                                <option value={t.portfolioOption1}>{t.portfolioOption1}</option>
                                                <option value={t.portfolioOption2}>{t.portfolioOption2}</option>
                                                <option value={t.portfolioOption3}>{t.portfolioOption3}</option>
                                                <option value={t.portfolioOption4}>{t.portfolioOption4}</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className='flex flex-col gap-1.5'>
                                        <label className='text-[10px] font-bold text-muted-foreground uppercase tracking-wider font-mono'>
                                            {t.messageLabel}
                                        </label>
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder={t.placeholderMessage}
                                            rows={3}
                                            className='w-full p-3 rounded-lg border border-border bg-background text-xs text-foreground focus:outline-none focus:border-primary'
                                            disabled={status === 'submitting'}
                                        />
                                    </div>

                                    {/* reCAPTCHA Checkbox Element */}
                                    {siteKey && (
                                        <div className='py-1.5'>
                                            <div ref={recaptchaContainerRef} className='g-recaptcha' />
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        type='submit'
                                        disabled={status === 'submitting'}
                                        className='w-full h-10 bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:scale-[1.01] active:scale-[0.99] duration-150'
                                    >
                                        {status === 'submitting' ? (
                                            <>
                                                <Loader2 className='h-4 w-4 animate-spin' />
                                                <span>{t.sendingBtn}</span>
                                            </>
                                        ) : (
                                            <span>{t.submitBtn}</span>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
            
            {/* reCAPTCHA script loader callback config */}
            {siteKey && isOpen && (
                <>
                    <Script
                        id='recaptcha-load-callback'
                        strategy='afterInteractive'
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.onRecaptchaLoad = function() {
                                    window.dispatchEvent(new Event('recaptcha-ready'));
                                };
                            `
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
            )}
        </AnimatePresence>,
        document.body
    );
}
