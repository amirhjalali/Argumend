import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const revalidate = 86400;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      // The v1 API is intentionally public and machine-readable. These more
      // specific allow rules override the broad private-API disallow below.
      allow: ["/", "/api/v1", "/api/v1/"],
      // Sign-in is intentionally crawlable so its page-level noindex directive
      // can be observed. Private APIs and utility surfaces stay disallowed.
      disallow: ["/api/", "/dashboard", "/embed/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
