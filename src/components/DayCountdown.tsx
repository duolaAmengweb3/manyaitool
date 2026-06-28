"use client";

import { useState, useEffect } from "react";

// Live countdown + .ics export for a single calendar day (local time).
export default function DayCountdown({
  name,
  year,
  month, // 1-12
  day,
  description,
}: {
  name: string;
  year: number;
  month: number;
  day: number;
  description: string;
}) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    setNow(new Date());
    return () => clearInterval(t);
  }, []);

  const target = new Date(year, month - 1, day);
  let label = "";
  if (now) {
    const a = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const days = Math.round((target.getTime() - a.getTime()) / 86400000);
    if (days === 0) label = "Today!";
    else if (days === 1) label = "Tomorrow";
    else if (days > 0) label = `in ${days} days`;
    else label = `${-days} days ago`;
  }

  const downloadIcs = () => {
    const d = `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`;
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//ManyAITool//Calendar//EN",
      "BEGIN:VEVENT",
      `UID:${d}-${name.replace(/\s+/g, "")}@manyaitool.com`,
      `DTSTART;VALUE=DATE:${d}`,
      `SUMMARY:${name}`,
      `DESCRIPTION:${description.replace(/\n/g, " ").slice(0, 300)}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name.replace(/\s+/g, "-").toLowerCase()}-${year}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {label && (
        <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 tabular-nums">
          {label}
        </span>
      )}
      <button
        onClick={downloadIcs}
        className="text-sm px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
      >
        ＋ Add to calendar (.ics)
      </button>
    </div>
  );
}
