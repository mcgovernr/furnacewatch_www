# FurnaceWatch design system

FurnaceWatch is a remote furnace-diagnostics / HVAC fleet-monitoring product.
The brand reads **industrial and precise**: a warm near-black charcoal (`navy`),
a single burnt-amber accent (`heat`, the forge), neutral `slate` text, and three
typefaces. This is a **Tailwind (v3) design system** — you style with Tailwind
utility classes and a set of custom component classes. There is no React
component library to import; build UI from the classes and tokens below.

## Setup — no provider, just the stylesheet
Nothing to wrap. Everything is plain CSS reachable from `styles.css`. Its `@import`
closure gives you: the three brand fonts (Google Fonts CDN), the design tokens
(`tokens/tokens.css`), and the compiled Tailwind utilities + component classes
(`_ds_bundle.css`). Read those files before styling — they are the source of truth.

Two surface modes exist. Content/app surfaces are **light**: `bg-white` (or
`bg-navy-50`) with `text-navy-900` headings and `text-navy-600` body. Marketing /
hero shells are **dark**: `bg-navy-950` (or `bg-gradient-hero`) with `text-slate-200`
and the `-light` / `-dark` class variants (`.section-title-light`, `.card-dark`,
`.btn-secondary-dark`, `.btn-ghost-dark`).

## The styling idiom — Tailwind classes + component classes

**Brand color utilities** (full 50–950 scales — use any shade):
| Family | Utilities | Use |
|---|---|---|
| `navy` (charcoal) | `bg-navy-950` `bg-navy-900` `bg-navy-800` `text-navy-900` `text-navy-600` `text-navy-500` `border-navy-200` `border-navy-700` | backgrounds, surfaces, text, borders |
| `heat` (amber accent) | `bg-heat-500` `text-heat-500` `text-heat-600` `border-heat-500` `hover:bg-heat-400` | primary actions, links, accents, icons |
| `slate` (neutral) | `text-slate-200` `text-slate-400` `bg-slate-100` | text on dark, neutral fills |
| status | `text-success` `bg-success` `text-warning` `text-danger` `text-info` | semantic states |

**Fonts:** `font-display` (Plus Jakarta Sans — headings), `font-body` (DM Sans —
default text), `font-mono` (JetBrains Mono — code/metrics).
**Brand extras:** `bg-gradient-navy` `bg-gradient-heat` `bg-gradient-hero`, shadows
`shadow-card` `shadow-card-hover` `shadow-glow-heat`, spacing `18 22 30 34 128 144`,
radius `rounded-4xl` `rounded-5xl`, animations `animate-fade-up` `animate-pulse-heat`.

**Component classes** (prefer these over rebuilding from utilities):
- Buttons: `.btn` base + `.btn-primary` (amber CTA), `.btn-secondary`, `.btn-outline`,
  `.btn-ghost`, and dark-section variants `.btn-secondary-dark` / `.btn-ghost-dark`;
  sizes `.btn-sm` / `.btn-lg`.
- Cards: `.card`, `.card-hover` (lift on hover), `.card-dark` (for dark sections).
- Badges: `.badge` + `.badge-heat`, `.badge-navy`, `.badge-success`.
- Layout: `.container-fw` (max-width 1280 centered), `.section` / `.section-sm`
  (vertical rhythm).
- Section headings: `.section-eyebrow` (amber uppercase kicker), `.section-title`
  (+ `.section-title-light`), `.section-subtitle` (+ `.section-subtitle-light`).
- Accents: `.feature-icon` (thin amber-bordered icon square), `.gradient-text`
  (amber gradient headline), `.glow-line`, `.nav-link`, `.divider`, `.badge`.
- Prose: `.prose-fw` for long-form docs/blog content.

**CSS variable tokens** are also available for values you can't express as a class
(gradients, custom mixes): `var(--fw-navy-900)`, `var(--fw-heat-500)`,
`var(--fw-font-display)`, `var(--fw-shadow-card)`, `var(--fw-gradient-text)`. See
`tokens/tokens.css` for the full list.

## One idiomatic snippet
```jsx
<section className="section bg-navy-950 text-slate-200">
  <div className="container-fw">
    <span className="section-eyebrow">Fleet health</span>
    <h2 className="section-title-light mt-3">Know the moment the furnace fails</h2>
    <div className="mt-10 grid gap-6 sm:grid-cols-3">
      <div className="card-dark p-6">
        <div className="feature-icon mb-4">{/* icon svg */}</div>
        <h3 className="font-display font-semibold text-slate-100">&lt;2s alerts</h3>
        <p className="text-navy-400 text-sm mt-1">On-device ML flags anomalies instantly.</p>
        <span className="badge-heat mt-4">Live</span>
      </div>
    </div>
    <a href="#" className="btn btn-primary btn-lg mt-8">Start monitoring</a>
  </div>
</section>
```
