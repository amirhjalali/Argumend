# Experiment 04 — Question-First Interactive Entry

**Date:** 2026-05-19
**Status:** Design proposal
**Premise:** The homepage hero is a single question + a clickable confidence spectrum. Visitors *declare their prior*, and the page responds by surfacing the strongest counter-argument and the cruxes they'd need to update on. A "challenge your prior" UX.

---

## 1. Current state (what's there now)

`app/page.tsx` -> `HomeClient` -> `FeaturedTopicHero` (`components/FeaturedTopicHero.tsx`).
The hero today shows: featured title, `confidence_score` as a static teal bar, the first pillar's crux, "Strongest For" and "Strongest Against" evidence cards, and a "See the full analysis" CTA. It is a *broadcast*, not an *interaction*.

Data model (`lib/schemas/topic.ts`):
- `Topic.confidence_score: 0-100` — strength of the "for" position.
- `Evidence.side: "for" | "against"` — binary.
- No `position_spectrum` field, no ordered positions, no labels for poles.

This matters: the experiment assumes a spectrum, but topics are modeled as a single binary claim with a confidence number. We can derive a spectrum from `confidence_score` and `meta_claim` without a schema change — the user picks where *they* land on "Strong No <-> Strong Yes" against the meta_claim.

## 2. Interaction design

### 2a. Pre-click state

```
+----------------------------------------------------------+
|                      ARGUMEND                            |
|                                                          |
|     >  Where do you stand?                               |
|                                                          |
|        Is current or near-future AI conscious?           |
|       ----------------------------------------           |
|                                                          |
|   Strong No                                  Strong Yes  |
|   |-------|-------|-------|-------|-------|-------|      |
|     -3       -2      -1       0      +1      +2     +3   |
|                                                          |
|        Click anywhere on the line to begin.              |
|                                                          |
|        [ skip - just show me the map ]                   |
+----------------------------------------------------------+
```

Spectrum is a single horizontal track, 7 detents (-3..+3), with hover preview ("You: lean No"). Mobile: same bar, larger touch targets (44px), detents snap on release. Keyboard: arrow keys move a focus ring; Enter commits.

### 2b. Post-click state (user clicked +2, "lean Yes")

```
+----------------------------------------------------------+
|  Your prior: lean YES (+2)                  [reset]     |
|  |-------|-------|-------|-------|---*---|-------|       |
|                                                          |
|  Argumend's reading: 38% confidence FOR  <-- you differ  |
|                                                          |
|  +--------------------------------------------------+    |
|  | THE STRONGEST CASE YOU MIGHT BE WRONG            |    |
|  | (against, weight 28/40)                          |    |
|  |                                                  |    |
|  | Cambridge philosopher: AI consciousness may be   |    |
|  | permanently undetectable. We lack a theory of    |    |
|  | consciousness adequate to determine what         |    |
|  | computational processes are sufficient...        |    |
|  +--------------------------------------------------+    |
|                                                          |
|  TWO CRUXES THAT WOULD CHANGE YOUR MIND                  |
|  - Reliable consciousness detection in non-bio systems   |
|  - Substrate independence of phenomenal experience       |
|                                                          |
|        [ See the full map -> ]                           |
+----------------------------------------------------------+
```

Rules for what gets shown:
- **Counter-evidence direction:** if user clicks > 0 (toward Yes), show the highest-weighted `side: "against"` evidence. If user clicks < 0, show highest-weighted `side: "for"`. If user clicks 0, show both at half size.
- **Cruxes:** show the cruxes from the top two pillars by total evidence weight (the cruxes that would shift the most).
- **"You differ" signal:** compute distance between user's normalized prior (-3..+3 -> 0..100) and `confidence_score`. If gap > 25 points, emphasize the counter-argument; if gap <= 25, frame it as "you broadly agree with the evidence — here's where you might still be wrong."

### 2c. Animation

Fade-out the spectrum prompt, fade-in the result card. Total motion under 300ms; respect `prefers-reduced-motion`.

## 3. Choosing the featured question

Three options, in order of preference:

