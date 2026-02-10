"use client";

import { AppShell } from "@/components/AppShell";
import { Scale, Lightbulb, BookOpen, Target, Heart, Zap, Users, Shield, Quote } from "lucide-react";

const principles = [
  {
    icon: Shield,
    title: "Steel-Manning",
    description: "We present the strongest version of every argument. If you can't articulate why intelligent people hold a position, you don't understand it well enough to disagree.",
    color: "#C4613C",
  },
  {
    icon: Target,
    title: "Crux Identification",
    description: "Every disagreement has a crux—the specific evidence that would change minds. We find it and make it explicit. This is where understanding happens.",
    color: "#a23b3b",
  },
  {
    icon: Lightbulb,
    title: "Calibrated Confidence",
    description: "We report uncertainty honestly. 95% means overwhelming evidence. 45% means genuinely contested. We never pretend to know more than we do.",
    color: "#b05434",
  },
  {
    icon: BookOpen,
    title: "Source Transparency",
    description: "Every claim links to its evidence. We show our work so you can verify independently—and correct us when we're wrong.",
    color: "#6b5b95",
  },
];

const stakes = [
  {
    icon: Heart,
    title: "Relationships fracture",
    description: "When we can't discuss hard topics honestly, we retreat to our corners. Families split. Friendships end. Communities fragment.",
  },
  {
    icon: Zap,
    title: "Decisions suffer",
    description: "From climate policy to medical choices, poor epistemics lead to poor decisions. The cost is measured in lives, not just arguments.",
  },
  {
    icon: Users,
    title: "Trust erodes",
    description: "When every institution is accused of bias and every expert dismissed, we lose the ability to coordinate on anything.",
  },
];

const quotes = [
  {
    text: "The first principle is that you must not fool yourself — and you are the easiest person to fool.",
    author: "Richard Feynman",
    role: "Physicist, Nobel Laureate",
  },
  {
    text: "The ability to destroy your ideas rapidly instead of slowly when the occasion is right is one of the most valuable qualities you can acquire.",
    author: "Charlie Munger",
    role: "Investor, Polymath",
  },
  {
    text: "A wise man proportions his belief to the evidence.",
    author: "David Hume",
    role: "Philosopher",
  },
];

