'use client';

import React from 'react';
import Image from 'next/image';
import {
    ExternalLink,
    CheckCircle2,
    ShieldCheck,
    Sparkles,
    Cpu,
    Layers,
} from 'lucide-react';

export interface PartnerItem {
    _key?: string;
    name: string;
    badge: string;
    logoUrl: string;
    description: string;
    featureTitle?: string;
    featureText?: string;
    websiteUrl?: string;
}

export interface PartnersSectionProps {
    badge?: string;
    title?: string;
    subtitle?: string;
    valueTags?: string[];
    partners?: PartnerItem[];
    isEn?: boolean;
}

export function PartnersSectionComponent({
    badge,
    title,
    subtitle,
    valueTags,
    partners,
    isEn = false,
}: PartnersSectionProps) {
    const secBadge =
        badge ||
        (isEn ? 'OUR STRATEGIC PARTNERS' : 'ONZE STRATEGISCHE PARTNERS');
    const secTitle =
        title ||
        (isEn
            ? 'Built on proven enterprise software'
            : 'Gebouwd op bewezen enterprise software');
    const secSubtitle =
        subtitle ||
        (isEn
            ? 'By working closely with certified Microsoft ISV partners, we deliver a complete, future-proof real estate management solution.'
            : 'Door nauw samen te werken met gecertificeerde Microsoft ISV-partners bieden we een complete, toekomstbestendige vastgoedoplossing.');

    const defaultPartners: PartnerItem[] = [
        {
            name: 'Microsoft Dynamics 365 Business Central',
            badge: 'FOUNDATION ERP',
            logoUrl:
                '/emlinked/partners/Microsoft_Dynamics_Business-e1670413242458-2048x613.png',
            description: isEn
                ? 'The foundation of emlinked is Microsoft Dynamics 365 Business Central, a premier business management solution for SMBs. With Business Central, companies manage their entire operations — including financial accounting, lease agreements, project management, purchasing, and services.'
                : 'Het fundament van emlinked is Microsoft Dynamics 365 Business Central, een oplossing voor bedrijfsbeheer voor kleine en middelgrote organisaties. Met Business Central beheren bedrijven hun volledige bedrijfsvoering — waaronder financiële administratie, contractbeheer, projectmanagement, inkoop en services. emlinked maakt gebruik van deze schitterende Microsoft-mogelijkheid om Business Central volledig geschikt te maken voor vastgoedbeheer.',
            featureTitle: isEn
                ? 'Fast implementation & ease of use'
                : 'Snel te implementeren & eenvoudig in gebruik',
            featureText: isEn
                ? 'emlinked is fast to deploy, easy to configure, and simplicity is the guiding principle behind our product design, engineering, and usability.'
                : 'emlinked is snel te implementeren, gemakkelijk te configureren en eenvoud is het leidende principe achter de innovatie van ons productontwerp, de ontwikkeling en de bruikbaarheid.',
            websiteUrl:
                'https://dynamics.microsoft.com/nl-nl/business-central/overview/',
        },
        {
            name: 'Continia Software — Document Capture',
            badge: isEn
                ? 'SMART INVOICE PROCESSING & OCR'
                : 'SLIMME FACTUURVERWERKING & OCR',
            logoUrl: '/emlinked/partners/Continia-e1670413209950.png',
            description: isEn
                ? 'Continia Software is a leading provider of Business Central solutions that provide total transparency so you can focus on what matters most.'
                : 'Continia Software is een toonaangevende leverancier van oplossingen voor Business Central, die zorgen voor volledige transparantie, zodat je je kunt concentreren op belangrijkere zaken.',
            featureTitle: isEn
                ? 'OCR scanning available for emlinked'
                : 'OCR scanning beschikbaar voor emlinked',
            featureText: isEn
                ? 'Eliminate repetitive manual data entry with Document Capture intelligent OCR. The software reduces errors and saves time by capturing text and placing it directly into the correct fields in your Business Central.'
                : 'Elimineer repetitieve handmatige gegevensinvoer met de intelligente OCR van Document Capture. De software vermindert het aantal fouten en bespaart je tijd door tekst te herkennen en direct in de juiste velden in je Business Central te plaatsen.',
            websiteUrl: 'https://www.continia.com',
        },
        {
            name: 'Idyn — Direct Banking',
            badge: isEn
                ? 'AUTOMATED BANK INTEGRATION'
                : 'AUTOMATISCHE BANKKOPPELING',
            logoUrl:
                '/emlinked/partners/IDYN_Direct-Banking-e1670413366713.png',
            description: isEn
                ? 'Streamline your banking workflows. Direct Banking automatically synchronizes your bank accounts with emlinked (Microsoft Dynamics 365 Business Central). This keeps incoming and outgoing transaction processes seamlessly aligned.'
                : 'Vereenvoudig je bankprocessen. Direct Banking synchroniseert je bankrekeningen automatisch met emlinked (Microsoft Dynamics 365 Business Central). Hierdoor werken je inkomende en uitgaande transactieprocessen op een geïntegreerde manier.',
            featureTitle: isEn
                ? 'Fully integrated bank reconciliation'
                : 'Volledig geïntegreerde bankaflettering',
            featureText: isEn
                ? 'No more file downloads. No manual uploads. No friction. Direct Banking is natively accessible within emlinked for instant rent transaction reconciliation.'
                : 'Geen bestanden meer downloaden. Geen handmatige uploads. Geen gedoe. Direct Banking is direct beschikbaar binnen emlinked voor automatische verwerking van al je huurtransacties.',
            websiteUrl: 'https://www.idyn.nl',
        },
    ];

    const list = partners?.length ? partners : defaultPartners;

    return (
        <section
            id='partners-grid'
            className='py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] relative z-10 text-[#060e32] border-t border-amber/20'
        >
            <div className='max-w-7xl mx-auto space-y-16'>
                {/* Header Title Block */}
                <div className='text-center max-w-3xl mx-auto space-y-5'>
                    <span className='inline-flex items-center gap-2 text-xs font-bold text-amber uppercase tracking-widest bg-amber/15 border border-amber/35 px-4 py-1.5 rounded-full shadow-xs backdrop-blur-md'>
                        <Sparkles className='w-3.5 h-3.5' />
                        {secBadge}
                    </span>
                    <h2 className='font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#060e32] tracking-tight leading-tight'>
                        {secTitle}
                    </h2>
                    <p className='text-[#060e32]/80 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto'>
                        {secSubtitle}
                    </p>

                    {/* Subtitle Solution: Strategic Value Tags */}
                    <div className='flex flex-wrap items-center justify-center gap-2.5 pt-1 text-xs md:text-sm text-[#060e32]/90 font-medium'>
                        {(valueTags && valueTags.length > 0
                            ? valueTags
                            : [
                                  '100% Cloud-Native ERP',
                                  isEn
                                      ? 'Certified ISV Integrations'
                                      : 'Gecertificeerde ISV Integraties',
                                  isEn
                                      ? 'Automated Backups & Updates'
                                      : 'Automatische Updates & Backups',
                              ]
                        ).map((tag, idx) => (
                            <span
                                key={idx}
                                className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/10'
                            >
                                <CheckCircle2 className='w-3.5 h-3.5 text-amber' />
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Grid of Partners */}
                <div className='grid grid-cols-1 gap-12'>
                    {list.map((partner, idx) => (
                        <div
                            key={partner._key || idx}
                            className='rounded-xl bg-white/80 border border-black/10 p-8 md:p-12 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group'
                        >
                            {/* Ambient Subtle Accent Glow */}
                            {/* <div className='absolute top-0 right-0 w-64 h-64 bg-amber/5 rounded-full blur-3xl pointer-events-none group-hover:bg-amber/15 transition-all duration-500' />
                             */}
                            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10'>
                                {/* Left Column: Logo, Tag & Bottom Link */}
                                <div className='lg:col-span-4 flex flex-col justify-between items-start gap-6 pb-6 lg:pb-0 lg:pr-8 h-full'>
                                    <div className='flex flex-col items-start gap-4 w-full'>
                                        <span className='inline-flex items-center gap-1.5 text-sm font-mono font-bold text-black/40'>
                                            <Layers className='w-3 h-3' />
                                            {partner.badge}
                                        </span>

                                        {/* Direct Logo Rendering */}
                                        <div className='py-2 flex items-center justify-start min-h-[70px]'>
                                            <Image
                                                src={partner.logoUrl}
                                                alt={partner.name}
                                                width={620}
                                                height={300}
                                                className='w-full object-contain transition-transform duration-300 group-hover:scale-105'
                                            />
                                        </div>
                                    </div>

                                    {/* Bottom Left Link with Divider Line */}
                                    {partner.websiteUrl && (
                                        <div className='w-full pt-4 border-t border-black/10 flex items-center justify-start'>
                                            <a
                                                href={partner.websiteUrl}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='inline-flex items-center gap-2.5 text-xs md:text-sm font-bold text-[#060e32] hover:text-amber transition-colors group/link'
                                            >
                                                <span className='w-5 h-5 rounded-full bg-amber/15 text-amber border border-amber/40 flex items-center justify-center text-[10px] font-bold shrink-0 shadow-xs group-hover/link:bg-amber group-hover/link:text-white transition-colors'>
                                                    <ExternalLink className='w-3 h-3' />
                                                </span>
                                                <span>
                                                    {isEn
                                                        ? 'Visit Partner Website'
                                                        : 'Bezoek Partner Website'}
                                                </span>
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Right Column: Description & Direct Feature Highlight */}
                                <div className='lg:col-span-8 space-y-5 flex flex-col justify-center'>
                                    <h3 className='font-display text-2xl md:text-3xl font-extrabold text-[#060e32] tracking-tight'>
                                        {partner.name}
                                    </h3>

                                    <p className='text-[#060e32]/85 text-base md:text-lg font-light leading-relaxed'>
                                        {partner.description}
                                    </p>

                                    {partner.featureTitle &&
                                        partner.featureText && (
                                            <div className='pt-2 space-y-2'>
                                                <h4 className='text-base font-bold text-amber flex items-center gap-2.5'>
                                                    <ShieldCheck className='w-5 h-5 text-amber shrink-0' />
                                                    <span>
                                                        {partner.featureTitle}
                                                    </span>
                                                </h4>
                                                <p className='text-sm md:text-base text-[#060e32]/80 leading-relaxed font-normal pl-7.5'>
                                                    {partner.featureText}
                                                </p>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
