import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { sanityFetch } from '@/lib/sanity';
import { HeroSection } from '@/components/blocks/HeroSection';
import { NewsArticlesSection, NewsArticleItem } from '@/components/nieuws/NewsArticlesSection';
import { buildMetadata, DEFAULT_DOMAIN } from '@/lib/seo';
import { GlowingLink } from '@/components/ui/GlowingButton';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface NieuwsPageProps {
    params: Promise<{ locale: string }>;
}

async function getSanityArticles(locale: string): Promise<NewsArticleItem[]> {
    try {
        const data = await sanityFetch<any[]>({
            query: `*[_type == "article" && language == $locale] | order(publishedAt desc) {
                _id,
                title,
                "slug": slug.current,
                category,
                excerpt,
                readTime,
                publishedAt,
                authorName,
                imagePath,
                mainImage
            }`,
            params: { locale },
        });
        return data || [];
    } catch (e) {
        console.error('Failed to fetch articles from Sanity:', e);
        return [];
    }
}

async function getSanityNewsPageData(locale: string) {
    try {
        const pageId = locale === 'en' ? 'page-nieuws-en' : 'page-nieuws-nl';
        return await sanityFetch<any>({
            query: `*[_type == "page" && (_id == $pageId || (slug.current == $slug && language == $locale))][0] {
                _id,
                title,
                "slug": slug.current,
                seo {
                    seoTitle,
                    seoDescription,
                    canonical,
                    noIndex,
                    structuredData
                }
            }`,
            params: {
                pageId,
                slug: locale === 'en' ? 'news' : 'nieuws',
                locale,
            },
        });
    } catch (e) {
        console.error('Failed to fetch news page data from Sanity:', e);
        return null;
    }
}

export async function generateMetadata({
    params,
}: NieuwsPageProps): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getSanityNewsPageData(locale);

    const fallbackTitle = isEn
        ? 'News & Knowledge Base Real Estate Management'
        : 'Nieuws & Kennisbank Vastgoedbeheer';
    const fallbackDescription = isEn
        ? 'Stay informed with the latest news on real estate software, Box 3 legislation updates, and Microsoft Dynamics 365 developments.'
        : 'Blijf op de hoogte van het laatste nieuws rondom vastgoedbeheer software, wetgeving, Box 3-ontwikkelingen en Microsoft Dynamics updates.';
    const canonicalUrl = `${DEFAULT_DOMAIN}${isEn ? '/en/news' : '/nieuws'}`;

    return buildMetadata({
        seo: pageData?.seo,
        fallbackTitle,
        fallbackDescription,
        canonicalUrl,
        locale,
    });
}

