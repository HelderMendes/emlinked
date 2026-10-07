'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Star } from 'lucide-react';
import { DemoModal } from './DemoModal';
import { Badge } from '@/components/ui/Badge';

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

    // Hide sticky announcement widget on box3-check and pricing routes to avoid clutter
    const isBox3Page = pathname?.includes('box3-check');
    const isPricingPage =
        pathname?.includes('prijzen') || pathname?.includes('pricing');
    if (isBox3Page || isPricingPage) return null;

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
                            className='pointer-events-auto flex items-center gap-3 bg-white border border-teal shadow-xl rounded-2xl pl-4 pr-1.5 py-1.5 cursor-pointer hover:border-white/90 transition-all duration-200 group text-left hover:scale-106 hover:shadow-amber-600 hover:shadow-4xl'
                        >
                            <div className='flex items-center gap-2'>
                                <span className='relative flex h-2 w-2'>
                                    <span className='animate-none absolute inline-flex h-full w-full rounded-full bg-teal opacity-75'></span>
                                    <span className='relative inline-flex rounded-full h-2 w-2 bg-teal'></span>
                                </span>
                                <span className='text-[10.5px] font-bold text-foreground font-display tracking-wider mt-0.5 uppercase '>
                                    {pillText}
                                </span>
                            </div>
                            <div className='size-8.5 rounded-full  text-white  flex items-center justify-center relative overflow-hidden  group-hover:text-white transition-colors duration-300 btn-gradient-fire group-hover:bg-teal hover:bg-navy-900 hover:bg-image-none'>
                                <Sparkles className='size-4 animate-pulse ' />
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
                            className='pointer-events-auto w-full max-w-[340px] rounded-2xl border border-navy-900/10 bg-white shadow-2xl overflow-hidden flex flex-col text-left relative'
                        >
                            {/* Header — light stone/hero style: white bg, teal glow, Badge eyebrow */}
                            <div className='bg-stone-bg p-5 relative overflow-hidden'>
                                <div className='absolute -top-10 -right-10 w-32 h-32 rounded-full bg-teal-pale/60 blur-2xl pointer-events-none' />

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsOpen(false);
                                    }}
                                    className='absolute top-3.5 right-3.5 h-6 w-6 rounded-full bg-navy-900/5 hover:bg-navy-900/10 flex items-center justify-center text-navy-900 transition-colors cursor-pointer z-10'
                                    aria-label='Close popup'
                                >
                                    <X className='h-3.5 w-3.5' />
                                </button>

                                <Badge
                                    color='teal'
                                    dot
                                    uppercase
                                    className='relative z-10 mb-2'
                                >
                                    Platform
                                </Badge>
                                <h4 className='relative z-10 text-lg font-display font-extrabold tracking-tight text-navy-900'>
                                    {title}
                                </h4>
                                <p className='relative z-10 text-[13px] text-navy-700 leading-relaxed mt-1'>
                                    {subtitle}
                                </p>

                                <button
                                    onClick={handleCtaClick}
                                    className='relative z-10 mt-4 w-full h-9 rounded-lg bg-navy-900 hover:btn-gradient text-white font-semibold text-xs transition-colors duration-200 cursor-pointer'
                                >
                                    {cta}
                                </button>
                            </div>

                            {/* Reviews Block */}
                            <div className='p-4.5 bg-white flex flex-col gap-3.5'>
                                {reviews.map((rev: any, index: number) => (
                                    <div
                                        key={index}
                                        className='flex flex-col gap-1 border-b border-navy-900/10 last:border-0 pb-3 last:pb-0'
                                    >
                                        <div className='flex gap-0.5 text-teal'>
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className='h-2.5 w-2.5 fill-teal'
                                                />
                                            ))}
                                        </div>
                                        <p className='text-[12px]/5 italic text-navy-700'>
                                            {rev.text}
                                        </p>
                                        <span className='text-[11px] font-bold text-navy-900/60 tracking-tight self-end'>
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
