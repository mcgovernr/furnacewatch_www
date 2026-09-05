---
name: www-workflow
description: Use when changing anything in furnacewatch_www or about www.furnacewatch.io — copy, pages, design, deploys, CI. Covers the release flow (never deploy by hand), the claims policy, the design system, infra IDs, and the gotchas that have already cost us a debugging session.
---

# FurnaceWatch marketing site — how we work

Full context: `docs/REDESIGN_PLAN.md` (audit + decisions), `docs/BRAND_COPY.md` v2
(copy ground truth), `docs/SEO.md` (keyword map, content calendar, founder checklist),
`README.md` (repo map). This skill is the operational summary.

## Release flow (live since 2026-08-31)

- `main` **is production**. Never `aws s3 sync` by hand. Push/merge to `main` →
  `.github/workflows/deploy.yml` runs: claims lint → typecheck → build → OIDC role →
  3-pass S3 sync → CloudFront invalidation → prod smoke check. PRs are gated by `ci.yml`.
- Before pushing: `npm run check` (claims lint + typecheck + build).
- Watch a run without `gh` (repo is public):
  - `curl -s "https://api.github.com/repos/mcgovernr/furnacewatch_www/actions/runs?head_sha=<SHA>"`
    — **must be the full 40-char SHA**; short SHAs silently match nothing.
  - Step results: `/actions/runs/<run id>/jobs` (public). Full logs need auth: get the
    token with `printf "protocol=https\nhost=github.com\n\n" | git credential fill`
    (password= line), then `curl -L -H "Authorization: Bearer $TOK" .../actions/jobs/<job id>/logs`.
  - Deploy proof: `aws cloudfront list-invalidations --distribution-id E1N85VE6H30GSV`
    — the newest entry should postdate the run.

## Claims policy — the non-negotiable

- Audience is **HVAC service companies only**. Homeowner copy belongs to a future,
  separate consumer site.
- No numbers or percentages, no patent language, no predictive framing ("catches early
  signs", "before failure"), no capabilities that don't exist (alerts are **push only**;
  there is **no fleet map**; the install is a **technician job** — 24V transformer +
  thermostat wires; Wi-Fi is **factory-provisioned over USB**). The claim→truth→action
  register is `docs/REDESIGN_PLAN.md` §1.2.
- Failure modes come only from `src/data/failureModes.ts` (one source for home +
  /what-it-catches). Gas valve, blower motor, inducer degradation are NOT detectable.
- `npm run lint` (`scripts/check-claims.mjs`) enforces this in CI. A deliberate, backed
  exception carries `claims-ok` on the line — only with a repo file as evidence.

## Design system v2

- Fonts are **self-hosted**: Archivo (display), DM Sans (body), JetBrains Mono
  (eyebrows/data) — `src/styles/fonts.css` + `public/fonts/`. Never add a Google Fonts
  `<link>`.
- Light paper surfaces + charcoal bands. Accent text on light is `heat-600` (#c44d0e,
  AA); `heat-500` is for fills only. Tokens in `tailwind.config.mjs`; component classes
  (`.section-eyebrow`, `.card`, `.btn-*`, status colors `healthy/warn/critical`) in
  `src/styles/global.css`.
- Banned styling: gradients, glow, noise overlays, scroll-reveal, star-rating/testimonial
  tropes, fake customer logos.

## Routes and redirects

- v2 IA: `/` `/how-it-works` `/what-it-catches` `/for-service-companies` `/pricing`
  `/company` `/demo` `/blog` `/legal/*`.
- Renaming a route: add old→new to `legacyRedirects` in `astro.config.mjs` — that
  generates the meta-refresh stub (with canonical + noindex) and drops the source from
  the sitemap. Existing legacy sources: `/features` `/about` `/contact` `/docs`.

## Gotchas already paid for

- **`astro check` fails on a cold checkout if a declared content collection has no
  content files** — `.gitkeep` does NOT fix it (types only generate from real entries;
  a warm `.astro/` dir masks it locally). `src/content/config.ts` declares only `blog`.
  Adding a collection? Ship its first page **in the same commit**.
- **Local pass ≠ CI pass.** Before pushing risky structural changes, validate on a cold
  clone: `git clone --depth 1 <repo> tmp && cd tmp && npm ci && npm run check`.
- **Windows AWS CLI can't read Git Bash `/tmp` paths** (`file:///tmp/x.json` fails).
  Write param files to a real Windows path and pass `file://$(cygpath -m "$path")`.
- Line endings are normalized to LF via `.gitattributes` — ignore CRLF warnings.
- Visual verification: see the `headless-verify` skill (Chrome CLI screenshots lie about
  mobile widths on this machine).

## Infra (AWS account 331411055902)

- S3 `furnacewatch-www-331411055902` · CloudFront `E1N85VE6H30GSV` (aliases www + apex)
  · deploy role `furnacewatch-www-github-deploy` (GitHub OIDC, scoped to those two).
- The CloudFront function `furnacewatch-dev-www-uri-rewrite` (viewer-request on the
  default behavior) does **both** the pretty-URL rewrite and the apex→www 301 — a
  behavior holds only ONE viewer-request function, so never replace it with a
  single-purpose one. To change it: `update-function` (DEVELOPMENT), `test-function`
  the three cases (apex 301, www pretty-URL, www asset untouched), then
  `publish-function`. New-page SEO: unique keyword title ≤60 chars + description ≤160;
  blog posts target ONE query each (map in `docs/SEO.md`) and must pass the claims lint.
- Emergency manual deploy **only if GitHub Actions itself is down** (then fix CI):
  three-pass sync — `*.html` with `max-age=0,no-cache --delete`; `assets/*` with
  `max-age=31536000,immutable`; everything else `max-age=3600` — then invalidate `/*`.

## Open items

Tracked in the unified backlog — `furnacewatch_repo/docs/BACKLOG.md`, **FW-34…FW-44**:
demo-form activation (Formspree secret) · Plausible · Search Console verify + sitemap
(token already in Route53 TXT and on-page meta) · branch protection on `main` · real
portal screenshots + product render · blog cadence per `docs/SEO.md` · install guide
(docs collection returns with its first page) · field Wi-Fi provisioning and email
alerts (design-partner blockers, firmware/backend) · consumer site (separate property).
Done and NOT open: apex→www 301 (lives in the shared CloudFront function).
