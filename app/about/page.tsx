"use client";

import { AppShell } from "@/components/AppShell";
import { Scale, Lightbulb, BookOpen, Target } from "lucide-react";

const principles = [
  {
    icon: Scale,
    title: "Steel-Manning",
    description: "We present the strongest version of every argument. If you can't articulate why smart people hold a position, you don't understand it well enough to critique it.",
    color: "#2d7a6f",
  },
  {
    icon: Target,
    title: "Crux Identification",
    description: "Every disagreement has a crux—the specific evidence that would change minds. We find it and make it explicit.",
    color: "#a23b3b",
  },
  {
    icon: Lightbulb,
    title: "Calibrated Confidence",
    description: "We report uncertainty honestly. 95% means settled science. 45% means genuinely contested. We never pretend to know more than we do.",
    color: "#c9a227",
  },
  {
    icon: BookOpen,
    title: "Source Transparency",
    description: "Every claim links to its evidence. We show our work so you can verify independently and update when we're wrong.",
    color: "#6b5b95",
  },
];

export default function AboutPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-8 py-16">
        {/* Hero */}
        <div className="mb-16">
          <h1 className="font-serif text-5xl md:text-6xl tracking-tight text-primary mb-6">
            About Argumend
          </h1>
          <p className="text-xl md:text-2xl text-secondary leading-relaxed">
            A platform for exploring controversial topics through structured logical analysis.
            We believe that clear thinking requires clear visualization of arguments.
          </p>
        </div>

        {/* Pull Quote */}
        <blockquote className="pull-quote my-12">
          &ldquo;The goal is not to win debates, but to converge on truth.&rdquo;
        </blockquote>

        {/* Our Approach */}
        <section className="mb-16">
          <h2 className="font-serif text-3xl text-primary mb-6">Our Approach</h2>
          <p className="text-lg text-secondary leading-relaxed mb-6">
            Each topic is broken down into <strong>foundational pillars</strong>—the core arguments
            that must be addressed to form a well-reasoned position. For each pillar, we present:
          </p>
          <ul className="space-y-3 text-lg text-secondary">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-skeptic mt-2.5 flex-shrink-0" />
              <span>The strongest version of the skeptic&apos;s argument (steel-manning)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-evidence mt-2.5 flex-shrink-0" />
              <span>The proponent&apos;s rebuttal with supporting evidence</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-crux mt-2.5 flex-shrink-0" />
              <span>A <strong>crux</strong>—the definitive test or evidence that could resolve the debate</span>
            </li>
          </ul>
        </section>

        {/* Principles Grid */}
        <section className="mb-16">
          <h2 className="font-serif text-3xl text-primary mb-8">Core Principles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="group relative bg-white/80 rounded-2xl p-6 border border-stone-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{ borderLeftWidth: "4px", borderLeftColor: principle.color }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${principle.color}15` }}
                >
                  <principle.icon
                    className="h-6 w-6"
                    style={{ color: principle.color }}
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-serif text-xl text-primary mb-2">{principle.title}</h3>
                <p className="text-secondary leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy */}
        <section className="mb-16">
          <h2 className="font-serif text-3xl text-primary mb-6">Philosophy</h2>
          <p className="text-lg text-secondary leading-relaxed mb-6">
            We draw inspiration from classical rhetoric and the Socratic method. Rather than declaring
            winners, we aim to illuminate the logical structure underlying disagreements. Often, people
            who disagree share more common ground than they realize—they simply weight evidence differently
            or hold different priors.
          </p>
          <p className="text-lg text-secondary leading-relaxed">
            Our core belief: <strong className="text-primary">You are not your ideas.</strong> Ideas are lenses
            to pick up, examine, and set down. When someone challenges your idea, they&apos;re not attacking you—
            they&apos;re offering a different lens. Maybe theirs is better. Maybe yours is. The only way to find
            out is to examine both honestly.
          </p>
        </section>

        {/* Confidence Explainer */}
        <section className="bg-gradient-to-br from-accent-main/10 to-evidence/5 rounded-2xl p-8 mb-12">
          <h2 className="font-serif text-2xl text-primary mb-4">Understanding Confidence Scores</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="w-16 h-8 rounded-full bg-gradient-to-r from-score-high to-evidence flex items-center justify-center text-white text-sm font-bold">
                95%+
              </span>
              <p className="text-secondary">
                <strong className="text-primary">Settled</strong> — Overwhelming evidence, scientific consensus
                (e.g., anthropogenic climate change)
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-16 h-8 rounded-full bg-gradient-to-r from-score-mid to-amber-500 flex items-center justify-center text-white text-sm font-bold">
                50-80%
              </span>
              <p className="text-secondary">
                <strong className="text-primary">Probable</strong> — Strong evidence, some uncertainty
                (e.g., specific diet recommendations)
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-16 h-8 rounded-full bg-gradient-to-r from-score-low to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                &lt;50%
              </span>
              <p className="text-secondary">
                <strong className="text-primary">Contested</strong> — Genuine uncertainty, reasonable disagreement
                (e.g., the nature of consciousness)
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="pt-8 border-t border-stone-300">
          <p className="text-sm text-muted italic">
            Built with intellectual honesty. Question everything, including this.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
