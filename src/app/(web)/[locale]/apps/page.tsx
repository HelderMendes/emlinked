import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
    Check,
    ArrowRight,
    Building2,
    Users,
    CreditCard,
    ShieldCheck,
    Database,
    TrendingUp,
    CheckCircle2,
} from 'lucide-react';
import { sanityFetch } from '@/lib/sanity';
import { HeroSection } from '@/components/blocks/HeroSection';

interface AppsPageProps {
    params: Promise<{ locale: string }>;
}

async function getSanityPageData(locale: string) {
    try {
        return await sanityFetch<any>({
            query: `*[_type == "page" && (slug.current == "apps" || slug.current == "vastgoedsoftware") && language == $locale][0] {
                title,
                seo {
                    seoTitle,
                    seoDescription,
                    canonical,
                    noIndex
                }
            }`,
            params: { locale },
        });
    } catch (e) {
        console.error('Failed to fetch apps page from Sanity:', e);
        return null;
    }
}

export async function generateMetadata({
    params,
}: AppsPageProps): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getSanityPageData(locale);
    const seo = pageData?.seo;

    const title =
        seo?.seoTitle ||
        (isEn
            ? 'Native Microsoft Dynamics Property Software Suite | Emlinked'
            : 'Native Microsoft Dynamics Vastgoedsoftware Suite | Emlinked');

    const description =
        seo?.seoDescription ||
        (isEn
            ? 'Discover Emlinked modular property software. Integrated applications for real estate management, tenant portals, and automated payment processing.'
            : 'Ontdek de modulaire vastgoedsoftware van Emlinked. Geïntegreerde applicaties voor vastgoedbeheer, huurdersportalen en geautomatiseerde betalingen.');

    const robots = seo?.noIndex ? 'noindex, nofollow' : 'index, follow';

    return {
        title,
        description,
        robots,
        alternates: {
            canonical: seo?.canonical || (isEn ? '/en/apps' : '/apps'),
        },
    };
}

