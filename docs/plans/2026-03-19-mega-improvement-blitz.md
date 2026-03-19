# Mega Improvement Blitz — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Maximize productive use of available tokens across 5 parallel workstreams: performance, content expansion, feature build, accessibility, and polish/SEO.

**Architecture:** 5 independent workstreams executed via parallel subagents. Each workstream operates in its own git worktree branch. Branches are merged sequentially at the end (performance first, then content, then features, then a11y, then SEO).

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, Zod v4, Vitest

---

## Workstream Overview

| # | Workstream | Branch | Agent Type | Est. Files Changed |
|---|-----------|--------|------------|-------------------|
| 1 | Performance: Split `topics.ts` | `perf/split-topics` | general-purpose | ~35 new files, 2 modified |
| 2 | Content: 10 New Topics | `content/new-topics-batch` | general-purpose | ~12 new files, 2 modified |
| 3 | Feature: FAQ Blocks + Glossary Page | `feat/faq-glossary` | general-purpose | ~8 files |
| 4 | Accessibility: WCAG 2.1 AA Pass | `a11y/wcag-audit` | general-purpose | ~15 modified |
| 5 | SEO/Schema: ClaimReview + Article | `seo/schema-improvements` | general-purpose | ~6 modified |

---

## Workstream 1: Performance — Split `topics.ts`

### Context

`data/topics.ts` is 8,724 lines. 21 topics are already extracted to `data/topics/*.ts` files. **31 topics remain inline** and need extraction. After extraction, the main file becomes a thin barrel that re-exports all topics.

### Existing Pattern (follow exactly)

Each extracted topic file follows this pattern (see `data/topics/tiktok-ban.ts`):

```typescript
import type { Topic } from "@/lib/schemas/topic";

export const tiktokBanData = {
  id: "tiktok-ban",
  title: "Should TikTok Be Banned?",
  // ... full topic data
} satisfies Omit<Topic, "confidence_score"> & { confidence_score?: number };
```

Note: Some existing files use `as const` for enums. The pattern varies slightly — just match what works with the existing `topics` array construction.

### Topics to Extract (31 inline topics)

These are defined inline in `data/topics.ts` and need individual files in `data/topics/`:

1. `moonLandingData` → `data/topics/moon-landing.ts`
2. `simulationHypothesisData` → `data/topics/simulation-hypothesis.ts`
3. `aiRiskData` → `data/topics/ai-risk.ts`
4. `climateChangeData` → `data/topics/climate-change.ts`
5. `freeWillData` → `data/topics/free-will.ts`
6. `minneapolisShootingData` → `data/topics/minneapolis-shooting.ts`
7. `universalBasicIncomeData` → `data/topics/universal-basic-income.ts`
8. `socialMediaMentalHealthData` → `data/topics/social-media-mental-health.ts`
9. `cryptocurrencyValueData` → `data/topics/cryptocurrency-value.ts`
10. `gunControlEffectivenessData` → `data/topics/gun-control-effectiveness.ts`
11. `nuclearEnergySafetyData` → `data/topics/nuclear-energy-safety.ts`
12. `wealthTaxData` → `data/topics/wealth-tax.ts`
13. `aiContentLabelingData` → `data/topics/ai-content-labeling.ts`
14. `remoteWorkPermanenceData` → `data/topics/remote-work-permanence.ts`
15. `socialMediaAgeLimitsData` → `data/topics/social-media-age-limits.ts`
16. `collegeValuePropositionData` → `data/topics/college-value-proposition.ts`
17. `mandatoryVotingData` → `data/topics/mandatory-voting.ts`
18. `deathPenaltyDeterrenceData` → `data/topics/death-penalty-deterrence.ts`
19. `billionaireWealthData` → `data/topics/billionaire-wealth.ts`
20. `homeschoolingEffectivenessData` → `data/topics/homeschooling-effectiveness.ts`
21. `policeReformData` → `data/topics/police-reform.ts`
22. `drugDecriminalizationData` → `data/topics/drug-decriminalization.ts`
23. `immigrationWageImpactData` → `data/topics/immigration-wage-impact.ts`
24. `evEnvironmentalImpactData` → `data/topics/ev-environmental-impact.ts`
25. `organicFoodHealthData` → `data/topics/organic-food-health.ts`
26. `foreignAidEffectivenessData` → `data/topics/foreign-aid-effectiveness.ts`
27. `spaceExplorationValueData` → `data/topics/space-exploration-value.ts`
28. `factoryFarmingBanData` → `data/topics/factory-farming-ban.ts`
29. `mediaBiasDemocracyData` → `data/topics/media-bias-democracy.ts`
30. `universalHealthcareData` → `data/topics/universal-healthcare.ts`
31. `openBordersData` → `data/topics/open-borders.ts`
32. `cancelCultureData` → `data/topics/cancel-culture.ts`
33. `bigTechAntitrustData` → `data/topics/big-tech-antitrust.ts`
34. `minimumWageEffectsData` → `data/topics/minimum-wage-effects.ts`
35. `geneEditingEmbryosData` → `data/topics/gene-editing-embryos.ts`
36. `reparationsSlaveryData` → `data/topics/reparations-slavery.ts`
37. `spaceColonizationFeasibilityData` → `data/topics/space-colonization-feasibility.ts`
38. `veganismEnvironmentalData` → `data/topics/veganism-environmental-impact.ts`
39. `standardizedTestingDebateData` → `data/topics/standardized-testing-debate.ts`
40. `labGrownMeatData` → `data/topics/lab-grown-meat.ts`
41. `aiConsciousnessData` → `data/topics/ai-consciousness.ts`
42. `electoralCollegeReformData` → `data/topics/electoral-college-reform.ts`
43. `psychedelicsMentalHealthData` → `data/topics/psychedelics-mental-health.ts`
44. `gigEconomyRegulationData` → `data/topics/gig-economy-regulation.ts`
45. `surveillancePublicSafetyData` → `data/topics/surveillance-public-safety.ts`
46. `meaningWithoutReligionData` → `data/topics/meaning-without-religion.ts`

