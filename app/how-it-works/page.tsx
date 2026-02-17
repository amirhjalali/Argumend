"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import {
  Scale,
  Lightbulb,
  Target,
  Swords,
  Shield,
  ScrollText,
  ArrowRight,
  Landmark,
  MousePointer2,
  Move,
} from "lucide-react";

const nodeTypes = [
  {
    icon: Landmark,
    name: "Meta Claim",
    color: "#2563eb",
    description: "The central topic being examined. Everything branches from here.",
    example: "\"Nuclear power is safe and effective\"",
  },
  {
    icon: Swords,
    name: "Skeptic",
    color: "#8B5A3C",
    description: "The strongest objection to a claim. Steel-manned, not strawmanned.",
    example: "\"Accidents like Chernobyl prove the technology is inherently dangerous\"",
  },
  {
    icon: Shield,
    name: "Proponent",
    color: "#C4613C",
    description: "The best response to an objection, backed by evidence.",
    example: "\"Modern reactor designs make meltdowns physically impossible\"",
  },
  {
    icon: Scale,
    name: "Crux",
    color: "#a23b3b",
    description: "The key question that would settle the debate. This is where understanding happens.",
    example: "\"Can we demonstrate that passive safety systems work at scale?\"",
  },
  {
    icon: ScrollText,
    name: "Evidence",
    color: "#b05434",
    description: "Data, studies, and sources that support or challenge claims.",
    example: "\"NRC Safety Report 2023: Zero incidents in passive reactors\"",
  },
];

const steps = [
  {
    number: "01",
    title: "Pick a topic",
    description: "Choose a controversial issue from the sidebar. Each topic is a complete argument map.",
    icon: MousePointer2,
  },
  {
    number: "02",
    title: "Explore the map",
    description: "Pan and zoom to navigate. Click \"Explore\" on any node to reveal deeper arguments.",
    icon: Move,
  },
  {
    number: "03",
    title: "Find the crux",
    description: "Look for red Crux nodes. These identify the specific questions that would resolve disagreements.",
    icon: Target,
  },
  {
    number: "04",
    title: "Update your beliefs",
    description: "Consider the evidence. What would change your mind? That's the question that matters.",
    icon: Lightbulb,
  },
];

