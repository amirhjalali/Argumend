# Experiment 06 — Confidence-band Visualization

**Hypothesis.** Rationalists trust UIs that make uncertainty visible. Argumend already *computes* node scores and evidence weights but renders them as small badges or a single gauge on the meta node. Surfacing confidence on every node + every edge — the same way `ggplot` surfaces error bars — signals "this product was built by people who think like you" within ~2 seconds of canvas load. Lift is credibility, not first-impression delight.

---

## 1. What exists today

Read against:

- `/Users/amirhjalali/argumend/types/graph.ts` — `LogicNodeData.score?: number` (0–100, optional). `EvidenceData.score: number` (0–40). No `confidence` field. No `evidenceStrength` field on edges.
- `/Users/amirhjalali/argumend/components/nodes/RichNode.tsx` — pillar/crux/skeptic/proponent. **Never renders `data.score`.** Score is silently dropped.
- `/Users/amirhjalali/argumend/components/nodes/MetaNode.tsx` — renders `<ConfidenceGauge score={data.score} />` (the only place confidence is shown).
- `/Users/amirhjalali/argumend/components/nodes/EvidenceNode.tsx` — renders score as `data.score/40 · Strong/Moderate/Weak/Minimal` text badge.
- `/Users/amirhjalali/argumend/hooks/useLogicGraph.ts:123-152` — `buildEdge()` hardcodes `strokeOpacity: 0.5`, color from variant. No width modulation. Same at `:419-433` for evidence edges.
- `/Users/amirhjalali/argumend/components/ConfidenceGauge.tsx` — already implements the rust/teal/brown scale we want.

So the **data model already exists** (`score` is on every blueprint node and every evidence node). We are not adding a field — we are *rendering a field that is currently dropped*. This drops effort substantially.

---

## 2. Visual design

### 2a. Node confidence bar

Render a 6px horizontal bar on the bottom edge of every `RichNode` (and every `EvidenceNode`, replacing the `/40 · Strong` text badge with the same primitive). Bar is full-width of the node's bottom border, sitting on top of the existing `rounded-b-xl` corner.

Width-fill = `score / max` (max = 100 for claims, 40 for evidence). Color from confidence:

- `>= 0.66` → rust `#C4613C` (full opacity)
- `0.33–0.66` → brown `#8B5A3C` (full opacity)
- `< 0.33` → brown `#8B5A3C` at 40% opacity (dim, not invisible — rationalist principle: low confidence is still information)

Above the bar, a tiny right-aligned `0.72` numeric label in `font-sans text-[10px] text-stone-500` — readable but never the protagonist. Tooltip on hover: "Confidence: 72% · based on N supporting and M opposing evidence nodes."

**Before:**
```
┌────────────────────────────┐
│  PILLAR · Title            │
│  Body text...              │
│  [ Explore ] [ View Crux ] │
└────────────────────────────┘
```

**After:**
```
┌────────────────────────────┐
│  PILLAR · Title            │
│  Body text...              │
│  [ Explore ] [ View Crux ] │
│                       0.72 │
│ ████████████████░░░░░░░░░░ │  ← rust fill, 72%
└────────────────────────────┘
```

