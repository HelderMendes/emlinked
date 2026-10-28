import React from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { client } from '@/sanity/client';
import DocsLocaleSwitch from '@/components/docs/DocsLocaleSwitch';
import DocsSidebarNav from '@/components/docs/DocsSidebarNav';

interface DocsLayoutProps {
    children: React.ReactNode;
}

interface DocCategoryEntry {
    title: string;
    slug: string;
    order: number | null;
}

interface DocNavEntry {
    title: string;
    slug: string;
    order: number | null;
    categorySlug: string | null;
}

async function getDocCategories(locale: string) {
    try {
        return await client.fetch<DocCategoryEntry[]>(
            `*[_type == "docCategory" && language == $locale] | order(order asc) {
                title,
                "slug": slug.current,
                order
            }`,
            { locale },
        );
    } catch (err) {
        console.error('Sanity docCategory fetch failed:', err);
        return [];
    }
}

async function getDocEntries(locale: string) {
    try {
        return await client.fetch<DocNavEntry[]>(
            `*[_type == "doc" && language == $locale] | order(order asc) {
                title,
                "slug": slug.current,
                order,
                "categorySlug": category->slug.current
            }`,
            { locale },
        );
    } catch (err) {
        console.error('Sanity doc fetch failed:', err);
        return [];
    }
}

export default async function DocsLayout({ children }: DocsLayoutProps) {
    const cookieStore = await cookies();
    const locale =
        cookieStore.get('emlinked_locale')?.value === 'en' ? 'en' : 'nl';

    const [categories, docs] = await Promise.all([
        getDocCategories(locale),
        getDocEntries(locale),
    ]);

    const sections = categories.map((cat) => ({
        name: cat.title,
        key: cat.slug,
        items: docs
            .filter((d) => d.categorySlug === cat.slug)
            .map((d) => ({
                title: d.title,
                path: `/docs/${cat.slug}/${d.slug}`,
            })),
    }));

    const copy =
        locale === 'en'
            ? {
                  badge: 'Manuals',
                  emptyLabel: 'No categories published yet.',
                  emptyItemsLabel: "No pages yet",
                  search: 'Search manuals...',
                  backToSite: 'Back to website',
                  landingTitle: 'My emlinked / Manuals',
                  landingBody:
                      'Browse the manuals for Emlinked property management software. Pick a category in the menu to open a page.',
              }
            : {
                  badge: 'Handleidingen',
                  emptyLabel: 'Nog geen categorieën aangemaakt.',
                  emptyItemsLabel: "Nog geen pagina's",
                  search: 'Zoek in handleidingen...',
                  backToSite: 'Terug naar website',
                  landingTitle: 'Mijn emlinked / Handleidingen',
                  landingBody:
                      'Blader door de handleidingen voor de Emlinked vastgoedbeheer software. Kies een categorie in het menu om een pagina te openen.',
              };

    return (
        <div className='flex h-screen bg-stone-bg text-navy-900 font-sans overflow-hidden'>
            {/* Sidebar Navigation */}
            <aside className='w-80 border-r border-navy-900/10 bg-card flex flex-col h-full shrink-0'>
                {/* Sidebar Header */}
                <div className='h-16 border-b border-navy-900/10 px-6 flex items-center shrink-0 bg-teal-ultra/40'>
                    <Link href='/' className='flex items-center gap-2.5'>
                        <img
                            src='/emlinked/Emlinked_logo__liggend.svg?v=2'
                            alt='emlinked'
                            className='h-7 w-auto'
                        />
                        <span className='text-[10px] font-bold tracking-widest bg-teal/15 text-teal-700 px-2 py-0.5 rounded-full uppercase'>
                            {copy.badge}
                        </span>
                    </Link>
                </div>

                {/* Sidebar Content (Scrollable Categories) */}
                <nav className='grow overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-border'>
                    <DocsSidebarNav
                        sections={sections}
                        emptyLabel={copy.emptyLabel}
                        emptyItemsLabel={copy.emptyItemsLabel}
                    />
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className='grow flex flex-col h-full overflow-hidden'>
                {/* Top Navbar */}
                <header className='h-16 border-b border-navy-900/10 bg-card px-8 flex items-center justify-between shrink-0'>
                    <div className='w-96 relative'>
                        <span className='absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground'>
                            <svg
                                className='h-4 w-4'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='2'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z'
                                />
                            </svg>
                        </span>
                        <input
                            type='search'
                            placeholder={copy.search}
                            className='w-full h-9 pl-9 pr-4 rounded-full border border-navy-900/15 bg-stone-bg text-xs text-navy-900 focus:outline-none focus:border-teal transition-all'
                        />
                    </div>
                    <div className='flex items-center gap-4'>
                        <DocsLocaleSwitch locale={locale} />
                        <span className='text-navy-900/15'>|</span>
                        <Link
                            href='/'
                            className='text-xs font-semibold text-navy-700 hover:text-teal-700 transition-colors'
                        >
                            {copy.backToSite}
                        </Link>
                    </div>
                </header>

                {/* Scrollable Document Container */}
                <main className='grow overflow-y-auto bg-stone-bg/60 p-12 scrollbar-thin'>
                    <div className='max-w-3xl mx-auto'>{children}</div>
                </main>
            </div>
        </div>
    );
}
