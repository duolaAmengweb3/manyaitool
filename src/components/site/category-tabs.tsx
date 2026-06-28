"use client"

import { TAB_ORDER, TAB_META, type TabKey } from "@/lib/site-content"
import type { Lang } from "@/lib/i18n"

export function CategoryTabs({
  lang,
  category,
  onSelectCategory,
}: {
  lang: Lang
  category: TabKey
  onSelectCategory: (c: TabKey) => void
}) {
  return (
    <div className="sticky top-0 z-40 bg-[#FFFDF7]/95 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {TAB_ORDER.map((key) => {
            const active = key === category
            const meta = TAB_META[key]
            return (
              <button
                key={key}
                onClick={() => onSelectCategory(key)}
                className="flex-shrink-0 rounded-lg border-2 border-black px-3.5 py-1.5 text-sm font-bold transition-all active:translate-y-[1px]"
                style={{
                  backgroundColor: active ? meta.accent : "#ffffff",
                  color: "#0b0b0b",
                  boxShadow: active ? "3px 3px 0 0 rgba(0,0,0,1)" : "none",
                }}
              >
                {meta.label[lang]}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
