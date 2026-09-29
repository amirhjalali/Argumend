import { Metadata } from "next";
import { DEFAULT_SOCIAL_IMAGE, DEFAULT_SOCIAL_IMAGE_URL } from "@/lib/og";
import { JsonLd } from "@/components/JsonLd";

const DESCRIPTION =
  "How Argumend maps are made: where positions and evidence come from, how each card is weighed on four measures and filed by what it shows, how cruxes are found and what would settle them, and how their movement is recorded.";

export const metadata: Metadata = {
  title: "How maps are made",
  description: DESCRIPTION,
  keywords: ["argument mapping method", "evidence weighting", "crux", "what would settle it", "crux ledger"],
  openGraph: {
    title: "How maps are made | ARGUMEND",
    description: DESCRIPTION,
    url: "https://argumend.org/methodology",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "How Argumend maps are made",
    description: "Four measures per card, filed by what it shows, cruxes ranked by what would move the positions, and a dated ledger of what moved them.",
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
          headline: "How maps are made",
          description: DESCRIPTION,
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
