interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  all<T = Record<string, unknown>>(): Promise<{ results?: T[] }>;
}

interface Env {
  DB: D1Database;
  MONITOR_USER?: string;
  MONITOR_PASSWORD?: string;
}

type SummaryRow = {
  total_events: number;
  page_views: number;
  contact_clicks: number;
  outbound_clicks: number;
  viewed_pages: number;
  referrer_hosts: number;
};

type TrendRow = {
  day: string;
  page_views: number;
  contact_clicks: number;
  outbound_clicks: number;
};

type PageRow = {
  path: string;
  page_views: number;
  contact_clicks: number;
  outbound_clicks: number;
  contact_rate_percent: number;
};

type LabelCountRow = {
  label: string;
  events: number;
};

type LatestEventRow = {
  event_type: string;
  path: string;
  referrer_host: string;
  country: string;
  browser: string;
  created_at: string;
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return Response.json({ ok: true, service: "manyaitool-geo-monitor" });
    }

    if (!isAuthorized(request, env)) {
      return unauthorized();
    }

    if (url.pathname === "/api/summary") {
      return Response.json(await loadDashboardData(env));
    }

    if (url.pathname !== "/") {
      return Response.redirect(url.origin, 302);
    }

    const data = await loadDashboardData(env);
    return new Response(renderDashboard(data), {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  },
};

