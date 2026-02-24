import { AppShell } from "@/components/AppShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { faqs } from "@/data/faqs";

export default function FAQPage() {
  return (
    <AppShell>
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
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-stone-200">
          <p className="text-sm text-secondary">
            Still have questions? We probably missed something. Head to the{" "}
            <a href="/community" className="text-deep hover:underline">Community page</a> and let us know.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
