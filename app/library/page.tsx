import Link from "next/link";
import { ArrowLeft, ExternalLink, BookOpen } from "lucide-react";
import { topics } from "@/data/topics";

// Collect all unique references from topics
const allReferences = topics.flatMap((topic) =>
  topic.pillars.flatMap((pillar) => ({
    topic: topic.title,
    pillar: pillar.title,
    crux: pillar.crux.title,
  }))
);

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
    <div className="min-h-screen bg-[#f5f0e8]">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-sm text-[#6a5f56] hover:text-[#3d3a36] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Canvas
        </Link>

        <h1 className="font-serif text-4xl tracking-tight text-[#3d3a36] mb-4">
          Library
        </h1>
        <p className="text-lg text-[#6a5f56] mb-12">
          Resources for deeper exploration of the topics and methodology.
        </p>

        <section className="mb-12">
          <h2 className="font-serif text-2xl text-[#3d3a36] mb-6">
            Topics Overview
          </h2>
          <div className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#f5f0e8]">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-[#3d3a36]">Topic</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-[#3d3a36]">Pillars</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-[#3d3a36]">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {topics.map((topic) => (
                  <tr key={topic.id} className="hover:bg-stone-50">
                    <td className="px-4 py-3">
                      <Link href={`/?topic=${topic.id}`} className="font-medium text-[#3d3a36] hover:text-primary">
                        {topic.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#6a5f56]">
                      {topic.pillars.map(p => p.title).join(", ")}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-sm text-[#3d3a36]">
                      {topic.confidence_score}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[#3d3a36] mb-6">
            Recommended Reading
          </h2>
          <div className="space-y-8">
            {externalResources.map((category) => (
              <div key={category.category}>
                <h3 className="font-serif text-lg text-[#3d3a36] mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.resources.map((resource) => (
                    <a
                      key={resource.title}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-white rounded-lg p-4 shadow-sm border border-stone-200 hover:shadow-md hover:border-stone-300 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-[#3d3a36]">{resource.title}</h4>
                          <p className="text-sm text-[#6a5f56]">{resource.description}</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-[#6a5f56]" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 pt-8 border-t border-stone-300">
          <p className="text-sm text-[#6a5f56]">
            These resources inform our methodology. We encourage independent verification.
          </p>
        </div>
      </div>
    </div>
  );
}
