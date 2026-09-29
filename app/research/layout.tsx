import { Metadata } from "next";
import { DEFAULT_SOCIAL_IMAGE, DEFAULT_SOCIAL_IMAGE_URL } from "@/lib/og";

export const metadata: Metadata = {
  title: "Research — The Science Behind Argument Mapping",
  description:
    "Why Argumend exists: people on opposite sides usually disagree less than they think. The research on that perception gap, on polarization and misinformation, and on what helps, with a reading list.",
  keywords: ["perception gap", "polarization research", "deliberative reasoning", "misinformation studies", "argument mapping research", "cognitive science"],
  openGraph: {
    title: "Research — The Science Behind Argument Mapping",
    description: "The perception gap, polarization and misinformation research behind Argumend, with a reading list.",
    url: "https://argumend.org/research",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Research — The Science Behind Argument Mapping",
    description: "Peer-reviewed science behind Argumend's methodology.",
    images: [DEFAULT_SOCIAL_IMAGE_URL],
  },
  alternates: {
    canonical: "https://argumend.org/research",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
