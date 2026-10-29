import React from 'react';
import { Button, Stack } from '@sanity/ui';
import { set, useFormValue, type StringInputProps } from 'sanity';

const WORDS_PER_MINUTE = 225;

function calculateReadTime(text: string, imageCount: number = 0): number {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const wordTimeSeconds = (words / WORDS_PER_MINUTE) * 60;

    // Image viewing time: 12s for the first, decreasing to a 3s floor.
    let imageTimeSeconds = 0;
    for (let i = 0; i < imageCount; i++) {
        imageTimeSeconds += Math.max(12 - i, 3);
    }

    const totalMinutes = Math.ceil((wordTimeSeconds + imageTimeSeconds) / 60);
    return Math.max(1, totalMinutes);
}

interface PortableTextItemLike {
    _type?: string;
    children?: { text?: string }[];
}

// Portable Text blocks hold their text in `children[].text`; everything
// else (images, custom objects) is skipped for the word count.
function extractPlainText(body: unknown): string {
    if (!Array.isArray(body)) return '';
    return (body as PortableTextItemLike[])
        .filter((item) => item?._type === 'block')
        .map((block) =>
            (block.children || []).map((child) => child.text || '').join(''),
        )
        .join(' ');
}

function countImages(body: unknown): number {
    if (!Array.isArray(body)) return 0;
    return (body as PortableTextItemLike[]).filter(
        (item) => item?._type === 'image',
    ).length;
}

export function ReadTimeInput(props: StringInputProps) {
    const body = useFormValue(['body']);
    const language = useFormValue(['language']) as string | undefined;
    const { onChange, renderDefault } = props;

    const handleCalculate = () => {
        const text = extractPlainText(body);
        const imageCount = countImages(body);
        const minutes = calculateReadTime(text, imageCount);
        const label =
            language === 'en' ? `${minutes} min read` : `${minutes} min leestijd`;
        onChange(set(label));
    };

    return (
        <Stack gap={2}>
            {renderDefault(props)}
            <Button
                text="Bereken leestijd automatisch"
                tone="primary"
                mode="ghost"
                onClick={handleCalculate}
            />
        </Stack>
    );
}
