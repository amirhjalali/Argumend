import { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Our Methodology",
  description:
    "How Argumend scores arguments: 4-dimension evidence weighting, steel-manning, and calibrated confidence. Transparent, auditable methodology.",
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
