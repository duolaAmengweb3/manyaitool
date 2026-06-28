"use client";

import { useState, useEffect } from "react";
import { moonState, nextPhase, isFullMoonOn, type MoonState } from "@/lib/moon";
import { FULL_MOONS_2026 } from "@/lib/moon-data";

function fmtCountdown(target: Date, now: Date) {
  let ms = target.getTime() - now.getTime();
  if (ms < 0) ms = 0;
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return { d, h, m, s };
}

function fmtDate(d: Date) {
  return new Intl.DateTimeFormat("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric" }).format(d);
}
function fmtTime(d: Date) {
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZoneName: "short" }).format(d);
}

// SVG moon drawn from illumination + waxing direction (no image assets)
function MoonSVG({ illumination, waxing, size = 160 }: { illumination: number; waxing: boolean; size?: number }) {
  const r = size / 2 - 2;
  const cx = size / 2;
  const cy = size / 2;
  // terminator: x-radius of the ellipse separating light/dark
  const k = Math.abs(1 - 2 * illumination); // 0 at full, 1 at new
  const rx = r * k;
  const litRight = waxing; // waxing → light on the right
  // Build a lit-region path
  let litPath: string;
  if (illumination >= 0.999) {
    litPath = `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx} ${cy + r} A ${r} ${r} 0 1 1 ${cx} ${cy - r} Z`;
  } else if (illumination <= 0.001) {
    litPath = "";
  } else {
    const outerSweep = litRight ? 1 : 0;
    const innerSweep = illumination > 0.5 ? (litRight ? 1 : 0) : litRight ? 0 : 1;
    litPath =
      `M ${cx} ${cy - r} ` +
      `A ${r} ${r} 0 0 ${outerSweep} ${cx} ${cy + r} ` +
      `A ${rx} ${r} 0 0 ${innerSweep} ${cx} ${cy - r} Z`;
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-lg">
      <circle cx={cx} cy={cy} r={r} fill="#1e293b" stroke="#334155" strokeWidth="1" />
      {litPath && <path d={litPath} fill="#f8fafc" />}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#475569" strokeWidth="1" />
    </svg>
  );
}

