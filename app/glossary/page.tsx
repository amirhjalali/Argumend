import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";

interface GlossaryTerm {
  term: string;
  definition: string;
  example?: string;
  exampleHref?: string;
  learnMoreHref?: string;
  learnMoreText?: string;
  category: "core" | "reasoning" | "fallacies" | "methodology";
}

const terms: GlossaryTerm[] = [
  // Core Concepts
  {
    term: "Argument Mapping",
    definition:
      "A visual method of structuring the premises, evidence, and conclusions of a debate to reveal its logical structure. Unlike linear debate, argument maps make it possible to see the full landscape of a disagreement at once.",
    example: "See this in action on our Nuclear Energy analysis",
    exampleHref: "/topics/nuclear-energy-safety",
    learnMoreHref: "/how-it-works",
    learnMoreText: "How Argumend maps arguments",
    category: "core",
  },
  {
    term: "Steel-Manning",
    definition:
      "Presenting the strongest possible version of an opponent's argument before responding to it, the opposite of straw-manning. Steel-manning forces genuine engagement with the best version of each position and prevents dismissing views you haven't truly understood.",
    example: "See steel-manned positions on our Climate Change topic",
    exampleHref: "/topics/climate-change",
    learnMoreHref: "/blog/why-steel-manning-makes-you-smarter",
    learnMoreText: "Why steel-manning makes you smarter",
    category: "core",
  },
  {
    term: "Crux",
    definition:
      "The single most decisive question or piece of evidence that, if resolved, would change one side's position on a debate. Identifying the crux transforms abstract debates into concrete, answerable questions.",
    example: "See crux questions on our Moon Landing analysis",
    exampleHref: "/topics/moon-landing",
    learnMoreHref: "/concepts/cruxes",
    learnMoreText: "Understanding cruxes",
    category: "core",
  },
  {
    term: "Confidence Score",
    definition:
      "A numerical measure (0-100) of how strongly available evidence supports or undermines a claim. A score of 95+ indicates overwhelming evidence (settled science). Around 50 means genuinely contested. Scores are computed from individual evidence items, each weighted on four dimensions.",
    example: "Compare confidence scores across all topics",
    exampleHref: "/topics",
    learnMoreHref: "/concepts/confidence-scores",
    learnMoreText: "How confidence scores work",
    category: "core",
  },
  {
    term: "Meta-Claim",
    definition:
      "The central thesis or proposition that a topic's argument map is structured around. Every pillar, piece of evidence, and crux question ultimately relates back to whether this core claim holds up under scrutiny.",
    example: "See the meta-claim on the AI Job Displacement topic",
    exampleHref: "/topics/ai-job-displacement",
    category: "core",
  },
  {
    term: "Pillar",
    definition:
      "A major axis of disagreement within a debate, containing opposing arguments and a decisive crux. Each Argumend topic is structured around three pillars representing the most important lines of argument, with steel-manned positions, weighted evidence, and crux questions.",
    example: "See how pillars structure the COVID Origins analysis",
    exampleHref: "/topics/covid-origins",
    learnMoreHref: "/concepts/pillars",
    learnMoreText: "Understanding pillars",
    category: "core",
  },
  {
    term: "Skeptic Premise",
    definition:
      "The strongest version of the argument opposing a topic's meta-claim. Each pillar includes a steel-manned skeptic premise that represents the most compelling challenge to the claim, presented fairly and at full strength.",
    example: "See skeptic premises on the Gene Editing topic",
    exampleHref: "/topics/gene-editing-embryos",
    category: "core",
  },
  {
    term: "Proponent Rebuttal",
    definition:
      "The strongest response defending a topic's meta-claim against the skeptic's case. Like the skeptic premise, the proponent rebuttal is steel-manned to represent the most compelling defense available.",
    example: "See proponent rebuttals on the Universal Healthcare analysis",
    exampleHref: "/topics/universal-healthcare",
    category: "core",
  },
  {
    term: "Verification Status",
    definition:
      "Whether a crux has been verified, remains theoretical, or is impossible to test with current methods. 'Verified' means the test has been performed and results are available. 'Theoretical' means the test is possible but hasn't been done. 'Impossible' means the test cannot currently be performed.",
    example: "Compare verification statuses on the Moon Landing topic",
    exampleHref: "/topics/moon-landing",
    learnMoreHref: "/concepts/verification-status",
    learnMoreText: "Verification status explained",
    category: "core",
  },
  // Reasoning Concepts
  {
    term: "Evidence Weighting",
    definition:
      "A systematic method of scoring evidence across dimensions like source reliability, independence, replicability, and directness. Rather than treating all evidence as equal, each item is scored 0-10 on four dimensions, giving a maximum score of 40.",
    example: "See weighted evidence on our AI Regulation analysis",
    exampleHref: "/topics/ai-regulation",
    learnMoreHref: "/methodology",
    learnMoreText: "Our evidence methodology",
    category: "methodology",
  },
  {
    term: "Bayesian Reasoning",
    definition:
      "Updating the probability of a hypothesis proportionally as new evidence is encountered. Named after Thomas Bayes. Rather than accepting or rejecting claims absolutely, Bayesian reasoning assigns and adjusts probabilities as evidence accumulates.",
    example: "See how evidence accumulates on the Longevity Science topic",
    exampleHref: "/topics/longevity-science",
    category: "reasoning",
  },
  {
    term: "Confirmation Bias",
    definition:
      "The tendency to search for, interpret, and remember information that confirms pre-existing beliefs while ignoring or downplaying contradictory evidence. The most pervasive cognitive bias in argumentation. Steel-manning is the most direct antidote.",
    example: "See how we counter bias on the Social Media & Elections topic",
    exampleHref: "/topics/social-media-elections",
    category: "fallacies",
  },
  {
    term: "Dunning-Kruger Effect",
    definition:
      "A cognitive bias where people with limited knowledge overestimate their competence, while experts underestimate theirs. In debates, this manifests as outsized confidence from those who have read one article versus measured uncertainty from researchers who have spent decades on the question.",
    example: "Explore expert vs. public confidence on the Consciousness topic",
    exampleHref: "/topics/consciousness-hard-problem",
    category: "fallacies",
  },
  {
    term: "Base Rate Neglect",
    definition:
      "Ignoring the general probability of an event when evaluating specific evidence. For example, a test that is 99% accurate still produces many false positives if the base rate of the condition is very low. Proper evidence weighting requires considering prior probabilities.",
    example: "See base rates in context on the GLP-1 Weight Loss Drugs analysis",
    exampleHref: "/topics/glp1-weight-loss-drugs",
    category: "fallacies",
  },
  {
    term: "Burden of Proof",
    definition:
      "The obligation on the party making a claim to provide evidence supporting it. Extraordinary claims require extraordinary evidence. In Argumend's framework, the burden is reflected in how evidence is weighted — unsupported assertions receive low scores across all dimensions.",
    example: "See burden of proof applied on the Epstein Files topic",
    exampleHref: "/topics/epstein-files",
    category: "reasoning",
  },
  // Logical Fallacies
  {
    term: "Logical Fallacy",
    definition:
      "An error in reasoning that undermines the logic of an argument, such as ad hominem, straw man, or false dichotomy. Recognizing fallacies is essential for evaluating whether a conclusion actually follows from its premises.",
    example: "See how we identify fallacies on the TikTok Ban analysis",
    exampleHref: "/topics/tiktok-ban",
    category: "fallacies",
  },
  {
    term: "Ad Hominem",
    definition:
      "Attacking the person making an argument rather than addressing the argument itself. 'You're wrong because you're biased' is ad hominem. 'Your argument fails because the evidence contradicts it' is not. The source of an argument is relevant to credibility but doesn't determine validity.",
    example: "See how we separate person from argument on the Immigration debate",
    exampleHref: "/topics/immigration-border-crisis",
    category: "fallacies",
  },
  {
    term: "Straw Man",
    definition:
      "Misrepresenting someone's argument to make it easier to attack. Instead of engaging with what someone actually said, you substitute a weaker, distorted version. The cure is steel-manning: presenting the strongest version of the opposing view before responding.",
    example: "See steel-manned arguments on the Gun Control topic",
    exampleHref: "/topics/gun-control-effectiveness",
    category: "fallacies",
  },
  {
    term: "False Dichotomy",
    definition:
      "Presenting only two options when more exist. 'You're either for us or against us' ignores partial alignment, neutrality, or agreement on some issues and opposition on others. Most real-world questions exist on a spectrum, not a binary.",
    example: "See nuanced positions on the AI in Education analysis",
    exampleHref: "/topics/ai-in-education",
    category: "fallacies",
  },
  {
    term: "Appeal to Authority",
    definition:
      "Accepting a claim as true solely because an authority figure endorses it, without examining the evidence. Expertise increases the probability that someone is right, but experts can be wrong, biased, or speaking outside their domain. The evidence matters more than who presents it.",
    example: "See how we weigh expert sources on the Microplastics topic",
    exampleHref: "/topics/microplastics-health-crisis",
    category: "fallacies",
  },
];

