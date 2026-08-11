# 📝 Tiago França — Blog System

Um blog moderno e responsivo construído com **Nuxt 4**, **Vue 3 Composition API**, e **TailwindCSS v4**. Sistema completo com design system, SEO, dark mode e configuração ambiental dinâmica.

## ✨ Features

- **🎨 Design System Completo**: Tokens de design (cores, tipografia, espaçamento, shadows)
- **🌓 Dark Mode Nativo**: Alternância de tema com persistência
- **📱 Mobile-First Responsivo**: Totalmente otimizado para mobile/tablet/desktop
- **🔍 SEO Otimizado**: OpenGraph, Twitter Cards, Structured Data, Canonical URLs
- **⚡ Performance**: Static Site Generation (SSG), gzip ~630KB
- **🌍 Multi-Ambiente**: Configuração via environment variables (local/staging/production)
- **♿ Acessibilidade**: WCAG AA compliant, keyboard navigation, semantic HTML
- **📦 Zero Dependencies**: Sem dependências desnecessárias

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (ou npm/yarn)

### Setup

```bash
# Clonar repositório
git clone <seu-repo>
cd vue-blog-system--rapid-developers-inspired

# Instalar dependências
pnpm install

# Setup environment
cp .env.example .env.local
# Editar .env.local conforme necessário

# Iniciar dev server
pnpm dev
# Abre em http://localhost:3000
```

### Build

```bash
# Build para SSG
pnpm build

# Preview do build
npx serve .output/public --listen 3000
```

## 📁 Estrutura do Projeto

```
.
├── app.vue                          # Root component
├── app.config.ts                    # Configuração dinâmica (env vars)
├── nuxt.config.ts                   # Configuração Nuxt
├── tsconfig.json                    # TypeScript config
│
├── components/
│   ├── layout/
│   │   ├── Navbar.vue              # Menu fixo + dark mode toggle
│   │   ├── Sidebar.vue             # Menu lateral com categorias
│   │   └── Footer.vue              # Rodapé
│   └── posts/
│       ├── PostCard.vue            # Card de post (grid)
│       └── PostDetail.vue          # Detalhe completo do post
│
├── pages/
│   ├── index.vue                   # Home (hero + grid de posts)
│   └── posts/[slug].vue            # Post detail (routing dinâmico)
│
├── server/data/posts/
│   ├── index.json                  # Índice de posts
│   └── data/
│       ├── post-um.json
│       ├── post-dois.json
│       ├── post-tres.json
│       └── post-quatro.json
│
├── design-system/
│   ├── design.json                 # Design tokens (cores, typo, spacing)
│   └── DESIGN.md                   # Guia de design
│
└── docs/
    ├── CLAUDE.md                   # Padrões de desenvolvimento
    ├── AGENTS.md                   # Instruções para agents
    └── UNIVERSAL-CODE-STYLE-RULES.md  # Regras de código
```

## 🎨 Design System

### Cores

**Light Mode:**
- `primary`: #2563eb (Blue)
- `secondary`: #7c3aed (Purple)
- `success`: #10b981 (Green)
- `warning`: #f59e0b (Amber)
- `error`: #ef4444 (Red)
- `neutral`: Escala de cinza (50-900)

**Dark Mode:**
- Automático com `@nuxtjs/color-mode`
- CSS variables dinâmicas via `app.config.ts`

### Tipografia

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

Veja `design-system/design.json` para referência completa.

## 🔧 Configuração (Environment Variables)

Crie `.env.local` (não commitado) com:

```bash
# Local Development
NUXT_PUBLIC_SITE_URL=http://localhost:3000
NUXT_PUBLIC_BLOG_TITLE=Tiago França
NUXT_PUBLIC_BLOG_AUTHOR=Tiago França
NUXT_PUBLIC_BLOG_DESCRIPTION=Explore artigos sobre desenvolvimento...

# Production
# NUXT_PUBLIC_SITE_URL=https://seu-dominio.com

# Social (Optional)
# NUXT_PUBLIC_TWITTER_HANDLE=@seu_twitter
# NUXT_PUBLIC_GITHUB_URL=https://github.com/seu-usuario

# Analytics (Optional)
# NUXT_PUBLIC_GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X
```

Veja `.env.example` para template completo.

## 📝 Estrutura de Posts

### index.json (Índice)

```json
{
  "posts": [
    {
      "id": 1,
      "slug": "post-um",
      "title": "Título do Post",
      "category": "backend",
      "status": "published",
      "date": "2024-08-10"
    }
  ]
}
```

### data/{slug}.json (Detalhe)

```json
{
  "id": 1,
  "slug": "post-um",
  "title": "Título Completo",
  "description": "Meta description para SEO",
  "content": "# Markdown content aqui",
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

Cada página inclui:
- ✅ Open Graph (og:title, og:description, og:image, og:type)
- ✅ Twitter Card (twitter:card, twitter:title, twitter:description)
- ✅ Canonical URL (dinâmica via env)
- ✅ Meta Description, Keywords, Author
- ✅ Robots Meta (index, follow)
- ✅ Charset UTF-8

Implementado via `useHead()` em pages.

## 📱 Responsividade

### Breakpoints (Tailwind)

```
sm: 640px  (mobile landscape)
md: 768px  (tablet)
lg: 1024px (desktop small)
xl: 1280px (desktop)
2xl: 1536px (desktop large)
```

### Componentes Responsivos

- **Navbar**: Menu desktop + hamburger mobile
- **Sidebar**: Oculto mobile, visível md+
- **Grid**: 1 coluna mobile, 2 tablet (md), 3 desktop (lg)
- **Typography**: Escalas responsivas via Tailwind

## 🎯 Vue 3 Composition API Standards

Todos os componentes seguem:

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Validação primeiro
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
# Verificar tipos
pnpm vue-tsc --noEmit

# Build
pnpm build

# Lint (se configurado)
pnpm lint
```

## 📦 Performance

**Metrics:**
- Total Size: ~2.4 MB (634 KB gzip)
- Static Pages: Pre-rendered (SSG)
- CSS: v4 CSS-first (auto tree-shaking)
- Images: External (picsum.photos)

## 🚀 Deployment

### Vercel (Recomendado)

```bash
# Conectar repo
vercel link

# Deploy
vercel --prod
```

**Environment Variables (Vercel Console):**
```
NUXT_PUBLIC_SITE_URL=https://seu-dominio.com
NUXT_PUBLIC_BLOG_TITLE=Tiago França
NUXT_PUBLIC_BLOG_AUTHOR=Tiago França
NUXT_PUBLIC_BLOG_DESCRIPTION=...
```

### Netlify

```bash
# Conectar repo via Netlify UI
# Build command: pnpm build
# Publish directory: .output/public

# Environment variables no Netlify
NUXT_PUBLIC_SITE_URL=https://seu-dominio.com
...
```

### Static Hosting (Vercel, GitHub Pages, etc)

```bash
pnpm build
# Deploy ./output/public
```

## 📚 Documentação

- **[CLAUDE.md](./CLAUDE.md)** — Padrões de desenvolvimento projeto
- **[AGENTS.md](./AGENTS.md)** — Instruções para agents/LLMs
- **[UNIVERSAL-CODE-STYLE-RULES.md](./UNIVERSAL-CODE-STYLE-RULES.md)** — Regras de código (obrigatório)
- **[design-system/DESIGN.md](./design-system/DESIGN.md)** — Filosofia de design

## 🔗 Links Úteis

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

**Autor**: Tiago França  
**Email**: devtiagofranca@gmail.com  
**Última Atualização**: 2026-08-11
