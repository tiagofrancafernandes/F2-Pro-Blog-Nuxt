import { ref, computed, onMounted } from 'vue'
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

  onMounted(() => {
    if (!fuseIndex.value) {
      fuseIndex.value = new Fuse(posts, {
        keys: [
          { name: 'title', weight: 3 },
          { name: 'description', weight: 2 },
          { name: 'tags', weight: 1 },
        ],
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
