import { getProjectById } from "@/data/projects"
import { getAllProductMarkdownParams, getProductMarkdown } from "@/lib/ai-readable"

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return getAllProductMarkdownParams()
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const entry = getProjectById(id)
  if (!entry || !entry.item.url.startsWith("http")) return new Response("Not found", { status: 404 })

  return new Response(getProductMarkdown(entry), {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  })
}
