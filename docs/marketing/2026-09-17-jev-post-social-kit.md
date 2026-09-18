# Social kit: "We gave a model that can't talk 1,000 arguments"

Companion to the blog post `we-gave-a-model-that-cant-talk-1000-arguments` (data/blog.ts). All numbers
come from `docs/reviews/2026-09-16-jev-typesafe-probe.md`; do not round them further. No claim of
independent verification of TypeSafe's benchmarks; every figure below is from our own runs.

Post URL once live: https://argumend.org/blog/we-gave-a-model-that-cant-talk-1000-arguments

## X thread (founder account or @argumend)

1. Yesterday TypeSafe AI shipped Jev, a model that cannot write a sentence. It returns typed answers with calibrated probabilities in ~200 ms. We spent a day and five cents throwing 1,100 argument judgments at it. Thread.

2. Why we cared: our crux finder has a known defect. Same transcript, five runs, and the "one question that would change minds" changed on 2 of 3 maps. On the third it was stable on a sentence nobody in the debate disputed. LLMs are great at extraction and terrible at being the same model twice.

3. Argumend has more ground truth than we usually admit: 156 argument maps, 1,567 evidence items hand-scored 0-10 on reliability, independence, replicability, directness, five disagreements with answer keys, three blind-reviewed transcripts. So we could grade it.

4. Routing an online comment to the right section of a map: 93% correct (chance 31%), 95% when it was confident. Stance for/against: 83%. Which side a piece of evidence belongs on: 90%, 94% when confident.

5. The headline: the death-toll sentence our LLM pipeline pushed to the top 4 runs out of 5 scored 7% "contested" from Jev. Three claims we planted as uncontested: 4%, 5%, 21%. Every claim the transcript really argues over: 76%+. One request, seven claims, a quarter of a second.

6. Repeatability: two full runs over 240 evidence items. Every for/against choice identical, 240/240. Scores moved 0.03 on a 4-point scale. Rank correlation between runs: 0.998.

7. What it can't do: judge. Asked how settled 155 topics were, it called 139 "genuinely contested" and agreed with our evidence-weighted verdict 60% of the time. Asked directly "which claim is the crux", it contradicted its own contestedness probe. Ask it small questions. Rank in code.

8. Speed: an 8-comment rent-control thread, 4 questions per comment plus 11 thread-level questions. Jev: about 430 ms. Claude Sonnet on the identical task: 22.3 s.

9. The demo. In that thread Jev found that nobody disputes a single fact (SF lost 15% of controlled units: 12% contested; the same policy cut displacement: 12%; upzoning takes years: 7%). The two closest to real disagreement: one policy detail, one value. The whole fight, diagnosed.

10. The reply a bot would post is composed entirely from numbers plus sentences that already exist on our map: which section you're in, the crux, strongest evidence each side (34/40 vs 28/40), what you actually disagree on, what you don't. Nothing generated. No winner named.

11. That's the marriage: Jev is System 1 (fast, calibrated, typed, repeatable). Argumend's engine is System 2 (the map, weighted evidence, counterfactual crux ranking, deterministic). Jev supplies the contestedness term the engine never trusted. The engine supplies everything Jev can't.

12. We tried the "who's right" bot. 100% on the easy cases, 81% lean on a genuinely contested one. A referee that's confidently wrong a fifth of the time makes discourse worse. So it maps, it never adjudicates. Full write-up, all caveats: [link]

## Two extra tweets for the Piers Morgan clips (thread positions 9b and 9c, or standalone)

9b. We then ran two real Piers Morgan Uncensored clips. A 4-minute assimilation fight (Shapiro vs Patel): 89% chance they're using "culture" to mean different things, 74% arguing about different questions. Only two claims were actually disputed, one value, one fact. Four they thought they disagreed on, they didn't.

9d. Then we turned the evidence-side check on our own library: 1,567 cards in 50 s. 86% agreement, 79 disagreements at 90%+ confidence, and three whole maps whose for/against labels were written against the wrong framing. A model that cannot talk found a data bug a year of reading missed.

9c. The 36-minute trans-athletes debate (3.5M views, 5 voices, 139 turns): 88 of 114 substantive turns weren't about the question in the title. The most contested claim was a definition of gender identity. The claim the evidence turns on, whether HRT removes the advantage, nobody argued as a claim. 724 ms, 0.4 cents.

## Quote-tweet of @chetaslua's debate "BS meter" (https://x.com/chetaslua/status/2100473581251748216)

Same model, same speed, same five cents, opposite design choice.

A BS meter asks "is this sentence true?" Our tests say Jev leans 81% to one side of open economics questions, so that is the one question it should not be asked live on air.

Ask instead: does the other candidate actually dispute this? Fact or value? Which of the seven things they are shouting about would move a voter if settled?

Point it that way and a debate becomes a map. We ran 1,100 judgments to find the boundary: [link]

(Credit where due: same questions for both candidates, clips by one fixed rule, "not a fact-check". That discipline is rarer than the tech.)

## Single-post version (LinkedIn / Bluesky / Threads)

A model that cannot talk turned out to be the missing half of our argument-mapping pipeline.

TypeSafe AI released Jev yesterday: no text, just typed answers with calibrated probabilities in about 200 ms. We ran 1,100 judgments against Argumend's ground truth (156 maps, 1,567 hand-weighted evidence items, answer-keyed disagreements) for under five cents.

Routing comments to the right section of a map: 93%. Which side evidence belongs on: 90%. Identical choices across repeat runs: 240/240. And the sentence our LLM pipeline kept calling the "crux" of a debate, which nobody in the debate disputed, scored 7% contested.

What it can't do is judge: it called 139 of 155 topics "contested" and agreed with our evidence-weighted verdict 60% of the time. Good. We don't want a judge.

The design: Jev decides which section a live comment belongs to and whether a claim is actually disputed. Argumend's map supplies the crux, the weighted evidence on each side, and what you already agree on. The reply is composed from existing sentences chosen by numbers. Nothing generated, no winner named, under half a second per thread.

Write-up with every failure included: [link]

## Suggested @argumend handle notes

Handle to check: @argumend, @argumendorg, @argumend_org. Bio draft: "Maps of hard disagreements. Every topic has a crux, weighted evidence on both sides, and no winner. argumend.org". Pin the post thread. Do not reply to arguments with verdicts; reply with the map link and the crux.

## Do not claim

- That Jev is "deterministic" (choices are stable; probabilities move by a point or two).
- That Jev "cannot hallucinate" (it cannot generate text; it can still be confidently wrong).
- Any TypeSafe benchmark figure as our own finding.
- That the bot exists in any community yet.
