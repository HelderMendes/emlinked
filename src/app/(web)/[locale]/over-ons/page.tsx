import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import {
    ShieldCheck,
    Zap,
    Layers,
    Target,
    Sparkles,
    CheckCircle2,
    Building2,
} from 'lucide-react';
import { sanityFetch } from '@/lib/sanity';
import { DataGridCanvas } from '@/components/ui/data-grid-canvas';
import { HeroSection } from '@/components/blocks/HeroSection';
import { TeamBlock, TeamMember } from '@/components/blocks/TeamBlock';
import { buildMetadata, DEFAULT_DOMAIN } from '@/lib/seo';
import { PageBlockRenderer } from '@/components/blocks/PageBlockRenderer';
import { Box3CtaBanner } from '@/components/blocks/box3/Box3CtaBanner';
import { Badge } from '@/components/ui/Badge';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface OverOnsPageProps {
    params: Promise<{ locale: string }>;
}

async function getSanityPageData(locale: string) {
    try {
        const pageId =
            locale === 'en' ? 'page-over-ons-en' : 'page-over-ons-nl';
        return await sanityFetch<any>({
            query: `*[_type == "page" && (_id == $pageId || slug.current == $slug || slug.current == $slashSlug || slug.current == "team") && language == $locale][0] {
                title,
                tagline,
                desc,
                pageBlocks[] {
                    ...,
                    _type,
                    _key,
                    members[] {
                        ...,
                        image { asset-> { url } }
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
            params: {
                pageId,
                slug: locale === 'en' ? 'about-us' : 'over-ons',
                slashSlug: locale === 'en' ? '/about-us' : '/over-ons',
                locale,
            },
        });
    } catch (e) {
        console.error('Failed to fetch Over Ons page from Sanity:', e);
        return null;
    }
}

export async function generateMetadata({
    params,
}: OverOnsPageProps): Promise<Metadata> {
    const { locale } = await params;
    const pageData = await getSanityPageData(locale);
    const isEn = locale === 'en';

    const fallbackTitle = isEn
        ? 'About emlinked | Our Mission, Core Values & Specialist Team'
        : 'Over emlinked | Onze Missie, Kernwaarden & Team Specialisten';
    const fallbackDescription = isEn
        ? 'Meet the emlinked team. Property management software with impact, built from deep real estate and Business Central expertise.'
        : 'Maak kennis met het team van emlinked. Vastgoedbeheer software met impact, gebouwd vanuit diepgaande vastgoed- en Business Central expertise.';
    const canonicalUrl = `${DEFAULT_DOMAIN}${isEn ? '/en/about-us' : '/over-ons'}`;

    return buildMetadata({
        seo: pageData?.seo,
        fallbackTitle,
        fallbackDescription,
        canonicalUrl,
        locale,
    });
}

export default async function OverOnsPage({ params }: OverOnsPageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getSanityPageData(locale);

    const pageBlocks = pageData?.pageBlocks || [];
    const heroBlock = pageBlocks.find(
        (b: any) => b._type === 'heroBlock' || b._type === 'hero',
    );
    const missionBlock = pageBlocks.find(
        (b: any) => b._type === 'workflow' || b._type === 'featuresList',
    );
    const valuesBlock = pageBlocks.find(
        (b: any) => b._type === 'trustBar' || b._type === 'trust',
    );
    const teamBlock = pageBlocks.find(
        (b: any) => b._type === 'teamBlock' || b._type === 'team',
    );
    const ctaBlock = pageBlocks.find(
        (b: any) =>
            b._type === 'ctaBlock' ||
            b._type === 'ctaBanner' ||
            b._type === 'cta',
    );

    const defaultBlocks = [
        { _type: 'hero', ...heroBlock },
        { _type: 'workflow', ...missionBlock },
        { _type: 'trustBar', ...valuesBlock },
        { _type: 'teamBlock', ...teamBlock },
        { _type: 'ctaBlock', ...ctaBlock },
    ];

    const blocksToRender = pageBlocks.length > 0 ? pageBlocks : defaultBlocks;

    // Extract dynamic content from Sanity
    const heroTitle =
        heroBlock?.tagline ||
        pageData?.title ||
        (isEn
            ? 'Smart property management, built from real expertise.'
            : 'Slim vastgoedbeheer, gebouwd vanuit vakkennis.');
    const heroSub =
        heroBlock?.description ||
        pageData?.desc ||
        (isEn
            ? 'emlinked combines deep real estate expertise with native Microsoft Business Central software, giving property managers and controllers full control over contracts, invoicing, and reporting.'
            : 'emlinked combineert diepgaande vastgoedexpertise met native Microsoft Business Central software, zodat vastgoedbeheerders en controllers grip houden op contracten, facturatie en rapportages.');

    const teamMembers: TeamMember[] =
        teamBlock?.members?.length > 0 ? teamBlock.members : [];

    // Structured JSON-LD Data
    const canonicalPageUrl = `${DEFAULT_DOMAIN}${isEn ? '/en/about-us' : '/over-ons'}`;
    const jsonLdData = pageData?.seo?.structuredData
        ? typeof pageData.seo.structuredData === 'string'
            ? pageData.seo.structuredData
            : JSON.stringify(pageData.seo.structuredData)
        : JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                  {
                      '@type': 'AboutPage',
                      '@id': `${canonicalPageUrl}#webpage`,
                      url: canonicalPageUrl,
                      name: isEn
                          ? 'About emlinked | Our Team & Mission'
                          : 'Over emlinked | Ons Team & Onze Missie',
                      description: heroSub,
                      inLanguage: isEn ? 'en-US' : 'nl-NL',
                      isPartOf: {
                          '@type': 'WebSite',
                          '@id': `${DEFAULT_DOMAIN}/#website`,
                      },
                  },
                  {
                      '@type': 'Organization',
                      '@id': `${DEFAULT_DOMAIN}/#organization`,
                      name: 'emlinked',
                      url: DEFAULT_DOMAIN,
                      logo: `${DEFAULT_DOMAIN}/emlinked/Emlinked_logo__liggend.svg`,
                      member: teamMembers.map((m) => ({
                          '@type': 'Person',
                          name: m.name,
                          jobTitle: m.role,
                          image: `${DEFAULT_DOMAIN}${m.photoPath || '/emlinked/team/avatar_partners.png'}`,
                          worksFor: {
                              '@type': 'Organization',
                              name: 'emlinked',
                          },
                      })),
                  },
              ],
          });

    const renderHero = (b: any, key: any) => (
        <React.Fragment key={key}>
            <HeroSection
                label={
                    b?.badge ||
                    (isEn
                        ? 'PROPERTY MANAGEMENT SOFTWARE'
                        : 'SOFTWARE VOOR VASTGOEDBEHEER')
                }
                title={b?.tagline || heroTitle}
                subtitle={b?.description || heroSub}
                ctaLabel={
                    b?.ctaLabel ||
                    (isEn ? 'Get in touch directly' : 'Neem direct contact op')
                }
                ctaLink={b?.ctaLink || '#demo'}
                secondaryCtaLabel={
                    b?.secondaryCtaLabel ||
                    (isEn
                        ? 'Explore our solutions →'
                        : 'Bekijk onze oplossingen →')
                }
                secondaryCtaLink={
                    b?.secondaryCtaLink || (isEn ? '/en/apps' : '/apps')
                }
                image={b?.image}
                imagePath={b?.imagePath}
                locale={locale}
                showProof
                showProofAvatars={false}
                floatingLabels={[
                    {
                        icon: <ShieldCheck className='w-3.5 h-3.5' />,
                        value: b?.floatingLabels?.[0]?.value || '100%',
                        label:
                            b?.floatingLabels?.[0]?.label ||
                            (isEn ? 'Real estate focus' : 'Vastgoedfocus'),
                    },
                    {
                        icon: <Building2 className='w-3.5 h-3.5' />,
                        value: b?.floatingLabels?.[1]?.value || 'Native',
                        label:
                            b?.floatingLabels?.[1]?.label ||
                            'Business Central',
                    },
                ]}
                proofText={
                    b?.proofText ||
                    (isEn
                        ? 'Trusted by professional real estate managers & controllers'
                        : 'Vertrouwd door professionele vastgoedbeheerders en controllers')
                }
            />
        </React.Fragment>
    );

    const renderMission = (b: any, key: any) => (
        <section
            key={key}
            className='py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] text-[#060e32] border-b border-teal/20'
        >
            <div className='max-w-7xl mx-auto space-y-12'>
                {/* Centered Section Header */}
                <div className='text-center max-w-3xl mx-auto space-y-4'>
                    <Badge
                        color='teal'
                        uppercase
                        dot
                        dotPulse
                        className='mx-auto'
                    >
                        {b?.badge || (isEn ? 'OUR MISSION' : 'ONZE MISSIE')}
                    </Badge>
                    <h2 className='font-display text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[#060e32] leading-tight tracking-tight text-center'>
                        {b?.title ||
                            (isEn
                                ? 'Property management deserves software as sharp as the sector itself.'
                                : 'Vastgoedbeheer verdient software die net zo scherp is als de sector zelf.')}
                    </h2>
                    <p className='text-[#060e32]/80 text-base md:text-lg leading-relaxed font-light text-center max-w-2xl mx-auto'>
                        {b?.subtitle ||
                            (isEn
                                ? 'At emlinked, we combine deep real estate expertise with native Business Central software to bring administration, invoicing, and reporting seamlessly together. Our focus is on reliable automation, transparency, and measurable time savings for property managers and controllers.'
                                : 'Bij emlinked combineren we diepgaande vastgoedkennis met native Business Central software om administratie, facturatie en rapportages naadloos te laten samenkomen. Onze focus ligt op betrouwbare automatisering, transparantie en meetbare tijdswinst voor vastgoedbeheerders en controllers.')}
                    </p>
                </div>

                {/* Unified Card: Synergy Info (Left) + Mission Intro (Right) */}
                <div className='rounded-2xl bg-white/80 border border-black/10 grid grid-cols-1 lg:grid-cols-12 items-stretch group hover:border-teal/50 shadow-sm overflow-hidden transition-all duration-300 max-w-7xl mx-auto'>
                    {/* Left: Synergy Info */}
                    <div className='lg:col-span-7 p-8 md:p-10 flex flex-col justify-center gap-5 text-left relative z-10'>
                        <div className='flex items-center justify-between w-full'>
                            <div className='w-12 h-12 rounded-lg bg-teal text-white shrink-0 shadow-lg border border-white/40 flex items-center justify-center'>
                                <Target className='size-6 text-white' />
                            </div>
                            <span className='px-3.5 py-1 rounded-lg text-[11px] font-extrabold uppercase tracking-widest bg-teal/15 text-teal border border-teal/30 shadow-xs'>
                                {isEn ? 'OUR PHILOSOPHY' : 'KERNFILOSOFIE'}
                            </span>
                        </div>
                        <div className='space-y-3'>
                            <h3 className='text-xl md:text-2xl font-bold text-[#060e32] tracking-tight'>
                                {isEn
                                    ? 'Synergy Between Expertise & Technology'
                                    : 'Synergie tussen Vakkennis & Technologie'}
                            </h3>
                            <p className='text-sm md:text-base text-[#060e32]/80 leading-relaxed font-light'>
                                {isEn
                                    ? 'Whether it concerns complex contract administration or building native Business Central extensions: we eliminate operational friction with clarity.'
                                    : 'Of het nu gaat om complexe contractadministratie of het bouwen van native Business Central extensies: wij elimineren operationele frictie met helderheid.'}
                            </p>
                        </div>
                        <blockquote className='text-xs italic text-[#060e32]/80 border-l-2 border-teal pl-4 py-1.5 bg-teal/5 rounded-r-lg'>
                            {isEn
                                ? '"True alignment comes from understanding both the technical details and the human context."'
                                : '"Echte verbinding ontstaat wanneer vakkennis, menselijke maat en transparantie samenkomen."'}
                        </blockquote>
                        <div className='flex items-center gap-3 pt-2 border-t border-black/10'>
                            <div className='w-8 h-8 rounded-full bg-teal/15 flex items-center justify-center text-teal text-xs font-bold font-mono'>
                                EM
                            </div>
                            <div>
                                <div className='text-xs font-bold text-[#060e32]'>
                                    emlinked Management
                                </div>
                                <div className='text-[11px] text-teal font-mono mt-0.5'>
                                    {isEn
                                        ? 'Property Management Software'
                                        : 'Software voor Vastgoedbeheer'}
                                </div>
                            </div>
                        </div>

                        {/* 2 Feature Highlights */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div className='flex items-start gap-3 p-4 rounded-xl border border-black/10 bg-white/80 shadow-xs'>
                                <div className='w-9 h-9 rounded-lg border-2 border-teal/60 bg-[#F4F7FA] flex items-center justify-center shrink-0'>
                                    <CheckCircle2 className='w-4.5 h-4.5 text-teal' />
                                </div>
                                <div className='space-y-0.5 text-left'>
                                    <h4 className='text-xs font-bold text-[#060e32]'>
                                        {isEn
                                            ? 'Reliable Automation'
                                            : 'Betrouwbare Automatisering'}
                                    </h4>
                                    <p className='text-[11px] text-[#060e32]/70'>
                                        {isEn
                                            ? 'Less manual work, fewer errors'
                                            : 'Minder handwerk, minder fouten'}
                                    </p>
                                </div>
                            </div>
                            <div className='flex items-start gap-3 p-4 rounded-xl border border-black/10 bg-white/80 shadow-xs'>
                                <div className='w-9 h-9 rounded-lg border-2 border-teal/60 bg-[#F4F7FA] flex items-center justify-center shrink-0'>
                                    <CheckCircle2 className='w-4.5 h-4.5 text-teal' />
                                </div>
                                <div className='space-y-0.5 text-left'>
                                    <h4 className='text-xs font-bold text-[#060e32]'>
                                        {isEn
                                            ? 'Tangible Results'
                                            : 'Concrete Resultaten'}
                                    </h4>
                                    <p className='text-[11px] text-[#060e32]/70'>
                                        {isEn
                                            ? 'Measurable time savings'
                                            : 'Meetbare tijdswinst'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Integrated Image, height matches left column */}
                    <div className='lg:col-span-5 relative min-h-[300px] overflow-hidden bg-slate-950'>
                        <Image
                            src='/emlinked/referenties/beheerders_referencties.jpg'
                            alt={
                                isEn
                                    ? 'emlinked property management specialists'
                                    : 'emlinked vastgoedbeheer specialisten'
                            }
                            fill
                            sizes='(max-width: 1024px) 100vw, 50vw'
                            className='object-cover object-center group-hover:scale-105 transition-transform duration-700'
                        />
                        <div className='absolute inset-0 bg-linear-to-r from-white/10 via-transparent to-transparent pointer-events-none' />
                    </div>
                </div>
            </div>
        </section>
    );

    const renderValues = (b: any, key: any) => (
        <section
            key={key}
            className='px-6 py-20 relative z-10 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] text-[#060e32] border-b border-teal/10'
        >
            <div className='max-w-7xl mx-auto space-y-16'>
                <div className='text-center max-w-3xl mx-auto space-y-4 mb-12'>
                    <div className='flex justify-center mb-3'>
                        <Badge color='teal' uppercase>
                            <Layers className='w-3.5 h-3.5 text-teal' />
                            {isEn ? 'CORE PILLARS' : 'ONZE KERNWAARDEN'}
                        </Badge>
                    </div>

                    <h2 className='font-display text-3xl md:text-4xl lg:text-[2.5rem] font-bold tracking-tight text-[#060e32]'>
                        {b?.title ||
                            (isEn ? 'Our Core Values' : 'Onze Kernwaarden')}
                    </h2>

                    <p className='text-[#060e32]/75 text-base md:text-lg leading-relaxed font-light'>
                        {b?.subtitle ||
                            (isEn
                                ? 'The foundation of our transparent and data-driven way of working.'
                                : 'De fundamenten van onze transparante en datagedreven werkwijze.')}
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {/* Card 1 */}
                    <div className='px-8 pt-8 pb-7 rounded-3xl bg-white border border-navy-900/10 hover:border-teal/40 hover:shadow-lg transition-all duration-300 space-y-4 group relative'>
                        <div className='absolute -top-3.5 -right-3 z-30 size-12 sm:size-14 rounded-xl bg-teal text-white shadow-lg border-2 border-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 pointer-events-none'>
                            <ShieldCheck className='w-6 h-6' />
                        </div>
                        <h3 className='font-display font-bold text-xl text-[#060e32] group-hover:text-teal transition-colors'>
                            {isEn
                                ? 'Transparency & Integrity'
                                : 'Transparantie & Integriteit'}
                        </h3>
                        <p className='text-xs md:text-sm text-[#060e32]/80 leading-relaxed font-light'>
                            {isEn
                                ? 'No vague promises, but data-driven and honest communication at every stage of implementation and support.'
                                : 'Geen vage beloftes, maar datagedreven en eerlijke communicatie in elke fase van implementatie en support.'}
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className='px-8 pt-8 pb-7 rounded-3xl bg-white border border-navy-900/10 hover:border-teal/40 hover:shadow-lg transition-all duration-300 space-y-4 group relative'>
                        <div className='absolute -top-3.5 -right-3 z-30 size-12 sm:size-14 rounded-xl bg-teal text-white shadow-lg border-2 border-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 pointer-events-none'>
                            <Layers className='w-6 h-6' />
                        </div>
                        <h3 className='font-display font-bold text-xl text-[#060e32] group-hover:text-teal transition-colors'>
                            {isEn
                                ? 'Sector-Specific Expertise'
                                : 'Sectorspecifieke Expertise'}
                        </h3>
                        <p className='text-xs md:text-sm text-[#060e32]/80 leading-relaxed font-light'>
                            {isEn
                                ? 'Deep domain knowledge in real estate and Business Central ensures software that truly fits daily practice.'
                                : 'Diepe domeinkennis binnen vastgoed en Business Central zorgt voor software die naadloos aansluit op de dagelijkse praktijk.'}
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className='px-8 pt-8 pb-7 rounded-3xl bg-white border border-navy-900/10 hover:border-teal/40 hover:shadow-lg transition-all duration-300 space-y-4 group relative'>
                        <div className='absolute -top-3.5 -right-3 z-30 size-12 sm:size-14 rounded-xl bg-teal text-white shadow-lg border-2 border-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 pointer-events-none'>
                            <Zap className='w-6 h-6' />
                        </div>
                        <h3 className='font-display font-bold text-xl text-[#060e32] group-hover:text-teal transition-colors'>
                            {isEn
                                ? 'Agility & Custom Work'
                                : 'Wendbaarheid & Maatwerk'}
                        </h3>
                        <p className='text-xs md:text-sm text-[#060e32]/80 leading-relaxed font-light'>
                            {isEn
                                ? 'Proactive development and flexible configuration that immediately respond to evolving organizational needs.'
                                : 'Proactieve doorontwikkeling en flexibele configuratie die direct inspelen op veranderende organisatiebehoeften.'}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );

    const renderTeam = (b: any, key: any) => {
        const members: TeamMember[] =
            b?.members?.length > 0 ? b.members : teamMembers;
        return (
            <div
                key={key}
                className='bg-stone-bg text-navy-900 relative border-b border-navy-900/10'
            >
                <TeamBlock
                    sectionTitle={b?.sectionTitle}
                    sectionSubtitle={b?.sectionSubtitle}
                    members={members}
                    locale={locale}
                />
            </div>
        );
    };

    const renderCta = (b: any, key: any) => (
        <div key={key}>
            <Box3CtaBanner
                ctaBadge={
                    b?.tag ||
                    (isEn ? 'START THE CONVERSATION' : 'GA HET GESPREK AAN')
                }
                ctaTitle={
                    b?.title ||
                    (isEn
                        ? 'Ready to elevate your property management?'
                        : 'Klaar om je vastgoedadministratie naar het volgende niveau te tillen?')
                }
                ctaSubtitle={
                    b?.subtitle ||
                    (isEn
                        ? 'Discover how emlinked automates your property management and discuss the possibilities with our specialists.'
                        : 'Ontdek hoe emlinked jouw vastgoedbeheer automatiseert en bespreek de mogelijkheden met onze specialisten.')
                }
                ctaButtonText={
                    b?.primaryCtaLabel ||
                    (isEn ? 'Get in touch directly' : 'Neem direct contact op')
                }
                ctaButtonLink={b?.primaryCtaUrl || '#demo'}
                secondaryButtonText={
                    b?.secondaryCtaLabel ||
                    (isEn ? 'Explore our solutions' : 'Bekijk onze oplossingen')
                }
                secondaryButtonLink={
                    b?.secondaryCtaUrl || (isEn ? '/en/apps' : '/apps')
                }
                isEn={isEn}
                image={b?.image}
                imagePath={
                    b?.imagePath || '/emlinked/referenties/adviesgesprek.jpg'
                }
            />
        </div>
    );

    return (
        <main className='flex-1 bg-background text-foreground relative overflow-hidden'>
            {/* Inject JSON-LD */}
            {jsonLdData && (
                <script
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{ __html: jsonLdData }}
                />
            )}

            {blocksToRender.map((block: any, idx: number) => {
                const key = block._key || `${block._type}-${idx}`;

                if (block._type === 'hero' || block._type === 'heroBlock') {
                    return renderHero(block, key);
                }

                if (
                    block._type === 'workflow' ||
                    block._type === 'featuresList'
                ) {
                    return renderMission(block, key);
                }

                if (block._type === 'trustBar' || block._type === 'trust') {
                    return renderValues(block, key);
                }

                if (block._type === 'teamBlock' || block._type === 'team') {
                    return renderTeam(block, key);
                }

                if (
                    block._type === 'ctaBlock' ||
                    block._type === 'ctaBanner' ||
                    block._type === 'cta'
                ) {
                    return renderCta(block, key);
                }

                return (
                    <PageBlockRenderer
                        key={key}
                        block={block}
                        locale={locale}
                    />
                );
            })}
        </main>
    );
}
