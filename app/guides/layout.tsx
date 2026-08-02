import { Metadata } from "next";
import { buildGenericOgUrl } from "@/lib/og";

const SOCIAL_IMAGE = buildGenericOgUrl({
  title: "Critical Thinking Guides",
  subtitle: "Foundations for evaluating any argument",
});

export const metadata: Metadata = {
  title: "Guides — Critical Thinking & Argument Analysis",
  description:
    "Guides on critical thinking: how to triangulate sources, recognize bias, weigh evidence, and reason well. Foundations for evaluating any argument.",
  keywords: [
    "critical thinking guides",
    "argument analysis guide",
    "source evaluation",
    "recognize bias",
    "evidence weighting",
    "reasoning skills",
  ],
  openGraph: {
    title: "Guides — Critical Thinking & Argument Analysis",
    description:
      "Learn to triangulate sources, recognize bias, weigh evidence, and reason well. Free guides from Argumend.",
    url: "https://argumend.org/guides",
    siteName: "ARGUMEND",
    images: [
      {
        url: SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: "Critical Thinking Guides on Argumend",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Critical Thinking Guides | Argumend",
    description:
      "Free guides on source evaluation, bias recognition, evidence weighting, and structured reasoning.",
    images: [SOCIAL_IMAGE],
  },
  alternates: {
    canonical: "https://argumend.org/guides",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
