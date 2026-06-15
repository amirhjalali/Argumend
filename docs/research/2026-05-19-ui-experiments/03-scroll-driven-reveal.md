# Experiment 03 — Scroll-Driven Map Reveal

A Pudding/NYT-style scrollytelling intro for a single featured topic. Prose narrates an argument; the map builds itself underneath, beat by beat, until the user arrives at the full canvas.

## Hypothesis

Argumend's "aha" — *the map is the argument* — currently arrives only after a user has clicked into a topic, oriented in React Flow, panned, zoomed, and read a node. The current `FeaturedTopicHero` shows a confidence bar, a crux card, and two evidence cards stacked vertically: the map is implied, never witnessed being built.

**If** the homepage opens with a single question + one paragraph of prose, and as the user scrolls a graph assembles node-by-node beneath the text in the order a careful person would actually reason ("here's the claim → here's what supports it → here's what cuts against → here's the crux"), **then** the map's purpose becomes legible in ~15 seconds of passive scrolling, before any click is required.

We are betting that the **act of seeing the map self-assemble** is a stronger value-prop demonstration than any static screenshot, hero illustration, or copy.

## Mechanism (timing/beats)

Use **IntersectionObserver** (one per beat section) driving a Zustand-scoped reveal state, with **Framer Motion** for the per-node `opacity/scale/y` springs and edge `pathLength` draw-on. No scrollytelling library — react-scrollama and scrollama add ~15KB and a stale-React baggage we don't need for 7 beats.

Layout: a **two-column sticky scrollytell**. Left column = scrolling prose (~60% width on desktop). Right column = sticky 100vh map canvas (40% width). On mobile we collapse to a single column: map sticks to top 50vh, prose scrolls below.

Sample topic: `consciousness-ai-systems` (already in `data/topics/`, has crux + 2-sided evidence).

| Beat | Scroll % | Prose (left) | Map state (right) |
|------|---------|--------------|-------------------|
| 1 | 0–10% | **"Could an AI be conscious?"** Big serif. One paragraph: "Anthropic now employs AI-welfare researchers. A 2025 Nature paper says no AI can ever be conscious. Both can't be right." | Empty parchment canvas. Faint dot grid. |
| 2 | 10–25% | "The claim under inspection is whether current frontier models could already have subjective experience." | **Center node** fades+scales in: the meta-claim. |
| 3 | 25–40% | "The case **for** rests on functionalism: if consciousness is computation, substrate doesn't matter. Anthropic's own welfare team treats the probability as 'non-negligible.'" | **Proponent pillar** node slides in from left. Edge draws from claim to pillar. **Evidence node** (Anthropic welfare) fans out below. |
| 4 | 40–55% | "The case **against** rests on biology: a Nature 2025 paper argues consciousness requires embodied biological substrate that silicon cannot replicate." | **Skeptic pillar** node slides in from right. Edge draws. **Evidence node** (Nature paper) fans out. |
| 5 | 55–70% | "Both sides agree on one thing: we have no test that could tell us we're wrong." | **Crux node** materializes between the two pillars with a crimson pulse. Connecting edges to both pillars draw simultaneously. |
| 6 | 70–85% | "That's what an Argumend map is — not a debate, but a diagram of where the disagreement actually lives." | Camera **zooms out** (CSS transform on map container) to reveal full layout. Minimap fades in bottom-right. |
| 7 | 85–100% | "Drop into the live map →" + sticky CTA. | Map becomes interactive (pointer-events flip). CTA → calls existing `handleTopicSelect`. |

Springs: `stiffness: 120, damping: 18`. Edges draw with `pathLength: 0→1` over 600ms. Beats 2–5 are each ~80vh tall so the user gets a clear "scroll → one thing happens" cadence.

## Mockup

```
25% scroll                      50% scroll
+----------------+-----------+   +----------------+-----------+
| Could an AI    |           |   | The case for   |  [PRO]    |
| be conscious?  |  [CLAIM]  |   | rests on       |   |       |
|                |           |   | functionalism..|   v       |
| The claim      |           |   |                | [Anthropic|
| under          |           |   | The case       |  welfare] |
| inspection..   |           |   | against rests  |           |
| (sticky map →) |           |   | on biology..   |  [CLAIM]  |
+----------------+-----------+   +----------------+-----------+

75% scroll                      100% scroll
+----------------+-----------+   +----------------+-----------+
| Both sides     | [PRO][SKP]|   | Drop into the  | [PRO][SKP]|
| agree on one   |   \  /    |   | live map →     |   \  /    |
| thing: we have | [CRUX*pls]|   |                | [CRUX]    |
| no test..      |   /  \    |   | [ See full     |   /  \    |
|                |[ev1][ev2] |   |   analysis ]   |[ev1][ev2] |
+----------------+-----------+   +----------------+--minimap--+
```

## Files to change

