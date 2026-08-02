/**
 * Long-form glossary entries rendered on the /glossary page.
 *
 * Kept in its own module (rather than alongside the inline tooltip glossary in
 * `data/glossaryTerms.ts`) so the ~30KB of prose below never rides along into
 * the client bundle via <GlossaryTerm>, which only needs the tooltip lookup.
 */

/**
 * Category taxonomy for the full /glossary page. Distinct from the inline
 * tooltip glossary above: these are the long-form encyclopedia entries, grouped
 * into four chapters and rendered with per-term icons by `lib/glossaryMeta.ts`.
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
    example: "See this in action on our Nuclear Energy analysis",
    exampleHref: "/topics/nuclear-energy-safety",
    learnMoreHref: "/how-it-works",
    learnMoreText: "How Argumend maps arguments",
    category: "core",
  },
  {
    term: "Steel-Manning",
    definition:
      "Presenting the strongest possible version of an opponent's argument before responding to it, the opposite of straw-manning. Steel-manning forces genuine engagement with the best version of each position and prevents dismissing views you haven't truly understood.",
    example: "See steel-manned positions on our Climate Change topic",
    exampleHref: "/topics/climate-change",
    learnMoreHref: "/blog/why-steel-manning-makes-you-smarter",
    learnMoreText: "Why steel-manning makes you smarter",
    category: "core",
  },
  {
    term: "Crux",
    definition:
      "The single most decisive question or piece of evidence that, if resolved, would change one side's position on a debate. Identifying the crux transforms abstract debates into concrete, answerable questions.",
    example: "See crux questions on our Moon Landing analysis",
    exampleHref: "/topics/moon-landing",
    learnMoreHref: "/concepts/cruxes",
    learnMoreText: "Understanding cruxes",
    category: "core",
  },
  {
    term: "Confidence Score",
    definition:
      "A numerical measure (0-100) of how strongly available evidence supports or undermines a claim. A score of 95+ indicates overwhelming evidence (settled science). Around 50 means genuinely contested. Scores are computed from individual evidence items, each weighted on four dimensions.",
    example: "Compare confidence scores across all topics",
    exampleHref: "/topics",
    learnMoreHref: "/concepts/confidence-calibration",
    learnMoreText: "How confidence scores work",
    category: "core",
  },
  {
    term: "Meta-Claim",
    definition:
      "The central thesis or proposition that a topic's argument map is structured around. Every pillar, piece of evidence, and crux question ultimately relates back to whether this core claim holds up under scrutiny.",
    example: "See the meta-claim on the AI Job Displacement topic",
    exampleHref: "/topics/ai-job-displacement",
    category: "core",
  },
  {
    term: "Pillar",
    definition:
      "A major axis of disagreement within a debate, containing opposing arguments and a decisive crux. Each Argumend topic is structured around three pillars representing the most important lines of argument, with steel-manned positions, weighted evidence, and crux questions.",
    example: "See how pillars structure the COVID Origins analysis",
    exampleHref: "/topics/lab-leak-theory",
    learnMoreHref: "/concepts/pillars",
    learnMoreText: "Understanding pillars",
    category: "core",
  },
  {
    term: "Skeptic Premise",
    definition:
      "The strongest version of the argument opposing a topic's meta-claim. Each pillar includes a steel-manned skeptic premise that represents the most compelling challenge to the claim, presented fairly and at full strength.",
    example: "See skeptic premises on the Gene Editing topic",
    exampleHref: "/topics/gene-editing-embryos",
    category: "core",
  },
  {
    term: "Proponent Rebuttal",
    definition:
      "The strongest response defending a topic's meta-claim against the skeptic's case. Like the skeptic premise, the proponent rebuttal is steel-manned to represent the most compelling defense available.",
    example: "See proponent rebuttals on the Universal Healthcare analysis",
    exampleHref: "/topics/universal-healthcare",
    category: "core",
  },
  {
    term: "Verification Status",
    definition:
      "Whether a crux has been verified, remains theoretical, or is impossible to test with current methods. 'Verified' means the test has been performed and results are available. 'Theoretical' means the test is possible but hasn't been done. 'Impossible' means the test cannot currently be performed.",
    example: "Compare verification statuses on the Moon Landing topic",
    exampleHref: "/topics/moon-landing",
    category: "core",
  },
  // Reasoning Concepts
  {
    term: "Evidence Weighting",
    definition:
      "A systematic method of scoring evidence across dimensions like source reliability, independence, replicability, and directness. Rather than treating all evidence as equal, each item is scored 0-10 on four dimensions, giving a maximum score of 40.",
    example: "See weighted evidence on our AI Regulation analysis",
    exampleHref: "/topics/ai-regulation",
    learnMoreHref: "/methodology",
    learnMoreText: "Our evidence methodology",
    category: "methodology",
  },
  {
    term: "Bayesian Reasoning",
    definition:
      "Updating the probability of a hypothesis proportionally as new evidence is encountered. Named after Thomas Bayes. Rather than accepting or rejecting claims absolutely, Bayesian reasoning assigns and adjusts probabilities as evidence accumulates.",
    example: "See how evidence accumulates on the Longevity Science topic",
    exampleHref: "/topics/longevity-science",
    category: "reasoning",
  },
  {
    term: "Falsifiability",
    definition:
      "Whether a claim rules anything out. A belief only tells you something about the world if some possible observation could prove it wrong — if nothing could, it explains everything and predicts nothing. The honest move is to state, in advance, the evidence that would change your mind.",
    example: "See what would change each side's mind on the Nuclear Energy topic",
    exampleHref: "/topics/nuclear-energy-safety",
    learnMoreHref: "/blog/what-would-change-your-mind",
    learnMoreText: "Read: What Would Change Your Mind?",
    category: "reasoning",
  },
  {
    term: "Double Crux",
    definition:
      "A single fact that both sides agree would change their mind. Finding it turns an unwinnable values fight into one shared, answerable question — and usually reveals the real disagreement is far narrower than the argument suggested.",
    example: "See the crux on the Rent Control topic",
    exampleHref: "/topics/rent-control-effectiveness",
    learnMoreHref: "/blog/what-would-change-your-mind",
    learnMoreText: "Read: What Would Change Your Mind?",
    category: "reasoning",
  },
  {
    term: "Burden of Proof",
    definition:
      "The obligation to support a claim with evidence. It rests on whoever asserts the claim, not on those who doubt it — so 'you can't prove it's false' is not evidence that it is true. Extraordinary claims require extraordinary evidence, which is why unsupported assertions receive low scores across all evidence dimensions in Argumend's framework.",
    example: "See an unmet burden on the Death Penalty Deterrence topic",
    exampleHref: "/topics/death-penalty-deterrence",
    category: "reasoning",
  },
  {
    term: "Confirmation Bias",
    definition:
      "The tendency to search for, interpret, and remember information that confirms pre-existing beliefs while ignoring or downplaying contradictory evidence. The most pervasive cognitive bias in argumentation. Steel-manning is the most direct antidote.",
    example: "See how we counter bias on the Social Media & Elections topic",
    exampleHref: "/topics/social-media-elections",
    category: "fallacies",
  },
  {
    term: "Dunning-Kruger Effect",
    definition:
      "A cognitive bias where people with limited knowledge overestimate their competence, while experts underestimate theirs. In debates, this manifests as outsized confidence from those who have read one article versus measured uncertainty from researchers who have spent decades on the question.",
    example: "Explore expert vs. public confidence on the Consciousness topic",
    exampleHref: "/topics/consciousness-hard-problem",
    category: "fallacies",
  },
  {
    term: "Base Rate Neglect",
    definition:
      "Ignoring the general probability of an event when evaluating specific evidence. For example, a test that is 99% accurate still produces many false positives if the base rate of the condition is very low. Proper evidence weighting requires considering prior probabilities.",
    example: "See base rates in context on the GLP-1 Weight Loss Drugs analysis",
    exampleHref: "/topics/glp1-weight-loss-drugs",
    category: "fallacies",
  },
  // Logical Fallacies
  {
    term: "Logical Fallacy",
    definition:
      "An error in reasoning that undermines the logic of an argument, such as ad hominem, straw man, or false dichotomy. Recognizing fallacies is essential for evaluating whether a conclusion actually follows from its premises.",
    example: "See how we identify fallacies on the TikTok Ban analysis",
    exampleHref: "/topics/tiktok-ban",
    category: "fallacies",
  },
  {
    term: "Ad Hominem",
    definition:
      "Attacking the person making an argument rather than addressing the argument itself. 'You're wrong because you're biased' is ad hominem. 'Your argument fails because the evidence contradicts it' is not. The source of an argument is relevant to credibility but doesn't determine validity.",
    example: "See how we separate person from argument on the Immigration debate",
    exampleHref: "/topics/immigration-border-crisis",
    category: "fallacies",
  },
  {
    term: "Straw Man",
    definition:
      "Misrepresenting someone's argument to make it easier to attack. Instead of engaging with what someone actually said, you substitute a weaker, distorted version. The cure is steel-manning: presenting the strongest version of the opposing view before responding.",
    example: "See steel-manned arguments on the Gun Control topic",
    exampleHref: "/topics/gun-control-effectiveness",
    category: "fallacies",
  },
  {
    term: "False Dichotomy",
    definition:
      "Presenting only two options when more exist. 'You're either for us or against us' ignores partial alignment, neutrality, or agreement on some issues and opposition on others. Most real-world questions exist on a spectrum, not a binary.",
    example: "See nuanced positions on the AI in Education analysis",
    exampleHref: "/topics/ai-in-education",
    category: "fallacies",
  },
  {
    term: "Appeal to Authority",
    definition:
      "Accepting a claim as true solely because an authority figure endorses it, without examining the evidence. Expertise increases the probability that someone is right, but experts can be wrong, biased, or speaking outside their domain. The evidence matters more than who presents it.",
    example: "See how we weigh expert sources on the Microplastics topic",
    exampleHref: "/topics/microplastics-health-crisis",
    category: "fallacies",
  },
  {
    term: "Motivated Reasoning",
    definition:
      "Reasoning toward a predetermined conclusion rather than from the evidence — becoming a lawyer for the verdict you want instead of a scientist weighing what's true. Unlike confirmation bias (a passive filter), motivated reasoning is the active construction of arguments for a desired outcome, holding disliked evidence to a higher standard than evidence you welcome.",
    example: "See motivated reasoning confronted on the Gun Control topic",
    exampleHref: "/topics/gun-control-effectiveness",
    learnMoreHref: "/guides/understanding-bias",
    learnMoreText: "Read: Understanding Bias",
    category: "reasoning",
  },
  {
    term: "Occam's Razor",
    definition:
      "The principle that, among competing explanations that fit the evidence equally well, the one requiring the fewest assumptions is usually the best starting point. It is a heuristic for allocating prior probability, not a proof: simplicity breaks ties and flags explanations that smuggle in unsupported entities, but a simpler theory still loses to a more complex one that better fits the data.",
    example: "Compare competing explanations on the Moon Landing analysis",
    exampleHref: "/topics/moon-landing",
    category: "reasoning",
  },
  {
    term: "Inference to the Best Explanation",
    definition:
      "Also called abduction: reasoning from a body of observations to the hypothesis that, if true, would best account for them. The strength of the inference depends on how decisively the leading explanation beats its rivals on scope, simplicity, and fit — which is why ruling out alternatives matters as much as supporting your favored account.",
    example: "See abductive reasoning at work on the COVID Origins analysis",
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
    example: "See signal separated from volume on the Climate Change topic",
    exampleHref: "/topics/climate-change",
    learnMoreHref: "/fallacies/gish-gallop",
    learnMoreText: "See the Gish Gallop fallacy",
    category: "fallacies",
  },
  {
    term: "Calibration",
    definition:
      "The degree to which stated confidence matches actual accuracy. A perfectly calibrated person is right about 70% of the time when they say they are 70% confident — and wrong half the time when they say 50%. Calibration is distinct from being right more often: it is about your confidence meaning exactly what it claims, which is why being occasionally wrong at high confidence is a feature, not a failure.",
    example: "Read confidence as probability on the AI Risk topic",
    exampleHref: "/topics/ai-risk",
    learnMoreHref: "/guides/reading-confidence-like-a-forecaster",
    learnMoreText: "Read: Reading Confidence Like a Forecaster",
    category: "reasoning",
  },
  {
    term: "Correlation vs. Causation",
    definition:
      "The principle that two things moving together does not establish that one causes the other. The association may run the opposite way, be driven by a hidden third factor, or be pure coincidence. Establishing causation requires more — a randomized trial, a natural experiment, or converging evidence backed by a plausible mechanism — which is why a strong correlation alone earns only modest weight.",
    example: "See cause untangled from correlation on the Social Media & Mental Health topic",
    exampleHref: "/topics/social-media-mental-health",
    learnMoreHref: "/fallacies/false-cause",
    learnMoreText: "See the false-cause fallacy",
    category: "reasoning",
  },
  {
    term: "Cherry-Picking",
    definition:
      "Presenting only the evidence that supports a conclusion while ignoring the evidence that undercuts it, making a genuinely contested question look settled. The antidote is to ask what the rest of the literature says: a systematic review that includes the inconvenient findings is worth more than any curated stack of supportive studies.",
    example: "See the full evidence base, not a curated slice, on the Climate Change topic",
    exampleHref: "/topics/climate-change",
    learnMoreHref: "/fallacies/cherry-picking",
    learnMoreText: "See the cherry-picking fallacy",
    category: "fallacies",
  },
  {
    term: "Survivorship Bias",
    definition:
      "Drawing conclusions from the visible successes while ignoring the failures that were silently filtered out. Because winners get studied and losers disappear, success rates calculated only from survivors are systematically inflated. The corrective question is always: what happened to everyone who tried the same thing and did not make it into the sample?",
    example: "See why failures must be counted on the Longevity Science topic",
    exampleHref: "/topics/longevity-science",
    learnMoreHref: "/fallacies/survivorship-bias",
    learnMoreText: "See the survivorship-bias fallacy",
    category: "fallacies",
  },
  {
    term: "Motte-and-Bailey",
    definition:
      "A tactic of defending a bold, contestable claim (the bailey) by retreating, when challenged, to a modest claim almost no one disputes (the motte) — then advancing to the bold claim again once the pressure lifts. Naming it forces the arguer to pick one position and defend that, rather than equivocating between the two.",
    example: "Watch definitions shift on the Free Will topic",
    exampleHref: "/topics/free-will",
    learnMoreHref: "/fallacies/motte-and-bailey",
    learnMoreText: "See the motte-and-bailey fallacy",
    category: "fallacies",
  },
  {
    term: "Red Herring",
    definition:
      "An irrelevant point introduced to divert attention from the actual question. Instead of answering the argument on the table, the speaker raises a different, often emotionally charged issue, and the original point quietly gets dropped. The distraction can even be true and still be a red herring, because its truth does nothing to settle the matter being debated. The cure is to name the switch and return to the original claim.",
    example: "See the real issue kept in focus on the Immigration debate",
    exampleHref: "/topics/immigration-border-crisis",
    learnMoreHref: "/fallacies/red-herring",
    learnMoreText: "See the red herring fallacy",
    category: "fallacies",
  },
  {
    term: "Slippery Slope",
    definition:
      "The claim that one small step will inevitably lead to an extreme outcome, without showing why each link in the chain must follow. It is not always a fallacy — sometimes a chain of consequences is genuinely well-evidenced — but it fails when the inevitability is asserted rather than demonstrated. The test is whether each step is actually likely given the one before it, or whether the alarming conclusion is simply smuggled in at the end.",
    example: "See chains of consequence weighed on the Gun Control topic",
    exampleHref: "/topics/gun-control-effectiveness",
    learnMoreHref: "/fallacies/slippery-slope",
    learnMoreText: "See the slippery slope fallacy",
    category: "fallacies",
  },
  {
    term: "Equivocation",
    definition:
      "Using a single word in two different senses within the same argument, so a conclusion that looks valid actually trades on the shift in meaning. Terms like 'free' or 'natural' can quietly change definition between premise and conclusion, making an unsound argument feel airtight. The fix is to pin each key term to one meaning and check that it holds steady throughout the argument.",
    example: "Watch the meaning of 'free' shift on the Free Will topic",
    exampleHref: "/topics/free-will",
    learnMoreHref: "/fallacies/equivocation",
    learnMoreText: "See the equivocation fallacy",
    category: "fallacies",
  },
  {
    term: "Principle of Charity",
    definition:
      "The habit of interpreting an argument in its most reasonable form before responding — assuming the other person is rational, resolving ambiguity in their favor, and not attributing an obviously foolish view when a sensible one fits. It is the mindset behind steel-manning, and it is about accuracy rather than politeness: if you defeat only a weak misreading, you have learned nothing about whether the real argument holds.",
    example: "See charitable readings of every side on the Climate Change topic",
    exampleHref: "/topics/climate-change",
    learnMoreHref: "/concepts/steel-manning",
    learnMoreText: "Understanding steel-manning",
    category: "reasoning",
  },
  {
    term: "Epistemic Humility",
    definition:
      "Holding beliefs in proportion to the evidence — confident where it is strong, uncertain where it is weak, and willing to update when it shifts. It is not relativism; some questions really are settled. It simply means separating how sure you feel from how sure the evidence warrants, which is exactly what a calibrated confidence score expresses: '60% confident, and here is why' is more honest than manufactured certainty.",
    example: "See uncertainty stated honestly on the Consciousness topic",
    exampleHref: "/topics/consciousness-hard-problem",
    learnMoreHref: "/concepts/confidence-calibration",
    learnMoreText: "How confidence scores work",
    category: "reasoning",
  },
];
