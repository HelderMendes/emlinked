import re

def update_header():
    header_path = 'src/components/Header.tsx'
    with open(header_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Swap logoSrc logic: dark theme (dark body) -> white background header -> dark logo; light theme -> light logo
    content = content.replace(
        "const logoSrc = (mounted && theme === 'dark')\n        ? '/emlinked/Emlinked_logo__liggend_white.png'\n        : '/emlinked/Emlinked_logo__liggend.svg';",
        "const logoSrc = (mounted && theme === 'dark')\n        ? '/emlinked/Emlinked_logo__liggend.svg'\n        : '/emlinked/Emlinked_logo__liggend_white.png';"
    )

    # 2. Update Header Container: border-t-4 border-amber, border-b-0, bg-[#060e32]/95 dark:bg-white/95
    content = content.replace(
        "<header className='dark sticky top-0 z-50 w-full border-b-2 border-amber bg-background/90 backdrop-blur-md transition-all duration-300'>",
        "<header className='sticky top-0 z-50 w-full border-t-4 border-amber bg-[#060e32]/95 dark:bg-white/95 backdrop-blur-md transition-all duration-300 shadow-md text-white/80 dark:text-slate-600'>"
    )

    # Remove the top orange divider inside the header (since it's now border-t-4 directly on header)
    content = content.replace(
        "            {/* Orange Top border line */}\n            <div className='h-1 bg-primary w-full' />",
        "            {/* Orange Top border line (now border-t-4 on header tag) */}"
    )

    # 3. Mobile Hamburger Trigger colors
    content = content.replace(
        "text-muted-foreground hover:bg-muted hover:text-foreground",
        "text-white/70 dark:text-slate-600 hover:bg-white/10 dark:hover:bg-slate-100 hover:text-white dark:hover:text-slate-900"
    )

    # 4. Desktop Top-level Navigation Links text colors
    content = content.replace(
        "isActive('/oplossingen/vastgoedbeheer-software') ||\n                                    isActive('/oplossingen/huurdersportaal') ||\n                                    isActive('/oplossingen/payment')\n                                        ? 'text-primary'\n                                        : 'text-muted-foreground hover:text-foreground'",
        "isActive('/oplossingen/vastgoedbeheer-software') ||\n                                    isActive('/oplossingen/huurdersportaal') ||\n                                    isActive('/oplossingen/payment')\n                                        ? 'text-amber'\n                                        : 'text-white/70 hover:text-white dark:text-slate-600 dark:hover:text-slate-900'"
    )
    content = content.replace(
        "isActive('/integraties') ||\n                                    isActive('/kennisbank/box3-check')\n                                        ? 'text-primary'\n                                        : 'text-muted-foreground hover:text-foreground'",
        "isActive('/integraties') ||\n                                    isActive('/kennisbank/box3-check')\n                                        ? 'text-amber'\n                                        : 'text-white/70 hover:text-white dark:text-slate-600 dark:hover:text-slate-900'"
    )
    content = content.replace(
        "isActive('/referenties')\n                                        ? 'text-primary'\n                                        : 'text-muted-foreground hover:text-foreground'",
        "isActive('/referenties')\n                                        ? 'text-amber'\n                                        : 'text-white/70 hover:text-white dark:text-slate-600 dark:hover:text-slate-900'"
    )
    content = content.replace(
        "isActive('/prijzen')\n                                    ? 'text-primary'\n                                    : 'text-muted-foreground hover:text-foreground'",
        "isActive('/prijzen')\n                                    ? 'text-amber'\n                                    : 'text-white/70 hover:text-white dark:text-slate-600 dark:hover:text-slate-900'"
    )
    content = content.replace(
        "isActive('/team')\n                                        ? 'text-primary'\n                                        : 'text-muted-foreground hover:text-foreground'",
        "isActive('/team')\n                                        ? 'text-amber'\n                                        : 'text-white/70 hover:text-white dark:text-slate-600 dark:hover:text-slate-900'"
    )
    content = content.replace(
        "isActive('/blog')\n                                    ? 'text-primary'\n                                    : 'text-muted-foreground hover:text-foreground'",
        "isActive('/blog')\n                                    ? 'text-amber'\n                                    : 'text-white/70 hover:text-white dark:text-slate-600 dark:hover:text-slate-900'"
    )

    # 5. Dropdown Cards backgrounds and borders
    content = content.replace(
        "className='absolute left-0 mt-2 w-72 origin-top-left rounded-lg border border-border bg-card p-2 shadow-lg transition-all opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'",
        "className='absolute left-0 mt-2 w-72 origin-top-left rounded-lg border border-white/10 dark:border-slate-200 bg-[#060e32] dark:bg-white p-2 shadow-lg transition-all opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'"
    )
    content = content.replace(
        "className='absolute right-0 mt-2 w-48 origin-top-right rounded-md border border-border bg-card shadow-lg ring-1 ring-black/5 focus:outline-none'",
        "className='absolute right-0 mt-2 w-48 origin-top-right rounded-md border border-white/10 dark:border-slate-200 bg-[#060e32] dark:bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'"
    )

    # Dropdown Hover highlight items
    content = content.replace(
        "className='block rounded-md p-2 hover:bg-muted/50 transition-colors'",
        "className='block rounded-md p-2 hover:bg-white/5 dark:hover:bg-slate-50 transition-colors'"
    )

    # Dropdown text headers (active vs inactive)
    content = content.replace(
        "className={`text-xs font-bold ${isActive('/oplossingen/vastgoedbeheer-software') ? 'text-primary' : 'text-foreground'}`}",
        "className={`text-xs font-bold ${isActive('/oplossingen/vastgoedbeheer-software') ? 'text-amber' : 'text-white dark:text-slate-800'}`}"
    )
    content = content.replace(
        "className={`text-xs font-bold ${isActive('/oplossingen/huurdersportaal') ? 'text-primary' : 'text-foreground'}`}",
        "className={`text-xs font-bold ${isActive('/oplossingen/huurdersportaal') ? 'text-amber' : 'text-white dark:text-slate-800'}`}"
    )
    content = content.replace(
        "className={`text-xs font-bold ${isActive('/oplossingen/payment') ? 'text-primary' : 'text-foreground'}`}",
        "className={`text-xs font-bold ${isActive('/oplossingen/payment') ? 'text-amber' : 'text-white dark:text-slate-800'}`}"
    )
    content = content.replace(
        "className={`text-xs font-bold ${isActive('/integraties') ? 'text-primary' : 'text-foreground'}`}",
        "className={`text-xs font-bold ${isActive('/integraties') ? 'text-amber' : 'text-white dark:text-slate-800'}`}"
    )
    content = content.replace(
        "className={`text-xs font-bold ${isActive('/kennisbank/box3-check') ? 'text-primary' : 'text-foreground'}`}",
        "className={`text-xs font-bold ${isActive('/kennisbank/box3-check') ? 'text-amber' : 'text-white dark:text-slate-800'}`}"
    )
    content = content.replace(
        "className={`text-xs font-bold ${isActive('/referenties') ? 'text-primary' : 'text-foreground'}`}",
        "className={`text-xs font-bold ${isActive('/referenties') ? 'text-amber' : 'text-white dark:text-slate-800'}`}"
    )
    content = content.replace(
        "className={`text-xs font-bold ${isActive('/team') ? 'text-primary' : 'text-foreground'}`}",
        "className={`text-xs font-bold ${isActive('/team') ? 'text-amber' : 'text-white dark:text-slate-800'}`}"
    )

    # 6. Global Actions elements: Docs link, Language select button, Theme toggle
    content = content.replace(
        "className={`p-2 rounded-md hover:bg-muted transition-all ${\n                                pathname?.startsWith('/docs')\n                                    ? 'text-primary bg-muted/40'\n                                    : 'text-muted-foreground hover:text-foreground'\n                            }`}",
        "className={`p-2 rounded-md hover:bg-white/10 dark:hover:bg-slate-100 transition-all ${\n                                pathname?.startsWith('/docs')\n                                    ? 'text-amber bg-white/10 dark:bg-slate-100'\n                                    : 'text-white/70 hover:text-white dark:text-slate-600 dark:hover:text-slate-900'\n                            }`}"
    )
    content = content.replace(
        "className='p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer'",
        "className='p-2 rounded-md hover:bg-white/10 dark:hover:bg-slate-100 text-white/70 hover:text-white dark:text-slate-600 dark:hover:text-slate-900 transition-all cursor-pointer'"
    )
    content = content.replace(
        "className='flex w-full items-center justify-between px-4 py-2 text-xs hover:bg-muted/50 transition-colors'",
        "className='flex w-full items-center justify-between px-4 py-2 text-xs hover:bg-white/5 dark:hover:bg-slate-50 text-white dark:text-slate-800 transition-colors'"
    )

    # Dropdown Descriptions
    content = content.replace(
        "className='text-[10px] text-muted-foreground'",
        "className='text-[10px] text-white/50 dark:text-slate-500'"
    )

    # 7. Mobile Menu Panel styling (mutually exclusive bg-[#060e32] vs bg-white)
    content = content.replace(
        "className='xl:hidden fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border/10 shadow-2xl'",
        "className='xl:hidden fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#060e32] dark:bg-white px-6 py-6 sm:max-w-sm border-l border-white/10 dark:border-slate-200 shadow-2xl text-white dark:text-slate-800'"
    )
    content = content.replace(
        "className='-m-2.5 rounded-md p-2.5 text-muted-foreground'",
        "className='-m-2.5 rounded-md p-2.5 text-white/70 dark:text-slate-600 hover:bg-white/10 dark:hover:bg-slate-100'"
    )

    # Mobile nav link loops
    content = content.replace(
        "block text-sm font-semibold leading-7 ${isActive('/blog') ? 'text-primary' : 'text-foreground'}",
        "block text-sm font-semibold leading-7 ${isActive('/blog') ? 'text-amber' : 'text-white dark:text-slate-800'}"
    )
    content = content.replace(
        "className={`text-xs font-medium ${isActive('/team') ? 'text-primary' : 'text-muted-foreground'}`}",
        "className={`text-xs font-medium ${isActive('/team') ? 'text-amber' : 'text-white/70 dark:text-slate-500'}`}"
    )

    # Let's search and replace other mobile links programmatically
    content = re.sub(
        r"block w-full text-left px-3 py-2 text-base font-semibold leading-7 rounded-lg hover:bg-muted\s+\${isActive\('([^']+)'\)\s+\?\s+'text-primary'\s+:\s+'text-foreground'}",
        r"block w-full text-left px-3 py-2 text-base font-semibold leading-7 rounded-lg hover:bg-white/15 dark:hover:bg-slate-50 ${isActive('\1') ? 'text-amber' : 'text-white dark:text-slate-800'}",
        content
    )
    content = re.sub(
        r"block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 hover:bg-muted\s+\${isActive\('([^']+)'\)\s+\?\s+'text-primary'\s+:\s+'text-foreground'}",
        r"block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 hover:bg-white/15 dark:hover:bg-slate-50 ${isActive('\1') ? 'text-amber' : 'text-white dark:text-slate-800'}",
        content
    )
    content = re.sub(
        r"className={`text-xs font-medium \${isActive\('([^']+)'\)\s+\?\s+'text-primary'\s+:\s+'text-muted-foreground'}`}",
        r"className={`text-xs font-medium ${isActive('\1') ? 'text-amber' : 'text-white/70 dark:text-slate-500'}`}",
        content
    )
    content = re.sub(
        r"className={`h-4 w-4 transition-transform duration-200 \${mobileSubmenu === '([^']+)' \? 'rotate-180 text-primary' : 'text-muted-foreground'}`}",
        r"className={`h-4 w-4 transition-transform duration-200 ${mobileSubmenu === '\1' ? 'rotate-180 text-amber' : 'text-white/70 dark:text-slate-500'}`}",
        content
    )

    with open(header_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Header successfully updated.")

def update_footer():
    footer_path = 'src/components/Footer.tsx'
    with open(footer_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Footer Container: bg-[#060e32] dark:bg-white, text-white/80 dark:text-slate-600, border-t border-white/10 dark:border-slate-200
    content = content.replace(
        "<footer className='dark w-full bg-[#060e32] text-white border-t border-white/10 pt-16 pb-12 transition-all'>",
        "<footer className='w-full bg-[#060e32] dark:bg-white text-white/80 dark:text-slate-600 border-t border-white/10 dark:border-slate-200 pt-16 pb-12 transition-all'>"
    )

    # 2. Update Image tags inside footer: dark:hidden vs hidden dark:block
    content = content.replace(
        """                        <Link href={getPath('/')} className='inline-flex'>
                            <img
                                src='/emlinked/Emlinked_logo__liggend_white.png'
                                alt='emlinked - Vastgoedbeheer software homepage'
                                className='w-auto h-12 transition-opacity hover:opacity-90'
                            />
                        </Link>""",
        """                        <Link href={getPath('/')} className='inline-flex'>
                            <img
                                src='/emlinked/Emlinked_logo__liggend_white.png'
                                alt='emlinked - Vastgoedbeheer software homepage'
                                className='w-auto h-12 transition-opacity hover:opacity-90 dark:hidden'
                            />
                            <img
                                src='/emlinked/Emlinked_logo__liggend.svg'
                                alt='emlinked - Vastgoedbeheer software homepage'
                                className='w-auto h-12 transition-opacity hover:opacity-90 hidden dark:block'
                            />
                        </Link>"""
    )

    # 3. Heading tags: text-white/90 dark:text-slate-800
    content = content.replace(
        "className='text-xs font-bold uppercase tracking-wider text-white/90 font-mono'",
        "className='text-xs font-bold uppercase tracking-wider text-white/90 dark:text-slate-800 font-mono'"
    )

    # 4. Text blocks: text-white/70 dark:text-slate-500, text-white/60 dark:text-slate-500
    content = content.replace(
        "className='text-xs text-white/70 leading-relaxed'",
        "className='text-xs text-white/70 dark:text-slate-500 leading-relaxed'"
    )
    content = content.replace(
        "className='flex flex-col gap-2 mt-2 text-xs text-white/60'",
        "className='flex flex-col gap-2 mt-2 text-xs text-white/60 dark:text-slate-500'"
    )
    content = content.replace(
        "className='flex flex-col gap-2.5 text-xs text-white/60'",
        "className='flex flex-col gap-2.5 text-xs text-white/60 dark:text-slate-500'"
    )
    content = content.replace(
        "className='h-7 w-7 rounded-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-[#ff9400] hover:text-[#ff9400] transition-colors'",
        "className='h-7 w-7 rounded-md border border-white/20 dark:border-slate-200 flex items-center justify-center text-white/80 dark:text-slate-600 hover:text-white dark:hover:text-slate-800 hover:border-[#ff9400] transition-colors'"
    )

    # 5. Grid border line
    content = content.replace(
        "className='grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 max-w-7xl mx-auto pb-12 border-b border-white/10'",
        "className='grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 max-w-7xl mx-auto pb-12 border-b border-white/10 dark:border-slate-200'"
    )

    # 6. Legal Copyright area
    content = content.replace(
        "className='text-[10px] text-white/40'",
        "className='text-[10px] text-white/40 dark:text-slate-400'"
    )
    content = content.replace(
        "className='flex flex-wrap justify-center gap-4 md:gap-6 text-[10px] text-white/40'",
        "className='flex flex-wrap justify-center gap-4 md:gap-6 text-[10px] text-white/40 dark:text-slate-400'"
    )
    content = content.replace(
        "className='text-white/10'",
        "className='text-white/10 dark:text-slate-200'"
    )

    with open(footer_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Footer successfully updated.")

if __name__ == '__main__':
    update_header()
    update_footer()
