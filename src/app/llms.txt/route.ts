import { buildLlmsTxt } from "@/lib/ai-readable"

export const dynamic = "force-static"

export function GET() {
  return new Response(buildLlmsTxt(false), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  })
}
