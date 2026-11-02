import React from 'react';
import type { Metadata } from 'next';
import {
    FileSpreadsheet,
    Link2Off,
    Receipt,
    Clock,
    ShieldCheck,
    Building2,
} from 'lucide-react';
import { sanityFetch } from '@/lib/sanity';
import { HeroSection } from '@/components/blocks/HeroSection';
import { Box3Calculator } from '@/components/Box3Calculator';
import { Box3UrgencyBar } from '@/components/blocks/box3/Box3UrgencyBar';
import { Box3VoorWieSection } from '@/components/blocks/box3/Box3VoorWieSection';
import { Box3SolutionWorkflow } from '@/components/blocks/box3/Box3SolutionWorkflow';
import { Box3EcosystemSection } from '@/components/blocks/box3/Box3EcosystemSection';
import { Box3CtaBanner } from '@/components/blocks/box3/Box3CtaBanner';

export const revalidate = 60;

interface Box3PageProps {
    params: Promise<{ locale: string }>;
}

async function getSanityPageData(locale: string) {
    try {
        return await sanityFetch<any>({
            query: `*[_type == "page" && (slug.current == "box3-check" || slug.current == "/box3-check" || slug.current == "kennisbank/box3-check" || _id == "page-box3-check-" + $locale) && language == $locale][0] {
                title,
                pageBlocks[] {
                    ...,
                    _type,
                    _key,
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
                    noIndex,
                    structuredData
                }
            }`,
            params: { locale },
        });
    } catch (e) {
        console.error('Failed to fetch box3-check page from Sanity:', e);
        return null;
    }
}

import { buildMetadata, DEFAULT_DOMAIN } from '@/lib/seo';

export async function generateMetadata({
    params,
}: Box3PageProps): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getSanityPageData(locale);

    const fallbackTitle = isEn
        ? 'Box 3 Real Estate Check | Calculate Actual Yield'
        : 'Box 3 Vastgoed Check | Bereken Werkelijk Rendement';
    const fallbackDescription = isEn
        ? 'Calculate the impact of changing Box 3 legislation on your real estate portfolio for free. Discover your fiscal position and keep your yields audit-proof.'
        : 'Bereken gratis de impact van de Wet werkelijk rendement box 3 op jouw vastgoedportefeuille. Ontdek je fiscale positie en houd je rendement op orde.';
    const canonicalUrl = `${DEFAULT_DOMAIN}${isEn ? '/en/box3-check' : '/box3-check'}`;

    return buildMetadata({
        seo: pageData?.seo,
        fallbackTitle,
        fallbackDescription,
        canonicalUrl,
        locale,
    });
}

