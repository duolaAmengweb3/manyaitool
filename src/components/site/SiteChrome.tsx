"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { SiteNav } from "@/components/site/nav"
import { SiteFooter } from "@/components/site/footer"
import { langFromPathname } from "@/lib/i18n"

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const lang = langFromPathname(pathname || "/")

  // Root layout statically renders <html lang="en">; correct it per route.
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <>
      <SiteNav lang={lang} />
      <div className="flex-1">{children}</div>
      <SiteFooter lang={lang} />
    </>
  )
}
