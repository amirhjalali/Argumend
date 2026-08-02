import { Metadata } from "next";
import { DEFAULT_SOCIAL_IMAGE, DEFAULT_SOCIAL_IMAGE_URL } from "@/lib/og";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Methodology — How We Score Arguments",
  description:
    "How Argumend scores arguments: evidence weighting, steel-manning, and two-axis balance and weight. Transparent, auditable argument analysis.",
  keywords: ["argument scoring methodology", "evidence weighting", "balance of evidence", "argument analysis method"],
  openGraph: {
    title: "Methodology — How Argumend Scores Arguments",
    description: "Evidence weighting, steel-manning, and transparent two-axis balance and weight scoring.",
    url: "https://argumend.org/methodology",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "How Argumend Scores Arguments",
    description: "Transparent methodology: evidence weighting plus separate balance and weight scores.",
    images: [DEFAULT_SOCIAL_IMAGE_URL],
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
            "Multi-judge AI council, evidence weighting, steel-manning, and two-axis balance and weight scoring.",
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