export default function HowItWorksPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        {/* Hero */}
        <div className="bg-gradient-to-b from-[#f4f1eb] via-[#f4f1eb] to-[#faf8f5] -mx-4 md:-mx-8 px-4 md:px-8 py-12 sm:py-16 lg:py-20 mb-14 md:mb-20 text-center">
          <p className="text-[12px] font-medium tracking-widest uppercase text-deep/60 mb-5">
            How It Works
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] tracking-tight text-primary mb-7 leading-[1.08]">
            Mapping arguments,<br />
            <span className="text-stone-500">not winning them</span>
          </h1>
          <p className="text-lg text-stone-500 max-w-2xl mx-auto leading-[1.7]">
            Argumend transforms complex debates into visual maps. See the strongest arguments
            on all sides, trace claims to their sources, and find the questions that would actually
            change minds.
          </p>
        </div>

        {/* Quick Start Steps */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4 text-center">
            Get started in 4 steps
          </h2>
          <p className="text-lg text-stone-500 text-center mb-10 max-w-xl mx-auto">A clear journey from curiosity to understanding.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="relative flex gap-4 p-5 md:p-6 rounded-xl bg-[#fefcf9] border border-stone-200/70 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 animate-card-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Connecting line for desktop: from card 1->2 and 3->4 */}
                {i % 2 === 0 && i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-stone-300 to-stone-200" />
                )}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C4613C]/20 to-[#b05434]/10 flex items-center justify-center">
                    <span className="font-serif text-xl font-bold text-[#C4613C]">{step.number}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <step.icon className="h-4 w-4 text-[#b05434]" strokeWidth={2} />
                    <h3 className="font-serif text-lg font-semibold text-primary">{step.title}</h3>
                  </div>
                  <p className="text-sm text-secondary leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section transition */}
        <div className="h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent mb-16 md:mb-24" />

        {/* Visual Map Example */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-3 text-center">
            Anatomy of an argument map
          </h2>
          <p className="text-secondary text-center mb-10 max-w-xl mx-auto leading-relaxed">
            Every topic is structured the same way. Learn to read the map once, navigate any debate.
          </p>

          {/* Simple visual diagram */}
          <div className="relative bg-gradient-to-br from-[#f8f5ef] to-[#fefcf9] rounded-2xl border border-stone-200/70 p-8 md:p-12 overflow-hidden">
            {/* Connection lines (simplified) */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#b05434" />
                </marker>
              </defs>
              {/* Meta to Skeptic */}
              <line x1="50%" y1="80" x2="25%" y2="160" stroke="#b05434" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrowhead)" />
              {/* Meta to Proponent */}
              <line x1="50%" y1="80" x2="75%" y2="160" stroke="#b05434" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrowhead)" />
              {/* Both to Crux */}
              <line x1="25%" y1="220" x2="50%" y2="300" stroke="#b05434" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrowhead)" />
              <line x1="75%" y1="220" x2="50%" y2="300" stroke="#b05434" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrowhead)" />
            </svg>

            {/* Nodes */}
            <div className="relative z-10 flex flex-col items-center gap-12">
              {/* Meta Node */}
              <div className="flex flex-col items-center">
                <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white font-semibold shadow-lg">
                  <div className="flex items-center gap-2">
                    <Landmark className="h-4 w-4" />
                    <span>Meta Claim</span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-secondary italic">The central topic</p>
              </div>

              {/* Skeptic and Proponent Row */}
              <div className="flex items-center justify-center gap-8 md:gap-24 w-full">
                <div className="flex flex-col items-center">
                  <div className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5A3C] to-[#A67350] text-white font-semibold shadow-md">
                    <div className="flex items-center gap-2">
                      <Swords className="h-4 w-4" />
                      <span>Skeptic</span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-secondary italic text-center">Strongest objection</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C4613C] to-[#b05434] text-white font-semibold shadow-md">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>Proponent</span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-secondary italic text-center">Best response</p>
                </div>
              </div>

              {/* Crux Node */}
              <div className="flex flex-col items-center">
                <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#a23b3b] to-[#c45c5c] text-white font-bold shadow-lg ring-2 ring-[#a23b3b]/20 ring-offset-2">
                  <div className="flex items-center gap-2">
                    <Scale className="h-4 w-4" />
                    <span>Crux</span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-[#a23b3b] font-medium">What would settle this?</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section transition */}
        <div className="h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent mb-16 md:mb-24" />

        {/* Node Types Reference */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4 text-center">
            Understanding node types
          </h2>
          <p className="text-lg text-stone-500 text-center mb-10 max-w-xl mx-auto">Learn to read the map once, navigate any debate.</p>
          <div className="space-y-3">
            {nodeTypes.map((type, i) => (
              <div
                key={type.name}
                className="flex flex-col md:flex-row md:items-start gap-4 p-5 rounded-xl bg-[#fefcf9] border border-stone-200/70 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 animate-card-fade-in"
                style={{ borderLeftWidth: "4px", borderLeftColor: type.color, animationDelay: `${i * 80}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${type.color}15` }}
                >
                  <type.icon className="h-6 w-6" style={{ color: type.color }} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-semibold text-primary mb-1">{type.name}</h3>
                  <p className="text-sm text-secondary mb-2">{type.description}</p>
                  <p className="text-xs font-mono text-stone-400 italic bg-stone-50 inline-block px-2 py-0.5 rounded">Example: {type.example}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Confidence Scores */}
        <section className="mb-16 md:mb-24 bg-white/50 -mx-4 md:-mx-8 px-4 md:px-8 py-10 md:py-14 rounded-2xl">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-3 text-center">
            Reading confidence scores
          </h2>
          <p className="text-lg text-stone-500 text-center mb-10 max-w-xl mx-auto leading-relaxed">
            We don&apos;t claim certainty. Confidence scores reflect the weight of available evidence.
          </p>
          <div className="bg-[#faf8f5] rounded-2xl p-6 md:p-8 border border-stone-200/70">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 text-center">
                <p className="font-mono tabular-nums text-deep text-2xl font-bold mb-2">90%+</p>
                <h3 className="font-serif text-base text-primary mb-1">Settled</h3>
                <p className="text-sm text-stone-500">Overwhelming evidence. Scientific consensus.</p>
              </div>
              <div className="p-4 text-center border-x border-stone-200/50">
                <p className="font-mono tabular-nums text-deep text-2xl font-bold mb-2">50-89%</p>
                <h3 className="font-serif text-base text-primary mb-1">Probable</h3>
                <p className="text-sm text-stone-500">Good evidence, some uncertainty remains.</p>
              </div>
              <div className="p-4 text-center">
                <p className="font-mono tabular-nums text-deep text-2xl font-bold mb-2">&lt;50%</p>
                <h3 className="font-serif text-base text-primary mb-1">Contested</h3>
                <p className="text-sm text-stone-500">Genuine uncertainty. Reasonable people disagree.</p>
              </div>
            </div>
          </div>
        </section>

        {/* The Philosophy */}
        <section className="mb-12 md:mb-16 bg-[#faf8f3] rounded-xl p-6 md:p-8 border border-stone-200/70">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#a23b3b]/20 to-[#a23b3b]/5 flex items-center justify-center flex-shrink-0">
              <Target className="h-6 w-6 text-[#a23b3b]" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="font-serif text-xl md:text-2xl text-primary mb-3">The crux is everything</h2>
              <p className="text-secondary leading-relaxed mb-4">
                Every disagreement has a crux—the specific evidence or experiment that would change minds.
                Most debates never identify it. We make it explicit.
              </p>
              <p className="text-secondary leading-relaxed">
                When you find the crux, you stop arguing past each other. You know exactly what question
                to investigate. That&apos;s where understanding happens.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-[#f0ece5] to-[#ebe6de] rounded-2xl p-8 sm:p-12 text-center my-14 md:my-20">
          <ArrowRight className="h-6 w-6 text-deep/40 mx-auto mb-4" strokeWidth={1.5} />
          <h3 className="font-serif text-xl md:text-2xl text-primary mb-3">Ready to explore?</h3>
          <p className="text-secondary mb-7 max-w-md mx-auto">Pick a controversial topic. Find the crux. Update your beliefs.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-rust-500 to-rust-600 text-white text-sm font-medium hover:from-rust-600 hover:to-rust-700 transition-all shadow-md hover:shadow-lg"
          >
            Start Mapping
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>
      </div>
    </AppShell>
  );
}
