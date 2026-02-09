import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perspectives",
  description:
    "An interactive scroll-driven story about why you are not your ideas. Explore how context, timing, and motivation shape what we see — and why that matters for honest discourse.",
  alternates: {
    canonical: "https://argumend.org/perspectives",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