### Task 1.1: Extract all inline topics to individual files

For each inline topic in `data/topics.ts`:
1. Read the full topic data object from topics.ts
2. Create `data/topics/<slug>.ts` with the topic data as a named export
3. Add an import in `data/topics.ts` replacing the inline definition
4. Ensure the `topics` array still references the data correctly

### Task 1.2: Refactor `data/topics.ts` to be a thin barrel

After all extractions, `data/topics.ts` should:
- Import all topic data from `data/topics/*.ts`
- Import `computeConfidenceScore` from `@/lib/schemas/topic`
- Build the `topics` array with computed confidence scores
- Export `topics`, `CATEGORY_LABELS`, `CROSS_CATEGORY_CLUSTERS`, `getCrossCategoryRelated`
- Contain NO inline topic data — only imports and the assembly logic
- Target: under 300 lines

### Task 1.3: Run tests to verify

```bash
npx vitest run data/topics.test.ts
npx vitest run lib/schemas/topic.test.ts
```

All existing tests must pass. The `topics` array must still contain the same topics with the same data.

### Task 1.4: Commit

```bash
git add data/topics/ data/topics.ts
git commit -m "perf: extract all inline topics to individual files — topics.ts now a thin barrel"
```

---

## Workstream 2: Content — 10 New Topics

### Context

Full topic specs exist in `.work/new-topics-research-2026-03-17.md`. Create 10 of the 20 researched topics as proper TypeScript files.

### Topics to Create (pick the 10 highest-impact from research)

1. `artificial-reproduction-ethics` — Artificial Wombs & Synthetic Embryos
2. `government-platform-bans` — Government Bans on Social Media Platforms
3. `gain-of-function-research-ban` — Should Gain-of-Function Research Be Banned?
4. `children-smartphone-age` — Smartphone Age Restrictions for Children
5. `alternatives-to-democracy` — Are There Better Systems Than Democracy?
6. `geoengineering-climate` — Geoengineering & Carbon Capture
7. `central-bank-digital-currency` — Central Bank Digital Currencies
8. `masculinity-crisis` — The Modern Masculinity Crisis
9. `ai-deepfakes-truth-collapse` — AI Deepfakes & the Collapse of Shared Truth
10. `declining-birth-rates` — The Global Fertility Collapse

(Note: `ai-white-collar-displacement`, `glp1-weight-loss-drugs`, `microplastics-health-crisis`, `housing-affordability-crisis`, `longevity-science`, `nuclear-weapons-abolition`, and `transgender-athletes-sports` either already exist or overlap with existing topics.)

### Task 2.1: Create topic files

For each of the 10 topics above:
1. Read the full spec from `.work/new-topics-research-2026-03-17.md`
2. Create `data/topics/<slug>.ts` following the exact pattern of existing topic files (e.g., `tiktok-ban.ts`)
3. Each topic MUST include:
   - `id`, `title`, `meta_claim`, `status` ("contested"), `category`
   - At least 3 `pillars`, each with `id`, `title`, `short_summary`, `icon_name`, `skeptic_premise`, `proponent_rebuttal`, `crux` (with `id`, `title`, `description`, `methodology`, `verification_status`, `cost_to_verify`)
   - At least 2 `evidence` items per pillar (one "for", one "against") with full `weight` objects
   - `questions` array with at least 3 questions
   - `references` array with real URLs
   - `imageUrl` (use Unsplash URLs matching the existing pattern)
