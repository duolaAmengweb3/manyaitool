import { getAllToolMarkdownParams, getToolMarkdown } from "@/lib/ai-readable"
import { getMetaBySlug } from "@/tools"

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return getAllToolMarkdownParams()
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const tool = getMetaBySlug(slug)
  if (!tool) return new Response("Not found", { status: 404 })

  return new Response(getToolMarkdown(tool), {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  })
}
