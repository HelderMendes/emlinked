'use client';

import React, { useState, useMemo } from 'react';
import {
    Calculator,
    CheckCircle2,
    AlertTriangle,
    Info,
    ArrowRight,
    Building2,
    Coins,
    Sparkles,
    FileSpreadsheet,
    ShieldCheck,
} from 'lucide-react';

export type VerhuurStatus = 100 | 50 | 0;

export interface Box3Inputs {
    woz: number;
    huur: number;
    kosten: number;
    rente: number;
    schuld: number;
    waardeStijgingPct: number;
    verhuurPct: VerhuurStatus;
}

export interface Box3CalculationResult {
    belastingNu: number;
    belastingNieuw: number;
    belastingVerschil: number;
    nettoCashflow: number;
    totaalRendement: number;
    verdictType: 'good' | 'neutral' | 'bad';
    verdictTitle: string;
    verdictDetail: string;
}

const TARIEF = 0.36;
const HEFFINGSVRIJ = 1800;
const FORFAIT_RENDEMENT = 0.0588;
const SCHULD_RENDEMENT = 0.026;
const BIJTELLING_EIGEN_GEBRUIK = 0.0335;

export function useBox3Calculator(initialInputs?: Partial<Box3Inputs>) {
    const [inputs, setInputs] = useState<Box3Inputs>({
        woz: initialInputs?.woz ?? 400000,
        huur: initialInputs?.huur ?? 20000,
        kosten: initialInputs?.kosten ?? 3500,
        rente: initialInputs?.rente ?? 4000,
        schuld: initialInputs?.schuld ?? 150000,
        waardeStijgingPct: initialInputs?.waardeStijgingPct ?? 2.5,
        verhuurPct: initialInputs?.verhuurPct ?? 100,
    });

    const updateField = <K extends keyof Box3Inputs>(
        field: K,
        value: Box3Inputs[K],
    ) => {
        setInputs((prev) => ({ ...prev, [field]: value }));
    };

    const results = useMemo<Box3CalculationResult>(() => {
        const {
            woz,
            huur,
            kosten,
            rente,
            schuld,
            waardeStijgingPct,
            verhuurPct,
        } = inputs;

        // 1. Forfaitair (Huidig overbruggingsstelsel)
        const grondslagNu = Math.max(
            0,
            woz * FORFAIT_RENDEMENT - schuld * SCHULD_RENDEMENT,
        );
        const belastingNu = Math.max(0, grondslagNu - HEFFINGSVRIJ) * TARIEF;

        // 2. Werkelijk Rendement (Nieuw stelsel 2028)
        let grondslagNieuw = 0;
        if (verhuurPct >= 90) {
            grondslagNieuw = Math.max(0, huur - kosten - rente);
        } else if (verhuurPct === 0) {
            grondslagNieuw = Math.max(
                0,
                woz * BIJTELLING_EIGEN_GEBRUIK - rente,
            );
        } else {
            grondslagNieuw = Math.max(
                Math.max(0, huur - kosten - rente),
                Math.max(0, woz * BIJTELLING_EIGEN_GEBRUIK - rente),
            );
        }

        const belastingNieuw =
            Math.max(0, grondslagNieuw - HEFFINGSVRIJ) * TARIEF;
        const belastingVerschil = belastingNieuw - belastingNu;
        const nettoCashflow = huur - kosten - rente - belastingNieuw;
        const totaalRendement = nettoCashflow + woz * (waardeStijgingPct / 100);

        let verdictType: 'good' | 'neutral' | 'bad' = 'good';
        let verdictTitle = '✓ Uw vastgoed blijft rendabel na 2028';
        let verdictDetail = `Netto cashflow: € ${Math.round(nettoCashflow).toLocaleString('nl-NL')}/jaar. Totaalrendement: € ${Math.round(totaalRendement).toLocaleString('nl-NL')}/jaar.`;

        if (totaalRendement > 0 && belastingVerschil < -200) {
            verdictType = 'good';
            verdictTitle = '✓ Goed nieuws — uw belastingdruk daalt';
            verdictDetail = `U bespaart € ${Math.round(Math.abs(belastingVerschil)).toLocaleString('nl-NL')}/jaar ten opzichte van het forfaitaire stelsel!`;
        } else if (totaalRendement > 0 && belastingVerschil > 200) {
            verdictType = 'neutral';
            verdictTitle = '→ Rendabel — kostendocumentatie is cruciaal';
            verdictDetail = `U betaalt € ${Math.round(belastingVerschil).toLocaleString('nl-NL')} meer belasting. Elke aftrekbare euro telt. emlinked registreert dit automatisch.`;
        } else if (totaalRendement <= 0) {
            verdictType = 'bad';
            verdictTitle =
                '⚠ Negatief totaalrendement — heroverweeg uw aannames';
            verdictDetail = `Totaalrendement: € ${Math.round(totaalRendement).toLocaleString('nl-NL')}/jaar. Bespreek uw opties met een fiscaal adviseur.`;
        }

        return {
            belastingNu,
            belastingNieuw,
            belastingVerschil,
            nettoCashflow,
            totaalRendement,
            verdictType,
            verdictTitle,
            verdictDetail,
        };
    }, [inputs]);

    return { inputs, updateField, results };
}

