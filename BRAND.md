# Brand Identity & Guidelines (`brand.md`)

> 📖 **Project Documentation Links:**
> - [Project README (README.md)](./README.md)
> - [Design System Specification (DESIGN.md)](./DESIGN.md)
> - [Data Design Documentation (DDD.md)](./DDD.md)

---

## 🎓 1. Brand Overview

- **Brand Name:** AlumniConnect — University Alumni & Career Network
- **Category:** Academic Community Platform, Graduate Directory & Career Acceleration Hub
- **Tagline:** *"Bridging Academic Heritage with Lifelong Career Impact."*
- **Positioning Statement:** AlumniConnect is the official digital home where university graduates, faculty offices, and industry-leading hiring partners converge to share announcements, publish curated career opportunities, and foster mentorship across generations.

---

## 🧭 2. Mission, Vision & Core Values

### 2.1. Mission
To empower every graduate with a lifelong, trusted institutional network that connects academic excellence directly to career opportunities, mentorship, and community engagement.

### 2.2. Vision
To become the most trusted, transparent, and accessible digital ecosystem uniting university alumni worldwide through clean technology, verified data integrity, and meaningful human connections.

### 2.3. Core Brand Values
| Value | Principle | Product Expression |
|---|---|---|
| **1. Academic Heritage & Trust** | Rooted in institutional credibility and verified graduate records. | Structured tables, clear authorship badges, and transparent timestamps. |
| **2. Career Acceleration** | Action-oriented pathways from graduation to top-tier industry roles. | Direct and nested job application workflows (`/job-postings`, `/applications`). |
| **3. Clarity Over Clutter** | Information density without visual noise; every screen serves a clear purpose. | Generous whitespace, high-contrast typography, and semantic status pills. |
| **4. Inclusive Community** | Welcoming to fresh graduates and seasoned executives alike. | Accessible color contrast (WCAG AA+), intuitive navigation, and responsive layouts. |

---

## 👥 3. Target Audience & Personas

1. **The Ambitious Graduate (Job Seeker)**
   - **Profile:** Recent Computer Science & Engineering graduate looking for verified full-time or internship roles at reputable companies (Trendyol, Getir, Baykar, Hepsiburada).
   - **Needs:** Fast scannability of job requirements, transparent salary ranges, and frictionless one-page application submission.
2. **The Alumni Hiring Partner / Mentor**
   - **Profile:** Senior engineer, founder, or recruiter who graduated from the university and wants to hire fellow alumni or host mentorship sessions.
   - **Needs:** Simple job publishing forms (`title`, `company`, optional `city` & `description`), and a clean dashboard to review and update candidate application statuses (`Pending` → `Reviewing` → `Accepted`).
3. **The Institutional Administrator (Rectorate / Career Center)**
   - **Profile:** University staff managing campus bulletins, homecoming events, and alumni directory records.
   - **Needs:** Reliable CRUD interfaces for `/users` and `/announcements` backed by persistent MySQL storage and clear error guardrails.

---

## 🗣️ 4. Brand Voice, Tone & Messaging Pillars

- **Voice Character:** Authoritative yet approachable, editorial, concise, and supportive.
- **Tone Spectrum:**
  - *In Navigation & Dashboards:* Direct, structured, and unambiguous (`"Job Postings"`, `"Applications Dashboard"`, `"Users Directory"`).
  - *In Forms & Actions:* Encouraging and action-driven (`"Publish Job Posting"`, `"Submit Application"`, `"Post Announcement"`).
  - *In Error States (`404` & Validation):* Calm, transparent, and helpful—always explaining the exact `reason` and offering a clear recovery path back to safety.

---

## 🎨 5. Visual Identity Signature

Our visual identity blends **Editorial Academic Authority** with **Modern SaaS Precision**:

### 5.1. Brand Color Signature
- **Bosphorus Obsidian (`#0F172A`):** Primary brand ink, navigation headers, and authoritative headings.
- **Academic Royal Indigo (`#4F46E5`):** Primary brand accent for interactive CTAs, active navigation states, and key highlights.
- **Bosphorus Cyan (`#0284C7`):** Career & job opportunity accent representing growth and momentum.
- **Campus Emerald (`#059669`):** Positive confirmation, accepted applications, and active system health.
- **Heritage Amber (`#D97706`):** Institutional highlights, pending review states, and featured event badges.
- **Crimson Rose (`#E11D48`):** Guardian alerts, destructive actions, and 404/5xx error states.
- **Alabaster Canvas (`#F8FAFC`) & Pure Ivory (`#FFFFFF`):** Clean, distraction-free surface hierarchy.

### 5.2. Brand Typography
- **Display & Headings:** `'Plus Jakarta Sans'`, `-apple-system`, `BlinkMacSystemFont`, `'Segoe UI'`, `sans-serif` — geometric, modern, and authoritative.
- **Body & UI Controls:** `'Inter'`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif` — engineered for high legibility in data tables and long-form job descriptions.
- **Technical Metadata & IDs:** `'JetBrains Mono'`, `'SFMono-Regular'`, `monospace` — used for numeric IDs (`#104`), API routes (`/api/users/:id/jobs`), and log timestamps.

---

## 🔗 6. Relationship with `DESIGN.md`

While this **`brand.md`** document defines *who we are* (mission, personas, voice, and visual signature), the companion **[DESIGN.md](./DESIGN.md)** specification translates these brand principles into concrete UI tokens, component states, spacing rules, and layout architectures across every page of the web application.
