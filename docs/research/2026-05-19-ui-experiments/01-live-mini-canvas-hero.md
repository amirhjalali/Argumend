# Experiment 01: Live Mini-Canvas Hero

**Status:** design  
**Date:** 2026-05-19  
**Owner:** Amir  
**Replaces:** static `FeaturedTopicHero` (gun-control prose card)

---

## Hypothesis

Cold visitors do not understand "argument mapping" from prose. The current hero (`components/FeaturedTopicHero.tsx`) is a flat parchment card with a confidence bar, a crux quote, and two evidence cards. It tells; it never shows. The graph — which IS the product — sits 4–5 clicks away behind a "See the full analysis" button targeting a politically-charged topic.

If we replace the static hero with a **live, auto-animating React Flow mini-canvas** that shows a root node expanding to its children within ~1.5s of page load, then:

1. The visitor sees what the product is in <2s (not "after a click").
2. The featured topic can be philosophically neutral (consciousness-hard-problem), avoiding the gun-control bounce.
3. The CTA becomes "Open the full map" — a continuation of an already-running motion, not a leap of faith.

**Predicted lift:** 3/5 on engagement (see below).

---

## Mechanism

A new component `HeroMiniCanvas` mounts a non-interactive `<ReactFlow>` instance pre-loaded with one root node and pre-computed child positions. Auto-animation in three beats:

### t = 0ms (first paint)
- Single root node centered, rendered server-side as an HTML poster fallback (no FOUC) then hydrated into React Flow.
- Reduced `RichNode` (zoom 0.75, ~255px wide) — re-uses the existing component via React Flow's `defaultViewport={{ zoom: 0.75 }}`. No new node component needed.
- Subtle pulse on the root's left border (`border-l-[3px]` already exists).
- Edges hidden (`opacity: 0`).
- Caption above: *"This is an argument map. Watch it build."*

### t = 1500ms (auto-expand)
- Programmatically call the same `expandNode(rootId)` action from `useLogicGraph` — except scoped to a local Zustand store so it does NOT mutate the real canvas state.
- 2–3 pillar children fade in (`opacity 0 → 1`, 400ms ease-out) at their blueprint positions (left/center/right slot).
- Edges animate in via `strokeDashoffset` (already styled in `logic-edge`).
- Existing `node-enter` keyframe + `birthOrder * 80ms` stagger gives the pop-in feel for free.

### t = 3000ms (settle + CTA emphasis)
- Animation freezes. Pan/zoom disabled (`zoomOnScroll={false} panOnDrag={false} panOnScroll={false}`).
- A "ghost cursor" briefly hovers the root's "Explore" button (subtle, 1.5s loop) — implies "you do this next."
- CTA button below pulses once: **"Open the full map →"** (rust gradient, existing `btn-*` style).

### Mobile (<768px)
- Canvas collapses to a static SVG poster showing the same 3-node layout, no animation. (React Flow on mobile in a 360×400 viewport with a 340px node looks bad.) The SVG can be pre-rendered at build time from the blueprint.

---

## Mockup

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   FEATURED ANALYSIS                                         │
│   ── ── ── ── ── ── ──                                      │
│                                                             │
│   The Hard Problem of Consciousness                         │
│   Why subjective experience may not reduce to physics.      │
│                                                             │
│   ╔══════════════════════════════════════════════════════╗  │
│   ║                                                      ║  │
│   ║         ┌──────────────────────┐                     ║  │
│   ║         │ ▌ TOPIC               │                    ║  │
│   ║         │   The Hard Problem    │  ← root (t=0)      ║  │
│   ║         │   of Consciousness    │                    ║  │
│   ║         └──────────┬───────────┘                     ║  │
│   ║                    │ (edge fades in at t=1500ms)     ║  │
│   ║          ┌─────────┼──────────┐                      ║  │
│   ║          ▼         ▼          ▼                      ║  │
│   ║      ┌───────┐ ┌───────┐ ┌───────┐                   ║  │
│   ║      │PILLAR │ │PILLAR │ │PILLAR │ ← children        ║  │
│   ║      │Gap    │ │Zombies│ │QM/IIT │   (t=1500ms,      ║  │
│   ║      │       │ │       │ │       │    staggered)     ║  │
│   ║      └───────┘ └───────┘ └───────┘                   ║  │
│   ║                                                      ║  │
│   ║                              [parchment dot bg]      ║  │
│   ╚══════════════════════════════════════════════════════╝  │
│                                                             │
│             [ Open the full map → ]   ← rust CTA            │
│                                                             │
│   86% confidence · contested · philosophy                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

The canvas frame uses the same `#f4f1eb` parchment + dot background (`BackgroundVariant.Dots`, `gap=GRAPH.GRID_GAP`) as the real canvas — so it reads as a *window into* the product, not a separate thing.

---

## Files to change

**New:**
- `components/HeroMiniCanvas.tsx` — the live ReactFlow wrapper (~150 LOC). Owns its own `useReducer` for the 3-beat animation; does not touch the global `useLogicGraph` store.
- `components/HeroMiniCanvasSSR.tsx` — server-rendered SVG poster fallback for mobile and pre-hydration paint.

**Modify:**
- `components/HomeClient.tsx` line 216 — swap `<FeaturedTopicHero />` for `<HeroMiniCanvas onOpenMap={() => handleTopicSelect("consciousness-hard-problem")} />`.
- `data/topicIndex.ts` lines 56–60 — change `featuredTopicId` from `gun-control-effectiveness` to `consciousness-hard-problem` (or add a separate `heroTopicId` constant to keep the old featured logic for `/topics`).
- `data/logicBlueprint.ts` — no change; reuse `generateBlueprint(topic)` and read root + first 3 pillar children.

