"use client";

import { Target, Layers, FlaskConical, Scale } from "lucide-react";
import { AppShell } from "@/components/AppShell";

const concepts = [
  {
    icon: Layers,
    title: "Pillars",
    description: "The foundational arguments that support or challenge a claim.",
    details: "Each topic is broken into exactly three pillars—the core arguments that must be addressed to form a reasoned position. Pillars represent the strongest versions of both skeptic and proponent positions, ensuring intellectual honesty.",
  },
  {
    icon: Target,
    title: "Cruxes",
    description: "The decisive tests that could resolve a disagreement.",
    details: "A crux is the specific evidence or experiment that would change minds. If we disagree, finding our crux means identifying exactly what evidence would convince us otherwise. This transforms abstract debates into concrete, testable questions.",
  },
  {
    icon: Scale,
    title: "Confidence Scores",
    description: "A numerical estimate of how settled a question is.",
    details: "Scores range from 0-100% and reflect the weight of evidence and expert consensus. A score of 95% (like climate change) indicates overwhelming evidence. A score of 45% (like free will) indicates genuine uncertainty where reasonable people disagree.",
  },
  {
    icon: FlaskConical,
    title: "Verification Status",
    description: "Whether the crux has been tested and what it would cost.",
    details: "Each crux is marked as verified (tested and confirmed), theoretical (testable but not yet done), or impossible (cannot be tested with current technology). We also estimate the cost to verify, from $0 for data analysis to millions for new experiments.",
  },
];

export default function ConceptsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 md:px-8 py-6 md:py-12">
        <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#3d3a36] mb-4">
          Key Concepts
        </h1>
        <p className="text-lg text-[#6a5f56] mb-10">
          Understanding the framework behind structured argumentation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {concepts.map((concept) => (
            <div
              key={concept.title}
              className="bg-white/80 rounded-xl p-6 border border-[#e8e0d4]"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-[#f5f1ea] to-[#ebe6de] rounded-lg border border-[#e8e0d4]">
                  <concept.icon className="h-5 w-5 text-[#4f7b77]" strokeWidth={1.8} />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-[#3d3a36] mb-1">
                    {concept.title}
                  </h2>
                  <p className="text-[#6a5f56] font-medium mb-3">
                    {concept.description}
                  </p>
                  <p className="text-[#4e473f] leading-relaxed">
                    {concept.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white/80 rounded-xl p-6 border border-[#e8e0d4]">
          <h2 className="font-serif text-xl text-[#3d3a36] mb-3">
            The Methodology
          </h2>
          <p className="text-[#4e473f] leading-relaxed mb-4">
            Our approach draws from several traditions:
          </p>
          <ul className="space-y-2 text-[#4e473f]">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4f7b77] mt-2 flex-shrink-0" />
              <span><strong>Steel-manning</strong> — presenting the strongest version of opposing arguments</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4f7b77] mt-2 flex-shrink-0" />
              <span><strong>Crux identification</strong> — finding the precise point where disagreements hinge</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4f7b77] mt-2 flex-shrink-0" />
              <span><strong>Bayesian reasoning</strong> — updating confidence based on evidence</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4f7b77] mt-2 flex-shrink-0" />
              <span><strong>Falsificationism</strong> — focusing on what could prove a claim wrong</span>
            </li>
          </ul>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-200">
          <p className="text-sm text-[#6a5f56]">
            These concepts form the backbone of productive disagreement.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
