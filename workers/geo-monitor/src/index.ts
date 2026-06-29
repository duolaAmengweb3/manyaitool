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

type CfTrafficSummaryRow = {
  requests: number;
  visits: number;
  page_views: number;
  uniques: number;
  edge_response_bytes: number;
  hosts: number;
  days: number;
  latest_day: string;
  updated_at: string;
};

type CfTrafficTrendRow = {
  day: string;
  requests: number;
  visits: number;
  page_views: number;
  uniques: number;
  edge_response_bytes: number;
};

type CfTrafficHostRow = {
  host: string;
  requests: number;
  visits: number;
  page_views: number;
  uniques: number;
  edge_response_bytes: number;
};

type ActionLogRow = {
  day: string;
  sequence: number;
  category: string;
  action: string;
  target: string;
  status: string;
  owner: string;
  shipped_at: string;
  expected_impact: string;
  evidence: string;
  notes: string;
};

type ActionDayRow = {
  day: string;
  actions: number;
  categories: string;
};

type CfActionSummaryRow = {
  requests: number;
  page_views: number;
  uniques: number;
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return Response.json({ ok: true, service: "manyaitool-geo-monitor" });
    }

    const days = parseDays(url.searchParams.get("days"));
    const requestedActionDay = parseActionDay(url.searchParams.get("actionDay"));

    if (url.pathname === "/api/summary") {
      return Response.json(await loadDashboardData(env, days, requestedActionDay));
    }

    if (url.pathname !== "/") {
      return Response.redirect(url.origin, 302);
    }

    const data = await loadDashboardData(env, days, requestedActionDay);
    return new Response(renderDashboard(data), {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  },
};

