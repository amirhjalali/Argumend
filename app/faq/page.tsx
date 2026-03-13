import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { faqs } from "@/data/faqs";

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: "Frequently Asked Questions",
    description: "The questions people actually ask us about Argumend, answered honestly.",
    url: "https://argumend.org/faq",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <AppShell>
      <JsonLd data={faqJsonLd} />
      <div className="mx-auto max-w-3xl px-4 md:px-8 py-6 md:py-12">
        {/* Breadcrumb with BreadcrumbList JSON-LD */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "FAQ" },
          ]}
        />

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary mb-6 leading-[1.08]">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-secondary leading-relaxed max-w-2xl mb-10">
          The questions people actually ask us, answered honestly.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/80 rounded-xl p-5 border border-[#e8e0d4]"
            >
              <h2 className="font-serif text-lg text-primary mb-2">
                {faq.question}
              </h2>
              <p className="text-primary leading-relaxed">
                {faq.answer}
              </p>
              {faq.linkHref && faq.linkText && (
                <Link
                  href={faq.linkHref}
                  className="inline-block mt-2 text-sm font-medium text-deep hover:text-deep-dark hover:underline transition-colors"
                >
                  {faq.linkText} &rarr;
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-stone-200/60">
          <p className="text-sm text-secondary">
            Still have questions? We probably missed something. Head to the{" "}
            <a href="/community" className="text-deep hover:underline">Community page</a> and let us know.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
