interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<unknown>;
}

interface Env {
  DB: D1Database;
}

interface CfRequest extends Request {
  cf?: {
    country?: string;
    colo?: string;
    botManagement?: {
      verifiedBot?: boolean;
    };
  };
}

type GeoEventPayload = {
  eventId?: unknown;
  type?: unknown;
  path?: unknown;
  referrer?: unknown;
  target?: unknown;
  lang?: unknown;
  title?: unknown;
};

const ALLOWED_HOSTS = new Set(["manyaitool.com", "www.manyaitool.com"]);
const MAX_BODY_BYTES = 8192;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname !== "/__geo_event") {
      return new Response("Not found", { status: 404 });
    }

    if (request.method === "OPTIONS") {
      return withCors(new Response(null, { status: 204 }));
    }

    if (request.method === "GET") {
      return withCors(
        Response.json({
          ok: true,
          service: "manyaitool-geo-analytics",
        }),
      );
    }

    if (request.method !== "POST") {
      return withCors(new Response("Method not allowed", { status: 405 }));
    }

    const origin = request.headers.get("Origin");
    if (origin && !isAllowedOrigin(origin)) {
      return withCors(new Response("Forbidden", { status: 403 }));
    }

    const length = Number(request.headers.get("Content-Length") ?? "0");
    if (length > MAX_BODY_BYTES) {
      return withCors(new Response("Payload too large", { status: 413 }));
    }

    let payload: GeoEventPayload;
    try {
      payload = (await request.json()) as GeoEventPayload;
    } catch {
      return withCors(new Response("Bad request", { status: 400 }));
    }

    const eventType = cleanText(payload.type, 64) || "unknown";
    const eventId = cleanText(payload.eventId, 96) || crypto.randomUUID();
    const path = normalizePath(cleanText(payload.path, 512));
    const referrer = cleanText(payload.referrer, 1024);
    const target = cleanText(payload.target, 1024);
    const lang = cleanText(payload.lang, 32);
    const title = cleanText(payload.title, 240);
    const ua = request.headers.get("User-Agent") ?? "";
    const cfRequest = request as CfRequest;
    const botCategory = classifyBot(ua, cfRequest.cf?.botManagement?.verifiedBot);

    try {
      await env.DB.prepare(
        `INSERT INTO geo_events (
          event_id,
          event_type,
          path,
          referrer,
          referrer_host,
          target,
          lang,
          title,
          country,
          colo,
          browser,
          is_bot,
          bot_category,
          created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
        .bind(
          eventId,
          eventType,
          path,
          referrer,
          hostFromUrl(referrer),
          target,
          lang,
          title,
          cfRequest.cf?.country ?? "",
          cfRequest.cf?.colo ?? "",
          classifyBrowser(ua),
          botCategory ? 1 : 0,
          botCategory,
          new Date().toISOString(),
        )
        .run();
    } catch {
      return withCors(new Response("Storage error", { status: 500 }));
    }

    return withCors(new Response(null, { status: 204 }));
  },
};

function withCors(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", "https://manyaitool.com");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  headers.set("Access-Control-Max-Age", "86400");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function isAllowedOrigin(origin: string): boolean {
  try {
    return ALLOWED_HOSTS.has(new URL(origin).hostname);
  } catch {
    return false;
  }
}

function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function normalizePath(path: string): string {
  if (!path) {
    return "/";
  }

  if (path.startsWith("/")) {
    return path;
  }

  try {
    return new URL(path).pathname;
  } catch {
    return "/";
  }
}

function hostFromUrl(value: string): string {
  if (!value) {
    return "";
  }

  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function classifyBrowser(userAgent: string): string {
  const ua = userAgent.toLowerCase();

  if (!ua) return "Unknown";
  if (ua.includes("googlebot")) return "GoogleBot";
  if (ua.includes("bingbot")) return "BingBot";
  if (ua.includes("yandexbot")) return "YandexBot";
  if (ua.includes("gptbot") || ua.includes("chatgpt")) return "OpenAI Crawler";
  if (ua.includes("perplexity")) return "PerplexityBot";
  if (ua.includes("claudebot") || ua.includes("anthropic-ai")) return "ClaudeBot";
  if (ua.includes("bot") || ua.includes("crawler") || ua.includes("spider")) return "Bot";
  if (ua.includes("edg/")) return "Edge";
  if (ua.includes("firefox/")) return "Firefox";
  if (ua.includes("safari/") && !ua.includes("chrome/") && !ua.includes("chromium/")) return "Safari";
  if (ua.includes("chrome/") || ua.includes("chromium/")) return "Chrome";
  return "Other";
}

function classifyBot(userAgent: string, verifiedBot?: boolean): string {
  const ua = userAgent.toLowerCase();

  if (ua.includes("gptbot") || ua.includes("chatgpt") || ua.includes("oai-searchbot")) {
    return "AI Crawler";
  }
  if (ua.includes("perplexity")) {
    return "AI Crawler";
  }
  if (ua.includes("claudebot") || ua.includes("anthropic-ai")) {
    return "AI Crawler";
  }
  if (ua.includes("googlebot")) {
    return "Search Bot";
  }
  if (ua.includes("bingbot")) {
    return "Search Bot";
  }
  if (ua.includes("yandexbot")) {
    return "Search Bot";
  }
  if (verifiedBot || ua.includes("bot") || ua.includes("crawler") || ua.includes("spider")) {
    return "Bot";
  }
  return "";
}
