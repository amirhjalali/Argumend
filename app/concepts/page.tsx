import Link from "next/link";
import { ArrowLeft, Target, Layers, FlaskConical, Scale } from "lucide-react";

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
    <div className="min-h-screen bg-[#f5f0e8]">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-sm text-[#6a5f56] hover:text-[#3d3a36] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Canvas
        </Link>

        <h1 className="font-serif text-4xl tracking-tight text-[#3d3a36] mb-4">
          Key Concepts
        </h1>
        <p className="text-lg text-[#6a5f56] mb-12">
          Understanding the framework behind structured argumentation.
        </p>

        <div className="space-y-8">
          {concepts.map((concept) => (
            <div
              key={concept.title}
              className="bg-white rounded-lg p-6 shadow-sm border border-stone-200"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#f5f0e8] rounded-lg">
                  <concept.icon className="h-6 w-6 text-[#3d3a36]" />
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

        <div className="mt-12 bg-white rounded-lg p-6 shadow-sm border border-stone-200">
          <h2 className="font-serif text-xl text-[#3d3a36] mb-3">
            The Methodology
          </h2>
          <p className="text-[#4e473f] leading-relaxed mb-4">
            Our approach draws from several traditions:
          </p>
          <ul className="space-y-2 text-[#4e473f]">
            <li className="flex items-start gap-2">
              <span className="text-[#6a5f56]">&bull;</span>
              <span><strong>Steel-manning</strong> — presenting the strongest version of opposing arguments</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6a5f56]">&bull;</span>
              <span><strong>Crux identification</strong> — finding the precise point where disagreements hinge</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6a5f56]">&bull;</span>
              <span><strong>Bayesian reasoning</strong> — updating confidence based on evidence</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6a5f56]">&bull;</span>
              <span><strong>Falsificationism</strong> — focusing on what could prove a claim wrong</span>
            </li>
          </ul>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-300">
          <p className="text-sm text-[#6a5f56]">
            These concepts form the backbone of productive disagreement.
          </p>
        </div>
      </div>
    </div>
  );
}
