import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import {
    Calendar,
    Clock,
    ArrowLeft,
    Sparkles,
    ArrowRight,
    CheckCircle2,
} from 'lucide-react';
import { PortableText, PortableTextComponents } from 'next-sanity';
import { sanityFetch } from '@/lib/sanity';
import { getImageUrl, SanityImageLike } from '@/sanity/image';
import { buildMetadata, DEFAULT_DOMAIN, SeoDataInput } from '@/lib/seo';
import {
    formatArticleCategory,
    normalizeArticleCategoryKey,
} from '@/lib/articleCategories';

export const revalidate = 60;

interface PortableTextSpanLike {
    _type: string;
    text?: string;
}

interface PortableTextBlockLike {
    _type: string;
    style?: string;
    children?: PortableTextSpanLike[];
    [key: string]: unknown;
}

interface Article {
    _id?: string;
    title: string;
    slug?: string;
    category?: string;
    excerpt?: string;
    keyTakeaways?: string[];
    readTime?: string;
    publishedAt?: string;
    authorName?: string;
    imagePath?: string;
    mainImage?: SanityImageLike;
    body?: PortableTextBlockLike[];
    seo?: SeoDataInput;
    paragraphs?: string[];
    translation?: { slug: string; language: string } | null;
}

type RelatedArticle = Pick<
    Article,
    | '_id'
    | 'title'
    | 'slug'
    | 'category'
    | 'excerpt'
    | 'readTime'
    | 'publishedAt'
    | 'authorName'
    | 'imagePath'
    | 'mainImage'
>;

const portableTextComponents: PortableTextComponents = {
    marks: {
        strong: ({ children }: { children?: React.ReactNode }) => (
            <strong className='font-bold text-slate-900'>{children}</strong>
        ),
        em: ({ children }: { children?: React.ReactNode }) => (
            <em className='italic'>{children}</em>
        ),
        code: ({ children }: { children?: React.ReactNode }) => (
            <code className='bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-teal'>
                {children}
            </code>
        ),
        underline: ({ children }: { children?: React.ReactNode }) => (
            <u className='underline underline-offset-4'>{children}</u>
        ),
        'strike-through': ({ children }: { children?: React.ReactNode }) => (
            <span className='line-through'>{children}</span>
        ),
        link: ({
            value,
            children,
        }: {
            value?: { href?: string };
            children?: React.ReactNode;
        }) => {
            const href = value?.href || '#';
            const target = href.startsWith('http') ? '_blank' : undefined;
            return (
                <a
                    href={href}
                    target={target}
                    rel={target ? 'noopener noreferrer' : undefined}
                    className='text-teal hover:text-darkblue underline font-semibold transition-colors'
                >
                    {children}
                </a>
            );
        },
    },
    block: {
        h2: ({ children }: { children?: React.ReactNode }) => (
            <h2 className='font-display text-2xl md:text-3xl font-bold text-darkblue pt-6 pb-2 leading-tight'>
                {children}
            </h2>
        ),
        h3: ({ children }: { children?: React.ReactNode }) => (
            <h3 className='font-display text-xl md:text-2xl font-bold text-darkblue pt-4 pb-2 leading-tight'>
                {children}
            </h3>
        ),
        h4: ({ children }: { children?: React.ReactNode }) => (
            <h4 className='text-lg font-bold text-darkblue pt-3 pb-1'>
                {children}
            </h4>
        ),
        normal: ({ children }: { children?: React.ReactNode }) => (
            <p className='text-base md:text-lg text-slate-800 leading-relaxed my-4'>
                {children}
            </p>
        ),
        blockquote: ({ children }: { children?: React.ReactNode }) => (
            <blockquote className='border-l-4 border-teal pl-4 italic text-slate-700 my-6 py-2 bg-teal/5 rounded-r-lg font-serif'>
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }: { children?: React.ReactNode }) => (
            <ul className='list-disc list-inside space-y-2 my-4 text-slate-800 text-base md:text-lg'>
                {children}
            </ul>
        ),
        number: ({ children }: { children?: React.ReactNode }) => (
            <ol className='list-decimal list-inside space-y-2 my-4 text-slate-800 text-base md:text-lg'>
                {children}
            </ol>
        ),
    },
    listItem: {
        bullet: ({ children }: { children?: React.ReactNode }) => (
            <li className='leading-relaxed'>{children}</li>
        ),
        number: ({ children }: { children?: React.ReactNode }) => (
            <li className='leading-relaxed'>{children}</li>
        ),
    },
};

interface ArticleDetailPageProps {
    params: Promise<{ locale: string; slug: string }>;
}

