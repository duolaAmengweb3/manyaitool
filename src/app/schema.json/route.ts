import { buildSchemaJson } from "@/lib/ai-readable"

export const dynamic = "force-static"

export function GET() {
  return Response.json(buildSchemaJson(), {
    headers: {
      "cache-control": "public, max-age=3600",
    },
  })
}
