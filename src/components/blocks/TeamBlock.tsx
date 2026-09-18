'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail,
    Sparkles,
    UserCheck,
    X,
    ArrowRight,
    CheckCircle2,
    User,
} from 'lucide-react';
import { getImageUrl } from '@/sanity/image';
import { Badge } from '@/components/ui/Badge';

export interface TeamMember {
    name: string;
    role: string;
    bio?: string;
    fullBio?: string;
    focusArea?: string;
    badge?: string;
    photoPath?: string;
    image?: any;
    linkedin?: string;
    email?: string;
}

export interface TeamBlockProps {
    sectionTitle?: string;
    sectionSubtitle?: string;
    members?: TeamMember[];
    locale?: string;
}

export function TeamBlock({
    sectionTitle,
    sectionSubtitle,
    members = [],
    locale = 'nl',
}: TeamBlockProps) {
    const isEn = locale === 'en';
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const defaultTitle =
        sectionTitle ||
        (isEn
            ? 'The Specialists Behind the Connection'
            : 'De specialisten achter de verbinding');
    const defaultSubtitle =
        sectionSubtitle ||
        (isEn
            ? 'Our multidisciplinary team combines executive search, recruitment automation, and personal guidance to deliver the perfect match.'
            : 'Ons multidisciplinaire team combineert executive search, recruitment automation en persoonlijke begeleiding om de juiste match te realiseren.');

    const activeMember = selectedIndex !== null ? members[selectedIndex] : null;

    // Handle Escape key listener for Modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSelectedIndex(null);
            }
        };
        if (selectedIndex !== null) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [selectedIndex]);

    return (
        <section className='px-6 py-20 relative z-10 max-w-7xl mx-auto border-t border-white/10'>
            {/* Section Header */}
            <div className='text-center max-w-3xl mx-auto space-y-4 mb-16'>
                <div className='flex justify-center mb-1'>
                    <Badge color='teal' uppercase dot dotPulse>
                        {isEn
                            ? 'OUR TEAM & SPECIALISTS'
                            : 'ONS TEAM & SPECIALISTEN'}
                    </Badge>
                </div>

                <h2 className='font-display text-3xl md:text-4xl lg:text-[2.5rem] font-bold tracking-tight text-white leading-tight'>
                    {defaultTitle}
                </h2>

                <p className='text-slate-300 text-base md:text-lg leading-relaxed font-light'>
                    {defaultSubtitle}
                </p>
            </div>

            {/* Team Members Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                {members.map((member, idx) => {
                    const avatarUrl = getImageUrl(
                        member.image,
                        member.photoPath ||
                            '/emlinked/team/avatar_partners.png',
                    );

                    return (
                        <div
                            key={idx}
                            onClick={() => setSelectedIndex(idx)}
                            className='group relative rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur-xl p-6 text-left flex flex-col justify-between hover:border-teal/50 hover:shadow-2xl hover:shadow-teal/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer'
                        >
                            {/* Ambient Glow */}
                            <div className='absolute -top-12 -right-12 w-36 h-36 bg-teal/10 rounded-full blur-2xl group-hover:bg-teal/20 transition-all duration-500 pointer-events-none' />

                            <div className='space-y-5 relative z-10'>
                                {/* Top Avatar & Badge Row */}
                                <div className='flex items-start justify-between gap-4'>
                                    <div className='relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/15 group-hover:border-teal/60 transition-colors shrink-0 shadow-lg bg-slate-900'>
                                        <Image
                                            src={avatarUrl}
                                            alt={member.name}
                                            fill
                                            sizes='80px'
                                            className='object-cover object-center group-hover:scale-105 transition-transform duration-500'
                                        />
                                    </div>

                                    {(member.badge || member.focusArea) && (
                                        <Badge color='teal' uppercase>
                                            <Sparkles className='w-3 h-3 text-teal' />
                                            <span>
                                                {member.badge ||
                                                    member.focusArea}
                                            </span>
                                        </Badge>
                                    )}
                                </div>

                                {/* Title & Role */}
                                <div className='space-y-1 pt-1'>
                                    <h3 className='font-display font-bold text-xl text-white group-hover:text-teal transition-colors flex items-center justify-between'>
                                        <span>{member.name}</span>
                                        <ArrowRight className='w-4 h-4 text-teal opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200' />
                                    </h3>
                                    <p className='text-xs text-teal font-mono font-semibold tracking-wide'>
                                        {member.role}
                                    </p>
                                </div>

                                {/* Bio Snippet */}
                                {member.bio && (
                                    <p className='text-xs text-slate-300 leading-relaxed font-light pt-1 line-clamp-3'>
                                        {member.bio}
                                    </p>
                                )}
                            </div>

                            {/* Direct Connections & View Profile Footer */}
                            <div className='pt-5 mt-5 border-t border-white/10 flex items-center justify-between relative z-10'>
                                <span className='text-[11px] font-mono text-teal hover:text-white font-semibold flex items-center gap-1.5 transition-colors'>
                                    <span>
                                        {isEn
                                            ? 'View Profile ➔'
                                            : 'Bekijk profiel ➔'}
                                    </span>
                                </span>

                                <div
                                    className='flex items-center gap-2'
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {member.linkedin && (
                                        <a
                                            href={member.linkedin}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            aria-label={`LinkedIn ${member.name}`}
                                            className='w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-teal/20 hover:border-teal/40 transition-all duration-200'
                                        >
                                            <svg
                                                className='w-4 h-4 fill-current'
                                                viewBox='0 0 24 24'
                                            >
                                                <path d='M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z' />
                                            </svg>
                                        </a>
                                    )}
                                    {member.email && (
                                        <a
                                            href={`mailto:${member.email}`}
                                            aria-label={`Email ${member.name}`}
                                            className='w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-teal/20 hover:border-teal/40 transition-all duration-200'
                                        >
                                            <Mail className='w-4 h-4' />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ── INTERACTIVE TEAM MEMBER POPUP MODAL (Rendered at document.body level via Portal) ── */}
            {mounted &&
                createPortal(
                    <AnimatePresence>
                        {selectedIndex !== null && activeMember && (
                            <div className='fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-900/40 backdrop-blur-md'>
                                {/* Overlay backdrop button for click outside */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className='absolute inset-0 z-10'
                                    onClick={() => setSelectedIndex(null)}
                                />

                                {/* Modal Box */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                                    transition={{
                                        duration: 0.25,
                                        ease: 'easeOut',
                                    }}
                                    className='relative z-20 w-full max-w-4xl bg-slate-900 border border-teal/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[88vh] text-left'
                                >
                                    {/* Left Roster Sidebar */}
                                    <div className='w-full md:w-72 bg-slate-950/90 border-b md:border-b-0 md:border-r border-white/10 flex flex-col shrink-0 overflow-y-auto max-h-48 md:max-h-none'>
                                        <div className='p-4 border-b border-white/10 text-xs font-mono font-bold text-teal uppercase tracking-wider flex items-center gap-2 sticky top-0 bg-slate-950 z-10'>
                                            <Sparkles className='w-3.5 h-3.5 text-teal' />
                                            <span>
                                                {isEn ? 'OUR TEAM' : 'ONS TEAM'}
                                            </span>
                                        </div>

                                        <div className='divide-y divide-white/5 py-1'>
                                            {members.map((m, idx) => {
                                                const mAvatar = getImageUrl(
                                                    m.image,
                                                    m.photoPath ||
                                                        '/emlinked/team/avatar_partners.png',
                                                );
                                                const isActive =
                                                    idx === selectedIndex;

                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() =>
                                                            setSelectedIndex(
                                                                idx,
                                                            )
                                                        }
                                                        className={`w-full p-3.5 flex items-center gap-3 text-left transition-all duration-200 border-l-4 cursor-pointer ${
                                                            isActive
                                                                ? 'bg-teal/15 border-teal text-white font-semibold'
                                                                : 'border-transparent text-slate-400 hover:text-white hover:bg-white/5'
                                                        }`}
                                                    >
                                                        <div className='relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-white/15 bg-slate-800'>
                                                            <Image
                                                                src={mAvatar}
                                                                alt={m.name}
                                                                fill
                                                                sizes='40px'
                                                                className='object-cover object-center'
                                                            />
                                                        </div>
                                                        <div className='truncate min-w-0'>
                                                            <div className='text-xs font-bold truncate text-white'>
                                                                {m.name}
                                                            </div>
                                                            <div className='text-[10px] font-mono text-slate-400 truncate'>
                                                                {m.role}
                                                            </div>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Right Main Content Panel */}
                                    <div className='flex-1 p-6 md:p-10 overflow-y-auto flex flex-col justify-between relative bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white space-y-6'>
                                        {/* Close Button */}
                                        <button
                                            onClick={() =>
                                                setSelectedIndex(null)
                                            }
                                            className='absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-white/10 hover:bg-teal hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all cursor-pointer shadow-md'
                                            aria-label='Sluiten'
                                        >
                                            <X className='w-5 h-5' />
                                        </button>

                                        <div className='space-y-6'>
                                            {/* Member Header */}
                                            <div className='flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 border-b border-white/10 pb-6 pr-8'>
                                                <div className='relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-3 border-teal shadow-2xl p-1 overflow-hidden shrink-0 bg-slate-950'>
                                                    <Image
                                                        src={getImageUrl(
                                                            activeMember.image,
                                                            activeMember.photoPath ||
                                                                '/emlinked/team/avatar_partners.png',
                                                        )}
                                                        alt={activeMember.name}
                                                        fill
                                                        sizes='112px'
                                                        className='object-cover object-center rounded-full'
                                                    />
                                                </div>

                                                <div className='space-y-2 flex-1'>
                                                    {(activeMember.badge ||
                                                        activeMember.focusArea) && (
                                                        <Badge
                                                            color='teal'
                                                            uppercase
                                                        >
                                                            <Sparkles className='w-3 h-3 text-teal' />
                                                            <span>
                                                                {activeMember.badge ||
                                                                    activeMember.focusArea}
                                                            </span>
                                                        </Badge>
                                                    )}

                                                    <h2 className='text-2xl sm:text-3xl font-bold font-display text-white tracking-tight'>
                                                        {activeMember.name}
                                                    </h2>

                                                    <div className='text-xs sm:text-sm font-mono text-teal font-semibold uppercase tracking-wider'>
                                                        {activeMember.role}
                                                    </div>

                                                    {activeMember.focusArea && (
                                                        <div className='text-xs text-slate-400 font-mono pt-0.5 flex items-center justify-center sm:justify-start gap-1.5'>
                                                            <CheckCircle2 className='w-3.5 h-3.5 text-emerald-400 shrink-0' />
                                                            <span>
                                                                {
                                                                    activeMember.focusArea
                                                                }
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Detailed Narrative Biography */}
                                            <div className='space-y-4 pt-2 text-slate-200 text-sm md:text-base leading-relaxed font-light'>
                                                {(
                                                    activeMember.fullBio ||
                                                    activeMember.bio
                                                )
                                                    ?.split('\n\n')
                                                    .map((paragraph, pIdx) => (
                                                        <p key={pIdx}>
                                                            {paragraph}
                                                        </p>
                                                    ))}
                                            </div>
                                        </div>

                                        {/* Bottom Direct Action Bar */}
                                        <div className='pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 mt-auto'>
                                            <div className='flex items-center gap-2 text-xs font-mono text-slate-400'>
                                                <UserCheck className='w-4 h-4 text-emerald-400' />
                                                <span>
                                                    {isEn
                                                        ? 'Direct Team Contact'
                                                        : 'Direct Team Contact'}
                                                </span>
                                            </div>

                                            <div className='flex items-center gap-3'>
                                                {activeMember.linkedin && (
                                                    <a
                                                        href={
                                                            activeMember.linkedin
                                                        }
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        className='px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-white/15 font-semibold transition-all inline-flex items-center gap-2 text-xs shadow-sm hover:border-teal/40'
                                                    >
                                                        <svg
                                                            className='w-4 h-4 fill-teal'
                                                            viewBox='0 0 24 24'
                                                        >
                                                            <path d='M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z' />
                                                        </svg>
                                                        <span>LinkedIn</span>
                                                    </a>
                                                )}

                                                {activeMember.email && (
                                                    <a
                                                        href={`mailto:${activeMember.email}`}
                                                        className='px-4 py-2.5 rounded-xl bg-teal hover:bg-teal-hover text-slate-950 font-bold transition-all inline-flex items-center gap-2 text-xs shadow-md'
                                                    >
                                                        <Mail className='w-4 h-4' />
                                                        <span>
                                                            {isEn
                                                                ? 'Send Email'
                                                                : 'E-mail Sturen'}
                                                        </span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>,
                    document.body,
                )}
        </section>
    );
}
