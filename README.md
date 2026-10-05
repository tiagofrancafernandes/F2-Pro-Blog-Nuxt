# 📝 Tiago França — Blog System

[🇺🇸 English](./README.md) | [🇧🇷 Português](./README.pt-br.md)

A modern and responsive blog built with **Nuxt 4**, **Vue 3 Composition API**, and **TailwindCSS v4**. Complete system featuring a design system, SEO, dark mode, and dynamic environment configuration.

## ✨ Features

- **🎨 Complete Design System**: Design tokens (colors, typography, spacing, shadows)
- **🌓 Native Dark Mode**: Theme switching with persistence
- **📱 Responsive & Mobile-First**: Fully optimized for mobile, tablet, and desktop
- **🔍 SEO Optimized**: OpenGraph, Twitter Cards, Structured Data, Canonical URLs
- **⚡ Performance**: Static Site Generation (SSG), gzip ~630KB
- **🌍 Multi-Environment**: Configuration via environment variables (local/staging/production)
- **♿ Accessibility**: WCAG AA compliant, keyboard navigation, semantic HTML
- **📦 Zero Bloat**: Minimal and clean dependencies without unnecessary overhead

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (or npm/yarn)

### Setup

```bash
# Clone the repository
git clone <your-repo>
cd vue-blog-system--rapid-developers-inspired

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local as needed

# Start development server
pnpm dev
# Opens at http://localhost:3000
```

### Build

```bash
# Build for SSG
pnpm build

# Preview production build
npx serve .output/public --listen 3000
```

## 📁 Project Structure

```
.
├── app.vue                          # Root component
├── app.config.ts                    # Dynamic configuration (env vars)
├── nuxt.config.ts                   # Nuxt configuration
├── tsconfig.json                    # TypeScript config
│
├── components/
│   ├── layout/
│   │   ├── Navbar.vue              # Sticky navbar + dark mode toggle
│   │   ├── Sidebar.vue             # Sidebar with categories
│   │   └── Footer.vue              # Footer
│   └── posts/
│       ├── PostCard.vue            # Post card (grid)
│       └── PostDetail.vue          # Full post detail
│
├── pages/
│   ├── index.vue                   # Home (hero + post grid)
│   └── posts/[slug].vue            # Post detail (dynamic routing)
│
├── public/data/posts/
│   ├── index.json                  # Posts index
│   └── data/
│       ├── post-um.json
│       ├── post-dois.json
│       ├── post-tres.json
│       └── post-quatro.json
│
├── design-system/
│   ├── design.json                 # Design tokens (colors, typography, spacing)
│   └── DESIGN.md                   # Design guide
│
└── docs/
    ├── CLAUDE.md                   # Development standards
    ├── AGENTS.md                   # Agent/LLM guidelines
    └── UNIVERSAL-CODE-STYLE-RULES.md  # Code style rules
```

## 🎨 Design System

### Colors

**Light Mode:**
- `primary`: #2563eb (Blue)
- `secondary`: #7c3aed (Purple)
- `success`: #10b981 (Green)
- `warning`: #f59e0b (Amber)
- `error`: #ef4444 (Red)
- `neutral`: Grayscale (50-900)

**Dark Mode:**
- Automatic with `@nuxtjs/color-mode`
- Dynamic CSS variables via `app.config.ts`

### Typography

```
Headings:
- h1: 3xl (1.875rem), bold (700)
- h2: 2xl (1.5rem), semibold (600)
- h3: xl (1.25rem), semibold (600)

Body:
- base: 1rem, normal (400)
- sm: 0.875rem, normal (400)

Font: system-ui, -apple-system, sans-serif
```

### Spacing & Layout

```
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 3rem (48px)
3xl: 4rem (64px)
```

See `design-system/design.json` for full reference.

## 🔧 Configuration (Environment Variables)

Create `.env.local` (not committed to git) with:

```bash
# Local Development
NUXT_PUBLIC_SITE_URL=http://localhost:3000
NUXT_PUBLIC_BLOG_TITLE=Tiago França
NUXT_PUBLIC_BLOG_AUTHOR=Tiago França
NUXT_PUBLIC_BLOG_DESCRIPTION=Explore articles about development...

# Production
# NUXT_PUBLIC_SITE_URL=https://your-domain.com

# Social (Optional)
# NUXT_PUBLIC_TWITTER_HANDLE=@your_twitter
# NUXT_PUBLIC_GITHUB_URL=https://github.com/your-username

# Analytics (Optional)
# NUXT_PUBLIC_GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X
```

See `.env.example` for the complete template.

## 📝 Post Structure