const fallbackArticles: Record<'nl' | 'en', NewsArticleItem[]> = {
    nl: [
        {
            _id: 'art-1',
            title: 'emlinked versterkt team en zet koers voor verdere groei in 2026',
            slug: 'emlinked-versterkt-team-en-zet-koers-voor-verdere-groei-in-2026',
            category: 'Organisatie',
            excerpt: 'Met de uitbreiding van ons team van wervingsspecialisten en software architecten versterkt emlinked haar marktpositie in vastgoedbeheer software en interim oplossingen.',
            readTime: '4 min leestijd',
            publishedAt: '2026-01-15T09:00:00Z',
            authorName: 'Raymond Perridon',
            imagePath: '/emlinked/news/Afbeeling-Iryna-en-Raymond-emlinked-versterkt-team-en-zet-koers-voor-verdere-groei-in-2026-1.png',
        },
        {
            _id: 'art-2',
            title: 'Wet Goed Verhuurderschap: Wat verandert er voor vastgoedbeheerders?',
            slug: 'wet-goed-verhuurderschap-wat-verandert-er-voor-vastgoedbeheerders',
            category: 'Wet & Regelgeving',
            excerpt: 'Een compleet overzicht van de verplichtingen rond de Wet goed verhuurderschap en hoe je met de juiste software boetes en dossierachterstanden voorkomt.',
            readTime: '5 min leestijd',
            publishedAt: '2025-11-20T10:00:00Z',
            authorName: 'Raymond Perridon',
            imagePath: '/emlinked/news/Wet-Goed-Verhuurderschap-emlinked.jpg',
        },
        {
            _id: 'art-3',
            title: 'Vast huurcontract vs. Flexibel huurcontract: Juridische en financiële impact',
            slug: 'vast-huurcontract-vs-flexibel-huurcontract-juridische-en-financiele-impact',
            category: 'Vastgoedbeheer',
            excerpt: 'De Wet vaste huurcontracten herstelt de vaste huurovereenkomst als norm. Wat betekent dit voor de exploitatierendementen van vastgoedbeleggers?',
            readTime: '6 min leestijd',
            publishedAt: '2025-09-12T11:00:00Z',
            authorName: 'Raymond Perridon',
            imagePath: '/emlinked/news/Vast_huurcontract_vs_flexibele_huurcontract_01-scaled.jpeg',
        },
        {
            _id: 'art-4',
            title: 'Box 3 Rendement 2026: Werkelijk rendement vs. Forfaitaire heffing',
            slug: 'box-3-rendement-2026-werkelijk-rendement-vs-forfaitaire-heffing',
            category: 'Wet & Regelgeving',
            excerpt: 'De juridische uitspraken rondom Box 3 dwingen vastgoedbeleggers om werkelijke inkomsten en direct toewijsbare kosten nauwkeurig te registreren.',
            readTime: '5 min leestijd',
            publishedAt: '2025-06-05T08:30:00Z',
            authorName: 'Manfred',
            imagePath: '/emlinked/news/Box3_Administratie.jpg',
        },
        {
            _id: 'art-5',
            title: 'Geautomatiseerde incasso & bankaflettering in Business Central 23',
            slug: 'geautomatiseerde-incasso-en-bankaflettering-in-business-central-23',
            category: 'ERP & Business Central',
            excerpt: 'Hoe native SEPA-extensies en PSD2-bankkoppelingen handmatig afletterwerk met 95% verminderen voor professionele vastgoedbeheerders.',
            readTime: '4 min leestijd',
            publishedAt: '2025-03-18T14:00:00Z',
            authorName: 'Ebenezer',
            imagePath: '/emlinked/news/Business-Central-23.jpg',
        },
        {
            _id: 'art-6',
            title: 'Online vastgoedbeheer software: De overstap van Excel naar ERP',
            slug: 'online-vastgoedbeheer-software-de-overstap-van-excel-naar-erp',
            category: 'Vastgoedbeheer',
            excerpt: 'Excel voldoet bij kleine portefeuilles, maar leidt bij groei tot foutgevoelige indexaties en achterstallige incasso’s. Waarom overstappen op cloud ERP?',
            readTime: '5 min leestijd',
            publishedAt: '2025-01-10T10:00:00Z',
            authorName: 'Iryna Samiliak',
            imagePath: '/emlinked/news/Online-vastgoedbeheer-software-.jpg',
        },
    ],
    en: [
        {
            _id: 'art-1-en',
            title: 'emlinked expands team and sets course for further growth in 2026',
            slug: 'emlinked-expands-team-and-sets-course-for-2026-growth',
            category: 'Organisatie',
            excerpt: 'With the expansion of our recruitment specialists and software architects, emlinked strengthens its position in real estate management software and interim solutions.',
            readTime: '4 min read',
            publishedAt: '2026-01-15T09:00:00Z',
            authorName: 'Raymond Perridon',
            imagePath: '/emlinked/news/Afbeeling-Iryna-en-Raymond-emlinked-versterkt-team-en-zet-koers-voor-verdere-groei-in-2026-1.png',
        },
        {
            _id: 'art-2-en',
            title: 'Good Landlordship Act: What changes for real estate managers?',
            slug: 'good-landlordship-act-what-changes-for-property-managers',
            category: 'Wet & Regelgeving',
            excerpt: 'A comprehensive guide to compliance requirements under the Dutch Good Landlordship Act and how automated software prevents administrative delays.',
            readTime: '5 min read',
            publishedAt: '2025-11-20T10:00:00Z',
            authorName: 'Raymond Perridon',
            imagePath: '/emlinked/news/Wet-Goed-Verhuurderschap-emlinked.jpg',
        },
        {
            _id: 'art-3-en',
            title: 'Permanent vs. Flexible Lease Agreements: Legal and financial impact',
            slug: 'permanent-vs-flexible-lease-agreements-legal-and-financial-impact',
            category: 'Vastgoedbeheer',
            excerpt: 'The Dutch Fixed Lease Act restores indefinite lease contracts as standard. What does this mean for property portfolio yields?',
            readTime: '6 min read',
            publishedAt: '2025-09-12T11:00:00Z',
            authorName: 'Raymond Perridon',
            imagePath: '/emlinked/news/Vast_huurcontract_vs_flexibele_huurcontract_01-scaled.jpeg',
        },
        {
            _id: 'art-4-en',
            title: 'Box 3 Tax 2026: Actual returns vs. Statutory rate in the Netherlands',
            slug: 'box-3-tax-2026-actual-returns-vs-statutory-rate',
            category: 'Wet & Regelgeving',
            excerpt: 'Supreme Court rulings force real estate investors to track actual rental yields and directly attributable maintenance expenses.',
            readTime: '5 min read',
            publishedAt: '2025-06-05T08:30:00Z',
            authorName: 'Manfred',
            imagePath: '/emlinked/news/Box3_Administratie.jpg',
        },
        {
            _id: 'art-5-en',
            title: 'Automated direct debit & bank reconciliation in Business Central 23',
            slug: 'automated-direct-debit-and-bank-reconciliation-in-business-central-23',
            category: 'ERP & Business Central',
            excerpt: 'How native SEPA extensions and PSD2 banking APIs eliminate manual ledger matching by up to 95% for property management companies.',
            readTime: '4 min read',
            publishedAt: '2025-03-18T14:00:00Z',
            authorName: 'Ebenezer',
            imagePath: '/emlinked/news/Business-Central-23.jpg',
        },
        {
            _id: 'art-6-en',
            title: 'Online real estate management software: Transitioning from Excel to ERP',
            slug: 'online-real-estate-management-software-transitioning-from-excel-to-erp',
            category: 'Vastgoedbeheer',
            excerpt: 'Excel works for small portfolios, but triggers error-prone indexations as portfolios scale. Why upgrade to native cloud ERP?',
            readTime: '5 min read',
            authorName: 'Iryna Samiliak',
            imagePath: '/emlinked/news/Online-vastgoedbeheer-software-.jpg',
        },
    ],
};

