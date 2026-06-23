# Nuclear Flagship — Founder Handoff

_Autonomous `/loop` run, 2026-06-22. Branch `nuclear-flagship` (off `main`), **NOT pushed**._
_Full play-by-play: `.work/nuclear-flagship-log.md` (Iters 1–80). Design: `docs/plans/2026-06-22-nuclear-flagship-journey-design.md`._

## TL;DR

The branch builds the **flagship user-journey** (immediate wow → simple case → drill-down to atomic
facts with confidence → crux reframed as "what would change your mind") and rolls it out across
**47 topics**. Everything is verified and committed; nothing is pushed — that's your call.

## What's in the branch

1. **Flagship journey mechanic** — additive, all-optional schema (`lib/schemas/topic.ts`):
   `keystone_fact`, `simple_case`, and `CruxSchema.falsification` {supporter_flip, skeptic_flip,
   common_ground?, live_disagreement?}, plus `confidenceTier()`. New components
   `FlagshipIntro.tsx` + `FalsificationCrux.tsx`, wired into `ReadModeView` (the DEFAULT topic view),
   gated on data presence so non-flagship topics are untouched.

2. **47 flagship topics** — the authoritative list is `FLAGSHIP_TOPIC_IDS` in
   `lib/schemas/flagship.test.ts`. Each carries a keystone fact that corrects a real misconception
   (reusing the topic's own already-cited sources), an honest 3-sentence case, and falsification
   cruxes on every pillar. Spans policy / science / technology / economics / philosophy.

3. **`/is/` AEO breadth** — `data/is-claims.ts` grew 10 → 121 "is X true?" landing pages + `/is` hub.

4. **Bonus content** — 7 flagship-explainer blog posts, 3 glossary terms, 7 fallacy entries.

## Verification status (all green)

- `npx tsc --noEmit` clean
- **409 vitest tests** pass (the `flagship.test.ts` integrity guard validates keystone + simple_case +
  falsification on *every* pillar crux — it caught a missed pillar on `nuclear-renaissance-smr`
  mid-run and blocked the commit until fixed)
- Clean `bun run build` (run `rm -rf .next` first — incremental builds hit a benign `@vercel/og` ENOENT)
- New flagship pages verified via curl render-grep; originals browser-verified end-to-end

## Decisions waiting on you

1. **Push the branch?** It's +138 commits off `main`, clean tree, fully verified. My standing
   instruction was do-not-push.
2. **Sensitive / values-laden topics** — I deliberately did NOT auto-convert these (gender-affirming
   care, trans athletes, affirmative action, Israel/Palestine, abortion, fast-moving partisan items).
   They need your editorial judgment, not an autonomous keystone. Skip-list detail in the work log.
3. **Brand-asset defect (pre-existing, unfixed)** — JSON-LD `logo` → `https://argumend.org/icon.png`
   **404s site-wide**, and `/favicon.ico` 404s. Fix: add a square `public/icon.png` (+ `app/icon.tsx`),
   or repoint the 7 referencing files to the working `/opengraph-image`. Flagged, not auto-done.
4. **`featuredTopicId`** unchanged (still AI-consciousness) — change if you want a different launch hero.

## Why the run stopped expanding at 47

The clean-keystone candidate pool is exhausted. Remaining topics are values-laden, on the sensitive
skip-list, redundant with existing flagship topics, or fast-moving geopolitical — none are good
*autonomous* candidates without your judgment. Forcing them would lower quality, so the loop tapered
to a slow await-founder cadence instead.
