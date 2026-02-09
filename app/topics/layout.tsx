import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Topics",
  description:
    "Browse 38 controversial topics mapped with visual argument analysis. Filter by confidence level, status, and more. Each topic includes steel-manned arguments and crux questions.",
  alternates: {
    canonical: "https://argumend.org/topics",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