export default async function NieuwsPage({ params }: NieuwsPageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getSanityNewsPageData(locale);
    const sanityArticles = await getSanityArticles(locale);
    const articles = sanityArticles.length > 0 ? sanityArticles : (isEn ? fallbackArticles.en : fallbackArticles.nl);

    const pageBlocks = pageData?.pageBlocks || [];
    const heroBlock = pageBlocks.find((b: any) => b._type === 'heroBlock' || b._type === 'hero');
    const ctaBlock = pageBlocks.find((b: any) => b._type === 'ctaBlock' || b._type === 'ctaBanner' || b._type === 'cta');

    const heroLabel = heroBlock?.badge || (isEn ? 'KNOWLEDGE BASE & INSIGHTS' : 'KENNISBANK & INZICHTEN');
    const heroTitle = heroBlock?.tagline || (isEn ? 'News, insights, and *property management tips*' : 'Nieuws, inzichten en *vastgoedbeheer tips*');
    const heroSub = heroBlock?.description || (isEn ? 'Stay informed with the latest news on real estate software, Box 3 legislation updates, and Microsoft Dynamics 365 developments.' : 'Blijf op de hoogte van het laatste nieuws rondom vastgoedbeheer software, wetgeving, Box 3-ontwikkelingen en Microsoft Dynamics updates.');

    const ctaTitle = ctaBlock?.title || (isEn ? 'Stay ahead in the real estate market' : 'Blijf voorop lopen in de vastgoedmarkt');
    const ctaSub = ctaBlock?.subtitle || (isEn ? 'Want to discuss software, legislation, or the latest features in Business Central? Connect with our experts directly.' : 'Wil je sparren over software, wetgeving of de nieuwste functies in Business Central? Neem direct contact op met onze experts.');
    const ctaBtn = ctaBlock?.primaryCtaLabel || (isEn ? 'Get in touch' : 'Neem direct contact op');

    // JSON-LD CollectionPage Schema
    const canonicalPageUrl = `${DEFAULT_DOMAIN}${isEn ? '/en/news' : '/nieuws'}`;
    const jsonLdData = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'CollectionPage',
                '@id': `${canonicalPageUrl}#webpage`,
                url: canonicalPageUrl,
                name: isEn ? 'News & Knowledge Base | emlinked' : 'Nieuws & Kennisbank | emlinked',
                description: heroSub,
                inLanguage: isEn ? 'en-US' : 'nl-NL',
                isPartOf: {
                    '@type': 'WebSite',
                    '@id': `${DEFAULT_DOMAIN}/#website`,
                },
            },
        ],
    });

    return (
        <main className='flex-1 bg-background text-foreground relative overflow-hidden'>
            {/* Inject JSON-LD */}
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: jsonLdData }}
            />

            {/* ── HERO SECTION (DARK TEXTURE NAVY) ── */}
            <div className='bg-texture-navy text-white relative border-b border-white/10'>
                <HeroSection
                    label={heroLabel}
                    title={heroTitle}
                    subtitle={heroSub}
                    locale={locale}
                    showProof={false}
                />
            </div>

            {/* ── ARTICLES SECTION (LIGHT / INTERACTIVE FILTER) ── */}
            <NewsArticlesSection articles={articles} locale={locale} />

            {/* ── CTA CONVERSION BANNER ── */}
            <section className='px-6 py-20 relative z-10 max-w-7xl mx-auto'>
                <div className='relative rounded-3xl border border-amber/40 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 md:p-14 overflow-hidden text-center max-w-5xl mx-auto shadow-2xl text-white'>
                    <div className='absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber/10 rounded-full blur-[120px] pointer-events-none' />

                    <div className='relative z-10 space-y-6 max-w-3xl mx-auto'>
                        <span className='inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/15 px-4 py-1.5 text-xs font-mono font-bold tracking-wider text-amber uppercase backdrop-blur-md'>
                            <Mail className='w-3.5 h-3.5 text-amber' />
                            {isEn ? 'STAY INFORMED' : 'BLIJF OP DE HOOGTE'}
                        </span>

                        <h2 className='font-display font-bold text-3xl md:text-4xl lg:text-[2.75rem] text-white leading-tight'>
                            {ctaTitle}
                        </h2>

                        <p className='text-slate-300 text-base md:text-lg leading-relaxed font-light'>
                            {ctaSub}
                        </p>

                        <div className='flex flex-col sm:flex-row justify-center items-center gap-4 pt-4'>
                            <GlowingLink
                                href={isEn ? '/en/contact' : '/contact'}
                                className='inline-flex h-14 items-center justify-center rounded-2xl border-0 bg-gradient-to-r from-[#FF9500] via-[#FF5E00] to-[#FF3B00] hover:brightness-110 px-8 text-base font-bold text-white transition-all duration-200 shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98]'
                            >
                                <span className='flex items-center justify-center gap-2 text-white'>
                                    <span>{ctaBtn}</span>
                                    <ArrowRight className='w-5 h-5 text-white' />
                                </span>
                            </GlowingLink>

                            <Link
                                href={isEn ? '/en/apps' : '/apps'}
                                className='inline-flex h-14 items-center justify-center rounded-2xl border border-white/20 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 transition-all text-center shadow-sm hover:scale-[1.02] active:scale-[0.98] duration-200'
                            >
                                {isEn ? 'Explore our solutions →' : 'Bekijk onze oplossingen →'}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
