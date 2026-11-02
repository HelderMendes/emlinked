**Domain migration (time-sensitive, do before/during DNS cutover)**

- [ ] Diff full old `.nl` URL list against `redirects.json` — currently only 18 news URLs mapped, everything else risks 301-to-404
- [ ] Keep `.nl` web DNS (A/CNAME) pointed at same Vercel deployment after cutover — only email (MX/SPF/DKIM) stays separate
- [ ] Add `emlinked.com` to reCAPTCHA site-key allowed domains
- [ ] Verify Resend sending-domain SPF/DKIM for whichever domain `MAIL_FROM_EMAIL` uses
- [ ] Add `emlinked.com` to Sanity CORS allowed origins
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://emlinked.com` in Vercel prod env
- [ ] Confirm www vs apex decision, make DNS/Vercel/canonical all agree
- [ ] Run Google Search Console Change of Address tool (verify both properties first)
- [ ] Update GA4 property's configured domain
- [ ] Re-verify GSC ownership if it depended on a `.nl` DNS TXT record

**Code/SEO cleanup (no deadline)**

- [ ] Add `loading.tsx` / `error.tsx` / `not-found.tsx` (none exist anywhere)
- [ ] Review the 8 routes forced to `dynamic = 'force-dynamic'` — any that could use `revalidate` instead
- [ ] Expand FAQ/short-answer schema beyond the 1 article + 3 solution pages already done
- [ ] Accessibility/ARIA audit — not started
- [ ] Site-wide heading-hierarchy / internal-linking pass — only spot-checked so far

**Pending from this session**

- [x] Publish 3 drafts: homepage EN slug fix, `box3-test` noIndex, `test` noIndex — confirmed live, sitemap clean
- [ ] Decide fate of `page-referenties-nl` draft and the stray `author` draft (not touched, unknown edits)
- [ ] Delete orphaned `features[]` array on the 2 strippenkaarten blocks (offered earlier, not done)
