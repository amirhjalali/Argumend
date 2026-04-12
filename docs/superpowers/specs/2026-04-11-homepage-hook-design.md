# Homepage Hook Redesign — "Surprising Verdict"

**Date:** 2026-04-11
**Goal:** Replace the current textarea-first hero with a live, pre-expanded topic analysis that shows the product's value in under 5 seconds with zero clicks.

---

## Problem

The current homepage opens with:
1. An onboarding modal that blocks everything (OnboardingOverlay)
2. A poetic headline ("What if we could disagree without destroying each other?")
3. A textarea asking the visitor to paste their own text
4. A topic grid below

The actual product value — cruxes, evidence weighting, confidence scores — is buried 3+ clicks deep inside a topic. Visitors learn the UI but never experience what Argumend does. There is no "holy shit" moment.

## Solution

Show one fully-realized topic analysis on the homepage, pre-expanded. The product IS the pitch.

## New Homepage Structure (top to bottom)

### Section 1: Featured Topic Hero (`FeaturedTopicHero`)

Takes up most of the initial viewport. Contains:

- **Topic title** — big serif heading (e.g., "Is Nuclear Energy Safe?")
- **Confidence gauge** — prominent horizontal bar + percentage (e.g., 72%)
- **Verdict line** — one editorial sentence summarizing what the evidence says (e.g., "Evidence tilts toward safe — but one question could change everything")
- **The Crux** — visually distinct card/callout. Shows the crux title and a 2-3 sentence description of what question would settle this debate. This is the centerpiece. Styled with `crux-crimson` accent to make it pop.
- **Evidence cards** — 2 compact cards side by side: strongest FOR evidence and strongest AGAINST evidence. Each shows: claim title, source, and weight score as a small bar (e.g., "36/40"). The weight visualization proves "we actually quantify this."
- **CTA** — "See the full analysis →" linking to `/topics/{id}`

Data source: Full topic data for the featured topic, loaded via dynamic import of the specific topic file (e.g., `data/topics/social-media-mental-health.ts`). Since this is a client component, use a lazy import that only pulls the one featured topic, not the full 500KB topics bundle.

### Section 2: Topic Grid

- Heading: "109 topics analyzed" (dynamically computed from topicSummaries.length)
- 6 topic cards in a responsive grid (2-col mobile, 3-col tablet, 6-col desktop)
- Each card: title, confidence %, category pill, status tag
- "Browse all topics →" link to `/topics`
- Uses existing `topicSummaries` data (lightweight, already in the client bundle)

### Section 3: Analyze CTA (demoted)

- Heading: "Have your own argument?"
- Subtext: "Paste any text and we'll map it"
- Compact textarea (shorter than current, ~80px height)
- "Analyze →" button
- "Try an Example" link (secondary)
- This is the existing HeroAnalyze functionality, but visually subordinate

### Section 4: Footer (unchanged)

## What Gets Killed

- **`OnboardingOverlay`** — removed from `HomeClient.tsx`. No modal ever. The featured topic IS the onboarding.
- **`QuickStartBanner`** — removed. Redundant with the featured hero.
- **Textarea-as-hero** — the textarea still exists but is demoted to Section 3, visually smaller.
- **"What if we could disagree..."** headline — gone. The topic title replaces it. The product speaks for itself.

## What Gets Built

### New Component: `FeaturedTopicHero`

**File:** `components/FeaturedTopicHero.tsx`

**Props:**
```typescript
interface FeaturedTopicHeroProps {
  onTopicSelect: (id: string) => void;
}
```

**Behavior:**
- Dynamically imports the full topic data for the `featuredTopicId` (from `data/topicIndex.ts`)
- Extracts: title, meta_claim, confidence_score, first pillar's crux, top "for" evidence item, top "against" evidence item (highest weight score from each side)
- Renders the hero layout described above
- Shows a minimal loading skeleton while the topic data loads (just the title + score from topicSummaries, which is already available)

**Selecting which crux/evidence to feature:**
- Crux: Use the first pillar's first crux (index 0). Most topics have their strongest crux first.
- Evidence FOR: Find the evidence item with `side === "for"` and the highest `weight` total (sum of sourceReliability + independence + replicability + directness) across all pillars.
- Evidence AGAINST: Same, but `side === "against"`.

### Modified: `HomeClient.tsx`

**Changes:**
- Remove `OnboardingOverlay` import and usage
- Remove `QuickStartBanner` import and usage
- In the hero (non-canvas) view: replace `<QuickStartBanner>` + `<HeroAnalyze>` with `<FeaturedTopicHero>` + topic grid + demoted analyze section
- The canvas view (shown after clicking a topic) stays as-is

### Modified: `HeroAnalyze.tsx`

**Changes:**
- Remove the hero headline section ("What if we could disagree...")
- Remove the featured topic card
- Remove the topic grid (moved to HomeClient)
- Keep only the analyze textarea + buttons as a compact section
- Rename to `AnalyzeCTA.tsx` or keep the name but trim the component

### Unchanged

- TopBar, Sidebar, Footer — no changes
- Canvas view — stays exactly as-is (shown after a topic is selected)
- Topic pages — no changes
- All other routes — no changes

## Design System

All within existing parchment/stoic design system:

- **Confidence gauge:** Horizontal bar using deep teal (`#3a6965`) fill on stone-200 track. Percentage in serif.
- **Crux callout:** Card with left border in crux-crimson (`#a23b3b`), slightly darker background (`#faf5f0` light / `#1e1d1a` dark). Serif title, sans body.
- **Evidence cards:** `.surface-card` styling. Weight bar as small horizontal indicator in deep teal (for) / rust (against).
- **CTA button:** Rust gradient (`.btn-cta` pattern) for "See the full analysis →".
- **Topic grid cards:** Existing card styling with confidence % badge.

## Featured Topic Selection

Use the existing `featuredTopicId` and `featuredReason` from `data/topicIndex.ts`. Current featured: "social-media-mental-health" with editorial hook "The Surgeon General just called for warning labels on social media. Where does the evidence actually land?"

This is a good first featured topic:
- Universally relatable (everyone has an opinion)
- Timely (Surgeon General hook)
- Confidence score is likely not 50/50 (creates surprise)
- Has strong cruxes

## Bundle Impact

- Current hero loads `topicSummaries` (~17KB) — no change for the grid.
- New: dynamically imports ONE topic file (~4-5KB) for the featured hero. This is an additive ~5KB over current, but we're REMOVING the `OnboardingOverlay` component, so net bundle impact is roughly neutral.
- The full 500KB topics bundle is NOT loaded — only the single featured topic file.

## Success Criteria

- [ ] First-time visitor sees a completed topic analysis with zero clicks
- [ ] Confidence score, crux, and evidence are visible above the fold on desktop
- [ ] No modal or overlay blocks the content on first visit
- [ ] Textarea/analyze is still accessible but below the fold
- [ ] Topic grid with browseable topics is visible on scroll
- [ ] Featured topic loads in under 200ms after initial page render
- [ ] Existing canvas view still works when a topic is selected
- [ ] Build passes, no type errors
