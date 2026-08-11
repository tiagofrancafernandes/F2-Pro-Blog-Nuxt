# Secondary Navigation Bar — Design Reference

**Reference Image:** Seção "RESOURCES" com links como Tutorials, Build, Integrations, Fixes, Compare, Hire Us

## Overview

The **Secondary Navigation Bar** appears directly below the main Navbar and contains custom links like "Hire Me", "Buy E-book", "Services", etc.

## Design Specifications

### Layout & Structure
- **Position:** Fixed below main navbar (z-index: 40, below main navbar's z-index: 50)
- **Background:** Semantic light (neutral-50) in light mode, dark (neutral-900) in dark mode
- **Padding:** Small (8px 16px) to keep it compact
- **Border:** Bottom border for separation

### Components

**Section Label (Optional):**
- Text: "RESOURCES" (or configurable)
- Style: Uppercase, gray, small font (12px), letter-spacing
- Left padding: 16px
- Optional left border accent (red/primary color)

**Links:**
- **Format:** Horizontal flex layout with gap
- **Style:** Body text, medium weight, no underline by default
- **Hover:** Text color change to primary, opacity transition
- **Active:** Bold text or underline (if on that page)
- **Icon Support:** Optional icons before/after text

**Responsive:**
- Desktop (1024px+): All links visible
- Tablet (768px-1023px): Compact layout, smaller gaps
- Mobile (375px-767px): Scrollable horizontal list or dropdown menu

### Configuration (app.config.ts)

```typescript
export default defineAppConfig({
  // ... existing config ...
  
  secondaryNav: {
    label: 'RESOURCES',
    links: [
      { label: 'Hire Me', href: '/hire', external: false },
      { label: 'Buy E-book', href: 'https://gumroad.com/...', external: true },
      { label: 'Courses', href: '/courses', external: false },
      { label: 'Services', href: '/services', external: false },
      { label: 'Contact', href: '/contact', external: false },
    ],
  },
})
```

### Environment Variables

```bash
# .env.example
# NUXT_PUBLIC_SECONDARY_NAV_LABEL=RESOURCES
# NUXT_PUBLIC_SECONDARY_NAV_LINKS=hire:Hire Me,ebook:Buy E-book,courses:Courses
```

## Component API

```typescript
// components/layout/SecondaryNav.vue
interface NavLink {
  label: string      // Display text
  href: string       // URL or route
  external?: boolean // Open in new tab if true
  icon?: string      // Optional Iconify icon
}

interface SecondaryNavConfig {
  label?: string     // Section label (e.g., "RESOURCES")
  links: NavLink[]   // Array of navigation links
}
```

## Visual Example

```
┌─ Main Navbar (z-50) ─────────────────────────────┐
│ Logo    Home Posts About    🔍  🌙               │
└────────────────────────────────────────────────────┘
┌─ Secondary Nav (z-40) ───────────────────────────┐
│ | RESOURCES                                       │
│ Tutorials  Build  Integrations  Fixes  Hire Us   │
└────────────────────────────────────────────────────┘
```

## Styling Details

**Light Mode:**
- Background: `bg-neutral-50`
- Text: `text-neutral-700`
- Border: `border-neutral-200`
- Hover: `hover:text-primary-600`

**Dark Mode:**
- Background: `dark:bg-neutral-900`
- Text: `dark:text-neutral-300`
- Border: `dark:border-neutral-800`
- Hover: `dark:hover:text-primary-400`

**Active State:**
- Text color: Primary color
- Font weight: Semibold (600)
- Optional underline: 2px primary color

## Implementation Location

- **Component:** `components/layout/SecondaryNav.vue`
- **Integration:** Inside `app.vue` between navbar and main content
- **Config:** `app.config.ts` (new `secondaryNav` object)
- **Env vars:** Optional, for dynamic configuration

## Task Assignment

**Task 16 (Post-Main Features):** Implement SecondaryNav component with:
1. Dynamic link configuration from app.config.ts
2. External link handling (target="_blank")
3. Dark mode support
4. Mobile-responsive layout
5. Optional section label
6. Active state highlighting (based on current route)

---

**Status:** Design reference for future implementation  
**Date Created:** 2026-08-11  
**Priority:** Optional (can be added after main 15 tasks)
