import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research",
  description:
    "The peer-reviewed science behind Argumend: polarization research, deliberative reasoning, and misinformation studies that inform our argument mapping methodology.",
  alternates: {
    canonical: "https://argumend.org/research",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
