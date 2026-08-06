import React from 'react';
import { Zap } from 'lucide-react';

interface Box3UrgencyBarProps {
    announcementBadge: string;
    announcementText: string;
    announcementCtaLabel: string;
    announcementCtaLink: string;
}

export function Box3UrgencyBar({
    announcementBadge,
    announcementText,
    announcementCtaLabel,
    announcementCtaLink,
}: Box3UrgencyBarProps) {
    return (
        <section className='bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] text-[#060e32] border-b border-amber/20 py-3.5 px-4 sm:px-6 lg:px-8 shadow-xs relative z-20'>
            <div className='max-w-7xl mx-auto flex items-center justify-center gap-3 sm:gap-6 flex-wrap text-center'>
                <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber text-[#060e32] font-mono font-bold text-[11px] uppercase tracking-wider shadow-xs'>
                    <Zap className='w-3.5 h-3.5 fill-current' />
                    {announcementBadge}
                </span>
                <span className='text-xs sm:text-sm font-semibold text-[#060e32]/90'>
                    {announcementText}
                </span>
                <a
                    href={announcementCtaLink}
                    className='text-amber-hover hover:text-amber font-bold text-xs sm:text-sm underline underline-offset-4 transition-colors inline-flex items-center gap-1 shrink-0'
                >
                    {announcementCtaLabel}
                </a>
            </div>
        </section>
    );
}
