import React from 'react';
import { Metadata } from 'next';
import { sanityFetch } from '@/lib/sanity';
import { HeroSection } from '@/components/blocks/HeroSection';
import { Box3Calculator } from '@/components/Box3Calculator';
import { BookOpen, AlertCircle, ShieldCheck, FileCheck, ArrowRight, Zap, Check } from 'lucide-react';
import Link from 'next/link';

interface Box3PageProps {
    params: Promise<{ locale: string }>;
}

async function getSanityPageData(locale: string) {
    try {
        return await sanityFetch<any>({
            query: `*[_type == "page" && (slug.current == "box3-check" || slug.current == "/box3-check") && language == $locale][0] {
                title,
                pageBlocks,
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
        console.error('Failed to fetch box3-check page from Sanity:', e);
        return null;
    }
}

export async function generateMetadata({
    params,
}: Box3PageProps): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getSanityPageData(locale);
    const seo = pageData?.seo;

    const title =
        seo?.seoTitle ||
        (isEn
            ? 'Box 3 Check: Calculate Fiscal Impact on Real Estate | Emlinked'
            : 'Box 3 Check: Bereken de Fiscale Impact op uw Vastgoed | Emlinked');

    const description =
        seo?.seoDescription ||
        (isEn
            ? 'Calculate the tax impact of changing Box 3 regulations on your real estate portfolio in 2 minutes. Get direct insights and a personalized report.'
            : 'Bereken binnen 2 minuten de fiscale impact van de veranderende Box 3 wetgeving op uw vastgoedportefeuille. Direct inzicht en gepersonaliseerd rapport.');

    const robots = seo?.noIndex ? 'noindex, nofollow' : 'index, follow';

    return {
        title,
        description,
        robots,
        alternates: {
            canonical:
                seo?.canonical || (isEn ? '/en/box3-check' : '/box3-check'),
        },
    };
}

export default async function Box3CheckPage({ params }: Box3PageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getSanityPageData(locale);

    // Extract Hero block data from Sanity if available, fallback gracefully
    const heroBlock = pageData?.pageBlocks?.find((b: any) => b._type === 'hero');

    const heroLabel = heroBlock?.label || (isEn ? 'FISCAL OPTIMIZATION ⚡' : 'FISCALE OPTIMALISATIE ⚡');
    const heroTitle = heroBlock?.title || (
        isEn
            ? 'Calculate the Box 3 impact on *your real estate portfolio*'
            : 'Bereken de Box 3-impact op *uw vastgoedportefeuille*'
    );
    const heroSubtitle = heroBlock?.subtitle || (
        isEn
            ? 'With changing Box 3 legislation, an accurate cost and yield registration is mandatory. Calculate your tax advantage in 2 minutes.'
            : 'Met de veranderende Box 3 wetgeving in 2028 is een sluitende kostenregistratie noodzakelijk. Ontdek uw fiscale voordeel binnen 2 minuten.'
    );

    return (
        <main className="flex-1 text-white bg-slate-950">
            {/* Urgency Notification Bar */}
            <div className="bg-texture-navy border-b border-amber/20 py-2.5 px-4 text-center relative overflow-hidden">
                <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-xs sm:text-sm font-medium text-white/90 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber text-[#060e32] font-mono font-bold text-[11px] uppercase tracking-wider">
                        <Zap className="w-3 h-3 fill-current" />
                        {isEn ? 'Urgent update' : 'Belangrijk'}
                    </span>
                    <span>
                        {isEn 
                            ? 'High Court ruling: Tax based on actual net yield permitted if lower than forfait.'
                            : 'Uitspraak Hoge Raad: Belasting op werkelijk rendement toegestaan bij lager saldo dan forfait.'}
                    </span>
                    <a href="#calculator" className="text-amber hover:text-amber-light underline font-semibold transition-colors">
                        {isEn ? 'Calculate your yield →' : 'Direct berekenen →'}
                    </a>
                </div>
            </div>

            {/* Hero Section */}
            <HeroSection
                label={heroLabel}
                title={heroTitle}
                subtitle={heroSubtitle}
                ctaLabel={isEn ? 'Start Box 3 Check' : 'Start de Box 3 Check'}
                ctaLink="#calculator"
                secondaryCtaLabel={isEn ? 'View all apps' : 'Bekijk vastgoedbeheer'}
                secondaryCtaLink="/apps/vastgoedbeheer-software"
                imagePath="/emlinked/home/FiscaleOptimalisatie_Box3.jpg"
                locale={locale}
            />

            {/* Trust Bar */}
            <section className="bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] text-[#060e32] border-b border-amber/10 py-4 px-6 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-center gap-8 md:gap-12 flex-wrap text-xs md:text-sm font-medium">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-amber shrink-0" />
                        <span>{isEn ? '100% Tax Compliant Calculation' : '100% Tax Compliant Berekening'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-amber shrink-0" />
                        <span>{isEn ? 'High Court Proof Methodology' : 'Hoge Raad Methodiek'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber shrink-0" />
                        <span>{isEn ? 'Direct ERP Ledger Sync' : 'Directe ERP Grootboek Sync'}</span>
                    </div>
                </div>
            </section>

            {/* Calculator Container Section */}
            <section id="calculator" className="px-6 py-16 max-w-7xl mx-auto space-y-16">
                <div className="p-2 sm:p-6 md:p-8 rounded-3xl bg-texture-navy border border-amber/30 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber/10 rounded-full blur-3xl pointer-events-none" />
                    <Box3Calculator />
                </div>

                {/* Explanatory Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Card 1: Fictief vs Werkelijk */}
                    <div className="p-8 rounded-2xl border border-white/10 bg-slate-900/60 hover:border-amber/40 transition-all duration-300 space-y-4 relative overflow-hidden group">
                        <div className="flex items-center gap-3 text-amber font-bold text-lg">
                            <div className="p-2.5 rounded-xl bg-amber/15 border border-amber/30 text-amber">
                                <BookOpen className="h-5 w-5" />
                            </div>
                            <h3>
                                {isEn
                                    ? 'Forfaitaire vs. Actual return'
                                    : 'Fictief vs. Werkelijk Rendement'}
                            </h3>
                        </div>
                        <p className="text-sm text-white/75 leading-relaxed font-light">
                            {isEn
                                ? 'The Dutch High Court (Hoge Raad) ruled that property investors may be taxed on actual net yields if they are lower than the statutory forfaitaire percentage. Net yield includes gross rent minus maintenance, insurances, and actual interest.'
                                : 'De Hoge Raad heeft geoordeeld dat u bij verhuurd vastgoed mag uitgaan van het werkelijke rendement als dit lagere belastingen oplevert dan het fictieve forfait. Het werkelijke rendement omvat de netto bruto-huur minus aantoonbare exploitatiekosten en hypotheekrente.'}
                        </p>
                        <ul className="space-y-2 pt-2 text-xs text-white/80">
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-amber shrink-0" />
                                <span>{isEn ? 'Net rent minus verified operating expenses' : 'Bruto-huur minus aantoonbare exploitatiekosten'}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-amber shrink-0" />
                                <span>{isEn ? 'Deduction of actual mortgage interest' : 'Aptrekbaarheid van werkelijke hypotheekrente'}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Card 2: ERP Integration */}
                    <div className="p-8 rounded-2xl border border-white/10 bg-slate-900/60 hover:border-amber/40 transition-all duration-300 space-y-4 relative overflow-hidden group">
                        <div className="flex items-center gap-3 text-amber font-bold text-lg">
                            <div className="p-2.5 rounded-xl bg-amber/15 border border-amber/30 text-amber">
                                <AlertCircle className="h-5 w-5" />
                            </div>
                            <h3>
                                {isEn
                                    ? 'Native ERP Portfolio Audit'
                                    : 'Portefeuille Audit in Business Central'}
                            </h3>
                        </div>
                        <p className="text-sm text-white/75 leading-relaxed font-light">
                            {isEn
                                ? 'Emlinked automatically tracks historical lease income, CBS indexations, and maintenance invoices directly inside Business Central so your tax reporting is 100% audit-proof.'
                                : 'Emlinked registreert al uw huurontvangsten, CBS-indexeringen en onderhoudsfacturen automatisch binnen Business Central, waardoor uw belastingaangifte gegarandeerd onderbouwd is.'}
                        </p>
                        <ul className="space-y-2 pt-2 text-xs text-white/80">
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-amber shrink-0" />
                                <span>{isEn ? 'Automatic Document Capture OCR matching' : 'Automatische Document Capture OCR matching'}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-amber shrink-0" />
                                <span>{isEn ? '1-Click audit export for tax advisors' : '1-Klik audit rapportage voor uw fiscalist'}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Callout Banner */}
                <div className="p-8 md:p-12 rounded-3xl bg-linear-to-r from-amber/20 via-amber/10 to-transparent border border-amber/30 text-center flex flex-col items-center gap-6 shadow-xl">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                        {isEn
                            ? 'Ready to make your portfolio tax-audit proof?'
                            : 'Klaar om uw portefeuille 100% aangifte-klaar te maken?'}
                    </h2>
                    <p className="text-sm md:text-base text-white/80 max-w-2xl font-light">
                        {isEn
                            ? 'Experience how Emlinked automates rental invoicing, cost tracking, and bank reconciliation natively in Microsoft Business Central.'
                            : 'Ervaar zelf hoe Emlinked uw huurfacturatie, kostenregistratie en bankaflettering volautomatisch verwerkt binnen Microsoft Business Central.'}
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex h-12 items-center justify-center rounded-xl bg-amber hover:bg-amber-hover px-8 text-sm font-bold text-[#060e32] transition-all duration-200 shadow-xl hover:scale-105"
                    >
                        <span>{isEn ? 'Request a Demo' : 'Gratis demonstratie aanvragen'}</span>
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>
            </section>
        </main>
    );
}

