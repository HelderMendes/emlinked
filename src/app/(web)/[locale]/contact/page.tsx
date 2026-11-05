import React from 'react';
import type { Metadata } from 'next';
import { MapPin, Phone, Mail } from 'lucide-react';
import { BsLinkedin } from 'react-icons/bs';
import { sanityFetch } from '@/lib/sanity';
import { HeroSection } from '@/components/blocks/HeroSection';
import { PageBlockRenderer } from '@/components/blocks/PageBlockRenderer';
import { ContactForm } from '@/components/contact/ContactForm';
import { buildMetadata, DEFAULT_DOMAIN } from '@/lib/seo';

export const revalidate = 60;

interface ContactPageProps {
    params: Promise<{ locale: string }>;
}

async function getSiteSettings(locale: string) {
    try {
        const id = `siteSettings-${locale}`;
        return await sanityFetch<any>({
            query: `*[_id == $id][0] { phone, email, address, linkedinUrl }`,
            params: { id },
        });
    } catch (e) {
        console.error('Error fetching site settings from Sanity:', e);
        return null;
    }
}

async function getContactPageData(locale: string) {
    try {
        const id = `page-contact-${locale}`;
        return await sanityFetch<any>({
            query: `*[_type == "page" && (_id == $id || slug.current == "contact" || slug.current == "/contact") && language == $locale && defined(pageBlocks)][0] {
                title,
                seo {
                    seoTitle,
                    seoDescription,
                    canonical,
                    noIndex
                },
                pageBlocks[] {
                    ...,
                    _type,
                    _key
                }
            }`,
            params: { id, locale },
        });
    } catch (e) {
        console.error('Error fetching contact page from Sanity:', e);
        return null;
    }
}

export async function generateMetadata({
    params,
}: ContactPageProps): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === 'en';
    const pageData = await getContactPageData(locale);

    const fallbackTitle = isEn
        ? 'Contact & Request Free Demo'
        : 'Contact & Vrijblijvende Demo Aanvragen';
    const fallbackDescription = isEn
        ? 'Get in touch with emlinked or request a free demo of our real estate software for Business Central.'
        : 'Neem contact op met emlinked of vraag een vrijblijvende demo aan van onze vastgoedsoftware voor Business Central.';
    const canonicalUrl = `${DEFAULT_DOMAIN}${isEn ? '/en/contact' : '/contact'}`;

    return buildMetadata({
        seo: pageData?.seo,
        fallbackTitle,
        fallbackDescription,
        canonicalUrl,
        locale,
    });
}

