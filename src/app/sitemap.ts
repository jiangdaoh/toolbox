import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";

const baseUrl = "https://freebox.tools";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...tools.map((tool) => ({
      url: `${baseUrl}/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
