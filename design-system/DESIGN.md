# Tiago França Blog - Design System

**Version:** 2.0.0  
**Last Updated:** August 13, 2026  
**Approach:** Mobile-First, Clean & Modern

---

## Overview

Clean, minimalist design system focused on **readability**, **performance**, and **accessibility**. Inspired by technical blog platforms like RapidDeveloper. Built for static content with emphasis on content hierarchy and user experience.

### Key Principles

1. **Content First** — Design serves the content, not the reverse
2. **Minimal & Clean** — Remove visual clutter, embrace whitespace
3. **Fast & Performant** — No unnecessary animations or heavy effects
4. **Accessible** — WCAG AA compliant, keyboard navigation
5. **Responsive** — Mobile-first, adapts seamlessly to all screens

---

## Color Palette

### Light Mode (Default)

| Token | Hex | Usage |
|-------|-----|-------|
| **Primary** | #EF4444 | Hero sections, buttons, links, accents |
| **Primary Hover** | #DC2626 | Button hover/active states |
| **Primary Light** | #FEE2E2 | Highlights, backgrounds for CTAs |
| **Background** | #FFFFFF | Main background |
| **Background Alt** | #F9FAFB | Subtle backgrounds, alternates |
| **Background Muted** | #F3F4F6 | Tag backgrounds, disabled states |
| **Border** | #E5E7EB | Dividers, card borders |
| **Text** | #111827 | Primary text, headings |
| **Text Secondary** | #6B7280 | Secondary text, metadata |
| **Text Tertiary** | #9CA3AF | Muted text, captions |

### Dark Mode

Complete color inversion with adjusted contrast:
- **Background**: #0F172A (dark slate)
- **Text**: #F8FAFC (light slate)
- **Primary**: #FF6B6B (lighter red)
- All others follow same semantic structure

**Implementation:** CSS variables via `prefers-color-scheme` media query

---

## Typography

### Font Stack

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
```

No custom fonts — uses system fonts for maximum performance.

### Font Sizes

| Scale | Size | Line Height | Usage |
|-------|------|------------|-------|
| **XS** | 12px | 1.5x | Small labels, captions |
| **SM** | 14px | 1.5x | Meta text, dates |
| **Base** | 16px | 1.625x | **Body text, default** |
| **LG** | 18px | 1.625x | Larger body, emphasis |
| **XL** | 20px | 1.625x | Section subheadings |
| **2XL** | 24px | 1.25x | Post titles, H3 |
| **3XL** | 30px | 1.25x | Section headings, H2 |
| **4XL** | 36px | 1.25x | Page titles, H1 |
| **5XL** | 48px | 1.25x | Hero headings |

### Font Weights

- **Light (300)** — Subtle emphasis, secondary content
- **Normal (400)** — **Body text, default**
- **Medium (500)** — Slightly emphasized text
- **Semibold (600)** — **Button text, UI labels**
- **Bold (700)** — Headings, strong emphasis
- **Extrabold (800)** — High emphasis, hero titles

### Heading Hierarchy

| Tag | Size | Weight | Margin Bottom |
|-----|------|--------|---|
| H1 | 36px | 700 | 24px |
| H2 | 30px | 700 | 20px |
| H3 | 24px | 600 | 16px |
| H4 | 20px | 600 | 12px |
| H5 | 18px | 600 | 8px |
| H6 | 16px | 600 | 4px |

### Body Text

- **Paragraph**: 16px, normal, 1.625x line-height
- **Small text**: 14px (metadata, dates, captions)
- **Code**: 14px, monospace, background #F3F4F6

---

## Spacing Scale

All spacing uses a base unit of **8px**:

| Token | Value | Usage |
|-------|-------|-------|
| 0 | 0px | No space |
| 2 | 8px | Tight spacing, icon padding |
| 4 | 16px | **Standard padding** |
| 6 | 24px | Section spacing |
| 8 | 32px | **Major section separation** |
| 12 | 48px | Large gaps |
| 16 | 64px | Page margins |
| 20 | 80px | Hero padding |
| 24 | 96px | Large sections |

---

## Layout & Responsive Breakpoints

### Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| **Mobile** | < 640px | Single column |
| **Tablet** | 640px - 1023px | 2 columns (sidebar hidden) |
| **Desktop** | ≥ 1024px | 2-3 columns (sidebar visible) |

### Containers

- **Max width**: 1280px (centered)
- **Padding**: 16px mobile, 24px tablet, 32px desktop
- **Grid gap**: 24px

---

## Components

### Hero Section

Large banner at top of pages with call-to-action.

**Specifications:**
- **Background**: Primary red (#EF4444)
- **Text**: White
- **Padding**: 32px 16px (mobile) → 48px 64px (desktop)
- **Min Height**: Auto (mobile) → 320px (desktop)
- **Layout**: Column (mobile) → 2-column with image/visual (desktop)

**Elements:**
- Large headline (36-48px, bold)
- Subheading/description (16-18px)
- CTA button (primary style)
- Optional visual (image, graphic)

```vue
<section class="bg-primary text-white py-12 md:py-16">
  <div class="mx-auto max-w-6xl px-4 md:px-8 grid md:grid-cols-2 gap-8 items-center">
    <div>
      <h1 class="text-5xl md:text-6xl font-bold mb-4">Headline</h1>
      <p class="text-lg mb-6">Description or tagline</p>
      <button class="btn btn-secondary">Call to Action</button>
    </div>
    <div>
      <!-- Image or visual -->
    </div>
  </div>
