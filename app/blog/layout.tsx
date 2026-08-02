import { Metadata } from "next";
import { buildGenericOgUrl } from "@/lib/og";

const SOCIAL_IMAGE = buildGenericOgUrl({
  title: "The Argumend Blog",
  subtitle: "Essays on critical thinking and productive disagreement",
});

export const metadata: Metadata = {
  title: "Blog — Essays on Critical Thinking & Argument Analysis",
  description:
    "Essays on critical thinking, logical fallacies, steel-manning, confidence calibration, and the art of productive disagreement. By the Argumend team.",
  keywords: [
    "critical thinking blog",
    "argument analysis essays",
    "logical fallacies",
    "steel-manning",
    "confidence calibration",
    "productive disagreement",
  ],
  alternates: {
    canonical: "https://argumend.org/blog",
  },
  openGraph: {
    title: "Blog | ARGUMEND",
    description:
      "Essays on critical thinking, logical fallacies, steel-manning, confidence calibration, and the art of productive disagreement.",
    type: "website",
    url: "https://argumend.org/blog",
    siteName: "ARGUMEND",
    images: [
      {
        url: SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: "The Argumend Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | ARGUMEND",
    description:
      "Essays on critical thinking, logical fallacies, steel-manning, and the art of productive disagreement.",
    images: [SOCIAL_IMAGE],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
