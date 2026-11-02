**Domain migration (time-sensitive, do before/during DNS cutover)**

- [ ] Keep `.nl` web DNS (A/CNAME) pointed at same Vercel deployment after cutover — only email (MX/SPF/DKIM) stays separate
- [ ] Verify Resend sending-domain SPF/DKIM for whichever domain `MAIL_FROM_EMAIL` uses (`emlinked.com` recommended; set `MAIL_FROM_EMAIL` and `MAIL_TO_EMAIL` in Vercel prod env)
- [x] Add `emlinked.com` (and `www.emlinked.com`) to Sanity CORS allowed origins (`rqeokhhk`)
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://emlinked.com` in Vercel prod env
- [x] Confirm www vs apex decision, make DNS/Vercel/canonical all agree (`https://emlinked.com` apex standardized across `proxy.ts`, `redirects.json`, `seo.ts`, `sitemap.ts`)
- [ ] Run Google Search Console Change of Address tool (verify both properties first)
- [ ] Update GA4 property's configured domain
- [ ] Re-verify GSC ownership if it depended on a `.nl` DNS TXT record

**Code/SEO cleanup (no deadline)**

- [x] Review the 8 routes forced to `dynamic = 'force-dynamic'` — switched all 8 routes (plus `prijzen`, `box3-check`, `partners-software`, `contact`, `[category]`) to ISR (`revalidate = 60`)
- [x] Expand FAQ/short-answer schema beyond the 1 article + 3 solution pages already done (`prijzen`, `box3-check`, `apps`, `partners-software`, `referenties`, `contact`, and evergreen articles in `nieuws/[slug]`)
- [x] Accessibility/ARIA audit — added skip-to-content link, single `<main id="main-content">` landmark, modal dialog ARIA (`role="dialog"`, `aria-modal`, `aria-labelledby`), form `htmlFor`/`id` & `autoComplete`, keyboard-accessible mega-menu (`group-focus-within`), and live-region alerts
- [x] Site-wide heading-hierarchy / internal-linking pass — enforced sequential `h1`→`h2`→`h3` hierarchy across articles/footer/modals, added contextual solution internal links to articles, fixed `/integraties` fallback link, and fixed corrupted EN article slug in Sanity
