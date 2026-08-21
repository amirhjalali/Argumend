# Improvement Plan for Argumend v2 — CLOSED

This plan is **complete and superseded**. The goals of record now live in
`docs/plans/` — see `2026-08-12-argumentgraph-north-star.md` and
`2026-08-18-argumend-v2-disagreement-diagnosis-spec.md` (spec of record).

Note: the "Stoic / Greek / Roman" reskin landed as the LessWrong-parchment
design system documented in `CLAUDE.md` (parchment, stone, deep teal, rust,
crux crimson; EB Garamond + Plus Jakarta Sans) rather than the literal
marble/gold/olive palette first proposed here.

## Phase 1: Aesthetic Overhaul — DELIVERED

- [x] **1. Global Theme & Color Palette** — Space palette removed;
      parchment/stone tokens in `tailwind.config.ts` plus CSS custom
      properties in `app/globals.css` (`:root` / `.dark`).
- [x] **2. Typography** — EB Garamond serif for headings and prose,
      Plus Jakarta Sans for UI, loaded in `app/layout.tsx`.
- [x] **3. Node Styling (Meta, RichNode)** — solid parchment cards with
      classical borders; glassmorphism and neon borders removed from graph
      nodes.
- [x] **4. UI Components** — Crux Drawer / Deep Dive Modal were absorbed
      into a single parchment `CruxModal`; controls are minimalist;
      confidence kept as a warm-spectrum ring gauge (internals since frozen
      by `docs/superpowers/plans/2026-07-28-two-axis-confidence.md`).

## Phase 2: Functionality & Logic — DELIVERED

- [x] **5. "Infinite Filler" Removed** — children come only from the
      blueprint (`resolveChildTemplates` in `hooks/useLogicGraph.ts`);
      childless nodes render as leaves with no expand control.
- [x] **6. Multiple Pillars** — root supports several center-slot pillars
      spread side-by-side (`lib/layout.ts`); solved via sibling spreading
      and a dedicated root-inquiry lane instead of generalizing the slot
      enum.
- [x] **7. Title & Content Refinement** — no generated title prefixes;
      variant labels render as small eyebrow badges.
- [x] **8. Minimap / Navigation** — theme-aware minimap, navigation paths,
      zoom indicator, map legend.
- [x] **9. Animations** — organic fades/slides only; reduced-motion
      respected at build time and in CSS.

## Phase 3: Final Polish — DONE

- [x] **10. Cleanup** — space assets/code removed; TypeScript strict;
      lint/typecheck/tests green.

Future work is tracked in `docs/plans/`, not here.
