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
    title: "Steel-manning",
    description:
      "Steel-manning is the practice of presenting the strongest possible version of an opposing argument before attempting to refute it. Rather than attacking a weak or distorted version of what someone believes (a straw man), steel-manning requires you to articulate the position so well that an actual proponent would say, \"Yes, that's exactly what I mean.\"\n\nThis principle is foundational to Argumend's approach. Every map sets out each serious position in the form its own holders would recognise, the case for yes as carefully as the case for no. We apply what we call the Ideological Turing Test: could a true believer read our summary and feel represented? If not, we haven't done our job.\n\nSteel-manning isn't about being nice or fair for its own sake. It's about being epistemically honest. If you can only defeat a weak version of an argument, you haven't actually learned anything. The real test of your position is whether it survives contact with the strongest counterargument.",
    keyPoints: [
      "Present opposing arguments in their strongest form, not their weakest",
      "Apply the Ideological Turing Test: would a proponent endorse your summary?",
      "Weak arguments are upgraded and improved, never dismissed outright",
      "Skeptic positions receive the same intellectual rigor as mainstream ones",
      "If you can't articulate why intelligent people hold a position, you don't understand it well enough to disagree",
    ],
    relatedConcepts: ["cruxes", "evidence-weighting", "fallacies"],
    topicExamples: ["climate-change", "free-will", "nuclear-energy-safety"],
  },
  {
    id: "cruxes",
    title: "Cruxes",
    description:
      "A crux is the question a fight turns on, and what would settle it. Answer it one way and one side's case gets stronger; answer it the other way and the other side's does. Most arguments circle their crux without ever naming it, which is why they go round and round.\n\nTake the map \"Will AI cause mass unemployment?\" One of its cruxes asks: \"When AI makes a firm more productive, does it hire fewer people — or just sell more?\" Two people can agree that AI makes firms more productive and still split on this, and the split decides much of the rest. Under the question, the map says what would settle it: firm-level panels linking AI adoption to headcount, output, and pricing decisions over multiple years.\n\nNot every crux is settled by evidence, and a map says which kind each one is. Some close with a test, run now or once the future arrives. Some close only when the sides agree on terms or on who decides: \"What counts as 'mass unemployment' — are both sides even arguing about the same disaster?\" closes when they agree on a measure. Some close with nothing at all, because they are about values: \"If an $80K office worker becomes a $35K care worker, did the economy 'adjust'?\" There the map says \"Nothing does\" and keeps both answers. Where a map has not written a test down yet, it says \"Not yet specified.\"\n\nOn the flagship maps, each crux also keeps a dated record, headed \"How this has moved\". Every entry names what moved it, with a source, and carries one of four statuses: Open, Narrowed, Resolved, or Unresolvable by evidence. A second Open in a row reads \"Still open\". The firm-hiring crux above was open in February 2025 and narrowed in September 2026, when firm data agreed that AI-linked headcount cuts are rare. On the older maps, a line under the test says how testable it is: a test that can be run on evidence that exists, a test no one has run yet, or a test that is practically impossible to run today. Many cruxes also say what would change each side's mind.\n\nThe idea comes from the rationalist practice of the double crux: find the one question both people agree would change their minds. Naming it does not end the argument. It points the argument at the question that could, instead of at who is winning.",
    keyPoints: [
      "A crux is the question a fight turns on, and what would settle it",
      "Settled one way, it strengthens one side's case; settled the other way, the other side's",
      "Some cruxes close with evidence, some only when the sides agree on terms or on who decides, and some not at all, because they are about values",
      "On the flagship maps, each crux's record reads Open, Narrowed, Resolved or Unresolvable by evidence",
      "Naming the crux points an argument at what could change a mind, not at who is winning",
    ],
    relatedConcepts: ["steel-manning", "evidence-weighting", "fallacies"],
    topicExamples: ["ai-mass-unemployment", "capitalism-after-ai", "lab-leak-theory"],
  },
  {
    id: "evidence-weighting",
    title: "Weighing evidence",
    description:
      "Not all evidence counts the same. A large study that others have repeated counts for more than an anecdote, and an independent finding counts for more than one paid for by someone with a stake in the answer. Weighing evidence means asking how far each piece should move you before you let it.\n\nFour questions do most of the work, and they are worth asking of every piece of evidence, whichever side it helps. How reliable is the source: its track record, its review, its expertise? Is it independent: free of conflicts, and backed by people with no stake in the result? Has it been replicated? And how directly does it bear on the claim, rather than on something next to it?\n\nThe questions pull apart, which is why all four are worth asking. A government statistic can be reliable and still not independent of the policy it measures. A pile of stories can be independent and still not replicable. One strong answer can hide a weak one.\n\nArgumend's editors ask the same four questions of every evidence card on a map. A map shows the cards themselves, with their sources, and never a score for a card or for a side. How the cards are weighed, and what that is used for, is set out in How maps are made.",
    keyPoints: [
      "Ask four questions of every piece of evidence: how reliable, how independent, how replicated, how direct",
      "Ask them whichever side the evidence helps",
      "One strong answer can hide a weak one, so ask all four",
      "Weighing evidence tells you how far it should move you, not who is right",
      "How a map's cards are weighed is set out in How maps are made",
    ],
    relatedConcepts: ["cruxes", "steel-manning", "fallacies"],
    topicExamples: ["climate-change", "gun-control-effectiveness", "social-media-mental-health"],
  },
  {
    id: "fallacies",
    title: "Logical fallacies",
    description:
      "Logical fallacies are errors in reasoning that undermine the logical validity of an argument. They are patterns of bad reasoning that can appear persuasive on the surface but don't actually support the conclusion they claim to. Recognizing fallacies is essential for evaluating arguments honestly, whether they come from others or from ourselves.\n\nThe common ones have names: an ad hominem attacks the person rather than the argument, an appeal to authority treats expertise as proof rather than evidence, a false dichotomy presents only two options when more exist. Spotting one doesn't mean the conclusion is wrong -- a fallacious argument can still reach a true conclusion -- but it means that particular reasoning path is unreliable. Argumend's paste tool deliberately does not label fallacies in what you paste: a fallacy label is too easily used to score a point, and the tool's job is to find what the disagreement turns on. The catalogue is here so you can recognize them yourself.\n\nUnderstanding fallacies is particularly important in conjunction with steel-manning. When we strengthen an argument, we strip out the fallacies and rebuild it on solid logical foundations. The goal isn't to play \"gotcha\" with bad reasoning but to separate the signal from the noise: what is the actual evidence, and what is rhetorical decoration?",
    keyPoints: [
      "Fallacies are reasoning errors that undermine argument validity",
      "Common fallacies include ad hominem, appeal to authority, false dichotomy, and straw man",
      "A fallacious argument can reach a true conclusion -- the issue is the reasoning path",
      "Naming a fallacy is a reason to set that argument aside, not proof the other side is right",
      "Identifying fallacies helps separate genuine evidence from rhetorical decoration",
    ],
    relatedConcepts: ["steel-manning", "cruxes", "evidence-weighting"],
    topicExamples: ["cancel-culture", "media-bias-democracy", "death-penalty-deterrence"],
  },
];

export function getConceptBySlug(slug: string): Concept | undefined {
  return concepts.find((c) => c.id === slug);
}

export function getAllConceptSlugs(): string[] {
  return concepts.map((c) => c.id);
}
