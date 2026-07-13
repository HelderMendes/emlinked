'use client';

import React, { useState } from 'react';
import { 
    TrendingUp, 
    Mail, 
    CheckCircle2, 
    Send, 
    FileText, 
    AlertCircle, 
    DollarSign, 
    ArrowRight,
    Loader2
} from 'lucide-react';

interface SimulatorProps {
    locale: string;
    slug: string;
}

export function SolutionSimulators({ locale, slug }: SimulatorProps) {
    const isEn = locale === 'en';

    if (slug === 'vastgoedbeheer-software') {
        return <CpiSimulator isEn={isEn} locale={locale} />;
    }
    if (slug === 'huurdersportaal') {
        return <TicketSimulator isEn={isEn} />;
    }
    if (slug === 'payment') {
        return <PaymentSimulator isEn={isEn} locale={locale} />;
    }
    return null;
}

// 1. CPI Indexation Simulator
function CpiSimulator({ isEn, locale }: { isEn: boolean; locale: string }) {
    const [baseRent, setBaseRent] = useState<number>(1500);
    const [cpiValue, setCpiValue] = useState<number>(3.8);
    const [result, setResult] = useState<{ newRent: number; increase: number; yearlyExtra: number } | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [showEmail, setShowEmail] = useState(false);

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        setIsCalculating(true);
        setTimeout(() => {
            const increase = parseFloat(((baseRent * cpiValue) / 100).toFixed(2));
            const newRent = baseRent + increase;
            const yearlyExtra = increase * 12;
            setResult({ newRent, increase, yearlyExtra });
            setIsCalculating(false);
            setShowEmail(true);
        }, 600);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto mt-12 px-4">
            {/* Input Form Card */}
            <div className="lg:col-span-5 bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-lg bg-amber/15 text-amber">
                        <TrendingUp className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-foreground">
                        {isEn ? 'CPI Indexation Simulator' : 'CPI Indexatie Simulator'}
                    </h3>
                </div>
                <p className="text-xs text-muted-foreground mb-6">
                    {isEn 
                        ? 'Simulate rent indexation based on annual CPI adjustments.' 
                        : 'Simuleer de huurindexatie op basis van de jaarlijkse CPI-wijzigingen.'}
                </p>
                <form onSubmit={handleCalculate} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            {isEn ? 'Current Monthly Rent (€)' : 'Huidige maandhuur (€)'}
                        </label>
                        <input
                            type="number"
                            value={baseRent}
                            onChange={(e) => setBaseRent(Math.max(0, parseFloat(e.target.value) || 0))}
                            className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            {isEn ? 'CPI Indexation (%)' : 'CPI Indexatie (%)'}
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            value={cpiValue}
                            onChange={(e) => setCpiValue(Math.max(0, parseFloat(e.target.value) || 0))}
                            className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isCalculating}
                        className="mt-2 w-full h-11 bg-amber hover:bg-amber-hover text-white text-sm font-semibold rounded-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                    >
                        {isCalculating ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                {isEn ? 'Calculating...' : 'Berekenen...'}
                            </>
                        ) : (
                            <>
                                {isEn ? 'Calculate Indexation' : 'Bereken indexatie'}
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Simulated Email / Result Preview Card */}
            <div className="lg:col-span-7 flex flex-col gap-6">
                {result ? (
                    <div className="flex flex-col gap-6 animate-fadeIn">
                        {/* Highlights Grid */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-muted/30 border border-border/60 rounded-xl p-4 text-center">
                                <span className="text-[10px] uppercase font-semibold text-muted-foreground block mb-1">
                                    {isEn ? 'New Rent' : 'Nieuwe huur'}
                                </span>
                                <span className="text-lg font-bold text-foreground">
                                    €{result.newRent.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </div>
                            <div className="bg-muted/30 border border-border/60 rounded-xl p-4 text-center">
                                <span className="text-[10px] uppercase font-semibold text-muted-foreground block mb-1">
                                    {isEn ? 'Monthly Delta' : 'Verschil p.m.'}
                                </span>
                                <span className="text-lg font-bold text-amber">
                                    +€{result.increase.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </div>
                            <div className="bg-muted/30 border border-border/60 rounded-xl p-4 text-center">
                                <span className="text-[10px] uppercase font-semibold text-muted-foreground block mb-1">
                                    {isEn ? 'Yearly Gain' : 'Extra opbrengst p.j.'}
                                </span>
                                <span className="text-lg font-bold text-emerald-500">
                                    +€{result.yearlyExtra.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </div>
                        </div>

                        {/* Email Preview */}
                        {showEmail && (
                            <div className="border border-border rounded-xl overflow-hidden shadow-sm bg-card">
                                <div className="bg-muted/50 border-b border-border px-4 py-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-xs font-semibold text-foreground">
                                            {isEn ? 'Simulated Tenant Email' : 'Gegenereerde e-mail notificatie'}
                                        </span>
                                    </div>
                                    <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-semibold px-2 py-0.5 rounded">
                                        {isEn ? 'Ready to Send' : 'Gereed voor verzending'}
                                    </span>
                                </div>
                                <div className="p-5 text-left font-sans text-xs text-foreground/80 space-y-4">
                                    <div className="border-b border-border/60 pb-3 space-y-1 text-[11px]">
                                        <div><strong className="text-muted-foreground">To:</strong> huurder@portefeuille.nl</div>
                                        <div><strong className="text-muted-foreground">Subject:</strong> {isEn ? 'Indexation notice for your rental contract' : 'Indexatie huurovereenkomst'}</div>
                                    </div>
                                    <p>Beste huurder,</p>
                                    <p>
                                        Conform de afspraken in je huurovereenkomst indexeren we per de eerstvolgende vervaldatum de huurprijs met het CPI-percentage van <strong>{cpiValue}%</strong>.
                                    </p>
                                    <div className="bg-muted/30 border border-border/60 rounded-lg p-3 space-y-1 font-mono text-[11px]">
                                        <div>• Oude huurprijs: €{baseRent.toFixed(2)}</div>
                                        <div>• Indexatie ({cpiValue}%): €{result.increase.toFixed(2)}</div>
                                        <div>• <strong>Nieuwe huurprijs: €{result.newRent.toFixed(2)}</strong></div>
                                    </div>
                                    <p>De nieuwe facturen worden automatisch aangepast in het systeem.</p>
                                    <p>Met vriendelijke groet,<br /><strong>Emlinked Vastgoed Management</strong></p>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="border border-dashed border-border rounded-xl h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6 bg-muted/5">
                        <TrendingUp className="h-10 w-10 text-muted-foreground/30 mb-3" />
                        <h4 className="font-bold text-foreground/50 text-sm">
                            {isEn ? 'Simulation results will appear here' : 'Berekeningsresultaten verschijnen hier'}
                        </h4>
                        <p className="text-xs text-muted-foreground max-w-xs mt-1">
                            {isEn 
                                ? 'Adjust the rent and CPI parameters and click calculate to generate the notification.'
                                : 'Pas de parameters aan en klik op berekenen om de berekening en brief te tonen.'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

// 2. Ticket Submit Simulator (Tenant Portal)
interface Ticket {
    id: number;
    category: string;
    desc: string;
    status: 'Ingediend' | 'In behandeling' | 'Opgelost';
    time: string;
}

function TicketSimulator({ isEn }: { isEn: boolean }) {
    const [tickets, setTickets] = useState<Ticket[]>([
        { 
            id: 1, 
            category: isEn ? 'Heating & Climate' : 'Verwarming & Klimaat', 
            desc: isEn ? 'Radiator in living room does not warm up.' : 'Radiator in woonkamer wordt niet warm.', 
            status: 'In behandeling', 
            time: 'Vandaag, 10:14' 
        },
        { 
            id: 2, 
            category: isEn ? 'Keys & Access' : 'Sleutels & Toegang', 
            desc: isEn ? 'Request extra key fob for backend entrance.' : 'Extra druppel voor achteringang aanvragen.', 
            status: 'Opgelost', 
            time: 'Gisteren, 14:32' 
        }
    ]);
    const [category, setCategory] = useState(isEn ? 'Heating & Climate' : 'Verwarming & Klimaat');
    const [desc, setDesc] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!desc.trim()) return;

        setIsSubmitting(true);
        setTimeout(() => {
            const newTicket: Ticket = {
                id: Date.now(),
                category,
                desc,
                status: 'Ingediend',
                time: isEn ? 'Just now' : 'Zojuist'
            };
            setTickets([newTicket, ...tickets]);
            setDesc('');
            setIsSubmitting(false);
        }, 800);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto mt-12 px-4">
            {/* Ticket Submission Form */}
            <div className="lg:col-span-5 bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-lg bg-amber/15 text-amber">
                        <Send className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-foreground">
                        {isEn ? 'Report a Maintenance Issue' : 'Meld een storing'}
                    </h3>
                </div>
                <p className="text-xs text-muted-foreground mb-6">
                    {isEn 
                        ? 'Simulate a tenant reporting a maintenance ticket.' 
                        : 'Simuleer hoe een huurder een ticket indient in het portaal.'}
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            {isEn ? 'Category' : 'Categorie'}
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber"
                        >
                            <option value={isEn ? 'Heating & Climate' : 'Verwarming & Klimaat'}>
                                {isEn ? 'Heating & Climate' : 'Verwarming & Klimaat'}
                            </option>
                            <option value={isEn ? 'Plumbing & Leaks' : 'Lekkage & Sanitair'}>
                                {isEn ? 'Plumbing & Leaks' : 'Lekkage & Sanitair'}
                            </option>
                            <option value={isEn ? 'Keys & Access' : 'Sleutels & Toegang'}>
                                {isEn ? 'Keys & Access' : 'Sleutels & Toegang'}
                            </option>
                            <option value={isEn ? 'Other' : 'Overig'}>
                                {isEn ? 'Other' : 'Overig'}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            {isEn ? 'Description' : 'Omschrijving van het probleem'}
                        </label>
                        <textarea
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder={isEn ? 'What needs repair?' : 'Wat functioneert er niet naar behoren?'}
                            rows={3}
                            className="w-full p-3 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber resize-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-11 bg-amber hover:bg-amber-hover text-white text-sm font-semibold rounded-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                {isEn ? 'Sending...' : 'Versturen...'}
                            </>
                        ) : (
                            <>
                                {isEn ? 'Submit Ticket' : 'Meld storing'}
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Backoffice Ticket Queue */}
            <div className="lg:col-span-7 flex flex-col gap-5">
                <div className="flex justify-between items-center px-1">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">
                        {isEn ? 'Live Ticket Queue (Admin Dashboard)' : 'Live Ticket Overzicht (Beheer Dashboard)'}
                    </h4>
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                </div>

                <div className="flex flex-col gap-3">
                    {tickets.map((t) => {
                        let statusColor = 'bg-blue-500/10 text-blue-500 border-blue-500/25';
                        if (t.status === 'In behandeling') statusColor = 'bg-amber/10 text-amber border-amber/25';
                        if (t.status === 'Opgelost') statusColor = 'bg-emerald-500/10 text-emerald-500 border-emerald-500/25';

                        return (
                            <div 
                                key={t.id} 
                                className="bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:border-border/80 transition-all animate-fadeIn"
                            >
                                <div className="text-left space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-semibold text-foreground">
                                            {t.category}
                                        </span>
                                        <span className="text-[9px] text-muted-foreground">
                                            {t.time}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {t.desc}
                                    </p>
                                </div>
                                <span className={`text-[10px] font-semibold border rounded px-2.5 py-0.5 self-start sm:self-center ${statusColor}`}>
                                    {t.status}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// 3. Payment Simulator
function PaymentSimulator({ isEn, locale }: { isEn: boolean; locale: string }) {
    const [amount, setAmount] = useState<number>(2000);
    const [ownerAPct, setOwnerAPct] = useState<number>(60);
    const [ownerBPct, setOwnerBPct] = useState<number>(30);
    const [feePct, setFeePct] = useState<number>(10);
    const [result, setResult] = useState<{ ownerA: number; ownerB: number; fee: number } | null>(null);
    const [isReconciling, setIsReconciling] = useState(false);

    const handleSimulate = (e: React.FormEvent) => {
        e.preventDefault();
        setIsReconciling(true);
        setTimeout(() => {
            const fee = (amount * feePct) / 100;
            const ownerA = (amount * ownerAPct) / 100;
            const ownerB = (amount * ownerBPct) / 100;
            setResult({ ownerA, ownerB, fee });
            setIsReconciling(false);
        }, 700);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto mt-12 px-4">
            {/* Inputs Card */}
            <div className="lg:col-span-5 bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-lg bg-amber/15 text-amber">
                        <DollarSign className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-foreground">
                        {isEn ? 'Split Payments Simulator' : 'Split Payments Simulator'}
                    </h3>
                </div>
                <p className="text-xs text-muted-foreground mb-6">
                    {isEn 
                        ? 'Simulate splits between building owners and management fees.' 
                        : 'Simuleer hoe ontvangen betalingen automatisch verdeeld en geboekt worden.'}
                </p>
                <form onSubmit={handleSimulate} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            {isEn ? 'Received Rent Payment (€)' : 'Ontvangen huursom (€)'}
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                            className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <div>
                            <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                                {isEn ? 'Owner A %' : 'Eigenaar A %'}
                            </label>
                            <input
                                type="number"
                                value={ownerAPct}
                                onChange={(e) => setOwnerAPct(Math.max(0, parseInt(e.target.value) || 0))}
                                className="w-full h-10 px-2 rounded-md border border-border bg-background text-xs text-foreground focus:outline-none focus:border-amber"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                                {isEn ? 'Owner B %' : 'Eigenaar B %'}
                            </label>
                            <input
                                type="number"
                                value={ownerBPct}
                                onChange={(e) => setOwnerBPct(Math.max(0, parseInt(e.target.value) || 0))}
                                className="w-full h-10 px-2 rounded-md border border-border bg-background text-xs text-foreground focus:outline-none focus:border-amber"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                                {isEn ? 'Fee %' : 'Beheer fee %'}
                            </label>
                            <input
                                type="number"
                                value={feePct}
                                onChange={(e) => setFeePct(Math.max(0, parseInt(e.target.value) || 0))}
                                className="w-full h-10 px-2 rounded-md border border-border bg-background text-xs text-foreground focus:outline-none focus:border-amber"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isReconciling}
                        className="mt-2 w-full h-11 bg-amber hover:bg-amber-hover text-white text-sm font-semibold rounded-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                    >
                        {isReconciling ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                {isEn ? 'Processing...' : 'Verwerken...'}
                            </>
                        ) : (
                            <>
                                {isEn ? 'Simulate Split' : 'Simuleer verdeelsleutel'}
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Reconciliation Flow Card */}
            <div className="lg:col-span-7 flex flex-col gap-6">
                {result ? (
                    <div className="flex flex-col gap-6 animate-fadeIn">
                        {/* Highlights Grid */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-muted/30 border border-border/60 rounded-xl p-4 text-center">
                                <span className="text-[10px] uppercase font-semibold text-muted-foreground block mb-1">
                                    {isEn ? 'Owner A Yield' : 'Uitkering Eigenaar A'}
                                </span>
                                <span className="text-base font-bold text-foreground">
                                    €{result.ownerA.toLocaleString(locale, { minimumFractionDigits: 2 })}
                                </span>
                                <span className="text-[9px] text-muted-foreground block">
                                    ({ownerAPct}%)
                                </span>
                            </div>
                            <div className="bg-muted/30 border border-border/60 rounded-xl p-4 text-center">
                                <span className="text-[10px] uppercase font-semibold text-muted-foreground block mb-1">
                                    {isEn ? 'Owner B Yield' : 'Uitkering Eigenaar B'}
                                </span>
                                <span className="text-base font-bold text-foreground">
                                    €{result.ownerB.toLocaleString(locale, { minimumFractionDigits: 2 })}
                                </span>
                                <span className="text-[9px] text-muted-foreground block">
                                    ({ownerBPct}%)
                                </span>
                            </div>
                            <div className="bg-muted/30 border border-border/60 rounded-xl p-4 text-center">
                                <span className="text-[10px] uppercase font-semibold text-muted-foreground block mb-1">
                                    {isEn ? 'Management Fee' : 'Beheervergoeding'}
                                </span>
                                <span className="text-base font-bold text-amber">
                                    €{result.fee.toLocaleString(locale, { minimumFractionDigits: 2 })}
                                </span>
                                <span className="text-[9px] text-amber block font-medium">
                                    ({feePct}%)
                                </span>
                            </div>
                        </div>

                        {/* Audit Trail / Reconciliation Box */}
                        <div className="border border-border rounded-xl overflow-hidden shadow-sm bg-card">
                            <div className="bg-muted/50 border-b border-border px-4 py-3 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-xs font-semibold text-foreground">
                                        {isEn ? 'Automated Ledger Postings' : 'Grootboek Boekingen (Business Central)'}
                                    </span>
                                </div>
                                <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                                    <CheckCircle2 className="h-3 w-3" />
                                    {isEn ? 'Auto-Reconciled' : 'Automatisch Afgeletterd'}
                                </span>
                            </div>
                            <div className="p-4 space-y-3 font-mono text-[10px] text-left text-foreground/80">
                                <div className="border-b border-border/40 pb-2 flex justify-between text-muted-foreground font-semibold">
                                    <span>{isEn ? 'G/L Account Description' : 'Grootboekrekening Omschrijving'}</span>
                                    <div className="flex gap-8">
                                        <span>Debet</span>
                                        <span>Credit</span>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <span>1100 - Bank / Bank Rekeningcourant</span>
                                    <div className="flex gap-4">
                                        <span className="w-14 text-right">€{amount.toFixed(2)}</span>
                                        <span className="w-14 text-right">-</span>
                                    </div>
                                </div>
                                <div className="flex justify-between text-emerald-500 font-medium">
                                    <span>1300 - Debiteuren / Huurdersafrekening</span>
                                    <div className="flex gap-4">
                                        <span className="w-14 text-right">-</span>
                                        <span className="w-14 text-right">€{amount.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="border-t border-dashed border-border/60 pt-2 flex justify-between font-semibold text-foreground">
                                    <span>{isEn ? 'Bank Reconciliation Matching Factor' : 'Afletter matching percentage'}</span>
                                    <span className="text-emerald-500">100% (Perfect Match)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="border border-dashed border-border rounded-xl h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6 bg-muted/5">
                        <DollarSign className="h-10 w-10 text-muted-foreground/30 mb-3" />
                        <h4 className="font-bold text-foreground/50 text-sm">
                            {isEn ? 'Ledger simulation results will appear here' : 'Verwerkingstraject verschijnt hier'}
                        </h4>
                        <p className="text-xs text-muted-foreground max-w-xs mt-1">
                            {isEn 
                                ? 'Adjust the split metrics and click simulate to trigger the auto-reconciliation log.'
                                : 'Configureer de verdeling en klik op simuleer om de automatische aflettering te bekijken.'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
