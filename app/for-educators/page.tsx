"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import {
  GraduationCap,
  BookOpen,
  Target,
  Brain,
  Scale,
  Shield,
  Lightbulb,
  ArrowRight,
  Users,
  Beaker,
} from "lucide-react";

const benefits = [
  {
    icon: Scale,
    title: "Visual Argument Mapping",
    description:
      "Students see both sides of a debate visually, making abstract reasoning concrete. No more \"I feel that...\" \u2014 every claim links to evidence.",
    color: "#2563eb",
  },
  {
    icon: Shield,
    title: "Steel-Manning Practice",
    description:
      "Students learn to articulate the strongest version of views they disagree with. This builds empathy and sharper thinking.",
    color: "#C4613C",
  },
  {
    icon: Target,
    title: "Crux Identification",
    description:
      "Instead of talking past each other, students learn to find the specific question that would change minds. This is the skill that transfers beyond the classroom.",
    color: "#a23b3b",
  },
  {
    icon: Lightbulb,
    title: "Calibrated Confidence",
    description:
      "Students practice saying \"I'm 70% sure\" instead of \"I'm right.\" Understanding uncertainty is essential for navigating a complex world.",
    color: "#b05434",
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
    icon: Users,
    label: "Social Studies / Civics",
    description:
      "Analyze real policy debates \u2014 gun control, UBI, wealth tax",
    color: "#2563eb",
  },
  {
    icon: Beaker,
    label: "Science",
    description:
      "Examine contested claims \u2014 nuclear safety, climate science, lab leak",
    color: "#4f7b77",
  },
  {
    icon: Brain,
    label: "Philosophy / Ethics",
    description:
      "Explore deep questions \u2014 free will, simulation hypothesis",
    color: "#6b5b95",
  },
  {
    icon: BookOpen,
    label: "English / Media Literacy",
    description: "Identify fallacies and rhetorical techniques",
    color: "#b05434",
  },
];

