# AGENTS.md: Agent Instructions & Code Standards

**Version:** 1.0
**Last Updated:** 2026-08-11
**Audience:** AI Agents & Developers

---

## Overview

This document provides comprehensive guidance for all agents working on the Vue Blog System (Nuxt 4 + TailwindCSS v4). All generated code must adhere to these rules without exception.

---

## 1. Core Code Rules

### Mandatory Standards

All code **MUST** follow the rules defined in:

**File:** `UNIVERSAL-CODE-STYLE-RULES.md`

Key enforcement rules:

- Early returns (guard clauses) - MANDATORY
- Avoid `else` whenever possible (else-less pattern)
- No nested if/else structures
- Explicit braces on ALL control structures
- NO one-line control statements
- Separate logical blocks with blank lines
- Code must be vertically readable
- Fail fast on invalid input
- No implicit behavior

### ReadabilityOver Cleverness

- Never sacrifice clarity for brevity
- Avoid one-liners
- Avoid compressed logic
- Code must scan easily from top to bottom

### Control Flow Pattern

All functions must follow this structure:

```javascript
function doSomething(input) {
    // 1. Validate input
    if (!input) {
        return null;
    }

    // 2. Guard clauses (early returns)
    if (typeof input !== 'string') {
        return null;
    }

    // 3. Prepare data
    const trimmedInput = input.trim();

    // 4. Execute logic
    const result = processData(trimmedInput);

    // 5. Return result
    return result;
}
```

---

## 2. Vue 3 & Nuxt 4 Standards

### Composition API (Mandatory for new code)

- Use `<script setup>` syntax
- TypeScript with full type hints
- No `export default` (use `<script setup>`)
- Reactive state with `ref()` and `computed()`

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';

interface Post {
    id: string;
    title: string;
    slug: string;
}

const posts = ref<Post[]>([]);
const isLoading = ref(false);

const sortedPosts = computed(() => {
    return posts.value.sort((a, b) => a.title.localeCompare(b.title));
});

async function fetchPosts() {
    isLoading.value = true;

    try {
        const response = await fetch('/api/posts');
        posts.value = await response.json();
    } finally {
        isLoading.value = false;
    }
}
</script>
```

### Class Binding (MANDATORY OBJECT SYNTAX)

**ALWAYS use object syntax, NEVER ternary operators:**

```vue
<!-- ✅ CORRECT: Object syntax -->
<div :class="[
    'px-4 py-2 rounded-lg transition-colors',
    {
        'bg-blue-600 text-white': isActive,
        'bg-gray-200 text-gray-800': !isActive,
    }
]"></div>

<!-- ❌ WRONG: Ternary syntax -->
<div :class="isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'"></div>
```

### Component Structure

```vue
<template>
    <div class="component-wrapper">
        <!-- Template content -->
    </div>
</template>

<script setup lang="ts">
// 1. Imports
import { ref, computed } from 'vue';

// 2. Type definitions
interface ComponentProps {
    title: string;
    count?: number;
}

// 3. Props & Emits
withDefaults(defineProps<ComponentProps>(), {
    count: 0,
});

const emit = defineEmits<{
    update: [value: string];
}>();

// 4. Reactive state
const isOpen = ref(false);
const selectedItem = ref<string | null>(null);

// 5. Computed properties
const displayTitle = computed(() => {
    return selectedItem.value ? `${title} - ${selectedItem.value}` : title;
});

// 6. Methods (guard clauses first)
function handleClick(item: string) {
    if (!item) {
        return;
    }

    selectedItem.value = item;
    emit('update', item);
}

// 7. Lifecycle hooks
onMounted(() => {
    // initialization
});
</script>

<style scoped>
/* Tailwind utilities handle most styling */
</style>
```

---

## 3. Design System Reference

### Core Documentation

All design decisions are documented in:

- **`design-system/DESIGN.md`** - Design philosophy, principles, components
- **`design-system/design.json`** - Design tokens (colors, spacing, typography)

### Dynamic Paleta Management

Color palette is managed via `app.config.ts` and NOT hardcoded:

```typescript
// app.config.ts
export default defineAppConfig({
    blog: {
        name: 'Tiago França',
        description: 'Senior Backend Engineer',
    },
    ui: {
        colors: {
            primary: '#3b82f6',
            secondary: '#8b5cf6',
            accent: '#ec4899',
            neutral: '#6b7280',
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444',
        },
    },
});
```

When using colors in components, reference `app.config.ts` or use Tailwind classes:

```vue
<!-- ✅ CORRECT: Use Tailwind CSS classes -->
<button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
    Click me
</button>

