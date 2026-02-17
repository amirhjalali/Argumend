"use client";

import { AppShell } from "@/components/AppShell";

const faqs = [
  {
    question: "What is Argumend?",
    answer: "Argumend is a platform for exploring controversial topics through structured logical analysis. We break down complex debates into foundational pillars, identify the cruxes where disagreements hinge, and estimate confidence levels based on available evidence.",
  },
  {
    question: "How are confidence scores calculated?",
    answer: "Confidence scores reflect the weight of evidence and expert consensus on a topic. A score of 95%+ indicates a settled question with overwhelming evidence (like anthropogenic climate change or the moon landing). Scores around 50% indicate genuinely contested questions where reasonable people can disagree (like certain interpretations of quantum mechanics or the nature of consciousness).",
  },
  {
    question: "What is a 'crux'?",
    answer: "A crux is the specific piece of evidence or test that would resolve a disagreement. If two people disagree about a topic, their crux is the precise question where finding the answer would change one or both of their minds. Identifying cruxes transforms abstract debates into concrete, testable questions.",
  },
  {
    question: "Why only three pillars per topic?",
    answer: "Three pillars strike a balance between comprehensiveness and focus. More pillars often overlap or dilute the core arguments. Three forces us to identify the truly foundational considerations—the arguments that, if resolved, would settle the broader question.",
  },
  {
    question: "How do you choose which topics to cover?",
    answer: "We prioritize topics that (1) have genuine uncertainty or public controversy, (2) can be broken into testable claims, and (3) benefit from structured analysis. We avoid topics that are purely matters of value or preference, focusing instead on empirical and logical questions.",
  },
  {
    question: "What does 'steel-manning' mean?",
    answer: "Steel-manning is the opposite of straw-manning. Instead of attacking a weak version of an argument, we present the strongest possible version. This ensures intellectual honesty—if we can defeat the best version of an opposing view, our position is much stronger.",
  },
  {
    question: "Can I suggest a topic?",
    answer: "Yes! We welcome topic suggestions. Good candidates have strong arguments on multiple sides, testable cruxes, and would benefit from structured breakdown. Visit the Community page for guidelines on how to contribute.",
  },
  {
    question: "Why do some topics show 'theoretical' verification status?",
    answer: "A crux marked 'theoretical' means the test is possible in principle but hasn't been done (or the results aren't conclusive). This is different from 'verified' (tested and confirmed) or 'impossible' (can't be tested with current technology).",
  },
  {
    question: "How is this different from Wikipedia or debate forums?",
    answer: "Wikipedia aims for neutral summary; we aim for structured argumentation. Debate forums are adversarial; we seek convergence on truth. Our unique contribution is the pillar/crux framework that forces precision about what evidence would resolve disagreements.",
  },
  {
    question: "Do you take a side on controversial topics?",
    answer: "We report confidence scores based on evidence, which sometimes favors one side. But we always present the strongest version of minority positions. Our goal isn't to declare winners but to clarify where disagreements actually lie and what evidence would settle them.",
  },
  {
    question: "How often is topic data updated?",
    answer: "Curated topics are reviewed and updated whenever significant new evidence emerges\u2014typically every few months. We monitor major journals, preprints, and policy developments related to each topic. If a crux is resolved or new data shifts the evidence balance, we update the confidence score and add the relevant findings. Community members can flag outdated information through the Community page.",
  },
  {
    question: "Can I suggest a new topic?",
    answer: "Absolutely. We encourage topic suggestions from the community. The best candidates are claims that (1) have substantive arguments on multiple sides, (2) involve empirical or logical questions rather than pure opinion, and (3) have identifiable cruxes that could theoretically be resolved with evidence. Visit the Community page for submission guidelines.",
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
    question: "How are confidence scores calculated in detail?",
    answer: "For curated topics, the confidence score is a weighted composite of all evidence items across the topic\u2019s analytical pillars. Each evidence item is scored on four dimensions\u2014source reliability, independence, replicability, and directness\u2014giving a maximum of 40 points per item. The balance between supporting and opposing evidence, combined with the verification status of crux questions, produces the final percentage. For user-submitted analyses, the AI judge council assigns strength scores on a 1\u201310 scale based on logical coherence, evidentiary support, and rhetorical quality.",
  },
  {
    question: "Is Argumend politically biased?",
    answer: "We work hard to avoid political bias. Our methodology is designed around evidence and logical structure, not ideology. Every topic presents the strongest steel-manned version of each position. Confidence scores follow the weight of evidence, which may sometimes align with one political perspective\u2014but that reflects the evidence, not editorial preference. Our multi-model AI judge council also helps catch bias that any single perspective might introduce.",
  },
  {
    question: "Can I use Argumend in my classroom?",
    answer: "Yes\u2014we actively encourage educational use. Argumend is a valuable tool for teaching critical thinking, argument analysis, and evidence evaluation. Teachers can use curated topics to illustrate how complex debates decompose into testable claims, or have students submit their own texts for AI-powered analysis. Visit our For Educators page for lesson plan ideas and tips on integrating Argumend into your curriculum.",
  },
  {
    question: "What\u2019s the difference between a crux and a key question?",
    answer: "A crux is a specific, often testable claim that sits at the heart of a disagreement\u2014if you resolved the crux, one or both sides would update their position. A key question is broader and may not have a single decisive answer. For example, \u201cDoes increasing minimum wage reduce total employment?\u201d is a crux because answering it definitively would shift the debate. \u201cWhat is the best economic policy?\u201d is a key question but not a crux\u2014it\u2019s too broad to resolve a specific disagreement.",
  },
  {
    question: "How do you handle topics where the science is still evolving?",
    answer: "We mark these topics as \u201ccontested\u201d or \u201chighly speculative\u201d and set confidence scores accordingly. Crux questions for evolving topics are often tagged with a \u201ctheoretical\u201d verification status, indicating that the decisive test is possible but hasn\u2019t been conclusively performed. As new research emerges, we update scores and evidence. We believe it\u2019s more honest to say \u201cwe\u2019re at 55% confidence and here\u2019s why\u201d than to pretend certainty where none exists.",
  },
  {
    question: "Can I export or share my analysis results?",
    answer: "Every analysis gets a unique, shareable URL that anyone can view without an account. You can also use the share buttons on any analysis page to post directly to Twitter/X or LinkedIn, or copy the link to your clipboard. We plan to add PDF and structured data exports in a future update.",
  },
];

export default function FAQPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 md:px-8 py-6 md:py-12">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary mb-6 leading-[1.08]">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-secondary leading-relaxed max-w-2xl mb-10">
          Common questions about the platform and our methodology.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/80 rounded-xl p-5 border border-[#e8e0d4]"
            >
              <h2 className="font-serif text-lg text-primary mb-2">
                {faq.question}
              </h2>
              <p className="text-primary leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-stone-200">
          <p className="text-sm text-secondary">
            Have a question not answered here? Visit the Community page to learn how to reach us.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
