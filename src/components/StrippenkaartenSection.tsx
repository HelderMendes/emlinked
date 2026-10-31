'use client';

import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import {
    QuoteRequestModal,
    QuoteRequestRecaptchaScripts,
    type QuoteRequestItem,
} from '@/components/QuoteRequestModal';

export interface StrippenkaartenPackInput {
    hours?: number;
    name?: string;
    price?: string;
    priceFormatted?: string;
    perHour?: string;
    description?: string;
    featured?: boolean;
}

interface StrippenkaartenSectionProps {
    locale: string;
    sectionTag?: string;
    sectionTitle?: string;
    sectionSubtitle?: string;
    packs?: StrippenkaartenPackInput[];
}

type Pack = {
    hours: number;
    price: string;
    priceFormatted: string;
    perHour: string;
    name: string;
    description: string;
    featured?: boolean;
};

function getDefaultPacks(isEn: boolean): Pack[] {
    return [
        {
            hours: 5,
            price: '€ 550,-',
            priceFormatted: '€ 550,00',
            perHour: '(€ 110,- / uur)',
            name: isEn ? '5 Hour Support Pack' : '5 Uur Strippenkaart',
            description: isEn
                ? 'Ideal for short questions, quick configurations, and light support.'
                : 'Ideaal voor korte vragen, snelle instellingen en lichte ondersteuning.',
        },
        {
            hours: 10,
            price: '€ 899,-',
            priceFormatted: '€ 899,00',
            perHour: '(€ 89,90 / uur)',
            name: isEn ? '10 Hour Support Pack' : '10 Uur Strippenkaart',
            description: isEn
                ? 'Perfect for periodic guidance, custom setup, and ongoing operational support.'
                : 'Perfect voor periodieke begeleiding en aanvullende inrichting.',
            featured: true,
        },
        {
            hours: 20,
            price: '€ 1.599,-',
            priceFormatted: '€ 1.599,00',
            perHour: '(€ 79,95 / uur)',
            name: isEn ? '20 Hour Support Pack' : '20 Uur Strippenkaart',
            description: isEn
                ? 'Best value for extensive project support, team onboarding, and custom training.'
                : 'De meest voordelige optie voor uitgebreide ondersteuning, projecten en trainingen op maat.',
        },
    ];
}

