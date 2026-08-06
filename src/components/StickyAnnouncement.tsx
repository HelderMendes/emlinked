'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Star } from 'lucide-react';
import { DemoModal } from './DemoModal';

interface StickyAnnouncementProps {
    locale?: string;
    settings?: any;
}

const content = {
    nl: {
        pillText: 'Belangrijke aankondiging',
        title: 'Emlinked Vastgoedbeheer',
        subtitle:
            'Beheer je huurcontracten, indexaties en servicekosten native in één systeem.',
        cta: 'Gratis demo aanvragen',
        reviews: [
            {
                text: '“Eindelijk een sluitende kostenregistratie voor de nieuwe Box 3-wetgeving.”',
                author: 'Vastgoedbeheerder',
            },
            {
                text: '“Realtime bankreconciliatie bespaart ons uren handmatig werk.”',
                author: 'Financieel Directeur',
            },
        ],
    },
    en: {
        pillText: 'Important announcement',
        title: 'Emlinked Property Mgmt',
        subtitle:
            'Manage leases, indexations, and expenses native in one single system.',
        cta: 'Request a Free Demo',
        reviews: [
            {
                text: '“Finally a bulletproof cost tracking setup for the new tax legislation.”',
                author: 'Property Manager',
            },
            {
                text: '“Real-time bank reconciliation saves us hours of manual work.”',
                author: 'Financial Director',
            },
        ],
    },
} as const;

import { usePathname } from 'next/navigation';

export default function StickyAnnouncement({
    locale = 'nl',
    settings,
}: StickyAnnouncementProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDemoOpen, setIsDemoOpen] = useState(false);
    const [shouldShow, setShouldShow] = useState(false);
    const pathname = usePathname();

    const activeLocale = locale === 'en' ? 'en' : 'nl';
    const t = content[activeLocale];

    // Delay visibility slightly on initial mount for premium feel
    useEffect(() => {
        const timer = setTimeout(() => {
            setShouldShow(true);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    // Hide sticky announcement widget on box3-check route to avoid floating box clutter
    const isBox3Page = pathname?.includes('box3-check');
    if (isBox3Page) return null;

    // Only render if announcement is active in settings
    if (!shouldShow || settings?.announcementActive === false) return null;

    // Resolve dynamic values from Sanity settings with local fallbacks
    const pillText = settings?.announcementPillText || t.pillText;
    const title = settings?.announcementTitle || t.title;
    const subtitle = settings?.announcementText || t.subtitle;
    const cta = settings?.announcementCtaLabel || t.cta;
    const reviews =
        settings?.announcementReviews && settings.announcementReviews.length > 0
            ? settings.announcementReviews
            : t.reviews;
    const linkTarget = settings?.announcementLink || '#demo';

    const handleCtaClick = () => {
        if (linkTarget === '#demo') {
            setIsDemoOpen(true);
        } else {
            window.location.href = linkTarget;
        }
    };

    return (
        <>
            <div className='fixed bottom-8 right-7 z-50 pointer-events-none select-none'>
                <AnimatePresence mode='wait'>
                    {!isOpen ? (
                        /* Collapsed State: Pill Button */
                        <motion.button
                            key='pill'
                            onClick={() => setIsOpen(true)}
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            transition={{
                                type: 'spring',
                                damping: 20,
                                stiffness: 300,
                            }}
                            className='pointer-events-auto flex items-center gap-3 bg-white dark:bg-[#060e32] border border-border/60 shadow-xl rounded-full pl-4 pr-1.5 py-1.5 cursor-pointer hover:shadow-2xl hover:scale-102 hover:border-amber/40 transition-all duration-200 group text-left'
                        >
                            <div className='flex items-center gap-2'>
                                <span className='relative flex h-2 w-2'>
                                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-amber opacity-75'></span>
                                    <span className='relative inline-flex rounded-full h-2 w-2 bg-amber'></span>
                                </span>
                                <span className='text-[10.5px] font-bold text-foreground font-display tracking-wider mt-0.5 uppercase '>
                                    {pillText}
                                </span>
                            </div>
                            <div className='h-9 w-9 rounded-full bg-[#060e32] dark:bg-white text-white dark:text-[#060e32] flex items-center justify-center relative overflow-hidden group-hover:bg-[#ff9400] group-hover:text-white transition-colors duration-300'>
                                <Sparkles className='h-4.5 w-4.5 animate-pulse' />
                            </div>
                        </motion.button>
                    ) : (
                        /* Expanded State: Gleam-style Capture Popup */
                        <motion.div
                            key='card'
                            initial={{ opacity: 0, y: 50, scale: 0.92 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 30, scale: 0.92 }}
                            transition={{
                                type: 'spring',
                                damping: 22,
                                stiffness: 280,
                            }}
                            className='pointer-events-auto w-full max-w-[340px] rounded-lg border border-border/80 bg-white dark:bg-[#060e32] shadow-2xl overflow-hidden flex flex-col text-left'
                        >
                            {/* Header Banner - Navy Blue Texture */}
                            <div className='bg-texture-navy p-5 text-white relative border-b border-white/5'>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsOpen(false);
                                    }}
                                    className='absolute top-3.5 right-3.5 h-6 w-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer z-10'
                                    aria-label='Close popup'
                                >
                                    <X className='h-3.5 w-3.5' />
                                </button>

                                <div className='flex items-center mb-1.5'>
                                    <span className='inline-flex items-center gap-1 bg-amber/20 border border-amber/35 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-amber'>
                                        <span className='w-1 h-1 bg-amber rounded-full mr-1.5 animate-ping' />
                                        Platform
                                    </span>
                                </div>
                                <h4 className='font-display text-lg font-bold tracking-tight text-white'>
                                    {title}
                                </h4>
                                <p className='text-[13px] text-white/70 font-light leading-relaxed mt-1'>
                                    {subtitle}
                                </p>

                                <button
                                    onClick={handleCtaClick}
                                    className='mt-4 w-full h-9 rounded-md bg-[#ff9400] text-[#060e32] font-semibold text-xs hover:bg-white hover:text-[#060e32] active:scale-98 transition-all duration-200 cursor-pointer shadow-md'
                                >
                                    {cta}
                                </button>
                            </div>

                            {/* Reviews Block */}
                            <div className='p-4.5 bg-slate-50 dark:bg-white/5 flex flex-col gap-3.5'>
                                {reviews.map((rev: any, index: number) => (
                                    <div
                                        key={index}
                                        className='flex flex-col gap-1 border-b border-border/40 last:border-0 pb-3 last:pb-0'
                                    >
                                        <div className='flex gap-0.5 text-amber'>
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className='h-2.5 w-2.5 fill-amber'
                                                />
                                            ))}
                                        </div>
                                        <p className='text-[12px]/5 italic text-muted-foreground '>
                                            {rev.text}
                                        </p>
                                        <span className='text-[11px] font-bold text-foreground/60 tracking-tight self-end'>
                                            — {rev.author}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <DemoModal
                isOpen={isDemoOpen}
                onClose={() => setIsDemoOpen(false)}
                locale={locale}
                settings={settings}
            />
        </>
    );
}
