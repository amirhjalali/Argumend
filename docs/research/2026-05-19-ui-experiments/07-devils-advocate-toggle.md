# Experiment 07 — Devil's-Advocate Toggle

**Date:** 2026-05-19
**Status:** Design spec
**Owner:** Argumend
**One-liner:** A prominent button: *"Show me the strongest case AGAINST what I believe."* One click declares a side, the graph re-orients to the opposing case, collapses confirming nodes, expands disconfirming evidence and cruxes, and highlights the 2–3 mind-changers.

---

## 1. Why this experiment

Argumend's value prop already lives in the product — pillars carry both `skeptic_premise` and `proponent_rebuttal`, evidence has explicit `side: "for" | "against"`, and every pillar has a crux. But a first-time visitor has to *manually wander* into the opposing side. Most don't. They glance, register "looks balanced," leave. The toggle short-circuits that: one click → the case for the side you don't already hold, foregrounded.

This is the most direct possible expression of "disagree better."

---

## 2. What we already have in the data (no new content required)

From `lib/schemas/topic.ts`:

- `topic.confidence_score` (0–100) — implies a directional verdict for the meta-claim.
- `pillar.skeptic_premise` + `pillar.proponent_rebuttal` — every pillar carries both sides.
- `evidence.side: "for" | "against"` + `weight` (4-axis, score 0–40).
- `pillar.crux` with `verification_status` — naturally a "mind-changer" candidate.

So `for` = supports the meta-claim; `against` = opposes it. A visitor's declared side maps cleanly: "I lean toward the claim" → opposing side = `against`-weighted view, and vice versa.

---

## 3. Interaction design

### State A — pre-click (canvas idle, topic loaded)

```
┌──────────────────────────────────────────────────────────────────────┐
│ TopBar    [Logic Map | Scales | Debate]   What would change your... │
├──────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────┐                                     │
│  │ Did the moon landing happen?│  ← root meta node                   │
│  │ Verdict: 96% — Happened     │                                     │
│  └─────────────────────────────┘                                     │
│        │                                                              │
│   [Physical Trace] [Telemetry] [Witnesses] ...                       │
│                                                              ┌──────┐│
│                                                              │ ⇄   ││
│                                                              │Steel-││
│                                                              │man   ││
│                                                              │ the  ││
│                                                              │other ││
│                                                              │ side ││
│                                                              └──────┘│
│                          (floating FAB, bottom-right, above MiniMap) │
└──────────────────────────────────────────────────────────────────────┘
```

Button copy iterations to A/B: *"Steel-man the other side"* / *"Show me the strongest case against what I believe"* / *"Change my mind"*. Crux-crimson `#a23b3b` accent, parchment surface, serif.

### State B — after click, position not yet declared

A bottom-anchored sheet (not a modal — modals feel like blockers):

```
┌──────────────────────────────────────────────────────────────────────┐
│  Before we flip the map — where do you lean right now?               │
│                                                                       │
│   ( ) I think it HAPPENED          ( ) I think it WAS FAKED          │
│   ( ) I genuinely don't know                                          │
│                                                                       │
│   [ Show me the opposing case  →  ]      skip · "just pick one for me"│
└──────────────────────────────────────────────────────────────────────┘
```

Stored in `localStorage` per-topic so re-clicks don't re-prompt. The "I don't know" branch defaults to whichever side has *fewer* high-confidence nodes (forces the underdog case).

### State C — flipped graph

```
┌──────────────────────────────────────────────────────────────────────┐
│  You leaned: HAPPENED.    Now showing: the strongest case it didn't. │
│  [ Flip back ⇄ ]   [ Reset ]                                          │
├──────────────────────────────────────────────────────────────────────┤
│                ┌──────────────────────────┐                          │
│                │  3 claims that would     │   ← pinned card overlay  │
│                │  most update your view:  │                          │
│                │   1. Van Allen radiation │                          │
│                │   2. Photo shadow angles │                          │
│                │   3. Telemetry tape gap  │                          │
│                └──────────────────────────┘                          │
│                                                                       │
│   [Telemetry pillar — DIMMED]   [Witnesses — DIMMED]                 │
│                                                                       │
│   ┌─Physical Trace──────┐                                            │
│   │ SKEPTIC PREMISE     │ ← expanded, foregrounded                   │
│   │ (Van Allen belts)   │                                            │
│   └──────┬──────────────┘                                            │
│          ├─ Evidence AGAINST [score 32] ★ pulse                      │
│          ├─ Evidence AGAINST [score 28]                              │
│          └─ Crux: retroreflector test ★ ring                         │
└──────────────────────────────────────────────────────────────────────┘
```

What changes mechanically:

- **Dim** every node whose variant matches the visitor's side (or whose `evidenceData.side` matches their lean). Opacity 0.25, non-interactive.
- **Auto-expand** every pillar's children on the opposing side (skeptic premise + against-evidence + crux). Reuses `expandNode` + `loadEvidence` already in `useLogicGraph.ts`.
- **Collapse** confirming evidence (filter it from the layout pass — easier than animating removal).
- **Pulse-ring** the top 2–3 opposing nodes by score (see §4).
- **Re-fit viewport** to opposing nodes via the existing `focusTargets` mechanism — no new infra.

Re-click flips. State machine: `idle → declaring → flipped(side) → idle`.

---

## 4. How "strongest opposing case" is picked

Three signals available without new data:

