import { buildAiIndex } from "@/lib/ai-readable"

export const dynamic = "force-static"

export function GET() {
  return Response.json(buildAiIndex(), {
    headers: {
      "cache-control": "public, max-age=3600",
    },
  })
}
