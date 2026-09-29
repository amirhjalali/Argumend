import { AppShell } from "@/components/AppShell";
import { PageContainer, PageHeader, TextAction } from "@/components/ui";
import { faqs } from "@/data/faqs";

/**
 * /faq renders whatever `data/faqs.ts` exports, in the story pages' editorial
 * style: a left header, then one hairline-ruled list of native <details>
 * rows. Answers stay in the DOM (crawlable, and the layout's FAQPage JSON-LD
 * reads the same array); no client JS. Every summary and link is at least
 * 44px tall.
 */
export default function FAQPage() {
  return (
    <AppShell layout="reading">
      <PageContainer width="reading">
        <PageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Questions" },
          ]}
          eyebrow="Questions"
          title="Questions people ask"
          lede="Short answers. The whole story, and the rules the site keeps, are on the About page."
          meta={`${faqs.length} questions. Open any one to read the answer.`}
          className="!mb-8"
        />

        <div className="divide-y divide-divider border-y border-divider">
          {faqs.map((faq, index) => (
            <details key={`${index}-${faq.question}`} open={index === 0} className="group">
              <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-4 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-deep/50 [&::-webkit-details-marker]:hidden">
                <h2 className="font-serif text-[1.25rem] leading-snug text-primary dark:text-stone-200">
                  {faq.question}
                </h2>
                <span
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 font-sans text-xl leading-none text-muted transition-transform group-open:rotate-90 motion-reduce:transition-none dark:text-stone-400"
                >
                  &rsaquo;
                </span>
              </summary>
              <div className="pb-5 pr-6">
                <p className="font-serif text-[1.0625rem] leading-[1.6] text-secondary dark:text-stone-400">
                  {faq.answer}
                </p>
                {faq.linkHref && faq.linkText ? (
                  <TextAction href={faq.linkHref} className="mt-1">
                    {faq.linkText}
                  </TextAction>
                ) : null}
              </div>
            </details>
          ))}
        </div>

        <p className="mt-8 font-serif text-[1.0625rem] leading-relaxed text-secondary dark:text-stone-400">
          Something missing, or wrong?
        </p>
        <TextAction href="/about#contribute">Tell us how to fix it</TextAction>
      </PageContainer>
    </AppShell>
  );
}
