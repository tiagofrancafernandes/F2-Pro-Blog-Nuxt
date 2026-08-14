# Agent Development Guide

**Project:** Tiago França Blog System (Nuxt 4 + Vue 3)  
**Last Updated:** August 13, 2026

---

## Project Structure

```
app/
├── app.vue                    # Root component
├── components/
│   └── layout/
│       ├── Navbar.vue
│       └── Footer.vue
├── composables/               # Shared logic
├── pages/
│   ├── index.vue             # Home page
│   ├── about.vue
│   ├── category/[name].vue
│   └── posts/
│       └── [slug].vue         # Post detail
└── plugins/
```

**CRITICAL:** All Vue components must be in `app/` directory structure. Do NOT create files at root level (no `/app.vue`, `/components/`, `/pages/` at project root).

---

## Code Style Requirements (MANDATORY)

All code must follow `UNIVERSAL-CODE-STYLE-RULES.md`. Key rules:

### Indentation
- **4 spaces** (PSR-12 standard)
- No tabs
- Consistent across all files

### Control Flow
- Use **guard clauses** (early returns)
- **No else-less patterns** - return early instead
- **No nested if/else** - flatten with guards
- **Always use braces** `{}`, never one-liners
- Separate logical blocks with blank lines

Example (✅ CORRECT):
```typescript
function process(data: any): void {
    if (!data) {
        return
    }

    const result = transform(data)

    if (!result) {
        return
    }

    execute(result)
}
```

### Vue Files Structure
All `<template>` uses 4-space indentation. Example:
```vue
<template>
    <div class="container">
        <h1>{{ title }}</h1>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'

    const title = ref('Hello')
</script>
```

---

## Component Development

### Creating New Components

**Location:** `app/components/<category>/<ComponentName>.vue`

**Template Example** (4-space indented):
```vue
<template>
    <div class="component">
        <header>
            <h1>{{ title }}</h1>
        </header>
        <main>
            <!-- Content -->
        </main>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue'

    interface Props {
        title: string
        items?: any[]
    }

    const props = withDefaults(defineProps<Props>(), {
        items: () => [],
    })

    const count = ref(0)

    const doubled = computed(() => count.value * 2)

    function increment(): void {
        count.value += 1
    }
</script>
```

### Icons
- Use `<Icon>` component from `@nuxt/icon`
- Syntax: `<Icon name="fa6-solid:heart" />`
- Icon sets: `fa6-*`, `mdi:*`, `tabler:*`, etc.
- **Do NOT use** `<iconify-icon>` tag

---

## Pages & Routing

### Creating Pages

**Location:** `app/pages/<section>/[optional-params].vue`

**Rules:**
- Use SSR-safe functions (no useHead directly)
- Fetch data in `onMounted`
- Handle loading and error states
- Use guard clauses for validation

Example:
```typescript
onMounted(async () => {
    if (isLoading.value === false) {
        return
    }

    try {
        const response = await fetch('/api/data')

        if (!response.ok) {
            data.value = null
            return
        }

        data.value = await response.json()
    } catch (error) {
        console.error('Error:', error)
        data.value = null
    } finally {
        isLoading.value = false
    }
})
```

---

## Composables

**Location:** `app/composables/use<Name>.ts`

Example:
```typescript
export function useFetch(url: string) {
    const data = ref(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    async function fetch(): Promise<void> {
        if (!url) {
            error.value = 'URL required'
            return
        }

        isLoading.value = true
        error.value = null

        try {
            const response = await fetch(url)

            if (!response.ok) {
                error.value = `HTTP ${response.status}`
                return
            }

            data.value = await response.json()
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error'
        } finally {
            isLoading.value = false
        }
    }

    return {
        data,
        isLoading,
        error,
        fetch,
    }
}
```

---

## Styling

### Tailwind CSS
- Use Tailwind utilities only (no custom CSS)
- Use design tokens from `design-system/design.json`
- Classes: `text-gray-700`, `bg-red-600`, `dark:bg-slate-900`, etc.