async function getSanityArticleBySlug(
    slug: string,
    locale: string,
): Promise<Article | null> {
    try {
        return await sanityFetch<Article | null>({
            query: `*[_type == "article" && slug.current == $slug && language == $locale][0] {
                _id,
                title,
                "slug": slug.current,
                category,
                excerpt,
                keyTakeaways,
                readTime,
                publishedAt,
                authorName,
                imagePath,
                mainImage,
                body,
                "translation": translationRef-> {
                    "slug": slug.current,
                    language
                },
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

// A slug that belongs to the OTHER language's article (e.g. the NL slug
// visited under /en/news/...) used to silently render that article's
// content under the wrong URL via the coalesce() fallback this replaces.
// If that article has a linked translation in the requested locale, 301
// there; otherwise this slug genuinely doesn't exist in this locale, so the
// caller 404s instead of guessing.
async function getArticleCrossLanguageRedirectPath(
    slug: string,
    locale: string,
): Promise<string | null> {
    try {
        const translation = await sanityFetch<{
            slug?: string;
            language?: string;
        } | null>({
            query: `*[_type == "article" && slug.current == $slug && language != $locale][0].translationRef-> {
                "slug": slug.current,
                language
            }`,
            params: { slug, locale },
        });
        if (translation?.slug && translation.language === locale) {
            return locale === 'en'
                ? `/en/news/${translation.slug}`
                : `/nieuws/${translation.slug}`;
        }
    } catch (e) {
        console.error(
            'Failed to resolve article cross-language redirect:',
            e,
        );
    }
    return null;
}

async function getRelatedArticles(
    currentArticle: Article | null,
    locale: string,
): Promise<RelatedArticle[]> {
    if (!currentArticle) return [];
    const currentSlug = currentArticle.slug;
    const currentCategory = currentArticle.category || '';
    const currentTitle = currentArticle.title || '';
    const currentWords = new Set(
        currentTitle
            .toLowerCase()
            .split(/\s+/)
            .filter((w: string) => w.length > 3),
    );

    try {
        // 1. Fetch candidate pool (up to 12 candidates in same language)
        const candidates = await sanityFetch<RelatedArticle[]>({
            query: `*[_type == "article" && slug.current != $currentSlug && language == $locale][0...12] {
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

        if (!candidates || candidates.length === 0) return [];

        const now = Date.now();

        // 2. Multi-factor scoring for each candidate
        const normalizedCurrentCat =
            normalizeArticleCategoryKey(currentCategory);
        const scoredCandidates = candidates.map((candidate) => {
            // A. Category Match (20% weight)
            const categoryScore =
                normalizeArticleCategoryKey(candidate.category) ===
                normalizedCurrentCat
                    ? 100
                    : 0;

            // B. Relevance / Keyword Overlap (40% weight)
            const candidateWords = (candidate.title || '')
                .toLowerCase()
                .split(/\s+/)
                .filter((w: string) => w.length > 3);
            let overlapCount = 0;
            candidateWords.forEach((w: string) => {
                if (currentWords.has(w)) overlapCount++;
            });
            const relevanceScore =
                candidateWords.length > 0
                    ? Math.min(
                          100,
                          (overlapCount / candidateWords.length) * 200,
                      )
                    : 0;

            // C. Freshness / Recency (15% weight)
            const pubTime = candidate.publishedAt
                ? new Date(candidate.publishedAt).getTime()
                : now;
            const daysOld = Math.max(
                0,
                (now - pubTime) / (1000 * 60 * 60 * 24),
            );
            const freshnessScore = Math.max(0, 100 - daysOld / 3.65); // Soft decay over 1 year

            // D. Serendipity / Randomness (10% weight)
            const randomnessScore = Math.random() * 100;

            // Weighted composite score formula
            const totalScore =
                relevanceScore * 0.4 +
                categoryScore * 0.2 +
                freshnessScore * 0.15 +
                randomnessScore * 0.25;

            return { candidate, totalScore };
        });

        // 3. Sort candidates by total score descending
        scoredCandidates.sort((a, b) => b.totalScore - a.totalScore);

        // 4. Select top 3 with Diversity Enforcement (max 2 from same category)
        const selected: RelatedArticle[] = [];
        const categoryCounts: Record<string, number> = {};

        for (const item of scoredCandidates) {
            const cat =
                normalizeArticleCategoryKey(item.candidate.category) ||
                'General';
            const count = categoryCounts[cat] || 0;

            if (count < 2 || selected.length >= candidates.length - 1) {
                selected.push(item.candidate);
                categoryCounts[cat] = count + 1;
            }

            if (selected.length >= 3) break;
        }

        // Fallback if diversity filter yields less than 3
        if (selected.length < 3) {
            for (const item of scoredCandidates) {
                if (!selected.some((s) => s.slug === item.candidate.slug)) {
                    selected.push(item.candidate);
                }
                if (selected.length >= 3) break;
            }
        }

        return selected;
    } catch (e) {
        console.error('Error in getRelatedArticles content recirculation:', e);
        return [];
    }
}

const fallbackArticlesBySlug: Record<string, Article> = {
    'emlinked-versterkt-team-en-zet-koers-voor-verdere-groei-in-2026': {
        title: 'emlinked versterkt team en zet koers voor verdere groei in 2026',
        category: 'Bedrijfsnieuws',
        excerpt:
            'emlinked verwelkomt Iryna Samiliak terug als Operationeel Directeur en zet in 2026 in op persoonlijkere klantondersteuning en sterkere operationele processen.',
        readTime: '3 min leestijd',
        publishedAt: '2026-01-08T09:00:00Z',
        authorName: 'Raymond Perridon',
        imagePath:
            '/emlinked/news/Afbeeling-Iryna-en-Raymond-emlinked-versterkt-team-en-zet-koers-voor-verdere-groei-in-2026-1.png',
        paragraphs: [
            'Naarden, 8 januari 2026 — emlinked, toonaangevende Nederlandse leverancier van integrale online vastgoedmanagementsoftware, kijkt met enthousiasme vooruit op 2026 en maakt een belangrijke personele uitbreiding bekend. Met de terugkeer van Iryna Samiliak als Operationeel Directeur zet emlinked een volgende stap in het verder professionaliseren van haar dienstverlening aan vastgoedprofessionals.',
            'emlinked spreekt allereerst haar waardering uit voor het vertrouwen en de samenwerking van klanten en partners in het afgelopen jaar. Met de versterking van het team en een heldere strategische focus is de organisatie klaar om de dienstverlening verder uit te bouwen en klanten nog beter te ondersteunen.',
            'Met de komst van Iryna wil emlinked haar dienstverlening verder optimaliseren, met extra aandacht voor consistente en persoonlijke klantondersteuning, versterkte operationele processen en duurzame samenwerking met klanten en partners.',
        ],
    },
    'emlinked-expands-team-and-sets-course-for-2026-growth': {
        title: 'emlinked expands team and sets course for further growth in 2026',
        category: 'Bedrijfsnieuws',
        excerpt:
            'emlinked welcomes back Iryna Samiliak as Chief Operating Officer and focuses on more personal customer support and stronger operational processes in 2026.',
        readTime: '3 min read',
        publishedAt: '2026-01-08T09:00:00Z',
        authorName: 'Raymond Perridon',
        imagePath:
            '/emlinked/news/Afbeeling-Iryna-en-Raymond-emlinked-versterkt-team-en-zet-koers-voor-verdere-groei-in-2026-1.png',
        paragraphs: [
            'Naarden, January 8, 2026 — emlinked, a leading Dutch provider of integrated online real estate management software, looks ahead to 2026 with enthusiasm and announces a significant team expansion. With the return of Iryna Samiliak as Chief Operating Officer, emlinked takes the next step in further professionalizing its service to real estate professionals.',
            'emlinked first wants to express its appreciation for the trust and collaboration of clients and partners over the past year. With a strengthened team and a clear strategic focus, the organization is ready to further build out its services and support clients even better.',
            'With Iryna joining, emlinked wants to further optimize its service, with extra attention to consistent and personal customer support, strengthened operational processes, and lasting collaboration with clients and partners.',
        ],
    },
    'wet-goed-verhuurderschap-wat-verandert-er-voor-vastgoedbeheerders': {
        title: 'Wet Goed Verhuurderschap: Wat verandert er voor vastgoedbeheerders?',
        category: 'Wet- en regelgeving',
        excerpt:
            'Een compleet overzicht van de verplichtingen rond de Wet goed verhuurderschap en hoe je met de juiste software boetes en dossierachterstanden voorkomt.',
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
        category: 'Wet- en regelgeving',
        excerpt:
            'A comprehensive guide to compliance requirements under the Dutch Good Landlordship Act and how automated software prevents administrative delays.',
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
    const article =
        (await getSanityArticleBySlug(slug, locale)) ||
        fallbackArticlesBySlug[slug];

    if (!article) {
        const redirectPath = await getArticleCrossLanguageRedirectPath(
            slug,
            locale,
        );
        if (redirectPath) {
            permanentRedirect(redirectPath);
        }
        return {
            title: isEn
                ? '404 - Article Not Found | emlinked'
                : '404 - Artikel Niet Gevonden | emlinked',
            robots: { index: false, follow: false },
        };
    }

    const canonicalUrl = `${DEFAULT_DOMAIN}${isEn ? `/en/news/${slug}` : `/nieuws/${slug}`}`;

    const metadata = buildMetadata({
        seo: article.seo,
        fallbackTitle: `${article.title} | emlinked Nieuws`,
        fallbackDescription: article.excerpt || '',
        canonicalUrl,
        locale,
    });

    // Articles' NL/EN slugs aren't a deterministic transform of each other
    // (unlike most other pages), so override the generic slug-swap hreflang
    // with the real translation address from Sanity's translationRef —
    // omitting the alternate entirely when no translation is linked yet,
    // rather than guessing a wrong address.
    const translation = article.translation;
    const nlUrl = !isEn
        ? canonicalUrl
        : translation?.language === 'nl'
          ? `${DEFAULT_DOMAIN}/nieuws/${translation.slug}`
          : undefined;
    const enUrl = isEn
        ? canonicalUrl
        : translation?.language === 'en'
          ? `${DEFAULT_DOMAIN}/en/news/${translation.slug}`
          : undefined;

    const languages: Record<string, string> = {};
    if (nlUrl) languages.nl = nlUrl;
    if (enUrl) languages.en = enUrl;
    languages['x-default'] = nlUrl || canonicalUrl;

    return {
        ...metadata,
        alternates: {
            ...metadata.alternates,
            languages,
        },
    };
}

function blockPlainText(block: PortableTextBlockLike | undefined): string {
    if (!block?.children) return '';
    return block.children
        .map((c) => c.text || '')
        .join('')
        .trim();
}

// Extracts Q&A pairs from the body's "Veelgestelde vragen" / "Frequently
// asked questions" section (if present) for FAQPage structured data —
// H3 blocks are questions, the normal-style blocks right after are the
// answer, up to the next H2/H3.
function extractFaqFromBody(
    body: PortableTextBlockLike[] | undefined,
): Array<{ question: string; answer: string }> {
    if (!Array.isArray(body)) return [];

    const faqHeadingIndex = body.findIndex(
        (block) =>
            block._type === 'block' &&
            block.style === 'h2' &&
            /veelgestelde vragen|frequently asked questions/i.test(
                blockPlainText(block),
            ),
    );
    if (faqHeadingIndex === -1) return [];

    const faqs: Array<{ question: string; answer: string }> = [];
    let currentQuestion: string | null = null;
    let currentAnswerParts: string[] = [];

    const flush = () => {
        if (currentQuestion && currentAnswerParts.length > 0) {
            faqs.push({
                question: currentQuestion,
                answer: currentAnswerParts.join(' '),
            });
        }
        currentQuestion = null;
        currentAnswerParts = [];
    };

    for (let i = faqHeadingIndex + 1; i < body.length; i++) {
        const block = body[i];
        if (block._type !== 'block') continue;

        if (block.style === 'h2') {
            flush();
            break; // left the FAQ section
        }
        if (block.style === 'h3') {
            flush();
            currentQuestion = blockPlainText(block);
        } else if (currentQuestion) {
            const text = blockPlainText(block);
            if (text) currentAnswerParts.push(text);
        }
    }
    flush();

    return faqs;
}

function getCuratedArticleFaqs(
    slug: string,
    isEn: boolean,
): Array<{ question: string; answer: string }> {
    const s = slug.toLowerCase();
    if (s.includes('box-3') || s.includes('box3')) {
        return isEn
            ? [
                  {
                      question:
                          'How does the Dutch Box 3 rebuttal scheme (tegenbewijsregeling) impact real estate investors?',
                      answer: 'Real estate investors can report their actual return instead of the statutory deemed return if their actual yield (rental income plus WOZ value change) is lower than the flat-rate assessment.',
                  },
                  {
                      question:
                          'Why is object-level accounting inside Business Central important for Box 3?',
                      answer: 'emlinked records rental revenue, vacancy, and maintenance invoices directly per property unit inside Microsoft Dynamics 365 Business Central, creating an audit-ready file for the Dutch Tax Administration.',
                  },
              ]
            : [
                  {
                      question:
                          'Wat houdt de Box 3-tegenbewijsregeling en Wet werkelijk rendement in voor vastgoedbeleggers?',
                      answer: 'Vastgoedbeleggers mogen hun werkelijk behaalde rendement (huurinkomsten plus WOZ-waardeontwikkeling) aantonen wanneer dit lager ligt dan het forfaitaire rendement van de Belastingdienst.',
                  },
                  {
                      question:
                          'Waarom is registratie op objectniveau in Business Central essentieel voor Box 3?',
                      answer: 'emlinked legt huuropbrengsten, leegstand en onderhoudskosten direct per pand en eenheid vast in Microsoft Dynamics 365 Business Central, zodat je een sluitend fiscaal dossier opbouwt.',
                  },
              ];
    }
    if (s.includes('goed-verhuurderschap') || s.includes('good-landlordship')) {
        return isEn
            ? [
                  {
                      question:
                          'What does the Dutch Good Landlordship Act require from property managers?',
                      answer: 'The Act enforces written transparency on tenant rights, a transparent breakdown of annual service charges, and documented complaint handlingprocedures, backed by municipal fines for non-compliance.',
                  },
                  {
                      question:
                          'How does emlinked support compliance with the Good Landlordship Act?',
                      answer: 'emlinked centralizes lease agreements, automates itemized service charge reconciliations, and logs all tenant communications and maintenance tickets via the 24/7 Tenant Portal.',
                  },
              ]
            : [
                  {
                      question:
                          'Wat verplicht de Wet goed verhuurderschap voor vastgoedbeheerders?',
                      answer: 'De wet verplicht verhuurders en beheerders tot schriftelijke informatieplicht, transparante specificatie van servicekosten en een vastgelegde klachten- en meldingsprocedure.',
                  },
                  {
                      question:
                          'Hoe ondersteunt emlinked naleving van de Wet goed verhuurderschap?',
                      answer: 'emlinked centraliseert huurdossiers, automatiseert gespecificeerde servicekostenafrekeningen en legt alle communicatie en meldingen vast via het 24/7 Huurdersportaal.',
                  },
              ];
    }
    if (s.includes('cpi') || s.includes('consumentenprijsindex')) {
        return isEn
            ? [
                  {
                      question:
                          'How does CBS CPI calculation impact annual rent indexation?',
                      answer: 'Statistics Netherlands (CBS) updates its methodology for energy and housing weights in the Consumer Price Index (CPI), directly determining the statutory and contractual rent indexation percentages.',
                  },
                  {
                      question:
                          'Can rent indexation letters be automated in Business Central?',
                      answer: 'Yes. emlinked imports CBS CPI series directly into Microsoft Dynamics 365 Business Central, calculates the new rent per lease, and distributes indexation notices automatically.',
                  },
              ]
            : [
                  {
                      question:
                          'Wat betekent de gewijzigde CBS CPI-methodiek voor de jaarlijkse huurindexatie?',
                      answer: 'Het Centraal Bureau voor de Statistiek (CBS) actualiseert de weging binnen de consumentenprijsindex (CPI), wat direct doorwerkt in de wettelijke en contractuele huurprijsindexering.',
                  },
                  {
                      question:
                          'Kun je huurindexatie en aanzeggingsbrieven automatiseren in Business Central?',
                      answer: 'Ja. emlinked leest de CBS CPI-reeks direct in binnen Microsoft Dynamics 365 Business Central, berekent de nieuwe huurtermijnen per contract en verstuurt automatisch de indexatiebrieven.',
                  },
              ];
    }
    if (
        s.includes('direct-banking') ||
        s.includes('incasso') ||
        s.includes('debt-collection') ||
        s.includes('direct-debit')
    ) {
        return isEn
            ? [
                  {
                      question:
                          'How does automated SEPA direct debit and bank reconciliation work in Business Central?',
                      answer: 'emlinked Payment Software and Direct Banking generate SEPA direct debit batches automatically and match incoming bank statements directly against open tenant ledger entries in Business Central.',
                  },
                  {
                      question:
                          'How are reversals (storneringen) and reminders handled?',
                      answer: 'Unpaid or reversed direct debits are flagged automatically in the debtor ledger, triggering structured payment reminders with a complete audit trail.',
                  },
              ]
            : [
                  {
                      question:
                          'Hoe werkt automatische SEPA-incasso en bankaflettering in Business Central?',
                      answer: 'emlinked Payment Software en Direct Banking genereren automatisch SEPA-incassobatches en letteren binnengekomen bankafschriften direct af tegen openstaande huurposten in Business Central.',
                  },
                  {
                      question:
                          'Hoe worden storneringen en betalingsherinneringen opgevolgd?',
                      answer: 'Gestorneerde incasso’s en onbetaalde huurtermijnen worden direct zichtbaar op de debiteurenkaart, waarna je gestructureerd herinneringen en aanmaningen verstuurt.',
                  },
              ];
    }
    if (s.includes('huurdersportaal') || s.includes('tenant-portal')) {
        return isEn
            ? [
                  {
                      question:
                          'What can tenants arrange themselves in the emlinked Tenant Portal?',
                      answer: 'Tenants can view lease agreements and invoices 24/7, pay open balances online, update contact details, and submit maintenance requests with photos directly synced to Business Central.',
                  },
              ]
            : [
                  {
                      question:
                          'Wat kunnen huurders zelf regelen in het emlinked Huurdersportaal?',
                      answer: 'Huurders kunnen 24/7 hun huurcontracten en facturen inzien, direct online betalen, contactgegevens wijzigen en servicemeldingen met foto’s indienen die realtime in Business Central landen.',
                  },
              ];
    }
    if (s.includes('huurcontract') || s.includes('lease-agreements')) {
        return isEn
            ? [
                  {
                      question:
                          'What is the impact of the Dutch Fixed Rental Contracts Act on property managers?',
                      answer: 'Permanent lease agreements are once again the statutory standard for residential rentals in the Netherlands, requiring strict tracking of statutory exceptions and notice deadlines.',
                  },
              ]
            : [
                  {
                      question:
                          'Wat verandert de Wet vaste huurcontracten voor vastgoedbeheerders?',
                      answer: 'Vaste huurcontracten voor onbepaalde tijd zijn weer de wettelijke norm voor woonruimte, waardoor strakke bewaking van wettelijke uitzonderingen en opzegtermijnen in je contractbeheer cruciaal is.',
                  },
              ];
    }
    return [];
}

function getContextualSolutionLink(
    slug: string,
    category: string | undefined,
    isEn: boolean,
): { href: string; label: string; description: string } {
    const s = slug.toLowerCase();
    if (s.includes('box-3') || s.includes('box3')) {
        return {
            href: isEn ? '/en/box3-check' : '/box3-check',
            label: isEn
                ? 'Run the free Box 3 Check'
                : 'Doe de gratis Box 3 Check',
            description: isEn
                ? 'Calculate the actual return impact on your real estate portfolio immediately.'
                : 'Bereken direct de impact van de Wet werkelijk rendement op jouw vastgoedportefeuille.',
        };
    }
    if (s.includes('huurdersportaal') || s.includes('tenant-portal')) {
        return {
            href: isEn ? '/en/apps/tenant-portal' : '/apps/huurdersportaal',
            label: isEn
                ? 'Explore the Tenant Portal'
                : 'Bekijk het Huurdersportaal',
            description: isEn
                ? 'Discover how 24/7 tenant self-service integrates natively with Business Central.'
                : 'Ontdek hoe 24/7 zelfservice voor huurders direct samenwerkt met Business Central.',
        };
    }
    if (
        s.includes('direct-banking') ||
        s.includes('incasso') ||
        s.includes('debt-collection') ||
        s.includes('direct-debit')
    ) {
        return {
            href: isEn ? '/en/apps/payment-software' : '/apps/payment-software',
            label: isEn
                ? 'Explore Payment Software'
                : 'Bekijk de Payment Software',
            description: isEn
                ? 'Automate SEPA direct debits, payment files, and bank reconciliation in Business Central.'
                : 'Automatiseer SEPA-incasso, betaalbestanden en bankaflettering in Business Central.',
        };
    }
    return {
        href: isEn
            ? '/en/apps/property-management-software'
            : '/apps/vastgoedbeheer-software',
        label: isEn
            ? 'Explore Property Management Software'
            : 'Bekijk Vastgoedbeheer Software',
        description: isEn
            ? 'Discover how emlinked automates lease management, CPI indexations, and financials inside Microsoft Business Central.'
            : 'Ontdek hoe emlinked contractbeheer, CBS-indexaties en financiële administratie automatiseert in Microsoft Business Central.',
    };
}

function calculateReadTime(
    body: PortableTextBlockLike[] | undefined,
    isEn: boolean,
    fallbackReadTime?: string,
): string {
    if (fallbackReadTime && fallbackReadTime.trim().length > 0) {
        return fallbackReadTime;
    }

    let totalWords = 0;
    if (Array.isArray(body)) {
        body.forEach((block) => {
            if (block._type === 'block' && block.children) {
                block.children.forEach((c) => {
                    if (c.text) {
                        totalWords += c.text
                            .trim()
                            .split(/\s+/)
                            .filter(Boolean).length;
                    }
                });
            }
        });
    }

    const minutes = Math.max(1, Math.ceil(totalWords / 200));
    return isEn ? `${minutes} min read` : `${minutes} min leestijd`;
}

export default async function ArticleDetailPage({
    params,
}: ArticleDetailPageProps) {
    const { locale, slug } = await params;
    const isEn = locale === 'en';

    const article =
        (await getSanityArticleBySlug(slug, locale)) ||
        fallbackArticlesBySlug[slug];

    if (!article) {
        const redirectPath = await getArticleCrossLanguageRedirectPath(
            slug,
            locale,
        );
        if (redirectPath) {
            permanentRedirect(redirectPath);
        }
        notFound();
    }

    const relatedArticles = await getRelatedArticles(article, locale);
    const heroImgUrl = article.mainImage
        ? getImageUrl(article.mainImage)
        : article.imagePath ||
          '/emlinked/news/Afbeeling-Iryna-en-Raymond-emlinked-versterkt-team-en-zet-koers-voor-verdere-groei-in-2026-1.png';
    const canonicalPageUrl =
        article.seo?.canonical ||
        `${DEFAULT_DOMAIN}/${isEn ? 'en/news' : 'nieuws'}/${slug}`;
    const displayReadTime = calculateReadTime(
        article.body,
        isEn,
        article.readTime,
    );

    const bodyFaqs = extractFaqFromBody(article.body);
    const curatedFaqs =
        bodyFaqs.length === 0 ? getCuratedArticleFaqs(slug, isEn) : [];
    const articleFaqs = bodyFaqs.length > 0 ? bodyFaqs : curatedFaqs;
    const solutionLink = getContextualSolutionLink(
        slug,
        article.category,
        isEn,
    );

    const jsonLdData = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'BlogPosting',
                '@id': `${canonicalPageUrl}#article`,
                url: canonicalPageUrl,
                headline: article.title,
                description: article.excerpt,
                ...(article.category
                    ? {
                          articleSection: formatArticleCategory(
                              article.category,
                              isEn,
                          ),
                      }
                    : {}),
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
            ...(articleFaqs.length > 0
                ? [
                      {
                          '@type': 'FAQPage',
                          '@id': `${canonicalPageUrl}#faq`,
                          mainEntity: articleFaqs.map((faq) => ({
                              '@type': 'Question',
                              name: faq.question,
                              acceptedAnswer: {
                                  '@type': 'Answer',
                                  text: faq.answer,
                              },
                          })),
                      },
                  ]
                : []),
        ],
    });

    return (
        <div className='flex-1 bg-background text-foreground relative overflow-hidden'>
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
                        <div className='relative aspect-4/3 rounded-xl border-2 border-white/15 overflow-hidden shadow-2xl bg-slate-950 group'>
                            <Image
                                src={heroImgUrl}
                                alt={article.title}
                                fill
                                className='object-cover object-center group-hover:scale-105 transition-transform duration-500'
                                priority
                            />
                            <div className='absolute inset-0 bg-linear-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none' />
                        </div>
                    </div>

                    {/* Text Column: Right side on desktop (lg:order-2), Order-first on mobile/tablet (order-1) */}
                    <div className='order-1 lg:order-2 lg:col-span-7 xl:col-span-8 space-y-6 text-left'>
                        {/* Back Link */}
                        <Link
                            href={isEn ? '/en/news' : '/nieuws'}
                            className='inline-flex items-center gap-2 text-xs font-mono font-bold text-teal hover:text-white transition-colors'
                        >
                            <ArrowLeft className='w-4 h-4' />
                            <span>
                                {isEn
                                    ? 'Back to News Overview'
                                    : 'Terug naar Nieuwsoverzicht'}
                            </span>
                        </Link>

                        {/* Meta Row */}
                        <div className='flex flex-wrap items-center gap-4 text-xs font-mono text-teal'>
                            {article.category && (
                                <span className='px-3 py-1 rounded-full bg-teal/15 border border-teal/30 uppercase tracking-wider font-bold'>
                                    {formatArticleCategory(
                                        article.category,
                                        isEn,
                                    )}
                                </span>
                            )}
                            {article.publishedAt && (
                                <span className='flex items-center gap-1.5 text-slate-300'>
                                    <Calendar className='w-3.5 h-3.5 text-teal' />
                                    <span>
                                        {new Date(
                                            article.publishedAt,
                                        ).toLocaleDateString(
                                            isEn ? 'en-US' : 'nl-NL',
                                            {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric',
                                            },
                                        )}
                                    </span>
                                </span>
                            )}
                            <span className='flex items-center gap-1.5 text-slate-300'>
                                <Clock className='w-3.5 h-3.5 text-teal' />
                                <span>{displayReadTime}</span>
                            </span>
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
                                <div className='w-10 h-10 rounded-full bg-teal/20 border border-teal/40 flex items-center justify-center text-teal font-mono font-bold text-sm'>
                                    {article.authorName
                                        ? article.authorName.charAt(0)
                                        : 'R'}
                                </div>
                                <div>
                                    <div className='text-xs font-bold text-white'>
                                        {article.authorName ||
                                            'Raymond Perridon'}
                                    </div>
                                    <div className='text-[10px] text-teal font-mono'>
                                        {isEn
                                            ? 'emlinked Executive Team'
                                            : 'emlinked Management'}
                                    </div>
                                </div>
                            </div>

                            <div className='flex items-center gap-2'>
                                <a
                                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalPageUrl)}`}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 text-xs font-mono font-semibold text-slate-200 hover:text-white hover:bg-white/20 transition-all flex items-center gap-2'
                                >
                                    <svg
                                        className='w-3.5 h-3.5 fill-current text-teal'
                                        viewBox='0 0 24 24'
                                    >
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
                            <p
                                key={idx}
                                className='text-base md:text-lg text-slate-800 leading-relaxed'
                            >
                                {p}
                            </p>
                        ))
                    ) : article.body ? (
                        <PortableText
                            value={article.body}
                            components={portableTextComponents}
                        />
                    ) : (
                        <p className='text-base md:text-lg text-slate-800 leading-relaxed'>
                            {article.excerpt}
                        </p>
                    )}
                </div>

                {/* Article Key Takeaways Card */}
                <div className='rounded-xl border border-teal/30 bg-teal/5 p-6 md:p-8 space-y-4'>
                    <h2 className='font-bold text-lg text-darkblue flex items-center gap-2'>
                        <Sparkles className='w-5 h-5 text-teal' />
                        <span>
                            {isEn
                                ? 'Key Takeaways for Real Estate Managers'
                                : 'Belangrijkste inzichten voor vastgoedbeheerders'}
                        </span>
                    </h2>
                    <ul className='space-y-2 text-xs md:text-sm text-slate-700'>
                        {article.keyTakeaways &&
                        Array.isArray(article.keyTakeaways) &&
                        article.keyTakeaways.length > 0 ? (
                            article.keyTakeaways.map(
                                (point: string, idx: number) => (
                                    <li
                                        key={idx}
                                        className='flex items-start gap-2.5'
                                    >
                                        <CheckCircle2 className='w-4 h-4 text-teal shrink-0 mt-0.5' />
                                        <span>{point}</span>
                                    </li>
                                ),
                            )
                        ) : (
                            <>
                                <li className='flex items-start gap-2.5'>
                                    <CheckCircle2 className='w-4 h-4 text-teal shrink-0 mt-0.5' />
                                    <span>
                                        {isEn
                                            ? 'Automating administrative compliance prevents penalties and backlog.'
                                            : 'Geautomatiseerde dossiervoering voorkomt achterstanden en juridische risico’s.'}
                                    </span>
                                </li>
                                <li className='flex items-start gap-2.5'>
                                    <CheckCircle2 className='w-4 h-4 text-teal shrink-0 mt-0.5' />
                                    <span>
                                        {isEn
                                            ? 'Microsoft Dynamics 365 BC integration provides real-time portfolio oversight.'
                                            : 'Microsoft Dynamics 365 BC integratie geeft direct inzicht in de complete portefeuille.'}
                                    </span>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                {/* Visible Curated FAQ Section for AEO/GEO & Schema Parity */}
                {curatedFaqs.length > 0 && (
                    <section
                        aria-labelledby='article-faq-heading'
                        className='rounded-xl border border-slate-200 bg-white p-6 md:p-8 space-y-5'
                    >
                        <h2
                            id='article-faq-heading'
                            className='font-display font-bold text-xl text-darkblue'
                        >
                            {isEn
                                ? 'Frequently asked questions'
                                : 'Veelgestelde vragen'}
                        </h2>
                        <div className='space-y-4'>
                            {curatedFaqs.map((faq, idx) => (
                                <div
                                    key={idx}
                                    className='border-b border-slate-100 last:border-b-0 pb-4 last:pb-0 space-y-1.5'
                                >
                                    <h3 className='font-semibold text-base text-slate-900'>
                                        {faq.question}
                                    </h3>
                                    <p className='text-sm md:text-base text-slate-600 font-light leading-relaxed'>
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Contextual Solution Internal Link Card */}
                <div className='rounded-xl border border-navy-900/15 bg-slate-50 p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6'>
                    <div className='space-y-1.5'>
                        <h2 className='font-display font-bold text-lg text-darkblue'>
                            {solutionLink.label}
                        </h2>
                        <p className='text-sm text-slate-600 font-light'>
                            {solutionLink.description}
                        </p>
                    </div>
                    <Link
                        href={solutionLink.href}
                        className='inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-teal transition-all duration-200 ease-out shrink-0'
                    >
                        <span>{solutionLink.label}</span>
                        <ArrowRight className='w-4 h-4' />
                    </Link>
                </div>
            </article>

            {/* ── RELATED ARTICLES GRID ── */}
            {relatedArticles.length > 0 && (
                <section className='px-6 py-16 max-w-7xl mx-auto border-t border-slate-200 space-y-8'>
                    <div className='text-left space-y-2'>
                        <h2 className='font-display font-bold text-2xl text-darkblue'>
                            {isEn
                                ? 'Related Articles'
                                : 'Gerelateerde Artikelen'}
                        </h2>
                        <p className='text-xs text-slate-600 font-light'>
                            {isEn
                                ? 'Explore more insights from our team.'
                                : 'Lees meer inzichten van ons team.'}
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        {relatedArticles.map((rel) => {
                            const relImg = getImageUrl(
                                rel.mainImage,
                                rel.imagePath ||
                                    '/emlinked/news/Wet-Goed-Verhuurderschap-emlinked.jpg',
                            );

                            return (
                                <div
                                    key={rel._id || rel.slug}
                                    className='group rounded-xl border border-slate-200 bg-white text-slate-900 flex flex-col justify-between hover:border-teal/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden text-left'
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
                                        <h3 className='font-bold text-base text-darkblue group-hover:text-teal transition-colors line-clamp-2'>
                                            <Link
                                                href={
                                                    isEn
                                                        ? `/en/news/${rel.slug}`
                                                        : `/nieuws/${rel.slug}`
                                                }
                                            >
                                                {rel.title}
                                            </Link>
                                        </h3>
                                        <p className='text-[0.95rem] text-slate-600 font-light'>
                                            {rel.excerpt}
                                        </p>
                                        <Link
                                            href={
                                                isEn
                                                    ? `/en/news/${rel.slug}`
                                                    : `/nieuws/${rel.slug}`
                                            }
                                            className='inline-flex items-center gap-1.5 text-xs font-bold text-darkblue group-hover:text-teal transition-colors pt-2'
                                        >
                                            <span>
                                                {isEn
                                                    ? 'Read Article'
                                                    : 'Lees Artikel'}
                                            </span>
                                            <ArrowRight className='w-3.5 h-3.5' />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
}
