import { Metadata } from "next";
import { DEFAULT_SOCIAL_IMAGE, DEFAULT_SOCIAL_IMAGE_URL } from "@/lib/og";

export const metadata: Metadata = {
  title: "Glossary — Critical Thinking & Argument Mapping Terms",
  description:
    "Definitions of 20+ key terms in critical thinking and argument mapping: steel-manning, crux, logical fallacies, confidence scores, Bayesian reasoning, evidence weighting, and more.",
  keywords: [
    "critical thinking glossary",
    "argument mapping terms",
    "logical fallacy definitions",
    "steel man definition",
    "crux definition",
    "debate terminology",
    "evidence weighting",
    "bayesian reasoning",
    "confirmation bias",
    "burden of proof",
  ],
  openGraph: {
    title: "Glossary — Critical Thinking & Argument Mapping Terms",
    description: "Clear definitions for steel-manning, cruxes, logical fallacies, confidence scores, and more.",
    url: "https://argumend.org/glossary",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Critical Thinking Glossary",
    description: "Steel-manning, cruxes, logical fallacies, and more — defined clearly.",
    images: [DEFAULT_SOCIAL_IMAGE_URL],
  },
  alternates: {
    canonical: "https://argumend.org/glossary",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