export default async function Box3CheckPage({ params }: Box3PageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getSanityPageData(locale);

    // Dynamic Sanity pageBlocks
    const pageBlocks = pageData?.pageBlocks || [];
    const heroBlock = pageBlocks.find((b: any) => b._type === 'hero');
    const announcementBlock = pageBlocks.find(
        (b: any) =>
            b._type === 'announcement' ||
            b._type === 'notificationBar' ||
            b._type === 'urgencyBar',
    );
    const voorWieBlock = pageBlocks.find(
        (b: any) =>
            b._type === 'featuresList' ||
            b._key === 'voor-wie' ||
            b.badge === 'Voor Wie' ||
            b.badge === 'Target Audience',
    );
    const workflowBlock = pageBlocks.find(
        (b: any) =>
            b._type === 'workflow' ||
            b._type === 'stepsBlock' ||
            b._key === 'de-oplossing' ||
            b.badge === 'De Oplossing' ||
            b.badge === 'The Solution' ||
            (b.title && b.title.toLowerCase().includes('systeem')),
    );
    const calculatorBlock = pageBlocks.find(
        (b: any) =>
            b._type === 'calculatorBlock' ||
            b.calculatorType === 'box3' ||
            b._key === 'calculator-block-nl' ||
            b._key === 'calculator-block-en',
    );
    const ecosystemBlock = pageBlocks.find(
        (b: any) =>
            b._type === 'ecosystemSection' ||
            b._type === 'integrationsList' ||
            b._key === 'ecosystem-block-nl' ||
            b._key === 'ecosystem-block-en',
    );
    const ctaBlock = pageBlocks.find(
        (b: any) => b._type === 'ctaBanner' || b._type === 'cta',
    );

    const painPointIcons = [
        <FileSpreadsheet className='w-4.5 h-4.5 text-[#060e32]' key='1' />,
        <Link2Off className='w-4.5 h-4.5 text-[#060e32]' key='2' />,
        <Receipt className='w-4.5 h-4.5 text-[#060e32]' key='3' />,
        <Clock className='w-4.5 h-4.5 text-[#060e32]' key='4' />,
    ];

    const defaultBlocks = [
        { _type: 'hero', ...heroBlock },
        { _type: 'announcement', ...announcementBlock },
        { _type: 'featuresList', ...voorWieBlock },
        { _type: 'workflow', ...workflowBlock },
        { _type: 'calculatorBlock', ...calculatorBlock },
        { _type: 'ecosystemSection', ...ecosystemBlock },
        { _type: 'ctaBanner', ...ctaBlock },
    ];

    const blocksToRender = pageBlocks.length > 0 ? pageBlocks : defaultBlocks;

    const renderHero = (b: any, key: any) => (
        <React.Fragment key={key}>
            <HeroSection
                label={b?.label}
                title={b?.title}
                subtitle={b?.subtitle}
                ctaLabel={b?.ctaLabel}
                ctaLink={b?.ctaLink}
                secondaryCtaLabel={b?.secondaryCtaLabel}
                secondaryCtaLink={b?.secondaryCtaLink}
                showProof={b?.showProof ?? true}
                showProofAvatars={false}
                proofText={b?.proofText}
                image={b?.image}
                imagePath={
                    b?.imagePath ||
                    '/emlinked/hero/vastgoedportfeuille_aangifte-klaar.jpg'
                }
                floatingLabels={[
                    {
                        icon: <ShieldCheck className='w-3.5 h-3.5' />,
                        value:
                            b?.floatingLabels?.[0]?.value ||
                            (isEn ? 'Audit-ready' : 'Aangifte-klaar'),
                        label:
                            b?.floatingLabels?.[0]?.label ||
                            (isEn ? 'Box 3 Status' : 'Box 3-Status'),
                    },
                    {
                        icon: <Building2 className='w-3.5 h-3.5' />,
                        value: b?.floatingLabels?.[1]?.value || 'Automatisch',
                        label:
                            b?.floatingLabels?.[1]?.label ||
                            'Business Central',
                    },
                ]}
            />
        </React.Fragment>
    );

    const renderUrgency = (b: any, key: any) => (
        <React.Fragment key={key}>
            <Box3UrgencyBar
                announcementBadge={b?.badge}
                announcementText={b?.text}
                announcementCtaLabel={b?.ctaLabel}
                announcementCtaLink={b?.ctaLink}
            />
        </React.Fragment>
    );

    const renderVoorWie = (b: any, key: any) => {
        const items = b?.items?.map((item: any, idx: number) => ({
            icon: painPointIcons[idx % painPointIcons.length],
            title: item.title,
            text: item.text || item.description,
        }));
        return (
            <React.Fragment key={key}>
                <Box3VoorWieSection
                    voorWieBadge={b?.badge}
                    voorWieTitle={b?.title}
                    voorWieSubtitle={b?.subtitle || b?.description}
                    fiscalContextBadge={b?.fiscalContext?.badge}
                    fiscalContextTitle={b?.fiscalContext?.title}
                    fiscalContextText={b?.fiscalContext?.text}
                    fiscalContextImage={b?.fiscalContext?.image}
                    fiscalContextImagePath={b?.fiscalContext?.imagePath}
                    voorWieItems={items}
                />
            </React.Fragment>
        );
    };

    const renderWorkflow = (b: any, key: any) => (
        <React.Fragment key={key}>
            <Box3SolutionWorkflow
                workflowBadge={b?.badge}
                workflowTitle={b?.title}
                workflowItems={b?.items}
                isEn={isEn}
            />
        </React.Fragment>
    );

    const renderCalculator = (b: any, key: any) => (
        <React.Fragment key={key}>
            <Box3Calculator
                isEn={isEn}
                badge={b?.badge}
                title={b?.title}
                subtitle={b?.subtitle}
                featureTitle={b?.featureTitle}
                featureItems={b?.featureItems}
            />
        </React.Fragment>
    );

    const renderEcosystem = (b: any, key: any) => (
        <React.Fragment key={key}>
            <Box3EcosystemSection
                isEn={isEn}
                badge={b?.badge}
                title={b?.title}
                subtitle={b?.subtitle}
                cardTitle={b?.cardTitle}
                cardSubtitle={b?.cardSubtitle}
                cardPoints={b?.cardPoints}
                trustItems={b?.trustItems}
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

    const canonicalPageUrl = `${DEFAULT_DOMAIN}${isEn ? '/en/box3-check' : '/box3-check'}`;
    const jsonLdData = pageData?.seo?.structuredData
        ? typeof pageData.seo.structuredData === 'string'
            ? pageData.seo.structuredData
            : JSON.stringify(pageData.seo.structuredData)
        : JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                  {
                      '@type': 'WebPage',
                      '@id': `${canonicalPageUrl}#webpage`,
                      url: canonicalPageUrl,
                      name: isEn
                          ? 'Box 3 Real Estate Check | Calculate Actual Yield | emlinked'
                          : 'Box 3 Vastgoed Check | Bereken Werkelijk Rendement | emlinked',
                      description: isEn
                          ? 'Calculate the impact of changing Box 3 legislation on your real estate portfolio for free. Discover your fiscal position and keep your yields audit-proof.'
                          : 'Bereken gratis de impact van de Wet werkelijk rendement box 3 op jouw vastgoedportefeuille. Ontdek je fiscale positie en houd je rendement op orde.',
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
                              item: isEn
                                  ? `${DEFAULT_DOMAIN}/en`
                                  : DEFAULT_DOMAIN,
                          },
                          {
                              '@type': 'ListItem',
                              position: 2,
                              name: 'Box 3 Check',
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
                                    name: 'How is actual return calculated for Box 3 real estate in the Netherlands?',
                                    acceptedAnswer: {
                                        '@type': 'Answer',
                                        text: 'Under the Dutch Box 3 rebuttal scheme (tegenbewijsregeling) and upcoming Actual Return Act, actual return consists of rental income plus WOZ value changes, minus deductible maintenance expenses under the future regime (excluding property improvements and interest expenses under the transitional Supreme Court rules).',
                                    },
                                },
                                {
                                    '@type': 'Question',
                                    name: 'What is the difference between maintenance costs and property improvement in Box 3?',
                                    acceptedAnswer: {
                                        '@type': 'Answer',
                                        text: 'Regular maintenance restores a property to its original state, whereas property improvements (verbeteringskosten) add new functional value or capacity. Structuring invoices at the property and unit level inside Microsoft Dynamics 365 Business Central ensures audit-ready separation for the Dutch Tax Administration.',
                                    },
                                },
                                {
                                    '@type': 'Question',
                                    name: 'How does emlinked prepare real estate portfolios for Box 3 tax filings?',
                                    acceptedAnswer: {
                                        '@type': 'Answer',
                                        text: 'emlinked automatically links rental revenue, service charges, maintenance invoices, and WOZ valuations directly to each property object inside Microsoft Dynamics 365 Business Central, providing real-time actual yield calculations per asset.',
                                    },
                                },
                            ]
                          : [
                                {
                                    '@type': 'Question',
                                    name: 'Hoe wordt het werkelijk rendement voor vastgoed in Box 3 berekend?',
                                    acceptedAnswer: {
                                        '@type': 'Answer',
                                        text: 'Onder de Box 3-tegenbewijsregeling en de aankomende Wet werkelijk rendement box 3 bestaat het werkelijk rendement uit de werkelijke huurinkomsten plus de waardeontwikkeling (WOZ-mutatie), waarbij het cruciaal is om regulier onderhoud strikt te scheiden van pandverbetering.',
                                    },
                                },
                                {
                                    '@type': 'Question',
                                    name: 'Wat is het fiscale verschil tussen onderhoudskosten en verbeteringskosten in Box 3?',
                                    acceptedAnswer: {
                                        '@type': 'Answer',
                                        text: 'Regulier onderhoud brengt een pand terug in de oorspronkelijke staat, terwijl verbeteringskosten nieuwe waarde of duurzame uitbreiding toevoegen. Door facturen direct op pand- en eenheidsniveau in Microsoft Dynamics 365 Business Central te boeken, bouw je automatisch een sluitend fiscaal dossier op.',
                                    },
                                },
                                {
                                    '@type': 'Question',
                                    name: 'Hoe maakt emlinked mijn vastgoedportefeuille Box 3 aangifte-klaar?',
                                    acceptedAnswer: {
                                        '@type': 'Answer',
                                        text: 'emlinked koppelt huurinkomsten, servicekosten, onderhoudsfacturen en WOZ-waarden direct op objectniveau binnen Microsoft Dynamics 365 Business Central, zodat je op elk moment een sluitend overzicht van het werkelijk rendement per pand kunt exporteren.',
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
                    block._type === 'announcement' ||
                    block._type === 'notificationBar' ||
                    block._type === 'urgencyBar'
                ) {
                    return renderUrgency(block, key);
                }

                if (
                    block._type === 'featuresList' ||
                    block._key === 'voor-wie' ||
                    block.badge === 'Voor Wie' ||
                    block.badge === 'Target Audience'
                ) {
                    return renderVoorWie(block, key);
                }

                if (
                    block._type === 'workflow' ||
                    block._type === 'stepsBlock' ||
                    block._key === 'de-oplossing' ||
                    block.badge === 'De Oplossing' ||
                    block.badge === 'The Solution' ||
                    (block.title && block.title.toLowerCase().includes('systeem'))
                ) {
                    return renderWorkflow(block, key);
                }

                if (
                    block._type === 'calculatorBlock' ||
                    block.calculatorType === 'box3' ||
                    block._key === 'calculator-block-nl' ||
                    block._key === 'calculator-block-en'
                ) {
                    return renderCalculator(block, key);
                }

                if (
                    block._type === 'ecosystemSection' ||
                    block._type === 'integrationsList' ||
                    block._key === 'ecosystem-block-nl' ||
                    block._key === 'ecosystem-block-en'
                ) {
                    return renderEcosystem(block, key);
                }

                if (
                    block._type === 'ctaBanner' ||
                    block._type === 'ctaBlock' ||
                    block._type === 'cta'
                ) {
                    return renderCta(block, key);
                }

                return null;
            })}
        </div>
    );
}
