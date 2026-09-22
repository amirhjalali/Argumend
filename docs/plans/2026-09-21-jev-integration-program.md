# Jev integration program, 2026-09-21 (six-hour orchestrated run)

Founder directive: "use fable to direct opus and use as many tokens as you can productively use in the
next 6 hours." Fable orchestrates; Opus agents execute in isolated worktrees, one branch each, no
pushes; Fable reviews, merges, and opens PRs against `main`. Usage at start: 0% of the 5h window,
31% of the week. The earlier token-burn guardrail (stop launching at 60%) is explicitly overridden
by this directive for this run; usage is still checked before each wave.

## Wave 1 (parallel)

| branch | agent | deliverable |
|---|---|---|
| `jev/map-reply-api` | map-reply-api | `lib/jev/client.ts`, `lib/mapReply/`, `POST /api/map-reply` behind `ENABLE_JEV_MAP_REPLY`, fake provider, tests, `docs/MAP_REPLY.md`, smoke script |
| `jev/evidence-adjudication` | evidence-adjudication | re-run side audit at 0.8, human-read every flagged card, apply confirmed fixes, regen summaries, `docs/reviews/2026-09-21-evidence-side-adjudication.md`, conventions note |
| `jev/crux-contestedness-gate` | crux-gate | `contestednessOverrides` + candidacy floor in `lib/crux`, provider interface, flagship before/after script, `CRUX_PROJECTION_JEV_GATE` in the v2 projection, `docs/reviews/2026-09-21-jev-contestedness-gate.md` |
| `jev/typesafe-policy` | typesafe-policy | read-only: TypeSafe terms, data retention, rate limits, pricing tiers, SDK status -> `docs/reviews/2026-09-21-typesafe-policy-notes.md` |
| `jev/social-launch-kit` | social-launch | `docs/marketing/2026-09-21-social-launch-kit.md`: account setup, 30 posts drawn from existing maps (crux + strongest evidence each side, no winners), cadence |

## Policy findings that changed the plan (typesafe-policy, done first)

TypeSafe's MCA puts the consent warranty and indemnity on the customer, publishes no retention
period (ZDR is enterprise-only and not in the binding documents), has no acceptable-use policy,
caps their liability at $50 for us, and documents that Jev "does not treat data as inherently
hostile" (prompt injection). Consequences for this program:

- The map-reply endpoint is for text a user pastes with a visible consent line. It must not be
  pointed at third-party community comments; the "bot in your thread" idea in the blog post's last
  section is on hold until the founder decides (flagged in the final report).
- New wave-2 track: privacy policy, terms, footer links, and a consent line on /analyze-v2 and the
  map-reply UI, naming the vendor and US processing. The site has none of these today.
- Engineering: pin `jev-1.13.0`, log the returned model, strip identifiers, never persist pastes,
  spend ceiling, 5+ retries with Retry-After, treat pasted text strictly as data.

## Wave 2 (after review of wave 1)

- UI for map reply (paste a thread, see the reply and the probe values), behind the flag, with the consent line.
- `jev/privacy-consent`: /privacy and /terms drafts for founder review, footer links, consent line on /analyze-v2, vendor-naming provider badge.
- `jev/data-fixes` (after adjudication merges, same files): fix `housing-affordability-crisis` card `stanford-sf-rent-control` title (6% vs the study's 15%); find `sourceUrl` for the 16 cards missing one; report on `minneapolis-shooting` pillar `pattern-of-force` having no evidence and on `self-driving-car-safety` / `vaping-harm-reduction` having no two-sided pillar. Founder decision flagged: `featuredTopicId` is `consciousness-ai-systems` (moderate quadrant, 1 for / 7 against on its lead pillar), which sits awkwardly with "evidence on both sides".
- `jev/verdict-robustness`: the second read found the "settled" quadrant is about two cards wide on 12-16 card maps (one card moves balance 8-12 points against a 20-point threshold; six more quadrant flips within single-card reach). New branch adds a sensitivity measure (`flipsToChange`, one-card balance range), demotes fragile "settled" readings to "moderate" with a quiet "one evidence card could change this reading" line, and measures the effect across all 156 topics.
- `jev/evidence-drafts`: candidate evidence cards, with verified URLs, for the thin `for` sides of the five quadrant-changed maps and the empty Minneapolis pillar, for founder acceptance (docs only).
- Second-opinion code review of each wave-1 branch by a separate reviewer agent before merge. Done so far: crux gate (7 findings, merge after fixes, fixes in progress); adjudication (20/22 flips confirmed, 1 reverted, 4 more applied, removals/splits listed for the founder).
- Merge order: adjudication (data only) -> crux gate -> map-reply API -> UI.

## Wave 3

- PRs against `main`, one per branch, with verification output.
- Program report in this file.

## Rules for every agent

Run `bun run test` (vitest), `bunx tsc --noEmit`, `bun run lint` before each commit. Never print or
commit `TYPESAFE_API_KEY`. Do not push. Jev never names a winner; composed replies contain only Jev
numbers and existing map text.
