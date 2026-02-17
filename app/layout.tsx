import type { Metadata, Viewport } from "next";
import { EB_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { SessionProvider } from "@/components/SessionProvider";
import "./globals.css";

const serif = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f4f1eb",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.argumend.org"),
  title: {
    default: "ARGUMEND — Map Arguments, Not Win Them",
    template: "%s | ARGUMEND",
  },
  description:
    "Visual argument mapping for controversial topics. See both sides, weigh the evidence, find what actually matters. 38 topics with AI-powered analysis.",
  keywords: [
    "argument mapping",
    "critical thinking",
    "debate analysis",
    "evidence-based reasoning",
    "controversial topics",
    "steel man arguments",
  ],
  authors: [{ name: "ARGUMEND" }],
  creator: "ARGUMEND",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.argumend.org",
    siteName: "ARGUMEND",
    title: "ARGUMEND — Map Arguments, Not Win Them",
    description:
      "Visual argument mapping for controversial topics. See both sides, weigh the evidence, find what actually matters.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARGUMEND — Map Arguments, Not Win Them",
    description:
      "Visual argument mapping for controversial topics. See both sides, weigh the evidence, find what actually matters.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://argumend.org",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-primary focus:rounded-lg focus:shadow-lg"
        >
          Skip to content
        </a>
        <SessionProvider>{children}</SessionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "ARGUMEND",
              url: "https://argumend.org",
              description:
                "Visual argument mapping for controversial topics. See both sides, weigh the evidence, find what actually matters.",
              applicationCategory: "EducationalApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Argumend",
              url: "https://argumend.org",
              description:
                "Structured argument mapping platform for controversial topics. See both sides, weigh the evidence, find what actually matters.",
              sameAs: [],
              logo: "https://argumend.org/icon.png",
              foundingDate: "2024",
              knowsAbout: [
                "argument mapping",
                "critical thinking",
                "evidence-based reasoning",
                "debate analysis",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
