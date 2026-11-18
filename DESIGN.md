# Design System Specification (`DESIGN.md`)

> 🎨 **References & Inspiration:**
> - Curated UI/UX Reference Library: [styles.refero.design](https://styles.refero.design)
> - AI-Native Design System Standard: [github.com/VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)
> - Companion Brand Document: [Brand Identity & Guidelines (brand.md)](./brand.md)
> - Project Overview: [Project README (README.md)](./README.md)

---

## 1. Visual Theme & Atmosphere

**AlumniConnect** adopts a **Modern Editorial SaaS & Academic Precision** aesthetic inspired by high-craft web applications on *Refero Design* and the structured specifications of *VoltAgent/awesome-design-md*.

- **Mood & Aesthetic Direction:** Crisp, trustworthy, high-signal, and distraction-free. Combines the editorial gravitas of a university institution with the kinetic clarity of modern developer/career platforms (Linear, Stripe, Read.cv).
- **Visual Density:** Balanced medium density. Data-rich tables (`/users`, `/applications`) and multi-field forms (`/job-postings`, `/announcements`) breathe comfortably inside structured `1px` bordered cards on a cool alabaster canvas (`#F8FAFC`).
- **Signature Motifs:**
  - Frosted glass top navigation bar (`backdrop-filter: blur(12px)`) with active route pills and live API health indicator.
  - Subtle gradient hero banners with pill callouts and quick-stat counters.
  - Semantic status pills (`Pending`, `Reviewing`, `Accepted`, `Rejected`) and category badges (`Event`, `Career`, `Mentorship`, `General`).

---

## 2. Color Palette & Roles

All pages share a unified set of CSS Custom Properties (`:root`) for strict visual consistency:

| Semantic Token | Hex / Value | Functional Role |
|---|---|---|
| `--bg-canvas` | `#F8FAFC` | Primary page background (Cool Alabaster) |
| `--bg-surface` | `#FFFFFF` | Primary card, table, and modal surface (Pure Ivory) |
| `--bg-subtle` | `#F1F5F9` | Secondary surface, table headers, and code/requirement boxes |
| `--text-primary` | `#0F172A` | Primary headings, titles, and strong body copy (Bosphorus Obsidian) |
| `--text-secondary` | `#475569` | Descriptions, subtitles, and form labels (Slate Gray) |
| `--text-muted` | `#94A3B8` | Timestamps, placeholders, and metadata captions |
| `--brand-primary` | `#4F46E5` | Primary interactive CTA, active nav pill, focus ring (Royal Indigo) |
| `--brand-primary-hover` | `#4338CA` | Hover state for primary buttons and links |
| `--brand-accent` | `#0284C7` | Career & job posting highlights (Bosphorus Cyan) |
| `--status-success-bg` / `--status-success-fg` | `#DCFCE7` / `#166534` | Accepted status, health OK badge, confirmation banners |
| `--status-warning-bg` / `--status-warning-fg` | `#FEF3C7` / `#92400E` | Pending application status, internship/hybrid tags |
| `--status-info-bg` / `--status-info-fg` | `#E0E7FF` / `#3730A3` | Reviewing status, category pills, count badges |
| `--status-danger-bg` / `--status-danger-fg` | `#FFE4E6` / `#BE123C` | Rejected status, delete buttons, 404/5xx Guardian alerts |
| `--border-subtle` | `#E2E8F0` | Card perimeters, table row dividers, and form inputs |

---

## 3. Typography Rules

We use a clean 3-tier typographic system loaded via Google Fonts (`Plus Jakarta Sans`, `Inter`, and `JetBrains Mono`) with system-ui fallbacks:

- **Heading Font (`--font-display`):** `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **Body Font (`--font-sans`):** `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **Monospace Font (`--font-mono`):** `'JetBrains Mono', 'SFMono-Regular', Consolas, monospace`

| Element / Level | Font Family | Size (`rem` / `px`) | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| **Display Hero (`h1.hero-title`)** | `--font-display` | `2.25rem` (`36px`) | `800` | `1.2` | `-0.025em` |
| **Page Title (`h1`)** | `--font-display` | `1.875rem` (`30px`) | `800` | `1.25` | `-0.02em` |
| **Section Header (`h2`)** | `--font-display` | `1.25rem` (`20px`) | `700` | `1.35` | `-0.015em` |
| **Card Title (`h3`)** | `--font-display` | `1.125rem` (`18px`) | `700` | `1.4` | `-0.01em` |
| **Body Copy (`p`, `td`)** | `--font-sans` | `0.9375rem` (`15px`) | `400` | `1.65` | `0` |
| **Form Label / Table Header (`label`, `th`)** | `--font-sans` | `0.8125rem` (`13px`) | `600` | `1.4` | `0.02em` |
| **Badge / Pill / Code (`code`, `.badge`)** | `--font-mono` / `--font-sans` | `0.75rem` (`12px`) | `600` | `1.2` | `0.03em` |

---

## 4. Component Stylings

1. **Unified Sticky Top Navigation (`.site-nav`):**
   - Sticky top header (`position: sticky; top: 0; z-index: 50`) with `background: rgba(255, 255, 255, 0.88)`, `backdrop-filter: blur(12px)`, and `border-bottom: 1px solid #E2E8F0`.
   - Left side displays the **AlumniConnect** brand mark; right side displays pill links for `Home`, `Users`, `Announcements`, `Job Postings`, `Applications`, `About`, and `Swagger API`.
   - Active page link receives `background: #EEF2FF`, `color: #4F46E5`, and `font-weight: 700`.
2. **Surface Cards (`.card`):**
   - `background: #FFFFFF`, `border: 1px solid #E2E8F0`, `border-radius: 16px`, `padding: 28px`, subtle elevation shadow.
   - Interactive item cards (`.item-card`) feature a `4px` semantic accent left border and smooth `translateY(-2px)` hover transition.
3. **Buttons (`.btn`):**
   - `border-radius: 10px`, `padding: 10px 18px`, `font-weight: 600`, `font-size: 14px`, `transition: all 0.18s ease`.
   - **Primary (`.btn-primary`):** `background: #4F46E5; color: #FFFFFF` → Hover `#4338CA` with subtle indigo glow.
   - **Secondary / Ghost (`.btn-secondary`):** `background: #F1F5F9; color: #334155; border: 1px solid #E2E8F0` → Hover `#E2E8F0`.
   - **Danger (`.btn-danger`):** `background: #FFE4E6; color: #BE123C` → Hover `#FECDD3`.
4. **Form Controls (`input`, `select`, `textarea`):**
   - `border: 1px solid #CBD5E1`, `border-radius: 10px`, `padding: 11px 14px`, `background: #F8FAFC`.
   - Focus state transitions to `background: #FFFFFF`, `border-color: #4F46E5`, and `box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15)`.
5. **Status & Category Badges (`.badge`):**
   - Pill-shaped (`border-radius: 9999px`), `padding: 4px 12px`, `font-size: 12px`, `font-weight: 600`.
6. **Data Tables (`table`):**
   - Wrapped in rounded `12px` overflow containers with `1px solid #E2E8F0`, uppercase `12px` column headers on `#F8FAFC`, and hoverable rows (`#F8FAFC`).

---

## 5. Layout Principles

- **Max-Width Container:** `1120px` centered (`margin: 0 auto; padding: 0 24px`) so content never stretches uncomfortably on ultra-wide monitors.
- **Spacing Scale:** Strict `4px / 8px` spatial rhythm (`8px`, `12px`, `16px`, `24px`, `32px`, `48px`).
- **Grid Architecture:**
  - **KPI Summary Strip:** 3-to-4 column responsive CSS Grid (`repeat(auto-fit, minmax(220px, 1fr))`).
  - **Form Layouts:** 2-column CSS Grid (`1fr 1fr`, `gap: 16px`) collapsing to 1 column on viewports under `768px`, with `.full` spanning `1 / -1`.
  - **Detail Views (`/job-postings/:id`):** Structured vertical flow separating the Job Specification Card, Candidate Application Form, and Received Applications Table.

---

## 6. Depth & Elevation

- **Level 0 (Canvas):** `#F8FAFC` flat background.
- **Level 1 (Resting Card / Table):** `#FFFFFF` with `border: 1px solid #E2E8F0` and `box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.02)`.
- **Level 2 (Interactive Hover Card):** `box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`.
- **Level 3 (Sticky Header & Modals):** Glassmorphic header (`backdrop-filter: blur(12px)`) and modal overlays (`rgba(15, 23, 42, 0.55)` backdrop with `24px` shadow radius).

---

## 7. Do's and Don'ts

- **DO** include the unified `.site-nav` bar and `.site-footer` on every single page of the web application (`/` , `/about`, `/users`, `/announcements`, `/job-postings`, `/job-postings/:id`, `/applications`, `/404`).
- **DO** pair every `1px solid #E2E8F0` border with subtle shadows rather than relying on heavy, dark drop shadows.
- **DO** display clear semantic badges for categories (`Event`, `Career`, `Mentorship`, `General`), job types (`Full-time`, `Internship`, `Remote`), and application statuses (`Pending`, `Reviewing`, `Accepted`, `Rejected`).
- **DO** respect domain validation rules in UI forms (`JobPosting.title` required & `maxlength="120"`, `company` required, `city` & `description` optional).
- **DON'T** use raw unstyled HTML pages or browser-default table borders.
- **DON'T** mix conflicting color schemes across different routes; all pages must feel like one cohesive product.

---

## 8. Responsive Behavior

- **Desktop (`> 1024px`):** Full 1120px container, multi-column KPI strips, 2-column form grids, and horizontal nav links.
- **Tablet (`768px – 1024px`):** Fluid container padding (`20px`), wrapping navigation pills, and scrollable table wrappers (`overflow-x: auto`).
- **Mobile (`< 768px`):** Form grids collapse to a single column (`grid-template-columns: 1fr`), card padding adjusts to `20px`, and action toolbars wrap cleanly without horizontal page overflow.

---

## 9. Agent Prompt Guide

When creating or updating any EJS view in `src/views/`, apply this prompt context:

> *"Style this page strictly according to `DESIGN.md` and `brand.md`. Use the shared AlumniConnect sticky glassmorphic navigation bar, the `#F8FAFC` alabaster canvas, `#FFFFFF` cards with `1px solid #E2E8F0` borders and `16px` border-radius, `Plus Jakarta Sans` + `Inter` + `JetBrains Mono` typography, `#4F46E5` primary indigo buttons, and semantic status/category badges. Ensure all forms and tables are responsive and accessible."*
