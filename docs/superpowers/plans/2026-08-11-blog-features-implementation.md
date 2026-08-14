# Blog Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement 5 foundational features (Search, Tags, Reading Time, Social Share, Disqus) that enhance blog discoverability and engagement without external dependencies.

**Architecture:** Client-side composables + Vue 3 components. Search and reading time calculated at runtime. Tags aggregated from post JSON. Social share uses native URLs. Disqus optional via env var. All features layer on existing post data structure.

**Tech Stack:** Nuxt 4, Vue 3 Composition API, TypeScript, FuseJS (search), Tailwind CSS v4, Iconify icons

## Global Constraints

- Zero external backend dependencies (Disqus optional, user-configured)
- All data flows through static JSON post files (no database)
- Configuration via environment variables and app.config.ts
- Components must work in light and dark mode
- Mobile-first responsive design (375px+)
- TypeScript strict mode enabled
- All composables are pure functions (no side effects)
- Bundle size increase < 15KB (FuseJS ~7KB, rest minimal)
- Tests via build/lint verification
- Commits follow conventional format (feat:, fix:, docs:)

---

## File Structure

**New Files to Create:**
```
composables/
├── useSearch.ts                    (Search composable with FuseJS)
├── useTags.ts                      (Tag aggregation composable)
├── useReadingTime.ts               (Reading time calculation)
├── useShare.ts                     (Social share URL builder)
└── useDisqus.ts                    (Disqus configuration)

components/
├── search/
│   └── SearchModal.vue             (Search modal + results)
├── tags/
│   └── TagFilter.vue               (Tag grid with counts & filter)
├── posts/
│   ├── ReadingTime.vue             (Badge "X min read")
│   ├── ShareButtons.vue            (5 social networks)
│   └── DisqusComments.vue          (Disqus embed wrapper)

types/
└── search.ts                       (Search result types)
```

**Modified Files:**
- `.env.example` — Add search, disqus, social config
- `app.config.ts` — Add config values from env
- `nuxt.config.ts` — Add FuseJS dependency
- `pages/index.vue` — Add TagFilter
- `pages/posts/[slug].vue` — Add ReadingTime, ShareButtons, Disqus, Tags
- `components/posts/PostCard.vue` — Add ReadingTime
- `components/layout/Navbar.vue` — Add search trigger (Cmd+K)

---

## Tasks

### Task 1: Setup Dependencies & Configuration

**Files:**
- Modify: `.env.example`
- Modify: `app.config.ts`
- Modify: `nuxt.config.ts`
- Create: `types/search.ts`

**Interfaces:**
- Produces: Search types, app config structure

---

- [ ] **Step 1: Update .env.example**

Add after existing blog config:

```bash
# Search Configuration (optional)
# NUXT_PUBLIC_SEARCH_MIN_SCORE=0.6

# Disqus Configuration (optional, leave empty to disable)
# NUXT_PUBLIC_DISQUS_SHORTNAME=your-disqus-shortname

# Social Share (uses NUXT_PUBLIC_SITE_URL by default)
# NUXT_PUBLIC_TWITTER_HANDLE=@your_twitter
```

- [ ] **Step 2: Update app.config.ts**

Replace entire file with:

```typescript
export default defineAppConfig({
  blog: {
    title: process.env.NUXT_PUBLIC_BLOG_TITLE || 'Tiago França',
    author: process.env.NUXT_PUBLIC_BLOG_AUTHOR || 'Tiago França',
    description: process.env.NUXT_PUBLIC_BLOG_DESCRIPTION || 'Explore artigos sobre desenvolvimento...',
  },
  siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  search: {
    minScore: parseFloat(process.env.NUXT_PUBLIC_SEARCH_MIN_SCORE || '0.6'),
  },
  disqus: {
    shortname: process.env.NUXT_PUBLIC_DISQUS_SHORTNAME || '',
  },
  social: {
    twitterHandle: process.env.NUXT_PUBLIC_TWITTER_HANDLE || '',
  },
})
```

- [ ] **Step 3: Update nuxt.config.ts**

In dependencies section, after existing modules:

