"use client";

import Link from "next/link";
import {
  Shield,
  Target,
  Scale,
  Lightbulb,
  AlertTriangle,
  Layers,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { concepts } from "@/data/concepts";

// ---------------------------------------------------------------------------
// Icon map -- lucide-react icons by name
// ---------------------------------------------------------------------------
const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement> & { strokeWidth?: number }>> = {
  Shield,
  Target,
  Scale,
  Lightbulb,
  AlertTriangle,
  Layers,
};

export default function ConceptsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 md:px-8 py-6 md:py-12">
        <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl tracking-tight text-primary mb-4">
          Key Concepts
        </h1>
        <p className="text-lg text-secondary mb-10">
          Understanding the framework behind structured argumentation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {concepts.map((concept, index) => {
            const Icon = iconMap[concept.iconName] ?? BookOpen;
            const firstParagraph = concept.description.split("\n\n")[0] ?? "";
            const snippet =
              firstParagraph.length > 180
                ? firstParagraph.slice(0, 180) + "..."
                : firstParagraph;

            return (
              <Link
                key={concept.id}
                href={`/concepts/${concept.id}`}
                className="group bg-white/80 rounded-xl p-6 border border-stone-200/60 hover:border-[#4f7b77]/30 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 animate-card-fade-in"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3.5 bg-gradient-to-br from-[#f5f1ea] to-[#ebe6de] rounded-xl border border-[#e8e0d4] shadow-sm">
                    <Icon className="h-6 w-6 text-deep" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-serif text-xl text-primary mb-1 group-hover:text-deep transition-colors">
                      {concept.title}
                    </h2>
                    <p className="text-primary leading-relaxed text-sm mb-3">
                      {snippet}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-deep text-sm font-medium">
                        Learn more
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                      {concept.topicExamples.length > 0 && (
                        <span className="text-[11px] text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
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

        <div className="mt-10 bg-white/80 rounded-xl p-6 border border-[#e8e0d4]">
          <h2 className="font-serif text-xl text-primary mb-3">
            The Methodology
          </h2>
          <p className="text-primary leading-relaxed mb-4">
            Our approach draws from several traditions:
          </p>
          <ul className="space-y-2 text-primary">
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

        <div className="mt-12 pt-8 border-t border-stone-200">
          <p className="text-sm text-secondary">
            These concepts form the backbone of productive disagreement.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
