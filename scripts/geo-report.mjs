import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const DB_NAME = "manyaitool-geo-analytics";
const REPORT_DIR = resolve(process.cwd(), "../manyaitool-geo/reports");
const DEFAULT_DAYS = 7;

const args = new Map(
  process.argv.slice(2).map((arg) => {
    const [key, value = ""] = arg.replace(/^--/, "").split("=");
    return [key, value || "true"];
  }),
);

const days = Number(args.get("days") ?? DEFAULT_DAYS);
const reportDate = formatDate(new Date());
const outFile = resolve(REPORT_DIR, `${reportDate}-ManyAItools第一方数据报告.md`);
const latestFile = resolve(REPORT_DIR, "latest-ManyAItools第一方数据报告.md");

const rangeFilter = `datetime(created_at) >= datetime('now', '-${Number.isFinite(days) ? days : DEFAULT_DAYS} days')`;

const queries = {
  today: `
    SELECT
      COUNT(*) AS total_events,
      SUM(CASE WHEN event_type = 'page_view' THEN 1 ELSE 0 END) AS page_views,
      SUM(CASE WHEN event_type LIKE 'click_contact_%' THEN 1 ELSE 0 END) AS contact_clicks,
      SUM(CASE WHEN event_type = 'click_outbound' THEN 1 ELSE 0 END) AS outbound_clicks,
      COUNT(DISTINCT CASE WHEN event_type = 'page_view' THEN path END) AS viewed_pages,
      COUNT(DISTINCT NULLIF(referrer_host, '')) AS referrer_hosts
    FROM geo_events
    WHERE date(datetime(created_at, '+8 hours')) = date(datetime('now', '+8 hours'));
  `,
  summary: `
    SELECT
      COUNT(*) AS total_events,
      SUM(CASE WHEN event_type = 'page_view' THEN 1 ELSE 0 END) AS page_views,
      SUM(CASE WHEN event_type LIKE 'click_contact_%' THEN 1 ELSE 0 END) AS contact_clicks,
      SUM(CASE WHEN event_type = 'click_outbound' THEN 1 ELSE 0 END) AS outbound_clicks,
      COUNT(DISTINCT CASE WHEN event_type = 'page_view' THEN path END) AS viewed_pages,
      COUNT(DISTINCT NULLIF(referrer_host, '')) AS referrer_hosts
    FROM geo_events
    WHERE ${rangeFilter};
  `,
  daily: `
    SELECT
      date(datetime(created_at)) AS day,
      event_type,
      COUNT(*) AS events
    FROM geo_events
    WHERE ${rangeFilter}
    GROUP BY day, event_type
    ORDER BY day DESC, events DESC;
  `,
  topPages: `
    SELECT
      path,
      COUNT(*) AS page_views
    FROM geo_events
    WHERE event_type = 'page_view'
      AND ${rangeFilter}
    GROUP BY path
    ORDER BY page_views DESC, path ASC
    LIMIT 20;
  `,
  pageFunnel: `
    WITH page_events AS (
      SELECT
        path,
        SUM(CASE WHEN event_type = 'page_view' THEN 1 ELSE 0 END) AS page_views,
        SUM(CASE WHEN event_type LIKE 'click_contact_%' THEN 1 ELSE 0 END) AS contact_clicks,
        SUM(CASE WHEN event_type = 'click_outbound' THEN 1 ELSE 0 END) AS outbound_clicks
      FROM geo_events
      WHERE ${rangeFilter}
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
    LIMIT 20;
  `,
  referrers: `
    SELECT
      COALESCE(NULLIF(referrer_host, ''), '(direct / unknown)') AS referrer_host,
      COUNT(*) AS events
    FROM geo_events
    WHERE ${rangeFilter}
    GROUP BY COALESCE(NULLIF(referrer_host, ''), '(direct / unknown)')
    ORDER BY events DESC
    LIMIT 20;
  `,
  countries: `
    SELECT
      COALESCE(NULLIF(country, ''), '(unknown)') AS country,
      COUNT(*) AS events
    FROM geo_events
    WHERE ${rangeFilter}
    GROUP BY COALESCE(NULLIF(country, ''), '(unknown)')
    ORDER BY events DESC
    LIMIT 20;
  `,
  contactClicks: `
    SELECT
      event_type,
      COALESCE(NULLIF(target, ''), '(empty)') AS target,
      COUNT(*) AS clicks
    FROM geo_events
    WHERE event_type LIKE 'click_contact_%'
      AND ${rangeFilter}
    GROUP BY event_type, COALESCE(NULLIF(target, ''), '(empty)')
    ORDER BY clicks DESC
    LIMIT 20;
  `,
  outboundClicks: `
    SELECT
      COALESCE(NULLIF(target, ''), '(empty)') AS target,
      COUNT(*) AS clicks
    FROM geo_events
    WHERE event_type = 'click_outbound'
      AND ${rangeFilter}
    GROUP BY COALESCE(NULLIF(target, ''), '(empty)')
    ORDER BY clicks DESC
    LIMIT 20;
  `,
  latestEvents: `
    SELECT
      event_type,
      path,
      COALESCE(NULLIF(referrer_host, ''), '(direct / unknown)') AS referrer_host,
      COALESCE(NULLIF(country, ''), '(unknown)') AS country,
      browser,
      created_at
    FROM geo_events
    ORDER BY id DESC
    LIMIT 20;
  `,
  actionLogs: `
    SELECT
      day,
      category,
      action,
      COALESCE(target, '') AS target,
      status,
      COALESCE(expected_impact, '') AS expected_impact,
      COALESCE(evidence, '') AS evidence
    FROM geo_action_logs
    WHERE date(day) >= date('now', '-${Number.isFinite(days) ? days : DEFAULT_DAYS} days')
    ORDER BY day DESC, sequence ASC, id ASC;
  `,
  cfSummary: `
    SELECT
      COUNT(DISTINCT day) AS days,
      MIN(day) AS first_day,
      MAX(day) AS last_day,
      COALESCE(SUM(requests), 0) AS requests,
      COALESCE(SUM(page_views), 0) AS page_views,
      COALESCE(SUM(uniques), 0) AS daily_uniques
    FROM cf_daily_traffic
    WHERE date(day) >= date('now', '-${Number.isFinite(days) ? days : DEFAULT_DAYS} days');
  `,
  cfDaily: `
    SELECT
      day,
      requests,
      page_views,
      uniques AS daily_uniques
    FROM cf_daily_traffic
    WHERE date(day) >= date('now', '-${Number.isFinite(days) ? days : DEFAULT_DAYS} days')
    ORDER BY day DESC
    LIMIT 30;
  `,
};

