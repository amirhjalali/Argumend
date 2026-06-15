# Mobile UX Audit — Argumend

**Date:** 2026-05-19
**Scope:** Homepage hero + canvas, topic detail pages, key interactive components
**Method:** Static read of `HomeClient.tsx`, `nodes/*`, `useLogicGraph.ts`, `useMediaQuery.ts`, `MobileArgumentList.tsx`, `MapLegend.tsx`, `TopBar.tsx`, `CruxModal.tsx`, `ScalesOfEvidence.tsx`, `DebateView.tsx`, `app/topics/[id]/*`, `globals.css`, `app/layout.tsx`. Live DOM measurements via Chrome on argumend.org (host browser zoom blocked viewport-resize emulation, so node/panel sizes were measured at rendered desktop scale and translated to mobile via the responsive Tailwind classes).

---

## TL;DR

- **The good:** A real mobile path already exists. Below 768px, `HomeClient` swaps React Flow out entirely for `MobileArgumentList` (`components/MobileArgumentList.tsx`) — a stacked accordion of pillars / evidence / cruxes. Touch targets are mostly 44px, the viewport meta is correct (`width=device-width, initial-scale=1`), MapLegend auto-collapses on mobile, MiniMap is `hidden md:block`. This is significantly better than what most React Flow apps ship.
- **The bad:** The mobile fallback is functionally a different product. The thing rationalist-Twitter sees in screenshots — the graph canvas — is exactly the thing mobile users can't see. The homepage hero (FeaturedTopicHero) is fine on mobile, but the second a user taps a topic on mobile they get a static accordion, not the canvas. That is a credibility mismatch between marketing and product.
- **The ugly tablet zone:** 768–1024px (iPad portrait, Galaxy Tab, foldables) renders the **full React Flow canvas with 420px MetaNodes, 340px RichNodes, and a 256×400px MapLegend** floating over a ~768-wide viewport. That's where touch UX is actually broken — and it's also where the highest engaged audience (people reading on iPad) lives.

---

## Current mobile behavior

**Breakpoint:** `useIsMobile()` = `!matchMedia('(min-width: 768px)')` — Tailwind's `md:` boundary.

**< 768px (phones):**
- Homepage hero (FeaturedTopicHero + 6-topic grid + Analyze CTA + Footer) is responsive. Topic grid is `grid-cols-2 sm:grid-cols-3 lg:grid-cols-6`, fine on a 390px viewport.
- Selecting a topic enters `CanvasExperience` → `MobileArgumentList` (because `currentView === "logic-map"` and `isMobile`). User gets pillar accordions with proponent/skeptic/evidence/crux. No React Flow.
- ScalesOfEvidence and DebateView views are responsive (verified: 20+ `md:` breakpoints, stacked layouts, `min-h-[44px]` on key controls).
- Sidebar is a slide-in drawer over a backdrop (`fixed inset-0 bg-black/30 z-30 md:hidden`). Backdrop click closes it; ARIA-labeled correctly.
- TopBar collapses: most labels become icon-only (`hidden sm:inline`), Contribute and "How it works" are `hidden md:flex`, theme toggle is `hidden sm:block`.
- Topic detail pages (`/topics/[id]/TopicDetailView.tsx`) are server-rendered prose with section wrappers; widths cap at 832px max with `px-4 md:px-8`. No graph.

**≥ 768px (tablet + desktop):**
- Full React Flow canvas. Measured node dimensions: MetaNode 420×604px, RichNode 340×~400px, EvidenceNode 280×~340px. After one expansion the graph spans 854×1424px.
- MapLegend renders at `w-48 md:w-56 lg:w-64` (192/224/256px) — auto-collapses after 4s on mobile but the breakpoint check is hardcoded to 768px, so on iPad portrait (1024) it stays open.
- React Flow flags in use (`components/HomeClient.tsx:298-315`): `panOnDrag`, `panOnScroll`, `zoomOnScroll`, `nodesDraggable`, `zoomOnDoubleClick={false}`. No `touch-action` override, no `panOnDragMode` tuning, no pinch-to-zoom flag.

---

## Top issues (ranked by severity)

### 1. Tablet (768–1024px) gets the full canvas with no touch tuning — HIGH
- A 420px MetaNode on a 768px iPad portrait viewport leaves ~170px of canvas per side. Default React Flow pan/zoom on touch is workable but jittery: `panOnDrag` defaults to mouse button 0, which on touch will fight with native page scroll because there's no `touch-action: none` on `.react-flow__pane`.
- The 256-wide MapLegend (open by default at this breakpoint) covers ~33% of the canvas viewport at 768px.
- Files: `components/HomeClient.tsx:298-315`, `components/MapLegend.tsx:60-66`.

