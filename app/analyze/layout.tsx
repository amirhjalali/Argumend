import { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Analyze Arguments — AI Argument Analysis Tool",
  description:
    "Paste any debate, article, or transcript. AI extracts positions, finds cruxes, and scores argument quality with a multi-judge council. Free and transparent analysis.",
  keywords: ["argument analysis tool", "AI debate analysis", "logical fallacy detector", "argument quality score", "crux finder"],
  openGraph: {
    title: "Analyze Arguments — AI Argument Analysis Tool",
    description: "AI extracts positions, finds cruxes, and scores argument quality with a multi-judge council. Free and transparent.",
    url: "https://argumend.org/analyze",
  },
  twitter: {
    card: "summary_large_image",
    title: "Analyze Arguments — Free AI Analysis Tool",
    description: "Paste any debate or article. AI finds the cruxes and scores argument quality.",
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
    "Use AI to break down any article, transcript, or claim into a structured argument map with evidence weighting and confidence scores.",
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
      name: "AI extracts the argument structure",
      text: "Our AI identifies the central claim, supporting and opposing arguments, evidence, and logical structure.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Review the argument map",
      text: "Explore the visual argument map showing pillars of disagreement, weighted evidence, and crux questions.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Evaluate the evidence",
      text: "See how each piece of evidence scores on reliability, independence, replicability, and directness.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Check the confidence score",
      text: "Get a quantified confidence score (0-100) showing how strongly the evidence supports or undermines the claim.",
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
