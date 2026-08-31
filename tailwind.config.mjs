import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // ── Brand Color Tokens ─────────────────────────────────────────
      colors: {
        // Charcoal — warm near-black; industrial not blue tech-startup
        navy: {
          50:  '#fafaf9',
          100: '#f4f4f3',
          200: '#e8e7e5',
          300: '#d1cfcc',
          400: '#a8a5a0',
          500: '#78756f',
          600: '#5a5752',
          700: '#3a3835',  // borders, dividers
          800: '#242320',  // card surfaces
          900: '#141311',  // deep background
          950: '#0c0b0a',  // page background
        },
        // Ember — burnt amber-orange; forge not stock Tailwind orange
        heat: {
          50:  '#fff8ef',
          100: '#feebd4',
          200: '#fcd3a4',
          300: '#f9a870',
          400: '#f4733a',  // gradient text, icons
          500: '#e85d10',  // primary CTA — richer, more burnt than #f97316
          600: '#c44d0e',  // button hover
          700: '#a03f0f',
          800: '#813310',
          900: '#6b2b0f',
          950: '#3c1507',
        },
        // Slate — neutral UI, text, borders
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
        // Status colors
        success: '#22c55e',
        warning: '#f59e0b',
        danger:  '#ef4444',
        info:    '#3b82f6',
      },

      // ── Typography ─────────────────────────────────────────────────
      fontFamily: {
        // Plus Jakarta Sans — clean geometric, single-story letterforms, no quirky glyphs
        display: ['Plus Jakarta Sans', ...fontFamily.sans],
        // DM Sans — warmer and more characterful than Inter
        body: ['DM Sans', ...fontFamily.sans],
        // Mono: code blocks in docs/blog
        mono: ['JetBrains Mono', ...fontFamily.mono],
      },
      fontSize: {
        // Marketing-scale type sizes (larger than default)
        '5xl':  ['3rem',    { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        '6xl':  ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        '7xl':  ['4.5rem',  { lineHeight: '1.0',  letterSpacing: '-0.03em' }],
        '8xl':  ['6rem',    { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        '9xl':  ['8rem',    { lineHeight: '0.9',  letterSpacing: '-0.04em' }],
      },

      // ── Spacing ────────────────────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '128': '32rem',
        '144': '36rem',
      },

      // ── Border Radius ──────────────────────────────────────────────
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // ── Box Shadows ────────────────────────────────────────────────
      boxShadow: {
        'glow-heat':  '0 0 35px -8px rgba(232, 93, 16, 0.45)',
        'glow-navy':  '0 0 40px -10px rgba(0, 0, 0, 0.7)',
        'card':       '0 1px 3px rgba(0,0,0,0.35), 0 4px 20px -4px rgba(0,0,0,0.3)',
        'card-hover': '0 1px 3px rgba(0,0,0,0.45), 0 8px 32px -6px rgba(0,0,0,0.45)',
      },

      // ── Animation ──────────────────────────────────────────────────
      transitionDuration: {
        '400': '400ms',
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease-out both',
        'fade-in':   'fadeIn 0.5s ease-out both',
        'pulse-heat':'pulseHeat 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseHeat: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
      },

      // ── Backgrounds ────────────────────────────────────────────────
      backgroundImage: {
        'gradient-navy':       'linear-gradient(135deg, #0c0b0a 0%, #141311 40%, #242320 100%)',
        'gradient-heat':       'linear-gradient(135deg, #e85d10 0%, #c44d0e 100%)',
        'gradient-hero':       'radial-gradient(ellipse at 65% 0%, rgba(232,93,16,0.07) 0%, transparent 52%), linear-gradient(180deg, #0c0b0a 0%, #141311 100%)',
        'noise':               "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
