import { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "About ARGUMEND",
  description:
    "ARGUMEND maps controversial topics visually with steel-manned arguments, crux identification, and calibrated confidence scores. Learn about our mission to transform how people disagree.",
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
