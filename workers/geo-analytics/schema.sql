CREATE TABLE IF NOT EXISTS geo_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  path TEXT,
  referrer TEXT,
  referrer_host TEXT,
  target TEXT,
  lang TEXT,
  title TEXT,
  country TEXT,
  colo TEXT,
  browser TEXT,
  is_bot INTEGER NOT NULL DEFAULT 0,
  bot_category TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_geo_events_created_at
  ON geo_events(created_at);

CREATE INDEX IF NOT EXISTS idx_geo_events_type_created_at
  ON geo_events(event_type, created_at);

CREATE INDEX IF NOT EXISTS idx_geo_events_path_created_at
  ON geo_events(path, created_at);

CREATE INDEX IF NOT EXISTS idx_geo_events_referrer_host_created_at
  ON geo_events(referrer_host, created_at);

CREATE TABLE IF NOT EXISTS geo_daily_metrics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  day TEXT NOT NULL,
  metric TEXT NOT NULL,
  dimension TEXT NOT NULL,
  dimension_value TEXT NOT NULL,
  events INTEGER NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(day, metric, dimension, dimension_value)
);

CREATE INDEX IF NOT EXISTS idx_geo_daily_metrics_day
  ON geo_daily_metrics(day);

CREATE INDEX IF NOT EXISTS idx_geo_daily_metrics_metric_day
  ON geo_daily_metrics(metric, day);

CREATE TABLE IF NOT EXISTS cf_daily_traffic (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  day TEXT NOT NULL,
  host TEXT NOT NULL,
  requests INTEGER NOT NULL DEFAULT 0,
  visits INTEGER NOT NULL DEFAULT 0,
  page_views INTEGER NOT NULL DEFAULT 0,
  uniques INTEGER NOT NULL DEFAULT 0,
  edge_response_bytes INTEGER NOT NULL DEFAULT 0,
  source TEXT NOT NULL DEFAULT 'cloudflare_graphql_httpRequests1dGroups',
  updated_at TEXT NOT NULL,
  UNIQUE(day, host, source)
);

CREATE INDEX IF NOT EXISTS idx_cf_daily_traffic_day
  ON cf_daily_traffic(day);

CREATE INDEX IF NOT EXISTS idx_cf_daily_traffic_host_day
  ON cf_daily_traffic(host, day);
