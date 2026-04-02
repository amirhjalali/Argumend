import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | ARGUMEND",
    default: "Key Concepts",
  },
  description:
    "Understand the key concepts behind Argumend: steel-manning, cruxes, evidence weighting, confidence calibration, logical fallacies, and argument pillars.",
  alternates: {
    canonical: "https://argumend.org/concepts",
  },
  openGraph: {
    title: "Key Concepts | ARGUMEND",
    description:
      "Understand the key concepts behind Argumend: steel-manning, cruxes, evidence weighting, confidence calibration, logical fallacies, and argument pillars.",
    url: "https://argumend.org/concepts",
    type: "website",
    siteName: "ARGUMEND",
    images: [
      {
        url: `https://argumend.org/api/og?title=${encodeURIComponent("Key Concepts")}&subtitle=${encodeURIComponent("The framework behind structured argumentation")}`,
        width: 1200,
        height: 630,
        alt: "Key Concepts on Argumend",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Key Concepts | ARGUMEND",
    description:
      "Understand the key concepts behind Argumend: steel-manning, cruxes, evidence weighting, confidence calibration, logical fallacies, and argument pillars.",
    images: [`https://argumend.org/api/og?title=${encodeURIComponent("Key Concepts")}&subtitle=${encodeURIComponent("The framework behind structured argumentation")}`],
  },
};

export default function ConceptsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
