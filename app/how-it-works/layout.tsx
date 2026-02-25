import { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "How Argumend turns complex debates into visual argument maps. Understand node types, confidence scores, and how to find the crux of any disagreement.",
  alternates: {
    canonical: "https://argumend.org/how-it-works",
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
          headline: "How ARGUMEND Works",
          description:
            "Learn how ARGUMEND transforms complex debates into visual argument maps with node types, confidence scores, and crux identification.",
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
