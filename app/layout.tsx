import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { EB_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { SessionProvider } from "@/components/SessionProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { JsonLd } from "@/components/JsonLd";
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
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1917" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://argumend.org"),
  title: {
    default: "ARGUMEND — Map Arguments, Not Win Them",
    template: "%s | ARGUMEND",
  },
  description:
    "Visual argument mapping for controversial topics. See both sides, weigh the evidence, find what actually matters. 109+ topics analyzed.",
  keywords: [
    "argument mapping",
    "argument map tool",
    "critical thinking",
    "debate analysis",
    "evidence-based reasoning",
    "controversial topics",
    "steel man arguments",
    "logical fallacies",
    "both sides of the argument",
    "fact check",
    "pros and cons",
    "structured reasoning",
  ],
  authors: [{ name: "ARGUMEND" }],
  creator: "ARGUMEND",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://argumend.org",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Argumend Blog"
          href="/feed.xml"
        />
      </head>
      {GA_MEASUREMENT_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      ) : null}
      <body className={`${serif.variable} ${sans.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-primary focus:rounded-lg focus:shadow-lg"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
        <JsonLd
          data={{
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
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Argumend",
            url: "https://argumend.org",
            description:
              "Structured argument mapping platform for controversial topics. See both sides, weigh the evidence, find what actually matters.",
            sameAs: [
              "https://x.com/argumend",
              "https://github.com/argumend",
            ],
            logo: "https://argumend.org/icon.png",
            foundingDate: "2024",
            knowsAbout: [
              "argument mapping",
              "critical thinking",
              "evidence-based reasoning",
              "debate analysis",
            ],
          }}
        />
      </body>
    </html>
  );
}
