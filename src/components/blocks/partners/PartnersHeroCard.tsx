'use client';

import React from 'react';
import Image from 'next/image';
import { Layers, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { BorderBeam } from 'border-beam';

interface PartnersHeroCardProps {
    isEn?: boolean;
}

export function PartnersHeroCard({ isEn = false }: PartnersHeroCardProps) {
    return (
        <BorderBeam colorVariant='orange'>
            <div className='relative w-full max-w-lg mx-auto rounded-3xl bg-slate-900/90 text-white border border-amber/30 p-6 md:p-8 shadow-2xl backdrop-blur-xl space-y-6 overflow-hidden'>
                {/* Header Badge */}
            <div className='flex items-center justify-between border-b border-white/10 pb-4'>
                <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-xl bg-amber/20 border border-amber/40 flex items-center justify-center text-amber'>
                        <Layers className='w-5 h-5' />
                    </div>
                    <div>
                        <h4 className='font-bold text-base text-white'>
                            Ecosystem Integrations
                        </h4>
                        <span className='text-xs text-amber font-mono'>
                            Native Business Central Engine
                        </span>
                    </div>
                </div>
                <span className='px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5'>
                    <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse' />
                    100% Synced
                </span>
            </div>

            {/* Partners List preview items */}
            <div className='divide-y divide-white/10 py-1'>
                {/* Item 1: Microsoft */}
                <div className='py-3 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <span className='w-8 h-8 rounded-lg bg-amber/15 text-amber border border-amber/30 flex items-center justify-center text-xs font-bold shrink-0'>
                            MS
                        </span>
                        <div>
                            <span className='text-xs font-bold text-white block'>
                                Business Central ERP
                            </span>
                            <span className='text-[10px] text-white/60 font-mono'>
                                Financials & Property Ledger
                            </span>
                        </div>
                    </div>
                    <CheckCircle2 className='w-4 h-4 text-emerald-400 shrink-0' />
                </div>

                {/* Item 2: Continia */}
                <div className='py-3 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <span className='w-8 h-8 rounded-lg bg-amber/15 text-amber border border-amber/30 flex items-center justify-center text-xs font-bold shrink-0'>
                            CC
                        </span>
                        <div>
                            <span className='text-xs font-bold text-white block'>
                                Continia Document Capture
                            </span>
                            <span className='text-[10px] text-white/60 font-mono'>
                                Smart OCR Invoice Processing
                            </span>
                        </div>
                    </div>
                    <CheckCircle2 className='w-4 h-4 text-emerald-400 shrink-0' />
                </div>

                {/* Item 3: Idyn */}
                <div className='py-3 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <span className='w-8 h-8 rounded-lg bg-amber/15 text-amber border border-amber/30 flex items-center justify-center text-xs font-bold shrink-0'>
                            ID
                        </span>
                        <div>
                            <span className='text-xs font-bold text-white block'>
                                Idyn Direct Banking
                            </span>
                            <span className='text-[10px] text-white/60 font-mono'>
                                Auto Bank Statement Sync
                            </span>
                        </div>
                    </div>
                    <CheckCircle2 className='w-4 h-4 text-emerald-400 shrink-0' />
                </div>
            </div>

            {/* Footer Status */}
            <div className='pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/70'>
                <span className='flex items-center gap-1.5 text-amber font-mono font-medium'>
                    <Zap className='w-3.5 h-3.5' />
                    Cloud ERP Ecosystem
                </span>
                <span className='text-[11px] text-white/50'>
                    {isEn ? 'Automatic Updates' : 'Automatische Updates'}
                </span>
            </div>
        </div>
    </BorderBeam>
    );
}
