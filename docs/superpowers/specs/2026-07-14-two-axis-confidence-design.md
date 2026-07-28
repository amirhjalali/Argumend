# Two-Axis Confidence: Balance + Weight

**Date:** 2026-07-14
**Status:** design — awaiting founder approval before implementation
**Origin:** the single `confidence_score` (0–100) reads as arbitrary and, worse, mislabels good maps. Moloch scores 46 and prints **"Insufficient evidence"** under 18 sourced evidence nodes and 5 cruxes. The score took the best-argued map in the corpus and called it a stub.

## 1. The defect

`computeConfidenceScore(pillars) = forStrength / (forStrength + againstStrength + 1) * 100` is a weighted vote count. It collapses two orthogonal questions into one number:

- **which way** the evidence leans (the tilt), and
- **how much** we actually know (the mass + quality + resolvability).

A 50 can mean "richly evidenced, genuinely balanced" *or* "we have nothing." Opposite epistemic states, identical number. That is why it does not inspire confidence, and why the verdict labels misfire.

## 2. The model — Keynes's Balance and Weight

Every belief has a **balance** of evidence (which way it tips) and a **weight** of argument (how much bears on it). Keynes's own distinction; the ACX/LW audience recognizes it. We compute both, per topic, in `buildTopic`.

### 2.1 Balance (the tilt) — 0–100, 50 = even
Keep the existing computation (it was always really a balance, never a confidence):
```
balance = forStrength / (forStrength + againstStrength) * 100   // 50 when both zero
```
where `strength = sum of the 4 evidence weights (0–40)` per item, summed per side. `> 50` leans toward the meta-claim, `< 50` against. Displayed as a **diverging** readout centered on 50, never as a bare number.

Label by lean magnitude `d = |balance − 50|` (thresholds in `lib/constants.ts`):
| d | label |
|---|---|
| < 7 | Even split / genuinely balanced |
| 7–20 | Leans toward / against |
| 20–38 | Clearly favors |
| > 38 | Strongly favors |

### 2.2 Weight (how much we know) — 0–100, NEW
A composite of three components, each 0–1:
- **Mass** `M` — total evidential strength `Σ strengthᵢ`, saturating so more good evidence helps with diminishing returns: `M = 1 − exp(−Σstrengthᵢ / K)`.
- **Quality** `Q` — `mean(strengthᵢ) / 40`; are the sources strong on average (reliable, independent, replicable, direct)?
- **Resolvability** `R` — mean over pillars of crux `verification_status`: `verified = 1.0`, `theoretical = 0.5`, `impossible = 0.0`. Can the open questions even be settled? (This is the sophisticated signal: a map can be rich yet rest on an empirically-unresolvable crux.)

```
weight = 100 * (wM·M + wQ·Q + wR·R)
```
**Coefficients (`K, wM, wQ, wR`) are calibrated empirically, not guessed** — a calibration pass computes `weight` across all 113 real topics and tunes the constants until the distribution and these anchors hold:
- `moon-landing` (settled) → high weight (> 80),
- `moloch` (rich but a partly-unresolvable core crux) → medium-high weight (~60–75), **not** "insufficient",
- a thin 3–4-evidence topic → low weight (< 35),
- the corpus spread is legible (not all clustered).

Starting point for calibration: `wM=0.5, wQ=0.3, wR=0.2`, `K` set so ~16 strong items ≈ 0.85 mass.

### 2.3 Verdict — 2-D, replaces `getVerdictLabel`
`getVerdict(balance, weight) → { label, quadrant }`, thresholds in constants:
| weight | lean d | verdict |
|---|---|---|
| ≥ 65 | ≥ 20 | **Settled — evidence strongly favors [side]** (the confident quadrant) |
| ≥ 65 | < 20 | **Well-mapped, genuinely contested** ← Moloch, AI 2027 land here honestly |
| 35–65 | any | **[Leans side / Balanced] — moderately evidenced** |
| < 35 | any | **Open question — limited evidence so far** (weight dominates; lean is not asserted) |

This is the whole point: Moloch's honest verdict becomes *"Well-mapped, genuinely contested"* instead of *"Insufficient evidence."*

## 3. Data model & back-compat

`buildTopic` injects three computed values onto every `Topic`:
- `balance: number` (0–100) — the tilt.
- `weight: number` (0–100) — NEW.
- `verdict: { label: string; quadrant: string }` — NEW.
- `confidence_score: number` — **kept, = balance**, deprecated-in-comment, retained ONLY for the JSON-LD `ClaimReview.ratingValue` (schema.org needs a scalar) and as a safety net for any not-yet-migrated surface.

`buildTopic`'s input type omits all four computed fields, so **the ~100 raw `data/topics/**` files need no edits** (they never provided them). The "settled → `Math.max`" override is reworked: settled ⇒ `balance = max(computed, authored)` **and** `weight = max(computed, SETTLED_WEIGHT_FLOOR)`.

