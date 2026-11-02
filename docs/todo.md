**Domain migration (time-sensitive, do before/during DNS cutover)**

- [ ] Keep `.nl` web DNS (A/CNAME) pointed at same Vercel deployment after cutover — only email (MX/SPF/DKIM) stays separate
- [ ] Verify Resend sending-domain SPF/DKIM for whichever domain `MAIL_FROM_EMAIL` uses
- [ ] Add `emlinked.com` to Sanity CORS allowed origins
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://emlinked.com` in Vercel prod env
- [ ] Confirm www vs apex decision, make DNS/Vercel/canonical all agree
- [ ] Run Google Search Console Change of Address tool (verify both properties first)
- [ ] Update GA4 property's configured domain
- [ ] Re-verify GSC ownership if it depended on a `.nl` DNS TXT record

**Code/SEO cleanup (no deadline)**

- [ ] Review the 8 routes forced to `dynamic = 'force-dynamic'` — any that could use `revalidate` instead
- [ ] Expand FAQ/short-answer schema beyond the 1 article + 3 solution pages already done
- [ ] Accessibility/ARIA audit — not started
- [ ] Site-wide heading-hierarchy / internal-linking pass — only spot-checked so far
