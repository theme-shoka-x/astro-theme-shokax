import { getCollection } from 'astro:content'

export async function getCategoriesCount() {
  const categories = await getCollection('posts', ({ data }) => {
    return !!data.categories
  })
  const cateSet = new Set<string>()
  categories.forEach((post) => {
    if (post.data.categories) {
      post.data.categories.forEach((cate) => {
        cateSet.add(cate)
      })
    }
  })
  return cateSet.size
}

export async function getTagsCount() {
  const tags = await getCollection('posts', ({ data }) => {
    return !!data.tags
  })
  const tagSet = new Set<string>()
  tags.forEach((post) => {
    if (post.data.tags) {
      post.data.tags.forEach((tag) => {
        tagSet.add(tag)
      })
    }
  })
  return tagSet.size
}
