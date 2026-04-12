# Homepage Hook ("Surprising Verdict") Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current textarea-first homepage hero with a live, pre-expanded topic analysis showing confidence score, crux, and evidence cards — product value visible in 5 seconds, zero clicks.

**Architecture:** New `FeaturedTopicHero` component dynamically imports one full topic's data and renders it inline. `HomeClient.tsx` hero view swaps from `OnboardingOverlay` + `QuickStartBanner` + `HeroAnalyze` to `FeaturedTopicHero` + topic grid + demoted analyze textarea. Canvas view untouched.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, dynamic imports, existing topic data files

---

## File Map

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `components/FeaturedTopicHero.tsx` | Hero: renders one topic's score, crux, evidence inline |
| Modify | `components/HomeClient.tsx:192-216` | Swap hero view contents, remove overlay/banner |
| Modify | `components/HeroAnalyze.tsx` | Strip to analyze-only CTA (remove hero headline, featured card, topic grid) |
| Modify | `data/topicIndex.ts:56` | Change `featuredTopicId` to a topic that has evidence items |

---

### Task 1: Change Featured Topic to One With Evidence

The current featured topic (`social-media-mental-health`) has **zero evidence items** — the evidence arrays are missing entirely from its data file. The hook needs evidence cards, so we must pick a topic that has them.

**Files:**
- Modify: `data/topicIndex.ts:56-59`

- [ ] **Step 1.1: Update `featuredTopicId` and `featuredReason`**

```typescript
// data/topicIndex.ts — lines 55-59
/** Rotate this ID weekly to feature a different debate on the homepage. */
export const featuredTopicId = "gun-control-effectiveness";

/** Short editorial hook explaining why this topic is featured right now. */
export const featuredReason =
  "America's most argued topic. 400 million guns, 45,000 deaths a year. Where does the evidence actually land?";
```

Why `gun-control-effectiveness`: universally recognized topic, polarized audience (everyone has a prior), contested status (not settled), has evidence items with weight objects, and the confidence score will likely surprise visitors on at least one side.

- [ ] **Step 1.2: Verify the topic has evidence and cruxes**

Run:
```bash
grep -c '"evidence"' data/topics/gun-control-effectiveness.ts && grep -c '"crux"' data/topics/gun-control-effectiveness.ts
```

Expected: Both counts > 0.

- [ ] **Step 1.3: Commit**

```bash
git add data/topicIndex.ts
git commit -m "feat: change featured topic to gun-control-effectiveness (has evidence items for new hero)"
```

---

### Task 2: Create `FeaturedTopicHero` Component

**Files:**
- Create: `components/FeaturedTopicHero.tsx`

- [ ] **Step 2.1: Create the component file**

