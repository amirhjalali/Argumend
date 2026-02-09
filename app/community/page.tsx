"use client";

import { MessageSquare, Shield, Scale, Lightbulb } from "lucide-react";
import { AppShell } from "@/components/AppShell";

const principles = [
  {
    icon: Shield,
    title: "Steel-man, Don't Straw-man",
    description:
      "Present the strongest version of opposing views. If you can't articulate why smart people hold a position, you don't understand it well enough to critique it.",
  },
  {
    icon: Scale,
    title: "Seek Truth, Not Victory",
    description:
      'The goal is to update beliefs based on evidence, not to "win" debates. Being wrong is valuable—it means you learned something.',
  },
  {
    icon: Lightbulb,
    title: "Identify Cruxes",
    description:
      "When you disagree, find the specific evidence that would change your mind. If nothing could change your mind, you're not reasoning—you're rationalizing.",
  },
  {
    icon: MessageSquare,
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
      <div className="mx-auto max-w-4xl px-8 py-12">
        <h1 className="font-serif text-4xl tracking-tight text-[#3d3a36] mb-4">
          Community
        </h1>
        <p className="text-lg text-[#6a5f56] mb-10">
          Join a growing community of people who disagree well. We believe the
          best way to find truth is to test ideas rigorously — not to shout the
          loudest.
        </p>

        {/* Discussion Principles */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl text-[#3d3a36] mb-5">
            Discussion Principles
          </h2>
          <div className="space-y-3">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="bg-white/80 rounded-xl p-5 border border-[#e8e0d4]"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-gradient-to-br from-[#f5f1ea] to-[#ebe6de] rounded-lg border border-[#e8e0d4]">
                    <principle.icon
                      className="h-4 w-4 text-[#4f7b77]"
                      strokeWidth={1.8}
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-[#3d3a36] mb-1">
                      {principle.title}
                    </h3>
                    <p className="text-[#4e473f] leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How to Contribute */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl text-[#3d3a36] mb-5">
            How to Contribute
          </h2>
          <div className="bg-white/80 rounded-xl border border-[#e8e0d4] divide-y divide-[#e8e0d4]">
            {contributing.map((item) => (
              <div key={item.title} className="p-5">
                <h3 className="font-serif text-lg text-[#3d3a36] mb-2">
                  {item.title}
                </h3>
                <p className="text-[#4e473f] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <a
              href="https://github.com/amirhjalali/Argumend"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#3d3a36] text-white rounded-lg font-medium text-sm hover:bg-[#2a2826] transition-colors"
            >
              Contribute on GitHub &rarr;
            </a>
          </div>
        </section>

        {/* Ideological Turing Test */}
        <section className="bg-gradient-to-br from-[#3d3a36] to-[#2a2826] text-white rounded-xl p-6">
          <h2 className="font-serif text-xl mb-3">
            The Ideological Turing Test
          </h2>
          <p className="text-stone-300 leading-relaxed">
            Before criticizing a position, try to pass the ideological Turing
            test: Can you articulate the opposing view well enough that its
            proponents would say &ldquo;yes, that&apos;s what I believe&rdquo;?
            If not, you&apos;re arguing against a phantom, not a real position.
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-stone-200">
          <p className="text-sm text-[#6a5f56]">
            Good discourse is a skill. These principles help us practice it
            together. Have a topic suggestion? We&apos;d love to hear from you.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
