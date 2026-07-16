// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define a schema for projects
const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    technologies: z.array(z.string()),
    hasWriteup: z.boolean().default(false),
    externalUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    githubUrl: z.string().url().optional(),
    blogUrl: z.string().optional(),
    featured: z.boolean().default(false),
    status: z.enum(['completed', 'in-progress', 'planned']),
    startDate: z.string().transform((str) => new Date(str)),
    endDate: z.string().transform((str) => new Date(str)).optional(),
    category: z.string(),
  })
});

// 3. Define a schema for blog posts
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string().transform((str) => new Date(str)),
    updatedDate: z.string().transform((str) => new Date(str)).optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    hideFromLatest: z.boolean().default(false),
  }),
});

// 4. Define a schema for creative content
const creativesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string().transform((str) => new Date(str)),
    updatedDate: z.string().transform((str) => new Date(str)).optional(),
    category: z.enum(['poem', 'story', 'quote', 'thought']),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

// 5. Export collections
export const collections = {
  'projects': projectsCollection,
  'blog': blogCollection,
  'creatives': creativesCollection,
};
