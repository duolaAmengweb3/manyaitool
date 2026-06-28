"use client"

import { useRef } from "react"
import Link from "next/link"
import { ArrowUpRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import type { ProjectItem } from "@/data/projects"
import { CATEGORY_META, UI, type CategoryKey } from "@/lib/site-content"
import type { Lang } from "@/lib/i18n"

export type ProductEntry = { item: ProjectItem; category: CategoryKey }

export function ProductGrid({
  lang,
  entries,
  showCategoryChip,
  page,
  pageCount,
  onPageChange,
}: {
  lang: Lang
  entries: ProductEntry[]
  showCategoryChip: boolean
  page: number
  pageCount: number
  onPageChange: (p: number) => void
}) {
  const t = UI[lang].products
  const b = UI[lang].badges
  const sectionRef = useRef<HTMLElement>(null)

  const goTo = (p: number) => {
    if (p < 1 || p > pageCount || p === page) return
    onPageChange(p)
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section ref={sectionRef} className="container mx-auto scroll-mt-20 px-4 pb-24 pt-6">
      {entries.length === 0 ? (
        <div className="rounded-2xl border-[3px] border-dashed border-black/40 bg-white px-6 py-16 text-center text-base font-semibold text-[#6b6b6b]">
          {t.empty}
        </div>
      ) : (
        <>
          <div
            key={`${page}-${entries[0]?.item.id}`}
            className="grid content-start gap-5 sm:grid-cols-2 sm:min-h-[1400px] lg:grid-cols-3 lg:min-h-[960px] animate-in fade-in duration-200"
          >
            {entries.map(({ item, category }) => {
              const accent = CATEGORY_META[category].accent
              const pinned = item.pinned
              const featuredLabel = { en: "Our Practice", "zh-Hans": "核心业务", "zh-Hant": "核心業務" }[lang]
              const cardHref = item.url.startsWith("http") ? `/products/${item.id}` : item.url
              const cardClass = pinned
                ? "hover-brutal group flex flex-col rounded-2xl border-[3px] border-[#EF4444] bg-[#0b0b0b] p-5"
                : "hover-brutal group flex flex-col rounded-2xl border-[3px] border-black bg-white p-5 shadow-brutal-sm"
              const cardStyle = pinned ? { boxShadow: "5px 5px 0 0 #EF4444" } : undefined
              const inner = (
                <>
                  {pinned ? (
                    <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full border-2 border-[#EF4444] bg-[#EF4444] px-2.5 py-0.5 text-xs font-bold text-white">
                      <Sparkles className="h-3 w-3" /> {featuredLabel}
                    </span>
                  ) : showCategoryChip ? (
                    <span
                      className="mb-3 inline-block w-fit rounded-full border-2 border-black px-2.5 py-0.5 text-xs font-bold text-black"
                      style={{ backgroundColor: accent }}
                    >
                      {CATEGORY_META[category].label[lang]}
                    </span>
                  ) : (
                    <span className="mb-4 h-2 w-12 rounded-full" style={{ backgroundColor: accent }} />
                  )}

                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3
                      className={`text-lg font-extrabold leading-tight tracking-tight ${pinned ? "text-white" : ""}`}
                    >
                      {item.title[lang]}
                    </h3>
                    {item.isNew && !pinned && (
                      <span className="inline-flex items-center gap-1 rounded-full border-2 border-black bg-[#34C759] px-2 py-0.5 text-[11px] font-bold text-white">
                        <Sparkles className="h-3 w-3" /> {b.new}
                      </span>
                    )}
                  </div>

                  <p
                    className={`mb-5 line-clamp-4 flex-1 text-sm font-medium leading-relaxed ${pinned ? "text-white/75" : "text-[#393939]"}`}
                  >
                    {item.description[lang]}
                  </p>

                  <span
                    className={`mt-auto inline-flex items-center gap-1.5 text-sm font-bold transition-all group-hover:gap-2.5 ${pinned ? "text-[#FF6B6B]" : "text-black"}`}
                  >
                    {t.open}
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </>
              )

              return (
                <Link key={item.id} href={cardHref} className={cardClass} style={cardStyle}>
                  {inner}
                </Link>
              )
            })}
          </div>

          {pageCount > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                onClick={() => goTo(page - 1)}
                disabled={page === 1}
                className="flex h-10 items-center gap-1 rounded-lg border-2 border-black bg-white px-3 text-sm font-bold transition-all enabled:hover:bg-[#FFC224] enabled:active:translate-y-[1px] disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">{t.prev}</span>
              </button>

              {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => goTo(p)}
                  className="h-10 w-10 rounded-lg border-2 border-black text-sm font-bold transition-all active:translate-y-[1px]"
                  style={{
                    backgroundColor: p === page ? "#0b0b0b" : "#ffffff",
                    color: p === page ? "#ffffff" : "#0b0b0b",
                    boxShadow: p === page ? "3px 3px 0 0 rgba(0,0,0,1)" : "none",
                  }}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => goTo(page + 1)}
                disabled={page === pageCount}
                className="flex h-10 items-center gap-1 rounded-lg border-2 border-black bg-white px-3 text-sm font-bold transition-all enabled:hover:bg-[#FFC224] enabled:active:translate-y-[1px] disabled:opacity-40"
              >
                <span className="hidden sm:inline">{t.next}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}
