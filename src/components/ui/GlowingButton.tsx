'use client';

import React from 'react';
import Link from 'next/link';

function hexToRgba(hex: string, alpha: number = 1): string {
    let hexValue = hex.replace('#', '');

    if (hexValue.length === 3) {
        hexValue = hexValue
            .split('')
            .map((char) => char + char)
            .join('');
    }

    const r = parseInt(hexValue.substring(0, 2), 16);
    const g = parseInt(hexValue.substring(2, 4), 16);
    const b = parseInt(hexValue.substring(4, 6), 16);

    if (isNaN(r) || isNaN(g) || isNaN(b)) {
        console.error('Invalid hex color:', hex);
        return 'rgba(0, 0, 0, 1)';
    }

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

interface GlowingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    glowColor?: string;
    className?: string;
}

export function GlowingButton({
    children,
    glowColor = '#e16000', // Default to Emlinked Orange
    className = '',
    type = 'button',
    ...props
}: GlowingButtonProps) {
    const glowColorRgba = hexToRgba(glowColor);
    const glowColorVia = hexToRgba(glowColor, 0.075);
    const glowColorTo = hexToRgba(glowColor, 0.2);

    return (
        <button
            type={type}
            style={
                {
                    '--glow-color': glowColorRgba,
                    '--glow-color-via': glowColorVia,
                    '--glow-color-to': glowColorTo,
                } as React.CSSProperties
            }
            className={`
                relative flex h-10 items-center justify-center overflow-hidden rounded-md border border-r-0 px-6 text-xs font-bold transition-all duration-300 select-none cursor-pointer shadow-sm
                border-[#e36000] bg-linear-to-t text-white
                from-[#e36000] to-[#ffeb00] hover:opacity-95 active:scale-[0.98]
                after:absolute after:inset-0 after:rounded-[inherit] after:bg-linear-to-r after:from-transparent after:from-40% after:via-(--glow-color-via) after:via-70% after:to-(--glow-color-to)
                before:absolute before:right-0 before:h-[60%] before:w-[3px] before:rounded-l before:bg-(--glow-color) before:shadow-[-2px_0_10px_var(--glow-color)] before:transition-all before:duration-300 hover:before:translate-x-full
                ${className}
            `}
            {...props}
        >
            <span className='relative z-10 flex items-center gap-1.5'>
                {children}
            </span>
        </button>
    );
}

interface GlowingLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode;
    href: string;
    glowColor?: string;
    className?: string;
}

export function GlowingLink({
    children,
    href,
    glowColor = '#ff9400', // Default to Emlinked Orange
    className = '',
    ...props
}: GlowingLinkProps) {
    const glowColorRgba = hexToRgba(glowColor);
    const glowColorVia = hexToRgba(glowColor, 0.075);
    const glowColorTo = hexToRgba(glowColor, 0.2);

    return (
        <Link
            href={href}
            style={
                {
                    '--glow-color': glowColorRgba,
                    '--glow-color-via': glowColorVia,
                    '--glow-color-to': glowColorTo,
                } as React.CSSProperties
            }
            className={`
                relative inline-flex h-11 items-center justify-center overflow-hidden rounded-md border border-r-0 px-6 text-xs font-bold transition-all duration-300 select-none cursor-pointer shadow-sm
                border-[#e36000] bg-linear-to-t text-white
                from-[#e36000] to-[#f6ca03] hover:scale-[1.02] active:scale-[0.98]
                after:absolute after:inset-0 after:rounded-[inherit] after:bg-linear-to-r after:from-transparent after:from-40% after:via-(--glow-color-via) after:via-70% after:to-(--glow-color-to)
                before:absolute before:right-0 before:h-[60%] before:w-[3px] before:rounded-l before:bg-(--glow-color) before:shadow-[-2px_0_10px_var(--glow-color)] before:transition-all before:duration-300 hover:before:translate-x-full
                ${className}
            `}
            {...props}
        >
            <span className='relative z-10 flex items-center gap-1.5'>
                {children}
            </span>
        </Link>
    );
}