async function loadDashboardData(env: Env) {
  const [today, period, trend, pages, referrers, countries, latest] = await Promise.all([
    first<SummaryRow>(
      env,
      `SELECT
        COUNT(*) AS total_events,
        SUM(CASE WHEN event_type = 'page_view' THEN 1 ELSE 0 END) AS page_views,
        SUM(CASE WHEN event_type LIKE 'click_contact_%' THEN 1 ELSE 0 END) AS contact_clicks,
        SUM(CASE WHEN event_type = 'click_outbound' THEN 1 ELSE 0 END) AS outbound_clicks,
        COUNT(DISTINCT CASE WHEN event_type = 'page_view' THEN path END) AS viewed_pages,
        COUNT(DISTINCT NULLIF(referrer_host, '')) AS referrer_hosts
       FROM geo_events
       WHERE date(datetime(created_at, '+8 hours')) = date(datetime('now', '+8 hours'))`,
    ),
    first<SummaryRow>(
      env,
      `SELECT
        COUNT(*) AS total_events,
        SUM(CASE WHEN event_type = 'page_view' THEN 1 ELSE 0 END) AS page_views,
        SUM(CASE WHEN event_type LIKE 'click_contact_%' THEN 1 ELSE 0 END) AS contact_clicks,
        SUM(CASE WHEN event_type = 'click_outbound' THEN 1 ELSE 0 END) AS outbound_clicks,
        COUNT(DISTINCT CASE WHEN event_type = 'page_view' THEN path END) AS viewed_pages,
        COUNT(DISTINCT NULLIF(referrer_host, '')) AS referrer_hosts
       FROM geo_events
       WHERE datetime(created_at) >= datetime('now', '-7 days')`,
    ),
    all<TrendRow>(
      env,
      `SELECT
        date(datetime(created_at, '+8 hours')) AS day,
        SUM(CASE WHEN event_type = 'page_view' THEN 1 ELSE 0 END) AS page_views,
        SUM(CASE WHEN event_type LIKE 'click_contact_%' THEN 1 ELSE 0 END) AS contact_clicks,
        SUM(CASE WHEN event_type = 'click_outbound' THEN 1 ELSE 0 END) AS outbound_clicks
       FROM geo_events
       WHERE datetime(created_at) >= datetime('now', '-7 days')
       GROUP BY date(datetime(created_at, '+8 hours'))
       ORDER BY day DESC
       LIMIT 7`,
    ),
    all<PageRow>(
      env,
      `WITH page_events AS (
        SELECT
          path,
          SUM(CASE WHEN event_type = 'page_view' THEN 1 ELSE 0 END) AS page_views,
          SUM(CASE WHEN event_type LIKE 'click_contact_%' THEN 1 ELSE 0 END) AS contact_clicks,
          SUM(CASE WHEN event_type = 'click_outbound' THEN 1 ELSE 0 END) AS outbound_clicks
        FROM geo_events
        WHERE datetime(created_at) >= datetime('now', '-7 days')
        GROUP BY path
      )
      SELECT
        path,
        page_views,
        contact_clicks,
        outbound_clicks,
        CASE
          WHEN page_views = 0 THEN 0
          ELSE ROUND(CAST(contact_clicks AS REAL) * 100 / page_views, 2)
        END AS contact_rate_percent
      FROM page_events
      WHERE page_views > 0
      ORDER BY page_views DESC, contact_clicks DESC, outbound_clicks DESC, path ASC
      LIMIT 30`,
    ),
    all<LabelCountRow>(
      env,
      `SELECT
        COALESCE(NULLIF(referrer_host, ''), '(direct / unknown)') AS label,
        COUNT(*) AS events
       FROM geo_events
       WHERE datetime(created_at) >= datetime('now', '-7 days')
       GROUP BY COALESCE(NULLIF(referrer_host, ''), '(direct / unknown)')
       ORDER BY events DESC
       LIMIT 20`,
    ),
    all<LabelCountRow>(
      env,
      `SELECT
        COALESCE(NULLIF(country, ''), '(unknown)') AS label,
        COUNT(*) AS events
       FROM geo_events
       WHERE datetime(created_at) >= datetime('now', '-7 days')
       GROUP BY COALESCE(NULLIF(country, ''), '(unknown)')
       ORDER BY events DESC
       LIMIT 20`,
    ),
    all<LatestEventRow>(
      env,
      `SELECT
        event_type,
        path,
        COALESCE(NULLIF(referrer_host, ''), '(direct / unknown)') AS referrer_host,
        COALESCE(NULLIF(country, ''), '(unknown)') AS country,
        browser,
        created_at
       FROM geo_events
       ORDER BY id DESC
       LIMIT 50`,
    ),
  ]);

  const safeToday = normalizeSummary(today);
  const safePeriod = normalizeSummary(period);

  return {
    generatedAt: new Date().toISOString(),
    today: safeToday,
    period: safePeriod,
    trend: trend.map(normalizeTrend),
    pages: pages.map(normalizePage),
    referrers: referrers.map(normalizeLabelCount),
    countries: countries.map(normalizeLabelCount),
    latest: latest.map((row) => ({
      event_type: row.event_type ?? "",
      path: row.path ?? "",
      referrer_host: row.referrer_host ?? "",
      country: row.country ?? "",
      browser: row.browser ?? "",
      created_at: row.created_at ?? "",
    })),
    actions: buildActions(safeToday, safePeriod, pages.map(normalizePage)),
  };
}

