import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Topics | Argumend",
  description:
    "Discover and filter topics across policy, technology, science, economics, and philosophy. Search, sort, and explore evidence-based analyses.",
  keywords: [
    "explore topics",
    "argument map browser",
    "filter debates",
    "controversial topics",
    "evidence-based analysis",
    "critical thinking topics",
  ],
  openGraph: {
    title: "Explore Topics | Argumend",
    description:
      "Discover and filter topics across policy, technology, science, economics, and philosophy. Search, sort, and explore evidence-based analyses.",
    url: "https://argumend.org/explore",
    type: "website",
    siteName: "ARGUMEND",
    images: [
      {
        url: `https://argumend.org/api/og?title=${encodeURIComponent("Explore Topics")}&subtitle=${encodeURIComponent("Search and filter evidence-based analyses across 5 categories")}`,
        width: 1200,
        height: 630,
        alt: "Explore Topics on Argumend",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Topics | Argumend",
    description:
      "Search and filter 109+ controversial topics with visual argument maps and evidence scoring.",
    images: [`https://argumend.org/api/og?title=${encodeURIComponent("Explore Topics")}&subtitle=${encodeURIComponent("Search and filter evidence-based analyses across 5 categories")}`],
  },
  alternates: {
    canonical: "https://argumend.org/explore",
  },
};

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