### 2. Mobile sees a static accordion, not the product in screenshots — HIGH (strategic)
- Twitter/LessWrong share a topic with an OG image of the graph; user taps through on iPhone and gets a vertical list. Functionally fine, but the "wow" — the visual proof in the README — is invisible on phone. This is a positioning problem disguised as a UX one.
- File: `components/HomeClient.tsx:294-296` (the `isMobile ? <MobileArgumentList /> : <ReactFlow />` swap).

### 3. CruxModal can render off-screen elements on small tablets — MEDIUM
- Modal is `max-w-2xl mx-4` with `p-4` container. On a 380px-wide phone (if ever reached — though mobile path uses inline crux, not this modal), the two-column `md:grid-cols-2` collapses to single column correctly, but the header `flex items-start justify-between` does not wrap; long crux titles next to the close button create a cramped header.
- File: `components/CruxModal.tsx:55-74`.

### 4. Touch targets under spec in topic detail page — MEDIUM
- Live DOM inspection of `/topics/moon-landing` flagged these interactive elements at < 32px height: FAQ link (15×24), Breadcrumb Home/Topics (20×41/43), Vote button cluster (30×55), Related-topic inline "Read analysis" (16×93) and "Compare" (16×71) links, and the `?` help icon (16×16).
- Apple HIG and WCAG 2.5.5 want 44×44 (24×24 minimum). These are below.
- Files: `app/topics/[id]/TopicDetailView.tsx` (action chips around lines 1200–1400 area — the related-topics block and vote cluster), `components/Breadcrumbs.tsx`, `components/VerdictVoting.tsx`.

### 5. RichNode width = 340px is a problem for tablet landscape stacked layouts — MEDIUM
- When two siblings stack horizontally with a 200–300px gap, total width quickly exceeds even landscape iPad (1024px) at 1× zoom. Pan-to-find is the default UX; new users won't know they can pan.
- File: `components/nodes/RichNode.tsx:46` (`w-[340px]`), `components/nodes/MetaNode.tsx:22` (`w-[420px]`), `components/nodes/EvidenceNode.tsx:31` (`w-[280px]`).

### 6. Body `overflow-x: hidden` masks but doesn't fix overflow — LOW
- `app/globals.css:86` sets `body { overflow-x: hidden }`. This is good defensive cover, but it hides bugs (rogue 100vw children leaking right). A wide SVG was found at 766px on `/topics/moon-landing` — likely the ConfidenceTimeline. Worth confirming it doesn't horizontal-scroll inside its container.

### 7. No `touch-action` declarations anywhere — LOW
- Grep finds zero `touch-action` usage. React Flow handles this internally but for the rest of the app (sidebar drawer, modal scroll, accordion expand) explicit `touch-action: manipulation` on tap targets removes the 300ms tap delay on older Safari. Minor.

### 8. MapLegend collapse threshold is a one-shot — LOW
- `useEffect` checks `window.innerWidth < 768` once on mount (`components/MapLegend.tsx:62`). Rotating an iPad doesn't re-evaluate. Should be a media query listener or just always start collapsed under `lg`.

---

## Concrete fixes

