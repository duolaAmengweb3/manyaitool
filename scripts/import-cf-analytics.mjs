import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { resolve } from "node:path";

const DB_NAME = "manyaitool-geo-analytics";
const ZONE_NAME = "manyaitool.com";
const ZONE_ID = "6ef4e7ccd3f502a58a6180e6f10b043c";
const DEFAULT_DAYS = 60;
const GRAPHQL_URL = "https://api.cloudflare.com/client/v4/graphql";
const SOURCE = "cloudflare_graphql_httpRequests1dGroups";

const args = new Map(
  process.argv.slice(2).map((arg) => {
    const [key, value = ""] = arg.replace(/^--/, "").split("=");
    return [key, value || "true"];
  }),
);

const days = clampInt(Number(args.get("days") ?? DEFAULT_DAYS), 1, 120);
const token = getCloudflareToken();

await ensureTable();

const rows = (await fetchZoneDailyTraffic(days)).map(normalizeRow);
await upsertRows(rows);

const totals = rows.reduce(
  (acc, row) => {
    acc.requests += row.requests;
    acc.page_views += row.page_views;
    acc.uniques += row.uniques;
    acc.bytes += row.edge_response_bytes;
    return acc;
  },
  { requests: 0, page_views: 0, uniques: 0, bytes: 0 },
);

console.log(
  `[cf-import] imported ${rows.length} daily rows for ${ZONE_NAME}: ${totals.requests} requests, ${totals.page_views} page views, ${totals.uniques} daily uniques`,
);

async function fetchZoneDailyTraffic(dayCount) {
  const today = new Date();
  const start = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()) - (dayCount - 1) * 24 * 60 * 60 * 1000);
  const payload = {
    query: `query ZoneDaily($zoneTag: string, $filter: ZoneHttpRequests1dGroupsFilter_InputObject) {
      viewer {
        zones(filter: { zoneTag: $zoneTag }) {
          httpRequests1dGroups(limit: 120, filter: $filter, orderBy: [date_ASC]) {
            dimensions { date }
            sum { requests pageViews bytes cachedRequests cachedBytes encryptedRequests threats }
            uniq { uniques }
          }
        }
      }
    }`,
    variables: {
      zoneTag: ZONE_ID,
      filter: {
        date_geq: formatDate(start),
        date_leq: formatDate(today),
      },
    },
  };

  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Cloudflare GraphQL failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  if (data.errors?.length) {
    throw new Error(`Cloudflare GraphQL errors: ${JSON.stringify(data.errors)}`);
  }

  return data.data?.viewer?.zones?.[0]?.httpRequests1dGroups ?? [];
}

async function ensureTable() {
  runD1(`
    CREATE TABLE IF NOT EXISTS cf_daily_traffic (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      day TEXT NOT NULL,
      host TEXT NOT NULL,
      requests INTEGER NOT NULL DEFAULT 0,
      visits INTEGER NOT NULL DEFAULT 0,
      page_views INTEGER NOT NULL DEFAULT 0,
      uniques INTEGER NOT NULL DEFAULT 0,
      edge_response_bytes INTEGER NOT NULL DEFAULT 0,
      source TEXT NOT NULL DEFAULT '${SOURCE}',
      updated_at TEXT NOT NULL,
      UNIQUE(day, host, source)
    );
  `);

  ensureColumn("page_views", "INTEGER NOT NULL DEFAULT 0");
  ensureColumn("uniques", "INTEGER NOT NULL DEFAULT 0");
  runD1("CREATE INDEX IF NOT EXISTS idx_cf_daily_traffic_day ON cf_daily_traffic(day);");
  runD1("CREATE INDEX IF NOT EXISTS idx_cf_daily_traffic_host_day ON cf_daily_traffic(host, day);");
}

function ensureColumn(column, definition) {
  const columns = runD1("PRAGMA table_info(cf_daily_traffic);").map((row) => row.name);
  if (!columns.includes(column)) {
    runD1(`ALTER TABLE cf_daily_traffic ADD COLUMN ${column} ${definition};`);
  }
}

async function upsertRows(inputRows) {
  if (!inputRows.length) {
    return;
  }

  const updatedAt = new Date().toISOString();
  const values = inputRows
    .map(
      (row) =>
        `(${sqlString(row.day)}, ${sqlString(row.host)}, ${row.requests}, ${row.visits}, ${row.page_views}, ${row.uniques}, ${row.edge_response_bytes}, ${sqlString(SOURCE)}, ${sqlString(updatedAt)})`,
    )
    .join(", ");

  runD1(`
    INSERT INTO cf_daily_traffic (
      day,
      host,
      requests,
      visits,
      page_views,
      uniques,
      edge_response_bytes,
      source,
      updated_at
    ) VALUES ${values}
    ON CONFLICT(day, host, source) DO UPDATE SET
      requests = excluded.requests,
      visits = excluded.visits,
      page_views = excluded.page_views,
      uniques = excluded.uniques,
      edge_response_bytes = excluded.edge_response_bytes,
      updated_at = excluded.updated_at;
  `);
}

function normalizeRow(row) {
  const uniques = Math.max(0, Number(row.uniq?.uniques ?? 0));
  return {
    day: String(row.dimensions?.date ?? ""),
    host: `${ZONE_NAME} zone`,
    requests: Math.max(0, Number(row.sum?.requests ?? 0)),
    visits: uniques,
    page_views: Math.max(0, Number(row.sum?.pageViews ?? 0)),
    uniques,
    edge_response_bytes: Math.max(0, Number(row.sum?.bytes ?? 0)),
  };
}

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

function getCloudflareToken() {
  if (process.env.CLOUDFLARE_API_TOKEN) {
    return process.env.CLOUDFLARE_API_TOKEN;
  }
  if (process.env.CF_API_TOKEN) {
    return process.env.CF_API_TOKEN;
  }

  const wranglerConfig = resolve(homedir(), "Library/Preferences/.wrangler/config/default.toml");
  const content = readFileSync(wranglerConfig, "utf8");
  const match = content.match(/oauth_token\s*=\s*"([^"]+)"/);
  if (!match?.[1]) {
    throw new Error("Cloudflare token not found. Set CLOUDFLARE_API_TOKEN or run wrangler login.");
  }
  return match[1];
}

function normalizeSql(sql) {
  return sql.replace(/\s+/g, " ").trim();
}

function sqlString(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

function clampInt(value, min, max) {
  if (!Number.isFinite(value)) {
    return min;
  }
  return Math.max(min, Math.min(max, Math.floor(value)));
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}
