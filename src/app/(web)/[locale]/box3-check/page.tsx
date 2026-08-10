import type { Metadata } from 'next';
import {
    FileSpreadsheet,
    Link2Off,
    Receipt,
    Clock,
} from 'lucide-react';
import { sanityFetch } from '@/lib/sanity';
import { HeroSection } from '@/components/blocks/HeroSection';
import { Box3Calculator } from '@/components/Box3Calculator';
import { Box3HeroDashboardCard } from '@/components/blocks/box3/Box3HeroDashboardCard';
import { Box3UrgencyBar } from '@/components/blocks/box3/Box3UrgencyBar';
import { Box3VoorWieSection } from '@/components/blocks/box3/Box3VoorWieSection';
import { Box3SolutionWorkflow } from '@/components/blocks/box3/Box3SolutionWorkflow';
import { Box3EcosystemSection } from '@/components/blocks/box3/Box3EcosystemSection';
import { Box3CtaBanner } from '@/components/blocks/box3/Box3CtaBanner';

interface Box3PageProps {
    params: Promise<{ locale: string }>;
}

async function getSanityPageData(locale: string) {
    try {
        return await sanityFetch<any>({
            query: `*[_type == "page" && (slug.current == "box3-check" || slug.current == "/box3-check" || _id == "page-box3-check-" + $locale) && language == $locale][0] {
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
        : 'Bereken gratis de impact van de Wet werkelijk rendement box 3 op uw vastgoedportefeuille. Ontdek uw fiscale positie en houd uw rendement op orde.';
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

    // Dynamic Sanity pageBlocks extractions
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

    const heroLabel =
        heroBlock?.label ||
        (isEn
            ? 'ADMINISTRATION OBLIGATION 2028 · PARLIAMENT APPROVED'
            : 'ADMINISTRATIEPLICHT 2028 · TWEEDE KAMER AKKOORD');
    const heroTitle =
        heroBlock?.title ||
        (isEn
            ? 'Your real estate portfolio always *tax-audit ready*.'
            : 'Uw vastgoedportefeuille altijd *aangifte-klaar*.');
    const heroSubtitle =
        heroBlock?.subtitle ||
        (isEn
            ? 'emlinked manages your lease agreements, operating costs, and financial administration in one streamlined system. Specifically engineered for portfolios from 50 rental units up. Built natively on Microsoft Business Central.'
            : 'emlinked beheert uw huurcontracten, kosten en financiële administratie in één gestroomlijnd systeem. Speciaal voor portefeuilles vanaf 50 verhuureenheden. Gebouwd op Microsoft Business Central.');
    const heroCtaLabel =
        heroBlock?.ctaLabel ||
        (isEn ? 'Request Free Demo' : 'Gratis demo aanvragen');
    const heroCtaLink = heroBlock?.ctaLink || '/contact';
    const heroSecCtaLabel =
        heroBlock?.secondaryCtaLabel ||
        (isEn ? 'Calculate Box 3 impact →' : 'Bereken uw box 3-impact →');
    const heroSecCtaLink = heroBlock?.secondaryCtaLink || '#calculator';

    const heroCardBadge =
        heroBlock?.heroCard?.badge || 'MICROSOFT BUSINESS CENTRAL';
    const heroCardTitle =
        heroBlock?.heroCard?.title ||
        (isEn ? 'Real Estate Management Suite' : 'Vastgoed Beheer Suite');
    const heroCardStatus = heroBlock?.heroCard?.status || '100% Synced';

    const announcementBadge =
        announcementBlock?.badge ||
        (isEn
            ? 'New · Box 3 Act 2028'
            : 'Nieuw: Wet werkelijk rendement box 3');
    const announcementText =
        announcementBlock?.text ||
        (isEn
            ? 'Property owners get a formal recordkeeping obligation. Do you know what to track?'
            : 'Vastgoedeigenaren krijgen een formele administratieplicht. Weet u al wat u moet bijhouden?');
    const announcementCtaLabel =
        announcementBlock?.ctaLabel ||
        (isEn ? 'Calculate your situation →' : 'Bereken uw situatie →');
    const announcementCtaLink = announcementBlock?.ctaLink || '#calculator';

    const voorWieBadge =
        voorWieBlock?.badge || (isEn ? 'Target Audience' : 'Voor Wie');
    const voorWieTitle =
        voorWieBlock?.title ||
        (isEn
            ? 'Real estate management with 50+ units gets stuck fast'
            : 'Vastgoedbeheer met 50+ eenheden loopt snel vast');
    const voorWieSubtitle =
        voorWieBlock?.subtitle ||
        voorWieBlock?.description ||
        (isEn
            ? 'Lease contracts stored in one place, maintenance expenses elsewhere, and tax records scattered across loose spreadsheets. From 2028, tax authorities require exact proof per property of your actual net yield.'
            : 'Huurcontracten op één plek, onderhoudskosten elders, en de fiscale administratie verspreid over losse documenten. Vanaf 2028 verwacht de Belastingdienst dat u per pand exact kunt aantonen wat het werkelijke rendement is geweest.');

    const fiscalContextBadge =
        voorWieBlock?.fiscalContext?.badge ||
        (isEn ? 'Audit Proof 2028' : 'Wetgeving 2028');
    const fiscalContextTitle =
        voorWieBlock?.fiscalContext?.title ||
        (isEn
            ? 'Tax Context: Actual Yield Act Box 3'
            : 'Fiscale Context: Wet werkelijk rendement box 3');
    const fiscalContextText =
        voorWieBlock?.fiscalContext?.text ||
        (isEn
            ? 'Property owners are subject to a formal recordkeeping and retention obligation. Rental income, maintenance expenses, and improvement costs must be verifiable per property with source documents.'
            : 'Vastgoedeigenaren krijgen een formele administratie- en bewaarplicht. Huurinkomsten, onderhoudskosten en verbeteringskosten moeten per pand aantoonbaar zijn met brondocumenten.');

    const workflowBadge =
        workflowBlock?.badge || (isEn ? 'The Solution' : 'De Oplossing');
    const workflowTitle =
        workflowBlock?.title ||
        (isEn
            ? 'One system. From lease agreement to tax reporting.'
            : 'Eén systeem. Van huurcontract tot belastingrapportage.');
    const workflowItems = workflowBlock?.items?.length
        ? workflowBlock.items
        : [
              {
                  step: '01',
                  title: isEn
                      ? 'Centralize Properties & Contracts'
                      : 'Alle objecten en contracten centraal',
                  text: isEn
                      ? 'WOZ values, lease contracts, CPI indexations, and vacancies managed in one single place.'
                      : 'WOZ-waarden, huurcontracten, indexations en leegstand op één plek.',
                  feature: isEn
                      ? 'Automatic CPI Lease Indexation'
                      : 'Automatische huurindexatie via CPI-koppeling',
              },
              {
                  step: '02',
                  title: isEn
                      ? 'Expenses Logged Automatically'
                      : 'Kosten automatisch geregistreerd',
                  text: isEn
                      ? 'Maintenance, service fees, and mortgage interest directly deductible and organized for tax audits.'
                      : 'Onderhoud, servicekosten en hypotheekrente direct aftrekbaar en georganiseerd voor uw belastingaangifte.',
                  feature: isEn
                      ? 'Box 3 Audit Export Module'
                      : 'Box 3-aangifte exportfunctie',
              },
              {
                  step: '03',
                  title: isEn
                      ? 'Accountant Ready Reporting'
                      : 'Rapportages voor uw accountant',
                  text: isEn
                      ? 'Every quarter a fully transparent, evidence-backed financial overview per property.'
                      : 'Elk kwartaal een transparant en onderbouwd overzicht per pand.',
                  feature: isEn
                      ? 'Power BI & Excel Integration'
                      : 'Power BI & Excel-integratie',
              },
          ];

    const painPointIcons = [
        <FileSpreadsheet className='w-4.5 h-4.5 text-[#060e32]' key='1' />,
        <Link2Off className='w-4.5 h-4.5 text-[#060e32]' key='2' />,
        <Receipt className='w-4.5 h-4.5 text-[#060e32]' key='3' />,
        <Clock className='w-4.5 h-4.5 text-[#060e32]' key='4' />,
    ];

    const voorWieItems = voorWieBlock?.items?.length
        ? voorWieBlock.items.map((item: any, idx: number) => ({
              icon: painPointIcons[idx % painPointIcons.length],
              title: item.title,
              text: item.text || item.description,
          }))
        : [
              {
                  icon: painPointIcons[0],
                  title: isEn
                      ? 'Data Scattered Across Excel'
                      : 'Data verspreid over Excel-bestanden',
                  text: isEn
                      ? 'Version conflicts and manual imports impede a reliable complete portfolio overview.'
                      : 'Versieconflicten en handmatige imports belemmeren een betrouwbaar totaaloverzicht.',
              },
              {
                  icon: painPointIcons[1],
                  title: isEn
                      ? 'Management & Finance Siloed'
                      : 'Beheer en boekhouding als losse eilanden',
                  text: isEn
                      ? 'Contract management is separated from financial ledgers, resulting in duplicate work.'
                      : 'Contractbeheer staat los van de financiën, met dubbel werk als gevolg.',
              },
              {
                  icon: painPointIcons[2],
                  title: isEn
                      ? 'Cost Proof Missing'
                      : 'Kostendocumentatie niet op orde',
                  text: isEn
                      ? 'Maintenance invoices are missing or not directly linked to specific properties.'
                      : 'Facturen voor onderhoud ontbreken of zijn niet direct toegewezen aan het specifieke object.',
              },
              {
                  icon: painPointIcons[3],
                  title: isEn
                      ? 'Accountant Waiting on You'
                      : 'Accountant wacht altijd op u',
                  text: isEn
                      ? 'Quarterly and year-end closes take weeks because data has to be gathered manually.'
                      : 'Kwartaal- en jaarafsluitingen duren lang omdat gegevens handmatig verzameld moeten worden.',
              },
          ];

    const ctaBadge =
        ctaBlock?.badge || (isEn ? 'Ready for 2028?' : 'Klaar voor 2028?');
    const ctaTitle =
        ctaBlock?.title ||
        (isEn
            ? 'Keep your real estate yields audit-proof with emlinked'
            : 'Houd uw vastgoedrendement audit-proof met emlinked');
    const ctaSubtitle =
        ctaBlock?.subtitle ||
        (isEn
            ? 'Request a non-binding demo today and discover how our modular Business Central software transforms your management.'
            : 'Vraag vandaag een vrijblijvende demonstratie aan en ontdek hoe onze modulaire Business Central software uw beheer transformeert.');
    const ctaButtonText =
        ctaBlock?.buttonText ||
        (isEn ? 'Schedule Free Demonstration' : 'Gratis demonstratie plannen');
    const ctaButtonLink = ctaBlock?.buttonLink || '/contact';

    return (
        <main className='flex-1 text-white bg-slate-950'>
            {/* SECTION B: Hero Section with Clean Dashboard Preview Card */}
            <HeroSection
                label={heroLabel}
                title={heroTitle}
                subtitle={heroSubtitle}
                ctaLabel={heroCtaLabel}
                ctaLink={heroCtaLink}
                secondaryCtaLabel={heroSecCtaLabel}
                secondaryCtaLink={heroSecCtaLink}
                showProof={true}
                showProofAvatars={false}
                proofText={
                    isEn
                        ? 'Designed for 50+ property portfolios'
                        : 'Speciaal voor portefeuilles vanaf 50 eenheden'
                }
                customGraphic={
                    <Box3HeroDashboardCard
                        isEn={isEn}
                        badge={heroCardBadge}
                        title={heroCardTitle}
                        status={heroCardStatus}
                    />
                }
            />

            {/* SECTION B2: Post-Hero Box 3 Urgency Notification Bar */}
            <Box3UrgencyBar
                announcementBadge={announcementBadge}
                announcementText={announcementText}
                announcementCtaLabel={announcementCtaLabel}
                announcementCtaLink={announcementCtaLink}
            />

            {/* SECTION C: Problem & Fiscale Context (#voor-wie) */}
            <Box3VoorWieSection
                voorWieBadge={voorWieBadge}
                voorWieTitle={voorWieTitle}
                voorWieSubtitle={voorWieSubtitle}
                fiscalContextBadge={fiscalContextBadge}
                fiscalContextTitle={fiscalContextTitle}
                fiscalContextText={fiscalContextText}
                voorWieItems={voorWieItems}
            />

            {/* SECTION D: Solution Workflow (#wat-het-doet) */}
            <Box3SolutionWorkflow
                workflowBadge={workflowBadge}
                workflowTitle={workflowTitle}
                workflowItems={workflowItems}
                isEn={isEn}
            />

            {/* SECTION E: Interactive Box 3 Calculator (#calculator) */}
            <Box3Calculator
                isEn={isEn}
                badge={calculatorBlock?.badge}
                title={calculatorBlock?.title}
                subtitle={calculatorBlock?.subtitle}
                featureTitle={calculatorBlock?.featureTitle}
                featureItems={calculatorBlock?.featureItems}
            />

            {/* SECTION F: Microsoft Business Central Positioning */}
            <Box3EcosystemSection
                isEn={isEn}
                badge={ecosystemBlock?.badge}
                title={ecosystemBlock?.title}
                subtitle={ecosystemBlock?.subtitle}
                cardTitle={ecosystemBlock?.cardTitle}
                cardSubtitle={ecosystemBlock?.cardSubtitle}
                cardPoints={ecosystemBlock?.cardPoints}
                trustItems={ecosystemBlock?.trustItems}
            />

            {/* SECTION G: Final Pre-Footer Conversion CTA */}
            <Box3CtaBanner
                ctaBadge={ctaBadge}
                ctaTitle={ctaTitle}
                ctaSubtitle={ctaSubtitle}
                ctaButtonText={ctaButtonText}
                ctaButtonLink={ctaButtonLink}
                isEn={isEn}
                imagePath={
                    ctaBlock?.imagePath || '/emlinked/box3/box3-automatiseren.jpg'
                }
            />
        </main>
    );
}
