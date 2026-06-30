# Nuclear Flagship — User Journey Design

**Date:** 2026-06-22
**Status:** Active (autonomous loop build)
**Flagship topic:** `nuclear-energy-safety` ("Nuclear Energy for Climate")
**Branch:** `nuclear-flagship`

---

## The Goal (founder's words)

> "Immediately wow a person with the site's ability to articulate points simply
> and persuasively, and then allow them to drill into the details of each
> argument in a natural and comprehensive way. Picking one topic to do this and
> simplify a difficult-to-understand point to irrefutable atomic facts with
> their level of confidence is key. Explaining the crux in a way which is to say
> how it could support or disprove the argument — the question is: what new
> information would convince you that your position is wrong?"

We prove the methodology on the single strongest empirical case (nuclear safety),
then roll it out. Nuclear is chosen because a widely-feared topic where *the data
shocks people* is the best possible showcase for "irrefutable atomic facts with
confidence."

---

## The Visitor

Arrives from search/social carrying a pre-loaded gut belief — usually
*"nuclear is scary/dangerous"* (Chernobyl, Fukushima, mushroom clouds). They did
not come to read an essay. We have ~5 seconds to earn the next 5 minutes. The
journey must move them **from gut reaction → reasoned position in ~90 seconds**,
with an honest off-ramp to comprehensive depth.

---

## The Journey — five stages

### Stage 1 — The Hook (the wow)
Above everything, one counterintuitive, near-irrefutable atomic fact that collides
with their gut, stated plainly with its confidence:

> **Nuclear is one of the safest energy sources ever measured.**
> Deaths per TWh: **coal 24.6 · nuclear 0.03** — about **800× safer**, on par
> with wind & solar.
> `Confidence 97% · Our World in Data, Lancet` — [why so confident? ▸]

The dry policy `meta_claim` ("should be expanded…") is demoted; the *first* thing
seen is a fact you can't argue with, not an opinion to resist. The "why so
confident?" expander is the hook into the detail. **Principle: lead with the
single fact most likely to make them say "wait, really?" — then show the receipts.**

### Stage 2 — The Simple Case (persuasive articulation)
The whole argument in ~3 plain sentences that *concede the real weakness* — which
is what makes it persuasive rather than propagandistic:

1. Nuclear is among the safest and lowest-carbon ways to make electricity — the
   data here isn't close.
2. The real debate isn't safety; it's whether we can build reactors *fast and
   cheap enough* to matter for climate.
3. France decarbonized its grid with nuclear in ~15 years; recent US/UK projects
   ran years late and billions over. **That** is the actual fight.

This relocates the debate to its true center and earns trust by steel-manning the
opposition up front.

### Stage 3 — Atomic Facts with Confidence (irrefutable building blocks)
A scannable set of discrete atomic facts, each one a single checkable claim with:
- its **confidence** (derived from the 4-factor evidence weight), shown as % + tier
  label (**Established 90%+ / Strong 75–89 / Contested 50–74 / Thin <50**);
- a one-click **source**;
- a **side** marker (supports / complicates the case).

Sorted **confidence-descending** so the rock-solid facts anchor before the
contested ones. Visually distinguish "Established" facts from "Contested" ones so
the reader feels the difference between *settled* and *genuinely arguable*. This is
the literal "simplify a difficult point to irrefutable atomic facts with their
level of confidence" layer.

### Stage 4 — The Crux as Falsification ("what would change your mind")
The conceptual centerpiece. For each pillar, present a bidirectional falsification
panel instead of (or alongside) the current "what would settle this" test:

- **What would change a supporter's mind** (FOR → AGAINST flip): the specific
  finding that would force a proponent to abandon the position.
  *e.g. "Credible evidence that low-dose radiation causes large, currently
  undetected cancer tolls — overturning the radiation-safety consensus — would
  move nuclear from 'safe' to 'unacceptably risky.'"*
- **What would change a skeptic's mind** (AGAINST → FOR flip): the finding that
  would dissolve the strongest objection.
  *e.g. "A demonstrated, repeatable path to building reactors at <$4/W in <5 years
  would neutralize the cost objection that anchors most opposition."*
- **Common ground** — what both sides already agree on (safety is largely settled).
- **Live disagreement** — where the real fight is (cost & build speed).

