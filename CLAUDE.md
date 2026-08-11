# CLAUDE.md - Project Development Standards

**Project:** Vue Blog System Nuxt 4
**Last Updated:** 2026-08-11
**Version:** 1.0

---

## 1. Compliance & Code Style

### 1.1 Mandatory Rules Reference

All code MUST comply with `UNIVERSAL-CODE-STYLE-RULES.md`. This is non-negotiable.

Key enforcements:
- **Readability over brevity** - Explicit > implicit, always
- **Early returns (guard clauses)** - Fail fast pattern mandatory
- **Else-less code** - Avoid else when possible
- **No nested if/else structures** - Flatten logic with guards
- **Explicit braces** - All control structures must use `{}`
- **No one-line control statements** - Each control flow gets own block
- **Vertical formatting** - Blank lines separate logical sections
- **Fail fast validation** - Input validation at function entry

**Conflict Resolution:** If any framework convention conflicts with `UNIVERSAL-CODE-STYLE-RULES.md`, the rules file ALWAYS wins.

### 1.2 Vue 3 Composition API Standards

All Vue code uses **Composition API with TypeScript**.

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Validation first
if (!props.data) {
    throw new Error('Data is required')
}

// Reactive state
const count = ref(0)

// Computed properties
const doubled = computed(() => count.value * 2)

// Lifecycle hooks
onMounted(() => {
    // initialization logic
})

// Methods
function increment() {
    count.value += 1
}
</script>
```

**Requirements:**
- Use TypeScript for all scripts
- Type all props, emits, and returns
- Destructure with `<script setup lang="ts">`
- Use `ref()` and `reactive()` appropriately
- Prefer `computed()` over watchers when possible

### 1.3 Tailwind CSS v4 Setup

**Installation is already complete.** Reference for new projects:

Files needed:
- `src/style.css` contains `@import "tailwindcss"`
- `vite.config.ts` includes `tailwindcss()` plugin BEFORE other plugins
- NO config files (`tailwind.config.js`, `postcss.config.js`)

**Key v4 Changes from v3:**
- ❌ `bg-gradient-to-r` → ✅ `bg-linear-to-r`
- ✅ CSS-first configuration (no JS files needed)
- ✅ Automatic tree-shaking of unused styles

---

## 2. Design System Reference

### 2.1 Design System Structure

**Location:** `design-system/`

Files:
- `design-system/design.json` - Design tokens (colors, typography, spacing, shadows)
- `design-system/DESIGN.md` - Design philosophy and component guidelines

### 2.2 Color Management

Colors are managed via **two layers:**

1. **design.json** - Source of truth for design tokens
2. **app.config.ts** - Runtime palette configuration (dynamic theming)

**Light Mode Colors (Primary Use):**
```json
{
    "primary": "#2563eb",        // Blue (actions, primary elements)
    "secondary": "#7c3aed",      // Purple (accents)
    "success": "#10b981",        // Green (positive feedback)
    "warning": "#f59e0b",        // Amber (cautions)
    "error": "#ef4444",          // Red (errors, destructive)
    "neutral": { 50-900 },       // Gray scale
    "background": "#ffffff",     // Page background
    "surface": "#f9fafb",        // Cards, modals
    "text": "#111827"            // Primary text
}
```

**Dark Mode Colors:**
Same semantic colors with adjusted neutral scale and inverted bg/text.

### 2.3 Typography Standards

From design.json:

```json
{
    "fontFamily": {
        "base": "system-ui, -apple-system, sans-serif",
        "mono": "monospace"
    },
    "fontSize": {
        "xs": "0.75rem",
        "sm": "0.875rem",
        "base": "1rem",      // Default body
        "lg": "1.125rem",
        "xl": "1.25rem",
        "2xl": "1.5rem",     // Headers
        "3xl": "1.875rem",   // Page titles
        "4xl": "2.25rem"     // Hero titles
    },
    "fontWeight": {
        "light": 300,
        "normal": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700,
        "extrabold": 800
    }
}
```

**Usage in Vue:**
```vue
<!-- Page title (3xl, bold) -->
<h1 class="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
    Welcome to Blog
</h1>

<!-- Post card title (xl, semibold) -->
<h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
    Post Title
</h2>

<!-- Body text (base, normal) -->
<p class="text-base font-normal text-neutral-700 dark:text-neutral-300">
    Post excerpt...
