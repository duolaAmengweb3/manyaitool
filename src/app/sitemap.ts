import { MetadataRoute } from "next";
import { getAllMetas } from "@/tools";
import { SITE_URL } from "@/lib/constants";
import { NATIONAL_DAYS } from "@/data/national-days";
import { getMoonPages } from "@/data/moon-pages";
import { getExternalProjectEntries } from "@/data/projects";
import { GEO_PAGE_ORDER, getGeoPage, getGeoPageMarkdownUrl } from "@/data/geo-pages";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = getAllMetas();
  const projects = getExternalProjectEntries();
  const now = new Date();
  const monthly = "monthly" as const;
  const weekly = "weekly" as const;

  const toolUrls = tools.map((tool) => ({
    url: `${SITE_URL}/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: monthly,
    priority: 0.8,
  }));

  const projectUrls = projects.map(({ item }) => ({
    url: `${SITE_URL}/products/${item.id}`,
    lastModified: item.launchedAt ? new Date(`${item.launchedAt}T00:00:00Z`) : now,
    changeFrequency: monthly,
    priority: item.isNew ? 0.85 : 0.65,
  }));

  const aiFileUrls = ["llms.txt", "llms-full.txt", "ai-index.json", "schema.json"].map((file) => ({
    url: `${SITE_URL}/${file}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const geoPageUrls = GEO_PAGE_ORDER.map((slug) => {
    const page = getGeoPage(slug);
    return {
      url: `${SITE_URL}${page.href}`,
      lastModified: now,
      changeFrequency: weekly,
      priority: page.slug === "work-with-me" ? 0.95 : 0.85,
    };
  });

  const geoMarkdownUrls = GEO_PAGE_ORDER.map((slug) => ({
    url: getGeoPageMarkdownUrl(slug),
    lastModified: now,
    changeFrequency: weekly,
    priority: 0.55,
  }));

  const toolMarkdownUrls = tools.map((tool) => ({
    url: `${SITE_URL}/tools/${tool.slug}/index.md`,
    lastModified: now,
    changeFrequency: monthly,
    priority: 0.45,
  }));

  const productMarkdownUrls = projects.map(({ item }) => ({
    url: `${SITE_URL}/products/${item.id}/index.md`,
    lastModified: item.launchedAt ? new Date(`${item.launchedAt}T00:00:00Z`) : now,
    changeFrequency: monthly,
    priority: 0.4,
  }));

  const nationalDayUrls = [
    { url: `${SITE_URL}/national-days`, lastModified: now, changeFrequency: monthly, priority: 0.7 },
    ...NATIONAL_DAYS.map((d) => ({
      url: `${SITE_URL}/national-days/${d.slug}`,
      lastModified: now,
      changeFrequency: monthly,
      priority: 0.6,
    })),
  ];

  const moonUrls = [
    { url: `${SITE_URL}/full-moon`, lastModified: now, changeFrequency: monthly, priority: 0.7 },
    ...getMoonPages().map((p) => ({
      url: `${SITE_URL}/full-moon/${p.slug}`,
      lastModified: now,
      changeFrequency: monthly,
      priority: 0.6,
    })),
  ];

  const homeAlternates = {
    languages: {
      en: SITE_URL,
      "zh-Hans": `${SITE_URL}/zh-hans`,
      "zh-Hant": `${SITE_URL}/zh-hant`,
    },
  };

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: weekly, priority: 1.0, alternates: homeAlternates },
    { url: `${SITE_URL}/zh-hans`, lastModified: now, changeFrequency: weekly, priority: 0.9, alternates: homeAlternates },
    { url: `${SITE_URL}/zh-hant`, lastModified: now, changeFrequency: weekly, priority: 0.9, alternates: homeAlternates },
    ...geoPageUrls,
    ...projectUrls,
    ...toolUrls,
    ...nationalDayUrls,
    ...moonUrls,
    ...aiFileUrls,
    ...geoMarkdownUrls,
    ...productMarkdownUrls,
    ...toolMarkdownUrls,
  ];
}
