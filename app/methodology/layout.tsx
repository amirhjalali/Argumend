import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Methodology",
  description:
    "How ARGUMEND scores arguments: multi-judge AI council, 4-dimension evidence weighting, steel-manning, and calibrated confidence. Transparent, auditable, and designed to eliminate single-model bias.",
  alternates: {
    canonical: "https://argumend.org/methodology",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />
    </>
  );
}
