# Experiment 10 — Embeddable Preview Cards + Per-Node Share

**Date:** 2026-05-19
**Status:** Design proposal
**Premise:** Today you can share a topic. You cannot share *a claim*. Every node on the map is a complete, citable assertion — but there is no URL for it, no preview card for it, no embed for it. Make every node a first-class shareable artifact. Each share becomes a backlink, each backlink an inbound funnel. This is the compounding move from swarm finding #18 (dissemination).

---

## 1. Current state

- `components/EmbedButton.tsx` — embeds a whole topic (`/embed/[topicId]`), iframe only, no per-node.
- `components/ShareButtons.tsx` — topic-level tweet/copy, no node target.
- `app/api/og/route.tsx` — generic OG image driven by querystring (`title`, `verdict`, `score`). 271 lines, Edge runtime, parchment style already nailed.
- `app/opengraph-image.tsx` — site-wide static OG.
- `app/api/verdict-card/[topicId]/` — exists; per-topic verdict card. Confirms the Satori pipeline is already wired.
- `components/nodes/RichNode.tsx` — node has stable `id`, `data.title`, `data.content`, `data.variant`, optional `references`. No share affordance.
- `hooks/useLogicGraph.ts` — `focusTargets: string[]` + `consumeFocusTargets()` already drive `reactFlow.fitView(...)` in `HomeClient.tsx:177-190`. The deep-link primitive already exists; we just need to seed it from URL.
- `HomeClient.tsx:157-175` — already reads `?topic=X&view=Y` on mount. `?focus=` slot is free.

Everything we need is half-built. The leap is *exposing* it.

## 2. Interaction design

### 2a. Hover affordance on `RichNode`

```
+----------------------------------------------------------+
| PILLAR                                          [ ↗ ]    |  <- share glyph fades in on hover
|                                                          |
| Lunar regolith composition matches Apollo samples        |
|                                                          |
| Returned samples show isotopic ratios inconsistent with  |
| Earth origin...                                          |
|                                                          |
| Sources (3)        [ Explore ⌄ ]                         |
+----------------------------------------------------------+
```

Top-right corner: 24x24 button, `lucide-react` `Share2` icon, opacity-0 → opacity-60 on `:hover` and `:focus-within`. Keyboard reachable via existing `tabIndex={0}` on the node wrapper.

### 2b. `ShareNodeModal`

```
+-------------------------------- Share this claim ----- x +
|                                                          |
|  +----------------------------------------------------+  |
|  | [ PARCHMENT 1200x630 preview, scaled to fit ]      |  |
|  |                                                    |  |
|  |   ARGUMEND ----                                    |  |
|  |   PILLAR  ·  Moon landing                          |  |
|  |                                                    |  |
|  |   "Lunar regolith composition matches              |  |
|  |    Apollo samples"                                 |  |
|  |                                                    |  |
|  |   85% confidence  ·  3 sources                     |  |
|  +----------------------------------------------------+  |
|                                                          |
|  Link                                                    |
|  [ argumend.org/topics/moon-landing?focus=pillar-1  ] 📋 |
|                                                          |
|  Embed                                                   |
|  [ <iframe src="...?focus=pillar-1" ...></iframe>   ] 📋 |
|  ( ) just this node     (•) full map, focused here       |
|                                                          |
|  Post it                                                 |
|  [ Copy as tweet ]  [ Copy as Bluesky ]  [ Download PNG ]|
|                                                          |
+----------------------------------------------------------+
```

Three blocks, three copies. Each copy fires `trackEvent('share_node', { topicId, nodeId, surface })`.

### 2c. Tweet/Bluesky template

```
{node.title}

Argumend rates this {confidence}% confident. {refs} sources.

The crux: {parent_pillar.crux.title}

argumend.org/topics/{topicId}?focus={nodeId}
```

Bluesky version is the same minus URL shortener assumptions; Bluesky shows full URLs cleanly.

## 3. Deep-link routing

The plumbing already exists. Three lines of glue:

