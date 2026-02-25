import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { articles } from "@/data/blog";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  return (
    <AppShell>
      <div className="min-h-screen">
        {/* Hero */}
        <div className="bg-[#faf8f5]/60 border-b border-[#e8e0d4]">
          <div className="mx-auto max-w-4xl px-4 md:px-8 py-10 md:py-16">
            <p className="text-xs font-medium uppercase tracking-widest text-stone-400 mb-4">
              Insights &amp; Analysis
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary mb-6 leading-[1.08]">
              The Argumend Blog
            </h1>
            <p className="text-lg text-secondary leading-relaxed max-w-2xl">
              Essays on critical thinking, structured reasoning, and the art of
              productive disagreement. Written to help you think more clearly
              about the topics that matter most.
            </p>
          </div>
        </div>

        {/* Article Grid */}
        <div className="mx-auto max-w-4xl px-4 md:px-8 py-8 md:py-12">
          {/* Featured Article (first) */}
          {articles.length > 0 && (
            <Link
              key={articles[0].slug}
              href={`/blog/${articles[0].slug}`}
              className="group block mb-6 md:mb-8 animate-card-fade-in"
              style={{ animationDelay: "0ms" }}
            >
              <article className="relative bg-[#faf8f5] rounded-xl p-6 md:p-10 border border-stone-200/60 shadow-card hover:border-[#c8c0b4] hover:shadow-lw-hover hover:-translate-y-0.5 transition-all duration-200">
                {/* Category Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center rounded-full bg-deep/10 px-3 py-1 text-xs font-medium text-deep">
                    {articles[0].category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-stone-400">
                    <Calendar className="h-3 w-3" />
                    {formatDate(articles[0].publishedAt)}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-stone-400">
                    <Clock className="h-3 w-3" />
                    {articles[0].readingTime}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-serif text-2xl md:text-3xl tracking-tight text-primary group-hover:text-deep transition-colors mb-3 leading-tight">
                  {articles[0].title}
                </h2>

                {/* Description */}
                <p className="text-secondary leading-relaxed mb-5 max-w-2xl">
                  {articles[0].description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  {articles[0].tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-2 py-0.5 text-[11px] text-stone-500"
                    >
                      <Tag className="h-2.5 w-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More */}
                <div className="flex items-center gap-2 text-sm font-medium text-deep group-hover:text-deep-dark transition-colors">
                  <span>Read article</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </article>
            </Link>
          )}

          {/* Remaining Articles in 2-column grid */}
          {articles.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.slice(1).map((article, index) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group block animate-card-fade-in"
                  style={{ animationDelay: `${(index + 1) * 60}ms` }}
                >
                  <article className="relative h-full bg-[#faf8f5] rounded-xl p-6 md:p-8 border border-stone-200/60 shadow-card hover:border-[#c8c0b4] hover:shadow-lw-hover hover:-translate-y-0.5 transition-all duration-200">
                    {/* Category Badge */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center rounded-full bg-deep/10 px-3 py-1 text-xs font-medium text-deep">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-stone-400">
                        <Calendar className="h-3 w-3" />
                        {formatDate(article.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-stone-400">
                        <Clock className="h-3 w-3" />
                        {article.readingTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-serif text-xl md:text-2xl tracking-tight text-primary group-hover:text-deep transition-colors mb-3 leading-tight">
                      {article.title}
                    </h2>

                    {/* Description */}
                    <p className="text-secondary leading-relaxed mb-5 max-w-2xl">
                      {article.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-5">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-2 py-0.5 text-[11px] text-stone-500"
                        >
                          <Tag className="h-2.5 w-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-sm font-medium text-deep group-hover:text-deep-dark transition-colors">
                      <span>Read article</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="mt-12">
            <NewsletterSignup />
          </div>

          {/* Footer note */}
          <div className="mt-12 pt-8 border-t border-stone-200/60">
            <p className="text-sm text-secondary">
              All articles are written by the Argumend team and reviewed for
              accuracy. We practice what we preach—every claim is backed by
              evidence, and we welcome corrections.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
