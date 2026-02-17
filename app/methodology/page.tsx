import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import {
  Brain,
  Shield,
  Scale,
  Target,
  Eye,
  Lightbulb,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  Users,
  Layers,
  Sparkles,
} from "lucide-react";

const chatgptProblems = [
  {
    icon: AlertTriangle,
    title: "Single Point of Failure",
    description:
      "One model, one perspective, one set of biases. ChatGPT gives you one answer and presents it with false confidence. You have no way to know if another model would reach a different conclusion.",
    color: "#a23b3b",
  },
  {
    icon: Eye,
    title: "No Evidence Transparency",
    description:
      "You get a fluent response but no way to verify claims or see how conclusions were reached. The reasoning is hidden behind a wall of confident prose.",
    color: "#b05434",
  },
  {
    icon: Brain,
    title: "Confirmation Bias Risk",
    description:
      "AI models tend to agree with the framing of your question. Ask a leading question, get a leading answer. The model optimizes for helpfulness, not truth.",
    color: "#6b5b95",
  },
  {
    icon: Users,
    title: "No Structured Disagreement",
    description:
      'A single model can\'t genuinely argue with itself. You get a both-sides-ish summary, not a real debate. The "on the other hand" paragraph is a formality, not a conviction.',
    color: "#2563eb",
  },
];

const methodologySteps = [
  {
    number: "01",
    title: "Argument Extraction",
    icon: Layers,
    color: "#2563eb",
    description:
      "AI identifies all distinct positions, claims, evidence, and sources in the input text. Positions are categorized as supporting or opposing the central claim.",
    details: [
      "Every distinct claim is isolated and labeled",
      'Positions are categorized as "for" or "against"',
      "Potential logical fallacies are flagged automatically",
      "Source references are extracted and linked",
    ],
  },
  {
    number: "02",
    title: "Steel-Manning",
    icon: Shield,
    color: "#C4613C",
    description:
      "Each position is strengthened to its best possible form. We don't create strawmen — we create the argument that the strongest proponent would make.",
    details: [
      "Every argument is presented in its strongest form",
      "The Ideological Turing Test: Could a believer say \"Yes, that's what I mean\"?",
      "Weak arguments are upgraded, not dismissed",
      "Skeptic positions are given the same rigor as mainstream ones",
    ],
  },
  {
    number: "03",
    title: "Multi-Judge Council",
    icon: Scale,
    color: "#a23b3b",
    description:
      "Multiple AI models independently evaluate the arguments. Scores are aggregated to find consensus — or flag genuine disagreement between judges.",
    details: [
      "4 AI judges (Claude, GPT-4, Gemini, and more) evaluate independently",
      "Each judge scores on multiple dimensions",
      "Scores are aggregated; outliers are flagged",
      "Judge disagreement is itself treated as information",
    ],
  },
  {
    number: "04",
    title: "Evidence Weighting",
    icon: Target,
    color: "#b05434",
    description:
      "Each piece of evidence is scored on four dimensions. The total evidence score is the sum of all four, giving a transparent, auditable quality measure.",
    details: [
      "Source Reliability (0-10): Track record, peer review, expertise",
      "Independence (0-10): Free from conflicts, independently corroborated",
      "Replicability (0-10): Can others verify? Has it been reproduced?",
      "Directness (0-10): How directly does this address the claim?",
    ],
  },
  {
    number: "05",
    title: "Confidence Calibration",
    icon: Lightbulb,
    color: "#4f7b77",
    description:
      "The final confidence score reflects the weight of evidence, not the model's opinion. The formula is transparent and the output is calibrated to what the evidence actually supports.",
    details: [
      "Formula: forScore / (forScore + againstScore + 1) x 100",
      "90%+ = Settled — scientific consensus level",
      "50-89% = Probable — good evidence, some uncertainty",
      "<50% = Contested — genuine uncertainty, real disagreement",
    ],
  },
];

