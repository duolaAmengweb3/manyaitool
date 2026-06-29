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
