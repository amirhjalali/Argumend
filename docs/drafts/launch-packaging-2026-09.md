# Launch packaging, disagreement diagnosis (September 2026 revision)

> **DRAFTS. Founder reviews before anything is posted or produced.**
>
> Supersedes `launch-packaging.md` (June 2026), which packaged the "Consciousness in AI Systems" topic map with a 12-tweet thread, a Bluesky version, an audio script, and a 60-second short. Those assets describe a product that is no longer the launch. This file packages the disagreement-diagnosis product and is deliberately shorter: one launch sequence, one share object, one 5-tweet thread, and a list of what we will not claim. Every number carries a bracketed source, listed at the end.
>
> Voice rules carry over: anonymous and institutional; not ragebait; no hashtags; no "excited to announce". We diagnose the disagreement; we do not pick a winner.

---

## 1. What must be true before launch

The launch is the release switch, PR 9, which moves the diagnosis page to `/analyze`, keeps the old page at `/analyze/legacy`, redirects `/analyze-v2`, and can be rolled back by flipping a flag. [spec, PR 9] Its acceptance list, and therefore the launch checklist, is:

| # | Condition | Where it is decided |
|---|---|---|
| 1 | The three mechanical defects are landed: primary type taken from the wrong list, count-driven pattern selection, placeholder resolution text ("Further clarification is required."). Do not test twelve people against a known placeholder bug. | [evidence] defects 2 to 4; [kit] run order step 2 |
| 2 | The build under test is frozen: commit, `anthropic` lane, one model id for all fourteen sessions. The stronger model passed the rubric hard gate; the smaller one failed it. | [kit] run order step 1; [evidence] |
| 3 | The 12-person study passes all six thresholds on the twelve primary readings: 10+ accurate positions, 9+ crux central, 1 or fewer believe it fact-checked, zero repeated straw-man, 6+ new distinction, 4+ would share. No averaging, no partial credit. | [kit]; [spec §16.4] |
| 4 | If any threshold fails, the next cycle goes to the shared failure, then a re-run with six fresh participants. Launch waits. | [kit]; [north-star P1.6] |
| 5 | All repository gates pass; production smoke test; session result and public report work on a phone; legacy page still works. | [spec, PR 9 acceptance] |
| 6 | Publishing is enabled (`ENABLE_DISAGREEMENT_PUBLISHING`) only once the public route and social card have been checked against §2 below. | `.env.example` |

**Nothing below this line is sent, posted, or produced until rows 1 to 6 are true.**

## 2. The share object: `/d/[slug]` and the social card

The share object is the product's only public artifact, so the launch content points at it and at nothing else. What it is, from the spec: [spec §13]

- **Creation is explicit.** Analyzing never persists. A user must choose "Create shareable link"; the full source text is never saved, only validated excerpts. [spec PR 6, §13.1]
- **The page.** Server-rendered at `/d/<slug>`, readable without JavaScript, `noindex, follow` on every user-published report, with a generated date, a clear AI-assembly and source-only disclosure, "Analyze another disagreement", feedback, and a delete control for the publisher. No React Flow. [spec §13.1]
- **Publication threshold.** A report can be shown in session even when weak, but can be published only with at least one explicit position, grounding coverage at 0.60 or better, no dangling references, no critical warning, and a pattern other than `insufficient-context`. [spec §16.3]
- **The card (1200 x 630).** Argumend mark; eyebrow "THE REAL DISAGREEMENT"; the diagnosis headline (two lines max); the primary crux (three lines max); footer metrics for positions, shared premises, disputed questions; footer line "Source-only analysis · No independent fact-check". Parchment, deep teal, rust; crux crimson only for the crux accent; no amber. No percentages, scores, "winner", or side advantage. [spec §13.2]
- **Share controls.** Copy link, share to X by user intent, native share where available, on both the session result and the public page. [spec §13.3]

**Founder check before launch, on a phone:** open one published report for each of the five kit disagreements and answer the PR 5 checkpoint questions: is the payoff visible before methodology, does it feel like a product, is the primary crux memorable, is the caveat visible without killing curiosity, is the share object worth sharing. If "memorable crux" is a no on three or more of five, the study will fail the crux threshold; fix first. [kit, PR 5 section]