1. **Founder pick (start here).** Reuse the existing `featuredTopicId` and `featuredReason` from `data/topicIndex.ts`. Zero new machinery. Rotate manually weekly.
2. **Weekly rotation by recency.** Pick from a curated shortlist of 5-8 topics where the meta_claim phrases cleanly as a yes/no question. Hash by ISO week.
3. **A/B on question phrasing.** Not yet — first prove the interaction itself lifts engagement.

Topics need a `hero_question` string (e.g., "Is AI conscious?") because `meta_claim` is a declarative sentence, not a question. Add as an optional field in the schema or a side-table keyed by topic id.

## 4. Files to create or modify

- `lib/schemas/topic.ts` — add optional `hero_question?: string` and optional `spectrum_labels?: { left: string; right: string }` (defaults: "Strong No" / "Strong Yes").
- `data/topicIndex.ts` — add `featuredHeroQuestion` and `featuredSpectrumLabels` next to `featuredTopicId`.
- `data/topics/<featured>.ts` — populate `hero_question` for the 6-8 candidate featured topics.
- `components/FeaturedTopicHero.tsx` — **replace body**. Two-phase state machine (`"prompt" | "result"`). Use existing `getBestEvidence` helper; add `getTopCruxes(topic, n)`.
- `components/PriorSpectrum.tsx` — **new**. Pure presentational; emits `onCommit(value: -3|-2|-1|0|1|2|3)`.
- `lib/analytics.ts` — log `prior_committed`, `prior_value`, `gap_to_evidence`, `cta_clicked`. Critical: without this we can't tell if the experiment lifts anything.

No DB changes. Works offline (uses the existing static topic data).

## 5. Effort estimate

| Block | Hours |
|---|---|
| Schema + topic data plumbing (`hero_question` on ~8 topics) | 2 |
| `PriorSpectrum` component (desktop + mobile + a11y) | 4 |
| Rewrite `FeaturedTopicHero` with two-phase state | 3 |
| Analytics events | 1 |
| QA: dark mode, mobile, reduced-motion, keyboard | 2 |
| **Total** | **~12 hrs** (1.5 focused days) |

## 6. Expected lift: **4 / 5**

Reasoning: this is the only entry experiment in the set that converts a passive visitor into a *participant before they've committed any cognitive load*. A single click is the lowest-friction interaction possible and creates a Zeigarnik-style open loop (they want to know how they compare). The "you might be wrong" framing is on-brand for the stoic/parchment voice and differentiates from every other take-platform on the internet. Compared with experiments that surface more text or more graph, this one trades information density for *engagement asymmetry*: low ask, high reveal.

Why not 5: depends on the featured question landing for a generic visitor. AI consciousness skews tech-Twitter; geoengineering skews wonkier. A bad weekly pick will tank the metric.

## 7. Risks

- **Forcing a prior alienates the undecided.** Mitigation: a visible "I'm not sure yet" detent at 0, and a "skip - just show me the map" link below the spectrum.
- **Spectrum doesn't match the data model.** Confidence is currently 1D and binary-sided. For yes/no meta-claims this is fine; for multi-position topics ("Which AI risk matters most?") it breaks. Mitigation: gate the experiment to topics with `hero_question` set, so the founder hand-picks topics that fit.
- **Mobile UX.** A 7-detent slider on a 360px viewport is cramped. Mitigation: collapse to 5 detents on `< sm` breakpoint; use snap-on-release with haptic if available.
- **Hides the map.** Today's hero already shows evidence and crux at a glance; replacing that with a prompt may *lower* depth-of-scroll among visitors who would have scrolled. Mitigation: keep the post-click reveal information-dense (counter-evidence + cruxes + CTA), and preserve "skip" as a 1-click bypass.
- **Anchoring bias.** Showing the user our 38% number *after* they click is fine; showing it before would just anchor them. Order matters — commit, then reveal.
- **Bot/scrape interactions.** Spectrum clicks will be inflated by bots; analytics should require a `mousemove`/`touchstart` precondition before counting `prior_committed`.

## 8. Success metric

Primary: % of homepage visitors who commit a prior **and** click the "See the full map" CTA, vs. current baseline of CTA click-through on `FeaturedTopicHero`. Target: 2x lift to consider keeping. Secondary: median time-on-hero, % who reset the spectrum (engagement signal), distribution of prior values (sanity check that the question isn't lopsided).
