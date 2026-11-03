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

