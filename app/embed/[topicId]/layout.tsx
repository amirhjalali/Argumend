import type { Metadata, Viewport } from "next";
import { EB_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "../../globals.css";

const serif = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1917" },
  ],
};

export const metadata: Metadata = {
  title: "ARGUMEND Embed",
  description: "Embeddable argument summary widget by ARGUMEND",
  robots: { index: false, follow: false },
};

// The widget is iframed into third-party pages and has no theme toggle of its
// own. We can't read the host page's theme cross-origin, so we honor the
// viewer's OS preference (prefers-color-scheme) and otherwise default to the
// parchment brand. This tiny, dependency-free script runs before paint to set
// the `dark` class so Tailwind `dark:` variants apply with no flash of the
// wrong theme. CSP allows 'unsafe-inline' scripts (see next.config.js).
const themeScript = `(function(){try{if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.classList.add('dark')}}catch(e){}})();`;

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${serif.variable} ${sans.variable} antialiased bg-canvas text-primary dark:bg-[#1a1917] dark:text-stone-100`}
        style={{
          margin: 0,
          padding: 0,
          minHeight: "auto",
          colorScheme: "light dark",
        }}
      >
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
