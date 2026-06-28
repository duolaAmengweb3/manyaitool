"use client"

import { useState } from "react"
import { projects } from "@/data/projects"
import { SiteHero } from "@/components/site/hero"
import { Ticker } from "@/components/site/ticker"
import { CategoryTabs } from "@/components/site/category-tabs"
import { ProductGrid, type ProductEntry } from "@/components/site/product-grid"
import { UI, TAB_META, ALL_ORDER, PAGE_SIZE, type CategoryKey, type TabKey } from "@/lib/site-content"
import type { Lang } from "@/lib/i18n"

function launchTime(value?: string) {
  if (!value) return 0
  const parsed = Date.parse(`${value}T00:00:00Z`)
  return Number.isNaN(parsed) ? 0 : parsed
}

export function SiteHome({ lang }: { lang: Lang }) {
  const [category, setCategory] = useState<TabKey>("all")
  const [page, setPage] = useState(1)

  const handleSelectCategory = (c: TabKey) => {
    setCategory(c)
    setPage(1)
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      document.getElementById("products")?.scrollIntoView({ block: "start" })
    }
  }

  const entries: ProductEntry[] =
    category === "all"
      ? ALL_ORDER.flatMap((k) => projects[k].map((item) => ({ item, category: k as CategoryKey }))).sort(
          (a, b) =>
            Number(b.item.pinned ?? false) - Number(a.item.pinned ?? false) ||
            launchTime(b.item.launchedAt) - launchTime(a.item.launchedAt),
        )
      : projects[category].map((item) => ({ item, category }))

  const pageCount = Math.max(1, Math.ceil(entries.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount)
  const pageEntries = entries.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const t = UI[lang].products

  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      <SiteHero lang={lang} />

      <Ticker lang={lang} />

      <div id="products" className="scroll-mt-4">
        <section className="container mx-auto px-4 pt-10 pb-1">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              {t.heading}
              <span
                className="ml-1 inline-block px-3 py-0.5 text-black"
                style={{ backgroundColor: TAB_META[category].accent }}
              >
                {t.headingHighlight}
              </span>
            </h2>
            <span className="rounded-full border-2 border-black bg-white px-3 py-1 text-sm font-bold">
              {TAB_META[category].label[lang]} · {entries.length}
              {t.countSuffix}
            </span>
          </div>
        </section>

        <CategoryTabs lang={lang} category={category} onSelectCategory={handleSelectCategory} />

        <ProductGrid
          lang={lang}
          entries={pageEntries}
          showCategoryChip={category === "all"}
          page={safePage}
          pageCount={pageCount}
          onPageChange={setPage}
        />
      </div>
    </main>
  )
}
