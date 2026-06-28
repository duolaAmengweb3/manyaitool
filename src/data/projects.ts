import type { Lang } from "@/lib/i18n"

export type ProjectItem = {
  id: string
  title: Record<Lang, string>
  description: Record<Lang, string>
  url: string // external (https://) opens new tab; internal (/...) opens same tab
  isNew?: boolean
  pinned?: boolean // sticks to the front of the "all" view + gets the dark featured card style
  launchedAt?: string // YYYY-MM-DD; used to sort the "all" view by launch date
}

export type ProjectsMap = {
  prediction: ProjectItem[]
  perpdex: ProjectItem[]
  agent: ProjectItem[]
  web3: ProjectItem[]
  security: ProjectItem[]
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
  security: [
    {
      id: "duolasafe",
      url: "https://duolasafe.manyaitool.com",
      isNew: true,
      pinned: true,
      title: {
        en: "DuoLaSafe — Web3 Security Audits & Forensics",
        "zh-Hans": "DuoLaSafe — Web3 安全审计与链上取证",
        "zh-Hant": "DuoLaSafe — Web3 安全審計與鏈上取證",
      },
      description: {
        en: "Smart-contract audits, on-chain forensics and asset-recovery support — every report public, PoC-backed, with an adversarial ruled-out section.",
        "zh-Hans": "智能合约审计、链上取证、被盗资产追回协助 —— 每份报告公开、带可运行 PoC、含对抗性排除章节,不做盖章式审计。",
        "zh-Hant": "智能合約審計、鏈上取證、被盜資產追回協助 —— 每份報告公開、帶可運行 PoC、含對抗性排除章節,不做蓋章式審計。",
      },
    },
    {
      id: "polymarket",
      url: "https://polymarket.manyaitool.com",
      title: {
        en: "Polymarket $2.9M fund-tracking investigation",
        "zh-Hans": "Polymarket $2.9M 资金追踪与取证",
        "zh-Hant": "Polymarket $2.9M 資金追蹤與取證",
      },
      description: {
        en: "A frontend supply-chain attack drained ~$2.9M from 11 users. The press said the funds still sit in the consolidation wallet — we traced the chain: already moved, split and idle across 3 wallets, plus the address-poisoning targeting the loot. A verifiable, dated on-chain snapshot.",
        "zh-Hans": "前端供应链攻击盗走 11 个用户约 $2.9M。媒体说钱还在归集钱包——我们上链取证:钱早转走,分散静置在 3 个钱包,还揪出针对赃款的地址投毒。做成可复核的链上快照页。",
        "zh-Hant": "前端供應鏈攻擊盜走 11 個用戶約 $2.9M。媒體說錢還在歸集錢包——我們上鍊取證:錢早轉走,分散靜置在 3 個錢包,還揪出針對贓款的地址投毒。做成可複核的鏈上快照頁。",
      },
    },
    {
      id: "verus-bridge",
      url: "https://github.com/duolaAmengweb3/DuoLaSafe-Audits/blob/main/%E9%93%BE%E4%B8%8A%E8%B0%83%E6%9F%A5/Verus%E6%A1%A5-%E6%8A%80%E6%9C%AF%E5%A4%8D%E7%9B%98.md",
      title: {
        en: "Verus bridge $11.58M post-mortem",
        "zh-Hans": "Verus 跨链桥 $11.58M 技术复盘",
        "zh-Hant": "Verus 跨鏈橋 $11.58M 技術覆盤",
      },
      description: {
        en: "The bridge's submitImports never enforced cross-chain amount conservation; $11.58M drained, swapped to 5,402 ETH. A full 7-section root-cause + attack-tx breakdown with fund tracing: reported as \"funds unmoved,\" yet on-chain the loot split out (4,052+1,350 ETH) just 3 days later and the wallet was empty by Jun 27.",
        "zh-Hans": "桥的 submitImports 没校验跨端金额守恒,被盗 $11.58M、换成 5,402 ETH。按 7 段取证模板复盘根因 + 攻击 tx,并追踪资金:PeckShield 称“资金未动”,我们实证案发仅 3 天后赃款已分两笔(4052+1350 ETH)转走,6/27 钱包已清空。",
        "zh-Hant": "橋的 submitImports 沒校驗跨端金額守恆,被盜 $11.58M、換成 5,402 ETH。按 7 段取證模板覆盤根因 + 攻擊 tx,並追蹤資金:PeckShield 稱“資金未動”,我們實證案發僅 3 天后贓款已分兩筆(4052+1350 ETH)轉走,6/27 錢包已清空。",
      },
    },
    {
      id: "humanity-protocol",
      url: "https://github.com/duolaAmengweb3/DuoLaSafe-Audits/blob/main/%E9%93%BE%E4%B8%8A%E8%B0%83%E6%9F%A5/Humanity-36M%E4%BA%8B%E4%BB%B6%E5%88%86%E6%9E%90.md",
      title: {
        en: "Humanity Protocol $36M analysis",
        "zh-Hans": "Humanity Protocol $36M 事件分析",
        "zh-Hant": "Humanity Protocol $36M 事件分析",
      },
      description: {
        en: "Not a contract bug — a fake multisig: the 7 keys controlling the token and bridge were all backed up on one developer's laptop, and a single Bithumb-spoofing phishing email took the lot, moving ~447M $H across ETH/BSC. A 7-section root-cause + attack-flow breakdown; Quantstamp attributes it to DPRK.",
        "zh-Hans": "合约一行没坏——假多签:控制代币与桥的 7 把私钥全备份在一台开发者笔记本上,一封冒充 Bithumb 的钓鱼邮件就拿下全部权限,跨 ETH/BSC 动用约 447M $H。按 7 段模板拆根因 + 攻击流程,Quantstamp 归因朝鲜。",
        "zh-Hant": "合約一行沒壞——假多籤:控制代幣與橋的 7 把私鑰全備份在一臺開發者筆記本上,一封冒充 Bithumb 的釣魚郵件就拿下全部權限,跨 ETH/BSC 動用約 447M $H。按 7 段模板拆根因 + 攻擊流程,Quantstamp 歸因朝鮮。",
      },
    },
    {
      id: "bybit",
      url: "https://github.com/duolaAmengweb3/DuoLaSafe-Audits/blob/main/%E9%93%BE%E4%B8%8A%E8%B0%83%E6%9F%A5/Bybit-15%E4%BA%BF-SafeUI%E6%94%BB%E5%87%BB.md",
      title: {
        en: "Bybit $1.5B — the largest hack ever",
        "zh-Hans": "Bybit $1.5B 史上最大盗窃复盘",
        "zh-Hant": "Bybit $1.5B 史上最大盜竊覆盤",
      },
      description: {
        en: "Lazarus tampered Safe{Wallet}'s frontend JS, swapping a cold-wallet transfer for a DELEGATECALL that replaced the implementation and drained the vault. We verified on-chain that the Safe's slot0 still points to the malicious contract. A 7-section breakdown.",
        "zh-Hans": "Lazarus 篡改 Safe{Wallet} 前端 JS,把一笔冷钱包转账偷换成 DELEGATECALL、替换实现合约后清空金库。我方 cast 复核:该 Safe 的 slot0 至今仍指向恶意合约。7 段技术复盘。",
        "zh-Hant": "Lazarus 篡改 Safe{Wallet} 前端 JS,把一筆冷錢包轉賬偷換成 DELEGATECALL、替換實現合約後清空金庫。我方 cast 複核:該 Safe 的 slot0 至今仍指向惡意合約。7 段技術覆盤。",
      },
    },
    {
      id: "kelpdao",
      url: "https://github.com/duolaAmengweb3/DuoLaSafe-Audits/blob/main/%E9%93%BE%E4%B8%8A%E8%B0%83%E6%9F%A5/KelpDAO-292M-%E8%B7%A8%E9%93%BE%E6%A1%A5.md",
      title: {
        en: "KelpDAO $292M bridge hack",
        "zh-Hans": "KelpDAO $292M 跨链桥复盘",
        "zh-Hant": "KelpDAO $292M 跨鏈橋覆盤",
      },
      description: {
        en: "A 1-of-1 LayerZero DVN was poisoned via compromised RPC nodes + DDoS failover, forging a phantom source-chain burn to mint 116,500 unbacked rsETH. We verified the mint tx, GUID, Tornado funding and Arbitrum freeze. Attributed to Lazarus.",
        "zh-Hans": "LayerZero 单 DVN 被 RPC 污染 + DDoS 故障切换攻陷,伪造源链销毁消息凭空铸造 116,500 rsETH。我方核实了铸币 tx、GUID、Tornado 资助与 Arbitrum 冻结。归因朝鲜 Lazarus。",
        "zh-Hant": "LayerZero 單 DVN 被 RPC 汙染 + DDoS 故障切換攻陷,偽造源鏈銷燬消息憑空鑄造 116,500 rsETH。我方核實了鑄幣 tx、GUID、Tornado 資助與 Arbitrum 凍結。歸因朝鮮 Lazarus。",
      },
    },
    {
      id: "drift",
      url: "https://github.com/duolaAmengweb3/DuoLaSafe-Audits/blob/main/%E9%93%BE%E4%B8%8A%E8%B0%83%E6%9F%A5/Drift-285M-%E8%AE%BF%E9%97%AE%E6%8E%A7%E5%88%B6.md",
      title: {
        en: "Drift $285M access-control takeover",
        "zh-Hans": "Drift $285M 访问控制失守",
        "zh-Hant": "Drift $285M 訪問控制失守",
      },
      description: {
        en: "Not a contract bug: attackers spent 6 months social-engineering into the Security Council via a fake trading firm, weaponizing Solana durable nonces to pre-sign admin transfers and drain vaults with fake collateral. Attributed to DPRK.",
        "zh-Hans": "非合约漏洞:攻击者用假交易公司身份花 6 个月渗透 Security Council,利用 Solana durable nonce 预签名诱导盲签,夺管理员权、假抵押抽干金库。归因 DPRK。",
        "zh-Hant": "非合約漏洞:攻擊者用假交易公司身份花 6 個月滲透 Security Council,利用 Solana durable nonce 預簽名誘導盲籤,奪管理員權、假抵押抽乾金庫。歸因 DPRK。",
      },
    },
    {
      id: "resolv",
      url: "https://github.com/duolaAmengweb3/DuoLaSafe-Audits/blob/main/%E9%93%BE%E4%B8%8A%E8%B0%83%E6%9F%A5/Resolv-25M-KMS%E5%AF%86%E9%92%A5.md",
      title: {
        en: "Resolv $25M KMS key compromise",
        "zh-Hans": "Resolv $25M KMS 密钥失守",
        "zh-Hant": "Resolv $25M KMS 密鑰失守",
      },
      description: {
        en: "Resolv's AWS KMS signing key was compromised, minting 80M unbacked USR from ~$100K USDC via two completeSwap calls and cashing out ~11K ETH. Root cause: a single off-chain key plus no on-chain mint cap. On-chain verified.",
        "zh-Hans": "AWS KMS 云端特权签名密钥被攻破,用约 $10 万 USDC 触发两笔 completeSwap 凭空增发 8000 万无抵押 USR、套现约 1.1 万 ETH。根因:链下单点密钥 + 合约无铸币上限。链上已核。",
        "zh-Hant": "AWS KMS 雲端特權簽名密鑰被攻破,用約 $10 萬 USDC 觸發兩筆 completeSwap 憑空增發 8000 萬無抵押 USR、套現約 1.1 萬 ETH。根因:鏈下單點密鑰 + 合約無鑄幣上限。鏈上已核。",
      },
    },
    {
      id: "truebit",
      url: "https://github.com/duolaAmengweb3/DuoLaSafe-Audits/blob/main/%E9%93%BE%E4%B8%8A%E8%B0%83%E6%9F%A5/Truebit-26M-%E6%95%B4%E6%95%B0%E6%BA%A2%E5%87%BA.md",
      title: {
        en: "Truebit $26.2M integer overflow",
        "zh-Hans": "Truebit $26.2M 整数溢出",
        "zh-Hant": "Truebit $26.2M 整數溢出",
      },
      description: {
        en: "A legacy purchase contract (Solidity 0.6.10, no overflow checks) overflowed its pricing math; a huge input wrapped the price to ~0, letting the attacker mint TRU for free and drain 8,535 ETH in one tx. Attack tx and overflow math both verified on-chain.",
        "zh-Hans": "旧购买合约(Solidity 0.6.10 无溢出检查)定价分子整数溢出,超大输入使价格回绕到约 0,零成本铸 TRU 卖回储备,单笔套走 8,535 ETH。攻击 tx 与溢出数学均已链上核。",
        "zh-Hant": "舊購買合約(Solidity 0.6.10 無溢出檢查)定價分子整數溢出,超大輸入使價格迴繞到約 0,零成本鑄 TRU 賣回儲備,單筆套走 8,535 ETH。攻擊 tx 與溢出數學均已鏈上核。",
      },
    },
    {
      id: "moonwell-oracle-misconfiguration",
      url: "https://github.com/duolaAmengweb3/DuoLaSafe-Audits/blob/main/%E9%93%BE%E4%B8%8A%E8%B0%83%E6%9F%A5/Moonwell-%E9%A2%84%E8%A8%80%E6%9C%BA%E9%85%8D%E7%BD%AE%E9%94%99%E8%AF%AF.md",
      title: {
        en: "Moonwell oracle misconfiguration",
        "zh-Hans": "Moonwell 预言机配置错误",
        "zh-Hant": "Moonwell 預言機配置錯誤",
      },
      description: {
        en: "An oracle update dropped the ETH/USD leg of cbETH pricing, mispricing cbETH at ~$1.12 vs ~$2,200; liquidators seized 1,096 cbETH for ~$1 each, leaving ~$1.78M bad debt. One missing price leg = real money.",
        "zh-Hans": "MIP-X43 上线时 cbETH 喂价漏配 ETH/USD 段,价从约 $2,200 错算为约 $1.12,清算者以约 $1 夺走 1,096 cbETH,留下约 $178 万坏账。一个漏掉的价格组合 = 真金白银。",
        "zh-Hant": "MIP-X43 上線時 cbETH 喂價漏配 ETH/USD 段,價從約 $2,200 錯算為約 $1.12,清算者以約 $1 奪走 1,096 cbETH,留下約 $178 萬壞賬。一個漏掉的價格組合 = 真金白銀。",
      },
    },
    {
      id: "cetus",
      url: "https://github.com/duolaAmengweb3/DuoLaSafe-Audits/blob/main/%E9%93%BE%E4%B8%8A%E8%B0%83%E6%9F%A5/Cetus-220M-AMM%E6%BA%A2%E5%87%BA.md",
      title: {
        en: "Cetus $220M AMM overflow",
        "zh-Hans": "Cetus $220M AMM 溢出复盘",
        "zh-Hant": "Cetus $220M AMM 溢出覆盤",
      },
      description: {
        en: "Sui's largest AMM: a wrong overflow mask in checked_shlw (0xffff…<<192 vs 1<<192) let a u256 left-shift silently truncate, minting ~1.03e34 liquidity for ~1 token to drain reserves. ~$220M lost; ~$162M frozen by validators and returned via governance.",
        "zh-Hans": "Sui 最大 AMM:checked_shlw 溢出校验掩码写错(0xffff…<<192 而非 1<<192),u256 左移被静默截断,1 个 token 撬动 1.03×10³⁴ 流动性抽干储备。$220M 损失,~$162M 被验证者冻结后经治理返还。",
        "zh-Hant": "Sui 最大 AMM:checked_shlw 溢出校驗掩碼寫錯(0xffff…<<192 而非 1<<192),u256 左移被靜默截斷,1 個 token 撬動 1.03×10³⁴ 流動性抽乾儲備。$220M 損失,~$162M 被驗證者凍結後經治理返還。",
      },
    },
    {
      id: "gmx-v1",
      url: "https://github.com/duolaAmengweb3/DuoLaSafe-Audits/blob/main/%E9%93%BE%E4%B8%8A%E8%B0%83%E6%9F%A5/GMX-V1-42M-%E9%87%8D%E5%85%A5.md",
      title: {
        en: "GMX V1 $42M reentrancy",
        "zh-Hans": "GMX V1 $42M 重入复盘",
        "zh-Hant": "GMX V1 $42M 重入覆盤",
      },
      description: {
        en: "Arbitrum perp DEX: a reentrancy via the executeDecreaseOrder callback skipped the globalShortAveragePrices update, crushing BTC short avg price and inflating GLP for profitable redemptions. Attack tx verified on-chain; all funds returned, $5M white-hat bounty.",
        "zh-Hans": "Arbitrum 头部永续:executeDecreaseOrder 回调重入开空、跳过空头均价更新,砸低 BTC 空头均价、虚高 GLP 后赎回套利。攻击 tx 链上核实;事后全额归还、留 $5M 白帽赏金。",
        "zh-Hant": "Arbitrum 頭部永續:executeDecreaseOrder 回調重入開空、跳過空頭均價更新,砸低 BTC 空頭均價、虛高 GLP 後贖回套利。攻擊 tx 鏈上核實;事後全額歸還、留 $5M 白帽賞金。",
      },
    },
    {
      id: "rhea-finance",
      url: "https://github.com/duolaAmengweb3/DuoLaSafe-Audits/blob/main/%E9%93%BE%E4%B8%8A%E8%B0%83%E6%9F%A5/Rhea-18.4M-%E6%BB%91%E7%82%B9%E6%A0%A1%E9%AA%8C%E7%BC%BA%E9%99%B7.md",
      title: {
        en: "Rhea Finance $18.4M slippage-check flaw",
        "zh-Hans": "Rhea Finance $18.4M 滑点校验缺陷",
        "zh-Hant": "Rhea Finance $18.4M 滑點校驗缺陷",
      },
      description: {
        en: "NEAR's top DeFi. Early labeled oracle manipulation, the real cause was a Burrowland margin slippage-check that summed per-hop min-outputs across a crafted route while settling actuals with no re-check. Loss revised $7.6M→$18.4M; ~$11.2M returned/frozen.",
        "zh-Hans": "NEAR 最大 DeFi。早期被判「预言机操纵」,真根因是 Burrowland 杠杆滑点校验把多跳路由各段最小产出累加、结算却不回校;损失由 $7.6M 修订至 $18.4M,~$11.2M 已返还/冻结。",
        "zh-Hant": "NEAR 最大 DeFi。早期被判「預言機操縱」,真根因是 Burrowland 槓桿滑點校驗把多跳路由各段最小產出累加、結算卻不回校;損失由 $7.6M 修訂至 $18.4M,~$11.2M 已返還/凍結。",
      },
    },
    {
      id: "aperture-finance",
      url: "https://github.com/duolaAmengweb3/DuoLaSafe-Audits/blob/main/%E9%93%BE%E4%B8%8A%E8%B0%83%E6%9F%A5/Aperture-3.67M-approval.md",
      title: {
        en: "Aperture Finance $3.67M arbitrary call",
        "zh-Hans": "Aperture Finance $3.67M 任意调用",
        "zh-Hant": "Aperture Finance $3.67M 任意調用",
      },
      description: {
        en: "An arbitrary-call flaw in the V3/V4 executor: the custom-swap function (selector 0x1d33) left call target/calldata unvalidated, letting the attacker craft transferFrom via the victim's pre-existing approvals and drain 36.9 WBTC. Main tx verified; ~$2.4M to Tornado.",
        "zh-Hans": "V3/V4 执行合约的自定义 swap 函数(选择器 0x1d33)不校验 call target/calldata,攻击者借受害者历史授权构造 transferFrom 抽走 36.9 WBTC。主战 tx 链上核实,~$2.4M 进 Tornado。",
        "zh-Hant": "V3/V4 執行合約的自定義 swap 函數(選擇器 0x1d33)不校驗 call target/calldata,攻擊者借受害者歷史授權構造 transferFrom 抽走 36.9 WBTC。主戰 tx 鏈上核實,~$2.4M 進 Tornado。",
      },
    },
    {
      id: "foom-cash",
      url: "https://github.com/duolaAmengweb3/DuoLaSafe-Audits/blob/main/%E9%93%BE%E4%B8%8A%E8%B0%83%E6%9F%A5/FoomCash-2.3M-zk%E9%AA%8C%E8%AF%81.md",
      title: {
        en: "Foom Cash $2.3M zk-verifier flaw",
        "zh-Hans": "Foom Cash $2.3M zk 验证缺陷",
        "zh-Hant": "Foom Cash $2.3M zk 驗證缺陷",
      },
      description: {
        en: "zk-SNARK privacy protocol: a skipped Phase-2 trusted-setup randomization left Groth16 gamma==delta, collapsing the pairing check to 1=1 so forged proofs passed without a witness. ~$2.26M drained across ETH+Base; ~$1.84M recovered by white hats.",
        "zh-Hans": "zk-SNARK 隐私协议:Groth16 可信设置 Phase 2 漏跑随机化,γ=δ 致配对校验退化成恒等式(1=1),假证明无 witness 即过。ETH+Base 两链被放空 ~$2.26M,白帽追回 ~$1.84M。",
        "zh-Hant": "zk-SNARK 隱私協議:Groth16 可信設置 Phase 2 漏跑隨機化,γ=δ 致配對校驗退化成恆等式(1=1),假證明無 witness 即過。ETH+Base 兩鏈被放空 ~$2.26M,白帽追回 ~$1.84M。",
      },
    },
    {
      id: "venus-user",
      url: "https://github.com/duolaAmengweb3/DuoLaSafe-Audits/blob/main/%E9%93%BE%E4%B8%8A%E8%B0%83%E6%9F%A5/Venus-13.5M-%E9%92%93%E9%B1%BC%E7%9B%B2%E7%AD%BE.md",
      title: {
        en: "Venus user $13.5M phishing blind-sign",
        "zh-Hans": "Venus 大户 $13.5M 钓鱼盲签",
        "zh-Hant": "Venus 大戶 $13.5M 釣魚盲籤",
      },
      description: {
        en: "A power user was phished via a fake Zoom client and a tampered wallet extension, blind-signing an updateDelegate that handed account-delegate rights to the attacker — ~$13.5M drained. The contract held; the signature didn't. Governance force-liquidated; funds fully recovered in 12h.",
        "zh-Hans": "假 Zoom + 钱包扩展被篡改,大户在硬件钱包上盲签一笔 updateDelegate、把仓位代理权交给攻击者,~$13.5M 被抽。合约没坏,坏在签名。Venus 治理强制清算,12 小时全额追回。",
        "zh-Hant": "假 Zoom + 錢包擴展被篡改,大戶在硬件錢包上盲籤一筆 updateDelegate、把倉位代理權交給攻擊者,~$13.5M 被抽。合約沒壞,壞在簽名。Venus 治理強制清算,12 小時全額追回。",
      },
    },
    {
      id: "aztec-deprecated-bridge",
      url: "https://github.com/duolaAmengweb3/DuoLaSafe-Audits/blob/main/%E9%93%BE%E4%B8%8A%E8%B0%83%E6%9F%A5/Aztec-RollupProcessor-2.16M.md",
      title: {
        en: "Aztec deprecated bridge $2.16M forged proof",
        "zh-Hans": "Aztec 废弃桥 $2.16M 伪造证明",
        "zh-Hant": "Aztec 廢棄橋 $2.16M 偽造證明",
      },
      description: {
        en: "A deprecated, immutable, abandoned RollupProcessor bridge: its escapeHatch had no access control and proofs weren't bound to fund ownership, so a forged proof drained ~1,158 ETH + 150k DAI in one tx. Tx and the now-empty victim contract verified on-chain.",
        "zh-Hans": "2022 下线、不可升级、弃管的 RollupProcessor:escapeHatch 紧急取款无访问控制 + 证明不绑定资金归属,攻击者凭伪造证明单笔提走 ~1,158 ETH+15万 DAI。tx 与受害合约已清空均链上核实。",
        "zh-Hant": "2022 下線、不可升級、棄管的 RollupProcessor:escapeHatch 緊急取款無訪問控制 + 證明不綁定資金歸屬,攻擊者憑偽造證明單筆提走 ~1,158 ETH+15萬 DAI。tx 與受害合約已清空均鏈上核實。",
      },
    },
    {
      id: "base-fake-stablecoin-scan-70-fake-pyusd",
      url: "https://github.com/duolaAmengweb3/DuoLaSafe-Audits/blob/main/%E9%93%BE%E4%B8%8A%E8%B0%83%E6%9F%A5/Base-%E5%81%87%E7%A8%B3%E5%AE%9A%E5%B8%81%E6%89%AB%E6%8F%8F-%E7%A0%94%E7%A9%B6.md",
      title: {
        en: "Base fake-stablecoin scan: 70 fake PYUSD",
        "zh-Hans": "Base 假稳定币扫描:70 个山寨 PYUSD",
        "zh-Hant": "Base 假穩定幣掃描:70 個山寨 PYUSD",
      },
      description: {
        en: "Our in-house scanner flagged 70 fake stablecoins on Base impersonating PYUSD/FDUSD in a single pass: most with fake decimals (18 vs real PYUSD's 6) and very few holders — phishing-scam bait. All catalogued for lookup. Original first-party data.",
        "zh-Hans": "我们自建扫描器单次在 Base 揪出 70 个冒充 PYUSD/FDUSD 的山寨稳定币:绝大多数小数位造假(decimals=18,真 PYUSD=6)、持有人极少,是钓鱼诈骗诱饵。已全部入情报库可查。独家数据。",
        "zh-Hant": "我們自建掃描器單次在 Base 揪出 70 個冒充 PYUSD/FDUSD 的山寨穩定幣:絕大多數小數位造假(decimals=18,真 PYUSD=6)、持有人極少,是釣魚詐騙誘餌。已全部入情報庫可查。獨家數據。",
      },
    },
    {
      id: "twyne-v1-leveraged-lending-audit",
      url: "https://github.com/duolaAmengweb3/DuoLaSafe-Audits/blob/main/2026/Twyne-Contracts-v1-%E5%AE%A1%E8%AE%A1%E6%8A%A5%E5%91%8A.md",
      title: {
        en: "Twyne v1 leveraged-lending audit",
        "zh-Hans": "Twyne v1 杠杆借贷审计",
        "zh-Hant": "Twyne v1 槓桿借貸審計",
      },
      description: {
        en: "Full audit of a leveraged-lending protocol on Euler EVC/EVK: manual review of 11 contracts + Slither + Foundry fuzz, adversarially verifying and refuting 6 potential attack surfaces. Report includes a \"ruled-out attacks\" section.",
        "zh-Hans": "对建在 Euler EVC/EVK 上的杠杆借贷协议做完整审计:人工审 11 合约 + Slither + Foundry fuzz,对抗性验证并证伪了 6 个潜在攻击面。报告含“排除攻击”章节。",
        "zh-Hant": "對建在 Euler EVC/EVK 上的槓桿借貸協議做完整審計:人工審 11 合約 + Slither + Foundry fuzz,對抗性驗證並證偽了 6 個潛在攻擊面。報告含“排除攻擊”章節。",
      },
    },
    {
      id: "silo-v3-isolated-lending-audit",
      url: "https://github.com/duolaAmengweb3/DuoLaSafe-Audits/blob/main/2026/Silo-V3-%E5%AE%A1%E8%AE%A1%E6%8A%A5%E5%91%8A.md",
      title: {
        en: "Silo V3 isolated-lending audit",
        "zh-Hans": "Silo V3 隔离借贷审计",
        "zh-Hant": "Silo V3 隔離借貸審計",
      },
      description: {
        en: "Manual + adversarial verification of the core silo-core: 0 highs, 7 candidate attack surfaces ruled out one by one, report public and verifiable.",
        "zh-Hans": "对核心 silo-core 做人工 + 对抗性验证:0 高危,逐一排除 7 个候选攻击面,报告公开可核对。",
        "zh-Hant": "對核心 silo-core 做人工 + 對抗性驗證:0 高危,逐一排除 7 個候選攻擊面,報告公開可核對。",
      },
    },
    {
      id: "thunderloan-flash-loan-audit",
      url: "https://github.com/duolaAmengweb3/DuoLaSafe-Audits/blob/main/%E5%AE%A1%E8%AE%A1-FirstFlight/ThunderLoan-%E5%AE%A1%E8%AE%A1.md",
      title: {
        en: "ThunderLoan flash-loan audit (First Flight)",
        "zh-Hans": "ThunderLoan 闪电贷审计(First Flight)",
        "zh-Hant": "ThunderLoan 閃電貸審計(First Flight)",
      },
      description: {
        en: "Audited the CodeHawks ThunderLoan flash-loan protocol; 3 Highs all PoC-proven: deposit() corrupts the exchange rate (redeem more than deposited, draining LPs), an upgrade storage-slot collision silently rewrites the fee, and a manipulable spot oracle enables zero-fee flash loans.",
        "zh-Hans": "审计 CodeHawks 闪电贷协议,3 个 High 全 PoC 坐实:存款污染兑换率可多赎本金抽干 LP、升级存储槽冲突悄改费率、现货预言机可操纵致免费闪电贷。已排除若干误报。",
        "zh-Hant": "審計 CodeHawks 閃電貸協議,3 個 High 全 PoC 坐實:存款汙染兌換率可多贖本金抽乾 LP、升級存儲槽衝突悄改費率、現貨預言機可操縱致免費閃電貸。已排除若干誤報。",
      },
    },
    {
      id: "brivault-betting-vault-audit",
      url: "https://github.com/duolaAmengweb3/DuoLaSafe-Audits/blob/main/%E5%AE%A1%E8%AE%A1-FirstFlight/BriVault-%E5%AE%A1%E8%AE%A1.md",
      title: {
        en: "BriVault betting-vault audit (First Flight)",
        "zh-Hans": "BriVault 押注金库审计(First Flight)",
        "zh-Hant": "BriVault 押注金庫審計(First Flight)",
      },
      description: {
        en: "Audited the CodeHawks BriVault ERC4626 betting vault; 2 Criticals + 1 Medium all PoC-proven: a post-join re-deposit drains the entire prize pool (honest winner gets 0), overwriting accounting permanently locks a user's first deposit, and balanceOf-based pricing dilutes shares.",
        "zh-Hans": "审计 CodeHawks ERC4626 押注金库,2 Critical+1 Medium 全 PoC 坐实:报名后二次存款掏空整个奖池让诚实赢家归零、覆盖式记账永久锁死首笔本金、balanceOf 计价可稀释份额。",
        "zh-Hant": "審計 CodeHawks ERC4626 押注金庫,2 Critical+1 Medium 全 PoC 坐實:報名後二次存款掏空整個獎池讓誠實贏家歸零、覆蓋式記賬永久鎖死首筆本金、balanceOf 計價可稀釋份額。",
      },
    },
    {
      id: "multisig-timelock-audit",
      url: "https://github.com/duolaAmengweb3/DuoLaSafe-Audits/blob/main/%E5%AE%A1%E8%AE%A1-FirstFlight/MultisigTimelock-%E5%AE%A1%E8%AE%A1.md",
      title: {
        en: "Multisig + timelock audit (First Flight)",
        "zh-Hans": "多签+时间锁审计(First Flight)",
        "zh-Hant": "多籤+時間鎖審計(First Flight)",
      },
      description: {
        en: "Audited a CodeHawks 3-of-N multisig wallet; 1 High proven by PoC: revoking a signer never clears their confirmations on pending txs — these ghost votes stay in the quorum, so a single remaining signer can execute a 3-of-N transaction and drain the wallet.",
        "zh-Hans": "审计 CodeHawks 3-of-N 多签钱包,1 个 High 用 PoC 坐实:移除签名者时未清掉它在待处理交易上的投票,幽灵确认永久计入法定数 → 单签名者即可执行 3-of-N 交易抽走资金。",
        "zh-Hant": "審計 CodeHawks 3-of-N 多籤錢包,1 個 High 用 PoC 坐實:移除簽名者時未清掉它在待處理交易上的投票,幽靈確認永久計入法定數 → 單簽名者即可執行 3-of-N 交易抽走資金。",
      },
    },
    {
      id: "order-book-dex-audit",
      url: "https://github.com/duolaAmengweb3/DuoLaSafe-Audits/blob/main/%E5%AE%A1%E8%AE%A1-FirstFlight/OrderBook-%E5%AE%A1%E8%AE%A1.md",
      title: {
        en: "Order-book DEX audit (First Flight)",
        "zh-Hans": "订单簿 DEX 审计(First Flight)",
        "zh-Hant": "訂單簿 DEX 審計(First Flight)",
      },
      description: {
        en: "Audited a CodeHawks order-book DEX; 1 High proven by PoC: buyOrder has no slippage bound, so a seller front-runs amendSellOrder to inflate price/shrink amount and drain the buyer's infinite USDC approval (900k USDC for 1 satoshi). Plus 1 Low; 2 issues adversarially excluded.",
        "zh-Hans": "审计 CodeHawks 订单簿 DEX,1 个 High 用 PoC 坐实:buyOrder 无滑点保护,卖家抢跑 amendSellOrder 改价改量,把买家无限授权的 USDC 抽干(90 万 USDC 只换 1 satoshi)。另含 1 Low,排除 2 误报。",
        "zh-Hant": "審計 CodeHawks 訂單簿 DEX,1 個 High 用 PoC 坐實:buyOrder 無滑點保護,賣家搶跑 amendSellOrder 改價改量,把買家無限授權的 USDC 抽乾(90 萬 USDC 只換 1 satoshi)。另含 1 Low,排除 2 誤報。",
      },
    },
    {
      id: "puppyraffle-audit",
      url: "https://github.com/duolaAmengweb3/DuoLaSafe-Audits/blob/main/%E5%AE%A1%E8%AE%A1-FirstFlight/PuppyRaffle-%E5%AE%A1%E8%AE%A1.md",
      title: {
        en: "PuppyRaffle audit (First Flight)",
        "zh-Hans": "PuppyRaffle 抽奖审计(First Flight)",
        "zh-Hant": "PuppyRaffle 抽獎審計(First Flight)",
      },
      description: {
        en: "Audited the classic CodeHawks PuppyRaffle; 2 Criticals + 3 Highs all PoC-proven: refund() reentrancy drains the contract (1 ETH in, 5 ETH out), predictable RNG, a uint64 fee overflow locking 20 ETH, a force-send DoS, and an O(n²) gas DoS on entry.",
        "zh-Hans": "审计 CodeHawks 经典抽奖合约,2 Critical+3 High 全 PoC 坐实:refund 重入抽空合约(1 ETH 撬 5 ETH)、弱随机数可预测中奖、uint64 费用溢出锁死 20 ETH、强制转账 DoS、O(n²) Gas 爆炸。",
        "zh-Hant": "審計 CodeHawks 經典抽獎合約,2 Critical+3 High 全 PoC 坐實:refund 重入抽空合約(1 ETH 撬 5 ETH)、弱隨機數可預測中獎、uint64 費用溢出鎖死 20 ETH、強制轉賬 DoS、O(n²) Gas 爆炸。",
      },
    },
    {
      id: "jucoin",
      url: "https://github.com/duolaAmengweb3/DuoLaSafe-Audits",
      title: {
        en: "JuCoin $511M reserve debunk",
        "zh-Hans": "JuCoin $511M 储备打假",
        "zh-Hant": "JuCoin $511M 儲備打假",
      },
      description: {
        en: "On-chain data exposed their PoR: the \"USDC reserve\" was a self-deployed, mintable shitcoin with only 14 holders chain-wide. Done in minutes, at zero cost.",
        "zh-Hans": "用链上数据戳穿其 PoR:所谓“USDC 储备”是项目方自部署、可任意增发、全链仅 14 持有人的山寨币。几分钟、零成本完成。",
        "zh-Hant": "用鏈上數據戳穿其 PoR:所謂“USDC 儲備”是項目方自部署、可任意增發、全鏈僅 14 持有人的山寨幣。幾分鐘、零成本完成。",
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
