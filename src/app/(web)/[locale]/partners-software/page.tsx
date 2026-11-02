import React from 'react';
import type { Metadata } from 'next';
import { Zap, ShieldCheck } from 'lucide-react';
import { buildMetadata, DEFAULT_DOMAIN } from '@/lib/seo';
import { sanityFetch } from '@/lib/sanity';
import { HeroSection } from '@/components/blocks/HeroSection';
import { PartnersSectionComponent } from '@/components/blocks/partners/PartnersSectionComponent';
import { Box3CtaBanner } from '@/components/blocks/box3/Box3CtaBanner';
import { PageBlockRenderer } from '@/components/blocks/PageBlockRenderer';

export const revalidate = 60;

async function getSanityPageData(locale: string) {
    try {
        return await sanityFetch<any>({
            query: `*[_type == "page" && (slug.current == "partners-software" || slug.current == "/partners-software" || _id == "page-partners-software-" + $locale) && language == $locale][0] {
                ...,
                pageBlocks[] {
                    ...,
                    _type,
                    _key,
                    partners[] {
                        ...,
                        tags[]
                    },
                    features[] {
                        ...,
                        bullets
                    },
                    items[] {
                        ...
                    }
                },
                seo {
                    seoTitle,
                    seoDescription,
                    canonical,
                    noIndex
                }
            }`,
            params: { locale },
        });
    } catch {
        return null;
    }
}

interface PartnersPageProps {
    params: Promise<{
        locale: string;
    }>;
}

export async function generateMetadata({
    params,
}: PartnersPageProps): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData: any = await getSanityPageData(locale);

    const fallbackTitle = isEn
        ? 'Partners & Software Integrations (Business Central)'
        : 'Partners & Software Integraties (Business Central)';
    const fallbackDesc = isEn
        ? 'Explore all strategic software partners of emlinked. Seamless, certified integrations with Microsoft Business Central, Continia Document Capture, and Idyn Direct Banking.'
        : 'Ontdek alle strategische software-partners van emlinked. Naadloze, gecertificeerde integraties met Microsoft Business Central, Continia Document Capture en Idyn Direct Banking.';
    const canonicalUrl = `${DEFAULT_DOMAIN}${isEn ? '/en/partners-software' : '/partners-software'}`;

    return buildMetadata({
        seo: pageData?.seo,
        fallbackTitle,
        fallbackDescription: fallbackDesc,
        canonicalUrl,
        locale,
    });
}

