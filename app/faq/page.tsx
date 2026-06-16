import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { faqs } from "@/data/faqs";

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <AppShell>
      <JsonLd data={faqJsonLd} />
      <div className="mx-auto max-w-3xl px-4 md:px-8 py-6 md:py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "FAQ" },
          ]}
        />

        {/* Hero */}
        <div className="mb-10 md:mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary mb-4 leading-[1.08]">
            Frequently asked questions
          </h1>
          <p className="text-lg text-secondary leading-relaxed max-w-2xl">
            The questions people actually ask us, answered honestly.
          </p>
          <p className="mt-4 text-sm font-medium text-muted">
            {faqs.length} questions · tap any to expand
          </p>
        </div>

        {/* Accordion — native <details> keeps answers in the DOM (crawlable) and needs no client JS */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details
              key={index}
              open={index === 0}
              className="group rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]/70 transition-colors open:bg-[var(--bg-card)] open:shadow-[var(--shadow-card)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
                <h2 className="font-serif text-lg text-primary leading-snug">
                  {faq.question}
                </h2>
                <svg
                  className="h-5 w-5 flex-shrink-0 text-stone-400 transition-transform duration-200 group-open:rotate-180"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 8l4 4 4-4" />
                </svg>
              </summary>
              <div className="px-5 pb-5 -mt-1">
                <p className="text-[var(--text-paragraph)] leading-relaxed">
                  {faq.answer}
                </p>
                {faq.linkHref && faq.linkText && (
                  <Link
                    href={faq.linkHref}
                    className="inline-block mt-3 text-sm font-medium text-deep hover:text-deep-dark hover:underline transition-colors"
                  >
                    {faq.linkText} &rarr;
                  </Link>
                )}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border-default)]">
          <p className="text-sm text-secondary">
            Still have questions? We probably missed something. Head to the{" "}
            <a href="/community" className="text-deep hover:underline">Community page</a> and let us know.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
