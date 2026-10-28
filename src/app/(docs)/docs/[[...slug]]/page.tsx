import React from 'react';
import { cookies } from 'next/headers';
import { PortableText, PortableTextComponents } from 'next-sanity';
import { client } from '@/sanity/client';
import { getImageUrl } from '@/sanity/image';

interface DocPageProps {
    params: Promise<{ slug?: string[] }>;
}

interface SanityDocResult {
    title: string;
    categoryTitle: string;
    body?: any[];
    pdfFile?: { url: string; originalFilename: string } | null;
}

function getNativeImageWidth(value: any): number | null {
    const ref: string | undefined = value?.asset?._ref;
    if (!ref) return null;
    const match = ref.match(/-(\d+)x(\d+)-/);
    return match ? parseInt(match[1], 10) : null;
}

const portableTextComponents: PortableTextComponents = {
    block: {
        h2: ({ children }) => (
            <h2 className='text-xl font-bold text-navy-900 pt-6 pb-2'>
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 className='text-lg font-bold text-navy-900 pt-4 pb-2'>
                {children}
            </h3>
        ),
        h4: ({ children }) => (
            <h4 className='text-base font-bold text-navy-900 pt-3 pb-1'>
                {children}
            </h4>
        ),
        normal: ({ children }) => (
            <p className='text-sm leading-relaxed text-navy-700 my-3'>
                {children}
            </p>
        ),
    },
    list: {
        bullet: ({ children }) => (
            <ul className='list-disc list-inside space-y-1.5 my-3 text-sm text-navy-700'>
                {children}
            </ul>
        ),
        number: ({ children }) => (
            <ol className='list-decimal list-inside space-y-1.5 my-3 text-sm text-navy-700'>
                {children}
            </ol>
        ),
    },
    marks: {
        strong: ({ children }) => (
            <strong className='font-semibold text-navy-900'>
                {children}
            </strong>
        ),
        link: ({ value, children }) => {
            const href = value?.href || '#';
            const target = href.startsWith('http') ? '_blank' : undefined;
            return (
                <a
                    href={href}
                    target={target}
                    rel={target ? 'noopener noreferrer' : undefined}
                    className='text-teal-700 underline hover:no-underline'
                >
                    {children}
                </a>
            );
        },
    },
    types: {
        image: ({ value }) => {
            const src = getImageUrl(value, undefined);
            if (!src) return null;
            const nativeWidth = getNativeImageWidth(value);
            // eslint-disable-next-line @next/next/no-img-element
            return (
                <img
                    src={src}
                    alt={value?.alt || ''}
                    style={
                        nativeWidth
                            ? { maxWidth: `min(100%, ${nativeWidth}px)` }
                            : undefined
                    }
                    className='rounded-lg border border-navy-900/10 my-6 w-auto h-auto mx-auto block'
                />
            );
        },
        codeBlock: ({ value }) => (
            <pre className='bg-navy-900/5 border border-navy-900/10 rounded-lg p-4 my-4 overflow-x-auto text-xs'>
                <code>{value?.code}</code>
            </pre>
        ),
        imageGrid: ({ value }) => {
            const items = value?.items || [];
            if (items.length === 0) return null;
            return (
                <div className='grid grid-cols-2 gap-4 my-6'>
                    {items.map((item: any, idx: number) => {
                        const src = getImageUrl(item?.image, undefined);
                        if (!src) return null;
                        return (
                            <figure key={idx} className='m-0'>
                                <img
                                    src={src}
                                    alt={item?.caption || ''}
                                    className='rounded-lg border border-navy-900/10 w-full'
                                />
                                {item?.caption && (
                                    <figcaption className='text-xs text-navy-700 mt-2 text-center'>
                                        {item.caption}
                                    </figcaption>
                                )}
                            </figure>
                        );
                    })}
                </div>
            );
        },
    },
};

function DownloadIcon() {
    return (
        <svg
            className='h-5 w-5'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='currentColor'
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 4v12m0 0l-4-4m4 4l4-4M4 20h16'
            />
        </svg>
    );
}