export function Box3Calculator({ isEn = false }: { isEn?: boolean }) {
    const { inputs, updateField, results } = useBox3Calculator();

    const formatCurrency = (val: number) =>
        `€ ${Math.round(Math.abs(val)).toLocaleString(isEn ? 'en-US' : 'nl-NL')}`;

    const featureList = isEn
        ? [
              'Net rental return per property per year',
              'Maintenance & service costs with invoice OCR matching',
              'Mortgage interest per property — directly tax deductible',
              'WOZ property values & capital appreciation',
              '1-Click audit export for tax accountants',
          ]
        : [
              'Netto huurresultaat per pand per jaar',
              'Onderhouds- en servicekosten met factuurkoppeling',
              'Hypotheekrente per pand — automatisch aftrekbaar',
              'WOZ-waarden en waardeontwikkeling',
              'Exporteerbaar voor uw accountant',
          ];

    return (
        <section
            id='calculator'
            className='w-full bg-texture-navy py-16 px-4 md:px-8 text-white border-y border-white/10 relative overflow-hidden'
        >
            {/* Ambient Background Glows */}
            <div className='absolute top-0 right-1/4 w-96 h-96 bg-amber/10 rounded-full blur-3xl pointer-events-none' />
            <div className='absolute bottom-0 left-10 w-80 h-80 bg-amber-light/5 rounded-full blur-3xl pointer-events-none' />

            <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10'>
                {/* Left Information Column */}
                <div className='lg:col-span-5 flex flex-col justify-between space-y-8'>
                    <div>
                        <span className='inline-flex items-center gap-2 text-xs font-bold text-amber uppercase tracking-widest bg-amber/15 border border-amber/30 px-3.5 py-1 rounded-full mb-4'>
                            <Sparkles className='w-3.5 h-3.5' />
                            {isEn
                                ? 'Free Tool · No registration required'
                                : 'Gratis Tool · Geen registratie vereist'}
                        </span>
                        <h2 className='font-display text-3xl md:text-4xl font-extrabold text-white leading-tight mt-2 mb-4'>
                            {isEn
                                ? 'Will your real estate remain profitable after 2028?'
                                : 'Blijft uw vastgoed rendabel na 2028?'}
                        </h2>
                        <p className='text-white/75 text-base md:text-lg font-light leading-relaxed mb-6'>
                            {isEn
                                ? 'Enter your figures below. See instantly whether you are better or worse off under the new Box 3 actual yield regulations.'
                                : 'Vul uw cijfers in. U ziet direct of u beter of slechter af bent onder de nieuwe box 3-regels voor werkelijk rendement.'}
                        </p>
                    </div>

                    <div className='p-6 bg-slate-900/80 border border-white/10 rounded-2xl space-y-4 backdrop-blur-xl shadow-xl'>
                        <h3 className='text-xs font-bold text-amber uppercase tracking-wider mb-2 flex items-center gap-2'>
                            <ShieldCheck className='w-4 h-4 text-amber' />
                            {isEn
                                ? 'What Emlinked automatically tracks'
                                : 'Wat emlinked automatisch bijhoudt'}
                        </h3>
                        <div className='space-y-3'>
                            {featureList.map((item, idx) => (
                                <div
                                    key={idx}
                                    className='flex items-center gap-3 text-xs md:text-sm text-white/85'
                                >
                                    <span className='w-5 h-5 rounded-full bg-amber/20 text-amber flex items-center justify-center text-xs font-bold shrink-0'>
                                        ✓
                                    </span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Form & Results Interactive Card */}
                <div className='lg:col-span-7 bg-slate-900/90 border border-amber/30 rounded-3xl p-6 md:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden'>
                    <div className='flex items-center justify-between border-b border-white/10 pb-4 mb-6'>
                        <div className='flex items-center gap-3'>
                            <div className='p-2.5 rounded-xl bg-amber/15 border border-amber/30 text-amber'>
                                <Calculator className='w-5 h-5' />
                            </div>
                            <div>
                                <h3 className='text-base font-bold text-white'>
                                    {isEn
                                        ? 'Box 3 Yield Calculator 2028'
                                        : 'Box 3-rendement berekenen · 2028'}
                                </h3>
                                <p className='text-xs text-white/60'>
                                    {isEn
                                        ? 'Simulate your tax shift in real time'
                                        : 'Simuleer direct uw fiscale verschuiving'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Inputs Grid */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                        {/* WOZ Value */}
                        <div>
                            <label className='block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider'>
                                {isEn
                                    ? 'WOZ Property Value'
                                    : 'WOZ-waarde pand (€)'}
                            </label>
                            <div className='flex items-center bg-slate-950/80 border border-white/20 rounded-xl overflow-hidden focus-within:border-amber transition-colors'>
                                <span className='px-3 text-sm text-white/40 border-r border-white/10'>
                                    €
                                </span>
                                <input
                                    type='number'
                                    className='w-full bg-transparent px-3.5 py-2.5 text-sm font-semibold text-white focus:outline-none'
                                    value={inputs.woz}
                                    onChange={(e) =>
                                        updateField(
                                            'woz',
                                            Number(e.target.value),
                                        )
                                    }
                                    step={10000}
                                />
                            </div>
                        </div>

                        {/* Gross Rent */}
                        <div>
                            <label className='block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider'>
                                {isEn
                                    ? 'Gross Rent / year'
                                    : 'Bruto huurinkomsten / jr (€)'}
                            </label>
                            <div className='flex items-center bg-slate-950/80 border border-white/20 rounded-xl overflow-hidden focus-within:border-amber transition-colors'>
                                <span className='px-3 text-sm text-white/40 border-r border-white/10'>
                                    €
                                </span>
                                <input
                                    type='number'
                                    className='w-full bg-transparent px-3.5 py-2.5 text-sm font-semibold text-white focus:outline-none'
                                    value={inputs.huur}
                                    onChange={(e) =>
                                        updateField(
                                            'huur',
                                            Number(e.target.value),
                                        )
                                    }
                                    step={500}
                                />
                            </div>
                        </div>

                        {/* Maintenance Costs */}
                        <div>
                            <label className='block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider'>
                                {isEn
                                    ? 'Maintenance Costs / year'
                                    : 'Onderhoudskosten / jr (€)'}
                            </label>
                            <div className='flex items-center bg-slate-950/80 border border-white/20 rounded-xl overflow-hidden focus-within:border-amber transition-colors'>
                                <span className='px-3 text-sm text-white/40 border-r border-white/10'>
                                    €
                                </span>
                                <input
                                    type='number'
                                    className='w-full bg-transparent px-3.5 py-2.5 text-sm font-semibold text-white focus:outline-none'
                                    value={inputs.kosten}
                                    onChange={(e) =>
                                        updateField(
                                            'kosten',
                                            Number(e.target.value),
                                        )
                                    }
                                    step={500}
                                />
                            </div>
                        </div>

                        {/* Mortgage Interest */}
                        <div>
                            <label className='block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider'>
                                {isEn
                                    ? 'Mortgage Interest / year'
                                    : 'Hypotheekrente / jr (€)'}
                            </label>
                            <div className='flex items-center bg-slate-950/80 border border-white/20 rounded-xl overflow-hidden focus-within:border-amber transition-colors'>
                                <span className='px-3 text-sm text-white/40 border-r border-white/10'>
                                    €
                                </span>
                                <input
                                    type='number'
                                    className='w-full bg-transparent px-3.5 py-2.5 text-sm font-semibold text-white focus:outline-none'
                                    value={inputs.rente}
                                    onChange={(e) =>
                                        updateField(
                                            'rente',
                                            Number(e.target.value),
                                        )
                                    }
                                    step={500}
                                />
                            </div>
                        </div>

                        {/* Total Mortgage Debt */}
                        <div>
                            <label className='block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider'>
                                {isEn
                                    ? 'Mortgage Debt Total'
                                    : 'Hypotheekschuld totaal (€)'}
                            </label>
                            <div className='flex items-center bg-slate-950/80 border border-white/20 rounded-xl overflow-hidden focus-within:border-amber transition-colors'>
                                <span className='px-3 text-sm text-white/40 border-r border-white/10'>
                                    €
                                </span>
                                <input
                                    type='number'
                                    className='w-full bg-transparent px-3.5 py-2.5 text-sm font-semibold text-white focus:outline-none'
                                    value={inputs.schuld}
                                    onChange={(e) =>
                                        updateField(
                                            'schuld',
                                            Number(e.target.value),
                                        )
                                    }
                                    step={5000}
                                />
                            </div>
                        </div>

                        {/* Capital Value Appreciation */}
                        <div>
                            <label className='block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider'>
                                {isEn
                                    ? 'Value Growth (%/yr)'
                                    : 'Waardestijging (%/jr)'}
                            </label>
                            <div className='flex items-center bg-slate-950/80 border border-white/20 rounded-xl overflow-hidden focus-within:border-amber transition-colors'>
                                <span className='px-3 text-sm text-white/40 border-r border-white/10'>
                                    %
                                </span>
                                <input
                                    type='number'
                                    className='w-full bg-transparent px-3.5 py-2.5 text-sm font-semibold text-white focus:outline-none'
                                    value={inputs.waardeStijgingPct}
                                    onChange={(e) =>
                                        updateField(
                                            'waardeStijgingPct',
                                            Number(e.target.value),
                                        )
                                    }
                                    step={0.5}
                                />
                            </div>
                        </div>

                        {/* Rental Occupancy Status */}
                        <div className='sm:col-span-2 mt-1'>
                            <label className='block text-xs font-semibold text-white/70 mb-2 uppercase tracking-wider'>
                                {isEn ? 'Rental Status' : 'Verhuurstatus'}
                            </label>
                            <div className='grid grid-cols-3 gap-2'>
                                {[
                                    {
                                        label: isEn
                                            ? 'Full (≥90%)'
                                            : 'Volledig (≥90%)',
                                        val: 100,
                                    },
                                    {
                                        label: isEn
                                            ? 'Partial (<90%)'
                                            : 'Deels (<90%)',
                                        val: 50,
                                    },
                                    {
                                        label: isEn
                                            ? 'Not rented'
                                            : 'Niet verhuurd',
                                        val: 0,
                                    },
                                ].map((option) => (
                                    <button
                                        key={option.val}
                                        type='button'
                                        onClick={() =>
                                            updateField(
                                                'verhuurPct',
                                                option.val as VerhuurStatus,
                                            )
                                        }
                                        className={`py-2.5 px-3 text-xs rounded-xl border transition-all duration-200 text-center font-medium ${
                                            inputs.verhuurPct === option.val
                                                ? 'border-amber bg-amber/20 text-amber font-bold shadow-sm'
                                                : 'border-white/15 text-white/60 hover:border-white/30 hover:text-white'
                                        }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Results Output Section */}
                    <div
                        className={`mt-6 p-5 rounded-2xl border transition-all duration-300 ${
                            results.verdictType === 'good'
                                ? 'bg-amber/15 border-amber/40 text-amber'
                                : results.verdictType === 'neutral'
                                  ? 'bg-slate-800/80 border-white/20 text-white'
                                  : 'bg-red-500/15 border-red-500/30 text-red-200'
                        }`}
                    >
                        <div className='font-bold text-base flex items-center gap-2 mb-3'>
                            {results.verdictType === 'good' && (
                                <CheckCircle2 className='w-5 h-5 shrink-0' />
                            )}
                            {results.verdictType === 'neutral' && (
                                <Info className='w-5 h-5 shrink-0 text-amber' />
                            )}
                            {results.verdictType === 'bad' && (
                                <AlertTriangle className='w-5 h-5 shrink-0 text-red-400' />
                            )}
                            <span>{results.verdictTitle}</span>
                        </div>

                        <div className='grid grid-cols-2 gap-3 my-4'>
                            <div className='bg-slate-950/60 p-3.5 rounded-xl text-center border border-white/5'>
                                <div className='text-[11px] text-white/50 uppercase tracking-wider font-medium'>
                                    {isEn
                                        ? 'Tax Current (Forfait)'
                                        : 'Belasting nu (forfait)'}
                                </div>
                                <div className='text-lg md:text-xl font-extrabold text-white mt-1'>
                                    {formatCurrency(results.belastingNu)}
                                </div>
                            </div>
                            <div className='bg-slate-950/60 p-3.5 rounded-xl text-center border border-white/5'>
                                <div className='text-[11px] text-white/50 uppercase tracking-wider font-medium'>
                                    {isEn
                                        ? 'Tax 2028 (Actual Yield)'
                                        : 'Belasting 2028 (werkelijk)'}
                                </div>
                                <div className='text-lg md:text-xl font-extrabold text-amber mt-1'>
                                    {formatCurrency(results.belastingNieuw)}
                                </div>
                            </div>
                        </div>

                        <p className='text-xs text-white/80 leading-relaxed font-medium'>
                            {results.verdictDetail}
                        </p>
                    </div>

                    <p className='text-center text-[11px] text-white/40 mt-4'>
                        {isEn
                            ? 'Indicative calculation · High Court guidelines · No formal tax advice'
                            : 'Indicatief · Eerste Kamer akkoord in behandeling · Geen formeel belastingadvies'}
                    </p>
                </div>
            </div>
        </section>
    );
}
