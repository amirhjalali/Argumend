import { AppShell } from "@/components/AppShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DiamondDiagram } from "@/components/DiamondDiagram";
import { JsonLd } from "@/components/JsonLd";

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
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How Argumend Works",
    description:
      "We turn messy debates into visual maps. See the strongest arguments on every side, trace each claim to its source, and find the question that would actually change someone's mind.",
    url: "https://argumend.org/how-it-works",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };

  return (
    <AppShell>
      <JsonLd data={howToJsonLd} />
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        {/* Hero — subtitle before heading for variety */}
        <div className="bg-gradient-to-b from-[#f4f1eb]/80 to-transparent -mx-4 md:-mx-8 px-4 md:px-8 py-12 sm:py-16 lg:py-20 mb-14 md:mb-20 text-center">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "How It Works" },
            ]}
          />
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
                className="flex gap-4 p-5 md:p-6 rounded-xl bg-[#fefcf9] border border-stone-200/60"
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

          {/* Interactive diamond diagram with properly connected arrows */}
          <DiamondDiagram />
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
                className="p-5 rounded-xl bg-[#fefcf9] border border-stone-200/60"
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
          <div className="bg-[#faf8f5] rounded-2xl p-6 md:p-8 border border-stone-200/60">
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
        <section className="mb-12 md:mb-16 bg-[#faf8f3] rounded-xl p-6 md:p-8 border border-stone-200/60">
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
