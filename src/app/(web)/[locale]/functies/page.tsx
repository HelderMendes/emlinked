import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
    Check,
    ArrowRight,
    TrendingUp,
    Calendar,
    Database,
    BarChart3,
    Zap,
    FileText,
    CheckCircle2,
} from 'lucide-react';
import { sanityFetch } from '@/lib/sanity';

interface FunctiesPageProps {
    params: Promise<{ locale: string }>;
}

async function getSanityPageData(locale: string) {
    try {
        return await sanityFetch<any>({
            query: `*[_type == "page" && slug.current == "functies" && language == $locale][0] {
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
        console.error('Failed to fetch functies page from Sanity:', e);
        return null;
    }
}

export async function generateMetadata({
    params,
}: FunctiesPageProps): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getSanityPageData(locale);
    const seo = pageData?.seo;

    const title =
        seo?.seoTitle ||
        (isEn
            ? 'Real Estate Software Features & Capabilities | Emlinked'
            : 'Vastgoedsoftware Functionaliteiten & Functies | Emlinked');

    const description =
        seo?.seoDescription ||
        (isEn
            ? 'Discover the core features of Emlinked: automated CPI indexations, rent invoicing runs, real-time financial reporting, and native Dynamics BC integration.'
            : 'Ontdek de belangrijkste functies van Emlinked: geautomatiseerde CPI-indexering, huurprolongatie runs, realtime rapportages en native Dynamics BC integratie.');

    const robots = seo?.noIndex ? 'noindex, nofollow' : 'index, follow';

    return {
        title,
        description,
        robots,
        alternates: {
            canonical: seo?.canonical || (isEn ? '/en/functies' : '/functies'),
        },
    };
}

export default async function FunctiesPage({ params }: FunctiesPageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';

    const getPath = (path: string) => {
        if (locale === 'nl') return path;
        return `/en${path === '/' ? '' : path}`;
    };

    const features = [
        {
            icon: <TrendingUp className='h-7 w-7 text-amber' />,
            title: isEn ? 'CPI Indexation' : 'CPI Indexatie',
            description: isEn
                ? 'Automatically fetch official CBS inflation rates, calculate adjusted rents, and generate communication templates without Excel mistakes.'
                : 'Haal automatisch de actuele CBS-indexcijfers op, bereken de nieuwe huurprijzen en genereer indexatiebrieven zonder handmatige invoerfouten.',
            link: '/kennisbank/box3-check',
            benefits: isEn
                ? [
                      'Real-time CBS sync',
                      'Batch calculation exports',
                      'Tenant notification templates',
                  ]
                : [
                      'Realtime CBS-koppeling',
                      'Bulkberekeningen exporteren',
                      'Huurdersnotificaties gereed',
                  ],
        },
        {
            icon: <Calendar className='h-7 w-7 text-amber' />,
            title: isEn ? 'Rent Invoicing' : 'Huurprolongatie',
            description: isEn
                ? 'Run automated billing cycles on a monthly, quarterly, or custom schedule. Manage service charges, advances, and dynamic costs seamlessly.'
                : 'Automatiseer uw maandelijkse of kwartaal-facturatie runs. Genereer prolongaties, boek huurstromen direct en splits servicekosten moeiteloos.',
            link: '/oplossingen/vastgoedbeheer-software',
            benefits: isEn
                ? [
                      'Flexible billing cycles',
                      'Service charge advance runs',
                      'Direct PDF invoice deliveries',
                  ]
                : [
                      'Flexibele facturatiecycli',
                      'Voorschotten en afrekeningen',
                      'Directe PDF-facturatie',
                  ],
        },
        {
            icon: <Database className='h-7 w-7 text-amber' />,
            title: isEn
                ? 'Boekhouding (Dynamics BC)'
                : 'Dynamics BC Boekhouding',
            description: isEn
                ? 'Eliminate double-entry systems. Emlinked is native to Microsoft Business Central, meaning every posting maps directly into your general ledger.'
                : 'Geen losse databases of synchronisatieproblemen. Elke boeking belandt direct realtime in het grootboek van Dynamics Business Central.',
            link: '/integraties',
            benefits: isEn
                ? [
                      'Zero database duplication',
                      '100% ledger compliance',
                      'Certified Microsoft BC app',
                  ]
                : [
                      'Geen dataduplicatie',
                      '100% sluitend grootboek',
                      'Gecertificeerde BC Add-on',
                  ],
        },
        {
            icon: <BarChart3 className='h-7 w-7 text-amber' />,
            title: isEn ? 'Real-time Dashboards' : 'Realtime Dashboards',
            description: isEn
                ? 'Access real-time reports on rent status, lease expiries, vacancies, and asset yields to optimize portfolio values.'
                : 'Krijg direct inzicht in openstaande posten, contractverlooftermijnen, leegstandscijfers en de netto rendementen per object.',
            link: '/kennisbank/box3-check',
            benefits: isEn
                ? [
                      'Interactive yield charts',
                      'Audit-ready report exports',
                      'Dynamic performance widgets',
                  ]
                : [
                      'Interactieve rendementsgrafieken',
                      'Audit-ready exports',
                      'Dynamische KPI-widgets',
                  ],
        },
    ];

    const faqs = [
        {
            q: isEn
                ? 'How does Emlinked handle historical data?'
                : 'Hoe verwerkt Emlinked historische contractgegevens?',
            a: isEn
                ? 'During setup, we import all your active and historical leases directly into Microsoft Business Central. This ensures your records remain complete and audit-compliant from day one.'
                : 'Tijdens de inrichting importeren we al uw actieve en historische huurcontracten direct in Business Central, zodat uw geschiedenis en indexatiebasis sluitend bewaard blijven.',
        },
        {
            q: isEn
                ? 'Can Emlinked integrate with other systems?'
                : 'Kan Emlinked gekoppeld worden met andere portals?',
            a: isEn
                ? 'Yes, because we build natively on Business Central, you can connect Emlinked with any tenant portal, accounting package, or maintenance software via standard Microsoft APIs.'
                : "Ja. Omdat we native op Business Central bouwen, kunt u via de standaard REST-API's van Microsoft probleemloos externe onderhoudssystemen of portals aansluiten.",
        },
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
            },
        })),
    };

    return (
        <main className='flex-1 bg-[#060e32] text-white'>
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <section className='relative px-6 py-20 md:py-28 overflow-hidden bg-[radial-gradient(circle_at_70%_20%,rgba(255,148,0,0.08),transparent_50%)]'>
                <div className='absolute inset-0 bg-[linear-gradient(to_bottom,rgba(6,14,50,0.8),#060e32)] z-0' />
                <div className='max-w-7xl mx-auto text-center relative z-10 space-y-6'>
                    <span className='inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-primary/10 border border-primary/20 text-primary'>
                        <Zap className='h-3.5 w-3.5' />
                        {isEn
                            ? 'CORE PRODUCT CAPABILITIES'
                            : 'PRODUCTFUNCTIONALITEITEN'}
                    </span>
                    <h1 className='font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight max-w-4xl mx-auto leading-tight'>
                        {isEn
                            ? 'Enterprise Features for '
                            : 'Geavanceerde Functies voor '}
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-amber to-amber-light'>
                            Vastgoedbeheerders
                        </span>
                    </h1>
                    <p className='text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed'>
                        {isEn
                            ? "Explore Emlinked's robust functional extensions. Built to streamline operational processes and secure full financial integrity."
                            : 'Ontdek de krachtige functionaliteiten van ons platform. Ontwikkeld om operationele processen te versnellen en de datakwaliteit te borgen.'}
                    </p>
                </div>
            </section>

            {/* Features List Layout */}
            <section className='px-6 py-12 relative z-10 max-w-7xl mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    {features.map((feat, idx) => (
                        <div
                            key={idx}
                            className='group relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 hover:border-amber/30 transition-all duration-300 flex flex-col justify-between'
                        >
                            <div className='space-y-5'>
                                <div className='h-12 w-12 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-amber/20 transition-colors'>
                                    {feat.icon}
                                </div>
                                <div className='space-y-2'>
                                    <h2 className='font-display font-bold text-xl text-white'>
                                        {feat.title}
                                    </h2>
                                    <p className='text-xs text-muted-foreground leading-relaxed'>
                                        {feat.description}
                                    </p>
                                </div>

                                <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4 border-t border-white/5'>
                                    {feat.benefits.map((benefit, bIdx) => (
                                        <li
                                            key={bIdx}
                                            className='flex items-center gap-2 text-xs text-slate-300'
                                        >
                                            <Check className='h-3.5 w-3.5 text-primary shrink-0' />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className='pt-6'>
                                <Link
                                    href={getPath(feat.link)}
                                    className='inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-amber transition-colors'
                                >
                                    {isEn ? 'Learn more' : 'Meer details lezen'}
                                    <ArrowRight className='h-3.5 w-3.5' />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Bottom Demo Banner */}
            <section className='px-6 py-20 relative z-10 max-w-7xl mx-auto'>
                <div className='relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-8 md:p-14 overflow-hidden text-center max-w-4xl mx-auto'>
                    <div className='absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber/5 rounded-full blur-[100px] pointer-events-none' />
                    <div className='relative z-10 space-y-6 max-w-2xl mx-auto'>
                        <h2 className='font-display font-bold text-3xl md:text-4xl text-white'>
                            {isEn
                                ? 'Experience Emlinked in Action'
                                : 'Ervaar emlinked zelf in een demo'}
                        </h2>
                        <p className='text-xs text-muted-foreground leading-relaxed'>
                            {isEn
                                ? 'Let us walk you through our features with a live demo tailored to your retail, residential, or commercial real estate portfolio.'
                                : 'Laat ons u meenemen door al onze functionaliteiten in een demo afgestemd op uw eigen vastgoedportefeuille.'}
                        </p>
                        <div className='flex flex-col sm:flex-row justify-center items-center gap-4 pt-4'>
                            <Link
                                href='#demo'
                                className='h-11 px-6 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold rounded-lg flex items-center gap-2 transition-all shadow-md'
                            >
                                {isEn ? 'Schedule Demo' : 'Demo Inplannen'}
                                <ArrowRight className='h-4.5 w-4.5' />
                            </Link>
                            <Link
                                href={getPath('/')}
                                className='h-11 px-6 border border-white/10 hover:bg-white/[0.04] text-xs font-bold rounded-lg flex items-center transition-all'
                            >
                                {isEn ? 'Back to Home' : 'Terug naar Homepage'}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
