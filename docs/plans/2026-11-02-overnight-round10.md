# Overnight round 10, November 2–3, 2026

Founder brief: "use [the tokens] to improve the site productively … don't go using
them all at once but do it methodically … up to 20 percent of the weekly tonight …
make sure to commit and push the code."

## Budget

Weekly usage was 21% at the start (03:20 UTC, resets 2026-11-04 02:00 UTC). Hard stop
at 40% weekly; check `bash ~/.claude/argumend-usage-check.sh 80` before every wave.
No CLI-lane (`claude -p`) runs: they are the burn source in
[the token guardrail](../../.work/HANDOFF.md) history and no item tonight needs them.

## Method

Three waves, each gated on the usage check:

1. **Assess (read-only).** Three reviewers against the live site and the repo:
   - journey: phone + desktop walk of home → library → topic → diagram → paste → Learn;
   - content integrity: the four claims flagged unverified in round 9, the thinnest
     sides, dated "as of" lines that November 2026 has overtaken;
   - technical: axe, console errors, link crawl, sitemap/robots, metadata.
2. **Fix.** One worktree branch per finding cluster, merged into
   `ux/round10-2026-11-02`. Content fixes only with a verified source.
3. **Verify and hand off.** `bun run typecheck`, `bun run test:ci`, `bun run lint`,
   `bun run build`; push the branch and open a PR against main. Not merged: main
   deploys to production on merge, so that stays the founder's call.

Out of scope tonight (founder decisions already on the list): Terms/Privacy wording,
doge/tariffs/us-iran meta_claim narrowing, an abortion map, Cloudflare redirect
settings, the crux-recall evaluation design, the tariffs truce card (review after
2026-11-10).

## Log

**03:35 UTC, wave 1 (assess) done.** Baseline: typecheck clean, 4,216 tests green,
prod health 152 maps, deployed ~Oct 25. Reviewers:
- technical: 0 broken links in ~950 requests, 0 console errors, axe clean except the
  React Flow attribution link; image optimizer serves originals at every width
  (`sharp` only in `overrides`); zod (~67KB gzip) ships on every page via the footer
  newsletter form; sitemap omits ~230 indexable pages; og:image gaps; FAQPage answers
  are questions; long descriptions.
- journey: a plain pro-nuclear paste lands on the SMR map; paste evidence cards
  unrelated to the shown crux; submit below the fold; "hidden assumption" line reads
  as placeholder; legacy maps reuse an agreed fact as a side's best card (moon
  landing); flagship `/map` URLs 404; library page 2+ repeats "Start here".
- content: geoengineering "2024 Nature study … Sahel 10%" has no source (real: Haywood
  2013, no percentage); microplastics "2024 Lancet review" not found; CHAMACOS 5.6 not
  5.5; three blog passages name a winner; tariffs/USMCA/Australia lines overtaken by
  events; four maps thin on one side.

**03:40 UTC, wave 2 (fix).** Five worktree branches: r10/perf, r10/seo, r10/paste,
r10/copy, r10/citations. The sitemap expansion is its own last commit on r10/seo so
it can be dropped (it was on the founder-decision list).
