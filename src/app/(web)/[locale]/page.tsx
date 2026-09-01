import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GlowingLink } from '@/components/ui/GlowingButton';
import { client } from '@/sanity/client';
import { getImageUrl } from '@/sanity/image';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    AiSecurity01Icon,
    CheckmarkBadge03Icon,
    StarAward01Icon,
} from '@hugeicons/core-free-icons';
import {
    AlertCircle,
    Info,
    FileText,
    Cpu,
    Database,
    CheckCircle2,
    CreditCard,
    RefreshCw,
    Zap,
    ArrowDownRight,
    ArrowRight,
    Layers,
} from 'lucide-react';
import { Metadata } from 'next';
import { PageBlockRenderer } from '@/components/blocks/PageBlockRenderer';

interface HomePageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({
    params,
}: HomePageProps): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === 'en';

    let seoData: any = null;
    try {
        seoData = await client.fetch(
            `*[_type == "page" && (slug.current == "home" || slug.current == "/" || slug.current == "/en/" || slug.current == "/en") && language == $locale][0].seo {
                seoTitle,
                seoDescription,
                canonical,
                noIndex
            }`,
            { locale },
            { cache: 'no-store' },
        );
    } catch (e) {
        console.error('Error fetching homepage metadata from Sanity:', e);
    }

    const title =
        seoData?.seoTitle ||
        (isEn
            ? 'emlinked — Professional Real Estate Management for Box 3 & Microsoft BC'
            : 'emlinked — Professionele Vastgoedbeheer Software voor Box 3 & Microsoft BC');

    const description =
        seoData?.seoDescription ||
        (isEn
            ? 'Manage your real estate portfolio natively inside Microsoft Dynamics 365 Business Central. No manual exports, automated CPI indexation and bank reconciliation.'
            : 'Beheer uw vastgoedportefeuille native binnen Microsoft Dynamics 365 Business Central. Geen handmatige exports, wel geautomatiseerde CPI-indexaties en aflettering.');

    const robots = seoData?.noIndex ? 'noindex, nofollow' : 'index, follow';

    return {
        title: {
            absolute: title,
        },
        description,
        robots,
        alternates: {
            canonical: seoData?.canonical || (isEn ? '/en' : '/'),
        },
    };
}

// GROQ query to retrieve the homepage document by slug or ID
async function getHomepageData(locale: string) {
    try {
        const pageId = locale === 'en' ? 'page-home-en' : 'page-home-nl';
        return await client.fetch(
            `*[_type == "page" && (_id == $pageId || slug.current == "home" || slug.current == "/" || slug.current == "/en/" || slug.current == "/en") && language == $locale][0] {
                title,
                pageBlocks[] {
                    ...,
                    _type,
                    _key,
                    image {
                        asset-> {
                            _id,
                            url
                        }
                    },
                    heroImage {
                        asset-> {
                            _id,
                            url
                        }
                    },
                    photo {
                        asset-> {
                            _id,
                            url
                        }
                    },
                    logo {
                        asset-> {
                            _id,
                            url
                        }
                    },
                    items[] {
                        ...,
                        image { asset-> { _id, url } },
                        logo { asset-> { _id, url } },
                        photo { asset-> { _id, url } }
                    },
                    features[] {
                        ...,
                        image { asset-> { _id, url } }
                    },
                    integrations[] {
                        ...
                    },
                    members[] {
                        ...,
                        photo { asset-> { _id, url } }
                    }
                },
                seo {
                    structuredData
                }
            }`,
            { pageId, locale },
            { cache: 'no-store' },
        );
    } catch (e) {
        console.error('Error fetching homepage data from Sanity:', e);
        return null;
    }
}

function getTrustIcon(iconName: string) {
    switch (iconName?.toLowerCase()) {
        case 'check':
            return (
                <HugeiconsIcon
                    icon={CheckmarkBadge03Icon}
                    size={20}
                    className='shrink-0 transition-colors'
                />
            );
        case 'shield':
            return (
                <HugeiconsIcon
                    icon={AiSecurity01Icon}
                    size={20}
                    className='shrink-0 transition-colors'
                />
            );
        case 'star':
            return (
                <HugeiconsIcon
                    icon={StarAward01Icon}
                    size={20}
                    className='shrink-0 transition-colors'
                />
            );
        case 'warn':
        case 'alert':
            return <AlertCircle className='h-5 w-5 text-red-500 shrink-0' />;
        default:
            return <Info className='h-5 w-5 shrink-0' />;
    }
}

export default async function HomePage({ params }: HomePageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getHomepageData(locale);
    console.log(
        '🔍 [HomePage Debug] locale:',
        locale,
        'fetched document _id:',
        pageData?._id,
        'title:',
        pageData?.title,
        'blocks count:',
        pageData?.pageBlocks?.length,
    );

    const getPath = (path: string) => {
        if (locale === 'nl') return path;
        return `/en${path === '/' ? '' : path}`;
    };

    // Extract dynamic blocks 100% from Sanity CMS
    const blocks = pageData?.pageBlocks || [];

    const structuredData = pageData?.seo?.structuredData;

    return (
        <div className='flex flex-col min-h-screen'>
            {structuredData && (
                <script
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{ __html: structuredData }}
                />
            )}
            {blocks.map((block: any) => (
                <PageBlockRenderer
                    key={block._key}
                    block={block}
                    locale={locale}
                    isHomepage={true}
                />
            ))}
        </div>
    );
}
