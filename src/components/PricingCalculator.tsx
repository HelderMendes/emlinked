'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    FileText,
    HelpCircle,
    Info,
    Send,
    Sparkles,
    Users,
    Zap,
    Check,
    X,
    Building2,
    Mail,
    Phone,
    User,
    ArrowRight,
    Loader2,
} from 'lucide-react';
import { GlowingLink } from '@/components/ui/GlowingButton';

interface PricingCalculatorProps {
    locale?: string;
    sectionTag?: string;
    sectionTitle?: string;
    sectionSubtitle?: string;
}

export function PricingCalculator({
    locale = 'nl',
    sectionTag,
    sectionTitle,
    sectionSubtitle,
}: PricingCalculatorProps) {
    const isEn = locale === 'en';

    const [mounted, setMounted] = useState<boolean>(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    // ── Form State ──
    const [extraContractsTier, setExtraContractsTier] = useState<number>(0);
    const [tenantPortalTier, setTenantPortalTier] = useState<number>(0);
    const [extraUsers, setExtraUsers] = useState<number>(0);
    const [teamUsers, setTeamUsers] = useState<number>(0);
    const [directBankingTier, setDirectBankingTier] = useState<number>(0);

    // Accordions
    const [extraSetupOpen, setExtraSetupOpen] = useState<boolean>(true);
    const [xmlExportOpen, setXmlExportOpen] = useState<boolean>(false);

    // Checkboxes - One Time Fees
    const [strippenkaart5u, setStrippenkaart5u] = useState<boolean>(false);
    const [strippenkaart10u, setStrippenkaart10u] = useState<boolean>(false);
    const [strippenkaart20u, setStrippenkaart20u] = useState<boolean>(false);

    const [tenantSetup, setTenantSetup] = useState<boolean>(false);
    const [directBankingSetup, setDirectBankingSetup] =
        useState<boolean>(false);
    const [docCaptureSetup, setDocCaptureSetup] = useState<boolean>(false);
    const [trainingVastgoed, setTrainingVastgoed] = useState<boolean>(false);
    const [trainingFinance, setTrainingFinance] = useState<boolean>(false);

    // Checkboxes - Block 3: XML/TXT export & Extra Integratie (Na berekening)
    const [inkoopFactuurXml, setInkoopFactuurXml] = useState<boolean>(false);
    const [inkoopCreditFactuurXml, setInkoopCreditFactuurXml] =
        useState<boolean>(false);
    const [verkoopFactuurXml, setVerkoopFactuurXml] = useState<boolean>(false);
    const [verkoopCreditNotaXml, setVerkoopCreditNotaXml] =
        useState<boolean>(false);
    const [bankpostenXml, setBankpostenXml] = useState<boolean>(false);

    const [officeIntegratieSetup, setOfficeIntegratieSetup] =
        useState<boolean>(false);
    const [bankIntegratieSetup, setBankIntegratieSetup] =
        useState<boolean>(false);
    const [docCaptureCustomSetup, setDocCaptureCustomSetup] =
        useState<boolean>(false);

    const isAnyXmlSelected =
        inkoopFactuurXml ||
        inkoopCreditFactuurXml ||
        verkoopFactuurXml ||
        verkoopCreditNotaXml ||
        bankpostenXml;

    const isAnyExtraIntegrationSelected =
        officeIntegratieSetup || bankIntegratieSetup || docCaptureCustomSetup;

    // Modal Lead Capture
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        notes: '',
    });

    // ── Calculations ──
    const baseMonthlyPrice = 144.8; // Inclusief 1 gebruiker & tot 100 contracten

    const extraContractPrices = [
        0, 49.9, 99.8, 149.7, 199.6, 249.5, 299.4, 349.3,
    ];
    const extraContractLabels = [
        isEn
            ? 'Up to 100 contracts – standard'
            : 'Tot 100 contracten – standaard',
        isEn
            ? 'Up to 200 contracts (+€ 49.90/mo)'
            : 'tot 200 contracten (+€ 49,90/mnd)',
        isEn
            ? 'Up to 300 contracts (+€ 99.80/mo)'
            : 'tot 300 contracten (+€ 99,80/mnd)',
        isEn
            ? 'Up to 400 contracts (+€ 149.70/mo)'
            : 'tot 400 contracten (+€ 149,70/mnd)',
        isEn
            ? 'Up to 500 contracts (+€ 199.60/mo)'
            : 'tot 500 contracten (+€ 199,60/mnd)',
        isEn
            ? 'Up to 600 contracts (+€ 249.50/mo)'
            : 'tot 600 contracten (+€ 249,50/mnd)',
        isEn
            ? 'Up to 700 contracts (+€ 299.40/mo)'
            : 'tot 700 contracten (+€ 299,40/mnd)',
        isEn
            ? 'Up to 800 contracts (+€ 349.30/mo)'
            : 'tot 800 contracten (+€ 349,30/mnd)',
    ];

    const tenantPortalPrices = [0, 25.9, 47.8, 69.7, 91.6, 113.5, 135.4, 157.3];
    const tenantPortalLabels = [
        isEn ? 'No tenant portal' : 'Geen portal voor huurders',
        isEn
            ? 'Up to 100 tenants (+€ 25.90/mo)'
            : 'Tot 100 huurders (+€ 25,90/mnd)',
        isEn
            ? 'Up to 200 tenants (+€ 47.80/mo)'
            : 'Tot 200 huurders (+€ 47,80/mnd)',
        isEn
            ? 'Up to 300 tenants (+€ 69.70/mo)'
            : 'Tot 300 huurders (+€ 69,70/mnd)',
        isEn
            ? 'Up to 400 tenants (+€ 91.60/mo)'
            : 'Tot 400 huurders (+€ 91,60/mnd)',
        isEn
            ? 'Up to 500 tenants (+€ 113.50/mo)'
            : 'Tot 500 huurders (+€ 113,50/mnd)',
        isEn
            ? 'Up to 600 tenants (+€ 135.40/mo)'
            : 'Tot 600 huurders (+€ 135,40/mnd)',
        isEn
            ? 'Up to 700 tenants (+€ 157.30/mo)'
            : 'Tot 700 huurders (+€ 157,30/mnd)',
    ];

    const directBankingPrices = [0, 22.5, 38.5, 75.0, 97.5, 150.0];
    const directBankingLabels = [
        isEn ? 'No Direct Banking' : 'Geen Direct Banking',
        isEn
            ? 'Direct banking (Small | 1 account) (+€ 22.50/mo)'
            : 'Direct banking (Klein | 1 rekening) (+€ 22,50/mnd)',
        isEn
            ? 'Direct banking (Medium | 1-3 accounts) (+€ 38.50/mo)'
            : 'Direct banking (Medium | 1-3 rekeningen) (+€ 38,50/mnd)',
        isEn
            ? 'Direct banking (Normal | 1-6 accounts) (+€ 75.00/mo)'
            : 'Direct banking (Normal | 1-6 rekeningen) (+€ 75,00/mnd)',
        isEn
            ? 'Direct banking (Large | 1-9 accounts) (+€ 97.50/mo)'
            : 'Direct banking (Large | 1-9 rekeningen) (+€ 97,50/mnd)',
        isEn
            ? 'Direct banking (Extra large | 1-12 accounts) (+€ 150.00/mo)'
            : 'Direct banking (Extra large | 1-12 rekeningen) (+€ 150,00/mnd)',
    ];

    const extraContractsCost = extraContractPrices[extraContractsTier] || 0;
    const tenantPortalCost = tenantPortalPrices[tenantPortalTier] || 0;
    const extraUsersCost = extraUsers * 139.2;
    const teamUsersCost = teamUsers * 21.8;
    const directBankingCost = directBankingPrices[directBankingTier] || 0;

    // Sum monthly additions
    const monthlyAdditions =
        extraContractsCost +
        tenantPortalCost +
        extraUsersCost +
        teamUsersCost +
        directBankingCost;

    const monthlySubtotal = baseMonthlyPrice + monthlyAdditions;

    // 20% support fee calculated on monthly subtotal
    const supportFee = monthlySubtotal * 0.2;
    const totalMonthly = monthlySubtotal + supportFee;

    // One time costs
    const strippenkaartenCost =
        (strippenkaart5u ? 550.0 : 0) +
        (strippenkaart10u ? 899.0 : 0) +
        (strippenkaart20u ? 1599.0 : 0);

    const opstartkostenCost =
        (tenantSetup ? 300.0 : 0) +
        (directBankingSetup ? 300.0 : 0) +
        (docCaptureSetup ? 300.0 : 0) +
        (trainingVastgoed ? 799.0 : 0) +
        (trainingFinance ? 998.0 : 0);

    const totalOneTime = strippenkaartenCost + opstartkostenCost;

    // Helper format EUR
    const formatEur = (amount: number) => {
        return new Intl.NumberFormat('nl-NL', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        const selectedItems: Array<{
            category: string;
            label?: string;
            priceFormatted: string;
        }> = [];

        if (extraContractsTier > 0) {
            selectedItems.push({
                category: isEn ? 'Extra Contracts' : 'Extra Contracten',
                label: extraContractLabels[extraContractsTier].split(' (+')[0],
                priceFormatted: formatEur(extraContractsCost),
            });
        }
        if (tenantPortalTier > 0) {
            selectedItems.push({
                category: isEn ? 'Tenant Portal' : 'Huurdersportaal',
                label: tenantPortalLabels[tenantPortalTier].split(' (+')[0],
                priceFormatted: formatEur(tenantPortalCost),
            });
        }
        if (extraUsers > 0) {
            selectedItems.push({
                category: isEn
                    ? 'Extra Users / Month'
                    : 'Extra Gebruikers/Maand',
                label: `${extraUsers} ${
                    isEn
                        ? extraUsers === 1
                            ? 'user'
                            : 'users'
                        : extraUsers === 1
                          ? 'gebruiker'
                          : 'gebruikers'
                }`,
                priceFormatted: formatEur(extraUsersCost),
            });
        }
        if (teamUsers > 0) {
            selectedItems.push({
                category: isEn
                    ? 'Team Member Users'
                    : 'Leesrechten Voor Team Member',
                label: `${teamUsers} team members`,
                priceFormatted: formatEur(teamUsersCost),
            });
        }
        if (directBankingTier > 0) {
            selectedItems.push({
                category: isEn
                    ? 'Direct Banking'
                    : 'Direct Banking: Elektronisch Bankieren',
                label: directBankingLabels[directBankingTier].split(' (+')[0],
                priceFormatted: formatEur(directBankingCost),
            });
        }
        if (strippenkaartenCost > 0) {
            const labels: string[] = [];
            if (strippenkaart5u)
                labels.push(
                    isEn
                        ? 'Support Pack – (5 hours)'
                        : 'Strippenkaart – (5 uur)',
                );
            if (strippenkaart10u)
                labels.push(
                    isEn
                        ? 'Support Pack – (10 hours)'
                        : 'Strippenkaart – (10 uur)',
                );
            if (strippenkaart20u)
                labels.push(
                    isEn
                        ? 'Support Pack – (20 hours)'
                        : 'Strippenkaart – (20 uur)',
                );
            selectedItems.push({
                category: isEn
                    ? 'Support Packs (One-time)'
                    : 'Strippenkaarten',
                label: labels.join(', '),
                priceFormatted: formatEur(strippenkaartenCost),
            });
        }
        if (opstartkostenCost > 0) {
            const labels: string[] = [];
            if (tenantSetup)
                labels.push(
                    isEn
                        ? 'Tenant setup & configuration'
                        : 'Opzetten/inrichten emlinked Tenant',
                );
            if (directBankingSetup)
                labels.push(
                    isEn ? 'Setup Direct Banking' : 'Setup Direct Banking',
                );
            if (docCaptureSetup)
                labels.push(
                    isEn
                        ? 'Initial Document Capture Setup'
                        : 'Initiële installatie Document Capture',
                );
            if (trainingVastgoed)
                labels.push(
                    isEn
                        ? 'emlinked Property Training (1 day)'
                        : 'Training emlinked Vastgoed (1 dag)',
                );
            if (trainingFinance)
                labels.push(
                    isEn
                        ? 'emlinked Finance Training (1 day)'
                        : 'Training emlinked Finance (1 dag)',
                );
            selectedItems.push({
                category: isEn
                    ? 'Setup Fees (One-time)'
                    : 'Opstartkosten (Eenmalig)',
                label: labels.join(', '),
                priceFormatted: formatEur(opstartkostenCost),
            });
        }
        if (isAnyXmlSelected) {
            const labels: string[] = [];
            if (inkoopFactuurXml)
                labels.push(isEn ? 'Purchase Invoice' : 'Inkoop factuur');
            if (inkoopCreditFactuurXml)
                labels.push(
                    isEn ? 'Purchase Credit Memo' : 'Inkoop creditfactuur',
                );
            if (verkoopFactuurXml)
                labels.push(isEn ? 'Sales Invoice' : 'Verkoop factuur');
            if (verkoopCreditNotaXml)
                labels.push(
                    isEn ? 'Sales Credit Memo' : 'Verkoop credit nota',
                );
            if (bankpostenXml)
                labels.push(isEn ? 'Bank Ledger Entries' : 'Bankposten');
            selectedItems.push({
                category: isEn
                    ? 'XML/TXT Export File'
                    : 'XML/TXT Export Bestand',
                label: labels.join(', '),
                priceFormatted: isEn ? 'Upon calculation' : 'Na berekening',
            });
        }
        if (isAnyExtraIntegrationSelected) {
            const labels: string[] = [];
            if (officeIntegratieSetup)
                labels.push(
                    isEn
                        ? 'Office Integration & Setup'
                        : 'Office integratie en setup',
                );
            if (bankIntegratieSetup)
                labels.push(
                    isEn
                        ? 'Bank Integration & Setup'
                        : 'Bank integratie en setup',
                );
            if (docCaptureCustomSetup) labels.push('Document Capture');
            selectedItems.push({
                category: isEn
                    ? 'Extra Integration & Setup'
                    : 'Extra Integratie En Setup',
                label: labels.join(', '),
                priceFormatted: isEn ? 'Upon calculation' : 'Na berekening',
            });
        }

        try {
            const res = await fetch('/api/quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    company: formData.company,
                    selectedItems,
                    baseMonthlyPrice: formatEur(baseMonthlyPrice),
                    monthlyAdditions: formatEur(monthlyAdditions),
                    supportFee: formatEur(supportFee),
                    totalOneTime: formatEur(totalOneTime),
                    totalMonthly: formatEur(totalMonthly),
                    locale,
                }),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(
                    errData.error ||
                        (isEn
                            ? 'Failed to send quote request.'
                            : 'Fout bij het verzenden van de offerte.'),
                );
            }

            setIsSubmitted(true);
        } catch (err: any) {
            console.error('Submit quote error:', err);
            setSubmitError(
                err.message ||
                    (isEn
                        ? 'An unexpected error occurred.'
                        : 'Er is een onverwachte fout opgetreden.'),
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id='calculator'
            className='px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] text-[#060e32] border-b border-amber/20 relative z-10'
        >
            <div className='max-w-7xl mx-auto space-y-12'>
                {/* Section Header */}
                <div className='text-center max-w-3xl mx-auto space-y-4'>
                    <div className='flex justify-center mb-1'>
                        <span className='inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/15 px-4.5 py-1.5 text-[10px] font-mono font-bold tracking-wider text-amber uppercase backdrop-blur-md shadow-xs'>
                            <span className='w-2 h-2 rounded-full bg-amber shrink-0 animate-ping' />
                            {sectionTag ||
                                (isEn
                                    ? 'CALCULATE YOUR SUBSCRIPTION'
                                    : 'BEREKEN JE ABONNEMENT')}
                        </span>
                    </div>

                    <h2 className='font-display text-2xl md:text-3xl lg:text-3.5xl font-bold tracking-tight text-[#060e32] leading-tight'>
                        {sectionTitle ||
                            (isEn
                                ? 'Calculate your subscription'
                                : 'Bereken je abonnement')}
                    </h2>

                    <p className='text-[#060e32]/75 text-base md:text-lg leading-relaxed font-light'>
                        {sectionSubtitle ||
                            (isEn
                                ? 'Manage up to 100 contracts from € 173.76 per month (includes 1 user).'
                                : 'Beheer tot 100 contracten vanaf € 173,76 per maand (inclusief 1 gebruiker).')}
                    </p>
                </div>

                {/* 2-Column Calculator Layout */}
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
                    {/* Left Column: Form Elements */}
                    <div className='lg:col-span-7 space-y-6'>
                        {/* BLOCK 1: BASIS ABONNEMENT */}
                        <div className='rounded-md border border-black/15 bg-white p-6 sm:p-8 space-y-6 shadow-xs'>
                            <div className='flex items-center justify-between border-b border-black/10 pb-1'>
                                <div>
                                    <h3 className='text-xl font-bold text-[#060e32]'>
                                        {isEn
                                            ? 'Base Subscription'
                                            : 'Basis Abonnement'}
                                    </h3>
                                    <p className='text-xs text-slate-500 font-light mt-0.5'>
                                        {isEn
                                            ? 'Includes 1 full user & up to 100 contracts'
                                            : 'Inclusief 1 gebruiker & tot 100 contracten'}
                                    </p>
                                </div>
                                <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-mono font-bold border border-emerald-500/20'>
                                    € 144,80 / mnd
                                </span>
                            </div>

                            {/* Base Subscription Toggle Badge */}
                            <div className='p-4 rounded-md bg-amber/10 border border-amber/30 flex items-center justify-between'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-5 h-5 rounded-full bg-amber text-white flex items-center justify-center font-bold text-xs'>
                                        ✓
                                    </div>
                                    <span className='text-sm font-semibold text-[#060e32]'>
                                        {isEn
                                            ? 'emlinked Base License'
                                            : 'emlinked Basisabonnement'}
                                    </span>
                                </div>
                                <span className='text-xs font-mono font-bold text-amber'>
                                    € 144,80 / mnd
                                </span>
                            </div>

                            {/* Extra Contracten Dropdown */}
                            <div className='space-y-1.5'>
                                <label className='block text-[10px] font-bold uppercase tracking-wider text-[#060e32]/80'>
                                    {isEn
                                        ? 'Extra contracts *'
                                        : 'Extra contracten *'}
                                </label>
                                <div className='relative'>
                                    <select
                                        value={extraContractsTier}
                                        onChange={(e) =>
                                            setExtraContractsTier(
                                                Number(e.target.value),
                                            )
                                        }
                                        className='w-full appearance-none rounded-md border border-black/20 bg-slate-50 pl-3 pr-10 py-2 text-sm font-medium text-[#060e32] focus:border-amber focus:outline-hidden focus:ring-2 focus:ring-amber/30 transition-all cursor-pointer'
                                    >
                                        {extraContractLabels.map(
                                            (label, idx) => (
                                                <option key={idx} value={idx}>
                                                    {label}
                                                </option>
                                            ),
                                        )}
                                    </select>
                                    <ChevronDown className='w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none' />
                                </div>
                                <p className='text-[11px] text-slate-500 font-light'>
                                    {isEn
                                        ? 'Select tier if your portfolio exceeds 100 active lease contracts'
                                        : 'Selecteer hoeveel bij meer dan 100 contracten'}
                                </p>
                            </div>

                            {/* Huurdersportaal Dropdown */}
                            <div className='space-y-1.5'>
                                <label className='block text-[10px] font-bold uppercase tracking-wider text-[#060e32]/80'>
                                    {isEn
                                        ? 'Tenant Portal *'
                                        : 'Huurdersportaal *'}
                                </label>
                                <div className='relative'>
                                    <select
                                        value={tenantPortalTier}
                                        onChange={(e) =>
                                            setTenantPortalTier(
                                                Number(e.target.value),
                                            )
                                        }
                                        className='w-full appearance-none rounded-md border border-black/20 bg-slate-50 pl-3 pr-10 py-2 text-sm font-medium text-[#060e32] focus:border-amber focus:outline-hidden focus:ring-2 focus:ring-amber/30 transition-all cursor-pointer'
                                    >
                                        {tenantPortalLabels.map(
                                            (label, idx) => (
                                                <option key={idx} value={idx}>
                                                    {label}
                                                </option>
                                            ),
                                        )}
                                    </select>
                                    <ChevronDown className='w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none' />
                                </div>
                            </div>

                            {/* Extra Gebruikers Slider */}
                            <div className='space-y-1 pt-1'>
                                <div className='flex justify-between items-center'>
                                    <label className='text-[10px] font-bold uppercase tracking-wider text-[#060e32]/80'>
                                        {isEn
                                            ? 'Extra Full Users / Month'
                                            : 'Extra gebruikers / Maand'}
                                    </label>
                                    <span className='text-sm font-mono font-bold text-amber'>
                                        {formatEur(extraUsersCost)}
                                    </span>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <input
                                        type='range'
                                        min='0'
                                        max='20'
                                        value={extraUsers}
                                        onChange={(e) =>
                                            setExtraUsers(
                                                Number(e.target.value),
                                            )
                                        }
                                        style={{
                                            background: `linear-gradient(to right, #ff9400 0%, #ff9400 ${(extraUsers / 20) * 100}%, rgba(0, 0, 0, 0.15) ${(extraUsers / 20) * 100}%, rgba(0, 0, 0, 0.15) 100%)`,
                                        }}
                                        className='w-full accent-amber h-2 rounded-lg cursor-pointer appearance-none'
                                    />
                                    <input
                                        type='number'
                                        min='0'
                                        max='20'
                                        value={extraUsers}
                                        onChange={(e) =>
                                            setExtraUsers(
                                                Math.max(
                                                    0,
                                                    Number(e.target.value),
                                                ),
                                            )
                                        }
                                        className='w-16 rounded-lg border border-black/20 bg-white px-2.5 py-1.5 text-center text-sm font-bold font-mono text-[#060e32]'
                                    />
                                </div>
                                <p className='text-[11px] text-slate-500 font-light'>
                                    {isEn
                                        ? '€ 139.20 incl. Business Central SaaS per user/month'
                                        : '€ 139,20 Incl. Business Central SaaS per gebruiker/maand'}
                                </p>
                            </div>

                            {/* Leesrechten Slider */}
                            <div className='space-y-1 pt-1'>
                                <div className='flex justify-between items-center'>
                                    <label className='text-[10px] font-bold uppercase tracking-wider text-[#060e32]/80'>
                                        {isEn
                                            ? 'Read-only Team Member Users'
                                            : 'Leesrechten voor Team Member'}
                                    </label>
                                    <span className='text-sm font-mono font-bold text-amber'>
                                        {formatEur(teamUsersCost)}
                                    </span>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <input
                                        type='range'
                                        min='0'
                                        max='50'
                                        value={teamUsers}
                                        onChange={(e) =>
                                            setTeamUsers(Number(e.target.value))
                                        }
                                        style={{
                                            background: `linear-gradient(to right, #ff9400 0%, #ff9400 ${(teamUsers / 50) * 100}%, rgba(0, 0, 0, 0.15) ${(teamUsers / 50) * 100}%, rgba(0, 0, 0, 0.15) 100%)`,
                                        }}
                                        className='w-full accent-amber h-2 rounded-lg cursor-pointer appearance-none'
                                    />
                                    <input
                                        type='number'
                                        min='0'
                                        max='50'
                                        value={teamUsers}
                                        onChange={(e) =>
                                            setTeamUsers(
                                                Math.max(
                                                    0,
                                                    Number(e.target.value),
                                                ),
                                            )
                                        }
                                        className='w-16 rounded-lg border border-black/20 bg-white px-2.5 py-1.5 text-center text-sm font-bold font-mono text-[#060e32]'
                                    />
                                </div>
                                <p className='text-[11px] text-slate-500 font-light'>
                                    {isEn
                                        ? '€ 21.80 incl. Business Central SaaS per user/month'
                                        : '€ 21,80 Incl. Business Central SaaS per gebruiker/maand'}
                                </p>
                            </div>

                            {/* Direct Banking Dropdown */}
                            <div className='space-y-2 pt-2'>
                                <label className='block text-[10px] font-bold uppercase tracking-wider text-[#060e32]/80'>
                                    {isEn
                                        ? 'Direct Banking: Electronic Banking'
                                        : 'Direct Banking: Elektronisch bankieren'}
                                </label>
                                <div className='relative'>
                                    <select
                                        value={directBankingTier}
                                        onChange={(e) =>
                                            setDirectBankingTier(
                                                Number(e.target.value),
                                            )
                                        }
                                        className='w-full appearance-none rounded-md border border-black/20 bg-slate-50 pl-3 pr-10 py-2 text-sm font-medium text-[#060e32] focus:border-amber focus:outline-hidden focus:ring-2 focus:ring-amber/30 transition-all cursor-pointer'
                                    >
                                        {directBankingLabels.map(
                                            (label, idx) => (
                                                <option key={idx} value={idx}>
                                                    {label}
                                                </option>
                                            ),
                                        )}
                                    </select>
                                    <ChevronDown className='w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none' />
                                </div>
                                <p className='text-[11px] text-slate-500 font-light'>
                                    {isEn
                                        ? 'Excl. Ponto subscription at € 4.00 per account'
                                        : 'Excl. Ponto Abonnement à € 4,- per rekening'}
                                </p>
                            </div>
                        </div>

                        {/* BLOCK 2: EXTRA INTEGRATIE & SETUP ACCORDION */}
                        <div className='rounded-2xl border border-black/15 bg-white overflow-hidden shadow-xs transition-all'>
                            <button
                                type='button'
                                onClick={() =>
                                    setExtraSetupOpen(!extraSetupOpen)
                                }
                                className='w-full px-6 pt-6 pb-1 flex items-center justify-between text-left font-bold text-lg text-[#060e32] hover:bg-slate-50 transition-colors'
                            >
                                <div className='flex items-center gap-3'>
                                    <Sparkles className='w-5 h-5 text-amber' />
                                    <span>
                                        {isEn
                                            ? 'Extra Integration & Setup'
                                            : 'Extra integratie & setup'}
                                    </span>
                                </div>
                                {extraSetupOpen ? (
                                    <ChevronUp className='w-5 h-5 text-slate-400' />
                                ) : (
                                    <ChevronDown className='w-5 h-5 text-slate-400' />
                                )}
                            </button>

                            {extraSetupOpen && (
                                <div className='p-6 pt-0 border-t border-black/10 space-y-6'>
                                    {/* Strippenkaarten Sub-block */}
                                    <div className='space-y-3 pt-4'>
                                        <h4 className='text-[10px] font-bold uppercase tracking-wider text-amber'>
                                            {isEn
                                                ? 'Prepaid Support Packs (Strippenkaarten)'
                                                : 'Strippenkaarten (Eenmalig)'}
                                        </h4>
                                        <div className='space-y-1.5'>
                                            <label className='flex items-center gap-3 cursor-pointer px-3 py-1.5 rounded-md border border-black/10 hover:border-amber/50 bg-slate-50/50 transition-all'>
                                                <input
                                                    type='checkbox'
                                                    checked={strippenkaart5u}
                                                    onChange={(e) =>
                                                        setStrippenkaart5u(
                                                            e.target.checked,
                                                        )
                                                    }
                                                    className='w-4 h-4 accent-amber rounded-sm'
                                                />
                                                <span className='text-sm font-medium text-[#060e32] grow'>
                                                    {isEn
                                                        ? 'Support Pack – (5 hours) – € 550.00'
                                                        : 'Strippenkaart – (5 uur) – € 550,00'}
                                                </span>
                                            </label>
                                            <label className='flex items-center gap-3 cursor-pointer px-3 py-1.5 rounded-md border border-black/10 hover:border-amber/50 bg-slate-50/50 transition-all'>
                                                <input
                                                    type='checkbox'
                                                    checked={strippenkaart10u}
                                                    onChange={(e) =>
                                                        setStrippenkaart10u(
                                                            e.target.checked,
                                                        )
                                                    }
                                                    className='w-4 h-4 accent-amber rounded-sm'
                                                />
                                                <span className='text-sm font-medium text-[#060e32] grow'>
                                                    {isEn
                                                        ? 'Support Pack – (10 hours) – € 899.00'
                                                        : 'Strippenkaart – (10 uur) – € 899,00'}
                                                </span>
                                            </label>
                                            <label className='flex items-center gap-3 cursor-pointer px-3 py-1.5 rounded-md border border-black/10 hover:border-amber/50 bg-slate-50/50 transition-all'>
                                                <input
                                                    type='checkbox'
                                                    checked={strippenkaart20u}
                                                    onChange={(e) =>
                                                        setStrippenkaart20u(
                                                            e.target.checked,
                                                        )
                                                    }
                                                    className='w-4 h-4 accent-amber rounded-sm'
                                                />
                                                <span className='text-sm font-medium text-[#060e32] grow'>
                                                    {isEn
                                                        ? 'Support Pack – (20 hours) – € 1,599.00'
                                                        : 'Strippenkaart – (20 uur) – € 1.599,00'}
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Opstartkosten Sub-block */}
                                    <div className='space-y-1 pt-1'>
                                        <h4 className='text-[10px] font-bold uppercase tracking-wider text-amber'>
                                            {isEn
                                                ? 'Onboarding & Setup Fees (One-time)'
                                                : 'Opstartkosten (Eenmalig)'}
                                        </h4>
                                        <div className='space-y-1.5'>
                                            <label
                                                className={`flex items-center gap-3 cursor-pointer px-3 py-1.5 rounded-md border transition-all ${
                                                    tenantSetup
                                                        ? 'border-amber/30 bg-amber/5'
                                                        : 'border-black/10 hover:border-amber/50 bg-slate-50/50'
                                                }`}
                                            >
                                                <input
                                                    type='checkbox'
                                                    checked={tenantSetup}
                                                    onChange={(e) =>
                                                        setTenantSetup(
                                                            e.target.checked,
                                                        )
                                                    }
                                                    className='w-4 h-4 accent-amber rounded-sm'
                                                />
                                                <span className='text-sm font-medium text-[#060e32] grow'>
                                                    {isEn
                                                        ? 'Tenant setup & configuration – € 300.00 (Standard)'
                                                        : 'Opzetten/inrichten emlinked Tenant – € 300,00 (Standaard)'}
                                                </span>
                                            </label>
                                            <label className='flex items-center gap-3 cursor-pointer px-3 py-1.5 rounded-md border border-black/10 hover:border-amber/50 bg-slate-50/50 transition-all'>
                                                <input
                                                    type='checkbox'
                                                    checked={directBankingSetup}
                                                    onChange={(e) =>
                                                        setDirectBankingSetup(
                                                            e.target.checked,
                                                        )
                                                    }
                                                    className='w-4 h-4 accent-amber rounded-sm'
                                                />
                                                <span className='text-sm font-medium text-[#060e32] grow'>
                                                    {isEn
                                                        ? 'Setup Direct Banking – € 300.00'
                                                        : 'Setup Direct Banking – € 300,00'}
                                                </span>
                                            </label>
                                            <label className='flex items-center gap-3 cursor-pointer px-3 py-1.5 rounded-md border border-black/10 hover:border-amber/50 bg-slate-50/50 transition-all'>
                                                <input
                                                    type='checkbox'
                                                    checked={docCaptureSetup}
                                                    onChange={(e) =>
                                                        setDocCaptureSetup(
                                                            e.target.checked,
                                                        )
                                                    }
                                                    className='w-4 h-4 accent-amber rounded-sm'
                                                />
                                                <span className='text-sm font-medium text-[#060e32] grow'>
                                                    {isEn
                                                        ? 'Initial Document Capture Setup – € 300.00'
                                                        : 'Initiële installatie Document Capture – € 300,00'}
                                                </span>
                                            </label>
                                            <label className='flex items-center gap-3 cursor-pointer px-3 py-1.5 rounded-md border border-black/10 hover:border-amber/50 bg-slate-50/50 transition-all'>
                                                <input
                                                    type='checkbox'
                                                    checked={trainingVastgoed}
                                                    onChange={(e) =>
                                                        setTrainingVastgoed(
                                                            e.target.checked,
                                                        )
                                                    }
                                                    className='w-4 h-4 accent-amber rounded-sm'
                                                />
                                                <span className='text-sm font-medium text-[#060e32] grow'>
                                                    {isEn
                                                        ? 'emlinked Property Training (1 day) – € 799.00'
                                                        : 'Training emlinked Vastgoed (1 dag) – € 799,00'}
                                                </span>
                                            </label>
                                            <label className='flex items-center gap-3 cursor-pointer px-3 py-1.5 rounded-md border border-black/10 hover:border-amber/50 bg-slate-50/50 transition-all'>
                                                <input
                                                    type='checkbox'
                                                    checked={trainingFinance}
                                                    onChange={(e) =>
                                                        setTrainingFinance(
                                                            e.target.checked,
                                                        )
                                                    }
                                                    className='w-4 h-4 accent-amber rounded-sm'
                                                />
                                                <span className='text-sm font-medium text-[#060e32] grow'>
                                                    {isEn
                                                        ? 'emlinked Finance Training (1 day) – € 998.00'
                                                        : 'Training emlinked Finance (1 dag) – € 998,00'}
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* BLOCK 3: XML/TXT EXPORT BESTAND ACCORDION */}
                        <div className='rounded-2xl border border-black/15 bg-white overflow-hidden shadow-xs transition-all'>
                            <button
                                type='button'
                                onClick={() => setXmlExportOpen(!xmlExportOpen)}
                                className='w-full px-6 pt-6 pb-1 flex items-center justify-between text-left font-bold text-lg text-[#060e32] hover:bg-slate-50 transition-colors'
                            >
                                <div className='flex items-center gap-3'>
                                    <FileText className='w-5 h-5 text-amber' />
                                    <span>
                                        {isEn
                                            ? 'XML/TXT Export File / Setup'
                                            : 'XML/TXT export bestand / Setup'}
                                    </span>
                                </div>
                                {xmlExportOpen ? (
                                    <ChevronUp className='w-5 h-5 text-slate-400' />
                                ) : (
                                    <ChevronDown className='w-5 h-5 text-slate-400' />
                                )}
                            </button>

                            {xmlExportOpen && (
                                <div className='p-6 pt-0 border-t border-black/10 space-y-6'>
                                    {/* Group 1: XML/TXT export bestand */}
                                    <div className='space-y-3 pt-4'>
                                        <h4 className='text-[10px] font-bold uppercase tracking-wider text-[#060e32]'>
                                            {isEn
                                                ? 'XML/TXT Export File'
                                                : 'XML/TXT export bestand'}
                                        </h4>
                                        <div className='space-y-1.5'>
                                            <label className='flex items-center gap-3 cursor-pointer px-3 py-1.5 rounded-md border border-black/10 hover:border-amber/50 bg-slate-50/50 transition-all'>
                                                <input
                                                    type='checkbox'
                                                    checked={inkoopFactuurXml}
                                                    onChange={(e) =>
                                                        setInkoopFactuurXml(
                                                            e.target.checked,
                                                        )
                                                    }
                                                    className='w-4 h-4 accent-amber rounded-sm'
                                                />
                                                <span className='text-sm font-medium text-[#060e32] grow'>
                                                    {isEn
                                                        ? 'Purchase Invoice – Upon calculation'
                                                        : 'Inkoop factuur – Na berekening'}
                                                </span>
                                            </label>
                                            <label className='flex items-center gap-3 cursor-pointer px-3 py-1.5 rounded-md border border-black/10 hover:border-amber/50 bg-slate-50/50 transition-all'>
                                                <input
                                                    type='checkbox'
                                                    checked={
                                                        inkoopCreditFactuurXml
                                                    }
                                                    onChange={(e) =>
                                                        setInkoopCreditFactuurXml(
                                                            e.target.checked,
                                                        )
                                                    }
                                                    className='w-4 h-4 accent-amber rounded-sm'
                                                />
                                                <span className='text-sm font-medium text-[#060e32] grow'>
                                                    {isEn
                                                        ? 'Purchase Credit Memo – Upon calculation'
                                                        : 'Inkoop creditfactuur – Na berekening'}
                                                </span>
                                            </label>
                                            <label className='flex items-center gap-3 cursor-pointer px-3 py-1.5 rounded-md border border-black/10 hover:border-amber/50 bg-slate-50/50 transition-all'>
                                                <input
                                                    type='checkbox'
                                                    checked={verkoopFactuurXml}
                                                    onChange={(e) =>
                                                        setVerkoopFactuurXml(
                                                            e.target.checked,
                                                        )
                                                    }
                                                    className='w-4 h-4 accent-amber rounded-sm'
                                                />
                                                <span className='text-sm font-medium text-[#060e32] grow'>
                                                    {isEn
                                                        ? 'Sales Invoice – Upon calculation'
                                                        : 'Verkoop factuur – Na berekening'}
                                                </span>
                                            </label>
                                            <label className='flex items-center gap-3 cursor-pointer px-3 py-1.5 rounded-md border border-black/10 hover:border-amber/50 bg-slate-50/50 transition-all'>
                                                <input
                                                    type='checkbox'
                                                    checked={
                                                        verkoopCreditNotaXml
                                                    }
                                                    onChange={(e) =>
                                                        setVerkoopCreditNotaXml(
                                                            e.target.checked,
                                                        )
                                                    }
                                                    className='w-4 h-4 accent-amber rounded-sm'
                                                />
                                                <span className='text-sm font-medium text-[#060e32] grow'>
                                                    {isEn
                                                        ? 'Sales Credit Memo – Upon calculation'
                                                        : 'Verkoop credit nota – Na berekening'}
                                                </span>
                                            </label>
                                            <label className='flex items-center gap-3 cursor-pointer px-3 py-1.5 rounded-md border border-black/10 hover:border-amber/50 bg-slate-50/50 transition-all'>
                                                <input
                                                    type='checkbox'
                                                    checked={bankpostenXml}
                                                    onChange={(e) =>
                                                        setBankpostenXml(
                                                            e.target.checked,
                                                        )
                                                    }
                                                    className='w-4 h-4 accent-amber rounded-sm'
                                                />
                                                <span className='text-sm font-medium text-[#060e32] grow'>
                                                    {isEn
                                                        ? 'Bank Ledger Entries – Upon calculation'
                                                        : 'Bankposten – Na berekening'}
                                                </span>
                                            </label>
                                        </div>
                                        <p className='text-xs text-slate-500 font-light italic pt-1'>
                                            {isEn
                                                ? 'Price indication upon calculation'
                                                : 'Prijsindicatie na berekening'}
                                        </p>
                                    </div>

                                    {/* Group 2: Extra integratie en setup */}
                                    <div className='space-y-1 pt-1'>
                                        <h4 className='text-[10px] font-bold uppercase tracking-wider text-[#060e32]'>
                                            {isEn
                                                ? 'Extra Integration and Setup'
                                                : 'Extra integratie en setup'}
                                        </h4>
                                        <div className='space-y-1.5'>
                                            <label className='flex items-center gap-3 cursor-pointer px-3 py-1.5 rounded-md border border-black/10 hover:border-amber/50 bg-slate-50/50 transition-all'>
                                                <input
                                                    type='checkbox'
                                                    checked={
                                                        officeIntegratieSetup
                                                    }
                                                    onChange={(e) =>
                                                        setOfficeIntegratieSetup(
                                                            e.target.checked,
                                                        )
                                                    }
                                                    className='w-4 h-4 accent-amber rounded-sm'
                                                />
                                                <span className='text-sm font-medium text-[#060e32] grow'>
                                                    {isEn
                                                        ? 'Office Integration & Setup – Upon calculation'
                                                        : 'Office integratie en setup – na berekening'}
                                                </span>
                                            </label>
                                            <label className='flex items-center gap-3 cursor-pointer px-3 py-1.5 rounded-md border border-black/10 hover:border-amber/50 bg-slate-50/50 transition-all'>
                                                <input
                                                    type='checkbox'
                                                    checked={
                                                        bankIntegratieSetup
                                                    }
                                                    onChange={(e) =>
                                                        setBankIntegratieSetup(
                                                            e.target.checked,
                                                        )
                                                    }
                                                    className='w-4 h-4 accent-amber rounded-sm'
                                                />
                                                <span className='text-sm font-medium text-[#060e32] grow'>
                                                    {isEn
                                                        ? 'Bank Integration & Setup – Upon calculation'
                                                        : 'Bank integratie en setup – na berekening'}
                                                </span>
                                            </label>
                                            <label className='flex items-center gap-3 cursor-pointer px-3 py-1.5 rounded-md border border-black/10 hover:border-amber/50 bg-slate-50/50 transition-all'>
                                                <input
                                                    type='checkbox'
                                                    checked={
                                                        docCaptureCustomSetup
                                                    }
                                                    onChange={(e) =>
                                                        setDocCaptureCustomSetup(
                                                            e.target.checked,
                                                        )
                                                    }
                                                    className='w-4 h-4 accent-amber rounded-sm'
                                                />
                                                <span className='text-sm font-medium text-[#060e32] grow'>
                                                    {isEn
                                                        ? 'Document Capture – Upon calculation'
                                                        : 'Document Capture – na berekening'}
                                                </span>
                                            </label>
                                        </div>
                                        <p className='text-xs text-slate-500 font-light italic pt-1'>
                                            {isEn
                                                ? 'Price indication upon calculation'
                                                : 'Prijsindicatie na berekening'}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Sticky Total Summary Card */}
                    <div className='lg:col-span-5 sticky top-24'>
                        <div className='rounded-2xl border-2 border-amber/40 bg-texture-navy text-white p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-xl'>
                            <div className='absolute -right-16 -top-16 w-32 h-32 bg-amber/20 rounded-full blur-2xl pointer-events-none' />

                            <div className='flex items-center justify-between border-b border-white/10 pb-4'>
                                <h3 className='text-xl font-bold text-white tracking-tight flex items-center gap-2'>
                                    <span>
                                        {isEn
                                            ? 'Total Summary'
                                            : 'Total Summary'}
                                    </span>
                                </h3>
                                <span className='text-[10px] font-mono uppercase bg-amber/20 text-amber border border-amber/40 px-2.5 py-1 rounded-full font-bold'>
                                    Live Calculation
                                </span>
                            </div>

                            {/* Itemized Table Breakdown */}
                            <div className='space-y-2.5 text-xs text-white/80 font-mono'>
                                <div className='flex justify-between items-center py-1 border-b border-white/5'>
                                    <span>
                                        {isEn
                                            ? 'Base Subscription'
                                            : 'Basisabonnement'}
                                    </span>
                                    <span className='font-semibold text-white'>
                                        {formatEur(baseMonthlyPrice)}
                                    </span>
                                </div>

                                {/* 2. Extra Contracten (only when selected) */}
                                {extraContractsTier > 0 && (
                                    <div className='py-1 border-b border-white/5'>
                                        <div className='flex justify-between items-center font-medium'>
                                            <span>
                                                {isEn
                                                    ? 'Extra Contracts'
                                                    : 'Extra Contracten'}
                                            </span>
                                            <span className='font-semibold text-white'>
                                                {formatEur(extraContractsCost)}
                                            </span>
                                        </div>
                                        <div className='pl-3 pt-0.5 text-[11px] text-amber/80 font-normal'>
                                            <span>
                                                •{' '}
                                                {
                                                    extraContractLabels[
                                                        extraContractsTier
                                                    ].split(' (+')[0]
                                                }
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* 3. Huurdersportaal (only when selected) */}
                                {tenantPortalTier > 0 && (
                                    <div className='py-1 border-b border-white/5'>
                                        <div className='flex justify-between items-center font-medium'>
                                            <span>
                                                {isEn
                                                    ? 'Tenant Portal'
                                                    : 'Huurdersportaal'}
                                            </span>
                                            <span className='font-semibold text-white'>
                                                {formatEur(tenantPortalCost)}
                                            </span>
                                        </div>
                                        <div className='pl-3 pt-0.5 text-[11px] text-amber/80 font-normal'>
                                            <span>
                                                •{' '}
                                                {
                                                    tenantPortalLabels[
                                                        tenantPortalTier
                                                    ].split(' (+')[0]
                                                }
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* 4. Extra Gebruikers (only when > 0) */}
                                {extraUsers > 0 && (
                                    <div className='py-1 border-b border-white/5'>
                                        <div className='flex justify-between items-center font-medium'>
                                            <span>
                                                {isEn
                                                    ? 'Extra Users / Month'
                                                    : 'Extra Gebruikers/Maand'}
                                            </span>
                                            <span className='font-semibold text-white'>
                                                {formatEur(extraUsersCost)}
                                            </span>
                                        </div>
                                        <div className='pl-3 pt-0.5 text-[11px] text-amber/80 font-normal'>
                                            <span>
                                                • {extraUsers}{' '}
                                                {isEn
                                                    ? extraUsers === 1
                                                        ? 'user'
                                                        : 'users'
                                                    : extraUsers === 1
                                                      ? 'gebruiker'
                                                      : 'gebruikers'}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* 5. Leesrechten (only when > 0) */}
                                {teamUsers > 0 && (
                                    <div className='py-1 border-b border-white/5'>
                                        <div className='flex justify-between items-center font-medium'>
                                            <span>
                                                {isEn
                                                    ? 'Team Member Users'
                                                    : 'Leesrechten Voor Team Member'}
                                            </span>
                                            <span className='font-semibold text-white'>
                                                {formatEur(teamUsersCost)}
                                            </span>
                                        </div>
                                        <div className='pl-3 pt-0.5 text-[11px] text-amber/80 font-normal'>
                                            <span>
                                                • {teamUsers}{' '}
                                                {isEn
                                                    ? teamUsers === 1
                                                        ? 'team member'
                                                        : 'team members'
                                                    : 'team members'}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* 6. Direct Banking (only when selected) */}
                                {directBankingTier > 0 && (
                                    <div className='py-1 border-b border-white/5'>
                                        <div className='flex justify-between items-center font-medium'>
                                            <span>
                                                {isEn
                                                    ? 'Direct Banking'
                                                    : 'Direct Banking: Elektronisch Bankieren'}
                                            </span>
                                            <span className='font-semibold text-white'>
                                                {formatEur(directBankingCost)}
                                            </span>
                                        </div>
                                        <div className='pl-3 pt-0.5 text-[11px] text-amber/80 font-normal'>
                                            <span>
                                                •{' '}
                                                {
                                                    directBankingLabels[
                                                        directBankingTier
                                                    ].split(' (+')[0]
                                                }
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* 7. Strippenkaarten (only when selected) */}
                                {strippenkaartenCost > 0 && (
                                    <div className='py-1 border-b border-white/5 text-amber'>
                                        <div className='flex justify-between items-center font-medium'>
                                            <span>
                                                {isEn
                                                    ? 'Support Packs (One-time)'
                                                    : 'Strippenkaarten'}
                                            </span>
                                            <span className='font-semibold'>
                                                {formatEur(strippenkaartenCost)}
                                            </span>
                                        </div>
                                        {strippenkaart5u && (
                                            <div className='flex justify-between items-center pl-3 pt-1 text-[11px] text-amber/80 font-normal'>
                                                <span>
                                                    •{' '}
                                                    {isEn
                                                        ? 'Support Pack – (5 hours)'
                                                        : 'Strippenkaart – (5 uur)'}
                                                </span>
                                                <span>€ 550,00</span>
                                            </div>
                                        )}
                                        {strippenkaart10u && (
                                            <div className='flex justify-between items-center pl-3 pt-1 text-[11px] text-amber/80 font-normal'>
                                                <span>
                                                    •{' '}
                                                    {isEn
                                                        ? 'Support Pack – (10 hours)'
                                                        : 'Strippenkaart – (10 uur)'}
                                                </span>
                                                <span>€ 899,00</span>
                                            </div>
                                        )}
                                        {strippenkaart20u && (
                                            <div className='flex justify-between items-center pl-3 pt-1 text-[11px] text-amber/80 font-normal'>
                                                <span>
                                                    •{' '}
                                                    {isEn
                                                        ? 'Support Pack – (20 hours)'
                                                        : 'Strippenkaart – (20 uur)'}
                                                </span>
                                                <span>€ 1.599,00</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* 8. Opstartkosten (only when selected) */}
                                {opstartkostenCost > 0 && (
                                    <div className='py-1 border-b border-white/5 text-amber'>
                                        <div className='flex justify-between items-center font-medium'>
                                            <span>
                                                {isEn
                                                    ? 'Setup Fees (One-time)'
                                                    : 'Opstartkosten (Eenmalig)'}
                                            </span>
                                            <span className='font-semibold'>
                                                {formatEur(opstartkostenCost)}
                                            </span>
                                        </div>
                                        {tenantSetup && (
                                            <div className='flex justify-between items-center pl-3 pt-1 text-[11px] text-amber/80 font-normal'>
                                                <span>
                                                    •{' '}
                                                    {isEn
                                                        ? 'Tenant setup & configuration'
                                                        : 'Opzetten/inrichten emlinked Tenant'}
                                                </span>
                                                <span>€ 300,00</span>
                                            </div>
                                        )}
                                        {directBankingSetup && (
                                            <div className='flex justify-between items-center pl-3 pt-1 text-[11px] text-amber/80 font-normal'>
                                                <span>
                                                    •{' '}
                                                    {isEn
                                                        ? 'Setup Direct Banking'
                                                        : 'Setup Direct Banking'}
                                                </span>
                                                <span>€ 300,00</span>
                                            </div>
                                        )}
                                        {docCaptureSetup && (
                                            <div className='flex justify-between items-center pl-3 pt-1 text-[11px] text-amber/80 font-normal'>
                                                <span>
                                                    •{' '}
                                                    {isEn
                                                        ? 'Initial Document Capture Setup'
                                                        : 'Initiële installatie Document Capture'}
                                                </span>
                                                <span>€ 300,00</span>
                                            </div>
                                        )}
                                        {trainingVastgoed && (
                                            <div className='flex justify-between items-center pl-3 pt-1 text-[11px] text-amber/80 font-normal'>
                                                <span>
                                                    •{' '}
                                                    {isEn
                                                        ? 'emlinked Property Training (1 day)'
                                                        : 'Training emlinked Vastgoed (1 dag)'}
                                                </span>
                                                <span>€ 799,00</span>
                                            </div>
                                        )}
                                        {trainingFinance && (
                                            <div className='flex justify-between items-center pl-3 pt-1 text-[11px] text-amber/80 font-normal'>
                                                <span>
                                                    •{' '}
                                                    {isEn
                                                        ? 'emlinked Finance Training (1 day)'
                                                        : 'Training emlinked Finance (1 dag)'}
                                                </span>
                                                <span>€ 998,00</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* 9. XML/TXT Export (only when selected) */}
                                {isAnyXmlSelected && (
                                    <div className='py-1 border-b border-white/5 text-amber'>
                                        <div className='flex justify-between items-center font-medium'>
                                            <span>
                                                {isEn
                                                    ? 'XML/TXT Export File'
                                                    : 'XML/TXT Export Bestand'}
                                            </span>
                                            <span className='font-semibold'>
                                                {isEn
                                                    ? 'Upon calculation'
                                                    : 'Na berekening'}
                                            </span>
                                        </div>
                                        {inkoopFactuurXml && (
                                            <div className='pl-3 pt-1 text-[11px] text-amber/80 font-normal'>
                                                <span>
                                                    •{' '}
                                                    {isEn
                                                        ? 'Purchase Invoice'
                                                        : 'Inkoop factuur'}
                                                </span>
                                            </div>
                                        )}
                                        {inkoopCreditFactuurXml && (
                                            <div className='pl-3 pt-1 text-[11px] text-amber/80 font-normal'>
                                                <span>
                                                    •{' '}
                                                    {isEn
                                                        ? 'Purchase Credit Memo'
                                                        : 'Inkoop creditfactuur'}
                                                </span>
                                            </div>
                                        )}
                                        {verkoopFactuurXml && (
                                            <div className='pl-3 pt-1 text-[11px] text-amber/80 font-normal'>
                                                <span>
                                                    •{' '}
                                                    {isEn
                                                        ? 'Sales Invoice'
                                                        : 'Verkoop factuur'}
                                                </span>
                                            </div>
                                        )}
                                        {verkoopCreditNotaXml && (
                                            <div className='pl-3 pt-1 text-[11px] text-amber/80 font-normal'>
                                                <span>
                                                    •{' '}
                                                    {isEn
                                                        ? 'Sales Credit Memo'
                                                        : 'Verkoop credit nota'}
                                                </span>
                                            </div>
                                        )}
                                        {bankpostenXml && (
                                            <div className='pl-3 pt-1 text-[11px] text-amber/80 font-normal'>
                                                <span>
                                                    •{' '}
                                                    {isEn
                                                        ? 'Bank Ledger Entries'
                                                        : 'Bankposten'}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* 10. Extra Integratie (only when selected) */}
                                {isAnyExtraIntegrationSelected && (
                                    <div className='py-1 border-b border-white/5 text-amber'>
                                        <div className='flex justify-between items-center font-medium'>
                                            <span>
                                                {isEn
                                                    ? 'Extra Integration & Setup'
                                                    : 'Extra Integratie En Setup'}
                                            </span>
                                            <span className='font-semibold'>
                                                {isEn
                                                    ? 'Upon calculation'
                                                    : 'Na berekening'}
                                            </span>
                                        </div>
                                        {officeIntegratieSetup && (
                                            <div className='pl-3 pt-1 text-[11px] text-amber/80 font-normal'>
                                                <span>
                                                    •{' '}
                                                    {isEn
                                                        ? 'Office Integration & Setup'
                                                        : 'Office integratie en setup'}
                                                </span>
                                            </div>
                                        )}
                                        {bankIntegratieSetup && (
                                            <div className='pl-3 pt-1 text-[11px] text-amber/80 font-normal'>
                                                <span>
                                                    •{' '}
                                                    {isEn
                                                        ? 'Bank Integration & Setup'
                                                        : 'Bank integratie en setup'}
                                                </span>
                                            </div>
                                        )}
                                        {docCaptureCustomSetup && (
                                            <div className='pl-3 pt-1 text-[11px] text-amber/80 font-normal'>
                                                <span>
                                                    •{' '}
                                                    {isEn
                                                        ? 'Document Capture'
                                                        : 'Document Capture'}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Calculation Totals */}
                                <div className='pt-3 space-y-2 border-t border-amber/30 text-sm'>
                                    <div className='flex justify-between items-center text-white/90'>
                                        <span className='font-sans font-medium text-xs'>
                                            {isEn
                                                ? 'emlinked Base Monthly Subscription'
                                                : 'emlinked Basis Maand Abonnement'}
                                        </span>
                                        <span className='font-bold text-white'>
                                            {formatEur(baseMonthlyPrice)}
                                        </span>
                                    </div>

                                    <div className='flex justify-between items-center text-white/90'>
                                        <span className='font-sans font-medium text-xs'>
                                            {isEn
                                                ? 'Monthly Subscriptions – Extra Services'
                                                : 'Maand Abonnement – Extra Diensten'}
                                        </span>
                                        <span className='font-bold text-white'>
                                            {formatEur(monthlyAdditions)}
                                        </span>
                                    </div>

                                    <div className='flex justify-between items-center text-white/90'>
                                        <span className='font-sans font-medium text-xs'>
                                            {isEn
                                                ? 'Support Fee (20%)'
                                                : 'Support fee (20%)'}
                                        </span>
                                        <span className='font-bold text-amber'>
                                            {formatEur(supportFee)}
                                        </span>
                                    </div>

                                    <div className='flex justify-between items-center text-amber text-xs pt-1 border-t border-white/10'>
                                        <span className='font-sans font-semibold'>
                                            {isEn
                                                ? 'Total One-time Setup Services'
                                                : 'Totaal Eenmalige Extra Diensten'}
                                        </span>
                                        <span className='font-bold'>
                                            {formatEur(totalOneTime)}
                                        </span>
                                    </div>

                                    <div className='flex justify-between items-center text-base pt-3 border-t border-amber/40 text-white'>
                                        <span className='font-sans font-extrabold uppercase tracking-wide text-xs text-amber'>
                                            {isEn
                                                ? 'Total Monthly Subscription'
                                                : 'Totaal – Maand Abonnement'}
                                        </span>
                                        <span className='font-bold text-xl text-white font-mono'>
                                            {formatEur(totalMonthly)}{' '}
                                            <span className='text-xs text-white/60 font-sans'>
                                                / mnd
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Primary Lead Capture Conversion Button */}
                            <button
                                type='button'
                                onClick={() => setIsModalOpen(true)}
                                className='w-full h-14 rounded-md border-0 bg-linear-to-r from-[#FF9500] via-[#FF5E00] to-[#FF3B00] hover:brightness-110 px-6 text-sm font-bold text-white transition-all duration-200 shadow-lg shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5 cursor-pointer mt-4'
                            >
                                <span>
                                    {isEn
                                        ? 'Receive this quote in your mailbox'
                                        : 'Ontvang deze offerte in je mailbox'}
                                </span>
                                <ArrowRight className='w-4 h-4 text-white' />
                            </button>

                            <p className='text-[11px] text-center text-white/60 font-light leading-tight'>
                                {isEn
                                    ? 'No commitment required. We send a non-binding PDF specification directly to your email.'
                                    : 'Vrijblijvend en zonder verplichtingen. Je ontvangt direct een PDF-specificatie in je mailbox.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MODAL: LEAD CAPTURE DIALOG (Renders at document body root via createPortal) ── */}
            {mounted &&
                isModalOpen &&
                createPortal(
                    <div className='fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn'>
                        <div className='relative w-full max-w-xl rounded-2xl bg-white p-6 sm:p-8 text-[#060e32] shadow-2xl border border-amber/30 max-h-[90vh] overflow-y-auto'>
                            <button
                                type='button'
                                onClick={() => setIsModalOpen(false)}
                                className='absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors'
                            >
                                <X className='w-5 h-5' />
                            </button>

                            {!isSubmitted ? (
                                <form
                                    onSubmit={handleFormSubmit}
                                    className='space-y-6'
                                >
                                    <div className='space-y-2 text-left border-b border-slate-100 pb-4'>
                                        <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/15 text-amber text-[10px] font-mono font-bold uppercase'>
                                            <Sparkles className='w-3.5 h-3.5' />
                                            {isEn
                                                ? 'QUOTE CONFIGURATION'
                                                : 'OFFERTE CONFIGURATIE'}
                                        </div>
                                        <h3 className='text-2xl font-bold text-[#060e32]'>
                                            {isEn
                                                ? 'Receive your custom proposal'
                                                : 'Ontvang je persoonlijke offerte'}
                                        </h3>
                                        <p className='text-xs text-slate-600 font-light'>
                                            {isEn
                                                ? 'Fill in your details below. We will send the full specification and pricing breakdown to your email.'
                                                : 'Vul je gegevens in. We sturen de volledige specificatie en kostenopbouw direct naar je e-mailadres.'}
                                        </p>
                                    </div>

                                    {/* Calculation Summary Box inside Modal (Only Selected Fields) */}
                                    <div className='p-4 rounded-md bg-slate-50 border border-slate-200 space-y-2 text-xs font-mono max-h-60 overflow-y-auto text-left'>
                                        {/* 1. Basisabonnement */}
                                        <div className='flex justify-between items-center py-1 border-b border-slate-200/60 text-slate-700'>
                                            <span>
                                                {isEn
                                                    ? 'Base Subscription'
                                                    : 'Basisabonnement'}
                                            </span>
                                            <span className='font-semibold text-[#060e32]'>
                                                {formatEur(baseMonthlyPrice)}
                                            </span>
                                        </div>

                                        {/* 2. Extra Contracten (if selected) */}
                                        {extraContractsTier > 0 && (
                                            <div className='py-1 border-b border-slate-200/60 text-slate-700'>
                                                <div className='flex justify-between items-center font-medium'>
                                                    <span>
                                                        {isEn
                                                            ? 'Extra Contracts'
                                                            : 'Extra Contracten'}
                                                    </span>
                                                    <span className='font-semibold text-[#060e32]'>
                                                        {formatEur(
                                                            extraContractsCost,
                                                        )}
                                                    </span>
                                                </div>
                                                <div className='pl-3 pt-0.5 text-[11px] text-amber-800 font-normal'>
                                                    <span>
                                                        •{' '}
                                                        {
                                                            extraContractLabels[
                                                                extraContractsTier
                                                            ].split(' (+')[0]
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* 3. Huurdersportaal (if selected) */}
                                        {tenantPortalTier > 0 && (
                                            <div className='py-1 border-b border-slate-200/60 text-slate-700'>
                                                <div className='flex justify-between items-center font-medium'>
                                                    <span>
                                                        {isEn
                                                            ? 'Tenant Portal'
                                                            : 'Huurdersportaal'}
                                                    </span>
                                                    <span className='font-semibold text-[#060e32]'>
                                                        {formatEur(
                                                            tenantPortalCost,
                                                        )}
                                                    </span>
                                                </div>
                                                <div className='pl-3 pt-0.5 text-[11px] text-amber-800 font-normal'>
                                                    <span>
                                                        •{' '}
                                                        {
                                                            tenantPortalLabels[
                                                                tenantPortalTier
                                                            ].split(' (+')[0]
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* 4. Extra Gebruikers (if selected) */}
                                        {extraUsers > 0 && (
                                            <div className='py-1 border-b border-slate-200/60 text-slate-700'>
                                                <div className='flex justify-between items-center font-medium'>
                                                    <span>
                                                        {isEn
                                                            ? 'Extra Users / Month'
                                                            : 'Extra Gebruikers/Maand'}
                                                    </span>
                                                    <span className='font-semibold text-[#060e32]'>
                                                        {formatEur(
                                                            extraUsersCost,
                                                        )}
                                                    </span>
                                                </div>
                                                <div className='pl-3 pt-0.5 text-[11px] text-amber-800 font-normal'>
                                                    <span>
                                                        • {extraUsers}{' '}
                                                        {isEn
                                                            ? extraUsers === 1
                                                                ? 'user'
                                                                : 'users'
                                                            : extraUsers === 1
                                                              ? 'gebruiker'
                                                              : 'gebruikers'}
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* 5. Leesrechten (if selected) */}
                                        {teamUsers > 0 && (
                                            <div className='py-1 border-b border-slate-200/60 text-slate-700'>
                                                <div className='flex justify-between items-center font-medium'>
                                                    <span>
                                                        {isEn
                                                            ? 'Team Member Users'
                                                            : 'Leesrechten Voor Team Member'}
                                                    </span>
                                                    <span className='font-semibold text-[#060e32]'>
                                                        {formatEur(
                                                            teamUsersCost,
                                                        )}
                                                    </span>
                                                </div>
                                                <div className='pl-3 pt-0.5 text-[11px] text-amber-800 font-normal'>
                                                    <span>
                                                        • {teamUsers}{' '}
                                                        {isEn
                                                            ? teamUsers === 1
                                                                ? 'team member'
                                                                : 'team members'
                                                            : 'team members'}
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* 6. Direct Banking (if selected) */}
                                        {directBankingTier > 0 && (
                                            <div className='py-1 border-b border-slate-200/60 text-slate-700'>
                                                <div className='flex justify-between items-center font-medium'>
                                                    <span>
                                                        {isEn
                                                            ? 'Direct Banking'
                                                            : 'Direct Banking: Elektronisch Bankieren'}
                                                    </span>
                                                    <span className='font-semibold text-[#060e32]'>
                                                        {formatEur(
                                                            directBankingCost,
                                                        )}
                                                    </span>
                                                </div>
                                                <div className='pl-3 pt-0.5 text-[11px] text-amber-800 font-normal'>
                                                    <span>
                                                        •{' '}
                                                        {
                                                            directBankingLabels[
                                                                directBankingTier
                                                            ].split(' (+')[0]
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* 7. Strippenkaarten (if selected) */}
                                        {strippenkaartenCost > 0 && (
                                            <div className='py-1 border-b border-slate-200/60 text-amber-700'>
                                                <div className='flex justify-between items-center font-medium'>
                                                    <span>
                                                        {isEn
                                                            ? 'Support Packs (One-time)'
                                                            : 'Strippenkaarten'}
                                                    </span>
                                                    <span className='font-semibold'>
                                                        {formatEur(
                                                            strippenkaartenCost,
                                                        )}
                                                    </span>
                                                </div>
                                                {strippenkaart5u && (
                                                    <div className='pl-3 pt-0.5 text-[11px] text-amber-800 font-normal'>
                                                        <span>
                                                            •{' '}
                                                            {isEn
                                                                ? 'Support Pack – (5 hours)'
                                                                : 'Strippenkaart – (5 uur)'}
                                                        </span>
                                                    </div>
                                                )}
                                                {strippenkaart10u && (
                                                    <div className='pl-3 pt-0.5 text-[11px] text-amber-800 font-normal'>
                                                        <span>
                                                            •{' '}
                                                            {isEn
                                                                ? 'Support Pack – (10 hours)'
                                                                : 'Strippenkaart – (10 uur)'}
                                                        </span>
                                                    </div>
                                                )}
                                                {strippenkaart20u && (
                                                    <div className='pl-3 pt-0.5 text-[11px] text-amber-800 font-normal'>
                                                        <span>
                                                            •{' '}
                                                            {isEn
                                                                ? 'Support Pack – (20 hours)'
                                                                : 'Strippenkaart – (20 uur)'}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* 8. Opstartkosten (if selected) */}
                                        {opstartkostenCost > 0 && (
                                            <div className='py-1 border-b border-slate-200/60 text-amber-700'>
                                                <div className='flex justify-between items-center font-medium'>
                                                    <span>
                                                        {isEn
                                                            ? 'Setup Fees (One-time)'
                                                            : 'Opstartkosten (Eenmalig)'}
                                                    </span>
                                                    <span className='font-semibold'>
                                                        {formatEur(
                                                            opstartkostenCost,
                                                        )}
                                                    </span>
                                                </div>
                                                {tenantSetup && (
                                                    <div className='pl-3 pt-0.5 text-[11px] text-amber-800 font-normal'>
                                                        <span>
                                                            •{' '}
                                                            {isEn
                                                                ? 'Tenant setup & configuration'
                                                                : 'Opzetten/inrichten emlinked Tenant'}
                                                        </span>
                                                    </div>
                                                )}
                                                {directBankingSetup && (
                                                    <div className='pl-3 pt-0.5 text-[11px] text-amber-800 font-normal'>
                                                        <span>
                                                            •{' '}
                                                            {isEn
                                                                ? 'Setup Direct Banking'
                                                                : 'Setup Direct Banking'}
                                                        </span>
                                                    </div>
                                                )}
                                                {docCaptureSetup && (
                                                    <div className='pl-3 pt-0.5 text-[11px] text-amber-800 font-normal'>
                                                        <span>
                                                            •{' '}
                                                            {isEn
                                                                ? 'Initial Document Capture Setup'
                                                                : 'Initiële installatie Document Capture'}
                                                        </span>
                                                    </div>
                                                )}
                                                {trainingVastgoed && (
                                                    <div className='pl-3 pt-0.5 text-[11px] text-amber-800 font-normal'>
                                                        <span>
                                                            •{' '}
                                                            {isEn
                                                                ? 'emlinked Property Training (1 day)'
                                                                : 'Training emlinked Vastgoed (1 dag)'}
                                                        </span>
                                                    </div>
                                                )}
                                                {trainingFinance && (
                                                    <div className='pl-3 pt-0.5 text-[11px] text-amber-800 font-normal'>
                                                        <span>
                                                            •{' '}
                                                            {isEn
                                                                ? 'emlinked Finance Training (1 day)'
                                                                : 'Training emlinked Finance (1 dag)'}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* 9. XML/TXT Export (if selected) */}
                                        {isAnyXmlSelected && (
                                            <div className='py-1 border-b border-slate-200/60 text-amber-700'>
                                                <div className='flex justify-between items-center font-medium'>
                                                    <span>
                                                        {isEn
                                                            ? 'XML/TXT Export File'
                                                            : 'XML/TXT Export Bestand'}
                                                    </span>
                                                    <span className='font-semibold'>
                                                        {isEn
                                                            ? 'Upon calculation'
                                                            : 'Na berekening'}
                                                    </span>
                                                </div>
                                                {inkoopFactuurXml && (
                                                    <div className='pl-3 pt-0.5 text-[11px] text-amber-800 font-normal'>
                                                        <span>
                                                            •{' '}
                                                            {isEn
                                                                ? 'Purchase Invoice'
                                                                : 'Inkoop factuur'}
                                                        </span>
                                                    </div>
                                                )}
                                                {inkoopCreditFactuurXml && (
                                                    <div className='pl-3 pt-0.5 text-[11px] text-amber-800 font-normal'>
                                                        <span>
                                                            •{' '}
                                                            {isEn
                                                                ? 'Purchase Credit Memo'
                                                                : 'Inkoop creditfactuur'}
                                                        </span>
                                                    </div>
                                                )}
                                                {verkoopFactuurXml && (
                                                    <div className='pl-3 pt-0.5 text-[11px] text-amber-800 font-normal'>
                                                        <span>
                                                            •{' '}
                                                            {isEn
                                                                ? 'Sales Invoice'
                                                                : 'Verkoop factuur'}
                                                        </span>
                                                    </div>
                                                )}
                                                {verkoopCreditNotaXml && (
                                                    <div className='pl-3 pt-0.5 text-[11px] text-amber-800 font-normal'>
                                                        <span>
                                                            •{' '}
                                                            {isEn
                                                                ? 'Sales Credit Memo'
                                                                : 'Verkoop credit nota'}
                                                        </span>
                                                    </div>
                                                )}
                                                {bankpostenXml && (
                                                    <div className='pl-3 pt-0.5 text-[11px] text-amber-800 font-normal'>
                                                        <span>
                                                            •{' '}
                                                            {isEn
                                                                ? 'Bank Ledger Entries'
                                                                : 'Bankposten'}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* 10. Extra Integratie (if selected) */}
                                        {isAnyExtraIntegrationSelected && (
                                            <div className='py-1 border-b border-slate-200/60 text-amber-700'>
                                                <div className='flex justify-between items-center font-medium'>
                                                    <span>
                                                        {isEn
                                                            ? 'Extra Integration & Setup'
                                                            : 'Extra Integratie En Setup'}
                                                    </span>
                                                    <span className='font-semibold'>
                                                        {isEn
                                                            ? 'Upon calculation'
                                                            : 'Na berekening'}
                                                    </span>
                                                </div>
                                                {officeIntegratieSetup && (
                                                    <div className='pl-3 pt-0.5 text-[11px] text-amber-800 font-normal'>
                                                        <span>
                                                            •{' '}
                                                            {isEn
                                                                ? 'Office Integration & Setup'
                                                                : 'Office integratie en setup'}
                                                        </span>
                                                    </div>
                                                )}
                                                {bankIntegratieSetup && (
                                                    <div className='pl-3 pt-0.5 text-[11px] text-amber-800 font-normal'>
                                                        <span>
                                                            •{' '}
                                                            {isEn
                                                                ? 'Bank Integration & Setup'
                                                                : 'Bank integratie en setup'}
                                                        </span>
                                                    </div>
                                                )}
                                                {docCaptureCustomSetup && (
                                                    <div className='pl-3 pt-0.5 text-[11px] text-amber-800 font-normal'>
                                                        <span>
                                                            •{' '}
                                                            {isEn
                                                                ? 'Document Capture'
                                                                : 'Document Capture'}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Totals Summary (Matching Right Column) */}
                                        <div className='pt-3 space-y-1.5 border-t border-slate-300'>
                                            <div className='flex justify-between text-slate-700 text-xs'>
                                                <span>
                                                    {isEn
                                                        ? 'emlinked Base Monthly Subscription'
                                                        : 'emlinked Basis Maand Abonnement'}
                                                </span>
                                                <span className='font-semibold text-slate-900'>
                                                    {formatEur(
                                                        baseMonthlyPrice,
                                                    )}
                                                </span>
                                            </div>

                                            <div className='flex justify-between text-slate-700 text-xs'>
                                                <span>
                                                    {isEn
                                                        ? 'Monthly Subscriptions – Extra Services'
                                                        : 'Maand Abonnement – Extra Diensten'}
                                                </span>
                                                <span className='font-semibold text-slate-900'>
                                                    {formatEur(
                                                        monthlyAdditions,
                                                    )}
                                                </span>
                                            </div>

                                            <div className='flex justify-between text-amber-700 text-xs'>
                                                <span>
                                                    {isEn
                                                        ? 'Support fee (20%)'
                                                        : 'Support fee (20%)'}
                                                </span>
                                                <span className='font-semibold'>
                                                    {formatEur(supportFee)}
                                                </span>
                                            </div>

                                            <div className='flex justify-between text-amber-700 text-xs font-semibold pt-1 border-t border-slate-200/80'>
                                                <span>
                                                    {isEn
                                                        ? 'Total One-time Setup Services'
                                                        : 'Totaal Eenmalige Extra Diensten'}
                                                </span>
                                                <span>
                                                    {formatEur(totalOneTime)}
                                                </span>
                                            </div>

                                            <div className='flex justify-between items-center text-slate-900 text-sm pt-2 border-t border-slate-300 font-extrabold'>
                                                <span className='uppercase text-xs tracking-wider text-amber-700'>
                                                    {isEn
                                                        ? 'Total Monthly Subscription'
                                                        : 'TOTAAL – MAAND ABONNEMENT'}
                                                </span>
                                                <span className='text-base text-[#060e32] font-mono'>
                                                    {formatEur(totalMonthly)}{' '}
                                                    <span className='text-xs text-slate-500 font-normal font-sans'>
                                                        / mnd
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='space-y-4 text-left'>
                                        <div>
                                            <label className='block text-[10px] font-bold uppercase tracking-wider text-[#060e32]/80 mb-1'>
                                                {isEn
                                                    ? 'Full Name *'
                                                    : 'Naam *'}
                                            </label>
                                            <div className='relative'>
                                                <User className='w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' />
                                                <input
                                                    type='text'
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            name: e.target
                                                                .value,
                                                        })
                                                    }
                                                    placeholder={
                                                        isEn
                                                            ? 'e.g. John Doe'
                                                            : 'bijv. Jan de Vries'
                                                    }
                                                    className='w-full rounded-md border border-slate-300 bg-white pl-10 pr-4 py-1.5 text-sm text-[#060e32] focus:border-amber focus:outline-hidden focus:ring-2 focus:ring-amber/30'
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className='block text-[10px] font-bold uppercase tracking-wider text-[#060e32]/80 mb-1'>
                                                {isEn
                                                    ? 'Email Address *'
                                                    : 'E-mailadres *'}
                                            </label>
                                            <div className='relative'>
                                                <Mail className='w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' />
                                                <input
                                                    type='email'
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            email: e.target
                                                                .value,
                                                        })
                                                    }
                                                    placeholder='jan@organisatie.nl'
                                                    className='w-full rounded-md border border-slate-300 bg-white pl-10 pr-4 py-1.5 text-sm text-[#060e32] focus:border-amber focus:outline-hidden focus:ring-2 focus:ring-amber/30'
                                                />
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                            <div>
                                                <label className='block text-[10px] font-bold uppercase tracking-wider text-[#060e32]/80 mb-1'>
                                                    {isEn
                                                        ? 'Phone Number'
                                                        : 'Telefoonnummer'}
                                                </label>
                                                <div className='relative'>
                                                    <Phone className='w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' />
                                                    <input
                                                        type='tel'
                                                        value={formData.phone}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                phone: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        placeholder='+31 6 12345678'
                                                        className='w-full rounded-md border border-slate-300 bg-white pl-10 pr-4 py-1.5 text-sm text-[#060e32] focus:border-amber focus:outline-hidden focus:ring-2 focus:ring-amber/30'
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className='block text-[10px] font-bold uppercase tracking-wider text-[#060e32]/80 mb-1'>
                                                    {isEn
                                                        ? 'Company Name'
                                                        : 'Bedrijfsnaam'}
                                                </label>
                                                <div className='relative'>
                                                    <Building2 className='w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' />
                                                    <input
                                                        type='text'
                                                        value={formData.company}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                company:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        placeholder={
                                                            isEn
                                                                ? 'Real Estate B.V.'
                                                                : 'Vastgoed Beheer B.V.'
                                                        }
                                                        className='w-full rounded-md border border-slate-300 bg-white pl-10 pr-4 py-1.5 text-sm text-[#060e32] focus:border-amber focus:outline-hidden focus:ring-2 focus:ring-amber/30'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {submitError && (
                                        <div className='p-3 rounded-md bg-red-50 text-red-700 text-xs border border-red-200'>
                                            {submitError}
                                        </div>
                                    )}

                                    <button
                                        type='submit'
                                        disabled={isSubmitting}
                                        className='w-full h-13 rounded-md border-0 bg-linear-to-r from-[#FF9500] via-[#FF5E00] to-[#FF3B00] hover:brightness-110 px-6 text-base font-bold text-white transition-all duration-200 shadow-lg shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed'
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className='w-4 h-4 text-white animate-spin' />
                                                <span>
                                                    {isEn
                                                        ? 'Sending calculation...'
                                                        : 'Berekening verzenden...'}
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className='w-4 h-4 text-white' />
                                                <span>
                                                    {isEn
                                                        ? 'Get your calculation'
                                                        : 'Ontvang je berekening'}
                                                </span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            ) : (
                                <div className='py-8 text-center space-y-4'>
                                    <div className='w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto'>
                                        <Check className='w-8 h-8' />
                                    </div>
                                    <h3 className='text-2xl font-bold text-[#060e32]'>
                                        {isEn
                                            ? 'Quote Sent Successfully!'
                                            : 'Offerte Succesvol Verzonden!'}
                                    </h3>
                                    <p className='text-sm text-slate-600 font-light max-w-md mx-auto'>
                                        {isEn
                                            ? 'Thank you! The customized PDF specification has been sent to your email. One of our specialists will reach out within 1 business day.'
                                            : 'Bedankt! De offerte-specificatie is verzonden naar je mailbox. Een van onze vastgoedbeheerspecialisten neemt binnen 1 werkdag contact op.'}
                                    </p>
                                    <button
                                        type='button'
                                        onClick={() => {
                                            setIsModalOpen(false);
                                            setIsSubmitted(false);
                                        }}
                                        className='inline-flex h-11 px-8 rounded-md bg-slate-900 text-white font-semibold text-sm items-center justify-center hover:bg-slate-800 transition-colors'
                                    >
                                        {isEn ? 'Close' : 'Sluiten'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>,
                    document.body,
                )}
        </section>
    );
}
