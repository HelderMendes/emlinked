'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

interface TierSelectOption {
    base: string;
    price: string | null;
}

interface TierSelectProps {
    label: string;
    options: string[];
    value: number;
    onChange: (index: number) => void;
}

function parseOption(raw: string): TierSelectOption {
    const match = raw.match(/^(.*) \(\+(€[^)]+)\)$/);
    if (!match) return { base: raw, price: null };
    return { base: match[1], price: match[2] };
}

export function TierSelect({
    label,
    options,
    value,
    onChange,
}: TierSelectProps) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const parsed = options.map(parseOption);
    const selected = parsed[value] ?? parsed[0];

    useEffect(() => {
        if (!open) return;
        const handleClickOutside = (event: MouseEvent) => {
            if (
                rootRef.current &&
                !rootRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKey);
        };
    }, [open]);

    return (
        <div className='relative' ref={rootRef}>
            <button
                type='button'
                onClick={() => setOpen((o) => !o)}
                aria-haspopup='listbox'
                aria-expanded={open}
                aria-label={label}
                className='w-full flex items-center justify-between gap-2 rounded-md border border-black/20 bg-slate-50 pl-3 pr-3 py-2 text-sm font-medium text-[#060e32] hover:border-teal/50 focus:border-teal focus:outline-hidden focus:ring-2 focus:ring-teal/30 transition-all cursor-pointer'
            >
                <span className='truncate text-left'>{selected.base}</span>
                <span className='flex items-center gap-2 shrink-0'>
                    {selected.price && (
                        <span className='text-xs font-mono font-bold text-teal'>
                            {selected.price}
                        </span>
                    )}
                    <ChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                            open ? 'rotate-180' : ''
                        }`}
                    />
                </span>
            </button>

            {open && (
                <ul
                    role='listbox'
                    aria-label={label}
                    className='absolute left-0 right-0 z-50 mt-1.5 max-h-74 overflow-y-auto rounded-lg border border-black/15 bg-white p-1 shadow-lg'
                >
                    {parsed.map((option, idx) => {
                        const active = idx === value;
                        return (
                            <li
                                key={idx}
                                role='option'
                                aria-selected={active}
                                className='last:pb-1.5'
                            >
                                <button
                                    type='button'
                                    onClick={() => {
                                        onChange(idx);
                                        setOpen(false);
                                    }}
                                    className={`flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                                        active
                                            ? 'bg-teal/10 text-teal font-bold'
                                            : 'text-[#060e32] hover:bg-teal/5'
                                    }`}
                                >
                                    <span className='flex items-center gap-2'>
                                        <Check
                                            className={`w-3.5 h-3.5 shrink-0 ${
                                                active
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            }`}
                                        />
                                        <span>{option.base}</span>
                                    </span>
                                    {option.price && (
                                        <span
                                            className={`shrink-0 text-xs font-mono font-bold ${
                                                active
                                                    ? 'text-teal'
                                                    : 'text-slate-500'
                                            }`}
                                        >
                                            {option.price}
                                        </span>
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