export default async function DocPage({ params }: DocPageProps) {
    const resolvedParams = await params;
    const slugArray = resolvedParams.slug || [];

    const cookieStore = await cookies();
    const locale =
        cookieStore.get('emlinked_locale')?.value === 'en' ? 'en' : 'nl';

    const copy =
        locale === 'en'
            ? {
                  landingTitle: 'Documentation Center',
                  landingBody:
                      'Welcome to the Emlinked manuals. Pick a category in the menu to open a page.',
                  notFoundTitle: 'Page not found',
                  notFoundBody: "This manual page doesn't exist yet in Sanity.",
                  noContent: 'Content for this page has not been added yet.',
                  downloadLabel: 'Download',
              }
            : {
                  landingTitle: 'Documentation Center',
                  landingBody:
                      'Welkom bij de Emlinked documentatie. Kies een categorie in het menu om een handleiding te openen.',
                  notFoundTitle: 'Pagina niet gevonden',
                  notFoundBody: 'Deze handleiding bestaat nog niet in Sanity.',
                  noContent: 'Inhoud voor deze handleiding is nog niet toegevoegd.',
                  downloadLabel: 'Downloaden',
              };

    // Render Docs landing page when no path segments are provided
    if (slugArray.length === 0) {
        return (
            <div className='space-y-8'>
                <div className='border-b border-navy-900/10 pb-6'>
                    <h1 className='font-display text-3xl font-bold tracking-tight text-navy-900'>
                        {copy.landingTitle}
                    </h1>
                    <p className='text-sm text-navy-700 mt-2'>
                        {copy.landingBody}
                    </p>
                </div>
            </div>
        );
    }

    const categorySlug = slugArray[0] || '';
    const itemSlug = slugArray[1] || '';

    let sanityDoc: SanityDocResult | null = null;

    try {
        sanityDoc = await client.fetch<SanityDocResult | null>(
            `*[_type == "doc" && language == $locale && category->slug.current == $categorySlug && slug.current == $itemSlug][0] {
                title,
                "categoryTitle": category->title,
                body,
                "pdfFile": pdfFile.asset-> { url, originalFilename }
            }`,
            { locale, categorySlug, itemSlug },
        );
    } catch (err) {
        console.error('Sanity doc fetch error:', err);
    }

    if (!sanityDoc) {
        return (
            <div className='space-y-6'>
                <div className='border-b border-navy-900/10 pb-6'>
                    <h1 className='font-display text-2xl font-bold tracking-tight text-navy-900'>
                        {copy.notFoundTitle}
                    </h1>
                    <p className='text-sm text-navy-700 mt-2'>
                        {copy.notFoundBody}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className='space-y-6'>
            <div className='border-b border-navy-900/10 pb-6'>
                <div className='text-[10px] font-bold tracking-widest text-teal-700 uppercase mb-1'>
                    {sanityDoc.categoryTitle}
                </div>
                <h1 className='font-display text-3xl font-bold tracking-tight text-navy-900'>
                    {sanityDoc.title}
                </h1>
            </div>

            <article className='max-w-none'>
                {sanityDoc.pdfFile?.url && (
                    <div className='mb-8 flex items-center justify-between gap-4 rounded-xl border border-teal/30 bg-teal-pale/40 px-5 py-4'>
                        <div className='flex items-center gap-3 min-w-0'>
                            <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal-700'>
                                <DownloadIcon />
                            </span>
                            <span className='truncate text-sm font-semibold text-navy-900'>
                                {sanityDoc.pdfFile.originalFilename}
                            </span>
                        </div>
                        <a
                            href={sanityDoc.pdfFile.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            download={sanityDoc.pdfFile.originalFilename}
                            className='shrink-0 rounded-full bg-teal px-4 py-2 text-xs font-bold text-white hover:bg-teal-hover transition-colors'
                        >
                            {copy.downloadLabel}
                        </a>
                    </div>
                )}
                {sanityDoc.body && sanityDoc.body.length > 0 ? (
                    <PortableText
                        value={sanityDoc.body}
                        components={portableTextComponents}
                    />
                ) : !sanityDoc.pdfFile?.url ? (
                    <p className='text-sm text-navy-700'>{copy.noContent}</p>
                ) : null}
            </article>
        </div>
    );
}
