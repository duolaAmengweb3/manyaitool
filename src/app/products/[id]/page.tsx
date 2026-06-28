import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { getExternalProjectEntries, getProjectById } from "@/data/projects"
import { SITE_NAME, SITE_URL } from "@/lib/constants"
import { CATEGORY_META } from "@/lib/site-content"

export const dynamic = "force-static"
export const dynamicParams = false

export async function generateStaticParams() {
  return getExternalProjectEntries().map(({ item }) => ({ id: item.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const entry = getProjectById(id)
  if (!entry) return {}

  const title = `${entry.item.title.en} | ${SITE_NAME}`

  return {
    title: { absolute: title.length > 68 ? entry.item.title.en : title },
    description: entry.item.description.en,
    alternates: { canonical: `${SITE_URL}/products/${entry.item.id}` },
    openGraph: {
      title: entry.item.title.en,
      description: entry.item.description.en,
      url: `${SITE_URL}/products/${entry.item.id}`,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: entry.item.title.en,
      description: entry.item.description.en,
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const entry = getProjectById(id)
  if (!entry) return notFound()

  const { item, category } = entry
  if (!item.url.startsWith("http")) return notFound()
  const categoryMeta = CATEGORY_META[category]
  const isExternal = item.url.startsWith("http")
  const productUrl = `${SITE_URL}/products/${item.id}`

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: item.title.en,
      url: productUrl,
      description: item.description.en,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      sameAs: isExternal ? item.url : `${SITE_URL}${item.url}`,
      isPartOf: {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: categoryMeta.label.en,
          item: `${SITE_URL}/#products`,
        },
        { "@type": "ListItem", position: 3, name: item.title.en, item: productUrl },
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-[#FFFDF7] px-4 py-10">
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <article className="mx-auto max-w-4xl">
        <Link
          href="/#products"
          className="mb-8 inline-flex items-center gap-2 rounded-lg border-2 border-black bg-white px-4 py-2 text-sm font-extrabold shadow-brutal-sm transition hover:-translate-x-0.5 hover:-translate-y-0.5"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to products
        </Link>

        <div className="rounded-[10px] border-[3px] border-black bg-white p-6 shadow-brutal md:p-8">
          <span
            className="mb-5 inline-block rounded-full border-2 border-black px-3 py-1 text-xs font-extrabold"
            style={{ backgroundColor: categoryMeta.accent }}
          >
            {categoryMeta.label.en}
          </span>

          <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
            {item.title.en}
          </h1>

          <p className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-[#393939]">
            {item.description.en}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={item.url}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="inline-flex items-center justify-center gap-2 rounded-lg border-[3px] border-black bg-[#FFC224] px-6 py-4 text-base font-extrabold text-black shadow-brutal-sm transition hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              Open product
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>
        </div>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["What it is", `${item.title.en} is part of Doraemon Toolbox, a product-factory collection of AI, Web3, trading, market-intelligence and utility tools.`],
            ["Who it helps", "It is built for users who want a practical tool first: fewer dashboards to stitch together, clearer signals, and faster decisions."],
            ["Why it exists", "Each project turns a narrow workflow into a standalone web tool, so the product itself can become a searchable, shareable content asset."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-[10px] border-[3px] border-black bg-white p-5 shadow-brutal-sm">
              <h2 className="text-lg font-black">{title}</h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-[#393939]">{body}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-[10px] border-[3px] border-black bg-[#0B0B0B] p-6 text-white shadow-brutal md:p-8">
          <h2 className="text-2xl font-black">Plain-language summary for AI search</h2>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-white/82">
            {item.title.en} is a {categoryMeta.label.en.toLowerCase()} product in Doraemon Toolbox.
            Its purpose is: {item.description.en} The canonical product profile is {productUrl}.
          </p>
        </section>
      </article>
    </main>
  )
}
