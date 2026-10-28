'use client';

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

export default function DocsSidebarNav({
    sections,
    emptyLabel,
    emptyItemsLabel,
}: DocsSidebarNavProps) {
    const pathname = usePathname();

    if (sections.length === 0) {
        return <p className='text-xs text-muted-foreground'>{emptyLabel}</p>;
    }

    return (
        <>
            {sections.map((section) => (
                <div key={section.key} className='space-y-2'>
                    <h4 className='text-[11px] font-bold uppercase tracking-wider text-teal-700'>
                        {section.name}
                    </h4>
                    <ul className='space-y-0.5 pl-1'>
                        {section.items.length === 0 ? (
                            <li className='text-[11px] text-muted-foreground/60 px-2 py-1'>
                                {emptyItemsLabel}
                            </li>
                        ) : (
                            section.items.map((item) => {
                                const active = pathname === item.path;
                                return (
                                    <li key={item.path}>
                                        <Link
                                            href={item.path}
                                            className={`block py-1.5 px-2.5 rounded-md text-[13px] font-medium transition-colors truncate ${
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
                </div>
            ))}
        </>
    );
}
