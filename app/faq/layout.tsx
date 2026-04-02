import { Metadata } from "next";
import { faqs } from "@/data/faqs";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions About Argument Mapping",
  description:
    "Common questions about Argumend: how confidence scores work, what cruxes are, what steel-manning means, logical fallacies in debates, and how argument mapping differs from debate forums.",
  keywords: ["argument mapping FAQ", "what is a crux", "what is steel manning", "critical thinking FAQ", "logical fallacies"],
  openGraph: {
    title: "FAQ — Frequently Asked Questions",
    description: "Everything you want to know about argument mapping, cruxes, confidence scores, and critical thinking.",
    url: "https://argumend.org/faq",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ — Argument Mapping Questions Answered",
    description: "What is a crux? What is steel-manning? How do confidence scores work?",
  },
  alternates: {
    canonical: "https://argumend.org/faq",
  },
};

// Generate FAQPage schema dynamically from the shared faqs data
// so it always stays in sync with the rendered page content.
const faqStructuredData = {
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd data={faqStructuredData} />
    </>
  );
}
