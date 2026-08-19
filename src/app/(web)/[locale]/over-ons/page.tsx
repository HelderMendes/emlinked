import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { 
    ShieldCheck, 
    Zap, 
    Layers, 
    Target, 
    ArrowRight,
    Users,
    Sparkles,
    CheckCircle2
} from 'lucide-react';
import { sanityFetch } from '@/lib/sanity';
import { DataGridCanvas } from '@/components/ui/data-grid-canvas';
import { HeroSection } from '@/components/blocks/HeroSection';
import { TeamBlock, TeamMember } from '@/components/blocks/TeamBlock';
import { GlowingLink } from '@/components/ui/GlowingButton';
import { buildMetadata, DEFAULT_DOMAIN } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface OverOnsPageProps {
    params: Promise<{ locale: string }>;
}

async function getSanityPageData(locale: string) {
    try {
        return await sanityFetch<any>({
            query: `*[_type == "page" && (slug.current == "over-ons" || slug.current == "about-us" || slug.current == "team") && language == $locale][0] {
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
            params: { locale },
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
        ? 'Meet the emlinked team. Human-centric interim & recruitment solutions with impact powered by deep real estate and Business Central expertise.'
        : 'Maak kennis met het team van emlinked. Mensgerichte interim & werving oplossingen met impact gekoppeld aan diepgaande vastgoed- en Business Central expertise.';
    const canonicalUrl = `${DEFAULT_DOMAIN}${isEn ? '/en/about-us' : '/over-ons'}`;

    return buildMetadata({
        seo: pageData?.seo,
        fallbackTitle,
        fallbackDescription,
        canonicalUrl,
        locale,
    });
}

const fallbackMembers: Record<'nl' | 'en', TeamMember[]> = {
    nl: [
        {
            name: 'Raymond Perridon',
            role: 'Founder & Managing Partner',
            focusArea: 'Executive Leadership & Strategie',
            badge: 'Managing Partner',
            photoPath: '/emlinked/team/RaymondPerridon.jpg',
            bio: 'Oprichter en strategisch leider van emlinked. Met een brede visie op de veranderende arbeidsmarkt en vastgoedsector verbindt hij organisaties met hoogwaardig interim- en vast talent.',
            linkedin: 'https://www.linkedin.com/company/emlinked/',
            email: 'info@emlinked.com',
        },
        {
            name: 'Iryna Samiliak',
            role: 'Executive Recruitment & Operations Lead',
            focusArea: 'Executive Search & Werving',
            badge: 'Executive Search',
            photoPath: '/emlinked/team/Iryna.jpg',
            bio: 'Gespecialiseerd in het verbinden van C-level en senior talent binnen snelgroeiende organisaties. Combineert data-gedreven wervingsmethodieken met een persoonlijke, transparante aanpak.',
            linkedin: 'https://www.linkedin.com/company/emlinked/',
            email: 'info@emlinked.com',
        },
        {
            name: 'Thorwald',
            role: 'Senior Interim Recruitment Specialist',
            focusArea: 'Publieke & Private Sector Interim',
            badge: 'Interim Management',
            photoPath: '/emlinked/team/Thorwald.jpg',
            bio: 'Focus op complexe interim vraagstukken binnen de overheid, zorg en vastgoed. Zorgt voor snelle schaalbaarheid en trefzekere interim plaatsingen met directe impact.',
            linkedin: 'https://www.linkedin.com/company/emlinked/',
            email: 'info@emlinked.com',
        },
        {
            name: 'Manfred',
            role: 'Business Central & Finance Consultant',
            focusArea: 'ERP & Financiële Automatisering',
            badge: 'Finance & ERP',
            photoPath: '/emlinked/team/Manfred.jpg',
            bio: 'Expert in Microsoft Dynamics 365 Business Central en geautomatiseerde bankaflettering. Helpt organisaties hun financiële processen foutloos te integreren.',
            linkedin: 'https://www.linkedin.com/company/emlinked/',
            email: 'info@emlinked.com',
        },
        {
            name: 'Ebenezer',
            role: 'Software Architecture & AL Engineer',
            focusArea: 'Native Business Central Apps',
            badge: 'Software Architecture',
            photoPath: '/emlinked/team/Ebenezer.jpg',
            bio: 'Verantwoordelijk voor de robuuste AL-codebase en cloud-architectuur van emlinked. Ontwikkelt native extensies die schaalbaar presteren in Business Central.',
            linkedin: 'https://www.linkedin.com/company/emlinked/',
            email: 'info@emlinked.com',
        },
        {
            name: 'Elisabeth',
            role: 'Customer Success & Onboarding Specialist',
            focusArea: 'Onboarding & Support',
            badge: 'Customer Success',
            photoPath: '/emlinked/team/Elisabeth.jpg',
            bio: 'Begeleidt opdrachtgevers en professionals tijdens de onboarding. Toegewijd aan maximale klanttevredenheid, heldere communicatie en langdurige samenwerking.',
            linkedin: 'https://www.linkedin.com/company/emlinked/',
            email: 'info@emlinked.com',
        },
    ],
    en: [
        {
            name: 'Raymond Perridon',
            role: 'Founder & Managing Partner',
            focusArea: 'Executive Leadership & Strategy',
            badge: 'Managing Partner',
            photoPath: '/emlinked/team/RaymondPerridon.jpg',
            bio: 'Founder and strategic leader at emlinked. With a broad vision for the evolving labor market and real estate sector, he connects organizations with top interim and permanent talent.',
            linkedin: 'https://www.linkedin.com/company/emlinked/',
            email: 'info@emlinked.com',
        },
        {
            name: 'Iryna Samiliak',
            role: 'Executive Recruitment & Operations Lead',
            focusArea: 'Executive Search & Recruitment',
            badge: 'Executive Search',
            photoPath: '/emlinked/team/Iryna.jpg',
            bio: 'Specialized in connecting C-level and senior talent within fast-growing organizations. Combines data-driven sourcing with a personal, transparent touch.',
            linkedin: 'https://www.linkedin.com/company/emlinked/',
            email: 'info@emlinked.com',
        },
        {
            name: 'Thorwald',
            role: 'Senior Interim Recruitment Specialist',
            focusArea: 'Public & Private Sector Interim',
            badge: 'Interim Management',
            photoPath: '/emlinked/team/Thorwald.jpg',
            bio: 'Focused on complex interim challenges across government, healthcare, and real estate. Delivers rapid scalability and high-impact interim placements.',
            linkedin: 'https://www.linkedin.com/company/emlinked/',
            email: 'info@emlinked.com',
        },
        {
            name: 'Manfred',
            role: 'Business Central & Finance Consultant',
            focusArea: 'ERP & Financial Automation',
            badge: 'Finance & ERP',
            photoPath: '/emlinked/team/Manfred.jpg',
            bio: 'Expert in Microsoft Dynamics 365 Business Central and automated bank reconciliation. Helps organizations integrate financial workflows flawlessly.',
            linkedin: 'https://www.linkedin.com/company/emlinked/',
            email: 'info@emlinked.com',
        },
        {
            name: 'Ebenezer',
            role: 'Software Architecture & AL Engineer',
            focusArea: 'Native Business Central Apps',
            badge: 'Software Architecture',
            photoPath: '/emlinked/team/Ebenezer.jpg',
            bio: 'Responsible for emlinked’s robust AL codebase and cloud architecture. Builds high-performance native extensions for Business Central.',
            linkedin: 'https://www.linkedin.com/company/emlinked/',
            email: 'info@emlinked.com',
        },
        {
            name: 'Elisabeth',
            role: 'Customer Success & Onboarding Specialist',
            focusArea: 'Onboarding & Support',
            badge: 'Customer Success',
            photoPath: '/emlinked/team/Elisabeth.jpg',
            bio: 'Guides clients and professionals through onboarding. Dedicated to maximum satisfaction, clear communication, and long-term partnerships.',
            linkedin: 'https://www.linkedin.com/company/emlinked/',
            email: 'info@emlinked.com',
        },
    ],
};

export default async function OverOnsPage({ params }: OverOnsPageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getSanityPageData(locale);
    const defaultMembers = isEn ? fallbackMembers.en : fallbackMembers.nl;

    const pageBlocks = pageData?.pageBlocks || [];
    const heroBlock = pageBlocks.find((b: any) => b._type === 'heroBlock');
    const missionBlock = pageBlocks.find((b: any) => b._type === 'workflow');
    const valuesBlock = pageBlocks.find((b: any) => b._type === 'trustBar');
    const teamBlock = pageBlocks.find((b: any) => b._type === 'teamBlock');
    const ctaBlock = pageBlocks.find((b: any) => b._type === 'ctaBlock');

    // Extract dynamic content or fallback
    const heroTitle = heroBlock?.tagline || pageData?.title || (isEn ? 'Human-Centric Interim & Recruitment Solutions with Impact.' : 'Mensgerichte Interim & Werving Oplossingen met Impact.');
    const heroSub = heroBlock?.description || pageData?.desc || (isEn ? 'We connect top talent and leading organizations across the public and private sectors through sharp domain knowledge, transparency, and a sustainable vision.' : 'Wij verbinden toptalent en toonaangevende organisaties binnen de publieke en private sector door scherpe vakkennis, transparantie en een duurzame visie.');

    const teamMembers: TeamMember[] = teamBlock?.members?.length > 0 ? teamBlock.members : defaultMembers;

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
                      name: isEn ? 'About emlinked | Our Team & Mission' : 'Over emlinked | Ons Team & Onze Missie',
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

    return (
        <main className='flex-1 bg-background text-foreground relative overflow-hidden'>
            {/* Inject JSON-LD */}
            {jsonLdData && (
                <script
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{ __html: jsonLdData }}
                />
            )}

            {/* ── SECTION 0: HERO SECTION (DARK TEXTURE NAVY) ── */}
            <div className='bg-texture-navy text-white relative border-b border-white/10'>
                <HeroSection
                    label={heroBlock?.badge || (isEn ? 'HUMAN-CENTRIC RECRUITMENT & SAAS' : 'MENSGERICHT RECRUITMENT & SAAS')}
                    title={heroTitle}
                    subtitle={heroSub}
                    ctaLabel={heroBlock?.ctaLabel || (isEn ? 'Get in touch directly' : 'Neem direct contact op')}
                    ctaLink={heroBlock?.ctaLink || '#demo'}
                    secondaryCtaLabel={heroBlock?.secondaryCtaLabel || (isEn ? 'Explore our solutions →' : 'Bekijk onze oplossingen →')}
                    secondaryCtaLink={heroBlock?.secondaryCtaLink || (isEn ? '/en/apps' : '/apps')}
                    proofText={heroBlock?.proofText || (isEn ? 'Trusted by professional organizations, real estate managers, and IT leaders' : 'Vertrouwd door professionele organisaties, vastgoedbeheerders en IT-leiders')}
                    locale={locale}
                    showProof={true}
                />
            </div>

            {/* ── SECTION 1: ONZE MISSIE & VISIE (LIGHT SECTION WITH RICH TYPOGRAPHY) ── */}
            <section className='px-6 py-20 relative z-10 bg-white text-slate-900 border-b border-slate-200'>
                <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10'>
                    {/* Left Column: Mission Content */}
                    <div className='lg:col-span-7 space-y-6 text-left'>
                        <span className='inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/15 px-4 py-1.5 text-xs font-mono font-bold tracking-wider text-amber uppercase backdrop-blur-md shadow-xs'>
                            <Sparkles className='w-3.5 h-3.5 text-amber' />
                            {missionBlock?.badge || (isEn ? 'ARCHITECTING MEANINGFUL MATCHES' : 'ARCHITECTING MEANINGFUL MATCHES')}
                        </span>

                        <h2 className='font-display font-bold text-3xl md:text-4xl text-darkblue leading-tight'>
                            {missionBlock?.title || (isEn
                                ? 'The labor market demands more than quick transactions; it requires strategic synergy.'
                                : 'De arbeidsmarkt vraagt om meer dan snelle transacties; het vereist strategische synergie.')}
                        </h2>

                        <p className='text-slate-600 text-base md:text-lg leading-relaxed font-light'>
                            {missionBlock?.subtitle || (isEn
                                ? 'At emlinked, we combine deep sector expertise with advanced recruitment methodologies to seamlessly synchronize professionals and clients. Our focus is on long-term employability, mutual growth, and tangible results across complex interim and permanent challenges.'
                                : 'Bij emlinked combineren we diepgaande sectorkennis met geavanceerde wervingsmethodieken om professionals en opdrachtgevers naadloos te synchroniseren. Onze focus ligt op duurzame inzetbaarheid, wederzijdse groei en concrete resultaten binnen complexe interim- en vaste vraagstukken.')}
                        </p>

                        <div className='pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div className='flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/80 shadow-xs'>
                                <CheckCircle2 className='w-5 h-5 text-amber shrink-0 mt-0.5' />
                                <div className='space-y-0.5 text-left'>
                                    <h4 className='text-xs font-bold text-darkblue'>{isEn ? 'Sustainable Employability' : 'Duurzame Inzetbaarheid'}</h4>
                                    <p className='text-[11px] text-slate-600'>{isEn ? 'Long-term mutual alignment & career growth' : 'Wederzijdse groei & lange-termijn matches'}</p>
                                </div>
                            </div>
                            <div className='flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/80 shadow-xs'>
                                <CheckCircle2 className='w-5 h-5 text-amber shrink-0 mt-0.5' />
                                <div className='space-y-0.5 text-left'>
                                    <h4 className='text-xs font-bold text-darkblue'>{isEn ? 'Tangible Results' : 'Concrete Resultaten'}</h4>
                                    <p className='text-[11px] text-slate-600'>{isEn ? 'Proven execution in complex sectors' : 'Trefzekere oplossingen in complexe vraagstukken'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visual Architectural Card */}
                    <div className='lg:col-span-5 relative'>
                        <div className='relative rounded-3xl border border-amber/30 bg-slate-900 text-white p-8 md:p-10 shadow-2xl text-left overflow-hidden group'>
                            <div className='absolute -inset-1 bg-gradient-to-r from-amber/20 via-indigo-500/10 to-amber/20 blur-xl opacity-60 pointer-events-none' />

                            <div className='relative z-10 space-y-6'>
                                <div className='w-12 h-12 rounded-2xl bg-amber/15 border border-amber/30 flex items-center justify-center text-amber shadow-md'>
                                    <Target className='w-6 h-6' />
                                </div>

                                <div className='space-y-2'>
                                    <h3 className='font-display font-bold text-xl text-white'>
                                        {isEn ? 'Synergy Between Expertise & Technology' : 'Synergie tussen Vakkennis & Technologie'}
                                    </h3>
                                    <p className='text-xs text-slate-300 leading-relaxed font-light'>
                                        {isEn
                                            ? 'Whether providing senior interim capacity for government & real estate or building native Business Central apps, we eliminate operational friction with clarity.'
                                            : 'Of het nu gaat om interim capaciteit binnen overheid en vastgoed, of het bouwen van native Business Central extensies: wij elimineren operationele frictie met helderheid.'}
                                    </p>
                                </div>

                                <blockquote className='text-xs italic text-slate-200 border-l-2 border-amber pl-4 py-1.5 bg-white/[0.04] rounded-r-lg'>
                                    {isEn
                                        ? '"True alignment comes from understanding both the technical details and the human context."'
                                        : '"Echte verbinding ontstaat wanneer vakkennis, menselijke maat en transparantie samenkomen."'
                                    }
                                </blockquote>

                                <div className='pt-2 flex items-center gap-3 border-t border-white/10'>
                                    <div className='w-8 h-8 rounded-full bg-amber/20 flex items-center justify-center text-amber text-xs font-bold font-mono'>
                                        EM
                                    </div>
                                    <div>
                                        <div className='text-xs font-bold text-white'>emlinked Management</div>
                                        <div className='text-[10px] text-amber font-mono'>{isEn ? 'Interim & SaaS Solutions' : 'Interim & SaaS Oplossingen'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 2: KERNWAARDEN (WARM LIGHT TINT SECTION) ── */}
            <section className='px-6 py-20 relative z-10 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] text-[#060e32] border-b border-amber/10'>
                <div className='max-w-7xl mx-auto space-y-16'>
                    <div className='text-center max-w-3xl mx-auto space-y-4 mb-12'>
                        <div className='flex justify-center mb-1'>
                            <span className='inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/15 px-4 py-1.5 text-xs font-mono font-bold tracking-wider text-amber uppercase backdrop-blur-md shadow-xs'>
                                <Layers className='w-3.5 h-3.5 text-amber' />
                                {isEn ? 'CORE PILLARS' : 'ONZE KERNWAARDEN'}
                            </span>
                        </div>

                        <h2 className='font-display text-3xl md:text-4xl lg:text-[2.5rem] font-bold tracking-tight text-[#060e32]'>
                            {valuesBlock?.title || (isEn ? 'Our Core Values' : 'Onze Kernwaarden')}
                        </h2>

                        <p className='text-[#060e32]/75 text-base md:text-lg leading-relaxed font-light'>
                            {valuesBlock?.subtitle || (isEn ? 'The foundation of our transparent and data-driven way of working.' : 'De fundamenten van onze transparante en datagedreven werkwijze.')}
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        {/* Card 1 */}
                        <div className='rounded-2xl border border-amber/20 bg-white p-8 text-left space-y-5 hover:border-amber/50 transition-all duration-300 hover:-translate-y-1 group shadow-lg'>
                            <div className='w-12 h-12 rounded-2xl bg-amber/15 border border-amber/30 flex items-center justify-center text-amber shadow-md group-hover:scale-110 transition-transform'>
                                <ShieldCheck className='w-6 h-6' />
                            </div>
                            <h3 className='font-display font-bold text-xl text-[#060e32] group-hover:text-amber transition-colors'>
                                {isEn ? 'Transparency & Integrity' : 'Transparantie & Integriteit'}
                            </h3>
                            <p className='text-xs md:text-sm text-[#060e32]/80 leading-relaxed font-light'>
                                {isEn
                                    ? 'No vague promises, but data-driven and honest communication at every stage of the recruitment and software lifecycle.'
                                    : 'Geen vage beloftes, maar datagedreven en eerlijke communicatie in elk stadium van het recruitment- en softwareproces.'}
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className='rounded-2xl border border-amber/20 bg-white p-8 text-left space-y-5 hover:border-amber/50 transition-all duration-300 hover:-translate-y-1 group shadow-lg'>
                            <div className='w-12 h-12 rounded-2xl bg-amber/15 border border-amber/30 flex items-center justify-center text-amber shadow-md group-hover:scale-110 transition-transform'>
                                <Layers className='w-6 h-6' />
                            </div>
                            <h3 className='font-display font-bold text-xl text-[#060e32] group-hover:text-amber transition-colors'>
                                {isEn ? 'Sector-Specific Expertise' : 'Sectorspecifieke Expertise'}
                            </h3>
                            <p className='text-xs md:text-sm text-[#060e32]/80 leading-relaxed font-light'>
                                {isEn
                                    ? 'Deep domain knowledge within government, education, healthcare, real estate, and business guarantees precise placements.'
                                    : 'Diepe domeinkennis binnen overheid, onderwijs, zorg, vastgoed en het bedrijfsleven garandeert trefzekere plaatsingen.'}
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className='rounded-2xl border border-amber/20 bg-white p-8 text-left space-y-5 hover:border-amber/50 transition-all duration-300 hover:-translate-y-1 group shadow-xl'>
                            <div className='w-12 h-12 rounded-2xl bg-amber/15 border border-amber/30 flex items-center justify-center text-amber shadow-md group-hover:scale-110 transition-transform'>
                                <Zap className='w-6 h-6' />
                            </div>
                            <h3 className='font-display font-bold text-xl text-[#060e32] group-hover:text-amber transition-colors'>
                                {isEn ? 'Agility & Custom Work' : 'Wendbaarheid & Maatwerk'}
                            </h3>
                            <p className='text-xs md:text-sm text-[#060e32]/80 leading-relaxed font-light'>
                                {isEn
                                    ? 'Proactive sourcing and flexible interim solutions that immediately respond to evolving organizational needs.'
                                    : 'Proactieve sourcing en flexibele interim-oplossingen die direct inspelen op veranderende organisatiebehoeften.'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 3: HET TEAM (DARK CONTRASTING SHOWCASE) ── */}
            <div className='bg-texture-navy text-white relative border-b border-white/10'>
                <TeamBlock
                    sectionTitle={teamBlock?.sectionTitle}
                    sectionSubtitle={teamBlock?.sectionSubtitle}
                    members={teamMembers}
                    locale={locale}
                />
            </div>

            {/* ── SECTION 4: CALL TO ACTION (ENGAGEMENT HOOK) ── */}
            <section className='px-6 py-20 relative z-10 bg-background'>
                <div className='relative rounded-3xl border border-amber/40 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 md:p-14 overflow-hidden text-center max-w-5xl mx-auto shadow-2xl text-white'>
                    <div className='absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber/10 rounded-full blur-[120px] pointer-events-none' />

                    <div className='relative z-10 space-y-6 max-w-3xl mx-auto'>
                        <span className='inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/15 px-4 py-1.5 text-xs font-mono font-bold tracking-wider text-amber uppercase backdrop-blur-md'>
                            <Users className='w-3.5 h-3.5 text-amber' />
                            {isEn ? 'START THE CONVERSATION' : 'GA HET GESPREK AAN'}
                        </span>

                        <h2 className='font-display font-bold text-3xl md:text-4xl lg:text-[2.75rem] text-white leading-tight'>
                            {ctaBlock?.title || (isEn ? 'Ready to strengthen your organization or career?' : 'Klaar om je organisatie of carrière te versterken?')}
                        </h2>

                        <p className='text-slate-300 text-base md:text-lg leading-relaxed font-light'>
                            {ctaBlock?.subtitle || (isEn
                                ? 'Discover how our targeted approach makes the difference for your interim capacity or next career move.'
                                : 'Ontdek hoe onze gerichte aanpak het verschil maakt voor je interim-capaciteit of volgende carrièrestap.')}
                        </p>

                        <div className='flex flex-col sm:flex-row justify-center items-center gap-4 pt-4'>
                            <GlowingLink
                                href={ctaBlock?.primaryCtaUrl || '#demo'}
                                className='inline-flex h-14 items-center justify-center rounded-2xl border-0 bg-gradient-to-r from-[#FF9500] via-[#FF5E00] to-[#FF3B00] hover:brightness-110 px-8 text-base font-bold text-white transition-all duration-200 shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98]'
                            >
                                <span className='flex items-center justify-center gap-2 text-white'>
                                    <span>{ctaBlock?.primaryCtaLabel || (isEn ? 'Get in touch directly' : 'Neem direct contact op')}</span>
                                    <ArrowRight className='w-5 h-5 text-white' />
                                </span>
                            </GlowingLink>

                            <Link
                                href={ctaBlock?.secondaryCtaUrl || (isEn ? '/en/apps' : '/apps')}
                                className='inline-flex h-14 items-center justify-center rounded-2xl border border-white/20 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 transition-all text-center shadow-sm hover:scale-[1.02] active:scale-[0.98] duration-200'
                            >
                                {ctaBlock?.secondaryCtaLabel || (isEn ? 'Explore our solutions →' : 'Bekijk onze oplossingen →')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
