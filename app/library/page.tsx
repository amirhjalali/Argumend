import Link from "next/link";
import { ExternalLink, Library as LibraryIcon, ArrowRight } from "lucide-react";
import {
  CATEGORY_LABELS,
  TOPIC_COUNT,
} from "@/data/topicIndex";
import { AppShell } from "@/components/AppShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { BalanceWeightChip } from "@/components/BalanceWeightChip";
import {
  libraryShelfOrder,
  libraryShelves,
  libraryResources,
  libraryCatalogNumbers,
  groupResourcesByShelf,
} from "@/lib/libraryMeta";
import { getCollectionItemPresentation } from "@/lib/collectionStyles";
import { libraryTopicSampler } from "./_config";

export default function LibraryPage() {
  const shelfGroups = groupResourcesByShelf();

  return (
    <AppShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Library",
          description:
            "The books, papers, and tools that inform how we think. Good starting points if you want to go deeper.",
          url: "https://argumend.org/library",
          isPartOf: {
            "@type": "WebSite",
            name: "ARGUMEND",
            url: "https://argumend.org",
          },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: libraryResources.length,
            itemListElement: libraryResources.map((resource, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: resource.title,
              url: resource.url,
            })),
          },
        }}
      />
      <div className="min-h-full">
        <div className="mx-auto max-w-3xl px-4 md:px-8 py-8 md:py-14">
          {/* Header */}
          <div className="mb-10">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Library" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-deep/10 dark:bg-deep/20 border border-deep/20 dark:border-deep/40 rounded-full text-xs font-medium text-deep dark:text-[#9bc7c3] tracking-wide mb-4">
              <LibraryIcon className="h-3 w-3" />
              Resource Hub
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary dark:text-stone-200 mb-6 leading-[1.08]">
              Library
            </h1>
            <p className="text-lg text-secondary dark:text-stone-400 leading-relaxed max-w-2xl">
              The books, papers, and tools that inform how we think. Good starting points if you want to go deeper.
            </p>
          </div>

          {/* Lightweight, cross-category topic sampler */}
          <section className="mb-16 md:mb-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-primary dark:text-stone-200 mb-3">
              Argument map sampler
            </h2>
            <p className="mb-5 max-w-2xl text-secondary dark:text-stone-400 leading-relaxed">
              A quick shelf of {libraryTopicSampler.length} maps—three from each
              category. The complete catalog contains {TOPIC_COUNT} topics.
            </p>
            <div className="bg-white/80 dark:bg-[#252420]/80 rounded-xl border border-stone-200/60 dark:border-[var(--border-default)] overflow-hidden shadow-card">
              <table className="w-full">
                <caption className="sr-only">
                  Sample argument maps with category, map size, evidence balance, and evidential weight
                </caption>
                <thead className="bg-gradient-to-b from-[#faf8f5] to-[#f4f1eb] dark:from-[#302e2a] dark:to-[#252420]">
                  <tr>
                    <th scope="col" className="text-left px-5 py-3.5 text-sm font-semibold text-primary dark:text-stone-200">Topic</th>
                    <th scope="col" className="text-left px-5 py-3.5 text-sm font-semibold text-primary dark:text-stone-200 hidden sm:table-cell">Map</th>
                    <th scope="col" className="text-right px-5 py-3.5 text-sm font-semibold text-primary dark:text-stone-200">Balance + Weight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200/60 dark:divide-[var(--border-default)]">
                  {libraryTopicSampler.map((topic) => (
                    <tr key={topic.id} className="hover:bg-[#faf8f5] dark:hover:bg-[#302e2a] transition-colors">
                      <td className="px-5 py-3.5 text-sm md:text-base">
                        <Link href={`/topics/${topic.id}`} className="inline-flex min-h-11 items-center font-medium text-primary dark:text-stone-200 hover:text-deep dark:hover:text-[#9bc7c3] transition-colors">
                          {topic.title}
                        </Link>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-secondary dark:text-stone-400 hidden sm:table-cell leading-relaxed">
                        {CATEGORY_LABELS[topic.category]} · {topic.pillarCount} pillars · {topic.evidenceCount} evidence items
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <BalanceWeightChip balance={topic.balance} weight={topic.weight} verdict={topic.verdict} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link
              href="/topics"
              className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-deep transition-colors hover:text-deep-dark dark:text-[#9bc7c3] dark:hover:text-[#b7d9d6]"
            >
              Browse all {TOPIC_COUNT} topics
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>

          {/* Recommended Reading — three shelves, one distinct entry per card */}
          <section className="mb-16 md:mb-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-primary dark:text-stone-200 mb-3">
              Recommended Reading
            </h2>
            <p className="text-secondary dark:text-stone-400 leading-relaxed max-w-2xl mb-6">
              {libraryResources.length} sources, sorted onto {shelfGroups.length}{" "}
              shelves by the kind of thinking they teach — where the concepts
              come from, how claims get tested, and why your own judgment slips.
            </p>

            {/* Shelf index — doubles as a jump-to-section nav */}
            <nav aria-label="Library shelves" className="flex flex-wrap gap-2 mb-10">
              {libraryShelfOrder.map((id) => {
                const shelf = libraryShelves[id];
                const count =
                  shelfGroups.find((g) => g.shelf.id === id)?.items.length ?? 0;
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={`inline-flex min-h-10 items-center gap-2 pl-2.5 pr-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${shelf.chip}`}
                  >
                    <span className="font-serif text-[13px] opacity-70">{shelf.numeral}</span>
                    {shelf.label}
                    <span className="opacity-60 tabular-nums">{count}</span>
                  </a>
                );
              })}
            </nav>

            <div className="space-y-12">
              {shelfGroups.map(({ shelf, items }) => {
                const ShelfIcon = shelf.icon;
                return (
                  <div key={shelf.id} id={shelf.id} className="scroll-mt-20">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className={`font-serif text-2xl ${shelf.iconText}`}>
                        {shelf.numeral}.
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-primary dark:text-stone-200 flex items-center gap-2">
                        <ShelfIcon className={`h-5 w-5 ${shelf.iconText}`} strokeWidth={1.8} />
                        {shelf.label}
                      </h3>
                    </div>
                    <p className="text-secondary dark:text-stone-400 leading-relaxed max-w-2xl mb-5">
                      {shelf.description}
                    </p>

                    <div className="space-y-2.5">
                      {items.map((resource) => {
                        const Icon = resource.icon;
                        const num = libraryCatalogNumbers.get(resource.title) ?? 0;
                        const presentation = getCollectionItemPresentation(
                          Math.max(0, num - 1),
                          { intrinsicSize: "0 110px" },
                        );
                        return (
                          <a
                            key={resource.title}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group relative flex items-start gap-4 bg-white/80 dark:bg-[#252420]/80 rounded-xl px-5 py-4 border border-stone-200/60 dark:border-[var(--border-default)] shadow-card hover:shadow-lw-hover hover:-translate-y-0.5 transition-all duration-200 ${presentation.animate ? "animate-card-fade-in" : ""} ${shelf.hoverBorder}`}
                            style={presentation.style}
                          >
                            <div
                              className={`flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full ${shelf.iconBg}`}
                            >
                              <Icon className={`h-5 w-5 ${shelf.iconText}`} strokeWidth={1.8} />
                            </div>
                            <div className="flex-1 min-w-0 pr-6">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-medium text-primary dark:text-stone-200 group-hover:text-deep dark:group-hover:text-[#9bc7c3] transition-colors">
                                  {resource.title}
                                </h4>
                                <span className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border ${shelf.chip}`}>
                                  {resource.kind}
                                </span>
                              </div>
                              <p className="text-sm text-secondary dark:text-stone-400 mt-0.5">
                                {resource.description}
                              </p>
                            </div>
                            <div className="flex-shrink-0 flex flex-col items-end gap-2">
                              <span className="text-[11px] font-mono tabular-nums text-muted/70 dark:text-stone-500/70">
                                No. {String(num).padStart(2, "0")}
                              </span>
                              <ExternalLink className="h-4 w-4 text-muted dark:text-stone-400 group-hover:text-deep dark:group-hover:text-[#9bc7c3] transition-colors" />
                              <span className="sr-only">(opens in a new tab)</span>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Explore CTA */}
          <section className="bg-white/80 dark:bg-[#252420]/80 rounded-xl border border-stone-200/60 dark:border-[var(--border-default)] p-6 md:p-8 text-center mb-16 md:mb-24">
            <h2 className="font-serif text-xl text-primary dark:text-stone-200 mb-2">
              Ready to dig deeper?
            </h2>
            <p className="text-secondary dark:text-stone-400 text-sm mb-5 max-w-sm mx-auto">
              Want the ideas behind the tool? Browse our key concepts or pick up a guide.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/concepts"
                className="inline-flex min-h-11 items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rust-500 to-rust-600 text-white rounded-xl text-sm font-semibold font-serif shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                Key Concepts
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/guides"
                className="inline-flex min-h-11 items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-200/60 dark:border-[var(--border-default)] text-primary dark:text-stone-200 text-sm font-medium hover:border-deep/30 hover:bg-stone-50 dark:hover:bg-[#302e2a] transition-all duration-200"
              >
                Browse Guides
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </section>

          {/* Footer note */}
          <div className="pt-8 border-t border-stone-200/60 dark:border-[var(--border-default)]">
            <p className="text-sm text-muted dark:text-stone-400 italic">
              These shaped how we think. Read them and decide for yourself.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
