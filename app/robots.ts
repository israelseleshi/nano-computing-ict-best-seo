import type { MetadataRoute } from "next";

const BASE_URL = "https://nanocomputingict.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Never block /_next — Next.js serves JS, CSS and optimised images
        // from there, and blocking it breaks rendering for every crawler.
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}