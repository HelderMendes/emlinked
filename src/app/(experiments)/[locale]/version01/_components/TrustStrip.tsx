import Image from 'next/image';
import type { Locale } from '../_lib/data';

type TrustItem = { _key: string; text?: string };

const fallbackItems: Record<Locale, string[]> = {
    nl: [
        'ISAE 3402 type II gecontroleerd',
        'AVG/GDPR-compliant dataverwerking',
        'Dagelijkse geautomatiseerde back-ups',
    ],
    en: [
        'ISAE 3402 type II audited',
        'GDPR-compliant data processing',
        'Daily automated backups',
    ],
};

const logos = [
    { src: '/emlinked/referenties/van-overhagen_logo.jpg', alt: 'Van Overhagen' },
    { src: '/emlinked/referenties/M2-Capital.jpg', alt: 'M2 Capital' },
    { src: '/emlinked/referenties/baetland.png', alt: 'Baetland' },
    { src: '/emlinked/referenties/VGBRgrootde.webp', alt: 'VGBR' },
];

export function TrustStrip({ locale, items }: { locale: Locale; items?: TrustItem[] }) {
    const isEn = locale === 'en';
    const list =
        items && items.length > 0
            ? items.map((i) => i.text).filter(Boolean)
            : fallbackItems[locale];

    return (
        // The rounded top edge pulled up over the hero's gradient mesh — the
        // "shelf" transition from the AWS reference set.
        <div className='relative z-10 -mt-28 md:-mt-32 bg-white rounded-t-[40px] border-t border-slate-200'>
            <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8'>
                <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
                    <div className='flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-medium text-slate-500'>
                        {list.map((text) => (
                            <span key={text}>{text}</span>
                        ))}
                        <span className='hidden md:inline text-slate-300'>·</span>
                        <Image
                            src='/emlinked/partners/Microsoft_Dynamics_Business-e1670413242458-2048x613.png'
                            alt='Microsoft Dynamics 365 Business Central'
                            width={150}
                            height={45}
                            className='h-5 w-auto opacity-70'
                        />
                    </div>
                    <div className='flex items-center gap-6'>
                        <span className='text-[11px] font-semibold uppercase tracking-wider text-slate-400'>
                            {isEn ? 'Trusted by' : 'Vertrouwd door'}
                        </span>
                        <div className='flex items-center gap-5'>
                            {logos.map((logo) => (
                                <Image
                                    key={logo.src}
                                    src={logo.src}
                                    alt={logo.alt}
                                    width={90}
                                    height={30}
                                    className='h-6 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-200'
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
