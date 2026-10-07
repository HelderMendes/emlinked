import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getImageUrl } from '@/sanity/image';
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
    image?: any;
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
        <section className='py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] relative z-10'>
            <div className='mx-auto max-w-8xl px-0'>
                <div className='border border-teal/30 rounded-3xl bg-linear-to-br from-teal-ultra via-stone-bg to-teal-pale/60 text-navy-900 p-6 sm:p-10 md:p-14 hover:shadow-lg transition-all duration-500 relative overflow-hidden group shadow-md'>
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10'>
                        {/* Left Column: Copy & Actions */}
                        <div className='lg:col-span-8 flex flex-col gap-5 text-left'>
                            <Badge color='teal' uppercase dot dotPulse>
                                {ctaBadge}
                            </Badge>
                            <h2 className='font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-navy-900 leading-tight'>
                                {ctaTitle}
                            </h2>
                            <p className='text-navy-700 leading-relaxed font-light text-base md:text-lg max-w-2xl'>
                                {ctaSubtitle}
                            </p>

                            <div className='flex flex-col sm:flex-row gap-4 pt-2'>
                                <Link
                                    href={ctaButtonLink}
                                    className='inline-flex h-14 items-center justify-center rounded-2xl border-0 bg-navy-900 hover:btn-gradient px-8 text-base font-bold text-white transition-all duration-200 shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                                >
                                    <span className='flex items-center justify-center gap-2 text-white'>
                                        <span>{ctaButtonText}</span>
                                        <ArrowRight className='h-5 w-5 text-white' />
                                    </span>
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
                                className='w-full h-[350px] max-h-[350px] object-cover object-center rounded-2xl group-hover:scale-105 transition-transform duration-500 shadow-xl'
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