const evidenceDimensions = [
  {
    name: "Source Reliability",
    range: "0-10",
    description: "Track record, peer review, recognized expertise in the domain",
    color: "#C4613C",
  },
  {
    name: "Independence",
    range: "0-10",
    description: "Free from conflicts of interest, independently corroborated by others",
    color: "#a23b3b",
  },
  {
    name: "Replicability",
    range: "0-10",
    description: "Can others verify the result? Has it been successfully reproduced?",
    color: "#2563eb",
  },
  {
    name: "Directness",
    range: "0-10",
    description: "How directly does this evidence address the specific claim in question?",
    color: "#b05434",
  },
];

const outcomes = [
  {
    icon: Eye,
    title: "Transparency",
    description:
      "Every score can be traced back to specific evidence and specific judges. No black boxes. You can audit every step of the reasoning chain.",
    color: "#C4613C",
  },
  {
    icon: Users,
    title: "Multi-perspective",
    description:
      "Multiple AI models with different training data and different biases. When they disagree, that disagreement is itself valuable information.",
    color: "#a23b3b",
  },
  {
    icon: Sparkles,
    title: "Updatable",
    description:
      "When new evidence emerges, scores change. We don't claim to have the final word. Knowledge is a process, not a destination.",
    color: "#4f7b77",
  },
];

