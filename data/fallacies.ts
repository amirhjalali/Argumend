/**
 * Logical fallacies catalog — programmatic SEO hub for /fallacies.
 *
 * Each entry is a self-contained, accurate, balanced explanation of a common
 * reasoning error: what it is, a concrete example, why it misleads, and how to
 * counter it. Fully static and offline-safe (no DB, no network).
 *
 * `relatedTopicIds` link to real topic ids from data/topicIndex (topicSummaries).
 */

export interface Fallacy {
  /** URL slug, e.g. "ad-hominem" */
  readonly slug: string;
  /** Display name, e.g. "Ad Hominem" */
  readonly name: string;
  /** Common alternative names or close variants */
  readonly aliases: readonly string[];
  /** One-sentence definition (used in cards, meta descriptions) */
  readonly shortDefinition: string;
  /** 2–4 paragraph explanation, paragraphs separated by "\n\n" */
  readonly longDescription: string;
  /** A concrete fallacious argument that illustrates the error */
  readonly example: string;
  /** Why the move is persuasive yet logically invalid */
  readonly whyItMisleads: string;
  /** Practical guidance for responding when you encounter it */
  readonly howToCounter: string;
  /** Slugs of related fallacies in this catalog */
  readonly relatedFallacies?: readonly string[];
  /** Topic ids from data/topicIndex where this fallacy commonly appears */
  readonly relatedTopicIds?: readonly string[];
}