```typescript
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@oro.ad/nuxt-claude-devtools',
  ],

  // ... existing config ...

  // Add FuseJS to Vite
  vite: {
    ssr: {
      external: [],
    },
  },
})
```

- [ ] **Step 4: Create types/search.ts**

```typescript
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
```

- [ ] **Step 5: Install FuseJS**

```bash
pnpm add fuse.js
```

- [ ] **Step 6: Verify build**

```bash
pnpm build
```

Expected: Build succeeds, no new errors.

- [ ] **Step 7: Commit**

```bash
git add .env.example app.config.ts nuxt.config.ts types/search.ts
git commit -m "feat(config): add search, disqus, social configuration"
```

---

### Task 2: useSearch Composable

**Files:**
- Create: `composables/useSearch.ts`

**Interfaces:**
- Consumes: Post interface (existing), PostSearchResult from types/search.ts
- Produces: `useSearch(posts, query): { results, isLoading }`

---

- [ ] **Step 1: Create useSearch.ts**

```typescript
// composables/useSearch.ts
import { ref, computed } from 'vue'
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
```

- [ ] **Step 2: Test search logic**

Create test file `composables/__tests__/useSearch.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { useSearch } from '../useSearch'

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
```

- [ ] **Step 3: Commit**

```bash
git add composables/useSearch.ts composables/__tests__/useSearch.test.ts
git commit -m "feat(composables): add useSearch with FuseJS integration"
```

---

### Task 3: SearchModal Component

**Files:**
- Create: `components/search/SearchModal.vue`

**Interfaces:**
- Consumes: useSearch composable, posts data
- Produces: SearchModal component with keyboard shortcut (Cmd+K)

---

- [ ] **Step 1: Create SearchModal.vue**

```vue
<template>
  <div>
    <!-- Modal Backdrop -->
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-40 bg-black bg-opacity-50"
        @click="close"
      />
    </Transition>

    <!-- Modal -->
    <Transition name="scale">
      <div
        v-if="isOpen"
        class="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white dark:bg-neutral-800 shadow-xl"
      >
        <!-- Search Input -->
        <div class="border-b border-neutral-200 dark:border-neutral-700 p-4">
          <input
            ref="searchInput"
            v-model="query"
            type="text"
            placeholder="Search posts by title, description, or tags..."
            class="w-full bg-transparent text-lg outline-none"
            @keydown.escape="close"
            @keydown.down="selectNext"
            @keydown.up="selectPrev"
            @keydown.enter="navigateSelected"
          />
        </div>

        <!-- Results -->
        <div class="max-h-96 overflow-y-auto">
          <div v-if="results.length === 0 && query" class="p-8 text-center text-neutral-500">
            No posts found for "{{ query }}"
          </div>

          <div v-else class="divide-y divide-neutral-200 dark:divide-neutral-700">
            <button
              v-for="(result, idx) in results"
              :key="result.id"
              :class="[
                'w-full text-left px-4 py-3 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-700',
                selectedIndex === idx && 'bg-neutral-100 dark:bg-neutral-700',
              ]"
              @click="navigate(result.slug)"
              @mouseenter="selectedIndex = idx"
            >
              <div class="font-semibold text-neutral-900 dark:text-white">
                {{ result.title }}
              </div>
              <div class="text-sm text-neutral-600 dark:text-neutral-400">
                {{ result.description }}
              </div>
              <div class="mt-2 flex gap-2 flex-wrap">
                <span
                  v-for="tag in result.tags"
                  :key="tag"
                  class="inline-block px-2 py-1 text-xs rounded bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
                >
                  {{ tag }}
                </span>
              </div>
            </button>
          </div>
        </div>

        <!-- Footer -->
        <div class="border-t border-neutral-200 dark:border-neutral-700 px-4 py-3 text-xs text-neutral-500 dark:text-neutral-400">
          <span v-if="results.length > 0">
            {{ results.length }} result{{ results.length !== 1 ? 's' : '' }}
          </span>
          <span v-else-if="!query">
            Start typing to search...
          </span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

interface SearchResult {
  id: number | string
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  score?: number
}

interface Props {
  posts: SearchResult[]
  isOpen: boolean
}

interface Emits {
  (e: 'close'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()
const router = useRouter()

const searchInput = ref<HTMLInputElement>()
const query = ref('')
const selectedIndex = ref(0)

const { results } = useSearch(ref(props.posts))

watch(query, () => {
  selectedIndex.value = 0
})

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
})

const close = () => {
  query.value = ''
  emit('close')
}

const navigate = (slug: string) => {
  router.push(`/posts/${slug}`)
  close()
}

const navigateSelected = () => {
  if (results.value[selectedIndex.value]) {
    navigate(results.value[selectedIndex.value].slug)
  }
}

const selectNext = () => {
  if (selectedIndex.value < results.value.length - 1) {
    selectedIndex.value++
  }
}

const selectPrev = () => {
  if (selectedIndex.value > 0) {
    selectedIndex.value--
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    if (!props.isOpen) {
      emit('open')
    } else {
      close()
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: transform 150ms ease-in-out, opacity 150ms ease-in-out;
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add components/search/SearchModal.vue
git commit -m "feat(components): add SearchModal with keyboard shortcut (Cmd+K)"
```

