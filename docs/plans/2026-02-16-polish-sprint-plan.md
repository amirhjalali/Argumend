# Argumend Polish Sprint Plan
**Date:** 2026-02-16
**Goal:** Maximize remaining tokens across parallel agents in ~30 min
**Strategy:** 4 parallel agents, each working on independent file sets

---

## Agent 1: Loading States + Error Boundaries (Infrastructure)

**Files to create:**
- `app/topics/[id]/loading.tsx`
- `app/blog/[slug]/loading.tsx`
- `app/guides/[id]/loading.tsx`
- `app/concepts/[slug]/loading.tsx`
- `app/analysis/[id]/loading.tsx`
- `app/analyze/loading.tsx`
- `app/topics/loading.tsx`
- `app/topics/[id]/error.tsx`
- `app/analysis/[id]/error.tsx`
- `app/analyze/error.tsx`

**Instructions:**
1. Read `components/AppShell.tsx` for the wrapper pattern (all content pages use AppShell).
2. Read one example page (e.g., `app/topics/[id]/page.tsx`) to understand the content structure.
3. Create skeleton loading states that match the page layout. Use Tailwind `animate-pulse` with `bg-stone-200 rounded` placeholders. Wrap in AppShell.
4. For topic detail loading: show a skeleton for the title, confidence badge, pillars grid, and evidence section.
5. For blog loading: skeleton for title, author, date, body paragraphs.
6. For analysis loading: skeleton for the analysis card layout.
7. Create error.tsx files with a "Something went wrong" message, a retry button (using `reset()`), and a link back to the parent page. Use the rust gradient for the retry button.
8. Match the parchment/stone design system. NEVER use amber.

**Design tokens:**
- Background: `#f4f1eb`, content areas `#faf8f5`
- Skeleton: `bg-stone-200 animate-pulse rounded`
- Error retry button: `bg-gradient-to-r from-rust-500 to-rust-600 text-white`
- Error text: serif heading, sans body, stone palette

---

## Agent 2: Add 12 New Topics (Content Expansion)

**File to modify:** `data/topics.ts`

**Instructions:**
1. Read the first 200 lines of `data/topics.ts` to understand the topic structure (meta_claim, confidence_score, status, category, pillars with evidence, etc.).
2. Read `lib/schemas/topic.ts` for the TypeScript types.
3. Add 12 new topics to bring the total from 38 to 50. Follow the EXACT same data structure as existing topics.
4. Target categories that are underrepresented (Philosophy has only 5, could use more).
5. Each topic needs: id, title, meta_claim, confidence_score (realistic), status (settled/contested/highly_speculative), category, 2-3 pillars, each pillar with at least 1 evidence item.

**New topics to add (suggestions — research real positions for each):**
1. **"Space Colonization Feasibility"** (technology, contested, ~45%)
2. **"Veganism for Environmental Impact"** (science, contested, ~68%)
3. **"Free Will vs Determinism"** (philosophy, highly_speculative, ~35%)
4. **"Universal Basic Income"** (economics, contested, ~52%)
5. **"Standardized Testing Value"** (policy, contested, ~48%)
6. **"Lab-Grown Meat Adoption"** (technology, contested, ~60%)
7. **"Consciousness in AI Systems"** (philosophy, highly_speculative, ~25%)
8. **"Electoral College Reform"** (policy, contested, ~55%)
9. **"Psychedelics for Mental Health"** (science, contested, ~65%)
10. **"Gig Economy Regulation"** (economics, contested, ~58%)
11. **"Surveillance and Public Safety"** (policy, contested, ~42%)
12. **"Meaning of Life Without Religion"** (philosophy, highly_speculative, ~30%)

**CRITICAL:** Use WebSearch to find real arguments, real evidence, and real sources for each topic. Do NOT make up citations. Every evidence item should have a real title, source, and year.

**Design rules:**
- Match existing topic structure exactly
- Confidence scores should feel calibrated (not all 50%)
- Include real crux questions that would genuinely resolve the debate
- Include real_world_example on pillars where appropriate

---

## Agent 3: Share Buttons + Social Meta + FAQ Expansion

**Part A — Share functionality:**

**Files to create/modify:**
- Create `components/ShareButtons.tsx`
- Modify `app/topics/[id]/page.tsx` (or its client component) to include ShareButtons
- Modify `app/blog/[slug]/page.tsx` to include ShareButtons
- Modify `app/analysis/[id]/page.tsx` to include ShareButtons

**Share button instructions:**
1. Create a `ShareButtons` component that accepts `title`, `url`, and optional `description` props.
2. Include buttons for: Copy Link, Twitter/X, LinkedIn, and native Web Share API (if available).
3. Copy Link should show a brief "Copied!" toast using local state.
4. Twitter share URL: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
5. LinkedIn share URL: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
6. Use Web Share API (`navigator.share`) as a fallback on mobile.
7. Style: small horizontal row of icon buttons, stone-400 icons that darken on hover. Use lucide icons (Share2, Copy, Twitter/X icon as SVG).
8. NEVER use amber. Use stone palette for icons, deep teal for active states.

