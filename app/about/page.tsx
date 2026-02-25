import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { ArrowRight } from "lucide-react";
import { quotes as allQuotes } from "@/data/quotes";

const principles = [
  {
    title: "Steel-Manning",
    description: "We present the strongest version of every argument. If you can't articulate why intelligent people hold a position, you don't understand it well enough to disagree.",
  },
  {
    title: "Crux Identification",
    description: "Every disagreement has a crux—the specific evidence that would change minds. We find it and make it explicit. This is where understanding happens.",
  },
  {
    title: "Calibrated Confidence",
    description: "We report uncertainty honestly. 90%+ means overwhelming evidence. 45% means genuinely contested. We never pretend to know more than we do.",
  },
  {
    title: "Source Transparency",
    description: "Every claim links to its evidence. We show our work so you can verify independently—and correct us when we're wrong.",
  },
];

const stakes = [
  {
    title: "Relationships fracture",
    description: "When we can't discuss hard topics honestly, we retreat to our corners. Families split. Friendships end. Communities fragment.",
  },
  {
    title: "Decisions suffer",
    description: "From climate policy to medical choices, poor epistemics lead to poor decisions. The cost is measured in lives, not just arguments.",
  },
  {
    title: "Trust erodes",
    description: "When every institution is accused of bias and every expert dismissed, we lose the ability to coordinate on anything.",
  },
];

// Pick a curated subset from the shared quotes for the about page
const quotes = allQuotes.slice(0, 6);

export default function AboutPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        {/* Hero — no label, heading-first */}
        <div className="bg-gradient-to-b from-[#f4f1eb]/80 to-transparent -mx-4 md:-mx-8 px-4 md:px-8 py-12 sm:py-16 lg:py-20 mb-16 md:mb-24">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] tracking-tight text-primary mb-7 leading-[1.08]">
            What if we could disagree<br />
            <span className="text-stone-500">without destroying each other?</span>
          </h1>
          <p className="text-lg text-secondary leading-relaxed max-w-2xl">
            Most debates generate heat, not light. We yell past each other, strawman positions we don&apos;t understand,
            and walk away more certain than before. Also more divided. That&apos;s not a coincidence.
          </p>
        </div>

        {/* Why It Matters — flows directly from hero, no blockquote */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">Why this matters</h2>
          <p className="text-lg text-secondary leading-relaxed mb-8">
            Bad epistemics aren&apos;t just intellectually frustrating. They cause real harm.
          </p>

          <div className="grid gap-3">
            {stakes.map((stake) => (
              <div
                key={stake.title}
                className="p-5 rounded-xl bg-[#faf8f5] border border-stone-200/60"
              >
                <h3 className="font-semibold text-primary mb-1.5">{stake.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{stake.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Approach — whitespace separation, no divider */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">A different approach</h2>
          <p className="text-lg text-secondary leading-relaxed mb-7">
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

        {/* Principles — whitespace separation, no divider */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">Core principles</h2>
          <p className="text-lg text-secondary mb-8 md:mb-10">These aren&apos;t aspirational. They&apos;re how we actually work.</p>
          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {principles.map((principle, i) => (
              <div
                key={principle.title}
                className="bg-[#fefcf9] rounded-xl p-5 md:p-6 border border-stone-200/60"
              >
                <span className="font-mono text-xs font-bold text-stone-400/80 mb-3 block">0{i + 1}</span>
                <h3 className="font-serif text-lg text-primary mb-2">{principle.title}</h3>
                <p className="text-[14px] md:text-[15px] text-secondary leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy */}
        <section className="mb-16 md:mb-24 bg-white/50 -mx-4 md:-mx-8 px-4 md:px-8 py-10 md:py-14 rounded-2xl">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">Philosophy</h2>
          <div className="space-y-5 text-base md:text-lg text-secondary leading-[1.75]">
            <p>
              We draw from the rationalist tradition&mdash;Socratic questioning, Bayesian updating, the principle
              of charity. But this isn&apos;t a worldview pitch. It&apos;s a tool that helps you think more clearly.
            </p>
            <p>
              Our core belief: <strong className="text-primary">You are not your ideas.</strong>
            </p>
            <p>
              Ideas are lenses to pick up, examine, and set down. When someone challenges your idea,
              they&apos;re not attacking you—they&apos;re offering a different lens. Maybe theirs is better.
              Maybe yours is. The only way to find out is to examine both honestly.
            </p>
            <p>
              That&apos;s harder than it sounds. Most of us aren&apos;t naturally good at it. It takes practice,
              and a willingness to say &ldquo;I don&apos;t know&rdquo; or &ldquo;I was wrong&rdquo;&mdash;two
              of the most useful sentences in any language.
            </p>
            <p className="font-medium text-primary">
              Argumend is for people who want to do that work.
            </p>
          </div>
        </section>

        {/* Confidence Explainer */}
        <section className="bg-[#faf8f5] rounded-2xl p-6 md:p-8 mb-16 md:mb-24 border border-stone-200/60">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">Understanding confidence scores</h2>
          <p className="text-sm text-secondary mb-6">
            We don&apos;t claim to know the truth. We show you how confident the evidence makes us&mdash;and let you decide.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-mono tabular-nums text-deep text-2xl font-bold w-16 text-center">
                90%+
              </span>
              <p className="text-sm text-stone-600">
                <strong className="text-stone-900">Settled</strong> — Overwhelming evidence, scientific consensus
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono tabular-nums text-deep text-2xl font-bold w-16 text-center">
                50-89%
              </span>
              <p className="text-sm text-stone-600">
                <strong className="text-stone-900">Probable</strong> — Good evidence, some uncertainty remains
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono tabular-nums text-deep text-2xl font-bold w-16 text-center">
                &lt;50%
              </span>
              <p className="text-sm text-stone-600">
                <strong className="text-stone-900">Contested</strong> — Genuine uncertainty, reasonable people disagree
              </p>
            </div>
          </div>
        </section>

        {/* Voices of Reason — 2-column masonry for visual variety */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-8">Voices of reason</h2>
          <div className="columns-1 md:columns-2 gap-4 [&>*]:mb-4">
            {quotes.map((quote, i) => (
              <div
                key={i}
                className="break-inside-avoid p-5 rounded-xl border border-stone-200/60 bg-white/50"
              >
                <p className="font-serif text-lg text-primary italic leading-relaxed mb-3">
                  &ldquo;{quote.text}&rdquo;
                </p>
                <p className="text-sm text-secondary">
                  <span className="font-semibold text-primary">{quote.author}</span>
                  {quote.role && <span> &mdash; {quote.role}</span>}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Gentle close — inline link, no big CTA box */}
        <div className="text-center py-12 mb-8">
          <p className="text-secondary mb-4">Question everything — including this.</p>
          <Link
            href="/topics"
            className="inline-flex items-center gap-2 text-sm font-medium text-rust-500 hover:text-rust-600 transition-colors"
          >
            Explore topics
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
