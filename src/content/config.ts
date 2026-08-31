import { defineCollection, z } from 'astro:content';

// Only collections with real content are declared — astro check cannot
// generate types for an empty collection folder on a cold checkout, which
// breaks CI. When the install guide lands (REDESIGN_PLAN Phase 5), add a
// `docs` collection together with its first .mdx page in the same commit.

// ── Blog Posts ──────────────────────────────────────────────────────────────
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('FurnaceWatch Team'),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    category: z.enum([
      'Product Update',
      'Engineering',
      'HVAC Industry',
      'Case Study',
      'Company News',
    ]),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
