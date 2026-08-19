'use client';

import React from 'react';
import Image from 'next/image';
import { Mail, Sparkles, UserCheck } from 'lucide-react';
import { getImageUrl } from '@/sanity/image';

export interface TeamMember {
    name: string;
    role: string;
    bio?: string;
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

    const defaultTitle = sectionTitle || (isEn ? 'The Specialists Behind the Connection' : 'De specialisten achter de verbinding');
    const defaultSubtitle = sectionSubtitle || (isEn ? 'Our multidisciplinary team combines executive search, recruitment automation, and personal guidance to deliver the perfect match.' : 'Ons multidisciplinaire team combineert executive search, recruitment automation en persoonlijke begeleiding om de juiste match te realiseren.');

    return (
        <section className='px-6 py-20 relative z-10 max-w-7xl mx-auto border-t border-white/10'>
            {/* Header */}
            <div className='text-center max-w-3xl mx-auto space-y-4 mb-16'>
                <div className='flex justify-center mb-1'>
                    <span className='inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/15 px-4 py-1.5 text-xs font-mono font-bold tracking-wider text-amber uppercase backdrop-blur-md shadow-xs'>
                        <span className='w-2 h-2 rounded-full bg-amber shrink-0 animate-ping' />
                        {isEn ? 'OUR TEAM & SPECIALISTS' : 'ONS TEAM & SPECIALISTEN'}
                    </span>
                </div>

                <h2 className='font-display text-3xl md:text-4xl lg:text-[2.5rem] font-bold tracking-tight text-white leading-tight'>
                    {defaultTitle}
                </h2>

                <p className='text-slate-300 text-base md:text-lg leading-relaxed font-light'>
                    {defaultSubtitle}
                </p>
            </div>

            {/* Team Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                {members.map((member, idx) => {
                    const avatarUrl = getImageUrl(
                        member.image,
                        member.photoPath || '/emlinked/team/avatar_partners.png'
                    );

                    return (
                        <div
                            key={idx}
                            className='group relative rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur-xl p-6 text-left flex flex-col justify-between hover:border-amber/50 hover:shadow-2xl hover:shadow-amber/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden'
                        >
                            {/* Ambient Glow */}
                            <div className='absolute -top-12 -right-12 w-36 h-36 bg-amber/10 rounded-full blur-2xl group-hover:bg-amber/20 transition-all duration-500 pointer-events-none' />

                            <div className='space-y-5 relative z-10'>
                                {/* Top Avatar & Badge Row */}
                                <div className='flex items-start justify-between gap-4'>
                                    <div className='relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/15 group-hover:border-amber/60 transition-colors shrink-0 shadow-lg bg-slate-900'>
                                        <Image
                                            src={avatarUrl}
                                            alt={member.name}
                                            fill
                                            className='object-cover object-center group-hover:scale-105 transition-transform duration-500'
                                        />
                                    </div>

                                    {(member.badge || member.focusArea) && (
                                        <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber font-mono text-[11px] font-semibold tracking-wide uppercase shadow-xs'>
                                            <Sparkles className='w-3 h-3 text-amber' />
                                            <span>{member.badge || member.focusArea}</span>
                                        </span>
                                    )}
                                </div>

                                {/* Title & Role */}
                                <div className='space-y-1 pt-1'>
                                    <h3 className='font-display font-bold text-xl text-white group-hover:text-amber transition-colors'>
                                        {member.name}
                                    </h3>
                                    <p className='text-xs text-amber font-mono font-semibold tracking-wide'>
                                        {member.role}
                                    </p>
                                </div>

                                {/* Bio */}
                                {member.bio && (
                                    <p className='text-xs text-slate-300 leading-relaxed font-light pt-1 line-clamp-4'>
                                        {member.bio}
                                    </p>
                                )}
                            </div>

                            {/* Direct Connections Footer */}
                            <div className='pt-6 mt-6 border-t border-white/10 flex items-center justify-between relative z-10'>
                                <span className='text-[11px] font-mono text-slate-400 flex items-center gap-1.5'>
                                    <UserCheck className='w-3.5 h-3.5 text-emerald-400' />
                                    <span>{isEn ? 'Direct Contact' : 'Directe Connectie'}</span>
                                </span>

                                <div className='flex items-center gap-2'>
                                    {member.linkedin && (
                                        <a
                                            href={member.linkedin}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            aria-label={`LinkedIn ${member.name}`}
                                            className='w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-amber/20 hover:border-amber/40 transition-all duration-200'
                                        >
                                            <svg className='w-4 h-4 fill-current' viewBox='0 0 24 24'>
                                                <path d='M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z' />
                                            </svg>
                                        </a>
                                    )}
                                    {member.email && (
                                        <a
                                            href={`mailto:${member.email}`}
                                            aria-label={`Email ${member.name}`}
                                            className='w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-amber/20 hover:border-amber/40 transition-all duration-200'
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
        </section>
    );
}
