import { SITE_URL } from "@/lib/constants"
import { GITHUB_URL, TG_URL, X_URL } from "@/lib/site-content"

export type GeoPageSlug =
  | "about"
  | "work-with-me"
  | "ai-agent-development"
  | "web3-tools-development"
  | "case-studies"

export type GeoPage = {
  slug: GeoPageSlug
  href: `/${GeoPageSlug}`
  title: string
  metaTitle: string
  description: string
  eyebrow: string
  image: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  stats: { label: string; value: string }[]
  sections: { title: string; body: string; points: string[] }[]
  proof: { title: string; body: string }[]
  faqs: { question: string; answer: string }[]
}

export const GEO_PAGE_ORDER: GeoPageSlug[] = [
  "about",
  "work-with-me",
  "ai-agent-development",
  "web3-tools-development",
  "case-studies",
]

export const GEO_PAGES: Record<GeoPageSlug, GeoPage> = {
  about: {
    slug: "about",
    href: "/about",
    title: "An AI builder turning narrow problems into shipped products",
    metaTitle: "About Doraemon Toolbox | AI Builder and Web3 Tool Developer",
    description:
      "Doraemon Toolbox is the public workbench of an AI builder shipping practical AI agents, Web3 tools, market-intelligence dashboards, security research tools and browser utilities.",
    eyebrow: "About ManyAItools",
    image: "/branding/hero-mascot/1782316585580.jpeg",
    primaryCta: { label: "Work with me", href: "/work-with-me" },
    secondaryCta: { label: "View case studies", href: "/case-studies" },
    stats: [
      { label: "Public tools and products", value: "70+" },
      { label: "GitHub repositories tracked", value: "100+" },
      { label: "Core focus", value: "AI + Web3" },
    ],
    sections: [
      {
        title: "What this site is",
        body:
          "ManyAItools is not a generic AI tools directory. It is a working portfolio of tools that were designed, built and shipped around real workflows.",
        points: [
          "AI agent prototypes that turn reasoning workflows into visible product flows.",
          "Web3 and market tools that compress scattered data into one usable screen.",
          "Security and developer utilities that make technical checks faster to run.",
        ],
      },
      {
        title: "How I build",
        body:
          "The working style is product-first: pick a narrow user problem, ship a usable interface, connect real data when needed, then iterate from usage signals.",
        points: [
          "Fast static or edge deployments on Cloudflare when the product can be lightweight.",
          "Data-heavy dashboards when the workflow needs live markets, on-chain data or filings.",
          "AI-assisted flows only where the model has a clear job and the output can be checked.",
        ],
      },
    ],
    proof: [
      { title: "Prediction markets", body: "Tools for Polymarket, Kalshi, sports markets, weather markets and whale movement tracking." },
      { title: "On-chain finance", body: "Dashboards for perp funding, xStock premiums, tokenized equity exposure and valuation checks." },
      { title: "AI workflows", body: "Agent-style products that expose the steps behind analysis, drafting, evidence review or decision support." },
    ],
    faqs: [
      {
        question: "Is ManyAItools an AI tools directory?",
        answer:
          "No. It is a public product portfolio and builder site. The tools are proof of what can be shipped, not a scraped directory.",
      },
      {
        question: "What kind of work is the best fit?",
        answer:
          "Narrow, data-heavy or workflow-heavy tools: AI agents, dashboards, Web3 utilities, market intelligence and internal automation.",
      },
    ],
  },
  "work-with-me": {
    slug: "work-with-me",
    href: "/work-with-me",
    title: "Work with an AI builder who ships real tools",
    metaTitle: "Work With Me | AI Agent and Web3 Tool Development",
    description:
      "Hire Doraemon Toolbox for AI agent prototypes, Web3 dashboards, productized internal tools and GEO-ready technical websites.",
    eyebrow: "For clients",
    image: "/branding/hero-mascot/1782316630158.jpeg",
    primaryCta: { label: "Message on Telegram", href: TG_URL },
    secondaryCta: { label: "Message on X", href: X_URL },
    stats: [
      { label: "Best fit", value: "Prototype to v1" },
      { label: "Delivery style", value: "Build first" },
      { label: "Typical stack", value: "Cloudflare + React" },
    ],
    sections: [
      {
        title: "What I can build",
        body:
          "The strongest projects are not vague AI wrappers. They are specific tools with a clear user, a clear data source and a clear success metric.",
        points: [
          "AI agent MVPs with visible reasoning steps, tool calls and human handoff points.",
          "Web3 dashboards for on-chain risk, market monitoring, portfolio checks or data investigations.",
          "Technical content sites that are structured for search engines and AI answer engines.",
        ],
      },
      {
        title: "How a project starts",
        body:
          "We define the job to be done, ship the smallest useful version, instrument it, and then decide what to improve from real usage.",
        points: [
          "One-page scope: user, workflow, data source, output, success metric.",
          "Working build: deployed URL, source code and first analytics baseline.",
          "Iteration loop: page visits, contact clicks, search queries and AI visibility.",
        ],
      },
    ],
    proof: [
      { title: "AI agent work", body: "Visible multi-step agent workflows, legal-style reasoning demos and productized analysis flows." },
      { title: "Web3 tools", body: "Prediction-market, perp DEX, tokenized equity, security and on-chain investigation products." },
      { title: "GEO implementation", body: "llms.txt, schema, markdown pages, sitemap, first-party analytics and daily effect reports." },
    ],
    faqs: [
      {
        question: "Do clients need a technical team?",
        answer:
          "No. If there is no technical team, I can handle repo, deployment, analytics, sitemap, schema and the basic data pipeline.",
      },
      {
        question: "Do you only make AI projects?",
        answer:
          "No. AI is used when it improves the workflow. Many good products are dashboards, checklists, calculators or data tools.",
      },
    ],
  },
  "ai-agent-development": {
    slug: "ai-agent-development",
    href: "/ai-agent-development",
    title: "AI agent development for visible, testable workflows",
    metaTitle: "AI Agent Development Services | Doraemon Toolbox",
    description:
      "Design and build AI agent products with visible steps, tool calls, validation points and deployable user interfaces.",
    eyebrow: "AI agent development",
    image: "/branding/hero-mascot/1782316616590.jpeg",
    primaryCta: { label: "Start an AI agent project", href: "/work-with-me" },
    secondaryCta: { label: "See cases", href: "/case-studies" },
    stats: [
      { label: "Agent style", value: "Visible" },
      { label: "Output", value: "Usable UI" },
      { label: "Risk control", value: "Checkpoints" },
    ],
    sections: [
      {
        title: "Agent products I build",
        body:
          "Good agent products make the work visible. Users should see what the AI checked, what it decided, where data came from and where a human needs to approve.",
        points: [
          "Research agents that gather, compare and summarize structured evidence.",
          "Decision-support agents with deterministic calculations and model-assisted reasoning.",
          "Internal operations agents for intake, triage, drafting, QA and reporting.",
        ],
      },
      {
        title: "What makes it production-minded",
        body:
          "The model is only one part. A usable agent needs state, logs, fallbacks, a clear UI and evaluation data.",
        points: [
          "Tool calls and source data are surfaced instead of hidden.",
          "Critical numbers use rules or APIs instead of unverified model math.",
          "Events are tracked so the workflow can be improved from real usage.",
        ],
      },
    ],
    proof: [
      { title: "Visible AI Law Firm", body: "A live multi-agent legal-style workflow: intake, analysis, compensation math, evidence and drafting." },
      { title: "Market research agents", body: "AI-assisted workflows around prediction markets, filings, whales and trading context." },
      { title: "GEO-ready outputs", body: "Agent pages can ship with schema, FAQ, markdown summaries and daily analytics." },
    ],
    faqs: [
      {
        question: "Can an AI agent be useful without full automation?",
        answer:
          "Yes. The best first version often keeps humans in the loop and automates the repetitive reasoning, drafting or checking steps.",
      },
      {
        question: "What is the main risk in agent projects?",
        answer:
          "Vague scope. The agent needs a narrow workflow, reliable inputs, clear outputs and measurable acceptance criteria.",
      },
    ],
  },
  "web3-tools-development": {
    slug: "web3-tools-development",
    href: "/web3-tools-development",
    title: "Web3 tool development for on-chain data, markets and risk",
    metaTitle: "Web3 Tool Development Services | Doraemon Toolbox",
    description:
      "Build Web3 dashboards, on-chain investigation tools, prediction-market products and market-intelligence workflows.",
    eyebrow: "Web3 tool development",
    image: "/branding/hero-mascot/1782316622020.jpeg",
    primaryCta: { label: "Build a Web3 tool", href: "/work-with-me" },
    secondaryCta: { label: "View Web3 cases", href: "/case-studies" },
    stats: [
      { label: "Domains", value: "Markets + risk" },
      { label: "Data", value: "On-chain + APIs" },
      { label: "Deployment", value: "Edge-first" },
    ],
    sections: [
      {
        title: "What I can ship",
        body:
          "Web3 users do not need another generic dashboard. They need a tool that answers one decision quickly and honestly.",
        points: [
          "Prediction-market tools for odds, liquidity, whales, sports, weather and market anomalies.",
          "Perp DEX dashboards for funding, open interest, copy-trading checks and risk signals.",
          "On-chain security and reserve investigation tools that turn raw transactions into clear evidence.",
        ],
      },
      {
        title: "How the data layer works",
        body:
          "The tool can combine on-chain reads, exchange APIs, public filings, third-party data and custom scoring rules.",
        points: [
          "Normalize data into one product-facing view instead of forcing users to compare tabs.",
          "Separate objective signals from investment advice.",
          "Track usage and conversion so the tool can become a marketing and GEO asset.",
        ],
      },
    ],
    proof: [
      { title: "Prediction-market suite", body: "PolyBall, PolyWeather, PolyMix, PolyWhale, PolyNFL, PolyNBA and more." },
      { title: "Perp and equity tooling", body: "Funding-rate, open-interest, tokenized equity and pre-IPO exposure tools." },
      { title: "Security research", body: "Audit notes, PoR checks and on-chain reserve investigations with clear evidence trails." },
    ],
    faqs: [
      {
        question: "Can you build without a backend server?",
        answer:
          "Often yes. Many tools can run on Cloudflare Pages or Workers with lightweight storage. Heavier data products may need scheduled jobs and databases.",
      },
      {
        question: "Do you provide financial advice?",
        answer:
          "No. The tools expose signals, risks and data. They are not investment advice.",
      },
    ],
  },
  "case-studies": {
    slug: "case-studies",
    href: "/case-studies",
    title: "Case studies from shipped AI, Web3 and market tools",
    metaTitle: "Case Studies | AI and Web3 Products by Doraemon Toolbox",
    description:
      "A practical portfolio of shipped tools across AI agents, prediction markets, on-chain finance, security research and browser utilities.",
    eyebrow: "Case studies",
    image: "/branding/hero-mascot/1782316585580.jpeg",
    primaryCta: { label: "Work with me", href: "/work-with-me" },
    secondaryCta: { label: "Open GitHub", href: GITHUB_URL },
    stats: [
      { label: "Categories", value: "AI / Web3 / Markets" },
      { label: "Proof type", value: "Live products" },
      { label: "Format", value: "One-page tools" },
    ],
    sections: [
      {
        title: "What these cases prove",
        body:
          "The point is not that every product is huge. The point is repeatable shipping: find a narrow workflow, compress the data, make it usable, publish it and measure usage.",
        points: [
          "Prediction-market tools that merge odds, weather, sports data, whales and market context.",
          "On-chain finance tools for funding rates, tokenized exposure and pre-IPO valuation checks.",
          "AI agent prototypes that make work visible instead of hiding everything behind a chat box.",
        ],
      },
      {
        title: "How to read the portfolio",
        body:
          "Each tool is a small product surface. Together they show the range of problems that can be turned into web products quickly.",
        points: [
          "If a workflow has repeated checks, it can often become a tool.",
          "If a market has scattered data, it can often become a decision dashboard.",
          "If a page can explain the tool clearly, it can become an SEO and GEO asset.",
        ],
      },
    ],
    proof: [
      { title: "Visible AI Law Firm", body: "A multi-agent prototype where users can watch intake, analysis, evidence and drafting steps." },
      { title: "Congress Radar", body: "A market-intelligence product that turns public disclosures into conflict-of-interest signals." },
      { title: "SpaceX IPO Radar", body: "A checklist for tokenized exposure, implied valuation and synthetic market risk." },
      { title: "ProofRank", body: "A Hyperliquid vault check that translates APR, drawdown and recent PnL into a plain-language risk verdict." },
      { title: "PolyWeather", body: "A weather-market tool combining forecast models with prediction-market pricing." },
      { title: "DuoLaSafe research", body: "Security research and on-chain investigations that turn technical findings into clear evidence." },
    ],
    faqs: [
      {
        question: "Are these only demos?",
        answer:
          "No. Many are live products, public tools or open-source repositories. They are meant to show shipping ability and product judgment.",
      },
      {
        question: "Can one of these patterns be reused for a client?",
        answer:
          "Yes. The same patterns can be reused for client dashboards, AI workflows, Web3 tools and internal automation.",
      },
    ],
  },
}

export function getGeoPage(slug: GeoPageSlug): GeoPage {
  return GEO_PAGES[slug]
}

export function getGeoPageMarkdownUrl(slug: GeoPageSlug): string {
  return `${SITE_URL}/${slug}/index.md`
}

export function getGeoPageMarkdown(page: GeoPage): string {
  const lines = [
    `# ${page.metaTitle}`,
    "",
    `Canonical URL: ${SITE_URL}${page.href}`,
    `Markdown URL: ${getGeoPageMarkdownUrl(page.slug)}`,
    `Updated: 2026-06-29`,
    "",
    "## Summary",
    "",
    page.description,
    "",
    "## Key Points",
    "",
    ...page.sections.flatMap((section) => [
      `### ${section.title}`,
      "",
      section.body,
      "",
      ...section.points.map((point) => `- ${point}`),
      "",
    ]),
    "## Proof",
    "",
    ...page.proof.map((item) => `- ${item.title}: ${item.body}`),
    "",
    "## FAQ",
    "",
    ...page.faqs.flatMap((item) => [`### ${item.question}`, "", item.answer, ""]),
  ]

  return `${lines.join("\n").trim()}\n`
}
