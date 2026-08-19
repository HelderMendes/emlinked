import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
    Calendar, 
    Clock, 
    User, 
    ArrowLeft, 
    Share2, 
    Sparkles, 
    ArrowRight,
    CheckCircle2
} from 'lucide-react';
import { sanityFetch } from '@/lib/sanity';
import { getImageUrl } from '@/sanity/image';
import { buildMetadata, DEFAULT_DOMAIN } from '@/lib/seo';
import { GlowingLink } from '@/components/ui/GlowingButton';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ArticleDetailPageProps {
    params: Promise<{ locale: string; slug: string }>;
}

async function getSanityArticleBySlug(slug: string, locale: string) {
    try {
        return await sanityFetch<any>({
            query: `*[_type == "article" && slug.current == $slug && language == $locale][0] {
                _id,
                title,
                "slug": slug.current,
                category,
                excerpt,
                readTime,
                publishedAt,
                authorName,
                imagePath,
                mainImage,
                body,
                seo {
                    seoTitle,
                    seoDescription,
                    canonical,
                    noIndex,
                    structuredData
                }
            }`,
            params: { slug, locale },
        });
    } catch (e) {
        console.error('Failed to fetch article from Sanity:', e);
        return null;
    }
}

async function getRelatedArticles(currentSlug: string, locale: string) {
    try {
        return await sanityFetch<any[]>({
            query: `*[_type == "article" && slug.current != $currentSlug && language == $locale][0...3] {
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
            params: { currentSlug, locale },
        });
    } catch (e) {
        return [];
    }
}

const fallbackArticlesBySlug: Record<string, any> = {
    'emlinked-versterkt-team-en-zet-koers-voor-verdere-groei-in-2026': {
        title: 'emlinked versterkt team en zet koers voor verdere groei in 2026',
        category: 'Organisatie',
        excerpt: 'Met de uitbreiding van ons team van wervingsspecialisten en software architecten versterkt emlinked haar marktpositie in vastgoedbeheer software en interim oplossingen.',
        readTime: '4 min leestijd',
        publishedAt: '2026-01-15T09:00:00Z',
        authorName: 'Raymond Perridon',
        imagePath: '/emlinked/news/Afbeeling-Iryna-en-Raymond-emlinked-versterkt-team-en-zet-koers-voor-verdere-groei-in-2026-1.png',
        paragraphs: [
            'Het nieuwe jaar staat bij emlinked in het teken van versnelde innovatie en verdere verdieping van onze dienstverlening. Door de aanhoudende vraag naar zowel gekwalificeerde interim specialisten als geavanceerde vastgoedbeheer apps op het Microsoft Dynamics 365 platform, breiden we ons kernteam verder uit.',
            'Onze unieke formule – de combinatie van hoogwaardige wervings- en interim-oplossingen met eigen native Business Central software – stelt organisaties in staat om operationele knelpunten direct op te lossen. Met het versterkte team kunnen we interim functies sneller invullen en software-ontwikkelingen met nog kortere oplevertijden realiseren.',
            'Als gespecialiseerde partner voor woningcorporaties, commerciële vastgoedbeheerders en publieke organisaties blijven we investeren in datagedreven recruitment en naadloze ERP-integraties.',
        ],
    },
    'emlinked-expands-team-and-sets-course-for-2026-growth': {
        title: 'emlinked expands team and sets course for further growth in 2026',
        category: 'Organisatie',
        excerpt: 'With the expansion of our recruitment specialists and software architects, emlinked strengthens its position in real estate management software and interim solutions.',
        readTime: '4 min read',
        publishedAt: '2026-01-15T09:00:00Z',
        authorName: 'Raymond Perridon',
        imagePath: '/emlinked/news/Afbeeling-Iryna-en-Raymond-emlinked-versterkt-team-en-zet-koers-voor-verdere-groei-in-2026-1.png',
        paragraphs: [
            'The new year at emlinked marks accelerated innovation and deeper client engagement. Driven by sustained demand for qualified interim specialists and native real estate management apps on Microsoft Dynamics 365 Business Central, we are expanding our core team.',
            'Our unique formula – combining executive interim placement with proprietary Business Central extensions – allows property organizations to resolve operational bottlenecks immediately.',
        ],
    },
    'wet-goed-verhuurderschap-wat-verandert-er-voor-vastgoedbeheerders': {
        title: 'Wet Goed Verhuurderschap: Wat verandert er voor vastgoedbeheerders?',
        category: 'Wet & Regelgeving',
        excerpt: 'Een compleet overzicht van de verplichtingen rond de Wet goed verhuurderschap en hoe je met de juiste software boetes en dossierachterstanden voorkomt.',
        readTime: '5 min leestijd',
        publishedAt: '2025-11-20T10:00:00Z',
        authorName: 'Raymond Perridon',
        imagePath: '/emlinked/news/Wet-Goed-Verhuurderschap-emlinked.jpg',
        paragraphs: [
            'De Wet goed verhuurderschap stelt landelijke regels aan het gedrag van verhuurders en beheerorganisaties. Het voorkomen van discriminatie, intimidatie en buitensporige borgsommen staat hierbij centraal.',
            'Voor vastgoedbeheerders betekent dit dat verhuurdossiers, schriftelijke overeenkomsten en informatievoorziening aan huurders tot in detail op orde moeten zijn. Met geautomatiseerde software-Workflows worden verplichte bijlagen en vergunning-statussen automatisch geregistreerd.',
        ],
    },
    'good-landlordship-act-what-changes-for-property-managers': {
        title: 'Good Landlordship Act: What changes for real estate managers?',
        category: 'Wet & Regelgeving',
        excerpt: 'A comprehensive guide to compliance requirements under the Dutch Good Landlordship Act and how automated software prevents administrative delays.',
        readTime: '5 min read',
        publishedAt: '2025-11-20T10:00:00Z',
        authorName: 'Raymond Perridon',
        imagePath: '/emlinked/news/Wet-Goed-Verhuurderschap-emlinked.jpg',
        paragraphs: [
            'The Dutch Good Landlordship Act enforces national standards for landlord and property manager conduct. Preventing discrimination, intimidation, and excessive security deposits is central to the legislation.',
            'Property managers must ensure tenant onboarding files and written disclosure notices are fully compliant. Automated ERP workflows simplify record-keeping and audit trails.',
        ],
    },
};

export async function generateMetadata({
    params,
}: ArticleDetailPageProps): Promise<Metadata> {
    const { locale, slug } = await params;
    const isEn = locale === 'en';
    const article = (await getSanityArticleBySlug(slug, locale)) || fallbackArticlesBySlug[slug];

    if (!article) {
        return buildMetadata({
            seo: null,
            fallbackTitle: isEn ? 'Article Not Found | emlinked' : 'Artikel Niet Gevonden | emlinked',
            fallbackDescription: '',
            canonicalUrl: `${DEFAULT_DOMAIN}/${locale}/nieuws`,
            locale,
        });
    }

    const canonicalUrl = `${DEFAULT_DOMAIN}${isEn ? `/en/news/${slug}` : `/nieuws/${slug}`}`;

    return buildMetadata({
        seo: article.seo,
        fallbackTitle: `${article.title} | emlinked Nieuws`,
        fallbackDescription: article.excerpt || '',
        canonicalUrl,
        locale,
    });
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
    const { locale, slug } = await params;
    const isEn = locale === 'en';
    const article = (await getSanityArticleBySlug(slug, locale)) || fallbackArticlesBySlug[slug];

    if (!article) {
        notFound();
    }

    const relatedArticles = await getRelatedArticles(slug, locale);
    const heroImgUrl = getImageUrl(article.mainImage, article.imagePath || '/emlinked/news/Wet-Goed-Verhuurderschap-emlinked.jpg');

    // JSON-LD Article Schema
    const canonicalPageUrl = `${DEFAULT_DOMAIN}${isEn ? `/en/news/${slug}` : `/nieuws/${slug}`}`;
    const jsonLdData = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'BlogPosting',
                '@id': `${canonicalPageUrl}#article`,
                url: canonicalPageUrl,
                headline: article.title,
                description: article.excerpt,
                image: `${DEFAULT_DOMAIN}${heroImgUrl}`,
                datePublished: article.publishedAt || '2026-01-01T00:00:00Z',
                inLanguage: isEn ? 'en-US' : 'nl-NL',
                author: {
                    '@type': 'Person',
                    name: article.authorName || 'Raymond Perridon',
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'emlinked',
                    logo: `${DEFAULT_DOMAIN}/emlinked/Emlinked_logo__liggend.svg`,
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

            {/* ── HEADER HERO (DARK TEXTURE NAVY WITH INTEGRATED 1/3 IMAGE) ── */}
            <header className='bg-texture-navy text-white relative py-16 px-6 border-b border-white/10'>
                <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10'>
                    {/* Image Column: Left side on desktop (lg:order-1), Order-last on mobile/tablet (order-2, 70% centered on md) */}
                    <div className='order-2 lg:order-1 lg:col-span-5 xl:col-span-4 w-full md:w-[70%] lg:w-full mx-auto relative'>
                        <div className='relative aspect-[4/3] rounded-2xl border-2 border-white/15 overflow-hidden shadow-2xl bg-slate-950 group'>
                            <Image
                                src={heroImgUrl}
                                alt={article.title}
                                fill
                                className='object-cover object-center group-hover:scale-105 transition-transform duration-500'
                                priority
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none' />
                        </div>
                    </div>

                    {/* Text Column: Right side on desktop (lg:order-2), Order-first on mobile/tablet (order-1) */}
                    <div className='order-1 lg:order-2 lg:col-span-7 xl:col-span-8 space-y-6 text-left'>
                        {/* Back Link */}
                        <Link
                            href={isEn ? '/en/news' : '/nieuws'}
                            className='inline-flex items-center gap-2 text-xs font-mono font-bold text-amber hover:text-white transition-colors'
                        >
                            <ArrowLeft className='w-4 h-4' />
                            <span>{isEn ? 'Back to News Overview' : 'Terug naar Nieuwsoverzicht'}</span>
                        </Link>

                        {/* Meta Row */}
                        <div className='flex flex-wrap items-center gap-4 text-xs font-mono text-amber'>
                            {article.category && (
                                <span className='px-3 py-1 rounded-full bg-amber/15 border border-amber/30 uppercase tracking-wider font-bold'>
                                    {article.category}
                                </span>
                            )}
                            {article.publishedAt && (
                                <span className='flex items-center gap-1.5 text-slate-300'>
                                    <Calendar className='w-3.5 h-3.5 text-amber' />
                                    <span>{new Date(article.publishedAt).toLocaleDateString(isEn ? 'en-US' : 'nl-NL', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                </span>
                            )}
                            {article.readTime && (
                                <span className='flex items-center gap-1.5 text-slate-300'>
                                    <Clock className='w-3.5 h-3.5 text-amber' />
                                    <span>{article.readTime}</span>
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className='font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-tight'>
                            {article.title}
                        </h1>

                        {/* Subtitle / Excerpt */}
                        {article.excerpt && (
                            <p className='text-slate-300 text-base md:text-lg leading-relaxed font-light'>
                                {article.excerpt}
                            </p>
                        )}

                        {/* Author & Share Row */}
                        <div className='pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4'>
                            <div className='flex items-center gap-3'>
                                <div className='w-10 h-10 rounded-full bg-amber/20 border border-amber/40 flex items-center justify-center text-amber font-mono font-bold text-sm'>
                                    {article.authorName ? article.authorName.charAt(0) : 'R'}
                                </div>
                                <div>
                                    <div className='text-xs font-bold text-white'>{article.authorName || 'Raymond Perridon'}</div>
                                    <div className='text-[10px] text-amber font-mono'>{isEn ? 'emlinked Executive Team' : 'emlinked Management'}</div>
                                </div>
                            </div>

                            <div className='flex items-center gap-2'>
                                <a
                                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalPageUrl)}`}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 text-xs font-mono font-semibold text-slate-200 hover:text-white hover:bg-white/20 transition-all flex items-center gap-2'
                                >
                                    <svg className='w-3.5 h-3.5 fill-current text-amber' viewBox='0 0 24 24'>
                                        <path d='M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z' />
                                    </svg>
                                    <span>Share</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* ── ARTICLE CONTENT SECTION (LIGHT BACKGROUND - STARTS IMMEDIATELY BELOW HERO) ── */}
            <article className='px-6 py-16 max-w-4xl mx-auto space-y-10 text-left relative z-10'>
                {/* Article Body Paragraphs */}
                <div className='prose prose-lg max-w-none text-slate-700 space-y-6 font-light leading-relaxed'>
                    {article.paragraphs ? (
                        article.paragraphs.map((p: string, idx: number) => (
                            <p key={idx} className='text-base md:text-lg text-slate-800 leading-relaxed'>
                                {p}
                            </p>
                        ))
                    ) : article.body ? (
                        Array.isArray(article.body) ? (
                            article.body.map((block: any, idx: number) => {
                                if (block._type === 'block' && block.children) {
                                    const text = block.children.map((c: any) => c.text).join('');
                                    if (block.style === 'h2') {
                                        return <h2 key={idx} className='font-display text-2xl font-bold text-darkblue pt-4'>{text}</h2>;
                                    }
                                    if (block.style === 'h3') {
                                        return <h3 key={idx} className='font-display text-xl font-bold text-darkblue pt-2'>{text}</h3>;
                                    }
                                    return <p key={idx} className='text-base md:text-lg text-slate-800 leading-relaxed'>{text}</p>;
                                }
                                return null;
                            })
                        ) : (
                            <p className='text-base md:text-lg text-slate-800 leading-relaxed'>{String(article.body)}</p>
                        )
                    ) : (
                        <p className='text-base md:text-lg text-slate-800 leading-relaxed'>
                            {article.excerpt}
                        </p>
                    )}
                </div>

                {/* Article Key Takeaways Card */}
                <div className='rounded-2xl border border-amber/30 bg-amber/5 p-6 md:p-8 space-y-4'>
                    <h4 className='font-display font-bold text-lg text-darkblue flex items-center gap-2'>
                        <Sparkles className='w-5 h-5 text-amber' />
                        <span>{isEn ? 'Key Takeaways for Real Estate Managers' : 'Belangrijkste inzichten voor vastgoedbeheerders'}</span>
                    </h4>
                    <ul className='space-y-2 text-xs md:text-sm text-slate-700'>
                        <li className='flex items-start gap-2.5'>
                            <CheckCircle2 className='w-4 h-4 text-amber shrink-0 mt-0.5' />
                            <span>{isEn ? 'Automating administrative compliance prevents penalties and backlog.' : 'Geautomatiseerde dossiervoering voorkomt achterstanden en juridische risico’s.'}</span>
                        </li>
                        <li className='flex items-start gap-2.5'>
                            <CheckCircle2 className='w-4 h-4 text-amber shrink-0 mt-0.5' />
                            <span>{isEn ? 'Microsoft Dynamics 365 BC integration provides real-time portfolio oversight.' : 'Microsoft Dynamics 365 BC integratie geeft direct inzicht in de complete portefeuille.'}</span>
                        </li>
                    </ul>
                </div>
            </article>

            {/* ── RELATED ARTICLES GRID ── */}
            {relatedArticles.length > 0 && (
                <section className='px-6 py-16 max-w-7xl mx-auto border-t border-slate-200 space-y-8'>
                    <div className='text-left space-y-2'>
                        <h3 className='font-display font-bold text-2xl text-darkblue'>
                            {isEn ? 'Related Articles' : 'Gerelateerde Artikelen'}
                        </h3>
                        <p className='text-xs text-slate-600 font-light'>
                            {isEn ? 'Explore more insights from our team.' : 'Lees meer inzichten van ons team.'}
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        {relatedArticles.map((rel) => {
                            const relImg = getImageUrl(rel.mainImage, rel.imagePath || '/emlinked/news/Wet-Goed-Verhuurderschap-emlinked.jpg');

                            return (
                                <div
                                    key={rel._id || rel.slug}
                                    className='group rounded-2xl border border-slate-200 bg-white text-slate-900 flex flex-col justify-between hover:border-amber/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden text-left'
                                >
                                    <div className='relative w-full h-44 bg-slate-100 overflow-hidden'>
                                        <Image
                                            src={relImg}
                                            alt={rel.title}
                                            fill
                                            className='object-cover object-center group-hover:scale-105 transition-transform duration-500'
                                        />
                                    </div>
                                    <div className='p-6 space-y-3 flex-1 flex flex-col justify-between'>
                                        <h4 className='font-display font-bold text-base text-darkblue group-hover:text-amber transition-colors line-clamp-2'>
                                            <Link href={isEn ? `/en/news/${rel.slug}` : `/nieuws/${rel.slug}`}>
                                                {rel.title}
                                            </Link>
                                        </h4>
                                        <Link
                                            href={isEn ? `/en/news/${rel.slug}` : `/nieuws/${rel.slug}`}
                                            className='inline-flex items-center gap-1.5 text-xs font-bold text-darkblue group-hover:text-amber transition-colors pt-2'
                                        >
                                            <span>{isEn ? 'Read Article' : 'Lees Artikel'}</span>
                                            <ArrowRight className='w-3.5 h-3.5' />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}
        </main>
    );
}