const data = Object.fromEntries(
  Object.entries(queries).map(([name, sql]) => [name, runD1(sql)]),
);

const summary = data.summary[0] ?? {};
const today = data.today[0] ?? {};
const markdown = [
  "# ManyAItools 第一方数据报告",
  "",
  `生成时间：${formatDateTime(new Date())}`,
  `统计范围：最近 ${days} 天`,
  `数据源：Cloudflare D1 \`${DB_NAME}\``,
  "",
  "## 一句话结论",
  "",
  summarize(summary, today),
  "",
  "## 今天效果",
  "",
  table(
    ["指标", "今天"],
    [
      ["总事件", today.total_events ?? 0],
      ["页面访问", today.page_views ?? 0],
      ["被访问页面数", today.viewed_pages ?? 0],
      ["来源域名数", today.referrer_hosts ?? 0],
      ["联系点击", today.contact_clicks ?? 0],
      ["外链点击", today.outbound_clicks ?? 0],
      ["联系转化率", rate(today.contact_clicks, today.page_views)],
    ],
  ),
  "",
  "## 核心指标",
  "",
  table(
    ["指标", "数值"],
    [
      ["总事件", summary.total_events ?? 0],
      ["页面访问", summary.page_views ?? 0],
      ["被访问页面数", summary.viewed_pages ?? 0],
      ["来源域名数", summary.referrer_hosts ?? 0],
      ["联系点击", summary.contact_clicks ?? 0],
      ["外链点击", summary.outbound_clicks ?? 0],
      ["联系转化率", rate(summary.contact_clicks, summary.page_views)],
      ["外链点击率", rate(summary.outbound_clicks, summary.page_views)],
    ],
  ),
  "",
  "## 今天该看什么",
  "",
  actionItems(summary, today, data.pageFunnel),
  "",
  "## 服务动作日志",
  "",
  "这块记录服务商每天做了哪些 GEO 动作，用来和后续流量、搜索、转化变化对账。",
  "",
  tableFromRows(data.actionLogs, ["day", "category", "action", "target", "status", "expected_impact", "evidence"]),
  "",
  "## 每日事件",
  "",
  tableFromRows(data.daily, ["day", "event_type", "events"]),
  "",
  "## Cloudflare 历史流量",
  "",
  "这块是 Cloudflare 已有的 zone 级历史访问数据，用来看旧趋势；联系点击和页面转化仍看第一方埋点。",
  "",
  table(
    ["指标", "数值"],
    [
      ["导入天数", data.cfSummary[0]?.days ?? 0],
      ["最早日期", data.cfSummary[0]?.first_day ?? ""],
      ["最新日期", data.cfSummary[0]?.last_day ?? ""],
      ["Requests", data.cfSummary[0]?.requests ?? 0],
      ["Page views", data.cfSummary[0]?.page_views ?? 0],
      ["Daily uniques", data.cfSummary[0]?.daily_uniques ?? 0],
    ],
  ),
  "",
  tableFromRows(data.cfDaily, ["day", "requests", "page_views", "daily_uniques"]),
  "",
  "## Top 页面",
  "",
  tableFromRows(data.topPages, ["path", "page_views"]),
  "",
  "## 页面转化",
  "",
  tableFromRows(data.pageFunnel, ["path", "page_views", "contact_clicks", "outbound_clicks", "contact_rate_percent"]),
  "",
  "## 来源域名",
  "",
  tableFromRows(data.referrers, ["referrer_host", "events"]),
  "",
  "## 国家 / 地区",
  "",
  tableFromRows(data.countries, ["country", "events"]),
  "",
  "## 联系点击",
  "",
  tableFromRows(data.contactClicks, ["event_type", "target", "clicks"]),
  "",
  "## 外链点击",
  "",
  tableFromRows(data.outboundClicks, ["target", "clicks"]),
  "",
  "## 最新事件",
  "",
  tableFromRows(data.latestEvents, ["event_type", "path", "referrer_host", "country", "browser", "created_at"]),
  "",
  "## 读数口径",
  "",
  "- 这是第一方埋点数据，不等同于 GA4 session。",
  "- 不存 IP，不存 raw user-agent。",
  "- `page_view` 看真实页面打开，`click_contact_*` 看联系入口，`click_outbound` 看外链点击。",
  "- GSC 仍需要一次性接入，才能补齐 Google 搜索 query / 点击 / 曝光 / 排名。",
  "",
].join("\n");

