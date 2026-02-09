import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://argumend.org";

  const staticPages = [
    "",
    "/about",
    "/how-it-works",
    "/methodology",
    "/for-educators",
    "/community",
    "/analyze",
    "/topics",
    "/analyses",
    "/faq",
    "/concepts",
    "/guides",
    "/library",
    "/perspectives",
    "/lessons-from-the-deep",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency:
      route === "" ? ("daily" as const) : ("weekly" as const),
    priority: route === "" ? 1 : route === "/analyze" ? 0.9 : 0.7,
  }));

  return [...staticPages];
}
