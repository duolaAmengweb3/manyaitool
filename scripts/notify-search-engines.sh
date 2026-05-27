#!/bin/bash
# Post-deploy: notify search engines of sitemap update
# Called automatically by `npm run deploy`

SITE_URL="https://manyaitool.com"
SITEMAP_URL="$SITE_URL/sitemap.xml"

echo "📡 Notifying search engines..."

# 1. Ping Google Sitemap
echo -n "  Google: "
curl -s -o /dev/null -w "%{http_code}" "https://www.google.com/ping?sitemap=$SITEMAP_URL" && echo " ✓"

# 2. Ping Bing via IndexNow
# IndexNow requires an API key file at /[key].txt
# We use the site's existing content hash as key
INDEXNOW_KEY="manyaitool-indexnow-key"
echo -n "  Bing (IndexNow): "
curl -s -o /dev/null -w "%{http_code}" -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d "{
    \"host\": \"manyaitool.com\",
    \"key\": \"$INDEXNOW_KEY\",
    \"keyLocation\": \"$SITE_URL/$INDEXNOW_KEY.txt\",
    \"urlList\": $(curl -s "$SITEMAP_URL" | grep '<loc>' | sed 's/.*<loc>//;s/<\/loc>.*//' | jq -R -s 'split("\n") | map(select(length > 0))')
  }" && echo " ✓"

# 3. Ping Bing Sitemap (legacy, still works)
echo -n "  Bing (sitemap): "
curl -s -o /dev/null -w "%{http_code}" "https://www.bing.com/ping?sitemap=$SITEMAP_URL" && echo " ✓"

echo "✅ Done. Search engines notified."
