"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, BookOpen, CheckCircle2, ExternalLink } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { guides, getGuideById } from "@/data/guides";
import { notFound } from "next/navigation";

export default function GuidePage() {
  const params = useParams();
  const guide = getGuideById(params.id as string);

  if (!guide) {
    notFound();
  }

  const Icon = guide.icon;

  return (
    <AppShell>
      <article className="mx-auto max-w-3xl px-6 md:px-8 py-10 md:py-14">
        {/* Back link */}
        <Link
          href="/guides"
          className="inline-flex items-center gap-2 text-sm text-[#6a5f56] hover:text-[#4f7b77] transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          All Guides
        </Link>

        {/* Header */}
        <header className="mb-10 pb-8 border-b border-stone-200">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${guide.color}15` }}
            >
              <Icon
                className="h-6 w-6"
                style={{ color: guide.color }}
                strokeWidth={1.5}
              />
            </div>
            <div className="flex items-center gap-3 text-sm text-stone-400">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {guide.readTime}
              </span>
              <span className="w-1 h-1 rounded-full bg-stone-300" />
              <span>Foundational Guide</span>
            </div>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] tracking-tight text-[#3d3a36] mb-3 leading-[1.1]">
            {guide.title}
          </h1>
          <p className="text-xl md:text-2xl text-[#6a5f56] font-serif leading-relaxed">
            {guide.subtitle}
          </p>
        </header>

        {/* Main Content */}
        <div className="prose-stone">
          {guide.sections.map((section, sectionIdx) => (
            <section key={sectionIdx} className="mb-10">
              <h2 className="font-serif text-2xl text-[#3d3a36] mb-4 leading-tight">
                {section.title}
              </h2>

              {/* Main section content */}
              <div className="text-[#4e473f] leading-[1.8] whitespace-pre-line text-[15px] mb-6">
                {section.content}
              </div>

              {/* Subsections */}
              {section.subsections && (
                <div className="space-y-6 ml-0 md:ml-4">
                  {section.subsections.map((subsection, subIdx) => (
                    <div
                      key={subIdx}
                      className="pl-5 border-l-2 border-stone-200"
                    >
                      <h3 className="font-serif text-lg text-[#3d3a36] mb-2 font-medium">
                        {subsection.title}
                      </h3>
                      <div className="text-[#4e473f] leading-[1.75] whitespace-pre-line text-[15px]">
                        {subsection.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Key Takeaways */}
        <section className="my-12 bg-gradient-to-br from-[#faf8f3] to-[#f5f2eb] rounded-xl p-6 md:p-8 border border-[#e8e0d4]">
          <h2 className="font-serif text-xl text-[#3d3a36] mb-5 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-[#4f7b77]" />
            Key Takeaways
          </h2>
          <ul className="space-y-3">
            {guide.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: guide.color }}
                />
                <span className="text-[#4e473f] leading-relaxed text-[15px]">
                  {takeaway}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Further Reading */}
        <section className="my-12">
          <h2 className="font-serif text-xl text-[#3d3a36] mb-5 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#6a5f56]" />
            Further Reading
          </h2>
          <div className="space-y-2">
            {guide.furtherReading.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-white/60 border border-stone-200/60"
              >
                <div>
                  <span className="font-medium text-[#3d3a36]">{item.title}</span>
                  <span className="text-stone-400 mx-2">by</span>
                  <span className="text-[#6a5f56]">{item.author}</span>
                </div>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4f7b77] hover:text-[#3d6b67] transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <nav className="mt-12 pt-8 border-t border-stone-200">
          <p className="text-sm text-stone-400 mb-4">Continue learning</p>
          <div className="grid md:grid-cols-2 gap-3">
            {guides
              .filter((g) => g.id !== guide.id)
              .map((otherGuide) => {
                const OtherIcon = otherGuide.icon;
                return (
                  <Link
                    key={otherGuide.id}
                    href={`/guides/${otherGuide.id}`}
                    className="group flex items-center gap-3 p-4 rounded-lg bg-white/60 border border-stone-200/60 hover:border-stone-300 hover:shadow-sm transition-all"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${otherGuide.color}15` }}
                    >
                      <OtherIcon
                        className="h-5 w-5"
                        style={{ color: otherGuide.color }}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#3d3a36] group-hover:text-[#4f7b77] transition-colors truncate">
                        {otherGuide.title}
                      </p>
                      <p className="text-xs text-stone-400 truncate">
                        {otherGuide.subtitle}
                      </p>
                    </div>
                  </Link>
                );
              })}
          </div>
        </nav>
      </article>
    </AppShell>
  );
}
