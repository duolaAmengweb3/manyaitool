"use client"

import { useEffect, useState } from "react"
import { UI } from "@/lib/site-content"
import type { Lang } from "@/lib/i18n"

const FRAMES = [
  "/branding/hero-mascot/1782316585580.jpeg",
  "/branding/hero-mascot/1782316630158.jpeg",
  "/branding/hero-mascot/1782316616590.jpeg",
  "/branding/hero-mascot/1782316622020.jpeg",
]

export function HeroMascotShowcase({ lang }: { lang: Lang }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % FRAMES.length)
    }, 1800)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="mascot-showcase" aria-label={UI[lang].brand}>
      <div className="mascot-showcase__screen">
        {FRAMES.map((src, index) => (
          <img
            key={src}
            src={src}
            alt=""
            className="mascot-showcase__frame"
            data-active={index === active ? "true" : undefined}
            data-prev={index === (active - 1 + FRAMES.length) % FRAMES.length ? "true" : undefined}
            data-next={index === (active + 1) % FRAMES.length ? "true" : undefined}
          />
        ))}
        <div className="mascot-showcase__scan" aria-hidden />
        <div className="mascot-showcase__hud" aria-hidden>
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="mascot-showcase__strip" aria-label="Mascot views">
        {FRAMES.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(index)}
            className="mascot-showcase__thumb"
            data-active={index === active ? "true" : undefined}
            aria-label={`Mascot view ${index + 1}`}
          >
            <img src={src} alt="" />
          </button>
        ))}
      </div>
    </div>
  )
}
