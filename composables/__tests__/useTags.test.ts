import { describe, it, expect } from 'vitest'
import { useTags } from '../useTags'

describe('useTags', () => {
  const mockPosts = [
    { tags: ['vue', 'javascript'] },
    { tags: ['typescript', 'javascript'] },
    { tags: ['vue', 'typescript'] },
  ]

  it('extracts all unique tags', () => {
    const { allTags } = useTags(mockPosts)
    expect(allTags.value).toEqual(['javascript', 'typescript', 'vue'])
  })

  it('counts posts per tag', () => {
    const { tagCounts } = useTags(mockPosts)
    expect(tagCounts.value.get('vue')).toBe(2)
    expect(tagCounts.value.get('javascript')).toBe(2)
    expect(tagCounts.value.get('typescript')).toBe(2)
  })

  it('handles empty posts', () => {
    const { allTags, tagCounts } = useTags([])
    expect(allTags.value).toEqual([])
    expect(tagCounts.value.size).toBe(0)
  })
})
