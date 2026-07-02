import React from 'react';
import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='w-full border-t border-border bg-card text-card-foreground'>
            <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
                    {/* Brand Info */}
                    <div className='flex flex-col gap-4'>
                        <span className='font-display text-2xl font-bold tracking-tight text-primary'>
                            em<span className='text-foreground'>linked</span>
                        </span>
                        <p className='text-sm text-muted-foreground max-w-xs'>
                            Het all-in-one vastgoedbeheer platform voor
                            professionele beheerders en vastgoedeigenaren.
                            Native Microsoft Dynamics 365 integratie.
                        </p>
                    </div>

                    {/* Solutions Column */}
                    <div>
                        <h3 className='text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4'>
                            Oplossingen
                        </h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link
                                    href='/oplossingen/vastgoedbeheerders'
                                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    Vastgoedbeheerders
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/oplossingen/vastgoedeigenaren'
                                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    Vastgoedeigenaren & Beleggers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/oplossingen/commercieel-vastgoed'
                                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    Commercieel Vastgoed
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Product Column */}
                    <div>
                        <h3 className='text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4'>
                            Product
                        </h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link
                                    href='/functionaliteiten/contractbeheer'
                                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    Contractbeheer
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/functionaliteiten/financieel-beheer'
                                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    Financieel Beheer
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/functionaliteiten/huurdersportaal'
                                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    Huurdersportaal & App
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/integraties/microsoft-dynamics-365'
                                    className='text-sm text-muted-foreground hover:text-foreground transition-colors font-medium text-primary'
                                >
                                    Business Central Koppeling
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className='text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4'>
                            Bedrijf
                        </h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link
                                    href='/tarieven'
                                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    Tarieven
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/kennisbank'
                                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    Kennisbank
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/contact'
                                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    Contact & Demo
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Legal & Bottom bar */}
                <div className='mt-8 border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4'>
                    <p className='text-xs text-muted-foreground'>
                        &copy; {currentYear} Emlinked B.V. Alle rechten
                        voorbehouden.
                    </p>
                    <div className='flex gap-6'>
                        <Link
                            href='/privacy-policy'
                            className='text-xs text-muted-foreground hover:text-foreground transition-colors'
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href='/algemene-voorwaarden'
                            className='text-xs text-muted-foreground hover:text-foreground transition-colors'
                        >
                            Algemene Voorwaarden
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
