interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<unknown>;
  all<T = Record<string, unknown>>(): Promise<{ results?: T[] }>;
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

type MetricRow = {
  dimension_value: string;
  events: number;
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

  async scheduled(controller: ScheduledController, env: Env): Promise<void> {
    await refreshDailyMetrics(env, previousUtcDay(controller.scheduledTime));
  },
};

declare class ScheduledController {
  scheduledTime: number;
}

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

async function refreshDailyMetrics(env: Env, day: string): Promise<void> {
  const updatedAt = new Date().toISOString();

  await env.DB.prepare("DELETE FROM geo_daily_metrics WHERE day = ?").bind(day).run();

  await insertMetricRows(env, day, "total_events", "all", updatedAt, [
    {
      dimension_value: "all",
      events: await countForDay(env, day),
    },
  ]);

  await insertMetricRows(
    env,
    day,
    "events_by_type",
    "event_type",
    updatedAt,
    await selectMetricRows(
      env,
      `SELECT event_type AS dimension_value, COUNT(*) AS events
       FROM geo_events
       WHERE date(datetime(created_at)) = ?
       GROUP BY event_type
       ORDER BY events DESC`,
      day,
    ),
  );

  await insertMetricRows(
    env,
    day,
    "top_pages",
    "path",
    updatedAt,
    await selectMetricRows(
      env,
      `SELECT path AS dimension_value, COUNT(*) AS events
       FROM geo_events
       WHERE event_type = 'page_view'
         AND date(datetime(created_at)) = ?
       GROUP BY path
       ORDER BY events DESC
       LIMIT 100`,
      day,
    ),
  );

  await insertMetricRows(
    env,
    day,
    "referrers",
    "referrer_host",
    updatedAt,
    await selectMetricRows(
      env,
      `SELECT COALESCE(NULLIF(referrer_host, ''), '(direct / unknown)') AS dimension_value,
              COUNT(*) AS events
       FROM geo_events
       WHERE date(datetime(created_at)) = ?
       GROUP BY COALESCE(NULLIF(referrer_host, ''), '(direct / unknown)')
       ORDER BY events DESC
       LIMIT 100`,
      day,
    ),
  );

  await insertMetricRows(
    env,
    day,
    "countries",
    "country",
    updatedAt,
    await selectMetricRows(
      env,
      `SELECT COALESCE(NULLIF(country, ''), '(unknown)') AS dimension_value,
              COUNT(*) AS events
       FROM geo_events
       WHERE date(datetime(created_at)) = ?
       GROUP BY COALESCE(NULLIF(country, ''), '(unknown)')
       ORDER BY events DESC
       LIMIT 100`,
      day,
    ),
  );

  await insertMetricRows(
    env,
    day,
    "contact_clicks",
    "event_target",
    updatedAt,
    await selectMetricRows(
      env,
      `SELECT event_type || ' ' || COALESCE(NULLIF(target, ''), '(empty)') AS dimension_value,
              COUNT(*) AS events
       FROM geo_events
       WHERE event_type LIKE 'click_contact_%'
         AND date(datetime(created_at)) = ?
       GROUP BY event_type, COALESCE(NULLIF(target, ''), '(empty)')
       ORDER BY events DESC
       LIMIT 100`,
      day,
    ),
  );

  await insertMetricRows(
    env,
    day,
    "outbound_clicks",
    "target",
    updatedAt,
    await selectMetricRows(
      env,
      `SELECT COALESCE(NULLIF(target, ''), '(empty)') AS dimension_value,
              COUNT(*) AS events
       FROM geo_events
       WHERE event_type = 'click_outbound'
         AND date(datetime(created_at)) = ?
       GROUP BY COALESCE(NULLIF(target, ''), '(empty)')
       ORDER BY events DESC
       LIMIT 100`,
      day,
    ),
  );
}

async function countForDay(env: Env, day: string): Promise<number> {
  const rows = await selectMetricRows(
    env,
    `SELECT 'all' AS dimension_value, COUNT(*) AS events
     FROM geo_events
     WHERE date(datetime(created_at)) = ?`,
    day,
  );
  return rows[0]?.events ?? 0;
}

async function selectMetricRows(env: Env, sql: string, day: string): Promise<MetricRow[]> {
  const result = await env.DB.prepare(sql).bind(day).all<MetricRow>();
  return (result.results ?? []).map((row) => ({
    dimension_value: String(row.dimension_value ?? ""),
    events: Number(row.events ?? 0),
  }));
}

async function insertMetricRows(
  env: Env,
  day: string,
  metric: string,
  dimension: string,
  updatedAt: string,
  rows: MetricRow[],
): Promise<void> {
  for (const row of rows) {
    await env.DB.prepare(
      `INSERT OR REPLACE INTO geo_daily_metrics (
        day,
        metric,
        dimension,
        dimension_value,
        events,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?)`,
    )
      .bind(day, metric, dimension, row.dimension_value, row.events, updatedAt)
      .run();
  }
}

function previousUtcDay(scheduledTime: number): string {
  return new Date(scheduledTime - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
}
