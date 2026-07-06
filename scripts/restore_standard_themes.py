import re

def update_globals_css():
    css_path = 'src/app/globals.css'
    with open(css_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Standard Light Mode variables (White background)
    light_theme_vars = """    --background: 0 0% 100%;
    --foreground: 230 78% 11%;

    /* --primary: 35 100% 50% ; */
    --primary: 14.46, 80.25%, 52.35%;

    --primary-foreground: 0 0% 100%;

    --muted: 215 15% 92%;
    --muted-foreground: 215 15% 40%;

    --border: 215 30% 90%;
    --card: 0 0% 100%;
    --card-foreground: 230 78% 11%;"""

    # Standard Dark Mode variables (Dark Navy background)
    dark_theme_vars = """    --background: 229 79% 11%;
    --foreground: 210 40% 98%;

    --primary: 14.46, 80.25%, 52.35%;
    --primary-foreground: 229 79% 11%;

    --muted: 230 40% 15%;
    --muted-foreground: 215 20% 65%;

    --border: 230 40% 15%;
    --card: 230 78% 10%;
    --card-foreground: 210 40% 98%;"""

    # Replace the blocks inside :root and .dark
    root_pattern = r'(:root\s*\{)([\s\S]*?)(--navy:)'
    content = re.sub(root_pattern, r'\1\n' + light_theme_vars + '\n\n    \\3', content)

    dark_pattern = r'(\.dark\s*\{)([\s\S]*?)(\})'
    content = re.sub(dark_pattern, r'\1\n' + dark_theme_vars + '\n\\3', content)

    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("globals.css theme variables restored to standard.")

def update_header():
    header_path = 'src/components/Header.tsx'
    with open(header_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Restore standard logoSrc conditions: Dark mode -> white logo; Light mode -> dark logo
    content = content.replace(
        "const logoSrc =\n        mounted && theme === 'dark'\n            ? '/emlinked/Emlinked_logo__liggend.svg'\n            : '/emlinked/Emlinked_logo__liggend_white.png';",
        "const logoSrc =\n        mounted && theme === 'dark'\n            ? '/emlinked/Emlinked_logo__liggend_white.png'\n            : '/emlinked/Emlinked_logo__liggend.svg';"
    )

    with open(header_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Header logo config restored.")

def update_footer():
    footer_path = 'src/components/Footer.tsx'
    with open(footer_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Restore footer logo contrast:
    # White logo: shows on dark footer in dark mode -> hidden dark:block
    # Dark logo: shows on white footer in light mode -> dark:hidden
    content = content.replace(
        """                            <img
                                src='/emlinked/Emlinked_logo__liggend_white.png'
                                alt='emlinked - Vastgoedbeheer software homepage'
                                className='w-auto h-12 transition-opacity hover:opacity-90 dark:hidden'
                            />
                            <img
                                src='/emlinked/Emlinked_logo__liggend.svg'
                                alt='emlinked - Vastgoedbeheer software homepage'
                                className='w-auto h-12 transition-opacity hover:opacity-90 hidden dark:block'
                            />""",
        """                            <img
                                src='/emlinked/Emlinked_logo__liggend.svg'
                                alt='emlinked - Vastgoedbeheer software homepage'
                                className='w-auto h-12 transition-opacity hover:opacity-90 dark:hidden'
                            />
                            <img
                                src='/emlinked/Emlinked_logo__liggend_white.png'
                                alt='emlinked - Vastgoedbeheer software homepage'
                                className='w-auto h-12 transition-opacity hover:opacity-90 hidden dark:block'
                            />"""
    )

    with open(footer_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Footer logo config restored.")

def update_homepage():
    page_path = 'src/app/(web)/[locale]/page.tsx'
    with open(page_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Light Mode (default theme, white body bg) -> needs dark blue/black animated gradient Hero
    # Dark Mode (switched theme, dark body bg) -> needs warm cream static gradient Hero
    content = content.replace(
        "className='relative px-6 py-20 md:py-32 overflow-hidden bg-gradient-to-br from-[#FFFBEF] via-[#FFFDF9] to-[#FFF3D4] text-foreground dark:bg-gradient-to-br dark:from-[#030616] dark:via-[#091236] dark:to-[#01020a] dark:animate-hero-gradient dark:text-white border-b border-amber/10 dark:border-white/10 transition-colors duration-300'",
        "className='relative px-6 py-20 md:py-32 overflow-hidden bg-gradient-to-br from-[#030616] via-[#091236] to-[#01020a] animate-hero-gradient text-white dark:bg-gradient-to-br dark:from-[#FFFBEF] dark:via-[#FFFDF9] dark:to-[#FFF3D4] dark:animate-none dark:text-foreground border-b border-white/10 dark:border-amber/10 transition-colors duration-300'"
    )

    # Watermarks: Light Mode (dark Hero) -> high opacity; Dark Mode (light Hero) -> low opacity
    content = content.replace(
        "className='absolute right-[-60px] top-[-60px] w-[520px] h-auto opacity-[0.03] dark:opacity-[0.06] pointer-events-none select-none text-foreground dark:text-white font-display text-[300px] leading-none font-bold'",
        "className='absolute right-[-60px] top-[-60px] w-[520px] h-auto opacity-[0.06] dark:opacity-[0.03] pointer-events-none select-none text-white dark:text-foreground font-display text-[300px] leading-none font-bold'"
    )
    content = content.replace(
        "className='absolute left-[-30px] bottom-[-40px] w-[260px] h-auto opacity-[0.02] dark:opacity-[0.04] pointer-events-none select-none text-amber font-display text-[150px] leading-none font-bold'",
        "className='absolute left-[-30px] bottom-[-40px] w-[260px] h-auto opacity-[0.04] dark:opacity-[0.02] pointer-events-none select-none text-amber font-display text-[150px] leading-none font-bold'"
    )

    # Text headers
    content = content.replace(
        "className='font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground dark:text-white leading-[1.1]'",
        "className='font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white dark:text-foreground leading-[1.1]'"
    )
    content = content.replace(
        "className='text-lg md:text-xl text-muted-foreground dark:text-white/65 leading-relaxed font-light'",
        "className='text-lg md:text-xl text-white/65 dark:text-muted-foreground leading-relaxed font-light'"
    )

    # Secondary CTA button
    content = content.replace(
        "className='inline-flex h-12 items-center justify-center rounded-md border border-border dark:border-white/20 bg-transparent px-6 text-sm font-semibold text-foreground dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all text-center shadow-sm hover:scale-[1.02] active:scale-[0.98] duration-200'",
        "className='inline-flex h-12 items-center justify-center rounded-md border border-white/20 dark:border-border bg-transparent px-6 text-sm font-semibold text-white dark:text-foreground hover:bg-white/10 dark:hover:bg-black/5 transition-all text-center shadow-sm hover:scale-[1.02] active:scale-[0.98] duration-200'"
    )

    # Proof log borders and text
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

    # Metrics Card styling
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

    # Stat line items
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

    # Badge class definitions
    content = content.replace(
        "let badgeClass = 'bg-black/10 text-foreground dark:bg-white/10 dark:text-white/70';\n                                                        if (stat.badgeType === 'good') {\n                                                            badgeClass = 'bg-amber/20 text-amber dark:text-amber-light';\n                                                        } else if (stat.badgeType === 'warn') {\n                                                            badgeClass = 'bg-red-600/20 text-red-600 dark:text-red-300';\n                                                        } else if (stat.badgeType === 'blue') {\n                                                            badgeClass = 'bg-blue-500/20 text-blue-600 dark:text-blue-300';\n                                                        }",
        "let badgeClass = 'bg-white/10 text-white/70 dark:bg-black/10 dark:text-foreground';\n                                                        if (stat.badgeType === 'good') {\n                                                            badgeClass = 'bg-amber/20 text-amber dark:text-amber-light';\n                                                        } else if (stat.badgeType === 'warn') {\n                                                            badgeClass = 'bg-red-600/20 text-red-300 dark:text-red-600';\n                                                        } else if (stat.badgeType === 'blue') {\n                                                            badgeClass = 'bg-blue-500/20 text-blue-300 dark:text-blue-600';\n                                                        }"
    )

    # Sparkline container
    content = content.replace(
        "className='mt-6 rounded-xl border border-border dark:border-white/5 p-4 bg-muted/10 dark:bg-white/[0.01] flex flex-col gap-2'",
        "className='mt-6 rounded-xl border border-white/5 dark:border-border p-4 bg-white/[0.01] dark:bg-muted/10 flex flex-col gap-2'"
    )
    content = content.replace(
        "className='text-[10px] text-muted-foreground uppercase tracking-wider font-semibold'",
        "className='text-[10px] text-white/40 dark:text-muted-foreground uppercase tracking-wider font-semibold'"
    )

    with open(page_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Homepage Hero contrast restored.")

if __name__ == '__main__':
    update_globals_css()
    update_header()
    update_footer()
    update_homepage()