**Part B — FAQ expansion:**

**File to modify:** `app/faq/page.tsx`

**Instructions:**
1. Read the current FAQ page.
2. Add 8-10 more questions covering:
   - "How often is topic data updated?"
   - "Can I suggest a new topic?"
   - "How does the AI judge council work?"
   - "What happens to my analyzed text? Is it stored?"
   - "How are confidence scores calculated?"
   - "Is Argumend politically biased?"
   - "Can I use Argumend in my classroom?"
   - "What's the difference between a crux and a key question?"
   - "How do you handle topics where the science is still evolving?"
   - "Can I export or share my analysis results?"
3. Match existing FAQ style exactly.

---

## Agent 4: Mobile Polish + Accessibility + SEO

**Part A — Accessibility audit and fixes:**

**Files to check/modify:**
- All interactive components (`components/TopBar.tsx`, `components/Sidebar.tsx`, `components/HeroAnalyze.tsx`)
- Button elements in `components/QuickStartBanner.tsx`
- Form elements in `app/analyze/page.tsx`

**Instructions:**
1. Grep for buttons/links missing `aria-label` attributes.
2. Check all `<button>` elements that only have icons (no text) — they need aria-labels.
3. Check color contrast: ensure all text meets WCAG AA (4.5:1 for normal text, 3:1 for large text). The stone-400 text on parchment background might be borderline.
4. Add `aria-live="polite"` to the analysis results area for screen reader announcements.
5. Ensure the sidebar has proper `role="navigation"` and `aria-label`.
6. Add `<meta name="theme-color" content="#f4f1eb">` to the layout if missing.
7. Check that all images have alt text.

**Part B — SEO improvements:**

**Files to check/modify:**
- `app/layout.tsx` — verify meta tags, add structured data
- `app/sitemap.xml/route.ts` or `app/sitemap.ts` — verify it exists
- `app/robots.txt/route.ts` or `app/robots.ts` — verify

**Instructions:**
1. Read `app/layout.tsx` and check for: title template, description, Open Graph defaults, Twitter card defaults.
2. Add JSON-LD structured data (Organization schema) to the root layout if missing.
3. Verify sitemap includes all routes (topics, blog, guides, concepts, research).
4. Add `<link rel="canonical">` to pages if missing.
5. Check that all pages have unique meta descriptions.

**Part C — Mobile polish:**
1. Read `components/MobileArgumentList.tsx` and verify it works well.
2. Check that the hero analyze textarea and buttons are touch-friendly (min 44px tap targets).
3. Ensure the feature grid (4-column on desktop) stacks properly on mobile (should be 2-col — verify).
4. Test that the sidebar close button is reachable on mobile.

---

## Execution Order

All 4 agents should run in parallel since they touch independent file sets:
- Agent 1: Only creates NEW files (loading.tsx, error.tsx)
- Agent 2: Only modifies `data/topics.ts`
- Agent 3: Creates `components/ShareButtons.tsx`, modifies FAQ page + a few page files (share integration)
- Agent 4: Small tweaks to existing components (aria attrs, meta tags)

**Potential conflicts:** Agent 3 and Agent 4 could both touch topic/blog page files. To avoid conflicts:
- Agent 3 adds ShareButtons to blog/topic/analysis pages
- Agent 4 does NOT modify those same pages — focuses on layout.tsx, TopBar, Sidebar, Analyze page

## Post-Sprint Verification

After all agents complete:
1. Run `npx tsc --noEmit` to verify no type errors
2. Run `npx next build` to verify all pages build
3. Run `bun test` to verify existing tests pass
4. Do a visual review of the homepage, a topic page, and the research page
5. Check mobile viewport in browser dev tools

## Design System Reminders (for all agents)

- **NEVER use amber/tangerine** colors
- CTA buttons: `bg-gradient-to-r from-rust-500 to-rust-600 text-white`
- Accent: deep teal `#4f7b77` (aliased as `deep`)
- Background: `#f4f1eb` (parchment), `#faf8f5` (content areas)
- Text: `#3d3a36` (primary), stone-500 (secondary), stone-400 (muted)
- Rust palette: 50:`#fdf5f2` 100:`#fae8e0` 200:`#f5c9b8` 500:`#C4613C` 600:`#b05434` 700:`#8b3f27`
- Typography: serif for headings (`font-serif`), sans for body (`font-sans`)
- All pages using AppShell get sidebar + topbar + footer automatically
- Homepage (`app/page.tsx`) does NOT use AppShell — it has its own layout
