import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Old routes → v2 information architecture (static meta-refresh pages)
const legacyRedirects = {
  '/features': '/how-it-works',
  '/about': '/company',
  '/contact': '/demo',
};

// https://astro.build/config
export default defineConfig({
  site: 'https://www.furnacewatch.io',
  output: 'static',
  redirects: legacyRedirects,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'night-owl',
        wrap: true,
      },
    }),
    sitemap({
      // Exclude admin paths and legacy redirect sources
      filter: (page) =>
        !page.includes('/admin') &&
        !Object.keys(legacyRedirects).some(src => new URL(page).pathname === `${src}/`),
    }),
  ],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'night-owl',
      wrap: true,
    },
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },
    },
  },
});
