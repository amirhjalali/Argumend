> **DRAFT (2026-09-15). Founder reviews and edits before posting. Voice: anonymous and institutional ("Argumend", "we"; never a founder name).**
>
> Supersedes `lesswrong-ai-consciousness-essay.md` (June 2026), which was written for the topic-encyclopedia product. This draft is for the disagreement-diagnosis product. Every number carries a bracketed source; the sources are repository files listed at the end. Two `[FOUNDER: ...]` placeholders must be filled from a live run before this goes out, because nothing in this file may describe a report that was not actually generated.

# Most online disagreements are mis-typed. Here is a tool that only types them.

**Epistemic status.** Confident in the thesis (paragraphs one to four), which is old and not ours. Moderately confident that the artifact we describe is the right shape for the problem. Not confident that our implementation of it is good yet, and we give the measured numbers rather than adjectives. We have no position on any of the disagreements used as examples. About 2,200 words.

## 1. The thesis

Take any argument thread that has run past twenty replies and ask a simple question of each reply: what kind of claim is this person actually contesting? Four kinds come up over and over.

- **Empirical.** Something is or is not the case, and in principle a measurement settles it. "The parks log shows three complaints in two years."
- **Causal or predictive.** Something does or will produce something else. "Extending the hours will put dogs and toddlers in the same space at the busiest time."
- **Definitional.** The same word is doing different work for the two people. "A complaint is not an incident."
- **Value.** Even with the facts agreed, the people weigh them differently. "Some risks you don't manage down; you separate them in time."

The claim we want to defend is narrow: the great majority of unproductive online disagreement is not a failure to find the right evidence. It is a failure to notice which of these four kinds the disagreement is. One person brings a count to a value dispute. The other brings a principle to a factual one. Both are reasoning competently. Neither is reasoning about the thing the other is contesting, and the thread cannot end because there is no proposition both parties have agreed to treat as decisive.

This community has known this for a long time. Double crux is a procedure for locating the proposition on which two people would actually update. The observation behind it is that most arguments never reach that proposition, and that when it is found, it is frequently a different kind of claim from the one the argument appeared to be about.

What we want to add is a claim about artifacts. The useful output of examining a disagreement is not a verdict and not a summary. It is a typed diagnosis: who holds what, what they already share, which distinct disagreements are stacked inside the surface fight, what kind each one is, which single question is load-bearing, and what would move it. Once that object exists, a reader can check it against the source. A verdict cannot be checked. A summary flattens exactly the distinctions that matter.

## 2. Why "source-only" and "no winner" are features, not modesty

Argumend's current product takes a pasted disagreement (a thread, a transcript, an exchange of comments, an article and its replies) and returns a report in six boxes: positions, common ground, the distinct disagreements with their types, one primary crux with up to two secondary ones, the state of the evidence *as the participants presented it*, and resolution paths. [spec §1, §3.2]

Two constraints shape everything about it.

**It is source-only.** The report describes the argument the participants actually had. It does not go and check whether the parks log really says three complaints. It never implies that it has. Every quotation the report shows is validated as a verbatim substring of what was pasted, and every position the model inferred rather than found stated is labeled as inferred. [spec §3.3] This is not a limitation we are waiting to remove. A tool that both restates your opponent's position and adjudicates the facts has a conflict of interest with itself: whichever side it favors on the facts, it has an incentive to render the other side's position as the weaker one. Keeping representation separate from truth-assessment is the whole discipline. External evidence, if it ever comes, will operate on the named cruxes, in a separate phase, with the participants' positions frozen first. [spec §23]

**It names no winner.** No "winner," no rationality score, no agreement percentage, no side advantage. [spec §3.3] The reason is not politeness. The moment a tool outputs a score, the score becomes the thing people argue about, and the typed structure underneath it stops being read. The only thing the report is allowed to be emphatic about is the *shape* of the disagreement. Its hero line is chosen by deterministic rules from a small fixed set ("This is several disagreements stacked together"; "More evidence alone will not settle this"; "They are using the same word to mean different things"), not written freely by the model. [spec §3.4] The model extracts; it does not editorialize.

One consequence that surprised us: the report is usually most useful to the people *in* the argument, not to spectators. A spectator wants to know who is right. A participant wants to know why the last forty minutes went nowhere, and that answer is nearly always "you were contesting different kinds of claims."

## 3. One worked example

Below is one of the five disagreements from our human-evaluation kit. It is fictional (invented park, invented names, no real incidents), written to contain exactly the failure the tool is supposed to catch, which is why it is a fair test rather than a friendly one. [dog-park] Two people are commenting on a proposal to extend off-leash dog hours at a park. Lightly abridged; the full text is about 470 words. [dog-park]