</section>
```

### Navbar

Fixed navigation bar at top of page.

**Specifications:**
- **Height**: 64px
- **Background**: White
- **Border**: Bottom 1px solid #E5E7EB
- **Shadow**: Subtle shadow (sm)
- **Position**: Sticky

**Content:**
- Logo/branding (left)
- Navigation links (center, desktop only)
- Search, theme toggle, menu button (right)

### Post Cards

Card component for displaying blog posts in grid/list.

**Specifications:**
- **Padding**: 24px
- **Background**: White
- **Border**: 1px solid #E5E7EB
- **Border Radius**: 8px
- **Shadow**: sm (hover: md)
- **Transition**: 300ms ease

**Layout (Desktop):**
```
┌─────────────────────────────┐
│  Logo  │  Post Title        │
│        │  Description text  │
│        │                    │
│        │  Date  |  Read time│
│        │  [Read more]       │
└─────────────────────────────┘
```

**Layout (Mobile):**
```
┌──────────────────────────┐
│  Logo  Post Title        │
│  Description text        │
│  Date  |  Read time      │
│  [Read more]             │
└──────────────────────────┘
```

### Tags/Chips

Small badge components for categorization.

**Specifications:**
- **Padding**: 6px 12px
- **Background**: #F3F4F6
- **Border**: 1px solid #E5E7EB
- **Border Radius**: 9999px (pill shape)
- **Font**: 14px, normal weight
- **Cursor**: Pointer (clickable)

**Hover State:**
- **Background**: #E5E7EB
- **Transition**: 150ms

### Buttons

Interactive button elements.

**Primary Button:**
- **Background**: #EF4444
- **Color**: White
- **Padding**: 12px 20px (md)
- **Border Radius**: 6px
- **Hover**: #DC2626

**Secondary Button:**
- **Background**: #F3F4F6
- **Color**: #111827
- **Border**: 1px solid #E5E7EB
- **Hover**: #E5E7EB background

**States:**
- **Hover**: Darker background
- **Active**: Even darker
- **Disabled**: 50% opacity
- **Transition**: 150ms fast

### Post Detail Layout

Full-width post view with sidebar.

**Desktop (1024px+):**
```
┌─────────────────────────────────────┐
│  Hero section with title            │
├─────────────────────────────────────┤
│              │                      │
│  TOC Sidebar │  Post Content        │
│              │                      │
│              │  - Markdown rendered │
│              │  - Code blocks       │
│              │  - Images            │
│              │  - CTAs              │
│              │                      │
└─────────────────────────────────────┘
```

**Mobile (< 1024px):**
```
┌──────────────────────────┐
│ Hero with title          │
├──────────────────────────┤
│ TOC (collapsible)        │
├──────────────────────────┤
│ Post Content             │
│ - Markdown               │
│ - Code                   │
│ - Images                 │
│ - CTAs                   │
└──────────────────────────┘
```

**Sidebar (TOC):**
- **Width**: 280px (desktop)
- **Position**: Sticky
- **Background**: #F9FAFB
- **Padding**: 24px
- **Border**: Right 1px solid #E5E7EB
- **Scrollable**: Yes (if content overflows)

### Footer

Footer section at bottom of page.

**Specifications:**
- **Background**: Dark (#0F172A in dark mode, light background in light mode)
- **Padding**: 48px 24px
- **Text**: Secondary text color
- **Layout**: Multi-column (desktop) → stacked (mobile)

---

## Accessibility

### WCAG AA Compliance

- **Contrast Ratio**: Minimum 4.5:1 for normal text
- **Focus Indicators**: Visible 2px outline on all interactive elements
- **Keyboard Navigation**: Tab order follows visual hierarchy
- **Color Independence**: Meaning not conveyed by color alone
- **Motion**: Respects `prefers-reduced-motion`

### Best Practices

- Use semantic HTML (`<button>`, `<nav>`, `<article>`)
- Always include `alt` text for images
- Use proper heading hierarchy (h1 → h2 → h3)
- Include skip navigation link
- Ensure touch targets are ≥ 44px
- Use ARIA labels on icon-only buttons

---

## Performance & Best Practices

### CSS & Styling

- Use Tailwind utilities only (no custom CSS)
- Use CSS variables for theme colors
- Minimize animations (only for feedback)
- Prefer transforms and opacity for animations

### Typography

- Keep line length 50-75 characters for readability
- Use 1.5x+ line height for body text
- Use monospace for code
- Use system fonts (no web font downloads)

### Images

- Use `loading="lazy"` for below-fold images
- Use `srcset` for responsive images
- Always include descriptive `alt` text
- Optimize before upload

### Responsive Design

- Mobile-first approach
- Test at: 375px, 640px, 1024px, 1280px
- Use flexbox/grid for layouts
- Hide non-essential elements on mobile

---

## File References

All specifications and token values are defined in `design.json`:

- **Colors** (light & dark modes)
- **Typography** (sizes, weights, line heights)
- **Spacing scale**
- **Border radius values**
- **Shadow definitions**
- **Component specifications**

Refer to `design.json` for exact pixel/hex values when implementing.

---

## Summary

This design system prioritizes **clarity**, **performance**, and **accessibility**. It's intentionally minimal with no unnecessary visual complexity. Focus is on **readable content** and **smooth user experience** across all devices.

**Implementation**: Use Tailwind CSS utilities + design tokens from `design.json` + semantic Vue 3 components.
