import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface Box3SolutionWorkflowProps {
    workflowBadge: string;
    workflowTitle: string;
    workflowItems: Array<{
        _key?: string;
        step?: string;
        title: string;
        text?: string;
        description?: string;
        feature?: string;
        subtitle?: string;
    }>;
    isEn: boolean;
}

export function Box3SolutionWorkflow({
    workflowBadge,
    workflowTitle,
    workflowItems,
    isEn,
}: Box3SolutionWorkflowProps) {
    return (
        <section
            id='wat-het-doet'
            className='py-20 px-6 bg-texture-navy text-white border-b border-white/10 relative overflow-hidden'
        >
            <div className='max-w-7xl mx-auto space-y-12'>
                <div className='text-center max-w-3xl mx-auto space-y-4'>
                    <span className='text-xs font-bold text-amber uppercase tracking-widest bg-amber/15 border border-amber/30 px-3.5 py-1 rounded-full inline-block'>
                        {workflowBadge}
                    </span>
                    <h2 className='font-display text-3xl md:text-4xl font-extrabold text-white'>
                        {workflowTitle}
                    </h2>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {workflowItems.map((card: any, idx: number) => (
                        <div
                            key={card._key || idx}
                            className='p-8 rounded-3xl bg-slate-900/80 border border-white/10 hover:border-amber/40 transition-all duration-300 space-y-4 flex flex-col justify-between group relative'
                        >
                            {/* Floating Top-Right Circular Step Badge */}
                            <div className='absolute -top-3.5 -right-3 z-30 w-12 h-12 rounded-full bg-slate-900/80 text-white shadow-xl border-2 border-white/40 dark:border-slate-950 flex flex-col items-center justify-center font-extrabold text-[9px] uppercase tracking-tight leading-none group-hover:scale-110 transition-transform duration-300 pointer-events-none'>
                                <span className='opacity-90 text-[8px]'>
                                    {isEn ? 'STEP' : 'STAP'}
                                </span>
                                <span className='text-sm font-black'>
                                    {card.step || `0${idx + 1}`}
                                </span>
                            </div>

                            <div className='space-y-4 pt-2'>
                                <h3 className='text-xl font-bold text-white'>
                                    {card.title}
                                </h3>
                                <p className='text-xs md:text-sm text-white/75 leading-relaxed font-light'>
                                    {card.text || card.description}
                                </p>
                            </div>
                            {(card.feature || card.subtitle) && (
                                <div className='pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-bold text-amber'>
                                    <CheckCircle2 className='w-4 h-4 shrink-0' />
                                    <span>
                                        {card.feature || card.subtitle}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