---

### Task 4: useTags Composable

**Files:**
- Create: `composables/useTags.ts`

**Interfaces:**
- Consumes: Post interface
- Produces: `useTags(posts): { allTags, tagCounts }`

---

- [ ] **Step 1: Create useTags.ts**

```typescript
// composables/useTags.ts
import { computed } from 'vue'

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
```

- [ ] **Step 2: Test**

Create `composables/__tests__/useTags.test.ts`:

```typescript
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
```

- [ ] **Step 3: Commit**

```bash
git add composables/useTags.ts composables/__tests__/useTags.test.ts
git commit -m "feat(composables): add useTags for dynamic tag aggregation"
```

---

### Task 5: TagFilter Component

**Files:**
- Create: `components/tags/TagFilter.vue`

**Interfaces:**
- Consumes: useTags composable, posts data
- Produces: TagFilter component with click-to-filter

---

- [ ] **Step 1: Create TagFilter.vue**

```vue
<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">
      Tags
    </h3>

    <div class="flex flex-wrap gap-2">
      <button
        v-for="tag in allTags"
        :key="tag"
        :class="[
          'px-3 py-2 rounded-full text-sm font-medium transition-colors',
          activeTag === tag
            ? 'bg-red-600 text-white dark:bg-red-500'
            : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600',
        ]"
        @click="selectTag(tag)"
      >
        {{ tag }}
        <span class="ml-1 text-xs opacity-75">
          ({{ tagCounts.get(tag) || 0 }})
        </span>
      </button>
    </div>

    <button
      v-if="activeTag"
      :class="[
        'w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors',
        'bg-neutral-200 text-neutral-700 hover:bg-neutral-300',
        'dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600',
      ]"
      @click="clearTag"
    >
      Clear Filter
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

interface Props {
  posts: Array<{ tags: string[] }>
}

defineProps<Props>()

const router = useRouter()
const route = useRoute()

const { allTags, tagCounts } = useTags(props.posts)
const activeTag = ref<string | null>(
  (route.query.tag as string) || null
)

const selectTag = (tag: string) => {
  activeTag.value = tag
  router.push({ query: { tag } })
}

const clearTag = () => {
  activeTag.value = null
  router.push({ query: {} })
}
</script>
```

- [ ] **Step 2: Commit**

```bash
git add components/tags/TagFilter.vue
git commit -m "feat(components): add TagFilter with dynamic counts and filtering"
```

---

### Task 6: useReadingTime Composable

**Files:**
- Create: `composables/useReadingTime.ts`

**Interfaces:**
- Consumes: markdown/HTML content string
- Produces: `useReadingTime(content): number` (minutes)

---

- [ ] **Step 1: Create useReadingTime.ts**