### index.json (Index)

```json
{
  "posts": [
    {
      "id": 1,
      "slug": "post-um",
      "title": "Post Title",
      "category": "backend",
      "status": "published",
      "date": "2024-08-10"
    }
  ]
}
```

### data/{slug}.json (Detail)

```json
{
  "id": 1,
  "slug": "post-um",
  "title": "Full Title",
  "description": "Meta description for SEO",
  "content": "# Markdown content here",
  "author": "Tiago França",
  "publishedAt": "2024-08-10T10:30:00Z",
  "updatedAt": "2024-08-11T14:20:00Z",
  "tags": ["nuxt", "vue"],
  "category": "backend",
  "imageUrl": "https://picsum.photos/800/400?random=1",
  "readTime": "5 min",
  "featured": true
}
```

## 🔍 SEO & Meta Tags

Each page includes:
- ✅ Open Graph (og:title, og:description, og:image, og:type)
- ✅ Twitter Card (twitter:card, twitter:title, twitter:description)
- ✅ Canonical URL (dynamic via env)
- ✅ Meta Description, Keywords, Author
- ✅ Robots Meta (index, follow)
- ✅ UTF-8 Charset

Implemented via `useHead()` across pages.

## 📱 Responsiveness

### Breakpoints (Tailwind)

```
sm: 640px  (mobile landscape)
md: 768px  (tablet)
lg: 1024px (desktop small)
xl: 1280px (desktop)
2xl: 1536px (desktop large)
```

### Responsive Components

- **Navbar**: Desktop menu + mobile hamburger
- **Sidebar**: Hidden on mobile, visible on md+
- **Grid**: 1 column on mobile, 2 columns on tablet (md), 3 columns on desktop (lg)
- **Typography**: Responsive scaling via Tailwind

## 🎯 Vue 3 Composition API Standards

All components follow these conventions:

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Validation first
if (!props.data) {
    throw new Error('Data is required')
}

// Reactive state
const state = ref(0)

// Computed
const derived = computed(() => state.value * 2)

// Lifecycle
onMounted(() => {
    // init
})

// Methods
function increment() {
    state.value += 1
}
</script>
```

## 🧪 Testing

```bash
# Type checking
pnpm vue-tsc --noEmit

# Build
pnpm build

# Lint (if configured)
pnpm lint
```

## 📦 Performance

**Metrics:**
- Total Size: ~2.4 MB (634 KB gzip)
- Static Pages: Pre-rendered (SSG)
- CSS: v4 CSS-first (automatic tree-shaking)
- Images: External (picsum.photos)

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Link repository
vercel link

# Deploy
vercel --prod
```

**Environment Variables (Vercel Console):**
```
NUXT_PUBLIC_SITE_URL=https://your-domain.com
NUXT_PUBLIC_BLOG_TITLE=Tiago França
NUXT_PUBLIC_BLOG_AUTHOR=Tiago França
NUXT_PUBLIC_BLOG_DESCRIPTION=...
```

### Netlify

```bash
# Connect repository via Netlify UI
# Build command: pnpm build
# Publish directory: .output/public

# Environment variables on Netlify
NUXT_PUBLIC_SITE_URL=https://your-domain.com
...
```

### Static Hosting (Vercel, GitHub Pages, etc.)

```bash
pnpm build
# Deploy ./output/public
```

## 📚 Documentation

- **[CLAUDE.md](./CLAUDE.md)** — Project development standards
- **[AGENTS.md](./AGENTS.md)** — Guidelines for agents/LLMs
- **[UNIVERSAL-CODE-STYLE-RULES.md](./UNIVERSAL-CODE-STYLE-RULES.md)** — Code style rules (mandatory)
- **[design-system/DESIGN.md](./design-system/DESIGN.md)** — Design philosophy

## 🔗 Useful Links

- [Nuxt 4 Docs](https://nuxt.com/docs)
- [Vue 3 Composition API](https://vuejs.org/guide/introduction.html)
- [TailwindCSS v4](https://tailwindcss.com/docs)
- [Nuxt UI](https://ui.nuxt.com/)

## 🛠️ Stack

- **Framework**: Nuxt 4.5.2
- **Runtime**: Vue 3.5.41
- **Build**: Vite 8.2.1
- **Styling**: TailwindCSS v4
- **Icons**: Iconify (200,000+ icons)
- **Dark Mode**: @nuxtjs/color-mode
- **Language**: TypeScript
- **Package Manager**: pnpm

## 📄 License

MIT

---

**Author**: Tiago França
**Email**: devtiagofranca@gmail.com
**Last Updated**: 2026-08-11
