export interface Concept {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  relatedConcepts: string[];
  topicExamples: string[];
}

export const concepts: Concept[] = [
  {
    id: "steel-manning",
    title: "Steel-Manning",
    description:
      "Steel-manning is the practice of presenting the strongest possible version of an opposing argument before attempting to refute it. Rather than attacking a weak or distorted version of what someone believes (a straw man), steel-manning requires you to articulate the position so well that an actual proponent would say, \"Yes, that's exactly what I mean.\"\n\nThis principle is foundational to Argumend's approach. Every pillar in our argument maps includes both the strongest skeptic position and the strongest proponent rebuttal. We apply what we call the Ideological Turing Test: could a true believer read our summary and feel represented? If not, we haven't done our job.\n\nSteel-manning isn't about being nice or fair for its own sake. It's about being epistemically honest. If you can only defeat a weak version of an argument, you haven't actually learned anything. The real test of your position is whether it survives contact with the strongest counterargument.",
    keyPoints: [
      "Present opposing arguments in their strongest form, not their weakest",
      "Apply the Ideological Turing Test: would a proponent endorse your summary?",
      "Weak arguments are upgraded and improved, never dismissed outright",
      "Skeptic positions receive the same intellectual rigor as mainstream ones",
      "If you can't articulate why intelligent people hold a position, you don't understand it well enough to disagree",
    ],
    relatedConcepts: ["cruxes", "pillars", "fallacies"],
    topicExamples: ["climate-change", "free-will", "nuclear-energy-safety"],
  },
  {
    id: "cruxes",
    title: "Cruxes",
    description:
      "A crux is the specific piece of evidence, experiment, or observation that would change minds on a debate. When two people disagree, their crux is the precise question whose answer would cause one or both of them to update their position. Finding cruxes transforms abstract philosophical debates into concrete, testable questions.\n\nIn Argumend's framework, every pillar contains a crux: the decisive test that could resolve the disagreement within that pillar. Each crux includes a description of the methodology for testing it, a verification status (verified, theoretical, or impossible with current technology), and an estimated cost to verify. This structure makes disagreements productive by focusing on what would actually change minds.\n\nCrux identification draws from the rationalist tradition and double-crux methodology. The key insight is that most disagreements persist not because the evidence is ambiguous, but because people haven't identified what evidence would be decisive. Once you name the crux, you often discover that the question is already answered, or that it's answerable with existing tools.",
    keyPoints: [
      "A crux is the specific evidence that would change minds in a debate",
      "Each crux includes methodology, verification status, and cost to verify",
      "Verification statuses: verified (tested), theoretical (testable), or impossible (current tech)",
      "Finding the crux transforms abstract debate into concrete, testable questions",
      "Most disagreements persist because people haven't identified the decisive evidence",
    ],
    relatedConcepts: ["steel-manning", "evidence-weighting", "confidence-calibration"],
    topicExamples: ["moon-landing", "simulation-hypothesis", "lab-leak-theory"],
  },
  {
    id: "evidence-weighting",
    title: "Evidence Weighting",
    description:
      "Not all evidence is created equal. A peer-reviewed meta-analysis carries more weight than an anecdote. An independent replication is more persuasive than a single study funded by an interested party. Evidence weighting is the systematic process of scoring how much a given piece of evidence should influence our confidence in a claim.\n\nArgumend scores every piece of evidence on four independent dimensions, each rated 0-10. Source Reliability measures the track record, peer review status, and recognized expertise of the source. Independence assesses whether the evidence is free from conflicts of interest and independently corroborated. Replicability asks whether others can verify the result and whether it has been successfully reproduced. Directness evaluates how directly the evidence addresses the specific claim in question. The total evidence score is the sum of all four dimensions, yielding a maximum of 40.\n\nThis scoring system makes evidence quality transparent and auditable. Instead of vaguely saying \"the evidence supports this,\" we show exactly why. You can see which dimension a piece of evidence is strong or weak on, enabling you to assess the argument's foundations for yourself rather than taking our word for it.",
    keyPoints: [
      "Four dimensions: Source Reliability, Independence, Replicability, and Directness",
      "Each dimension is scored 0-10, for a maximum total evidence score of 40",
      "Scores are transparent and auditable -- you can trace every number back to its rationale",
      "Multiple AI judges score independently to reduce individual model bias",
      "The system distinguishes between strong evidence that is indirect vs. direct evidence that is weak",
    ],
    relatedConcepts: ["confidence-calibration", "cruxes", "pillars"],
    topicExamples: ["climate-change", "gun-control-effectiveness", "social-media-mental-health"],
  },
  {
    id: "confidence-calibration",
    title: "Balance & Weight Calibration",
    description:
      "A single percentage cannot tell whether evidence strongly favors one side or whether there is enough good evidence to be confident in any direction. Argumend therefore reports two separate measurements rather than treating a directional score as a probability.\n\nBalance shows which way the weighted evidence tips: balance = forStrength / (forStrength + againstStrength) x 100. A score of 50 is even; values above 50 favor the claim, and values below 50 favor the counterclaim. Balance is not the probability that a claim is true. Weight shows how much we currently know. It combines evidential mass, average source quality, and how resolvable the topic's cruxes are.\n\nThe verdict uses both axes. High weight plus a strong lean can be settled; high weight near 50 is well-mapped but genuinely contested; medium weight supports a cautious lean; and low weight remains an open question regardless of apparent direction. Keeping direction and evidential strength separate prevents a thin one-sided record from masquerading as certainty.",
    keyPoints: [
      "Balance = forStrength / (forStrength + againstStrength) x 100; 50 is even",
      "Balance shows direction, not the probability that a claim is true",
      "Weight combines evidential mass, source quality, and crux resolvability",
      "A verdict is derived from both balance and weight",
      "Low-weight questions remain open even when the available evidence leans strongly",
    ],
    relatedConcepts: ["evidence-weighting", "cruxes", "fallacies"],
    topicExamples: ["ai-risk", "free-will", "cryptocurrency-value"],
  },
  {
    id: "fallacies",
    title: "Logical Fallacies",
    description:
      "Logical fallacies are errors in reasoning that undermine the logical validity of an argument. They are patterns of bad reasoning that can appear persuasive on the surface but don't actually support the conclusion they claim to. Recognizing fallacies is essential for evaluating arguments honestly, whether they come from others or from ourselves.\n\nArgumend's AI pipeline includes automatic fallacy detection during the argument extraction phase. When a claim relies on an ad hominem attack (attacking the person rather than the argument), an appeal to authority (treating expertise as proof rather than evidence), a false dichotomy (presenting only two options when more exist), or any of dozens of other documented fallacies, the system flags it. This doesn't mean the conclusion is wrong -- a fallacious argument can still reach a true conclusion -- but it means the reasoning path is unreliable.\n\nUnderstanding fallacies is particularly important in conjunction with steel-manning. When we strengthen an argument, we strip out the fallacies and rebuild it on solid logical foundations. The goal isn't to play \"gotcha\" with bad reasoning but to separate the signal from the noise: what is the actual evidence, and what is rhetorical decoration?",
    keyPoints: [
      "Fallacies are reasoning errors that undermine argument validity",
      "Common fallacies include ad hominem, appeal to authority, false dichotomy, and straw man",
      "A fallacious argument can reach a true conclusion -- the issue is the reasoning path",
      "Argumend's pipeline automatically flags detected fallacies during analysis",
      "Identifying fallacies helps separate genuine evidence from rhetorical decoration",
    ],
    relatedConcepts: ["steel-manning", "evidence-weighting", "pillars"],
    topicExamples: ["cancel-culture", "media-bias-democracy", "death-penalty-deterrence"],
  },
  {
    id: "pillars",
    title: "Pillars",
    description:
      "Pillars are the structural building blocks of every argument map in Argumend. Each topic is broken into exactly three pillars -- the core arguments that must be addressed to form a reasoned position on the claim. Pillars represent the most important dimensions of the debate, ensuring that the analysis is comprehensive without being overwhelming.\n\nEach pillar contains a balanced structure: a skeptic premise (the strongest objection), a proponent rebuttal (the strongest response), supporting evidence scored on four dimensions, and a crux (the decisive test that would resolve the disagreement). This architecture ensures that every angle of the debate is covered with intellectual honesty. The pillar format forces both sides to engage with the strongest version of the opposing position.\n\nThe three-pillar constraint is deliberate. While most controversial topics could be analyzed along dozens of dimensions, forcing the analysis into three pillars requires identifying the most important arguments and cutting the noise. This mirrors how experienced debaters think: there are usually only two or three points that truly matter in any disagreement, and everything else is either derivative or tangential.",
    keyPoints: [
      "Every topic is broken into exactly three pillars covering the core arguments",
      "Each pillar contains: skeptic premise, proponent rebuttal, scored evidence, and a crux",
      "The three-pillar constraint forces focus on what actually matters in the debate",
      "Pillars ensure both sides engage with the strongest version of opposing arguments",
      "Evidence within pillars is scored independently on reliability, independence, replicability, and directness",
    ],
    relatedConcepts: ["steel-manning", "cruxes", "evidence-weighting"],
    topicExamples: ["moon-landing", "ai-risk", "universal-basic-income"],
  },
];

export function getConceptBySlug(slug: string): Concept | undefined {
  return concepts.find((c) => c.id === slug);
}

export function getAllConceptSlugs(): string[] {
  return concepts.map((c) => c.id);
}
