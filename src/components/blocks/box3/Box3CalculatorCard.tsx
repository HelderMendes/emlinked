'use client';

import React from 'react';
import { Calculator, CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import {
    useBox3Calculator,
    VerhuurStatus,
    Box3Inputs,
    Box3CalculationResult,
} from '@/components/Box3Calculator';

interface Box3CalculatorCardProps {
    isEn?: boolean;
    inputs?: Box3Inputs;
    updateField?: <K extends keyof Box3Inputs>(
        field: K,
        value: Box3Inputs[K],
    ) => void;
    results?: Box3CalculationResult;
}

export function Box3CalculatorCard({
    isEn = false,
    inputs: externalInputs,
    updateField: externalUpdateField,
    results: externalResults,
}: Box3CalculatorCardProps) {
    const internalCalc = useBox3Calculator(undefined, isEn);

    const inputs = externalInputs || internalCalc.inputs;
    const updateField = externalUpdateField || internalCalc.updateField;
    const results = externalResults || internalCalc.results;

    const formatCurrency = (val: number) =>
        `€ ${Math.round(Math.abs(val)).toLocaleString(isEn ? 'en-US' : 'nl-NL')}`;

    return (
        <div className='bg-white border-2 border-amber/30 rounded-3xl p-6 md:p-8 shadow-[0_16px_45px_rgba(245,158,11,0.12)] relative overflow-hidden text-[#060e32]'>
            {/* Header */}
            <div className='flex items-center justify-between border-b border-amber/20 pb-4 mb-6'>
                <div className='flex items-center gap-3'>
                    <div className='p-2.5 rounded-xl bg-amber/15 border border-amber/30 text-amber shadow-xs'>
                        <Calculator className='w-5 h-5' />
                    </div>
                    <div>
                        <h3 className='text-lg font-bold text-[#060e32]'>
                            {isEn
                                ? 'Box 3 Yield Calculator 2028'
                                : 'Box 3-rendement berekenen · 2028'}
                        </h3>
                        <p className='text-xs text-[#060e32]/60 font-light'>
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
                    <label className='block text-xs font-semibold text-[#060e32]/70 mb-1.5 tracking-wider'>
                        {isEn ? 'WOZ Property Value' : 'WOZ-waarde pand (€)'}
                    </label>
                    <div className='flex items-center bg-white border border-slate-300 rounded-xl overflow-hidden focus-within:border-amber focus-within:ring-2 focus-within:ring-amber/20 transition-all shadow-xs'>
                        <span className='px-3 text-sm text-[#060e32]/50 border-r border-slate-200 bg-slate-50 font-mono'>
                            €
                        </span>
                        <input
                            type='number'
                            className='w-full bg-transparent px-3.5 py-2.5 text-sm font-semibold text-[#060e32] focus:outline-none'
                            value={inputs.woz}
                            onChange={(e) =>
                                updateField('woz', Number(e.target.value))
                            }
                            step={10000}
                        />
                    </div>
                </div>

                {/* Gross Rent */}
                <div>
                    <label className='block text-xs font-semibold text-[#060e32]/70 mb-1.5 tracking-wider'>
                        {isEn
                            ? 'Gross Rent / year'
                            : 'Bruto huurinkomsten / jr (€)'}
                    </label>
                    <div className='flex items-center bg-white border border-slate-300 rounded-xl overflow-hidden focus-within:border-amber focus-within:ring-2 focus-within:ring-amber/20 transition-all shadow-xs'>
                        <span className='px-3 text-sm text-[#060e32]/50 border-r border-slate-200 bg-slate-50 font-mono'>
                            €
                        </span>
                        <input
                            type='number'
                            className='w-full bg-transparent px-3.5 py-2.5 text-sm font-semibold text-[#060e32] focus:outline-none'
                            value={inputs.huur}
                            onChange={(e) =>
                                updateField('huur', Number(e.target.value))
                            }
                            step={500}
                        />
                    </div>
                </div>

                {/* Maintenance Costs */}
                <div>
                    <label className='block text-xs font-semibold text-[#060e32]/70 mb-1.5 tracking-wider'>
                        {isEn
                            ? 'Maintenance Costs / year'
                            : 'Onderhoudskosten / jr (€)'}
                    </label>
                    <div className='flex items-center bg-white border border-slate-300 rounded-xl overflow-hidden focus-within:border-amber focus-within:ring-2 focus-within:ring-amber/20 transition-all shadow-xs'>
                        <span className='px-3 text-sm text-[#060e32]/50 border-r border-slate-200 bg-slate-50 font-mono'>
                            €
                        </span>
                        <input
                            type='number'
                            className='w-full bg-transparent px-3.5 py-2.5 text-sm font-semibold text-[#060e32] focus:outline-none'
                            value={inputs.kosten}
                            onChange={(e) =>
                                updateField('kosten', Number(e.target.value))
                            }
                            step={500}
                        />
                    </div>
                </div>

                {/* Mortgage Interest */}
                <div>
                    <label className='block text-xs font-semibold text-[#060e32]/70 mb-1.5 tracking-wider'>
                        {isEn
                            ? 'Mortgage Interest / year'
                            : 'Hypotheekrente / jr (€)'}
                    </label>
                    <div className='flex items-center bg-white border border-slate-300 rounded-xl overflow-hidden focus-within:border-amber focus-within:ring-2 focus-within:ring-amber/20 transition-all shadow-xs'>
                        <span className='px-3 text-sm text-[#060e32]/50 border-r border-slate-200 bg-slate-50 font-mono'>
                            €
                        </span>
                        <input
                            type='number'
                            className='w-full bg-transparent px-3.5 py-2.5 text-sm font-semibold text-[#060e32] focus:outline-none'
                            value={inputs.rente}
                            onChange={(e) =>
                                updateField('rente', Number(e.target.value))
                            }
                            step={500}
                        />
                    </div>
                </div>

                {/* Total Mortgage Debt */}
                <div>
                    <label className='block text-xs font-semibold text-[#060e32]/70 mb-1.5 tracking-wider'>
                        {isEn
                            ? 'Mortgage Debt Total'
                            : 'Hypotheekschuld totaal (€)'}
                    </label>
                    <div className='flex items-center bg-white border border-slate-300 rounded-xl overflow-hidden focus-within:border-amber focus-within:ring-2 focus-within:ring-amber/20 transition-all shadow-xs'>
                        <span className='px-3 text-sm text-[#060e32]/50 border-r border-slate-200 bg-slate-50 font-mono'>
                            €
                        </span>
                        <input
                            type='number'
                            className='w-full bg-transparent px-3.5 py-2.5 text-sm font-semibold text-[#060e32] focus:outline-none'
                            value={inputs.schuld}
                            onChange={(e) =>
                                updateField('schuld', Number(e.target.value))
                            }
                            step={5000}
                        />
                    </div>
                </div>

                {/* Capital Value Appreciation */}
                <div>
                    <label className='block text-xs font-semibold text-[#060e32]/70 mb-1.5 tracking-wider'>
                        {isEn ? 'Value Growth (%/yr)' : 'Waardestijging (%/jr)'}
                    </label>
                    <div className='flex items-center bg-white border border-slate-300 rounded-xl overflow-hidden focus-within:border-amber focus-within:ring-2 focus-within:ring-amber/20 transition-all shadow-xs'>
                        <span className='px-3 text-sm text-[#060e32]/50 border-r border-slate-200 bg-slate-50 font-mono'>
                            %
                        </span>
                        <input
                            type='number'
                            className='w-full bg-transparent px-3.5 py-2.5 text-sm font-semibold text-[#060e32] focus:outline-none'
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
                    <label className='block text-xs font-semibold text-[#060e32]/70 mb-2 uppercase tracking-wider'>
                        {isEn ? 'Rental Status' : 'Verhuurstatus'}
                    </label>
                    <div className='grid grid-cols-3 gap-2'>
                        {[
                            {
                                label: isEn ? 'Full (≥90%)' : 'Volledig (≥90%)',
                                val: 100,
                            },
                            {
                                label: isEn ? 'Partial (<90%)' : 'Deels (<90%)',
                                val: 50,
                            },
                            {
                                label: isEn ? 'Not rented' : 'Niet verhuurd',
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
                                        ? 'border-amber bg-amber/15 text-amber font-bold shadow-xs'
                                        : 'border-slate-200 bg-white text-[#060e32]/70 hover:border-amber/50 hover:text-[#060e32]'
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
                        ? 'bg-amber/15 border-amber/40 text-amber-hover'
                        : results.verdictType === 'neutral'
                          ? 'bg-slate-100 border-slate-300 text-[#060e32]'
                          : 'bg-rose-500/15 border-rose-500/30 text-rose-900'
                }`}
            >
                <div className='font-bold text-base flex items-center gap-2 mb-3'>
                    {results.verdictType === 'good' && (
                        <CheckCircle2 className='w-5 h-5 shrink-0 text-amber' />
                    )}
                    {results.verdictType === 'neutral' && (
                        <Info className='w-5 h-5 shrink-0 text-amber' />
                    )}
                    {results.verdictType === 'bad' && (
                        <AlertTriangle className='w-5 h-5 shrink-0 text-rose-600' />
                    )}
                    <span className='text-[#060e32]'>
                        {results.verdictTitle}
                    </span>
                </div>

                <div className='grid grid-cols-2 gap-3 my-4'>
                    <div className='bg-white p-3.5 rounded-xl text-center border border-amber/20 shadow-xs'>
                        <div className='text-[11px] text-[#060e32]/60 uppercase tracking-wider font-semibold'>
                            {isEn
                                ? 'Tax Current (Forfait)'
                                : 'Belasting nu (forfait)'}
                        </div>
                        <div className='text-lg md:text-xl font-extrabold text-[#060e32] mt-1'>
                            {formatCurrency(results.belastingNu)}
                        </div>
                    </div>
                    <div className='bg-white p-3.5 rounded-xl text-center border border-amber/20 shadow-xs'>
                        <div className='text-[11px] text-[#060e32]/60 uppercase tracking-wider font-semibold'>
                            {isEn
                                ? 'Tax 2028 (Actual Yield)'
                                : 'Belasting 2028 (werkelijk)'}
                        </div>
                        <div className='text-lg md:text-xl font-extrabold text-amber mt-1'>
                            {formatCurrency(results.belastingNieuw)}
                        </div>
                    </div>
                </div>

                <p className='text-xs text-[#060e32]/85 leading-relaxed font-medium'>
                    {results.verdictDetail}
                </p>
            </div>

            <p className='text-center text-[11px] text-[#060e32]/50 mt-4'>
                {isEn
                    ? 'Indicative calculation · High Court guidelines · No formal tax advice'
                    : 'Indicatief · Eerste Kamer akkoord in behandeling · Geen formeel belastingadvies'}
            </p>
        </div>
    );
}
