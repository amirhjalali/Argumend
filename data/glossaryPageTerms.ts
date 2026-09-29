/**
 * Long-form glossary entries rendered on the /glossary page.
 *
 * Kept in its own module (rather than alongside the inline tooltip glossary in
 * `data/glossaryTerms.ts`) so the ~30KB of prose below never rides along into
 * the client bundle via <GlossaryTerm>, which only needs the tooltip lookup.
 */

/**
 * Category taxonomy for the long-form glossary entries. Distinct from the
 * inline tooltip glossary: these are the /glossary entries. Since 2026-09-29
 * the page lists them A to Z (lib/learn/glossary.ts), so the category is
 * editorial metadata only.
 */
export type GlossaryCategory = "core" | "reasoning" | "fallacies" | "methodology";

export interface GlossaryPageTerm {
  term: string;
  definition: string;
  example?: string;
  exampleHref?: string;
  learnMoreHref?: string;
  learnMoreText?: string;
  category: GlossaryCategory;
}

/**
 * Stable anchor slug for a page term (`#confidence-score`). Kept byte-identical
 * to the transform the page and its JSON-LD have always used, so existing deep
 * links (including `#correlation-vs.-causation`) keep resolving.
 */
export function glossaryTermId(term: string): string {
  return term.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "");
}