**Delete (after experiment ships):**
- `components/FeaturedTopicHero.tsx` (189 LOC). Keep until experiment is validated.

### Load-bearing snippet

```tsx
// HeroMiniCanvas.tsx — core animation
const [beat, setBeat] = useState<0 | 1 | 2>(0);

useEffect(() => {
  const t1 = setTimeout(() => setBeat(1), 1500);
  const t2 = setTimeout(() => setBeat(2), 3000);
  return () => { clearTimeout(t1); clearTimeout(t2); };
}, []);

const visibleNodes = beat === 0 ? [rootNode] : [rootNode, ...childNodes];
const visibleEdges = beat === 0 ? [] : edges;

return (
  <ReactFlow
    nodes={visibleNodes}
    edges={visibleEdges}
    nodeTypes={{ richNode: RichNode }}
    defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
    nodesDraggable={false}
    nodesConnectable={false}
    elementsSelectable={false}
    zoomOnScroll={false}
    zoomOnPinch={false}
    panOnDrag={false}
    panOnScroll={false}
    zoomOnDoubleClick={false}
    proOptions={{ hideAttribution: true }}
    fitView
    fitViewOptions={{ padding: 0.2, duration: 0 }}
  />
);
```

The `node-enter` CSS keyframe in `globals.css` and the `birthOrder * 80ms` delay in `RichNode` line 48 give us the stagger animation for free — we just need to set `birthOrder` 0,1,2,3 on the synthetic nodes.

---

## Effort estimate

**6–10 hours.** Breakdown:
- HeroMiniCanvas component + local state: 2h
- Wire to logicBlueprint + ensure RichNode renders cleanly at zoom 0.6 without buttons: 1.5h (probably need a `compact` prop on RichNode to hide the Explore/Show Evidence buttons in this context, or a thin `HeroNode` wrapper)
- SSR SVG poster fallback: 2h
- Mobile static variant + breakpoint switch: 1h
- Tweaking timing, easing, and "ghost cursor" affordance: 1.5h
- A/B harness hookup (Vercel Edge Config flag or simple env): 1h

Risk-weighted: assume 12h with one wasted afternoon on React Flow viewport math.

---

## Expected lift

**3/5** on the metric "% of sessions that reach the live canvas with a topic selected, within 2 minutes."

Reasoning:
- **Why not 4–5:** Animation hero patterns are well-trodden; novelty wears off. The conversion bottleneck downstream (post-canvas: cruxes hidden behind clicks) isn't touched by this. We're moving the funnel one step, not collapsing it.
- **Why not 1–2:** The current hero converts cold visitors poorly because they don't know what a "confidence score" or "crux" means in the abstract. Showing the actual node graphics that they'll see on the canvas — same parchment, same teal/rust borders — primes recognition. The auto-expand also implicitly teaches the core interaction ("nodes have children").
- **Why 3:** Honest middle. Will probably move time-on-page +20–40% and click-through to canvas +15–25%, based on hero-section A/Bs in similar B2C analytical tools. Won't fix retention.

**Leading indicator to watch:** scroll-depth past hero (currently ~55% of sessions reach the topic grid below). Predicted target: 65–70%.

---

## Risks

1. **Hydration mismatch.** ReactFlow renders absolute-positioned divs whose sizes depend on measured viewport. Mitigation: render an SSR `<svg>` poster with the exact same layout coordinates as the hydrated canvas, then crossfade at hydration.
2. **Performance.** A second React Flow instance on the homepage doubles the canvas runtime. `@xyflow/react` is ~80KB gz; already shipped. Mitigation: `dynamic(() => import("./HeroMiniCanvas"), { ssr: false, loading: () => <Poster /> })`. Defers JS to after first paint; poster shows immediately.
3. **Mobile bounce.** A 340px-wide node in a 360px viewport looks broken. Mitigation: static SVG poster <768px (no animation, no ReactFlow at all on mobile — saves the bundle entirely there too).
4. **Animation feels gimmicky to repeat visitors.** Mitigation: `localStorage.argumend.heroAnimated = "1"` — second visit skips straight to the settled state.
5. **Featured topic regret.** Consciousness might be too philosophical / not "controversial" enough to retain. Mitigation: ship with a 3-topic carousel (consciousness, AI risk, declining birth rates) — rotates per visit. Stays neutral.
6. **CTA confusion.** "Open the full map" + an already-visible map is contradictory. Mitigation: the mini-canvas frame is visually constrained (rounded card, bordered, ~480px tall). The CTA opens it fullscreen — same metaphor as expanding a video.
7. **Accessibility.** Auto-playing animation. Mitigation: respect `prefers-reduced-motion`; show settled state instantly when set.

---

## Open questions

- Should the mini-canvas be a *real* (interactive) canvas, just constrained in size? Strong argument for yes — but then it competes with the full-map CTA. Current proposal: poster mode wins for funnel clarity.
- Carousel vs single topic? Carousel adds complexity but de-risks topic choice.
- Should "Open the full map" deep-link to a specific child node (e.g., the crux) rather than the root? Probably yes — drops the user one beat ahead of where the mini-canvas left them.
- Do we kill `HeroAnalyze` (the "demoted analyze CTA" section below) in the same experiment, or keep it as a parallel entry point? Recommendation: keep, evaluate independently.
