// Neo-brutalist site content, ported from the newduola design and made trilingual.
// Language is driven by route (/, /zh-hans, /zh-hant), not a client toggle — see i18n.ts.
import type { Lang } from "@/lib/i18n"
import type { ProjectsMap } from "@/data/projects"

export type CategoryKey = keyof ProjectsMap
export type TabKey = "all" | CategoryKey
type Localized = Record<Lang, string>

/** Display order of the category tabs. */
export const CATEGORY_ORDER: CategoryKey[] = ["prediction", "perpdex", "agent", "web3", "security", "stock", "dev", "text", "convert", "calendar"]

/** Fallback category order for the "all" view when items share the same launch date. */
export const ALL_ORDER: CategoryKey[] = ["prediction", "perpdex", "agent", "web3", "security", "stock", "dev", "text", "convert", "calendar"]

export const TAB_ORDER: TabKey[] = ["all", ...CATEGORY_ORDER]

export const CATEGORY_META: Record<CategoryKey, { label: Localized; accent: string }> = {
  prediction: { label: { en: "Prediction Markets", "zh-Hans": "预测市场", "zh-Hant": "預測市場" }, accent: "#C4B5FD" },
  perpdex: { label: { en: "Perp DEX", "zh-Hans": "永续合约", "zh-Hant": "永續合約" }, accent: "#5EEAD4" },
  agent: { label: { en: "AI Agent", "zh-Hans": "AI 代理", "zh-Hant": "AI 代理" }, accent: "#F472B6" },
  web3: { label: { en: "Web3", "zh-Hans": "Web3", "zh-Hant": "Web3" }, accent: "#FDBA74" },
  security: { label: { en: "Security", "zh-Hans": "安全", "zh-Hant": "安全" }, accent: "#EF4444" },
  stock: { label: { en: "US Stocks", "zh-Hans": "美股", "zh-Hant": "美股" }, accent: "#FF6B6B" },
  dev: { label: { en: "Dev", "zh-Hans": "开发", "zh-Hant": "開發" }, accent: "#2F81F7" },
  text: { label: { en: "Text", "zh-Hans": "文本", "zh-Hant": "文字" }, accent: "#A78BFA" },
  convert: { label: { en: "Convert", "zh-Hans": "转换", "zh-Hant": "轉換" }, accent: "#34C759" },
  calendar: { label: { en: "Calendar", "zh-Hans": "日历", "zh-Hant": "日曆" }, accent: "#FACC15" },
}

export const TAB_META: Record<TabKey, { label: Localized; accent: string }> = {
  all: { label: { en: "All", "zh-Hans": "全部", "zh-Hant": "全部" }, accent: "#F5A623" },
  ...CATEGORY_META,
}

/** Products per page (4 rows × 3 columns). */
export const PAGE_SIZE = 12

export const X_URL = "https://x.com/hunterweb303"
export const TG_URL = "https://t.me/dsa885"
export const GITHUB_URL = "https://github.com/duolaAmengweb3"

type UIShape = {
  brand: string
  nav: { products: string }
  hero: {
    titleLead: string
    titleHighlight1: string
    titleMid: string
    titleHighlight2: string
    titleTail: string
    subtitle: string
    ctaProducts: string
    ctaX: string
    ctaTelegram: string
  }
  products: {
    heading: string
    headingHighlight: string
    countSuffix: string
    open: string
    empty: string
    prev: string
    next: string
  }
  badges: { new: string }
  ticker: string[]
  footer: { rights: string; privacy: string; terms: string }
}

export const UI: Record<Lang, UIShape> = {
  en: {
    brand: "Doraemon Toolbox",
    nav: { products: "Products" },
    hero: {
      titleLead: "A passionate, endlessly creative ",
      titleHighlight1: "AI Builder",
      titleMid: " ",
      titleHighlight2: "AI + Web3",
      titleTail: " workshop foreman",
      subtitle:
        "The best tools turn what few can do into what anyone can.",
      ctaProducts: "Browse products",
      ctaX: "Follow on X",
      ctaTelegram: "Join Telegram",
    },
    products: {
      heading: "Pick a tool and ",
      headingHighlight: "get started",
      countSuffix: " items",
      open: "Open",
      empty: "No products in this category yet.",
      prev: "Prev",
      next: "Next",
    },
    badges: { new: "New" },
    ticker: [
      "Nothing here is financial advice",
      "Call my product ugly — just never call me slow",
      "Everything is hand-crafted: no fillers, no preservatives",
      "Don't ask what I'm building next — I haven't decided either",
      "Ship fast, or ship faster. There is no option three.",
      "Doraemon takes wishes, tips, sponsorships, collabs — feed me any way you like",
      "This ad space is for rent",
    ],
    footer: { rights: "All rights reserved", privacy: "Privacy", terms: "Terms" },
  },
  "zh-Hans": {
    brand: "哆啦A梦的百宝箱",
    nav: { products: "产品" },
    hero: {
      titleLead: "一位热爱 + 创意无限的 ",
      titleHighlight1: "AI Builder",
      titleMid: " ",
      titleHighlight2: "AI+Web3",
      titleTail: " 生产车间主任",
      subtitle:
        "最好的工具,是把少数人的能力,变成所有人的日常。",
      ctaProducts: "浏览产品",
      ctaX: "关注 X",
      ctaTelegram: "进群聊聊",
    },
    products: {
      heading: "挑一个工具,",
      headingHighlight: "开始使用",
      countSuffix: " 项",
      open: "打开",
      empty: "该类目暂未上线产品。",
      prev: "上一页",
      next: "下一页",
    },
    badges: { new: "新品" },
    ticker: [
      "所有产品均不构成投资建议",
      "你可以说我的产品做得烂,但不能说我做得慢",
      "本站工具全部手搓,无香精无色素无防腐剂",
      "别问下一个产品做什么,我自己也没想好",
      "Ship fast,或者 ship faster —— 没有第三个选项",
      "哆啦接受许愿、打赏、商单、合作等一切投喂方式",
      "广告位招租",
    ],
    footer: { rights: "保留所有权利", privacy: "隐私政策", terms: "服务条款" },
  },
  "zh-Hant": {
    brand: "哆啦A夢的百寶箱",
    nav: { products: "產品" },
    hero: {
      titleLead: "一位熱愛 + 創意無限的 ",
      titleHighlight1: "AI Builder",
      titleMid: " ",
      titleHighlight2: "AI+Web3",
      titleTail: " 生產車間主任",
      subtitle:
        "最好的工具,是把少數人的能力,變成所有人的日常。",
      ctaProducts: "瀏覽產品",
      ctaX: "追蹤 X",
      ctaTelegram: "進群聊聊",
    },
    products: {
      heading: "挑一個工具,",
      headingHighlight: "開始使用",
      countSuffix: " 項",
      open: "開啟",
      empty: "該類目暫未上線產品。",
      prev: "上一頁",
      next: "下一頁",
    },
    badges: { new: "新品" },
    ticker: [
      "所有產品均不構成投資建議",
      "你可以說我的產品做得爛,但不能說我做得慢",
      "本站工具全部手搓,無香精無色素無防腐劑",
      "別問下一個產品做什麼,我自己也沒想好",
      "Ship fast,或者 ship faster —— 沒有第三個選項",
      "哆啦接受許願、打賞、商單、合作等一切投餵方式",
      "廣告位招租",
    ],
    footer: { rights: "保留所有權利", privacy: "隱私政策", terms: "服務條款" },
  },
}
