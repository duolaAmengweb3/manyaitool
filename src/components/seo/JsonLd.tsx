import { SITE_URL } from "@/lib/constants";
import { ToolDefinition } from "@/lib/types";

export function ToolJsonLd({ tool }: { tool: ToolDefinition }) {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    url: `${SITE_URL}/tools/${tool.slug}`,
    description: tool.description,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
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
      {faqPage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
        />
      )}
    </>
  );
}
