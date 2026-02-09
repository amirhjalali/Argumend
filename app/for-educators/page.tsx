"use client";

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
    color: "#D4A012",
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
    color: "#CF7B3E",
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
    color: "#CF7B3E",
  },
];

export default function ForEducatorsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 md:px-8 py-6 md:py-20">
        {/* Hero */}
        <div className="mb-14 md:mb-20 text-center">
          <p className="text-[12px] font-medium text-stone-400 mb-4">
            For Educators
          </p>
          <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-[3.5rem] tracking-tight text-primary mb-7 leading-[1.08]">
            Argumend for Educators
          </h1>
          <p className="text-lg md:text-xl text-[#4f7b77] font-medium mb-5">
            Teach critical thinking through structured debate analysis
          </p>
          <p className="text-base md:text-lg text-secondary leading-[1.7] max-w-2xl mx-auto">
            Argumend helps students move beyond opinion-based discussion to
            evidence-based reasoning. Our argument maps make complex debates
            accessible and teach the skills that matter most.
          </p>
        </div>

        {/* Why Argumend for the Classroom */}
        <section className="mb-16 md:mb-24">
          <div className="flex items-center gap-2.5 mb-3">
            <GraduationCap
              className="h-5 w-5 text-[#4f7b77]"
              strokeWidth={1.5}
            />
            <h2 className="font-serif text-2xl md:text-3xl text-primary">
              Why Argumend for the classroom
            </h2>
          </div>
          <p className="text-secondary leading-relaxed mb-8 max-w-2xl">
            Four capabilities that transform how students engage with
            controversial topics.
          </p>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-[#fefcf9] rounded-lg p-5 md:p-6 border border-stone-200/70"
                style={{ borderLeftWidth: "4px", borderLeftColor: benefit.color }}
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

        {/* Ready-Made Lesson Plans */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-serif text-2xl md:text-3xl text-primary mb-3 text-center">
            Ready-made lesson plans
          </h2>
          <p className="text-secondary text-center mb-10 max-w-xl mx-auto leading-relaxed">
            Start using Argumend in your classroom today. Each lesson plan is
            designed for immediate use with minimal preparation.
          </p>

          <div className="space-y-4">
            {lessonPlans.map((plan) => (
              <div
                key={plan.number}
                className="bg-[#fefcf9] rounded-lg border border-stone-200/70 p-5 md:p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4f7b77]/20 to-[#4f7b77]/5 flex items-center justify-center">
                      <span className="font-serif text-xl font-bold text-[#4f7b77]">
                        {plan.number}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                      <h3 className="font-serif text-lg font-semibold text-primary">
                        {plan.title}
                      </h3>
                      <span className="text-xs font-mono text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full w-fit">
                        {plan.duration}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {plan.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4f7b77] mt-2 flex-shrink-0" />
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
          <h2 className="font-serif text-2xl md:text-3xl text-primary mb-3 text-center">
            Fits into the subjects you teach
          </h2>
          <p className="text-secondary text-center mb-10 max-w-xl mx-auto leading-relaxed">
            Argument mapping is a cross-curricular skill. Here is how Argumend
            integrates with your existing syllabus.
          </p>

          <div className="grid md:grid-cols-2 gap-3">
            {subjects.map((subject) => (
              <div
                key={subject.label}
                className="flex items-start gap-4 p-4 rounded-lg bg-[#faf8f3] border border-stone-200/70"
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
        <blockquote className="my-12 md:my-16 py-6 border-l-2 border-[#4f7b77] pl-6 md:pl-7">
          <p className="font-serif text-xl md:text-2xl text-primary italic leading-[1.6]">
            &ldquo;The goal is not to teach students what to think, but how to
            think &mdash; and how to disagree without destroying the
            conversation.&rdquo;
          </p>
        </blockquote>

        {/* CTA */}
        <section className="text-center py-10 border-t border-stone-200/80">
          <h3 className="font-serif text-xl md:text-2xl text-primary mb-3">
            Bring Argumend to your classroom
          </h3>
          <p className="text-secondary mb-7 max-w-lg mx-auto">
            Start exploring topics with your students today. Suggest a topic
            that fits your curriculum, or see how the tool works.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-medium hover:from-amber-600 hover:to-amber-700 transition-all shadow-sm"
            >
              Start Exploring Free
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="/community"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1f1f1d] text-white text-sm font-medium hover:bg-[#3a3a38] transition-colors"
            >
              Suggest a Topic
              <Users className="h-3.5 w-3.5" />
            </a>
            <a
              href="/how-it-works"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-50 transition-colors"
            >
              How It Works
              <Scale className="h-3.5 w-3.5" />
            </a>
          </div>
        </section>

        {/* Footer */}
        <div className="pt-6 border-t border-stone-200 mt-8">
          <p className="text-sm text-muted italic text-center">
            Built for the teachers who believe every student deserves to think
            clearly.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