export default function AboutPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 md:px-8 py-6 md:py-20">
        {/* Hero */}
        <div className="mb-14 md:mb-20">
          <p className="text-[12px] font-medium text-stone-400 mb-4">
            About
          </p>
          <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-[3.5rem] tracking-tight text-primary mb-7 leading-[1.08]">
            What if we could disagree<br />
            <span className="text-stone-500">without destroying each other?</span>
          </h1>
          <p className="text-lg md:text-xl text-secondary leading-[1.7] max-w-2xl">
            Most debates generate heat, not light. We yell past each other, strawman positions we don't understand,
            and walk away more certain—and more divided—than before.
          </p>
        </div>

        {/* Pull Quote */}
        <blockquote className="my-12 md:my-16 py-6 border-l-2 border-stone-300 pl-6 md:pl-7">
          <p className="font-serif text-xl md:text-2xl text-primary italic leading-[1.6]">
            &ldquo;The goal is not to win debates, but to converge on truth—together.&rdquo;
          </p>
        </blockquote>

        {/* Why It Matters */}
        <section className="mb-14 md:mb-20">
          <h2 className="font-serif text-2xl md:text-3xl text-primary mb-3">Why this matters</h2>
          <p className="text-lg text-secondary leading-[1.7] mb-8">
            Bad epistemics aren't just intellectually frustrating. They cause real harm.
          </p>

          <div className="grid gap-3">
            {stakes.map((stake) => (
              <div
                key={stake.title}
                className="flex items-start gap-4 p-4 rounded-lg bg-[#faf8f3] border border-stone-200/70"
              >
                <div className="w-10 h-10 rounded-lg bg-stone-100/80 flex items-center justify-center flex-shrink-0">
                  <stake.icon className="h-5 w-5 text-stone-500" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1.5">{stake.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed">{stake.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Approach */}
        <section className="mb-14 md:mb-20">
          <h2 className="font-serif text-2xl md:text-3xl text-primary mb-3">A different approach</h2>
          <p className="text-lg text-secondary leading-[1.7] mb-7">
            Argumend maps controversial topics visually, breaking each one into:
          </p>
          <ul className="space-y-4 text-base md:text-lg text-secondary mb-6">
            <li className="flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B5A3C] mt-2 flex-shrink-0" />
              <span><strong className="text-primary">The strongest objection</strong> — steel-manned, not strawmanned</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C4613C] mt-2 flex-shrink-0" />
              <span><strong className="text-primary">The best response</strong> — with evidence, not rhetoric</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#a23b3b] mt-2 flex-shrink-0" />
              <span><strong className="text-primary">The crux</strong> — the question that would actually resolve the debate</span>
            </li>
          </ul>
          <p className="text-lg text-secondary leading-relaxed">
            You leave not just knowing what people believe, but <em>why</em> they believe it—and what
            evidence would change your own mind.
          </p>
        </section>

        {/* Principles Grid */}
        <section className="mb-14 md:mb-20">
          <h2 className="font-serif text-2xl md:text-3xl text-primary mb-8 md:mb-10">Core principles</h2>
          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="bg-[#fefcf9] rounded-lg p-5 md:p-6 border border-stone-200/70"
                style={{ borderLeftWidth: "4px", borderLeftColor: principle.color }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${principle.color}12` }}
                >
                  <principle.icon
                    className="h-5 w-5"
                    style={{ color: principle.color }}
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-serif text-lg md:text-xl text-primary mb-2">{principle.title}</h3>
                <p className="text-[14px] md:text-[15px] text-secondary leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy */}
        <section className="mb-14 md:mb-20">
          <h2 className="font-serif text-2xl md:text-3xl text-primary mb-5">Philosophy</h2>
          <div className="space-y-5 text-base md:text-lg text-secondary leading-[1.75]">
            <p>
              We draw from the rationalist tradition—Socratic questioning, Bayesian updating, the principle
              of charity. But we're not trying to win converts to a worldview. We're trying to build a
              tool that helps anyone think more clearly.
            </p>
            <p>
              Our core belief: <strong className="text-primary">You are not your ideas.</strong>
            </p>
            <p>
              Ideas are lenses to pick up, examine, and set down. When someone challenges your idea,
              they're not attacking you—they're offering a different lens. Maybe theirs is better.
              Maybe yours is. The only way to find out is to examine both honestly.
            </p>
            <p>
              That's harder than it sounds. It requires intellectual humility, genuine curiosity, and
              the willingness to say "I don't know" or "I was wrong."
            </p>
            <p className="font-medium text-primary">
              Argumend is a tool for people who want to do that hard work.
            </p>
          </div>
        </section>

        {/* Confidence Explainer */}
        <section className="bg-stone-50 rounded-lg p-6 md:p-8 mb-12 md:mb-16 border border-stone-200">
          <h2 className="font-serif text-xl md:text-2xl text-primary mb-4">Understanding confidence scores</h2>
          <p className="text-sm text-secondary mb-6">
            We don't claim to know the truth. We estimate how confident we should be based on available evidence.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="w-14 text-center text-sm font-mono font-medium text-stone-700">
                90%+
              </span>
              <p className="text-sm text-stone-600">
                <strong className="text-stone-900">Settled</strong> — Overwhelming evidence, scientific consensus
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-14 text-center text-sm font-mono font-medium text-stone-700">
                50-80%
              </span>
              <p className="text-sm text-stone-600">
                <strong className="text-stone-900">Probable</strong> — Good evidence, some uncertainty remains
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-14 text-center text-sm font-mono font-medium text-stone-700">
                &lt;50%
              </span>
              <p className="text-sm text-stone-600">
                <strong className="text-stone-900">Contested</strong> — Genuine uncertainty, reasonable people disagree
              </p>
            </div>
          </div>
        </section>

        {/* Voices of Reason */}
        <section className="mb-14 md:mb-20">
          <div className="flex items-center gap-2.5 mb-8">
            <Quote className="h-5 w-5 text-[#C4613C]" strokeWidth={1.5} />
            <h2 className="font-serif text-2xl md:text-3xl text-primary">Voices of reason</h2>
          </div>
          <div className="grid gap-4">
            {quotes.map((quote, i) => (
              <div
                key={i}
                className="relative p-5 rounded-lg border border-stone-200"
              >
                <Quote className="absolute top-4 right-4 h-8 w-8 text-stone-200" strokeWidth={1} />
                <p className="font-serif text-lg text-primary leading-relaxed mb-3 pr-8">
                  &ldquo;{quote.text}&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C4613C]/20 to-[#b05434]/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-[#8B5A3C]">{quote.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary">{quote.author}</p>
                    <p className="text-xs text-secondary">{quote.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-10 border-t border-stone-200/80">
          <h3 className="font-serif text-xl md:text-2xl text-primary mb-3">Ready to think differently?</h3>
          <p className="text-secondary mb-7">Pick a topic. Explore the map. Find the crux.</p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1f1f1d] text-white text-sm font-medium hover:bg-[#3a3a38] transition-colors"
          >
            Start Exploring
            <Scale className="h-3.5 w-3.5" />
          </a>
        </section>

        {/* Footer */}
        <div className="pt-6 border-t border-stone-200 mt-8">
          <p className="text-sm text-muted italic text-center">
            Built with intellectual honesty. Question everything—including this.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
