import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { ArrowRight } from "lucide-react";

const benefits = [
  {
    title: "Visual Argument Mapping",
    description:
      "Students see both sides of a debate visually, making abstract reasoning concrete. No more \"I feel that...\" \u2014 every claim links to evidence.",
  },
  {
    title: "Steel-Manning Practice",
    description:
      "Students learn to articulate the strongest version of views they disagree with. This builds empathy and sharper thinking.",
  },
  {
    title: "Crux Identification",
    description:
      "Instead of talking past each other, students learn to find the specific question that would change minds. This is the skill that transfers beyond the classroom.",
  },
  {
    title: "Calibrated Confidence",
    description:
      "Students practice saying \"I'm 70% sure\" instead of \"I'm right.\" Understanding uncertainty is essential for navigating a complex world.",
  },
];

const lessonPlans = [
  {
    number: "01",
    title: "Introduction to Argument Mapping",
    duration: "1 class period",
    steps: [
      "Explore the Nuclear Energy topic together as a class",
      "Identify the meta claim, skeptic position, proponent response, and crux",
      "Students discuss: What evidence would change your mind?",
    ],
  },
  {
    number: "02",
    title: "The Steel-Man Challenge",
    duration: "2 class periods",
    steps: [
      "Students pick a topic they have strong opinions about",
      "Write the strongest argument FOR the other side",
      "Compare with Argumend\u2019s steel-manned positions",
      "Reflection: Did this change how you see the issue?",
    ],
  },
  {
    number: "03",
    title: "Analyze Your Own Debate",
    duration: "2\u20133 class periods",
    steps: [
      "Students bring in an article, podcast, or transcript",
      "Use the Analyze tool to extract positions and cruxes",
      "Create their own argument map",
      "Present findings to the class",
    ],
  },
];

const subjects = [
  {
    label: "IB Theory of Knowledge",
    description:
      "Perfect for TOK exhibitions and essays. Students examine knowledge claims, explore real-world examples, and practice distinguishing evidence from opinion.",
    topics: ["/topics/simulation-hypothesis", "/topics/free-will"],
    topicLabels: ["Simulation Hypothesis", "Free Will"],
  },
  {
    label: "AP Government / Civics",
    description:
      "Analyze real policy debates with structured evidence. Students map competing claims on gun control, UBI, and wealth tax.",
    topics: ["/topics/gun-control-effectiveness", "/topics/universal-basic-income"],
    topicLabels: ["Gun Control", "Universal Basic Income"],
  },
  {
    label: "A-Level Critical Thinking / Science",
    description:
      "Examine contested empirical claims. Students evaluate evidence quality, identify logical fallacies, and calibrate confidence.",
    topics: ["/topics/nuclear-energy-safety", "/topics/lab-leak-theory"],
    topicLabels: ["Nuclear Energy", "Lab Leak Theory"],
  },
  {
    label: "English / Media Literacy",
    description:
      "Identify rhetorical techniques, spot straw-man arguments, and practice steel-manning opposing views in written analysis.",
    topics: ["/topics/social-media-mental-health", "/topics/cancel-culture"],
    topicLabels: ["Social Media & Mental Health", "Cancel Culture"],
  },
];

export default function ForEducatorsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        {/* Hero — no label, single paragraph */}
        <div className="bg-gradient-to-b from-[#f4f1eb]/80 to-transparent -mx-4 md:-mx-8 px-4 md:px-8 py-12 sm:py-16 lg:py-20 mb-10 md:mb-14">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] tracking-tight text-primary mb-7 leading-[1.08]">
            Teach students how to disagree<br />
            <span className="text-stone-500">without destroying the conversation</span>
          </h1>
          <p className="text-lg text-secondary leading-relaxed max-w-2xl">
            Argumend helps students move beyond &ldquo;I feel that...&rdquo; to
            evidence-based reasoning. Built for IB Theory of Knowledge, AP Government,
            A-Level Critical Thinking, and any class where students need to think clearly
            about contested questions.
          </p>
        </div>

        {/* Blockquote — moved here, right after hero, before content sections */}
        <blockquote className="mb-16 md:mb-24 py-6 border-l-4 border-deep/30 pl-6 md:pl-7 bg-deep/[0.02] rounded-r-xl">
          <p className="font-serif text-xl md:text-2xl text-primary italic leading-[1.6]">
            &ldquo;The goal is not to teach students what to think, but how to
            think &mdash; and how to disagree without destroying the
            conversation.&rdquo;
          </p>
        </blockquote>

        {/* Why Argumend for the Classroom */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">
            Why Argumend for the classroom
          </h2>
          <p className="text-lg text-secondary leading-relaxed mb-8 max-w-2xl">
            What students actually practice when they use Argumend.
          </p>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-[#fefcf9] rounded-xl p-5 md:p-6 border border-stone-200/60"
              >
                <h3 className="font-serif text-lg text-primary mb-2">
                  {benefit.title}
                </h3>
                <p className="text-[14px] md:text-[15px] text-secondary leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Ready-Made Lesson Plans */}
        <section className="mb-16 md:mb-24 bg-white/50 -mx-4 md:-mx-8 px-4 md:px-8 py-10 md:py-14 rounded-2xl">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4 text-center">
            Ready-made lesson plans
          </h2>
          <p className="text-lg text-secondary text-center mb-10 max-w-xl mx-auto leading-relaxed">
            Start using Argumend in your classroom today. Each lesson plan is
            designed for immediate use with minimal preparation.
          </p>

          <div className="space-y-4">
            {lessonPlans.map((plan) => (
              <div
                key={plan.number}
                className="bg-[#fefcf9] rounded-xl border border-stone-200/60 p-5 md:p-6"
              >
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="font-mono text-sm font-bold text-stone-400">{plan.number}</span>
                  <h3 className="font-serif text-lg font-semibold text-primary">
                    {plan.title}
                  </h3>
                </div>
                <p className="text-xs text-stone-400 font-mono mb-3">{plan.duration}</p>
                <ul className="space-y-2">
                  {plan.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2 flex-shrink-0" />
                      <span className="text-sm text-secondary leading-relaxed">
                        {step}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Subject Integration */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4 text-center">
            Fits into the subjects you teach
          </h2>
          <p className="text-lg text-secondary text-center mb-10 max-w-xl mx-auto leading-relaxed">
            Argument mapping is a cross-curricular skill. Here&apos;s how Argumend
            integrates with your existing syllabus.
          </p>

          <div className="grid md:grid-cols-2 gap-3">
            {subjects.map((subject) => (
              <div
                key={subject.label}
                className="p-5 rounded-xl bg-[#faf8f5] border border-stone-200/60"
              >
                <h3 className="font-semibold text-primary mb-1">
                  {subject.label}
                </h3>
                <p className="text-sm text-secondary leading-relaxed mb-2">
                  {subject.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {subject.topics.map((topic, i) => (
                    <Link
                      key={topic}
                      href={topic}
                      className="text-xs font-medium text-deep hover:text-deep-dark hover:underline transition-colors"
                    >
                      {subject.topicLabels[i]} &rarr;
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Simple inline CTA — no big box */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 py-12 mb-8">
          <Link
            href="/topics"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-rust-500 to-rust-600 text-white text-sm font-medium hover:from-rust-600 hover:to-rust-700 transition-all shadow-md hover:shadow-lg"
          >
            Browse topics (free)
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/how-it-works"
            className="inline-flex items-center px-6 py-3 rounded-lg border border-stone-300 text-stone-600 hover:border-deep/30 text-sm font-medium hover:bg-white/60 transition-colors"
          >
            How it works
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
