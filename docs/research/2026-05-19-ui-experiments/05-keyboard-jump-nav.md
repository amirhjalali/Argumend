# Experiment 05 — Keyboard Jump Navigation

**Date:** 2026-05-19
**Surface:** React Flow canvas in `components/HomeClient.tsx` (the `CanvasExperience` view, both at `/` after topic select and at `/topics/[id]` once the canvas is wired there).
**Audience bet:** rationalist / LessWrong power users prefer keyboard-driven graphs (cf. Roam, Obsidian, Logseq). Mouse-only navigation in a 30+ node graph is the #1 friction signal in session replays.

---

## 1. The keymap (final)

| Key | Action | Notes |
|---|---|---|
| `1` … `9` | Jump-zoom-center on the Nth pillar (top-level position node) under root | Skip if N > pillar count. Pillars are `topic.pillars[N-1].id`. |
| `0` | Re-center on root / fit whole graph | Mirrors React Flow's `fitView()`. |
| `C` | Cycle through crux nodes (variant=`"crux"`) in DOM order | Press repeatedly to advance; wraps around. |
| `E` | Expand or collapse the focused node | Calls `expandNode(id)`; collapse = remove descendants (new store action). |
| `Shift+↑/↓/←/→` | Tree-walk: parent / first-child / prev-sibling / next-sibling | Follows the `edges` graph; no-op if no neighbor in that direction. |
| `/` | Open command-palette search across pillars, cruxes, evidence titles | Fuzzy match, Enter to jump-zoom. Esc to close. |
| `?` (`Shift+/`) | Toggle help overlay | Also dismisses with `Esc` or click outside. |
| `Esc` | Close overlay / palette / clear focus | Standard. |