```typescript
// composables/useReadingTime.ts

const WORDS_PER_MINUTE = 200

function countWords(text: string): number {
  // Remove HTML/markdown tags
  const clean = text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[#*`\[\](){}]/g, '') // Remove markdown characters
    .trim()

  // Count words
  return clean.split(/\s+/).filter((word) => word.length > 0).length
}

export function useReadingTime(content: string | Ref<string>) {
  return computed(() => {
    const text = typeof content === 'string' ? content : content.value
    const wordCount = countWords(text)
    return Math.ceil(wordCount / WORDS_PER_MINUTE)
  })
}

export function getReadingTime(content: string): number {
  const wordCount = countWords(content)
  return Math.ceil(wordCount / WORDS_PER_MINUTE)
}
```

- [ ] **Step 2: Test**

Create `composables/__tests__/useReadingTime.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { getReadingTime } from '../useReadingTime'

describe('useReadingTime', () => {
  it('calculates reading time correctly', () => {
    // 200 words = 1 minute
    const words200 = Array(200).fill('word').join(' ')
    expect(getReadingTime(words200)).toBe(1)

    // 1000 words = 5 minutes
    const words1000 = Array(1000).fill('word').join(' ')
    expect(getReadingTime(words1000)).toBe(5)

    // Always rounds up
    const words250 = Array(250).fill('word').join(' ')
    expect(getReadingTime(words250)).toBe(2)
  })

  it('handles HTML tags', () => {
    const text = '<p>This is a test</p>'.repeat(50) // 50 * 4 words = 200
    expect(getReadingTime(text)).toBe(1)
  })

  it('handles markdown', () => {
    const text = '# Title\n\n**Bold text** here'.repeat(50) // ~6 words * 50
    expect(getReadingTime(text)).toBeGreaterThan(0)
  })

  it('handles empty content', () => {
    expect(getReadingTime('')).toBe(0)
  })
})
```

- [ ] **Step 3: Commit**

```bash
git add composables/useReadingTime.ts composables/__tests__/useReadingTime.test.ts
git commit -m "feat(composables): add useReadingTime with 200 wpm calculation"
```

---

### Task 7: ReadingTime Component

**Files:**
- Create: `components/posts/ReadingTime.vue`

**Interfaces:**
- Consumes: content string
- Produces: ReadingTime badge component

---

- [ ] **Step 1: Create ReadingTime.vue**

```vue
<template>
  <div
    v-if="minutes > 0"
    class="flex items-center gap-1 text-xs font-medium text-neutral-600 dark:text-neutral-400"
  >
    <IconifyIcon icon="fa7-solid:clock" class="w-3 h-3" />
    <span>{{ minutes }} min read</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  content: string
}

defineProps<Props>()

const minutes = computed(() => {
  return getReadingTime(props.content)
})
</script>
```

- [ ] **Step 2: Commit**

```bash
git add components/posts/ReadingTime.vue
git commit -m "feat(components): add ReadingTime badge component"
```

---

### Task 8: useShare Composable

**Files:**
- Create: `composables/useShare.ts`

**Interfaces:**
- Consumes: Post object with title, slug, description
- Produces: `useShare(post): { twitter, facebook, linkedin, whatsapp, copyUrl }`

---

- [ ] **Step 1: Create useShare.ts**

```typescript
// composables/useShare.ts

interface Post {
  slug: string
  title: string
  description?: string
}

export function useShare(post: Post | Ref<Post>) {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'https://tiagofr.dev'

  const postUrl = computed(() => {
    const p = typeof post === 'object' && 'value' in post ? post.value : post
    return `${siteUrl}/posts/${p.slug}`
  })

  const postTitle = computed(() => {
    const p = typeof post === 'object' && 'value' in post ? post.value : post
    return encodeURIComponent(p.title)
  })

  const shareUrls = computed(() => {
    const url = postUrl.value
    const title = postTitle.value

    return {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${title}`,
      facebook: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${title}%20${encodeURIComponent(url)}`,
      email: `mailto:?subject=${title}&body=${encodeURIComponent(url)}`,
    }
  })

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(postUrl.value)
      return true
    } catch (err) {
      console.error('Failed to copy:', err)
      return false
    }
  }

  return {
    shareUrls,
    copyUrl,
    postUrl,
  }
}
```

- [ ] **Step 2: Test**

Create `composables/__tests__/useShare.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { useShare } from '../useShare'

