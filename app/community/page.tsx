import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";

const principles = [
  {
    number: "I",
    title: "Steel-man, Don't Straw-man",
    description:
      "Present the strongest version of opposing views. If you can't articulate why smart people hold a position, you don't understand it well enough to critique it.",
  },
  {
    number: "II",
    title: "Seek Truth, Not Victory",
    description:
      'The goal is to update beliefs based on evidence, not to "win" debates. Being wrong is valuable—it means you learned something.',
  },
  {
    number: "III",
    title: "Identify Cruxes",
    description:
      "When you disagree, find the specific evidence that would change your mind. If nothing could change your mind, you're not reasoning—you're rationalizing.",
  },
  {
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
      "Got a contested question that deserves structured analysis? We want it. Good candidates have real arguments on multiple sides and cruxes you could actually test.",
  },
  {
    title: "Improve Existing Topics",
    description:
      "Spotted a weak argument? Know better evidence? Tell us. The whole point is to make our steel-men stronger and our cruxes sharper.",
  },
  {
    title: "Challenge Our Confidence Scores",
    description:
      "Think we over- or under-weighted something? Say so. Bring citations and we\u2019ll take it seriously.",
  },
];

export default function CommunityPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        {/* Hero — no label */}
        <div className="bg-gradient-to-b from-[#f4f1eb]/80 to-transparent -mx-4 md:-mx-8 px-4 md:px-8 py-12 sm:py-16 lg:py-20 mb-14 md:mb-20">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] tracking-tight text-primary mb-7 leading-[1.08]">
            A community that<br />
            <span className="text-stone-500">disagrees well</span>
          </h1>
          <p className="text-lg text-secondary leading-relaxed max-w-2xl">
            Argumend is open source. Help us improve the argument maps,
            challenge our confidence scores, or suggest new topics.
          </p>
        </div>

        {/* Discussion Principles — Manifesto style */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">
            Our Principles
          </h2>
          <p className="text-lg text-secondary mb-10 max-w-2xl">Not guidelines. Rules. We hold ourselves to these and expect the same from contributors.</p>
          <div className="space-y-4">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="bg-[#faf8f5] rounded-xl p-6 border border-stone-200/70"
              >
                <div className="flex items-start gap-5">
                  <span className="font-serif text-2xl font-bold text-stone-300 flex-shrink-0">{principle.number}</span>
                  <div>
                    <h3 className="font-serif text-lg text-primary mb-2">
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

        {/* How to Contribute */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">
            How to Contribute
          </h2>
          <p className="text-lg text-secondary mb-8">All contributions happen on GitHub.</p>
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
          <div className="bg-[#3d3a36] text-white rounded-2xl p-8 md:p-10">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4">
              The Ideological Turing Test
            </h2>
            <p className="text-stone-300 leading-relaxed text-lg">
              Before criticizing a position, try to pass the ideological Turing
              test: Can you articulate the opposing view well enough that its
              proponents would say &ldquo;yes, that&apos;s what I believe&rdquo;?
              If not, you&apos;re arguing against a phantom, not a real position.
            </p>
          </div>
        </section>

        {/* No CTA — the page ends naturally with the Turing Test */}
        <div className="h-14" />
      </div>
    </AppShell>
  );
}
