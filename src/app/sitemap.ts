import { MetadataRoute } from "next";
import { getAllMetas } from "@/tools";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = getAllMetas();

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...tools.map((tool) => ({
      url: `${SITE_URL}/tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
