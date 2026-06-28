"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { GITHUB_URL } from "@/lib/site-content"
import type { Lang } from "@/lib/i18n"

const LABELS = {
  zh: {
    loc: (n: ReactNode) => <>累计写了约 {n} 行代码</>,
    commits: (n: ReactNode) => <>提交 {n} 次</>,
    contributions: (n: ReactNode) => <>贡献 {n} 次</>,
    last7: (n: ReactNode) => <>近 7 天 +{n} 行</>,
    updated: "更新于 ",
    source: "数据来自 GitHub（含私有）",
    now: "刚刚",
    min: (n: number) => `${n} 分钟前`,
    hour: (n: number) => `${n} 小时前`,
    day: (n: number) => `${n} 天前`,
  },
  en: {
    loc: (n: ReactNode) => <>~{n} lines of code</>,
    commits: (n: ReactNode) => <>{n} commits</>,
    contributions: (n: ReactNode) => <>{n} contributions</>,
    last7: (n: ReactNode) => <>+{n} lines this week</>,
    updated: "updated ",
    source: "Data from GitHub (incl. private)",
    now: "just now",
    min: (n: number) => `${n}m ago`,
    hour: (n: number) => `${n}h ago`,
    day: (n: number) => `${n}d ago`,
  },
}

function useCountUp(target: number | null, durationMs = 1200) {
  const [val, setVal] = useState(0)
  const raf = useRef<number | undefined>(undefined)
  useEffect(() => {
    if (target == null) return
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / durationMs)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(target * eased))
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [target, durationMs])
  return val
}

function relTime(iso: string, t: (typeof LABELS)["zh"]) {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return t.now
  if (m < 60) return t.min(m)
  const h = Math.floor(m / 60)
  if (h < 24) return t.hour(h)
  return t.day(Math.floor(h / 24))
}

type Stats = {
  loc: number
  commits: number | null
  contributions: number | null
  last7Loc: number
  updatedAt: string | null
}

const join = (items: ReactNode[]) =>
  items.flatMap((it, i) => (i === 0 ? [it] : [<span key={`s${i}`} className="px-1.5">·</span>, it]))

export function CodeStats({ lang }: { lang: Lang }) {
  const [data, setData] = useState<Stats | null>(null)
  const [, force] = useState(0)
  const t = lang === "en" ? LABELS.en : LABELS.zh

  useEffect(() => {
    let alive = true
    fetch("/github-stats.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (alive && d && !d.error && typeof d.loc === "number") {
          setData({
            loc: d.loc,
            commits: typeof d.commits === "number" ? d.commits : null,
            contributions: typeof d.contributions === "number" ? d.contributions : null,
            last7Loc: typeof d.last7Loc === "number" ? d.last7Loc : 0,
            updatedAt: typeof d.updatedAt === "string" ? d.updatedAt : null,
          })
        }
      })
      .catch(() => {})
    const iv = setInterval(() => force((n) => n + 1), 60_000)
    return () => {
      alive = false
      clearInterval(iv)
    }
  }, [])

  const loc = useCountUp(data && data.loc > 0 ? data.loc : null)
  const commits = useCountUp(data && data.commits != null ? data.commits : null)
  const contributions = useCountUp(data && data.contributions != null ? data.contributions : null)
  const last7 = useCountUp(data && data.last7Loc > 0 ? data.last7Loc : null)

  if (!data) return null

  const big = (n: number) => (
    <span className="font-extrabold tabular-nums text-black">{n.toLocaleString()}</span>
  )

  const line1: ReactNode[] = []
  if (data.loc > 0) line1.push(<span key="loc">{t.loc(big(loc))}</span>)
  if (data.commits != null) line1.push(<span key="commits">{t.commits(big(commits))}</span>)
  if (data.contributions != null) line1.push(<span key="contrib">{t.contributions(big(contributions))}</span>)

  if (line1.length === 0) return null

  return (
    <div className="space-y-0.5 pt-4 text-sm font-medium leading-relaxed text-[#6b6b6b]">
      <p>{join(line1)}</p>
      <p className="text-xs text-[#9b9b9b]">
        {data.last7Loc > 0 && (
          <>
            <span className="font-bold text-[#1aa34a]">
              {t.last7(<span className="font-extrabold tabular-nums">{last7.toLocaleString()}</span>)}
            </span>
            <span className="px-1.5">·</span>
          </>
        )}
        {data.updatedAt && (
          <>
            <span className="inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-[#34C759] align-middle" />{" "}
            {t.updated}
            {relTime(data.updatedAt, t)}
            <span className="px-1.5">·</span>
          </>
        )}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-2 hover:text-black hover:underline"
        >
          {t.source} ↗
        </a>
      </p>
    </div>
  )
}
