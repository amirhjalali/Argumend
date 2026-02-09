import { Metadata } from "next";

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "About ARGUMEND",
            description:
              "ARGUMEND maps controversial topics visually with steel-manned arguments, crux identification, and calibrated confidence scores.",
            publisher: {
              "@type": "Organization",
              name: "ARGUMEND",
              url: "https://argumend.org",
            },
          }),
        }}
      />
    </>
  );
}
