import { computed, Ref } from 'vue'

interface Post {
  tags: string[]
}

export function useTags(posts: Ref<Post[]> | Post[]) {
  const allTags = computed(() => {
    const tags = new Set<string>()
    const postArray = Array.isArray(posts) ? posts : posts.value

    postArray.forEach((post) => {
      post.tags.forEach((tag) => {
        tags.add(tag)
      })
    })

    return Array.from(tags).sort()
  })

  const tagCounts = computed(() => {
    const counts = new Map<string, number>()
    const postArray = Array.isArray(posts) ? posts : posts.value

    postArray.forEach((post) => {
      post.tags.forEach((tag) => {
        counts.set(tag, (counts.get(tag) || 0) + 1)
      })
    })

    return counts
  })

  return {
    allTags,
    tagCounts,
  }
}
