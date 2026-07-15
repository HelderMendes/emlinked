import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
    Users,
    Award,
    Lightbulb,
    Target,
    ArrowRight,
    ShieldCheck,
    HeartHandshake,
    Sparkles,
} from 'lucide-react';

interface OverOnsPageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({
    params,
}: OverOnsPageProps): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === 'en';

    const title = isEn
        ? 'About Emlinked | Our Vision, Philosophy & Team'
        : 'Over Emlinked | Onze Visie, Filosofie & Team';

    const description = isEn
        ? 'Learn about Emlinked, our mission to automate real estate accounting natively inside Dynamics 365, and the team behind it.'
        : 'Lees het verhaal van Emlinked, onze missie om vastgoedbeheer native te automatiseren in Microsoft Dynamics 365, en maak kennis met ons team.';

    return {
        title,
        description,
        alternates: {
            canonical: isEn ? '/en/over-ons' : '/over-ons',
        },
    };
}

export default async function OverOnsPage({ params }: OverOnsPageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';

    const getPath = (path: string) => {
        if (locale === 'nl') return path;
        return `/en${path === '/' ? '' : path}`;
    };

    const team = [
        {
            name: 'Coen Mendes',
            role: isEn
                ? 'Founder & Lead Architect'
                : 'Oprichter & Lead Architect',
            bio: isEn
                ? 'With over 15 years of experience in ERP architectures, Coen founded Emlinked to solve the reconciliation bottleneck between property operations and accounting.'
                : 'Met meer dan 15 jaar ervaring in ERP-architecturen richtte Coen Emlinked op om de dagelijkse afletterings- en dubbele boekingsproblemen definitief op te lossen.',
        },
        {
            name: 'Dynamics & BC Specialist',
            role: isEn
                ? 'Lead Business Central Engineer'
                : 'Lead Business Central Engineer',
            bio: isEn
                ? 'Expert in Microsoft Dynamics extensions and AL language. Responsible for the native integration and database synchronization.'
                : 'Specialist in Microsoft Dynamics AL development en extensies. Verantwoordelijk voor de native werking en databasekoppelingen binnen BC.',
        },
        {
            name: 'Customer Success & Support',
            role: isEn ? 'Support Lead' : 'Support Lead',
            bio: isEn
                ? 'Dedicated to ensuring seamless onboarding and providing technical assistance for institutional real estate managers.'
                : 'Zorgt voor een soepele onboarding en begeleidt de implementatietrajecten bij professionele vastgoedbeheerders.',
        },
    ];

    const values = [
        {
            icon: <ShieldCheck className='h-6 w-6 text-amber' />,
            title: isEn ? '100% Data Integrity' : '100% Data-integriteit',
            description: isEn
                ? 'We believe in a single source of truth. By building directly inside Microsoft Dynamics, we eliminate separate databases and data syncing errors.'
                : 'Wij geloven in één bron van waarheid. Door rechtstreeks binnen Microsoft Dynamics te bouwen, elimineren we losse databases en synchronisatiefouten.',
        },
        {
            icon: <Lightbulb className='h-6 w-6 text-amber' />,
            title: isEn ? 'Continuous Automation' : 'Continu Automatiseren',
            description: isEn
                ? 'Manual tasks like CPI indexation and bank reconciliation cost hours of valuable time. We automate them so teams can focus on asset growth.'
                : 'Handmatig werk zoals CPI-indexering en bankaflettering kost uren tijd. Wij automatiseren deze loops zodat teams zich kunnen richten op groei.',
        },
        {
            icon: <HeartHandshake className='h-6 w-6 text-amber' />,
            title: isEn ? 'Enterprise Quality' : 'Enterprise Kwaliteit',
            description: isEn
                ? 'We build software that matches the stability and security requirements of large scale retail, commercial, and residential managers.'
                : 'Onze software voldoet aan de strengste stabiliteits-, beveiligings- en compliance-eisen van grote retail- en woningportefeuilles.',
        },
    ];

    return (
        <main className='flex-1 bg-[#060e32] text-white'>
            {/* Hero Section */}
            <section className='relative px-6 py-20 md:py-28 overflow-hidden bg-[radial-gradient(circle_at_20%_30%,rgba(255,148,0,0.06),transparent_50%)]'>
                <div className='absolute inset-0 bg-[linear-gradient(to_bottom,rgba(6,14,50,0.8),#060e32)] z-0' />
                <div className='max-w-7xl mx-auto text-center relative z-10 space-y-6'>
                    <span className='inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-primary/10 border border-primary/20 text-primary'>
                        <Sparkles className='h-3.5 w-3.5' />
                        {isEn ? 'ABOUT EMLINKED' : 'OVER EMLINKED'}
                    </span>
                    <h1 className='font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight max-w-4xl mx-auto leading-tight'>
                        {isEn
                            ? 'The Bridge Between Property & '
                            : 'De brug tussen vastgoed en '}
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-amber to-amber-light'>
                            Finance
                        </span>
                    </h1>
                    <p className='text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed'>
                        {isEn
                            ? 'Emlinked was founded to solve the structural disconnect between property operations and financial administrations. We build native extensions that live directly inside Microsoft Dynamics.'
                            : 'Emlinked is ontstaan vanuit één duidelijke frustratie: het gat tussen operationeel vastgoedbeheer en de financiële administratie. Wij lossen dit op door software native te integreren in uw Microsoft ERP.'}
                    </p>
                </div>
            </section>

            {/* Our Story / Who We Are */}
            <section className='px-6 py-12 relative z-10 max-w-7xl mx-auto'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
                    <div className='space-y-6 text-left'>
                        <span className='text-xs font-bold text-amber uppercase tracking-wider'>
                            {isEn ? 'OUR ORIGIN STORY' : 'ONS VERHAAL'}
                        </span>
                        <h2 className='font-display font-bold text-3xl md:text-4xl text-white'>
                            {isEn
                                ? 'Eliminating the Double-Entry Tax'
                                : 'Het elimineren van de dubbele invoer'}
                        </h2>
                        <div className='space-y-4 text-xs text-slate-300 leading-relaxed'>
                            <p>
                                {isEn
                                    ? 'Traditionally, property managers use separate tools to manage tenants and invoices, while their financial ledger lives inside a heavy ERP. This creates constant manual exporting, bank reconciliation errors, and out-of-sync databases.'
                                    : 'Traditioneel gebruiken vastgoedbeheerders losse softwarepakketten voor contracten en huurders, terwijl de financiële administratie in een zwaar ERP-systeem draait. Dit leidt tot handmatig exporteren, foutgevoelig afletterwerk en niet-synchrone databases.'}
                            </p>
                            <p>
                                {isEn
                                    ? 'We built Emlinked to bridge this gap. By developing directly inside Dynamics 365 Business Central, property management functions become native ERP features. Huurprolongatie, bankaflettering, and CPI indexation happen where the transactions belong: in the general ledger.'
                                    : 'We hebben Emlinked gebouwd om deze kloof te dichten. Door software direct binnen Dynamics 365 Business Central te ontwikkelen, worden vastgoedfunctionaliteiten onderdeel van het ERP. Huurprolongatie, bankaflettering en CPI-indexatie gebeuren direct in de boekhouding.'}
                            </p>
                        </div>
                    </div>

                    {/* Visual Card / Philosophy Statement */}
                    <div className='relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-12 text-left overflow-hidden'>
                        <div className='absolute top-0 right-0 w-48 h-48 bg-amber/5 rounded-full blur-[80px]' />
                        <div className='space-y-6 relative z-10'>
                            <div className='h-10 w-10 rounded-lg bg-white/[0.04] flex items-center justify-center border border-white/10 text-amber'>
                                <Target className='h-5 w-5' />
                            </div>
                            <h3 className='font-display font-bold text-xl text-white'>
                                {isEn ? 'Our Philosophy' : 'Onze Filosofie'}
                            </h3>
                            <blockquote className='text-xs italic text-slate-300 border-l-2 border-primary pl-4 py-1'>
                                {isEn
                                    ? '"Property management is not just operational; it is fundamentally financial. The only way to guarantee data integrity is to keep the ledger and the contract in the exact same database."'
                                    : '"Vastgoedbeheer is niet alleen operationeel, het is in de kern financieel. De enige manier om datakwaliteit te garanderen, is door het huurcontract en het grootboek in exact dezelfde database te beheren."'}
                            </blockquote>
                            <p className='text-[10px] text-muted-foreground'>
                                — Coen Mendes, Founder & Lead Architect
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className='px-6 py-16 relative z-10 max-w-7xl mx-auto border-t border-white/5'>
                <div className='text-center max-w-2xl mx-auto space-y-4 mb-12'>
                    <h2 className='font-display font-bold text-3xl text-white'>
                        {isEn ? 'What We Stand For' : 'Waar we in geloven'}
                    </h2>
                    <p className='text-xs text-muted-foreground leading-relaxed'>
                        {isEn
                            ? 'Our operations and development pipeline are guided by three central engineering and business values.'
                            : 'Al onze ontwikkelingen en samenwerkingen worden gestuurd door drie fundamentele waarden.'}
                    </p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {values.map((val, idx) => (
                        <div
                            key={idx}
                            className='rounded-xl border border-white/5 bg-white/[0.01] p-6 text-left space-y-4'
                        >
                            <div className='h-11 w-11 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0'>
                                {val.icon}
                            </div>
                            <h3 className='font-display font-bold text-lg text-white'>
                                {val.title}
                            </h3>
                            <p className='text-xs text-slate-300 leading-relaxed'>
                                {val.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Team Specialists Grid */}
            <section className='px-6 py-16 relative z-10 max-w-7xl mx-auto border-t border-white/5'>
                <div className='text-center max-w-2xl mx-auto space-y-4 mb-12'>
                    <h2 className='font-display font-bold text-3xl text-white'>
                        {isEn ? 'Meet Our Specialists' : 'Onze Specialisten'}
                    </h2>
                    <p className='text-xs text-muted-foreground leading-relaxed'>
                        {isEn
                            ? 'The engineers and property software experts building Emlinked every day.'
                            : 'De ontwikkelaera en vastgoedexperts die dagelijks bouwen aan de stabiliteit en kracht van Emlinked.'}
                    </p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {team.map((member, idx) => (
                        <div
                            key={idx}
                            className='rounded-xl border border-white/10 bg-white/[0.01] p-8 text-left flex flex-col justify-between hover:border-amber/20 transition-all'
                        >
                            <div className='space-y-4'>
                                <div className='space-y-1'>
                                    <h3 className='font-display font-bold text-xl text-white'>
                                        {member.name}
                                    </h3>
                                    <p className='text-xs text-primary font-semibold tracking-wider'>
                                        {member.role}
                                    </p>
                                </div>
                                <p className='text-xs text-slate-300 leading-relaxed pt-2'>
                                    {member.bio}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Onboarding Call to Action */}
            <section className='px-6 py-16 relative z-10 max-w-7xl mx-auto'>
                <div className='relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-8 md:p-14 overflow-hidden text-center max-w-4xl mx-auto'>
                    <div className='absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber/5 rounded-full blur-[100px] pointer-events-none' />
                    <div className='relative z-10 space-y-6 max-w-2xl mx-auto'>
                        <h2 className='font-display font-bold text-3xl md:text-4xl text-white'>
                            {isEn
                                ? 'Ready to Partner With Us?'
                                : 'Klaar om uw processen te automatiseren?'}
                        </h2>
                        <p className='text-xs text-muted-foreground leading-relaxed'>
                            {isEn
                                ? 'Let us demonstrate how Emlinked can align your operational property management and financial administration.'
                                : 'Ontdek hoe Emlinked uw operationele processen en financiële administratie naadloos op elkaar kan laten aansluiten.'}
                        </p>
                        <div className='flex flex-col sm:flex-row justify-center items-center gap-4 pt-4'>
                            <Link
                                href='#demo'
                                className='h-11 px-6 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold rounded-lg flex items-center gap-2 transition-all shadow-md'
                            >
                                {isEn
                                    ? 'Book Demo Session'
                                    : 'Demo-sessie Inplannen'}
                                <ArrowRight className='h-4.5 w-4.5' />
                            </Link>
                            <Link
                                href={getPath('/prijzen')}
                                className='h-11 px-6 border border-white/10 hover:bg-white/[0.04] text-xs font-bold rounded-lg flex items-center transition-all'
                            >
                                {isEn ? 'View Pricing' : 'Prijzen Bekijken'}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
