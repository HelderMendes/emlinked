import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';

interface Box3EcosystemSectionProps {
    isEn: boolean;
    badge?: string;
    title?: string;
    subtitle?: string;
    cardTitle?: string;
    cardSubtitle?: string;
    cardPoints?: string[];
    trustItems?: Array<{ title: string; desc: string }>;
}

export function Box3EcosystemSection({
    isEn,
    badge,
    title,
    subtitle,
    cardTitle,
    cardSubtitle,
    cardPoints,
    trustItems,
}: Box3EcosystemSectionProps) {
    const secBadge =
        badge ||
        (isEn ? 'MICROSOFT BUSINESS CENTRAL PLATFORM' : 'MICROSOFT ECOSYSTEM');
    const secTitle =
        title ||
        (isEn
            ? 'The reliability of Microsoft. The expertise of emlinked.'
            : 'De betrouwbaarheid van Microsoft. De vakkennis van emlinked.');
    const secSubtitle =
        subtitle ||
        (isEn
            ? 'emlinked is engineered as a certified solution on Microsoft Business Central — the ERP standard for over 50,000 companies globally. You benefit from enterprise security, business continuity, and native integration with Excel and Power BI.'
            : 'emlinked is ontwikkeld als een gecertificeerde oplossing op Microsoft Business Central — de ERP-standaard voor meer dan 50.000 bedrijven wereldwijd. U profiteert van enterprise-grade beveiliging, continuïteit en naadloze integratie met Excel en Power BI.');

    const cTitle = cardTitle || 'Microsoft Business Central';
    const cSubtitle = cardSubtitle || 'Certified Dynamics 365 Module';

    const defaultCardPoints = isEn
        ? [
              'Native ERP GL ledger integration',
              'Automatic SEPA & bank reconciliation',
              'Audit trail for tax accountants',
          ]
        : [
              'Native ERP grootboek integratie',
              'Automatische SEPA & bankaflettering',
              'Volledige audit trail voor de Belastingdienst',
          ];
    const pointsList = cardPoints?.length ? cardPoints : defaultCardPoints;

    const defaultTrustItems = [
        {
            title: isEn ? 'Enterprise Security' : 'Enterprise Beveiliging',
            desc: isEn
                ? 'ISO 27001 & SOC 2 Certified'
                : 'ISO 27001 & SOC 2 Gecertificeerd',
        },
        {
            title: isEn ? 'Power BI Analytics' : 'Power BI Analyses',
            desc: isEn
                ? 'Real-time financial dashboards'
                : 'Realtime financiële dashboards',
        },
        {
            title: isEn ? '50,000+ Customers' : '50.000+ Bedrijven',
            desc: isEn
                ? 'Proven global ERP backbone'
                : 'Bewezen wereldwijd ERP fundament',
        },
    ];
    const trustGrid = trustItems?.length ? trustItems : defaultTrustItems;

    return (
        <section className='px-6 py-24 bg-texture-navy text-white border-b border-white/10 relative overflow-hidden'>
            <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10'>
                <div className='lg:col-span-7 flex flex-col gap-6 text-left'>
                    <span className='inline-flex items-center justify-center self-start rounded-full border border-amber/50 bg-[#251b14]/90 px-5 py-1.5 text-xs font-mono font-bold tracking-widest text-amber uppercase backdrop-blur-md shadow-md'>
                        {secBadge}
                    </span>
                    <h2 className='font-display text-3xl/16 md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight'>
                        {secTitle}
                    </h2>
                    <p className='text-white/80 text-base md:text-lg font-light leading-relaxed'>
                        {secSubtitle}
                    </p>
                </div>
                <div className='lg:col-span-5 flex justify-center'>
                    <div className='relative w-full max-w-md p-8 rounded-3xl bg-slate-900/90 text-white border border-amber/30 shadow-2xl space-y-6 backdrop-blur-xl'>
                        <div className='flex items-center gap-4 border-b border-white/10 pb-4 relative'>
                            <Image
                                src='/emlinked/box3/CERT-Associate-Dynamics365-Business-Central-Functional-Consultant.webp'
                                alt='Microsoft Business Central'
                                width={64}
                                height={64}
                                className='w-16 h-16 rounded-xl object-contain -top-6 -right-6 absolute'
                            />
                            <div>
                                <h3 className='font-bold text-lg text-white'>
                                    {cTitle}
                                </h3>
                                <span className='text-sm text-amber font-mono -mt-1 block'>
                                    {cSubtitle}
                                </span>
                            </div>
                        </div>
                        <ul className='space-y-3 text-xs md:text-sm text-white/80'>
                            {pointsList.map((pt, idx) => (
                                <li
                                    key={idx}
                                    className='flex items-center gap-3'
                                >
                                    <Check className='w-4 h-4 text-amber shrink-0' />
                                    <span>{pt}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className='max-w-7xl mx-auto bg-white/5 mt-10 rounded-xl p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/15 text-center'>
                {trustGrid.map((item, idx) => (
                    <div
                        key={idx}
                        className='px-4 py-6sm:py-0 flex flex-col items-center justify-center text-center space-y-1'
                    >
                        <h4 className='text-sm font-bold text-amber text-center'>
                            {item.title}
                        </h4>
                        <p className='text-xs text-white/70 font-light text-center'>
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