async function loadDashboardData(env: Env, days: number, requestedActionDay: string) {
  const range = `-${days} days`;
  const latestActionDay = await first<{ day: string }>(
    env,
    "SELECT day FROM geo_action_logs GROUP BY day ORDER BY day DESC LIMIT 1",
  );
  const selectedActionDay = parseActionDay(requestedActionDay) || parseActionDay(latestActionDay?.day ?? "") || shanghaiDate(new Date());
  const [today, period, trend, pages, referrers, countries, latest, cfSummary, cfTrend, cfHosts, actionDays, actionLogs, actionDaySummary, actionWindowSummary, cfActionDay, cfPreviousDay, cfActionWindow] = await Promise.all([
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
       WHERE datetime(created_at) >= datetime('now', '${range}')`,
    ),
    all<TrendRow>(
      env,
      `SELECT
        date(datetime(created_at, '+8 hours')) AS day,
        SUM(CASE WHEN event_type = 'page_view' THEN 1 ELSE 0 END) AS page_views,
        SUM(CASE WHEN event_type LIKE 'click_contact_%' THEN 1 ELSE 0 END) AS contact_clicks,
        SUM(CASE WHEN event_type = 'click_outbound' THEN 1 ELSE 0 END) AS outbound_clicks
       FROM geo_events
       WHERE datetime(created_at) >= datetime('now', '${range}')
       GROUP BY date(datetime(created_at, '+8 hours'))
       ORDER BY day DESC
       LIMIT ${days}`,
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
        WHERE datetime(created_at) >= datetime('now', '${range}')
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
       WHERE datetime(created_at) >= datetime('now', '${range}')
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
       WHERE datetime(created_at) >= datetime('now', '${range}')
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
    first<CfTrafficSummaryRow>(
      env,
      `SELECT
        COALESCE(SUM(requests), 0) AS requests,
        COALESCE(SUM(visits), 0) AS visits,
        COALESCE(SUM(page_views), 0) AS page_views,
        COALESCE(SUM(uniques), 0) AS uniques,
        COALESCE(SUM(edge_response_bytes), 0) AS edge_response_bytes,
        COUNT(DISTINCT host) AS hosts,
        COUNT(DISTINCT day) AS days,
        COALESCE(MAX(day), '') AS latest_day,
        COALESCE(MAX(updated_at), '') AS updated_at
       FROM cf_daily_traffic
       WHERE date(day) >= date('now', '${range}')`,
    ),
    all<CfTrafficTrendRow>(
      env,
      `SELECT
        day,
        COALESCE(SUM(requests), 0) AS requests,
        COALESCE(SUM(visits), 0) AS visits,
        COALESCE(SUM(page_views), 0) AS page_views,
        COALESCE(SUM(uniques), 0) AS uniques,
        COALESCE(SUM(edge_response_bytes), 0) AS edge_response_bytes
       FROM cf_daily_traffic
       WHERE date(day) >= date('now', '${range}')
       GROUP BY day
       ORDER BY day DESC
       LIMIT ${days}`,
    ),
    all<CfTrafficHostRow>(
      env,
      `SELECT
        host,
        COALESCE(SUM(requests), 0) AS requests,
        COALESCE(SUM(visits), 0) AS visits,
        COALESCE(SUM(page_views), 0) AS page_views,
        COALESCE(SUM(uniques), 0) AS uniques,
        COALESCE(SUM(edge_response_bytes), 0) AS edge_response_bytes
       FROM cf_daily_traffic
       WHERE date(day) >= date('now', '${range}')
       GROUP BY host
       ORDER BY requests DESC
       LIMIT 10`,
    ),
    all<ActionDayRow>(
      env,
      `SELECT
        day,
        COUNT(*) AS actions,
        GROUP_CONCAT(DISTINCT category) AS categories
       FROM geo_action_logs
       GROUP BY day
       ORDER BY day DESC
       LIMIT 90`,
    ),
    all<ActionLogRow>(
      env,
      `SELECT
        day,
        sequence,
        category,
        action,
        COALESCE(target, '') AS target,
        status,
        owner,
        COALESCE(shipped_at, '') AS shipped_at,
        COALESCE(expected_impact, '') AS expected_impact,
        COALESCE(evidence, '') AS evidence,
        COALESCE(notes, '') AS notes
       FROM geo_action_logs
       WHERE day = '${selectedActionDay}'
       ORDER BY sequence ASC, id ASC`,
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
       WHERE date(datetime(created_at, '+8 hours')) = date('${selectedActionDay}')`,
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
       WHERE date(datetime(created_at, '+8 hours')) >= date('${selectedActionDay}')
         AND date(datetime(created_at, '+8 hours')) < date('${selectedActionDay}', '+7 days')`,
    ),
    first<CfActionSummaryRow>(
      env,
      `SELECT
        COALESCE(SUM(requests), 0) AS requests,
        COALESCE(SUM(page_views), 0) AS page_views,
        COALESCE(SUM(uniques), 0) AS uniques
       FROM cf_daily_traffic
       WHERE day = date('${selectedActionDay}')`,
    ),
    first<CfActionSummaryRow>(
      env,
      `SELECT
        COALESCE(SUM(requests), 0) AS requests,
        COALESCE(SUM(page_views), 0) AS page_views,
        COALESCE(SUM(uniques), 0) AS uniques
       FROM cf_daily_traffic
       WHERE day = date('${selectedActionDay}', '-1 day')`,
    ),
    first<CfActionSummaryRow>(
      env,
      `SELECT
        COALESCE(SUM(requests), 0) AS requests,
        COALESCE(SUM(page_views), 0) AS page_views,
        COALESCE(SUM(uniques), 0) AS uniques
       FROM cf_daily_traffic
       WHERE day >= date('${selectedActionDay}')
         AND day < date('${selectedActionDay}', '+7 days')`,
    ),
  ]);

  const safeToday = normalizeSummary(today);
  const safePeriod = normalizeSummary(period);

  return {
    generatedAt: new Date().toISOString(),
    rangeDays: days,
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
    cfTraffic: {
      summary: normalizeCfTrafficSummary(cfSummary),
      trend: cfTrend.map(normalizeCfTrafficTrend),
      hosts: cfHosts.map(normalizeCfTrafficHost),
    },
    actionLog: {
      selectedDay: selectedActionDay,
      days: actionDays.map(normalizeActionDay),
      entries: actionLogs.map(normalizeActionLog),
      impact: {
        actionDay: normalizeSummary(actionDaySummary),
        actionWindow: normalizeSummary(actionWindowSummary),
        cfActionDay: normalizeCfActionSummary(cfActionDay),
        cfPreviousDay: normalizeCfActionSummary(cfPreviousDay),
        cfActionWindow: normalizeCfActionSummary(cfActionWindow),
      },
    },
    actions: buildActions(safeToday, safePeriod, pages.map(normalizePage)),
  };
}

function renderDashboard(data: Awaited<ReturnType<typeof loadDashboardData>>): string {
  const today = data.today;
  const period = data.period;
  const cfTraffic = data.cfTraffic.summary;
  const actionLog = data.actionLog;
  const topNoContact = data.pages.filter((page) => page.page_views > 0 && page.contact_clicks === 0).slice(0, 8);
  const workItems = [
    ["数据管道", "Cloudflare Worker + D1 第一方埋点", "已上线", "记录页面访问、来源域名、国家、联系点击、外链点击。"],
    ["自动汇总", "Worker cron + geo_daily_metrics", "已上线", "每天 UTC 00:15 汇总前一天事件，便于周报/月报。"],
    ["CF 旧数据", "Cloudflare GraphQL 历史流量导入", "已接入", "拉取 Cloudflare zone 级历史 requests、page views、daily uniques。"],
    ["公开 GEO", "5 个业务承接页 + 5 个 markdown 页", "已上线", "/about、/work-with-me、/ai-agent-development、/web3-tools-development、/case-studies。"],
    ["AI 可读", "sitemap / llms.txt / ai-index / schema", "已上线", "让搜索引擎和 AI answer engine 能发现服务页和案例页。"],
    ["对账", "中文 GEO 监控站", "已上线", "当前页面，读取 D1 实时数据。"],
    ["搜索", "Google Search Console", "待接入", "需要一次授权后接入 query、曝光、点击、排名。"],
    ["AI 基线", "OpenAI / Perplexity prompt baseline", "待接入", "后续有 API 预算后接入 AI 提及率和竞品同框。"],
  ];
  const dataSources = [
    ["D1 原始事件", "geo_events", "已接入", "页面访问、点击、来源、国家、浏览器。"],
    ["D1 日汇总", "geo_daily_metrics", "已接入", "每天自动汇总，后续做长期趋势。"],
    ["CF 历史流量", "cf_daily_traffic", "已接入", "Cloudflare 已有的 zone 级历史 requests、page views、daily uniques。"],
    ["JSON 接口", "/api/summary", "已接入", "当前看板同源 JSON 数据。"],
    ["本地日报", "manyaitool-geo/reports/latest-*.md", "已接入", "固定 Markdown 日报入口。"],
    ["GSC", "Search Console API", "待接入", "搜索 query、曝光、点击、CTR、排名。"],
    ["GA4", "Analytics Data API", "可选", "更标准的 session 和渠道归因。"],
  ];

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
      --bg: #f5f6f8;
      --panel: #ffffff;
      --ink: #14171f;
      --muted: #687080;
      --line: #d9dee7;
      --line-strong: #aeb6c4;
      --blue: #2364e8;
      --blue-soft: #e9efff;
      --yellow: #f6c343;
      --green: #138a43;
      --green-soft: #e8f6ee;
      --red: #c93535;
      --red-soft: #fae9e9;
      --purple: #7152cc;
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { margin: 0; background: var(--bg); color: var(--ink); font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    a { color: inherit; }
    .app { min-height: 100vh; display: grid; grid-template-columns: 248px minmax(0, 1fr); }
    .sidebar { position: sticky; top: 0; height: 100vh; border-right: 1px solid var(--line); background: #111827; color: #fff; padding: 18px 14px; }
    .brand { display: flex; align-items: center; gap: 10px; padding: 8px 6px 18px; border-bottom: 1px solid rgba(255,255,255,.14); }
    .mark { width: 36px; height: 36px; display: grid; place-items: center; border-radius: 8px; background: var(--yellow); color: #111; font-weight: 900; }
    .brand h1 { margin: 0; font-size: 15px; line-height: 1.2; }
    .brand p { margin: 2px 0 0; color: rgba(255,255,255,.62); font-size: 12px; font-weight: 700; }
    .nav { display: grid; gap: 4px; margin-top: 16px; }
    .nav a { display: flex; align-items: center; min-height: 34px; border-radius: 6px; padding: 0 10px; color: rgba(255,255,255,.78); text-decoration: none; font-size: 13px; font-weight: 800; }
    .nav a:hover, .nav a.active { background: rgba(255,255,255,.10); color: #fff; }
    .sideMeta { position: absolute; left: 14px; right: 14px; bottom: 18px; border-top: 1px solid rgba(255,255,255,.14); padding-top: 12px; color: rgba(255,255,255,.62); font-size: 12px; font-weight: 700; line-height: 1.6; }
    .main { min-width: 0; padding: 22px; }
    .topbar { display: flex; align-items: flex-start; justify-content: space-between; gap: 18px; margin-bottom: 18px; }
    .title h2 { margin: 0; font-size: 28px; line-height: 1.15; }
    .title p { margin: 7px 0 0; color: var(--muted); font-size: 13px; font-weight: 700; }
    .toolbar { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 8px; }
    .btn { display: inline-flex; align-items: center; justify-content: center; min-height: 34px; border: 1px solid var(--line-strong); border-radius: 6px; background: white; padding: 0 11px; font-size: 13px; font-weight: 850; text-decoration: none; }
    .btn.primary, .btn.active { border-color: var(--blue); background: var(--blue); color: white; }
    .btn.subtle { background: transparent; }
    .dateTabs { display: flex; flex-wrap: wrap; gap: 8px; }
    .section { margin-top: 18px; }
    .sectionHead { display: flex; align-items: flex-end; justify-content: space-between; gap: 12px; margin: 0 0 10px; }
    .sectionHead h3 { margin: 0; font-size: 18px; }
    .sectionHead p { margin: 0; color: var(--muted); font-size: 12px; font-weight: 750; }
    .metrics { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
    .metric { border: 1px solid var(--line); border-radius: 8px; background: var(--panel); padding: 16px; min-height: 112px; }
    .metric strong { display: block; font-size: 30px; line-height: 1; }
    .metric span { display: block; margin-top: 8px; color: var(--muted); font-weight: 800; font-size: 12px; }
    .metric small { display: block; margin-top: 12px; color: var(--muted); font-weight: 750; font-size: 12px; }
    .miniMetrics { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; margin-bottom: 12px; }
    .miniMetrics .metric { min-height: 88px; padding: 12px; }
    .miniMetrics .metric strong { font-size: 24px; }
    .metric.good strong { color: var(--green); }
    .metric.warn strong { color: var(--red); }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .actionLayout { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(320px, .65fr); gap: 12px; }
    .tri { display: grid; grid-template-columns: 1.1fr .9fr .9fr; gap: 12px; }
    .card { border: 1px solid var(--line); background: var(--panel); border-radius: 8px; padding: 16px; }
    .wide { grid-column: 1 / -1; }
    .card h3 { margin: 0 0 12px; font-size: 16px; }
    .cardLead { margin: -4px 0 12px; color: var(--muted); font-size: 12px; font-weight: 750; line-height: 1.5; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th, td { border-top: 1px solid var(--line); padding: 10px 8px; text-align: left; vertical-align: top; }
    th { font-size: 11px; color: var(--muted); text-transform: uppercase; }
    .path { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; word-break: break-all; }
    .pill { display: inline-block; border-radius: 999px; padding: 4px 8px; background: var(--blue-soft); color: var(--blue); font-size: 12px; font-weight: 850; }
    .status { display: inline-flex; align-items: center; border-radius: 999px; padding: 4px 8px; font-size: 12px; font-weight: 850; white-space: nowrap; }
    .status.done { background: var(--green-soft); color: var(--green); }
    .status.wait { background: #fff5dc; color: #8a5b00; }
    .status.opt { background: #eeeafa; color: var(--purple); }
    .actions { margin: 0; padding-left: 18px; }
    .actions li { margin: 0 0 9px; font-weight: 750; line-height: 1.55; }
    .empty { color: var(--muted); font-weight: 800; }
    .bars { display: grid; gap: 10px; }
    .barrow { display: grid; grid-template-columns: 96px 1fr 132px; align-items: center; gap: 10px; font-size: 12px; font-weight: 800; }
    .bar { height: 12px; border-radius: 999px; background: #e8ecf3; overflow: hidden; }
    .fill { height: 100%; background: var(--blue); }
    .todo { display: grid; gap: 8px; }
    .todoItem { display: grid; grid-template-columns: 96px 1fr auto; gap: 10px; align-items: start; border-top: 1px solid var(--line); padding: 10px 0; }
    .todoArea { color: var(--muted); font-size: 12px; font-weight: 850; }
    .todoTitle { font-size: 13px; font-weight: 900; }
    .todoDesc { margin-top: 3px; color: var(--muted); font-size: 12px; font-weight: 700; line-height: 1.45; }
    .sourceGrid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
    .source { border: 1px solid var(--line); border-radius: 8px; padding: 12px; background: #fbfcff; }
    .source b { display: block; font-size: 13px; margin-bottom: 4px; }
    .source code { display: inline-block; margin: 3px 0 8px; color: var(--blue); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; }
    .source p { margin: 0; color: var(--muted); font-size: 12px; font-weight: 700; line-height: 1.5; }
    footer { margin: 22px 0 4px; color: var(--muted); font-size: 12px; font-weight: 750; text-align: center; }
    @media (max-width: 1100px) {
      .app { grid-template-columns: 1fr; }
      .sidebar { position: static; height: auto; }
      .sideMeta { position: static; margin-top: 18px; }
      .tri, .grid, .actionLayout { grid-template-columns: 1fr; }
      .metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .sourceGrid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 560px) {
      .topbar { align-items: flex-start; flex-direction: column; }
      .toolbar { justify-content: flex-start; }
      .metrics { grid-template-columns: 1fr; }
      .sourceGrid { grid-template-columns: 1fr; }
      .todoItem { grid-template-columns: 1fr; }
      table { font-size: 12px; }
      th, td { padding: 8px 6px; }
    }
  </style>
</head>
<body>
  <div class="app">
    <aside class="sidebar">
      <div class="brand">
        <div class="mark">GEO</div>
        <div>
          <h1>ManyAItools GEO 监控</h1>
          <p>内部运营看板</p>
        </div>
      </div>
      <nav class="nav">
        <a class="active" href="#overview">总览</a>
        <a href="#today-actions">动作日志</a>
        <a href="#trend">趋势</a>
        <a href="#cf-history">CF 历史</a>
        <a href="#worklog">已完成</a>
        <a href="#sources">数据源</a>
        <a href="#pages">页面转化</a>
        <a href="#events">最新日志</a>
      </nav>
      <div class="sideMeta">
        数据库：manyaitool-geo-analytics<br>
        当前范围：最近 ${escapeHtml(String(data.rangeDays))} 天<br>
        更新：${escapeHtml(formatShanghai(data.generatedAt))}
      </div>
    </aside>

    <main class="main">
      <header class="topbar" id="overview">
        <div class="title">
          <h2>GEO 效果 dashboard</h2>
          <p>看我们做了什么、现在数据在哪里、趋势有没有变化。当前同时展示 Cloudflare 历史流量和 D1 第一方转化埋点。</p>
        </div>
        <nav class="toolbar">
          ${rangeLink(1, data.rangeDays, actionLog.selectedDay)}
          ${rangeLink(7, data.rangeDays, actionLog.selectedDay)}
          ${rangeLink(14, data.rangeDays, actionLog.selectedDay)}
          ${rangeLink(30, data.rangeDays, actionLog.selectedDay)}
          <a class="btn subtle" href="https://manyaitool.com/work-with-me" target="_blank" rel="noreferrer">业务页</a>
          <a class="btn subtle" href="/api/summary?days=${escapeHtml(String(data.rangeDays))}&actionDay=${escapeHtml(actionLog.selectedDay)}">JSON</a>
        </nav>
      </header>

      <section class="metrics">
        ${metric("今日访问", today.page_views, "", "今天真实 page_view")}
        ${metric("今日联系", today.contact_clicks, today.contact_clicks > 0 ? "good" : "warn", "click_contact_*")}
        ${metric("今日外链", today.outbound_clicks, "", "click_outbound")}
        ${metric("今日联系转化率", rate(today.contact_clicks, today.page_views), today.contact_clicks > 0 ? "good" : "warn", "联系点击 / 页面访问")}
        ${metric(`${data.rangeDays}天访问`, period.page_views, "", "所选周期 page_view")}
        ${metric(`${data.rangeDays}天联系`, period.contact_clicks, period.contact_clicks > 0 ? "good" : "warn", "所选周期联系点击")}
        ${metric("访问页面", period.viewed_pages, "", "去重 path")}
        ${metric("来源域名", period.referrer_hosts, "", "去重 referrer_host")}
      </section>

      <section class="section" id="today-actions">
        <div class="sectionHead">
          <div>
            <h3>服务动作日志</h3>
            <p>服务商每天做了哪些 GEO 动作，和当天 / 后续数据放在一起对账。当前日期：${escapeHtml(actionLog.selectedDay)}</p>
          </div>
          <nav class="dateTabs">${actionDayLinks(actionLog.days, actionLog.selectedDay, data.rangeDays)}</nav>
        </div>
        <div class="actionLayout">
          <article class="card">
            <h3>${escapeHtml(actionLog.selectedDay)} 做了什么</h3>
            <p class="cardLead">这里记录的是服务动作，不是流量数据。比如写了什么页面、改了什么结构、接了什么数据、做了什么部署。</p>
            ${renderActionLogTable(actionLog.entries)}
          </article>
          <article class="card">
            <h3>数据影响对账</h3>
            <p class="cardLead">先把动作和数据放在同一日期旁边。真正判断影响，要看当天之后 7 / 14 / 30 天趋势。</p>
            <div class="miniMetrics">
              ${metric("动作数", actionLog.entries.length, "", "服务动作条数")}
              ${metric("当天 D1 PV", actionLog.impact.actionDay.page_views, "", "第一方 page_view")}
              ${metric("后续7天 D1 PV", actionLog.impact.actionWindow.page_views, "", "动作日起 7 天")}
              ${metric("当天 CF PV", formatInt(actionLog.impact.cfActionDay.page_views), "", "Cloudflare pageViews")}
            </div>
            ${table(
              ["口径", "前一天", "动作当天", "后续7天"],
              [
                ["CF page views", formatInt(actionLog.impact.cfPreviousDay.page_views), formatInt(actionLog.impact.cfActionDay.page_views), formatInt(actionLog.impact.cfActionWindow.page_views)],
                ["CF requests", formatInt(actionLog.impact.cfPreviousDay.requests), formatInt(actionLog.impact.cfActionDay.requests), formatInt(actionLog.impact.cfActionWindow.requests)],
                ["D1 page_view", "-", actionLog.impact.actionDay.page_views, actionLog.impact.actionWindow.page_views],
                ["D1 联系点击", "-", actionLog.impact.actionDay.contact_clicks, actionLog.impact.actionWindow.contact_clicks],
                ["D1 外链点击", "-", actionLog.impact.actionDay.outbound_clicks, actionLog.impact.actionWindow.outbound_clicks],
              ],
            )}
          </article>
        </div>
      </section>

      <section class="section tri">
        <article class="card" id="trend">
          <h3>${data.rangeDays} 天趋势</h3>
          <p class="cardLead">蓝色为页面访问，表内同时列联系点击和外链点击。</p>
          ${renderTrend(data.trend)}
        </article>
        <article class="card">
          <h3>今天该看什么</h3>
          <ul class="actions">${data.actions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </article>
        <article class="card">
          <h3>当前数据在哪里</h3>
          <p class="cardLead">不是只有今日卡片，下面这些入口都能查原始数据或汇总数据。</p>
          <div class="todo">
            <div class="todoItem"><div class="todoArea">线上</div><div><div class="todoTitle">本 dashboard</div><div class="todoDesc">https://geo-monitor.manyaitool.com</div></div>${status("已上线")}</div>
            <div class="todoItem"><div class="todoArea">API</div><div><div class="todoTitle">JSON 数据</div><div class="todoDesc">/api/summary?days=${escapeHtml(String(data.rangeDays))}</div></div>${status("已接入")}</div>
            <div class="todoItem"><div class="todoArea">本地</div><div><div class="todoTitle">日报</div><div class="todoDesc">manyaitool-geo/reports/latest-ManyAItools第一方数据报告.md</div></div>${status("已接入")}</div>
          </div>
        </article>
      </section>

      <section class="section grid" id="cf-history">
        <article class="card">
          <h3>Cloudflare 历史流量</h3>
          <p class="cardLead">这是 CF 上已经存在的 zone 级 HTTP 统计，用来补历史趋势；它不包含联系点击和页面转化，也可能包含同一 zone 下的子域流量。</p>
          <div class="miniMetrics">
            ${metric(`${data.rangeDays}天 CF requests`, formatInt(cfTraffic.requests), "", "HTTP 请求量")}
            ${metric(`${data.rangeDays}天 CF page views`, formatInt(cfTraffic.page_views), "", "Cloudflare pageViews")}
            ${metric(`${data.rangeDays}天 daily uniques`, formatInt(cfTraffic.uniques), "", "每日 unique 累加")}
            ${metric("导入天数", formatInt(cfTraffic.days), "", "cf_daily_traffic")}
          </div>
          ${renderCfTrend(data.cfTraffic.trend)}
        </article>
        <article class="card">
          <h3>CF 数据口径</h3>
          <p class="cardLead">旧数据来自 Cloudflare zone 每日聚合。它适合看历史流量有没有涨跌，不适合判断某个页面有没有带来咨询。</p>
          ${table(
            ["范围", "Requests", "Page views", "Daily uniques", "Bytes"],
            data.cfTraffic.hosts.map((row) => [row.host, formatInt(row.requests), formatInt(row.page_views), formatInt(row.uniques), formatBytes(row.edge_response_bytes)]),
          )}
        </article>
      </section>

      <section class="section" id="worklog">
        <div class="sectionHead">
          <h3>我们已经做了什么</h3>
          <p>GEO 工程进度和缺口，不再靠口头记忆。</p>
        </div>
        <article class="card">
          ${table(["模块", "事项", "状态", "说明"], workItems.map((row) => [row[0], row[1], status(row[2]), row[3]]))}
        </article>
      </section>

      <section class="section" id="sources">
        <div class="sectionHead">
          <h3>数据源状态</h3>
          <p>哪些数据已经接上，哪些还缺一次授权或预算。</p>
        </div>
        <div class="sourceGrid">
          ${dataSources.map((source) => `<div class="source"><b>${escapeHtml(source[0])}</b><code>${escapeHtml(source[1])}</code>${status(source[2])}<p>${escapeHtml(source[3])}</p></div>`).join("")}
        </div>
      </section>

      <section class="section grid" id="pages">
        <article class="card">
          <h3>页面转化</h3>
          ${table(["页面", "访问", "联系", "外链", "转化率"], data.pages.map((row) => [code(row.path), row.page_views, row.contact_clicks, row.outbound_clicks, `${row.contact_rate_percent}%`]))}
        </article>

        <article class="card">
          <h3>有访问但没联系的页面</h3>
          ${topNoContact.length ? table(["页面", "访问", "外链"], topNoContact.map((row) => [code(row.path), row.page_views, row.outbound_clicks])) : `<p class="empty">暂无此类页面</p>`}
        </article>

        <article class="card">
          <h3>来源域名</h3>
          ${table(["来源", "事件"], data.referrers.map((row) => [row.label, row.events]))}
        </article>

        <article class="card">
          <h3>国家 / 地区</h3>
          ${table(["国家", "事件"], data.countries.map((row) => [row.label, row.events]))}
        </article>
      </section>

      <section class="section" id="events">
        <div class="sectionHead">
          <h3>最新日志</h3>
          <p>最近 50 条事件，方便确认埋点是否还活着。</p>
        </div>
        <article class="card">
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
    </main>
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

function parseDays(value: string | null): number {
  const parsed = Number(value);
  if ([1, 7, 14, 30].includes(parsed)) {
    return parsed;
  }
  return 7;
}

function parseActionDay(value: string | null): string {
  if (!value) {
    return "";
  }
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : "";
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

function normalizeCfTrafficSummary(row: CfTrafficSummaryRow | null): CfTrafficSummaryRow {
  return {
    requests: Number(row?.requests ?? 0),
    visits: Number(row?.visits ?? 0),
    page_views: Number(row?.page_views ?? 0),
    uniques: Number(row?.uniques ?? 0),
    edge_response_bytes: Number(row?.edge_response_bytes ?? 0),
    hosts: Number(row?.hosts ?? 0),
    days: Number(row?.days ?? 0),
    latest_day: row?.latest_day ?? "",
    updated_at: row?.updated_at ?? "",
  };
}

function normalizeCfTrafficTrend(row: CfTrafficTrendRow): CfTrafficTrendRow {
  return {
    day: row.day ?? "",
    requests: Number(row.requests ?? 0),
    visits: Number(row.visits ?? 0),
    page_views: Number(row.page_views ?? 0),
    uniques: Number(row.uniques ?? 0),
    edge_response_bytes: Number(row.edge_response_bytes ?? 0),
  };
}

function normalizeCfTrafficHost(row: CfTrafficHostRow): CfTrafficHostRow {
  return {
    host: row.host ?? "",
    requests: Number(row.requests ?? 0),
    visits: Number(row.visits ?? 0),
    page_views: Number(row.page_views ?? 0),
    uniques: Number(row.uniques ?? 0),
    edge_response_bytes: Number(row.edge_response_bytes ?? 0),
  };
}

function normalizeActionDay(row: ActionDayRow): ActionDayRow {
  return {
    day: row.day ?? "",
    actions: Number(row.actions ?? 0),
    categories: row.categories ?? "",
  };
}

function normalizeActionLog(row: ActionLogRow): ActionLogRow {
  return {
    day: row.day ?? "",
    sequence: Number(row.sequence ?? 0),
    category: row.category ?? "",
    action: row.action ?? "",
    target: row.target ?? "",
    status: row.status ?? "",
    owner: row.owner ?? "",
    shipped_at: row.shipped_at ?? "",
    expected_impact: row.expected_impact ?? "",
    evidence: row.evidence ?? "",
    notes: row.notes ?? "",
  };
}

function normalizeCfActionSummary(row: CfActionSummaryRow | null): CfActionSummaryRow {
  return {
    requests: Number(row?.requests ?? 0),
    page_views: Number(row?.page_views ?? 0),
    uniques: Number(row?.uniques ?? 0),
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

function metric(label: string, value: string | number, state = "", note = ""): string {
  return `<div class="metric ${state}"><strong>${escapeHtml(String(value))}</strong><span>${escapeHtml(label)}</span>${note ? `<small>${escapeHtml(note)}</small>` : ""}</div>`;
}

function status(value: string): string {
  const cls = value === "已上线" || value === "已接入" || value === "已完成" ? "done" : value === "待接入" ? "wait" : "opt";
  return `<span class="status ${cls}">${escapeHtml(value)}</span>`;
}

function rangeLink(days: number, activeDays: number, actionDay: string): string {
  return `<a class="btn ${days === activeDays ? "active" : "subtle"}" href="/?days=${days}&actionDay=${escapeHtml(actionDay)}">${days === 1 ? "今天" : `${days}天`}</a>`;
}

function actionDayLinks(days: ActionDayRow[], selectedDay: string, rangeDays: number): string {
  if (!days.length) {
    return `<span class="empty">暂无动作日期</span>`;
  }
  return days
    .map((row) => {
      const label = `${row.day} · ${row.actions}`;
      const active = row.day === selectedDay ? "active" : "subtle";
      return `<a class="btn ${active}" href="/?days=${rangeDays}&actionDay=${escapeHtml(row.day)}">${escapeHtml(label)}</a>`;
    })
    .join("");
}

function table(headers: string[], rows: Array<Array<string | number>>): string {
  if (!rows.length) {
    return `<p class="empty">暂无数据</p>`;
  }
  return `<table><thead><tr>${headers.map((item) => `<th>${escapeHtml(item)}</th>`).join("")}</tr></thead><tbody>${rows
    .map((row) => `<tr>${row.map((item) => `<td>${typeof item === "string" && item.startsWith("<") ? item : escapeHtml(String(item))}</td>`).join("")}</tr>`)
    .join("")}</tbody></table>`;
}

function renderActionLogTable(rows: ActionLogRow[]): string {
  if (!rows.length) {
    return `<p class="empty">这一天还没有服务动作日志。先在 data/geo-action-log.json 里追加，再运行 npm run geo:actions-import。</p>`;
  }

  return table(
    ["类型", "动作", "目标", "预期影响", "证据 / 备注"],
    rows.map((row) => [
      row.category,
      `<strong>${escapeHtml(row.action)}</strong><br>${status(statusLabel(row.status))}`,
      code(row.target),
      row.expected_impact,
      [row.evidence, row.notes].filter(Boolean).join(" / "),
    ]),
  );
}

function renderTrend(rows: TrendRow[]): string {
  if (!rows.length) {
    return `<p class="empty">暂无趋势数据</p>`;
  }
  const max = Math.max(...rows.map((row) => row.page_views), 1);
  return `<div class="bars">${rows
    .map((row) => {
      const width = Math.max(3, Math.round((row.page_views / max) * 100));
      return `<div class="barrow"><span>${escapeHtml(row.day)}</span><div class="bar"><div class="fill" style="width:${width}%"></div></div><strong>PV ${row.page_views} · C ${row.contact_clicks} · O ${row.outbound_clicks}</strong></div>`;
    })
    .join("")}</div>`;
}

function renderCfTrend(rows: CfTrafficTrendRow[]): string {
  if (!rows.length) {
    return `<p class="empty">暂无 Cloudflare 历史流量数据，先运行 npm run geo:cf-import。</p>`;
  }
  const max = Math.max(...rows.map((row) => row.requests), 1);
  return `<div class="bars">${rows
    .map((row) => {
      const width = Math.max(3, Math.round((row.requests / max) * 100));
      return `<div class="barrow"><span>${escapeHtml(row.day)}</span><div class="bar"><div class="fill" style="width:${width}%"></div></div><strong>R ${formatInt(row.requests)} · PV ${formatInt(row.page_views)} · U ${formatInt(row.uniques)}</strong></div>`;
    })
    .join("")}</div>`;
}

function code(value: string): string {
  return `<span class="path">${escapeHtml(value || "(empty)")}</span>`;
}

function formatInt(value: number): string {
  return new Intl.NumberFormat("en-US").format(Number(value ?? 0));
}

function formatBytes(value: number): string {
  const bytes = Number(value ?? 0);
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`;
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

function shanghaiDate(date: Date): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function statusLabel(value: string): string {
  const normalized = value.toLowerCase();
  if (normalized === "done" || normalized === "completed" || value === "已完成") return "已完成";
  if (normalized === "doing" || normalized === "in_progress" || value === "进行中") return "进行中";
  if (normalized === "planned" || value === "计划中") return "计划中";
  return value || "已完成";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
