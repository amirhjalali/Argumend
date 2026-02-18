import Link from "next/link";
import { ExternalLink, BookOpen, Library as LibraryIcon, ArrowRight } from "lucide-react";
import { topics } from "@/data/topics";
import { AppShell } from "@/components/AppShell";

const externalResources = [
  {
    category: "Epistemology & Reasoning",
    resources: [
      { title: "Stanford Encyclopedia of Philosophy", url: "https://plato.stanford.edu/", description: "Comprehensive academic philosophy resource" },
      { title: "LessWrong", url: "https://www.lesswrong.com/", description: "Community blog focused on rationality and reasoning" },
      { title: "Rationality: From AI to Zombies", url: "https://www.readthesequences.com/", description: "Eliezer Yudkowsky's foundational rationality sequence" },
    ],
  },
  {
    category: "Scientific Method",
    resources: [
      { title: "The Logic of Scientific Discovery", url: "https://en.wikipedia.org/wiki/The_Logic_of_Scientific_Discovery", description: "Karl Popper's foundational work on falsificationism" },
      { title: "Cochrane Library", url: "https://www.cochranelibrary.com/", description: "Systematic reviews of healthcare interventions" },
      { title: "Our World in Data", url: "https://ourworldindata.org/", description: "Research and data on global problems" },
    ],
  },
  {
    category: "Critical Thinking",
    resources: [
      { title: "Thinking, Fast and Slow", url: "https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow", description: "Daniel Kahneman on cognitive biases" },
      { title: "The Scout Mindset", url: "https://www.juliagalef.com/book/", description: "Julia Galef on truth-seeking vs. advocacy" },
      { title: "Superforecasting", url: "https://en.wikipedia.org/wiki/Superforecasting", description: "Philip Tetlock on prediction and calibration" },
    ],
  },
];

export default function LibraryPage() {
  return (
    <AppShell>
      <div className="min-h-full">
        <div className="mx-auto max-w-3xl px-4 md:px-8 py-8 md:py-14">
          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-deep/10 border border-deep/20 rounded-full text-xs font-medium text-deep tracking-wide mb-4">
              <LibraryIcon className="h-3 w-3" />
              Resource Hub
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary mb-6 leading-[1.08]">
              Library
            </h1>
            <p className="text-lg text-secondary leading-relaxed max-w-2xl">
              The books, papers, and tools that inform how we think. Good starting points if you want to go deeper.
            </p>
          </div>

          {/* Topics Overview */}
          <section className="mb-16 md:mb-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">
              Topics Overview
            </h2>
            <div className="bg-white/80 rounded-xl border border-stone-200/60 overflow-hidden shadow-card">
              <table className="w-full">
                <thead className="bg-gradient-to-b from-[#faf8f5] to-[#f4f1eb]">
                  <tr>
                    <th className="text-left px-5 py-3.5 text-sm font-semibold text-primary">Topic</th>
                    <th className="text-left px-5 py-3.5 text-sm font-semibold text-primary hidden sm:table-cell">Pillars</th>
                    <th className="text-right px-5 py-3.5 text-sm font-semibold text-primary">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200/60">
                  {topics.map((topic) => (
                    <tr key={topic.id} className="hover:bg-[#faf8f5] transition-colors">
                      <td className="px-5 py-3.5 text-sm md:text-base">
                        <Link href={`/topics/${topic.id}`} className="font-medium text-primary hover:text-deep transition-colors">
                          {topic.title}
                        </Link>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-secondary hidden sm:table-cell leading-relaxed">
                        {topic.pillars.map(p => p.title).join(", ")}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-1.5 bg-stone-100 rounded-full overflow-hidden hidden sm:block">
                            <div
                              className="h-full bg-deep rounded-full"
                              style={{ width: `${topic.confidence_score}%` }}
                            />
                          </div>
                          <span className="font-mono text-sm text-primary">
                            {topic.confidence_score}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Recommended Reading */}
          <section className="mb-16 md:mb-24">
            <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">
              Recommended Reading
            </h2>
            <div className="space-y-8">
              {externalResources.map((category, catIdx) => (
                <div key={category.category}>
                  <h3 className="font-serif text-lg text-primary mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-deep" strokeWidth={1.8} />
                    {category.category}
                  </h3>
                  <div className="space-y-2">
                    {category.resources.map((resource, resIdx) => (
                      <a
                        key={resource.title}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between bg-white/80 rounded-xl px-5 py-4 border border-stone-200/60 shadow-card hover:border-deep/30 hover:shadow-lw-hover hover:-translate-y-0.5 transition-all duration-200 animate-card-fade-in"
                        style={{ animationDelay: `${(catIdx * 3 + resIdx) * 50}ms` }}
                      >
                        <div>
                          <h4 className="font-medium text-primary group-hover:text-deep transition-colors">
                            {resource.title}
                          </h4>
                          <p className="text-sm text-secondary mt-0.5">
                            {resource.description}
                          </p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted group-hover:text-deep transition-colors flex-shrink-0 ml-4" />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Explore CTA */}
          <section className="bg-white/80 rounded-xl border border-stone-200/60 p-6 md:p-8 text-center mb-16 md:mb-24">
            <h2 className="font-serif text-xl text-primary mb-2">
              Ready to dig deeper?
            </h2>
            <p className="text-secondary text-sm mb-5 max-w-sm mx-auto">
              Want the ideas behind the tool? Browse our key concepts or pick up a guide.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/concepts"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rust-500 to-rust-600 text-white rounded-xl text-sm font-semibold font-serif shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                Key Concepts
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-200/60 text-primary text-sm font-medium hover:border-deep/30 hover:bg-stone-50 transition-all duration-200"
              >
                Browse Guides
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </section>

          {/* Footer note */}
          <div className="pt-8 border-t border-stone-200/60">
            <p className="text-sm text-muted italic">
              These shaped how we think. Read them and decide for yourself.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
