// Temporary Tailwind config for the design-sync export.
// Extends the site's real config, but compiles a COMPREHENSIVE brand stylesheet:
// the full navy/heat/slate token scales across common property prefixes are
// safelisted so a design built with FurnaceWatch can use any brand token, not
// only the utilities the marketing pages happened to reference.
// NOTE: compile from `.ds-input.css` (a preprocessed copy of src/styles/global.css)
// via the -i flag — one rule (.badge-success) is rewritten there to avoid a latent
// @apply-opacity compile bug in the source. See .design-sync/NOTES.md.
import base from './tailwind.config.mjs';

export default {
  ...base,
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}', './.ds-safelist.html'],
  safelist: [
    // Full brand color scales across the core property prefixes. No `variants`
    // key on purpose — variant multiplication is what blew the output past 8 MB;
    // interactive states come from the component classes (.btn, .card-hover, …).
    {
      pattern: /(bg|text|border|ring|from|via|to|fill|stroke|divide)-(navy|heat|slate)-(50|100|200|300|400|500|600|700|800|900|950)/,
    },
    { pattern: /(bg|text|border)-(navy|heat|slate)-(50|100|200|300|400|500|600|700|800|900|950)/, variants: ['hover'] },
    { pattern: /(bg|text|border|ring|fill|stroke)-(success|warning|danger|info)/ },
    { pattern: /font-(display|body|mono)/ },
    { pattern: /bg-(gradient-navy|gradient-heat|gradient-hero|noise)/ },
    { pattern: /shadow-(glow-heat|glow-navy|card|card-hover)/ },
    // Theme utilities the site doesn't happen to use but the DS defines.
    { pattern: /rounded-(4xl|5xl)/ },
    { pattern: /animate-(fade-up|fade-in|pulse-heat)/ },
    { pattern: /(p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|gap|w|h|space-x|space-y)-(18|22|30|34|128|144)/ },
  ],
};
