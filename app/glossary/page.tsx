import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";

interface GlossaryTerm {
  term: string;
  definition: string;
  learnMoreHref?: string;
  learnMoreText?: string;
  category: "core" | "reasoning" | "fallacies" | "methodology";
}

const terms: GlossaryTerm[] = [
  // Core Concepts
  {
    term: "Argument Mapping",
    definition:
      "A visual method for laying out the structure of a debate: the core claim, supporting and opposing arguments, evidence, and the logical relationships between them. Unlike linear debate, argument maps make it possible to see the full landscape of a disagreement at once.",
    learnMoreHref: "/how-it-works",
    learnMoreText: "How Argumend maps arguments",
    category: "core",
  },
  {
    term: "Steel-Manning",
    definition:
      "The practice of presenting an opposing argument in its strongest, most charitable form — even stronger than the person making it stated it. The opposite of straw-manning. Steel-manning forces genuine engagement with the best version of each position and prevents dismissing views you haven't truly understood.",
    learnMoreHref: "/blog/why-steel-manning-makes-you-smarter",
    learnMoreText: "Why steel-manning makes you smarter",
    category: "core",
  },
  {
    term: "Crux",
    definition:
      "The specific, often testable claim that sits at the heart of a disagreement. If the crux were resolved, one or both sides would update their position. Identifying the crux transforms abstract debates into concrete, answerable questions. For example, in the nuclear energy debate, a crux might be: 'Can modern reactor designs achieve passive safety that makes meltdowns physically impossible?'",
    learnMoreHref: "/concepts/cruxes",
    learnMoreText: "Understanding cruxes",
    category: "core",
  },
  {
    term: "Confidence Score",
    definition:
      "A number from 0 to 100 representing the balance of evidence for and against a claim. A score of 95+ indicates overwhelming evidence (settled science). Around 50 means genuinely contested. Scores are computed from individual evidence items, each weighted on four dimensions: source reliability, independence, replicability, and directness.",
    learnMoreHref: "/concepts/confidence-scores",
    learnMoreText: "How confidence scores work",
    category: "core",
  },
  {
    term: "Pillar",
    definition:
      "A foundational argument thread within a topic. Each Argumend topic is structured around three pillars — the three most important lines of argument. Each pillar includes a skeptic's premise (steel-manned), a proponent's rebuttal (steel-manned), evidence for and against, and a crux question.",
    learnMoreHref: "/concepts/pillars",
    learnMoreText: "Understanding pillars",
    category: "core",
  },
  {
    term: "Verification Status",
    definition:
      "The testability status of a crux question. 'Verified' means the test has been performed and results are available. 'Theoretical' means the test is possible but hasn't been done or results aren't conclusive. 'Impossible' means the test cannot currently be performed with existing technology or methods.",
    learnMoreHref: "/concepts/verification-status",
    learnMoreText: "Verification status explained",
    category: "core",
  },
  // Reasoning Concepts
  {
    term: "Bayesian Reasoning",
    definition:
      "Updating your beliefs based on new evidence, proportional to how surprising or informative that evidence is. Named after Thomas Bayes. Rather than accepting or rejecting claims absolutely, Bayesian reasoning assigns and adjusts probabilities as evidence accumulates.",
    category: "reasoning",
  },
  {
    term: "Triangulation",
    definition:
      "Using multiple independent sources or methods to verify information. When independent sources with different biases and methods converge on the same conclusion, confidence increases dramatically because independent sources have uncorrelated errors.",
    learnMoreHref: "/guides/triangulation",
    learnMoreText: "Guide to triangulation",
    category: "reasoning",
  },
  {
    term: "Epistemic Humility",
    definition:
      "The recognition that your beliefs might be wrong, combined with a willingness to update them when presented with good evidence. Not the same as uncertainty about everything — it's being proportionally confident, holding strong views loosely enough that evidence can change them.",
    category: "reasoning",
  },
  {
    term: "First Principles Thinking",
    definition:
      "Breaking a problem down to its most fundamental truths and reasoning up from there, rather than reasoning by analogy or convention. Useful for challenging assumptions that 'everyone knows' but few have verified.",
    learnMoreHref: "/guides/first-principles",
    learnMoreText: "Guide to first principles",
    category: "reasoning",
  },
  {
    term: "Ideological Turing Test",
    definition:
      "Coined by economist Bryan Caplan: the test of whether you can state an opposing position well enough that a genuine believer couldn't tell you were faking. If you can't pass this test for a view you disagree with, you don't understand it well enough to argue against it.",
    category: "reasoning",
  },
  {
    term: "Evidence Weighting",
    definition:
      "The practice of evaluating evidence on multiple dimensions rather than treating all evidence as equal. Argumend scores evidence on four dimensions: source reliability (0-10), independence (0-10), replicability (0-10), and directness (0-10), giving a maximum score of 40 per evidence item.",
    learnMoreHref: "/methodology",
    learnMoreText: "Our evidence methodology",
    category: "methodology",
  },
  // Logical Fallacies
  {
    term: "Straw Man Fallacy",
    definition:
      "Misrepresenting someone's argument to make it easier to attack. Instead of engaging with what someone actually said, you substitute a weaker, distorted version. The cure is steel-manning: presenting the strongest version of the opposing view before responding.",
    category: "fallacies",
  },
  {
    term: "Ad Hominem",
    definition:
      "Attacking the person making an argument rather than the argument itself. 'You're wrong because you're biased' is ad hominem. 'Your argument fails because the evidence contradicts it' is not. The source of an argument is relevant to its credibility but doesn't determine its validity.",
    category: "fallacies",
  },
  {
    term: "False Dichotomy",
    definition:
      "Presenting only two options when more exist. 'You're either for us or against us' ignores the possibility of being partially aligned, neutral, or aligned on some issues and opposed on others. Most real-world questions exist on a spectrum, not a binary.",
    category: "fallacies",
  },
  {
    term: "Appeal to Authority",
    definition:
      "Citing an expert's opinion as proof without examining the evidence behind it. Expertise increases the probability that someone is right, but experts can be wrong, biased, or speaking outside their domain. The evidence matters more than who presents it.",
    category: "fallacies",
  },
  {
    term: "Whataboutism",
    definition:
      "Deflecting criticism by pointing to someone else's behavior. 'What about X?' does not address whether Y is wrong — it changes the subject. A valid criticism remains valid regardless of whether the critic is also guilty of something else.",
    category: "fallacies",
  },
  {
    term: "False Balance",
    definition:
      "Treating both sides of an argument as equally valid when the evidence strongly favors one side. Giving 'equal time' to a position supported by 97% of evidence and one supported by 3% distorts reality. Fairness means proportional representation of evidence, not equal airtime.",
    learnMoreHref: "/blog/false-balance-both-sides",
    learnMoreText: "When both sides aren't equal",
    category: "fallacies",
  },
  {
    term: "Confirmation Bias",
    definition:
      "The tendency to search for, interpret, and remember information that confirms your existing beliefs while ignoring or downplaying contradictory evidence. The most pervasive cognitive bias in argumentation. Steel-manning is the most direct antidote.",
    category: "fallacies",
  },
  // Methodology
  {
    term: "Multi-Model Judge Council",
    definition:
      "Argumend's approach to AI argument analysis: multiple large language models independently score arguments on structured rubrics. Aggregating scores from different models reduces the bias any single model might introduce and flags disagreements that warrant human attention.",
    learnMoreHref: "/methodology",
    learnMoreText: "How the judge council works",
    category: "methodology",
  },
  {
    term: "Source Reliability",
    definition:
      "One of four evidence weighting dimensions (0-10 scale). Measures the track record, expertise, and methodological rigor of the source. Peer-reviewed research scores higher than blog posts. Institutions with track records of accuracy score higher than those without.",
    category: "methodology",
  },
  {
    term: "Independence (Evidence Dimension)",
    definition:
      "One of four evidence weighting dimensions (0-10 scale). Measures whether the source is free from conflicts of interest and whether the finding has been corroborated by independent parties. Independent confirmation dramatically increases evidence quality.",
    category: "methodology",
  },
  {
    term: "Replicability",
    definition:
      "One of four evidence weighting dimensions (0-10 scale). Measures whether the evidence can be verified independently by others. Reproducible results score higher than one-off observations. The replication crisis in social science has shown why this dimension matters.",
    category: "methodology",
  },
  {
    term: "Directness (Evidence Dimension)",
    definition:
      "One of four evidence weighting dimensions (0-10 scale). Measures how directly the evidence addresses the specific claim being evaluated. Direct measurement scores higher than inference. A randomized controlled trial that tests the exact claim scores higher than an observational study that suggests it.",
    category: "methodology",
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
          url: "https://argumend.org/glossary",
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
            precise, and useful.
          </p>
        </div>

        {/* Quick nav */}
        <nav className="mb-10 flex flex-wrap gap-2">
          {categoryOrder.map((cat) => (
            <a
              key={cat}
              href={`#${cat}`}
              className="px-3 py-1.5 text-sm rounded-full border border-stone-200/60 text-secondary hover:border-deep/30 hover:text-deep transition-colors"
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
              <h2 className="font-serif text-2xl text-primary mb-6 pb-2 border-b border-stone-200/60">
                {categoryLabels[cat]}
              </h2>
              <dl className="space-y-6">
                {catTerms.map((t) => (
                  <div
                    key={t.term}
                    id={t.term.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "")}
                    className="group"
                  >
                    <dt className="font-serif text-lg text-primary font-medium mb-1">
                      {t.term}
                    </dt>
                    <dd className="text-secondary leading-relaxed pl-0">
                      {t.definition}
                      {t.learnMoreHref && (
                        <Link
                          href={t.learnMoreHref}
                          className="inline-flex items-center gap-1 ml-2 text-deep hover:text-deep-dark text-sm font-medium transition-colors"
                        >
                          {t.learnMoreText || "Learn more"}
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          );
        })}

        {/* CTA */}
        <div className="mt-14 p-6 rounded-xl bg-[#faf8f5] border border-stone-200/60 text-center">
          <h3 className="font-serif text-xl text-primary mb-2">
            See These Concepts in Action
          </h3>
          <p className="text-secondary mb-4">
            Every term in this glossary is applied across our 60+ topic
            analyses.
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
