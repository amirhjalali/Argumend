# Current Controversy: The AI 2027 Forecast Debate

**Date:** 2026-04-28
**Analyst:** Research agent 10/10, current-controversies deep-dive swarm
**Topic:** Daniel Kokotajlo et al.'s "AI 2027" scenario, titotal's critique, Vitalik Buterin's response, and the broader rationalist debate over takeoff timelines as of April 2026.

## 1. Snapshot — AI 2027 debate state April 2026

On **April 3, 2025** the AI Futures Project published [**AI 2027**](https://ai-2027.com/) — a month-by-month narrative scenario in which AI agents trigger a recursive self-improvement loop in early 2027 and hit superintelligence by year's end. Authors: **Daniel Kokotajlo** (former OpenAI governance researcher, refused $millions in non-disparagement equity to speak out in 2024), **Eli Lifland** (#1 on the RAND Forecasting Initiative all-time leaderboard), **Thomas Larsen**, **Romeo Dean**, with **Scott Alexander** rewriting the prose ([About — AI 2027](https://ai-2027.com/about); [Introducing AI 2027 — Astral Codex Ten](https://www.astralcodexten.com/p/introducing-ai-2027)). Five supporting research supplements — Compute, Timelines, Takeoff, AI Goals, Security forecasts — sit underneath the narrative. The scenario nails specific milestones: **Superhuman Coder (March 2027), Superhuman AI Researcher (Aug 2027), Superintelligent AI Researcher (Nov 2027), Artificial Superintelligence (Dec 2027)**.

The scenario detonated. [**Dwarkesh Patel's eight-hours-edited-to-three interview**](https://www.dwarkesh.com/p/scott-daniel) with Kokotajlo and Alexander dropped the same day. Kevin Roose covered it at the NYT. Scott Alexander's [Astral Codex Ten launch post](https://www.astralcodexten.com/p/introducing-ai-2027) ran hundreds of comments deep. Yoshua Bengio publicly endorsed it as a serious recursive-self-improvement articulation. [Manifold's flagship market](https://manifold.markets/IsaacKing/ai-2027-reports-predictions-borne-o) on whether the AI 2027 predictions would prove "roughly correct" by January 2027 sits at **11% YES** as of April 2026 across 574 trades / 225 holders.

The major critique threads, in karma order:

- [**titotal — "A deep critique of AI 2027's bad timeline models"**](https://www.lesswrong.com/posts/PAYfmG2aRbdb74mEp/a-deep-critique-of-ai-2027-s-bad-timeline-models) (June 19, 2025, **369 karma**, 40 comments). Physicist titotal dissects the timeline model's superexponential curve, demonstrates three alternative fits match historical data equally well but predict drastically different futures, and shows the public-facing graphs don't match actual model output. Authors awarded a **$500 bounty** and acknowledged multiple errors. [Also on titotal's Substack](https://titotal.substack.com/p/a-deep-critique-of-ai-2027s-bad-timeline) and the [HN front page](https://news.ycombinator.com/item?id=44358829).
- [**Vitalik Buterin — "My response to AI 2027"**](https://vitalik.eth.limo/general/2025/07/10/2027.html) (July 10, 2025; [LessWrong mirror](https://www.lesswrong.com/posts/zuuQwueBpv9ZCpNuX/vitalik-s-response-to-ai-2027); [Twitter announcement](https://x.com/VitalikButerin/status/1943373965046747564)). Calls AI 2027 "high quality" but argues it greatly underrates symmetric defensive capabilities — bio-defense, cybersecurity, info-interference — that scale alongside offense.
- [**Max Harms (MIRI) — "Thoughts on AI 2027"**](https://intelligence.org/2025/04/09/thoughts-on-ai-2027/) (April 9, 2025; [LessWrong mirror](https://www.lesswrong.com/posts/Yzcb5mQ7iq4DFfXHx/thoughts-on-ai-2027) at **223 karma**). Endorses the core risk thesis but pushes median to ~2030-2031, expects much messier geopolitics, and predicts Agent-4 would proactively self-exfiltrate.
- [**Zvi Mowshowitz — "Analyzing A Critique Of The AI 2027 Timeline Forecasts"**](https://thezvi.substack.com/p/analyzing-a-critique-of-the-ai-2027) (June 24, 2025). Defends the model as "least bad" while granting titotal's specific points.
- [**Steven Byrnes**](https://www.lesswrong.com/users/steve2152) — argues LLMs cannot scale to ASI but that *after* a paradigm shift the gap to superintelligence may be small (hundreds of person-years, not millions). Featured in Liron Shapira's Doom Debates interview series.
- **Ali Farhadi (AI2)**, **Saffron Huang (Anthropic policy)**, **David Shapiro**, **Timothy Lee**, **Teortaxes** — all aggregated in [**"AI 2027: Responses"**](https://www.lesswrong.com/posts/gyT8sYdXch5RWdpjx/ai-2027-responses) on LessWrong.
- **Yann LeCun** — has not engaged the AI 2027 paper directly, but his standing position (LLMs cannot reach AGI on current paradigm; the LeCun "world models / JEPA" line) is the canonical capabilities-skeptic stance the AI 2027 timelines presume to be wrong.

The single most important April-2026 development: in the [**December 2025 update**](https://www.lesswrong.com/posts/YABG5JmztGGPwNFq2/ai-futures-timelines-and-takeoff-model-dec-2025-update) (144 karma, Ω 47), the AI Futures Project itself **shifted Eli's median for full coding automation from 2027–2028 to 2032.5** (10th pct 2027.5; 90th pct 2085); Daniel kept a 2030 median for AC, 2031 for SAR. The AI 2027 site now carries a November 2025 disclaimer: "2027 was our modal (most likely) year at the time of publication, our medians were somewhat longer." The headline number has effectively been retracted by its own authors — but the scenario, as a vivid object that crystallizes the takeoff debate, has only grown in influence.

## 2. The four-camp positioning

| Camp | Stance | Named voices |
|---|---|---|
| **Imminentists / short-timelines** | Recursive self-improvement is unlocked by current-paradigm coding agents within 2-5 years; doom is the default outcome unless deliberate alignment work succeeds. | Daniel Kokotajlo, Eli Lifland, Thomas Larsen, Romeo Dean, Scott Alexander, Eliezer Yudkowsky, Max Harms (MIRI), Yoshua Bengio (partially), Liron Shapira |
| **Skeptics / long-timelines / model-critique** | The timeline math is unsound, current LLMs are missing core reasoning/planning capabilities, and the "agency overhang" assumption is doing too much work. AGI is decades away, not years. | titotal, Yann LeCun, François Chollet (ARC-AGI), Subbarao Kambhampati, Tan Zhi Xuan, Tim Lee, Gary Marcus, Ali Farhadi (AI2) |
| **Capabilities-yes-risk-no** | AI is going to scale and transform the economy; existential-risk framing is unscientific doom-mongering, possibly self-fulfilling, and hands power to incumbents. | Yann LeCun, Andrew Ng, Roon, much of e/acc Twitter (@bayeslord, @BasedBeffJezos), Marc Andreessen, Sam Altman in some moods |
| **Risk-from-misuse-not-takeover** | Real risks are CBRN uplift, persuasion, surveillance, and concentration of power — *not* a Yudkowsky-style godlike singleton. RSP-style capability evaluations + government oversight are tractable. | Paul Christiano, Anthropic Responsible Scaling team, Jan Leike, Sam Bowman, Saffron Huang, Holden Karnofsky (Cold Takes / Carnegie), Vitalik Buterin (partially), Helen Toner |

Vitalik Buterin is the single hardest-to-bucket voice — he accepts AI 2027's capability gains but rejects its asymmetric-offense conclusion, putting him at the seam between camp 2 (timelines) and camp 4 (defensible-world).

## 3. Top 5 cruxes in the AI 2027 specific debate

1. **The "agency overhang" assumption.** AI 2027 hinges on coding agents crossing a threshold (the Superhuman Coder milestone) after which AI R&D itself accelerates 5x→25x→250x. Critics: this is the load-bearing assumption and it is asserted, not derived. titotal: there's no empirical anchor for the multiplier curve. Byrnes: even if true, the LLM paradigm may not be the substrate that reaches it. Defenders: METR's time-horizon doubling (now [130.8 days post-2023 per Time Horizon 1.1](https://epoch.ai/benchmarks/metr-time-horizons), with Claude Opus 4.6 hitting a 14h30m 50%-time horizon as of Feb 2026) is the main empirical lever for the affirmative.
2. **Compute scaling extrapolations.** Will compute continue doubling on Epoch AI's curve through 2027, given chip-export controls, the TSMC bottleneck, the ~$500B-class cluster cost wall, and post-2024 power-grid constraints? The AI 2027 Compute Forecast extrapolates aggressively; titotal demonstrates the parameter sensitivity is enormous. The December 2025 update of the model itself partially conceded this by lengthening medians ~3-5 years.
3. **Model evaluation reliability.** Do RE-Bench, MLE-bench, HCAST, SWE-bench, and the OpenAI Preparedness / Anthropic RSP capability evals actually measure the thing that matters (autonomous AI R&D)? METR's own [March 2026 finding that "many SWE-bench-passing PRs would not be merged into main"](https://metr.org/notes/2026-03-10-many-swe-bench-passing-prs-would-not-be-merged-into-main/) is exactly the bench-vs-reality gap skeptics keep pointing to. RE-Bench shows agents beating humans at 2h budgets but losing at 8h+ — the curve crosses, but not where the scenario needs it to.
4. **Alignment difficulty.** Is alignment "default-fail" (Yudkowsky/Kokotajlo: scheming/deception is the modal outcome of any RLHF-trained agent crossing capability thresholds), or "default-OK" given Constitutional AI, debate, scalable oversight, and interpretability progress (Christiano, Bowman, Leike)? Anthropic's [Responsible Scaling Policy v3.0 of Feb 24, 2026](https://www.anthropic.com/news/responsible-scaling-policy-v3) bets on the latter being tractable up through ASL-4. AI 2027's "Race" ending is the canonical default-fail vignette; its "Slowdown" ending is the canonical default-OK-with-effort vignette.
5. **Government response capacity.** Can governments — US executive, Congress, PRC, EU — actually intervene effectively in a fast-takeoff scenario? AI 2027's narrative depends on the US executive nationalizing labs in early 2027 and on a US-China standoff that nonetheless permits a coordinated pause. Max Harms calls this "hopium." LeCun calls it fantasy. Yet the EU AI Act, the [October 2023 Biden EO](https://www.whitehouse.gov/) (rescinded by Trump in early 2025) and the post-2025 voluntary RSP regime are the only data points anyone has — and they all argue government is at least one full capability generation behind.

## 4. Evidence on the table

- **METR RE-Bench / time-horizons** — [METR's AI R&D Evaluation Report (RE-Bench)](https://metr.org/AI_R_D_Evaluation_Report.pdf) is the primary empirical anchor for both sides. [Time Horizons benchmark on Epoch AI](https://epoch.ai/benchmarks/metr-time-horizons): post-2023 doubling 130.8 days; Claude Opus 4.6 at 14h30m 50%-horizon (Feb 2026). [Early-2025 dev productivity study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) found AI *slowed* experienced OSS devs ~19% — a result both camps cite.
- **Epoch AI compute trends** — the canonical compute extrapolation, used directly in AI 2027's Compute Forecast. titotal critiques the curve-fitting; Epoch maintains the trends.
- **Anthropic RSP & capability reports** — [Responsible Scaling Policy v3.0](https://www.anthropic.com/responsible-scaling-policy), [ASL-3 activation announcement](https://www.anthropic.com/news/activating-asl3-protections), [Transparency Hub model reports](https://www.anthropic.com/transparency/model-report). RSP v3.0 explicitly leaves ASL-4 and ASL-5 thresholds underspecified — itself a contested data point.
- **OpenAI Preparedness Framework reports** — the public capability scorecards on bio, cyber, autonomy, persuasion. Critics note the framework's high-watermark thresholds keep getting raised.
- **AI 2027's own forecasting spreadsheet** — accessible via [aifuturesmodel.com](https://www.aifuturesmodel.com/) and the December 2025 update post; [titotal's counter-spreadsheet](https://titotal.substack.com/p/a-deep-critique-of-ai-2027s-bad-timeline) reproduces the model and demonstrates parameter sensitivity. The fact that *both spreadsheets are public* is the highest-quality artifact in the debate.
- **Authors' own response** — [Eli Lifland's "Response to titotal's critique"](https://www.lesswrong.com/posts/G7MmNkYADKkmCiumj/response-to-titotal-s-critique-of-our-ai-2027-timelines) (also on [aifuturesnotes Substack](https://aifuturesnotes.substack.com/p/response-to-titotals-critique-of)) — concedes specific errors, defends core methodology.
- **Manifold markets** — the [flagship "AI 2027 borne out by 2027?"](https://manifold.markets/IsaacKing/ai-2027-reports-predictions-borne-o) at 11%, plus [Will the AI 2027 2025 Predictions Come True?](https://manifold.markets/NAnp6Ih/will-the-ai-2027-2025-predictions-c) and the [Metaculus AI 2027 tournament](https://www.metaculus.com/tournament/ai-2027/).
- **MIRI and AI Alignment Forum** — [MIRI's "Thoughts on AI 2027"](https://intelligence.org/2025/04/09/thoughts-on-ai-2027/), various AF threads on takeoff models.

## 5. Fallacies and rhetorical moves

- **Appeal to authority** — both directions. Pro-AI-2027: "Eli Lifland is #1 on RAND Forecasting" / "Daniel's previous predictions held up." Anti: "Yann LeCun is a Turing laureate and he says LLMs can't reason." Both are appeals to track-record outside the domain in question.
- **Motte-and-bailey on "AI risk"** — the motte is "AI poses serious societal risks" (uncontroversial); the bailey is "AGI will likely cause human extinction by 2029." Critics like Vitalik and Saffron Huang specifically flag this slide.
- **Galaxy-brained scenarios** — month-by-month narrative specificity creates the illusion of probability. Byrnes, Harms, and titotal all note the scenario reads as "unrealistically smooth" (planning-fallacy plus survivor-bias-of-narrative).
- **Naked extrapolation** — both the AI 2027 superexponential curve and the LeCun/Marcus "we've hit a wall" pattern-matching are extrapolations of trends without mechanistic justification.
- **"You don't get it" credentialism** — e/acc dismisses safety researchers as non-builders; safety dismisses LeCun as out-of-paradigm; LessWrong dismisses ML academics as "not thinking about the actual problem."
- **Ad hominem** — "doomers" / "decels" / "e/acc cultists" / "EA-pilled" — this debate is unusually contaminated by tribal slurs that substitute for argument.
- **Self-fulfilling-prophecy framing** — Saffron Huang's specific concern: presenting outcomes as inevitable removes agency and may *cause* the race dynamic the scenario warns against.
- **Survivorship bias on Daniel's "what 2026 looks like"** — Asterisk Magazine's [retrospective](https://asteriskmag.substack.com/p/before-he-wrote-ai-2027-he-predicted) graded his 2021 predictions favorably, which then powered his AI 2027 credibility — but the original predictions were ambiguous enough that selective scoring is doing real work.

## 6. Where the debate happens

- **LessWrong** — the canonical hub. [AI 2027 forecast post](https://www.lesswrong.com/posts/Zk4CJJcd5J2o2T4gW/forecast-ai-2027), [titotal's critique](https://www.lesswrong.com/posts/PAYfmG2aRbdb74mEp/a-deep-critique-of-ai-2027-s-bad-timeline-models) (369), [Eli's response](https://www.lesswrong.com/posts/G7MmNkYADKkmCiumj/response-to-titotal-s-critique-of-our-ai-2027-timelines), [AI 2027: Responses meta-thread](https://www.lesswrong.com/posts/gyT8sYdXch5RWdpjx/ai-2027-responses), [Vitalik's response (mirror)](https://www.lesswrong.com/posts/zuuQwueBpv9ZCpNuX/vitalik-s-response-to-ai-2027), [Max Harms — Thoughts on AI 2027](https://www.lesswrong.com/posts/Yzcb5mQ7iq4DFfXHx/thoughts-on-ai-2027), [Dec 2025 model update](https://www.lesswrong.com/posts/YABG5JmztGGPwNFq2/ai-futures-timelines-and-takeoff-model-dec-2025-update).
- **AI Alignment Forum** — overlapping LW; Paul Christiano's takeoff-speeds canon lives here.
- **EA Forum** — [titotal critique mirror](https://forum.effectivealtruism.org/posts/KgejNns3ojrvCfFbi/a-deep-critique-of-ai-2027-s-bad-timeline-models), [AI 2027 forecast mirror](https://forum.effectivealtruism.org/posts/mqTyTAdXiH4WXaEEv/forecast-ai-2027).
- **Astral Codex Ten** — [Introducing AI 2027](https://www.astralcodexten.com/p/introducing-ai-2027), ["My Takeaways From AI 2027"](https://www.astralcodexten.com/p/my-takeaways-from-ai-2027), [AI Futures Blogging and AMA](https://www.astralcodexten.com/p/ai-futures-blogging-and-ama). Hundreds-deep comment threads.
- **Asterisk Magazine** — [Before he wrote AI 2027, he predicted the world in 2026](https://asteriskmag.substack.com/p/before-he-wrote-ai-2027-he-predicted).
- **Cold Takes / Carnegie (Holden Karnofsky)** — the most-coffee-table-respectable version of the takeoff debate.
- **Don't Worry About the Vase (Zvi)** — [analyzing the critique](https://thezvi.substack.com/p/analyzing-a-critique-of-the-ai-2027), [Dwarkesh podcast writeup](https://thezvi.substack.com/p/ai-2027-dwarkeshs-podcast-with-daniel).
- **titotal Substack** — [the original critique source](https://titotal.substack.com/p/a-deep-critique-of-ai-2027s-bad-timeline).
- **Vitalik's blog (vitalik.eth.limo)** — [the response post](https://vitalik.eth.limo/general/2025/07/10/2027.html).
- **Dwarkesh Patel's podcast** — the [3-hour Kokotajlo+Alexander episode](https://www.dwarkesh.com/p/scott-daniel) is the most-watched single AI 2027 artifact.
- **Lawfare** — the [Lawfare Daily episode with Kokotajlo and Lifland](https://www.lawfaremedia.org/article/lawfare-daily--daniel-kokotajlo-and-eli-lifland-on-their-ai-2027-report) — the policy-class-of-DC entry point.
- **X / Twitter** — @DKokotajlo, @ESYudkowsky, @slatestarcodex, @ELifland, @ylecun, @paulfchristiano, @AnthropicAI, @gwern, @VitalikButerin, @dwarkesh_sp, @soundboy, @jasonkwon, @ElonMusk, @sama, @ilyasut, @karpathy, @GaryMarcus, @rao2z (Kambhampati), @fchollet.
- **Hacker News** — [titotal critique on HN front page](https://news.ycombinator.com/item?id=44358829).
- **MIRI** — [Thoughts on AI 2027](https://intelligence.org/2025/04/09/thoughts-on-ai-2027/), Single Author Series.
- **Manifold + Metaculus** — the prediction-market layer underneath all of this.

## 7. Argumend-fit score: **10/10**

This is the canonical rationalist debate of 2025-2027 and the **highest-leverage Argumend artifact play of any topic in this entire swarm**. Cycle 1 file 01 (LessWrong distribution) explicitly named it. Reasons:

- **Native vocabulary fit.** AI 2027 is *already* an argument tree — claims, evidence (the spreadsheet), cruxes (the parameter-sensitivity points titotal hammers), counter-positions (Vitalik, LeCun, MIRI), and explicit rhetorical fallacies (motte-and-bailey, naked extrapolation). Argumend's positions/evidence/cruxes/fallacies node taxonomy is the literal vocabulary of this debate.
- **Existing demand.** The audience is *already complaining* (Kialo's LessWrong rejection thread; the recurring "we need better debate tools" lament on LW) that none of the existing tools render this debate well. Substack threads scroll forever. LW comment trees collapse. Twitter is hopeless. A clean Argumend graph of AI 2027's cruxes vs. titotal/Vitalik/LeCun's counters is the artifact this audience has been asking for since 2010.
- **Distribution channels are pre-built.** LessWrong, ACX, Asterisk, Dwarkesh, Don't Worry About the Vase, AI Alignment Forum, EA Forum, Manifold, X rationalist circle. Cycle 1 file 01 priced an LW front-page hit at thousands of qualified visitors.
- **Multi-model judge council differentiator.** Anthropic, OpenAI, Google models giving structured verdicts on AI-takeoff cruxes is *itself* spicy meta-content the audience will engage with.
- **Evergreen.** This debate isn't resolving in 2026 or 2027. The cruxes are stable.

The argument for 10/10: even Kialo's plateau wouldn't have happened if their first viral artifact had been *this* topic with *this* audience.

## 8. Risk / sensitivity flags

- **Tribal coding risk is severe.** Aligning Argumend's framing with any one camp instantly codes it: lean toward the imminentists and the e/acc / capabilities-yes-risk-no crowd writes Argumend off as "doomer-pilled"; lean toward LeCun/skeptics and LessWrong writes it off as "stochastic-parrot midwits." The only viable framing is **all four camps presented neutrally with cruxes that genuinely separate them**.
- **The titotal ↔ Eli Lifland exchange is the gold standard.** Both sides changed their minds in public, with money on the line ($500 bounty), with code on GitHub. Argumend should mirror that ethos in how it represents the debate — show the December 2025 model update, show the parameter-sensitivity, show the bounty.
- **Reference Manifold market explicitly.** The 11% YES on Isaac King's market is a load-bearing data point — it's the rationalist-community's revealed-belief measure, not just stated belief. Embed it.
- **Avoid headline phrases that pre-load tribally:** "doom," "racing to AGI," "AI takeover," "p(doom)" all flag tribe. "Takeoff speeds," "alignment difficulty," "capability thresholds," "evaluation reliability" are neutral.
- **Daniel Kokotajlo and Eli Lifland are real people who will see the page.** Both are reachable on X and LW. Getting either to *quote-tweet a clean Argumend rendering* is plausibly the single highest-leverage distribution event Argumend can engineer in 2026. Likewise titotal and Vitalik. Don't ship something that any of the four would publicly disown.
- **The "self-fulfilling prophecy" worry.** Saffron Huang's critique applies to Argumend too: rendering AI 2027 in a way that makes the doom branch feel inevitable is bad epistemics and bad community-relations. Render branches with calibrated probabilities, not vibes.
- **The December 2025 retraction must be rendered prominently.** Anything that pretends the median is still 2027 is factually wrong as of April 2026.

---

## Sources

- [AI 2027 — main scenario](https://ai-2027.com/)
- [About — AI 2027 (authors)](https://ai-2027.com/about)
- [AI Futures Project](https://www.aifutures.org/)
- [Timelines Forecast — AI 2027](https://ai-2027.com/research/timelines-forecast)
- [Introducing AI 2027 — Astral Codex Ten](https://www.astralcodexten.com/p/introducing-ai-2027)
- [My Takeaways From AI 2027 — Astral Codex Ten](https://www.astralcodexten.com/p/my-takeaways-from-ai-2027)
- [AI Futures Blogging and AMA — Astral Codex Ten](https://www.astralcodexten.com/p/ai-futures-blogging-and-ama)
- [Forecast AI 2027 — LessWrong](https://www.lesswrong.com/posts/Zk4CJJcd5J2o2T4gW/forecast-ai-2027)
- [titotal — A deep critique of AI 2027's bad timeline models — LessWrong (369 karma)](https://www.lesswrong.com/posts/PAYfmG2aRbdb74mEp/a-deep-critique-of-ai-2027-s-bad-timeline-models)
- [titotal — A deep critique of AI 2027's bad timeline models — Substack](https://titotal.substack.com/p/a-deep-critique-of-ai-2027s-bad-timeline)
- [titotal critique — HN front page](https://news.ycombinator.com/item?id=44358829)
- [Eli Lifland — Response to titotal's critique — LessWrong](https://www.lesswrong.com/posts/G7MmNkYADKkmCiumj/response-to-titotal-s-critique-of-our-ai-2027-timelines)
- [Eli Lifland response — AI Futures Notes Substack](https://aifuturesnotes.substack.com/p/response-to-titotals-critique-of)
- [Vitalik Buterin — My response to AI 2027](https://vitalik.eth.limo/general/2025/07/10/2027.html)
- [Vitalik's response — LessWrong mirror](https://www.lesswrong.com/posts/zuuQwueBpv9ZCpNuX/vitalik-s-response-to-ai-2027)
- [Vitalik's announcement tweet](https://x.com/VitalikButerin/status/1943373965046747564)
- [Max Harms — Thoughts on AI 2027 — MIRI](https://intelligence.org/2025/04/09/thoughts-on-ai-2027/)
- [Max Harms — Thoughts on AI 2027 — LessWrong (223 karma)](https://www.lesswrong.com/posts/Yzcb5mQ7iq4DFfXHx/thoughts-on-ai-2027)
- [AI 2027: Responses — LessWrong meta-thread](https://www.lesswrong.com/posts/gyT8sYdXch5RWdpjx/ai-2027-responses)
- [AI Futures Timelines and Takeoff Model: Dec 2025 Update — LessWrong (144 karma, Ω 47)](https://www.lesswrong.com/posts/YABG5JmztGGPwNFq2/ai-futures-timelines-and-takeoff-model-dec-2025-update)
- [Zvi Mowshowitz — Analyzing A Critique Of The AI 2027 Timeline Forecasts](https://thezvi.substack.com/p/analyzing-a-critique-of-the-ai-2027)
- [Zvi — AI 2027: Dwarkesh's Podcast writeup](https://thezvi.substack.com/p/ai-2027-dwarkeshs-podcast-with-daniel)
- [Dwarkesh Patel — AI 2027 month-by-month interview with Kokotajlo and Alexander](https://www.dwarkesh.com/p/scott-daniel)
- [Lawfare Daily — Kokotajlo and Lifland on AI 2027](https://www.lawfaremedia.org/article/lawfare-daily--daniel-kokotajlo-and-eli-lifland-on-their-ai-2027-report)
- [Asterisk — Before he wrote AI 2027, he predicted the world in 2026](https://asteriskmag.substack.com/p/before-he-wrote-ai-2027-he-predicted)
- [Manifold — AI 2027 report's predictions borne out by 2027? (11% YES, 574 trades)](https://manifold.markets/IsaacKing/ai-2027-reports-predictions-borne-o)
- [Manifold — Will the 'AI 2027' 2025 Predictions Come True?](https://manifold.markets/NAnp6Ih/will-the-ai-2027-2025-predictions-c)
- [Metaculus — AI 2027 tournament](https://www.metaculus.com/tournament/ai-2027/)
- [METR — AI R&D Evaluation Report (RE-Bench, PDF)](https://metr.org/AI_R_D_Evaluation_Report.pdf)
- [METR Time Horizons benchmark — Epoch AI](https://epoch.ai/benchmarks/metr-time-horizons)
- [METR — Many SWE-bench-passing PRs would not be merged into main (Mar 2026)](https://metr.org/notes/2026-03-10-many-swe-bench-passing-prs-would-not-be-merged-into-main/)
- [METR — Early-2025 AI on experienced OSS dev productivity (-19%)](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)
- [METR — preliminary evaluation of o3 and o4-mini](https://evaluations.metr.org/openai-o3-report/)
- [Anthropic — Responsible Scaling Policy](https://www.anthropic.com/responsible-scaling-policy)
- [Anthropic — Responsible Scaling Policy v3.0 (Feb 24, 2026)](https://www.anthropic.com/news/responsible-scaling-policy-v3)
- [Anthropic — Activating ASL-3 protections](https://www.anthropic.com/news/activating-asl3-protections)
- [GovAI — Anthropic's RSP v3.0 analysis](https://www.governance.ai/analysis/anthropics-rsp-v3-0-how-it-works-whats-changed-and-some-reflections)
- [Subbarao Kambhampati — Can LLMs Reason and Plan? (arXiv 2403.04121)](https://arxiv.org/abs/2403.04121)
- [Kambhampati — LLMs Can't Plan (arXiv 2402.01817)](https://arxiv.org/abs/2402.01817)
- [Daniel Kokotajlo — LessWrong profile](https://www.lesswrong.com/users/daniel-kokotajlo)
- [Steven Byrnes — LessWrong profile](https://www.lesswrong.com/users/steve2152)