function download(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function icsForFullMoons(entries: { date: string; name: string }[]) {
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//ManyAITool//Moon Phase Calendar//EN", "CALSCALE:GREGORIAN"];
  for (const e of entries) {
    const d = e.date.replace(/-/g, "");
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:fullmoon-${e.date}@manyaitool.com`);
    lines.push(`DTSTART;VALUE=DATE:${d}`);
    lines.push(`SUMMARY:Full Moon — ${e.name}`);
    lines.push(`DESCRIPTION:${e.name} full moon. Source: manyaitool.com/tools/moon-phase-calendar`);
    lines.push("END:VEVENT");
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export default function MoonPhaseCalendar() {
  const [now, setNow] = useState<Date | null>(null);
  const [state, setState] = useState<MoonState | null>(null);
  const [nextFull, setNextFull] = useState<Date | null>(null);
  const [nextNew, setNextNew] = useState<Date | null>(null);
  const [isFull, setIsFull] = useState(false);
  const [queryDate, setQueryDate] = useState("");

  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setNow(n);
      setState(moonState(n));
      setNextFull(nextPhase(n, 0.5));
      setNextNew(nextPhase(n, 0));
      setIsFull(isFullMoonOn(n));
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const queryResult = (() => {
    if (!queryDate) return null;
    const d = new Date(queryDate + "T12:00:00");
    if (isNaN(d.getTime())) return null;
    const s = moonState(d);
    return { d, s };
  })();

  if (!now || !state || !nextFull || !nextNew) {
    return <div className="h-64 flex items-center justify-center text-slate-400">Loading moon data…</div>;
  }

  const cdFull = fmtCountdown(nextFull, now);
  const cdNew = fmtCountdown(nextNew, now);
  const nextFullName = FULL_MOONS_2026.find((e) => {
    const ed = new Date(e.date + "T12:00:00");
    return Math.abs(ed.getTime() - nextFull.getTime()) < 2 * 86400000;
  });

  return (
    <div className="space-y-8">
      {/* HERO — answer-first */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-center text-white">
        <div className="flex justify-center mb-4">
          <MoonSVG illumination={state.illumination} waxing={state.waxing} />
        </div>
        <div className="text-2xl sm:text-3xl font-bold mb-2">
          {isFull ? (
            <span className="text-amber-300">Yes — tonight is a Full Moon! 🌕</span>
          ) : (
            <span>
              Tonight&apos;s moon is a <span className="text-indigo-300">{state.phaseName}</span>
            </span>
          )}
        </div>
        <p className="text-slate-300 text-lg">
          {(state.illumination * 100).toFixed(0)}% illuminated · {state.ageDays.toFixed(1)} days old ·{" "}
          {state.waxing ? "waxing" : "waning"}
        </p>
        {!isFull && (
          <p className="text-slate-400 mt-2">
            Next full moon in <strong className="text-white">{cdFull.d} days</strong> —{" "}
            {nextFullName ? nextFullName.name + ", " : ""}
            {fmtDate(nextFull)}
          </p>
        )}
      </div>

      {/* COUNTDOWNS */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5">
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Next Full Moon{nextFullName ? ` · ${nextFullName.name}` : ""}</div>
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
            {cdFull.d}d {cdFull.h}h {cdFull.m}m {cdFull.s}s
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{fmtDate(nextFull)} · {fmtTime(nextFull)}</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5">
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Next New Moon</div>
          <div className="text-2xl font-bold text-slate-700 dark:text-slate-300 tabular-nums">
            {cdNew.d}d {cdNew.h}h {cdNew.m}m {cdNew.s}s
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{fmtDate(nextNew)} · {fmtTime(nextNew)}</div>
        </div>
      </div>

      {/* ANY DATE LOOKUP */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          What was the moon phase on a specific date?
        </label>
        <input
          type="date"
          value={queryDate}
          onChange={(e) => setQueryDate(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {queryResult && (
          <div className="mt-3 flex items-center gap-4">
            <MoonSVG illumination={queryResult.s.illumination} waxing={queryResult.s.waxing} size={56} />
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">{queryResult.s.phaseName}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {(queryResult.s.illumination * 100).toFixed(0)}% illuminated · {fmtDate(queryResult.d)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2026 FULL MOON TABLE */}
      <div>
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">2026 Full Moon Calendar</h3>
          <button
            onClick={() => download("full-moons-2026.ics", icsForFullMoons(FULL_MOONS_2026))}
            className="text-sm px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            ＋ Add all 2026 full moons to calendar (.ics)
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                <th className="py-2 pr-4 font-medium">Date (ET)</th>
                <th className="py-2 pr-4 font-medium">Name</th>
                <th className="py-2 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              {FULL_MOONS_2026.map((e) => (
                <tr key={e.date} className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-2 pr-4 whitespace-nowrap text-slate-700 dark:text-slate-300">
                    {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(e.date + "T12:00:00"))}, {e.etTime}
                  </td>
                  <td className="py-2 pr-4 font-medium text-slate-900 dark:text-white">{e.name}</td>
                  <td className="py-2 text-slate-500 dark:text-slate-400">
                    {[e.supermoon && "Supermoon", e.blueMoon && "Blue Moon", e.microMoon && "Micromoon", e.eclipse].filter(Boolean).join(" · ") || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          Times in US Eastern. Phase instants computed with the Jean Meeus astronomical algorithm (accurate to ~1 minute).
        </p>
        <p className="text-sm mt-3">
          <a href="/full-moon" className="text-indigo-600 dark:text-indigo-400 hover:underline">Browse full moon pages by month →</a>
          <span className="mx-2 text-slate-300">·</span>
          <a href="/full-moon/blue-moon-2026" className="text-indigo-600 dark:text-indigo-400 hover:underline">Blue Moon 2026</a>
          <span className="mx-2 text-slate-300">·</span>
          <a href="/full-moon/supermoon-2026" className="text-indigo-600 dark:text-indigo-400 hover:underline">Supermoons 2026</a>
        </p>
      </div>
    </div>
  );
}
