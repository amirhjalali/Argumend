"use client";

import Link from "next/link";
import { ExternalLink, BookOpen } from "lucide-react";
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
      <div className="mx-auto max-w-3xl px-4 md:px-8 py-6 md:py-12">
        <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#3d3a36] mb-4">
          Library
        </h1>
        <p className="text-lg text-[#6a5f56] mb-10">
          Resources for deeper exploration of the topics and methodology.
        </p>

        <section className="mb-10">
          <h2 className="font-serif text-2xl text-[#3d3a36] mb-5">
            Topics Overview
          </h2>
          <div className="bg-white/80 rounded-xl border border-[#e8e0d4] overflow-hidden">
            <table className="w-full">
              <thead className="bg-gradient-to-b from-[#f8f5f0] to-[#f4f1eb]">
                <tr>
                  <th className="text-left px-5 py-3 text-sm font-semibold text-[#3d3a36]">Topic</th>
                  <th className="text-left px-5 py-3 text-sm font-semibold text-[#3d3a36] hidden sm:table-cell">Pillars</th>
                  <th className="text-right px-5 py-3 text-sm font-semibold text-[#3d3a36]">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e0d4]">
                {topics.map((topic) => (
                  <tr key={topic.id} className="hover:bg-[#faf7f2] transition-colors">
                    <td className="px-5 py-3 text-sm md:text-base">
                      <Link href={`/?topic=${topic.id}`} className="font-medium text-[#3d3a36] hover:text-[#4f7b77] transition-colors">
                        {topic.title}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-sm md:text-base text-[#6a5f56] hidden sm:table-cell">
                      {topic.pillars.map(p => p.title).join(", ")}
                    </td>
                    <td className="px-5 py-3 text-right font-mono text-sm md:text-base text-[#3d3a36]">
                      {topic.confidence_score}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[#3d3a36] mb-5">
            Recommended Reading
          </h2>
          <div className="space-y-6">
            {externalResources.map((category) => (
              <div key={category.category}>
                <h3 className="font-serif text-lg text-[#3d3a36] mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#4f7b77]" strokeWidth={1.8} />
                  {category.category}
                </h3>
                <div className="space-y-2">
                  {category.resources.map((resource) => (
                    <a
                      key={resource.title}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between bg-white/80 rounded-lg px-4 py-3 border border-[#e8e0d4] hover:border-[#d4cec4] hover:shadow-sm transition-all"
                    >
                      <div>
                        <h4 className="font-medium text-[#3d3a36] group-hover:text-[#4f7b77] transition-colors">{resource.title}</h4>
                        <p className="text-sm text-[#6a5f56]">{resource.description}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-[#9a918a] group-hover:text-[#4f7b77] transition-colors flex-shrink-0 ml-4" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 pt-8 border-t border-stone-200">
          <p className="text-sm text-[#6a5f56]">
            These resources inform our methodology. We encourage independent verification.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
