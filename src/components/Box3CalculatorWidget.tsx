import React from 'react';
import { TrendingUp } from 'lucide-react';

export function Box3CalculatorWidget() {
    return (
        <div className='p-8 md:p-10 rounded-3xl border border-amber/30 bg-texture-navy text-white shadow-2xl relative overflow-hidden group backdrop-blur-xl'>
            <div className='absolute -right-20 -bottom-20 w-80 h-80 bg-amber/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-amber/30 transition-all duration-700' />

            <div className='flex items-center justify-between border-b border-white/10 pb-4 mb-6'>
                <div className='flex items-center gap-2.5'>
                    <div className='w-3 h-3 rounded-full bg-red-500/80 shadow-xs' />
                    <div className='w-3 h-3 rounded-full bg-amber shadow-xs' />
                    <div className='w-3 h-3 rounded-full bg-emerald-500/80 shadow-xs' />
                    <span className='ml-2 text-xs font-mono font-bold text-white/80 tracking-wide'>
                        Box 3 Rendement Calculator
                    </span>
                </div>
                <span className='bg-amber/20 border border-amber/40 text-amber px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs'>
                    Wetgeving 2028 Ready
                </span>
            </div>

            <div className='flex flex-col gap-6'>
                {/* Slider 1 */}
                <div className='bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3 backdrop-blur-md hover:border-white/20 transition-all'>
                    <div className='flex justify-between items-center text-xs text-white/90'>
                        <span className='font-semibold tracking-wide'>
                            Aantal Verhuureenheden
                        </span>
                        <span className='font-bold text-amber text-sm bg-amber/10 border border-amber/20 px-2.5 py-0.5 rounded-md'>
                            75 eenheden
                        </span>
                    </div>
                    <div className='w-full bg-white/10 h-2.5 rounded-full relative overflow-hidden p-0.5'>
                        <div className='bg-gradient-to-r from-amber to-amber/70 h-full rounded-full w-[65%] shadow-[0_0_10px_rgba(245,158,11,0.5)]' />
                    </div>
                </div>

                {/* Slider 2 */}
                <div className='bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3 backdrop-blur-md hover:border-white/20 transition-all'>
                    <div className='flex justify-between items-center text-xs text-white/90'>
                        <span className='font-semibold tracking-wide'>
                            Gemiddelde WOZ-Waarde per Pand
                        </span>
                        <span className='font-bold text-amber text-sm bg-amber/10 border border-amber/20 px-2.5 py-0.5 rounded-md'>
                            € 350.000,-
                        </span>
                    </div>
                    <div className='w-full bg-white/10 h-2.5 rounded-full relative overflow-hidden p-0.5'>
                        <div className='bg-gradient-to-r from-amber to-amber/70 h-full rounded-full w-[50%] shadow-[0_0_10px_rgba(245,158,11,0.5)]' />
                    </div>
                </div>

                {/* Result Box */}
                <div className='bg-gradient-to-br from-amber/20 via-white/5 to-transparent border border-amber/40 rounded-2xl p-6 flex flex-col gap-3 text-left backdrop-blur-md shadow-lg'>
                    <div className='flex items-center justify-between'>
                        <span className='text-xs font-extrabold text-amber uppercase tracking-wider'>
                            Geschat Fiscaal Voordeel
                        </span>
                        <span className='text-xs text-emerald-400 font-bold flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-md'>
                            <TrendingUp className='h-3.5 w-3.5' /> Aangifte-Klaar
                        </span>
                    </div>
                    <div className='text-3xl md:text-4xl font-black text-white tracking-tight'>
                        € 18.450,-{' '}
                        <span className='text-xs font-normal text-white/70'>
                            / jaar besparing
                        </span>
                    </div>
                    <p className='text-xs text-white/70 leading-normal font-light'>
                        Op basis van sluitende kostenregistratie en werkelijke rendementshefboom in Business Central.
                    </p>
                </div>
            </div>
        </div>
    );
}
