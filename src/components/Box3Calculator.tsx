'use client';

import React, { useState, useEffect } from 'react';
import { 
    Info, 
    TrendingUp, 
    Calculator, 
    ArrowRight, 
    CheckCircle2, 
    HelpCircle, 
    AlertTriangle,
    Coins
} from 'lucide-react';

export function Box3Calculator() {
    // Inputs
    const [wozValue, setWozValue] = useState<number>(600000);
    const [grossRent, setGrossRent] = useState<number>(30000);
    const [operatingCosts, setOperatingCosts] = useState<number>(6000);
    const [mortgageDebt, setMortgageDebt] = useState<number>(250000);
    const [interestRate, setInterestRate] = useState<number>(4.2); // Annual interest rate in %
    const [hasPartner, setHasPartner] = useState<boolean>(false);

    // Outputs
    const [forfaitairTax, setForfaitairTax] = useState<number>(0);
    const [werkelijkTax, setWerkelijkTax] = useState<number>(0);
    const [savings, setSavings] = useState<number>(0);
    const [isSaving, setIsSaving] = useState<boolean>(true);

    // Constants (2026/2027 Guidelines)
    const FORFAIT_YIELD_ASSETS = 6.04; // %
    const FORFAIT_DEDUCTION_DEBT = 2.47; // %
    const TAX_RATE = 36; // %
    const BASE_ALLOWANCE = 57000; // EUR

    useEffect(() => {
        const allowance = hasPartner ? BASE_ALLOWANCE * 2 : BASE_ALLOWANCE;

        // 1. FORFAITAIR CALCULATION (Overbruggingsstelsel)
        const totalForfaitYield = (wozValue * FORFAIT_YIELD_ASSETS) / 100;
        const totalForfaitDebtDeduction = (mortgageDebt * FORFAIT_DEDUCTION_DEBT) / 100;
        const netForfaitYield = Math.max(0, totalForfaitYield - totalForfaitDebtDeduction);
        
        const netAssets = Math.max(0, wozValue - mortgageDebt);
        const taxableAssetsRatio = netAssets > 0 ? Math.max(0, netAssets - allowance) / netAssets : 0;
        
        const effectiveYieldRate = netAssets > 0 ? (netForfaitYield / netAssets) : 0;
        const taxableBasisForfait = Math.max(0, netAssets - allowance);
        const taxableYieldForfait = taxableBasisForfait * effectiveYieldRate;
        const calculatedForfaitTax = taxableYieldForfait * (TAX_RATE / 100);

        // 2. WERKELIJK RENDEMENT CALCULATION (Hoge Raad)
        const annualInterest = (mortgageDebt * interestRate) / 100;
        const netActualReturn = Math.max(0, grossRent - operatingCosts - annualInterest);
        
        // Under actual return rules, we reduce the net actual return proportionally by the allowance ratio
        const taxableYieldActual = netActualReturn * taxableAssetsRatio;
        const calculatedWerkelijkTax = taxableYieldActual * (TAX_RATE / 100);

        setForfaitairTax(calculatedForfaitTax);
        setWerkelijkTax(calculatedWerkelijkTax);

        const diff = calculatedForfaitTax - calculatedWerkelijkTax;
        setSavings(Math.abs(diff));
        setIsSaving(diff > 0);
    }, [wozValue, grossRent, operatingCosts, mortgageDebt, interestRate, hasPartner]);

    // Format currency helper
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('nl-NL', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div className="w-full max-w-6xl mx-auto my-12 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Inputs Card */}
                <div className="lg:col-span-5 bg-card border border-border rounded-2xl p-6 shadow-xl relative overflow-hidden backdrop-blur-md">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <Calculator className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-display font-bold text-foreground text-lg">Vul je gegevens in</h3>
                            <p className="text-xs text-muted-foreground">Bereken direct het verschil in Box 3 belasting</p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        {/* WOZ Value */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                    WOZ-waarde portefeuille
                                    <span className="group relative cursor-pointer">
                                        <HelpCircle className="h-3.5 w-3.5 text-muted-foreground/60 hover:text-muted-foreground" />
                                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-popover text-[10px] text-popover-foreground rounded-lg shadow-lg border border-border hidden group-hover:block z-20">
                                            De totale WOZ-waarde van alle verhuurde vastgoedobjecten in jouw Box 3 portefeuille.
                                        </span>
                                    </span>
                                </label>
                                <span className="text-sm font-bold text-foreground">{formatCurrency(wozValue)}</span>
                            </div>
                            <input
                                type="range"
                                min={100000}
                                max={5000000}
                                step={25000}
                                value={wozValue}
                                onChange={(e) => setWozValue(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                                <span>€100k</span>
                                <span>€5M</span>
                            </div>
                        </div>

                        {/* Gross Rent */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                    Jaarlijkse bruto huurovereenkomsten
                                    <span className="group relative cursor-pointer">
                                        <HelpCircle className="h-3.5 w-3.5 text-muted-foreground/60 hover:text-muted-foreground" />
                                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-popover text-[10px] text-popover-foreground rounded-lg shadow-lg border border-border hidden group-hover:block z-20">
                                            De totale jaarlijkse bruto huuropbrengst van jouw huurders.
                                        </span>
                                    </span>
                                </label>
                                <span className="text-sm font-bold text-foreground">{formatCurrency(grossRent)}</span>
                            </div>
                            <input
                                type="range"
                                min={5000}
                                max={250000}
                                step={2500}
                                value={grossRent}
                                onChange={(e) => setGrossRent(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                                <span>€5k</span>
                                <span>€250k</span>
                            </div>
                        </div>

                        {/* Operating Costs */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                    Exploitatie- & onderhoudskosten
                                    <span className="group relative cursor-pointer">
                                        <HelpCircle className="h-3.5 w-3.5 text-muted-foreground/60 hover:text-muted-foreground" />
                                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-popover text-[10px] text-popover-foreground rounded-lg shadow-lg border border-border hidden group-hover:block z-20">
                                            Aantoonbare kosten zoals VvE bijdragen, onderhoud, verzekeringen en beheer.
                                        </span>
                                    </span>
                                </label>
                                <span className="text-sm font-bold text-foreground">{formatCurrency(operatingCosts)}</span>
                            </div>
                            <input
                                type="range"
                                min={0}
                                max={100000}
                                step={1000}
                                value={operatingCosts}
                                onChange={(e) => setOperatingCosts(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                                <span>€0</span>
                                <span>€100k</span>
                            </div>
                        </div>

                        {/* Mortgage Debt */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                    Uitstaande hypotheekschuld
                                    <span className="group relative cursor-pointer">
                                        <HelpCircle className="h-3.5 w-3.5 text-muted-foreground/60 hover:text-muted-foreground" />
                                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-popover text-[10px] text-popover-foreground rounded-lg shadow-lg border border-border hidden group-hover:block z-20">
                                            De uitstaande schuld van de hypotheek op deze vastgoedportefeuille.
                                        </span>
                                    </span>
                                </label>
                                <span className="text-sm font-bold text-foreground">{formatCurrency(mortgageDebt)}</span>
                            </div>
                            <input
                                type="range"
                                min={0}
                                max={wozValue}
                                step={10000}
                                value={mortgageDebt}
                                onChange={(e) => setMortgageDebt(Math.min(wozValue, parseInt(e.target.value)))}
                                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                                <span>€0</span>
                                <span>100% WOZ</span>
                            </div>
                        </div>

                        {/* Interest Rate */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                    Hypotheekrente (%)
                                </label>
                                <span className="text-sm font-bold text-foreground">{interestRate}%</span>
                            </div>
                            <input
                                type="range"
                                min={1.0}
                                max={8.0}
                                step={0.1}
                                value={interestRate}
                                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                                <span>1.0%</span>
                                <span>8.0%</span>
                            </div>
                        </div>

                        {/* Partner Checkbox */}
                        <div className="flex items-center gap-3 p-3 bg-muted/20 border border-border/60 rounded-xl mt-4">
                            <input
                                type="checkbox"
                                id="partner"
                                checked={hasPartner}
                                onChange={(e) => setHasPartner(e.target.checked)}
                                className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                            />
                            <label htmlFor="partner" className="text-xs font-medium text-foreground select-none cursor-pointer">
                                Ik heb een fiscale partner (heffingsvrij vermogen verdubbeld naar €114.000)
                            </label>
                        </div>
                    </div>
                </div>

                {/* Results Screen */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    
                    {/* Visual Comparison Band */}
                    <div className="bg-gradient-to-br from-card via-background to-background border border-border rounded-2xl p-6 shadow-xl flex flex-col gap-6 relative overflow-hidden">
                        
                        {/* Dynamic savings notification badge */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/50 pb-5">
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <Coins className="h-5 w-5" />
                                </div>
                                <h4 className="font-display font-bold text-foreground text-sm uppercase tracking-wide">
                                    Fiscale vergelijking Box 3
                                </h4>
                            </div>
                            
                            {isSaving && savings > 10 ? (
                                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500">
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                    Potentieel voordeel: {formatCurrency(savings)} / jaar
                                </div>
                            ) : (
                                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber/10 px-3 py-1 text-xs font-semibold text-amber">
                                    <AlertTriangle className="h-3.5 w-3.5" />
                                    Geen belastingverschil gevonden
                                </div>
                            )}
                        </div>

                        {/* Graphic Bars comparison */}
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-semibold text-muted-foreground uppercase">
                                    <span>Huidig Overbruggingsstelsel (Forfaitair)</span>
                                    <span className="text-foreground font-bold">{formatCurrency(forfaitairTax)}</span>
                                </div>
                                <div className="w-full bg-muted/30 h-3.5 rounded-full overflow-hidden border border-border/40">
                                    <div 
                                        className="h-full bg-slate-500 transition-all duration-500 ease-out rounded-full"
                                        style={{ width: `${Math.max(3, Math.min(100, (forfaitairTax / (Math.max(forfaitairTax, werkelijkTax) || 1)) * 100))}%` }}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-semibold text-muted-foreground uppercase">
                                    <span>Nieuw stelsel (Aantoonbaar Werkelijk Rendement)</span>
                                    <span className="text-primary font-bold">{formatCurrency(werkelijkTax)}</span>
                                </div>
                                <div className="w-full bg-muted/30 h-3.5 rounded-full overflow-hidden border border-border/40">
                                    <div 
                                        className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
                                        style={{ width: `${Math.max(3, Math.min(100, (werkelijkTax / (Math.max(forfaitairTax, werkelijkTax) || 1)) * 100))}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Financial Analysis Box */}
                        {isSaving && savings > 10 ? (
                            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-left">
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Op basis van jouw ingevoerde portefeuille is de belastingheffing over jouw <strong>werkelijk rendement</strong> aanzienlijk gunstiger dan de forfaitaire heffing. Dit komt doordat jouw werkelijke exploitatiekosten en rentelasten hoger liggen dan de forfaitaire aannames van de Belastingdienst. Met de juiste onderbouwing bespaar je hierdoor jaarlijks circa <strong className="text-emerald-500">{formatCurrency(savings)}</strong>.
                                </p>
                            </div>
                        ) : (
                            <div className="p-4 rounded-xl bg-amber/5 border border-amber/10 text-left">
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    In jouw specifieke situatie is er geen direct fiscaal voordeel te behalen met het werkelijk rendement stelsel. Dit kan komen door een lage hypotheekschuld of relatief lage exploitatiekosten in verhouding tot de WOZ-waarde.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Specifications Details Table */}
                    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
                        <div className="bg-muted/30 border-b border-border px-5 py-4">
                            <h4 className="font-display font-semibold text-sm text-foreground text-left">
                                Berekening Specificaties
                            </h4>
                        </div>
                        <div className="p-5 text-left text-xs divide-y divide-border/60">
                            
                            {/* WOZ and Debt details */}
                            <div className="py-3 flex justify-between">
                                <span className="text-muted-foreground">Heffingsgrondslag (WOZ minus hypotheek)</span>
                                <span className="font-medium text-foreground">{formatCurrency(Math.max(0, wozValue - mortgageDebt))}</span>
                            </div>

                            {/* Sparen & Beleggen allowance */}
                            <div className="py-3 flex justify-between">
                                <span className="text-muted-foreground">Heffingsvrij vermogen</span>
                                <span className="font-medium text-foreground">{formatCurrency(hasPartner ? BASE_ALLOWANCE * 2 : BASE_ALLOWANCE)}</span>
                            </div>

                            {/* Net yield actual */}
                            <div className="py-3 flex justify-between">
                                <span className="text-muted-foreground">Netto werkelijk rendement (Huur - Kosten - Rente)</span>
                                <span className="font-semibold text-foreground">{formatCurrency(Math.max(0, grossRent - operatingCosts - ((mortgageDebt * interestRate) / 100)))}</span>
                            </div>

                            {/* Effective yield percentage */}
                            <div className="py-3 flex justify-between">
                                <span className="text-muted-foreground">Forfaitair rendementspercentage</span>
                                <span className="font-medium text-foreground">
                                    {(((wozValue * FORFAIT_YIELD_ASSETS) / 100 - (mortgageDebt * FORFAIT_DEDUCTION_DEBT) / 100) / Math.max(1, wozValue - mortgageDebt) * 100).toFixed(2)}%
                                </span>
                            </div>
                            
                            {/* Proportional taxable ratio */}
                            <div className="py-3 flex justify-between">
                                <span className="text-muted-foreground">Belastbaar percentage van vermogen</span>
                                <span className="font-medium text-foreground">
                                    {(Math.max(0, (wozValue - mortgageDebt) - (hasPartner ? BASE_ALLOWANCE * 2 : BASE_ALLOWANCE)) / Math.max(1, wozValue - mortgageDebt) * 100).toFixed(1)}%
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
            {/* Information Alert */}
            <div className="mt-8 p-4 rounded-xl bg-muted/20 border border-border/80 flex items-start gap-3 max-w-6xl mx-auto text-left">
                <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong>Belangrijke opmerking:</strong> Deze rekenhulp is gebaseerd op de uitspraken van de Hoge Raad d.d. 6 juni 2024 en de daaropvolgende overgangswetgeving van het Ministerie van Financiën. De definitieve regelgeving omtrent het indienen van werkelijk rendement en de acceptatievoorwaarden voor exploitatiekosten kunnen aan aanvullende eisen worden onderworpen door de Belastingdienst. Raadpleeg altijd een fiscaal adviseur voor jouw specifieke situatie.
                </p>
            </div>
        </div>
    );
}
