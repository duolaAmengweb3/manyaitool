import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const DB_NAME = "manyaitool-geo-analytics";
const SOURCE_FILE = resolve(process.cwd(), "data/geo-action-log.json");

const rows = JSON.parse(readFileSync(SOURCE_FILE, "utf8"));
if (!Array.isArray(rows)) {
  throw new Error("data/geo-action-log.json must be an array");
}

ensureTable();
upsertRows(rows.map(normalizeRow));

console.log(`[geo-actions] imported ${rows.length} action log rows`);

function ensureTable() {
  runD1(`
    CREATE TABLE IF NOT EXISTS geo_action_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      day TEXT NOT NULL,
      sequence INTEGER NOT NULL DEFAULT 0,
      category TEXT NOT NULL,
      action TEXT NOT NULL,
      target TEXT,
      status TEXT NOT NULL DEFAULT 'done',
      owner TEXT NOT NULL DEFAULT 'service',
      shipped_at TEXT,
      expected_impact TEXT,
      evidence TEXT,
      notes TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      UNIQUE(day, sequence, action)
    );
  `);
  runD1("CREATE INDEX IF NOT EXISTS idx_geo_action_logs_day ON geo_action_logs(day);");
  runD1("CREATE INDEX IF NOT EXISTS idx_geo_action_logs_category_day ON geo_action_logs(category, day);");
}

function upsertRows(inputRows) {
  if (!inputRows.length) {
    return;
  }

  const now = new Date().toISOString();
  const values = inputRows
    .map(
      (row) =>
        `(${sqlString(row.day)}, ${row.sequence}, ${sqlString(row.category)}, ${sqlString(row.action)}, ${sqlString(row.target)}, ${sqlString(row.status)}, ${sqlString(row.owner)}, ${sqlString(row.shipped_at)}, ${sqlString(row.expected_impact)}, ${sqlString(row.evidence)}, ${sqlString(row.notes)}, ${sqlString(now)}, ${sqlString(now)})`,
    )
    .join(", ");

  runD1(`
    INSERT INTO geo_action_logs (
      day,
      sequence,
      category,
      action,
      target,
      status,
      owner,
      shipped_at,
      expected_impact,
      evidence,
      notes,
      created_at,
      updated_at
    ) VALUES ${values}
    ON CONFLICT(day, sequence, action) DO UPDATE SET
      category = excluded.category,
      target = excluded.target,
      status = excluded.status,
      owner = excluded.owner,
      shipped_at = excluded.shipped_at,
      expected_impact = excluded.expected_impact,
      evidence = excluded.evidence,
      notes = excluded.notes,
      updated_at = excluded.updated_at;
  `);
}

function normalizeRow(row) {
  const day = clean(row.day);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) {
    throw new Error(`Invalid day: ${day}`);
  }

  const sequence = Number(row.sequence ?? 0);
  if (!Number.isFinite(sequence)) {
    throw new Error(`Invalid sequence for ${day}: ${row.sequence}`);
  }

  const action = clean(row.action);
  if (!action) {
    throw new Error(`Missing action for ${day}`);
  }

  return {
    day,
    sequence: Math.floor(sequence),
    category: clean(row.category) || "GEO",
    action,
    target: clean(row.target),
    status: clean(row.status) || "done",
    owner: clean(row.owner) || "service",
    shipped_at: clean(row.shippedAt ?? row.shipped_at),
    expected_impact: clean(row.expectedImpact ?? row.expected_impact),
    evidence: clean(row.evidence),
    notes: clean(row.notes),
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

function clean(value) {
  if (value === null || value === undefined) {
    return "";
  }
  return String(value).replace(/\s+/g, " ").trim();
}

function normalizeSql(sql) {
  return sql.replace(/\s+/g, " ").trim();
}

function sqlString(value) {
  return `'${String(value ?? "").replace(/'/g, "''")}'`;
}
