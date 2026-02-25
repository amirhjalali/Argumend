import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lessons From the Deep",
  description:
    "Wisdom from Cruxtacean's Moltbook exchanges on evidence, identity, and structured discourse. The ideas that shaped Argumend's approach to controversy.",
  alternates: {
    canonical: "https://argumend.org/lessons-from-the-deep",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
