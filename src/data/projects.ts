import type { Lang } from "@/lib/i18n"

export type ProjectItem = {
  id: string
  title: Record<Lang, string>
  description: Record<Lang, string>
  url: string // external (https://) opens new tab; internal (/...) opens same tab
  isNew?: boolean
  launchedAt?: string // YYYY-MM-DD; used to sort the "all" view by launch date
}

export type ProjectsMap = {
  prediction: ProjectItem[]
  perpdex: ProjectItem[]
  agent: ProjectItem[]
  web3: ProjectItem[]
  stock: ProjectItem[]
  dev: ProjectItem[]
  text: ProjectItem[]
  convert: ProjectItem[]
  calendar: ProjectItem[]
}

export type ProjectEntry = {
  item: ProjectItem
  category: keyof ProjectsMap
}

export const projects: ProjectsMap = {
  prediction: [
    {
      id: "polyball",
      url: "https://polyball.manyaitool.com",
      title: {
        en: "PolyBall — Football Markets",
        "zh-Hans": "PolyBall — 足球预测市场",
        "zh-Hant": "PolyBall — 足球預測市場",
      },
      description: {
        en: "Pulls scattered Polymarket football markets, on-chain whale moves and match data into one decision-ready tool.",
        "zh-Hans": "把 Polymarket 上散落的足球盘口、链上巨鲸动向、比赛数据,整合成一个可以直接用来做决策的工具。",
        "zh-Hant": "把 Polymarket 上散落的足球盤口、鏈上巨鯨動向、比賽數據,整合成一個可以直接用來做決策的工具。",
      },
    },
    {
      id: "polyweather",
      url: "https://polyweather.manyaitool.com",
      title: {
        en: "PolyWeather",
        "zh-Hans": "PolyWeather",
        "zh-Hant": "PolyWeather",
      },
      description: {
        en: "Ensemble forecasts from 40 weather models to spot mispriced Polymarket weather markets.",
        "zh-Hans": "用 40 个气象模型的集合预测,帮你找到 Polymarket 天气盘口的定价偏差。",
        "zh-Hant": "用 40 個氣象模型的集合預測,幫你找到 Polymarket 天氣盤口的定價偏差。",
      },
    },
    {
      id: "polymix",
      url: "https://polymix.manyaitool.com",
      title: {
        en: "PolyMix",
        "zh-Hans": "PolyMix",
        "zh-Hant": "PolyMix",
      },
      description: {
        en: "Multi-platform odds comparison for NBA prediction markets across Polymarket, Kalshi and five major books.",
        "zh-Hans": "NBA 预测市场的多平台赔率对比,涵盖 Polymarket、Kalshi 及五大传统平台实时赔率变化。",
        "zh-Hant": "NBA 預測市場的多平台賠率對比,涵蓋 Polymarket、Kalshi 及五大傳統平台即時賠率變化。",
      },
    },
    {
      id: "polywhale",
      url: "https://polywhale.manyaitool.com",
      title: {
        en: "PolyWhale",
        "zh-Hans": "PolyWhale",
        "zh-Hant": "PolyWhale",
      },
      description: {
        en: "Whale detection across Polymarket and Kalshi — whale profiles, whale sentiment and top markets.",
        "zh-Hans": "Polymarket 以及 Kalshi 的巨鲸检测,包含巨鲸画像、巨鲸情绪、Top 市场等功能。",
        "zh-Hant": "Polymarket 以及 Kalshi 的巨鯨檢測,包含巨鯨畫像、巨鯨情緒、Top 市場等功能。",
      },
    },
    {
      id: "polynfl",
      url: "https://polynfl.manyaitool.com",
      title: {
        en: "PolyNFL",
        "zh-Hans": "PolyNFL",
        "zh-Hant": "PolyNFL",
      },
      description: {
        en: "One-stop NFL prediction-market analysis: game overview, weather impact, ESPN/Polymarket odds and live data.",
        "zh-Hans": "一站式 NFL 预测市场分析:比赛概览、天气影响评估、ESPN/Polymarket 赔率对比与实时数据更新。",
        "zh-Hant": "一站式 NFL 預測市場分析:比賽概覽、天氣影響評估、ESPN/Polymarket 賠率對比與即時數據更新。",
      },
    },
    {
      id: "polyarena",
      url: "https://polyarena.manyaitool.com",
      title: {
        en: "PolyNBA",
        "zh-Hans": "PolyNBA",
        "zh-Hant": "PolyNBA",
      },
      description: {
        en: "Aggregates Polymarket NBA markets with ESPN data — recent form, H2H, scoring trends and volume, all on one page.",
        "zh-Hans": "聚合 Polymarket NBA 市场与 ESPN 数据,提供近期战绩、H2H、得分趋势与交易量等关键信息,一页看全。",
        "zh-Hant": "聚合 Polymarket NBA 市場與 ESPN 數據,提供近期戰績、H2H、得分趨勢與交易量等關鍵資訊,一頁看全。",
      },
    },
    {
      id: "polylastchance",
      url: "https://polylastchance.manyaitool.com",
      title: {
        en: "PolyLastChance",
        "zh-Hans": "PolyLastChance",
        "zh-Hant": "PolyLastChance",
      },
      description: {
        en: "An end-of-session monitor with live prices and opportunity alerts to cash in on last-chance plays.",
        "zh-Hans": "尾盘监控工具,实时币价、机会提醒,实现尾盘策略变现。",
        "zh-Hant": "尾盤監控工具,即時幣價、機會提醒,實現尾盤策略變現。",
      },
    },
    {
      id: "polyseer",
      url: "https://github.com/duolaAmengweb3/polyseer",
      title: {
        en: "PolySeer",
        "zh-Hans": "PolySeer",
        "zh-Hant": "PolySeer",
      },
      description: {
        en: "A deep AI tool for prediction markets.",
        "zh-Hans": "预测市场深度 AI 工具。",
        "zh-Hant": "預測市場深度 AI 工具。",
      },
    },
    {
      id: "polysurge",
      url: "https://github.com/duolaAmengweb3/polysurge",
      title: {
        en: "PolySurge",
        "zh-Hans": "PolySurge",
        "zh-Hant": "PolySurge",
      },
      description: {
        en: "Real-time anomaly signals across 100 high-liquidity Polymarket markets — catch moves first.",
        "zh-Hans": "实时监控 Polymarket 100 个高流动性市场的异常信号,帮你第一时间发现市场异动。",
        "zh-Hant": "即時監控 Polymarket 100 個高流動性市場的異常訊號,幫你第一時間發現市場異動。",
      },
    },
  ],
  perpdex: [
    {
      id: "proofrank",
      url: "https://proofrank.manyaitool.com",
      isNew: true,
      launchedAt: "2026-06-24",
      title: {
        en: "ProofRank — Hyperliquid Vault Check",
        "zh-Hans": "真榜 ProofRank — 金库跟投前验真",
        "zh-Hant": "真榜 ProofRank — 金庫跟投前驗真",
      },
      description: {
        en: "Check Hyperliquid vaults before you copy them: real APR, drawdown, recent PnL and risk verdicts translated into plain language.",
        "zh-Hans": "跟投 Hyperliquid 金库前,先看清真实收益、最大回撤、近期 PnL 和风险判断,别只被高 APR 带上车。",
        "zh-Hant": "跟投 Hyperliquid 金庫前,先看清真實收益、最大回撤、近期 PnL 和風險判斷,別只被高 APR 帶上車。",
      },
    },
    {
      id: "perpoiradar",
      url: "https://perpoiradar.manyaitool.com",
      title: {
        en: "PerpOIRadar",
        "zh-Hans": "PerpOIRadar — 持仓量雷达",
        "zh-Hant": "PerpOIRadar — 持倉量雷達",
      },
      description: {
        en: "Tracks open-interest (OI) changes across exchanges in real time.",
        "zh-Hans": "实时追踪交易所的持仓量(OI)变化。",
        "zh-Hant": "即時追蹤交易所的持倉量(OI)變化。",
      },
    },
    {
      id: "perpfunding",
      url: "https://perpfunding.manyaitool.com",
      title: {
        en: "PerpFunding",
        "zh-Hans": "PerpFunding",
        "zh-Hant": "PerpFunding",
      },
      description: {
        en: "A cross-exchange perpetual funding-rate radar — a tool for steady funding-rate arbitrage.",
        "zh-Hans": "跨平台永续合约资金费率雷达 —— 帮你每年「躺赚」的费率套利工具。",
        "zh-Hant": "跨平台永續合約資金費率雷達 —— 幫你每年「躺賺」的費率套利工具。",
      },
    },
    {
      id: "hypersmart",
      url: "https://hypersmart.manyaitool.com",
      title: {
        en: "HyperSmart",
        "zh-Hans": "HyperSmart",
        "zh-Hant": "HyperSmart",
      },
      description: {
        en: "Before you copy a trader, backtest them on historical data to see the real returns.",
        "zh-Hans": "跟单之前,先用历史数据跑一遍,看看收益到底怎么样。",
        "zh-Hant": "跟單之前,先用歷史數據跑一遍,看看收益到底怎麼樣。",
      },
    },
  ],
  agent: [
    {
      id: "solana-alpha-tracker",
      url: "https://solana-alpha-tracker.pages.dev",
      title: {
        en: "Solana Alpha Tracker",
        "zh-Hans": "Solana Alpha Tracker",
        "zh-Hant": "Solana Alpha Tracker",
      },
      description: {
        en: "An MCP that watches top Solana wallets for you — 38 built-in smart-money traders, entry-quality scoring and cluster signals, so you just ask Claude 'should I copy this trade?'",
        "zh-Hans": "替你盯 Solana 大佬钱包的跟单 MCP——38 个内置名人钱包、入场质量评分与集群信号,直接问 Claude「这单能跟吗」。",
        "zh-Hant": "替你盯 Solana 大佬錢包的跟單 MCP——38 個內建名人錢包、入場品質評分與叢集訊號,直接問 Claude「這單能跟嗎」。",
      },
    },
    {
      id: "airdrop-hunter",
      url: "https://airdrop-hunter-aii.pages.dev",
      title: {
        en: "Airdrop Hunter",
        "zh-Hans": "Airdrop Hunter",
        "zh-Hant": "Airdrop Hunter",
      },
      description: {
        en: "Multi-wallet airdrop scanner with sybil radar — sweep a batch of wallets across 12 high-value points/rewards projects in one query; hits, misses, claim status and sybil risk at once.",
        "zh-Hans": "撸号党的多钱包扫描器 + 女巫雷达——一组钱包一句话扫完 12 个高价值积分/空投项目,命中、漏项、claim 状态、女巫风险一次出。",
        "zh-Hant": "擼號黨的多錢包掃描器 + 女巫雷達——一組錢包一句話掃完 12 個高價值積分/空投項目,命中、漏項、claim 狀態、女巫風險一次出。",
      },
    },
    {
      id: "pendle-mcp",
      url: "https://pendle-mcp.pages.dev",
      title: {
        en: "Pendle MCP",
        "zh-Hans": "Pendle MCP",
        "zh-Hant": "Pendle MCP",
      },
      description: {
        en: "An MCP for DeFi's biggest yield market — scan 700+ PT fixed-yield markets across 10 chains, PT leverage loops with precise liquidation bounds, and Boros funding-rate spreads.",
        "zh-Hans": "DeFi 最大收益市场的 MCP——跨 10 条链扫描 700+ PT 固收市场、带精确爆仓边界的 PT 杠杆循环、Boros 资金费率价差锁定。",
        "zh-Hant": "DeFi 最大收益市場的 MCP——跨 10 條鏈掃描 700+ PT 固收市場、帶精確爆倉邊界的 PT 槓桿循環、Boros 資金費率價差鎖定。",
      },
    },
    {
      id: "walletradar",
      url: "https://walletradar.pages.dev",
      title: {
        en: "Wallet Radar",
        "zh-Hans": "Wallet Radar",
        "zh-Hant": "Wallet Radar",
      },
      description: {
        en: "A durable multi-wallet MCP — a 5–200 address watchlist with cross-protocol liquidation monitoring (Aave/Compound/Morpho/Spark) and price-impact simulation, remembered across sessions.",
        "zh-Hans": "持久化多钱包 MCP——5–200 个地址长期 watchlist,跨协议清算监控(Aave/Compound/Morpho/Spark)+ 价格冲击模拟,跨 session 永久记忆。",
        "zh-Hant": "持久化多錢包 MCP——5–200 個地址長期 watchlist,跨協議清算監控(Aave/Compound/Morpho/Spark)+ 價格衝擊模擬,跨 session 永久記憶。",
      },
    },
    {
      id: "token-xray",
      url: "https://token-xray.pages.dev",
      title: {
        en: "Token Xray",
        "zh-Hans": "Token Xray",
        "zh-Hant": "Token Xray",
      },
      description: {
        en: "An agent-native token safety MCP — fuses contract, deployer reputation, LP-lock authenticity and bridged-fund detection into one green/yellow/red verdict; catches serial ruggers others miss.",
        "zh-Hans": "agent 原生的土狗安检 MCP——合约、部署者信誉、LP 锁仓真实性、桥入资金四维融合,一次出绿黄红;能抓到别家漏报的连环 rugger。",
        "zh-Hant": "agent 原生的土狗安檢 MCP——合約、部署者信譽、LP 鎖倉真實性、橋入資金四維融合,一次出綠黃紅;能抓到別家漏報的連環 rugger。",
      },
    },
    {
      id: "funding-arb-scanner",
      url: "https://funding-arb-scanner.pages.dev",
      title: {
        en: "Funding Arb Scanner",
        "zh-Hans": "Funding Arb Scanner",
        "zh-Hant": "Funding Arb Scanner",
      },
      description: {
        en: "The first funding-arb MCP that computes NET returns — across 9 exchanges it subtracts taker fees to give you net USD and break-even hours, not just the raw spread.",
        "zh-Hans": "第一个会算「净值」的 funding 套利 MCP——覆盖 9 家交易所,扣完 taker fee 给你 NET 美元 + 回本小时数,不只是毛 spread。",
        "zh-Hant": "第一個會算「淨值」的 funding 套利 MCP——覆蓋 9 家交易所,扣完 taker fee 給你 NET 美元 + 回本小時數,不只是毛 spread。",
      },
    },
  ],
  web3: [
    {
      id: "zaogengmao",
      url: "https://zaogengmao.manyaitool.com",
      title: {
        en: "MemeCat",
        "zh-Hans": "造梗猫",
        "zh-Hant": "造梗貓",
      },
      description: {
        en: "Paste a tweet and AI generates the meme coin's name, ticker and logo — and tells you why it could pop.",
        "zh-Hans": "粘贴一条推文,AI 帮你生成 Meme 币的名字、符号、Logo,还告诉你为什么能火。",
        "zh-Hant": "貼上一條推文,AI 幫你生成 Meme 幣的名字、符號、Logo,還告訴你為什麼能火。",
      },
    },
    {
      id: "destiny-bureau",
      url: "https://destiny-bureau.manyaitool.com",
      title: {
        en: "On-Chain Destiny Bureau",
        "zh-Hans": "链上命理局",
        "zh-Hant": "鏈上命理局",
      },
      description: {
        en: "A daily reading so you never choose wrong — on-chain mysticism, 'scientific' fortune-telling.",
        "zh-Hans": "每天测一测,选择不会错。链上玄学,科学算命。",
        "zh-Hant": "每天測一測,選擇不會錯。鏈上玄學,科學算命。",
      },
    },
  ],
  stock: [
    {
      id: "spacex-ipo-radar",
      url: "https://spacex.manyaitool.com",
      title: {
        en: "SpaceX IPO Radar — Tokenized Exposure & Valuation",
        "zh-Hans": "SpaceX 上市雷达 — 代币化敞口与估值",
        "zh-Hant": "SpaceX 上市雷達 — 代幣化敞口與估值",
      },
      description: {
        en: "A pre-trade checklist for tokenized SpaceX exposure: which products are backed by real securities, which are SPVs, notes, or synthetic perps, whether the on-chain implied valuation is expensive, and how much funding costs can eat into a long position.",
        "zh-Hans": "把全网 SpaceX 敞口摊到一页:真券背书、SPV、镜像票据、合成永续分别是什么,链上隐含估值是否已经买贵,做多资金费会不会吃掉利润。帮你在上车前先看清别被骗、别买贵、别买错。",
        "zh-Hant": "把全網 SpaceX 敞口攤到一頁:真券背書、SPV、鏡像票據、合成永續分別是什麼,鏈上隱含估值是否已經買貴,做多資金費會不會吃掉利潤。幫你在上車前先看清別被騙、別買貴、別買錯。",
      },
    },
    {
      id: "onchain-equity",
      url: "https://equity.manyaitool.com",
      title: {
        en: "Onchain Equity Desk — Perp Premium & Funding",
        "zh-Hans": "链上美股盘口 — 永续溢价与资金费",
        "zh-Hant": "鏈上美股盤口 — 永續溢價與資金費",
      },
      description: {
        en: "See US stocks the way they trade on-chain: perp premium vs real price, hourly funding rates, and Solana spot xStock premiums for 58 tickers — one screen. Plus live implied valuations for pre-IPO names like SpaceX, OpenAI, Anthropic. Data from Hyperliquid & Jupiter, 24/7.",
        "zh-Hans": "把链上的美股摊开看:58只美股的永续合约溢价、每小时资金费率,加 Solana 现货 xStock 溢价,一屏看全。还能看 SpaceX、OpenAI、Anthropic 这些没上市公司的链上隐含估值。数据来自 Hyperliquid 与 Jupiter,24/7 更新。",
        "zh-Hant": "把鏈上的美股攤開看:58只美股的永續合約溢價、每小時資金費率,加 Solana 現貨 xStock 溢價,一屏看全。還能看 SpaceX、OpenAI、Anthropic 這些沒上市公司的鏈上隱含估值。資料來自 Hyperliquid 與 Jupiter,24/7 更新。",
      },
    },
    {
      id: "tqqq-radar",
      url: "https://tqqq.manyaitool.com",
      title: {
        en: "TQQQ Traffic Light — Leveraged ETF Timing",
        "zh-Hans": "TQQQ 红绿灯 — 杠杆ETF择时",
        "zh-Hant": "TQQQ 紅綠燈 — 槓桿ETF擇時",
      },
      description: {
        en: "A dead-simple red/green light for leveraged ETFs (TQQQ/UPRO/SOXL): green = hold, red = move to cash to dodge crashes. Nasdaq monthly-MA signal, real backtest cuts max drawdown from −81% to −36.5%. Signal over advice — free, no login.",
        "zh-Hans": "给小白的杠杆ETF红绿灯(TQQQ/UPRO/SOXL):绿灯持有、红灯换现金躲暴跌。用纳指月线判定,真实回测把最大回撤从-81%压到-36.5%。信号>投资指导,只给客观信号不荐股,每日更新、免费。",
        "zh-Hant": "給小白的槓桿ETF紅綠燈(TQQQ/UPRO/SOXL):綠燈持有、紅燈換現金躲暴跌。用納指月線判定,真實回測把最大回撤從-81%壓到-36.5%。訊號>投資指導,只給客觀訊號不薦股,每日更新、免費。",
      },
    },
    {
      id: "guru-13f",
      url: "https://13f.manyaitool.com",
      title: {
        en: "GuruFolio — Guru 13F Tracker",
        "zh-Hans": "美股巨鲸 — 大佬 13F 跟单",
        "zh-Hant": "美股巨鯨 — 大佬 13F 跟單",
      },
      description: {
        en: "Turn SEC 13F filings into a smart-money signal. See what Buffett, Burry, and Ackman buy each quarter, with consensus and conviction scores across 80+ gurus.",
        "zh-Hans": "把 SEC 13F 申报变成聪明钱信号。看巴菲特、Burry、Ackman 等 80+ 大佬每季买了什么,附共识与信念评分。",
        "zh-Hant": "把 SEC 13F 申報變成聰明錢訊號。看巴菲特、Burry、Ackman 等 80+ 大佬每季買了什麼,附共識與信念評分。",
      },
    },
    {
      id: "magic-formula",
      url: "https://magicformula.manyaitool.com",
      title: {
        en: "Magic Formula Screener",
        "zh-Hans": "美股神奇公式",
        "zh-Hant": "美股神奇公式",
      },
      description: {
        en: "Greenblatt's Magic Formula ranking with backtests — the most famous value screen, combining earnings yield and return on capital, refreshed from SEC fundamentals.",
        "zh-Hans": "把对冲基金经理 Greenblatt 写进畅销书的「神奇公式」做成实时榜单 + 回测:盈利收益率 × 资本回报率,数据来自 SEC 财报。",
        "zh-Hant": "把對沖基金經理 Greenblatt 寫進暢銷書的「神奇公式」做成即時榜單 + 回測:盈利收益率 × 資本回報率,資料來自 SEC 財報。",
      },
    },
    {
      id: "congress-radar",
      url: "https://congress.manyaitool.com",
      title: {
        en: "Power & Money Radar — Congress Trades",
        "zh-Hans": "权钱雷达 — 国会交易监督",
        "zh-Hant": "權錢雷達 — 國會交易監督",
      },
      description: {
        en: "Track Congress members' stock trades and conflict-of-interest red flags (defense committee buying defense stocks, etc.). Signal over advice — we expose power, not stock tips.",
        "zh-Hans": "盯紧议员的美股交易与利益冲突红旗墙(军委买军火股等)。信号 > 投资指导——看穿权力,不教跟单。",
        "zh-Hant": "盯緊議員的美股交易與利益衝突紅旗牆(軍委買軍火股等)。訊號 > 投資指導——看穿權力,不教跟單。",
      },
    },
  ],
  dev: [
    {
      id: "ai-lawfirm",
      url: "https://github.com/duolaAmengweb3/ai-lawfirm",
      isNew: true,
      title: {
        en: "Visible AI Law Firm",
        "zh-Hans": "看得见的 AI 律所",
        "zh-Hant": "看得見的 AI 律所",
      },
      description: {
        en: "Open-source: watch a team of 8 AI lawyers work your case live — intake, analysis, comp calc, evidence, drafting the arbitration filing. Comp math is rule-based (never wrong); the LLM handles reasoning. Cloudflare Workers + Hono + React.",
        "zh-Hans": "开源:8 位 AI 律师当你面办案——接案、定性、算赔偿、列证据、起草仲裁申请书,全程可视化。赔偿数字走规则引擎(不会算错),LLM 只负责定性与策略。Cloudflare Workers + Hono + React。",
        "zh-Hant": "開源:8 位 AI 律師當你面辦案——接案、定性、算賠償、列證據、起草仲裁申請書,全程可視化。賠償數字走規則引擎(不會算錯),LLM 只負責定性與策略。Cloudflare Workers + Hono + React。",
      },
    },
    {
      id: "json-formatter",
      url: "/tools/json-formatter",
      title: { en: "JSON Formatter", "zh-Hans": "JSON 格式化", "zh-Hant": "JSON 格式化" },
      description: {
        en: "Beautify, minify, and validate JSON in one click. Runs fully in your browser.",
        "zh-Hans": "一键美化、压缩、校验 JSON,全程在浏览器里运行。",
        "zh-Hant": "一鍵美化、壓縮、校驗 JSON,全程在瀏覽器裡執行。",
      },
    },
    {
      id: "base64-encoder",
      url: "/tools/base64-encoder",
      title: { en: "Base64 Encoder", "zh-Hans": "Base64 编码", "zh-Hant": "Base64 編碼" },
      description: {
        en: "Encode and decode Base64 with full Unicode support.",
        "zh-Hans": "支持完整 Unicode 的 Base64 编解码。",
        "zh-Hant": "支援完整 Unicode 的 Base64 編解碼。",
      },
    },
    {
      id: "jwt-decoder",
      url: "/tools/jwt-decoder",
      title: { en: "JWT Decoder", "zh-Hans": "JWT 解码", "zh-Hant": "JWT 解碼" },
      description: {
        en: "Decode tokens, check expiry, and inspect claims in seconds.",
        "zh-Hans": "秒级解码 token、查过期、看 claims。",
        "zh-Hant": "秒級解碼 token、查過期、看 claims。",
      },
    },
    {
      id: "color-picker",
      url: "/tools/color-picker",
      title: { en: "Color Picker", "zh-Hans": "取色器", "zh-Hant": "取色器" },
      description: {
        en: "Pick any color and get HEX, RGB, and HSL instantly.",
        "zh-Hans": "取任意颜色,即得 HEX / RGB / HSL。",
        "zh-Hant": "取任意顏色,即得 HEX / RGB / HSL。",
      },
    },
  ],
  text: [
    {
      id: "word-counter",
      url: "/tools/word-counter",
      title: { en: "Word Counter", "zh-Hans": "字数统计", "zh-Hant": "字數統計" },
      description: {
        en: "Words, characters, sentences, and reading time — live as you type.",
        "zh-Hans": "实时统计字数、字符、句子和阅读时间。",
        "zh-Hant": "即時統計字數、字元、句子和閱讀時間。",
      },
    },
    {
      id: "ai-token-calculator",
      url: "/tools/ai-token-calculator",
      title: { en: "AI Token Calculator", "zh-Hans": "AI Token 计算器", "zh-Hant": "AI Token 計算器" },
      description: {
        en: "Compare token costs across GPT, Claude, Gemini, and 20+ models.",
        "zh-Hans": "对比 GPT、Claude、Gemini 等 20+ 模型的 token 成本。",
        "zh-Hant": "對比 GPT、Claude、Gemini 等 20+ 模型的 token 成本。",
      },
    },
    {
      id: "markdown-to-html",
      url: "/tools/markdown-to-html",
      title: { en: "Markdown → HTML", "zh-Hans": "Markdown 转 HTML", "zh-Hant": "Markdown 轉 HTML" },
      description: {
        en: "Side-by-side Markdown editor with a live HTML preview.",
        "zh-Hans": "左右分栏 Markdown 编辑器,实时预览 HTML。",
        "zh-Hant": "左右分欄 Markdown 編輯器,即時預覽 HTML。",
      },
    },
    {
      id: "lorem-ipsum-generator",
      url: "/tools/lorem-ipsum-generator",
      title: { en: "Lorem Ipsum", "zh-Hans": "占位文本", "zh-Hant": "佔位文字" },
      description: {
        en: "Generate placeholder text by paragraphs, sentences, or word count.",
        "zh-Hans": "按段落、句子或词数生成占位文本。",
        "zh-Hant": "按段落、句子或字數生成佔位文字。",
      },
    },
  ],
  convert: [
    {
      id: "timestamp-converter",
      url: "/tools/timestamp-converter",
      title: { en: "Timestamp Converter", "zh-Hans": "时间戳转换", "zh-Hant": "時間戳轉換" },
      description: {
        en: "Convert Unix epoch to human dates and back, with a live clock.",
        "zh-Hans": "Unix 时间戳与日期互转,带实时时钟。",
        "zh-Hant": "Unix 時間戳與日期互轉,帶即時時鐘。",
      },
    },
    {
      id: "svg-to-png",
      url: "/tools/svg-to-png",
      title: { en: "SVG → PNG", "zh-Hans": "SVG 转 PNG", "zh-Hant": "SVG 轉 PNG" },
      description: {
        en: "Upload SVG, choose scale and background, download PNG.",
        "zh-Hans": "上传 SVG,设置缩放与背景,导出 PNG。",
        "zh-Hant": "上傳 SVG,設定縮放與背景,匯出 PNG。",
      },
    },
    {
      id: "image-to-base64",
      url: "/tools/image-to-base64",
      title: { en: "Image → Base64", "zh-Hans": "图片转 Base64", "zh-Hant": "圖片轉 Base64" },
      description: {
        en: "Turn any image into Base64, a data URI, an HTML tag, or CSS.",
        "zh-Hans": "把任意图片转成 Base64 / data URI / HTML / CSS。",
        "zh-Hant": "把任意圖片轉成 Base64 / data URI / HTML / CSS。",
      },
    },
  ],
  calendar: [
    {
      id: "moon-phase-calendar",
      url: "/tools/moon-phase-calendar",
      title: { en: "Moon Phase Calendar", "zh-Hans": "月相日历", "zh-Hant": "月相日曆" },
      description: {
        en: "Tonight's moon phase, the next full-moon countdown, and the 2026 calendar.",
        "zh-Hans": "今晚月相、下一次满月倒计时,以及 2026 月相日历。",
        "zh-Hant": "今晚月相、下一次滿月倒數,以及 2026 月相日曆。",
      },
    },
    {
      id: "national-days-calendar",
      url: "/tools/national-days-calendar",
      title: { en: "National Days", "zh-Hans": "国际节日", "zh-Hant": "國際節日" },
      description: {
        en: "See what national day it is today and what fun days are coming up.",
        "zh-Hans": "看今天是什么节日,以及接下来有哪些有趣的日子。",
        "zh-Hant": "看今天是什麼節日,以及接下來有哪些有趣的日子。",
      },
    },
  ],
}

export function getProjectEntries(): ProjectEntry[] {
  return (Object.keys(projects) as Array<keyof ProjectsMap>).flatMap((category) =>
    projects[category].map((item) => ({ item, category })),
  )
}

export function getExternalProjectEntries(): ProjectEntry[] {
  return getProjectEntries().filter(({ item }) => item.url.startsWith("http"))
}

export function getProjectById(id: string): ProjectEntry | undefined {
  return getProjectEntries().find(({ item }) => item.id === id)
}
