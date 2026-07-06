import React from 'react';
import Link from 'next/link';
import { client } from '@/sanity/client';

interface DocsLayoutProps {
    children: React.ReactNode;
}

interface DocNavEntry {
    title: string;
    slug: string;
    category: string;
}

const slugify = (text: string) =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

const fallbackCategories = [
    {
        name: 'Releases',
        key: 'releases',
        items: [
            'ReleaseNotes Emlinked 23',
            'ReleaseNotes Emlinked 23.009',
            'ReleaseNotes Emlinked 23.010',
        ],
    },
    {
        name: 'Vastgoed Beheer',
        key: 'vastgoed-beheer',
        items: [
            'Aanmaken huurcontract',
            'Aanmaken object',
            'Aanmaken Verhuureenheid',
            'Beheer factuur maken',
            'Creditnota aanmaken',
            'Huurcontract op meerdere verhuureenheden',
            'Huurcontractindexatie',
            'Huurindexatie terugdraaien',
            'Huurprolongatie',
            'Kosten factuur maken',
            'Nieuwe functionaliteit kopieëren kostenverdeling',
            'Rentefactuur',
            'Vermelding indexatie percentage',
        ],
    },
    {
        name: 'Financieel Beheer',
        key: 'financieel-beheer',
        items: [
            'Aanpassing onderwerp regel inkooporder',
            'Betalingsverplichtingen beheren',
            'BTW-Verlegging',
            'Het grootboek en het rekeningschema begrijpen',
            'RDLC of Word rapport',
            'Tegoed beheren',
            'Telebankieren betaling klaar zetten',
            'Vooruitbetalingen factureren',
            'Aanmaningen maken en versturen',
            'Instructies inlezen of bijwerken WVS puntentellinglijst',
            'Nieuwe contacten',
            'Nieuwe eigenaar registreren',
            'Nieuwe huurder registreren',
            'Verkopen factureren',
            'Verschillende e-mailadressen gebruiken',
        ],
    },
    {
        name: 'Kosten Administratie',
        key: 'kosten-administratie',
        items: [
            'Betalingen aanmaken en/of leveranciers betalen',
            'Inkopen vastleggen',
            'Kosten doorbelasten toewijzen',
            'Service kosten afrekenfactuur',
        ],
    },
    {
        name: 'Service Beheer',
        key: 'service-beheer',
        items: [
            'Aanmaken service registratie',
            'Een inkoop order maken',
            'Meldingen registreren',
        ],
    },
    {
        name: 'Instellen Emlinked',
        key: 'instellen-emlinked',
        items: [
            'Beheer van BCC',
            'Betalingsmethoden instellen',
            'Boekingsgroepen instellen',
            'De rekeningschema’s instellen',
            'EMLinked op uw mobiele apparaat krijgen',
        ],
    },
];

export default async function DocsLayout({ children }: DocsLayoutProps) {
    let sanityDocs: DocNavEntry[] = [];

    try {
        sanityDocs = await client.fetch<DocNavEntry[]>(
            `*[_type == "doc"] | order(order asc) {
        title,
        "slug": slug.current,
        category
      }`,
        );
    } catch (err) {
        console.error(
            'Sanity docs fetch failed, using fallback static TOC:',
            err,
        );
    }

    // Group documentation pages
    const sections = fallbackCategories.map((cat) => {
        // Check if there are matching pages in Sanity for this category
        const sanityItems = sanityDocs.filter((d) => d.category === cat.key);

        const items =
            sanityItems.length > 0
                ? sanityItems.map((d) => ({
                      title: d.title,
                      path: `/docs/${cat.key}/${d.slug}`,
                  }))
                : cat.items.map((title) => ({
                      title,
                      path: `/docs/${cat.key}/${slugify(title)}`,
                  }));

        return {
            name: cat.name,
            key: cat.key,
            items,
        };
    });

    return (
        <div className='flex h-screen bg-background text-foreground font-sans overflow-hidden'>
            {/* Sidebar Navigation */}
            <aside className='w-80 border-r border-border bg-card flex flex-col h-full shrink-0'>
                {/* Sidebar Header */}
                <div className='h-16 border-b border-border px-6 flex items-center justify-between shrink-0 bg-muted/20'>
                    <Link href='/' className='flex items-center gap-2'>
                        <span className='font-display text-lg font-bold tracking-tight text-primary'>
                            em<span className='text-foreground'>linked</span>
                        </span>
                        <span className='text-[10px] font-bold tracking-widest bg-muted px-2 py-0.5 rounded text-muted-foreground uppercase'>
                            Docs
                        </span>
                    </Link>
                </div>

                {/* Sidebar Content (Scrollable Categories) */}
                <nav className='flex-grow overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-border'>
                    {sections.map((section, idx) => (
                        <div key={idx} className='space-y-2'>
                            <h4 className='text-xs font-bold uppercase tracking-wider text-muted-foreground/80'>
                                {section.name}
                            </h4>
                            <ul className='space-y-1 pl-1'>
                                {section.items.map((item, itemIdx) => (
                                    <li key={itemIdx}>
                                        <Link
                                            href={item.path}
                                            className='block py-1.5 px-2 rounded-md text-xs font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors truncate'
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className='flex-grow flex flex-col h-full overflow-hidden'>
                {/* Top Navbar */}
                <header className='h-16 border-b border-border bg-card px-8 flex items-center justify-between shrink-0'>
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
                            placeholder='Search documentation...'
                            className='w-full h-9 pl-9 pr-4 rounded-md border border-border bg-background text-xs text-foreground focus:outline-none focus:border-primary transition-all'
                        />
                    </div>
                    <div className='flex items-center gap-4 text-xs font-semibold'>
                        <Link
                            href='/'
                            className='text-muted-foreground hover:text-foreground transition-colors'
                        >
                            Public Portal
                        </Link>
                        <span className='text-muted-foreground'>|</span>
                        <span className='text-primary font-bold'>
                            Authenticated User
                        </span>
                    </div>
                </header>

                {/* Scrollable Document Container */}
                <main className='flex-grow overflow-y-auto bg-background/50 p-12 scrollbar-thin'>
                    <div className='max-w-3xl mx-auto'>{children}</div>
                </main>
            </div>
        </div>
    );
}
