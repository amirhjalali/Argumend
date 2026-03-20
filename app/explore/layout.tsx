import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Topics | Argumend",
  description:
    "Discover and filter topics across policy, technology, science, economics, and philosophy. Search, sort, and explore evidence-based analyses.",
  openGraph: {
    title: "Explore Topics | Argumend",
    description:
      "Discover and filter topics across policy, technology, science, economics, and philosophy. Search, sort, and explore evidence-based analyses.",
    url: "https://argumend.org/explore",
    type: "website",
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
