import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useSearch } from '../useSearch'

// Mock useAppConfig
vi.mock('#app', () => ({
  useAppConfig: () => ({
    search: {
      minScore: 0.6,
    },
  }),
}))

describe('useSearch', () => {
  const mockPosts = [
    {
      id: 1,
      slug: 'post-1',
      title: 'Vue 3 Basics',
      description: 'Learn Vue 3 fundamentals',
      category: 'frontend',
      tags: ['vue', 'javascript'],
    },
    {
      id: 2,
      slug: 'post-2',
      title: 'TypeScript Guide',
      description: 'Master TypeScript',
      category: 'backend',
      tags: ['typescript', 'javascript'],
    },
  ]

  it('returns empty array when query is empty', () => {
    const { results, query } = useSearch(mockPosts)
    expect(results.value).toEqual([])
  })

  it('finds posts by title', () => {
    const { results, query } = useSearch(mockPosts)
    query.value = 'Vue'
    expect(results.value.length).toBeGreaterThan(0)
    expect(results.value[0].title).toContain('Vue')
  })

  it('finds posts by tag', () => {
    const { results, query } = useSearch(mockPosts)
    query.value = 'typescript'
    expect(results.value.length).toBeGreaterThan(0)
  })
})
