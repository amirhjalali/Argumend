"use client";

import Link from "next/link";
import { MessageSquare, Shield, Scale, Lightbulb, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";

const principles = [
  {
    icon: Shield,
    number: "I",
    title: "Steel-man, Don't Straw-man",
    description:
      "Present the strongest version of opposing views. If you can't articulate why smart people hold a position, you don't understand it well enough to critique it.",
  },
  {
    icon: Scale,
    number: "II",
    title: "Seek Truth, Not Victory",
    description:
      'The goal is to update beliefs based on evidence, not to "win" debates. Being wrong is valuable—it means you learned something.',
  },
  {
    icon: Lightbulb,
    number: "III",
    title: "Identify Cruxes",
    description:
      "When you disagree, find the specific evidence that would change your mind. If nothing could change your mind, you're not reasoning—you're rationalizing.",
  },
  {
    icon: MessageSquare,
    number: "IV",
    title: "Be Specific",
    description:
      "Vague claims can't be tested. Good arguments point to specific evidence, define terms clearly, and make predictions that could be wrong.",
  },
];

const contributing = [
  {
    title: "Suggest New Topics",
    description:
      "We're always looking for contested questions that would benefit from structured analysis. Good candidates have strong arguments on multiple sides and testable cruxes.",
  },
  {
    title: "Improve Existing Topics",
    description:
      "Notice a weak argument? Know of better evidence? Submit improvements to make our steel-men stronger and our cruxes more precise.",
  },
  {
    title: "Challenge Our Confidence Scores",
    description:
      "If you think we've over- or under-weighted evidence, explain why. The best challenges come with specific citations.",
  },
];

export default function CommunityPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        {/* Hero */}
        <div className="bg-gradient-to-b from-[#f4f1eb] via-[#f4f1eb] to-[#faf8f5] -mx-4 md:-mx-8 px-4 md:px-8 py-12 sm:py-16 lg:py-20 mb-14 md:mb-20">
          <p className="text-[12px] font-medium tracking-widest uppercase text-deep/60 mb-5">
            Community
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary mb-7 leading-[1.08]">
            A community that<br />
            <span className="text-stone-500">disagrees well</span>
          </h1>
          <p className="text-lg text-stone-500 max-w-2xl leading-[1.7]">
            Join a growing community of people who believe the
            best way to find truth is to test ideas rigorously — not to shout the
            loudest.
          </p>
        </div>

        {/* Discussion Principles — Manifesto style */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">
            Our Principles
          </h2>
          <p className="text-lg text-stone-500 mb-10 max-w-2xl">These are the commitments we hold ourselves to. They are non-negotiable.</p>
          <div className="space-y-4">
            {principles.map((principle, i) => (
              <div
                key={principle.title}
                className="bg-[#faf8f5] rounded-xl p-6 border border-stone-200/70 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 animate-card-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start gap-5">
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <span className="font-serif text-2xl font-bold text-deep/30">{principle.number}</span>
                    <div className="p-2.5 bg-deep/10 rounded-xl">
                      <principle.icon
                        className="h-5 w-5 text-deep"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg md:text-xl text-primary mb-2">
                      {principle.title}
                    </h3>
                    <p className="text-secondary leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section transition */}
        <div className="h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent mb-16 md:mb-24" />

        {/* How to Contribute */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">
            How to Contribute
          </h2>
          <p className="text-lg text-stone-500 mb-8">Three ways to make Argumend better for everyone.</p>
          <div className="bg-white/80 rounded-2xl border border-[#e8e0d4] divide-y divide-[#e8e0d4] overflow-hidden">
            {contributing.map((item, i) => (
              <div key={item.title} className="p-6 hover:bg-[#faf8f5]/50 transition-colors">
                <div className="flex items-start gap-4">
                  <span className="font-mono text-xs font-bold text-deep/40 mt-1">0{i + 1}</span>
                  <div>
                    <h3 className="font-serif text-lg text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <a
              href="https://github.com/amirhjalali/Argumend"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rust-500 to-rust-600 text-white rounded-lg font-medium text-sm hover:from-rust-600 hover:to-rust-700 transition-all shadow-md hover:shadow-lg"
            >
              Contribute on GitHub
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </section>

        {/* Ideological Turing Test */}
        <section className="mb-16 md:mb-24">
          <div className="bg-gradient-to-br from-[#3d3a36] to-[#2a2826] text-white rounded-2xl p-8 md:p-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 text-white/80" strokeWidth={1.5} />
              </div>
              <h2 className="font-serif text-xl md:text-2xl">
                The Ideological Turing Test
              </h2>
            </div>
            <p className="text-stone-300 leading-relaxed text-lg ml-14">
              Before criticizing a position, try to pass the ideological Turing
              test: Can you articulate the opposing view well enough that its
              proponents would say &ldquo;yes, that&apos;s what I believe&rdquo;?
              If not, you&apos;re arguing against a phantom, not a real position.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-[#f0ece5] to-[#ebe6de] rounded-2xl p-8 sm:p-12 text-center mb-14 md:mb-20">
          <MessageSquare className="h-6 w-6 text-deep/40 mx-auto mb-4" strokeWidth={1.5} />
          <h3 className="font-serif text-xl md:text-2xl text-primary mb-3">Start the conversation</h3>
          <p className="text-secondary mb-7 max-w-md mx-auto">
            Good discourse is a skill. These principles help us practice it
            together. Have a topic suggestion? We&apos;d love to hear from you.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-rust-500 to-rust-600 text-white text-sm font-medium hover:from-rust-600 hover:to-rust-700 transition-all shadow-md hover:shadow-lg"
          >
            Explore Topics
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>

        <div className="pt-6 border-t border-stone-200 mb-8">
          <p className="text-sm text-muted italic text-center">
            Good discourse is a skill. These principles help us practice it together.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
