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

**04:00 UTC, wave 2 integrated** (all five branches merged into
`ux/round10-2026-11-02`, pushed as a checkpoint). typecheck, lint, 4,319 tests and
`bun run build` green; the local standalone build serves `/_next/image` as a 10KB
webp (was the 649KB JPEG) and 308s flagship `/map` URLs to the topic page.
- perf: the real cause of unresized images was Next's tracer missing libvips under
  sharp 0.35's new entry point (`next.config.js` now traces it); sharp a direct
  dependency; zod off every page; React Flow attribution contrast. Also bumped
  sharp 0.35.5 and drizzle-orm 0.45.2 for open advisories. Linux/Coolify not
  verifiable here: after deploy, `curl -sI` the image URL and expect image/webp.
- seo: og images on /ai, /privacy, /terms and diagram pages; four-position `/map`
  URLs redirect; 404 has no canonical; FAQPage answers are verbatim context, never
  questions; descriptions ≤160 with a guard test; category/page titles. Sitemap
  expansion (~300 URLs) is its own merge commit: revert it to keep the pruned sitemap.
- paste: nuclear paste names nuclear-energy-safety (eval 148→149/168, wrong 0→0);
  cards ranked against the crux; button above the fold; "Closely related" list;
  library search, tab fade, page 2+ without "Start here".
- copy: "Hidden assumption" tag; agreed facts never chosen as a side's best card
  (87 cards on 54 maps; 22 of 415 cruxes now show no pair); one crux intro; Jev post
  dates; /learn dedupe; moon-landing dosimeter card moved to the side it supports.
- citations: geoengineering and microplastics claims re-sourced; CHAMACOS 5.6;
  Appen node; three blog verdicts made neutral; TAME, Section 122, USMCA, Australia
  ban, Ukraine "late 2026", V-Dem 2026 updated; six new cards on four thin maps.
- Claude: capitalism-after-ai "nobody states out loud" overclaim; gap tests' 1s
  waits flaked under load (now 5s).

**04:05 UTC, wave 3.** Follow-ups (library tag ordering, paste agreed-fact cards,
yes/no summaries) and sources (miscited RUSI card in ukraine-peace-terms, Starship,
robotaxi cities, GLP-1 prices), plus a visual QA pass on the local build.

**04:40 UTC, wave 3 integrated.** typecheck, lint, 4,333 tests, `bun run build` and
`bun run smoke:standalone` green. Visual QA on the local standalone build (390/1440,
light/dark): axe 0 violations on the map, paste and library pages; no console
errors; blog hero 778KB JPEG → 42–57KB webp. QA polish fixed by Claude (weighing
hint, evidence key alignment, related-list spacing, label colon).
- followups: the library search now uses the header ranking ("climate", "ai" right
  first; dev 53→55/55); the paste tool and yes/no summaries never use an agreed fact
  as a side's case (137 paste cards, 12 of 298 summaries changed); splitter no
  longer cuts at "v." / "et al.".
- sources: the RUSI ~80% refurbishment card now cites the 2024 report the figures
  come from, dated as a forecast; Starship (orbit on Flight 14, Sept 28 2026),
  Waymo (14 cities, freeways), GLP-1 prices and Medicare Bridge updated with quotes.

## For the founder

Decisions (nothing merged; main deploys on merge):
1. Merge the PR. After the Coolify deploy, check
   `curl -sI "https://argumend.org/_next/image?url=%2Fimages%2Fgenerated%2Ftopics%2Fai-risk%2Fhero.jpg&w=384&q=75" -H "Accept: image/webp"`
   returns image/webp (Linux was not testable here).
2. Sitemap expansion: kept as its own merge commit; revert it to keep the pruned sitemap.
3. Home "One pilot test" aside (trans-athletes debate, 88 of 114 turns) is the first
   claim visitors read; a reviewer found it jargon-heavy and score-like. Left as is.
4. Cloudflare: http→https is a 307 (301 is better); Cloudflare's managed robots.txt
   blocks ClaudeBot/GPTBot/Google-Extended while llms.txt invites AI citation.
5. Moon landing's skeptic side now has no non-agreed card, so its first crux shows no
   pair; the map reads "settled" on its evidence after the dosimeter card moved.

Content follow-ups: the US-China truce card (recheck after 2026-11-10); ukraine
recruitment and Sweden MUST claims still NEEDS LIVE CHECK; GLP-1 "40% Ozempic price
cut in 2024" unverified; Ukraine nuclear paste cruxes don't cover intermittency.
