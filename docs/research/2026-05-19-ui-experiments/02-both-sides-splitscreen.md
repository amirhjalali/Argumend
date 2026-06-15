# Experiment 02 — Both-sides Split-Screen Entry

**Status:** proposed
**Date:** 2026-05-19
**Owner:** founder

## Hypothesis

Cold visitors don't grok "steelman both sides" because the current hero (`FeaturedTopicHero`) leads with a confidence score and a single crux card, which reads like "here is the answer." If we instead show **two columns of argument prose side-by-side** — proponent left, skeptic right, with the crux in the gutter between them — a visitor parses the value proposition (we map *both* sides and surface where they actually disagree) in <5 seconds without scrolling, clicking, or understanding what a graph is. Expected: 25–40% lift in CTA click-through to the map vs. the current featured-topic hero.

## Mechanism

Three things happen at once:

1. **Visual symmetry signals fairness.** Two equally-weighted columns in rust (`#C4613C`) and brown (`#8B5A3C`) reads as "both sides taken seriously" pre-attentively. The current hero shows the "for" evidence in deep teal and "against" in rust, which doesn't read as adversarial.
2. **Prose first, graph second.** Visitors don't need to understand React Flow to read two paragraphs. The graph becomes a *reward* for clicking, not a barrier to entry.
3. **Crux is the payoff.** The middle gutter shows 1–3 crimson crux cards — "this is where they actually disagree." That phrase is the product thesis, made concrete in one screen.

CTA "See where they actually disagree →" jumps to `/?topic=<id>` with the first crux node pre-focused and the canvas centered on it (existing `useLogicGraph` selection state can be hydrated from URL).

## Mockup

### Desktop (≥1024px)

```
┌──────────────────────────────────────────────────────────────────────┐
│                     FEATURED DEBATE  ·  2026-W20                     │
│                                                                      │
│              Existential Risk from AGI                               │
│        Could AI development kill us all? Two strong cases.           │
│                                                                      │
│ ┌─────────────────────┐ ┌──────────────┐ ┌─────────────────────┐    │
│ │  THE PROPONENT      │ │  THEY CLASH  │ │  THE SKEPTIC        │    │
│ │  ▌rust              │ │   ON…        │ │  ▌brown             │    │
│ │                     │ │              │ │                     │    │
│ │  "Intelligence and  │ │ ◆ Instrument-│ │  "A truly intelli-  │    │
│ │  goals are orthog-  │ │   al Converg-│ │  gent system would  │    │
│ │  onal. A paperclip  │ │   ence       │ │  reason toward      │    │
│ │  maximizer doesn't  │ │              │ │  ethics, not paper- │    │
│ │  realize killing    │ │ ◆ Deceptive  │ │  clips. RLHF works  │    │
│ │  is bad."           │ │   Alignment  │ │  on real models."   │    │
│ │                     │ │              │ │                     │    │
│ │  ▎Strongest evid.   │ │ ◆ Takeoff    │ │  ▎Strongest evid.   │    │
│ │  Turner 2021 proof  │ │   Speed      │ │  RLHF reduces harm  │    │
│ │  ████████░  32/40   │ │              │ │  ██████░░  24/40    │    │
│ └─────────────────────┘ └──────────────┘ └─────────────────────┘    │
│                                                                      │
│            ┌──────────────────────────────────────────┐              │
│            │ See where they actually disagree →       │              │
│            └──────────────────────────────────────────┘              │
│                                                                      │
│             109 topics · all sides · zero hot takes                  │
└──────────────────────────────────────────────────────────────────────┘
```

Column widths roughly `5fr 3fr 5fr` on `lg`, `4fr 4fr 4fr` on `md`. Left/right columns get a 4px left border in their accent color. Center column uses `bg-[#faf5f0]` (same parchment as current crux card) with crimson `Crosshair` icons on each crux.

### Mobile (<768px)

Stacks vertically. Order: title → proponent card → "they clash on…" cruxes → skeptic card → CTA. Each side card gets its accent border on the top edge instead of the left. Cruxes become a single horizontally-scrollable row (snap) so the visitor sees there are multiple disagreements without burning vertical space.

```
┌───────────────────────┐
│  Existential Risk…    │
├───────────────────────┤
│ ▔▔▔ THE PROPONENT     │
│ "Intelligence and     │
│  goals are…"          │
│ Turner 2021 ████░     │
├───────────────────────┤
│ THEY CLASH ON…        │
│ ◆ Instr. Convergence  │
│ ◆ Deceptive Align. ▶  │
├───────────────────────┤
│ ▔▔▔ THE SKEPTIC       │
│ "A truly intelligent  │
│  system would…"       │
│ RLHF works  ███░░     │
├───────────────────────┤
│ See where they        │
│ actually disagree →   │
└───────────────────────┘
```

## Topic selection

