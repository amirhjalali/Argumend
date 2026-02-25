import { Metadata } from "next";
import { faqs } from "@/data/faqs";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about Argumend: how confidence scores work, what cruxes are, how topics are chosen, and how argument mapping differs from debate.",
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
      <JsonLd data={faqStructuredData} />
    </>
  );
}
