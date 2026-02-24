export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: "What is Argumend?",
    answer: "A tool for understanding why people disagree. We break controversial topics into their core claims, find the crux of each disagreement, and show you how confident the evidence makes us. Think of it as a map of the argument, not another place to have one.",
  },
  {
    question: "How are confidence scores calculated?",
    answer: "Confidence scores reflect the weight of evidence and expert consensus on a topic. A score of 95%+ indicates a settled question with overwhelming evidence (like anthropogenic climate change or the moon landing). Scores around 50% indicate genuinely contested questions where reasonable people can disagree (like certain interpretations of quantum mechanics or the nature of consciousness). For curated topics, the confidence score is a weighted composite of all evidence items across the topic\u2019s analytical pillars. Each evidence item is scored on four dimensions\u2014source reliability, independence, replicability, and directness\u2014giving a maximum of 40 points per item. The balance between supporting and opposing evidence, combined with the verification status of crux questions, produces the final percentage. For user-submitted analyses, the AI judge council assigns strength scores on a 1\u201310 scale based on logical coherence, evidentiary support, and rhetorical quality.",
  },
  {
    question: "What is a 'crux'?",
    answer: "A crux is the specific piece of evidence or test that would resolve a disagreement. If two people disagree about a topic, their crux is the precise question where finding the answer would change one or both of their minds. Identifying cruxes transforms abstract debates into concrete, testable questions.",
  },
  {
    question: "Why only three pillars per topic?",
    answer: "Three pillars strike a balance between comprehensiveness and focus. More pillars often overlap or dilute the core arguments. Three forces us to identify the truly foundational considerations\u2014the arguments that, if resolved, would settle the broader question.",
  },
  {
    question: "How do you choose which topics to cover?",
    answer: "We prioritize topics that (1) have genuine uncertainty or public controversy, (2) can be broken into testable claims, and (3) benefit from structured analysis. We avoid topics that are purely matters of value or preference, focusing instead on empirical and logical questions.",
  },
  {
    question: "What does 'steel-manning' mean?",
    answer: "The opposite of a straw man. Instead of attacking the weakest version of an argument, you present the strongest one. It\u2019s harder. It\u2019s also more honest. If you can\u2019t articulate why a smart person holds a position, you don\u2019t understand it well enough to disagree with it.",
  },
  {
    question: "Can I suggest a topic?",
    answer: "Yes! We welcome topic suggestions from the community. Good candidates are claims that (1) have strong arguments on multiple sides, (2) involve empirical or logical questions rather than pure opinion, (3) have testable cruxes, and (4) would benefit from structured breakdown. Visit the Community page for submission guidelines on how to contribute.",
  },
  {
    question: "Why do some topics show 'theoretical' verification status?",
    answer: "A crux marked 'theoretical' means the test is possible in principle but hasn't been done (or the results aren't conclusive). This is different from 'verified' (tested and confirmed) or 'impossible' (can't be tested with current technology).",
  },
  {
    question: "How is this different from Wikipedia or debate forums?",
    answer: "Wikipedia summarizes. Debate forums fight. We do neither. Our thing is structure: break a topic into pillars, find the crux, show the evidence. The pillar/crux framework forces you to be precise about what would actually resolve the disagreement\u2014which most debates never bother to do.",
  },
  {
    question: "Do you take a side on controversial topics?",
    answer: "We follow the evidence, which sometimes does favor one side. That\u2019s not bias\u2014that\u2019s how evidence works. But we always steel-man the minority position. The goal isn\u2019t to declare winners. It\u2019s to show you exactly where the disagreement lives and what would settle it.",
  },
  {
    question: "How often is topic data updated?",
    answer: "Curated topics are reviewed and updated whenever significant new evidence emerges\u2014typically every few months. We monitor major journals, preprints, and policy developments related to each topic. If a crux is resolved or new data shifts the evidence balance, we update the confidence score and add the relevant findings. Community members can flag outdated information through the Community page.",
  },
  {
    question: "How does the AI judge council work?",
    answer: "When you submit text for analysis, we run it through a council of multiple large language models\u2014each acting as an independent judge. Every judge scores the arguments for and against the claim on structured rubrics covering logical strength, evidence quality, and rhetorical fairness. We then aggregate the scores, flag disagreements between judges, and report whether there is consensus. This multi-model approach reduces the bias any single model might introduce.",
  },
  {
    question: "What happens to my analyzed text? Is it stored?",
    answer: "Submitted text is processed by our AI pipeline and the extracted analysis (positions, cruxes, fallacies, and scores) is saved so you can revisit and share the results via a unique URL. We do not sell or share your data with third parties. If you would like an analysis removed, contact us through the Community page.",
  },
  {
    question: "Is Argumend politically biased?",
    answer: "We try not to be, and we\u2019ve built safeguards to keep ourselves honest. Every position gets steel-manned. Confidence scores track evidence, not editorial preference. Our multi-model AI judge council catches bias that any single perspective might introduce. If the evidence happens to favor one political side on a given topic\u2014well, that\u2019s the evidence. We don\u2019t adjust reality for balance.",
  },
  {
    question: "Can I use Argumend in my classroom?",
    answer: "Please do. Use curated topics to show how debates decompose into testable claims, or have students submit their own texts for analysis. We\u2019ve seen it work well for teaching critical thinking and evidence evaluation. Check the For Educators page for lesson ideas.",
  },
  {
    question: "What\u2019s the difference between a crux and a key question?",
    answer: "A crux is a specific, often testable claim that sits at the heart of a disagreement\u2014if you resolved the crux, one or both sides would update their position. A key question is broader and may not have a single decisive answer. For example, \u201cDoes increasing minimum wage reduce total employment?\u201d is a crux because answering it definitively would shift the debate. \u201cWhat is the best economic policy?\u201d is a key question but not a crux\u2014it\u2019s too broad to resolve a specific disagreement.",
  },
  {
    question: "How do you handle topics where the science is still evolving?",
    answer: "We mark these topics as \u201ccontested\u201d or \u201chighly speculative\u201d and set confidence scores accordingly. Crux questions for evolving topics are often tagged with a \u201ctheoretical\u201d verification status, indicating that the decisive test is possible but hasn\u2019t been conclusively performed. As new research emerges, we update scores and evidence. Saying \u201cwe\u2019re at 55% confidence and here\u2019s why\u201d is more honest than pretending certainty where none exists.",
  },
  {
    question: "Can I export or share my analysis results?",
    answer: "Every analysis gets a unique, shareable URL that anyone can view without an account. You can also use the share buttons on any analysis page to post directly to Twitter/X or LinkedIn, or copy the link to your clipboard. We plan to add PDF and structured data exports in a future update.",
  },
];
