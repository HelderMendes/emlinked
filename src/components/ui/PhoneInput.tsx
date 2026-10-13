'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Country {
    name: string;
    nameNl: string;
    iso2: string;
    dial: string;
    flag: string;
}

// NL and BE are pinned first (primary markets); the rest follows alphabetically.
const COUNTRIES: Country[] = [
    {
        name: 'Netherlands',
        nameNl: 'Nederland',
        iso2: 'NL',
        dial: '+31',
        flag: '🇳🇱',
    },
    { name: 'Belgium', nameNl: 'België', iso2: 'BE', dial: '+32', flag: '🇧🇪' },
    {
        name: 'Germany',
        nameNl: 'Duitsland',
        iso2: 'DE',
        dial: '+49',
        flag: '🇩🇪',
    },
    {
        name: 'France',
        nameNl: 'Frankrijk',
        iso2: 'FR',
        dial: '+33',
        flag: '🇫🇷',
    },
    {
        name: 'United Kingdom',
        nameNl: 'Verenigd Koninkrijk',
        iso2: 'GB',
        dial: '+44',
        flag: '🇬🇧',
    },
    {
        name: 'Ireland',
        nameNl: 'Ierland',
        iso2: 'IE',
        dial: '+353',
        flag: '🇮🇪',
    },
    {
        name: 'Luxembourg',
        nameNl: 'Luxemburg',
        iso2: 'LU',
        dial: '+352',
        flag: '🇱🇺',
    },
    {
        name: 'Switzerland',
        nameNl: 'Zwitserland',
        iso2: 'CH',
        dial: '+41',
        flag: '🇨🇭',
    },
    {
        name: 'Austria',
        nameNl: 'Oostenrijk',
        iso2: 'AT',
        dial: '+43',
        flag: '🇦🇹',
    },
    { name: 'Spain', nameNl: 'Spanje', iso2: 'ES', dial: '+34', flag: '🇪🇸' },
    {
        name: 'Portugal',
        nameNl: 'Portugal',
        iso2: 'PT',
        dial: '+351',
        flag: '🇵🇹',
    },
    { name: 'Italy', nameNl: 'Italië', iso2: 'IT', dial: '+39', flag: '🇮🇹' },
    {
        name: 'Denmark',
        nameNl: 'Denemarken',
        iso2: 'DK',
        dial: '+45',
        flag: '🇩🇰',
    },
    { name: 'Sweden', nameNl: 'Zweden', iso2: 'SE', dial: '+46', flag: '🇸🇪' },
    {
        name: 'Norway',
        nameNl: 'Noorwegen',
        iso2: 'NO',
        dial: '+47',
        flag: '🇳🇴',
    },
    {
        name: 'Finland',
        nameNl: 'Finland',
        iso2: 'FI',
        dial: '+358',
        flag: '🇫🇮',
    },
    {
        name: 'Iceland',
        nameNl: 'IJsland',
        iso2: 'IS',
        dial: '+354',
        flag: '🇮🇸',
    },
    { name: 'Poland', nameNl: 'Polen', iso2: 'PL', dial: '+48', flag: '🇵🇱' },
    {
        name: 'Czech Republic',
        nameNl: 'Tsjechië',
        iso2: 'CZ',
        dial: '+420',
        flag: '🇨🇿',
    },
    {
        name: 'Slovakia',
        nameNl: 'Slowakije',
        iso2: 'SK',
        dial: '+421',
        flag: '🇸🇰',
    },
    {
        name: 'Hungary',
        nameNl: 'Hongarije',
        iso2: 'HU',
        dial: '+36',
        flag: '🇭🇺',
    },
    {
        name: 'Romania',
        nameNl: 'Roemenië',
        iso2: 'RO',
        dial: '+40',
        flag: '🇷🇴',
    },
    {
        name: 'Bulgaria',
        nameNl: 'Bulgarije',
        iso2: 'BG',
        dial: '+359',
        flag: '🇧🇬',
    },
    {
        name: 'Greece',
        nameNl: 'Griekenland',
        iso2: 'GR',
        dial: '+30',
        flag: '🇬🇷',
    },
    {
        name: 'Croatia',
        nameNl: 'Kroatië',
        iso2: 'HR',
        dial: '+385',
        flag: '🇭🇷',
    },
    {
        name: 'Slovenia',
        nameNl: 'Slovenië',
        iso2: 'SI',
        dial: '+386',
        flag: '🇸🇮',
    },
    {
        name: 'Estonia',
        nameNl: 'Estland',
        iso2: 'EE',
        dial: '+372',
        flag: '🇪🇪',
    },
    { name: 'Latvia', nameNl: 'Letland', iso2: 'LV', dial: '+371', flag: '🇱🇻' },
    {
        name: 'Lithuania',
        nameNl: 'Litouwen',
        iso2: 'LT',
        dial: '+370',
        flag: '🇱🇹',
    },
    { name: 'Malta', nameNl: 'Malta', iso2: 'MT', dial: '+356', flag: '🇲🇹' },
    { name: 'Cyprus', nameNl: 'Cyprus', iso2: 'CY', dial: '+357', flag: '🇨🇾' },
    { name: 'Turkey', nameNl: 'Turkije', iso2: 'TR', dial: '+90', flag: '🇹🇷' },
    {
        name: 'Ukraine',
        nameNl: 'Oekraïne',
        iso2: 'UA',
        dial: '+380',
        flag: '🇺🇦',
    },
    {
        name: 'United States',
        nameNl: 'Verenigde Staten',
        iso2: 'US',
        dial: '+1',
        flag: '🇺🇸',
    },
    { name: 'Canada', nameNl: 'Canada', iso2: 'CA', dial: '+1', flag: '🇨🇦' },
    { name: 'Mexico', nameNl: 'Mexico', iso2: 'MX', dial: '+52', flag: '🇲🇽' },
    { name: 'Brazil', nameNl: 'Brazilië', iso2: 'BR', dial: '+55', flag: '🇧🇷' },
    {
        name: 'Argentina',
        nameNl: 'Argentinië',
        iso2: 'AR',
        dial: '+54',
        flag: '🇦🇷',
    },
    { name: 'Aruba', nameNl: 'Aruba', iso2: 'AW', dial: '+297', flag: '🇦🇼' },
    {
        name: 'Curaçao',
        nameNl: 'Curaçao',
        iso2: 'CW',
        dial: '+599',
        flag: '🇨🇼',
    },
    {
        name: 'Suriname',
        nameNl: 'Suriname',
        iso2: 'SR',
        dial: '+597',
        flag: '🇸🇷',
    },
    {
        name: 'South Africa',
        nameNl: 'Zuid-Afrika',
        iso2: 'ZA',
        dial: '+27',
        flag: '🇿🇦',
    },
    {
        name: 'Morocco',
        nameNl: 'Marokko',
        iso2: 'MA',
        dial: '+212',
        flag: '🇲🇦',
    },
    { name: 'Egypt', nameNl: 'Egypte', iso2: 'EG', dial: '+20', flag: '🇪🇬' },
    {
        name: 'Nigeria',
        nameNl: 'Nigeria',
        iso2: 'NG',
        dial: '+234',
        flag: '🇳🇬',
    },
    {
        name: 'United Arab Emirates',
        nameNl: 'Verenigde Arabische Emiraten',
        iso2: 'AE',
        dial: '+971',
        flag: '🇦🇪',
    },
    {
        name: 'Saudi Arabia',
        nameNl: 'Saoedi-Arabië',
        iso2: 'SA',
        dial: '+966',
        flag: '🇸🇦',
    },
    { name: 'Israel', nameNl: 'Israël', iso2: 'IL', dial: '+972', flag: '🇮🇱' },
    { name: 'India', nameNl: 'India', iso2: 'IN', dial: '+91', flag: '🇮🇳' },
    { name: 'China', nameNl: 'China', iso2: 'CN', dial: '+86', flag: '🇨🇳' },
    { name: 'Japan', nameNl: 'Japan', iso2: 'JP', dial: '+81', flag: '🇯🇵' },
    {
        name: 'South Korea',
        nameNl: 'Zuid-Korea',
        iso2: 'KR',
        dial: '+82',
        flag: '🇰🇷',
    },
    {
        name: 'Singapore',
        nameNl: 'Singapore',
        iso2: 'SG',
        dial: '+65',
        flag: '🇸🇬',
    },
    {
        name: 'Indonesia',
        nameNl: 'Indonesië',
        iso2: 'ID',
        dial: '+62',
        flag: '🇮🇩',
    },
    {
        name: 'Thailand',
        nameNl: 'Thailand',
        iso2: 'TH',
        dial: '+66',
        flag: '🇹🇭',
    },
    {
        name: 'Australia',
        nameNl: 'Australië',
        iso2: 'AU',
        dial: '+61',
        flag: '🇦🇺',
    },
    {
        name: 'New Zealand',
        nameNl: 'Nieuw-Zeeland',
        iso2: 'NZ',
        dial: '+64',
        flag: '🇳🇿',
    },
];