export default async function PartnersSoftwarePage({
    params,
}: PartnersPageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData: any = await getSanityPageData(locale);
    const pageBlocks = pageData?.pageBlocks || [];

    const heroBlock = pageBlocks.find(
        (b: any) => b._type === 'hero' || b._type === 'heroBlock',
    );
    const partnersBlock = pageBlocks.find(
        (b: any) => b._type === 'partnersSection' || b._type === 'partners',
    );
    const ctaBlock = pageBlocks.find(
        (b: any) =>
            b._type === 'ctaBanner' ||
            b._type === 'ctaBlock' ||
            b._type === 'cta',
    );

    const defaultBlocks = [
        { _type: 'hero', ...heroBlock },
        { _type: 'partnersSection', ...partnersBlock },
        { _type: 'ctaBanner', ...ctaBlock },
    ];

    const blocksToRender = pageBlocks.length > 0 ? pageBlocks : defaultBlocks;

    const renderHero = (b: any, key: any) => (
        <React.Fragment key={key}>
            <HeroSection
                label={b?.label || b?.tagline}
                title={b?.title}
                subtitle={b?.subtitle}
                ctaLabel={b?.ctaLabel}
                ctaLink={b?.ctaLink}
                secondaryCtaLabel={b?.secondaryCtaLabel}
                secondaryCtaLink={b?.secondaryCtaLink}
                showProof={b?.showProof ?? true}
                showProofAvatars={false}
                proofText={b?.proofText}
                titleClassName='text-3xl sm:text-4xl lg:text-[2.75rem]'
                locale={locale}
                image={b?.image || b?.heroImage}
                imagePath={b?.imagePath}
                floatingLabels={[
                    {
                        icon: <Zap className='w-3.5 h-3.5' />,
                        value: b?.floatingLabels?.[0]?.value || 'Direct',
                        label:
                            b?.floatingLabels?.[0]?.label ||
                            (isEn ? 'API integrations' : 'Koppelingen'),
                    },
                    {
                        icon: <ShieldCheck className='w-3.5 h-3.5' />,
                        value:
                            b?.floatingLabels?.[1]?.value ||
                            (isEn ? 'Certified' : 'Gecertificeerd'),
                        label: b?.floatingLabels?.[1]?.label || 'Microsoft',
                    },
                ]}
            />
        </React.Fragment>
    );

    const renderPartners = (b: any, key: any) => (
        <React.Fragment key={key}>
            <PartnersSectionComponent
                badge={b?.badge}
                title={b?.title}
                subtitle={b?.subtitle}
                valueTags={b?.valueTags}
                partners={b?.partners}
                isEn={isEn}
            />
        </React.Fragment>
    );

    const renderCta = (b: any, key: any) => (
        <React.Fragment key={key}>
            <Box3CtaBanner
                ctaBadge={b?.badge}
                ctaTitle={b?.title}
                ctaSubtitle={b?.subtitle}
                ctaButtonText={b?.buttonText}
                ctaButtonLink={b?.buttonLink}
                isEn={isEn}
                image={b?.image}
                imagePath={b?.imagePath}
            />
        </React.Fragment>
    );

    const canonicalPageUrl = `${DEFAULT_DOMAIN}${isEn ? '/en/partners-software' : '/partners-software'}`;
    const jsonLdData = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': `${canonicalPageUrl}#webpage`,
                url: canonicalPageUrl,
                name: isEn
                    ? 'Partners & Software Integrations (Business Central) | emlinked'
                    : 'Partners & Software Integraties (Business Central) | emlinked',
                description: isEn
                    ? 'Explore all strategic software partners of emlinked. Seamless, certified integrations with Microsoft Business Central, Continia Document Capture, and Idyn Direct Banking.'
                    : 'Ontdek alle strategische software-partners van emlinked. Naadloze, gecertificeerde integraties met Microsoft Business Central, Continia Document Capture en Idyn Direct Banking.',
                inLanguage: isEn ? 'en-US' : 'nl-NL',
                isPartOf: {
                    '@type': 'WebSite',
                    '@id': `${DEFAULT_DOMAIN}/#website`,
                },
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${canonicalPageUrl}#breadcrumb`,
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: isEn ? `${DEFAULT_DOMAIN}/en` : DEFAULT_DOMAIN,
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: isEn
                            ? 'Partners & Integrations'
                            : 'Partners & Integraties',
                        item: canonicalPageUrl,
                    },
                ],
            },
            {
                '@type': 'FAQPage',
                '@id': `${canonicalPageUrl}#faq`,
                mainEntity: isEn
                    ? [
                          {
                              '@type': 'Question',
                              name: 'Which software partners and add-ons integrate natively with emlinked?',
                              acceptedAnswer: {
                                  '@type': 'Answer',
                                  text: 'Because emlinked is built natively on Microsoft Dynamics 365 Business Central, it integrates seamlessly with certified Microsoft AppSource add-ons including Continia Document Capture (OCR invoice processing), Idyn Direct Banking (automated bank statements and payments), and Power BI.',
                              },
                          },
                          {
                              '@type': 'Question',
                              name: 'Can my existing Microsoft Dynamics partner remain involved?',
                              acceptedAnswer: {
                                  '@type': 'Answer',
                                  text: 'Yes. emlinked collaborates closely with Microsoft Dynamics partners and accounting firms across the Netherlands, ensuring your ERP environment and real estate modules remain aligned.',
                              },
                          },
                      ]
                    : [
                          {
                              '@type': 'Question',
                              name: 'Welke softwarepartners en add-ons integreren direct met emlinked?',
                              acceptedAnswer: {
                                  '@type': 'Answer',
                                  text: 'Omdat emlinked native op Microsoft Dynamics 365 Business Central is gebouwd, werkt het naadloos samen met gecertificeerde Microsoft AppSource-oplossingen zoals Continia Document Capture (OCR-factuurverwerking), Idyn Direct Banking (automatische bankkoppelingen) en Power BI.',
                              },
                          },
                          {
                              '@type': 'Question',
                              name: 'Kan onze bestaande Microsoft Business Central partner betrokken blijven?',
                              acceptedAnswer: {
                                  '@type': 'Answer',
                                  text: 'Ja. emlinked werkt nauw samen met Microsoft Dynamics-partners en administratiekantoren door heel Nederland, zodat je ERP-inrichting en vastgoedmodules optimaal op elkaar aansluiten.',
                              },
                          },
                      ],
            },
        ],
    });

    return (
        <div className='flex-1 text-navy-900 bg-stone-bg'>
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: jsonLdData }}
            />
            {blocksToRender.map((block: any, idx: number) => {
                const key = block._key || `${block._type}-${idx}`;

                if (block._type === 'hero' || block._type === 'heroBlock') {
                    return renderHero(block, key);
                }

                if (
                    block._type === 'partnersSection' ||
                    block._type === 'partners'
                ) {
                    return renderPartners(block, key);
                }

                if (
                    block._type === 'ctaBanner' ||
                    block._type === 'ctaBlock' ||
                    block._type === 'cta'
                ) {
                    return renderCta(block, key);
                }

                // Dynamic fallback for any other block added by the editor (e.g. features, testimonials, architecture)
                return (
                    <PageBlockRenderer
                        key={key}
                        block={block}
                        locale={locale}
                    />
                );
            })}
        </div>
    );
}
