# Jev (TypeSafe AI) probe: crux, pattern, and judge tests (2026-09-16)

**What this is.** TypeSafe AI launched Jev on 2026-09-16: a non-generative "System One" model that
returns typed decisions (Choice, Score, Noul yes/no) with calibrated probabilities, no text. The
founder asked whether it could be leverage for Argumend. Three rounds were run the same day against
material this repo already has ground truth for. Harness: `scripts/jev-probe/` (plain HTTP, no SDK).
Total spend for all three rounds: about 70k input tokens, under one cent. Model id returned:
`jev-1.13.0`. Every call landed between 130 and 800 ms.

**How to read it.** Every number is a signal from a one-day-old model on a handful of items, not an
accuracy claim. The important property is that Jev returned *identical* answers on every repeat, so
the variance that dominated the sonnet runs (`2026-09-15-crux-repeatability.md`) is absent by
construction. Whether the answers are *right* is judged below against the kit's spec patterns and
the blind reviewers' flags.

## Round 1: diagnosis pattern on the human-evaluation kit (5 items x 5 repeats)

One Choice over the eleven `DiagnosisPattern` values plus four Nouls (genuine, empirical lever,
value residual, definitional). Ground truth is each kit file's "Spec pattern it should produce".

| item | expected | Jev modal pattern | result | identical over 5 runs | confidence |
|---|---|---|---|---|---|
| 01 recycling rejections | single-empirical-crux | single-empirical-crux | correct | yes | 63% |
| 02 bequest reserve or cohort | priority-tradeoff | priority-tradeoff | correct | yes | 58% |
| 03 creek cleanup success | definition-mismatch | value-conflict (def-mismatch 38%) | wrong | yes | 51% |
| 04 dog park hours | mixed-disagreement | mixed-disagreement | correct | yes | 93% |
| 05 choir concert (control) | mostly-common-ground | priority-tradeoff (m-c-g 19%) | wrong | yes | 53% |

Mean latency 243 ms, about 1,250 input tokens per call.

The two misses are the ones the Nouls caught. Item 03's `definitional` Noul was 84 to 86%, the
highest of any item (others 26 to 50%). Item 05's `genuine` Noul was 61 to 62%, the lowest of any
item (others 77 to 87%). The single Choice is weaker than decomposed Nouls composed in code, which
is exactly what TypeSafe's own skill recommends. Not tested: a rule built on those Nouls, because
fitting a rule to five items would prove nothing.

## Round 2: crux contestedness and selection on the three flagship transcripts (3 repeats)

State: main question, the rendered transcript (same bytes as the repeatability review), and seven
candidate claims: the deterministic engine's top three, the sonnet runs' primary cruxes rephrased as
claims, the main question restated, and one deliberately uncontested distractor. Per candidate, two
Nouls (do the speakers actually disagree about it; would settling it force a position change) and
one Choice for the best crux. One request per map, about 2,900 input tokens, 130 to 340 ms.

