# Blog Expandível: Features Fundamentais — Design Spec

**Date:** 2026-08-11  
**Status:** Approved  
**Scope:** Search, Tags, Reading Time, Social Share, Disqus Integration  
**Architecture:** Client-side composables + static JSON data  

---

## Executive Summary

Add foundational features to the blog that enhance discoverability, engagement, and UX without introducing external dependencies (except Disqus for comments). All data flows through composables, making the system evolutive—future features (analytics, favorites, email capture) can layer on top without architectural changes.

**Core Principle:** Static data + client-side logic + env vars = scalable, maintainable, zero-backend blog.

---

## Design Decisions

### 1. Search

**Approach:** Client-side full-text search using FuseJS

**Why:**
- No backend required (fits "static" constraint)
- Instant results, better UX than server round-trip
- Fully offline-capable
- Lightweight (~7KB gzipped)

**Index:** Title + Description + Tags (not full content, keeps bundle small)

**UX:** 
- SearchModal component triggered by navbar search icon
- Keyboard shortcut: `Cmd/Ctrl + K`
- Real-time filtering as user types
- Result cards show title, excerpt, tags, category

**Implementation:** `useSearch()` composable + `SearchModal.vue` component

---

### 2. Tags

**Approach:** Extract dynamically from post JSON + render with filter UI

**Why:**
- Tags already exist in post data (no schema change needed)
- Dynamic extraction = no manual sync
- Filtering by tag is core blog UX
- Count shows content density per tag

**Data Flow:**
1. Tags in each post JSON: `"tags": ["vue", "nuxt", "typescript"]`
2. `useTags()` composable aggregates + counts
3. `TagFilter.vue` renders with counts
4. Click tag → filter posts on current page or navigate to `/posts?tag=vue`

**Features:**
- Display all unique tags with post count
- Click to filter/navigate
- Active state highlighting
- Mobile-responsive grid

**Implementation:** `useTags()` composable + `TagFilter.vue` component

---

### 3. Reading Time

**Approach:** Automatic calculation at runtime (not stored in JSON)

**Why:**
- No manual maintenance (calculate once, reuse everywhere)
- Flexible metric (easy to change 200 wpm → 250 wpm later)
- Standard UX signal (users expect it)
- Minimal computation cost (linear scan of text)

**Formula:** 
```
readTime = Math.ceil(wordCount / 200)
// 200 words/minute = Medium's standard
// Always round up: "3 min" not "2.5 min"
```

**Display Locations:**
1. PostCard: "5 min read" badge (right side)
2. PostDetail: "5 min read" near title
3. PostGrid: Optional, kept minimal

**Implementation:** `useReadingTime(content: string)` composable

---

### 4. Social Share

**Approach:** Native share buttons (5 networks) + copy URL

**Why:**
- No tracking/analytics dependency (stays performant)
- Native share = instant, no external service latency
- Simple URLs, battle-tested
- Each button is stateless function

**Networks:**
- Twitter: `twitter.com/intent/tweet?url={url}&text={title}`
- Facebook: `facebook.com/sharer/sharer.php?u={url}`
- LinkedIn: `linkedin.com/sharing/share-offsite/?url={url}`
- WhatsApp: `wa.me/?text={title}%20{url}`
- Copy Link: Client clipboard API

**URL Building:**
- Base: `NUXT_PUBLIC_SITE_URL` (from env)
- Post: `/posts/{slug}`
- Full: `https://yourdomain.com/posts/post-slug`

**UX:**
- Horizontal button group in PostDetail
- Hover tooltip on each button
- Copy link shows toast feedback
- Iconify icons (fa7-brands:twitter, etc)

**Implementation:** `useShare(post)` composable + `ShareButtons.vue` component

---

### 5. Disqus Integration

**Approach:** Optional external integration via env var

**Why:**
- User fulfills requirement (no custom backend for comments)
- Disqus handles moderation, spam, notifications
- Optional = no breaking change if not configured
- Industry standard, battle-tested

