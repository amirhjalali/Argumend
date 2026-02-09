import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Join the ARGUMEND community. Suggest new topics, improve existing arguments, challenge confidence scores, and practice the art of disagreeing well.",
  alternates: {
    canonical: "https://argumend.org/community",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
