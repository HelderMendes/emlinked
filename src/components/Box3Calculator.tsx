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
import { Box3CalculatorCard } from '@/components/blocks/box3/Box3CalculatorCard';

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

interface Box3CalculatorProps {
    isEn?: boolean;
    badge?: string;
    title?: string;
    subtitle?: string;
    featureTitle?: string;
    featureItems?: string[];
}

export function Box3Calculator({
    isEn = false,
    badge,
    title,
    subtitle,
    featureTitle,
    featureItems,
}: Box3CalculatorProps) {
    const { inputs, updateField, results } = useBox3Calculator();

    const formatCurrency = (val: number) =>
        `€ ${Math.round(Math.abs(val)).toLocaleString(isEn ? 'en-US' : 'nl-NL')}`;

    const defaultFeatureList = isEn
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

    const featureList = featureItems?.length ? featureItems : defaultFeatureList;
    const sectionBadge =
        badge ||
        (isEn
            ? 'Free Tool · No registration required'
            : 'Gratis Tool · Geen registratie vereist');
    const sectionTitle =
        title ||
        (isEn
            ? 'Will your real estate remain profitable after 2028?'
            : 'Blijft uw vastgoed rendabel na 2028?');
    const sectionSubtitle =
        subtitle ||
        (isEn
            ? 'Enter your figures below. See instantly whether you are better or worse off under the new Box 3 actual yield regulations.'
            : 'Vul uw cijfers in. U ziet direct of u beter of slechter af bent onder de nieuwe box 3-regels voor werkelijk rendement.');
    const leftFeatureTitle =
        featureTitle ||
        (isEn
            ? 'What Emlinked automatically tracks'
            : 'Wat emlinked automatisch bijhoudt');

    return (
        <section
            id='calculator'
            className='w-full bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] py-16 px-4 md:px-8 text-[#060e32] border-y border-amber/20 relative overflow-hidden'
        >
            {/* Ambient Background Glows */}
            <div className='absolute top-0 right-1/4 w-96 h-96 bg-amber/15 rounded-full blur-3xl pointer-events-none' />
            <div className='absolute bottom-0 left-10 w-80 h-80 bg-amber-light/10 rounded-full blur-3xl pointer-events-none' />

            <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10'>
                {/* Left Information Column */}
                <div className='lg:col-span-5 flex flex-col justify-between space-y-8'>
                    <div>
                        <span className='inline-flex items-center gap-2 text-xs font-bold text-amber uppercase tracking-widest bg-amber/15 border border-amber/35 px-3.5 py-1 rounded-full mb-4 shadow-xs backdrop-blur-md'>
                            <Sparkles className='w-3.5 h-3.5' />
                            {sectionBadge}
                        </span>
                        <h2 className='font-display text-3xl md:text-4xl font-extrabold text-[#060e32] leading-tight mt-2 mb-4'>
                            {sectionTitle}
                        </h2>
                        <p className='text-[#060e32]/80 text-base md:text-lg font-light leading-relaxed mb-6'>
                            {sectionSubtitle}
                        </p>
                    </div>

                    <div className='space-y-4 pt-2'>
                        <h3 className='text-lg md:text-xl mb-5 font-bold text-amber flex items-center gap-2.5'>
                            <ShieldCheck className='w-6 h-6 text-amber shrink-0' />
                            <span>{leftFeatureTitle}</span>
                        </h3>
                        <div className='space-y-3.5'>
                            {featureList.map((item: string, idx: number) => (
                                <div
                                    key={idx}
                                    className='flex items-center gap-3 text-sm md:text-base text-[#060e32]/90 font-medium'
                                >
                                    <span className='w-5 h-5 rounded-full bg-amber/15 text-amber border border-amber/40 flex items-center justify-center text-xs font-bold shrink-0 shadow-xs'>
                                        ✓
                                    </span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Form & Results Interactive Card */}
                <div className='lg:col-span-7'>
                    <Box3CalculatorCard
                        isEn={isEn}
                        inputs={inputs}
                        updateField={updateField}
                        results={results}
                    />
                </div>
            </div>
        </section>
    );
}
