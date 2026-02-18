import { AppShell } from "@/components/AppShell";
import {
  Scale,
  Swords,
  Shield,
  Landmark,
} from "lucide-react";

const nodeTypes = [
  {
    name: "Meta Claim",
    color: "#4f7b77",
    description: "The central topic being examined. Everything branches from here.",
    example: "\"Nuclear power is safe and effective\"",
  },
  {
    name: "Skeptic",
    color: "#8B5A3C",
    description: "The strongest objection to a claim. Steel-manned, not strawmanned.",
    example: "\"Accidents like Chernobyl prove the technology is inherently dangerous\"",
  },
  {
    name: "Proponent",
    color: "#C4613C",
    description: "The best response to an objection, backed by evidence.",
    example: "\"Modern reactor designs make meltdowns physically impossible\"",
  },
  {
    name: "Crux",
    color: "#a23b3b",
    description: "The key question that would settle the debate. This is where understanding happens.",
    example: "\"Can we demonstrate that passive safety systems work at scale?\"",
  },
  {
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
  },
  {
    number: "02",
    title: "Explore the map",
    description: "Pan and zoom to navigate. Click \"Explore\" on any node to reveal deeper arguments.",
  },
  {
    number: "03",
    title: "Find the crux",
    description: "Look for red Crux nodes. These identify the specific questions that would resolve disagreements.",
  },
  {
    number: "04",
    title: "Update your beliefs",
    description: "Consider the evidence. What would change your mind? That's the question that matters.",
  },
];

export default function HowItWorksPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        {/* Hero — subtitle before heading for variety */}
        <div className="bg-gradient-to-b from-[#f4f1eb]/80 to-transparent -mx-4 md:-mx-8 px-4 md:px-8 py-12 sm:py-16 lg:py-20 mb-14 md:mb-20 text-center">
          <p className="text-lg text-secondary leading-relaxed max-w-2xl mx-auto mb-5">
            We turn messy debates into visual maps. You see the strongest arguments
            on every side, trace each claim to its source, and find the one question
            that would actually change someone&apos;s mind.
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] tracking-tight text-primary leading-[1.08]">
            Mapping arguments,<br />
            <span className="text-stone-500">not winning them</span>
          </h1>
        </div>

        {/* Quick Start Steps */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4 text-center">
            Get started in 4 steps
          </h2>
          <p className="text-lg text-secondary text-center mb-10 max-w-xl mx-auto">No account needed. Pick a topic and go.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex gap-4 p-5 md:p-6 rounded-xl bg-[#fefcf9] border border-stone-200/70"
              >
                <span className="font-mono text-sm font-bold text-stone-400 mt-0.5 flex-shrink-0">{step.number}</span>
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-semibold text-primary mb-1">{step.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Visual Map Example */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4 text-center">
            Anatomy of an argument map
          </h2>
          <p className="text-secondary text-center mb-10 max-w-xl mx-auto leading-relaxed">
            Every topic uses the same structure. Learn it once and you can read any debate on the platform.
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
                <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-deep to-deep-dark text-white font-semibold shadow-lg">
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
                <p className="mt-2 text-xs text-crux font-medium">What would settle this?</p>
              </div>
            </div>
          </div>
        </section>

        {/* Node Types Reference */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4 text-center">
            Understanding node types
          </h2>
          <p className="text-lg text-secondary text-center mb-10 max-w-xl mx-auto">Five types of nodes. That&apos;s all you need to know.</p>
          <div className="space-y-3">
            {nodeTypes.map((type) => (
              <div
                key={type.name}
                className="p-5 rounded-xl bg-[#fefcf9] border border-stone-200/70"
                style={{ borderLeftWidth: "4px", borderLeftColor: type.color }}
              >
                <h3 className="font-serif text-lg font-semibold text-primary mb-1">{type.name}</h3>
                <p className="text-sm text-secondary mb-2">{type.description}</p>
                <p className="text-xs font-mono text-stone-400 italic bg-stone-50 inline-block px-2 py-0.5 rounded">Example: {type.example}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Confidence Scores */}
        <section className="mb-16 md:mb-24 bg-white/50 -mx-4 md:-mx-8 px-4 md:px-8 py-10 md:py-14 rounded-2xl">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4 text-center">
            Reading confidence scores
          </h2>
          <p className="text-lg text-secondary text-center mb-10 max-w-xl mx-auto leading-relaxed">
            We don&apos;t claim certainty. These numbers tell you how confident the evidence makes us&mdash;nothing more.
          </p>
          <div className="bg-[#faf8f5] rounded-2xl p-6 md:p-8 border border-stone-200/70">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 text-center">
                <p className="font-mono tabular-nums text-deep text-2xl font-bold mb-2">90%+</p>
                <h3 className="font-serif text-base text-primary mb-1">Settled</h3>
                <p className="text-sm text-stone-500">The evidence is overwhelming. Think: &ldquo;Did we land on the moon?&rdquo;</p>
              </div>
              <div className="p-4 text-center border-x border-stone-200/50">
                <p className="font-mono tabular-nums text-deep text-2xl font-bold mb-2">50-89%</p>
                <h3 className="font-serif text-base text-primary mb-1">Probable</h3>
                <p className="text-sm text-stone-500">Good evidence, but real uncertainty remains.</p>
              </div>
              <div className="p-4 text-center">
                <p className="font-mono tabular-nums text-deep text-2xl font-bold mb-2">&lt;50%</p>
                <h3 className="font-serif text-base text-primary mb-1">Contested</h3>
                <p className="text-sm text-stone-500">Genuinely open. Smart people land on different sides.</p>
              </div>
            </div>
          </div>
        </section>

        {/* The Philosophy */}
        <section className="mb-12 md:mb-16 bg-[#faf8f3] rounded-xl p-6 md:p-8 border border-stone-200/70">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">The crux is everything</h2>
          <p className="text-secondary leading-relaxed mb-4">
            Every disagreement has a crux&mdash;the specific evidence or experiment that would change minds.
            Most debates never bother to find it. We do.
          </p>
          <p className="text-secondary leading-relaxed">
            Once you know the crux, you stop arguing past each other. You have a concrete question
            to investigate. Most of the time, that&apos;s enough.
          </p>
        </section>

        {/* No CTA — instructional page ends with the content */}
        <div className="h-14" />
      </div>
    </AppShell>
  );
}
