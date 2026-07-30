import React from 'react';
import { Metadata } from 'next';
import { sanityFetch } from '@/lib/sanity';
import { HeroSection } from '@/components/blocks/HeroSection';
import {
    Newspaper,
    BookOpen,
    ArrowRight,
    TrendingUp,
    ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';

interface NieuwsPageProps {
    params: Promise<{ locale: string }>;
}

async function getSanityArticles(locale: string) {
    try {
        return await sanityFetch<any[]>({
            query: `*[_type == "article" && language == $locale] | order(_createdAt desc) {
                _id,
                title,
                "slug": slug.current,
                excerpt,
                publishedAt,
                mainImage
            }`,
            params: { locale },
        });
    } catch (e) {
        console.error('Failed to fetch articles from Sanity:', e);
        return [];
    }
}

export async function generateMetadata({
    params,
}: NieuwsPageProps): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === 'en';

    const title = isEn
        ? 'News & Knowledge Base Real Estate Management | Emlinked'
        : 'Nieuws & Kennisbank Vastgoedbeheer | Emlinked';

    const description = isEn
        ? 'Stay informed with the latest news on real estate software, Box 3 legislation updates, and Microsoft Dynamics 365 developments.'
        : 'Blijf op de hoogte van het laatste nieuws rondom vastgoedbeheer software, wetgeving, Box 3-ontwikkelingen en Microsoft Dynamics updates.';

    return {
        title,
        description,
        alternates: {
            canonical: isEn ? '/en/nieuws' : '/nieuws',
        },
    };
}

export default async function NieuwsPage({ params }: NieuwsPageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';
    const articles = await getSanityArticles(locale);

    const fallbackArticles = [
        {
            title: isEn
                ? 'Box 3 Tax Ruling: Actual vs. Forfaitaire Return in 2026'
                : 'Box 3 Heffing: Werkelijk vs. Forfaitair Rendement in 2026',
            slug: 'box3-check',
            excerpt: isEn
                ? 'Discover how the Dutch High Court ruling impacts property portfolio tax assessments and what expenses are deductible.'
                : 'Ontdek de impact van het Hoge Raad arrest op je vastgoedportefeuille en welke kosten aftrekbaar zijn.',
            date: '2026-07-15',
            badge: isEn ? 'Tax & Legislation' : 'Wet & Regelgeving',
        },
        {
            title: isEn
                ? 'Automating CPI Indexations in Microsoft Dynamics 365 BC'
                : 'CPI-Indexaties Automatiseren in Microsoft Dynamics 365 BC',
            slug: 'vastgoedbeheer-software',
            excerpt: isEn
                ? 'Eliminate Excel spreadsheets for lease indexation. Automatic fetching of CBS statistics natively in Business Central.'
                : 'Geen handmatige Excel-bestanden meer voor huurindexering. Automatische ophaal van CBS-statistieken.',
            date: '2026-06-28',
            badge: isEn ? 'Automation' : 'Automatisering',
        },
        {
            title: isEn
                ? 'SEPA Direct Debit & PSD2 Bank Reconciliation for Property Managers'
                : 'SEPA Incasso & PSD2 Bankaflettering voor Vastgoedbeheerders',
            slug: 'payment-software',
            excerpt: isEn
                ? 'How modern payment automation speeds up tenant collections and eliminates manual ledger reconciliation.'
                : 'Hoe moderne betalingsautomatisering huurincasso versnelt en handmatige aflettering overbodig maakt.',
            date: '2026-05-10',
            badge: isEn ? 'Finance' : 'Financieel',
        },
    ];

    return (
        <main className="flex-1 bg-[url('/hero/bkg_darkBlue.jpg')] bg-cover bg-center bg-no-repeat text-white">
            <HeroSection
                label={
                    isEn
                        ? 'KNOWLEDGE BASE & INSIGHTS'
                        : 'KENNISBANK & INZICHTEN'
                }
                title={
                    isEn
                        ? 'News, insights, and *property management tips*'
                        : 'Nieuws, inzichten en *vastgoedbeheer tips*'
                }
                subtitle={
                    isEn
                        ? 'Stay informed with the latest news on real estate software, Box 3 legislation updates, and Microsoft Dynamics 365 developments.'
                        : 'Blijf op de hoogte van het laatste nieuws rondom vastgoedbeheer software, wetgeving, Box 3-ontwikkelingen en Microsoft Dynamics updates.'
                }
                locale={locale}
            />

            <section className='px-6 py-16 max-w-7xl mx-auto space-y-12'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {(articles.length > 0 ? articles : fallbackArticles).map(
                        (art: any, idx: number) => (
                            <div
                                key={art._id || idx}
                                className='p-8 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col justify-between hover:border-amber/30 transition-all space-y-6'
                            >
                                <div className='space-y-4'>
                                    <div className='flex justify-between items-center text-xs text-amber font-mono font-bold'>
                                        <span>
                                            {art.badge ||
                                                (isEn ? 'Article' : 'Artikel')}
                                        </span>
                                        {art.date && (
                                            <span className='text-slate-400 font-normal'>
                                                {art.date}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className='text-xl font-bold text-white leading-snug'>
                                        {art.title}
                                    </h3>
                                    <p className='text-sm text-slate-300 leading-relaxed'>
                                        {art.excerpt}
                                    </p>
                                </div>
                                <Link
                                    href={
                                        isEn
                                            ? `/en/${art.slug}`
                                            : `/${art.slug}`
                                    }
                                    className='text-amber text-sm font-bold flex items-center gap-2 hover:underline pt-2'
                                >
                                    {isEn ? 'Read Article' : 'Lees Artikel'}
                                    <ArrowRight className='h-4 w-4' />
                                </Link>
                            </div>
                        ),
                    )}
                </div>

                <div className='p-10 rounded-2xl bg-gradient-to-r from-amber/10 to-amber/5 border border-amber/20 text-center flex flex-col items-center gap-6'>
                    <h2 className='text-2xl md:text-3xl font-extrabold text-white'>
                        {isEn
                            ? 'Want to receive Box 3 & ERP updates in your inbox?'
                            : 'Box 3 & ERP-updates in je inbox ontvangen?'}
                    </h2>
                    <p className='text-slate-300 max-w-2xl text-sm md:text-base'>
                        {isEn
                            ? 'Contact our team for advisory notes or request a live demonstration of Emlinked.'
                            : 'Neem contact op met ons team voor persoonlijk advies over vastgoedbeheer software en wetgeving.'}
                    </p>
                    <Link
                        href={isEn ? '/en/contact' : '/contact'}
                        className='px-8 py-3.5 rounded-xl bg-amber text-slate-950 font-bold hover:bg-amber-light transition-all shadow-lg flex items-center gap-2'
                    >
                        {isEn ? 'Get in Touch' : 'Neem Contact Op'}
                        <ArrowRight className='h-4 w-4' />
                    </Link>
                </div>
            </section>
        </main>
    );
}