Implementation: a `<ConfidenceBar score={number} max={number} />` component in `components/ConfidenceBar.tsx`. Pure CSS — `<div>` with `width: ${pct}%` and `background: var(--bar-color)`. No SVG, no Framer Motion (the bar should *not* animate on entrance — it's data, not flair).

### 2b. Edge stroke modulation

Edges into evidence nodes get `strokeWidth` proportional to evidence score:

| score/40 | strokeWidth | strokeOpacity |
|----------|-------------|---------------|
| ≥ 32 (Strong) | 3.5 | 0.85 |
| 24–31 (Moderate) | 2.5 | 0.65 |
| 16–23 (Weak) | 1.5 | 0.45 |
| < 16 (Minimal) | 1 | 0.3 (dashed: `strokeDasharray: "4 4"`) |

Edges between claims (pillar→pillar, meta→pillar) inherit the *target* node's confidence: high-confidence target = thicker line into it. Defaults to 2px if `score` is undefined.

This makes the canvas read as "thick arteries of strong evidence, thin capillaries of speculation" at a glance. It is the single most rationalist-coded visual cue we can add.

### 2c. Crux pulsing dot

On every crux node (`variant === "crux"`), a 8px filled circle at the top-right corner in `#a23b3b` (crux crimson) with `animation: crux-pulse 2.4s ease-in-out infinite` (`scale(1) → scale(1.18) → scale(1)`, opacity `0.85 → 1 → 0.85`). Add the keyframes to `globals.css`. One sentence in the legend: "Pulsing = where calibration disagreement is concentrated."

Note on motion budget: this is the *only* always-on animation we add. Edge `animated: true` is already set on every edge today; we keep that. No additional motion.

### 2d. Legend toggle

Add a "Show confidence" switch to the existing legend/sidebar (one line, default ON). When OFF, the bar disappears, edge widths revert to flat 2px, crux dot stops pulsing. Store as `confidenceVisible: boolean` in `useLogicGraph` Zustand store, read by each node component. This is the escape hatch for users who find it cluttered.

---

## 3. Files to modify / create

**Create:**
- `components/ConfidenceBar.tsx` — ~40 lines, the bar primitive.
- `components/CruxPulse.tsx` — ~15 lines, the pulsing dot.

**Modify:**
- `components/nodes/RichNode.tsx` — render `<ConfidenceBar>` at bottom when `typeof data.score === "number"`. Render `<CruxPulse>` when `variant === "crux"`.
- `components/nodes/EvidenceNode.tsx` — replace the `data.score/40 · Strong` badge with `<ConfidenceBar score={data.score} max={40} />`.
- `components/nodes/MetaNode.tsx` — keep the big ConfidenceGauge (it's the protagonist node), add a thin bar at the bottom for consistency.
- `hooks/useLogicGraph.ts` — `buildEdge()` and the evidence-edge builder (~`:419`): pass through target node's `score`, derive `strokeWidth` + `strokeDasharray`. ~15 lines.
- `app/globals.css` — add `@keyframes crux-pulse`.
- `components/Sidebar.tsx` (or wherever the legend lives) — add the toggle. Zustand: `confidenceVisible`, `setConfidenceVisible`.

**Do not touch:** `data/topics/*` — every blueprint already ships a `score`. We are reading data that was already paid for.

---

## 4. Effort

**Low — ~3 hours.** Data exists. Components are small. One Zustand flag. No migration. The only fiddly bit is making sure every old topic blueprint has a sane `score` default — quick audit will show which need backfill (fallback to 0.5 + `aria-label="confidence unknown"` if missing).

## 5. Expected lift: **3/5**

This is not a first-impression hook. A skeptical visitor still won't sign up because of bars. But:

- It changes the *texture* of every screenshot and demo GIF for the next year.
- It makes Argumend quotable in r/slatestarcodex / LW shortform ("…and they even render confidence intervals on the edges").
- It removes the most common rationalist complaint about argument maps: "where's the uncertainty?"

Lift is on **shareability** (people screenshot calibrated UIs more than uncalibrated ones) and **retention** of the target persona (rationalists who *do* engage will stay because the UI matches their epistemics).

## 6. Risks

1. **Clutter.** 109 topics × N nodes × bar + label = a lot of ink. Mitigation: toggle defaults ON but the bar is 6px and never animates. Bottom-of-node placement avoids competing with title/body.
2. **Colorblind.** Rust vs brown is the existing site palette — already fails some deuteranopia tests. Width-fill carries the signal independent of color (long bar = high, short bar = low). The text label `0.72` is the canonical fallback. Add `aria-valuenow` and `role="progressbar"`.
3. **"Looks gimmicky."** Risk if numbers feel made-up. Mitigation: tooltip explains the source ("derived from N evidence nodes weighted by source quality"). If scores feel arbitrary today, that's a *content* problem, not a visualization problem — and surfacing them forces us to fix it. That is itself a useful forcing function.
4. **Crux pulse fatigue.** One pulse per crux per topic is usually 1–3 dots, not 30. If a topic has >5 cruxes, throttle to pulse only the highest-disagreement one. Configurable.
5. **Default-on vs default-off.** Defaulting ON ships the credibility signal to everyone (including non-rationalists who don't ask for it). Defaulting OFF hides the most differentiated feature behind a toggle no one finds. **Recommend default ON.** If the visit-to-bounce rate worsens for non-rationalist traffic, flip to OFF with one Zustand line change.

---

## 7. Success metric

Hard to A/B with current traffic. Soft signals over 2 weeks post-ship:

- ≥1 unsolicited mention in rationalist-adjacent space (LW shortform, r/ssc, Twitter) referencing the confidence rendering.
- Screenshots shared by visitors include the bars (check what frame people crop).
- No regression on time-on-canvas (proxy: scroll/zoom events per session).

If none of those, the experiment didn't fail — credibility signals compound slowly — but we'd hold here before doubling down.