| map | candidate | contested | pivotal | best-crux prob |
|---|---|---|---|---|
| us-israel | E2 death-toll sentence (blind reviewers: not a disagreement; sonnet's primary crux 4/5 runs) | **7%** | 19% | 0% |
| us-israel | D distractor: $3.8B MOU | 4% | 11% | 0% |
| us-israel | E1 regional stability depends on alliance | 98% | 43% | 26% |
| us-israel | E3 near half of killed were combatants | 98% | 24% | 3% |
| us-israel | S1 IHL compliance | 45 to 53% | 56 to 59% | 66% (picked, 3/3) |
| us-israel | M main question restated | 96% | 58 to 67% | 2% |
| ai-mass | D distractor: decline happened | 21% | 31% | 0% |
| ai-mass | E2 targeted workforce programs | 8% | 16% | 0% |
| ai-mass | S1 AI vs macro explains decline | 98% | 43% | 21% |
| ai-mass | E1 firms cut headcount | 27 to 33% | 54% | 58% (picked, 3/3) |
| capitalism | D distractor: AI automates tasks | 5% | 35% | 0% |
| capitalism | E1 ownership stays concentrated | 98% | 40% | 1% |
| capitalism | E3 survival depends on definition | 9% | 59% | 68% (picked, 3/3) |

Findings.

- **The contested Noul does what filter C was built to do.** The death-toll sentence that both
  blind reviews flagged, and that four of five sonnet runs put in front of the reader, scores 7%
  contested. All three distractors score 21% or below. Every claim the transcript actually argues
  over scores 76% or above. That is a clean gate, it is deterministic, and it costs a quarter of a
  second per map for all candidates at once.
- **The best-crux Choice is not trustworthy on its own.** On capitalism it picked the definitional
  claim (68%) while its own contested Noul put that claim at 9%. On ai-mass it picked E1 (58%) at
  27 to 33% contested while S1 sat at 98% contested. The Choice appears to weight "would settle the
  main question" over "is actually disputed here". Compose the Nouls in code (contested AND pivotal)
  rather than asking for the crux directly; the engine already ranks, Jev should only gate.
- **"Not discussed" and "not contested" are the same 0 to Jev.** The rendered transcript carries two
  claims per speaker, so engine crux E2 (ai-mass) is simply absent from it and scores 8%. Any gate
  must run on the same text the extraction saw, which the pipeline already guarantees.
- **The pivotal Noul is flat** (mostly 30 to 60%) and discriminates poorly. Do not build on it yet.

## Round 3: the "who is right" judge-bot idea (4 cases x 3 repeats)

Two Choices (better supported by what is written; factually correct by world knowledge) and four
Nouls (factual dispute, fallacy per speaker, needs a reasoning model). 130 to 415 ms per call.

| case | better supported | factually correct | factual dispute | fallacy 1st / 2nd |
|---|---|---|---|---|
| vaccines/autism, B right | 2nd 100% | 2nd 100% | 95% | 97% / 14% |
| Great Wall from space, loud A wrong, hedging B right | 2nd 94% | 2nd 100% | 97% | 92% / 53% |
| immigration and wages, genuinely contested | neither 79% | 2nd 81% (unsettled 18%) | 81% | 21% / 16% |
| dog park, value dispute | 2nd 85% | unsettled 45% / 2nd 45% | 15% | 67% / 60% |

Findings.

- On the two cases with a plainly wrong side it is confident, correct, stable, and it does not
  reward the confident-sounding speaker. It flags the fallacy on the right speaker (97%, 92%).
- On the contested economics case "better supported" correctly says neither, but "factually
  correct" leans 81% to one side of a live expert dispute. A public bot would need a rule such as
  "no verdict unless one Choice is over 90% and `is_factual_dispute` is over 90%", and that rule
  would need evaluation on far more than four cases.
- On the value dispute the factual Choice splits 45/45 with "unsettled", which is the right shape,
  but "better supported" still hands the second speaker 85%. Values disputes need the round-1
  Nouls in front of any verdict.
- `needs_reasoning_model` returned 86 to 89% on every case including the trivial ones, so it is
  useless as an escalation gate as phrased.

## What this means for Argumend

The strongest result is the one the sprint got stuck on. Crux repeatability was 1/5 to 2/5 exact
across sonnet runs, and filter C was a heuristic over common-ground strings. A calibrated,
deterministic contestedness probe at sub-second latency removes one whole layer of run-to-run
variance from the crux box without touching the engine's ranking, which the north star permits.
It does not fix extraction variance upstream; the claim set Jev gates over is still model-extracted.

The judge-bot idea is technically feasible at chat-reply latency and near-zero cost, and it lands
the easy cases. It also conflicts with the v2 spec's "never names a winner" rule and would need a
much larger evaluation before anything public. A narrower, spec-compatible version is a bot that
returns the disagreement *type* and whether the dispute is factual or values-based, which round 1
suggests it can do at 3/5 exact and 5/5 on the underlying Nouls.

**Suggested next steps, in order.** (1) Wire the contested Noul as an optional gate behind the
existing filter-C flag and replay the stored sonnet runs through it. (2) Rerun round 1 with a
Noul-composed pattern rule on the full evaluation kit plus the flagship maps, not five items.
(3) Only then decide whether any user-facing bot is worth the spec conflict.

## Caveats

Early access, one day old, no published rate limits or terms, benchmark claims are the vendor's.
`TYPESAFE_API_KEY` lives in `.env.local` only. The harness posts source text to a third party, so
it must stay off the default lanes until the founder decides that is acceptable for user pastes.

## Addendum, 2026-09-17: at-scale experiments (harness `scripts/jev-probe/exp*.ts`)

Run the morning after the first probe, against ground truth the topic library already carries. Seeded
samples, concurrency 6, every call succeeded. About 1,000 further calls, roughly 900k input tokens,
under four cents in total.

**A. Evidence weighting, 240 of 1,567 items (`expA-evidence.ts`).** State: topic claim, section title,
evidence title, description, source. The human `reasoning` field withheld. Side (for/against) accuracy
89.6%, 94.0% on the 184 items with confidence >= 0.8. Spearman rank correlation with the human 0-10
weights: sourceReliability 0.50, independence 0.63, replicability 0.45, directness 0.45; composite 0.50.
Moderate signal; not a substitute for the rubric. 240 items in 6.6 s wall.

**Repeatability at scale (A run twice).** Side choice identical on 240/240. Score |diff| on the 0-4 scale:
mean 0.03, median 0.02, p90 0.07, max 0.28. Side-confidence |diff| mean 0.015, max 0.25. Spearman of
the composite score between runs 0.998. Conclusion: discrete choices are stable; probabilities wobble by
a few points, so thresholds need a margin. "Deterministic" in the first probe was overstated.

**B. Comment routing, 150 of 656 comments (`expB-routing.ts`).** The first two sentences of each
section's skeptic premise or proponent rebuttal, treated as an online comment. Choice over that topic's
sections (mean 3.3 options, chance 31%): 93.3% correct; 95.2% on the 145 with confidence >= 0.7.
Stance (for/against the topic claim): 82.7%. Both right: 78.0%. Several misses are arguable ground
truth (methodology-vs-harm-evidence sections on the smartphone topic).

**D / D2. Verdict agreement, 110 and 155 topics (`expD-verdict.ts`, `expD2-verdict-rich.ts`).** With
the two simple cases and keystone as state: 49.1% three-way agreement with `verdict.quadrant`. With the
full map summary (every section summary and evidence title per side, ~970 tokens): 60.0%, but only
because Jev called 139/155 "contested" (confusion: contested row 85/5/0, moderate row 46/6/0, settled
row 8/3/2). Direction on the 13 settled topics: 10/13. Jev does not weigh a map; the verdict stays
computed from evidence weights. This is the boundary between the two systems.

**C. Demo thread (`expC-thread.ts`).** Eight fictional comments on a rent cap. Two parallel requests
(per-comment: section, stance, fallacy, factual; thread: pattern, three Nouls, seven claim
contestedness Nouls). roughly 430 ms wall (394 to 446 ms across four runs), 7,124 input tokens. Routing matched a Sonnet run on 6/8 comments
(the two differences are genuinely ambiguous comments). Pattern mixed-disagreement 97%, both models.
Claim contestedness: every factual claim in the thread <= 19% except the exemption claim (49-56%);
the values claim 46-52%. The "not an argument" flag in the reply is composed from the probes (explicit
"none", or fallacy >= 0.8 with factual <= 0.2) because the section Choice alone placed the insult
comment differently across runs at 16-40% confidence. Sonnet on the identical task via the CLI: 22.3 s. The composed reply
(section, crux, strongest weighted evidence per side, contested vs undisputed claims) is built from
map sentences selected by Jev's numbers; no generated prose.

**Published as** `data/blog.ts` slug `we-gave-a-model-that-cant-talk-1000-arguments` with the social
kit in `docs/marketing/2026-09-17-jev-post-social-kit.md`.

## Addendum, 2026-09-17 (afternoon): two Piers Morgan clips (`expE-clip.ts`, `CLIPS.md`)

Founder asked for contentious real-world material. Captions were auto-generated (yt-dlp, no video
download); speaker labels and 8 to 12 claims per clip came from one Sonnet call each (System 2);
Jev routed, typed, and gated. Per-turn questions are chunked eight turns per request with only those
turns in the state (see the lesson below). Retry with backoff was added to the client after a 529
"system_overloaded" during the first long run.

**Immigration panel, 2026-04-02 (Shapiro vs Patel, re-upload, 4 min, 13 turns, 828 words).** Map:
immigration-national-identity. 3 requests, 685 ms wall, 10.3k tokens. Routing: 6/9 substantive
turns to Social Cohesion & Trust, 3 "none" (host questions, one insult). Pattern mixed-disagreement
67% (value-conflict 27%). definitional 89%, talking_past 74%, value_residual 82%, empirical_lever 34%.
Contested: "immigrants have a duty to uphold host norms, enforced" 96% (value); "US was built by a
small select group" 94% (fact); "requiring conformity is bigoted" 88% (value). Undisputed: diversity
makes America great 16%, obey the law 6%, small share are asylum seekers 14%, father left Uganda 7%.

**Trans athletes debate, 2024-05-23 (official channel, 3.46M views, 36 min, 139 turns, 7,253 words,
Lahren/Krakue/Fiorentini/Barr).** Map: transgender-athletes-sports. 16 requests in parallel, 724 ms
wall, 92.7k tokens (0.4 cents). Routing: 88/114 substantive turns "none" (host questions, insults,
the Butker and women's-pay tangents), 14 inclusion-dignity, 12 retained-physiological-advantages.
Stance vs the map claim (HRT'd trans women should be permitted): Krakue against 9 / neither 10,
Lahren against 3 / neither 8, Fiorentini for 6 / neither 22 / against 1, Morgan against 11 / neither
29. Pattern mixed 97%; talking_past 87%; definitional 88%; value_residual 83%; empirical_lever 50%.
Most contested claims: "no such thing as gender identity / mental illness" 94% (fact); Butker speech
degrading 89% (value) / Butker had the right 88% (value); pay gap explained by revenue 87% (fact);
"biological men replacing women" 81%; Jenner golf advantage 64%. Undisputed: Oregon sprinter is trans
and born male 11%; Caitlin Clark paid far less 18%. Sonnet tagged "athletes should not be compelled
to wear symbols" as a shared premise; Jev put it at 77% contested; the transcript confirms Barr
(turn 80) and Fiorentini (95) dispute it.

**Lesson: state size.** First run put all 114 turns in one state with 456 questions: every speaker's
fallacy mean landed at 74% +/- 2 and factual at 43%, i.e. answers collapsed to the transcript mean.
Chunking to 8 turns per request with only those turns in state spread fallacy from 14% to 95% and
made stance match the speakers' known positions. Keep state small; TypeSafe's guidance holds.

**Map data issue found.** The inclusion-dignity section's two evidence cards are both labelled
`side: against` the topic claim; "No trans woman won Olympic gold in two decades of eligibility"
supports inclusion. Jev's side check: mental-health card for 93%; Olympic-gold card for 32% (unsure).
Led to `expF-side-audit.ts` over all cards (results below).

**F. Evidence side audit, all 1,567 cards (`expF-side-audit.ts`).** 50 s wall, 25 retries (529s),
mean confidence 0.85. Agreement with the library `side` label 1,353/1,567 = 86.3%. Disagreements at
confidence >= 0.9: 79 cards across 44 topics; 32 topics have exactly one flag (review individually).
Three maps are systematically inverted relative to their `meta_claim`: open-weight-ai-models 11/17
cards, obesity-personal-responsibility 8/12, transgender-athletes-sports 6/8 (their labels were written
against the skeptic framing, not the meta claim). Fixed in data/topics/ on 2026-09-17 at the founder's request ("fix the issues so we get publishable
results"): all labels flipped on all three maps. On obesity the four "against" cards Jev agreed with
are the skeptic's pro-meta-claim evidence (Japan/Korea obesity rates, the 50-year population shift,
GLP-1 regain and price), so the whole map was inverted and Jev's 100%/82%/99%/100% on those four were
wrong; the audit flags, a person reads. `data/topicSummaries.json` regenerated. Verdicts stay in the
"contested" quadrant on all three; only the balance moves:

| topic | before (balance, verdict) | after |
|---|---|---|
| open-weight-ai-models | 49, contested | 51, contested (9 for / 8 against) |
| obesity-personal-responsibility | 69, contested | 31, contested (4 for / 8 against) |
| transgender-athletes-sports | 64, contested | 36, contested (3 for / 5 against) | Flagged list: `scripts/jev-probe/expF.results.json` (gitignored; rerun to regenerate).