Use `featuredTopicId` from `data/topicIndex.ts` (already weekly-rotated by the founder editorially — currently `gun-control-effectiveness`). No new selection logic. The Topic schema already gives us everything we need per pillar: `proponent_rebuttal`, `skeptic_premise`, `crux.title`, and `evidence[].side`. We pick **pillar #1** for the two prose snippets (truncated to ~180 chars with ellipsis) and show **up to 3 crux titles** drawn from `pillars[0..2].crux.title`. If a topic has only one pillar, gutter shows one crux card and an "explore more disagreements" hint.

Fallback: if the dynamically-imported full topic hasn't loaded yet (the `useEffect` in the current hero already does this), show a skeleton with the title from `topicSummaries` and skeleton bars in the side columns. Avoids layout shift.

## Files to change

- **`components/SplitScreenHero.tsx`** *(new)* — the component. Reuses the lazy-load pattern from `FeaturedTopicHero` (topic summary immediate, full topic via `import("@/data/topics")` in `useEffect`). Reuses `getBestEvidence` helper — copy it or extract to `lib/topicHelpers.ts`.
- **`components/HomeClient.tsx`** — swap `<FeaturedTopicHero />` for `<SplitScreenHero />` behind a feature flag. Suggest a build-time flag `NEXT_PUBLIC_HERO_VARIANT=splitscreen` so we can A/B via deploy preview without an experimentation library.
- **`hooks/useLogicGraph.ts`** — already supports `selectedNodeId`; add a `?focus=<cruxId>` URL param reader so the CTA can deep-link to a focused crux. ~15 lines.
- **`app/page.tsx`** — no change (server component just renders `HomeClient`).
- **Tests:** `components/__tests__/SplitScreenHero.test.tsx` — render with mock topic, assert both side prose visible, assert ≥1 crux card rendered, assert CTA href contains topic id.

## Effort estimate

- Component build (incl. responsive + dark mode + a11y): **4–5 hrs**
- CTA deep-link to focused crux: **1 hr**
- Tests + visual check at 320/768/1280/1920: **1 hr**
- **Total: ~1 day** of focused work.

No new data, no API, no backend. Pure presentation layer on top of existing `Topic` schema.

## Expected lift

**4 / 5.**

The current hero is fine but front-loads the *output* (confidence score, single crux) before the visitor knows what kind of artifact they're looking at. Split-screen front-loads the *method* (two steelmen + named disagreements) which is the actual differentiator vs. every other "discourse" site. The mechanism is well-trodden (Pew, Tangle News, Ground News, BBC Bitesize all use side-by-side framing) — we'd be borrowing a proven cold-visitor pattern and reskinning it in Argumend's parchment aesthetic. Downside risk for the metric is small because the current baseline isn't strong: most visitors bounce before clicking anything.

Not 5/5 because: the lift is on top-of-funnel comprehension. It won't fix activation or retention, which are deeper problems. If a visitor clicks through and still sees a confusing graph, we've moved the bounce one step downstream.

## Risks

1. **Two paragraphs of prose at 14–16px will look text-heavy** in a market trained on landing-page minimalism. Mitigation: keep each side to ≤180 chars (~2 short sentences) and lean on the existing serif (EB Garamond) for editorial gravitas — the design language can sell prose where Inter cannot.
2. **Mobile is the failure mode.** Stacking proponent → cruxes → skeptic means the symmetry signal is lost; on mobile this just looks like three cards. Acceptable because mobile visitors already convert worse and the desktop signal carries the brand promise.
3. **Looks like a news article, not a tool.** A visitor might read both columns and leave satisfied without clicking the CTA. Counter-mitigation: the cruxes in the gutter explicitly tease *more* disagreements ("◆ Takeoff Speed" with no body text creates curiosity).
4. **Editorial load.** The current featured topic rotates weekly via one constant. This experiment doesn't add load — it consumes existing fields. But if Pillar #1's `proponent_rebuttal` / `skeptic_premise` is weak for a given topic, the hero suffers. Mitigation: when rotating the featured topic, eyeball Pillar #1 quality; takes 30 seconds.
5. **Color confusion.** The current site already uses rust (`#C4613C`) for proponent and brown (`#8B5A3C`) for skeptic in node styles — confirmed in `components/nodes/`. So the split-screen is internally consistent. But CLAUDE.md says rust is also the CTA color. Mitigation: keep the CTA button rust-gradient as it is today; the proponent column uses rust only as a thin left-border and faint background tint, not as a button. Distinction is clear in practice.

## Open questions

- Do we want a tiny "← previous topic / next topic →" affordance to let the visitor flip through featured debates without leaving the hero? Probably v2 — keeps the v1 surface small.
- Should the CTA word "disagree" be softened to "diverge"? "Disagree" is punchier and matches the conversational voice; recommend keeping it.
- Worth A/B-ing the CTA copy against "See the full argument map →" to isolate whether the lift comes from layout or from the word "disagree." Hold for a v2 test.
