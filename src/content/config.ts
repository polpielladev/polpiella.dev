import { z, defineCollection } from 'astro:content'

export const collections = {
  blog: defineCollection({
    schema: z.object({
      title: z.string(),
      excerpt: z.string(),
      pubDate: z.date(),
    }),
  }),
  bites: defineCollection({
    schema: z.object({
      title: z.string(),
      excerpt: z.string(),
      pubDate: z.date(),
      category: z.string()
    }),
  })
}