export function StrippenkaartenSection({
    locale,
    sectionTag,
    sectionTitle,
    sectionSubtitle,
    packs,
}: StrippenkaartenSectionProps) {
    const isEn = locale === 'en';
    const [selectedPack, setSelectedPack] = useState<Pack | null>(null);

    const defaultPacks = getDefaultPacks(isEn);
    const activePacks: Pack[] =
        packs && packs.length > 0
            ? packs.map((p, idx) => ({
                  hours: p.hours ?? defaultPacks[idx]?.hours ?? 0,
                  price: p.price || defaultPacks[idx]?.price || '',
                  priceFormatted:
                      p.priceFormatted ||
                      p.price ||
                      defaultPacks[idx]?.priceFormatted ||
                      '€ 0,00',
                  perHour: p.perHour || defaultPacks[idx]?.perHour || '',
                  name: p.name || defaultPacks[idx]?.name || '',
                  description:
                      p.description || defaultPacks[idx]?.description || '',
                  featured: Boolean(p.featured),
              }))
            : defaultPacks;

    const oneTimeItems: QuoteRequestItem[] = selectedPack
        ? [
              {
                  category: isEn ? 'Support Pack (One-time)' : 'Strippenkaart',
                  label: selectedPack.name,
                  priceFormatted: selectedPack.priceFormatted,
              },
          ]
        : [];

    return (
        <section className='px-6 py-20 bg-card border-b border-black/20 text-foreground relative z-10'>
            <div className='max-w-7xl mx-auto space-y-12'>
                <div className='text-center max-w-3xl mx-auto space-y-4'>
                    <div className='flex justify-center mb-3'>
                        <Badge color='teal' uppercase dot>
                            {sectionTag ||
                                (isEn
                                    ? 'FLEXIBLE SUPPORT'
                                    : 'FLEXIBELE ONDERSTEUNING')}
                        </Badge>
                    </div>

                    <h2 className='font-display text-2xl md:text-3xl lg:text-3.5xl font-bold tracking-tight text-darkblue'>
                        {sectionTitle ||
                            (isEn
                                ? 'Prepaid Support Packs: The most cost-effective support'
                                : 'Strippenkaarten: De voordeligste oplossing voor de beste support')}
                    </h2>

                    <p className='text-muted-foreground text-base md:text-lg leading-relaxed font-light'>
                        {sectionSubtitle ||
                            (isEn
                                ? 'All emlinked services and support can easily be paid using our prepaid support packs. Available in 5-hour, 10-hour, and 20-hour packs. The larger the pack, the higher the hourly discount.'
                                : 'Alle diensten en ondersteuning van emlinked kunnen eenvoudig betaald worden met onze strippenkaart. Onze strippenkaarten zijn verkrijgbaar in 5 uur, 10 uur en 20 uur. Hoe groter de strippenkaart, hoe hoger de korting op het uurtarief.')}
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch'>
                    {activePacks.map((pack) => (
                        <div
                            key={pack.hours}
                            className={
                                pack.featured
                                    ? 'rounded-xl border-2 border-teal/50 bg-background p-8 space-y-6 flex flex-col justify-between shadow-md relative overflow-hidden group hover:-translate-y-1 transition-all duration-300'
                                    : 'rounded-xl border border-navy-900/10 bg-background p-8 space-y-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group'
                            }
                        >
                            {pack.featured && (
                                <div className='absolute top-0 right-0 bg-teal text-navy-900 font-mono text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl tracking-wider'>
                                    {isEn ? 'Popular Choice' : 'Meest gekozen'}
                                </div>
                            )}
                            <div className='space-y-4'>
                                <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/15 text-teal text-xs font-mono font-bold uppercase'>
                                    <Clock className='w-3.5 h-3.5' />
                                    <span>
                                        {pack.hours} {isEn ? 'Hours' : 'Uur'}
                                    </span>
                                </div>
                                <h3 className='text-2xl font-bold text-navy-900'>
                                    {pack.name}
                                </h3>
                                <div className='flex items-baseline gap-1.5'>
                                    <span className='text-4xl font-extrabold text-navy-900'>
                                        {pack.price}
                                    </span>
                                    <span className='text-xs text-navy-500'>
                                        {pack.perHour}
                                    </span>
                                </div>
                                <p className='text-sm text-navy-700 font-light leading-relaxed pt-2 border-t border-navy-900/10'>
                                    {pack.description}
                                </p>
                            </div>
                            <button
                                type='button'
                                onClick={() => setSelectedPack(pack)}
                                className={
                                    pack.featured
                                        ? 'inline-flex h-12 items-center gap-1.5 justify-center rounded-lg bg-navy-900 hover:btn-gradient px-6 text-sm font-semibold text-white transition-colors text-center cursor-pointer'
                                        : 'inline-flex h-12 items-center justify-center rounded-xl border border-navy-900/15 bg-transparent px-6 text-sm font-semibold text-navy-900 hover:bg-teal hover:text-navy-900 hover:border-teal transition-all duration-200 text-center cursor-pointer'
                                }
                            >
                                {isEn
                                    ? 'Order Support Pack'
                                    : 'Bestel strippenkaart'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <QuoteRequestModal
                isOpen={selectedPack !== null}
                onClose={() => setSelectedPack(null)}
                locale={locale}
                title={
                    isEn ? 'Order your support pack' : 'Bestel je strippenkaart'
                }
                subtitle={
                    isEn
                        ? 'Fill in your details below. We will confirm your order and send the invoice to your email.'
                        : 'Vul je gegevens in. We bevestigen je bestelling en sturen de factuur naar je e-mailadres.'
                }
                oneTimeItems={oneTimeItems}
                totalOneTime={selectedPack?.priceFormatted || '€ 0,00'}
            />
            <QuoteRequestRecaptchaScripts active={selectedPack !== null} />
        </section>
    );
}
