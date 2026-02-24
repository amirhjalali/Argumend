import { Metadata } from "next";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about ARGUMEND: how confidence scores work, what cruxes are, how topics are chosen, and how structured argument mapping differs from traditional debate.",
  alternates: {
    canonical: "https://argumend.org/faq",
  },
};

// Generate FAQPage schema dynamically from the shared faqs data
// so it always stays in sync with the rendered page content.
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
    </>
  );
}
