import { defineCollection, z } from 'astro:content'

const postCollection = defineCollection({
  type: 'content',
  schema: {
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    cover: z.string().optional(),
    copyright: z.string().optional(),
  },
})

export const collections = {
  posts: postCollection,
}