### Color Palette
- **Primary:** `#EF4444` (red)
- **Text:** `#111827` (dark gray)
- **Background:** `#FFFFFF` (white)
- **Border:** `#E5E7EB` (light gray)
- **Dark mode:** `dark:` prefix for dark mode classes

### Example (4-space indentation):
```vue
<template>
    <div class="bg-white dark:bg-slate-900 text-gray-900 dark:text-white">
        <h1 class="text-3xl font-bold text-red-600 mb-4">
            Title
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
            Description
        </p>
    </div>
</template>
```

---

## TypeScript

All scripts must use TypeScript with proper types:

```typescript
interface Post {
    id: number
    slug: string
    title: string
    date: string
    tags: string[]
}

const posts = ref<Post[]>([])

function filterPosts(tag: string): Post[] {
    if (!tag) {
        return posts.value
    }

    return posts.value.filter((post) => post.tags.includes(tag))
}
```

---

## Configuration Files

**DO NOT MODIFY** these files without approval:
- `nuxt.config.ts` - Framework configuration
- `app.config.ts` - App configuration
- `vite.config.ts` - Build configuration
- `tsconfig.json` - TypeScript configuration

**OK to modify:**
- `design-system/design.json` - Design tokens
- `design-system/DESIGN.md` - Design documentation
- `public/data/` - Static data files
- `CLAUDE.md` - Project guidelines (after discussion)

---

## Data Fetching

### Posts Data Location
```
public/data/posts/
├── index.json              # Post list with metadata
└── data/
    ├── post-um.json        # Individual post content (markdown)
    ├── post-dois.json
    └── ...
```

### Fetch Pattern
```typescript
async function loadPosts(): Promise<void> {
    try {
        const response = await fetch('/data/posts/index.json')

        if (!response.ok) {
            posts.value = []
            return
        }

        const data = await response.json()
        posts.value = data.posts || []
    } catch (error) {
        console.error('Failed to load posts:', error)
        posts.value = []
    }
}
```

---

## Testing

Before submitting work:

1. **Build test:**
   ```bash
   pnpm build
   ```

2. **Visual test:**
   ```bash
   pnpm dev
   # Open http://localhost:3000
   ```

3. **Test checklist:**
   - [ ] No console errors
   - [ ] Components render correctly
   - [ ] Responsive layout (mobile 375px, desktop 1280px)
   - [ ] Dark mode toggle works
   - [ ] Navigation works
   - [ ] No TypeScript errors

---

## Commit Messages

Format: `<type>(scope): description`

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `style:` - Code style, formatting
- `docs:` - Documentation
- `test:` - Tests

**Example:**
```
feat(navbar): add dark mode toggle

- Add theme toggle button
- Integrate with @nuxtjs/color-mode
- Test on mobile and desktop
```

**Important:** Remove references to Claude in messages.

---

## Common Tasks

### Add a New Page
1. Create file in `app/pages/` or `app/pages/<section>/`
2. Use SSR-safe data fetching pattern
3. Apply 4-space indentation
4. Use guard clauses
5. Test: `pnpm build && pnpm dev`

### Add a New Component
1. Create in `app/components/<category>/`
2. Type all props with interfaces
3. Use `<script setup>`
4. Use composables for shared logic
5. Test in consuming page

### Modify Design
1. Update `design-system/design.json`
2. Update `design-system/DESIGN.md`
3. Test: `pnpm build`
4. Commit with `style:` prefix

---

## Important Notes

1. **Structure:** Everything goes in `app/` folder
2. **Style:** 4 spaces, guard clauses, guard clauses
3. **Types:** Always use TypeScript interfaces
4. **Components:** Use `<script setup>` syntax
5. **Icons:** Use `@nuxt/icon` with `<Icon>` component
6. **Testing:** Always build and test before committing

---

## Contact / Support

For issues or questions about development:
- Check `CLAUDE.md` for project guidelines
- Check `design-system/DESIGN.md` for design specs
- Check `UNIVERSAL-CODE-STYLE-RULES.md` for code standards
- Review existing components for patterns

---

**Last Updated:** 2026-08-13  
**Version:** 1.0
