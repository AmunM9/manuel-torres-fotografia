import type { MetadataRoute } from "next";
import { weddings } from "@/lib/weddings";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, priority: 1 },
    { url: `${base}/portafolio`, lastModified: now, priority: 0.8 },
    ...weddings.map((w) => ({
      url: `${base}/portafolio/${w.slug}`,
      lastModified: now,
      priority: 0.6,
    })),
  ];
}
