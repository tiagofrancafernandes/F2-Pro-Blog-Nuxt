# Table of Contents Component — Design Reference

**Reference Image:** `table-of-contents-reference.png`

## Overview

The **Table of Contents (TOC)** component automatically extracts heading hierarchy from post markdown content and renders a navigable outline on the PostDetail page.

## Design Specifications

### Layout & Positioning
- **Position:** Sticky sidebar (desktop) or collapsible (mobile)
- **Width:** ~280px on desktop
- **Section Header:** "ON THIS PAGE" (light gray, uppercase, small font)
- **Background:** Light gray or subtle background color

### Styling

**Heading Items:**
- **Format:** `[NUMBER]. [Heading Text]`
- **Number:** Two digits (01, 02, 03, etc.)
- **Inactive:** Gray text, lighter weight
- **Active:** Bold black text + red left border (4px)
- **Font Size:** 14px body text
- **Line Height:** Comfortable spacing (24px)

**Numbering:**
- Auto-numbered based on heading order
- Two-digit format with leading zero
- Increment for each heading level

**Active State:**
- Red vertical line (4px width) on left
- Bold text color
- Indicates current scroll position

### Visual Example

```
ON THIS PAGE

01   Why GitHub Does Not Render HTML Files
02   Prerequisites
03   Step-by-step guide  ← Active (bold + red line)
04   Complete working example
05   Common mistakes
06   Best practices
07   Still stuck?
08   Related tutorials
09   Frequently asked questions
```

## Implementation Details

### Heading Extraction
- **Extract from:** Post markdown content
- **Headings to include:** H2-H6 (skip H1, which is post title)
- **Format:** Extract text content, clean HTML tags
- **IDs:** Auto-generate slugs for heading IDs (for anchor links)

### Active Scroll Detection
- **Method:** Intersection Observer API
- **Update:** As user scrolls through content
- **Highlight:** Mark current section as active
- **Smooth:** Scroll to heading when clicked

### Accessibility
- **Links:** Each TOC item is clickable (anchor link)
- **Skip Link:** Allow keyboard navigation
- **ARIA labels:** `aria-label="Table of contents"`, `aria-current="location"` for active

### Responsive Behavior
- **Desktop (1024px+):** Sticky sidebar on right
- **Tablet (768px-1023px):** Sticky sidebar, narrower
- **Mobile (375px-767px):** Collapsible section or dropdown

## Usage

In PostDetail component:

```vue
<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
  <!-- Main content -->
  <div class="lg:col-span-3">
    <div class="prose dark:prose-invert" v-html="post.content" />
  </div>

  <!-- Table of Contents Sidebar -->
  <div class="lg:col-span-1">
    <TableOfContents :content="post.content" />
  </div>
</div>
```

## Component API

```typescript
interface TableOfContentsProps {
  content: string  // HTML or markdown content
}

interface Heading {
  level: number    // 2-6
  text: string     // Extracted heading text
  id: string       // Auto-generated anchor ID
  number: string   // "01", "02", etc.
}
```

## Dark Mode Support

- **Text color:** Neutral 600 (light mode) / Neutral 400 (dark mode)
- **Active text:** Neutral 900 (light mode) / Neutral 100 (dark mode)
- **Background:** Neutral 50 (light mode) / Neutral 900 (dark mode)
- **Red border:** Consistent across modes (red-600)

## Related Components

- **PostDetail.vue** — Main component using TOC
- **MarkdownRenderer** — Renders markdown with heading IDs for anchoring

---

**Status:** Design reference for Task 12 (PostDetail Integration)  
**Date Created:** 2026-08-11
