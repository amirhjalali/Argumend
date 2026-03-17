import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research — The Science Behind Argument Mapping",
  description:
    "The peer-reviewed science behind Argumend: polarization research, deliberative reasoning, and misinformation studies that inform our argument mapping methodology.",
  keywords: ["polarization research", "deliberative reasoning", "misinformation studies", "argument mapping research", "cognitive science"],
  openGraph: {
    title: "Research — The Science Behind Argument Mapping",
    description: "Peer-reviewed polarization research, deliberative reasoning, and misinformation studies behind Argumend.",
    url: "https://argumend.org/research",
  },
  twitter: {
    card: "summary_large_image",
    title: "Research — The Science Behind Argument Mapping",
    description: "Peer-reviewed science behind Argumend's methodology.",
  },
  alternates: {
    canonical: "https://argumend.org/research",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
