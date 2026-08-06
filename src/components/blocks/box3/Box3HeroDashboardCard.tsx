import React from 'react';

interface Box3HeroDashboardCardProps {
    isEn?: boolean;
    badge?: string;
    title?: string;
    status?: string;
}

export function Box3HeroDashboardCard({
    isEn = false,
    badge,
    title,
    status,
}: Box3HeroDashboardCardProps) {
    const cardBadge =
        badge ||
        (isEn
            ? 'PORTFOLIO OVERVIEW · LIVE'
            : 'PORTEFEUILLE-OVERZICHT · LIVE');

    const cardTitle = title || 'Box 3-Status & Metrics';

    const cardStatus = status || (isEn ? 'Active' : 'Actueel');

    const rows = [
        {
            label: isEn ? 'Total Properties' : 'Totale Objecten',
            val: '48',
            badge: isEn ? 'Active' : 'Actueel',
            bStyle: 'bg-slate-800 text-slate-300 border border-slate-700/60',
        },
        {
            label: isEn ? 'Occupancy Rate' : 'Bezettingsgraad',
            val: '96,4%',
            badge: isEn ? '↑ Good' : '↑ Goed',
            bStyle:
                'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold',
        },
        {
            label: isEn ? 'Rental Income YTD' : 'Huurinkomsten YTD',
            val: '€ 387.200',
            badge: null,
            bStyle: '',
        },
        {
            label: isEn ? 'Expenses Logged' : 'Kosten Geregistreerd',
            val: '€ 41.800',
            badge: isEn ? 'Deductible' : 'Aftrekbaar',
            bStyle:
                'bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold',
        },
        {
            label: isEn ? 'Box 3 Status 2028' : 'Box 3-Status 2028',
            val: isEn ? '✓ Audit-ready' : '✓ Aangifte-klaar',
            badge: null,
            bStyle: '',
        },
        {
            label: isEn ? 'Open Indexations' : 'Openstaande Indexaties',
            val: '3',
            badge: isEn ? 'Action required' : 'Actie vereist',
            bStyle:
                'bg-red-500/20 text-red-400 border border-red-500/30 font-bold',
        },
    ];

    return (
        <div className='w-full p-6 md:p-8 rounded-2xl bg-slate-900/90 text-white border border-amber/30 shadow-2xl relative overflow-hidden group backdrop-blur-xl space-y-5'>
            {/* Header Row */}
            <div className='flex items-start justify-between border-b border-white/10 pb-4'>
                <div>
                    <span className='font-mono text-xs font-bold tracking-widest text-amber uppercase block'>
                        {cardBadge}
                    </span>
                    <h3 className='font-bold text-xl md:text-2xl text-white mt-1'>
                        {cardTitle}
                    </h3>
                </div>
                <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono text-xs font-bold shrink-0'>
                    <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse' />
                    <span>{cardStatus}</span>
                </span>
            </div>

            {/* Metrics Rows */}
            <div className='space-y-1 text-xs md:text-sm'>
                {rows.map((row, idx) => (
                    <div
                        key={idx}
                        className='flex justify-between items-center py-1.5 border-b border-white/10 last:border-b-0'
                    >
                        <span className='text-white/70 font-medium'>
                            {row.label}
                        </span>
                        <span className='font-semibold text-white flex items-center gap-2.5'>
                            <span>{row.val}</span>
                            {row.badge && (
                                <span
                                    className={`text-[10px] px-2.5 py-0.5 rounded-md font-mono ${row.bStyle}`}
                                >
                                    {row.badge}
                                </span>
                            )}
                        </span>
                    </div>
                ))}
            </div>

            {/* Footer Row */}
            <div className='pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/50'>
                <span>Microsoft Business Central</span>
                <span className='text-amber font-mono font-bold'>
                    100% Synced
                </span>
            </div>
        </div>
    );
}