1. In `HomeClient.tsx:157-175` extend the param reader to also pull `focus`. After `setTopic(topicParam)`, seed `setFocusTargets([focusParam])`. The existing effect at L177 will then `fitView` to it on the next render.
2. Edge case: the focused node may live behind an `expandNode` chain (it's a child of root, not root itself). Add a `focusOnLoad(nodeId)` action in `useLogicGraph` that walks the blueprint upward, calling `expandNode` on each ancestor before setting `focusTargets`. The blueprint already has parent links via `BlueprintNode.children`; a reverse index built at module-load time is O(n) once per topic.
3. Do not `window.history.replaceState` away `?focus=` — keep it in the URL so the user can re-copy. Strip only `?topic=` and `?view=` as today.

Fragility: node IDs come from the blueprint (`pillar-1`, `evidence-foo-1`, `crux-2`). They are stable per topic dataset, but a topic edit that renumbers will break old links. Mitigation: add a `slug` field to blueprint nodes derived from `slugify(title).slice(0, 40)`, fallback to ID. Accept either in the resolver. Two-week task, not blocking v1.

## 4. OG image generation

Reuse `app/api/og/route.tsx` — it already does parchment + Satori on the Edge runtime. New route:

`app/api/og-card/[topicId]/[nodeId]/route.tsx`

- Static-params over `topics × nodes` is too large (~109 topics × ~15 nodes = ~1.6k variants). Don't pre-render; cache at the edge with `s-maxage=86400, stale-while-revalidate=604320`. Vercel OG handles this natively.
- Pull node from blueprint server-side (no `topics.ts` lazy-load concern — Edge route imports it once).
- Render: parchment bg, variant label (PILLAR / CRUX / EVIDENCE) in rust, topic name as eyebrow, node title in EB Garamond 56px, confidence chip if present, "ARGUMEND" footer with the rust underline already in `opengraph-image.tsx`.
- Cost: Vercel OG ~50ms cold, ~5ms warm. Negligible.

Then `app/topics/[id]/page.tsx` `generateMetadata` already returns `openGraph.images` — extend to read `searchParams.focus` and swap in the per-node card URL. Twitter cards inherit.

## 5. Files to create / modify

| File | Action |
|---|---|
| `components/ShareNodeModal.tsx` | new — modal, three copy blocks, PNG download via `<img src={ogUrl} download>` |
| `components/nodes/RichNode.tsx` | add hover share button, opens modal with `id`, `data` |
| `components/nodes/EvidenceNode.tsx`, `MetaNode.tsx` | same hover button |
| `hooks/useLogicGraph.ts` | add `focusOnLoad(nodeId)` action that walks ancestors |
| `components/HomeClient.tsx` | extend URL-param effect to read `?focus=` |
| `app/api/og-card/[topicId]/[nodeId]/route.tsx` | new — Satori per-node card |
| `app/topics/[id]/page.tsx` | extend `generateMetadata` to honor `?focus=` for OG |
| `lib/analytics.ts` | add `share_node` event |
| `data/logicBlueprint.ts` | optional — add `slug` to blueprint nodes for stable links |

Maybe ~600 LOC net. No schema change, no DB migration.

## 6. Effort

**3–4 dev days.** Modal + hover button: 1 day. OG route + metadata wiring: 1 day. Deep-link ancestor-walk + edge cases: 1 day. Polish + analytics + the slug fallback: 0.5–1 day. The infra exists; this is assembly.

## 7. Expected lift

**3 / 5.**

Not a first-impression lever. Onboarding metrics won't move. The mechanism is slower: a researcher quotes a node in a Substack post → 50 readers click → 3 explore further → 1 shares another node. Compounds.

Realistic 90-day target: 50–200 inbound clicks/week from node-share URLs by week 12, assuming we ship and then *seed it ourselves* — 20 founder-curated tweets quoting specific high-confidence nodes from the most controversial topics. Without seeding, lift is ~1/5. With seeding, 3/5. With a real power user (one Tyler Cowen / Scott Alexander link), 5/5 for a week, then back to 3.

Compounds with the freeze-protocol observation: per-node CTR is measurable, gives Argumend its first real *engagement* metric beyond pageviews.

## 8. Risks

- **Modal overhead on every node.** 109 topics × ~15 nodes = lots of mount points. Mitigation: lazy-load `ShareNodeModal` via `next/dynamic`, mount once at app shell, drive via Zustand `shareTarget` state.
- **OG image cost.** Edge OG is cheap, but un-cached generation for every Twitter unfurl in a viral moment could spike. Mitigation: aggressive `Cache-Control`, edge-region pinning, monitor in Vercel.
- **Node-ID drift.** Re-running blueprint generation can renumber. Mitigation: title-slug fallback (section 3.3); never destructive — old IDs continue resolving via slug match.
- **Focus-on-load races topic-load.** The lazy-loaded `topics.ts` resolves *after* mount. Mitigation: stash `pendingFocus` in store; `loadInitialTopic` checks it.
- **Embed snippet at scale.** Topic-level embed already exists (`/embed/[topicId]`); per-node embed needs an `/embed/[topicId]/node/[nodeId]` route that renders just that node + 1-hop neighbors. Cut from v1 — ship the deep-link URL + OG card first, add iframe in v1.1 if anyone asks.
- **Discoverability of the hover affordance.** Mouse-only hover hides it from mobile entirely. Mitigation: on mobile, the existing long-press / tap-to-select state on nodes opens a small action sheet that includes Share.