await mkdir(dirname(outFile), { recursive: true });
await writeFile(outFile, markdown, "utf8");
await writeFile(latestFile, markdown, "utf8");

console.log(`[geo-report] 写入成功: ${outFile}`);
console.log(`[geo-report] 最新报告: ${latestFile}`);

function runD1(sql) {
  const env = {
    ...process.env,
    HTTP_PROXY: "",
    HTTPS_PROXY: "",
    ALL_PROXY: "",
    http_proxy: "",
    https_proxy: "",
    all_proxy: "",
    NO_PROXY: "*",
  };
  const output = execFileSync(
    "npx",
    ["wrangler", "d1", "execute", DB_NAME, "--remote", "--json", "--command", normalizeSql(sql)],
    { encoding: "utf8", env, stdio: ["ignore", "pipe", "pipe"] },
  );
  const parsed = JSON.parse(output);
  const first = parsed[0];
  if (!first?.success) {
    throw new Error(`D1 query failed: ${normalizeSql(sql)}`);
  }
  return first.results ?? [];
}

function normalizeSql(sql) {
  return sql.replace(/\s+/g, " ").trim();
}

function tableFromRows(rows, columns) {
  if (!rows.length) {
    return "_暂无数据_";
  }
  return table(columns, rows.map((row) => columns.map((column) => row[column] ?? "")));
}

