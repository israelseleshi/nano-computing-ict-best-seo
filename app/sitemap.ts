import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://nanocomputingict.com";

type Route = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

/**
 * Single source of truth for indexable routes. Anything listed here is
 * discoverable by crawlers and appears in /sitemap.xml. If you add a public
 * page, add it here — and consider a matching entry in robots.ts.
 */
const routes: Route[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/shop", changeFrequency: "weekly", priority: 0.7 },
  { path: "/contacts", changeFrequency: "yearly", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}