import { getGeoPage, getGeoPageMarkdown } from "@/data/geo-pages"

export const dynamic = "force-static"

export function GET() {
  return new Response(getGeoPageMarkdown(getGeoPage("ai-agent-development")), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}