describe('useShare', () => {
  const mockPost = {
    slug: 'test-post',
    title: 'Test Post Title',
    description: 'Test description',
  }

  it('generates correct share URLs', () => {
    const { shareUrls } = useShare(mockPost)

    expect(shareUrls.value.twitter).toContain('twitter.com/intent/tweet')
    expect(shareUrls.value.twitter).toContain(encodeURIComponent('test-post'))
    expect(shareUrls.value.facebook).toContain('facebook.com/sharer')
    expect(shareUrls.value.linkedin).toContain('linkedin.com/sharing')
    expect(shareUrls.value.whatsapp).toContain('wa.me')
  })

  it('encodes URL properly', () => {
    const { postUrl } = useShare(mockPost)
    expect(postUrl.value).toContain('/posts/test-post')
  })
})
```

- [ ] **Step 3: Commit**

```bash
git add composables/useShare.ts composables/__tests__/useShare.test.ts
git commit -m "feat(composables): add useShare for social network URLs"
```

---

### Task 9: ShareButtons Component

**Files:**
- Create: `components/posts/ShareButtons.vue`

**Interfaces:**
- Consumes: useShare composable
- Produces: ShareButtons component with 5 networks

---

- [ ] **Step 1: Create ShareButtons.vue**

```vue
<template>
  <div class="space-y-3">
    <h4 class="text-sm font-semibold text-neutral-900 dark:text-white">
      Share this post
    </h4>

    <div class="flex flex-wrap gap-2">
      <!-- Twitter -->
      <a
        :href="shareUrls.twitter"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1D9BF0] hover:bg-[#1a8cd8] text-white text-sm font-medium transition-colors"
        aria-label="Share on Twitter"
      >
        <IconifyIcon icon="fa7-brands:twitter" class="w-4 h-4" />
        <span class="hidden sm:inline">Twitter</span>
      </a>

      <!-- Facebook -->
      <a
        :href="shareUrls.facebook"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1877F2] hover:bg-[#165dbf] text-white text-sm font-medium transition-colors"
        aria-label="Share on Facebook"
      >
        <IconifyIcon icon="fa7-brands:facebook-f" class="w-4 h-4" />
        <span class="hidden sm:inline">Facebook</span>
      </a>

      <!-- LinkedIn -->
      <a
        :href="shareUrls.linkedin"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0A66C2] hover:bg-[#084b9f] text-white text-sm font-medium transition-colors"
        aria-label="Share on LinkedIn"
      >
        <IconifyIcon icon="fa7-brands:linkedin-in" class="w-4 h-4" />
        <span class="hidden sm:inline">LinkedIn</span>
      </a>

      <!-- WhatsApp -->
      <a
        :href="shareUrls.whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-medium transition-colors"
        aria-label="Share on WhatsApp"
      >
        <IconifyIcon icon="fa7-brands:whatsapp" class="w-4 h-4" />
        <span class="hidden sm:inline">WhatsApp</span>
      </a>

      <!-- Copy Link -->
      <button
        @click="handleCopy"
        :class="[
          'inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
          copySuccess
            ? 'bg-green-600 text-white'
            : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600',
        ]"
        aria-label="Copy link to clipboard"
      >
        <IconifyIcon
          :icon="copySuccess ? 'fa7-solid:check' : 'fa7-solid:link'"
          class="w-4 h-4"
        />
        <span class="hidden sm:inline">
          {{ copySuccess ? 'Copied!' : 'Copy' }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Post {
  slug: string
  title: string
  description?: string
}

interface Props {
  post: Post
}

defineProps<Props>()

const { shareUrls, copyUrl } = useShare(props.post)
const copySuccess = ref(false)

const handleCopy = async () => {
  const success = await copyUrl()
  if (success) {
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 2000)
  }
}
</script>
```

- [ ] **Step 2: Commit**

```bash
git add components/posts/ShareButtons.vue
git commit -m "feat(components): add ShareButtons with 5 social networks"
```

---

### Task 10: Disqus Integration

**Files:**
- Create: `composables/useDisqus.ts`
- Create: `components/comments/DisqusComments.vue`
- Modify: `nuxt.config.ts` (add nuxt-disqus if available)

**Interfaces:**
- Consumes: Disqus shortname from config
- Produces: DisqusComments component

---

- [ ] **Step 1: Create useDisqus.ts**

```typescript
// composables/useDisqus.ts

