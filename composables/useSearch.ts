import { ref, computed, watchEffect, toValue } from 'vue'
import Fuse from 'fuse.js'

interface Post {
  id: number | string
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
}

export function useSearch(posts: Post[]) {
  const query = ref('')
  const fuseIndex = ref<Fuse<Post> | null>(null)

  const config = useAppConfig()
  const minScore = config.search.minScore

  watchEffect(() => {
    const postsArray = toValue(posts)

    if (postsArray && postsArray.length > 0) {
      fuseIndex.value = new Fuse(postsArray, {
        keys: ['title', 'description', 'tags'],
        threshold: 1 - minScore,
        includeScore: true,
      })
    }
  })

  const results = computed(() => {
    if (!query.value.trim() || !fuseIndex.value) {
      return []
    }

    return fuseIndex.value
      .search(query.value)
      .map((result) => ({
        ...result.item,
        score: result.score,
      }))
  })

  return {
    query,
    results,
  }
}
