import type { MetadataRoute } from "next";

const baseUrl = "https://freebox.tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = [
    "json-formatter", "color-converter", "word-counter", "base64",
    "qr-code", "markdown-preview", "timestamp", "password-generator",
    "url-encode", "regex-tester",
  ];

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...tools.map((tool) => ({
      url: `${baseUrl}/${tool}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
