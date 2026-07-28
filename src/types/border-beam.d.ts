import { HTMLAttributes, ReactNode } from 'react';

declare module 'border-beam' {
    export type BorderBeamColorVariant =
        | 'colorful'
        | 'mono'
        | 'ocean'
        | 'sunset'
        | 'orange'
        | 'darkBlue';

    export interface BorderBeamProps extends Omit<
        HTMLAttributes<HTMLDivElement>,
        'children'
    > {
        children: ReactNode;
        colorVariant?: BorderBeamColorVariant;
        size?:
            | 'sm'
            | 'md'
            | 'lg'
            | 'xl'
            | 'full'
            | 'line'
            | 'pulse-outside'
            | 'pulse-inner';
        duration?: number;
        strength?: number;
        staticColors?: string[];
        brightness?: number;
        saturation?: number;
        hueRange?: [number, number];
        theme?: 'dark' | 'light';
        hairlineOpacity?: number;
    }

    export const BorderBeam: (props: BorderBeamProps) => ReactNode;
}