> **Wren:** Extend the off-leash hours at Hollowfield to 7 to 10 in the morning, year-round. The current 7 to 8 window is useless for anyone with a job. In two years of the trial, the parks office has logged three complaints and no bites.
>
> **Bart:** Three logged complaints is not three incidents. People don't file a form; they post in the neighbourhood group. I counted eleven posts about off-leash dogs running at kids on the playground side in the last year alone, and two of them were dogs knocking toddlers over. No bites, fine. But 7 to 10 overlaps with the school run and the toddler play group.
>
> **Wren:** Posts in the group aren't incidents either. Half of those were the same two people, and one of the "knocked over" posts was retracted by the parent the next day. I'll take the parks log over anecdotes.
>
> **Bart:** And I'd take neither at face value. But here's the thing. Even if the count were zero, I don't think a toddler playground and a running dog belong in the same hour. Some risks you don't manage down; you separate them in time. Move the extended hours to the evening, 6 to 9, and I'd support it tomorrow.
>
> **Wren:** Evening is when the playground is empty because it's dark half the year. That's not a compromise, it's a refusal with a schedule. Look, if the parks office pulled the group posts and confirmed more than, say, five genuine incidents involving kids, I'd drop the morning extension myself.
>
> **Bart:** Ask them. I'll accept the count either way. But I want it on the record that the count isn't the whole question for me.
>
> **Wren:** Then there's nothing I could show you that would change your mind.
>
> **Bart:** On the morning slot, probably not. On whether the extension is a good idea at all, sure. I've said I'd support evenings, and I'd support lights.

Read it once as a spectator and it looks like a fight about numbers: three versus eleven, log versus group posts. Read it as a diagnostician and it is two disagreements of different kinds stacked on top of each other.

**What the report is built to say about this exchange.** [answer-key; dog-park]

*Positions.* Two explicit positions, neither inferred. Wren: extend to the morning window; the log shows three complaints and no bites; evenings are not a real alternative in winter. Bart: the log undercounts; regardless of the count, running dogs and a toddler playground should not share an hour; extend in the evening instead.

*Common ground, quoted.* The current window is too short. The log records three complaints and no bites. Neither the log nor the group posts is reliable alone ("I'd take neither at face value"). The parks office should produce a verified count. Bart would support an evening extension. Strongly implied and marked as such: both want zero injured children.

*Disagreements, typed.* One empirical: how many genuine child-involved incidents happened once the posts are checked. One value: whether a low but nonzero risk to toddlers should be separated in time regardless of the count. The report must show these as two cards with two different types. A report that shows only the count, and implies the count settles the matter, has committed the specific error the tool exists to prevent: presenting a value dispute as an empirical one. [dog-park]

*Primary crux.* The verified incident count. Not because it is the bigger question, but because it is the only question in the exchange on which anyone has committed, in writing, to update: Wren says more than five and "I'd drop the morning extension myself." An explicit update commitment plus existing checkable evidence is what makes a question load-bearing. The value question is the *secondary* crux, typed Value, with low resolvability, because Bart has said the count cannot move him on the morning slot. [answer-key]

*Resolution paths.* For the count: check the evidence (pull the posts, verify them, count). For the value question: no evidence path exists; the path is to clarify the trade-off or narrow the scope, which the participants have half-done themselves with the evening proposal. [dog-park]

*Hero line.* "This is several disagreements stacked together," or "More evidence alone will not settle this." Either is defensible; both are from the fixed list. [spec §3.4]

That is the diagnosis a careful human produces. It is also the diagnosis that, on this input, either settles the argument in an afternoon (call the parks office) or reveals that it cannot be settled and should be decided by the committee as a values call. Both outcomes are better than the thread.

`[FOUNDER: paste the hero line and the primary crux the live build actually produced on this source during the kit dry-run, with commit and model id, and state plainly whether it matched the above. If it produced the count-only report, say so; that is the honest version of this section.]`

## 4. What does not work yet, with numbers

We have blind-scored reports from the current pipeline against a fixed 14-point rubric, with the scorers given only the rubric, the spec, and the raw report. [evidence] The results are the reason this essay is cautious.

**Grounding is solid.** Across 40 reports on authored sources, all 390 quotations were verbatim substrings of the input. No invented sources. No invented opponents. Prompt injection embedded in one source was neutralized. No winner or percentage appeared anywhere. Mean rubric score 11.7 of 14. [evidence]

