# Experiment 09 — Map-as-Banner

**Status:** proposed
**Date:** 2026-05-19
**Owner:** founder

## Hypothesis

Today the topic page (`app/topics/[id]/TopicDetailView.tsx`, 1924 LOC) is pure prose — confidence bar, then sections of pillars, evidence, cruxes. The map lives elsewhere: visitors must click "Dive into the interactive map" (line 1545) and jump to `/?topic=<id>`, which dumps them into a full-screen React Flow canvas with zero scaffolding. Two failure modes converge:

1. Prose readers never see the graph and miss the product.
2. Canvas-jumpers see the graph cold and bounce because there's no orientation.

If we render a **constrained-height map banner at the top of the topic page** — full-bleed, ~240px tall, fitted-to-bounds, pan/zoom disabled, with an "Expand ↗" control that promotes it to a full-viewport overlay — then visitors get *both* the visual gestalt and the prose synopsis on first paint. The map becomes a confident header image (the proof) rather than a separate destination. Expand becomes a video-player-style affordance rather than a navigation event.

Expected lift: **3/5** on engagement (incremental, not transformative — it improves perception but doesn't change funnel topology).

## Mechanism

A new component `TopicMapBanner` renders a non-interactive `<ReactFlow>` mounted inside `TopicDetailView` above the existing synoptic blocks. It hydrates the same Zustand store (`useLogicGraph.setTopic(topic.id)`) the homepage uses, so no new state plumbing.

### Banner state (default)

- Container: `w-full h-[240px] md:h-[280px]` with `overflow-hidden`, `rounded-b-xl`, sitting flush under the breadcrumbs.
- React Flow props that lock it down: `fitView`, `fitViewOptions={{ padding: 0.15 }}`, `nodesDraggable={false}`, `panOnDrag={false}`, `panOnScroll={false}`, `zoomOnScroll={false}`, `zoomOnPinch={false}`, `zoomOnDoubleClick={false}`, `preventScrolling={false}` (so page scroll still works over the banner), `proOptions={{ hideAttribution: true }}`.
- Node scale: wrap the `<ReactFlow>` in `data-banner="true"` and add a CSS rule scoping `.react-flow__node { transform: scale(0.55) }`. The existing 340px `RichNode` becomes ~187px, which fits 5–7 nodes comfortably in a 240px tall band when `fitView` runs. (Confirmed: `RichNode.tsx:47` is `w-[340px]`; scaling via CSS transform is cheaper than rebuilding a variant component.)
- Background: keep the dot grid but lower opacity (`opacity-30`), no MiniMap, no MapLegend, no ZoomIndicator, no TopicIntroPanel — those overlays are noisy at this size.
- A floating top-right pill button: **`⤢ Expand`** (rust gradient, existing `btn-*`).
- A top-left pill: topic title + confidence chip, mirrors what `TopicDetailView` shows below — so the banner reads as an annotated hero image even before fitView completes.
- `pointer-events-none` on the inner ReactFlow viewport so clicks pass through; only the Expand button is interactive.

### Expand transition

Click the Expand button → state flips to `expanded`. Framer Motion `layout` animation on the container:

```tsx
<motion.div
  layout
  transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
  className={expanded ? "fixed inset-0 z-50" : "relative h-[240px]"}
>
```

- Height grows from `240px` → `100vh` (FLIP via `layout`).
- Backdrop fades in (`bg-canvas/95 backdrop-blur-sm`) behind it.
- CSS transform scale on nodes is removed (`data-banner` flips off) — Framer animates the layout, ReactFlow re-`fitView`s on resize via `onInit` ref. Node sizes pop back to 340px over ~300ms; this reads as a satisfying zoom-out.
- All disabled interactions re-enable. Overlays (MiniMap, MapLegend, ZoomIndicator, TopicIntroPanel) fade in (`AnimatePresence`, 150ms delay).
- A top-right `✕ Close` button reverses the transition.
- `Esc` key closes. Body scroll-lock while expanded.

Cross-fade is *not* needed — a single `layout` animation handles the optical illusion of the small map "becoming" the big one. This is the video-player analogue the brief asked for.

### Mobile (<768px)

- Banner shrinks to `h-[180px]`; scale is harsher (`scale(0.4)`) and overlap is likely.
- **Poster fallback**: detect `useIsMobile()` and render a pre-baked PNG/SVG instead of mounting React Flow. Expand routes to a **full-screen modal** that mounts the real React Flow only on demand — reuses the `MobileArgumentList` dynamic pattern (`HomeClient.tsx:48`).
- Poster pipeline is v2; v1 can ship a static React Flow at `h-[180px]` and measure.

## Mockup — banner state (desktop)

```
┌────────────────────────────────────────────────────────────────────┐
│  Home / Topics / Existential Risk from AGI              [⤢ Expand]│
├────────────────────────────────────────────────────────────────────┤
│ ┌──────────────┐                                                   │
│ │ AGI X-Risk   │     ╭─ Pillar 1 ─╮       ╭─ Pillar 2 ─╮          │
│ │ 62% contested│ ─── │ Orthogonality├──── │ Convergence │          │
│ └──────────────┘     ╰──┬──────────╯       ╰──┬──────────╯         │
│                         │                     │                    │
│                    ╭────┴─────╮          ╭────┴─────╮              │
│                    │ Evidence │          │ Evidence │              │
│                    ╰──────────╯          ╰──────────╯              │
└────────────────────────────────────────────────────────────────────┘
  Existential Risk from AGI                          contested · 62%
  ────────────────────────
  Could AI development kill us all?  [TL;DR] [Position A] [Position B]

  [synoptic summary blocks continue below as today]
```

## Mockup — expanded state

```
┌────────────────────────────────────────────────────────────────────┐
│  Existential Risk from AGI                            [✕ Close]    │
│                                                                    │
│             [full React Flow canvas, panable/zoomable,             │
│              MiniMap bottom-right, MapLegend top-left,             │
│              ZoomIndicator visible, all interactions live]         │
│                                                                    │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

## Files to modify / create

- **new** `components/TopicMapBanner.tsx` (~180 LOC) — owns banner/expanded state, mounts ReactFlow, handles Esc + scroll-lock.
- **modify** `app/topics/[id]/TopicDetailView.tsx` — insert `<TopicMapBanner topic={topic} />` after `<Breadcrumbs>` (around the start of the main column), wrap in `<ReactFlowProvider>` (currently only `HomeClient.tsx:353` provides one).
- **modify** `app/globals.css` — add `[data-banner="true"] .react-flow__node { transform: scale(0.55); transform-origin: center; }` plus a `motion-reduce` fallback.
- **modify** `hooks/useLogicGraph.ts` — no schema change; the banner calls existing `setTopic(topic.id)` on mount and clears on unmount.
- **modify** `lib/constants.ts` — add `BANNER` block (height, scale, fitView padding) co-located with `GRAPH`.

The "Dive into the interactive map" CTA at `TopicDetailView.tsx:1541` becomes redundant and can be removed (or repurposed as a deep-link to expanded state via `?map=expanded`).

## Effort estimate

- Component + integration: **0.5–1 day**.
- Mobile poster pipeline: +1 day (defer to v2).
- QA across 109 topics (does fitView pick reasonable bounds for all of them? do edges look readable scaled?): **0.5 day**.

**Total v1: ~1 day.** Ships behind a `NEXT_PUBLIC_ENABLE_MAP_BANNER` flag for A/B comparison against current prose-first layout.

## Expected lift

**3/5.** Incremental. The map banner improves *perception* (visitor sees the product immediately) and *retention* (the banner is sticky in memory) but doesn't change the funnel shape. The strongest signal will be expand-clicks-per-session and time-on-page rather than CTA conversion.

## Risks

1. **Legibility at 0.55 scale.** Node body text at 0.55 ≈ 7.7px. Title (17px) becomes 9.35px — readable but tight. Mitigation: the banner is meant to convey *shape and color*, not text; the synoptic blocks below carry the prose. If text-blur is offensive, swap to a custom `BannerNode` component (title only, fixed 240×64px) and avoid CSS scaling — costs ~half a day more.
2. **Animation jank.** ReactFlow's `fitView` is async; if it fires mid-FLIP, nodes can jump. Mitigation: trigger `fitView({ duration: 0 })` synchronously on `onLayoutAnimationComplete`, accept a tiny snap at the end of expand.
3. **Conflict with `Dive into the interactive map` CTA.** Two paths to the same destination is fine if both work; redundant if the banner makes the CTA obsolete. Remove the CTA on rollout.
4. **Mobile React Flow render cost.** Mounting a hidden full-fledged ReactFlow on every topic page on a 3G phone is a 50–80ms cost. Mitigate with the poster fallback.
5. **Sidebar interaction.** `TopicDetailView` doesn't currently use the sidebar/canvas shell; the banner is local. No conflict.
6. **SEO.** Banner adds no semantic text — keep the existing `<h1>` below it.
