"use client";

import { AppShell } from "@/components/AppShell";

export default function AboutPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-8 py-12">
        <h1 className="font-serif text-4xl tracking-tight text-[#3d3a36] mb-8">
          About Argumend
        </h1>

        <div className="prose prose-stone max-w-none space-y-6 text-[#4e473f]">
          <p className="text-lg leading-relaxed">
            Argumend is a platform for exploring controversial topics through structured logical analysis.
            We believe that clear thinking requires clear visualization of arguments.
          </p>

          <h2 className="font-serif text-2xl text-[#3d3a36] mt-10 mb-4">
            Our Approach
          </h2>
          <p className="leading-relaxed">
            Each topic is broken down into <strong>foundational pillars</strong>—the core arguments
            that must be addressed to form a well-reasoned position. For each pillar, we present:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The strongest version of the skeptic&apos;s argument (steel-manning)</li>
            <li>The proponent&apos;s rebuttal with supporting evidence</li>
            <li>A <strong>crux</strong>—the definitive test or evidence that could resolve the debate</li>
          </ul>

          <h2 className="font-serif text-2xl text-[#3d3a36] mt-10 mb-4">
            Philosophy
          </h2>
          <p className="leading-relaxed">
            We draw inspiration from classical rhetoric and the Socratic method. Rather than declaring
            winners, we aim to illuminate the logical structure underlying disagreements. Often, people
            who disagree share more common ground than they realize—they simply weight evidence differently
            or hold different priors.
          </p>

          <h2 className="font-serif text-2xl text-[#3d3a36] mt-10 mb-4">
            Confidence Scores
          </h2>
          <p className="leading-relaxed">
            Each topic displays a confidence score reflecting the current state of evidence and expert
            consensus. A score of 95% indicates a settled matter with overwhelming evidence (like
            anthropogenic climate change), while 45% suggests a genuinely contested question where
            reasonable people can disagree (like the nature of free will).
          </p>

          <div className="mt-12 pt-8 border-t border-stone-300">
            <p className="text-sm text-[#6a5f56]">
              Built with intellectual honesty. Question everything, including this.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
