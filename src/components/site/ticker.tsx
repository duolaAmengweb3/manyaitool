"use client"

import { Star } from "lucide-react"
import { UI } from "@/lib/site-content"
import type { Lang } from "@/lib/i18n"

const COLORS = ["#FF6B7A", "#2F81F7", "#E0A100", "#34C759", "#A78BFA", "#FF8A3D"]

export function Ticker({ lang }: { lang: Lang }) {
  const items = UI[lang].ticker
  const loop = [...items, ...items]

  return (
    <section className="container mx-auto px-4 py-3 md:py-4">
      <div className="ticker-glass ticker-pause overflow-hidden">
        <div className="flex w-max animate-marquee items-center whitespace-nowrap py-3.5 md:py-4">
          {loop.map((text, i) => (
            <span key={i} className="flex items-center">
              <span
                className="px-6 text-base font-extrabold tracking-tight md:text-lg"
                style={{ color: COLORS[i % COLORS.length] }}
              >
                {text}
              </span>
              <Star className="h-4 w-4 flex-shrink-0 fill-black text-black/80" aria-hidden />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
