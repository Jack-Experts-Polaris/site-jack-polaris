import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-19");
  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1, images: [absoluteUrl("/images/og-image.png")] },
    { url: absoluteUrl("/recursos"), lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/llms.txt"), lastModified, changeFrequency: "weekly", priority: 0.3 },
  ];
}