```tsx
"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Crosshair } from "lucide-react";
import {
  topicSummaries,
  featuredTopicId,
  featuredReason,
} from "@/data/topicIndex";
import type { Topic } from "@/lib/schemas/topic";

interface FeaturedTopicHeroProps {
  onTopicSelect: (id: string) => void;
}

// Extract the best evidence item for a given side across all pillars
function getBestEvidence(
  topic: Topic,
  side: "for" | "against"
): { title: string; source: string; score: number } | null {
  let best: { title: string; source: string; score: number } | null = null;
  for (const pillar of topic.pillars) {
    for (const ev of pillar.evidence ?? []) {
      if (ev.side !== side) continue;
      const score =
        (ev.weight?.sourceReliability ?? 0) +
        (ev.weight?.independence ?? 0) +
        (ev.weight?.replicability ?? 0) +
        (ev.weight?.directness ?? 0);
      if (!best || score > best.score) {
        best = { title: ev.title, source: ev.source ?? "Unknown", score };
      }
    }
  }
  return best;
}

export function FeaturedTopicHero({ onTopicSelect }: FeaturedTopicHeroProps) {
  const [topic, setTopic] = useState<Topic | null>(null);

  // Get lightweight summary (available immediately)
  const summary = topicSummaries.find((t) => t.id === featuredTopicId);

  // Dynamically import full topic data (~5KB for one topic)
  useEffect(() => {
    let cancelled = false;
    import(`@/data/topics.ts`).then((mod) => {
      if (cancelled) return;
      const topics: Topic[] = mod.topics;
      const found = topics.find((t: Topic) => t.id === featuredTopicId);
      if (found) setTopic(found);
    });
    return () => { cancelled = true; };
  }, []);

  if (!summary) return null;

  const score = summary.confidence_score;
  const crux = topic?.pillars?.[0]?.crux;
  const forEvidence = topic ? getBestEvidence(topic, "for") : null;
  const againstEvidence = topic ? getBestEvidence(topic, "against") : null;

  return (
    <div className="flex flex-col items-center px-4 md:px-8 pt-8 pb-8 bg-gradient-to-b from-[#f4f1eb] to-stone-50 dark:from-[#1a1917] dark:to-[#201f1c]">
      <div className="w-full max-w-2xl space-y-6">
        {/* Title */}
        <div className="text-center space-y-3">
          <p className="text-xs font-medium text-deep/70 tracking-widest uppercase">
            Featured Analysis
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary leading-[1.08]">
            {summary.title}
          </h1>
          {featuredReason && (
            <p className="font-serif text-base md:text-lg text-stone-500 dark:text-stone-400 max-w-lg mx-auto leading-relaxed">
              {featuredReason}
            </p>
          )}
        </div>

        {/* Confidence Score */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-full max-w-xs bg-stone-200 dark:bg-[#302e2a] rounded-full h-3 overflow-hidden">
            <div
              className="h-full rounded-full bg-deep transition-all duration-700"
              style={{ width: `${score}%` }}
            />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-deep tabular-nums">
              {score}%
            </span>
            <span className="text-sm text-stone-500 dark:text-stone-400">
              confidence
            </span>
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400 text-center max-w-md">
            {summary.meta_claim}
          </p>
        </div>

        {/* Crux */}
        {crux && (
          <div className="bg-[#faf5f0] dark:bg-[#1e1d1a] border-l-4 border-[#a23b3b] rounded-r-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Crosshair className="h-4 w-4 text-[#a23b3b]" />
              <span className="text-xs font-semibold text-[#a23b3b] tracking-wide uppercase">
                The Crux
              </span>
            </div>
            <h3 className="font-serif text-lg font-semibold text-primary mb-1.5">
              {crux.title}
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {crux.description}
            </p>
          </div>
        )}

        {/* Evidence Cards */}
        {(forEvidence || againstEvidence) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {forEvidence && (
              <div className="bg-white dark:bg-[#252420] border border-stone-200/60 dark:border-[#3d3a36] rounded-xl p-4">
                <span className="text-xs font-semibold text-deep tracking-wide uppercase">
                  Strongest For
                </span>
                <p className="mt-2 text-sm font-medium text-primary leading-snug">
                  {forEvidence.title}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 bg-stone-100 dark:bg-[#302e2a] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-deep"
                      style={{ width: `${(forEvidence.score / 40) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-stone-400 tabular-nums">
                    {forEvidence.score}/40
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-stone-400">{forEvidence.source}</p>
              </div>
            )}
            {againstEvidence && (
              <div className="bg-white dark:bg-[#252420] border border-stone-200/60 dark:border-[#3d3a36] rounded-xl p-4">
                <span className="text-xs font-semibold text-rust-600 dark:text-rust-400 tracking-wide uppercase">
                  Strongest Against
                </span>
                <p className="mt-2 text-sm font-medium text-primary leading-snug">
                  {againstEvidence.title}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 bg-stone-100 dark:bg-[#302e2a] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-rust-500"
                      style={{
                        width: `${(againstEvidence.score / 40) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-stone-400 tabular-nums">
                    {againstEvidence.score}/40
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-stone-400">
                  {againstEvidence.source}
                </p>
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="flex justify-center">
          <button
            onClick={() => onTopicSelect(featuredTopicId)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-serif font-semibold text-sm bg-gradient-to-r from-rust-500 to-rust-600 text-white shadow-md hover:shadow-lg hover:from-rust-600 hover:to-rust-700 hover:scale-[1.03] hover:-translate-y-px active:scale-[0.97] transition-all duration-200"
          >
            See the full analysis
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
```

**Note on data loading:** The component uses `import("@/data/topics.ts")` to get the full topic list. This is the same pattern `useLogicGraph.ts` uses — the full topics bundle is lazy-loaded only when needed. The summary data (title, score) shows instantly from `topicSummaries`; crux and evidence fill in after the async load (~200ms).

- [ ] **Step 2.2: Verify the component compiles**

Run:
```bash
npx tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 2.3: Commit**

```bash
git add components/FeaturedTopicHero.tsx
git commit -m "feat: add FeaturedTopicHero component — shows topic score, crux, evidence inline"
```

---

### Task 3: Strip `HeroAnalyze` Down to Analyze-Only CTA

The current `HeroAnalyze.tsx` contains the hero headline, the analyze textarea, the featured topic card, and the topic grid. We need to strip it down to JUST the analyze textarea section — the topic grid moves to `HomeClient.tsx`.

**Files:**
- Modify: `components/HeroAnalyze.tsx`

- [ ] **Step 3.1: Replace HeroAnalyze with a compact analyze-only section**

Keep lines 1-76 (imports, state, handlers). Replace the return JSX (line 98 onward) with:

```tsx
  return (
    <div className="px-4 md:px-8 py-10 bg-stone-50/50 dark:bg-[#1a1917]/50">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-xl font-semibold text-primary mb-1">
          Have your own argument?
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">
          Paste any text and we&apos;ll map it
        </p>

        <div className="bg-white dark:bg-[#252420] rounded-xl border border-stone-200/60 dark:border-[#3d3a36] p-4 shadow-sm">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste an article, argument, or any text you'd like analyzed..."
            aria-label="Text to analyze"
            className="w-full min-h-[80px] p-3 bg-[#faf8f5] dark:bg-[#1a1917] border border-stone-200/60 dark:border-[#3d3a36] rounded-lg text-stone-700 dark:text-stone-200 text-sm leading-relaxed placeholder-stone-500/70 dark:placeholder-stone-500 resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-deep/20 focus:border-deep/40"
          />

          <div className="flex items-center justify-end mt-3 gap-2">
            <button
              onClick={handleTryExample}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-deep hover:bg-deep/5 transition-all"
            >
              Try an Example
            </button>
            <button
              onClick={handleAnalyze}
              disabled={!content.trim()}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-serif font-semibold text-sm transition-all duration-200 ${
                content.trim()
                  ? "bg-gradient-to-r from-rust-500 to-rust-600 text-white shadow-md hover:shadow-lg hover:from-rust-600 hover:to-rust-700"
                  : "bg-stone-100 dark:bg-[#302e2a] text-stone-400 cursor-not-allowed"
              }`}
            >
              Analyze
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
```

Also remove the now-unused imports: `Flame`, `Newspaper`, `Mic`, `Upload`, `ChevronRight`, `Beaker`, `Link`, `topicSummaries`, `featuredTopicId`, `featuredReason`, `CATEGORY_ORDER`, `EXAMPLE_ANALYSIS_TEXT` (if unused), content type state, file upload handler. Keep: `useState`, `useCallback`, `useRef`, `useRouter`, `ArrowRight`, `EXAMPLE_ANALYSIS_TEXT`.

The content type segmented control (Freeform/Article/Transcript) is removed — that detail belongs on the `/analyze` page, not the homepage CTA.

- [ ] **Step 3.2: Verify compilation**

Run:
```bash
npx tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 3.3: Commit**

```bash
git add components/HeroAnalyze.tsx
git commit -m "refactor: strip HeroAnalyze to compact analyze-only CTA"
```

---

### Task 4: Rewire `HomeClient.tsx` Hero View

**Files:**
- Modify: `components/HomeClient.tsx:1-216`

- [ ] **Step 4.1: Update imports**

At the top of `HomeClient.tsx`, add the new import and a few for the topic grid. Remove the old ones:

```typescript
// ADD these imports
import { FeaturedTopicHero } from "@/components/FeaturedTopicHero";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { topicSummaries, CATEGORY_ORDER } from "@/data/topicIndex";

// REMOVE these imports (no longer used in this file)
// import { QuickStartBanner } from "@/components/QuickStartBanner";
// import { TopicIntroPanel } from "@/components/TopicIntroPanel";
```

Also remove the `OnboardingOverlay` dynamic import (lines 49-52):
```typescript
// DELETE these lines
const OnboardingOverlay = dynamic(
  () => import("@/components/OnboardingOverlay").then((m) => m.OnboardingOverlay),
  { ssr: false }
);
```

- [ ] **Step 4.2: Add topic grid helper (above the component function)**

Add a constant and logic for the topic grid that was previously inside HeroAnalyze:

```typescript
const GRID_TOPICS_COUNT = 6;
```

- [ ] **Step 4.3: Replace the hero view JSX**

In the `if (showHero)` block (around line 192-216), replace the contents of `<main>`:

```tsx
  if (showHero) {
    // Build topic grid data
    const gridTopics = CATEGORY_ORDER
      .map((cat) => topicSummaries.find((t) => t.category === cat))
      .filter(Boolean)
      .slice(0, GRID_TOPICS_COUNT) as typeof topicSummaries;

    return (
      <div className="flex min-h-screen w-full flex-col bg-transparent font-sans text-primary">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[#4f7b77] focus:text-white focus:rounded"
        >
          Skip to main content
        </a>
        <TopBar onMenuClick={sidebar.toggle} showBackToHero={false} />

        <SidebarLayout
          sidebar={sidebar}
          currentTopicId={currentTopicId}
          onTopicSelect={handleTopicSelect}
        >
          <main id="main-content" role="main" className="relative flex-1 min-w-0 overflow-y-auto">
            {/* Section 1: Featured Topic Hero */}
            <FeaturedTopicHero onTopicSelect={handleTopicSelect} />

            {/* Section 2: Topic Grid */}
            <div className="px-4 md:px-8 py-10">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-serif text-xl font-semibold text-primary mb-5">
                  {topicSummaries.length} topics analyzed
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {gridTopics.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => handleTopicSelect(topic.id)}
                      className="group text-left p-4 bg-white dark:bg-[#252420] border border-stone-200/60 dark:border-[#3d3a36] rounded-xl hover:border-deep/30 hover:shadow-md hover:scale-[1.01] hover:-translate-y-0.5 transition-all"
                    >
                      <h3 className="font-serif text-sm font-medium text-primary group-hover:text-deep transition-colors leading-snug line-clamp-2">
                        {topic.title}
                      </h3>
                      <span
                        className={`mt-2 inline-block text-xs font-mono px-1.5 py-0.5 rounded-md ${
                          topic.confidence_score >= 80
                            ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                            : topic.confidence_score >= 50
                            ? "bg-rust-50 dark:bg-rust-900/30 text-rust-600 dark:text-rust-400"
                            : "bg-stone-50 dark:bg-[#302e2a] text-stone-500"
                        }`}
                      >
                        {topic.confidence_score}%
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-5 text-center">
                  <Link
                    href="/topics"
                    className="inline-flex items-center gap-1 text-sm font-serif font-medium text-deep hover:text-deep-dark transition-colors group"
                  >
                    Browse all topics
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Section 3: Demoted Analyze CTA */}
            <HeroAnalyze onTopicSelect={handleTopicSelect} />

            <Footer />
          </main>
        </SidebarLayout>
      </div>
    );
  }
```

- [ ] **Step 4.4: Verify compilation and build**

Run:
```bash
npx tsc --noEmit && bun run build
```

Expected: No type errors. Build succeeds.

- [ ] **Step 4.5: Commit**

```bash
git add components/HomeClient.tsx
git commit -m "feat: rewire homepage hero — FeaturedTopicHero + topic grid + demoted analyze CTA"
```

---

### Task 5: Clean Up Dead Code

**Files:**
- Modify: `components/HomeClient.tsx` (remove any leftover dead imports)
- Optionally delete: `components/OnboardingOverlay.tsx`, `components/QuickStartBanner.tsx` (if no other file imports them)

- [ ] **Step 5.1: Check if OnboardingOverlay and QuickStartBanner are used elsewhere**

Run:
```bash
grep -r "OnboardingOverlay" --include="*.tsx" --include="*.ts" -l
grep -r "QuickStartBanner" --include="*.tsx" --include="*.ts" -l
```

Expected: Only their own definition files. If so, they can be deleted.

- [ ] **Step 5.2: Delete dead components (if unused)**

```bash
rm components/OnboardingOverlay.tsx components/QuickStartBanner.tsx
```

- [ ] **Step 5.3: Remove any remaining dead imports in HomeClient.tsx**

Check for `TopicIntroPanel` — it's still used in the canvas view (line 289). Keep it. Check for `MapLegend`, `NavigationPath` — also canvas view. Keep them.

- [ ] **Step 5.4: Final build verification**

Run:
```bash
npx tsc --noEmit && bun run build
```

Expected: Clean build, no errors.

- [ ] **Step 5.5: Run existing tests**

Run:
```bash
bun test
```

Expected: All existing tests pass. (There are no specific homepage tests, but we shouldn't break anything.)

- [ ] **Step 5.6: Commit**

```bash
git add -A
git commit -m "chore: remove OnboardingOverlay and QuickStartBanner — replaced by FeaturedTopicHero"
```

---

## Verification Checklist

After all tasks:

- [ ] `bun run build` succeeds
- [ ] `bun test` passes
- [ ] Homepage shows the featured topic analysis immediately (no modal, no textarea-first)
- [ ] Confidence score, crux, and evidence cards are visible above the fold on desktop
- [ ] Topic grid appears on scroll with "Browse all topics" link
- [ ] Analyze textarea appears below the topic grid
- [ ] Clicking "See the full analysis" opens the topic's canvas view
- [ ] Clicking a topic card in the grid opens its canvas view
- [ ] Dark mode renders correctly
- [ ] Mobile viewport shows content stacked vertically