**Card copy is generated, not written.** The card renders the report's own hero line and primary crux. There are no headline "variants" to choose from, unlike the June package; the hero line comes from the fixed list in [spec §3.4]. The one editorial decision is which published report to put in front of the thread, and it should be the dog-park report if the live build produces the two-card diagnosis on it (count as primary, value question as secondary), because that is the example the essay walks through.

## 3. Launch sequence

| Step | What | Depends on |
|---|---|---|
| 0 | Study passes; PR 9 merged; publishing on | §1 |
| 1 | Essay posted to LessWrong (`lesswrong-essay-2026-09.md`, placeholders filled from the live dog-park run) | §1 row 2 |
| 2 | Four gatekeeper DMs sent one at a time over a week (`gatekeeper-dms-2026-09.md`) | step 1 for the two essay-link DMs |
| 3 | The 5-tweet thread below, from the institutional account, linking one published `/d/` report and the essay | steps 1 and 2 |
| 4 | Read the feedback control and the study's verbatims for a week before any second wave | spec §11.7 feedback endpoint |

No audio script, no short, no Bluesky adaptation in this wave. Those were sized for a topic map with two authored cruxes; the diagnosis product's share object is the report itself, and the honest thing to show is a real one.

## 4. The 5-tweet thread

Post from the institutional account. Link goes in tweet 4. Numbers are the measured ones; do not round them into adjectives.

**1/**
Most arguments online do not fail for lack of evidence. They fail because the two people are contesting different kinds of claim. One brings a count to a value dispute. The other brings a principle to a factual one. Neither notices.

**2/**
So we built a thing that only does one job: paste the argument, get the diagnosis. Who holds what. What they already agree on. Which distinct disagreements are stacked inside the fight, and what kind each is. The one question someone actually committed to update on.

**3/**
It quotes only from what you pasted. It labels anything it inferred. It checks no facts and says so on every report. It names no winner, ever. The report's job is the shape of the disagreement, not the verdict.

**4/**
Here is one, on a park committee thread about off-leash hours: two disagreements in a trench coat, one you can settle with a phone call to the parks office and one you cannot settle with any count. [VERIFY: link to the published /d/ report]

**5/**
Honest numbers: across 40 blind-scored reports, every quote was verbatim (390 of 390) and nothing was invented. The named crux was judged wrong about half the time. We wrote up why, and what we are doing about it: [VERIFY: essay link]

*(Tweet 4 must describe what the linked report actually shows. If the live build produced a count-only diagnosis on the dog-park source, rewrite tweet 4 around whichever published report is honest, or cut it to four tweets.)*

## 5. What we will not claim

Mirrors the spec's integrity rules. Anyone writing a caption, a reply, or a DM about the product checks against this list. [spec §3.3, §4.2]

- We will not say the report fact-checked, verified, or investigated anything. It is source-only, and every report says so.
- We will not name a winner or a loser, say a position was "destroyed", or give a rationality score.
- We will not show an agreement percentage or a "resolvability 74%".
- We will not describe every disagreement as two-sided, or reduce one to two sides when the source has three or one.
- We will not describe a value disagreement as a lack of evidence, or imply more evidence would settle a value question.
- We will not claim it fabricates nothing in a way that implies it is never wrong. The measured claim is: no invented sources, opponents, or quotes across 40 reports; the crux was wrong about half the time. [evidence]
- We will not claim accuracy as a percentage. The study thresholds are pass-or-fail product gates, "not analytics targets to game". [spec §16.4]
- We will not infer or describe any participant's motives, character, ideology, religion, health, or other sensitive traits.
- We will not present model confidence as confidence that a claim is true. It means confidence in representation.
- We will not promote URL fetching, thread fetching, an X bot, judge councils, or fallacy cards. They are deferred, not unfinished. [spec §4.2, §24]
- We will not say the founder built it. Argumend built it.

### Sources

- [spec] `docs/plans/2026-08-18-argumend-v2-disagreement-diagnosis-spec.md` §3.3, §3.4, §4.2, §11.7, §13.1, §13.2, §13.3, §16.3, §16.4, §24, PR 6, PR 9, "Release switch".
- [evidence] `docs/reviews/2026-09-15-v2-checkpoint-evidence/README.md`.
- [kit] `docs/research/2026-09-15-v2-human-evaluation-kit/README.md` (thresholds, run order, PR 5 section).
- [north-star] `docs/plans/2026-08-12-argumentgraph-north-star.md`, P1 step 6.
- `.env.example` for the flag names.