This reframes "crux" from *"what experiment settles it"* to *"what new information
would convince each side they're wrong."* It models intellectual honesty: a good
reasoner can state what would change their mind. The existing verification fields
(methodology, cost-to-verify) remain as a complementary "here's the test."

### Stage 5 — Comprehensive Drill-down + Exit
The full pillar / evidence / sources detail (today's Read-Mode content), now
positioned as the "show me everything" layer beneath the simple case — the
"natural and comprehensive" drill-down. Exit ramps:
- **Community verdict** — "Where do *you* land now?" (existing `VerdictVoting`).
- A light **"did this change your mind?"** tie-back to the falsification framing.
- **Related topics**.

---

## Data model changes (additive / non-breaking)

All new fields are **optional** so the other 141 topics keep validating; nuclear
adopts them first.

### `CruxSchema` — add optional `falsification`
```ts
falsification: z.object({
  supporter_flip: z.string(),      // what would make a proponent abandon the claim
  skeptic_flip: z.string(),        // what would make a skeptic accept the claim
  common_ground: z.string().optional(),
  live_disagreement: z.string().optional(),
}).optional()
```
Keep `methodology`, `equation?`, `verification_status`, `cost_to_verify` — they are
the complementary "test" view.

### `TopicSchema` — add optional flagship fields
```ts
keystone_fact: z.object({          // the Stage-1 wow fact
  statement: z.string(),
  confidence: z.number().min(0).max(100),
  source: z.string(),
  sourceUrl: z.string().url().optional(),
}).optional(),
simple_case: z.array(z.string()).optional(),  // Stage-2: ~3 plain sentences
```

(Atomic-fact confidence in Stage 3 is *derived* from existing evidence weights via
`calculateEvidenceScore` — no schema change needed there.)

---

## Build delta (from the current Read-Mode page)

| # | Change | Type |
|---|--------|------|
| 1 | `CruxSchema.falsification`, `Topic.keystone_fact`, `Topic.simple_case` | schema (zod + types) |
| 2 | Author nuclear content for the three new fields + both pillar falsifications | data |
| 3 | `FlagshipHero` (keystone fact + simple case) atop the page | component |
| 4 | `FalsificationCrux` component | component |
| 5 | Atomic-fact confidence tiers (enhance `EvidenceItem`) | component |
| 6 | Wire into `ReadModeView`, **all gated on data presence** (progressive — no regression for other topics) | integration |
| 7 | Tests: schema tests for new fields, component tests | test |

**Scope principle:** build generically (schema + components), author content for
nuclear only. Optional fields keep every other topic valid. Nuclear is the proof;
the pattern then rolls out — and pairs with the parked breadth play (132 topics
lacking `/is/` AEO pages).

---

## Phased implementation plan (loop iterations)

- **Phase 0 — DONE:** design doc, work log, branch, baseline (tsc + 207 tests green).
- **Phase 1:** Schema additions (optional). Verify all 142 topics still validate.
- **Phase 2:** Author nuclear content (keystone_fact, simple_case, both falsifications).
- **Phase 3:** `FalsificationCrux` component + atomic-fact confidence tiers; wire in (gated).
- **Phase 4:** `FlagshipHero` (the wow hook + simple case) atop nuclear.
- **Phase 5:** Polish — copy, a11y, mobile, dark mode, reduced-motion; "changed your mind?" tie-in.
- **Phase 6:** Tests for new schema + components.
- **Phase 7:** Roll the pattern to 2–3 more strong empirical topics (e.g. death-penalty-deterrence, rent-control-effectiveness) to prove generality.
- **Then:** resume broader improvement (the parked 132 `/is/` pages, etc.).

Every phase: `tsc` + `vitest` + route check, then commit. **Do not push** (founder's call).

---

## Open questions (decided autonomously unless founder overrides)

1. **Hero style** — typographic stat vs. deaths-per-TWh bar chart as hero.
   *Decision: typographic stat first (fast, accessible, on-brand), with a small
   inline bar comparison; full chart can come in polish.*
2. **Featured topic** — memory says `consciousness-ai-systems` is canonical for the
   launch hero. This flagship work does **not** change `featuredTopicId`; it perfects
   the *topic-page experience*. Revisit whether nuclear should also be featured once
   the experience is proven.
