'use client';

import React, { useState } from 'react';
import {
    Database,
    ShieldCheck,
    Zap,
    Building2,
    Users,
    CreditCard,
    ArrowDown,
    FileText,
    Receipt,
    Landmark,
    CheckCircle2,
    Layers,
    Activity,
} from 'lucide-react';

interface AppsArchitectureSectionProps {
    locale?: string;
}

export function AppsArchitectureSection({
    locale = 'nl',
}: AppsArchitectureSectionProps) {
    const isEn = locale === 'en';
    const [activeModule, setActiveModule] = useState<string | null>(null);

    const apps = [
        {
            id: 'vastgoedbeheer',
            title: isEn ? 'Property Management' : 'Vastgoedbeheer',
            icon: <Building2 className='h-5 w-5 text-amber' />,
            flows: ['grootboek', 'debiteuren', 'document-capture'],
            desc: isEn
                ? 'Automated CPI indexation, contract management & ledger posting'
                : 'Automatische CPI-indexering, contractbeheer & journaalposten',
        },
        {
            id: 'huurdersportaal',
            title: isEn ? 'Tenant Portal' : 'Huurdersportaal',
            icon: <Users className='h-5 w-5 text-amber' />,
            flows: ['debiteuren', 'document-capture'],
            desc: isEn
                ? 'Tenant maintenance tickets & live invoice accessibility'
                : 'Onderhoudsmeldingen, huurfacturen & 24/7 self-service',
        },
        {
            id: 'payment',
            title: isEn ? 'Payment Engine' : 'Payment Engine',
            icon: <CreditCard className='h-5 w-5 text-amber' />,
            flows: ['debiteuren', 'direct-banking', 'grootboek'],
            desc: isEn
                ? 'Automated SEPA Direct Debit & instant bank reconciliation'
                : 'Geautomatiseerde SEPA-incasso & directe bankaflettering',
        },
    ];

    const bcModules = [
        {
            id: 'grootboek',
            title: isEn ? 'General Ledger' : 'Grootboek',
            icon: <FileText className='h-4 w-4 text-amber' />,
            desc: isEn
                ? 'Real-time journal entries'
                : 'Realtime journaalposten',
        },
        {
            id: 'debiteuren',
            title: isEn ? 'Accounts Receivable' : 'Debiteuren',
            icon: <Receipt className='h-4 w-4 text-amber' />,
            desc: isEn
                ? 'Rent invoicing & matching'
                : 'Huurfacturatie & aflettering',
        },
        {
            id: 'inkoop',
            title: isEn ? 'Purchasing' : 'Inkoop',
            icon: <Layers className='h-4 w-4 text-amber' />,
            desc: isEn
                ? 'Vendor invoices & expenses'
                : 'Leveranciersfacturen & onderhoud',
        },
        {
            id: 'document-capture',
            title: isEn ? 'Document Capture' : 'Document Capture',
            icon: <Database className='h-4 w-4 text-amber' />,
            desc: isEn
                ? 'OCR digital invoice storage'
                : 'OCR digitale contracten',
        },
        {
            id: 'direct-banking',
            title: isEn ? 'Direct Banking' : 'Direct Banking',
            icon: <Landmark className='h-4 w-4 text-amber' />,
            desc: isEn
                ? 'PSD2 live bank feed matching'
                : 'PSD2 bankaflettering',
        },
    ];

    return (
        <section className='px-6 py-20 bg-background border-b border-border relative overflow-hidden'>
            <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 space-y-12 relative z-10'>
                {/* Section Header matching homepage */}
                <div className='max-w-3xl mx-auto flex flex-col gap-3 text-center'>
                    <div className='flex justify-center mb-1'>
                        <span className='inline-flex items-center gap-2 rounded-full border-amber border bg-amber px-6 py-1 text-xs font-bold tracking-wide text-white uppercase'>
                            <span className='w-1.5 h-1.5 bg-white rounded-full animate-ping mr-2' />
                            {isEn
                                ? 'SEAMLESS NATIVE INTEGRATION'
                                : 'NAADLOZE INTEGRATIE'}
                        </span>
                    </div>
                    <h2 className='font-display text-3xl md:text-4xl lg:text-[2.7rem]/12 font-bold tracking-tight text-darkblue'>
                        {isEn
                            ? 'How our applications work inside your ERP'
                            : 'Hoe onze applicaties samenwerken binnen je ERP'}
                    </h2>
                    <p className='text-muted-foreground leading-relaxed text-base md:text-lg font-light'>
                        {isEn
                            ? 'Unlike traditional real estate software that relies on complex API integrations and periodic batch imports, Emlinked runs 100% native inside Microsoft Dynamics 365 Business Central.'
                            : 'In tegenstelling tot traditionele vastgoedsoftware die werkt met ingewikkelde API-koppelingen en periodieke batch-imports, draait de software van Emlinked native binnen Microsoft Dynamics 365 Business Central.'}
                    </p>
                </div>

                {/* Sleek Ecosystem Card */}
                <div className='rounded-2xl border border-white/10 bg-[#060e32] text-white p-6 md:p-10 shadow-2xl space-y-8 relative overflow-hidden'>
                    <div className='absolute top-0 right-0 w-96 h-96 bg-amber/10 blur-3xl pointer-events-none rounded-full' />

                    {/* Top status bar */}
                    <div className='flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono text-white/70'>
                        <div className='flex items-center gap-2'>
                            <Activity className='h-4 w-4 text-emerald-400 animate-pulse' />
                            <span className='font-bold text-white'>
                                EMLINKED NATIVE ECOSYSTEM
                            </span>
                        </div>
                        <span className='text-amber font-semibold'>
                            Zero API Latency • 100% Realtime
                        </span>
                    </div>

                    {/* Top Tier: 3 Modules */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {apps.map((app) => {
                            const isSelected = activeModule === app.id;
                            return (
                                <div
                                    key={app.id}
                                    onMouseEnter={() => setActiveModule(app.id)}
                                    onMouseLeave={() => setActiveModule(null)}
                                    className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                                        isSelected
                                            ? 'border-amber bg-amber/15 shadow-lg scale-[1.02]'
                                            : 'border-white/10 bg-white/5 hover:border-amber/40 hover:bg-white/[0.08]'
                                    }`}
                                >
                                    <div className='flex items-center justify-between mb-3'>
                                        <div className='p-2 rounded-lg bg-amber/20 border border-amber/30'>
                                            {app.icon}
                                        </div>
                                        <span className='text-[10px] font-mono font-bold text-amber uppercase tracking-wider px-2 py-0.5 rounded bg-amber/10 border border-amber/20'>
                                            Native Module
                                        </span>
                                    </div>
                                    <h4 className='font-bold text-base text-white mb-1'>
                                        {app.title}
                                    </h4>
                                    <p className='text-xs text-white/70 leading-relaxed font-light'>
                                        {app.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Data Bus Pipeline Divider */}
                    <div className='relative py-2 flex items-center justify-center'>
                        <div className='w-full h-px bg-gradient-to-r from-transparent via-amber/50 to-transparent' />
                        <div className='absolute px-4 py-1 rounded-full bg-[#060e32] border border-amber/40 text-[11px] font-mono text-amber font-bold flex items-center gap-2 shadow-lg'>
                            <Zap className='h-3.5 w-3.5 text-amber animate-spin' />
                            <span>LIVE NATIVE AL DATA BUS</span>
                            <ArrowDown className='h-3.5 w-3.5 text-amber' />
                        </div>
                    </div>

                    {/* Central ERP Hub */}
                    <div className='p-6 rounded-xl border border-white/10 bg-white/[0.03] space-y-5'>
                        <div className='flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4'>
                            <div className='flex items-center gap-3'>
                                <div className='p-2.5 rounded-lg bg-amber/20 border border-amber/30 text-amber'>
                                    <Database className='h-6 w-6' />
                                </div>
                                <div>
                                    <span className='text-[10px] font-mono font-bold text-amber uppercase tracking-wider block'>
                                        Core Financial ERP System
                                    </span>
                                    <h3 className='font-bold text-lg text-white'>
                                        Microsoft Dynamics 365 Business Central
                                    </h3>
                                </div>
                            </div>
                            <span className='px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold'>
                                100% Single Source of Truth
                            </span>
                        </div>

                        {/* BC Sub-modules */}
                        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3'>
                            {bcModules.map((mod) => {
                                const isHighlighted =
                                    activeModule &&
                                    apps
                                        .find((a) => a.id === activeModule)
                                        ?.flows.includes(mod.id);

                                return (
                                    <div
                                        key={mod.id}
                                        className={`p-3 rounded-lg border text-left transition-all ${
                                            isHighlighted
                                                ? 'border-amber bg-amber/20 text-white shadow-md'
                                                : 'border-white/10 bg-white/5 text-white/80'
                                        }`}
                                    >
                                        <div className='flex items-center gap-2 mb-1'>
                                            {mod.icon}
                                            <span className='font-bold text-xs text-white truncate'>
                                                {mod.title}
                                            </span>
                                        </div>
                                        <p className='text-[10px] text-white/60 line-clamp-1'>
                                            {mod.desc}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Architecture Bullet Highlights */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-white/10 text-left'>
                        <div className='flex items-start gap-3'>
                            <CheckCircle2 className='h-5 w-5 text-amber shrink-0 mt-0.5' />
                            <div>
                                <h5 className='font-bold text-xs text-white mb-0.5'>
                                    Geen API Latency of Batch Sync
                                </h5>
                                <p className='text-xs text-white/70 leading-relaxed font-light'>
                                    Data is direct beschikbaar in het financieel
                                    grootboek zonder te wachten op nachtelijke
                                    synchronisaties.
                                </p>
                            </div>
                        </div>
                        <div className='flex items-start gap-3'>
                            <CheckCircle2 className='h-5 w-5 text-amber shrink-0 mt-0.5' />
                            <div>
                                <h5 className='font-bold text-xs text-white mb-0.5'>
                                    Ingebouwde Audittrail & Compliance
                                </h5>
                                <p className='text-xs text-white/70 leading-relaxed font-light'>
                                    Volledige administratieve verantwoording
                                    volgens de normen van accountant en
                                    belastingdienst.
                                </p>
                            </div>
                        </div>
                        <div className='flex items-start gap-3'>
                            <CheckCircle2 className='h-5 w-5 text-amber shrink-0 mt-0.5' />
                            <div>
                                <h5 className='font-bold text-xs text-white mb-0.5'>
                                    Naadloos Uitbreidbaar
                                </h5>
                                <p className='text-xs text-white/70 leading-relaxed font-light'>
                                    Start met Vastgoedbeheer en voeg
                                    Huurdersportaal of Payment Engine toe
                                    wanneer je organisatie groeit.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
