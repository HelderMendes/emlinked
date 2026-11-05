import React from 'react';
import { cn } from '@/lib/utils';

export type BadgeColor = 'navy' | 'teal' | 'white' | 'emerald';

const colorClasses: Record<BadgeColor, string> = {
    navy: 'border-navy-900 text-navy-900',
    teal: 'border-teal text-teal',
    white: 'border-white text-white',
    emerald: 'border-emerald-500 text-emerald-500',
};

export interface BadgeProps {
    color?: BadgeColor;
    uppercase?: boolean;
    dot?: boolean;
    dotPulse?: boolean;
    className?: string;
    children: React.ReactNode;
}

/**
 * Eyebrow/label badge — the pill above a heading. Shared shape lifted from
 * the homepage hero: border, transparent bg, tight padding.
 * Not for status/state pills (those keep their filled, tinted look —
 * different job: signaling live state, not labeling a section).
 *
 * Content is CMS-editable and its length isn't guaranteed — no
 * `whitespace-nowrap`/fixed height/`w-min` here, so an editor pasting a
 * full sentence into what's meant to be a short tag wraps onto multiple
 * lines instead of overflowing past the viewport edge.
 */
export function renderWithLowercaseBrand(node: React.ReactNode): React.ReactNode {
    if (typeof node === 'string') {
        if (!/emlinked/i.test(node)) return node;
        const parts = node.split(/(emlinked)/gi);
        return parts.map((part, idx) =>
            part.toLowerCase() === 'emlinked' ? (
                <span key={idx} className='normal-case'>
                    emlinked
                </span>
            ) : (
                part
            ),
        );
    }
    if (Array.isArray(node)) {
        return node.map((child, idx) => (
            <React.Fragment key={idx}>
                {renderWithLowercaseBrand(child)}
            </React.Fragment>
        ));
    }
    if (React.isValidElement<{ children?: React.ReactNode }>(node) && node.props.children) {
        return React.cloneElement(node, {
            ...node.props,
            children: renderWithLowercaseBrand(node.props.children),
        });
    }
    return node;
}

export function Badge({
    color = 'navy',
    uppercase = false,
    dot = false,
    dotPulse = false,
    className,
    children,
}: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center self-start gap-1.5 rounded-[7px] border bg-transparent min-h-6 max-w-full px-2.5 py-1 text-xs font-semibold tracking-wide justify-end ',
                colorClasses[color],
                uppercase && 'uppercase',
                className,
            )}
        >
            {dot && (
                <span
                    className={cn(
                        'w-1.5 h-1.5 rounded-full shrink-0',
                        color === 'navy' && 'bg-navy-900',
                        color === 'teal' && 'bg-teal',
                        color === 'white' && 'bg-white',
                        color === 'emerald' && 'bg-emerald-500',
                        dotPulse && 'animate-none',
                    )}
                />
            )}
            {renderWithLowercaseBrand(children)}
        </span>
    );
}