/** Long-form glossary entries rendered on /glossary. */
export const glossaryPageTerms: GlossaryPageTerm[] = [
  // Core Concepts
  {
    term: "Argument Mapping",
    definition:
      "A visual method of structuring the premises, evidence, and conclusions of a debate to reveal its logical structure. Unlike linear debate, argument maps make it possible to see the full landscape of a disagreement at once.",
    example: "See this in action on our Nuclear Energy map",
    exampleHref: "/topics/nuclear-energy-safety",
    learnMoreHref: "/about#read-a-map",
    learnMoreText: "How Argumend maps arguments",
    category: "core",
  },
  {
    term: "Steel-Manning",
    definition:
      "Presenting the strongest possible version of an opponent's argument before responding to it, the opposite of straw-manning. Steel-manning forces genuine engagement with the best version of each position and prevents dismissing views you haven't truly understood.",
    example: "See steel-manned positions on our Climate Change map",
    exampleHref: "/topics/climate-change",
    learnMoreHref: "/blog/why-steel-manning-makes-you-smarter",
    learnMoreText: "Why steel-manning makes you smarter",
    category: "core",
  },
  {
    term: "Crux",
    definition:
      "The single most decisive question or piece of evidence that, if resolved, would change one side's position on a debate. Identifying the crux transforms abstract debates into concrete, answerable questions.",
    example: "See crux questions on our Moon Landing map",
    exampleHref: "/topics/moon-landing",
    learnMoreHref: "/concepts/cruxes",
    learnMoreText: "Understanding cruxes",
    category: "core",
  },
  {
    term: "Balance and Weight",
    definition:
      "The two readings behind a map's description of its evidence. Balance (0-100) shows which way the weighed evidence tips: 50 is even, above 50 favors the claim, below 50 the counterclaim. Weight shows how much good evidence there is, combining how much there is, how good the sources are, and how testable the cruxes are. Read together they give the plain-language reading a map shows: a lot of evidence mostly pointing one way means it largely converges; a lot of evidence pointing both ways means it is still divided; little evidence means it is still thin, an open question whatever the lean. Neither number is the probability that a claim is true, and neither names a winner.",
    example: "See the reading on the Nuclear Energy map",
    exampleHref: "/topics/nuclear-energy-safety",
    learnMoreHref: "/concepts/confidence-calibration",
    learnMoreText: "How balance and weight work",
    category: "core",
  },
  {
    term: "Meta-Claim",
    definition:
      "The central thesis or proposition that a topic's argument map is structured around. Every pillar, piece of evidence, and crux question ultimately relates back to whether this core claim holds up under scrutiny.",
    example: "See the meta-claim on the AI Job Displacement map",
    exampleHref: "/topics/ai-job-displacement",
    category: "core",
  },
  {
    term: "Pillar",
    definition:
      "A major axis of disagreement within a debate, containing opposing arguments and a decisive crux. Most Argumend maps are organized into two to five pillars, the most important lines of argument, each with steel-manned positions, weighed evidence, and a crux question.",
    example: "See how pillars structure the COVID Origins map",
    exampleHref: "/topics/lab-leak-theory",
    learnMoreHref: "/concepts/pillars",
    learnMoreText: "Understanding pillars",
    category: "core",
  },
  {
    term: "Skeptic Premise",
    definition:
      "The strongest version of the argument opposing a topic's meta-claim. Each pillar includes a steel-manned skeptic premise that represents the most compelling challenge to the claim, presented fairly and at full strength.",
    example: "See skeptic premises on the Gene Editing map",
    exampleHref: "/topics/gene-editing-embryos",
    category: "core",
  },
  {
    term: "Proponent Rebuttal",
    definition:
      "The strongest response defending a topic's meta-claim against the skeptic's case. Like the skeptic premise, the proponent rebuttal is steel-manned to represent the most compelling defense available.",
    example: "See proponent rebuttals on the Universal Healthcare map",
    exampleHref: "/topics/universal-healthcare",
    category: "core",
  },
  {
    term: "Verification Status",
    definition:
      "Whether a crux has been verified, remains theoretical, or is impossible to test with current methods. 'Verified' means the test has been performed and results are available. 'Theoretical' means the test is possible but hasn't been done. 'Impossible' means the test cannot currently be performed.",
    example: "Compare verification statuses on the Moon Landing map",
    exampleHref: "/topics/moon-landing",
    category: "core",
  },
  // Reasoning Concepts
  {
    term: "Evidence Weighting",
    definition:
      "A systematic method of scoring evidence across dimensions like source reliability, independence, replicability, and directness. Rather than treating all evidence as equal, each item is scored 0-10 on four dimensions, giving a maximum score of 40.",
    example: "See weighted evidence on our AI Regulation map",
    exampleHref: "/topics/ai-regulation",
    learnMoreHref: "/methodology",
    learnMoreText: "Our evidence methodology",
    category: "methodology",
  },
  {
    term: "Bayesian Reasoning",
    definition:
      "Updating the probability of a hypothesis proportionally as new evidence is encountered. Named after Thomas Bayes. Rather than accepting or rejecting claims absolutely, Bayesian reasoning assigns and adjusts probabilities as evidence accumulates.",
    example: "See how evidence accumulates on the Longevity Science map",
    exampleHref: "/topics/longevity-science",
    category: "reasoning",
  },
  {
    term: "Falsifiability",
    definition:
      "Whether a claim rules anything out. A belief only tells you something about the world if some possible observation could prove it wrong — if nothing could, it explains everything and predicts nothing. The honest move is to state, in advance, the evidence that would change your mind.",
    example: "See what would change each side's mind on the Nuclear Energy map",
    exampleHref: "/topics/nuclear-energy-safety",
    learnMoreHref: "/blog/what-would-change-your-mind",
    learnMoreText: "Read: What Would Change Your Mind?",
    category: "reasoning",
  },
  {
    term: "Double Crux",
    definition:
      "A single fact that both sides agree would change their mind. Finding it turns an unwinnable values fight into one shared, answerable question — and usually reveals the real disagreement is far narrower than the argument suggested.",
    example: "See the crux on the Rent Control map",
    exampleHref: "/topics/rent-control-effectiveness",
    learnMoreHref: "/blog/what-would-change-your-mind",
    learnMoreText: "Read: What Would Change Your Mind?",
    category: "reasoning",
  },
  {
    term: "Burden of Proof",
    definition:
      "The obligation to support a claim with evidence. It rests on whoever asserts the claim, not on those who doubt it — so 'you can't prove it's false' is not evidence that it is true. Extraordinary claims require extraordinary evidence, which is why unsupported assertions receive low scores across all evidence dimensions in Argumend's framework.",
    example: "See an unmet burden on the Death Penalty Deterrence map",
    exampleHref: "/topics/death-penalty-deterrence",
    category: "reasoning",
  },
  {
    term: "Confirmation Bias",
    definition:
      "The tendency to search for, interpret, and remember information that confirms pre-existing beliefs while ignoring or downplaying contradictory evidence. The most pervasive cognitive bias in argumentation. Steel-manning is the most direct antidote.",
    example: "See how we counter bias on the Social Media & Elections map",
    exampleHref: "/topics/social-media-elections",
    category: "fallacies",
  },
  {
    term: "Dunning-Kruger Effect",
    definition:
      "A cognitive bias where people with limited knowledge overestimate their competence, while experts underestimate theirs. In debates, this manifests as outsized confidence from those who have read one article versus measured uncertainty from researchers who have spent decades on the question.",
    example: "Explore expert vs. public confidence on the Consciousness map",
    exampleHref: "/topics/consciousness-hard-problem",
    category: "fallacies",
  },
  {
    term: "Base Rate Neglect",
    definition:
      "Ignoring the general probability of an event when evaluating specific evidence. For example, a test that is 99% accurate still produces many false positives if the base rate of the condition is very low. Proper evidence weighting requires considering prior probabilities.",
    example: "See base rates in context on the GLP-1 Weight Loss Drugs map",
    exampleHref: "/topics/glp1-weight-loss-drugs",
    category: "fallacies",
  },
  // Logical Fallacies
  {
    term: "Logical Fallacy",
    definition:
      "An error in reasoning that undermines the logic of an argument, such as ad hominem, straw man, or false dichotomy. Recognizing fallacies is essential for evaluating whether a conclusion actually follows from its premises.",
    example: "See each side's reasoning laid out on the TikTok Ban map",
    exampleHref: "/topics/tiktok-ban",
    category: "fallacies",
  },
  {
    term: "Ad Hominem",
    definition:
      "Attacking the person making an argument rather than addressing the argument itself. 'You're wrong because you're biased' is ad hominem. 'Your argument fails because the evidence contradicts it' is not. The source of an argument is relevant to credibility but doesn't determine validity.",
    example: "See arguments weighed apart from who makes them on the Immigration map",
    exampleHref: "/topics/immigration-border-crisis",
    category: "fallacies",
  },
  {
    term: "Straw Man",
    definition:
      "Misrepresenting someone's argument to make it easier to attack. Instead of engaging with what someone actually said, you substitute a weaker, distorted version. The cure is steel-manning: presenting the strongest version of the opposing view before responding.",
    example: "See steel-manned arguments on the Gun Control map",
    exampleHref: "/topics/gun-control-effectiveness",
    category: "fallacies",
  },
  {
    term: "False Dichotomy",
    definition:
      "Presenting only two options when more exist. 'You're either for us or against us' ignores partial alignment, neutrality, or agreement on some issues and opposition on others. Most real-world questions exist on a spectrum, not a binary.",
    example: "See nuanced positions on the AI in Education map",
    exampleHref: "/topics/ai-in-education",
    category: "fallacies",
  },
  {
    term: "Appeal to Authority",
    definition:
      "Accepting a claim as true solely because an authority figure endorses it, without examining the evidence. Expertise increases the probability that someone is right, but experts can be wrong, biased, or speaking outside their domain. The evidence matters more than who presents it.",
    example: "See how we weigh expert sources on the Microplastics map",
    exampleHref: "/topics/microplastics-health-crisis",
    category: "fallacies",
  },
  {
    term: "Motivated Reasoning",
    definition:
      "Reasoning toward a predetermined conclusion rather than from the evidence — becoming a lawyer for the verdict you want instead of a scientist weighing what's true. Unlike confirmation bias (a passive filter), motivated reasoning is the active construction of arguments for a desired outcome, holding disliked evidence to a higher standard than evidence you welcome.",
    example: "See motivated reasoning confronted on the Gun Control map",
    exampleHref: "/topics/gun-control-effectiveness",
    learnMoreHref: "/guides/understanding-bias",
    learnMoreText: "Read: Understanding bias",
    category: "reasoning",
  },
  {
    term: "Occam's Razor",
    definition:
      "The principle that, among competing explanations that fit the evidence equally well, the one requiring the fewest assumptions is usually the best starting point. It is a heuristic for allocating prior probability, not a proof: simplicity breaks ties and flags explanations that smuggle in unsupported entities, but a simpler theory still loses to a more complex one that better fits the data.",
    example: "Compare competing explanations on the Moon Landing map",
    exampleHref: "/topics/moon-landing",
    category: "reasoning",
  },
  {
    term: "Inference to the Best Explanation",
    definition:
      "Also called abduction: reasoning from a body of observations to the hypothesis that, if true, would best account for them. The strength of the inference depends on how decisively the leading explanation beats its rivals on scope, simplicity, and fit — which is why ruling out alternatives matters as much as supporting your favored account.",
    example: "See abductive reasoning at work on the COVID Origins map",
    exampleHref: "/topics/lab-leak-theory",
    category: "reasoning",
  },
  {
    term: "Anchoring",
    definition:
      "The tendency to rely too heavily on the first piece of information encountered — an opening figure or framing — when making subsequent judgments, even when that anchor is arbitrary. In debates, whoever sets the initial number or reference point disproportionately shapes the whole discussion that follows.",
    example: "See anchoring shape the Rent Control debate",
    exampleHref: "/topics/rent-control-effectiveness",
    learnMoreHref: "/guides/cognitive-bias-field-guide",
    learnMoreText: "Field guide: 12 biases that distort debate",
    category: "fallacies",
  },
  {
    term: "Availability Heuristic",
    definition:
      "Judging how likely or common something is by how easily examples come to mind, rather than by actual frequency. Vivid, recent, or emotionally charged events feel more probable than they are — which is why memorable disasters can make a statistically safe option feel dangerous.",
    example: "See why nuclear accidents feel more common than they are",
    exampleHref: "/topics/nuclear-energy-safety",
    learnMoreHref: "/guides/cognitive-bias-field-guide",
    learnMoreText: "Field guide: 12 biases that distort debate",
    category: "fallacies",
  },
  {
    term: "Gish Gallop",
    definition:
      "A rhetorical tactic of overwhelming an opponent with a rapid flood of claims, so many that none can be answered in the time available — and the sheer volume is mistaken for strength. The cure is to ignore the count and isolate the load-bearing claim, since a hundred weak assertions don't add up to one strong one.",
    example: "See signal separated from volume on the Climate Change map",
    exampleHref: "/topics/climate-change",
    learnMoreHref: "/fallacies/gish-gallop",
    learnMoreText: "See the Gish Gallop fallacy",
    category: "fallacies",
  },
  {
    term: "Calibration",
    definition:
      "The degree to which stated confidence matches actual accuracy. A perfectly calibrated person is right about 70% of the time when they say they are 70% confident — and wrong half the time when they say 50%. Calibration is distinct from being right more often: it is about your confidence meaning exactly what it claims, which is why being occasionally wrong at high confidence is a feature, not a failure.",
    example: "See uncertainty stated plainly on the AI Risk map",
    exampleHref: "/topics/ai-risk",
    learnMoreHref: "/guides/reading-confidence-like-a-forecaster",
    learnMoreText: "Read: Reading confidence like a forecaster",
    category: "reasoning",
  },
  {
    term: "Correlation vs. Causation",
    definition:
      "The principle that two things moving together does not establish that one causes the other. The association may run the opposite way, be driven by a hidden third factor, or be pure coincidence. Establishing causation requires more — a randomized trial, a natural experiment, or converging evidence backed by a plausible mechanism — which is why a strong correlation alone earns only modest weight.",
    example: "See cause untangled from correlation on the Social Media & Mental Health map",
    exampleHref: "/topics/social-media-mental-health",
    learnMoreHref: "/fallacies/false-cause",
    learnMoreText: "See the false-cause fallacy",
    category: "reasoning",
  },
  {
    term: "Cherry-Picking",
    definition:
      "Presenting only the evidence that supports a conclusion while ignoring the evidence that undercuts it, making a genuinely contested question look settled. The antidote is to ask what the rest of the literature says: a systematic review that includes the inconvenient findings is worth more than any curated stack of supportive studies.",
    example: "See the full evidence base, not a curated slice, on the Climate Change map",
    exampleHref: "/topics/climate-change",
    learnMoreHref: "/fallacies/cherry-picking",
    learnMoreText: "See the cherry-picking fallacy",
    category: "fallacies",
  },
  {
    term: "Survivorship Bias",
    definition:
      "Drawing conclusions from the visible successes while ignoring the failures that were silently filtered out. Because winners get studied and losers disappear, success rates calculated only from survivors are systematically inflated. The corrective question is always: what happened to everyone who tried the same thing and did not make it into the sample?",
    example: "See why failures must be counted on the Longevity Science map",
    exampleHref: "/topics/longevity-science",
    learnMoreHref: "/fallacies/survivorship-bias",
    learnMoreText: "See the survivorship-bias fallacy",
    category: "fallacies",
  },
  {
    term: "Motte-and-Bailey",
    definition:
      "A tactic of defending a bold, contestable claim (the bailey) by retreating, when challenged, to a modest claim almost no one disputes (the motte) — then advancing to the bold claim again once the pressure lifts. Naming it forces the arguer to pick one position and defend that, rather than equivocating between the two.",
    example: "Watch definitions shift on the Free Will map",
    exampleHref: "/topics/free-will",
    learnMoreHref: "/fallacies/motte-and-bailey",
    learnMoreText: "See the motte-and-bailey fallacy",
    category: "fallacies",
  },
  {
    term: "Red Herring",
    definition:
      "An irrelevant point introduced to divert attention from the actual question. Instead of answering the argument on the table, the speaker raises a different, often emotionally charged issue, and the original point quietly gets dropped. The distraction can even be true and still be a red herring, because its truth does nothing to settle the matter being debated. The cure is to name the switch and return to the original claim.",
    example: "See the real issue kept in focus on the Immigration map",
    exampleHref: "/topics/immigration-border-crisis",
    learnMoreHref: "/fallacies/red-herring",
    learnMoreText: "See the red herring fallacy",
    category: "fallacies",
  },
  {
    term: "Slippery Slope",
    definition:
      "The claim that one small step will inevitably lead to an extreme outcome, without showing why each link in the chain must follow. It is not always a fallacy — sometimes a chain of consequences is genuinely well-evidenced — but it fails when the inevitability is asserted rather than demonstrated. The test is whether each step is actually likely given the one before it, or whether the alarming conclusion is simply smuggled in at the end.",
    example: "See chains of consequence weighed on the Gun Control map",
    exampleHref: "/topics/gun-control-effectiveness",
    learnMoreHref: "/fallacies/slippery-slope",
    learnMoreText: "See the slippery slope fallacy",
    category: "fallacies",
  },
  {
    term: "Equivocation",
    definition:
      "Using a single word in two different senses within the same argument, so a conclusion that looks valid actually trades on the shift in meaning. Terms like 'free' or 'natural' can quietly change definition between premise and conclusion, making an unsound argument feel airtight. The fix is to pin each key term to one meaning and check that it holds steady throughout the argument.",
    example: "Watch the meaning of 'free' shift on the Free Will map",
    exampleHref: "/topics/free-will",
    learnMoreHref: "/fallacies/equivocation",
    learnMoreText: "See the equivocation fallacy",
    category: "fallacies",
  },
  {
    term: "Principle of Charity",
    definition:
      "The habit of interpreting an argument in its most reasonable form before responding — assuming the other person is rational, resolving ambiguity in their favor, and not attributing an obviously foolish view when a sensible one fits. It is the mindset behind steel-manning, and it is about accuracy rather than politeness: if you defeat only a weak misreading, you have learned nothing about whether the real argument holds.",
    example: "See charitable readings of every side on the Climate Change map",
    exampleHref: "/topics/climate-change",
    learnMoreHref: "/concepts/steel-manning",
    learnMoreText: "Understanding steel-manning",
    category: "reasoning",
  },
  {
    term: "Epistemic Humility",
    definition:
      "Holding beliefs in proportion to the evidence — confident where it is strong, uncertain where it is weak, and willing to update when it shifts. It is not relativism; some questions really are answered. It simply means separating how sure you feel from how sure the evidence warrants. 'The evidence is still divided, and here is what would settle it' is more honest than manufactured certainty.",
    example: "See uncertainty stated honestly on the Consciousness map",
    exampleHref: "/topics/consciousness-hard-problem",
    learnMoreHref: "/concepts/confidence-calibration",
    learnMoreText: "How a map describes its evidence",
    category: "reasoning",
  },
  // Reference entries moved here from /faq (2026-09-29), which now answers
  // only questions about Argumend itself.
  {
    term: "Facts and Values",
    definition:
      "A factual claim can be checked against evidence and is true or false whoever believes it: 'the average temperature has risen since 1900.' A value claim says what matters more or what ought to be done: 'we should put jobs ahead of emissions.' Many arguments blur the two, treating a contested factual question as if it were already answered, or a choice between values as if it were a matter of fact. Pulling them apart shows which part of a disagreement evidence could settle and which part it cannot.",
    example: "See factual and value cruxes side by side on the AI unemployment map",
    exampleHref: "/topics/ai-mass-unemployment",
    learnMoreHref: "/concepts/cruxes",
    learnMoreText: "Understanding cruxes",
    category: "core",
  },
  {
    term: "Validity and Soundness",
    definition:
      "Validity is about structure; soundness is structure plus truth. An argument is valid if its conclusion follows from its premises, even when the premises are false: 'All cats are robots; my pet is a cat; so my pet is a robot' is valid but not sound. An argument is sound only when it is valid and its premises are true. That is why checking that an argument flows is not enough: you also have to check that what it starts from is so.",
    learnMoreHref: "/guides/argument-audit",
    learnMoreText: "Guide: auditing an argument",
    category: "reasoning",
  },
  {
    term: "Deductive and Inductive Reasoning",
    definition:
      "Deduction runs from general premises to a conclusion that must be true if the premises are; it guarantees the conclusion but adds nothing the premises did not already contain. Induction runs from particular observations to a general pattern that is probably, not certainly, true; it extends what we know but can always be overturned by new evidence. Most real-world reasoning, science included, is inductive, which is why its conclusions come with degrees of support rather than proofs.",
    learnMoreHref: "/guides/bayesian-thinking",
    learnMoreText: "Guide: Bayesian thinking",
    category: "reasoning",
  },
  {
    term: "Anecdotal Evidence",
    definition:
      "A personal story or single striking case offered as evidence for a general claim. It persuades because it is vivid, but it is weak because it is not representative: one person who recovered after a treatment says little about how it works across thousands, and we hear the dramatic cases, not the quiet typical ones. Anecdotes are useful for raising a question or illustrating a point; they cannot establish a general claim on their own, which is why replicated, systematic data outweighs a memorable story.",
    learnMoreHref: "/fallacies/hasty-generalization",
    learnMoreText: "See the hasty generalization fallacy",
    category: "reasoning",
  },
  {
    term: "Denialism",
    definition:
      "Skepticism and denialism both begin by doubting a claim, but they behave differently when evidence arrives. A skeptic withholds judgment until the evidence is in, says what would change their mind, and updates when it does. A denier has fixed the conclusion first and moves the goalposts to protect it, so no evidence is ever quite enough. The test is to ask: what specific finding would change your view? A skeptic can answer; a denier either cannot or keeps changing the answer.",
    learnMoreHref: "/guides/spotting-manufactured-doubt",
    learnMoreText: "Guide: spotting manufactured doubt",
    category: "reasoning",
  },
  {
    term: "Cognitive Bias",
    definition:
      "A systematic flaw in how a mind takes in and weighs information, such as confirmation bias or anchoring. It differs from a logical fallacy, which is a flaw in the argument itself: a straw man is on the page whether or not anyone is fooled, while a bias lives in the thinker and can shape which evidence you notice with no explicit argument at all. The two interact, because biases lead people to make and accept fallacies. Spotting fallacies improves the arguments you make; recognizing biases improves the judgments you reach.",
    learnMoreHref: "/guides/cognitive-bias-field-guide",
    learnMoreText: "Field guide: 12 biases that distort debate",
    category: "fallacies",
  },
  {
    term: "False Equivalence",
    definition:
      "Treating two things as comparable when the differences that matter are large: equating a minor lapse with a major one, or presenting 'both sides' as evenly matched when the evidence is lopsided. It hides behind a surface symmetry ('they both made mistakes') while ignoring scale, intent, or how well each side is supported, and so manufactures a fake balance. To spot it, ask whether the two cases really are alike on the dimension that counts.",
    learnMoreHref: "/guides/spotting-manufactured-doubt",
    learnMoreText: "Guide: spotting manufactured doubt",
    category: "fallacies",
  },
  {
    term: "Fallacy Fallacy",
    definition:
      "Concluding that a claim must be false because the argument made for it contains a fallacy. A bad argument for a true claim does not make the claim untrue; it only means that argument fails to support it. Someone can defend a correct conclusion with a sloppy appeal to authority, and the conclusion can still be right for other reasons. Spotting a fallacy is a reason to set that argument aside and look for better evidence, not to flip to the opposite belief.",
    learnMoreHref: "/fallacies",
    learnMoreText: "The fallacy catalogue",
    category: "fallacies",
  },
];
