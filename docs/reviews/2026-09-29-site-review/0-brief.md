# Argumend site-wide UX evaluation — shared brief (2026-09-29)

The founder's words: "some pages suck, not sure how they look in mobile, but overall the website is
very far from the vision and is not consistent or easy to understand." Your job is to find out
exactly where and why, with evidence, and say concretely what to change. Be blunt. Praise nothing
that does not need protecting from a later change.

## What Argumend is for (the vision — judge every page against this)

Read `docs/plans/2026-09-22-north-star.md` (80 lines) before anything else. In short:
- Purpose: end the *counterfeit* argument, mend discourse, let people seek wisdom rather than
  conflict. Goal: close the gap between how much people *think* they disagree and how much they
  actually do.
- The spine of the site is the **crux** and what would resolve it ("What would change your mind?"),
  not a verdict. **Never a winner.** Always the other side's best card. Voluntary before imposed.
- Product surfaces that matter most: (1) topic maps (156 topics; two "flagship" AI maps with a crux
  ledger: `/topics/ai-mass-unemployment`, `/topics/capitalism-after-ai`; `/ai` pools AI cruxes);
  (2) paste-your-own-argument tools (`/analyze`, `/analyze-v2`, `/reply` — note there are three).
- Anything that reads as a scoreboard, a debate-winner machine, a content farm, or a feature
  graveyard works against the vision.

## Design system (CLAUDE.md + tailwind.config.ts + app/globals.css)

Stoic parchment aesthetic (LessWrong-like). EB Garamond serif for headings/prose, Plus Jakarta Sans
for UI. Canvas #f4f1eb, ink #3d3a36. Deep teal #3a6965 accent. Rust (#b05434 = rust-600 for filled
CTAs, one rust fill per page) for CTAs/proponent. Brown #8B5A3C skeptic. Crux crimson #a23b3b only
for cruxes. **Never amber/orange/tangerine.** No green/red truth signals. Component classes in
globals.css: `.surface-card`, `.surface-paper`, `.btn-*`, `.card-hover`, `.link-underline`.
Shell: `components/AppShell.tsx` (sidebar + `TopBar.tsx`), `Footer.tsx`; nav config `lib/nav.ts`.

## What already happened (don't re-report fixed things; do report if still broken)

A design push on 2026-09-22/23 (see `docs/plans/2026-09-22-ledger-v1-run.md` §1, §6, §9 and
`docs/reviews/2026-09-22-design-audit.md`) fixed dark-mode tokens, rebuilt home and /topics,
neutralised verdict/scoreboard framing, put flagship pages in AppShell. It covered landing pages
only. Most of the ~45 routes were never reviewed. Open items noted then: TopBar `sticky` never sticks
(`html, body { overflow-x: hidden }`), legacy sidebar pops in after hydration, "settled" wording in
blog/glossary.

## Evidence you have

Screenshots of this branch (dev server, light mode) in
`/private/tmp/claude-501/-Users-amirjalali-argumend/2043480f-f401-456b-87a7-9f7cc9a30f41/scratchpad/eval/`:
- `<route>--1440.png` desktop first screen; `<route>--1440-full.png` desktop up to ~6 screens.
- `<route>--390.png` phone first screen; `<route>--390-sheetN.png` = the phone page as sheets of
  three consecutive 390×844 screens side by side (sheet1 = screens 1–3, sheet2 = 4–6).
- Route → file name: "/" is `home`, slashes become `__` (e.g. `topics__ai-mass-unemployment`).
- `metrics.json`: per route and width — status, title, h1s, page height, horizontal overflow and
  the offending elements, count of tap targets under 32px (with samples), fonts used, number of
  `<main>`, nav link labels, console errors.
- The dev server is running at http://localhost:3000 (flags: ENABLE_DISAGREEMENT_V2 on, fake
  provider; /reply page on). You may drive it yourself for interactions the static shots can't
  show (open a map, submit a paste, open a menu). Reusable Playwright setup: see
  `../capture.mjs` (playwright-core from `~/.npm/_npx/9833c18b2d85bc59/node_modules`, headless
  shell at `~/Library/Caches/ms-playwright/chromium_headless_shell-1223/...`). Put any new
  screenshots under `scratchpad/eval/extra/`. Do NOT start another dev server, do not run builds.
- The source code: read it to explain *why* something is wrong and where the fix goes.
- The small "N" badge bottom-left is the Next.js dev indicator — not a finding.

**Do not edit any file in the repo.** This is evaluation only. Write your report to the path given
in your task. Budget: be efficient with images — look at first screens and sheets you need, not
every image twice.

## Report format (strict — the orchestrator merges five of these)

```
# <Area> — evaluation

## Verdict (≤6 lines)
The blunt state of this area vs the vision, and the one change that would matter most.

## Page scorecard
| Route | Purpose in one line (as a visitor reads it) | Clarity 1-5 | Consistency 1-5 | Phone 1-5 | Vision fit 1-5 | Keep / Merge into X / Demote / Remove |

## Findings (ranked, most severe first)
### F1. <title>
- Severity: critical | high | medium | low     Scope: page | template | system     Effort: S | M | L
- Where: routes + evidence files (screenshot names, metrics) + code (file:line)
- Problem: what a visitor experiences, concretely (1–3 sentences)
- Fix: the concrete change — components/files, what to delete, what to reuse. Prefer reusing an
  existing pattern from the best page over inventing a new one.

## Patterns worth copying
Which page/component does this area best, so fixes elsewhere can reuse it (file paths).
```

Severity guide: critical = broken or unreadable, or actively contradicts the vision on a page people
land on; high = confusing/inconsistent on an important page, or broken on phones; medium = clear
polish/consistency debt; low = nits (list nits briefly, grouped, at the end).
