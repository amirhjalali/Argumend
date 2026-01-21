"use client";

import { AppShell } from "@/components/AppShell";
import { Scale, Lightbulb, BookOpen, Target, Heart, Zap, Users, Shield, Quote } from "lucide-react";

const principles = [
  {
    icon: Shield,
    title: "Steel-Manning",
    description: "We present the strongest version of every argument. If you can't articulate why intelligent people hold a position, you don't understand it well enough to disagree.",
    color: "#D4A012",
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
    color: "#CF7B3E",
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
      <div className="mx-auto max-w-3xl px-6 md:px-8 py-12 md:py-16">
        {/* Hero */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A012] mb-4">
            About Argumend
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight text-primary mb-6 leading-[1.1]">
            What if we could disagree<br />
            <span className="text-[#D4A012]">without destroying each other?</span>
          </h1>
          <p className="text-lg md:text-xl text-secondary leading-relaxed">
            Most debates generate heat, not light. We yell past each other, strawman positions we don't understand,
            and walk away more certain—and more divided—than before.
          </p>
        </div>

        {/* Pull Quote */}
        <blockquote className="my-10 md:my-12 py-6 border-l-4 border-[#D4A012] pl-6 bg-gradient-to-r from-[#D4A012]/5 to-transparent rounded-r-xl">
          <p className="font-serif text-xl md:text-2xl text-primary italic leading-relaxed">
            &ldquo;The goal is not to win debates, but to converge on truth—together.&rdquo;
          </p>
        </blockquote>

        {/* Why It Matters */}
        <section className="mb-12 md:mb-16">
          <h2 className="font-serif text-2xl md:text-3xl text-primary mb-4">Why this matters</h2>
          <p className="text-lg text-secondary leading-relaxed mb-8">
            Bad epistemics aren't just intellectually frustrating. They cause real harm.
          </p>

          <div className="grid gap-4">
            {stakes.map((stake) => (
              <div
                key={stake.title}
                className="flex items-start gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200"
              >
                <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <stake.icon className="h-5 w-5 text-stone-500" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">{stake.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed">{stake.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Approach */}
        <section className="mb-12 md:mb-16">
          <h2 className="font-serif text-2xl md:text-3xl text-primary mb-4">A different approach</h2>
          <p className="text-lg text-secondary leading-relaxed mb-6">
            Argumend maps controversial topics visually, breaking each one into:
          </p>
          <ul className="space-y-4 text-base md:text-lg text-secondary mb-6">
            <li className="flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B5A3C] mt-2 flex-shrink-0" />
              <span><strong className="text-primary">The strongest objection</strong> — steel-manned, not strawmanned</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4A012] mt-2 flex-shrink-0" />
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
        <section className="mb-12 md:mb-16">
          <h2 className="font-serif text-2xl md:text-3xl text-primary mb-6 md:mb-8">Core principles</h2>
          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="group relative bg-white rounded-2xl p-5 md:p-6 border border-stone-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{ borderLeftWidth: "4px", borderLeftColor: principle.color }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${principle.color}15` }}
                >
                  <principle.icon
                    className="h-5 w-5"
                    style={{ color: principle.color }}
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-serif text-lg md:text-xl text-primary mb-2">{principle.title}</h3>
                <p className="text-sm md:text-base text-secondary leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy */}
        <section className="mb-12 md:mb-16">
          <h2 className="font-serif text-2xl md:text-3xl text-primary mb-4">Philosophy</h2>
          <div className="space-y-4 text-base md:text-lg text-secondary leading-relaxed">
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
        <section className="bg-gradient-to-br from-[#D4A012]/10 via-[#CF7B3E]/5 to-transparent rounded-2xl p-6 md:p-8 mb-10 md:mb-12">
          <h2 className="font-serif text-xl md:text-2xl text-primary mb-4">Understanding confidence scores</h2>
          <p className="text-sm text-secondary mb-6">
            We don't claim to know the truth. We estimate how confident we should be based on available evidence.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="w-16 h-8 rounded-full bg-gradient-to-r from-[#D4A012] to-[#E8B923] flex items-center justify-center text-white text-sm font-bold shadow-sm">
                90%+
              </span>
              <p className="text-sm text-secondary">
                <strong className="text-primary">Settled</strong> — Overwhelming evidence, scientific consensus
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-16 h-8 rounded-full bg-gradient-to-r from-[#CF7B3E] to-[#E09555] flex items-center justify-center text-white text-sm font-bold shadow-sm">
                50-80%
              </span>
              <p className="text-sm text-secondary">
                <strong className="text-primary">Probable</strong> — Good evidence, some uncertainty remains
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-16 h-8 rounded-full bg-gradient-to-r from-[#8B5A3C] to-[#A67350] flex items-center justify-center text-white text-sm font-bold shadow-sm">
                &lt;50%
              </span>
              <p className="text-sm text-secondary">
                <strong className="text-primary">Contested</strong> — Genuine uncertainty, reasonable people disagree
              </p>
            </div>
          </div>
        </section>

        {/* Voices of Reason */}
        <section className="mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Quote className="h-5 w-5 text-[#D4A012]" strokeWidth={1.5} />
            <h2 className="font-serif text-2xl md:text-3xl text-primary">Voices of reason</h2>
          </div>
          <div className="grid gap-4">
            {quotes.map((quote, i) => (
              <div
                key={i}
                className="relative p-5 rounded-xl bg-gradient-to-br from-stone-50 to-white border border-stone-200"
              >
                <Quote className="absolute top-4 right-4 h-8 w-8 text-stone-200" strokeWidth={1} />
                <p className="font-serif text-lg text-primary leading-relaxed mb-3 pr-8">
                  &ldquo;{quote.text}&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4A012]/20 to-[#CF7B3E]/10 flex items-center justify-center">
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
        <section className="text-center py-8 border-t border-stone-200">
          <h3 className="font-serif text-xl md:text-2xl text-primary mb-3">Ready to think differently?</h3>
          <p className="text-secondary mb-6">Pick a topic. Explore the map. Find the crux.</p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4A012] to-[#CF7B3E] text-white font-semibold shadow-lg shadow-[#D4A012]/20 hover:shadow-xl hover:shadow-[#D4A012]/30 hover:-translate-y-0.5 transition-all"
          >
            Start Exploring
            <Scale className="h-4 w-4" />
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
