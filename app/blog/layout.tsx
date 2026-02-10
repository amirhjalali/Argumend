import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Essays on critical thinking, logical fallacies, steel-manning, confidence calibration, and the art of productive disagreement. By the Argumend team.",
  alternates: {
    canonical: "https://argumend.org/blog",
  },
  openGraph: {
    title: "Blog | ARGUMEND",
    description:
      "Essays on critical thinking, logical fallacies, steel-manning, confidence calibration, and the art of productive disagreement.",
    type: "website",
    url: "https://argumend.org/blog",
    siteName: "ARGUMEND",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