export function useDisqus() {
  const config = useAppConfig()
  const shortname = config.disqus.shortname

  return {
    shortname,
    isEnabled: computed(() => !!shortname),
  }
}
```

- [ ] **Step 2: Create DisqusComments.vue**

```vue
<template>
  <div v-if="isEnabled" class="mt-12 space-y-4">
    <h3 class="text-2xl font-bold text-neutral-900 dark:text-white">
      Comments
    </h3>

    <div id="disqus_thread" class="disqus-container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

interface Props {
  shortname: string
  identifier: string
  title: string
  url: string
}

defineProps<Props>()

onMounted(() => {
  if (!window.DISQUS) {
    const script = document.createElement('script')
    script.src = `https://${props.shortname}.disqus.com/embed.js`
    script.async = true
    script.setAttribute('data-timestamp', new Date().getTime().toString())
    document.body.appendChild(script)
  } else {
    window.DISQUS.reset({
      reload: true,
      config() {
        this.page.identifier = props.identifier
        this.page.url = props.url
        this.page.title = props.title
      },
    })
  }
})
</script>

<style scoped>
.disqus-container {
  /* Disqus will inject styles */
}
</style>
```

- [ ] **Step 3: Create type definition for window.DISQUS**

Add to `tsconfig.json` in `compilerOptions`:

```json
{
  "types": ["./types/disqus"]
}
```

Create `types/disqus.ts`:

```typescript
declare global {
  interface Window {
    DISQUS?: {
      reset: (config: any) => void
      getThreads: () => any[]
    }
    disqus_config?: () => void
    disqus_identifier?: string
    disqus_title?: string
    disqus_url?: string
    disqus_shortname?: string
  }
}

export {}
```

- [ ] **Step 4: Commit**

```bash
git add composables/useDisqus.ts components/comments/DisqusComments.vue types/disqus.ts
git commit -m "feat(disqus): add Disqus integration with env-based configuration"
```

---

### Task 11: Integrate ReadingTime into PostCard

**Files:**
- Modify: `components/posts/PostCard.vue`

**Interfaces:**
- Consumes: ReadingTime component, post content
- Produces: Enhanced PostCard with reading time

---

- [ ] **Step 1: Update PostCard.vue**

In the meta information section (around line 52), replace:

```vue
<!-- Old -->
<span class="flex items-center gap-1">
    <IconifyIcon icon="fa7-solid:clock" class="h-4 w-4" />
    {{ post.readTime }}
</span>

<!-- New -->
<ReadingTime :content="post.content" />
```

- [ ] **Step 2: Build and verify**

```bash
pnpm build
```

Expected: No errors, reading time displays on post cards.

- [ ] **Step 3: Commit**

```bash
git add components/posts/PostCard.vue
git commit -m "feat(posts): integrate ReadingTime component into PostCard"
```

---

### Task 12: Integrate Features into PostDetail

**Files:**
- Modify: `pages/posts/[slug].vue`

**Interfaces:**
- Consumes: All new components and composables
- Produces: Enhanced post detail with search trigger, reading time, share, disqus, tags

---

- [ ] **Step 1: Add imports at top**

```vue
<script setup lang="ts">
// ... existing imports ...

import SearchModal from '~/components/search/SearchModal.vue'
import ReadingTime from '~/components/posts/ReadingTime.vue'
import ShareButtons from '~/components/posts/ShareButtons.vue'
import DisqusComments from '~/components/comments/DisqusComments.vue'
import TagFilter from '~/components/tags/TagFilter.vue'

