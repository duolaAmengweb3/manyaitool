"use client";

import { useState, useEffect } from "react";
import {
  NATIONAL_DAYS,
  resolveDate,
  nextOccurrence,
  sameLocalDay,
  CATEGORY_LABELS,
  type DayCategory,
  type NationalDay,
} from "@/data/national-days";

const CAT_COLORS: Record<DayCategory, string> = {
  food: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  fun: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  health: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  awareness: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
};

function fmtDate(d: Date) {
  return new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(d);
}
function fmtShort(d: Date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(d);
}
function daysUntil(target: Date, now: Date) {
  const a = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const b = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

function icsFor(day: NationalDay, date: Date) {
  const d = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ManyAITool//National Days//EN",
    "BEGIN:VEVENT",
    `UID:${day.slug}-${d}@manyaitool.com`,
    `DTSTART;VALUE=DATE:${d}`,
    `SUMMARY:${day.name}`,
    `DESCRIPTION:${day.blurb.replace(/\n/g, " ")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
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

export default function NationalDaysCalendar() {
  const [now, setNow] = useState<Date | null>(null);
  const [filter, setFilter] = useState<DayCategory | "all">("all");

  useEffect(() => {
    setNow(new Date());
  }, []);

  if (!now) return <div className="h-64 flex items-center justify-center text-slate-400">Loading…</div>;

  const year = now.getFullYear();

  // today
  const today = NATIONAL_DAYS.filter((d) => sameLocalDay(resolveDate(d.rule, year), now));

  // upcoming (next 60 days), sorted
  const upcoming = NATIONAL_DAYS.map((d) => ({ day: d, date: nextOccurrence(d.rule, now) }))
    .filter((x) => filter === "all" || x.day.category === filter)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const filters: ("all" | DayCategory)[] = ["all", "food", "fun", "health", "awareness"];

  return (
    <div className="space-y-8">
      {/* HERO — answer-first: today */}
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 sm:p-8 text-white">
        <div className="text-sm uppercase tracking-wide text-amber-100 mb-1">{fmtDate(now)}</div>
        {today.length > 0 ? (
          <>
            <div className="text-2xl sm:text-3xl font-bold mb-2">
              Today is {today.map((d) => d.name).join(" & ")}!
            </div>
            <p className="text-amber-50">
              {today.length === 1
                ? today[0].blurb
                : `There are ${today.length} national days to celebrate today.`}
            </p>
          </>
        ) : (
          <div className="text-2xl sm:text-3xl font-bold">No major national food day today — see what&apos;s coming up below.</div>
        )}
      </div>

      {/* category filter */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
            }`}
          >
            {f === "all" ? "All" : CATEGORY_LABELS[f]}
          </button>
        ))}
      </div>

      {/* upcoming list */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Upcoming National Days</h3>
        <div className="space-y-2">
          {upcoming.map(({ day, date }) => {
            const dleft = daysUntil(date, now);
            return (
              <div
                key={day.slug}
                className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              >
                <div className="text-center w-14 shrink-0">
                  <div className="text-xs text-slate-400">{fmtShort(date).split(" ")[0]}</div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white leading-none">{date.getDate()}</div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-slate-900 dark:text-white">{day.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${CAT_COLORS[day.category]}`}>
                      {CATEGORY_LABELS[day.category]}
                    </span>
                    {day.disputed && (
                      <span className="text-xs text-slate-400" title={day.disputed}>ⓘ date varies</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">{day.blurb}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    {dleft === 0 ? "Today" : dleft === 1 ? "Tomorrow" : `${dleft} days`}
                  </div>
                  <button
                    onClick={() => download(`${day.slug}-${date.getFullYear()}.ics`, icsFor(day, date))}
                    className="text-xs text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    ＋ .ics
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-xs text-slate-400">
        Dates shown for {year} (US). Floating dates (e.g. &ldquo;first Friday of June&rdquo;) are computed automatically for each year. Where sources disagree, the most widely cited date is used and marked &ldquo;date varies.&rdquo;
      </p>
      <p className="text-sm mt-3">
        <a href="/national-days" className="text-indigo-600 dark:text-indigo-400 hover:underline">Browse all National Days with dates →</a>
      </p>
    </div>
  );
}
