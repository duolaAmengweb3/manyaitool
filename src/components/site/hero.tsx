"use client"

import { ArrowDown } from "lucide-react"
import { UI, X_URL, TG_URL } from "@/lib/site-content"
import type { Lang } from "@/lib/i18n"
import { XIcon, TelegramIcon } from "@/components/site/icons"
import { CodeStats } from "@/components/site/code-stats"
import { HeroMascotShowcase } from "@/components/site/hero-mascot-showcase"

export function SiteHero({ lang }: { lang: Lang }) {
  const t = UI[lang].hero
  const isEnglish = lang === "en"

  return (
    <section id="home" className="container mx-auto px-4 pt-10 pb-12 md:pt-16 md:pb-20">
      <div className="grid items-center gap-10 md:grid-cols-[2fr_1fr] md:gap-12">
        {/* Copy */}
        <div className="space-y-6">
          <h1 className="text-[38px] leading-[1.2] md:text-[58px] md:leading-[1.1] lg:text-[62px] font-extrabold tracking-tight">
            {isEnglish ? (
              <>
                <span className="block whitespace-normal md:whitespace-nowrap md:text-[43px] lg:text-[48px] xl:text-[52px]">
                  {t.titleLead}
                  <span className="inline-block bg-[#FF6B7A] px-3 py-0.5 text-white">
                    {t.titleHighlight1}
                  </span>
                </span>
                <span className="block whitespace-normal md:whitespace-nowrap md:text-[52px] lg:text-[58px] xl:text-[62px]">
                  <span className="inline-block bg-[#2F81F7] px-3 py-0.5 text-white">
                    {t.titleHighlight2}
                  </span>
                  {t.titleTail}
                </span>
              </>
            ) : (
              <>
                {t.titleLead}
                <span className="inline-block bg-[#FF6B7A] px-3 py-0.5 text-white">
                  {t.titleHighlight1}
                </span>
                {t.titleMid}
                <br className="hidden md:block" />
                <span className="inline-block bg-[#2F81F7] px-3 py-0.5 text-white">
                  {t.titleHighlight2}
                </span>
                {t.titleTail}
              </>
            )}
          </h1>

          <p className="text-[18px] md:text-[20px] font-medium leading-[1.6] text-[#393939]">
            {t.subtitle}
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="#products"
              className="inline-flex h-auto items-center justify-center gap-2 rounded-lg border-[3px] border-black bg-[#FFC224] px-8 py-4 text-base font-bold text-black shadow-brutal-sm transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal"
            >
              {t.ctaProducts}
              <ArrowDown className="h-5 w-5" />
            </a>
            <a
              href={X_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-auto items-center justify-center gap-2 rounded-lg border-[3px] border-black bg-[#0B0B0B] px-8 py-4 text-base font-bold text-white shadow-brutal-sm transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal"
            >
              <XIcon className="h-5 w-5" />
              {t.ctaX}
            </a>
            <a
              href={TG_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="inline-flex h-auto items-center justify-center rounded-lg border-[3px] border-black bg-[#2F81F7] px-6 py-4 text-white shadow-brutal-sm transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal"
            >
              <TelegramIcon className="h-6 w-6" />
            </a>
          </div>

          {/* 代码量数据（GitHub） */}
          <CodeStats lang={lang} />
        </div>

        {/* Mascot card */}
        <div className="flex justify-center md:justify-end">
          <HeroMascotShowcase lang={lang} />
        </div>
      </div>
    </section>
  )
}
