import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Argumend",
    default: "Key Concepts -- Argumend",
  },
  description:
    "Understand the key concepts behind Argumend: steel-manning, cruxes, evidence weighting, confidence calibration, logical fallacies, and argument pillars. The framework for structured argumentation and evidence-based reasoning.",
  alternates: {
    canonical: "https://argumend.org/concepts",
  },
  openGraph: {
    title: "Key Concepts -- Argumend",
    description:
      "Understand the key concepts behind Argumend: steel-manning, cruxes, evidence weighting, confidence calibration, logical fallacies, and argument pillars.",
    url: "https://argumend.org/concepts",
    type: "website",
    siteName: "Argumend",
  },
  twitter: {
    card: "summary_large_image",
    title: "Key Concepts -- Argumend",
    description:
      "Understand the key concepts behind Argumend: steel-manning, cruxes, evidence weighting, confidence calibration, logical fallacies, and argument pillars.",
  },
};

export default function ConceptsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
