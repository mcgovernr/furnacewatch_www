# FurnaceWatch Marketing Site — Redesign Plan

**Document**: `docs/REDESIGN_PLAN.md`
**Project**: `furnacewatch_www` — `www.furnacewatch.io`
**Date**: 2026-08-29
**Status**: Proposal — supersedes the dual-audience direction in `BRAND_COPY.md` §5–6 and the Phase 2B/2C page specs in `BUILD_PLAN.md`
**Decision recorded**: The site targets **HVAC service companies only**. Homeowners get a separate site later.

---

## 0. TL;DR

1. **The live site is the local build.** Every page at www.furnacewatch.io is byte-identical to `dist/` (built 2026-06-03). Nothing substantive is unpublished. The local folder is *not* a git clone, the deploy pipeline (Phase 3) was never built, and the site was uploaded by hand.
2. **Three problems, in order of damage:**
   - **Trust.** The site makes claims the product cannot back today — "patented", "94% accuracy", "99.9% uptime SLA", "<2s alerts", "6× faster", email/SMS alerts, a fleet map, a 15-minute no-tech install, QR Wi-Fi setup, ships-in-2-days, a 30-day pilot — plus three fabricated testimonials, five fabricated customer logos, and fabricated outcome stats (3.2×, 91%). The first buyers are HVAC operators who will ask for references. This is the most expensive problem on the site.
   - **Conversion.** The demo form posts to `action="#"` (no Formspree ID). Every "Request Demo" click on the site ends in nothing. There is no analytics, so nobody would know.
   - **Design.** Two clashing themes (light home, dark everything else, white header on both), invisible text on four pages, developer placeholder notes visible to the public, three empty pages in the nav, no favicon/OG image/robots.txt, and a mojibake arrow in the hero.
