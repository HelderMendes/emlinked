'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface ColorIconProps {
    src?: string;
    alt: string;
    className?: string;
    sizePx?: number;
    fallback?: React.ReactNode;
}

const svgCache = new Map<string, string>();

function recolor(svgMarkup: string): string {
    return svgMarkup
        .replace(/fill="(?!none")[^"]*"/gi, '')
        .replace(/stroke="(?!none")[^"]*"/gi, '')
        .replace(/<svg /i, '<svg fill="currentColor" ');
}

/**
 * Renders an uploaded icon so it inherits the surrounding text color
 * (teal/emerald/navy per card). Only SVG supports this — recoloring an
 * SVG requires inlining its markup in the DOM so `currentColor` can
 * resolve, which next/image's <img>-based rendering doesn't allow.
 * PNG/JPG stay as-uploaded (raster has no concept of currentColor).
 */
export function ColorIcon({
    src,
    alt,
    className = 'w-6 h-6',
    sizePx = 24,
    fallback = null,
}: ColorIconProps) {
    const isSvg = Boolean(src && src.split('?')[0].toLowerCase().endsWith('.svg'));
    const [inlineSvg, setInlineSvg] = useState<string | null>(
        isSvg && src ? svgCache.get(src) || null : null,
    );

    useEffect(() => {
        if (!isSvg || !src) return;
        if (svgCache.has(src)) {
            setInlineSvg(svgCache.get(src) || null);
            return;
        }
        let cancelled = false;
        fetch(src)
            .then((res) => res.text())
            .then((text) => {
                const colored = recolor(text);
                svgCache.set(src, colored);
                if (!cancelled) setInlineSvg(colored);
            })
            .catch(() => {});
        return () => {
            cancelled = true;
        };
    }, [isSvg, src]);

    if (!src) return <>{fallback}</>;

    if (isSvg) {
        if (!inlineSvg) return <>{fallback}</>;
        return (
            <span
                className={className}
                aria-label={alt}
                role='img'
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: inlineSvg }}
            />
        );
    }

    return (
        <div className={`relative ${className}`}>
            <Image
                src={src}
                alt={alt}
                fill
                sizes={`${sizePx}px`}
                className='object-contain'
            />
        </div>
    );
}
