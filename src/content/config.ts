import { defineCollection, z } from 'astro:content';

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

// ── Documentation ───────────────────────────────────────────────────────────
const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().default(0),
    section: z.enum([
      'Getting Started',
      'Installation',
      'Platform Overview',
      'Devices & Sensors',
      'Alerts & Notifications',
      'Intelligence & ML',
      'Integrations',
      'API Reference',
      'Administration',
      'Troubleshooting',
    ]),
    badge: z.enum(['New', 'Beta', 'Deprecated']).optional(),
    draft: z.boolean().default(false),
  }),
});

// ── Team Members (used on /about page) ─────────────────────────────────────
const team = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    title: z.string(),
    bio: z.string(),
    image: z.string().optional(),
    linkedin: z.string().url().optional(),
    twitter: z.string().optional(),
    order: z.number().default(0),
  }),
});

// ── Customer Case Studies (used on /customers page) ─────────────────────────
const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string(),
    industry: z.string(),
    location: z.string(),
    logoImage: z.string().optional(),
    heroImage: z.string().optional(),
    summary: z.string(),
    metrics: z.array(z.object({
      label: z.string(),
      value: z.string(),
      description: z.string().optional(),
    })).default([]),
    publishDate: z.coerce.date(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, docs, team, caseStudies };
