import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock,
  CheckCircle2,
  GraduationCap,
  ListOrdered,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { guides } from "@/data/guides";

/* ────────────────────────────────────────────────────────────────────────────
   Recommended reading order
   ──────────────────────────────────────────────────────────────────────────── */
const readingOrder = [
  {
    id: "how-to-read-an-argument-map",
    label: "Start here",
    why: "Foundations -- learn to navigate argument maps",
  },
  {
    id: "evidence-hierarchy",
    label: "Then",
    why: "Understand how to rank different types of proof",
  },
  {
    id: "triangulation",
    label: "Then",
    why: "Cross-reference sources for higher confidence",
  },
  {
    id: "evaluating-source-credibility",
    label: "Then",
    why: "Assess whether a source deserves your trust",
  },
  {
    id: "understanding-bias",
    label: "Advanced",
    why: "Recognize cognitive and structural biases",
  },
  {
    id: "running-your-first-analysis",
    label: "Advanced",
    why: "Put it all together with AI-assisted analysis",
  },
];

export default function GuidesPage() {
  /* ── JSON-LD structured data ─────────────────────────────────────────── */
  const guidesJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Critical Thinking Guides",
    description:
      "Six in-depth guides on critical thinking: triangulation, bias recognition, evidence hierarchy, argument mapping, source credibility, and AI analysis.",
    url: "https://argumend.org/guides",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: guides.length,
      itemListElement: guides.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: guide.title,
        description: guide.description,
        url: `https://argumend.org/guides/${guide.id}`,
      })),
    },
  };

  return (
    <AppShell>
      <JsonLd data={guidesJsonLd} />

      <div className="mx-auto max-w-5xl px-4 md:px-8 py-6 md:py-12">
        {/* ═══════════════════════════════════════════════════════════════
            HERO SECTION
            ═══════════════════════════════════════════════════════════════ */}
        <div className="mb-14">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Guides" },
            ]}
          />

          <p className="text-xs font-medium uppercase tracking-widest text-muted mb-4">
            Foundational Guides
          </p>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary mb-6 leading-[1.08]">
            Critical Thinking Guides
          </h1>

          <p className="text-lg text-secondary leading-relaxed max-w-2xl mb-3">
            Build the reasoning skills to evaluate any claim. These{" "}
            {guides.length} guides cover the foundations of evidence-based
            thinking -- from reading argument maps to recognizing bias.
          </p>

          <p className="text-sm text-muted">
            {guides.length} guides &middot; Approx. 75 min total reading time
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            GUIDE CARDS GRID
            ═══════════════════════════════════════════════════════════════ */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-20">
          {guides.map((guide, index) => {
            const Icon = guide.icon;
            const sectionCount = guide.sections.length;

            return (
              <Link
                key={guide.id}
                href={`/guides/${guide.id}`}
                className="group block animate-card-fade-in"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="relative h-full bg-white/80 dark:bg-[#252420]/80 rounded-xl p-6 border border-stone-200/60 dark:border-[var(--border-default)] shadow-card hover:shadow-lw-hover hover:-translate-y-1 transition-all duration-200 hover:border-deep-light/40 flex flex-col">
                  {/* Icon + badges row */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm transition-transform group-hover:scale-105"
                      style={{ backgroundColor: `${guide.color}15` }}
                    >
                      <Icon
                        className="h-6 w-6"
                        style={{ color: guide.color }}
                        strokeWidth={1.5}
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 bg-stone-100 dark:bg-[#302e2a] px-2 py-0.5 rounded-full text-xs text-stone-500 dark:text-stone-400">
                        <Clock className="h-3 w-3" />
                        {guide.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="font-serif text-xl text-primary group-hover:text-deep transition-colors mb-1">
                    {guide.title}
                  </h2>

                  {/* Subtitle */}
                  <p className="text-sm font-medium text-secondary mb-2">
                    {guide.subtitle}
                  </p>

                  {/* Description (clamp to 2 lines) */}
                  <p className="text-sm text-[#7a7269] dark:text-[var(--text-secondary)] leading-relaxed line-clamp-2 mb-4">
                    {guide.description}
                  </p>

                  {/* Section count */}
                  <p className="text-xs text-muted mb-4">
                    <BookOpen className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />
                    {sectionCount} sections
                  </p>

                  {/* Key takeaways preview */}
                  <div className="flex-1">
                    <ul className="space-y-1.5 mb-5">
                      {guide.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-[#7a7269] dark:text-[var(--text-secondary)] leading-snug"
                        >
                          <CheckCircle2
                            className="h-3.5 w-3.5 flex-shrink-0 mt-0.5"
                            style={{ color: guide.color }}
                          />
                          <span className="line-clamp-1">{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto flex items-center gap-2 text-sm font-medium text-deep group-hover:text-deep-dark transition-colors">
                    <span>Start reading</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            RECOMMENDED READING ORDER
            ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <ListOrdered className="h-6 w-6 text-deep" strokeWidth={1.5} />
            <h2 className="font-serif text-2xl sm:text-3xl text-primary">
              Recommended Reading Order
            </h2>
          </div>

          <p className="text-secondary leading-relaxed max-w-2xl mb-8">
            New to critical thinking? Follow this path from foundations to
            advanced skills. Each guide builds on the previous one.
          </p>

          <div className="relative">
            {/* Vertical timeline line */}
            <div
              className="absolute left-5 top-4 bottom-4 w-px hidden sm:block"
              style={{
                background:
                  "linear-gradient(to bottom, #4f7b77 0%, #4f7b7740 100%)",
              }}
            />

            <ol className="space-y-4">
              {readingOrder.map((step, idx) => {
                const guide = guides.find((g) => g.id === step.id);
                if (!guide) return null;
                const Icon = guide.icon;
                const isStart = idx === 0;
                const isAdvanced = step.label === "Advanced";

                return (
                  <li key={step.id}>
                    <Link
                      href={`/guides/${step.id}`}
                      className="group flex items-start gap-4 sm:gap-5 animate-card-fade-in"
                      style={{ animationDelay: `${idx * 80}ms` }}
                    >
                      {/* Step number */}
                      <div
                        className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold transition-transform group-hover:scale-110 ${
                          isStart
                            ? "bg-deep text-white shadow-md"
                            : isAdvanced
                              ? "bg-rust-100 text-rust-700 border border-rust-200"
                              : "bg-deep/10 text-deep border border-deep/20"
                        }`}
                      >
                        {idx + 1}
                      </div>

                      {/* Card */}
                      <div className="flex-1 bg-white/80 dark:bg-[#252420]/80 rounded-xl p-4 sm:p-5 border border-stone-200/60 dark:border-[var(--border-default)] shadow-card group-hover:shadow-lw-hover group-hover:-translate-y-0.5 group-hover:border-deep-light/40 transition-all duration-200">
                        <div className="flex items-start gap-3">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${guide.color}12` }}
                          >
                            <Icon
                              className="h-4.5 w-4.5"
                              style={{ color: guide.color }}
                              strokeWidth={1.5}
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-0.5">
                              <span
                                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                  isStart
                                    ? "bg-deep/10 text-deep"
                                    : isAdvanced
                                      ? "bg-rust-50 text-rust-600"
                                      : "bg-stone-100 dark:bg-[#302e2a] text-stone-500 dark:text-stone-400"
                                }`}
                              >
                                {step.label}
                              </span>
                              <span className="text-xs text-muted">
                                {guide.readTime}
                              </span>
                            </div>

                            <h3 className="font-serif text-lg text-primary group-hover:text-deep transition-colors">
                              {guide.title}
                            </h3>

                            <p className="text-sm text-[#7a7269] dark:text-[var(--text-secondary)] mt-0.5">
                              {step.why}
                            </p>
                          </div>

                          <ArrowRight className="h-4 w-4 text-stone-300 dark:text-stone-500 group-hover:text-deep group-hover:translate-x-0.5 flex-shrink-0 mt-1 transition-all duration-200" />
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            FOR EDUCATORS CTA
            ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-16">
          <Link href="/for-educators" className="group block">
            <div className="relative overflow-hidden rounded-xl border border-stone-200/60 dark:border-[var(--border-default)] bg-gradient-to-br from-[#faf8f3] to-[#f5f2eb] dark:from-[#252420] dark:to-[#302e2a] p-8 sm:p-10 shadow-card hover:shadow-lw-hover hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="w-14 h-14 rounded-xl bg-deep/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap
                    className="h-7 w-7 text-deep"
                    strokeWidth={1.5}
                  />
                </div>

                <div className="flex-1">
                  <h2 className="font-serif text-xl sm:text-2xl text-primary group-hover:text-deep transition-colors mb-2">
                    For Educators
                  </h2>
                  <p className="text-secondary leading-relaxed max-w-xl">
                    Bring these critical thinking foundations into your
                    classroom. Access ready-made lesson plans, worksheets, and
                    cross-curricular activities for IB, AP, and A-Level courses.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-deep group-hover:text-deep-dark transition-colors whitespace-nowrap mt-2 sm:mt-0">
                  <span>View lesson plans</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            PHILOSOPHY / WHY THESE MATTER
            ═══════════════════════════════════════════════════════════════ */}
        <div className="bg-gradient-to-br from-[#faf8f3] to-[#f5f2eb] dark:from-[#252420] dark:to-[#302e2a] rounded-xl p-6 border border-[#e8e0d4] dark:border-[var(--border-default)]">
          <h3 className="font-serif text-lg text-primary mb-2">
            Why These Foundations Matter
          </h3>
          <p className="text-primary leading-relaxed mb-4">
            Most disagreements aren&apos;t resolved because people argue about
            conclusions before agreeing on methods. These guides provide common
            ground -- shared principles for evaluating evidence that make
            productive disagreement possible.
          </p>
          <p className="text-primary leading-relaxed">
            Master these foundations, and you&apos;ll be equipped to evaluate any
            claim on any topic. You&apos;ll know what questions to ask, what
            evidence to seek, and how to update your beliefs appropriately.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            FOOTER
            ═══════════════════════════════════════════════════════════════ */}
        <div className="mt-12 pt-8 border-t border-stone-200/60 dark:border-[var(--border-default)]">
          <p className="text-sm text-secondary">
            These guides synthesize research from epistemology, cognitive
            science, and the philosophy of science. Sources are provided in each
            guide.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
