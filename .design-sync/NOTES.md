# design-sync notes — furnacewatch-www

## What this sync is
This is the **FurnaceWatch marketing site** (`furnacewatch_www`), a pure **Astro** static
site (Astro 5, `output: 'static'`, no React/Vue/Svelte islands). It is NOT a React
component library, so it is **outside the standard converter's envelope** — the converter
builds `window.<globalName>.*` React components from a `dist/` JS entry, and Astro has no
such entry.

By the user's decision (2026-07-09) this is a **tokens-only / brand sync** (base SKILL.md
"Path A"): ship the design language — compiled CSS, custom component classes, color/type
tokens, fonts — with **no component bundle**. Nothing is reimplemented as React. Claude
Design then produces on-brand FurnaceWatch UI from the styles + conventions header.

## How the bundle is produced (off-script — no package-build.mjs)
The layout in `ds-bundle/` is produced by hand, then gated with `package-validate.mjs`:

- `_ds_bundle.css` — compiled by the site's own Tailwind 3.4.19 CLI over
  `src/styles/global.css`, using a temp config `.ds-tw.config.mjs` (extends the real
  `tailwind.config.mjs`). The temp config adds a **safelist** for the full navy/heat/slate
  scales + status/font/shadow/gradient utilities, so a NEW design can use any brand token,
  not just the utilities the marketing pages happened to reference. Rebuild command:
  `node_modules/.bin/tailwindcss -c ./.ds-tw.config.mjs -i ./src/styles/global.css -o ./ds-bundle/_ds_bundle.css --minify`
  (~4s, ~870 KB raw / ~79 KB gzip).
  - **Do NOT add a `variants` array to the big color-scale safelist pattern** — it exploded
    the output to 8.9 MB. Interactive states come from the component classes.
  - Compiled from **`.ds-input.css`** (a preprocessed copy of `src/styles/global.css`), NOT
    global.css directly — see the source-bug finding below. Regenerate `.ds-input.css` from
    global.css on every re-sync (a small node replace; see the git history / this file).
  - `.ds-safelist.html` forces every `@layer components` class to ship even when the
    marketing pages don't use it (Tailwind tree-shakes @layer components by usage).

## Source-bug finding (worth fixing upstream in furnacewatch_www)
`.badge-success` in `src/styles/global.css` (line ~224) is written as
`@apply badge bg-success/12 text-success border border-success/22;`. Combining a
component-class `@apply` (`badge`) with a **flat-color opacity utility** (`bg-success/12`,
where `success` is a bare hex string, not a palette object) fails to compile in Tailwind
3.4 **whenever the class is actually retained** — `CssSyntaxError: bg-success/12 does not
exist`. The live site never hits it because `.badge-success` is unused and gets purged, so
the bug is latent. The DS export rewrites the rule in `.ds-input.css` to
`@apply badge text-success;` + literal `rgba(...)` background/border. **Recommended upstream
fix:** either define `success/warning/danger/info` as palette objects, or split the rule the
same way (avoid flat-color `/opacity` inside a component-class `@apply`).
- `styles.css` — the entry: `@import` Google Fonts (remote), `@import "./tokens/tokens.css"`,
  `@import "./_ds_bundle.css"`. Rendered designs consume only this @import closure.
- `tokens/tokens.css` — the palette/type/shadow tokens as CSS custom properties (a clean,
  human/agent-readable token reference mirroring `tailwind.config.mjs`).
- `_ds_bundle.js` — empty-bodied IIFE (tokens-only) with the `@ds-bundle` header.
- `_ds_sync.json` — minimal anchor (`renderHashes: {}`, componentCount 0).

## Fonts
Loaded from the **Google Fonts CDN** (see `BaseLayout.astro` `<link>` and the `@import` at
the top of `styles.css`): Plus Jakarta Sans (display), DM Sans (body), JetBrains Mono
(mono). They load at runtime → validate reports `[FONT_REMOTE]` (informational), not
`[FONT_MISSING]`. `runtimeFontPrefixes` in config also covers them. The site's own comment
notes "self-host in production" — if the site ever self-hosts, add the woff2 + @font-face
here via a `fonts/` dir.

## Known render warns
- None expected — tokens-only bundle has no component previews to render.

## Re-sync risks / what can go stale
- **This is off-script**: `resync.mjs` / `package-build.mjs` cannot rebuild an Astro repo.
  To re-sync, re-run the Tailwind CLI command above, regenerate `styles.css`/`tokens.css`
  if the brand changed, recompute `_ds_bundle.js`'s sha into `_ds_sync.json`, and re-validate.
- **Brand drift**: `tokens/tokens.css` and `conventions.md` are hand-mirrored from
  `tailwind.config.mjs` + `src/styles/global.css`. If those change (new colors, renamed
  component classes), update the token file and header to match, then re-validate the
  conventions header (grep every class/token it names against `_ds_bundle.css`).
- **The safelist** in `.ds-tw.config.mjs` enumerates the palette shades explicitly; if the
  config adds a new color family or shade, extend the safelist or new utilities won't ship.
- **Component picker stays empty** by design. If the site is ever ported to React (islands),
  revisit and run the real converter to ship actual components.

## Environment
- DesignSync upload could not run in this session (design-system auth unavailable in
  non-interactive / claude.ai-code mode). The validated `ds-bundle/` was handed off for
  upload once auth is available. No `projectId` recorded yet — record it once the project
  is created.