**New:**
- `components/scrollytell/ScrollMapReveal.tsx` — the two-column scaffold + sticky right panel
- `components/scrollytell/Beat.tsx` — wraps each prose block, registers an IntersectionObserver, sets active beat index in local state
- `components/scrollytell/RevealMap.tsx` — a stripped React Flow instance (no panning, no zoom controls, no minimap until beat 6) that accepts a `revealedNodeIds: Set<string>` prop and filters `nodes`/`edges` accordingly. Reuses `RichNode`, `EvidenceNode` from `components/nodes/`.
- `lib/scrollytell/buildStoryOrder.ts` — pure function: `(topic: Topic) => Beat[]`. Picks claim → best `for` pillar → best `for` evidence → best `against` pillar → best `against` evidence → crux. Reuses `getBestEvidence` logic already in `FeaturedTopicHero.tsx` (lift it to `lib/`).

**Modified:**
- `components/HomeClient.tsx` — replace `<FeaturedTopicHero />` mount with `<ScrollMapReveal topicId={featuredTopicId} onEnterCanvas={handleTopicSelect} />`. Keep `FeaturedTopicHero` as fallback for `prefers-reduced-motion` and mobile-narrow.
- `data/topicIndex.ts` — add optional `storyOrder?: string[]` field per summary, so editors can override the auto-picked beat sequence on prestige topics.

**No schema changes.** Story order is derived from the existing pillar/evidence/crux structure.

## Effort estimate

**3 focused days.** Day 1: scaffold + IntersectionObserver wiring + 7 beat states wired to a static topic. Day 2: Framer Motion transitions, edge draw-on, sticky-column layout, mobile fallback. Day 3: reduced-motion path, accessibility (skip link, beat-jump nav), QA across iOS Safari + Android Chrome, perf budget check.

## Expected lift: **4 / 5**

Reasoning:
- **+** This is the single most legible product demo we can build with existing data. It directly answers "what does this site do?" in <20s of scroll.
- **+** Pudding-style scrollytelling has a long track record on first-visit engagement for explainer products; the form is well-matched to argument mapping.
- **+** Reuses every existing node component — no design-system drift.
- **−** Desktop carries this experiment. Mobile collapse to top-sticky map is real but weaker; ~60% of traffic is mobile per the visual-design swarm notes.
- **−** Scrollytell only fires once per session. Returning users skip the show.

Net: a strong activation lift for first-time desktop visitors, modest for mobile, neutral for repeats. A 4, not a 5, because mobile is the larger share.

## Risks

- **Slow connections.** React Flow + `data/topics.ts` (~500KB) already lazy-load. The scroll experience must render *prose-first* with map as progressive enhancement: if `RevealMap` hasn't mounted by beat 2, beats keep advancing and the map snaps in late without breaking the narrative. Use a skeleton parchment rectangle as placeholder.
- **Mobile feel.** Sticky 50vh map + scrolling prose risks feeling claustrophobic in portrait. Mitigation: on viewports <768px, ship the **existing** `FeaturedTopicHero` instead and only show scrollytell on `md:` and up. Don't fight mobile, just don't serve a worse experience.
- **Accessibility.** Scroll-driven UI is hostile to screen readers and keyboard users. Mitigations: (a) honor `prefers-reduced-motion` → render all beats stacked, fully visible, no animation; (b) add a "Skip to interactive map" link at the top; (c) each beat is a proper `<section>` with `aria-label`; (d) the map at beat 7 is the same canvas the rest of the app uses, so keyboard interaction inherits whatever React Flow provides.
- **Hijacked scroll.** Don't hijack. Use native scroll + observer. Never call `preventDefault` or `scrollTo`. Users must be able to scroll past at full speed and arrive at beat 7 instantly.
- **Bounce on beat 1.** If the first paragraph isn't gripping, users leave before any animation fires. Copy needs editorial polish (not engineering).
- **Featured topic mismatch.** `featuredTopicId` is currently set globally. If it rotates to a topic without a clean for/against/crux structure, the auto story-order picker degrades. Mitigation: `buildStoryOrder` returns `null` for unsuitable topics → fall back to `FeaturedTopicHero`.

## Open questions

1. Do we A/B against the current `FeaturedTopicHero`, or ship to 100% with the hero as `prefers-reduced-motion` fallback only? Default: A/B at 50/50 for two weeks via cookie split, instrument `scroll_beat_reached` events 1–7 and `enter_canvas_clicked`.
2. Should beat 7's "drop into the live map" preserve the assembled layout (camera matches) or `fitView` to the full graph? Camera-match is more satisfying but technically harder — the scrollytell map is a subset. Recommend: `fitView` with a 600ms transition so the extra nodes appear to "fly in."
3. Is the featured topic the right unit, or should this be a **rotating** scrollytell across 3 topics (carousel of stories)? Defer — ship one topic first, measure, then decide.
4. Editorial: who writes the 7 prose blocks per topic? Auto-generating from `meta_claim` + pillar summaries is possible but the experiment lives or dies on prose quality. Recommend: hand-write for the 5 highest-traffic topics, lazy-fallback to auto-generated for the rest.
