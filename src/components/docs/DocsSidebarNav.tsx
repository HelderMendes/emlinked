'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DocsSidebarSection {
    name: string;
    key: string;
    items: { title: string; path: string }[];
}

interface DocsSidebarNavProps {
    sections: DocsSidebarSection[];
    emptyLabel: string;
    emptyItemsLabel: string;
}

function ChevronIcon({ open }: { open: boolean }) {
    return (
        <svg
            className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                open ? 'rotate-90' : ''
            }`}
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='2.5'
            stroke='currentColor'
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 5l7 7-7 7'
            />
        </svg>
    );
}

export default function DocsSidebarNav({
    sections,
    emptyLabel,
    emptyItemsLabel,
}: DocsSidebarNavProps) {
    const pathname = usePathname();
    const [openKeys, setOpenKeys] = useState<Set<string>>(
        () => new Set(sections.length > 0 ? [sections[0].key] : []),
    );

    if (sections.length === 0) {
        return <p className='text-sm text-muted-foreground'>{emptyLabel}</p>;
    }

    function toggleSection(key: string) {
        setOpenKeys((prev) => {
            const next = new Set(prev);
            if (next.has(key)) {
                next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });
    }

    return (
        <>
            {sections.map((section) => {
                const isOpen = openKeys.has(section.key);
                return (
                    <div key={section.key} className='space-y-2'>
                        <button
                            type='button'
                            onClick={() => toggleSection(section.key)}
                            aria-expanded={isOpen}
                            className='w-full flex items-center justify-between gap-2 text-left text-base font-bold uppercase tracking-wider text-teal-700 py-1 hover:text-teal-hover transition-colors'
                        >
                            <span>{section.name}</span>
                            <ChevronIcon open={isOpen} />
                        </button>
                        {isOpen && (
                            <ul className='space-y-0.5 pl-1'>
                                {section.items.length === 0 ? (
                                    <li className='text-sm text-muted-foreground/60 px-2 py-1'>
                                        {emptyItemsLabel}
                                    </li>
                                ) : (
                                    section.items.map((item) => {
                                        const active = pathname === item.path;
                                        return (
                                            <li key={item.path}>
                                                <Link
                                                    href={item.path}
                                                    className={`block py-1.5 px-2.5 rounded-md text-[15px] font-medium transition-colors truncate ${
                                                        active
                                                            ? 'bg-teal text-white'
                                                            : 'text-navy-700 hover:bg-teal-pale/50 hover:text-navy-900'
                                                    }`}
                                                >
                                                    {item.title}
                                                </Link>
                                            </li>
                                        );
                                    })
                                )}
                            </ul>
                        )}
                    </div>
                );
            })}
        </>
    );
}
