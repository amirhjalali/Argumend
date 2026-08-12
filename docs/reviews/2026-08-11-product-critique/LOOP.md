# The multi-model critique loop — how to run it again

A repeatable product-quality gate using local CLI models as adversarial readers. Built 2026-08-11 after the founder's verdict that the flagship "does not look compelling."

## Why it works

The critics read the **rendered page**, not the code. They have no stake in the architecture, no memory of how hard a section was to build, and no instinct to praise-sandwich when told not to. Four independent models converging on the same complaint is a much stronger signal than any single review — and where they *disagree* (round 2: grok DON'T SHIP 4/10 vs kimi SHIP 7/10) the disagreement itself localizes the remaining risk.

## The critics

| CLI | Invocation | Lens assigned |
|---|---|---|
| `codex` | `codex exec -C <dir> -s read-only --ephemeral --skip-git-repo-check -m gpt-5.5 -o out.md - < prompt.md` | information architecture |
| `grok` | `grok -p "<prompt>"` | shareability, voice, buried lede |
| `kimi` | `kimi -p "<prompt>"` (NOT with `-y` — they conflict) | insight density per screen |
| `opencode` | `opencode run "<prompt>"` | the confused first-time reader |
| `gemini` | ✗ dead — Google sunset the individual Code Assist tier | (was: copy polish) |

All read files from their working directory, so stage the material there. `--skip-git-repo-check` is required for non-repo dirs.

## The procedure

1. **Build and serve production**, then capture the rendered pages:
   `curl -s localhost:3100/topics/<id> > material/flagship.html`, strip scripts/styles/tags to `.txt`.
2. **Write `material/BRIEF.md`** — the product promise, what the page is, what to deliver. Include *what changed since the last round* so critics don't re-litigate fixed items.
3. **Launch all four in parallel** from one zsh script with `EXIT:$? name` status lines.
4. **Read every critique yourself.** Converged findings (3–4 of 4) are near-certain; single-model findings need judgment.
5. **Implement, gate, rebuild, recapture, re-run.** Each round's brief states the previous verdict and scores so movement is measurable.

## What it caught (rounds 1–2)

Round 1 (all four, unanimous): first-screen bounce — inventory instead of insight, positions as seminar essays, cruxes as database rows, killer facts buried 200 lines deep, trust apparatus swamping content, a 45-claim dump, no people, no payoff.

Round 2 (after rebuild): hook scored 8/10 — but both critics independently found the *same* remaining blocker, that the crux bodies had punchy headlines over unchanged seminar prose. Kimi additionally: no named humans, "numbers worth stealing" with no way to steal them, a two-point line pretending to be a series, and a page that dead-ends.

## Standing lessons

- **Ask for a verdict and a number.** "SHIP or DON'T SHIP" plus a 1–10 would-share score makes rounds comparable and stops critics hedging.
- **Tell them what changed.** Otherwise round N repeats round N−1's list and you learn nothing.
- **Disagreement is information.** A 4 and a 7 on the same page meant "the top third works, the middle doesn't" — which is exactly what both bodies of text said.
- **Fix the converged items first**, then judge the singletons on merit.
- Critics reliably want: a payoff early, one screenshot-native object, named humans, and something to *do* at the end. Those four generalize to every topic page.