export default async function ContactPage({ params }: ContactPageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';
    const [settings, pageData] = await Promise.all([
        getSiteSettings(locale),
        getContactPageData(locale),
    ]);

    const phone = settings?.phone || '+31 (0)88 707 7000';
    const email =
        settings?.email || (isEn ? 'info@emlinked.com' : 'info@emlinked.nl');
    const address = settings?.address || 'Gooimeer 12, 1411 DE Naarden';
    const linkedinUrl =
        settings?.linkedinUrl || 'https://www.linkedin.com/company/emlinked';
    const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

    const pageBlocks = pageData?.pageBlocks || [];
    const heroBlock = pageBlocks.find((b: any) => b._type === 'hero');
    const otherBlocks = pageBlocks.filter((b: any) => b._type !== 'hero');

    const infoCards = [
        {
            icon: <MapPin className='w-5 h-5' />,
            label: isEn ? 'Address' : 'Adres',
            value: address,
            href: mapsHref,
        },
        {
            icon: <Phone className='w-5 h-5' />,
            label: isEn ? 'Phone' : 'Telefoon',
            value: phone,
            href: `tel:${phone.replace(/[^+\d]/g, '')}`,
        },
        {
            icon: <Mail className='w-5 h-5' />,
            label: isEn ? 'Email' : 'E-mail',
            value: email,
            href: `mailto:${email}`,
        },
        {
            icon: <BsLinkedin className='w-5 h-5' />,
            label: 'LinkedIn',
            value: isEn ? 'emlinked on LinkedIn' : 'emlinked op LinkedIn',
            href: linkedinUrl,
        },
    ];

    const canonicalPageUrl = `${DEFAULT_DOMAIN}${isEn ? '/en/contact' : '/contact'}`;
    const jsonLdData = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'ContactPage',
                '@id': `${canonicalPageUrl}#webpage`,
                url: canonicalPageUrl,
                name: isEn
                    ? 'Contact & Request Free Demo | emlinked'
                    : 'Contact & Vrijblijvende Demo Aanvragen | emlinked',
                description: isEn
                    ? 'Get in touch with emlinked or request a free demo of our real estate software for Business Central.'
                    : 'Neem contact op met emlinked of vraag een vrijblijvende demo aan van onze vastgoedsoftware voor Business Central.',
                inLanguage: isEn ? 'en-US' : 'nl-NL',
            },
            {
                '@type': 'Organization',
                '@id': `${DEFAULT_DOMAIN}/#organization`,
                name: 'emlinked B.V.',
                url: DEFAULT_DOMAIN,
                telephone: phone,
                email,
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Gooimeer 12',
                    postalCode: '1411 DE',
                    addressLocality: 'Naarden',
                    addressCountry: 'NL',
                },
                sameAs: [linkedinUrl],
            },
        ],
    });

    return (
        <div className='flex flex-col min-h-screen'>
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: jsonLdData }}
            />
            <HeroSection
                label={heroBlock?.label || (isEn ? 'CONTACT' : 'CONTACT')}
                title={
                    heroBlock?.title ||
                    (isEn ? 'Get in touch' : 'Neem contact op')
                }
                subtitle={
                    heroBlock?.subtitle ||
                    (isEn
                        ? 'How can we help you? Ask your question about property management, Business Central, or book a demo directly.'
                        : 'Hoe kunnen we je helpen? Stel je vraag over vastgoedbeheer, Business Central, of plan direct een demo.')
                }
                locale={locale}
                showProof={false}
                centered
                hideImage
            />

            <section
                id='contactform'
                className='px-6 py-20 bg-background border-b border-black/10'
            >
                <div className='mx-auto max-w-5xl space-y-12'>
                    <div className='grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 items-start'>
                        {/* Left: info cards, stacked */}
                        <div className='flex flex-col gap-4'>
                            {infoCards.map((card) => (
                                <a
                                    key={card.label}
                                    href={card.href}
                                    target={
                                        card.href.startsWith('http')
                                            ? '_blank'
                                            : undefined
                                    }
                                    rel={
                                        card.href.startsWith('http')
                                            ? 'noopener noreferrer'
                                            : undefined
                                    }
                                    className='flex items-center gap-4 p-5 rounded-xl border border-navy-900/10 bg-white hover:border-teal/40 hover:shadow-md transition-all duration-200'
                                >
                                    <div className='w-10 h-10 rounded-lg bg-teal/10 text-teal flex items-center justify-center shrink-0'>
                                        {card.icon}
                                    </div>
                                    <div>
                                        <p className='text-[10px] font-extrabold text-navy-500 uppercase tracking-wider font-mono mb-0.5'>
                                            {card.label}
                                        </p>
                                        <p className='text-sm font-semibold text-navy-900 break-words'>
                                            {card.value}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Right: form */}
                        <div className='p-8 rounded-xl border border-navy-900/10 bg-white shadow-sm'>
                            <ContactForm locale={locale} />
                        </div>
                    </div>

                    {/* Map */}
                    <div className='rounded-xl overflow-hidden border border-navy-900/10 shadow-sm aspect-video lg:aspect-21/9'>
                        <iframe
                            title={isEn ? 'Office location' : 'Kantoorlocatie'}
                            src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
                            width='100%'
                            height='100%'
                            style={{ border: 0 }}
                            loading='lazy'
                            referrerPolicy='no-referrer-when-downgrade'
                        />
                    </div>
                </div>
            </section>

            {otherBlocks.map((block: any) => (
                <PageBlockRenderer
                    key={block._key}
                    block={block}
                    locale={locale}
                />
            ))}
        </div>
    );
}
