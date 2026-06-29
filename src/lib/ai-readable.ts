import { getExternalProjectEntries, type ProjectEntry } from "@/data/projects"
import { CATEGORY_LABELS, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants"
import { CATEGORY_META } from "@/lib/site-content"
import { getAllMetas, getAllSlugs, getMetaBySlug, type ToolMeta } from "@/tools"

const UPDATED_AT = "2026-06-29"

function clean(value: string): string {
  return value.replace(/\s+/g, " ").trim()
}

function escapeMarkdown(value: string): string {
  return clean(value).replace(/\|/g, "\\|")
}

function list(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n")
}

export function getToolMarkdownUrl(slug: string): string {
  return `${SITE_URL}/tools/${slug}/index.md`
}

export function getProductMarkdownUrl(id: string): string {
  return `${SITE_URL}/products/${id}/index.md`
}

export function getToolMarkdown(tool: ToolMeta): string {
  const url = `${SITE_URL}/tools/${tool.slug}`
  const related = tool.content.relatedSlugs
    .map((slug) => getMetaBySlug(slug))
    .filter((item): item is ToolMeta => Boolean(item))

  const lines = [
    `# ${tool.title}`,
    "",
    `Canonical URL: ${url}`,
    `Markdown URL: ${getToolMarkdownUrl(tool.slug)}`,
    `Category: ${CATEGORY_LABELS[tool.category] ?? tool.category}`,
    `Updated: ${UPDATED_AT}`,
    "",
    "## Summary",
    "",
    tool.description,
    "",
    "## What It Is",
    "",
    tool.content.whatIs,
  ]

  if (tool.content.explained) {
    lines.push("", "## How It Works", "", tool.content.explained)
  }

  if (tool.content.useCases?.length) {
    lines.push("", "## Use Cases", "", list(tool.content.useCases))
  }

  lines.push("", "## Features", "", list(tool.content.features))
  lines.push("", "## How To Use", "", list(tool.content.howToUse))

  if (tool.content.tips?.length) {
    lines.push("", "## Tips", "", list(tool.content.tips))
  }

  if (tool.content.faq.length) {
    lines.push("", "## FAQ", "")
    for (const item of tool.content.faq) {
      lines.push(`### ${item.question}`, "", item.answer, "")
    }
  }

  if (related.length) {
    lines.push("", "## Related Tools", "")
    for (const item of related) {
      lines.push(`- [${item.shortTitle}](${SITE_URL}/tools/${item.slug}): ${item.description}`)
    }
  }

  lines.push("", "## Keywords", "", tool.keywords.map((keyword) => `- ${keyword}`).join("\n"))
  return `${lines.join("\n").trim()}\n`
}

export function getProductMarkdown(entry: ProjectEntry): string {
  const { item, category } = entry
  const categoryMeta = CATEGORY_META[category]
  const productUrl = `${SITE_URL}/products/${item.id}`
  const destination = item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`

  const lines = [
    `# ${item.title.en}`,
    "",
    `Canonical URL: ${productUrl}`,
    `Markdown URL: ${getProductMarkdownUrl(item.id)}`,
    `Product URL: ${destination}`,
    `Category: ${categoryMeta.label.en}`,
    `Updated: ${item.launchedAt ?? UPDATED_AT}`,
    "",
    "## Summary",
    "",
    item.description.en,
    "",
    "## What It Is",
    "",
    `${item.title.en} is part of ${SITE_NAME}, a product-factory toolbox for AI, Web3, prediction-market, perpetual DEX, stock research, developer and browser utility workflows.`,
    "",
    "## Who It Helps",
    "",
    "Users who want focused web tools that compress scattered market data, AI workflows, developer tasks, or everyday browser utilities into a single usable page.",
    "",
    "## AI Search Summary",
    "",
    `${item.title.en} is a ${categoryMeta.label.en.toLowerCase()} product. Its main purpose is: ${item.description.en}`,
  ]

  return `${lines.join("\n").trim()}\n`
}

