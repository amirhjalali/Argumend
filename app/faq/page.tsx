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
];

export default function FAQPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 md:px-8 py-6 md:py-12">
        <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#3d3a36] mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-[#6a5f56] mb-10">
          Common questions about the platform and our methodology.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/80 rounded-xl p-5 border border-[#e8e0d4]"
            >
              <h2 className="font-serif text-lg text-[#3d3a36] mb-2">
                {faq.question}
              </h2>
              <p className="text-[#4e473f] leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-stone-200">
          <p className="text-sm text-[#6a5f56]">
            Have a question not answered here? Visit the Community page to learn how to reach us.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
