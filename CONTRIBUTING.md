# Contributing to Tiago França Blog

Obrigado por querer contribuir! Este documento descreve como colaborar com este projeto.

## 📋 Guidelines

### 1. Antes de Começar

- Leia [CLAUDE.md](./CLAUDE.md) para padrões de desenvolvimento
- Leia [UNIVERSAL-CODE-STYLE-RULES.md](./UNIVERSAL-CODE-STYLE-RULES.md) (obrigatório)
- Consulte [design-system/DESIGN.md](./design-system/DESIGN.md) para estilos

### 2. Setup Local

```bash
# Clone e instale
git clone <repo>
cd vue-blog-system--rapid-developers-inspired
pnpm install

# Setup env
cp .env.example .env.local

# Dev server
pnpm dev
```

### 3. Git Workflow

```bash
# Criar branch
git checkout -b feat/sua-feature

# Fazer changes
# ... editar arquivos ...

# Verificar antes de commitar
pnpm build  # Deve passar
pnpm lint   # Se configurado

# Commit com padrão
git add .
git commit -m "feat(scope): descrição curta"

# Push
git push origin feat/sua-feature

# Criar PR no GitHub
```

### 4. Padrão de Commits

**Formato:**
```
type(scope): description
```

**Types:**
- `feat:` — Nova feature
- `fix:` — Bug fix
- `refactor:` — Refatoração
- `style:` — Formatação/estilo
- `docs:` — Documentação
- `test:` — Testes
- `chore:` — Deps, build, tooling

**Examples:**
```
feat(posts): add category filtering
fix(navbar): correct dark mode toggle
refactor(components): extract color utilities
docs(readme): add deployment section
```

### 5. Vue 3 + TypeScript Standards

**Obrigatório:**
- Use `<script setup lang="ts">`
- Type todos props, emits, returns
- Use object syntax para class bindings (não ternary)
- Composition API over Options API

**Errado:**
```vue
<!-- ❌ -->
<div :class="isDark ? 'bg-dark text-white' : 'bg-light text-black'"></div>

<script>
export default {
  data() {
    return { count: 0 }
  }
}
</script>
```

**Correto:**
```vue
<!-- ✅ -->
<div :class="{ 'bg-dark text-white': isDark, 'bg-light text-black': !isDark }"></div>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>
```

### 6. Design System

**Use apenas tokens definidos:**

```vue
<!-- Colors -->
<div :style="{ color: appConfig.public.colors.primary }"></div>

<!-- Typography -->
<h1 class="text-3xl font-bold text-neutral-900">Heading</h1>
<p class="text-base font-normal text-neutral-700">Body</p>

<!-- Spacing -->
<div class="px-4 py-6 gap-4">Content</div>
```

Veja `design-system/design.json` para valores.

### 7. SEO & Meta Tags

Para novas pages, incluir:

```typescript
useHead({
    title: 'Page Title - Tiago França',
    meta: [
        {
            name: 'description',
            content: 'Meta description aqui',
        },
        {
            property: 'og:title',
            content: 'Page Title',
        },
        {
            property: 'og:description',
            content: 'Meta description',
        },
        {
            property: 'og:image',
            content: 'https://...',
        },
        {
            name: 'twitter:card',
            content: 'summary_large_image',
        },
    ],
    link: [
        {
            rel: 'canonical',
            href: 'https://seu-dominio.com/pagina',
        },
    ],
});
```

### 8. Estrutura de Componentes

```
components/
├── layout/          # Layout components (Navbar, Sidebar, Footer)
├── posts/           # Post-specific (PostCard, PostDetail)
└── common/          # Reusáveis (Button, Badge, etc)
```

**Nomes:**
- PascalCase para componentes: `PostCard.vue`
- camelCase para props/state: `isLoading`, `postTitle`
- UPPER_SNAKE_CASE para constants: `MAX_POSTS`

### 9. TypeScript Interfaces

Defina tipos para dados:

```typescript
// types/post.ts
export interface Post {
    id: string
    slug: string
    title: string
    content: string
    category: string
    publishedAt: string
    tags: string[]
    imageUrl: string
}
```

### 10. Testing Antes de Submeter

```bash
# Verificar tipos
pnpm vue-tsc --noEmit

# Build
pnpm build

# Preview (verificar funcionalidade)
npx serve .output/public --listen 3000
```

**Checklist:**
- [ ] Build passa
- [ ] Tipos TypeScript corretos
- [ ] Componentes responsivos (mobile/tablet/desktop)
- [ ] Dark mode funciona
- [ ] Links funcionam
- [ ] Imagens carregam
- [ ] Sem console errors

## 🚀 Adicionando Posts

### 1. Adicionar entrada em `server/data/posts/index.json`

```json
{
  "posts": [
    {
      "id": 5,
      "slug": "novo-post",
      "title": "Título do Post",
      "category": "frontend",
      "status": "published",
      "date": "2026-08-12"
    }
  ]
}
```

### 2. Criar arquivo `server/data/posts/data/novo-post.json`

```json
{
  "id": 5,
  "slug": "novo-post",
  "title": "Título Completo do Post",
  "description": "Descrição para meta tags",
  "content": "# Markdown Content\n\nConteúdo do post em Markdown...",
  "author": "Tiago França",
  "publishedAt": "2026-08-12T10:30:00Z",
  "updatedAt": "2026-08-12T10:30:00Z",
  "tags": ["vue", "nuxt"],
  "category": "frontend",
  "imageUrl": "https://picsum.photos/800/400?random=5",
  "readTime": "5 min",
  "featured": false
}
```

### 3. Build e test

```bash
pnpm build
npx serve .output/public --listen 3000
# Verificar em http://localhost:3000
```

## 📚 Recursos

- **[CLAUDE.md](./CLAUDE.md)** — Padrões detalhados
- **[design-system/DESIGN.md](./design-system/DESIGN.md)** — Componentes e estilos
- **[Nuxt Docs](https://nuxt.com/docs)**
- **[Vue 3 Docs](https://vuejs.org/guide/)**

## ❓ Dúvidas?

Abra uma issue ou entre em contato: devtiagofranca@gmail.com

---

**Obrigado por contribuir! 🚀**