function table(headers, rows) {
  const head = `| ${headers.map(escapeCell).join(" | ")} |`;
  const sep = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => `| ${row.map(escapeCell).join(" | ")} |`);
  return [head, sep, ...body].join("\n");
}

function escapeCell(value) {
  return String(value ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function summarize(summary, today) {
  const pageViews = Number(summary.page_views ?? 0);
  const contactClicks = Number(summary.contact_clicks ?? 0);
  const outboundClicks = Number(summary.outbound_clicks ?? 0);
  const todayPageViews = Number(today.page_views ?? 0);
  const todayContactClicks = Number(today.contact_clicks ?? 0);

  if (!pageViews) {
    return "最近周期还没有页面访问数据，先确认埋点是否已部署到正式域名。";
  }

  return `今天记录到 ${todayPageViews} 次页面访问、${todayContactClicks} 次联系点击；最近周期记录到 ${pageViews} 次页面访问、${contactClicks} 次联系点击、${outboundClicks} 次外链点击。每天重点看联系转化率和“有访问但没联系点击”的页面。`;
}

function actionItems(summary, today, pageFunnel) {
  const items = [];
  const pageViews = Number(summary.page_views ?? 0);
  const contactClicks = Number(summary.contact_clicks ?? 0);
  const outboundClicks = Number(summary.outbound_clicks ?? 0);
  const todayPageViews = Number(today.page_views ?? 0);
  const todayContactClicks = Number(today.contact_clicks ?? 0);
  const noContactPages = pageFunnel
    .filter((row) => Number(row.page_views ?? 0) > 0 && Number(row.contact_clicks ?? 0) === 0)
    .slice(0, 5)
    .map((row) => row.path);

  if (todayPageViews > 0 && todayContactClicks === 0) {
    items.push("今天有访问但没有联系点击：检查 `/work-with-me`、首页和产品页的 CTA 是否足够明显。");
  }

  if (contactClicks === 0 && pageViews > 0) {
    items.push("最近周期没有任何联系点击：服务页已经上线，下一步要观察 CTA 文案、入口位置和联系按钮点击。");
  }

  if (noContactPages.length) {
    items.push(`这些页面有访问但没联系点击：${noContactPages.map((path) => `\`${path}\``).join("、")}。`);
  }

  if (outboundClicks > contactClicks) {
    items.push("外链点击多于联系点击：检查用户是不是被外部产品链接带走，业务联系入口要前置。");
  }

  if (Number(summary.referrer_hosts ?? 0) <= 2) {
    items.push("来源域名还少：继续补 GSC，一次授权后才能每天看 Google query / 曝光 / 点击。");
  }

  if (!items.length) {
    items.push("今天没有明显异常：继续观察 Top 页面和联系点击变化。");
  }

  return items.map((item) => `- ${item}`).join("\n");
}

function rate(numerator, denominator) {
  const top = Number(numerator ?? 0);
  const bottom = Number(denominator ?? 0);
  if (!bottom) {
    return "0%";
  }
  return `${((top / bottom) * 100).toFixed(2)}%`;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function formatDateTime(date) {
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
