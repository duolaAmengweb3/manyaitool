// Route-based i18n. Each language is a separate static page:
//   en      -> /          (x-default + canonical English)
//   zh-Hans -> /zh-hans
//   zh-Hant -> /zh-hant
// Pages cross-link with hreflang so Google indexes each language separately.

export type Lang = "en" | "zh-Hans" | "zh-Hant";

export const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "zh-Hans", label: "简" },
  { code: "zh-Hant", label: "繁" },
];

// Path that serves each language's homepage.
export const LOCALE_PATH: Record<Lang, string> = {
  en: "/",
  "zh-Hans": "/zh-hans",
  "zh-Hant": "/zh-hant",
};

// hreflang map (relative paths; metadataBase makes them absolute).
export const HREFLANG_ALTERNATES: Record<string, string> = {
  en: "/",
  "zh-Hans": "/zh-hans",
  "zh-Hant": "/zh-hant",
  "x-default": "/",
};

export function langFromPathname(pathname: string): Lang {
  if (pathname.startsWith("/zh-hant")) return "zh-Hant";
  if (pathname.startsWith("/zh-hans")) return "zh-Hans";
  return "en";
}

type Entry = Record<Lang, string>;

// Homepage chrome strings. Tool titles/taglines come from the registry and stay
// English for now (the tool catalog itself is English-targeted) — localize later.
const DICT: Record<string, Entry> = {
  "header.search": { en: "Search", "zh-Hans": "搜索", "zh-Hant": "搜尋" },

  "hero.badge": {
    en: "{n} tools · 100% free · No signup",
    "zh-Hans": "{n} 个工具 · 100% 免费 · 无需注册",
    "zh-Hant": "{n} 個工具 · 100% 免費 · 無需註冊",
  },
  "hero.title.l1": {
    en: "Format, Convert, Calculate",
    "zh-Hans": "格式化、转换、计算",
    "zh-Hant": "格式化、轉換、計算",
  },
  "hero.title.l2": {
    en: "— All in Your Browser",
    "zh-Hans": "— 全部在浏览器里完成",
    "zh-Hant": "— 全部在瀏覽器裡完成",
  },
  "hero.subtitle": {
    en: "JSON formatting, token counting, image converting, and more. Open a tool, paste your data, get results instantly. Nothing leaves your device.",
    "zh-Hans": "JSON 格式化、Token 计算、图片转换等等。打开工具,粘贴数据,即刻出结果。你的数据不会离开本机。",
    "zh-Hant": "JSON 格式化、Token 計算、圖片轉換等等。開啟工具,貼上資料,即刻得到結果。你的資料不會離開本機。",
  },
  "hero.search": {
    en: "Search tools... (e.g. JSON, Base64, Color)",
    "zh-Hans": "搜索工具…(例如 JSON、Base64、颜色)",
    "zh-Hant": "搜尋工具…(例如 JSON、Base64、顏色)",
  },

  "cat.all": { en: "All", "zh-Hans": "全部", "zh-Hant": "全部" },
  "cat.developer": { en: "Developer Tools", "zh-Hans": "开发者工具", "zh-Hant": "開發者工具" },
  "cat.text": { en: "Text Tools", "zh-Hans": "文本工具", "zh-Hant": "文字工具" },
  "cat.design": { en: "Design Tools", "zh-Hans": "设计工具", "zh-Hant": "設計工具" },
  "cat.converter": { en: "Converters", "zh-Hans": "转换工具", "zh-Hant": "轉換工具" },
  "cat.generator": { en: "Generators", "zh-Hans": "生成工具", "zh-Hant": "生成工具" },
  "cat.calculator": { en: "Calculators", "zh-Hans": "计算工具", "zh-Hant": "計算工具" },
  "cat.calendar": { en: "Calendars & Time", "zh-Hans": "日历与时间", "zh-Hant": "日曆與時間" },

  "sec.stock.title": { en: "Stock Investing Tools", "zh-Hans": "美股投资工具", "zh-Hant": "美股投資工具" },
  "sec.stock.desc": {
    en: "Track gurus, screen stocks, and watch Congress — live data, completely free.",
    "zh-Hans": "跟踪大佬持仓、量化选股、盯紧国会交易——实时数据,完全免费。",
    "zh-Hant": "追蹤大佬持倉、量化選股、盯緊國會交易——即時資料,完全免費。",
  },
  "sec.stock.open": { en: "Open", "zh-Hans": "打开", "zh-Hant": "開啟" },

  "sec.popular.title": { en: "Popular — start here", "zh-Hans": "热门 — 从这里开始", "zh-Hant": "熱門 — 從這裡開始" },
  "sec.popular.desc": {
    en: "Not sure where to begin? These are the most-used tools.",
    "zh-Hans": "不知道从哪开始?这些是最常用的工具。",
    "zh-Hant": "不知道從哪開始?這些是最常用的工具。",
  },
  "sec.recent": { en: "Recently Used", "zh-Hans": "最近使用", "zh-Hant": "最近使用" },
  "sec.favorites": { en: "Favorites", "zh-Hans": "收藏", "zh-Hant": "收藏" },
  "sec.all": { en: "All Tools", "zh-Hans": "全部工具", "zh-Hant": "全部工具" },
  "sec.noresults": {
    en: 'No tools found matching "{q}"',
    "zh-Hans": "没有找到匹配 “{q}” 的工具",
    "zh-Hant": "找不到符合 “{q}” 的工具",
  },

  "feat.title": { en: "Why people choose ManyAITool", "zh-Hans": "为什么大家选择 ManyAITool", "zh-Hant": "為什麼大家選擇 ManyAITool" },
  "feat.privacy.title": { en: "Your data stays with you", "zh-Hans": "数据始终在你手里", "zh-Hant": "資料始終在你手裡" },
  "feat.privacy.desc": {
    en: "Every tool runs in your browser. We never see, store, or transmit your data. Paste sensitive code or API keys with confidence.",
    "zh-Hans": "每个工具都在你的浏览器里运行。我们不会查看、存储或上传你的数据。放心粘贴敏感代码或 API 密钥。",
    "zh-Hant": "每個工具都在你的瀏覽器裡執行。我們不會查看、儲存或上傳你的資料。放心貼上敏感程式碼或 API 金鑰。",
  },
  "feat.fast.title": { en: "Results in milliseconds", "zh-Hans": "毫秒级出结果", "zh-Hant": "毫秒級出結果" },
  "feat.fast.desc": {
    en: "No loading spinners, no server roundtrips. Paste and get your result instantly. Works offline too — try turning off your WiFi.",
    "zh-Hans": "没有加载转圈,不走服务器。粘贴即得结果。断网也能用——试试关掉 WiFi。",
    "zh-Hant": "沒有載入轉圈,不走伺服器。貼上即得結果。離線也能用——試試關掉 Wi-Fi。",
  },
  "feat.free.title": { en: "No ads, no signup, no nonsense", "zh-Hans": "无广告、无注册、不啰嗦", "zh-Hant": "無廣告、無註冊、不囉嗦" },
  "feat.free.desc": {
    en: "Just open and use. No account required, no cookie banners, no premium upsells blocking features. Every tool is completely free.",
    "zh-Hans": "打开就用。无需账号,没有 cookie 横幅,没有付费墙挡住功能。每个工具都完全免费。",
    "zh-Hant": "開啟即用。無需帳號,沒有 cookie 橫幅,沒有付費牆擋住功能。每個工具都完全免費。",
  },
};

export function t(lang: Lang, key: string, vars?: Record<string, string | number>): string {
  const entry = DICT[key];
  let s = entry ? entry[lang] ?? entry.en : key;
  if (vars) {
    for (const k in vars) s = s.split(`{${k}}`).join(String(vars[k]));
  }
  return s;
}

// Per-language metadata for the homepage <head> (title/description).
export const HOME_META: Record<Lang, { title: string; description: string }> = {
  en: {
    title: "Doraemon Toolbox · 哆啦A梦的百宝箱",
    description:
      "An AI-powered toolbox — practical tools across US stocks, prediction markets, perpetuals, Meme, Agent and more.",
  },
  "zh-Hans": {
    title: "哆啦A梦的百宝箱 · Doraemon Toolbox",
    description:
      "AI 助力的百宝工具集 — 涵盖美股、预测市场、永续、Meme、Agent 等方向的实用工具。",
  },
  "zh-Hant": {
    title: "哆啦A夢的百寶箱 · Doraemon Toolbox",
    description:
      "AI 助力的百寶工具集 — 涵蓋美股、預測市場、永續、Meme、Agent 等方向的實用工具。",
  },
};