<!-- Use dynamic color from app config if needed -->
<div :style="{ color: appConfig.ui.colors.primary }">
    Dynamic color
</div>
```

### TailwindCSS v4 Rules

- Use NEW v4 syntax: `bg-linear-to-br` (not `bg-gradient-to-br`)
- CSS-first configuration via `@import "tailwindcss"`
- No `tailwind.config.js` needed with Vite plugin
- Semantic color naming: `primary`, `secondary`, `error`, `success`, `warning`, `neutral`

### Iconify Integration

Use Iconify for all icons (200,000+ icons from multiple icon sets):

```html
<!-- Font Awesome 7 -->
<IconifyIcon
    icon="fa7-solid:heart"
    class="w-6 h-6 text-red-500 hover:text-red-600 transition"
/>

<!-- Material Design Icons -->
<IconifyIcon
    icon="mdi:home"
    class="w-5 h-5"
/>

<!-- Conditional icon -->
<IconifyIcon
    :icon="isActive ? 'fa7-solid:check' : 'fa7-regular:circle'"
    :class="[
        'w-5 h-5 transition-colors',
        {
            'text-green-500': isActive,
            'text-gray-400': !isActive,
        }
    ]"
/>
```

---

## 4. Component Structure & Architecture

### Directory Layout

```
project-root/
├── components/
│   ├── layout/
│   │   ├── Navbar.vue
│   │   ├── Sidebar.vue
│   │   └── Footer.vue
│   ├── posts/
│   │   ├── PostCard.vue
│   │   ├── PostDetail.vue
│   │   └── PostList.vue
│   └── common/
│       ├── Button.vue
│       ├── Badge.vue
│       └── LoadingSpinner.vue
├── pages/
│   ├── index.vue (Home)
│   └── posts/
│       └── [slug].vue (Post detail)
├── server/
│   └── data/
│       └── posts/
│           ├── index.json
│           └── data/
│               ├── post-um.json
│               ├── post-dois.json
│               ├── post-tres.json
│               └── post-quatro.json
├── design-system/
│   ├── DESIGN.md
│   └── design.json
├── app.vue (Main layout wrapper)
├── app.config.ts
├── nuxt.config.ts
├── UNIVERSAL-CODE-STYLE-RULES.md
├── AGENTS.md (this file)
└── CLAUDE.md
```

### Component Naming

- **PascalCase** for all component files
- Semantic names: `PostCard.vue`, `Sidebar.vue`, `Navbar.vue`
- Group related components: `components/posts/`, `components/layout/`

### Component Guidelines

1. **Single Responsibility** - One component = one purpose
2. **Props over direct data access** - Pass data via props
3. **Emit custom events** - Don't modify parent state directly
4. **Composition** - Build complex UIs from simple components
5. **Reusability** - Design for multiple use cases

Example component:

```vue
<!-- components/posts/PostCard.vue -->
<template>
    <article class="[
        flex flex-col rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg
    ]">
        <!-- Cover Image -->
        <img
            :src="post.coverImage"
            :alt="post.title"
            class="w-full h-48 object-cover"
        />

        <!-- Content -->
        <div class="p-4 flex flex-col flex-1">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {{ post.title }}
            </h3>

            <p class="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-1">
                {{ post.excerpt }}
            </p>

            <!-- Metadata -->
            <div class="flex items-center justify-between">
                <time :datetime="post.date" class="text-xs text-gray-500">
                    {{ formatDate(post.date) }}
                </time>

                <NuxtLink
                    :to="`/posts/${post.slug}`"
                    class="[
                        text-sm font-medium text-blue-600 hover:text-blue-700
                        dark:text-blue-400 dark:hover:text-blue-300 transition-colors
                    ]"
                >
                    Ler mais
                </NuxtLink>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Post {
    id: string;
    title: string;
    excerpt: string;
    slug: string;
    date: string;
    coverImage: string;
}

defineProps<{
    post: Post;
}>();

const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date));
};
</script>
```

---

## 5. Data Flow & API Integration

### Data Source Structure

Posts are loaded from `server/data/posts/`:

```
server/data/posts/
├── index.json (list of posts with metadata)
└── data/
    ├── post-um.json
    ├── post-dois.json
    ├── post-tres.json
    └── post-quatro.json