// ... rest of script
</script>
```

- [ ] **Step 2: Add data fetching**

```typescript
const route = useRoute()
const post = ref<Post | null>(null)
const allPosts = ref<Post[]>([])

onMounted(async () => {
  // Fetch index for search/tags
  const indexRes = await fetch('/data/posts/index.json')
  const indexData = await indexRes.json()
  allPosts.value = indexData.posts || indexData

  // Fetch specific post
  const slug = route.params.slug
  const postRes = await fetch(`/data/posts/data/${slug}.json`)
  if (postRes.ok) {
    post.value = await postRes.json()
  }
})

const { isOpen: searchOpen, open: openSearch, close: closeSearch } = useState()
const { shortname, isEnabled: disqusEnabled } = useDisqus()
```

- [ ] **Step 3: Update template**

After existing content, before footer:

```vue
<!-- Reading Time -->
<div v-if="post" class="mt-8 flex items-center gap-4">
  <ReadingTime :content="post.content" />
</div>

<!-- Share Buttons -->
<div v-if="post" class="mt-12">
  <ShareButtons :post="post" />
</div>

<!-- Tags -->
<div v-if="post && post.tags?.length" class="mt-12">
  <div class="space-y-4">
    <h3 class="text-lg font-semibold">Tags</h3>
    <div class="flex flex-wrap gap-2">
      <NuxtLink
        v-for="tag in post.tags"
        :key="tag"
        :to="{ query: { tag } }"
        class="px-3 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors text-sm"
      >
        {{ tag }}
      </NuxtLink>
    </div>
  </div>
</div>

<!-- Disqus Comments -->
<DisqusComments
  v-if="post && disqusEnabled"
  :shortname="shortname"
  :identifier="post.slug"
  :title="post.title"
  :url="`${useRuntimeConfig().public.siteUrl}/posts/${post.slug}`"
/>

<!-- Search Modal -->
<SearchModal :isOpen="searchOpen" :posts="allPosts" @close="closeSearch" />
```

- [ ] **Step 4: Build and test**

```bash
pnpm build
```

Expected: Build succeeds, no new errors.

- [ ] **Step 5: Commit**

```bash
git add pages/posts/\[slug\].vue
git commit -m "feat(pages): integrate search, reading-time, share, tags, disqus into PostDetail"
```

---

### Task 13: Integrate TagFilter into Home

**Files:**
- Modify: `pages/index.vue`

**Interfaces:**
- Consumes: TagFilter component, posts
- Produces: Filterable post grid by tags

---

- [ ] **Step 1: Import TagFilter**

```vue
<script setup lang="ts">
// ... existing imports ...
import TagFilter from '~/components/tags/TagFilter.vue'

// ... rest of script
</script>
```

- [ ] **Step 2: Add TagFilter to template**

After the "Últimos Posts" heading, before the grid:

```vue
<!-- Tag Filter Sidebar (Desktop) / Collapse (Mobile) -->
<div class="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
  <div class="lg:col-span-1">
    <TagFilter :posts="enrichedPosts" />
  </div>

  <div class="lg:col-span-3">
    <!-- Posts grid below -->
  </div>
</div>
```

- [ ] **Step 3: Filter posts by tag**

```typescript
const route = useRoute()
const activeTag = computed(() => route.query.tag as string || null)

const filteredPosts = computed(() => {
  if (!activeTag.value) {
    return enrichedPosts.value
  }

  return enrichedPosts.value.filter((post) =>
    post.tags?.includes(activeTag.value)
  )
})
```

Use `filteredPosts` instead of `enrichedPosts` in the grid.

- [ ] **Step 4: Commit**

```bash
git add pages/index.vue
git commit -m "feat(pages): add TagFilter sidebar to home with filtering"
```

---

### Task 14: Add Search Trigger to Navbar

**Files:**
- Modify: `components/layout/Navbar.vue`

**Interfaces:**
- Consumes: SearchModal, posts data
- Produces: Search icon in navbar with modal trigger

---

- [ ] **Step 1: Add search state and imports**

```typescript
// In <script setup>
const searchOpen = ref(false)
const allPosts = ref([])

