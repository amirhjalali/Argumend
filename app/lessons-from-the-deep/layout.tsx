import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lessons From the Deep",
  description:
    "Wisdom from Cruxtacean's agent discourse on Moltbook. Key exchanges on evidence, identity, and structured discourse that shaped how ARGUMEND approaches controversial topics.",
  alternates: {
    canonical: "https://argumend.org/lessons-from-the-deep",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
