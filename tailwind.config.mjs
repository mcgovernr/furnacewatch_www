import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // ── Brand Color Tokens (design system v2 — see docs/REDESIGN_PLAN.md §4.2) ──
      colors: {
        // Charcoal — warm near-black; industrial, not blue tech-startup
        navy: {
          50:  '#fafaf9',
          100: '#f4f4f3',
          200: '#e8e7e5',
          300: '#d1cfcc',
          400: '#a8a5a0',
          500: '#78756f',
          600: '#5a5752',
          700: '#3a3835',  // borders, dividers (dark surfaces)
          800: '#242320',  // card surfaces (dark)
          900: '#141311',  // charcoal band / headings
          950: '#0c0b0a',  // deepest band (footer)
        },
        // Ember — burnt amber-orange; forge, not stock Tailwind orange
        heat: {
          50:  '#fff8ef',
          100: '#feebd4',
          200: '#fcd3a4',
          300: '#f9a870',
          400: '#f4733a',  // accent text on dark
          500: '#e85d10',  // primary CTA fills
          600: '#c44d0e',  // accent text on light (AA), button hover
          700: '#a03f0f',
          800: '#813310',
          900: '#6b2b0f',
          950: '#3c1507',
        },
        // Slate — neutral text on dark bands
        slate: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Status (portal-consistent; defined as objects so /opacity works)
        healthy:  { DEFAULT: '#2e7d4f', dark: '#4ade80' },
        warn:     { DEFAULT: '#9a6300', dark: '#fbbf24' },
        critical: { DEFAULT: '#b3261e', dark: '#f87171' },
        success:  { DEFAULT: '#22c55e' },
        warning:  { DEFAULT: '#f59e0b' },
        danger:   { DEFAULT: '#ef4444' },
        info:     { DEFAULT: '#3b82f6' },
      },

      // ── Typography ─────────────────────────────────────────────────
      fontFamily: {
        // Archivo — slightly narrow, engineered display face (decision 2026-08-30)
        display: ['Archivo', 'Arial Narrow', ...fontFamily.sans],
        // DM Sans — warm, characterful body
        body: ['DM Sans', ...fontFamily.sans],
        // JetBrains Mono — data labels, eyebrows, product-UI text
        mono: ['JetBrains Mono', ...fontFamily.mono],
      },

      // ── Spacing ────────────────────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },

      // ── Box Shadows ────────────────────────────────────────────────
      boxShadow: {
        card: '0 1px 2px rgba(20,19,17,0.05), 0 6px 20px -8px rgba(20,19,17,0.10)',
        'card-hover': '0 1px 2px rgba(20,19,17,0.06), 0 10px 28px -8px rgba(20,19,17,0.16)',
        mock: '0 24px 64px -20px rgba(20,19,17,0.35)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
