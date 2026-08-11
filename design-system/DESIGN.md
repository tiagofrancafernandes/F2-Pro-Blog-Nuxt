# Vue Blog System - Design System Guide

**Version:** 1.0.0  
**Last Updated:** August 11, 2026  
**Compliance:** WCAG AA  
**Approach:** Mobile-First

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Component Specifications](#component-specifications)
6. [Accessibility](#accessibility)
7. [Best Practices](#best-practices)

---

## Design Philosophy

The Vue Blog System design philosophy is built on three core principles:

### 1. **Mobile-First Approach**
We design for mobile devices first, then progressively enhance for larger screens. This ensures optimal user experience across all devices and focuses on essential content and functionality.

### 2. **Responsive & Dynamic**
The design system adapts seamlessly across breakpoints:
- **Mobile:** 0px - 639px
- **Tablet:** 640px - 1023px
- **Desktop:** 1024px - 1535px
- **Wide:** 1536px and above

See `design.json` for exact breakpoint values.

### 3. **Dark Mode Support**
All components support both light and dark color modes with maintained contrast ratios and visual hierarchy. Colors are automatically switched based on user preference.

### 4. **Accessibility First**
- WCAG AA compliant contrast ratios
- Semantic HTML structure
- Keyboard navigation support
- Focus indicators on all interactive elements
- Proper heading hierarchy
- Alternative text for images
- Clear error messages

### 5. **Performance & Clarity**
- Minimal animations (purpose-driven only)
- Clear visual hierarchy
- Consistent spacing and alignment
- Intuitive component interactions
- Clean typography with proper readability

---

## Color Palette

The color system consists of primary colors, secondary colors, neutral tones, and semantic accent colors. All values are defined in `design.json` under the `colors` property.

### Light Mode Colors

#### Primary Colors
The primary color palette is used for calls-to-action, links, and key interactive elements.

| Shade | Hex Value | Usage |
|-------|-----------|-------|
| 50 | #fef2f2 | Very light backgrounds |
| 100 | #fee2e2 | Light backgrounds |
| 200 | #fecaca | Hover states |
| 300 | #fca5a5 | Disabled states |
| 400 | #f87171 | Subtle highlights |
| 500 | #ef4444 | **Primary action buttons (Red)** |
| 600 | #dc2626 | Hover on primary |
| 700 | #b91c1c | Active state |
| 800 | #991b1b | Dark accent |
| 900 | #7f1d1d | Very dark accent |

**Usage:** Primary buttons, links, focus states, active tab indicators.

#### Secondary Colors (Gray Scale)
Used for backgrounds, borders, and secondary UI elements.

| Shade | Hex Value | Usage |
|-------|-----------|-------|
| 50 | #f8f8f8 | Lightest background |
| 100 | #f0f0f0 | Light backgrounds |
| 200 | #e5e5e5 | Secondary buttons |
| 300 | #d4d4d4 | Hover states |
| 400 | #a6a6a6 | Active states |
| 500 | #737373 | **Secondary text** |
| 600 | #525252 | Hover secondary |
| 700 | #404040 | Darker text |
| 800 | #262626 | Dark secondary |
| 900 | #171717 | Very dark secondary |

**Usage:** Secondary buttons, backgrounds, borders, secondary text, component accents.

#### Neutral Colors (Grayscale)
Used for text, backgrounds, borders, and structural elements.

| Shade | Hex Value | Usage |
|-------|-----------|-------|
| 0 | #ffffff | Pure white |
| 50 | #f9fafb | Lightest background |
| 100 | #f3f4f6 | Light background |
| 200 | #e5e7eb | Light borders |
| 300 | #d1d5db | Medium borders |
| 400 | #9ca3af | Tertiary text |
| 500 | #6b7280 | Secondary text |
| 600 | #4b5563 | Tertiary text |
| 700 | #374151 | Medium text |
| 800 | #1f2937 | Dark text |
| 900 | #111827 | **Primary text** |
| 950 | #030712 | Almost black |

**Usage:** Text, backgrounds, borders, dividers.

#### Semantic Colors
Convey meaning through color (status, actions, alerts).

| Color | Hex Value | Usage |
|-------|-----------|-------|
| Success | #10b981 | Success messages, confirmations |
| Warning | #f59e0b | Warning messages, caution |
| Danger | #ef4444 | Error messages, destructive actions |
| Info | #3b82f6 | Information, help text |

### Dark Mode Colors

The dark mode uses inverted color values while maintaining the same visual hierarchy and contrast ratios. Primary colors (red) become lighter and backgrounds become darker.

#### Dark Mode Primary (Red variants - Full values in `design.json`)
| Shade | Hex Value | Usage |
|-------|-----------|-------|
| 500 | #f87171 | **Primary buttons in dark mode** |
| 600 | #fca5a5 | Primary hover state |
| 900 | #fef2f2 | Primary light accent |

#### Dark Mode Secondary (Gray variants - Full gradient in `design.json`)
- **Primary Background:** #0f0f0f
- **Secondary Background:** #1a1a1a
- **Tertiary Background:** #2d2d2d
- **Primary Text:** #f5f5f5
- **Secondary Text:** #bfbfbf

**Dark mode automatically inverts the color scheme while preserving contrast and readability.**

### Color Usage Guidelines

1. **Consistency:** Use primary color (#ef4444 red in light mode, lighter red shades in dark mode) for all primary actions
2. **Contrast:** Minimum contrast ratio of 4.5:1 for text
3. **Accessibility:** Don't rely on color alone to convey information
4. **Semantic Colors:** Use success, warning, danger, and info colors consistently across the application
5. **Backgrounds:** Use secondary 50-100 (light gray) in light mode, secondary 100-200 in dark mode

For exact color hex values in all states, refer to `design.json`.

---

## Typography

Typography creates visual hierarchy, guides user attention, and ensures readability across all devices.

### Font Families

Three font families are used for different purposes:

| Family | Font Stack | Usage |
|--------|-----------|-------|
| **Serif** | Merriweather, Georgia, serif | Blog post content, quotes |
| **Sans Serif** | Inter, system fonts | Headings, UI, buttons, body text |
| **Monospace** | Fira Code, Monaco, Courier New | Code blocks, technical content |

See `design.json` under `typography.fontFamily` for the complete font stack.

### Font Sizes & Line Heights

Mobile-first responsive typography. Sizes scale appropriately for different breakpoints.

| Scale | Mobile Size | Desktop Size | Line Height |
|-------|------------|--------------|------------|
| **XS** | 12px | 12px | 16px |
| **SM** | 14px | 14px | 20px |
| **Base** | 16px | 16px | 24px |
| **LG** | 18px | 18px | 28px |
| **XL** | 20px | 20px | 30px |
| **2XL** | 24px | 24px | 32px |
| **3XL** | 30px | 30px | 36px |
| **4XL** | 36px | 36px | 44px |
| **5XL** | 48px | 48px | 56px |

Full specifications in `design.json` under `typography.fontSize`.

### Font Weights

| Weight Name | Value | Usage |
|------------|-------|-------|
| Light | 300 | Subtle text, muted information |
| Normal | 400 | Body text, default content |
| Medium | 500 | Slightly emphasized text |
| Semibold | 600 | Subheadings, UI labels |
| Bold | 700 | Headings, strong emphasis |
| Extrabold | 800 | Heroic headings |
| Black | 900 | High emphasis headings |

### Heading Hierarchy

All headings use the sans-serif font family. Clear visual hierarchy is maintained across all device sizes.

| Heading | Font Size | Weight | Line Height | Margin Bottom | Usage |
|---------|-----------|--------|------------|----------------|-------|
| **H1** | 48px | 700 | 56px | 32px | Page titles, hero sections |
| **H2** | 36px | 700 | 44px | 24px | Section headings |
| **H3** | 30px | 600 | 36px | 20px | Subsection headings |
| **H4** | 24px | 600 | 32px | 16px | Content headings |
| **H5** | 20px | 600 | 30px | 12px | Minor headings |
| **H6** | 16px | 600 | 24px | 8px | Auxiliary headings |

All heading specifications in `design.json` under `typography.headings`.

### Body Text

| Type | Font Size | Weight | Line Height | Font Family | Usage |
|------|-----------|--------|------------|-------------|-------|
| Default | 16px | 400 | 24px | Sans Serif | Main body text, paragraphs |
| Small | 14px | 400 | 20px | Sans Serif | Caption text, metadata |

### Code Text

| Property | Value |
|----------|-------|
| Font Family | Monospace |
| Font Size | 14px |
| Line Height | 20px |
| Font Weight | 400 |
| Background | background.tertiary |
| Padding | 2px 6px |
| Border Radius | 4px |

See `design.json` under `typography.code` for complete specifications.

### Typography Best Practices

1. **Hierarchy:** Use heading sizes and weights to create clear visual hierarchy
2. **Line Length:** Keep line length between 50-75 characters for optimal readability
3. **Line Height:** Maintain minimum 1.5x line height for body text
4. **Contrast:** Ensure minimum 4.5:1 contrast ratio between text and background
5. **Responsive:** Font sizes adapt appropriately for mobile, tablet, and desktop
6. **Readability:** Use serif fonts for long-form content, sans-serif for UI

---

## Spacing & Layout

Consistent spacing creates rhythm, alignment, and visual clarity throughout the application.

### Spacing Scale

A consistent 4px base unit is used for all spacing values:

| Token | Value | Use Cases |
|-------|-------|-----------|
| **0** | 0px | No space |
| **1** | 4px | Micro-interactions, icon padding |
| **2** | 8px | Tight spacing between elements |
| **3** | 12px | Condensed layouts |
| **4** | 16px | **Standard element padding** |
| **5** | 20px | Comfortable spacing |
| **6** | 24px | Section spacing |
| **7** | 28px | Large spacing |
| **8** | 32px | **Major section separation** |
| **9** | 36px | Large gaps |
| **10** | 40px | Spacing between major sections |
| **12** | 48px | Generous spacing |
| **14** | 56px | Extra-large spacing |
| **16** | 64px | Very large spacing |
| **20** | 80px | Hero-level spacing |
| **24** | 96px | Page section spacing |

Full scale in `design.json` under `spacing`.

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| **none** | 0px | Sharp corners |
| **sm** | 2px | Subtle roundness |
| **base** | 4px | Default buttons, small elements |
| **md** | 6px | Input fields |
| **lg** | 8px | **Cards, buttons** |
| **xl** | 12px | Larger containers |
| **2xl** | 16px | Extra-large containers |
| **3xl** | 24px | Hero sections |
| **full** | 9999px | Circular elements, pills |

All values in `design.json` under `borderRadius`.

### Shadows

Elevation shadows provide depth and visual hierarchy:

| Token | CSS Value | Usage |
|-------|-----------|-------|
| **none** | none | No shadow (default) |
| **sm** | 0 1px 2px 0 rgba(0, 0, 0, 0.05) | Subtle elevation |
| **base** | 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) | **Default elements** |
| **md** | 0 4px 6px -1px rgba(0, 0, 0, 0.1), ... | Card hover, interactive elements |
| **lg** | 0 10px 15px -3px rgba(0, 0, 0, 0.1), ... | Modals, dropdowns |
| **xl** | 0 20px 25px -5px rgba(0, 0, 0, 0.1), ... | Floating elements |
| **2xl** | 0 25px 50px -12px rgba(0, 0, 0, 0.25) | Maximum elevation |

All shadow definitions in `design.json` under `shadows`.

---

## Component Specifications

### Navbar

The navbar is the primary navigation component, appearing at the top of every page.

**Specifications** (from `design.json`):
- **Height:** 64px (56px on mobile, 64px on tablet/desktop)
- **Padding:** 16px 24px
- **Background:** background.primary
- **Border:** 1px solid border.light
- **Box Shadow:** sm
- **Z-Index:** 100
- **Position:** Sticky (stays at top on scroll)

**Features:**
- Logo/brand name on the left
- Navigation links/menu in the center
- Search, theme toggle, and profile actions on the right
- Responsive: collapses to hamburger menu on mobile
- Sticky positioning for easy access

**Mobile Responsiveness:**
- Height: 56px on mobile
- Hamburger menu button visible
- Logo and one action button visible
- Secondary navigation hidden behind menu

**Dark Mode:**
- Background automatically switches to dark.background.primary
- Text color to dark.text.primary
- Border color to dark.border.light

### Sidebar

Secondary navigation sidebar providing topic/category navigation.

**Specifications** (from `design.json`):
- **Width:** 280px
- **Padding:** 24px
- **Background:** background.secondary
- **Border:** 1px solid border.light (right side)
- **Position:** Sticky
- **Top:** 64px (below navbar)
- **Z-Index:** 50
- **Overflow:** Auto (scrollable)

**Responsive Behavior:**
- **Mobile:** hidden (display: none)
- **Tablet:** visible (flex)
- **Desktop:** visible (flex)

**Features:**
- Category/topic list
- Sub-menu expansion on hover/click
- Active state highlighting
- Scrollable for long lists
- Maintains scroll position on navigation

**Content Structure:**
```
Category 1
├── Topic 1.1
├── Topic 1.2
└── Topic 1.3
Category 2
├── Topic 2.1
└── Topic 2.2
```

### Post Card

Card component displaying individual blog posts or articles.

**Specifications** (from `design.json`):
- **Padding:** 20px
- **Background:** background.primary
- **Border:** 1px solid border.light
- **Border Radius:** lg (8px)
- **Box Shadow:** sm
- **Transition:** normal (300ms)

**Hover State:**
- **Box Shadow:** md
- **Transform:** translateY(-2px) (slight upward movement)

**Responsive Image Heights:**
- **Mobile:** 200px
- **Tablet:** 240px
- **Desktop:** 280px

**Content Structure:**
```
┌─────────────────────────┐
│   Featured Image        │  (200-280px height)
├─────────────────────────┤
│ Post Category (label)   │
│                         │
│ Post Title (h3)         │
│                         │
│ Post Excerpt (body)     │
│                         │
│ Date  |  Read Time      │  (sm text)
│                         │
│ [Read More] [Share]     │  (buttons)
└─────────────────────────┘
```

**States:**
- **Default:** sm shadow, border visible
- **Hover:** md shadow, slight scale-up, clickable
- **Active/Selected:** outline with primary color
- **Loading:** skeleton placeholder

**Accessibility:**
- `role="article"` or semantic `<article>` tag
- Proper heading hierarchy
- Image `alt` text required
- Focus-visible outline

### Footer

Footer component appearing at the bottom of every page.

**Specifications** (from `design.json`):
- **Background:** background.secondary
- **Border:** 1px solid border.light (top side)
- **Padding:** 48px 24px
- **Margin Top:** auto (sticks to bottom)
- **Min Height:** 200px

**Content Areas:**
```
┌─────────────────────────────────────┐
│  Logo/Brand | Links | Social Icons  │
├─────────────────────────────────────┤
│  Categories | Archive | Navigation  │
├─────────────────────────────────────┤
│  Copyright | Privacy | Contact      │
└─────────────────────────────────────┘
```

**Sections:**
1. **Brand Section** (left): Logo, tagline
2. **Links Section** (center): Navigation, categories, archives
3. **Social Section** (right): Social media links
4. **Bottom Section**: Copyright, legal links, contact

**Mobile Layout:**
- Stack vertically
- Each section full-width
- Centered text alignment
- Reduced padding (24px)

**Desktop Layout:**
- Multi-column grid layout
- Left-aligned sections
- 48px padding
- Maintains hierarchy

### Button

Interactive button component with multiple variants.

**Specifications** (from `design.json`):
- **Border Radius:** lg (8px)
- **Font Size:** base (16px)
- **Font Weight:** 600 (semibold)
- **Transition:** fast (150ms)
- **Cursor:** pointer
- **Border:** none (except outline variant)
- **Text Decoration:** none

**Padding Sizes:**
- **SM:** 8px 16px
- **MD:** 12px 20px (default)
- **LG:** 16px 24px

**Variants:**
1. **Primary:**
   - Background: primary.500
   - Color: white
   - Hover: primary.600
   - Usage: Main actions (CTA, submit)

2. **Secondary:**
   - Background: neutral.200
   - Color: text.primary
   - Hover: neutral.300
   - Usage: Alternative actions

3. **Outline:**
   - Background: transparent
   - Border: 2px solid primary.500
   - Color: primary.500
   - Hover: primary.50 background
   - Usage: Secondary options, cancellation

4. **Ghost:**
   - Background: transparent
   - Color: primary.500
   - Hover: neutral.100 background
   - Usage: Minimal actions, links

**States:**
- **Hover:** Darker background or border color
- **Active:** Enhanced shadow/depth
- **Disabled:** 50% opacity, cursor: not-allowed
- **Loading:** Spinner icon, disabled state

### Input Field

Text input component for form entry.

**Specifications** (from `design.json`):
- **Padding:** 12px 16px
- **Font Size:** base (16px)
- **Border Radius:** lg (8px)
- **Border:** 1px solid border.light
- **Transition:** fast (150ms)

**Focus State:**
- **Border Color:** primary.500
- **Outline:** none
- **Box Shadow:** 0 0 0 3px primary.50 (ring effect)

**Placeholder:**
- Color: text.tertiary
- Font Size: base
- Font Style: normal

**States:**
- **Default:** border.light
- **Focus:** primary.500 border + ring
- **Hover:** border.medium
- **Error:** danger color border + background tint
- **Disabled:** background.tertiary, text.disabled
- **Success:** success color border

**Accessibility:**
- Associated `<label>` element required
- `aria-describedby` for help text
- `aria-invalid="true"` for errors
- Clear focus indicator

### Card

Generic container component for grouping content.

**Specifications** (from `design.json`):
- **Padding:** 24px
- **Background:** background.primary
- **Border Radius:** xl (12px)
- **Border:** 1px solid border.light
- **Box Shadow:** base

**Usage:**
- Content containers
- Feature sections
- Information panels
- Flexible layout component

**Variants:**
- **Elevated:** box-shadow: lg
- **Flat:** box-shadow: none
- **Outlined:** box-shadow: none, border: 2px
- **Filled:** filled background, no border

---

## Accessibility

Accessibility is built into every component and guideline.

### WCAG AA Compliance

- **Contrast Ratio:** Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus Indicators:** Visible on all interactive elements (2px outline minimum)
- **Keyboard Navigation:** All functionality accessible via keyboard
- **Color Independence:** Information not conveyed by color alone
- **Motion:** Respects `prefers-reduced-motion` user preference

### Semantic HTML

- Use proper heading hierarchy (h1, h2, h3, etc.)
- Use semantic elements (`<button>`, `<nav>`, `<article>`, etc.)
- Use `<label>` for form inputs
- Use `<fieldset>` and `<legend>` for grouped inputs
- Use `<main>`, `<header>`, `<footer>`, `<nav>` for layout

### ARIA Attributes

- Use `aria-label` for icon-only buttons
- Use `aria-describedby` for form field descriptions
- Use `aria-invalid="true"` for error states
- Use `role="article"` for post cards
- Use `aria-live="polite"` for dynamic updates
- Use `aria-expanded` for collapsible sections

### Focus Management

- Visible focus outline on all interactive elements
- Focus order follows visual/logical order (left-to-right, top-to-bottom)
- Skip links for keyboard users
- Trap focus in modals
- Restore focus after closing modals

### Color & Contrast

- Text: minimum 4.5:1 contrast ratio
- Large text (18px+): minimum 3:1 contrast ratio
- UI components: minimum 3:1 contrast ratio
- Don't rely on color alone to convey information

### Motion & Animation

- Respect `prefers-reduced-motion: reduce`
- Use animations for emphasis, not distraction
- Keep animations under 500ms
- Avoid rapid flashing (> 3 times per second)

---

## Best Practices

### Using the Design System

1. **Consistency:** Use provided components and styles consistently
2. **Color Tokens:** Always use color values from `design.json`
3. **Spacing:** Use spacing scale values (0-32px) for all margins/padding
4. **Typography:** Use defined font sizes and weights from `design.json`
5. **Shadows:** Apply shadows only from the shadow scale
6. **Transitions:** Use standard transition durations (fast, normal, slow)

### Component Integration

1. **Import Components:** Reference components from design system
2. **Customize via Props:** Use `class`, `ui`, and variant props
3. **Theme Support:** All components automatically support light/dark mode
4. **Responsive:** Design components to respond to breakpoints automatically
5. **Accessibility:** Include ARIA attributes and semantic HTML

### Dark Mode Implementation

1. **Automatic Switching:** Use CSS variables or Nuxt UI's `useColorMode()`
2. **Color Values:** Reference dark mode colors from `design.json` dark mode section
3. **Testing:** Test all components in both light and dark modes
4. **User Preference:** Respect `prefers-color-scheme` media query

### Mobile-First Design

1. **Start Mobile:** Design for mobile 0-639px first
2. **Progressive Enhancement:** Add features for tablet/desktop
3. **Touch Targets:** Minimum 44px x 44px button sizes
4. **Readable Text:** Minimum 16px on mobile
5. **Simplify:** Hide non-essential elements on mobile

### Responsive Images

1. **Lazy Loading:** Use `loading="lazy"` attribute
2. **Responsive Sources:** Use `<picture>` and `srcset` for different sizes
3. **Alt Text:** Always include descriptive `alt` text
4. **Aspect Ratio:** Maintain consistent image aspect ratios
5. **Picsum Photos:** Use https://picsum.photos for dummy images

### Performance

1. **Critical CSS:** Load styles for above-the-fold content first
2. **Font Loading:** Use `font-display: swap` for custom fonts
3. **Image Optimization:** Compress and optimize all images
4. **CSS Classes:** Use class-based styling (Tailwind) instead of inline styles
5. **Animations:** Use CSS transforms and opacity for 60fps animations

---

## File References

All exact values and specifications are defined in the following file:

**`design-system/design.json`**

This JSON file contains:
- Complete color palette (light and dark)
- Font families and sizes
- Typography hierarchy
- Spacing scale
- Border radius values
- Shadow definitions
- Breakpoint definitions
- Component specifications
- Transition timings

Always refer to `design.json` for exact pixel/hex values when implementing components.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Aug 11, 2026 | Initial design system documentation |

---

## Contributing

When adding new components or updating existing ones:

1. Update `design.json` with new specifications
2. Update this `DESIGN.md` document
3. Ensure WCAG AA compliance
4. Test in light and dark modes
5. Test responsive behavior (mobile, tablet, desktop)
6. Document accessibility features
7. Include component usage examples

---

**Design System by:** Tiago França  
**Project:** Vue Blog System  
**Framework:** Nuxt 4 + Tailwind CSS v4  
**Design Reference:** `design-system/design.json`