4. Use `computeConfidenceScore` for the confidence score (don't hardcode it)

### Task 2.2: Register topics in `data/topics.ts`

Add imports and include in the `topics` array. Add entries to `CROSS_CATEGORY_CLUSTERS`.

### Task 2.3: Run validation tests

```bash
npx vitest run data/topics.test.ts
```

All topics must pass Zod validation. Verify unique IDs, valid confidence scores, etc.

### Task 2.4: Update sitemap

If `app/sitemap.ts` or `app/sitemap.xml` exists, ensure new topics are included. Since we use `generateStaticParams()` from the topics array, this should be automatic — just verify.

### Task 2.5: Commit

```bash
git add data/topics/ data/topics.ts
git commit -m "feat: add 10 new debate topics — artificial wombs, CBDCs, geoengineering, masculinity crisis, and more"
```

---

## Workstream 3: Feature — FAQ Blocks + Glossary Page

### Task 3.1: Add FAQ section to topic detail view

**File:** `app/topics/[id]/TopicDetailView.tsx`

Add a collapsible FAQ section below the main argument map that renders the topic's `questions` array as a structured FAQ with `FAQPage` schema. Each question title becomes the FAQ question, and the question content becomes the answer.

```tsx
// FAQ section with schema.org FAQPage markup
<section aria-label="Frequently Asked Questions">
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: topic.questions?.map(q => ({
        "@type": "Question",
        name: q.title,
        acceptedAnswer: {
          "@type": "Answer",
          text: q.content,
        },
      })),
    })}
  </script>
  {/* Render FAQ items as expandable sections */}
</section>
```

Style with the existing parchment/stone design system. Use `<details>`/`<summary>` for native collapsible behavior.

### Task 3.2: Create glossary page

**Create:** `app/glossary/page.tsx`

Create a `/glossary` page with critical thinking terms, each with:
- Term name
- Short definition (1-2 sentences, AI-extractable)
- Example from an Argumend topic
- Link to relevant topic

Terms to include (minimum 15):
- Argument mapping, Steel-manning, Crux, Evidence weighting, Confidence score, Bayesian reasoning, Logical fallacy, Ad hominem, Straw man, False dichotomy, Appeal to authority, Confirmation bias, Dunning-Kruger effect, Base rate neglect, Burden of proof

Add `DefinedTermSet` schema for AEO.

### Task 3.3: Add glossary to sidebar navigation

**File:** `components/Sidebar.tsx`

Add "Glossary" link to the "Learn & Explore" collapsible section.

### Task 3.4: Run tests and verify

Build should succeed. Glossary page should render. FAQ schema should be valid JSON-LD.

### Task 3.5: Commit

```bash
git add app/glossary/ app/topics/[id]/TopicDetailView.tsx components/Sidebar.tsx
git commit -m "feat: add FAQ blocks with schema.org markup + /glossary page for AEO"
```

---

## Workstream 4: Accessibility — WCAG 2.1 AA Pass

### Task 4.1: Audit and fix ARIA labels

**Files to check:** All files in `components/`

Systematic pass through every interactive component:
- `AppShell.tsx` — Add landmark regions (`<main>`, `<nav>`, `<aside>`)
- `Sidebar.tsx` — Add `aria-label="Main navigation"`, `aria-expanded` on collapsible sections
- `TopBar.tsx` — Add `role="banner"`, `aria-label` on search trigger
- `SearchModal.tsx` — Add `role="dialog"`, `aria-modal="true"`, focus trapping
- `CruxModal.tsx` — Add `role="dialog"`, `aria-modal="true"`, focus trapping
- `ThemeToggle.tsx` — Add `aria-label` reflecting current state ("Switch to dark mode" / "Switch to light mode")
- `ViewToggle.tsx` — Add `aria-label`, `aria-pressed` for active state
- `SaveTopicButton.tsx` — Add `aria-label` reflecting saved state
- `SubscribeButton.tsx` — Add `aria-label`
- `ShareButtons.tsx` — Add `aria-label` per social platform
- `NewsletterSignup.tsx` — Add `aria-label` to form, `aria-describedby` for validation
- `Footer.tsx` — Add `role="contentinfo"`

### Task 4.2: Focus indicators

**File:** `app/globals.css`

Add visible focus indicators that work with the parchment theme:

```css
:focus-visible {
  outline: 2px solid #4f7b77; /* deep teal accent */
  outline-offset: 2px;
  border-radius: 2px;
}
```

Ensure this works on dark mode too.

### Task 4.3: Modal focus trapping

**Files:** `components/SearchModal.tsx`, `components/CruxModal.tsx`

Implement focus trapping in modals:
- On open: focus first focusable element
- Tab/Shift+Tab cycles within modal
- Escape closes modal
- On close: return focus to trigger element

### Task 4.4: Keyboard navigation on key interactive elements

- `ViewToggle.tsx` — Arrow keys to switch between views
- `ConfidenceGauge.tsx` — Add `role="meter"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- `ScalesOfEvidence.tsx` — Add `role="list"` and `role="listitem"` for evidence items
- `MapLegend.tsx` — Ensure legend is keyboard-accessible

### Task 4.5: Color contrast audit

Check all text against WCAG 2.1 AA 4.5:1 ratio. Key areas:
- Primary text `#3d3a36` on parchment `#f4f1eb` — verify
- Accent text `#4f7b77` on parchment — verify (may need darkening for small text)
- Rust CTA `#C4613C` on white — verify
- Dark mode equivalents

### Task 4.6: Commit

```bash
git add components/ app/globals.css
git commit -m "a11y: WCAG 2.1 AA pass — ARIA labels, focus indicators, modal focus trapping, contrast fixes"
```

---

## Workstream 5: SEO/Schema Improvements

### Task 5.1: Upgrade to ClaimReview schema

**File:** `app/topics/[id]/page.tsx`

Replace the generic `Claim` schema with proper `ClaimReview`:

```typescript
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ClaimReview",
  url: `https://argumend.org/topics/${topic.id}`,
  claimReviewed: topic.meta_claim,
  author: {
    "@type": "Organization",
    name: "ARGUMEND",
    url: "https://argumend.org",
  },
  reviewRating: {
    "@type": "Rating",
    ratingValue: topic.confidence_score,
    bestRating: 100,
    worstRating: 0,
    alternateName: getVerdictLabel(topic.confidence_score),
  },
  itemReviewed: {
    "@type": "Claim",
    name: topic.title,
    description: topic.meta_claim,
  },
};
```

### Task 5.2: Add Article schema with wordCount to blog posts

**Files:** `app/blog/[slug]/page.tsx` (or wherever blog posts are rendered)

Add `Article` schema with `wordCount`, `datePublished`, `dateModified`, `articleSection`, and `author`.

### Task 5.3: Add BreadcrumbList schema

**File:** `components/Breadcrumbs.tsx`

Add `BreadcrumbList` JSON-LD alongside the visual breadcrumbs:

```typescript
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.label,
    ...(item.href && { item: `https://argumend.org${item.href}` }),
  })),
};
```

### Task 5.4: Add HowTo schema to /analyze page

**File:** `app/analyze/page.tsx`

Add `HowTo` JSON-LD describing the argument analysis process:

```json
{
  "@type": "HowTo",
  "name": "How to Analyze Arguments with Argumend",
  "step": [
    { "@type": "HowToStep", "name": "Paste your content", "text": "..." },
    { "@type": "HowToStep", "name": "AI extracts claims", "text": "..." },
    { "@type": "HowToStep", "name": "Review the argument map", "text": "..." }
  ]
}
```

### Task 5.5: Commit

```bash
git add app/topics/ app/blog/ components/Breadcrumbs.tsx app/analyze/
git commit -m "seo: upgrade to ClaimReview schema, add BreadcrumbList, Article wordCount, HowTo on /analyze"
```

---

## Execution Strategy

### Phase 1: Parallel Agent Dispatch

Launch 5 agents simultaneously, one per workstream. Each agent:
1. Creates a feature branch from `main`
2. Implements all tasks in its workstream
3. Runs tests (`npx vitest run`)
4. Commits with descriptive message

### Phase 2: Sequential Merge

After all agents complete:
1. Merge `perf/split-topics` → `main` (this changes the most foundational file)
2. Merge `content/new-topics-batch` → `main` (depends on new topics.ts structure)
3. Merge `feat/faq-glossary` → `main`
4. Merge `a11y/wcag-audit` → `main`
5. Merge `seo/schema-improvements` → `main`

### Phase 3: Final Verification

```bash
npx vitest run          # All tests pass
bun run build           # Build succeeds
```

---

## Success Criteria

- [ ] `data/topics.ts` under 300 lines (from 8,724)
- [ ] 10 new topics pass Zod validation
- [ ] FAQ schema renders valid JSON-LD on topic pages
- [ ] `/glossary` page exists with 15+ terms
- [ ] All interactive components have ARIA labels
- [ ] Focus indicators visible on all interactive elements
- [ ] Modal focus trapping works on SearchModal and CruxModal
- [ ] ClaimReview schema on topic pages
- [ ] BreadcrumbList schema on all breadcrumb pages
- [ ] All existing tests still pass
- [ ] Build succeeds