**Activation:**
- Env var: `NUXT_PUBLIC_DISQUS_SHORTNAME`
- If empty/missing: comments section hidden (graceful degradation)
- If set: render Disqus embed at bottom of PostDetail

**Setup:**
1. User creates free Disqus account
2. Registers site, gets shortname
3. Sets `NUXT_PUBLIC_DISQUS_SHORTNAME=my-blog-shortname` in `.env`
4. Rebuild and deploy

**Implementation:**
- `nuxt-disqus` package (or custom <iframe> if package unavailable)
- `DisqusComments.vue` component (single responsibility)
- Props: `shortname`, `identifier` (post slug), `title`, `url`

---

## Architecture

### Composables (Business Logic)

Each composable is stateless, pure function, easily testable.

#### `useSearch(posts: Post[], query: string): Post[]`
- Returns filtered posts matching query
- Uses FuseJS for fuzzy matching
- Exports: `const { search, results, loading } = useSearch()`

#### `useTags(posts: Post[]): { tags: string[], counts: Map }`
- Aggregates unique tags from all posts
- Returns tags + count per tag
- Exports: `const { allTags, tagCounts, tagColor } = useTags()`

#### `useReadingTime(content: string): number`
- Takes markdown/HTML content
- Returns reading time in minutes
- Formula: `Math.ceil(wordCount / 200)`
- Exports: `const readTime = useReadingTime(post.content)`

#### `useShare(post: Post): { twitter, facebook, linkedin, whatsapp, copyUrl }`
- Generates share URLs for each network
- Takes base URL from `useRuntimeConfig()`
- Exports: share URLs ready for `href` binding

### Components

#### `SearchModal.vue`
- Modal triggered by navbar search icon or `Cmd+K`
- Input field with FuseJS integration
- Real-time results display
- Click result → navigate to post

#### `TagFilter.vue`
- Grid of tags with post counts
- Click → filter or navigate
- Active state highlighting
- Mobile-responsive layout

#### `ShareButtons.vue`
- Horizontal button group
- 5 buttons: Twitter, Facebook, LinkedIn, WhatsApp, Copy Link
- Iconify icons
- Toast feedback on copy

#### `DisqusComments.vue`
- Wraps Disqus embed
- Props: `shortname`, `identifier`, `title`, `url`
- Conditionally rendered (only if shortname configured)
- Error boundary (graceful fallback if load fails)

#### `ReadingTime.vue`
- Small badge showing "X min read"
- Can be positioned in PostCard or PostDetail
- Calculated on-demand via `useReadingTime`

---

## Data Flow

```
server/data/posts/index.json
    ↓
    ├─ Tags: extracted by useTags()
    ├─ Content: measured by useReadingTime()
    └─ Posts: searched by useSearch()

pages/posts/[slug].vue
    ├─ Fetch post data
    ├─ Calculate readingTime
    ├─ Build share URLs
    ├─ Load Disqus (if configured)
    └─ Render PostDetail with all components

components/
    ├─ SearchModal.vue
    ├─ TagFilter.vue
    ├─ ShareButtons.vue
    ├─ DisqusComments.vue
    └─ ReadingTime.vue
```

---

## Configuration

### Environment Variables

Add to `.env.example`:

```bash
# Blog Configuration
NUXT_PUBLIC_SITE_URL=http://localhost:3000
NUXT_PUBLIC_BLOG_TITLE=Tiago França
NUXT_PUBLIC_BLOG_AUTHOR=Tiago França
NUXT_PUBLIC_BLOG_DESCRIPTION=...

# Search Configuration (optional, defaults built-in)
# NUXT_PUBLIC_SEARCH_MIN_SCORE=0.6

# Disqus Configuration (optional, leave empty to disable)
# NUXT_PUBLIC_DISQUS_SHORTNAME=your-disqus-shortname

# Social Share (optional, uses NUXT_PUBLIC_SITE_URL by default)
# NUXT_PUBLIC_TWITTER_HANDLE=@your_twitter
```

