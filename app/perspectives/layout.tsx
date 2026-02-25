import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perspectives",
  description:
    "An interactive story about why you are not your ideas. How context, timing, and motivation shape what we see — and why it matters for honest discourse.",
  alternates: {
    canonical: "https://argumend.org/perspectives",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