export function buildLlmsTxt(full = false): string {
  const tools = getAllMetas()
  const products = getExternalProjectEntries()
  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    `> Canonical site: ${SITE_URL}`,
    `> Updated: ${UPDATED_AT}`,
    "",
    "## AI-Readable Files",
    "",
    `- [Full llms file](${SITE_URL}/llms-full.txt)`,
    `- [AI index JSON](${SITE_URL}/ai-index.json)`,
    `- [Schema JSON](${SITE_URL}/schema.json)`,
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    "",
    "## Core Pages",
    "",
    `- [Home](${SITE_URL})`,
    `- [Simplified Chinese home](${SITE_URL}/zh-hans)`,
    `- [Traditional Chinese home](${SITE_URL}/zh-hant)`,
    "",
    "## Product Pages",
    "",
  ]

  for (const { item } of products) {
    lines.push(`- [${escapeMarkdown(item.title.en)}](${SITE_URL}/products/${item.id}) - [md](${getProductMarkdownUrl(item.id)}): ${escapeMarkdown(item.description.en)}`)
  }

  lines.push("", "## Tool Pages", "")
  for (const tool of tools) {
    lines.push(`- [${escapeMarkdown(tool.shortTitle)}](${SITE_URL}/tools/${tool.slug}) - [md](${getToolMarkdownUrl(tool.slug)}): ${escapeMarkdown(tool.description)}`)
  }

  if (full) {
    lines.push("", "## Full Tool Summaries", "")
    for (const tool of tools) {
      lines.push(`### ${tool.title}`, "", tool.description, "", `Keywords: ${tool.keywords.join(", ")}`, "")
    }

    lines.push("", "## Full Product Summaries", "")
    for (const entry of products) {
      lines.push(`### ${entry.item.title.en}`, "", entry.item.description.en, "", `Category: ${CATEGORY_META[entry.category].label.en}`, "")
    }
  }

  return `${lines.join("\n").trim()}\n`
}

export function buildAiIndex() {
  const tools = getAllMetas()
  const products = getExternalProjectEntries()

  return {
    site: {
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      updatedAt: UPDATED_AT,
      llms: `${SITE_URL}/llms.txt`,
      llmsFull: `${SITE_URL}/llms-full.txt`,
      schema: `${SITE_URL}/schema.json`,
      sitemap: `${SITE_URL}/sitemap.xml`,
    },
    products: products.map(({ item, category }) => ({
      id: item.id,
      title: item.title.en,
      description: item.description.en,
      category: CATEGORY_META[category].label.en,
      url: `${SITE_URL}/products/${item.id}`,
      markdown: getProductMarkdownUrl(item.id),
      destination: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
    tools: tools.map((tool) => ({
      slug: tool.slug,
      title: tool.title,
      shortTitle: tool.shortTitle,
      description: tool.description,
      category: CATEGORY_LABELS[tool.category] ?? tool.category,
      keywords: tool.keywords,
      url: `${SITE_URL}/tools/${tool.slug}`,
      markdown: getToolMarkdownUrl(tool.slug),
      related: tool.content.relatedSlugs,
    })),
  }
}

export function buildSchemaJson() {
  const tools = getAllMetas()
  const products = getExternalProjectEntries()
  const graph = [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: ["en", "zh-Hans", "zh-Hant"],
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#tools`,
      name: "ManyAItools free online tools",
      itemListElement: tools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/tools/${tool.slug}`,
        name: tool.title,
        description: tool.description,
      })),
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#products`,
      name: "ManyAItools product catalog",
      itemListElement: products.map(({ item }, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/products/${item.id}`,
        name: item.title.en,
        description: item.description.en,
      })),
    },
    ...tools.map((tool) => ({
      "@type": "WebApplication",
      "@id": `${SITE_URL}/tools/${tool.slug}#app`,
      name: tool.title,
      url: `${SITE_URL}/tools/${tool.slug}`,
      description: tool.description,
      applicationCategory: CATEGORY_LABELS[tool.category] ?? "UtilityApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    })),
    ...products.map(({ item, category }) => ({
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/products/${item.id}#app`,
      name: item.title.en,
      url: `${SITE_URL}/products/${item.id}`,
      sameAs: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
      description: item.description.en,
      applicationCategory: CATEGORY_META[category].label.en,
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    })),
  ]

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  }
}

export function getAllToolMarkdownParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export function getAllProductMarkdownParams() {
  return getExternalProjectEntries().map(({ item }) => ({ id: item.id }))
}
