import re

def update_globals_css():
    css_path = 'src/app/globals.css'
    with open(css_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Define light and dark HSL variable blocks
    # Light Mode variables (now mapped to #060e32 dark background)
    light_theme_vars = """    --background: 229 79% 11%;
    --foreground: 210 40% 98%;

    /* --primary: 35 100% 50% ; */
    --primary: 14.46, 80.25%, 52.35%;

    --primary-foreground: 229 79% 11%;

    --muted: 230 40% 15%;
    --muted-foreground: 215 20% 65%;

    --border: 230 40% 15%;
    --card: 230 78% 10%;
    --card-foreground: 210 40% 98%;"""

    # Dark Mode variables (now mapped to white background)
    dark_theme_vars = """    --background: 0 0% 100%;
    --foreground: 230 78% 11%;

    --primary: 14.46, 80.25%, 52.35%;
    --primary-foreground: 0 0% 100%;

    --muted: 215 15% 92%;
    --muted-foreground: 215 15% 40%;

    --border: 215 30% 90%;
    --card: 0 0% 100%;
    --card-foreground: 230 78% 11%;"""

    # Replace the blocks inside :root and .dark
    # Find :root { ... } content
    root_pattern = r'(:root\s*\{)([\s\S]*?)(--navy:)'
    content = re.sub(root_pattern, r'\1\n' + light_theme_vars + '\n\n    \\3', content)

    # Find .dark { ... } content
    dark_pattern = r'(\.dark\s*\{)([\s\S]*?)(\})'
    content = re.sub(dark_pattern, r'\1\n' + dark_theme_vars + '\n\\3', content)

    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("globals.css successfully inverted.")

def update_header():
    header_path = 'src/components/Header.tsx'
    with open(header_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Ensure logoSrc uses Emlinked_logo__liggend.svg in Dark mode (white header) and Emlinked_logo__liggend_white.png in Light mode (dark header)
    content = content.replace(
        "const logoSrc =\n        mounted && theme === 'dark'\n            ? '/emlinked/Emlinked_logo__liggend_white.png'\n            : '/emlinked/Emlinked_logo__liggend.svg';",
        "const logoSrc =\n        mounted && theme === 'dark'\n            ? '/emlinked/Emlinked_logo__liggend.svg'\n            : '/emlinked/Emlinked_logo__liggend_white.png';"
    )

    # 2. Revert Header tag to use standard semantic classes (bg-background/95, text-foreground, border-t-4 border-amber, border-b-0)
    content = content.replace(
        "<header className='sticky top-0 z-50 w-full border-t-4 border-amber bg-[#060e32]/95 dark:bg-white/95 backdrop-blur-md transition-all duration-300 shadow-md text-white/80 dark:text-slate-600'>",
        "<header className='sticky top-0 z-50 w-full border-t-4 border-amber bg-background/95 backdrop-blur-md transition-all duration-300 shadow-md text-foreground'>"
    )

    # 3. Mobile Hamburger Trigger: text-foreground, hover:bg-muted
    content = content.replace(
        "text-white/70 dark:text-slate-600 hover:bg-white/10 dark:hover:bg-slate-100 hover:text-white dark:hover:text-slate-900 focus:outline-none cursor-pointer transition-colors",
        "text-foreground hover:bg-muted focus:outline-none cursor-pointer transition-colors"
    )

    # 4. Revert Top Level Navigation Link colors to use standard theme variables
    # (Since background is now light/dark natively, text-foreground and text-muted-foreground will work perfectly)
    content = content.replace(
        "isActive('/oplossingen/vastgoedbeheer-software') ||\n                                    isActive('/oplossingen/huurdersportaal') ||\n                                    isActive('/oplossingen/payment')\n                                        ? 'text-amber'\n                                        : 'text-white/70 hover:text-white dark:text-slate-600 dark:hover:text-slate-900'",
        "isActive('/oplossingen/vastgoedbeheer-software') ||\n                                    isActive('/oplossingen/huurdersportaal') ||\n                                    isActive('/oplossingen/payment')\n                                        ? 'text-amber'\n                                        : 'text-muted-foreground hover:text-foreground'"
    )
    content = content.replace(
        "isActive('/integraties') ||\n                                    isActive('/kennisbank/box3-check')\n                                        ? 'text-amber'\n                                        : 'text-white/70 hover:text-white dark:text-slate-600 dark:hover:text-slate-900'",
        "isActive('/integraties') ||\n                                    isActive('/kennisbank/box3-check')\n                                        ? 'text-amber'\n                                        : 'text-muted-foreground hover:text-foreground'"
    )
    content = content.replace(
        "isActive('/referenties')\n                                        ? 'text-amber'\n                                        : 'text-white/70 hover:text-white dark:text-slate-600 dark:hover:text-slate-900'",
        "isActive('/referenties')\n                                        ? 'text-amber'\n                                        : 'text-muted-foreground hover:text-foreground'"
    )
    content = content.replace(
        "isActive('/prijzen')\n                                    ? 'text-amber'\n                                    : 'text-white/70 hover:text-white dark:text-slate-600 dark:hover:text-slate-900'",
        "isActive('/prijzen')\n                                    ? 'text-amber'\n                                    : 'text-muted-foreground hover:text-foreground'"
    )
    content = content.replace(
        "isActive('/team')\n                                        ? 'text-amber'\n                                        : 'text-white/70 hover:text-white dark:text-slate-600 dark:hover:text-slate-900'",
        "isActive('/team')\n                                        ? 'text-amber'\n                                        : 'text-muted-foreground hover:text-foreground'"
    )
    content = content.replace(
        "isActive('/blog')\n                                    ? 'text-amber'\n                                    : 'text-white/70 hover:text-white dark:text-slate-600 dark:hover:text-slate-900'",
        "isActive('/blog')\n                                    ? 'text-amber'\n                                    : 'text-muted-foreground hover:text-foreground'"
    )

    # 5. Dropdown Cards: bg-card, border-border
    content = content.replace(
        "className='absolute left-0 mt-2 w-72 origin-top-left rounded-lg border border-white/10 dark:border-slate-200 bg-[#060e32] dark:bg-white p-2 shadow-lg transition-all opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'",
        "className='absolute left-0 mt-2 w-72 origin-top-left rounded-lg border border-border bg-card p-2 shadow-lg transition-all opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'"
    )
    content = content.replace(
        "className='absolute right-0 mt-2 w-48 origin-top-right rounded-md border border-white/10 dark:border-slate-200 bg-[#060e32] dark:bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'",
        "className='absolute right-0 mt-2 w-48 origin-top-right rounded-md border border-border bg-card shadow-lg ring-1 ring-black/5 focus:outline-none'"
    )

    # Dropdown Hover highlight items: hover:bg-muted
    content = content.replace(
        "className='block rounded-md p-2 hover:bg-white/5 dark:hover:bg-slate-50 transition-colors'",
        "className='block rounded-md p-2 hover:bg-muted/50 transition-colors'"
    )

    # Dropdown text headers: text-foreground
    content = content.replace(
        "className={`text-xs font-bold ${isActive('/oplossingen/vastgoedbeheer-software') ? 'text-amber' : 'text-white dark:text-slate-800'}`}",
        "className={`text-xs font-bold ${isActive('/oplossingen/vastgoedbeheer-software') ? 'text-amber' : 'text-foreground'}`}"
    )
    content = content.replace(
        "className={`text-xs font-bold ${isActive('/oplossingen/huurdersportaal') ? 'text-amber' : 'text-white dark:text-slate-800'}`}",
        "className={`text-xs font-bold ${isActive('/oplossingen/huurdersportaal') ? 'text-amber' : 'text-foreground'}`}"
    )
    content = content.replace(
        "className={`text-xs font-bold ${isActive('/oplossingen/payment') ? 'text-amber' : 'text-white dark:text-slate-800'}`}",
        "className={`text-xs font-bold ${isActive('/oplossingen/payment') ? 'text-amber' : 'text-foreground'}`}"
    )
    content = content.replace(
        "className={`text-xs font-bold ${isActive('/integraties') ? 'text-amber' : 'text-white dark:text-slate-800'}`}",
        "className={`text-xs font-bold ${isActive('/integraties') ? 'text-amber' : 'text-foreground'}`}"
    )
    content = content.replace(
        "className={`text-xs font-bold ${isActive('/kennisbank/box3-check') ? 'text-amber' : 'text-white dark:text-slate-800'}`}",
        "className={`text-xs font-bold ${isActive('/kennisbank/box3-check') ? 'text-amber' : 'text-foreground'}`}"
    )
    content = content.replace(
        "className={`text-xs font-bold ${isActive('/referenties') ? 'text-amber' : 'text-white dark:text-slate-800'}`}",
        "className={`text-xs font-bold ${isActive('/referenties') ? 'text-amber' : 'text-foreground'}`}"
    )
    content = content.replace(
        "className={`text-xs font-bold ${isActive('/team') ? 'text-amber' : 'text-white dark:text-slate-800'}`}",
        "className={`text-xs font-bold ${isActive('/team') ? 'text-amber' : 'text-foreground'}`}"
    )

    # Global Actions: Docs button, Language selector, Theme toggle
    content = content.replace(
        "className={`p-2 rounded-md hover:bg-white/10 dark:hover:bg-slate-100 transition-all ${\n                                pathname?.startsWith('/docs')\n                                    ? 'text-amber bg-white/10 dark:bg-slate-100'\n                                    : 'text-white/70 hover:text-white dark:text-slate-600 dark:hover:text-slate-900'\n                            }`}",
        "className={`p-2 rounded-md hover:bg-muted transition-all ${\n                                pathname?.startsWith('/docs')\n                                    ? 'text-amber bg-muted/40'\n                                    : 'text-muted-foreground hover:text-foreground'\n                            }`}"
    )
    content = content.replace(
        "className='p-2 rounded-md hover:bg-white/10 dark:hover:bg-slate-100 text-white/70 hover:text-white dark:text-slate-600 dark:hover:text-slate-900 transition-all cursor-pointer'",
        "className='p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer'"
    )
    content = content.replace(
        "className='flex w-full items-center justify-between px-3 py-2 text-xs font-semibold rounded-md text-white/70 dark:text-slate-600 hover:bg-white/10 dark:hover:bg-slate-100 hover:text-white dark:hover:text-slate-900 transition-all'",
        "className='flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-all'"
    )
    content = content.replace(
        "className='flex w-full items-center justify-between px-4 py-2 text-xs hover:bg-white/5 dark:hover:bg-slate-50 text-white dark:text-slate-800 transition-colors'",
        "className='flex w-full items-center justify-between px-4 py-2 text-xs hover:bg-muted/55 text-muted-foreground hover:text-foreground transition-colors'"
    )

    # Dropdown Descriptions
    content = content.replace(
        "className='text-[10px] text-white/50 dark:text-slate-500'",
        "className='text-[10px] text-muted-foreground'"
    )

    # 6. Mobile Menu Panel
    content = content.replace(
        "className='xl:hidden fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#060e32] dark:bg-white px-6 py-6 sm:max-w-sm border-l border-white/10 dark:border-slate-200 shadow-2xl text-white dark:text-slate-800'",
        "className='xl:hidden fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border/10 shadow-2xl'"
    )
    content = content.replace(
        "className='-m-2.5 rounded-md p-2.5 text-white/70 dark:text-slate-600 hover:bg-white/10 dark:hover:bg-slate-100'",
        "className='-m-2.5 rounded-md p-2.5 text-muted-foreground hover:bg-muted hover:text-foreground'"
    )

    # Mobile menu links
    content = content.replace(
        "block text-sm font-semibold leading-7 ${isActive('/blog') ? 'text-amber' : 'text-white dark:text-slate-800'}",
        "block text-sm font-semibold leading-7 ${isActive('/blog') ? 'text-amber' : 'text-foreground'}"
    )
    content = content.replace(
        "className={`text-xs font-medium ${isActive('/team') ? 'text-amber' : 'text-white/70 dark:text-slate-500'}`}",
        "className={`text-xs font-medium ${isActive('/team') ? 'text-amber' : 'text-muted-foreground'}`}"
    )

    # Custom regex overrides
    content = re.sub(
        r"block w-full text-left px-3 py-2 text-base font-semibold leading-7 rounded-lg hover:bg-white/15 dark:hover:bg-slate-55\s+\${isActive\('([^']+)'\)\s+\?\s+'text-amber'\s+:\s+'text-white dark:text-slate-800'}",
        r"block w-full text-left px-3 py-2 text-base font-semibold leading-7 rounded-lg hover:bg-muted ${isActive('\1') ? 'text-amber' : 'text-foreground'}",
        content
    )
    content = re.sub(
        r"block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 hover:bg-white/15 dark:hover:bg-slate-55\s+\${isActive\('([^']+)'\)\s+\?\s+'text-amber'\s+:\s+'text-white dark:text-slate-800'}",
        r"block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 hover:bg-muted ${isActive('\1') ? 'text-amber' : 'text-foreground'}",
        content
    )
    content = re.sub(
        r"className={`text-xs font-medium \${isActive\('([^']+)'\)\s+\?\s+'text-amber'\s+:\s+'text-white/70 dark:text-slate-55'}`}",
        r"className={`text-xs font-medium ${isActive('\1') ? 'text-amber' : 'text-muted-foreground'}`}",
        content
    )
    content = re.sub(
        r"className={`h-4 w-4 transition-transform duration-200 \${mobileSubmenu === '([^']+)' \? 'rotate-180 text-amber' : 'text-white/70 dark:text-slate-55'}`}",
        r"className={`h-4 w-4 transition-transform duration-200 ${mobileSubmenu === '\1' ? 'rotate-180 text-amber' : 'text-muted-foreground'}`}",
        content
    )

    with open(header_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Header successfully restored to semantic variables.")

def update_footer():
    footer_path = 'src/components/Footer.tsx'
    with open(footer_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Revert Footer to use standard variables
    content = content.replace(
        "<footer className='dark w-full bg-[#060e32] text-white border-t border-white/10 pt-16 pb-12 transition-all'>",
        "<footer className='w-full bg-background text-foreground border-t border-border pt-16 pb-12 transition-all'>"
    )
    content = content.replace(
        "<footer className='w-full bg-[#060e32] dark:bg-white text-white/80 dark:text-slate-600 border-t border-white/10 dark:border-slate-200 pt-16 pb-12 transition-all'>",
        "<footer className='w-full bg-background text-foreground border-t border-border pt-16 pb-12 transition-all'>"
    )

    # Heading tags
    content = content.replace(
        "className='text-xs font-bold uppercase tracking-wider text-white/90 dark:text-slate-800 font-mono'",
        "className='text-xs font-bold uppercase tracking-wider text-foreground font-mono'"
    )
    content = content.replace(
        "className='text-xs font-bold uppercase tracking-wider text-white/90 font-mono'",
        "className='text-xs font-bold uppercase tracking-wider text-foreground font-mono'"
    )

    # Text blocks
    content = content.replace(
        "className='text-xs text-white/70 dark:text-slate-500 leading-relaxed'",
        "className='text-xs text-muted-foreground leading-relaxed'"
    )
    content = content.replace(
        "className='text-xs text-white/70 leading-relaxed'",
        "className='text-xs text-muted-foreground leading-relaxed'"
    )
    content = content.replace(
        "className='flex flex-col gap-2 mt-2 text-xs text-white/60 dark:text-slate-500'",
        "className='flex flex-col gap-2 mt-2 text-xs text-muted-foreground'"
    )
    content = content.replace(
        "className='flex flex-col gap-2 mt-2 text-xs text-white/60'",
        "className='flex flex-col gap-2 mt-2 text-xs text-muted-foreground'"
    )
    content = content.replace(
        "className='flex flex-col gap-2.5 text-xs text-white/60 dark:text-slate-500'",
        "className='flex flex-col gap-2.5 text-xs text-muted-foreground'"
    )
    content = content.replace(
        "className='flex flex-col gap-2.5 text-xs text-white/60'",
        "className='flex flex-col gap-2.5 text-xs text-muted-foreground'"
    )

    # Social icons border
    content = content.replace(
        "className='h-7 w-7 rounded-md border border-white/20 dark:border-slate-200 flex items-center justify-center text-white/80 dark:text-slate-600 hover:text-white dark:hover:text-slate-800 hover:border-[#ff9400] transition-colors'",
        "className='h-7 w-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[#ff9400] transition-colors'"
    )
    content = content.replace(
        "className='h-7 w-7 rounded-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-[#ff9400] hover:text-[#ff9400] transition-colors'",
        "className='h-7 w-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[#ff9400] transition-colors'"
    )

    # Grid border line
    content = content.replace(
        "className='grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 max-w-7xl mx-auto pb-12 border-b border-white/10 dark:border-slate-200'",
        "className='grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 max-w-7xl mx-auto pb-12 border-b border-border'"
    )
    content = content.replace(
        "className='grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 max-w-7xl mx-auto pb-12 border-b border-white/10'",
        "className='grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 max-w-7xl mx-auto pb-12 border-b border-border'"
    )

    # Legal Copyright area
    content = content.replace(
        "className='text-[10px] text-white/40 dark:text-slate-400'",
        "className='text-[10px] text-muted-foreground'"
    )
    content = content.replace(
        "className='text-[10px] text-white/40'",
        "className='text-[10px] text-muted-foreground'"
    )
    content = content.replace(
        "className='flex flex-wrap justify-center gap-4 md:gap-6 text-[10px] text-white/40 dark:text-slate-400'",
        "className='flex flex-wrap justify-center gap-4 md:gap-6 text-[10px] text-muted-foreground'"
    )
    content = content.replace(
        "className='flex flex-wrap justify-center gap-4 md:gap-6 text-[10px] text-white/40'",
        "className='flex flex-wrap justify-center gap-4 md:gap-6 text-[10px] text-muted-foreground'"
    )
    content = content.replace(
        "className='text-white/10'",
        "className='text-white/10 dark:text-border'"
    )

    with open(footer_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Footer successfully restored to semantic variables.")

def update_homepage():
    # In page.tsx: Swap Hero classes to match the flipped theme:
    # Light Mode (dark body background) -> needs bg-navy (dark) background
    # Dark Mode (white body background) -> needs bg-amber-ultra (light) background
    page_path = 'src/app/(web)/[locale]/page.tsx'
    with open(page_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Locate and replace Hero class definitions
    content = content.replace(
        "className='relative px-6 py-20 md:py-32 overflow-hidden bg-amber-ultra text-foreground dark:bg-navy dark:text-white border-b border-amber/10 dark:border-white/10 transition-colors duration-300'",
        "className='relative px-6 py-20 md:py-32 overflow-hidden bg-navy text-white dark:bg-amber-ultra dark:text-foreground border-b border-white/10 dark:border-amber/10 transition-colors duration-300'"
    )

    # Let's also swap watermark opacities in page.tsx:
    # Light Mode (navy bg) -> opacity-[0.03]/[0.02] is too low on dark background, needs [0.06]/[0.04]!
    # Dark Mode (white bg) -> needs [0.03]/[0.02]!
    content = content.replace(
        "className='absolute right-[-60px] top-[-60px] w-[520px] h-auto opacity-[0.03] dark:opacity-[0.06] pointer-events-none select-none text-foreground dark:text-white font-display text-[300px] leading-none font-bold'",
        "className='absolute right-[-60px] top-[-60px] w-[520px] h-auto opacity-[0.06] dark:opacity-[0.03] pointer-events-none select-none text-white dark:text-foreground font-display text-[300px] leading-none font-bold'"
    )
    content = content.replace(
        "className='absolute left-[-30px] bottom-[-40px] w-[260px] h-auto opacity-[0.02] dark:opacity-[0.04] pointer-events-none select-none text-amber font-display text-[150px] leading-none font-bold'",
        "className='absolute left-[-30px] bottom-[-40px] w-[260px] h-auto opacity-[0.04] dark:opacity-[0.02] pointer-events-none select-none text-amber font-display text-[150px] leading-none font-bold'"
    )

    # Swap title and subtitle text color priorities in page.tsx
    content = content.replace(
        "className='font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground dark:text-white leading-[1.1]'",
        "className='font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white dark:text-foreground leading-[1.1]'"
    )
    content = content.replace(
        "className='text-lg md:text-xl text-muted-foreground dark:text-white/65 leading-relaxed font-light'",
        "className='text-lg md:text-xl text-white/65 dark:text-muted-foreground leading-relaxed font-light'"
    )

    # Swap secondary CTA button colors
    content = content.replace(
        "className='inline-flex h-12 items-center justify-center rounded-md border border-border dark:border-white/20 bg-transparent px-6 text-sm font-semibold text-foreground dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all text-center shadow-sm hover:scale-[1.02] active:scale-[0.98] duration-200'",
        "className='inline-flex h-12 items-center justify-center rounded-md border border-white/20 dark:border-border bg-transparent px-6 text-sm font-semibold text-white dark:text-foreground hover:bg-white/10 dark:hover:bg-black/5 transition-all text-center shadow-sm hover:scale-[1.02] active:scale-[0.98] duration-200'"
    )

    # Swap proof line borders and colors
    content = content.replace(
        "className='flex items-center gap-4 pt-6 border-t border-border dark:border-white/10 mt-2'",
        "className='flex items-center gap-4 pt-6 border-t border-white/10 dark:border-border mt-2'"
    )
    content = content.replace(
        "className='w-8 h-8 rounded-full border-2 border-background dark:border-navy bg-amber flex items-center justify-center text-[10px] font-bold text-navy'",
        "className='w-8 h-8 rounded-full border-2 border-navy dark:border-background bg-amber flex items-center justify-center text-[10px] font-bold text-navy'"
    )
    content = content.replace(
        "className='w-8 h-8 rounded-full border-2 border-background dark:border-navy bg-navy-mid flex items-center justify-center text-[10px] font-bold text-amber'",
        "className='w-8 h-8 rounded-full border-2 border-navy dark:border-background bg-navy-mid flex items-center justify-center text-[10px] font-bold text-amber'"
    )
    content = content.replace(
        "className='w-8 h-8 rounded-full border-2 border-background dark:border-navy bg-amber-light flex items-center justify-center text-[10px] font-bold text-navy'",
        "className='w-8 h-8 rounded-full border-2 border-navy dark:border-background bg-amber-light flex items-center justify-center text-[10px] font-bold text-navy'"
    )
    content = content.replace(
        "className='text-xs text-muted-foreground dark:text-white/55 font-light'",
        "className='text-xs text-white/55 dark:text-muted-foreground font-light'"
    )

    # Swap Metrics Card styles in page.tsx
    content = content.replace(
        "className='bg-card dark:bg-white/[0.03] border border-border dark:border-white/10 rounded-2xl p-7 backdrop-blur-md relative overflow-hidden shadow-xl dark:shadow-2xl hover:shadow-2xl dark:hover:border-white/20 transition-all duration-300'",
        "className='bg-white/[0.03] dark:bg-card border border-white/10 dark:border-border rounded-2xl p-7 backdrop-blur-md relative overflow-hidden shadow-2xl dark:shadow-xl hover:shadow-2xl dark:hover:border-border/80 transition-all duration-300'"
    )
    content = content.replace(
        "className='absolute right-[-20px] top-[-20px] w-28 h-28 opacity-[0.02] dark:opacity-[0.03] pointer-events-none select-none text-foreground dark:text-white font-bold text-8xl'",
        "className='absolute right-[-20px] top-[-20px] w-28 h-28 opacity-[0.03] dark:opacity-[0.02] pointer-events-none select-none text-white dark:text-foreground font-bold text-8xl'"
    )
    content = content.replace(
        "className='text-xs font-semibold text-muted-foreground dark:text-white/40 uppercase tracking-widest'",
        "className='text-xs font-semibold text-white/40 dark:text-muted-foreground uppercase tracking-widest'"
    )
    
    # Stat text lines
    content = content.replace(
        "className='flex justify-between items-center py-3 border-b border-border dark:border-white/5 last:border-b-0'",
        "className='flex justify-between items-center py-3 border-b border-white/5 dark:border-border last:border-b-0'"
    )
    content = content.replace(
        "className='text-sm text-muted-foreground dark:text-white/50'",
        "className='text-sm text-white/50 dark:text-muted-foreground'"
    )
    content = content.replace(
        "className='text-sm font-medium text-foreground dark:text-white'",
        "className='text-sm font-medium text-white dark:text-foreground'"
    )

    # Badge styles
    content = content.replace(
        "let badgeClass = 'bg-black/10 text-foreground dark:bg-white/10 dark:text-white/70';\n                                                        if (stat.badgeType === 'good') {\n                                                            badgeClass = 'bg-amber/20 text-amber dark:text-amber-light';\n                                                        } else if (stat.badgeType === 'warn') {\n                                                            badgeClass = 'bg-red-600/20 text-red-600 dark:text-red-300';\n                                                        } else if (stat.badgeType === 'blue') {\n                                                            badgeClass = 'bg-blue-500/20 text-blue-600 dark:text-blue-300';\n                                                        }",
        "let badgeClass = 'bg-white/10 text-white/70 dark:bg-black/10 dark:text-foreground';\n                                                        if (stat.badgeType === 'good') {\n                                                            badgeClass = 'bg-amber/20 text-amber-light dark:text-amber';\n                                                        } else if (stat.badgeType === 'warn') {\n                                                            badgeClass = 'bg-red-600/20 text-red-300 dark:text-red-600';\n                                                        } else if (stat.badgeType === 'blue') {\n                                                            badgeClass = 'bg-blue-500/20 text-blue-300 dark:text-blue-600';\n                                                        }"
    )

    # Skeleton graph container
    content = content.replace(
        "className='mt-6 rounded-xl border border-border dark:border-white/5 p-4 bg-muted/20 dark:bg-white/[0.01] flex flex-col gap-3'",
        "className='mt-6 rounded-xl border border-white/5 dark:border-border p-4 bg-white/[0.01] dark:bg-muted/20 flex flex-col gap-3'"
    )
    content = content.replace(
        "className='mt-6 rounded-xl border border-border dark:border-white/5 p-4 bg-muted/10 dark:bg-white/[0.01] flex flex-col gap-2'",
        "className='mt-6 rounded-xl border border-white/5 dark:border-border p-4 bg-white/[0.01] dark:bg-muted/10 flex flex-col gap-2'"
    )

    with open(page_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Homepage Hero elements successfully swapped.")

if __name__ == '__main__':
    update_globals_css()
    update_header()
    update_footer()
    update_homepage()
