'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

interface AppsArchitectureSectionProps {
    locale?: string;
    tag?: string;
    title?: string;
    subtitle?: string;
    sectionTag?: string;
    sectionTitle?: string;
    sectionSubtitle?: string;
    bullets?: Array<{ bold?: string; text: string }>;
    bgImagePath?: string;
}

export function AppsArchitectureSection({
    locale = 'nl',
    tag,
    title,
    subtitle,
    sectionTag,
    sectionTitle,
    sectionSubtitle,
    bullets: customBullets,
    bgImagePath = '/emlinked/apps/bg_naadloze_integratie_section.jpg',
}: AppsArchitectureSectionProps) {
    const isEn = locale === 'en';

    const defaultBullets = [
        {
            bold: isEn
                ? 'Één centrale bron van waarheid:'
                : 'Één centrale bron van waarheid:',
            text: isEn
                ? 'No separate databases or fragile API sync scripts.'
                : 'Geen losse databases, Excel-sheets of gevaarlijke API-koppelingen.',
        },
        {
            bold: isEn ? 'Nul dubbele invoer:' : 'Nul dubbele invoer:',
            text: isEn
                ? 'Indexations and invoices post straight into GL ledger journals.'
                : 'Huurovereenkomsten, indexaties en facturen landen direct als gevalideerde journaalposten in je grootboek.',
        },
        {
            bold: isEn
                ? '100% Realtime data-integriteit:'
                : '100% Realtime data-integriteit:',
            text: isEn
                ? 'Instant reliable insights for auditors, executives, and property managers.'
                : 'Direct betrouwbaar inzicht voor accountant, directie en beheerteam.',
        },
    ];

    const activeBullets = customBullets || defaultBullets;
    const activeTag = tag || (isEn ? 'SEAMLESS INTEGRATION' : 'NAADLOZE INTEGRATIE');
    const activeTitle = title || (isEn ? 'How our applications work together inside your ERP' : 'Hoe onze applicaties samenwerken binnen uw ERP');
    const activeSubtitle = subtitle || (isEn ? 'Unlike traditional real estate software that relies on complex API integrations and periodic batch imports, Emlinked software runs native inside Microsoft Dynamics 365 Business Central. That means: one central source of truth, zero duplicate data entry, and 100% realtime data integrity.' : 'In tegenstelling tot traditionele vastgoedsoftware die werkt met ingewikkelde API-koppelingen en periodieke batch-imports, draait de software van Emlinked native binnen Microsoft Dynamics 365 Business Central. Dat betekent: één centrale bron van waarheid, nul dubbele invoer en 100% realtime data-integriteit.');

    const activeSectionTag = sectionTag || (isEn ? 'MICROSOFT BUSINESS CENTRAL' : 'MICROSOFT BUSINESS CENTRAL INTEGRATIE');
    const activeSectionTitle = sectionTitle || (isEn ? '100% Realtime Control & Automatic Posting' : '100% Realtime controle en automatische aflettering');
    const activeSectionSubtitle = sectionSubtitle || (isEn ? 'Manage all your real estate operations natively inside Business Central with zero latency or shadow file risks.' : 'Beheer al je vastgoedprocessen native in Microsoft Dynamics 365 Business Central zonder vertraging of risico van schaduwbestanden.');

    return (
        <section className='relative px-6 py-20 mb-8 text-white border-b border-white/10 overflow-hidden bg-[#02030A] bg-[radial-gradient(circle_at_18%_-5%,rgba(79,70,229,.18),transparent_24%),radial-gradient(circle_at_22%_60%,rgba(79,70,229,.12),transparent_20%),radial-gradient(circle_at_74%_40%,rgba(79,70,229,.16),transparent_18%),radial-gradient(circle_at_72%_105%,rgba(79,70,229,.14),transparent_20%),linear-gradient(to_right,transparent_49.95%,rgba(255,255,255,.03)_50%,transparent_50.05%)]'>
            {/* Custom Section Background Image - 100% Full Cover */}
            <Image
                src={bgImagePath}
                alt={activeTitle}
                fill
                priority
                sizes='100vw'
                className='object-cover object-center opacity-35 pointer-events-none'
            />
            <div className='absolute inset-0 bg-slate-900 pointer-events-none opacity-40' />
            <div className='absolute inset-0 bg-linear-to-b from-[#060e32]/8 via-[#060e32]/70 to-[#060e32]/90 pointer-events-none' />

            {/* Ambient Background Radial Glows */}
            <div className='absolute top-0 right-1/4 w-200 h-200 bg-slate-900 blur-3xl pointer-events-none rounded-full opacity-90' />
            <div className='absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-black blur-3xl pointer-events-none rounded-full opacity-40' />

            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 relative z-10'>
                {/* ── 1. TOP PART: CENTERED HEADER & SMALLER TOP PNG DIAGRAM ── */}
                <div className='max-w-4xl mx-auto flex flex-col items-center text-center space-y-6'>
                    <span className='inline-flex items-center justify-center rounded-full border border-amber/50 bg-[#251b14]/90 px-6 py-1.5 text-xs font-mono font-bold tracking-widest text-amber uppercase backdrop-blur-md shadow-md'>
                        {activeTag}
                    </span>

                    <h2 className='font-display text-3xl md:text-4xl lg:text-[2.7rem]/12 font-bold tracking-tight text-white'>
                        {activeTitle}
                    </h2>

                    <p className='text-white/80 leading-relaxed text-base md:text-lg font-light max-w-3xl'>
                        {activeSubtitle}
                    </p>

                    {/* Centered Transparent PNG Architecture Diagram on Dark Background */}
                    <div className='relative w-full max-w-90 h-90 items-center justify-center mx-auto transition-all duration-300 mb-2'>
                        <Image
                            src='/emlinked/apps/naadloze-intergratie.png'
                            alt={activeTitle}
                            fill
                            sizes='360px'
                            className='object-contain hover:scale-105 transition-transform duration-500 drop-shadow-[0_15px_35px_rgba(0,0,0,0.25)] bg-transparent rounded-full'
                            priority
                        />
                    </div>
                </div>

                {/* ── 2. BOTTOM PART: BOX 3 STYLE BULLETS & 3D VISUAL ──────── */}
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-4 border-t border-white/10'>
                    {/* Left Column: Title, Subtitle & Bullets matching Box 3 check styling */}
                    <div className='lg:col-span-7 flex flex-col gap-6 text-left'>
                        <span className='inline-flex items-center justify-center self-start rounded-full border border-amber/50 bg-[#251b14]/90 px-6 py-1.5 text-xs font-mono font-bold tracking-widest text-amber uppercase backdrop-blur-md shadow-md'>
                            {activeSectionTag}
                        </span>

                        <h3 className='font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight'>
                            {activeSectionTitle}
                        </h3>

                        <p className='text-white/80 text-base md:text-lg leading-relaxed font-light'>
                            {activeSectionSubtitle}
                        </p>

                        {/* Bullets matching Frontpage Box 3 check styling on Dark Theme */}
                        <div className='flex flex-col gap-4 my-1'>
                            {activeBullets.map((b, idx) => (
                                <div
                                    key={idx}
                                    className='flex items-start gap-3.5 group'
                                >
                                    <div className='h-7 w-7 rounded-xl bg-amber/20 border border-amber/40 flex items-center justify-center text-amber shrink-0 mt-0.5 shadow-sm group-hover:bg-amber group-hover:text-[#060e32] transition-all duration-300'>
                                        <CheckCircle2 className='h-4 w-4' />
                                    </div>
                                    <div className='text-sm sm:text-base leading-relaxed text-white/90 pt-0.5'>
                                        {b.bold && (
                                            <strong className='text-white font-semibold mr-1.5'>
                                                {b.bold}
                                            </strong>
                                        )}
                                        <span className='font-light text-white/80'>
                                            {b.text}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: 3D Visual Workspace Image */}
                    <div className='lg:col-span-5 flex justify-center items-center'>
                        <div className='relative w-full max-w-md aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden border border-white/20 shadow-2xl group flex items-center justify-center hover:border-amber/60 transition-all duration-500'>
                            <Image
                                src='/emlinked/apps/samenwerken-binnen-ERP.jpg'
                                alt='Samenwerken binnen Business Central ERP'
                                fill
                                sizes='(max-width: 1024px) 100vw, 40vw'
                                className='object-cover object-center group-hover:scale-105 transition-transform duration-700'
                            />
                            <div className='absolute inset-0 bg-linear-to-t from-[#060e32]/50 via-transparent to-transparent pointer-events-none' />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