export default function MethodologyPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        {/* Hero */}
        <div className="bg-gradient-to-b from-[#f4f1eb]/80 to-transparent -mx-4 md:-mx-8 px-4 md:px-8 py-12 sm:py-16 lg:py-20 mb-14 md:mb-20 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-stone-400 mb-4">
            Our Methodology
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] tracking-tight text-primary mb-7 leading-[1.08]">
            Not just another<br />
            <span className="text-stone-500">AI opinion</span>
          </h1>
          <p className="text-lg text-secondary leading-relaxed max-w-2xl mx-auto">
            Why Argumend gives you something ChatGPT can&apos;t: structured,
            transparent, multi-perspective analysis.
          </p>
        </div>

        {/* The Problem with "Just Ask ChatGPT" */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">
            The problem with &ldquo;just ask ChatGPT&rdquo;
          </h2>
          <p className="text-lg text-secondary leading-relaxed mb-8">
            Asking a single AI for its opinion on a controversial topic is like
            asking one witness to describe an entire crime scene. You get a
            coherent story, but you have no idea what it&apos;s leaving out.
          </p>

          <div className="grid gap-3">
            {chatgptProblems.map((problem, i) => (
              <div
                key={problem.title}
                className="flex items-start gap-4 p-5 rounded-xl bg-[#faf8f5] border border-stone-200/70 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 animate-card-fade-in"
                style={{ borderLeftWidth: "4px", borderLeftColor: problem.color, animationDelay: `${i * 80}ms` }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${problem.color}12` }}
                >
                  <problem.icon
                    className="h-5 w-5"
                    style={{ color: problem.color }}
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1.5">
                    {problem.title}
                  </h3>
                  <p className="text-sm text-secondary leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section transition */}
        <div className="h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent mb-16 md:mb-24" />

        {/* How Argumend Is Different */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4 text-center">
            How Argumend is different
          </h2>
          <p className="text-lg text-secondary text-center mb-10 max-w-xl mx-auto leading-relaxed">
            Five steps that turn a messy debate into structured, auditable
            analysis. Every step is transparent.
          </p>

          <div className="relative space-y-4">
            {/* Vertical connecting line */}
            <div className="absolute left-[2.25rem] top-8 bottom-8 w-px bg-gradient-to-b from-stone-200 via-stone-300 to-stone-200 hidden md:block" />
            {methodologySteps.map((step, i) => (
              <div
                key={step.number}
                className="relative bg-[#fefcf9] rounded-xl border border-stone-200/70 overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 animate-card-fade-in"
                style={{ borderLeftWidth: "4px", borderLeftColor: step.color, animationDelay: `${i * 100}ms` }}
              >
                <div className="p-5 md:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${step.color}15` }}
                      >
                        <span
                          className="font-serif text-xl font-bold"
                          style={{ color: step.color }}
                        >
                          {step.number}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <step.icon
                          className="h-4 w-4"
                          style={{ color: step.color }}
                          strokeWidth={2}
                        />
                        <h3 className="font-serif text-lg text-primary mb-2">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-secondary leading-relaxed mb-4">
                        {step.description}
                      </p>
                      <ul className="space-y-2">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle
                              className="h-4 w-4 flex-shrink-0 mt-0.5"
                              style={{ color: step.color }}
                              strokeWidth={1.8}
                            />
                            <span className="text-sm text-secondary leading-relaxed">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section transition */}
        <div className="h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent mb-16 md:mb-24" />

        {/* Multi-Judge Council Visual */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4 text-center">
            The 4-Judge AI Council
          </h2>
          <p className="text-secondary text-center mb-10 max-w-xl mx-auto leading-relaxed">
            Multiple models, independent evaluation, aggregated results. Single-model bias is eliminated by design.
          </p>

          <div className="relative bg-gradient-to-br from-[#f8f5ef] to-[#fefcf9] rounded-2xl border border-stone-200/70 p-8 md:p-12">
            {/* Judge nodes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { name: "Claude", label: "Judge 1" },
                { name: "GPT-4", label: "Judge 2" },
                { name: "Gemini", label: "Judge 3" },
                { name: "Model 4", label: "Judge 4" },
              ].map((judge) => (
                <div
                  key={judge.name}
                  className="flex flex-col items-center p-4 rounded-xl bg-white border border-stone-200/70 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4f7b77]/20 to-[#4f7b77]/5 flex items-center justify-center mb-2">
                    <Brain className="h-5 w-5 text-deep" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-semibold text-primary">{judge.name}</p>
                  <p className="text-[11px] text-stone-400">{judge.label}</p>
                </div>
              ))}
            </div>

            {/* Arrow down */}
            <div className="flex justify-center mb-6">
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-6 bg-stone-300" />
                <div className="text-[11px] text-stone-400 font-medium tracking-wide">
                  INDEPENDENT SCORING
                </div>
                <div className="w-px h-6 bg-stone-300" />
              </div>
            </div>

            {/* Aggregation */}
            <div className="flex justify-center">
              <div className="px-6 py-4 rounded-xl bg-gradient-to-r from-[#4f7b77] to-[#5a8a86] text-white shadow-lg">
                <div className="flex items-center gap-2">
                  <Scale className="h-5 w-5" strokeWidth={1.5} />
                  <div>
                    <p className="font-semibold text-sm">Score Aggregation</p>
                    <p className="text-[11px] text-white/70">
                      Consensus or flagged disagreement
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section transition */}
        <div className="h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent mb-16 md:mb-24" />

        {/* Evidence Weighting Detail */}
        <section className="mb-16 md:mb-24 bg-white/50 -mx-4 md:-mx-8 px-4 md:px-8 py-10 md:py-14 rounded-2xl">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4 text-center">
            Evidence scoring dimensions
          </h2>
          <p className="text-lg text-secondary text-center mb-3 max-w-xl mx-auto leading-relaxed">
            Every piece of evidence is scored on four independent dimensions.
          </p>
          <p className="text-center mb-10">
            <span className="font-mono tabular-nums text-deep text-sm font-bold bg-deep/5 px-3 py-1 rounded-full">Total evidence score = sum of all four (max 40)</span>
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {evidenceDimensions.map((dim, i) => (
              <div
                key={dim.name}
                className="bg-[#fefcf9] rounded-xl p-5 md:p-6 border border-stone-200/70 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 animate-card-fade-in"
                style={{ borderLeftWidth: "4px", borderLeftColor: dim.color, animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-lg text-primary">{dim.name}</h3>
                  <span
                    className="text-xs font-mono tabular-nums font-bold px-2.5 py-1 rounded-full"
                    style={{
                      color: dim.color,
                      backgroundColor: `${dim.color}12`,
                    }}
                  >
                    {dim.range}
                  </span>
                </div>
                <p className="text-[14px] text-secondary leading-relaxed">
                  {dim.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Confidence Calibration */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4 text-center">
            Confidence calibration
          </h2>
          <p className="text-secondary text-center mb-10 max-w-xl mx-auto leading-relaxed">
            The confidence score reflects the balance of evidence, not the
            model&apos;s opinion. We report uncertainty honestly.
          </p>

          <div className="bg-[#faf8f3] rounded-xl p-6 md:p-8 border border-stone-200/70 mb-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-deep/10 flex items-center justify-center">
                <Lightbulb className="h-5 w-5 text-deep" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary">The Formula</p>
                <p className="font-mono text-xs text-stone-500">
                  confidence = forScore / (forScore + againstScore + 1) x 100
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-14 text-center text-sm font-mono font-medium text-deep">
                  90%+
                </span>
                <div className="flex-1 h-2 bg-stone-200/50 rounded-full overflow-hidden">
                  <div className="h-full w-[95%] bg-gradient-to-r from-[#4f7b77] to-[#5a8a86] rounded-full" />
                </div>
                <p className="text-sm text-stone-600 w-48">
                  <strong className="text-stone-900">Settled</strong> — Scientific consensus
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-14 text-center text-sm font-mono font-medium text-rust-500">
                  50-89%
                </span>
                <div className="flex-1 h-2 bg-stone-200/50 rounded-full overflow-hidden">
                  <div className="h-full w-[65%] bg-gradient-to-r from-[#C4613C] to-[#b05434] rounded-full" />
                </div>
                <p className="text-sm text-stone-600 w-48">
                  <strong className="text-stone-900">Probable</strong> — Good evidence, some uncertainty
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-14 text-center text-sm font-mono font-medium text-[#a23b3b]">
                  &lt;50%
                </span>
                <div className="flex-1 h-2 bg-stone-200/50 rounded-full overflow-hidden">
                  <div className="h-full w-[35%] bg-gradient-to-r from-[#a23b3b] to-[#c45c5c] rounded-full" />
                </div>
                <p className="text-sm text-stone-600 w-48">
                  <strong className="text-stone-900">Contested</strong> — Genuine uncertainty
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section transition */}
        <div className="h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent mb-16 md:mb-24" />

        {/* What This Means for You */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4 text-center">
            What this means for you
          </h2>
          <p className="text-lg text-secondary text-center mb-10 max-w-xl mx-auto">Three guarantees that set us apart from single-model AI.</p>
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {outcomes.map((outcome, i) => (
              <div
                key={outcome.title}
                className="bg-[#fefcf9] rounded-xl p-5 md:p-6 border border-stone-200/70 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 animate-card-fade-in"
                style={{ borderLeftWidth: "4px", borderLeftColor: outcome.color, animationDelay: `${i * 100}ms` }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${outcome.color}12` }}
                >
                  <outcome.icon
                    className="h-5 w-5"
                    style={{ color: outcome.color }}
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-serif text-lg text-primary mb-2">
                  {outcome.title}
                </h3>
                <p className="text-[14px] md:text-[15px] text-secondary leading-relaxed">
                  {outcome.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-[#f0ece5]/60 to-[#ebe6de]/60 rounded-2xl p-8 sm:p-12 text-center my-14 md:my-20">
          <Brain className="h-6 w-6 text-deep/40 mx-auto mb-4" strokeWidth={1.5} />
          <h3 className="font-serif text-xl md:text-2xl text-primary mb-3">
            See the methodology in action
          </h3>
          <p className="text-secondary mb-7 max-w-md mx-auto">
            Try it yourself, or explore pre-built topics analyzed with this framework.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-rust-500 to-rust-600 text-white text-sm font-medium hover:from-rust-600 hover:to-rust-700 transition-all shadow-md hover:shadow-lg"
            >
              Try It Yourself
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/topics"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-stone-300 text-stone-600 hover:border-deep/30 text-sm font-medium hover:bg-white/60 transition-colors"
            >
              Explore Pre-Built Topics
              <Scale className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <div className="pt-6 border-t border-stone-200 mb-8">
          <p className="text-sm text-muted italic text-center">
            Our methodology is open to scrutiny. If you find a flaw, that makes us better.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
