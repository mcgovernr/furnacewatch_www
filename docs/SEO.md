# FurnaceWatch www — SEO Strategy

**Date:** 2026-08-31 · **Constraint:** free-only (no paid tools, no ads)
**Reality check:** SEO for a niche B2B product is won with content that answers what
HVAC contractors and techs actually search, on a technically clean site. There are no
tricks; there is matching real queries and compounding over months. Everything below is
either done, in the repo, or a checklist item for the founder.

---

## 1. Keyword map (page ↔ target queries)

| Page | Primary keyword | Secondary |
|---|---|---|
| `/` | furnace monitoring for HVAC contractors | remote furnace diagnostics |
| `/how-it-works` | how furnace monitoring works | furnace monitoring system |
| `/what-it-catches` | furnace failure modes | flame sensor lockout, furnace short cycling |
| `/for-service-companies` | HVAC maintenance agreements | reduce HVAC callbacks, HVAC customer retention |
| `/pricing` | furnace monitoring pricing / cost | — |
| Blog: sequence post | gas furnace sequence of operation | furnace sequence troubleshooting |
| Blog: agreements post | sell HVAC maintenance agreements | maintenance agreement renewal |

Notes:
- "Furnace monitoring" over "remote furnace diagnostics" in titles — plainer, higher
  search volume, same meaning.
- **Do not chase homeowner keywords** ("why is my furnace short cycling", "furnace won't
  ignite"). They have volume but attract the wrong visitor for this site. Tech-intent and
  owner-intent queries only. Homeowner keywords belong to the future consumer site.
- Every keyword promise must survive the claims policy (BRAND_COPY §3). Rankings on a
  page that overclaims are a liability, not an asset.

## 2. Technical SEO — implemented 2026-08-31

- [x] Unique, keyword-bearing `<title>` (≤60 chars) + meta description (≤160) per page
- [x] Fixed doubled homepage title ("… — FurnaceWatch — FurnaceWatch")
- [x] JSON-LD: Organization + WebSite `@graph` on every page; logo.svg now actually exists
- [x] FAQPage structured data on `/pricing` (mirrors the visible FAQ)
- [x] Apex `furnacewatch.io` → `www` **301** via the CloudFront function
  (`furnacewatch-dev-www-uri-rewrite` — also does the pretty-URL rewrite; one function
  per behavior, so both live in the same handler). Kills the duplicate-content split.
- [x] Already in place from earlier phases: sitemap + robots.txt, canonical tags, OG/Twitter
  meta + real OG image, redirect stubs with canonical + noindex, self-hosted fonts,
  static HTML (fast), one `h1` per page, LF/AA/mobile hygiene.

## 3. Founder checklist — free, but needs your accounts (~30 min)

1. **Google Search Console** (the single highest-value item):
   search.google.com/search-console → Add property → *Domain* `furnacewatch.io` →
   verify via DNS TXT record in Route53 (paste the token Google gives you; I can add
   the record if you hand me the token) → Sitemaps → submit
   `https://www.furnacewatch.io/sitemap-index.xml`. Then check **Performance → Queries**
   monthly — it shows the real search terms you appear for; feed those back into content.
2. **Bing Webmaster Tools**: bing.com/webmasters → "Import from Google Search Console"
   (one click after #1). Bing also feeds DuckDuckGo and AI answer engines.
3. **LinkedIn company page**: publish each blog post there; it's the one social channel
   where HVAC owners are reachable for free.
4. **Google Business Profile** — once there's a real business address; helps branded
   search and local trust signals.
5. **Communities, as a person**: r/HVAC, HVAC-Talk, contractor Facebook groups. Answer
   sequence-of-operation and no-heat questions genuinely; link only when it's the honest
   answer. This is where early backlinks come from at $0.

## 4. Content calendar (the compounding lever)

Published:
1. ✅ Gas Furnace Sequence of Operation — From the Outside *(tech traffic magnet)*
2. ✅ How to Sell a Monitored Maintenance Agreement *(owner intent)*

Next (one per 2–4 weeks; consistency beats volume):
3. "Furnace short cycling: what it means on a service desk" — *furnace short cycling*
4. "No-heat call triage before the truck rolls" — *no heat call, furnace troubleshooting dispatch*
5. "What a furnace lockout is — and what to do about a repeat offender" — *furnace lockout*
6. "What our design partners taught us after one heating season" — real proof, when real
7. The install guide as `/install` (docs collection returns with its first page in the
   same commit — see www-workflow skill for why)

Rules for every post: target ONE query in the title, answer it fully and honestly,
tie to the product only at the end, pass `npm run lint`, internal-link to 2–3 site pages.

## 5. Measuring (free)

- Search Console queries/impressions (after #1 above) — the ground truth.
- Plausible (`PUBLIC_PLAUSIBLE_DOMAIN`) for on-site behavior once the account exists.
- Expect nothing for 4–8 weeks; niche B2B SEO compounds on a quarter timescale.
