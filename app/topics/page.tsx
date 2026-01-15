import Link from "next/link";
import { ArrowLeft, CheckCircle, AlertCircle, HelpCircle } from "lucide-react";
import { topics } from "@/data/topics";

const statusIcons = {
  settled: CheckCircle,
  contested: AlertCircle,
  highly_speculative: HelpCircle,
};

const statusColors = {
  settled: "text-green-700 bg-green-50",
  contested: "text-amber-700 bg-amber-50",
  highly_speculative: "text-purple-700 bg-purple-50",
};

export default function TopicsPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-sm text-[#6a5f56] hover:text-[#3d3a36] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Canvas
        </Link>

        <h1 className="font-serif text-4xl tracking-tight text-[#3d3a36] mb-4">
          All Topics
        </h1>
        <p className="text-lg text-[#6a5f56] mb-12">
          Explore our collection of structured debates on contested and settled questions.
        </p>

        <div className="space-y-6">
          {topics.map((topic) => {
            const StatusIcon = statusIcons[topic.status];
            const statusColor = statusColors[topic.status];

            return (
              <Link
                key={topic.id}
                href={`/?topic=${topic.id}`}
                className="block bg-white rounded-lg p-6 shadow-sm border border-stone-200 hover:shadow-md hover:border-stone-300 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="font-serif text-2xl text-[#3d3a36] mb-2">
                      {topic.title}
                    </h2>
                    <p className="text-[#4e473f] mb-4">
                      {topic.meta_claim}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${statusColor}`}>
                        <StatusIcon className="h-3.5 w-3.5" />
                        {topic.status.replace("_", " ")}
                      </span>
                      <span className="text-[#6a5f56]">
                        {topic.pillars.length} pillars
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-serif text-[#3d3a36]">
                      {topic.confidence_score}%
                    </div>
                    <div className="text-xs text-[#6a5f56] uppercase tracking-wide">
                      confidence
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-stone-300">
          <p className="text-sm text-[#6a5f56]">
            {topics.length} topics available. Click any topic to explore its logical structure.
          </p>
        </div>
      </div>
    </div>
  );
}
