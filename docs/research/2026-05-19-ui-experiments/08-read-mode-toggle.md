# Experiment 08 — Read Mode (Linear Essay) ↔ Graph Mode

**Status:** proposed
**Date:** 2026-05-19
**Owner:** founder

## Hypothesis

The current `TopicDetailView` (1924 lines of React) is already a hybrid — confidence header, controversy meter, pillar cards, evidence cards, cruxes, debate preview — but it's structured as a *scrolling dashboard of components*, not as something a literate visitor can *read*. Meanwhile every link to `/?topic=<id>` drops a cold visitor into a React Flow canvas that ProCon/Wikipedia/OWID would never lead with (#17 teardown). Mobile users get the worst of both: a graph that is unusable on touch, and a "detail page" that's still component-soup.

Read mode flips the default: every topic gets a **single, well-typeset long-form essay** (EB Garamond, 70ch column, ProCon-style synoptic table at top) at the canonical URL. The graph remains one click away via a sticky toggle. Expected lift: **5/5** — the highest-leverage change in the experiment set, because it simultaneously fixes mobile, gives crawlers/LLMs prose to cite (#20), and gives the casual visitor a real entry point, without sacrificing the graph for power users.

## Mechanism

Four compounding wins:

1. **Mobile becomes the design target, not the afterthought.** A 70ch prose column with a synoptic table is the most-tested mobile layout pattern on the web (Wikipedia, NYT, OWID).
2. **LLMs cite prose, not nodes.** Per #20, Perplexity/ChatGPT/Claude index server-rendered paragraphs. A graph canvas is invisible to them. Read mode multiplies the surface area LLMs can pull from.
3. **Casual visitors get an on-ramp.** ProCon's traffic is ~5M/mo on prose. People who like graphs are a tiny minority; people who like *reading about contested topics* are a large one.
4. **Power users keep the graph.** The toggle is prominent, persistent, and remembered (localStorage). Anyone who wants the canvas is one tap away.

## Read-mode structure

```
┌──────────────────────────────────────────────────────────────────────┐
│ Existential Risk from AGI                                            │
│ Contested · Technology · 52/100 — Genuinely Uncertain                │
│                                              [ Read │ Graph ]  ◀ toggle
├──────────────────────────────────────────────────────────────────────┤
│ ┌─ SYNOPTIC TABLE (ProCon-style) ────────────────────────────────┐  │
│ │  PROPONENT says…              │  SKEPTIC says…                 │  │
│ │  Orthogonality: intelligence  │  A truly intelligent system    │  │
│ │  and goals are independent.   │  reasons toward ethics.        │  │
│ │  ───                          │  ───                           │  │
│ │  Instrumental convergence:    │  RLHF demonstrably aligns      │  │
│ │  power-seeking is provable.   │  current frontier models.      │  │
│ │  ───                          │  ───                           │  │
│ │  Deceptive alignment risk.    │  No empirical evidence of      │  │
│ │                               │  scheming in deployed systems. │  │
│ └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│ § The Claim                                                          │
│   <meta_claim as one EB-Garamond paragraph, 22px, 1.6 leading>      │
│                                                                      │
│ § Where They Agree, Where They Don't                                 │
│   <controversy meter inline, 1 para of prose>                        │
│                                                                      │
│ § Pillar 1 — The Orthogonality Thesis                                │
│   <skeptic_premise as block-quote>                                  │
│   <proponent_rebuttal as prose>                                     │
│   <evidence list inline: title + 1-line + WeightBar + source link>   │
│   ◆ Crux: Instrumental Convergence — <description>                   │
│                                                                      │
│ § Pillar 2 — Deceptive Alignment …                                   │
│ § Pillar 3 — Recursive Self-Improvement …                            │
│                                                                      │
│ § The Three Cruxes (Falsifiability)                                  │
│   Numbered list, each with methodology + cost + verification badge   │
│                                                                      │
│ § Fallacies to Watch For      § Open Questions      § Sources        │
│                                                                      │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │  Sticky bottom-right (mobile) / right-rail (desktop):           │ │
│ │       [ Open the map → ]                                         │ │
│ │       "See all 47 nodes & their connections."                    │ │
│ └─────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
```

The good news: **all the data already exists.** `Topic.pillars[].skeptic_premise / proponent_rebuttal / evidence / crux` are the prose. We are re-rendering existing fields in essay form, not authoring new content. No content-drift risk if Read mode is generated *from the same source* as Graph mode.

## State, URL, and SEO

**URL contract:** `/topics/<id>` defaults to Read mode. `/topics/<id>?view=graph` opens the canvas (embedded React Flow inside the same page shell, not a redirect to `/?topic=`). `/?topic=<id>` continues to serve power-user/embed traffic at the root canvas.

**Default selection logic** (server-side, in `app/topics/[id]/page.tsx`):

```ts
const view = (await searchParams).view ?? "read";  // default read
// crawlers/LLMs always get read — never honor ?view=graph for bots
const ua = headers().get("user-agent") ?? "";
const isBot = /bot|crawler|spider|GPTBot|ClaudeBot|PerplexityBot/i.test(ua);
const resolvedView = isBot ? "read" : view;
```

**localStorage `argumend.preferredView`** remembers a returning user's last choice and pre-selects on next visit (client-side only, after hydration — never affects SSR or SEO).

**Canonical URL** stays `/topics/<id>` with no query string. `?view=graph` is non-canonical (rel=canonical points home). This is the SEO-critical move: Google and LLMs index one URL per topic, and that one URL serves prose.

## Toggle UI

Top-right of the topic header, sticky on scroll on desktop, collapsed into a single floating pill on mobile:

```
┌──────────────────────────┐
│  [ ▤ Read │ ⬢ Graph ]    │   ← segmented control, ~120px wide
└──────────────────────────┘
```

Clicking Graph: pushes `?view=graph` (no full reload — uses `router.replace`), mounts the existing `HomeClient` canvas inside the topic shell with `topic` already selected via `useLogicGraph.setTopic(id)`.

## Files to modify / create

**Create:**
- `app/topics/[id]/ReadModeView.tsx` (~400 LOC) — pure render of `Topic` as essay; reuses `WeightBar`, `EvidenceCard`, `ControversyMeter`, `ConfidenceTimeline` but rearranges into prose flow.
- `app/topics/[id]/SynopticTable.tsx` (~80 LOC) — two-column ProCon-style table generated from `pillars[].skeptic_premise` + `proponent_rebuttal`.
- `app/topics/[id]/ViewToggle.tsx` (~60 LOC) — segmented control, localStorage glue, URL sync.
- `app/topics/[id]/GraphModeView.tsx` (~80 LOC) — wraps `HomeClient` in a topic-scoped shell with the toggle visible.

**Modify:**
- `app/topics/[id]/page.tsx` — read `searchParams.view`, bot-detect, pass `resolvedView` to client.
- `app/topics/[id]/TopicPageClient.tsx` — branch between `ReadModeView` and `GraphModeView` based on prop.
- `app/sitemap.ts` — keep one URL per topic (no `?view=` variants).
- `next.config.js` headers — confirm `Vary: User-Agent` is set so the bot/non-bot split is cacheable.

**Don't touch:** `useLogicGraph.ts`, `HomeClient.tsx`, `lib/schemas/topic.ts`, the `data/topics/*.ts` files. Read mode is a pure view layer over existing data.

## Effort estimate

**5–7 days of focused work.** Breakdown:
- Day 1–2: `ReadModeView` + `SynopticTable` typography pass (EB Garamond at 22px/1.6, 70ch column, real drop caps, sidenotes for evidence). This is the most underestimated part — prose typography is harder than component layout.
- Day 3: `ViewToggle` + URL sync + localStorage + bot detection.
- Day 4: `GraphModeView` wrapper; confirm `HomeClient` mounts cleanly inside `/topics/<id>` shell (currently it assumes root layout).
- Day 5: Mobile pass — sticky CTA, collapsed toggle, table → stacked cards below 640px.
- Day 6–7: SEO verification (Search Console, Lighthouse, view-source spot-check on 5 topics), localStorage edge cases, A/B instrumentation.

## Expected lift

**5/5.** Plausibly the single highest-impact change in the entire experiment set:

- **Mobile (#16):** unusable graph → readable essay. Bounce rate on mobile likely drops 30–50%.
- **SEO/LLM citability (#20):** server-rendered prose at the canonical URL is what Perplexity/Claude/ChatGPT actually quote. Today they have nothing to quote.
- **Cold-visitor onboarding (#15):** ProCon proves the prose+table pattern works at 5M/mo scale. The graph stays for the 5% who want it.
- **Content depth signal:** Google's E-E-A-T heuristics reward long-form expert prose, not interactive widgets. 109 topics × ~2000 words = a real corpus.

## Risks

1. **Content drift** — mitigated entirely by deriving Read mode from the same `Topic` object. If anything, this *reduces* drift because the graph and the essay are guaranteed to show the same pillars/evidence/cruxes.
2. **Mobile graph-mode default question** — on phones, should `?view=graph` even be honored, or should we force-redirect to Read mode with an "open on desktop for the map" note? Recommend: honor it (don't be paternalistic) but never *default* to it.
3. **Power-user friction** — embed/share links currently point to `/?topic=<id>` (canvas). Keep those working unchanged. Only the `/topics/<id>` canonical surface changes default.
4. **Typography is hard** — a half-baked EB Garamond essay looks worse than the current dashboard. Budget real time for typography (sidenotes, hung punctuation, proper hyphenation, dark-mode legibility).
5. **Engineering surface area** — `TopicDetailView.tsx` is 1924 lines. Resist the urge to refactor it inside this experiment. `ReadModeView` is a parallel view, not a rewrite. The old `TopicDetailView` can be deprecated *after* Read mode is proven, in a separate cleanup pass.

## Success metric

After 4 weeks live:
- Mobile bounce rate on `/topics/*` drops ≥25%.
- ≥3 of the top-10 LLM-cited Argumend URLs are topic pages (currently: 0 — they cite the homepage).
- Toggle click-through to Graph mode: 15–25% of Read-mode visitors (validating that the graph is desired but not required).
- Time-on-page on `/topics/*` increases ≥40% (people are actually reading).