`TopicSummary` (in `data/topicIndex.ts`) gains `balance`, `weight`, `verdict`; `scripts/regen-summaries.ts` emits them; **`topicSummaries.json` is regenerated** (the #1 stale-render hazard — it feeds ~12 list surfaces). No DB change (verified: no table stores a topic score).

## 4. Visual language

The redesigned **balance scale** (`components/ScalesOfEvidence.tsx`, `BalanceMeter`) is already a balance+weight device but only renders on the homepage map. Promote it to the product's spine:

- New shared **`components/BalanceWeightReadout.tsx`**: the scale **tilts** for balance, a **weight bar/heft** shows weight, and the **2-D verdict** labels it. One metaphor, both axes. Used in `ReadModeView` (default topic view) and `TopicDetailView` (graph view), replacing the lone `%`/verdict.
- Compact **`components/BalanceWeightChip.tsx`** for cards/lists: a mini diverging balance glyph + a small weight indicator + verdict tone. Replaces the bare `%` badge in Sidebar, HomeClient grid, FeaturedTopicHero, topics/explore lists, RelatedTopicCard, TopicIntroPanel, SearchModal, embed, and the `is/`·`questions/` SEO pages.
- **Auditability**: the readout links to the existing Scales/evidence breakdown — click the verdict → see the exact evidence stack and weights that produced it. No new data needed (no fabricated "last updated" dates — the evidence *is* the audit trail).

Design-system-consistent (parchment/stoic, deep-teal / rust / crux-crimson; never amber). The visual component gets first-class craft via the frontend-design skill during build.

## 5. Migration surface (from the inventory)

**Compute/labels** — `lib/schemas/topic.ts` (rewrite `computeConfidenceScore` → `{balance, weight}`; `getVerdictLabel` → `getVerdict`; keep `calculateEvidenceScore`/`scoreEvidence` as the per-item primitive), `lib/constants.ts` (new home for ALL balance/weight/verdict thresholds + formula coefficients — ends the 95/75/50 · 85/60/40 · 80/50 · 65/35 drift), `types/logic.ts` re-exports, `data/topics.ts::buildTopic`.

**Data** — `scripts/regen-summaries.ts`, `data/topicSummaries.json` (regen), `data/topicIndex.ts::TopicSummary`, `data/logicBlueprint.ts` root node.

**Topic-page display** — `components/ReadModeView.tsx` (default), `app/topics/[id]/TopicDetailView.tsx` (hero badge, Key Takeaways, 30-second banner, meta-claim prose, `confidenceColor`, and **fix the count-vs-weight "Evidence Balance" bar** to use weighted strength), `TopicPageClient`, `page.tsx` (JSON-LD ClaimReview + metadata), `app/api/og/[id]/route.tsx`.

**Shared components** — `ControversyMeter` (reframe onto weight/balance), `VerdictVoting` (vote vs balance), `ShareButtons` (contract + tweet copy), `ConfidenceGauge` (**coordinate — 3 callers, 3 data sources**; topic caller migrates, blueprint/extractor callers untouched), `ScalesOfEvidence::VerdictDisplay`.

**Lists / explore / compare / SEO** — `Sidebar`, `HomeClient` grid, `FeaturedTopicHero`, `app/topics/page.tsx` + `app/explore/page.tsx` (**redefine sort**: "Most settled"=weight desc, "Most contested"=lean asc, "Strongest for/against"=balance; fix `progressbar` aria), `TopicExplorer` (**replace the single `confidenceRange` filter** with a weight-min slider + a balance filter), both `compare/**` views, `MobileArgumentList`, `TopicIntroPanel`, `SearchModal` (reconcile its 65/35 `getVerdictInfo` with the real balance axis), `app/embed/[topicId]`, `app/is/[slug]`, `app/questions/[slug]` (both have `/100` literal copy).

**Explicitly out of scope** (different concepts — do NOT sweep in): judge-council (`generate-verdicts`, `ShareVerdictCard`, `verdict-card` route, `mockVerdicts`), extractor `confidence` (0–1) in `lib/analyze/*`, `ConfidenceTimeline` per-event data, `app/api/og/route.tsx` (analysis-share for/against/draw).

## 6. Tests

Rewrite the 4 affected suites for two axes (all import by name, so keep or alias exports to avoid compile breaks): `lib/schemas/topic-utils.test.ts` and `lib/schemas/topic.test.ts` (balance/weight/verdict math + matrix), `data/topics-enhanced.test.ts` (stored balance+weight == computed guardrail — keep it; it catches stale snapshots), `data/topics.test.ts` (`moonLanding` → high weight + strong lean; ranges). Add anchor tests encoding the calibration targets in §2.2.

## 7. Success criteria

- No surface displays a lone `confidence_score`/"X% confidence"/"X/100"; every one shows Balance + Weight (+ verdict).
- Moloch reads *"Well-mapped, genuinely contested,"* never *"Insufficient evidence."*
- `topicSummaries.json` regenerated; no list renders a stale number.
- `bun run build`, `bun test`, `bun run lint` all green.
- Every migrated surface rendered and eyeballed (Playwright) in light + dark.
- Calibration anchors in §2.2 hold across the real 113-topic corpus.
- JSON-LD/OG still emit valid machine-readable output.

## 8. Out of scope / YAGNI
No per-topic "last updated" dates (no such data; would be fabricated). No user-facing weight *formula* editor. No re-authoring of the 113 topics' evidence. No judge-council changes.