export const fallacies: readonly Fallacy[] = [
  {
    slug: "ad-hominem",
    name: "Ad Hominem",
    aliases: ["Personal Attack", "Attacking the Arguer", "Argumentum ad Hominem"],
    shortDefinition:
      "Rejecting an argument by attacking the person making it rather than addressing the argument itself.",
    longDescription:
      "An ad hominem (Latin for \"to the person\") fallacy occurs when, instead of engaging with the substance of a claim, you attack the character, motives, background, or circumstances of the person advancing it. The structure is: person A makes claim X; person B attacks A; therefore X is false. The problem is that the truth of a claim is independent of who states it. A flawed messenger can still deliver a sound argument, and an admirable one can still be wrong.\n\nNot every criticism of a person is fallacious. Pointing out a relevant conflict of interest, or noting that a witness has lied under oath before, can be legitimate grounds for discounting testimony. The fallacy arises specifically when the personal attack is offered as though it refutes the argument's logic or evidence, when in fact it does no such thing.\n\nAd hominem is one of the most common moves in heated public debate because it is emotionally satisfying and rhetorically efficient. It lets you dismiss an inconvenient point without doing the harder work of rebutting it. Recognizing it — in others and in yourself — is a basic discipline of honest reasoning.",
    example:
      "\"You're saying we should take this economist's analysis of the minimum wage seriously? She works for a think tank funded by corporations. Her conclusions are obviously worthless.\"",
    whyItMisleads:
      "It substitutes an emotionally charged judgment about a person for an actual evaluation of their evidence. The audience feels the argument has been answered when nothing about its logic or data has been addressed. Even if the personal claim is true, the original argument may still be sound.",
    howToCounter:
      "Separate the messenger from the message. Acknowledge the personal point if it is true and relevant, then redirect: \"Their funding may be worth scrutinizing, but it doesn't tell us whether their data is wrong — let's look at the data.\" If a real conflict of interest exists, treat it as a reason to verify the claims independently, not as a substitute for doing so.",
    relatedFallacies: ["straw-man", "whataboutism", "appeal-to-emotion"],
    relatedTopicIds: ["climate-change", "media-bias-democracy", "billionaire-wealth"],
  },
  {
    slug: "straw-man",
    name: "Straw Man",
    aliases: ["Strawman", "Misrepresentation", "Aunt Sally"],
    shortDefinition:
      "Refuting a distorted, exaggerated, or oversimplified version of an opponent's argument rather than what they actually claimed.",
    longDescription:
      "A straw man fallacy replaces an opponent's real position with a weaker, easier-to-attack caricature — the \"straw man\" — and then knocks that down as though it defeated the original. The misrepresentation might exaggerate the claim, take it to an absurd extreme, omit crucial qualifications, or respond to the most extreme person on the other side rather than the one actually present.\n\nStraw-manning is seductive because the distorted version really is easier to refute, and an audience that doesn't know the original argument may not notice the swap. It feels like winning, but it leaves the actual disagreement untouched. The opponent's genuine reasoning is still standing.\n\nThe direct antidote is steel-manning: deliberately stating the opposing argument in its strongest, most charitable form before responding — strong enough that a proponent would say \"yes, that's exactly what I mean.\" This is a founding principle of structured argumentation, because you have not really refuted a position until you have defeated its best version, not its worst.",
    example:
      "Person A: \"I think we should have stronger background checks for firearm purchases.\" Person B: \"So you want to confiscate everyone's guns and leave law-abiding citizens defenseless? That's outrageous.\"",
    whyItMisleads:
      "By the time the distorted version is demolished, the audience has the impression the real argument has been answered. The substitution often happens fast and emotionally, so listeners conflate the caricature with the genuine claim and never notice that the original was never engaged.",
    howToCounter:
      "Restate your actual position clearly and flag the distortion: \"That's not what I argued. I said X, not Y.\" Insist that any rebuttal address your real claim. As a positive practice, steel-man the other side first — articulating their strongest case ensures you are arguing against a real position, not a convenient one.",
    relatedFallacies: ["ad-hominem", "false-dilemma", "no-true-scotsman"],
    relatedTopicIds: ["gun-control-effectiveness", "cancel-culture", "immigration-wage-impact"],
  },
  {
    slug: "false-dilemma",
    name: "False Dilemma",
    aliases: ["False Dichotomy", "Either/Or Fallacy", "Black-and-White Thinking", "Bifurcation"],
    shortDefinition:
      "Presenting only two options as if they were the only possibilities, when in fact more alternatives exist.",
    longDescription:
      "A false dilemma frames a situation as an exclusive choice between two outcomes — usually one obviously bad and one favored — while quietly suppressing the middle ground and other alternatives. \"Either we do X, or disaster follows.\" The rhetorical force comes from making the favored option look inevitable by eliminating everything else from view.\n\nGenuine dilemmas do exist: sometimes there really are only two options. The fallacy lies in asserting a two-way split when the real space of choices is richer. Most policy questions, in particular, admit of degrees, combinations, phased approaches, and compromises that an either/or framing erases.\n\nFalse dilemmas frequently hide inside slogans and ultimatums — \"you're either with us or against us.\" They short-circuit deliberation by making nuance feel like evasion. The corrective is to ask, explicitly, whether the two stated options actually exhaust the possibilities, and to name the alternatives that the framing left out.",
    example:
      "\"Either we ban this technology entirely, or we accept that it will destroy society. There's no middle path.\" (In reality, regulation, phased rollout, and targeted restrictions are all available.)",
    whyItMisleads:
      "By artificially narrowing the choice set, it manufactures a sense of inevitability around the speaker's preferred option. The audience accepts a forced choice without noticing that the menu was rigged, and reasonable third options never get considered.",
    howToCounter:
      "Reject the framing by naming a third option: \"Those aren't the only two choices — we could also do Z.\" Ask whether the two alternatives are genuinely exhaustive and mutually exclusive. Most real-world questions sit on a spectrum, so look for the suppressed middle.",
    relatedFallacies: ["slippery-slope", "straw-man", "motte-and-bailey"],
    relatedTopicIds: ["ai-risk", "nuclear-energy-safety", "drug-decriminalization"],
  },
  {
    slug: "slippery-slope",
    name: "Slippery Slope",
    aliases: ["Domino Fallacy", "Camel's Nose", "Thin End of the Wedge"],
    shortDefinition:
      "Claiming that a relatively small first step will inevitably lead to a chain of extreme consequences, without justifying the inevitability.",
    longDescription:
      "A slippery slope argument asserts that taking step A will set off an unstoppable chain — B, then C, then some catastrophic Z — and therefore A must be rejected. The fallacy is not in noticing that actions have consequences; it is in treating the catastrophic end-state as inevitable while skipping the work of showing that each link in the chain actually follows from the one before it.\n\nSlippery slopes are not always fallacious. If you can demonstrate a real mechanism — a legal precedent that genuinely compels the next ruling, an incentive structure that reliably produces the next step — then the argument is empirical and can be evaluated. The fallacy is the unsupported version: vivid imagined consequences presented as a foregone conclusion.\n\nThe persuasive power comes from fear and from the ease of imagining a dramatic outcome. A single frightening end-state, painted in concrete detail, can outweigh a careful assessment of how probable each intermediate step really is.",
    example:
      "\"If we allow physician-assisted dying for the terminally ill, soon we'll be euthanizing the disabled, then the elderly, and eventually anyone society deems inconvenient.\"",
    whyItMisleads:
      "It borrows the certainty of the dramatic end-state and applies it to the modest first step, even though the connecting links are asserted rather than demonstrated. Fear of the extreme outcome discourages people from asking how likely each link in the chain actually is.",
    howToCounter:
      "Ask for the mechanism: \"What specifically forces step B to follow from step A?\" Examine each link separately and assign it a realistic probability rather than accepting the chain wholesale. Point to cases where the first step was taken without the predicted cascade occurring.",
    relatedFallacies: ["false-dilemma", "appeal-to-emotion", "hasty-generalization"],
    relatedTopicIds: ["drug-decriminalization", "gun-control-effectiveness", "ai-risk"],
  },
  {
    slug: "appeal-to-authority",
    name: "Appeal to Authority",
    aliases: ["Argumentum ad Verecundiam", "Appeal to Expertise (misused)"],
    shortDefinition:
      "Treating a claim as true merely because an authority figure endorses it, rather than because of the evidence.",
    longDescription:
      "An appeal to authority fallacy treats the endorsement of an authority as proof of a claim, rather than as one input to be weighed. The structure is: authority A says X; therefore X is true. The trouble is that authorities can be wrong, can speak outside their field of expertise, can disagree with other authorities, or can be cited selectively.\n\nThis is one of the most misunderstood fallacies, because deferring to relevant expertise is usually reasonable. If a consensus of qualified climatologists describes the climate, that is strong evidence — not because authority is magic, but because it is a proxy for an enormous body of evidence those experts have examined. The fallacy is the misuse: citing an authority outside their domain (a famous physicist on nutrition), citing a lone dissenter against a strong consensus, or treating any expert pronouncement as beyond question.\n\nThe key distinction is between expertise as evidence and expertise as proof. A well-placed authority raises the probability that a claim is correct; it does not settle the matter, and it never substitutes for the underlying evidence when that evidence is available for examination.",
    example:
      "\"A Nobel Prize-winning chemist says this supplement cures cancer, so it must work.\" (The chemist's Nobel was in an unrelated field, and no clinical trials support the claim.)",
    whyItMisleads:
      "It exploits our well-founded habit of trusting experts, but applies it where it doesn't belong — outside the expert's domain, against a stronger consensus, or in place of available evidence. The prestige of the name papers over the absence of an actual argument.",
    howToCounter:
      "Ask whether the authority is speaking within their genuine area of expertise, whether they represent a consensus or an outlier, and — crucially — what the underlying evidence is. A legitimate expert can usually point you to the evidence; treat the citation as a starting point for inquiry, not the end of it.",
    relatedFallacies: ["bandwagon", "appeal-to-emotion", "ad-hominem"],
    relatedTopicIds: ["climate-change", "lab-leak-theory", "seed-oils-health"],
  },
  {
    slug: "appeal-to-emotion",
    name: "Appeal to Emotion",
    aliases: ["Argumentum ad Passiones", "Emotional Manipulation", "Appeal to Fear/Pity"],
    shortDefinition:
      "Manipulating emotions — fear, pity, anger, pride — to win agreement in place of presenting evidence or sound reasoning.",
    longDescription:
      "An appeal to emotion substitutes feeling for argument. Instead of offering reasons a claim is true, it arouses an emotional state — fear, pity, outrage, hope, tribal loyalty — and lets that feeling carry the conclusion. The conclusion may even be correct, but the emotional charge is doing the persuasive work that evidence should be doing.\n\nEmotions are not the enemy of reason. They can be appropriate responses to facts, and a vivid story can rightly motivate us to attend to a real problem. The fallacy is specifically using emotion as a substitute for justification — when the feeling is meant to make you stop asking whether the claim is actually supported.\n\nCommon subtypes include appeals to fear (\"if you don't act, catastrophe\"), pity (\"think of the suffering this would cause\"), and flattery or spite. Each works by raising the emotional stakes so high that calmly weighing the evidence starts to feel cold or disloyal.",
    example:
      "\"How can you support cutting this program when you look into the eyes of these suffering children? Anyone with a heart would vote to fund it.\" (No evidence is offered that the program is effective.)",
    whyItMisleads:
      "Strong emotion narrows attention and creates urgency, making careful evaluation feel inappropriate or heartless. The audience experiences the intensity of the feeling as if it were the strength of the argument, and the absence of evidence goes unnoticed.",
    howToCounter:
      "Acknowledge the emotion as legitimate, then separate it from the logical question: \"I share that concern — and precisely because the stakes are high, we need to ask whether this proposal actually works.\" Restate the claim in neutral terms and ask what evidence supports it.",
    relatedFallacies: ["appeal-to-authority", "slippery-slope", "bandwagon"],
    relatedTopicIds: ["death-penalty-deterrence", "social-media-mental-health", "drug-decriminalization"],
  },
  {
    slug: "hasty-generalization",
    name: "Hasty Generalization",
    aliases: ["Overgeneralization", "Insufficient Sample", "Jumping to Conclusions", "Anecdotal Fallacy"],
    shortDefinition:
      "Drawing a broad conclusion from a sample that is too small, biased, or unrepresentative to support it.",
    longDescription:
      "A hasty generalization infers a general rule from too little evidence — a handful of cases, a personal anecdote, or an unrepresentative slice of a population — and then applies that rule confidently to the whole. \"I met two rude people from that city, so people there are rude.\" The reasoning pattern of generalizing from instances is valid in principle; the fallacy is doing it on a sample that cannot bear the weight.\n\nWhat counts as \"enough\" depends on the variability of what is being measured and how the sample was gathered. A small but truly random sample can support modest conclusions; a large but skewed one can mislead badly. The fallacy often pairs with the anecdotal version, where a single vivid story is treated as more telling than aggregate data.\n\nHasty generalizations are everywhere because human cognition is built to find patterns quickly, and a striking individual case is more memorable than a dry statistic. Resisting them requires asking how representative the evidence really is before extending it to the general case.",
    example:
      "\"My grandfather smoked a pack a day and lived to ninety-five, so the warnings about smoking are clearly overblown.\"",
    whyItMisleads:
      "A vivid individual case feels concrete and convincing, while the statistical reality (averages, distributions, base rates) feels abstract. The mind generalizes from the memorable example and ignores how small or skewed the sample is.",
    howToCounter:
      "Ask about sample size and selection: \"How many cases is that based on, and how were they chosen?\" Distinguish anecdote from data, and look for aggregate evidence — large, representative samples — before accepting a sweeping conclusion. One exception does not overturn a well-established trend.",
    relatedFallacies: ["survivorship-bias", "false-cause", "appeal-to-emotion"],
    relatedTopicIds: ["minimum-wage-effects", "immigration-wage-impact", "seed-oils-health"],
  },
  {
    slug: "circular-reasoning",
    name: "Circular Reasoning",
    aliases: ["Begging the Question", "Petitio Principii", "Circular Argument"],
    shortDefinition:
      "Assuming the conclusion within the premises, so the argument's support depends on the very thing it claims to prove.",
    longDescription:
      "Circular reasoning occurs when an argument's premises already presuppose its conclusion, so the argument only \"works\" if you already accept what it is supposed to establish. \"This policy is the right one because it's what a wise society would do, and a wise society does the right thing.\" The conclusion is quietly smuggled into the support, so nothing independent is actually offered.\n\nThe circle can be tight and obvious (\"X is true because X is true\") or large enough to hide the loop across several sentences, where the conclusion is restated in different words and used as a premise. The longer the chain, the easier it is to miss that it eventually feeds back on itself.\n\n\"Begging the question\" is the classical name for this, often misused in everyday speech to mean \"raises the question.\" In its precise sense it means assuming the very point at issue. The remedy is to check whether any premise would be accepted by someone who did not already believe the conclusion — if not, the argument is circular.",
    example:
      "\"We know the testimony is reliable because it comes from a trustworthy witness — and we know the witness is trustworthy because their testimony has always been reliable.\"",
    whyItMisleads:
      "When the loop is spread across several plausible-sounding statements, the restatement of the conclusion can pass for independent support. The argument feels complete because every step is internally consistent, even though it never connects to anything outside itself.",
    howToCounter:
      "Trace each premise back and ask: would someone who doubts the conclusion accept this premise on its own? If the only reason to accept a premise is that you already accept the conclusion, the argument is circular. Demand at least one premise grounded in independent evidence.",
    relatedFallacies: ["motte-and-bailey", "no-true-scotsman", "false-cause"],
    relatedTopicIds: ["free-will", "meritocracy-myth", "moon-landing"],
  },
  {
    slug: "false-cause",
    name: "False Cause",
    aliases: ["Post Hoc Ergo Propter Hoc", "Post Hoc", "Correlation Implies Causation", "Cum Hoc Ergo Propter Hoc"],
    shortDefinition:
      "Inferring that one thing caused another simply because they are correlated or because one followed the other in time.",
    longDescription:
      "The false cause fallacy treats correlation, or mere sequence in time, as if it established causation. Its classic form, post hoc ergo propter hoc (\"after this, therefore because of this\"), reasons that because B happened after A, A must have caused B. But two things can move together for many reasons: coincidence, a shared common cause, reverse causation, or a confounding variable that drives both.\n\nEstablishing genuine causation is hard. It generally requires more than a correlation — a plausible mechanism, the right temporal order, dose-response relationships, and ideally controlled experiments that rule out alternative explanations. The fallacy skips all of this and leaps from \"these occur together\" to \"this causes that.\"\n\nFalse cause is especially common in health, economics, and policy, where outcomes have many interacting causes and randomized experiments are often impossible. The discipline it demands is to ask, every time a causal claim is made: what else could explain this association, and has that been ruled out?",
    example:
      "\"Ice cream sales and drowning deaths rise and fall together, so eating ice cream must cause drowning.\" (Both are driven by a third factor: hot summer weather.)",
    whyItMisleads:
      "The human mind is primed to read sequences and co-occurrences as cause and effect; a compelling story linking A to B feels explanatory. The fallacy exploits this by presenting an association as though the harder work of ruling out confounders and reverse causation had already been done.",
    howToCounter:
      "Ask whether there could be a common cause, reverse causation, or coincidence behind the correlation. Look for a plausible mechanism and, where possible, controlled or natural experiments. Remember the slogan and its limits: correlation is evidence of a relationship, but not proof of which way it runs.",
    relatedFallacies: ["hasty-generalization", "survivorship-bias", "circular-reasoning"],
    relatedTopicIds: ["minimum-wage-effects", "social-media-mental-health", "rent-control-effectiveness"],
  },
  {
    slug: "bandwagon",
    name: "Bandwagon Fallacy",
    aliases: ["Appeal to Popularity", "Argumentum ad Populum", "Appeal to the Majority"],
    shortDefinition:
      "Concluding that a claim is true, or an action right, simply because many people believe it or do it.",
    longDescription:
      "The bandwagon fallacy treats popularity as evidence of truth: \"everyone believes X, so X must be true,\" or \"most people are doing it, so it must be right.\" But the number of people who hold a belief is, by itself, no guarantee of its accuracy. Majorities have been confidently and catastrophically wrong throughout history, and truth is not decided by vote.\n\nThere are limited cases where widespread agreement is mild evidence — when the many people are independently informed, as in the \"wisdom of crowds.\" But that only works when judgments are independent and the crowd has relevant information. The fallacy ignores those conditions and treats sheer numbers, or social momentum, as decisive.\n\nThe pull of the bandwagon is social rather than logical: humans are deeply influenced by what those around them believe, and dissent carries a real social cost. Recognizing the fallacy means noticing when \"lots of people think so\" is being offered in place of a reason to think so.",
    example:
      "\"Millions of people can't be wrong — this investment is surging in popularity, so it's obviously a smart place to put your savings.\"",
    whyItMisleads:
      "Social proof is a powerful and usually useful heuristic, so widespread agreement intuitively feels like validation. The fallacy borrows that intuitive force and applies it to the truth of a claim, where popularity is irrelevant unless the believers are independently informed.",
    howToCounter:
      "Separate popularity from justification: \"It may well be popular — but what's the actual evidence it's correct?\" Ask whether the believers reached their view independently or by copying one another. Point to historical cases where the majority view turned out to be wrong.",
    relatedFallacies: ["appeal-to-authority", "appeal-to-emotion", "survivorship-bias"],
    relatedTopicIds: ["cryptocurrency-value", "social-media-mental-health", "cancel-culture"],
  },
  {
    slug: "no-true-scotsman",
    name: "No True Scotsman",
    aliases: ["Appeal to Purity", "Ad Hoc Rescue"],
    shortDefinition:
      "Defending a generalization against a counterexample by arbitrarily redefining the category to exclude it.",
    longDescription:
      "The no true Scotsman fallacy protects a universal claim from refutation by redefining its terms whenever a counterexample appears. The canonical exchange: \"No Scotsman puts sugar on his porridge.\" \"But my uncle Angus is a Scotsman and he does.\" \"Well, no true Scotsman puts sugar on his porridge.\" The word \"true\" is added purely to push out the inconvenient example, making the claim unfalsifiable.\n\nThe move works by treating a descriptive category as if it had a hidden purity test that just happens to exclude any counterexample. This is an ad hoc rescue: rather than revising the generalization in light of evidence, the arguer revises the definition to keep the generalization intact.\n\nThe fallacy is not the same as legitimately clarifying a definition. If \"vegetarian\" genuinely excludes meat-eaters, pointing that out is fair. The fallacy is specifically the retroactive, unmotivated narrowing introduced only to dodge a counterexample — a definition that shifts to win the argument rather than to describe reality.",
    example:
      "\"No genuine supporter of free speech would ever want that speaker platformed.\" \"But this lifelong free-speech advocate does.\" \"Then they're not a genuine supporter of free speech.\"",
    whyItMisleads:
      "Because the redefinition is dressed up as a clarification, it sounds like the arguer is merely being precise. In fact the category is being silently rewritten to be unfalsifiable, so no counterexample can ever count against the claim.",
    howToCounter:
      "Watch for definitions that shift the moment a counterexample appears. Ask whether the criterion was part of the original claim or added afterward to exclude the example. Pin down the definition before discussing counterexamples, and reject purity clauses that exist only to dodge refutation.",
    relatedFallacies: ["circular-reasoning", "motte-and-bailey", "straw-man"],
    relatedTopicIds: ["cancel-culture", "meritocracy-myth", "media-bias-democracy"],
  },
  {
    slug: "whataboutism",
    name: "Whataboutism",
    aliases: ["Tu Quoque", "Appeal to Hypocrisy", "Two Wrongs Make a Right"],
    shortDefinition:
      "Deflecting criticism by pointing to someone else's wrongdoing instead of addressing the issue raised.",
    longDescription:
      "Whataboutism (a form of the tu quoque, or \"you too,\" fallacy) answers a criticism not by addressing it but by raising a counter-accusation: \"What about the time you did the same thing?\" The implication is that the original criticism can be dismissed because the critic, or the critic's side, is also guilty. But one party's hypocrisy does not make the other party's conduct acceptable, nor does it answer the substantive point.\n\nThe move has two effects. It changes the subject, shifting attention away from the issue at hand toward the accuser. And it implies that being a flawed messenger disqualifies the message — a close cousin of the ad hominem. Both effects leave the original criticism unaddressed.\n\nPointing out inconsistency can be legitimate — for example, to argue that a rule should be applied evenhandedly. The fallacy is using the counter-accusation to evade the original point entirely, as if two wrongs settled the matter. The discipline is to handle each charge on its own merits rather than letting one cancel the other.",
    example:
      "\"You're criticizing our country's record on press freedom? What about the surveillance scandals in your country? You have no standing to lecture anyone.\"",
    whyItMisleads:
      "It exploits our sense of fairness — \"who are you to talk?\" feels like a legitimate objection — while quietly dropping the original issue. The audience's attention moves to the new accusation, and the first criticism is never actually answered.",
    howToCounter:
      "Acknowledge that the counter-accusation can be examined separately, then return to the point: \"That may also be worth discussing, but it doesn't address the issue I raised — let's finish this one first.\" Insist that each charge stand or fall on its own evidence.",
    relatedFallacies: ["ad-hominem", "appeal-to-emotion", "straw-man"],
    relatedTopicIds: ["media-bias-democracy", "cancel-culture", "billionaire-wealth"],
  },
  {
    slug: "motte-and-bailey",
    name: "Motte and Bailey",
    aliases: ["Bait and Switch Argument", "Equivocation by Retreat"],
    shortDefinition:
      "Defending a controversial claim by retreating to a similar but much weaker claim when challenged, then quietly returning to the strong one.",
    longDescription:
      "The motte-and-bailey fallacy is named after a medieval castle design: a fortified tower (the motte) protecting a valuable but vulnerable courtyard (the bailey). In argument, the \"bailey\" is a bold, controversial claim the arguer really wants to advance; the \"motte\" is a modest, easily defended claim that sounds similar. When the bold claim is attacked, the arguer retreats to defending the modest one — \"I only meant the obvious version\" — and once the challenge passes, slides back to asserting the bold version as though it had been established.\n\nThe trick depends on the two claims sharing enough language to be conflated, while differing sharply in strength. Critics find themselves attacking the bold claim only to be told they have misunderstood; supporters experience the modest claim's defensibility as if it vindicated the bold one.\n\nThe fallacy is a form of equivocation strung across a conversation. Exposing it requires holding the arguer to a single, stable claim: which version are you actually defending, and does the evidence support that one — not a weaker substitute?",
    example:
      "Bold claim (bailey): \"Science is just a social construction, no more objective than any other belief system.\" Challenged, the arguer retreats to the motte: \"I only mean that scientists are human and influenced by their culture\" — then later reasserts the strong relativist claim.",
    whyItMisleads:
      "The two claims wear the same words, so the defensibility of the weak version seems to transfer to the strong one. Opponents are made to feel they have misread the argument, while the controversial claim survives untouched by retreating to safe ground whenever pressed.",
    howToCounter:
      "Pin the claim down: \"Are you defending the strong version or the weak one? They're different, and they need different evidence.\" Refuse to let a retreat to the modest claim count as a defense of the bold one. Quote the original strong wording and ask whether the evidence supports that.",
    relatedFallacies: ["circular-reasoning", "no-true-scotsman", "false-dilemma"],
    relatedTopicIds: ["free-will", "meritocracy-myth", "cancel-culture"],
  },
  {
    slug: "gish-gallop",
    name: "Gish Gallop",
    aliases: ["Spreading", "Argument by Volume", "Snow Job"],
    shortDefinition:
      "Overwhelming an opponent with a rapid flood of many weak or dubious claims, more than can possibly be answered in the time available.",
    longDescription:
      "The Gish gallop is a debate tactic rather than a single logical error: it wins by quantity rather than quality. The galloper rattles off a long string of claims, half-truths, and misleading points in quick succession. Each one might take minutes to properly debunk, but they can be asserted in seconds, so the opponent cannot possibly address them all. Whatever is left unanswered is then presented as conceded.\n\nThe technique exploits an asymmetry sometimes called Brandolini's law: the effort required to refute nonsense is far greater than the effort required to produce it. By front-loading the volume, the galloper shifts an impossible burden onto the responder and counts on the audience to mistake an unanswered claim for a true one.\n\nBecause the individual claims are often unrelated, the gallop also resists tidy rebuttal. The honest response is not to try to chase every point but to expose the tactic itself, pick the most load-bearing claims, and refute those decisively while noting that volume is not the same as validity.",
    example:
      "In a debate, one participant fires off fifteen separate statistics, studies, and anecdotes in two minutes; their opponent can only rebut three before time runs out, and the galloper declares the other twelve \"unrefuted.\"",
    whyItMisleads:
      "An audience tends to assume that a claim left unanswered must be sound, and that someone with \"so many points\" must have a strong case. The sheer quantity creates an illusion of evidential weight, while the difficulty of refuting each point in real time hides how weak the individual claims are.",
    howToCounter:
      "Name the tactic and refuse the impossible burden: \"That's a flood of claims, not an argument. Let's take the strongest one and examine it carefully.\" Pick a few load-bearing points, debunk them thoroughly, and note that an unanswered claim is not a true claim — quantity is not quality.",
    relatedFallacies: ["hasty-generalization", "appeal-to-authority", "false-cause"],
    relatedTopicIds: ["climate-change", "moon-landing", "lab-leak-theory"],
  },
  {
    slug: "survivorship-bias",
    name: "Survivorship Bias",
    aliases: ["Survival Bias", "Selection Bias (survivor form)"],
    shortDefinition:
      "Drawing conclusions only from the cases that \"survived\" a selection process, while ignoring the failures that were filtered out and never seen.",
    longDescription:
      "Survivorship bias is a form of selection bias in which we analyze only the examples that made it through some filter — the successes, the survivors, the visible cases — and overlook the ones that didn't, because they have dropped out of view. The classic illustration: in World War II, analysts wanted to add armor to the bullet-hole-riddled areas of returning planes, until statistician Abraham Wald pointed out that the planes hit in those areas had survived; the armor belonged where the returning planes were not hit, because planes struck there never came back.\n\nThe bias is insidious because the missing data is, by definition, missing. We see thriving companies, successful college dropouts, and lasting old buildings, and we generalize from them without accounting for the far larger pool of failed companies, struggling dropouts, and demolished buildings that left no trace in our sample.\n\nAvoiding it requires deliberately asking: what is the full population here, including the cases that didn't survive? Conclusions drawn only from survivors can be exactly backwards, as Wald's planes show.",
    example:
      "\"Several billionaires dropped out of college, so dropping out is a smart bet for ambitious people.\" (This ignores the vastly larger number of dropouts who did not become billionaires.)",
    whyItMisleads:
      "The survivors are visible and the failures are invisible, so the sample looks complete when it is badly skewed. The mind generalizes from the cases in front of it without registering that an entire category of outcomes has been silently filtered out.",
    howToCounter:
      "Ask what got filtered out: \"What about the cases that didn't survive — where are they in this analysis?\" Seek out the full population, including failures, before generalizing. When data comes only from survivors, treat any conclusion as provisional until the missing cases are accounted for.",
    relatedFallacies: ["hasty-generalization", "false-cause", "bandwagon"],
    relatedTopicIds: ["cryptocurrency-value", "college-value-proposition", "meritocracy-myth"],
  },
  {
    slug: "cherry-picking",
    name: "Cherry-Picking",
    aliases: ["Suppressed Evidence", "Selective Evidence", "Card Stacking", "Fallacy of Incomplete Evidence"],
    shortDefinition:
      "Citing only the evidence that supports your conclusion while ignoring the larger body of evidence that points the other way.",
    longDescription:
      "Cherry-picking is the selective use of evidence: you present the data points, studies, or anecdotes that favor your position and quietly omit the ones that don't. Unlike outright lying, every individual fact you cite may be true — the deception is in what you leave out. A claim can be perfectly sourced and still be radically misleading if it represents 5% of the evidence and contradicts the other 95%.\n\nIt is especially dangerous because it exploits a real intuition: evidence matters. When someone produces a study, a chart, or a striking example, it feels like they are arguing in good faith. But a single study is rarely the story — fields advance by the weight of many studies, and any large literature will contain outliers that, pulled out of context, can be made to support almost anything.\n\nThe antidote is to insist on the totality of the evidence. The question is never \"is there a study that shows X?\" — there almost always is — but \"what does the full body of evidence, weighted by quality, actually show?\" This is precisely why structured analysis weighs all the evidence on a question rather than collecting points for one side.",
    example:
      "\"It snowed heavily this winter, so global warming is clearly a hoax.\" (One cold local event is offered while the decades-long global temperature trend — the actual evidence — is ignored.)",
    whyItMisleads:
      "Because each cited fact is genuine, the audience extends good faith and assumes the sample is representative. They never see the contradicting evidence that was filtered out, so a fringe position can be dressed up to look like the mainstream one — or vice versa.",
    howToCounter:
      "Ask: \"Is that the whole picture, or the part that supports your case?\" Shift from individual studies to the weight of evidence: systematic reviews, meta-analyses, and the consensus of the literature. When someone leads with one striking data point, ask what the rest of the data says.",
    relatedFallacies: ["hasty-generalization", "false-cause", "survivorship-bias"],
    relatedTopicIds: ["climate-change", "seed-oils-health", "gmo-crops-safety"],
  },
  {
    slug: "moving-the-goalposts",
    name: "Moving the Goalposts",
    aliases: ["Goalpost Shifting", "Raising the Bar", "Shifting the Standard"],
    shortDefinition:
      "Demanding ever more or different evidence each time your previous demand is met, so the standard of proof can never actually be satisfied.",
    longDescription:
      "Moving the goalposts is a fallacy of shifting standards. Someone asks for a certain kind of evidence; when it is provided, instead of accepting the point, they raise or change the requirement — and they keep doing it, so no possible evidence could ever count as enough. The metaphor is a football field where the goal is dragged backward every time the ball gets close.\n\nWhat makes it slippery is that asking for better evidence is usually legitimate. Standards of proof are real and important. The fallacy is not in having a high bar; it is in having a bar that moves — in treating each satisfied demand not as progress but as the cue to invent a new one. The underlying tell is that the person could not, if asked, name a fixed amount of evidence that would actually change their mind.\n\nThis is the mirror image of a healthy practice: stating in advance what would convince you. A good-faith skeptic can specify the crux — the finding that would settle it. Someone moving the goalposts cannot, because their conclusion is fixed and the demands are just a way to defend it.",
    example:
      "\"Show me one peer-reviewed study.\" (Shown one.) \"Well, one study means nothing — show me a meta-analysis.\" (Shown one.) \"That journal is biased. Show me one from a source I trust.\" — and so on, indefinitely.",
    whyItMisleads:
      "Each individual request sounds reasonable, so the person demanding evidence appears rigorous rather than evasive. The audience doesn't notice that the standard itself is sliding, and the arguer providing evidence is made to look as though they keep failing to meet a fair bar.",
    howToCounter:
      "Pin the standard down before producing evidence: \"What specific evidence would change your mind?\" Get the crux on the record. If the answer keeps changing after each demand is met, name it plainly — the goalpost has moved, and the disagreement is no longer about evidence.",
    relatedFallacies: ["no-true-scotsman", "ad-hominem", "gish-gallop"],
    relatedTopicIds: ["lab-leak-theory", "climate-change", "vaccine-mandates"],
  },
  {
    slug: "appeal-to-nature",
    name: "Appeal to Nature",
    aliases: ["Natural Is Better", "Naturalistic Appeal"],
    shortDefinition:
      "Assuming that because something is \"natural\" it must be good, safe, or better — and that anything \"unnatural\" or synthetic is therefore bad.",
    longDescription:
      "An appeal to nature treats the label \"natural\" as if it settled a question of value or safety. The structure is: X is natural, therefore X is good (or: Y is artificial, therefore Y is harmful). But \"natural\" and \"good\" are simply different categories, and one does not follow from the other.\n\nThe natural world is full of things that will kill you — arsenic, hemlock, botulinum toxin, radiation, most snake venoms — while many of the safest, most beneficial things humans use (purified water, vaccines, refined medicines) are products of deliberate engineering. \"Natural\" also turns out to be a remarkably slippery word: almost all the food we eat has been radically reshaped by millennia of selective breeding, which is no more \"natural\" than a lab.\n\nThe fallacy is powerful in marketing and health debates precisely because \"natural\" carries warm, safe connotations. But the only thing that tells you whether something is safe or beneficial is evidence about that specific thing and that specific outcome — not which side of an arbitrary natural/artificial line it falls on.",
    example:
      "\"Organic produce must be healthier because it's natural, and GMOs must be risky because they're engineered in a lab.\" (Whether either is true depends on evidence about nutrition and safety, not on the word \"natural.\")",
    whyItMisleads:
      "It swaps an emotionally loaded label for an empirical question. \"Natural\" feels safe and \"synthetic\" feels suspect, so the audience accepts a conclusion about safety or value without anyone presenting evidence about the actual outcome in question.",
    howToCounter:
      "Drop the label and ask for the outcome: \"Safe or harmful compared to what, measured how?\" Point out that plenty of natural things are dangerous and plenty of engineered things are safe — then look at the specific evidence on the specific claim.",
    relatedFallacies: ["bandwagon", "appeal-to-emotion", "false-dilemma"],
    relatedTopicIds: ["gmo-crops-safety", "organic-food-health", "seed-oils-health"],
  },
];

export function getFallacyBySlug(slug: string): Fallacy | undefined {
  return fallacies.find((f) => f.slug === slug);
}

export function getAllFallacySlugs(): readonly string[] {
  return fallacies.map((f) => f.slug);
}