function renderDashboard(data: Awaited<ReturnType<typeof loadDashboardData>>): string {
  const today = data.today;
  const period = data.period;
  const topNoContact = data.pages.filter((page) => page.page_views > 0 && page.contact_clicks === 0).slice(0, 8);

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title>ManyAItools GEO 监控</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f6f2e8;
      --panel: #fffdf7;
      --ink: #111;
      --muted: #666;
      --line: #111;
      --yellow: #ffc224;
      --blue: #2f81f7;
      --red: #ef4444;
      --green: #16a34a;
    }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg); color: var(--ink); font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    a { color: inherit; }
    .shell { max-width: 1280px; margin: 0 auto; padding: 22px; }
    .topbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; border: 3px solid var(--line); background: white; border-radius: 12px; padding: 14px 16px; box-shadow: 5px 5px 0 #111; }
    .brand { display: flex; align-items: center; gap: 12px; min-width: 0; }
    .mark { width: 38px; height: 38px; display: grid; place-items: center; border: 2px solid #111; border-radius: 9px; background: var(--yellow); font-weight: 1000; }
    .brand h1 { margin: 0; font-size: 20px; line-height: 1.1; }
    .brand p { margin: 2px 0 0; color: var(--muted); font-size: 12px; font-weight: 700; }
    .toolbar { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 8px; }
    .btn { display: inline-flex; align-items: center; justify-content: center; min-height: 36px; border: 2px solid #111; border-radius: 8px; background: white; padding: 0 12px; font-size: 13px; font-weight: 900; text-decoration: none; }
    .btn.primary { background: var(--yellow); }
    .hero { margin-top: 24px; display: grid; gap: 18px; grid-template-columns: 1.2fr .8fr; }
    .card { border: 3px solid var(--line); background: var(--panel); border-radius: 10px; padding: 20px; box-shadow: 4px 4px 0 #111; }
    .card.dark { background: #111; color: white; }
    .eyebrow { margin: 0 0 8px; font-size: 12px; font-weight: 1000; color: var(--muted); text-transform: uppercase; }
    .dark .eyebrow { color: rgba(255,255,255,.7); }
    .headline { margin: 0; font-size: clamp(30px, 4vw, 54px); line-height: 1; letter-spacing: 0; }
    .sub { margin: 14px 0 0; color: #333; font-weight: 750; line-height: 1.7; }
    .dark .sub { color: rgba(255,255,255,.78); }
    .metrics { margin-top: 22px; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
    .metric { border: 3px solid #111; border-radius: 10px; background: white; padding: 16px; min-height: 118px; }
    .metric strong { display: block; font-size: 34px; line-height: 1; }
    .metric span { display: block; margin-top: 10px; color: var(--muted); font-weight: 900; font-size: 13px; }
    .metric.good strong { color: var(--green); }
    .metric.warn strong { color: var(--red); }
    .grid { margin-top: 22px; display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
    .wide { grid-column: 1 / -1; }
    h2 { margin: 0 0 14px; font-size: 22px; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th, td { border-top: 2px solid #111; padding: 10px 8px; text-align: left; vertical-align: top; }
    th { font-size: 12px; color: #555; text-transform: uppercase; }
    .path { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; word-break: break-all; }
    .pill { display: inline-block; border: 2px solid #111; border-radius: 999px; padding: 3px 8px; background: var(--yellow); font-size: 12px; font-weight: 900; }
    .actions { margin: 0; padding-left: 18px; }
    .actions li { margin: 0 0 10px; font-weight: 800; line-height: 1.55; }
    .empty { color: var(--muted); font-weight: 800; }
    .barrow { display: grid; grid-template-columns: 110px 1fr 52px; align-items: center; gap: 10px; margin: 10px 0; font-size: 13px; font-weight: 850; }
    .bar { height: 14px; border: 2px solid #111; border-radius: 999px; background: white; overflow: hidden; }
    .fill { height: 100%; background: var(--blue); }
    footer { margin: 24px 0 6px; color: var(--muted); font-size: 12px; font-weight: 800; text-align: center; }
    @media (max-width: 900px) {
      .hero, .grid { grid-template-columns: 1fr; }
      .metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 560px) {
      .shell { padding: 12px; }
      .topbar { align-items: flex-start; flex-direction: column; }
      .toolbar { justify-content: flex-start; }
      .metrics { grid-template-columns: 1fr; }
      table { font-size: 12px; }
      th, td { padding: 8px 6px; }
    }
  </style>
</head>
<body>
  <div class="shell">
    <header class="topbar">
      <div class="brand">
        <div class="mark">GEO</div>
        <div>
          <h1>ManyAItools GEO 监控</h1>
          <p>每天对账：访问、来源、页面转化、联系点击</p>
        </div>
      </div>
      <nav class="toolbar">
        <a class="btn primary" href="/">刷新数据</a>
        <a class="btn" href="https://manyaitool.com/work-with-me" target="_blank" rel="noreferrer">业务页</a>
        <a class="btn" href="https://manyaitool.com/llms.txt" target="_blank" rel="noreferrer">llms.txt</a>
        <a class="btn" href="/api/summary">JSON</a>
      </nav>
    </header>

    <section class="hero">
      <article class="card dark">
        <p class="eyebrow">今日效果</p>
        <h2 class="headline">${escapeHtml(String(today.page_views))} 次访问，${escapeHtml(String(today.contact_clicks))} 次联系点击</h2>
        <p class="sub">今日联系转化率 ${escapeHtml(rate(today.contact_clicks, today.page_views))}。最近 7 天联系转化率 ${escapeHtml(rate(period.contact_clicks, period.page_views))}。</p>
      </article>
      <article class="card">
        <p class="eyebrow">今天该看什么</p>
        <ul class="actions">${data.actions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </article>
    </section>

    <section class="metrics">
      ${metric("今日访问", today.page_views)}
      ${metric("今日联系", today.contact_clicks, today.contact_clicks > 0 ? "good" : "warn")}
      ${metric("今日外链", today.outbound_clicks)}
      ${metric("联系转化率", rate(today.contact_clicks, today.page_views), today.contact_clicks > 0 ? "good" : "warn")}
      ${metric("7天访问", period.page_views)}
      ${metric("7天联系", period.contact_clicks, period.contact_clicks > 0 ? "good" : "warn")}
      ${metric("访问页面", period.viewed_pages)}
      ${metric("来源域名", period.referrer_hosts)}
    </section>

    <section class="grid">
      <article class="card wide">
        <h2>7 天趋势</h2>
        ${renderTrend(data.trend)}
      </article>

      <article class="card">
        <h2>有访问但没联系的页面</h2>
        ${topNoContact.length ? table(["页面", "访问", "外链"], topNoContact.map((row) => [code(row.path), row.page_views, row.outbound_clicks])) : `<p class="empty">暂无此类页面</p>`}
      </article>

      <article class="card">
        <h2>来源域名</h2>
        ${table(["来源", "事件"], data.referrers.map((row) => [row.label, row.events]))}
      </article>

      <article class="card">
        <h2>页面转化</h2>
        ${table(["页面", "访问", "联系", "外链", "转化率"], data.pages.map((row) => [code(row.path), row.page_views, row.contact_clicks, row.outbound_clicks, `${row.contact_rate_percent}%`]))}
      </article>

      <article class="card">
        <h2>国家 / 地区</h2>
        ${table(["国家", "事件"], data.countries.map((row) => [row.label, row.events]))}
      </article>

      <article class="card wide">
        <h2>最新日志</h2>
        ${table(
          ["时间", "事件", "页面", "来源", "地区", "浏览器"],
          data.latest.map((row) => [
            formatShanghai(row.created_at),
            `<span class="pill">${escapeHtml(row.event_type)}</span>`,
            code(row.path),
            row.referrer_host,
            row.country,
            row.browser,
          ]),
        )}
      </article>
    </section>

    <footer>生成时间：${escapeHtml(formatShanghai(data.generatedAt))} · 数据源：Cloudflare D1 manyaitool-geo-analytics</footer>
  </div>
</body>
</html>`;
}

function buildActions(today: SummaryRow, period: SummaryRow, pages: PageRow[]): string[] {
  const actions: string[] = [];
  const noContactPages = pages.filter((page) => page.page_views > 0 && page.contact_clicks === 0).slice(0, 5);

  if (today.page_views > 0 && today.contact_clicks === 0) {
    actions.push("今天有访问但没有联系点击：检查 /work-with-me、首页和产品页 CTA 是否足够明显。");
  }
  if (period.contact_clicks === 0 && period.page_views > 0) {
    actions.push("最近 7 天没有联系点击：继续观察业务页入口位置、按钮文案和外链分流。");
  }
  if (noContactPages.length) {
    actions.push(`有访问没联系的页面：${noContactPages.map((page) => page.path).join("、")}。`);
  }
  if (period.outbound_clicks > period.contact_clicks) {
    actions.push("外链点击多于联系点击：用户可能被工具外链带走，业务联系入口要前置。");
  }
  if (period.referrer_hosts <= 2) {
    actions.push("来源域名还少：下一步接 GSC，补搜索 query、曝光、点击。");
  }
  if (!actions.length) {
    actions.push("今天没有明显异常：继续看 Top 页面、来源域名和联系转化率。");
  }
  return actions;
}

async function first<T>(env: Env, sql: string): Promise<T | null> {
  return env.DB.prepare(sql).first<T>();
}

async function all<T>(env: Env, sql: string): Promise<T[]> {
  const result = await env.DB.prepare(sql).all<T>();
  return result.results ?? [];
}

function normalizeSummary(row: SummaryRow | null): SummaryRow {
  return {
    total_events: Number(row?.total_events ?? 0),
    page_views: Number(row?.page_views ?? 0),
    contact_clicks: Number(row?.contact_clicks ?? 0),
    outbound_clicks: Number(row?.outbound_clicks ?? 0),
    viewed_pages: Number(row?.viewed_pages ?? 0),
    referrer_hosts: Number(row?.referrer_hosts ?? 0),
  };
}

function normalizeTrend(row: TrendRow): TrendRow {
  return {
    day: row.day ?? "",
    page_views: Number(row.page_views ?? 0),
    contact_clicks: Number(row.contact_clicks ?? 0),
    outbound_clicks: Number(row.outbound_clicks ?? 0),
  };
}

function normalizePage(row: PageRow): PageRow {
  return {
    path: row.path ?? "",
    page_views: Number(row.page_views ?? 0),
    contact_clicks: Number(row.contact_clicks ?? 0),
    outbound_clicks: Number(row.outbound_clicks ?? 0),
    contact_rate_percent: Number(row.contact_rate_percent ?? 0),
  };
}

function normalizeLabelCount(row: LabelCountRow): LabelCountRow {
  return {
    label: row.label ?? "",
    events: Number(row.events ?? 0),
  };
}

function metric(label: string, value: string | number, state = ""): string {
  return `<div class="metric ${state}"><strong>${escapeHtml(String(value))}</strong><span>${escapeHtml(label)}</span></div>`;
}

function table(headers: string[], rows: Array<Array<string | number>>): string {
  if (!rows.length) {
    return `<p class="empty">暂无数据</p>`;
  }
  return `<table><thead><tr>${headers.map((item) => `<th>${escapeHtml(item)}</th>`).join("")}</tr></thead><tbody>${rows
    .map((row) => `<tr>${row.map((item) => `<td>${typeof item === "string" && item.startsWith("<") ? item : escapeHtml(String(item))}</td>`).join("")}</tr>`)
    .join("")}</tbody></table>`;
}

function renderTrend(rows: TrendRow[]): string {
  if (!rows.length) {
    return `<p class="empty">暂无趋势数据</p>`;
  }
  const max = Math.max(...rows.map((row) => row.page_views), 1);
  return rows
    .map((row) => {
      const width = Math.max(3, Math.round((row.page_views / max) * 100));
      return `<div class="barrow"><span>${escapeHtml(row.day)}</span><div class="bar"><div class="fill" style="width:${width}%"></div></div><strong>${row.page_views}</strong></div>`;
    })
    .join("");
}

function code(value: string): string {
  return `<span class="path">${escapeHtml(value || "(empty)")}</span>`;
}

function rate(numerator: number, denominator: number): string {
  if (!denominator) return "0%";
  return `${((numerator / denominator) * 100).toFixed(2)}%`;
}

function formatShanghai(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

function isAuthorized(request: Request, env: Env): boolean {
  const password = env.MONITOR_PASSWORD;
  if (!password) return false;

  const header = request.headers.get("Authorization");
  if (!header?.startsWith("Basic ")) return false;

  let decoded = "";
  try {
    decoded = atob(header.slice("Basic ".length));
  } catch {
    return false;
  }

  const splitAt = decoded.indexOf(":");
  if (splitAt < 0) return false;

  const user = decoded.slice(0, splitAt);
  const pass = decoded.slice(splitAt + 1);
  return safeEqual(user, env.MONITOR_USER ?? "duola") && safeEqual(pass, password);
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

function unauthorized(): Response {
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="ManyAItools GEO Monitor", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