export default function ForEducatorsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        {/* Hero */}
        <div className="bg-gradient-to-b from-[#f4f1eb] via-[#f4f1eb] to-[#faf8f5] -mx-4 md:-mx-8 px-4 md:px-8 py-12 sm:py-16 lg:py-20 mb-14 md:mb-20 text-center">
          <p className="text-[12px] font-medium tracking-widest uppercase text-deep/60 mb-5">
            For Educators
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] tracking-tight text-primary mb-7 leading-[1.08]">
            Argumend for Educators
          </h1>
          <p className="text-lg md:text-xl text-deep font-medium mb-5">
            Teach critical thinking through structured debate analysis
          </p>
          <p className="text-lg text-stone-500 max-w-2xl mx-auto leading-[1.7]">
            Argumend helps students move beyond opinion-based discussion to
            evidence-based reasoning. Our argument maps make complex debates
            accessible and teach the skills that matter most.
          </p>
        </div>

        {/* Why Argumend for the Classroom */}
        <section className="mb-16 md:mb-24">
          <div className="flex items-center gap-2.5 mb-4">
            <GraduationCap
              className="h-5 w-5 text-deep"
              strokeWidth={1.5}
            />
            <h2 className="font-serif text-2xl sm:text-3xl text-primary">
              Why Argumend for the classroom
            </h2>
          </div>
          <p className="text-lg text-stone-500 leading-relaxed mb-8 max-w-2xl">
            Four capabilities that transform how students engage with
            controversial topics.
          </p>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {benefits.map((benefit, i) => (
              <div
                key={benefit.title}
                className="bg-[#fefcf9] rounded-xl p-5 md:p-6 border border-stone-200/70 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 animate-card-fade-in"
                style={{ borderLeftWidth: "4px", borderLeftColor: benefit.color, animationDelay: `${i * 100}ms` }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${benefit.color}12` }}
                >
                  <benefit.icon
                    className="h-5 w-5"
                    style={{ color: benefit.color }}
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-serif text-lg md:text-xl text-primary mb-2">
                  {benefit.title}
                </h3>
                <p className="text-[14px] md:text-[15px] text-secondary leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section transition */}
        <div className="h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent mb-16 md:mb-24" />

        {/* Ready-Made Lesson Plans */}
        <section className="mb-16 md:mb-24 bg-white/50 -mx-4 md:-mx-8 px-4 md:px-8 py-10 md:py-14 rounded-2xl">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4 text-center">
            Ready-made lesson plans
          </h2>
          <p className="text-lg text-stone-500 text-center mb-10 max-w-xl mx-auto leading-relaxed">
            Start using Argumend in your classroom today. Each lesson plan is
            designed for immediate use with minimal preparation.
          </p>

          <div className="relative space-y-4">
            {/* Vertical connecting line */}
            <div className="absolute left-[2.25rem] top-8 bottom-8 w-px bg-gradient-to-b from-deep/20 via-deep/30 to-deep/20 hidden md:block" />
            {lessonPlans.map((plan, idx) => (
              <div
                key={plan.number}
                className="relative bg-[#fefcf9] rounded-xl border border-stone-200/70 p-5 md:p-6 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 animate-card-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4f7b77]/20 to-[#4f7b77]/5 flex items-center justify-center border border-deep/10">
                      <span className="font-serif text-xl font-bold text-deep">
                        {plan.number}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                      <h3 className="font-serif text-lg font-semibold text-primary">
                        {plan.title}
                      </h3>
                      <span className="text-xs font-mono tabular-nums text-deep bg-deep/5 px-2.5 py-1 rounded-full w-fit font-medium">
                        {plan.duration}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {plan.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-deep mt-2 flex-shrink-0" />
                          <span className="text-sm text-secondary leading-relaxed">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Subject Integration */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4 text-center">
            Fits into the subjects you teach
          </h2>
          <p className="text-lg text-stone-500 text-center mb-10 max-w-xl mx-auto leading-relaxed">
            Argument mapping is a cross-curricular skill. Here&apos;s how Argumend
            integrates with your existing syllabus.
          </p>

          <div className="grid md:grid-cols-2 gap-3">
            {subjects.map((subject, i) => (
              <div
                key={subject.label}
                className="flex items-start gap-4 p-5 rounded-xl bg-[#faf8f5] border border-stone-200/70 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 animate-card-fade-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${subject.color}12` }}
                >
                  <subject.icon
                    className="h-5 w-5"
                    style={{ color: subject.color }}
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">
                    {subject.label}
                  </h3>
                  <p className="text-sm text-secondary leading-relaxed">
                    {subject.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pull Quote */}
        <blockquote className="my-12 md:my-16 py-6 border-l-4 border-deep/30 pl-6 md:pl-7 bg-deep/[0.02] rounded-r-xl">
          <p className="font-serif text-xl md:text-2xl text-primary italic leading-[1.6]">
            &ldquo;The goal is not to teach students what to think, but how to
            think &mdash; and how to disagree without destroying the
            conversation.&rdquo;
          </p>
        </blockquote>

        {/* CTA */}
        <section className="bg-gradient-to-r from-[#f0ece5] to-[#ebe6de] rounded-2xl p-8 sm:p-12 text-center my-14 md:my-20">
          <GraduationCap className="h-6 w-6 text-deep/40 mx-auto mb-4" strokeWidth={1.5} />
          <h3 className="font-serif text-xl md:text-2xl text-primary mb-3">
            Bring Argumend to your classroom
          </h3>
          <p className="text-secondary mb-7 max-w-lg mx-auto">
            Start exploring topics with your students today. Suggest a topic
            that fits your curriculum, or see how the tool works.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-rust-500 to-rust-600 text-white text-sm font-medium hover:from-rust-600 hover:to-rust-700 transition-all shadow-md hover:shadow-lg"
            >
              Start Exploring — Free
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/community"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-stone-300 text-stone-600 hover:border-deep/30 text-sm font-medium hover:bg-white/60 transition-colors"
            >
              Suggest a Topic
              <Users className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-stone-300 text-stone-600 hover:border-deep/30 text-sm font-medium hover:bg-white/60 transition-colors"
            >
              How It Works
              <Scale className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <div className="pt-6 border-t border-stone-200 mb-8">
          <p className="text-sm text-muted italic text-center">
            Built for the teachers who believe every student deserves to think
            clearly.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
