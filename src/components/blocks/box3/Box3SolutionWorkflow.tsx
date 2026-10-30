import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export interface WorkflowItem {
    _key?: string;
    step?: string;
    title: string;
    text?: string;
    description?: string;
    feature?: string;
    subtitle?: string;
}

interface Box3SolutionWorkflowProps {
    workflowBadge: string;
    workflowTitle: string;
    workflowItems: WorkflowItem[];
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
            className='py-20 px-6 bg-stone-bg text-navy-900  relative overflow-hidden'
        >
            <div className='max-w-7xl mx-auto space-y-12'>
                <div className='text-center max-w-3xl mx-auto space-y-4'>
                    <Badge color='teal' uppercase dot dotPulse>
                        {workflowBadge}
                    </Badge>
                    <h2 className='font-display text-3xl md:text-4xl font-extrabold text-navy-900'>
                        {workflowTitle}
                    </h2>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {workflowItems.map((card, idx: number) => (
                        <div
                            key={card._key || idx}
                            className='px-8 pt-8 pb-4 rounded-3xl bg-white border border-navy-900/10 hover:border-teal/40 hover:shadow-lg transition-all duration-300 space-y-4 flex flex-col justify-between group relative'
                        >
                            {/* Square with round corners Top-Right Floating Step Badge */}
                            <div className='absolute -top-3.5 -right-3 z-30 size-12 sm:size-14 rounded-xl bg-teal text-white shadow-lg border-2 border-white flex flex-col items-center justify-center font-extrabold text-[9px] uppercase tracking-tight leading-none group-hover:scale-110 transition-transform duration-300 pointer-events-none'>
                                <span className='opacity-90 text-[10px] mt-1.5'>
                                    {isEn ? 'STEP' : 'STAP'}
                                </span>
                                <span className='text-xl font-semibold -mt-1'>
                                    {card.step || `0${idx + 1}`}
                                </span>
                            </div>

                            <div className='space-y-4 pt-2 '>
                                <h3 className='text-xl font-bold text-navy-900'>
                                    {card.title}
                                </h3>
                                <p className='text-navy-600 leading-relaxed font-light'>
                                    {card.text || card.description}
                                </p>
                            </div>
                            {(card.feature || card.subtitle) && (
                                <div className='pt-4 border-t border-navy-900/10 flex items-center gap-2 text-sm font-semibold text-teal'>
                                    <CheckCircle2 className='w-4 h-4 shrink-0' />
                                    <span>{card.feature || card.subtitle}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