1. **Highest-weighted opposing evidence per pillar.** `evidence.weight` already sums to a 0–40 score. Pick the top opposing evidence in each pillar; rank pillars by that top score; surface the top 3 pillars.
2. **Cruxes with `verification_status: "verified"` or `"theoretical"`** outrank `"impossible"` — a crux is high-leverage *only if* it can actually be checked.
3. **Tiebreaker: directness axis** of the weight (already in schema) — the most directly-addressing-the-claim opposing point wins.

The "2–3 if-true-would-change-my-mind claims" overlay = the top scorer from each of the top 3 pillars. This is deterministic, runs client-side from existing topic data, no LLM call.

---

## 5. Files to modify / create

**New files**
- `components/DevilsAdvocateToggle.tsx` — the FAB + position-declaration sheet + flipped-state banner.
- `components/MindChangersOverlay.tsx` — the pinned 2–3 claims card.
- `lib/devilsAdvocate.ts` — pure functions: `pickOpposingNodes(topic, lean)`, `rankMindChangers(topic, lean)`. Unit-testable.
- `hooks/useDevilsAdvocate.ts` — small Zustand slice or a `useState` + `localStorage` hook; tracks `{ lean, flipped }` per topic.

**Modified**
- `hooks/useLogicGraph.ts` — add `setNodeDimmed(ids: string[])` and `setNodeEmphasized(ids: string[])` actions; add `dimmed?: boolean` and `emphasized?: boolean` to `LogicNodeData`. Add a `flipMode` field for the store's authoritative state.
- `components/nodes/RichNode.tsx`, `EvidenceNode.tsx` — render `opacity-25` when `data.dimmed`, ring/pulse when `data.emphasized`.
- `components/HomeClient.tsx` — mount `<DevilsAdvocateToggle />` inside the ReactFlow viewport (sibling to `MapLegend`).
- `lib/constants.ts` — add `DEVILS_ADVOCATE_DIM_OPACITY`, pulse duration.

No schema changes, no API changes, no new content authoring. Offline-safe by construction.

---

## 6. Effort estimate

~1.5–2 dev-days for a polished v1 on desktop:

- 3h — picker logic in `lib/devilsAdvocate.ts` + tests
- 3h — FAB + declaration sheet UI
- 4h — graph-store dimming/emphasis wiring + node component updates
- 2h — mind-changers overlay + flip-back banner
- 2h — `localStorage` persistence, telemetry events
- 2h — mobile layout (the FAB collides with `MobileArgumentList`; need a list-mode equivalent)
- 2h — polish, animation tuning, copy A/B harness

---

## 7. Expected lift: **4 / 5**

This is the most on-thesis experiment in the set — it literally performs the value prop in one click. Realistic upside:

- **Time-on-canvas:** +60–120% on first session for visitors who click (they now have a reason to read the opposing pillars instead of bouncing).
- **Crux-modal opens:** likely the biggest jump — the overlay points directly at cruxes.
- **Share rate:** the "3 things that would change my mind" overlay is screenshot-bait.

Why not 5: depends on data quality across the 109 topics. On a tight binary (moon-landing, vaccines-autism) it sings. On a multi-sided issue (Israel-Palestine, geoengineering) the picker degenerates; see §8.

---

## 8. Risks & failure modes

1. **Forced-prior alienation.** Some visitors resent being asked to declare. Mitigations: an "I don't know" option that defaults to the underdog side; a "skip — just pick one for me" link; the sheet is dismissible.
2. **Topics without clean two-side polarity.** Multi-axis topics (Israel-Palestine, geoengineering, UBI) have 3–5 framings, not 2. The schema is binary `for/against` which forces a flatten. Mitigation v1: per-topic flag `topic.binary_polarity: boolean` — toggle only renders on topics where it's true. Backfill ~70 of the 109 topics manually (cheap, ~1h). v2 could support N-way flipping.
3. **"Strongest opposing case" looks weak.** If a topic genuinely has lopsided evidence (moon landing: 96% confidence), the opposing case really is weak — and the overlay will *expose* that. This is actually a feature (it shows the visitor *why* the verdict is what it is), but copy needs to lean in: *"This is genuinely the best the opposing side has"* rather than overselling.
4. **Confirms motivated reasoning by labeling.** A visitor who declares "I lean X" then sees opposing-side content marked as "what would change your mind" may dismiss it *more* readily because it's been pre-framed as the enemy camp. Mitigation: copy on the mind-changers card phrases claims as *"If true, X — would you update?"*, second person, not adversarial.
5. **Re-flip churn.** Toggling 5x destroys narrative coherence. Throttle re-flips to one per 8s; on the 3rd flip, show *"You've now seen both sides — here's the synthesis"* and route to the Debate view.
6. **Mobile.** The FAB pattern doesn't survive `MobileArgumentList`. Ship desktop-first; mobile is a sticky bottom-bar variant in v1.1.

---

## 9. Measurement

- `devils_advocate_clicked` (FAB)
- `position_declared { side, topic_id }`
- `flip_completed { duration_ms }`
- `mind_changer_clicked { rank, pillar_id }`
- `flip_back_clicked`
- Funnel: % of topic-page sessions → FAB click → position declared → ≥1 mind-changer click. Target: 25 / 60 / 40%.

---

## 10. v2 ideas (deferred)

- After flip-back, show a *"What updated for you?"* prompt — capture qualitative deltas, feed a "minds changed" counter on the topic header.
- Cross-topic: "You leaned X on moon landing — here are 3 other topics where you'd be in the minority."
- Slot a lightweight `confidence_after` slider next to the mind-changers overlay — closes the loop on the value prop ("did this actually change your mind?").