const categoryLabels: Record<GlossaryTerm["category"], string> = {
  core: "Core Concepts",
  reasoning: "Reasoning & Thinking",
  fallacies: "Logical Fallacies & Biases",
  methodology: "Argumend Methodology",
};

const categoryOrder: GlossaryTerm["category"][] = [
  "core",
  "reasoning",
  "fallacies",
  "methodology",
];

export default function GlossaryPage() {
  // Sort terms alphabetically within each category
  const sortedTerms = [...terms].sort((a, b) => a.term.localeCompare(b.term));

  // Build alphabetical index
  const alphabet = Array.from(
    new Set(sortedTerms.map((t) => t.term[0].toUpperCase()))
  ).sort();

  const definedTerms = terms.map((t) => ({
    "@type": "DefinedTerm",
    name: t.term,
    description: t.definition,
    inDefinedTermSet: "https://argumend.org/glossary",
  }));

  return (
    <AppShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: "Critical Thinking & Argument Mapping Glossary",
          description:
            "Definitions of 20+ key terms used in critical thinking, argument mapping, and evidence-based reasoning.",
          url: "https://argumend.org/glossary",
          publisher: {
            "@type": "Organization",
            name: "ARGUMEND",
            url: "https://argumend.org",
          },
          hasDefinedTerm: definedTerms,
        }}
      />

      <div className="mx-auto max-w-4xl px-4 md:px-8 py-8 md:py-14">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Glossary" },
          ]}
        />

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-deep/10 text-deep">
              <BookOpen className="h-6 w-6" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-primary">
              Glossary
            </h1>
          </div>
          <p className="text-secondary text-lg leading-relaxed max-w-2xl">
            Key terms used in critical thinking, argument mapping, and
            evidence-based reasoning. Each definition is written to be clear,
            precise, and useful &mdash; with examples from real Argumend analyses.
          </p>
        </div>

        {/* Alphabetical jump links */}
        <nav aria-label="Alphabetical navigation" className="mb-6">
          <div className="flex flex-wrap gap-1.5">
            {alphabet.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-stone-200/60 dark:border-[#3d3a36] text-sm font-mono font-medium text-stone-500 dark:text-stone-400 hover:border-deep/30 hover:text-deep hover:bg-deep/5 dark:hover:bg-deep/10 transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>
        </nav>

        {/* Category quick nav */}
        <nav className="mb-10 flex flex-wrap gap-2">
          {categoryOrder.map((cat) => (
            <a
              key={cat}
              href={`#${cat}`}
              className="px-3 py-1.5 text-sm rounded-full border border-stone-200/60 dark:border-[#3d3a36] text-secondary hover:border-deep/30 hover:text-deep transition-colors"
            >
              {categoryLabels[cat]}
            </a>
          ))}
        </nav>

        {/* Terms by category */}
        {categoryOrder.map((cat) => {
          const catTerms = terms.filter((t) => t.category === cat);
          return (
            <section key={cat} id={cat} className="mb-12">
              <h2 className="font-serif text-2xl text-primary mb-6 pb-2 border-b border-stone-200/60 dark:border-[#3d3a36]">
                {categoryLabels[cat]}
              </h2>
              <dl className="space-y-6">
                {catTerms.map((t) => {
                  const letterId = `letter-${t.term[0].toUpperCase()}`;
                  const termId = t.term
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[()]/g, "");
                  return (
                    <div
                      key={t.term}
                      id={termId}
                      className="group scroll-mt-24"
                    >
                      {/* Hidden anchor for alphabetical jump links */}
                      <span id={letterId} className="invisible absolute" />
                      <dt className="font-serif text-lg text-primary font-medium mb-1">
                        {t.term}
                      </dt>
                      <dd className="text-secondary leading-relaxed pl-0">
                        {t.definition}
                        {t.exampleHref && t.example && (
                          <Link
                            href={t.exampleHref}
                            className="flex items-center gap-1.5 mt-2 text-deep hover:text-deep-dark text-sm font-medium transition-colors"
                          >
                            <ArrowRight className="h-3 w-3" />
                            {t.example}
                          </Link>
                        )}
                        {t.learnMoreHref && (
                          <Link
                            href={t.learnMoreHref}
                            className="inline-flex items-center gap-1 ml-0 mt-1 text-deep hover:text-deep-dark text-sm font-medium transition-colors"
                          >
                            {t.learnMoreText || "Learn more"}
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </section>
          );
        })}

        {/* All Terms A-Z */}
        <section id="all-terms" className="mb-12">
          <h2 className="font-serif text-2xl text-primary mb-6 pb-2 border-b border-stone-200/60 dark:border-[#3d3a36]">
            All Terms A&ndash;Z
          </h2>
          <div className="columns-1 sm:columns-2 gap-6">
            {sortedTerms.map((t) => {
              const termId = t.term
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[()]/g, "");
              return (
                <a
                  key={t.term}
                  href={`#${termId}`}
                  className="block text-sm text-secondary hover:text-deep transition-colors py-1"
                >
                  {t.term}
                </a>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-14 p-6 rounded-xl bg-[#faf8f5] dark:bg-[#252420] border border-stone-200/60 dark:border-[#3d3a36] text-center">
          <h3 className="font-serif text-xl text-primary mb-2">
            See These Concepts in Action
          </h3>
          <p className="text-secondary mb-4">
            Every term in this glossary is applied across our topic
            analyses, with steel-manned positions, weighted evidence, and crux
            questions.
          </p>
          <Link
            href="/topics"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-b from-rust-500 to-rust-600 text-white font-medium text-sm hover:from-rust-600 hover:to-rust-700 transition-all shadow-sm"
          >
            Explore Topics
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
