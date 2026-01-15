"use client";

import Link from "next/link";
import { CheckCircle, AlertCircle, HelpCircle } from "lucide-react";
import { topics } from "@/data/topics";
import { AppShell } from "@/components/AppShell";

const statusIcons = {
  settled: CheckCircle,
  contested: AlertCircle,
  highly_speculative: HelpCircle,
};

const statusColors = {
  settled: "text-green-700 bg-green-50 border-green-200",
  contested: "text-amber-700 bg-amber-50 border-amber-200",
  highly_speculative: "text-purple-700 bg-purple-50 border-purple-200",
};

export default function TopicsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-8 py-12">
        <h1 className="font-serif text-4xl tracking-tight text-[#3d3a36] mb-4">
          All Topics
        </h1>
        <p className="text-lg text-[#6a5f56] mb-10">
          Explore our collection of structured debates on contested and settled questions.
        </p>

        <div className="space-y-4">
          {topics.map((topic) => {
            const StatusIcon = statusIcons[topic.status];
            const statusColor = statusColors[topic.status];

            return (
              <Link
                key={topic.id}
                href={`/?topic=${topic.id}`}
                className="group block bg-white/80 rounded-xl p-6 border border-[#e8e0d4] hover:border-[#d4cec4] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.08)] transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="font-serif text-2xl text-[#3d3a36] mb-2 group-hover:text-[#4f7b77] transition-colors">
                      {topic.title}
                    </h2>
                    <p className="text-[#4e473f] mb-4 leading-relaxed">
                      {topic.meta_claim}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${statusColor}`}>
                        <StatusIcon className="h-3.5 w-3.5" />
                        <span className="capitalize">{topic.status.replace("_", " ")}</span>
                      </span>
                      <span className="text-[#6a5f56]">
                        {topic.pillars.length} pillars
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-3xl font-serif text-[#3d3a36]">
                      {topic.confidence_score}%
                    </div>
                    <div className="text-[10px] text-[#9a918a] uppercase tracking-[0.15em]">
                      confidence
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-stone-200">
          <p className="text-sm text-[#6a5f56]">
            {topics.length} topics available. Click any topic to explore its logical structure.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
