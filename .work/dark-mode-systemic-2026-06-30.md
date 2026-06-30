# Systemic dark-mode finding (surfaced 2026-06-30, during the contrast-pass cycle)

While finishing the WCAG-AA contrast pass (the `text-stone-400` → `text-muted` +
`dark:text-stone-400` work), the agents uncovered a **design-system root cause**
that is bigger than a contrast tweak and needs founder/design decisions before a
fix. Documenting so it isn't lost.

## Root cause: the text color *utilities* are fixed hex, not dark-adaptive

In `tailwind.config.ts` the brand text colors are defined as fixed hex:
- `primary: "#3d3a36"`, `secondary: "#564d45"`, `muted: "#6d6058"`

So the Tailwind utilities `text-primary` / `text-secondary` / `text-muted` do **not**
change in dark mode. Only the CSS-variable form (`text-[var(--text-primary)]`, etc.,
which `:root`/`.dark` redefine in `globals.css`) adapts. Same story for the surface
tokens `bg-canvas` (#f4f1eb) / `bg-panel` (#fdfaf6) / `bg-paper` — fixed-light unless
written as `bg-[var(--bg-canvas)]`.

Consequence: any **bare** `text-primary`/`text-secondary`/`text-muted` on a
dark-adaptive surface is too dark on the `#1a1917` canvas (fails AA in dark mode);
and any page built on the fixed-light `bg-canvas`/`bg-panel` tokens renders LIGHT in
both modes.

## What this cycle DID fix
- `text-muted`: all dark-adaptive bare instances now paired with `dark:text-stone-400`
  (45 pre-existing + 30 from the same cycle's light-mode migration). Always-light
  surfaces and decorative icons intentionally left. See commits `55400da`, `d4576f8`.

## What remains (NOT done — needs decisions/scope)
1. **`text-primary` / `text-secondary` have the identical defect.** Rough scan:
   ~443 bare `text-primary` and ~193 bare `text-secondary` utility uses. Not all are
   on dark surfaces — needs triage. Mechanical fix mirrors this cycle (pair with a
   `dark:` override, or switch to the `text-[var(--text-primary)]` form), but the
   volume is large.
2. **Several pages appear to have NO dark mode at all** — they wrap content in the
   fixed-light `bg-canvas`/`bg-panel` tokens with no `dark:bg`, so they're light
   pages floating on the dark body shell: `/is` hub + `/is/[slug]` + `IsHubClient`,
   `/questions` hub + `[slug]` + `QuestionsSearch`, `blog/[slug]`, `perspectives`.
   **Founder/design call:** should these support dark mode (then: add adaptive bg +
   the text-token fix), or be intentionally always-light (then: leave, and they're
   already correct)? A few carry orphaned `dark:text-*` on borders that do nothing
   while the bg stays light.
3. **`placeholder:text-muted`** won't adapt where the input surface is dark-adaptive
   (none currently in scope); correct fix is `dark:placeholder:text-stone-400`.

## Recommended approach when picked up
- First decide #2 (which pages are dark-mode pages). That bounds the work.
- Then a single mechanical pass per token (`primary`, `secondary`) with the same
  always-light/decorative exemptions used this cycle.
- Consider migrating the utilities themselves to the CSS-var form in the config so
  `text-primary` adapts by default and the whole class of bug disappears — but verify
  no component relies on the fixed-light value first.