| # | File | Change |
|---|---|---|
| 1 | `components/HomeClient.tsx:294` | Change breakpoint from 768 → 1024: `const isTablet = useMediaQuery("(max-width: 1023px)")`. Route tablets to MobileArgumentList too, OR add a third path: tablet gets React Flow with `fitView`, `nodesDraggable={false}`, and `panOnDrag={[1,2]}` so single-finger pan works without conflicting with nothing. |
| 2 | `app/globals.css` (near `.react-flow__pane`) | Add `.react-flow__pane { touch-action: none; }` and `.react-flow__node { touch-action: none; }`. Stops Safari from interpreting drags as scroll-then-bail. |
| 3 | `components/MapLegend.tsx:60-66` | Replace the one-shot innerWidth check with `useMediaQuery("(min-width: 1024px)")` and start collapsed below `lg`. |
| 4 | `components/MobileArgumentList.tsx` | Add a small embedded mini-graph preview at the top — a static SVG snapshot showing 3–5 nodes — so phone users see "this is what argument mapping looks like" before scrolling the accordion. Then keep the accordion as the actual interactive surface. This bridges the strategic gap in Issue #2. |
| 5 | `components/CruxModal.tsx:55` | Make header wrap on small screens: change `flex items-start justify-between` to `flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between`, and move close button to absolute top-right with `aria-label`. |
| 6 | `app/topics/[id]/TopicDetailView.tsx` | Audit action chips. Add `min-h-[44px] py-2` to: vote buttons, related-topic links, the `?` help affordance, and "Read analysis" / "Compare" links. Run a sweep with `grep -n "py-1\|py-1.5\|h-4 w-4 text-stone"` and bring all interactive elements to 44×44 or wrap in 44×44 hit areas. |
| 7 | `components/nodes/RichNode.tsx:46`, `MetaNode.tsx:22` | Make width responsive: `w-[280px] md:w-[340px]` for RichNode, `w-[340px] md:w-[420px]` for MetaNode. Tighter typography on small canvas (drop title `text-[17px]` → `text-[15px]` below `md:`). |
| 8 | `components/HomeClient.tsx:298` | Pass `panOnPinch` / `zoomOnPinch={true}` explicitly (defaults are OK but make them visible), and add `selectionOnDrag={false}`. Consider `panActivationKeyCode={null}` to ensure single-finger pan works without modifier. |
| 9 | `components/HomeClient.tsx` (in mobile branch) | When `isMobile`, also short-circuit `loadInitialTopic()` to skip lazy-loading the `~500KB` topics.ts blob if the user is just on the hero. Topics.ts is only needed inside `MobileArgumentList`. (Check: `useLogicGraph` already lazy-loads. Verify on phone with throttled 3G.) |

---

## "Mobile-first redesign?" — is incremental enough?

**Short answer: incremental is enough for now, but only if you commit to one strategic choice.**

The current architecture is already conditional: phones get a different component (MobileArgumentList) from the same data, behind the same shell. That's the right pattern — better than trying to force React Flow onto touch. The incremental fixes above are mostly small (1–2 days of work) and would move tablet UX from "frustrating" to "fine."

Where a redesign question genuinely arises: **what is the "shareable artifact" on mobile?** Right now if Argumend goes viral on rat-Twitter the screenshot is the graph, but the mobile experience is an accordion. Two ways to close this gap:

1. **Make the accordion the canonical product, and demote the graph to a "desktop power feature."** Re-shoot the OG images and README around the mobile accordion view. Pros: matches reality, easier to maintain. Cons: the graph IS the differentiator vs. competitors; throwing it away on the dominant traffic source is brand suicide.

2. **Make a "mobile graph" that's actually optimized for touch** — vertical-flowing, swipe-between-nodes, one-node-at-a-time fullscreen with a position indicator. Apps like Roam Research and Heptabase have shown this can work. This is 2–3 weeks of work, not 2 days.

Recommend option 2 if the 14-day observation freeze (from `docs/superpowers/specs/`) surfaces signal that mobile share-clicks bounce. Recommend option 1 + the incremental fixes if mobile traffic is mostly inbound-then-bounce regardless of what's shown.

---

## Open questions

1. **What % of argumend.org traffic is mobile right now?** GA4 is wired (`G-MD0CVQQZW6` in `app/layout.tsx:25`). Pull mobile/tablet/desktop split for the last 30 days before scoping fixes — if mobile is < 15% all the strategic stuff in #2 is premature.
2. **Do users who land on a mobile topic page from Twitter actually engage with the accordion?** Need scroll depth + accordion-open events. `trackEvent` already exists (`lib/analytics.ts`) but I didn't verify whether `PillarSection` expansion fires it.
3. **Is the tablet zone (768–1023px) statistically real, or is it almost all phones + desktop?** GA4 will answer this and it changes whether Fix #1 is high or low priority.
4. **iOS Safari `100vh` issue:** The mobile path uses `min-h-screen` in several places. Did not see `--vh` or `dvh` units. On iOS Safari with URL bar visible, `100vh` is taller than the viewport. Worth checking on a real iPhone whether the sidebar drawer or modal cuts off below the URL bar.
5. **React Flow v12 has `panOnPinch` and dedicated touch handling** — has the team upgraded since `@xyflow/react`'s touch fixes in late 2025? Worth a `bun outdated @xyflow/react` check.
6. **The `MobileArgumentList` is dynamically imported** (`HomeClient.tsx:48-51`). What's the actual mobile bundle? Lighthouse run on a Moto G4 profile would tell us if there's a perceptible flash-of-empty before the list mounts.
