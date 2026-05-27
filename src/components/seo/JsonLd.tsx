import { SITE_URL, CATEGORY_LABELS } from "@/lib/constants";
import { type ToolMeta } from "@/tools";

const CATEGORY_SCHEMA: Record<string, string> = {
  developer: "DeveloperApplication",
  text: "UtilityApplication",
  design: "DesignApplication",
  converter: "UtilityApplication",
  generator: "UtilityApplication",
  calculator: "UtilityApplication",
};

export function ToolJsonLd({ tool }: { tool: ToolMeta }) {
  const toolUrl = `${SITE_URL}/tools/${tool.slug}`;

  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    url: toolUrl,
    description: tool.description,
    applicationCategory: CATEGORY_SCHEMA[tool.category] || "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: CATEGORY_LABELS[tool.category] || tool.category,
        item: `${SITE_URL}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.shortTitle,
      },
    ],
  };

  const faqPage =
    tool.content.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: tool.content.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {faqPage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
        />
      )}
    </>
  );
}