### app.config.ts Changes

```typescript
export default defineAppConfig({
  blog: {
    title: process.env.NUXT_PUBLIC_BLOG_TITLE || 'Tiago França',
    author: process.env.NUXT_PUBLIC_BLOG_AUTHOR || 'Tiago França',
    description: process.env.NUXT_PUBLIC_BLOG_DESCRIPTION || '...',
  },
  search: {
    minScore: parseFloat(process.env.NUXT_PUBLIC_SEARCH_MIN_SCORE || '0.6'),
  },
  disqus: {
    shortname: process.env.NUXT_PUBLIC_DISQUS_SHORTNAME || '',
  },
  siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
})
```

---

## Extensibility

This design is intentionally thin on the first iteration—room to grow:

**Future Features (No architectural changes needed):**
- Analytics: `usePageView()`, `usePostClick()` composables
- Favorites: `useFavorites()` with localStorage
- Email capture: CTA component + external service
- Related posts: `useRelatedPosts()` based on tags
- Comment counts: Disqus API integration
- Post ratings: `usePostRating()` with localStorage
- Dark mode aware share images

**Package Additions (No breaking changes):**
- `fuse.js` for search (already decided)
- `nuxt-disqus` or vanilla Disqus embed (already decided)
- Everything else uses Vue/Nuxt built-ins

---

## Success Criteria

✅ **Search:** User can find posts by keyword in < 500ms  
✅ **Tags:** All posts organized by tag, counts accurate  
✅ **Reading Time:** Displays correctly on all devices  
✅ **Social Share:** All 5 buttons work, copy link shows toast  
✅ **Disqus:** Loads when shortname set, hidden when not  
✅ **Performance:** No bundle size increase > 15KB  
✅ **Mobile:** All features functional on mobile  
✅ **Dark mode:** All components work in dark mode  

---

## File Structure (Post-Implementation)

```
components/
  ├── search/
  │   └── SearchModal.vue
  ├── tags/
  │   └── TagFilter.vue
  ├── posts/
  │   ├── ReadingTime.vue
  │   └── ShareButtons.vue
  ├── comments/
  │   └── DisqusComments.vue
  └── ...existing components

composables/
  ├── useSearch.ts
  ├── useTags.ts
  ├── useReadingTime.ts
  ├── useShare.ts
  └── ...existing composables

types/
  └── search.ts (if needed)

.env.example (updated)
app.config.ts (updated)
nuxt.config.ts (may add fuse.js)
```

---

## Testing Checklist

- [ ] Search finds posts by title
- [ ] Search finds posts by description
- [ ] Search finds posts by tags
- [ ] Tags display with accurate counts
- [ ] Reading time calculates correctly (sample: 1000 words = 5 min)
- [ ] Share buttons generate correct URLs
- [ ] Copy link shows toast notification
- [ ] Disqus loads when shortname configured
- [ ] Disqus hidden when shortname empty
- [ ] All components work in light and dark mode
- [ ] All components work on mobile (375px+)
- [ ] No console errors
- [ ] Performance: page load < 2s, search response < 100ms

---

## Dependencies

**New packages to add:**
- `fuse.js@^6.6.2` — Client-side search

**Optional (user's choice):**
- `nuxt-disqus` — Disqus integration wrapper (or use native embed)

**No external services beyond:**
- Disqus (optional, user-configured)
- Social networks (links only, no API calls)

---

## Notes

- All features degrade gracefully (search with single post, tags with no tags, Disqus optional)
- Search index built at build-time (no runtime overhead)
- Components are atomic, can be positioned independently
- Composables are framework-agnostic (could migrate to other framework)
- No state management needed (props + composables sufficient)

---

## Version History

| Version | Date | Status |
|---------|------|--------|
| 1.0 | 2026-08-11 | Approved, Ready for Implementation |