3. **The fix is a rebuild, not a patch.** Keep Astro + Tailwind + the charcoal/ember tokens (they're good). Replace the messaging, the information architecture, the page set, and every component. Five phases below; Phase 0 (stop the bleeding) is a one-day job and should ship this week.

---

## 1. Audit

### 1.1 Local repo vs. live site (cross-reference)

| Page | Live | Local `dist/` | Verdict |
|---|---|---|---|
| `/` | 64,294 B | 64,294 B | identical |
| `/features/` | 16,110 B | 16,110 B | identical |
| `/pricing/` | 26,287 B | 26,287 B | identical |
| `/customers/` | 16,643 B | 16,643 B | identical |
| `/about/` | 20,533 B | 20,533 B | identical |
| `/contact/` | 19,621 B | 19,621 B | identical |
| `/blog/`, `/blog/introducing-furnacewatch/` | — | — | identical |
| `/docs/` | 14,930 B | 14,930 B | identical |
| `/login/` | 8,630 B | 8,630 B | identical |

Sitemap lists 10 URLs; all match. Source files touched on 2026-07-20 (`index.astro`, `global.css`, `Footer.astro`, `customers.astro`, `BaseLayout.astro`) contain nothing that isn't already in the deployed build — every distinguishing string is present in `dist/index.html`.

**Broken on the live site (verified with HTTP requests):**

| URL | Result | Cause |
|---|---|---|
| `/favicon.svg`, `/apple-touch-icon.png`, `/site.webmanifest` | 404 | no `public/` directory exists |
| `/images/og-default.png`, `/images/logo.svg` | 404 | same — every social share of the site shows a broken image |
| `/robots.txt` | 404 | same |
| `/legal/privacy/`, `/legal/terms/` | 404 | linked from the footer on every page; never written |
| `/docs/api/` | 404 | linked from the footer ("API Reference") |
| `https://status.furnacewatch.io` | DNS does not resolve | linked from the footer ("System Status") |
| `https://furnacewatch.io/` (apex) | 200, no redirect | should 301 to `www` (duplicate content) |
| `/contact/` form | `<form action="#">` | `FORMSPREE_FORM_ID` never set — **the demo form does nothing** |
| Analytics | none | `PUBLIC_PLAUSIBLE_DOMAIN` never set |
| `app.furnacewatch.io/login` | 200 | works |

**Repo state:**
- `c:\furnacewatch_www` has no `.git`. `github.com/mcgovernr/furnacewatch_www` exists (HTTP 200). Reconcile before any work starts.
- No `.github/workflows/` — BUILD_PLAN Phase 3 (CI/CD) never started.
- `BUILD_PLAN.md` says Tailwind 4; `package.json` is Tailwind 3.4. `astro.config.mjs` emits `assets/` not `_astro/`. Docs drift.
- Latent build bug: `.badge-success` uses `bg-success/12` inside a component `@apply` on a flat hex colour — compiles only because the class is purged (documented in `.design-sync/NOTES.md`).
- `src/pages/index.astro` starts with a BOM and contains a double-encoded arrow (`Alert â†' Mike D.`) that renders as mojibake in the hero.

### 1.2 Claims vs. product truth

Cross-checked against `furnacewatch_repo` (hardware notes, FMEA, ML evals, patent folder, business case) and `furnacewatch_app_repo` (portal routes, services, plans). This is the register the rewrite must obey.

| Claim on the site today | Truth | Action |
|---|---|---|
| "Patented edge AI" / "Patented" badge | Provisional **drafted**, sent to attorney 2026-05-13. Docket/filing/priority all "TBD". Not filed, not granted. | **Remove.** "Patent pending" only after a filing receipt exists. |
| "94% failure detection accuracy" | Offline in-domain F1 0.98–0.99 on **one furnace, one mount** (`fw-node02`, 103 catalog entries). Live eval on 841k real frames: m1 F1 0.077, verdict `FAIL`. Cross-furnace accuracy unmeasured. | **Remove all numbers.** Say "validated on instrumented furnaces; multi-furnace validation underway." |
| "99.9% platform uptime SLA" | No SLA, SLO, or monitoring definition anywhere. | **Remove.** |
| "<2 second alert latency" | Never measured end-to-end. The only `<2s` in the repos is USB port detection in the Factory Tool. | **Remove** until measured; then say "seconds". |
| "6× faster fault detection" | No basis anywhere. | **Remove.** |
| 3 testimonials, 5 customer logos, "3.2× fewer callbacks", "91% retention" | Fabricated (BRAND_COPY §11 templates published as real quotes). | **Remove.** Replace with an honest design-partner section. |
| "Email + SMS alerts", "multi-channel notifications" | Portal sends **PWA web push only**. No email, SMS, or webhook code exists (email digest is a Phase 5 plan). | Say "push notifications to your team's phones". |
| "Geographic map view", "Basic fleet map" | `MapPage.tsx` is a 24-line "Map Coming Soon" stub. | **Remove** until built. "Fleet list with health status" is real. |
| "Up and running in under 15 minutes. No wiring. No HVAC technician required." "Clip & Power — plug into any standard outlet." | Device is powered from the furnace's **24VAC transformer** (CN1), senses the heat call from the **thermostat W/Y wires**, optional CT clamps on the hot legs. Wiring docs are written for a technician. | Reframe as a strength: **"Installed by your technician during a maintenance visit."** That is the whole point of a contractor-sold product. |
| "QR-code WiFi setup takes 60 seconds" | Wi-Fi SSID/password are written to NVS by the **Factory Tool over USB**. No SoftAP, BLE, captive portal, or app onboarding exists. | Say "Wi-Fi configured before the unit ships" (and put a real provisioning story on the roadmap). |
| "Ships in 2 business days", "30-day pilot", "No credit card" | No fulfilment, no pilot terms, no billing. | Replace with a **design-partner program** with real terms. |
| "Real-time vibration analysis", "Z-Axis FFT Spectrum", "2048 Hz", "RPM est.", "TFLite", "48 KB model", "~4 ms" | Implementation detail. Violates `BRAND_COPY.md` §2. | Describe the capability, never the stack. |
| "Identifies inducer, blower, flame" | `f1` is the gas valve / igniter, not flame — flame rectification current is not sensed. | Say "ignition" not "flame". Reconcile `BRAND_COPY.md` §4 with `FMEA.md`. |
| Pricing $14.99 / $24.99 per month | `BUILD_PLAN.md` says $49/$89 **per device**. Business case says per-furnace/month, price "placeholder — needs WTP study", hardware monetisation undecided. | **Do not publish a number** until decided. See §3.5. |
| "SSO/SAML", "white-label", "on-prem", "SLA guarantees", "custom alert rules engine" | None exist. (An alert-rules admin page exists; the rest do not.) | Remove from the pricing page. |
| "7 roles, Row-Level Security" | True — and irrelevant to a buyer. | Say "your customers can log in and see only their own furnace." |
| "Predictive HVAC Diagnostics", "bearing wear", "before visible symptoms", "6 of 7 failure modes", "<3% false positives" (launch blog post) | Contradicts `BRAND_COPY.md` §2 directly; numbers unsupported. | Rewrite or unpublish the post. |
| "catches the early signs of failure before they become emergencies" (About) | Prediction framing; the product is state-based diagnosis. | Rewrite. |

**What is genuinely true and under-sold today:**
- The sensor knows when the thermostat is **calling for heat** (W-wire sensing) *and* whether the furnace is answering (inducer / ignition / blower activity). That is exactly the no-heat scenario contractors get called about — and nothing on the site says it.
- Four failure modes have real captured signatures (igniter failure, flame-sensor failure, pressure-switch failure, rollout trip), plus short-cycling, extended-run, and offline detection in the portal.
- Powered from the furnace transformer with battery ride-through — no batteries to change, no wall wart.
- Detection runs on the device; it keeps classifying when Wi-Fi drops. *(Verify whether alerts queue and flush on reconnect before claiming it.)*
- Two health scores (device, equipment), a failure-mode registry with plain-language pages, device shadow config, signed OTA, resident and property-manager views, API keys.
- A real business case exists: 85–95M installed NA furnaces; target buyer is the service company monitoring units under warranty or agreement.

### 1.3 Page-by-page

**Home.** The headline is good. Everything under it undermines it: the audience toggle splits the first three seconds of attention; the hero mock exposes FFT/Hz/RPM; the stats strip, logo bar, and testimonials are fiction; the "How it works" steps describe a product that doesn't exist (outlet power, QR Wi-Fi, no tech); the floating alert card hides the "94% Confidence" cell and renders `Alert â†' Mike D.`.

**Features.** Hero + the sentence "Full feature sections — coming in BUILD_PLAN Phase 2B" + CTA. Public.

**Pricing.** Three tiers of features that mostly don't exist, prices that contradict every internal document, a unit that is never stated (per account? per device?), and "FAQ content — BUILD_PLAN Phase 2B".

**Customers.** Fabricated stats strip, then "Customer case studies coming soon." In the nav.

**About.** A homeowner story ("millions of homeowners", "peace of mind") on a site that now sells to contractors; predictive language; "Team profiles — BUILD_PLAN Phase 2C".

**Contact.** Dead form. The "Prefer email?" box is a white `.card` with a `text-white` heading — invisible. Emoji icons.

**Blog.** H1 uses `.section-title` (near-black) on the dark hero — invisible. The card title is `text-white` on a white `.card-hover` — invisible. The one post breaks the brand rules in its title.

**Docs.** Same invisible H1. "Documentation coming soon." In the nav.

**Login.** A second login form on the marketing domain that either redirects to the app or loads Supabase from a CDN. Confusing and a needless attack surface. Link straight to `app.furnacewatch.io/login`.

**404.** `text-white` heading on a white body — invisible.

### 1.4 Design assessment

- **Two sites stapled together.** `global.css` was converted to a light theme (white body, dark headings) but only the homepage was migrated. Every inner page still stacks `bg-navy-950` sections, so a white header sits on a black page, and any component that assumed the old dark theme (`.card` + `text-white`, `.section-title` on `bg-gradient-hero`) now renders invisible text.
- **Generic AI-startup template.** Gradient text, glow blobs, noise overlay, floating alert card, pulsing dots, 5-star testimonial cards with initials avatars, "Most Popular" badge, "Patented" badge, orange all-caps eyebrows above every heading. To an HVAC owner this reads "software startup", not "equipment I'd put in a customer's basement".
- **No real imagery.** Not one photo of the device, a furnace, a technician, or the actual portal. Every visual is a hand-built fake UI.
- **Typography is fine** (Plus Jakarta Sans / DM Sans / JetBrains Mono) but used decoratively — 64px hero, 128px "404", centred everything.
- **Contrast:** `heat-500` (#e85d10) as link/text on white is ~3.9:1 — fails AA. Placeholder notes in `text-slate-500` on `navy-950` ~3.9:1.
- **Mobile:** not verifiable this pass (headless Chrome enforces a ~500px minimum window on Windows). The hero grid contains fixed-width mocks (40-bar FFT, 4-col stat row) that are likely to force horizontal overflow at 390px. QA item, not a finding.
- **The tokens are worth keeping.** Warm charcoal (`navy`) + burnt ember (`heat`) is a distinctive, on-category palette. The problem is application, not choice.

---

## 2. Strategy

### 2.1 Audience

**Primary buyer:** owner or general manager of a residential HVAC service company, roughly 5–50 technicians, hundreds to a few thousand maintenance-agreement customers, standing behind furnaces they installed or maintain.

| Role | What they need from the site |
|---|---|
| Owner / GM (economic buyer) | Does this make my maintenance agreements worth more, cut callbacks, and protect me on warranty installs? What does it cost per furnace? |
| Service manager / dispatcher (champion) | Will I know what failed before I assign the truck? What does the alert actually say? |
| Technician (user) | How do I install it? Does it get in my way? Does it make me look good on the job? |
| Office / CSR (influencer) | Can I see the customer's furnace when they call? |

**Secondary (footnote, not a track):** property-management portfolios; OEM / distributor partnerships via Enterprise contact only. Homeowners: separate site, separate domain or subdomain, later.

### 2.2 Positioning statement

> For residential HVAC service companies that stand behind the furnaces they install and maintain, **FurnaceWatch is a furnace-mounted diagnostic sensor and fleet portal that tells your office what failed the moment it fails** — so you dispatch with the diagnosis instead of discovering it in the driveway. Unlike thermostat data or smart-home gadgets, it watches the furnace itself — the heat call, inducer, igniter, and blower — from a sensor your own technician installs during a normal maintenance visit.

### 2.3 Value pillars (three, not six)

1. **Know what failed before the customer calls.** State-based failure diagnosis with named failure modes. Not prediction — the failure still happens; you find out first and you find out *what*.
2. **Dispatch with the diagnosis.** Right tech, right parts, one visit. The first fifteen minutes of troubleshooting happen before the truck leaves.
3. **Turn maintenance agreements into monitored agreements.** A reason to renew, a premium tier to sell, a differentiator against the company down the road. *This is the pillar the current site misses entirely — it sells cost avoidance and never revenue.*

**Proof pillar (supports all three): Built for the mechanical room.** Powered from the furnace's own 24V transformer, no batteries, detection runs on the device and keeps working when Wi-Fi drops, installed by your tech in a maintenance visit, senses the actual heat call from the thermostat wires.

### 2.4 Failure modes to market (reconcile before writing copy)

`BRAND_COPY.md` §4 lists six approved names; `FMEA.md` has four captured signatures; the portal registry has sixteen seeded codes. The site should list only what is real, in trade language, with what the alert says and what to put on the truck:

| Site name | Backed by | Alert text (draft) |
|---|---|---|
| Heat call with no ignition | W-wire sensing + no inducer/ignition activity | "Thermostat calling for heat since 5:42 AM — furnace has not fired." |
| Igniter failure | FM-004 (2 captures) | "Ignition sequence ran, burner did not light." |
| Flame sensor failure | FM-002 | "Burner lit and dropped out inside 10 s, three cycles in a row." |
| Pressure switch / rollout trip | FM-001, FM-003 (differentiator needs validation) | "Inducer ran, ignition never attempted." |
| Short cycling | portal `SHORT_CYCLING` | "Nine cycles in the last hour, none over 4 minutes." |
| Extended run | portal `EXTENDED_RUN` | — |
| Sensor offline | portal `OFFLINE` | — |

Gas valve, blower motor, and inducer degradation are **not** detectable today (`FMEA.md` "not yet captured"). Do not list them.

### 2.5 Voice

Sounds like a good service manager, not a SaaS deck. Plain, trade-literate, specific.
- Use: heat call, inducer, igniter, rollout, no-heat, callback, truck roll, maintenance agreement, first-visit fix.
- Never: "AI-powered", "revolutionize", "peace of mind", "predictive", "seamless", "leverage", model names, sampling rates, chip names.
- Lead with the mechanism ("senses the heat call and listens to the furnace"), not the technology ("on-device ML"). Mention on-device processing once, as a reliability benefit.

### 2.6 Candidate headlines

- **Know what failed before the customer calls.** *(recommended)*
- The thermostat says heating. The furnace says nothing. You'll know first.
- Dispatch with the diagnosis.
- Every furnace under agreement, watched. Every failure, named.

---

## 3. Site architecture

### 3.1 Navigation

`How it works` · `What it catches` · `For service companies` · `Pricing` · `Company` — right side: `Sign in` (→ app) · **Book a demo**

Fewer, working links in the footer: How it works, What it catches, Pricing, Company, Demo, Privacy, Terms, Sign in. No "System Status", "API Reference", or "Release Notes" until they exist.

### 3.2 Page set

| Route | Purpose | Replaces |
|---|---|---|
| `/` | Convert owner/GM to a demo request | index (rewritten) |
| `/how-it-works` | Sensor → install → portal → alert, with real screenshots and the honest install | `/features` |
| `/what-it-catches` | Failure-mode cards from §2.4; what the alert says; what to bring | new |
| `/for-service-companies` | Owner economics: monitored-agreement upsell, callbacks, warranty exposure, dispatch. Optional ROI calculator with user-supplied inputs and a visible formula | new |
| `/pricing` | Model + design-partner terms + FAQ; no number until decided | pricing (rewritten) |
| `/company` | Founder story rewritten for contractors: an engineer instrumented his own furnace, now building with design partners; real team | `/about` |
| `/demo` | Working form + calendar embed; qualification fields (company, # techs, # agreements, service area, role) | `/contact` |
| `/blog` | Keep; fix; rewrite the launch post; contractor-topic calendar | blog |
| `/install` (later) | Tech-facing install guide — doubles as demo collateral | `/docs` |
| `/legal/privacy`, `/legal/terms` | Required — the form collects PII | new |
| `/404` | Fixed | 404 |

Remove: `/customers` (until real), `/docs` from nav (until content), `/login` (301 → `app.furnacewatch.io/login`), the audience toggle. The `team` / `caseStudies` collections can stay dormant.

### 3.3 Homepage blueprint

| # | Section | Content |
|---|---|---|
| 1 | Header | Light, sticky, compact. Logo · 5 links · Sign in · Book a demo |
| 2 | Hero | H1 (§2.6) · 2-sentence sub · **Book a demo** + *See how it works* · Visual: device on a furnace side panel with a phone showing the real push alert |
| 3 | The problem | Three plain statements, no numbers: "The thermostat says heating. The house is 58°. Your first sign is a phone call." / "The truck rolls with no idea what it'll find." / "Your best customers are the ones who called at 6 AM and didn't get an answer." |
| 4 | How it works | 4 steps: **Your tech installs it** in a maintenance visit (cabinet mount, 24V, thermostat wires) → **It watches the furnace** (heat call, inducer, ignition, blower) → **It names the failure** → **Your office gets the alert** |
| 5 | What it catches | 6–7 failure-mode cards (§2.4) — link to `/what-it-catches` |
| 6 | Dispatch with the diagnosis | Real portal screenshot (device detail + failure-mode page) beside an alert on a phone. Caption: what the alert says, what the tech brings |
| 7 | For the business | Three cards: Monitored agreements · Fewer callbacks · Warranty installs, covered |
| 8 | Built for the mechanical room | 24V-powered, no batteries · on-device detection through Wi-Fi drops · your tech installs · your customers see only their furnace |
| 9 | Design-partner program | Honest early-stage: "We're working with a small number of service companies this heating season. Here's what partners get and what we ask." |
| 10 | FAQ | Which furnaces? Who installs? Internet required? What if Wi-Fi drops? What does it cost? |
| 11 | CTA band | Book a demo |
| 12 | Footer | Working links only |

### 3.4 Copy governance

- Rewrite `BRAND_COPY.md` → v2: single audience; the §1.2 claims register becomes the "approved / prohibited" table; §2.4 replaces §4; the §6 homeowner track is removed and archived for the consumer site.
- Every page gets a copy deck reviewed against the register before build. No number ships without a file path that backs it.

### 3.5 Pricing page (recommendation)

Publish the **model**, not a number: *priced per monitored furnace per month; sensor included; no per-user fees; cancel per furnace.* Then the design-partner terms, then a FAQ with real answers. Add a number once the WTP study in the business case is done. A wrong public number costs more than a missing one.

---

## 4. Design direction

### 4.1 Principles

1. **One theme, light.** Warm paper/stone surfaces (`navy-50/100/200`), charcoal (`navy-900/950`) reserved for the hero band, portal screenshot frames, and the CTA band. Ember (`heat`) is the single accent. Rationale: read on phones in trucks and office PCs in daylight; prints; reads "trade equipment" rather than "crypto dashboard".
2. **Real over rendered.** Device photo on a furnace, portal screenshots at 2×, a technician's hands, one clean line diagram of the install. Until photography exists, a product render on a real furnace photo plus real screenshots.
3. **Sturdy, not startup.** Left-aligned headlines, 65ch measure, one eyebrow style used sparingly, generous consistent rhythm (96/128px sections), 1200px container.
4. **No decoration that isn't information.** Remove gradient text, glow blobs, noise overlay, floating cards, pulse dots, star ratings, initials avatars, badges, scroll-reveal.
5. **AA contrast everywhere.** Ember text on white uses `heat-600` (#c44d0e, ~5.3:1), never `heat-500`.

### 4.2 Tokens

- **Colour:** keep the `navy` and `heat` scales. Add semantic aliases: `surface`, `surface-alt`, `ink`, `ink-muted`, `accent`, `accent-ink`, and portal-consistent status `healthy / warning / critical`. Define `success/warning/danger/info` as palette objects (fixes the latent `.badge-success` bug).
- **Type:** keep DM Sans (body, 17/1.6) and JetBrains Mono (data labels). **Recommend** swapping display from Plus Jakarta Sans to **Archivo** (600/700, slightly narrow, engineered feel) — or keep Jakarta if a font change is out of scope; it is not the main problem. Self-host `woff2`.
- **Scale:** H1 44–56px, H2 32–36px, H3 22px, body 17px, small 14px. Nothing above 56px.
- **Radius:** 6px controls, 10px cards. No pills except status chips.
- **Shadow:** one subtle card shadow on light; none on dark.

### 4.3 Component set (Astro)

`Header` · `Hero` · `ProblemStatements` · `StepRow` · `FailureModeCard` (+ `failureModes` data collection) · `ScreenshotFrame` (portal shot with caption) · `BenefitCard` · `SpecList` (mechanical-room facts) · `PartnerProgram` · `FAQ` (native `<details>`) · `CTABand` · `Footer` · `DemoForm` (island only if needed) · optional `ROICalculator` (island).

Delete: `StatBar`, `TestimonialCard`, `FeatureCard`, `CTASection` (replace), audience-toggle CSS, `.gradient-text`, `.noise-overlay`, `.glow-line`, `.reveal*`.

### 4.4 Imagery to produce

1. Device on a furnace side panel, real basement, natural light — hero.
2. Technician's hands landing the 24V leads / thermostat wires — install step.
3. Portal: dashboard, device detail, alert list, one failure-mode page — 2× PNG, light chrome.
4. Phone with the push alert.
5. One vector install diagram (cabinet · sensor · 24V · W wire · Wi-Fi).

---

## 5. Technical and operations fixes

| Item | Detail |
|---|---|
| Git | `git init` in `c:\furnacewatch_www`, reconcile with `mcgovernr/furnacewatch_www`, branch `redesign/v2` |
| CI/CD | BUILD_PLAN Phase 3 as specified (OIDC role, S3 sync, CF invalidation). Stop hand-uploading |
| Form | Set `FORMSPREE_FORM_ID` (or the SES Lambda); add `_gotcha` honeypot; success/error state; test end-to-end |
| Analytics | Plausible with goals `demo_request`, `signin_click`; funnel pricing → demo |
| `public/` | favicon.svg, apple-touch-icon, webmanifest, robots.txt, og-default.png (1200×630, real product image) |
| Redirects | apex → www 301; `/login` → app; `/features` → `/how-it-works`; `/about` → `/company`; `/contact` → `/demo` |
| Legal | privacy + terms (Plausible is cookieless; form data via Formspree/SES) |
| Source hygiene | strip BOM + fix mojibake in `index.astro`; fix `.badge-success`; update BUILD_PLAN (Tailwind 3.4, `assets/`) |
| Fonts | self-host woff2; `font-display: swap` |
| QA | Lighthouse ≥ 90 all pages; real-device check at 375/390/430; keyboard nav; screen reader pass; contrast audit |
| Search | Search Console + sitemap once redirects are live |

---

## 6. Phased plan

> **Status (2026-08-30):** Phases 0–3 are **shipped** — claims stripped, single audience,
> design system v2 (Archivo, self-hosted fonts, mono eyebrows, charcoal bands), and the
> full v2 IA (`/how-it-works`, `/what-it-catches`, `/for-service-companies`, `/company`,
> `/demo`) live at www.furnacewatch.io with redirects from the old routes. The homepage
> follows the signed-off comp (artifact "FurnaceWatch Homepage v2"). Remaining: Phase 4
> (CI/CD on GitHub Actions; Formspree + Plausible accounts are the user's to create;
> apex→www 301 needs a CloudFront Function), Phase 5 content, real portal screenshots
> and a product render to replace the illustrations, and Search Console submission.

### Phase 0 — Stop the bleeding (≈1 day, ship this week)
- Remove every claim in the §1.2 register; remove testimonials, logos, stats strips.
- Remove the audience toggle and all `data-for="owner"` blocks.
- Make the form work (Formspree ID) and add Plausible.
- Fix invisible text (blog, docs, contact, 404) by giving those pages the light theme.
- Remove `/customers`, `/docs` from nav; remove dev placeholder sentences; fix the footer to working links.
- Add `public/` basics (favicon, robots, OG placeholder). Fix mojibake.
- Rewrite the launch post title/body to the brand rules or set `draft: true`.
- Init git, commit, deploy by hand one last time.

### Phase 1 — Message and IA (≈1 week)
- `BRAND_COPY.md` v2 (single audience, claims register, reconciled failure modes).
- Sitemap and page blueprints (§3) approved.
- Copy decks for all pages, reviewed against the register.
- Decisions: pricing model wording, design-partner terms, whether any accuracy language ships, product name for the sensor.

### Phase 2 — Design system v2 (≈1 week)
- Tokens (§4.2), type, component inventory (§4.3) as Astro components with a `/styleguide` page.
- Homepage design comp (Claude Design canvas or Figma) → sign-off → build.
- Photography / screenshot capture (§4.4) scheduled in parallel.

### Phase 3 — Build (≈1–2 weeks)
- Home, How it works, What it catches, For service companies, Pricing, Company, Demo, Legal, 404, Blog.
- `failureModes` content collection drives cards on Home and What-it-catches from one source.
- Redirect map.

### Phase 4 — Launch ops (≈2–3 days)
- CI/CD, form/analytics verification, OG validation (LinkedIn inspector), Lighthouse, mobile QA, Search Console.

### Phase 5 — Content engine (ongoing)
- Four contractor posts: "What a no-heat call looks like from the furnace's side", "Why we sense the heat call, not just the furnace", "How to sell a monitored maintenance agreement", "What our design partners told us after one heating season".
- Install guide (`/install`). Design-partner stories as they become real. ROI calculator once economics are validated.

---

## 7. Decisions — resolved 2026-08-30

1. **Pricing: model only.** Per monitored furnace per month, sensor included; no public number until the WTP study.
2. **No accuracy language.** The buyer doesn't care whether it's 95% or 99% — it has to work. No numeric claims of any kind without a backing file and sign-off.
3. **Design-partner program: yes.** 3–5 residential service companies, one heating season, 10–25 monitored furnaces each on active maintenance agreements, ideally within driving distance for install support. Partners get hardware + portal free for the season, founder-direct support, roadmap input, and locked launch pricing. We ask for a named champion, a monthly 30-minute call, tech install feedback, and an approvable case study at season's end. **Pre-pilot engineering blockers:** field Wi-Fi provisioning (today the Factory Tool writes credentials over USB before shipping — partners' installs need either a provisioning laptop workflow or SoftAP/BLE onboarding) and probably email alerts (push-only is fragile for an office).
4. **The product is called FurnaceWatch** — device and platform share the name.
5. **Renderings, not photography, for v2** (none exist yet — production item in Phase 2), plus real portal screenshots.
6. **Display typeface: Archivo** (implemented in Phase 2; Phase 0 keeps Plus Jakarta Sans).
7. `/customers` removed until there is a real story; design partners live on `/pricing#design-partners` for now.

## 8. Success metrics

Demo requests / month · demo → pilot conversion · bounce rate on `/` · scroll depth to §6 ("Dispatch with the diagnosis") · time on `/how-it-works` · zero broken links / zero 404 assets.
