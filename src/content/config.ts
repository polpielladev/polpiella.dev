import { z, defineCollection } from "astro:content"

export const collections = {
  'blog': defineCollection({
    schema: z.object({
      title: z.string(),
      excerpt: z.string(),
      pubDate: z.date()
    })
  }),
  'newsletter': defineCollection({
    schema: z.object({
      number: z.number(),
      date: z.date()
    })
  }),
}