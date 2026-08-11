# Blog System Nuxt 4 - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar um blog system Nuxt 4 completo com design replicado, documentação, estrutura de dados e UI responsiva mobile-first.

**Architecture:** Sistema modular com separação clara: (1) design-system centralizado, (2) documentação de regras (AGENTS.md, CLAUDE.md), (3) estrutura de dados estática em server/data/, (4) componentes UI reutilizáveis, (5) pages dinâmicas com Nuxt routing.

**Tech Stack:** Nuxt 4, Vue 3 Composition API, TailwindCSS v4, @nuxt/icon (Iconify), @nuxtjs/color-mode (dark mode), @nuxtjs/i18n (i18n), app.config.ts (dynamic paleta).

## Global Constraints

- Todas as regras de código em `UNIVERSAL-CODE-STYLE-RULES.md` são obrigatórias
- AGENTS.md e CLAUDE.md devem referenciar `design-system/DESIGN.md` e `design-system/design.json`
- Paleta de cores gerenciada via `app.config.ts` (dinâmica, não hardcoded)
- Dados de posts vêm de `server/data/posts/` (estrutura A: index.json + arquivos individuais)
- Imagens dummy: `https://picsum.photos` com IDs fixos
- Mobile-first, mas boa apresentação em desktop
- Nome do blog dinâmico via `nuxt.config.ts` (padrão: "Tiago França")
- Tipografia em português (Brasil)

---

### Task 1: Criar design-system/design.json

**Files:**
- Create: `design-system/design.json`

Design tokens com paleta completa (cores, typography, spacing, shadows).

---

### Task 2: Criar design-system/DESIGN.md

**Files:**
- Create: `design-system/DESIGN.md`

Documentação do design system (filosofia, componentes, decisões).

---

### Task 3: Criar AGENTS.md

**Files:**
- Create: `AGENTS.md`

Instruções para agents sobre regras de código e design.

---

### Task 4: Criar CLAUDE.md

**Files:**
- Create: `CLAUDE.md`

Instruções globais de desenvolvimento.

---

### Task 5: Criar app.config.ts

**Files:**
- Create: `app.config.ts`

App config com paleta dinâmica e blog metadata.

---

### Task 6: Criar Estrutura de Dados (server/data/posts/)

**Files:**
- Create: `server/data/posts/index.json`
- Create: `server/data/posts/data/post-um.json`
- Create: `server/data/posts/data/post-dois.json`
- Create: `server/data/posts/data/post-tres.json`
- Create: `server/data/posts/data/post-quatro.json`

Posts data structure com 4 exemplos.

---

### Task 7: Criar Navbar.vue

**Files:**
- Create: `components/layout/Navbar.vue`

Menu fixo superior com logo dinâmico e dark mode toggle.

---

### Task 8: Criar Sidebar.vue

**Files:**
- Create: `components/layout/Sidebar.vue`

Menu lateral fixo com categorias.

---

### Task 9: Criar Footer.vue

**Files:**
- Create: `components/layout/Footer.vue`

Rodapé com links e social.

---

### Task 10: Criar PostCard.vue

**Files:**
- Create: `components/posts/PostCard.vue`

Card de post com imagem e metadados.

---

### Task 11: Criar PostDetail.vue

**Files:**
- Create: `components/posts/PostDetail.vue`

Detalhe completo do post.

---

### Task 12: Criar app.vue

**Files:**
- Modify: `app.vue`

Layout principal com Navbar, Sidebar, Footer.

---

### Task 13: Criar pages/index.vue

**Files:**
- Create: `pages/index.vue`

Home com grid de posts.

---

### Task 14: Criar pages/posts/[slug].vue

**Files:**
- Create: `pages/posts/[slug].vue`

Post detail page com routing dinâmico.

---

### Task 15: Testes no Navegador

**Files:**
- Nenhum

Verificação: desktop, mobile, dark mode, navegação, dados.

---