function parseInitialValue(value: string | undefined) {
    if (!value) return { dial: COUNTRIES[0].dial, national: '' };
    const trimmed = value.trim();
    const sortedByLength = [...COUNTRIES].sort(
        (a, b) => b.dial.length - a.dial.length,
    );
    const match = sortedByLength.find((c) => trimmed.startsWith(c.dial));
    if (match) {
        return {
            dial: match.dial,
            national: trimmed.slice(match.dial.length).trim(),
        };
    }
    return { dial: COUNTRIES[0].dial, national: trimmed };
}

export interface PhoneInputProps {
    value: string;
    onChange: (value: string) => void;
    locale?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    name?: string;
    className?: string;
}

/**
 * International phone field: dial-code picker (NL/BE pinned first, then
 * alphabetical) with search, combined with a free-text national number.
 * Reports the full value back as a single "+31 6 12345678"-style string so
 * callers keep a plain string field in their form state.
 */
export function PhoneInput({
    value,
    onChange,
    locale = 'nl',
    placeholder,
    required,
    disabled,
    name,
    className,
}: PhoneInputProps) {
    const isEn = locale === 'en';
    const initial = useMemo(() => parseInitialValue(value), []); // eslint-disable-line react-hooks/exhaustive-deps
    const [dial, setDial] = useState(initial.dial);
    const [national, setNational] = useState(initial.national);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const wrapperRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
                setQuery('');
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (open) searchRef.current?.focus();
    }, [open]);

    const selected = COUNTRIES.find((c) => c.dial === dial) || COUNTRIES[0];

    const filteredCountries = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return COUNTRIES;
        return COUNTRIES.filter(
            (c) =>
                c.name.toLowerCase().includes(q) ||
                c.nameNl.toLowerCase().includes(q) ||
                c.dial.includes(q) ||
                c.iso2.toLowerCase().includes(q),
        );
    }, [query]);

    const emit = (nextDial: string, nextNational: string) => {
        const combined = `${nextDial} ${nextNational}`.trim();
        onChange(combined);
    };

    return (
        <div
            ref={wrapperRef}
            className={cn(
                'relative flex items-stretch rounded-lg border border-navy-900/15 bg-white focus-within:border-teal focus-within:ring-1 focus-within:ring-teal overflow-visible',
                className,
            )}
        >
            <button
                type='button'
                onClick={() => setOpen((o) => !o)}
                disabled={disabled}
                className='flex items-center gap-0.75 px-1.5 border-r border-navy-900/10 text-sm text-navy-900 hover:bg-navy-900/5 transition-colors rounded-l-lg shrink-0 disabled:opacity-60'
                aria-label={isEn ? 'Select country code' : 'Kies landcode'}
            >
                <span className='text-base leading-none'>{selected.flag}</span>
                <span className='font-medium text-xs'>{selected.dial}</span>
                <ChevronDown className='w-3.5 h-3.5 text-navy-500' />
            </button>

            <input
                type='tel'
                name={name}
                required={required}
                disabled={disabled}
                value={national}
                onChange={(e) => {
                    setNational(e.target.value);
                    emit(dial, e.target.value);
                }}
                placeholder={placeholder || '6 12345678'}
                className='w-full bg-transparent border-0 outline-none px-3 py-1.5 text-sm text-navy-900 placeholder:text-navy-900/40 rounded-r-lg min-w-0'
            />

            {open && (
                <div className='absolute z-50 top-full left-0 mt-1.5 w-72 max-h-80 overflow-hidden rounded-lg border border-navy-900/10 bg-white shadow-xl flex flex-col'>
                    <div className='relative border-b border-navy-900/10 shrink-0'>
                        <Search className='w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-navy-500' />
                        <input
                            ref={searchRef}
                            type='text'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={
                                isEn
                                    ? 'Search country or code…'
                                    : 'Zoek land of code…'
                            }
                            className='w-full bg-transparent border-0 outline-none pl-8 pr-3 py-2.5 text-xs text-navy-900 placeholder:text-navy-900/40'
                        />
                    </div>
                    <ul className='overflow-y-auto py-1'>
                        {filteredCountries.length === 0 && (
                            <li className='px-3 py-4 text-xs text-navy-500 text-center'>
                                {isEn
                                    ? 'No countries found'
                                    : 'Geen landen gevonden'}
                            </li>
                        )}
                        {filteredCountries.map((c) => (
                            <li key={c.iso2}>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setDial(c.dial);
                                        emit(c.dial, national);
                                        setOpen(false);
                                        setQuery('');
                                    }}
                                    className={cn(
                                        'w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs hover:bg-teal/10 transition-colors',
                                        c.dial === dial &&
                                            'bg-teal/15 text-teal font-semibold',
                                    )}
                                >
                                    <span className='text-base leading-none shrink-0'>
                                        {c.flag}
                                    </span>
                                    <span className='flex-1 truncate text-navy-900'>
                                        {isEn ? c.name : c.nameNl}
                                    </span>
                                    <span className='text-navy-500 font-mono shrink-0'>
                                        {c.dial}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
