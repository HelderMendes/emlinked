'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Calendar,
    Clock,
    ArrowRight,
    Loader2,
    Sparkles,
    Check,
} from 'lucide-react';

interface DemoModalProps {
    isOpen: boolean;
    onClose: () => void;
    calendlyUrl?: string;
}

export function DemoModal({ isOpen, onClose, calendlyUrl }: DemoModalProps) {
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setMounted(true);
    }, []);
    const [mockDate, setMockDate] = useState<string>('');
    const [mockTime, setMockTime] = useState<string>('');
    const [mockStep, setMockStep] = useState<'pick' | 'details' | 'success'>(
        'pick',
    );

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [portfolioSize, setPortfolioSize] = useState('10-50');

    // Handle escape key to close modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Format dates for mock calendar
    const getAvailableDays = () => {
        const days = [];
        const locale = 'nl-NL';
        const start = new Date();

        // Add next 5 weekdays
        let count = 0;
        while (count < 5) {
            start.setDate(start.getDate() + 1);
            if (start.getDay() !== 0 && start.getDay() !== 6) {
                // Weekdays only
                days.push({
                    raw: new Date(start),
                    dayLabel: start.toLocaleDateString(locale, {
                        weekday: 'short',
                    }),
                    dateLabel: start.getDate(),
                    monthLabel: start.toLocaleDateString(locale, {
                        month: 'short',
                    }),
                    fullLabel: start.toLocaleDateString(locale, {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                    }),
                });
                count++;
            }
        }
        return days;
    };

    const mockTimes = ['10:00', '11:30', '13:00', '14:30', '16:00'];

    const handleMockSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMockStep('success');
    };

    // Determine if we should show standard Calendly iframe or our beautiful mock calendar
    const isUsingRealCalendly =
        calendlyUrl && calendlyUrl.includes('calendly.com');

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className='fixed inset-0 z-9999 flex items-center justify-center p-4'>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className='fixed inset-0 bg-background/80 backdrop-blur-sm pointer-events-auto'
                    />

                    {/* Modal Wrapper */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{
                            type: 'spring',
                            damping: 25,
                            stiffness: 350,
                        }}
                        className='relative w-full max-w-4xl h-[650px] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row pointer-events-auto z-10'
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className='absolute top-4 right-4 h-8 w-8 rounded-full bg-muted/40 hover:bg-muted/80 flex items-center justify-center text-foreground hover:text-foreground/80 transition-colors z-20 cursor-pointer'
                            aria-label='Sluit modal'
                        >
                            <X className='h-4 w-4' />
                        </button>

                        {/* Left sidebar info banner (WOW Aesthetic) */}
                        <div className='w-full md:w-[320px] bg-gradient-to-br from-darkBlue/10 via-card to-background border-r border-border p-8 flex flex-col justify-between relative shrink-0'>
                            <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,var(--color-primary)/5,transparent_50%)] pointer-events-none' />

                            <div className='space-y-6 relative z-10 text-left'>
                                <div className='inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                                    <Sparkles className='h-5 w-5' />
                                </div>
                                <div className='space-y-2'>
                                    <h3 className='font-display font-bold text-xl text-foreground'>
                                        Technische Dieptesessie
                                    </h3>
                                    <p className='text-xs text-muted-foreground leading-relaxed'>
                                        Ontdek hoe Emlinked jouw
                                        vastgoedportefeuille kan digitaliseren
                                        en native koppelt aan Microsoft Business
                                        Central.
                                    </p>
                                </div>

                                <div className='space-y-3.5 pt-4 border-t border-border/60'>
                                    <div className='flex items-center gap-3 text-xs text-muted-foreground'>
                                        <Clock className='h-4 w-4 text-primary shrink-0' />
                                        <span>Duur: 30 minuten</span>
                                    </div>
                                    <div className='flex items-center gap-3 text-xs text-muted-foreground'>
                                        <Calendar className='h-4 w-4 text-primary shrink-0' />
                                        <span>Live 1-op-1 demonstratie</span>
                                    </div>
                                </div>
                            </div>

                            <div className='relative z-10 text-left pt-6 border-t border-border/60'>
                                <p className='text-[10px] text-muted-foreground/80'>
                                    Heb je specifieke integratiewensen? We
                                    bespreken ze direct in deze sessie.
                                </p>
                            </div>
                        </div>

                        {/* Right Content Area */}
                        <div className='flex-1 bg-card/50 flex flex-col relative h-full'>
                            {isUsingRealCalendly ? (
                                /* Calendly iframe Mode */
                                <div className='w-full h-full relative pt-12'>
                                    {isLoading && (
                                        <div className='absolute inset-0 flex items-center justify-center bg-card z-10'>
                                            <Loader2 className='h-8 w-8 text-primary animate-spin' />
                                        </div>
                                    )}
                                    <iframe
                                        src={`${calendlyUrl}?embed_domain=${window?.location?.hostname}&embed_type=Inline`}
                                        width='100%'
                                        height='100%'
                                        frameBorder='0'
                                        onLoad={() => setIsLoading(false)}
                                        title='Agenda inplannen'
                                        className='w-full h-full'
                                    />
                                </div>
                            ) : (
                                /* Custom Fallback Scheduler (High-Fidelity Interaction) */
                                <div className='flex-1 p-8 flex flex-col justify-center h-full text-left overflow-y-auto'>
                                    {mockStep === 'pick' && (
                                        <div className='space-y-6'>
                                            <div>
                                                <h4 className='font-display font-bold text-lg text-foreground mb-1'>
                                                    Kies een datum & tijdstip
                                                </h4>
                                                <p className='text-xs text-muted-foreground'>
                                                    Selecteer een geschikt
                                                    moment in onze kalender.
                                                </p>
                                            </div>

                                            {/* Days Selector */}
                                            <div className='grid grid-cols-5 gap-2'>
                                                {getAvailableDays().map(
                                                    (day, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() =>
                                                                setMockDate(
                                                                    day.fullLabel,
                                                                )
                                                            }
                                                            className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                                                                mockDate ===
                                                                day.fullLabel
                                                                    ? 'border-primary bg-primary/10 text-primary shadow-md'
                                                                    : 'border-border bg-background/50 hover:border-border-hover hover:bg-background/80'
                                                            }`}
                                                        >
                                                            <span className='text-[10px] uppercase font-semibold text-muted-foreground'>
                                                                {day.dayLabel}
                                                            </span>
                                                            <span className='text-base font-extrabold text-foreground'>
                                                                {day.dateLabel}
                                                            </span>
                                                            <span className='text-[9px] text-muted-foreground'>
                                                                {day.monthLabel}
                                                            </span>
                                                        </button>
                                                    ),
                                                )}
                                            </div>

                                            {/* Times Selector */}
                                            {mockDate && (
                                                <div className='space-y-3 animate-fadeIn'>
                                                    <span className='text-xs font-semibold text-muted-foreground uppercase tracking-wide'>
                                                        Beschikbare tijden voor{' '}
                                                        {mockDate}:
                                                    </span>
                                                    <div className='flex flex-wrap gap-2'>
                                                        {mockTimes.map(
                                                            (time, idx) => (
                                                                <button
                                                                    key={idx}
                                                                    onClick={() =>
                                                                        setMockTime(
                                                                            time,
                                                                        )
                                                                    }
                                                                    className={`px-4 py-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                                                                        mockTime ===
                                                                        time
                                                                            ? 'border-primary bg-primary/10 text-primary shadow-sm'
                                                                            : 'border-border bg-background/50 hover:border-border-hover hover:bg-background/80'
                                                                    }`}
                                                                >
                                                                    {time}
                                                                </button>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Bottom Navigation */}
                                            <div className='pt-4 border-t border-border/60 flex justify-end'>
                                                <button
                                                    onClick={() =>
                                                        setMockStep('details')
                                                    }
                                                    disabled={
                                                        !mockDate || !mockTime
                                                    }
                                                    className='h-10 px-6 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold rounded-lg flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                                                >
                                                    Volgende stap
                                                    <ArrowRight className='h-4 w-4' />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {mockStep === 'details' && (
                                        <form
                                            onSubmit={handleMockSubmit}
                                            className='space-y-5'
                                        >
                                            <div>
                                                <h4 className='font-display font-bold text-lg text-foreground mb-1'>
                                                    Persoonlijke Gegevens
                                                </h4>
                                                <p className='text-xs text-muted-foreground'>
                                                    We sturen een Microsoft
                                                    Teams uitnodiging voor{' '}
                                                    {mockDate} om {mockTime}.
                                                </p>
                                            </div>

                                            <div className='grid grid-cols-2 gap-4'>
                                                <div>
                                                    <label className='block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5'>
                                                        Volledige Naam
                                                    </label>
                                                    <input
                                                        type='text'
                                                        value={name}
                                                        onChange={(e) =>
                                                            setName(
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder='Sander de Bruijn'
                                                        className='w-full h-10 px-3 rounded-lg border border-border bg-background/80 text-xs focus:outline-none focus:border-primary'
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className='block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5'>
                                                        Zakelijk E-mailadres
                                                    </label>
                                                    <input
                                                        type='email'
                                                        value={email}
                                                        onChange={(e) =>
                                                            setEmail(
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder='sander@bedrijf.nl'
                                                        className='w-full h-10 px-3 rounded-lg border border-border bg-background/80 text-xs focus:outline-none focus:border-primary'
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-2 gap-4'>
                                                <div>
                                                    <label className='block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5'>
                                                        Bedrijfsnaam
                                                    </label>
                                                    <input
                                                        type='text'
                                                        value={company}
                                                        onChange={(e) =>
                                                            setCompany(
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder='De Bruijn Vastgoedbeheer'
                                                        className='w-full h-10 px-3 rounded-lg border border-border bg-background/80 text-xs focus:outline-none focus:border-primary'
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className='block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5'>
                                                        Omvang Portefeuille
                                                        (vbo)
                                                    </label>
                                                    <select
                                                        value={portfolioSize}
                                                        onChange={(e) =>
                                                            setPortfolioSize(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className='w-full h-10 px-3 rounded-lg border border-border bg-background/80 text-xs focus:outline-none focus:border-primary'
                                                    >
                                                        <option value='<10'>
                                                            Minder dan 10
                                                            objecten
                                                        </option>
                                                        <option value='10-50'>
                                                            10 tot 50 objecten
                                                        </option>
                                                        <option value='50-250'>
                                                            50 tot 250 objecten
                                                        </option>
                                                        <option value='>250'>
                                                            Meer dan 250
                                                            objecten
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className='pt-4 border-t border-border/60 flex justify-between items-center'>
                                                <button
                                                    type='button'
                                                    onClick={() =>
                                                        setMockStep('pick')
                                                    }
                                                    className='text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer'
                                                >
                                                    Terug naar datum
                                                </button>
                                                <button
                                                    type='submit'
                                                    className='h-10 px-6 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold rounded-lg flex items-center gap-2 transition-all cursor-pointer'
                                                >
                                                    Bevestig afspraak
                                                    <Check className='h-4 w-4' />
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    {mockStep === 'success' && (
                                        <div className='text-center py-12 max-w-md mx-auto space-y-5 animate-scaleIn'>
                                            <div className='h-14 w-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/20'>
                                                <Check className='h-6 w-6' />
                                            </div>
                                            <div className='space-y-2'>
                                                <h4 className='font-display font-bold text-xl text-foreground'>
                                                    Demo-afspraak Gereserveerd!
                                                </h4>
                                                <p className='text-xs text-muted-foreground leading-relaxed'>
                                                    Beste {name}, we hebben je
                                                    afspraak bevestigd op{' '}
                                                    <strong>
                                                        {mockDate} om {mockTime}
                                                    </strong>
                                                    . Er is een
                                                    e-mailbevestiging gestuurd
                                                    naar{' '}
                                                    <strong>{email}</strong> met
                                                    de Microsoft Teams
                                                    uitnodiging.
                                                </p>
                                            </div>
                                            <div className='pt-4'>
                                                <button
                                                    onClick={onClose}
                                                    className='h-10 px-6 border border-border hover:bg-muted/50 text-xs font-semibold rounded-lg transition-all cursor-pointer'
                                                >
                                                    Venster sluiten
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body,
    );
}
