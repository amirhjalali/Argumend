import { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "About ARGUMEND — Our Mission to Transform How People Disagree",
  description:
    "ARGUMEND maps controversial topics visually with steel-manned arguments, crux identification, and calibrated confidence scores. Learn about our mission to transform how people disagree.",
  keywords: ["about argumend", "argument mapping platform", "critical thinking tool", "evidence-based reasoning"],
  openGraph: {
    title: "About ARGUMEND — Our Mission",
    description: "We map controversial topics visually so you can see both sides, weigh the evidence, and find what matters.",
    url: "https://argumend.org/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About ARGUMEND",
    description: "Our mission to transform how people disagree — with evidence, not volume.",
  },
  alternates: {
    canonical: "https://argumend.org/about",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          headline: "About ARGUMEND",
          description:
            "ARGUMEND maps controversial topics visually with steel-manned arguments, crux identification, and calibrated confidence scores.",
          publisher: {
            "@type": "Organization",
            name: "ARGUMEND",
            url: "https://argumend.org",
          },
        }}
      />
    </>
  );
}
