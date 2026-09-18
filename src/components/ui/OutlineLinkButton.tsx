import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export type OutlineButtonColor = 'navy' | 'white';

const colorClasses: Record<OutlineButtonColor, string> = {
    navy: 'border-navy-900 text-navy-900 hover:bg-navy-900/5',
    white: 'border-white text-white hover:bg-white/10',
};

export interface OutlineLinkButtonProps {
    href: string;
    color?: OutlineButtonColor;
    className?: string;
    children: React.ReactNode;
}

/**
 * Secondary/outline CTA — border + transparent bg, tinted hover. Shared
 * shape lifted from the homepage hero secondary button. Not for icon-only
 * buttons, segmented toggles, or hover-fills-solid CTAs — those keep their
 * own markup, different interaction semantics.
 */
export function OutlineLinkButton({
    href,
    color = 'navy',
    className,
    children,
}: OutlineLinkButtonProps) {
    return (
        <Link
            href={href}
            className={cn(
                'inline-flex h-11 items-center gap-1.5 justify-center rounded-lg border bg-transparent px-6 text-sm font-semibold transition-colors',
                colorClasses[color],
                className,
            )}
        >
            {children}
        </Link>
    );
}