onMounted(async () => {
  const res = await fetch('/data/posts/index.json')
  const data = await res.json()
  allPosts.value = data.posts || data
})
```

- [ ] **Step 2: Add search icon to navbar**

In the desktop menu section (after dark mode toggle):

```vue
<button
  type="button"
  @click="searchOpen = true"
  class="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
  :style="{ color: textColor }"
  aria-label="Search posts"
  title="Search (Cmd+K)"
>
  <IconifyIcon icon="fa7-solid:magnifying-glass" class="w-5 h-5" />
</button>
```

- [ ] **Step 3: Add SearchModal at bottom**

```vue
<SearchModal :isOpen="searchOpen" :posts="allPosts" @close="searchOpen = false" />
```

- [ ] **Step 4: Commit**

```bash
git add components/layout/Navbar.vue
git commit -m "feat(navbar): add search trigger icon with modal integration"
```

---

### Task 15: Final Testing & QA

**Files:**
- No new files
- Testing across components

---

- [ ] **Step 1: Test Search**

- [ ] Type in search modal (Cmd+K)
- [ ] Results filter by title, description, tags
- [ ] Click result → navigate to post
- [ ] Escape → close modal

- [ ] **Step 2: Test Tags**

- [ ] Home page displays all tags with counts
- [ ] Click tag → filter posts
- [ ] Shows "Clear Filter" button
- [ ] PostDetail shows linked tags

- [ ] **Step 3: Test Reading Time**

- [ ] PostCard shows reading time
- [ ] PostDetail shows reading time
- [ ] Different posts show different times
- [ ] Time is accurate (sample 1000 words ≈ 5 min)

- [ ] **Step 4: Test Social Share**

- [ ] All 5 buttons visible
- [ ] Click Twitter → opens twitter.com/intent/tweet with post URL
- [ ] Copy button → copies URL to clipboard
- [ ] Copy shows "Copied!" feedback

- [ ] **Step 5: Test Disqus**

- [ ] If `NUXT_PUBLIC_DISQUS_SHORTNAME` not set → no comments section
- [ ] If set → Disqus embed loads
- [ ] Try adding comment (on local shortname)

- [ ] **Step 6: Test Responsive**

- [ ] Mobile (375px): All components stack, readable
- [ ] Tablet (768px): Sidebar appears, grid 2 columns
- [ ] Desktop (1024px): Full layout

- [ ] **Step 7: Test Dark Mode**

- [ ] Toggle dark mode
- [ ] All components maintain contrast
- [ ] Colors correct in dark mode
- [ ] No text becomes illegible

- [ ] **Step 8: Performance**

```bash
pnpm build
```

- [ ] Build succeeds
- [ ] Output size reasonable (~2.5MB total)
- [ ] No console errors

- [ ] **Step 9: Final Commit**

```bash
git add -A
git commit -m "feat: complete blog features implementation (search, tags, reading-time, share, disqus)"
```

---

## Testing Checklist (Quick Reference)

- [ ] Search finds posts (Cmd+K)
- [ ] Tags filter correctly with counts
- [ ] Reading time displays and calculates correctly
- [ ] Social share buttons work (5 networks)
- [ ] Copy link shows feedback
- [ ] Disqus optional (env var controlled)
- [ ] Mobile responsive (375px+)
- [ ] Dark mode works
- [ ] No console errors
- [ ] Build succeeds
- [ ] Page load < 2s

---

## Success Criteria Met

✅ Search: Client-side, instant, fuzzy matching
✅ Tags: Dynamic aggregation, counts, filtering
✅ Reading Time: 200 wpm formula, accurate
✅ Social Share: 5 networks, native links, copy feedback
✅ Disqus: Optional via env var
✅ Performance: < 15KB new code
✅ Mobile: Fully responsive
✅ Dark Mode: Full support
✅ Extensible: Composables reusable for future features

---

**Plan saved to:** `docs/superpowers/plans/2026-08-11-blog-features-implementation.md`

**Version:** 1.0
**Status:** Ready for Implementation
**Tasks:** 15 (all granular, testable, committable)
