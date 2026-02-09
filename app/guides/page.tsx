"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { guides } from "@/data/guides";

export default function GuidesPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 md:px-8 py-6 md:py-12">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[11px] font-medium text-stone-400 mb-3 tracking-wide uppercase">
            Foundational Guides
          </p>
          <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-tight text-[#3d3a36] mb-4 leading-[1.1]">
            The Art of Finding Truth
          </h1>
          <p className="text-lg text-[#6a5f56] leading-relaxed max-w-2xl">
            Before evaluating any specific topic, understand the foundations.
            These guides teach the core skills of critical thinking: how to
            triangulate sources, recognize bias, and weigh evidence.
          </p>
        </div>

        {/* Guide Cards */}
        <div className="space-y-4">
          {guides.map((guide) => {
            const Icon = guide.icon;
            return (
              <Link
                key={guide.id}
                href={`/guides/${guide.id}`}
                className="group block"
              >
                <div
                  className="relative bg-white/80 rounded-xl p-6 border border-[#e8e0d4] hover:border-[#d4cec4] hover:shadow-md transition-all duration-300"
                  style={{ borderLeftWidth: "4px", borderLeftColor: guide.color }}
                >
                  <div className="flex items-start gap-5">
                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105"
                      style={{ backgroundColor: `${guide.color}15` }}
                    >
                      <Icon
                        className="h-7 w-7"
                        style={{ color: guide.color }}
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h2 className="font-serif text-xl font-semibold text-[#3d3a36] group-hover:text-[#4f7b77] transition-colors">
                          {guide.title}
                        </h2>
                        <span className="flex items-center gap-1 text-xs text-stone-400">
                          <Clock className="h-3 w-3" />
                          {guide.readTime}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-[#6a5f56] mb-2">
                        {guide.subtitle}
                      </p>
                      <p className="text-sm text-[#7a7269] leading-relaxed">
                        {guide.description}
                      </p>

                      {/* Read link */}
                      <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[#4f7b77] group-hover:text-[#3d6b67] transition-colors">
                        <BookOpen className="h-4 w-4" />
                        <span>Read Guide</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Philosophy Box */}
        <div className="mt-12 bg-gradient-to-br from-[#faf8f3] to-[#f5f2eb] rounded-xl p-6 border border-[#e8e0d4]">
          <h3 className="font-serif text-lg text-[#3d3a36] mb-3">
            Why These Foundations Matter
          </h3>
          <p className="text-[#4e473f] leading-relaxed mb-4">
            Most disagreements aren't resolved because people argue about conclusions
            before agreeing on methods. These guides provide common ground—shared
            principles for evaluating evidence that make productive disagreement possible.
          </p>
          <p className="text-[#4e473f] leading-relaxed">
            Master these foundations, and you'll be equipped to evaluate any claim
            on any topic. You'll know what questions to ask, what evidence to seek,
            and how to update your beliefs appropriately.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-stone-200">
          <p className="text-sm text-[#6a5f56]">
            These guides synthesize research from epistemology, cognitive science,
            and the philosophy of science. Sources are provided in each guide.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
