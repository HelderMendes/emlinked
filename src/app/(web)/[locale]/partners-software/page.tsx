import type { Metadata } from 'next';
import { buildMetadata, DEFAULT_DOMAIN } from '@/lib/seo';
import { sanityFetch } from '@/lib/sanity';
import { HeroSection } from '@/components/blocks/HeroSection';
import { PartnersSectionComponent } from '@/components/blocks/partners/PartnersSectionComponent';
import { Box3CtaBanner } from '@/components/blocks/box3/Box3CtaBanner';

async function getSanityPageData(locale: string) {
    try {
        return await sanityFetch({
            query: `*[_type == "page" && (slug.current == "partners-software" || slug.current == "/partners-software") && language == $locale][0]`,
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

    const heroBlock = pageBlocks.find((b: any) => b._type === 'hero');
    const partnersBlock = pageBlocks.find(
        (b: any) => b._type === 'partnersSection' || b._type === 'partners',
    );
    const ctaBlock = pageBlocks.find(
        (b: any) => b._type === 'ctaBanner' || b._type === 'cta',
    );

    return (
        <main className='flex-1 text-white bg-slate-950'>
            {/* HERO SECTION - 100% Sanity CMS Driven */}
            <HeroSection
                label={heroBlock?.label}
                title={heroBlock?.title}
                subtitle={heroBlock?.subtitle}
                ctaLabel={heroBlock?.ctaLabel}
                ctaLink={heroBlock?.ctaLink}
                secondaryCtaLabel={heroBlock?.secondaryCtaLabel}
                secondaryCtaLink={heroBlock?.secondaryCtaLink}
                showProof={true}
                showProofAvatars={false}
                proofText={heroBlock?.proofText}
                titleClassName='text-3xl sm:text-4xl lg:text-[2.75rem]'
                imagePath={heroBlock?.imagePath}
                locale={locale}
            />

            {/* PARTNERS & SOFTWARE INTEGRATIONS SECTION - 100% Sanity CMS Driven */}
            <PartnersSectionComponent
                badge={partnersBlock?.badge}
                title={partnersBlock?.title}
                subtitle={partnersBlock?.subtitle}
                valueTags={partnersBlock?.valueTags}
                partners={partnersBlock?.partners}
                isEn={isEn}
            />

            {/* PRE-FOOTER CONVERSION CTA - 100% Sanity CMS Driven */}
            <Box3CtaBanner
                ctaBadge={ctaBlock?.badge}
                ctaTitle={ctaBlock?.title}
                ctaSubtitle={ctaBlock?.subtitle}
                ctaButtonText={ctaBlock?.buttonText}
                ctaButtonLink={ctaBlock?.buttonLink}
                isEn={isEn}
                imagePath={ctaBlock?.imagePath}
            />
        </main>
    );
}
