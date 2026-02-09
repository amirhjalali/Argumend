import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about ARGUMEND: how confidence scores work, what cruxes are, how topics are chosen, and how structured argument mapping differs from traditional debate.",
  alternates: {
    canonical: "https://argumend.org/faq",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