```

### Index Structure

```json
{
    "total": 4,
    "posts": [
        {
            "id": "1",
            "title": "Primeiro Post",
            "slug": "primeiro-post",
            "status": "published",
            "path": "data/post-um.json"
        }
    ]
}
```

### Post Object Structure

```json
{
    "id": "1",
    "title": "Primeiro Post",
    "slug": "primeiro-post",
    "excerpt": "Resumo do post...",
    "content": "Conteúdo completo do post...",
    "author": "Tiago França",
    "date": "2026-08-11T10:00:00Z",
    "coverImage": "https://picsum.photos/id/556/1024/768",
    "category": "Backend",
    "tags": ["php", "laravel", "api"],
    "status": "published"
}
```

### Composable for Data Loading

Create reusable data composables:

```typescript
// composables/usePosts.ts
export const usePosts = () => {
    const posts = ref<Post[]>([]);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const fetchPosts = async () => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await fetch('/api/posts');

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            posts.value = data.posts || [];
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error';
        } finally {
            isLoading.value = false;
        }
    };

    const fetchPostBySlug = async (slug: string) => {
        const post = posts.value.find((p) => p.slug === slug);

        if (post) {
            return post;
        }

        try {
            const response = await fetch(`/api/posts/${slug}`);

            if (!response.ok) {
                throw new Error(`Post not found: ${slug}`);
            }

            return await response.json();
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Error fetching post';
            return null;
        }
    };

    return {
        posts: readonly(posts),
        isLoading: readonly(isLoading),
        error: readonly(error),
        fetchPosts,
        fetchPostBySlug,
    };
};
```

### Usage in Components

```vue
<script setup lang="ts">
import { usePosts } from '~/composables/usePosts';

const { posts, isLoading, error, fetchPosts } = usePosts();

onMounted(() => {
    fetchPosts();
});
</script>

<template>
    <div v-if="isLoading" class="flex items-center justify-center p-8">
        <LoadingSpinner />
    </div>

    <div v-else-if="error" class="p-4 bg-red-100 text-red-800 rounded-lg">
        {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
</template>
```

---

## 6. Testing Strategy

### Test Structure

Tests follow the same code style rules as production code.

### Unit Testing (Vitest)

```typescript
// tests/unit/usePosts.spec.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { usePosts } from '~/composables/usePosts';

describe('usePosts composable', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should fetch posts successfully', async () => {
        const mockPosts = [
            { id: '1', title: 'Post 1', slug: 'post-1' },
            { id: '2', title: 'Post 2', slug: 'post-2' },
        ];

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ posts: mockPosts }),
            }),
        );

        const { posts, fetchPosts } = usePosts();

        await fetchPosts();

        expect(posts.value).toEqual(mockPosts);
    });

    it('should handle fetch errors', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: false,
                status: 500,
            }),
        );

        const { error, fetchPosts } = usePosts();

        await fetchPosts();

        expect(error.value).toBeTruthy();
    });
});
```

### Component Testing (Vue Test Utils)

```typescript
// tests/unit/PostCard.spec.ts
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PostCard from '~/components/posts/PostCard.vue';

describe('PostCard component', () => {
    const mockPost = {
        id: '1',
        title: 'Test Post',
        excerpt: 'Test excerpt',
        slug: 'test-post',
        date: '2026-08-11',
        coverImage: 'https://example.com/image.jpg',
    };

    it('renders post data correctly', () => {
        const wrapper = mount(PostCard, {
            props: { post: mockPost },
        });

        expect(wrapper.text()).toContain('Test Post');
        expect(wrapper.text()).toContain('Test excerpt');
    });

    it('renders correct link to post', () => {
        const wrapper = mount(PostCard, {
            props: { post: mockPost },
            global: {
                stubs: { NuxtLink: true },
            },
        });

        const link = wrapper.findComponent({ name: 'NuxtLink' });

        expect(link.props('to')).toBe('/posts/test-post');
    });
});
```

---

## 7. Common Patterns & Anti-Patterns

### ✅ Pattern: Guard Clauses

```typescript
function processPost(post: Post | null) {
    if (!post) {
        return null;
    }

    if (!post.published) {
        return null;
    }

    return transformPost(post);
}
```

### ❌ Anti-Pattern: Nested Conditions

```typescript
// DON'T DO THIS
function processPost(post: Post | null) {
    if (post) {
        if (post.published) {
            return transformPost(post);
        }
    }

    return null;
}
```

### ✅ Pattern: Clear Variable Names

```typescript
const isPostPublished = post.status === 'published';
const hasValidAuthor = post.author && post.author.length > 0;
const shouldDisplay = isPostPublished && hasValidAuthor;

if (!shouldDisplay) {
    return null;
}
```

### ❌ Anti-Pattern: Ternary Operators for Classes

```vue
<!-- DON'T -->
<div :class="isActive ? 'bg-blue-600 text-white px-4 py-2' : 'bg-gray-200 text-gray-800 px-4 py-2'">

