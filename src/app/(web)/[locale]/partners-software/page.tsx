import React from 'react';
import { Metadata } from 'next';
import { sanityFetch } from '@/lib/sanity';
import { HeroSection } from '@/components/blocks/HeroSection';
import { Layers, FileSpreadsheet, FileCheck2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface PartnersPageProps {
    params: Promise<{ locale: string }>;
}

async function getSanityPageData(locale: string) {
    try {
        return await sanityFetch<any>({
            query: `*[_type == "page" && (slug.current == "partners-software" || slug.current == "integraties") && language == $locale][0] {
                title,
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
        console.error('Failed to fetch partners-software page from Sanity:', e);
        return null;
    }
}

export async function generateMetadata({
    params,
}: PartnersPageProps): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getSanityPageData(locale);
    const seo = pageData?.seo;

    const title =
        seo?.seoTitle ||
        (isEn
            ? 'Partners & Software Integrations (Business Central) | Emlinked'
            : 'Partners & Software Integraties (Business Central) | Emlinked');

    const description =
        seo?.seoDescription ||
        (isEn
            ? 'Explore all software integrations of Emlinked. Seamless, native connections with Microsoft Business Central, Document Capture, and Direct Banking.'
            : 'Bekijk alle software-integraties van Emlinked. Naadloze, native koppelingen met Microsoft Business Central, Document Capture en Direct Banking.');

    const robots = seo?.noIndex ? 'noindex, nofollow' : 'index, follow';

    return {
        title,
        description,
        robots,
        alternates: {
            canonical:
                seo?.canonical ||
                (isEn ? '/en/partners-software' : '/partners-software'),
        },
    };
}

export default async function PartnersSoftwarePage({
    params,
}: PartnersPageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';

    const partners = [
        {
            icon: <Layers className='h-8 w-8 text-amber' />,
            name: 'Microsoft Dynamics 365 Business Central',
            badge: isEn ? 'Native ERP' : 'Native ERP',
            description: isEn
                ? 'Core real estate accounting, leases, and assets live inside Business Central without external database syncs.'
                : 'Volledige vastgoedadministratie, contracten en incasso’s native binnen uw Business Central ERP.',
        },
        {
            icon: <FileCheck2 className='h-8 w-8 text-amber' />,
            name: 'Continia Document Capture',
            badge: isEn ? 'OCR & Invoices' : 'OCR & Facturatie',
            description: isEn
                ? 'Automated OCR scanning of maintenance invoices linked directly to real estate objects and work orders.'
                : 'Automatische verwerking van inkomende onderhoudsfacturen via OCR direct gekoppeld aan vastgoedobjecten.',
        },
        {
            icon: <FileSpreadsheet className='h-8 w-8 text-amber' />,
            name: 'Idyn Direct Banking',
            badge: isEn ? 'PSD2 Bank Link' : 'PSD2 Bankkoppeling',
            description: isEn
                ? 'Direct PSD2 banking feed for automated matching of rent payments and bank statement reconciliation.'
                : 'Directe bankkoppeling voor automatische aflettering van huurontvangsten en bankafschriften.',
        },
    ];

    return (
        <main className="flex-1 bg-[url('/hero/bkg_darkBlue.jpg')] bg-cover bg-center bg-no-repeat text-white">
            <HeroSection
                label={isEn ? 'ERP INTEGRATION' : 'ERP INTEGRATIE'}
                title={
                    isEn
                        ? 'Seamless integration with *Microsoft Dynamics & Partners*'
                        : 'Naadloze integratie met *Microsoft Dynamics & Partners*'
                }
                subtitle={
                    isEn
                        ? 'Explore all software integrations of Emlinked. Seamless, native connections with Microsoft Business Central, Document Capture, and Direct Banking.'
                        : 'Bekijk alle software-integraties van Emlinked. Naadloze, native koppelingen met Microsoft Business Central, Document Capture en Direct Banking.'
                }
                locale={locale}
            />

            <section className='px-6 py-16 max-w-7xl mx-auto space-y-12'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {partners.map((partner, idx) => (
                        <div
                            key={idx}
                            className='p-8 rounded-2xl border border-white/10 bg-white/2 space-y-6 hover:border-amber/30 transition-all flex flex-col justify-between'
                        >
                            <div className='space-y-4'>
                                <div className='flex justify-between items-start'>
                                    <div className='p-3 rounded-xl bg-white/4 border border-white/10'>
                                        {partner.icon}
                                    </div>
                                    <span className='px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-white/6 border border-white/10 text-amber'>
                                        {partner.badge}
                                    </span>
                                </div>
                                <h3 className='text-xl font-bold text-white'>
                                    {partner.name}
                                </h3>
                                <p className='text-sm text-slate-300 leading-relaxed'>
                                    {partner.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='p-10 rounded-2xl bg-linear-to-r from-amber/10 to-amber/5 border border-amber/20 text-center flex flex-col items-center gap-6'>
                    <h2 className='text-2xl md:text-3xl font-extrabold text-white'>
                        {isEn
                            ? 'Looking for a custom ERP integration?'
                            : 'Op zoek naar een specifieke ERP integratie?'}
                    </h2>
                    <p className='text-slate-300 max-w-2xl text-sm md:text-base'>
                        {isEn
                            ? 'Our architects specialize in Microsoft Dynamics 365 solutions.'
                            : 'Onze specialisten adviseren je graag over de integratiemogelijkheden met jouw back-office.'}
                    </p>
                    <Link
                        href={isEn ? '/en/contact' : '/contact'}
                        className='px-8 py-3.5 rounded-xl bg-amber text-slate-950 font-bold hover:bg-amber-light transition-all shadow-lg flex items-center gap-2'
                    >
                        {isEn ? 'Get in Touch' : 'Neem Contact Op'}
                        <ArrowRight className='h-4 w-4' />
                    </Link>
                </div>
            </section>
        </main>
    );
}
