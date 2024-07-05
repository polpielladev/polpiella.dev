import { z, defineCollection } from 'astro:content'

export const collections = {
  blog: defineCollection({
    schema: z.object({
      title: z.string(),
      excerpt: z.string(),
      pubDate: z.date(),
      tags: z.array(z.string()),
    }),
  }),
  bites: defineCollection({
    schema: z.object({
      title: z.string(),
      excerpt: z.string(),
      pubDate: z.date(),
      category: z.string()
    }),
  }),
  workshops: defineCollection({
    schema: z.object({
      title: z.string()
    }),
  })
}
