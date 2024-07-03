import { defineCollection, z } from 'astro:content'

const postCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date(),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    cover: z.string().optional(),
    copyright: z.string().optional(),
    excerpt: z.string().optional(),
    sticky: z.boolean().optional(),
  }),
})

export const collections = {
  posts: postCollection,
}
