import Link from "next/link";
import { ArrowLeft, MessageSquare, Shield, Scale, Lightbulb } from "lucide-react";

const principles = [
  {
    icon: Shield,
    title: "Steel-man, Don't Straw-man",
    description: "Present the strongest version of opposing views. If you can't articulate why smart people hold a position, you don't understand it well enough to critique it.",
  },
  {
    icon: Scale,
    title: "Seek Truth, Not Victory",
    description: "The goal is to update beliefs based on evidence, not to \"win\" debates. Being wrong is valuable—it means you learned something.",
  },
  {
    icon: Lightbulb,
    title: "Identify Cruxes",
    description: "When you disagree, find the specific evidence that would change your mind. If nothing could change your mind, you're not reasoning—you're rationalizing.",
  },
  {
    icon: MessageSquare,
    title: "Be Specific",
    description: "Vague claims can't be tested. Good arguments point to specific evidence, define terms clearly, and make predictions that could be wrong.",
  },
];

const contributing = [
  {
    title: "Suggest New Topics",
    description: "We're always looking for contested questions that would benefit from structured analysis. Good candidates have strong arguments on multiple sides and testable cruxes.",
  },
  {
    title: "Improve Existing Topics",
    description: "Notice a weak argument? Know of better evidence? Submit improvements to make our steel-men stronger and our cruxes more precise.",
  },
  {
    title: "Challenge Our Confidence Scores",
    description: "If you think we've over- or under-weighted evidence, explain why. The best challenges come with specific citations.",
  },
];

export default function CommunityPage() {
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
          Community
        </h1>
        <p className="text-lg text-[#6a5f56] mb-12">
          Guidelines for productive discourse and how to contribute.
        </p>

        <section className="mb-12">
          <h2 className="font-serif text-2xl text-[#3d3a36] mb-6">
            Discussion Principles
          </h2>
          <div className="space-y-4">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="bg-white rounded-lg p-5 shadow-sm border border-stone-200"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#f5f0e8] rounded-lg">
                    <principle.icon className="h-5 w-5 text-[#3d3a36]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-[#3d3a36] mb-1">
                      {principle.title}
                    </h3>
                    <p className="text-[#4e473f]">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl text-[#3d3a36] mb-6">
            How to Contribute
          </h2>
          <div className="bg-white rounded-lg shadow-sm border border-stone-200 divide-y divide-stone-100">
            {contributing.map((item) => (
              <div key={item.title} className="p-5">
                <h3 className="font-serif text-lg text-[#3d3a36] mb-2">
                  {item.title}
                </h3>
                <p className="text-[#4e473f]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#3d3a36] text-white rounded-lg p-6">
          <h2 className="font-serif text-xl mb-3">
            The Ideological Turing Test
          </h2>
          <p className="text-stone-300 leading-relaxed">
            Before criticizing a position, try to pass the ideological Turing test: Can you
            articulate the opposing view well enough that its proponents would say &ldquo;yes,
            that&apos;s what I believe&rdquo;? If not, you&apos;re arguing against a phantom,
            not a real position.
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-stone-300">
          <p className="text-sm text-[#6a5f56]">
            Good discourse is a skill. These principles help us practice it together.
          </p>
        </div>
      </div>
    </div>
  );
}