**Conflicts avoided.** Cmd/Ctrl is never used as a leader — `Cmd+1..9` is macOS workspace-switch, Chrome tab-switch, and the LastPass shortcut. `Shift+arrow` is safe on canvas (browser default is text selection, which doesn't apply when `body` is focused). `/` is Slack/Twitter/GitHub's universal search convention; we suppress it only when an input is focused (`document.activeElement` check). `?` is the GitHub/Linear/Notion help convention.

**Single-key keys** (`1-9`, `0`, `C`, `E`, `/`) only fire when no input/textarea/contenteditable is focused — same guard pattern used in `react-hotkeys-hook`.

---

## 2. Pillar ordering

The store loads `topic.pillars` in array order; the blueprint renders them left-to-right under root. So `1` = leftmost pillar = `topic.pillars[0]`. Crux cycling order = DOM order of `nodes` filtered by `data.variant === "crux"`, which matches expand order. Both are deterministic and match what the user sees.

---

## 3. Viewport mechanics

React Flow's `useReactFlow()` already gives us:

- `setCenter(x, y, { zoom, duration })` — for precise jumps to a single node's center.
- `fitView({ nodes, padding, duration })` — used today in `HomeClient.tsx:184` for `focusTargets`.

For `1-9`: read the pillar node's `position` + measured width/height, call `setCenter(x + w/2, y + h/2, { zoom: 1.2, duration: 350 })`. Reuse `GRAPH.TRANSITION_DURATION`. If the pillar isn't expanded yet, first call `expandNode(pillar.id)` — the existing `focusTargets` effect handles the zoom on its own; we just need to push the targets.

For `Shift+arrow`: maintain `focusedNodeId` in the new hook (not in the Zustand store — it's a transient UI concern). After every jump, set it. On `?`/help close, restore.

For `E`: requires a new `collapseNode(id)` action in `useLogicGraph` — remove descendants reachable via edges, clear `expandedNodes[id]`. Currently the store only expands.

---

## 4. The hint chip + help overlay

**Persistent hint chip** — bottom-left of the canvas (mirrors `MapLegend` / `ZoomIndicator` slots; minimap is bottom-right). Tailwind: `absolute bottom-4 left-4 z-10 surface-card px-2.5 py-1 font-mono text-xs text-secondary`.

```
[1-9] jump  [C] cruxes  [E] expand  [/] search  [?] help
```

Dismiss with a tiny `×` button → writes `argumend.kbd.hint=dismissed` to `localStorage`. Re-show via `?` overlay's "Show hint" link.

**Help overlay** — triggered by `?`. Centered modal, scrim, `Esc`-to-close, focus trap. ASCII mockup:

```
╔══════════════════════════════════════════════════════╗
║  Keyboard navigation                          [ Esc ]║
╠══════════════════════════════════════════════════════╣
║                                                      ║
║   Jump to pillar                                     ║
║     1 - 9 ........... nth position node              ║
║     0 ............... fit whole graph                ║
║                                                      ║
║   Navigate                                           ║
║     Shift + ↑ ↓ ← →   parent / child / siblings      ║
║     C ............... cycle through cruxes           ║
║     E ............... expand or collapse focused     ║
║                                                      ║
║   Search                                             ║
║     /  ............. open quick search               ║
║                                                      ║
║   ?  ............... show this help                  ║
║                                                      ║
║   [ x ] Show inline hint chip on canvas              ║
╚══════════════════════════════════════════════════════╝
```

Reuses `surface-card`, `font-serif` heading, `font-mono` for keys (matches the `ZoomIndicator` / `MapLegend` look).

**Command palette** (`/`): Mac-style centered input, top-third of viewport. Search index = `[...pillars, ...cruxes, ...evidence]` flatmap from `getLoadedTopics()`. ~12 visible results, ↑/↓ to move, Enter to jump.

---

## 5. Files

**New:**
- `hooks/useKeyboardNav.ts` — single `useEffect` adds a `keydown` listener to `window`; reads from `useLogicGraph` + `useReactFlow`; owns local `focusedNodeId` state.
- `components/KeyboardHintChip.tsx` — the persistent corner chip.
- `components/KeyboardHelpOverlay.tsx` — the `?` modal.
- `components/CommandPalette.tsx` — the `/` palette.

**Modified:**
- `components/HomeClient.tsx` — mount `useKeyboardNav()` inside `CanvasExperience`; render the three components inside `<ReactFlow>` siblings.
- `hooks/useLogicGraph.ts` — add `collapseNode(id)` action.
- `lib/constants.ts` — add `KEYBOARD.JUMP_ZOOM` (=1.2) and palette result cap.

No new dependencies. ~250 LOC total.

---

## 6. Effort

**1.5–2 days.** The hook and chip = half a day. Help overlay = 2 hrs. Command palette = a day (fuzzy search index + UI + tests). Tests for the keymap dispatch logic via vitest, mocking `useReactFlow`. The `collapseNode` action needs careful subtree-walk; reuse the edges graph.

---

## 7. Expected lift

**3 / 5.**

- **Reach:** low. Power-user feature; ≤15% of sessions will touch any key beyond Esc. Mobile (~40% of traffic) gets zero benefit.
- **Depth:** high where it lands. A rationalist who learns `1-9 / C / /` will navigate 3-5× faster and stay 2-3× longer per session. This is the kind of feature that converts a curious visitor into a returner — exactly the retention gap flagged in the 2026-04-09 direction memo.
- **Signal value:** high. We can instrument `keynav_used` and see if power users correlate with return visits — a leading indicator we don't currently have.

The lift isn't broad activation; it's a hook that gives the LessWrong-shaped subset a reason to bookmark the site.

---

## 8. Risks

- **Screen readers.** Single-key shortcuts collide with NVDA/JAWS quick-nav (which uses unmodified letters in browse mode). Mitigation: detect `aria-live` / `prefers-reduced-motion` and require a modifier (`Alt+1..9`) when those signals are present. Add an "off" toggle in the help overlay → `localStorage` flag.
- **React Flow's own selection.** RF supports arrow keys for moving selected nodes when `nodesFocusable`. We already have `elementsSelectable={false}` (HomeClient.tsx:308), so this is a non-issue today, but if we ever flip that we need `e.preventDefault()` in our handler.
- **Focus stealing.** If user is typing in `HeroAnalyze`'s textarea or the future palette input, single-key shortcuts must no-op. Guard via `closest('input, textarea, [contenteditable]')` on `e.target`.
- **Mobile irrelevance.** Real but acceptable — gate the entire chip + listener behind `!isMobile` (we already have `useIsMobile`). Zero mobile cost.
- **Discoverability.** The hint chip is the entire onboarding surface. If users dismiss it, they forget. Mitigation: re-surface `?` hint when a user opens a topic 3+ times without using a shortcut (analytics-gated tooltip on the 4th visit).
- **i18n / non-QWERTY.** `C` / `E` break on Dvorak/AZERTY. Mitigation: use `e.code` (`KeyC`, `KeyE`) not `e.key`. For digits, `e.code` is `Digit1..9` which works on all layouts.
