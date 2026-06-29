import type { Metadata } from "next"
import { GeoBusinessPage } from "@/components/site/GeoBusinessPage"
import { getGeoPage } from "@/data/geo-pages"
import { SITE_URL } from "@/lib/constants"

const page = getGeoPage("web3-tools-development")

export const metadata: Metadata = {
  title: { absolute: page.metaTitle },
  description: page.description,
  alternates: { canonical: `${SITE_URL}${page.href}` },
  openGraph: { title: page.metaTitle, description: page.description, url: `${SITE_URL}${page.href}`, type: "website" },
}

export default function Web3ToolsDevelopmentPage() {
  return <GeoBusinessPage page={page} />
}