</p>
```

### 2.4 Spacing & Layout

From design.json:
```json
{
    "xs": "0.25rem",    // 4px
    "sm": "0.5rem",     // 8px
    "md": "1rem",       // 16px
    "lg": "1.5rem",     // 24px
    "xl": "2rem",       // 32px
    "2xl": "3rem",      // 48px
    "3xl": "4rem"       // 64px
}
```

**Grid/Card Layouts:**
- Container: `px-4 sm:px-6 lg:px-8` (responsive padding)
- Card spacing: `gap-4 sm:gap-6 lg:gap-8`
- Section margins: `my-8 sm:my-12 lg:my-16`

---

## 3. Development Standards

### 3.1 Component Organization

**Directory Structure:**
```
components/
├── layout/           # Layout components
│   ├── Navbar.vue
│   ├── Sidebar.vue
│   └── Footer.vue
├── posts/            # Post-related components
│   ├── PostCard.vue
│   └── PostDetail.vue
└── common/           # Reusable UI elements
    ├── Button.vue
    ├── Badge.vue
    └── Icon.vue
```

**Component Guidelines:**
- One component per file (SFC)
- Use `<script setup>` syntax
- Export props and emits with TypeScript interfaces
- Keep components small and focused
- Use composition functions for shared logic

### 3.2 Vue 3 Class Binding (CRITICAL)

**ALWAYS use object syntax** for conditional classes (from user CLAUDE.md):

```vue
<!-- ❌ WRONG: Ternary syntax -->
<div :class="isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'"></div>

<!-- ✅ CORRECT: Object syntax -->
<div :class="{
    'bg-gray-700 text-white': isDarkMode,
    'bg-white text-gray-800': !isDarkMode
}"></div>

<!-- ✅ With static classes and conditionals -->
<div :class="[
    'px-4 py-2 rounded-lg font-medium transition-colors',
    {
        'bg-blue-600 text-white': isActive,
        'bg-gray-200 text-gray-800': !isActive,
    }
]"></div>
```

**Benefits:**
- More readable and maintainable
- Clear mapping between classes and conditions
- Better for complex logic
- Vue 3 best practice

### 3.3 Naming Conventions

**Vue/TypeScript:**
- Components: PascalCase (`PostCard.vue`, `Navbar.vue`)
- Props/variables: camelCase (`postTitle`, `isActive`)
- Constants: UPPER_SNAKE_CASE (`MAX_POSTS`, `API_BASE_URL`)
- Booleans: Question format (`isActive`, `hasData`, `canEdit`)
- Functions: camelCase (`fetchPosts`, `formatDate`)

**CSS Classes (Tailwind):**
- Use semantic Tailwind utilities only
- No custom CSS classes (use Tailwind all the way)
- Component-specific styles go in `<style scoped>`

### 3.4 TypeScript Interfaces

All data structures must have TypeScript interfaces:

```ts
// types/post.ts
export interface Post {
    id: string
    slug: string
    title: string
    excerpt: string
    content: string
    author: string
    publishedAt: string
    tags: string[]
    imageUrl: string
}

