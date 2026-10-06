import { Metadata } from "next";
import { DEFAULT_SOCIAL_IMAGE, DEFAULT_SOCIAL_IMAGE_URL } from "@/lib/og";
import { faqs } from "@/data/faqs";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "FAQ — Common questions",
  description:
    "Common questions about Argumend: what a crux is, why a map never says who is right, how evidence is weighed, what the paste tool does with your text, and how maps are kept up to date.",
  keywords: ["Argumend FAQ", "argument mapping FAQ", "what is a crux", "how evidence is weighed"],
  openGraph: {
    title: "FAQ — Common questions about Argumend",
    description: "What a crux is, why a map never says who is right, how evidence is weighed, and what happens to the text you paste.",
    url: "https://argumend.org/faq",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ — Common questions about Argumend",
    description: "What is a crux? Why doesn’t Argumend say who is right? How is evidence weighed?",
    images: [DEFAULT_SOCIAL_IMAGE_URL],
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
  name: "Common questions",
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
