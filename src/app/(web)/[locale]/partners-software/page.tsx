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
                label={
                    heroBlock?.label ||
                    (isEn
                        ? 'STRATEGIC ECOSYSTEM PARTNERS'
                        : 'STRATEGISCHE ECOSYSTEEM PARTNERS')
                }
                title={
                    heroBlock?.title ||
                    (isEn
                        ? 'Software Partners & *Direct Integrations* with Your Favorite Software'
                        : 'Softwarepartners & *directe koppelingen* met je favoriete software')
                }
                subtitle={
                    heroBlock?.subtitle ||
                    (isEn
                        ? 'emlinked is engineered in close collaboration between DRVM real estate specialists and Microsoft partner faect. Built 100% natively in the cloud.'
                        : 'emlinked is het resultaat van een unieke samenwerking tussen de vastgoedspecialisten van DRVM en Microsoft-partner faect. 100% cloud-native vastgoedsoftware.')
                }
                ctaLabel={
                    heroBlock?.ctaLabel ||
                    (isEn
                        ? 'Explore integrations ↓'
                        : 'Ontdek de integraties ↓')
                }
                ctaLink={heroBlock?.ctaLink || (isEn ? '/en/apps' : '/apps')}
                secondaryCtaLabel={
                    heroBlock?.secondaryCtaLabel ||
                    (isEn ? 'Speak with us' : 'Spreek met ons')
                }
                secondaryCtaLink={
                    heroBlock?.secondaryCtaLink ||
                    (isEn ? '/en/contact' : '/contact')
                }
                showProof={true}
                showProofAvatars={false}
                proofText={
                    isEn
                        ? 'Certified ISV Partners & Native Extensions'
                        : 'Gecertificeerde ISV-partners & Native Extensies'
                }
                titleClassName='text-3xl sm:text-4xl lg:text-[2.75rem]'
                imagePath={
                    heroBlock?.imagePath ||
                    '/emlinked/partners/partners_hero.jpg'
                }
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
                ctaBadge={
                    ctaBlock?.badge ||
                    (isEn
                        ? 'Ready for streamlined real estate management?'
                        : 'Klaar voor gestroomlijnd vastgoedbeheer?')
                }
                ctaTitle={
                    ctaBlock?.title ||
                    (isEn
                        ? 'Experience the power of emlinked and our software partners'
                        : 'Ervaar de kracht van emlinked en onze software-partners')
                }
                ctaSubtitle={
                    ctaBlock?.subtitle ||
                    (isEn
                        ? 'emlinked unifies commercial, technical, and administrative real estate management into one clear platform.'
                        : 'emlinked brengt commercieel, technisch en administratief vastgoedbeheer samen in één overzichtelijk platform.')
                }
                ctaButtonText={
                    ctaBlock?.buttonText ||
                    (isEn
                        ? 'Request a free demo'
                        : 'Vraag vrijblijvend een demo aan')
                }
                ctaButtonLink={ctaBlock?.buttonLink || '/contact'}
                isEn={isEn}
                imagePath={
                    ctaBlock?.imagePath ||
                    '/emlinked/partners/klaar-voor-gestroomlijnd.jpg'
                }
            />
        </main>
    );
}
