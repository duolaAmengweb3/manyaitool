import { getExternalProjectEntries } from "@/data/projects"
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants"
import { HOME_META, type Lang } from "@/lib/i18n"

export function HomeJsonLd({ lang }: { lang: Lang }) {
  const products = getExternalProjectEntries().slice(0, 30)
  const language = lang === "zh-Hans" ? "zh-CN" : lang === "zh-Hant" ? "zh-TW" : "en"

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      alternateName: ["Doraemon Toolbox", "ManyAITool", "哆啦A梦的百宝箱"],
      url: SITE_URL,
      inLanguage: language,
      description: HOME_META[lang].description || SITE_DESCRIPTION,
      about: [
        "AI tools",
        "Web3 tools",
        "prediction markets",
        "perpetual futures",
        "US stock tools",
        "product factory",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      sameAs: ["https://x.com/hunterweb303", "https://github.com/duolaAmengweb3"],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Doraemon Toolbox product catalog",
      itemListElement: products.map(({ item }, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title.en,
        url: `${SITE_URL}/products/${item.id}`,
        description: item.description.en,
      })),
    },
  ]

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
