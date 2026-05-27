#!/bin/bash
# Deploy to Cloudflare Pages + notify search engines
# Usage: npm run deploy (builds first, then runs this)

set -e

# Clear proxy env vars for wrangler (Cloudflare API conflicts with local proxies)
unset HTTP_PROXY HTTPS_PROXY ALL_PROXY http_proxy https_proxy all_proxy no_proxy
export NO_PROXY="*"

echo "🚀 Deploying to Cloudflare Pages..."
npx wrangler pages deploy out --project-name=manyaitool --branch=main

echo ""
echo "📡 Notifying search engines..."

SITEMAP_URL="https://manyaitool.com/sitemap.xml"

# Google: ping sitemap
echo -n "  Google sitemap ping: "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://www.google.com/ping?sitemap=$SITEMAP_URL" 2>/dev/null || echo "err")
echo "$STATUS"

# Bing: ping sitemap
echo -n "  Bing sitemap ping: "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://www.bing.com/ping?sitemap=$SITEMAP_URL" 2>/dev/null || echo "err")
echo "$STATUS"

# IndexNow: push all URLs to Bing/Yandex
echo -n "  IndexNow push: "
URLS=$(curl -s "$SITEMAP_URL" 2>/dev/null | grep '<loc>' | sed 's/.*<loc>//;s/<\/loc>.*//' | while read url; do echo "\"$url\""; done | paste -sd, -)
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d "{\"host\":\"manyaitool.com\",\"key\":\"manyaitool-indexnow-key\",\"keyLocation\":\"https://manyaitool.com/manyaitool-indexnow-key.txt\",\"urlList\":[$URLS]}" 2>/dev/null || echo "err")
echo "$STATUS"

echo ""
echo "✅ Deploy complete. Search engines notified."
