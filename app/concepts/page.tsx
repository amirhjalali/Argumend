import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { concepts } from "@/data/concepts";
import {
  conceptStageOrder,
  conceptStages,
  getConceptIcon,
  groupConceptsByStage,
} from "@/lib/conceptMeta";

export default function ConceptsPage() {
  const conceptsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Key Concepts",
    description: "Understanding the framework behind structured argumentation.",
    url: "https://argumend.org/concepts",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: concepts.length,
      itemListElement: concepts.map((concept, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: concept.title,
        url: `https://argumend.org/concepts/${concept.id}`,
      })),
    },
  };

  const stageGroups = groupConceptsByStage(concepts);

  return (
    <AppShell>
      <JsonLd data={conceptsJsonLd} />
      <div className="mx-auto max-w-3xl px-4 md:px-8 py-6 md:py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Concepts" },
          ]}
        />
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary dark:text-stone-200 mb-6 leading-[1.08]">
          Key Concepts
        </h1>
        <p className="text-lg text-secondary dark:text-stone-400 leading-relaxed max-w-2xl mb-4">
          Understanding the framework behind structured argumentation.
        </p>
        <p className="text-base text-secondary dark:text-stone-400 leading-relaxed max-w-2xl mb-8">
          The {concepts.length} concepts below are the stages of how every
          Argumend map gets built: first the disagreement is framed fairly, then
          the evidence is weighed and scored, then the reasoning is stress-tested
          against what would actually change minds.
        </p>

        {/* Stage index — doubles as a jump-to-section nav */}
        <nav aria-label="Method stages" className="flex flex-wrap gap-2 mb-14">
          {conceptStageOrder.map((id) => {
            const stage = conceptStages[id];
            const count = stageGroups.find((g) => g.stage.id === id)?.items.length ?? 0;
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border py-2 pl-2.5 pr-3 text-xs font-medium transition-colors ${stage.chip}`}
              >
                <span className="font-serif text-[13px] opacity-70">{stage.numeral}</span>
                {stage.label}
                <span className="opacity-60 tabular-nums">{count}</span>
              </a>
            );
          })}
        </nav>

        {stageGroups.map(({ stage, items }) => (
          <section key={stage.id} id={stage.id} className="mb-14 scroll-mt-20">
            <div className="flex items-baseline gap-3 mb-2">
              <span className={`font-serif text-2xl ${stage.iconText}`}>{stage.numeral}.</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-primary dark:text-stone-200">{stage.label}</h2>
            </div>
            <p className="text-secondary dark:text-stone-400 leading-relaxed max-w-2xl mb-6">{stage.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {items.map((concept, index) => {
                const Icon = getConceptIcon(concept.id);
                const firstParagraph = concept.description.split("\n\n")[0] ?? "";
                const snippet =
                  firstParagraph.length > 180
                    ? firstParagraph.slice(0, 180) + "..."
                    : firstParagraph;

                return (
                  <Link
                    key={concept.id}
                    href={`/concepts/${concept.id}`}
                    className={`group bg-white/80 dark:bg-[var(--bg-card)]/80 rounded-xl p-6 border border-stone-200/60 dark:border-[var(--border-default)] shadow-card hover:shadow-lw-hover hover:-translate-y-0.5 transition-all duration-200 animate-card-fade-in ${stage.hoverBorder}`}
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full ${stage.iconBg}`}
                      >
                        <Icon className={`h-5 w-5 ${stage.iconText}`} strokeWidth={1.8} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-xl text-primary dark:text-stone-200 mb-1 group-hover:text-deep dark:group-hover:text-[#9bc7c3] transition-colors">
                          {concept.title}
                        </h3>
                        <p className="text-primary dark:text-stone-200 leading-relaxed text-sm mb-3">
                          {snippet}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1 text-deep dark:text-[#9bc7c3] text-sm font-medium">
                            Learn more
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                          {concept.topicExamples.length > 0 && (
                            <span className="text-[11px] text-muted dark:text-stone-500 bg-stone-100 dark:bg-[var(--bg-muted)] px-2 py-0.5 rounded-full">
                              Used in {concept.topicExamples.length} topics
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        <div className="mt-10 bg-white/80 dark:bg-[var(--bg-card)]/80 rounded-xl p-6 border border-[#e8e0d4] dark:border-[var(--border-divider)]">
          <h2 className="font-serif text-xl text-primary dark:text-stone-200 mb-3">
            The Methodology
          </h2>
          <p className="text-primary dark:text-stone-200 leading-relaxed mb-4">
            Our approach draws from several traditions:
          </p>
          <ul className="space-y-2 text-primary dark:text-stone-200">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4f7b77] mt-2 flex-shrink-0" />
              <span><strong>Steel-manning</strong> -- presenting the strongest version of opposing arguments</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4f7b77] mt-2 flex-shrink-0" />
              <span><strong>Crux identification</strong> -- finding the precise point where disagreements hinge</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4f7b77] mt-2 flex-shrink-0" />
              <span><strong>Bayesian reasoning</strong> -- updating confidence based on evidence</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4f7b77] mt-2 flex-shrink-0" />
              <span><strong>Falsificationism</strong> -- focusing on what could prove a claim wrong</span>
            </li>
          </ul>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-200/60 dark:border-[var(--border-default)]">
          <p className="text-sm text-secondary dark:text-stone-400">
            These concepts form the backbone of productive disagreement.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
