import { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Methodology — How We Score Arguments",
  description:
    "How Argumend scores arguments: 4-dimension evidence weighting, steel-manning, and calibrated confidence. Transparent, auditable methodology for argument analysis.",
  keywords: ["argument scoring methodology", "evidence weighting", "confidence scores", "argument analysis method"],
  openGraph: {
    title: "Methodology — How Argumend Scores Arguments",
    description: "4-dimension evidence weighting, steel-manning, and calibrated confidence. Transparent and auditable.",
    url: "https://argumend.org/methodology",
  },
  twitter: {
    card: "summary_large_image",
    title: "How Argumend Scores Arguments",
    description: "Transparent methodology: 4-dimension evidence weighting and calibrated confidence scores.",
  },
  alternates: {
    canonical: "https://argumend.org/methodology",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "ARGUMEND Methodology",
          description:
            "Multi-judge AI council, 4-dimension evidence weighting, steel-manning, and calibrated confidence scoring.",
          publisher: {
            "@type": "Organization",
            name: "ARGUMEND",
            url: "https://argumend.org",
          },
        }}
      />
    </>
  );
}
