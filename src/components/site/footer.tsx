"use client"

import { UI, X_URL, TG_URL, GITHUB_URL } from "@/lib/site-content"
import type { Lang } from "@/lib/i18n"
import { XIcon, TelegramIcon, GithubIcon } from "@/components/site/icons"

export function SiteFooter({ lang }: { lang: Lang }) {
  const t = UI[lang]
  const year = 2026
  return (
    <footer className="border-t-[3px] border-black bg-[#FFFDF7]">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-black bg-[#FFC224] overflow-hidden">
            <img src="/branding/logo-library/logoduolai.png" alt="logo" className="h-6 w-6 object-contain" />
          </span>
          <span className="text-sm font-bold">{t.brand}</span>
        </div>

        <div className="flex items-center gap-5 text-sm font-semibold text-[#393939]">
          <a href={X_URL} target="_blank" rel="noopener noreferrer" aria-label="X" className="flex items-center gap-1.5 hover:text-black">
            <XIcon className="h-4 w-4" />
          </a>
          <a href={TG_URL} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="flex items-center gap-1.5 hover:text-black">
            <TelegramIcon className="h-[18px] w-[18px]" />
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex items-center gap-1.5 hover:text-black">
            <GithubIcon className="h-[18px] w-[18px]" />
          </a>
        </div>

        <p className="text-sm font-medium text-[#6b6b6b]">
          © {year} {t.brand}. {t.footer.rights}.
        </p>
      </div>
    </footer>
  )
}
