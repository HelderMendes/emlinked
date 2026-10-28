import React from 'react';
import type { Metadata } from 'next';
import { MapPin, Phone, Mail } from 'lucide-react';
import { BsLinkedin } from 'react-icons/bs';
import { client } from '@/sanity/client';
import { HeroSection } from '@/components/blocks/HeroSection';
import { ContactForm } from '@/components/contact/ContactForm';
import { buildMetadata, DEFAULT_DOMAIN } from '@/lib/seo';

interface ContactPageProps {
    params: Promise<{ locale: string }>;
}

async function getSiteSettings(locale: string) {
    try {
        const id = `siteSettings-${locale}`;
        return await client.fetch(
            `*[_id == $id][0] { phone, email, address, linkedinUrl }`,
            { id },
        );
    } catch (e) {
        console.error('Error fetching site settings from Sanity:', e);
        return null;
    }
}

export async function generateMetadata({
    params,
}: ContactPageProps): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === 'en';

    const fallbackTitle = isEn
        ? 'Contact & Request Free Demo'
        : 'Contact & Vrijblijvende Demo Aanvragen';
    const fallbackDescription = isEn
        ? 'Get in touch with emlinked or request a free demo of our real estate software for Business Central.'
        : 'Neem contact op met emlinked of vraag een vrijblijvende demo aan van onze vastgoedsoftware voor Business Central.';
    const canonicalUrl = `${DEFAULT_DOMAIN}${isEn ? '/en/contact' : '/contact'}`;

    return buildMetadata({
        seo: null,
        fallbackTitle,
        fallbackDescription,
        canonicalUrl,
        locale,
    });
}

export default async function ContactPage({ params }: ContactPageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';
    const settings = await getSiteSettings(locale);

    const phone = settings?.phone || '+31 (0)88 707 7000';
    const email = settings?.email || 'support@emlinked.com';
    const address = settings?.address || 'Gooimeer 12, 1411 DE Naarden';
    const linkedinUrl =
        settings?.linkedinUrl || 'https://www.linkedin.com/company/emlinked';
    const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

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

    return (
        <div className='flex flex-col min-h-screen'>
            <HeroSection
                label={isEn ? 'CONTACT' : 'CONTACT'}
                title={isEn ? 'Get in touch' : 'Neem contact op'}
                subtitle={
                    isEn
                        ? 'How can we help you? Ask your question about property management, Business Central, or book a demo directly.'
                        : 'Hoe kunnen we u helpen? Stel uw vraag over vastgoedbeheer, Business Central, of plan direct een demo.'
                }
                locale={locale}
                showProof={false}
                centered
                hideImage
            />

            <section className='px-6 py-20 bg-background border-b border-black/10'>
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
                        <div className='p-8 rounded-2xl border border-navy-900/10 bg-white shadow-sm'>
                            <ContactForm locale={locale} />
                        </div>
                    </div>

                    {/* Map */}
                    <div className='rounded-2xl overflow-hidden border border-navy-900/10 shadow-sm aspect-video lg:aspect-21/9'>
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
        </div>
    );
}
