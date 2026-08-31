import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.furnacewatch.io',
  output: 'static',
  integrations: [
    tailwind({
      // Allow Tailwind utility classes to be used in .astro, .mdx, .ts files
      applyBaseStyles: false,
    }),
    mdx({
      // MDX for blog posts and documentation
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'night-owl',
        wrap: true,
      },
    }),
    sitemap({
      // Exclude admin and private paths from sitemap
      filter: (page) => !page.includes('/admin'),
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
          // Hash filenames for cache-busting on CDN
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },
    },
  },
});