export default async function AppsPage({ params }: AppsPageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';

    const getPath = (path: string) => {
        if (locale === 'nl') return path;
        return `/en${path === '/' ? '' : path}`;
    };

    const modules = [
        {
            icon: <Building2 className='h-8 w-8 text-amber' />,
            title: isEn
                ? 'Property Management Software'
                : 'Vastgoedbeheer software',
            subtitle: isEn ? 'The Core SaaS Module' : 'De core SaaS module',
            description: isEn
                ? 'Centralize your entire real estate administration. Automate leases, CPI indexations, dynamic costs, and keep your ledger synchronous with Business Central.'
                : 'De centrale database voor al uw vastgoedobjecten, huurders en contracten. Automatiseer indexaties en prolongaties native in Microsoft Dynamics.',
            link: '/apps/vastgoedbeheer-software',
            features: isEn
                ? [
                      'Real-time Contract Management',
                      'Automatic CPI Indexation',
                      'Tenant & Property Database',
                  ]
                : [
                      'Realtime Contractbeheer',
                      'Automatische CPI-indexering',
                      'Gedetailleerde Huurderskaart',
                  ],
            badge: isEn ? 'Most Popular' : 'Meest gekozen',
        },
        {
            icon: <Users className='h-8 w-8 text-amber' />,
            title: isEn ? 'Tenant Portal' : 'Huurdersportaal',
            subtitle: isEn
                ? 'Self-Service Communication'
                : 'Self-service portaal',
            description: isEn
                ? 'Give tenants 24/7 insight into their lease details, documents, and maintenance requests. Drastically cut inbound phone calls and support tickets.'
                : 'Bied huurders 24/7 inzicht in contracten, documenten en onderhoudsmeldingen. Verminder de administratieve belasting van uw supportteam.',
            link: '/apps/huurdersportaal',
            features: isEn
                ? [
                      '24/7 Ticket Submission',
                      'Digital Lease Signing',
                      'Automated Notifications',
                  ]
                : [
                      '24/7 Meldingen Indienen',
                      'Digitaal Ondertekenen',
                      'Automatische Updates',
                  ],
            badge: isEn ? 'Self-Service' : 'Self-service',
        },
        {
            icon: <CreditCard className='h-8 w-8 text-amber' />,
            title: isEn ? 'Payment Software' : 'Payment software',
            subtitle: isEn
                ? 'Automated Billing & Matching'
                : 'Geautomatiseerde betalingen',
            description: isEn
                ? 'Automate monthly rent collection via Direct Debit (SEPA) and auto-match incoming payments in Business Central with zero manual effort.'
                : 'Automatiseer de maandelijkse huurincasso via SEPA en verwerk bankafschriften automatisch in Business Central zonder handmatige invoer.',
            link: '/apps/payment',
            features: isEn
                ? [
                      'SEPA Direct Debit',
                      'PSD2 Direct Banking',
                      'Automated Reconciliation',
                  ]
                : [
                      'SEPA Automatische Incasso',
                      'PSD2 Bankkoppeling',
                      'Automatische Aflettering',
                  ],
            badge: isEn ? 'Financial' : 'Financieel',
        },
    ];

    const faqs = [
        {
            q: isEn
                ? 'How do Emlinked modules integrate with Microsoft Dynamics 365?'
                : 'Hoe integreren de Emlinked modules met Microsoft Dynamics 365?',
            a: isEn
                ? 'Emlinked applications are built natively on top of Business Central. Data stays inside your tenant with no external sync latency or third-party database risks.'
                : 'Emlinked applicaties zijn native gebouwd op Business Central. Alle data blijft binnen je eigen Microsoft tenant zonder externe synchronisatievertraging.',
        },
        {
            q: isEn
                ? 'Can we start with one module and add others later?'
                : 'Kunnen we starten met één module en later uitbreiden?',
            a: isEn
                ? 'Yes, our suite is 100% modular. You can start with Vastgoedbeheer Software for CPI indexation and activate the Tenant Portal or Payment Software whenever needed.'
                : 'Ja, onze suite is 100% modulair. Je kunt starten met Vastgoedbeheer Software en later het Huurdersportaal of Payment Software activeren.',
        },
    ];

    return (
        <main className="flex-1 bg-[url('/hero/bkg_darkBlue.jpg')] bg-cover bg-center bg-no-repeat text-white">
            {/* Hero Section */}
            <HeroSection
                label={isEn ? 'MODULAR AND FLEXIBLE' : 'MODULAIR EN FLEXIBEL'}
                title={
                    isEn
                        ? 'Our modular *property software suite*'
                        : 'Onze modulaire *vastgoedsoftware suite*'
                }
                subtitle={
                    isEn
                        ? 'Manage your properties, tenants, and financial transactions natively inside one single system.'
                        : 'Beheer uw vastgoedobjecten, huurders en betalingsstromen direct binnen uw Microsoft Dynamics ERP. Geen dubbele invoer, maximale controle.'
                }
                locale={locale}
            />

            {/* Applications Grid */}
            <section className='px-6 py-16 relative z-10 max-w-7xl mx-auto space-y-12'>
                <div className='text-center max-w-3xl mx-auto space-y-4'>
                    <span className='text-xs font-bold text-amber uppercase tracking-wider'>
                        {isEn ? 'MODULAR SUITE' : 'ONZE APPLICATIES'}
                    </span>
                    <h2 className='font-display font-bold text-3xl md:text-4xl text-white'>
                        {isEn
                            ? 'Integrated apps for every real estate workflow'
                            : 'Geïntegreerde apps voor elk vastgoedproces'}
                    </h2>
                    <p className='text-sm text-slate-300 leading-relaxed'>
                        {isEn
                            ? 'Choose the modules your organization needs today and scale effortlessly as your portfolio grows.'
                            : 'Kies de modules die je organisatie vandaag nodig heeft en breid eenvoudig uit als je portefeuille groeit.'}
                    </p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {modules.map((mod, idx) => (
                        <div
                            key={idx}
                            className='p-8 rounded-2xl border border-white/10 bg-white/[0.02] space-y-6 hover:border-amber/30 transition-all flex flex-col justify-between'
                        >
                            <div className='space-y-4'>
                                <div className='flex justify-between items-start'>
                                    <div className='p-3 rounded-xl bg-white/[0.04] border border-white/10'>
                                        {mod.icon}
                                    </div>
                                    <span className='px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-white/[0.06] border border-white/10 text-amber'>
                                        {mod.badge}
                                    </span>
                                </div>
                                <div className='space-y-1'>
                                    <span className='text-[11px] text-amber font-mono font-semibold'>
                                        {mod.subtitle}
                                    </span>
                                    <h3 className='text-xl font-bold text-white'>
                                        {mod.title}
                                    </h3>
                                </div>
                                <p className='text-sm text-slate-300 leading-relaxed'>
                                    {mod.description}
                                </p>
                                <ul className='space-y-2 pt-2 border-t border-white/5'>
                                    {mod.features.map((feat, fIdx) => (
                                        <li
                                            key={fIdx}
                                            className='flex items-center gap-2 text-xs text-slate-300'
                                        >
                                            <CheckCircle2 className='h-4 w-4 text-amber shrink-0' />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link
                                href={getPath(mod.link)}
                                className='px-5 py-3 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-amber/30 text-white font-bold text-xs flex items-center justify-between transition-all group'
                            >
                                <span>
                                    {isEn ? 'Explore Module' : 'Bekijk Module'}
                                </span>
                                <ArrowRight className='h-4 w-4 text-amber group-hover:translate-x-1 transition-transform' />
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Architecture Highlights */}
            <section className='px-6 py-16 bg-white/[0.01] border-y border-white/5 relative z-10'>
                <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
                    <div className='p-6 space-y-3'>
                        <Database className='h-8 w-8 text-amber mx-auto' />
                        <h4 className='font-bold text-white text-base'>
                            {isEn
                                ? 'Single Source of Truth'
                                : '100% Data Integriteit'}
                        </h4>
                        <p className='text-xs text-slate-400 leading-relaxed'>
                            {isEn
                                ? 'No separate databases or API sync delays. Everything lives inside Business Central.'
                                : 'Geen losse databases en synchronisatieproblemen. Alle data bevindt zich in Business Central.'}
                        </p>
                    </div>
                    <div className='p-6 space-y-3'>
                        <ShieldCheck className='h-8 w-8 text-amber mx-auto' />
                        <h4 className='font-bold text-white text-base'>
                            {isEn
                                ? 'Enterprise Security'
                                : 'ISO & AVG Compliant'}
                        </h4>
                        <p className='text-xs text-slate-400 leading-relaxed'>
                            {isEn
                                ? 'Bank-grade encryption, TLS 1.3, and strict role-based permissions.'
                                : 'Maximale beveiliging, TLS 1.3 versleuteling en strikte autorisatiestructuren.'}
                        </p>
                    </div>
                    <div className='p-6 space-y-3'>
                        <TrendingUp className='h-8 w-8 text-amber mx-auto' />
                        <h4 className='font-bold text-white text-base'>
                            {isEn
                                ? 'Automated Scalability'
                                : 'Schaalbare Automatisering'}
                        </h4>
                        <p className='text-xs text-slate-400 leading-relaxed'>
                            {isEn
                                ? 'Effortlessly manage 10 to 10,000 units without increasing back-office headcounts.'
                                : 'Beheer moeiteloos van 10 tot 10.000 verhuureenheden zonder extra administratieve druk.'}
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className='px-6 py-16 relative z-10 max-w-4xl mx-auto space-y-8'>
                <h3 className='font-display font-bold text-2xl text-white text-center'>
                    {isEn
                        ? 'Frequently Asked Questions'
                        : 'Veelgestelde Vragen'}
                </h3>
                <div className='space-y-4'>
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className='p-6 rounded-xl border border-white/10 bg-white/[0.02] space-y-2'
                        >
                            <h4 className='font-bold text-white text-sm md:text-base'>
                                {faq.q}
                            </h4>
                            <p className='text-xs text-slate-300 leading-relaxed'>
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
