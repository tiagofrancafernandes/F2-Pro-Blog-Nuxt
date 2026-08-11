export interface PostSearchResult {
  id: string | number
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  score?: number
}

export interface SearchIndex {
  title: string
  description: string
  tags: string[]
}
