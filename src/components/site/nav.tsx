"use client"

import Link from "next/link"
import { UI, X_URL, TG_URL, GITHUB_URL } from "@/lib/site-content"
import { LANGS, LOCALE_PATH, type Lang } from "@/lib/i18n"
import { XIcon, TelegramIcon, GithubIcon } from "@/components/site/icons"

const iconBtn =
  "flex h-9 w-9 items-center justify-center rounded-lg border-2 border-black bg-white transition-all hover:bg-[#FFC224] active:translate-y-[1px]"

export function SiteNav({ lang }: { lang: Lang }) {
  const t = UI[lang]

  return (
    <header className="container mx-auto px-4 pt-5 pb-2">
      <nav className="flex items-center justify-between gap-3 bg-white border-[3px] border-black rounded-xl px-4 py-2.5 shadow-brutal-sm">
        <Link href={LOCALE_PATH[lang]} className="flex items-center gap-2.5 min-w-0">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border-2 border-black bg-[#FFC224] overflow-hidden">
            <img src="/branding/logo-library/logoduolai.png" alt="logo" className="h-full w-full object-cover scale-110" />
          </span>
          <span className="truncate text-base md:text-lg font-extrabold tracking-tight">
            {t.brand}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border-2 border-black bg-white overflow-hidden">
            {LANGS.map((l, i) => (
              <Link
                key={l.code}
                href={LOCALE_PATH[l.code]}
                aria-current={lang === l.code ? "true" : undefined}
                className={`h-9 px-2.5 flex items-center text-sm font-bold transition-all ${i > 0 ? "border-l-2 border-black" : ""} ${
                  lang === l.code ? "bg-[#FFC224]" : "bg-white hover:bg-[#FFF3D1]"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <a href={X_URL} target="_blank" rel="noopener noreferrer" aria-label="X" className={iconBtn}>
            <XIcon className="h-4 w-4" />
          </a>
          <a href={TG_URL} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className={iconBtn}>
            <TelegramIcon className="h-[18px] w-[18px]" />
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconBtn}>
            <GithubIcon className="h-[18px] w-[18px]" />
          </a>
        </div>
      </nav>
    </header>
  )
}
