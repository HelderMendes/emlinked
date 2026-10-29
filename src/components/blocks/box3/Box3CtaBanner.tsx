import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getImageUrl, type SanityImageLike } from '@/sanity/image';
import { Badge } from '@/components/ui/Badge';
import { OutlineLinkButton } from '@/components/ui/OutlineLinkButton';

interface Box3CtaBannerProps {
    ctaBadge: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButtonText: string;
    ctaButtonLink: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    isEn: boolean;
    image?: SanityImageLike;
    imagePath?: string;
}

export function Box3CtaBanner({
    ctaBadge,
    ctaTitle,
    ctaSubtitle,
    ctaButtonText,
    ctaButtonLink,
    secondaryButtonText,
    secondaryButtonLink,
    isEn,
    image,
    imagePath,
}: Box3CtaBannerProps) {
    const bannerImg = getImageUrl(
        image,
        imagePath || '/emlinked/box3/box3-automatiseren.jpg',
    );

    return (
        <section className='lg:px-14 p-4 py-24 bg-linear-to-br from-teal-ultra via-stone-bg to-teal-pale/60 relative overflow-hidden z-10'>
            <div className='border border-teal/30 rounded-3xl bg-white/50 hover:shadow-[0_25px_60px_rgba(245,158,11,0.15)] transition-all duration-500 relative overflow-hidden group shadow-lg backdrop-blur-xl lg:px-8'>
                <div className='text-navy-900 p-8 md:py-16 md:px-10 relative overflow-hidden'>
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10'>
                        {/* Left Column: Copy & Actions */}
                        <div className='lg:col-span-8 flex flex-col gap-5 text-left'>
                            <Badge color='teal' uppercase dot dotPulse>
                                {ctaBadge}
                            </Badge>
                            <h2 className='font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight bg-linear-to-br from-[#f12711] to-[#f5af19] bg-clip-text text-transparent'>
                                {ctaTitle}
                            </h2>
                            <p className='text-navy-700 leading-relaxed font-light text-base md:text-lg max-w-2xl'>
                                {ctaSubtitle}
                            </p>

                            <div className='flex flex-col sm:flex-row gap-4 pt-2'>
                                <Link
                                    href={ctaButtonLink}
                                    className='inline-flex h-11 items-center gap-1.5 justify-center rounded-lg bg-navy-900 hover:btn-gradient px-6 text-sm font-semibold text-white transition-colors'
                                >
                                    <span>{ctaButtonText}</span>
                                    <ArrowRight className='h-4 w-4 text-white' />
                                </Link>
                                {secondaryButtonText && secondaryButtonLink && (
                                    <OutlineLinkButton
                                        href={secondaryButtonLink}
                                        color='navy'
                                    >
                                        <span>{secondaryButtonText}</span>
                                    </OutlineLinkButton>
                                )}
                            </div>
                        </div>

                        {/* Right Column: CTA Illustration Image */}
                        <div className='lg:col-span-4 flex justify-start lg:justify-end'>
                            <Image
                                src={bannerImg}
                                alt={ctaTitle || 'emlinked CTA'}
                                width={700}
                                height={500}
                                className='w-full h-[310px] max-h-[310px] object-cover object-center rounded-lg group-hover:scale-105 transition-transform duration-500 shadow-lg border border-amber-600/40'
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
