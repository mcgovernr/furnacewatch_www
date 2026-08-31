# furnacewatch_www

Marketing site for [FurnaceWatch](https://www.furnacewatch.io) — a furnace-mounted
diagnostic sensor and fleet portal for HVAC service companies.

**Stack:** Astro 5 (static output) · Tailwind 3.4 · MDX content collections ·
self-hosted fonts (Archivo / DM Sans / JetBrains Mono) · S3 + CloudFront.

## Development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build → dist/
npm run preview    # serve dist/
npm run typecheck  # astro check
npm run lint       # claims-policy lint (see below)
```

## Release flow

`main` is production. **Never deploy by hand.**

1. Branch from `main`, make changes, open a PR.
2. **CI** (`.github/workflows/ci.yml`) runs on the PR: claims lint → typecheck → build.
3. Merge to `main`.
4. **Deploy** (`.github/workflows/deploy.yml`) runs automatically: build → 3-pass
   `aws s3 sync` (HTML no-cache with delete, hashed assets immutable, statics 1h)
   → CloudFront invalidation → smoke check.

Auth is GitHub OIDC assuming `arn:aws:iam::331411055902:role/furnacewatch-www-github-deploy`
(scoped to the site bucket + distribution). No AWS keys are stored in GitHub.

Optional build inputs (set in GitHub → Settings when the accounts exist):
`FORMSPREE_FORM_ID` (secret — activates the demo form; the page shows a
direct-email panel without it) and `PUBLIC_PLAUSIBLE_DOMAIN` (variable — enables
cookieless analytics).

## Copy rules — read before writing any page

Every customer-facing claim must be backed by the product as it exists:

- `docs/BRAND_COPY.md` — ground truth for audience, voice, failure-mode names,
  and the claims policy (**no accuracy numbers, no unbacked capabilities**).
- `docs/REDESIGN_PLAN.md` §1.2 — the claim-by-claim register with sources.
- `src/data/failureModes.ts` — the single source for marketed failure modes.

`npm run lint` enforces the policy mechanically and runs in CI. A deliberate,
backed exception can carry a `claims-ok` marker on the line — use sparingly.

## Repo map

```
src/pages/           routes (v2 IA: how-it-works, what-it-catches,
                     for-service-companies, company, demo, pricing, blog, legal)
src/components/      Header, Footer, CTASection
src/data/            failureModes.ts
src/styles/          global.css (design system v2) + fonts.css (self-hosted)
src/content/         blog (MDX), docs (empty until the install guide)
public/              favicon, robots.txt, og image, fonts/
docs/                BRAND_COPY.md, REDESIGN_PLAN.md, BUILD_PLAN.md (partly historical)
scripts/             check-claims.mjs
```

Old routes `/features`, `/about`, `/contact` are static redirects (see
`astro.config.mjs`) — don't reuse those paths.