<!-- DO -->
<div :class="[
    'px-4 py-2',
    { 'bg-blue-600 text-white': isActive },
    { 'bg-gray-200 text-gray-800': !isActive },
]">
```

### ✅ Pattern: Error Boundaries

```typescript
async function fetchData() {
    try {
        const response = await fetch('/api/data');

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Fetch failed:', error);
        throw error; // Don't swallow errors
    }
}
```

### ✅ Pattern: Computed with Clear Logic

```typescript
const filteredPosts = computed(() => {
    const published = posts.value.filter((p) => p.status === 'published');
    const sorted = published.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return sorted;
});
```

---

## 8. Mobile-First Responsive Design

All components must be designed mobile-first:

### Tailwind Breakpoints Usage

```vue
<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- 1 column on mobile, 2 on tablet, 3 on desktop -->
    </div>
</template>
```

### Responsive Navigation

```vue
<template>
    <nav class="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg">
        <!-- Desktop sidebar -->
    </nav>

    <!-- Mobile menu trigger -->
    <button
        class="fixed bottom-4 right-4 md:hidden bg-blue-600 text-white p-4 rounded-full"
        @click="isMenuOpen = !I   >
        <IconifyIcon icon="fa7-solid:bars" />
    </button>
</template>
```

### Dark Mode Support

All components must support dark mode via TailwindCSS:

```vue
<template>
    <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        Content adapts to dark mode automatically
    </div>
</template>
```

---

## 9. Deployment & Environment

### Environment Variables

- Blog name: `NUXT_PUBLIC_BLOG_NAME` (default: "Tiago França")
- API base URL: `NUXT_PUBLIC_API_BASE` (default: "/api")
- Environment: `NODE_ENV` (development/production)

### Build Process

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## 10. Final Checklist

Before submitting any code:

- [ ] Follows `UNIVERSAL-CODE-STYLE-RULES.md`
- [ ] Uses Vue 3 Composition API with `<script setup>`
- [ ] TypeScript types are complete
- [ ] Class bindings use object syntax (no ternary)
- [ ] No console.log left in production code
- [ ] Component is reusable and single-responsibility
- [ ] Mobile-first responsive design implemented
- [ ] Dark mode support included
- [ ] Uses Iconify for all icons
- [ ] Proper error handling with guard clauses
- [ ] Tests written (if applicable)
- [ ] No magic numbers or hardcoded values
- [ ] Code is vertically readable
- [ ] Logical sections separated by blank lines

---

**End of AGENTS.md**

<!-- context7 -->
Use the `ctx7` CLI to fetch current documentation whenever the user asks about a library, framework, SDK, API, CLI tool, or cloud service — even well-known ones like React, Next.js, Prisma, Express, Tailwind, Django, or Spring Boot. This includes API syntax, configuration, version migration, library-specific debugging, setup instructions, and CLI tool usage. Use even when you think you know the answer — your training data may not reflect recent changes. Prefer this over web search for library docs.

Do not use for: refactoring, writing scripts from scratch, debugging business logic, code review, or general programming concepts.

## Steps

1. Resolve library: `npx -y ctx7@latest library <name> "<what to look up>"` — use the official library name with proper punctuation (e.g., "Next.js" not "nextjs", "Customer.io" not "customerio", "Three.js" not "threejs")
2. Pick the best match (ID format: `/org/project`) by: exact name match, description relevance, code snippet count, source reputation (High/Medium preferred), and benchmark score (higher is better). If results don't look right, try alternate names or queries (e.g., "next.js" not "nextjs", or rephrase the question)
3. Fetch docs: `npx -y ctx7@latest docs <libraryId> "<what to look up>"` — run a separate `docs` command per distinct concept if the question spans multiple topics, unless it's about how they interact
4. Answer using the fetched documentation

You MUST call `library` first to get a valid ID unless the user provides one directly in `/org/project` format. Be specific about what to look up in the library's documentation — specific and detailed queries return better results than vague single words, but keep each query to a single concept unless the question is about how concepts interact; combined multi-topic queries dilute ranking and return shallow results for each topic. Do not run more than 3 commands per question. Do not include sensitive information (API keys, passwords, credentials) in queries.

For version-specific docs, use `/org/project/version` from the `library` output (e.g., `/vercel/next.js/v14.3.0`).

If a command fails with a quota error, inform the user and suggest `npx -y ctx7@latest login` or setting `CONTEXT7_API_KEY` env var for higher limits. Do not silently fall back to training data.
Run Context7 CLI requests outside Codex's default sandbox. If a Context7 CLI command fails with DNS or network errors such as ENOTFOUND, host resolution failures, or fetch failed, rerun it outside the sandbox instead of retrying inside the sandbox.
<!-- context7 -->