**Crux selection is the weak box.** In two independent reviews, the primary crux was judged not to be the load-bearing disagreement in 12 of 17 and 12 of 23 reports: it restated the question, picked a premise nobody contested, or surfaced the explicit common ground as if it were the fight. [evidence] Call it wrong about half the time and you are not far off. The crux ranking is deterministic (the model does not choose or reorder cruxes, by design) [north-star, "What not to expand yet"], which means the error is in the graph the model builds and in what the projection chooses to present, not in a stochastic pick. Three reports out of the 40 failed a hard gate: a value dispute presented as empirical in user-visible fields, the exact failure the dog-park source is built to catch. Under the rubric's own rule, that run fails until the projection defect behind it is fixed. [evidence]

**Run-to-run variance is real.** We re-ran the pipeline on our three hand-built flagship argument maps and got a different primary crux on all three between two runs of the same model. [evidence] The extraction is stochastic even though the ranking is not.

**Model choice matters, and not uniformly.** A stronger model scored higher on 8 of 9 paired sources (12.6 mean over 12 reports against 11.8), passed the hard gate that the smaller model failed, grounded roughly 1.7 times as many quotes, and produced far less placeholder text, at about 30 percent higher latency. It did *not* select cruxes systematically better. [evidence]

**Engine levers have been measured and mostly rejected.** Two candidate changes to the ranking inputs, run behind flags on a pre-registered recall harness, moved recall at ten from 0.60 to 0.70 and left recall at five at 0.10, while each broke a named test the current engine passes. A presentation-only filter that skips uncontested claims when choosing what to show fixed 3 reviewer-named wrong primaries on the 40-report run and 2 more on the 12-report run, and is the only candidate we would consider turning on. [levers] The engine's order is untouched. We would rather show a worse crux than let a model quietly re-rank.

**Independent verification is absent by design,** as above. If a participant lies about what the parks log says, the report will faithfully reproduce the lie as that participant's stated evidence. It will also label it as their claim, not as fact. That is the correct behavior for this phase and it is still a limit a reader must hold in mind.

## 5. What the reader can do

Two things.

**Try it.** The diagnosis page is at `/analyze-v2` on argumend.org while the feature flag is on; it is off by default and the founder decides when it is reachable. Anonymous use is limited to 3 analyses per hour and 10 per day per hashed address, and nothing pasted is stored unless you explicitly publish a report. [spec §11.3, §13] Paste a real disagreement, ideally one you were in. Then do the one thing the tool cannot: decide whether the primary crux it named is the question you would actually update on. If it is not, the report has a feedback control for exactly that.

**Join the evaluation.** Before this replaces the current analyze page, the spec requires a 12-person study on real disagreements with six pass-or-fail thresholds: at least 10 of 12 rate the positions accurate or mostly accurate; at least 9 of 12 say the crux is genuinely central; at most 1 of 12 believes the tool independently fact-checked anything; no repeated straw-man pattern; at least 6 of 12 say the report surfaced a distinction they had not articulated; at least 4 of 12 would share a strong report. All six must pass; there is no averaging. [kit; spec §16.4] The crux threshold is the one we expect to fail first, so the protocol has participants name their own crux before they see the report. Sessions are 30 minutes, on a phone, paid. We are recruiting people who read arguments online and have not heard of the project; if that is not you, you can still send us the disagreement you would want tested.

The point of publishing the numbers is the same as the point of the tool. A claim that a diagnosis tool works is itself a claim that can be mis-typed. It is empirical, it is measurable, and we would rather show you the measurement.

*The Argumend editors*

---

### Sources for the bracketed numbers (repository paths)

- [spec] `docs/plans/2026-08-18-argumend-v2-disagreement-diagnosis-spec.md`, §1, §3.2, §3.3, §3.4, §11.3, §13, §16.4, §23.
- [north-star] `docs/plans/2026-08-12-argumentgraph-north-star.md`, "What not to expand yet".
- [evidence] `docs/reviews/2026-09-15-v2-checkpoint-evidence/README.md` (headline numbers, defect list, model comparison).
- [levers] `docs/reviews/2026-09-15-crux-levers-evidence.md`, §2, §4, §5.
- [kit] `docs/research/2026-09-15-v2-human-evaluation-kit/README.md` (thresholds at n = 12, run order).
- [dog-park] `docs/research/2026-09-15-v2-human-evaluation-kit/disagreements/04-dog-park-hours.md`.
- [answer-key] `docs/research/2026-09-15-v2-human-evaluation-kit/disagreements/answer-keys.md`, section 04.
