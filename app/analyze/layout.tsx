import { Metadata } from "next";
import { DEFAULT_SOCIAL_IMAGE, DEFAULT_SOCIAL_IMAGE_URL } from "@/lib/og";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Analyze Arguments — Structured Argument Analysis Tool",
  description:
    "Paste any debate, article, or transcript. Argumend extracts positions, finds cruxes, and assesses argument quality with transparent programmatic analysis by default.",
  keywords: ["argument analysis tool", "AI debate analysis", "logical fallacy detector", "argument quality score", "crux finder"],
  openGraph: {
    title: "Analyze Arguments — Structured Argument Analysis Tool",
    description: "Extract positions, find cruxes, and assess argument quality with transparent programmatic analysis by default.",
    url: "https://argumend.org/analyze",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Analyze Arguments — Free Argument Analysis Tool",
    description: "Paste any debate or article. Argumend finds the cruxes and assesses argument quality.",
    images: [DEFAULT_SOCIAL_IMAGE_URL],
  },
  alternates: {
    canonical: "https://argumend.org/analyze",
  },
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Analyze Arguments with Argumend",
  description:
    "Break down any article, transcript, or claim into structured positions, cruxes, and evidence assessments.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Paste your content",
      text: "Copy and paste any article, transcript, social media post, or claim you want to analyze.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Argumend extracts the argument structure",
      text: "Argumend identifies the central claim, supporting and opposing arguments, evidence, and logical structure. Programmatic analysis works without an AI provider.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Review the structured report",
      text: "Compare the extracted positions, supporting evidence, and key points of disagreement.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Evaluate the evidence",
      text: "Inspect argument-strength assessments, reasoning notes, and potential fallacies.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Review extraction confidence",
      text: "Use the extraction-confidence score to understand how clearly the source text’s argument structure could be identified. It is not a truth score.",
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={howToJsonLd} />
      {children}
    </>
  );
}