export interface BlogMetadata {
    title: string
    author: string
    description: string
    language: string
}
```

### 3.5 Composables

Extract shared logic into composables:

```ts
// composables/usePosts.ts
export function usePosts() {
    const posts = ref<Post[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    async function fetchPosts() {
        if (!posts.value.length) {
            isLoading.value = true
            error.value = null

            try {
                // Fetch logic
            } catch (e) {
                error.value = e instanceof Error ? e.message : 'Unknown error'
            } finally {
                isLoading.value = false
            }
        }
    }

    onMounted(() => {
        fetchPosts()
    })

    return {
        posts: readonly(posts),
        isLoading: readonly(isLoading),
        error: readonly(error),
        fetchPosts,
    }
}
```

**Usage in Components:**
```vue
<script setup lang="ts">
const { posts, isLoading, error } = usePosts()
</script>
```

---

## 4. Data Structure

### 4.1 Posts Data Location

**Structure:** `server/data/posts/`

```
server/data/posts/
├── index.json              # Post index/manifest
└── data/
    ├── post-um.json        # Individual post data
    ├── post-dois.json
    ├── post-tres.json
    └── post-quatro.json
```

### 4.2 index.json Format

```json
{
    "posts": [
        {
            "id": "1",
            "slug": "post-um",
            "title": "Primeiro Post",
            "excerpt": "Resumo do primeiro post...",
            "publishedAt": "2026-01-15",
            "author": "Tiago França",
            "tags": ["nuxt", "vue"],
            "imageUrl": "https://picsum.photos/400/250?random=1"
        }
    ],
    "categories": [
        "nuxt",
        "vue",
        "development"
    ]
}
```

### 4.3 Individual Post Format

**File:** `server/data/posts/data/post-um.json`

```json
{
    "id": "1",
    "slug": "post-um",
    "title": "Primeiro Post - Nuxt 4 Setup",
    "excerpt": "Como configurar Nuxt 4 com TailwindCSS v4 e design tokens.",
    "content": "## Introdução\n\nNuxt 4 é a versão mais recente...",
    "author": "Tiago França",
    "publishedAt": "2026-01-15T10:30:00Z",
    "updatedAt": "2026-01-16T14:20:00Z",
    "tags": ["nuxt", "vue", "tailwindcss"],
    "category": "development",
    "imageUrl": "https://picsum.photos/800/400?random=1",
    "readTime": "5 min",
    "featured": true
}
```

### 4.4 Fetching Posts

**Composable:** `composables/usePosts.ts`

```ts
export function usePosts() {
    async function fetchPosts(): Promise<Post[]> {
        try {
            const response = await fetch('/server/data/posts/index.json')
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`)
            }
            
            const data = await response.json()
            
            return data.posts ?? []
        } catch (error) {
            console.error('Failed to fetch posts:', error)
            
            return []
        }
    }

    async function fetchPostBySlug(slug: string): Promise<Post | null> {
        try {
            const response = await fetch(`/server/data/posts/data/${slug}.json`)
            
            if (!response.ok) {
                return null
            }
            
            return await response.json()
        } catch (error) {
            console.error(`Failed to fetch post "${slug}":`, error)
            
            return null
        }
    }

    return {
        fetchPosts,
        fetchPostBySlug,
    }
}
```

### 4.5 Blog Metadata

**From:** `app.config.ts`

```ts
export default defineAppConfig({
    blog: {
        title: 'Tiago França',
        author: 'Tiago França',
        description: 'Blog sobre Nuxt, Vue e desenvolvimento web',
        language: 'pt-BR',
        siteName: 'Tiago França Blog',
    },
    tailwind: {
        config: {
            theme: {
                extend: {
                    colors: {
                        primary: 'var(--color-primary)',
                        secondary: 'var(--color-secondary)',
                        // ... mapped from design.json
                    },
                },
            },
        },
    },
})
```

---

## 5. Git Commits

### 5.1 Commit Message Format

**Pattern:** `type(scope): description`

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style/formatting
- `refactor:` - Code refactoring
- `perf:` - Performance improvement
- `test:` - Tests
- `chore:` - Build, deps, tooling

**Examples:**
```
feat: add dark mode toggle to navbar
fix: fix post card image alignment on mobile
docs: project instructions and development standards
refactor: extract post fetching logic to composable
style: format components with prettier
```

### 5.2 Commit Message Guidelines

- Use imperative mood ("add", not "added" or "adds")
- Remove references to Claude in messages
- First line ≤ 50 characters
- Add detailed body for complex changes
- Reference issues if applicable: "Fixes #123"

### 5.3 Staging & Committing

Always check what you're committing:

```bash
# View staged changes
git diff --staged

# Stage specific files
git add path/to/file.vue

# Commit with message
git commit -m "type(scope): description"
```

**Never commit:**
- Sensitive data (API keys, credentials, `.env` files)
- Generated files (`.nuxt/`, `node_modules/`)
- IDE configs (`.idea/`, `.vscode/settings.json`)

---

## 6. Quality Gate

### 6.1 Browser Testing Checklist

Before considering work complete, verify in the browser:

**Desktop (1920px+):**
- [ ] Navbar displays correctly
- [ ] Sidebar shows categories
- [ ] Post grid displays with proper spacing
- [ ] Post cards show images, titles, excerpts
- [ ] Hover effects work on cards
- [ ] Footer displays correctly
- [ ] All navigation links work

**Mobile (375px):**
- [ ] Navbar responsive (hamburger menu if needed)
- [ ] Sidebar collapses/hides
- [ ] Post grid becomes single column
- [ ] Text is readable without horizontal scroll
- [ ] Touch targets are adequate (min 44px)
- [ ] Images scale properly
- [ ] Footer stacks vertically

**Dark Mode (Toggle):**
- [ ] Colors switch correctly (dark.json palette)
- [ ] Text contrast meets WCAG AA
- [ ] Images still visible
- [ ] Shadows adjust appropriately
- [ ] Button states visible

**Navigation & Data:**
- [ ] Home page loads posts from server/data/posts/
- [ ] Post detail page loads individual post
- [ ] URL slug routing works (`/posts/post-um`)
- [ ] Back navigation works
- [ ] Category filtering works (if implemented)
- [ ] All images load from picsum.photos

### 6.2 Performance Checklist

Quick validation (not full audit):
- [ ] Page loads in < 2 seconds on 3G
- [ ] No layout shift during load
- [ ] Images are optimized
- [ ] No console errors or warnings
- [ ] No excessive re-renders (check Vue DevTools)

### 6.3 Code Quality Checklist

Before committing:
- [ ] Code follows UNIVERSAL-CODE-STYLE-RULES.md
- [ ] Vue components use Composition API + TypeScript
- [ ] Class bindings use object syntax
- [ ] No hardcoded colors (use design-system)
- [ ] Proper error handling (no silent failures)
- [ ] All types defined (TypeScript strict mode)
- [ ] Tests pass (if any exist)
- [ ] No ESLint or Prettier violations

### 6.4 Testing Tools

**Local Development:**
```bash
# Dev server
pnpm dev

# Build check
pnpm build

# Lint check (if configured)
pnpm lint

# Type check
pnpm vue-tsc --noEmit
```

**Browser DevTools:**
- Vue DevTools (inspect component state)
- Chrome DevTools (Network, Performance tabs)
- Responsive Design Mode (test breakpoints)

---

## 7. File Modification Checklist

When creating or modifying files, verify:

**For .vue Components:**
- [ ] Single component per file
- [ ] `<script setup lang="ts">` with TypeScript
- [ ] Props and emits properly typed
- [ ] Proper component naming (PascalCase)
- [ ] Composition functions imported
- [ ] Follows UNIVERSAL-CODE-STYLE-RULES.md

**For TypeScript Files:**
- [ ] All functions typed (params, return)
- [ ] Interfaces defined for data structures
- [ ] Early returns with guard clauses
- [ ] No nested if/else structures
- [ ] Vertical formatting with blank lines
- [ ] Error handling implemented

**For JSON Data Files:**
- [ ] Valid JSON formatting
- [ ] UTF-8 encoding
- [ ] Proper schema matching interface definitions
- [ ] No trailing commas

---

## 8. References

**Critical Documents:**
- `UNIVERSAL-CODE-STYLE-RULES.md` - Code style rules (MANDATORY)
- `design-system/design.json` - Design tokens
- `design-system/DESIGN.md` - Design philosophy
- `AGENTS.md` - Agent instructions

**Project Configuration:**
- `nuxt.config.ts` - Nuxt configuration
- `app.config.ts` - App metadata and theme
- `vite.config.ts` - Build configuration
- `tsconfig.json` - TypeScript configuration

**Documentation:**
- [Nuxt Docs](https://nuxt.com/docs)
- [Vue 3 Docs](https://vuejs.org/guide/introduction.html)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Nuxt UI Docs](https://ui.nuxt.com/)

---

## 9. Quick Start Checklist

For new tasks on this project:

1. Read `UNIVERSAL-CODE-STYLE-RULES.md` (refresh context)
2. Review `design-system/design.json` (colors, typography)
3. Check `app.config.ts` (blog metadata)
4. Reference existing components for patterns
5. Write component with TypeScript + Composition API
6. Use object syntax for conditional classes
7. Test on desktop, mobile, dark mode
8. Verify data flow from `server/data/posts/`
9. Commit with proper message format
10. Self-review code quality checklist

---

**End of CLAUDE.md**

Last Updated: 2026-08-11
Status: Ready for development

<!-- NUXT-DEVTOOLS:CRITICAL-FILES -->
## ⚠️ Critical Configuration Files

The following files trigger a full Nuxt restart when modified:
- `nuxt.config.ts`
- `nuxt.config.js`
- `app.config.ts`
- `app.config.js`
- `.nuxtrc`
- `tsconfig.json`

### 🔴 MANDATORY CHECK (EVERY TIME, NO EXCEPTIONS)

**BEFORE modifying ANY of these files, you MUST:**

```
1. READ .claude-devtools/settings.json
2. CHECK criticalFiles.autoConfirm value
3. IF false OR file missing → STOP and ASK user
4. IF true → inform user, then proceed
```

**This check is REQUIRED every single time, even if you checked before in this session.**

### Order of Operations

1. **Complete ALL prerequisite tasks FIRST**
   - Create all new files that will be referenced
   - Install all dependencies
   - Write all related code

2. **Verify prerequisites exist**
   - All files referenced in config change must exist
   - All imports must be valid

3. **Check settings file** (read `.claude-devtools/settings.json`)

4. **Act based on autoConfirm setting**

### Example: Adding i18n locale

```
Step 1: Create locales/es.json           ✓ prerequisite
Step 2: Read .claude-devtools/settings.json  ✓ check flag
Step 3: If autoConfirm=false → ask user
Step 4: Update nuxt.config.ts            ✓ only after confirmation
```

### Current Setting

**autoConfirm: DISABLED**

→ MUST ask user and WAIT for explicit "yes" before proceeding.

---
After restart, conversation history is preserved. User can send "continue" to resume.
<!-- /NUXT-DEVTOOLS:CRITICAL-FILES -->
