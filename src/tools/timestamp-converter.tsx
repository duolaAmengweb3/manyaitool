"use client";

import { useState, useEffect } from "react";
import { CopyButton } from "@/components/ui";

function pad(n: number) { return n.toString().padStart(2, "0"); }

function formatDate(d: Date): string {
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} UTC`;
}

function formatLocal(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())} (local)`;
}

function relativeTime(d: Date): string {
  const now = Date.now();
  const diff = d.getTime() - now;
  const abs = Math.abs(diff);
  const secs = Math.floor(abs / 1000);
  const mins = Math.floor(secs / 60);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  const label = diff < 0 ? "ago" : "from now";
  if (days > 365) return `${Math.floor(days / 365)} years ${label}`;
  if (days > 30) return `${Math.floor(days / 30)} months ${label}`;
  if (days > 0) return `${days} days ${hours % 24}h ${label}`;
  if (hours > 0) return `${hours}h ${mins % 60}m ${label}`;
  if (mins > 0) return `${mins}m ${secs % 60}s ${label}`;
  return `${secs}s ${label}`;
}

export default function TimestampConverterTool() {
  const [mode, setMode] = useState<"toDate" | "toTimestamp">("toDate");
  const [tsInput, setTsInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));

  useEffect(() => {
    const interval = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(interval);
  }, []);

  const tsNum = parseInt(tsInput);
  const tsDate = !isNaN(tsNum)
    ? new Date(tsInput.length > 10 ? tsNum : tsNum * 1000)
    : null;

  const dateTs = dateInput ? Math.floor(new Date(dateInput).getTime() / 1000) : null;

  return (
    <div className="space-y-6">
      {/* Live clock */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
        <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Current Unix Timestamp</div>
        <div className="text-3xl font-bold font-mono text-indigo-600 dark:text-indigo-400">{now}</div>
        <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{formatDate(new Date())}</div>
        <div className="mt-2">
          <CopyButton text={now.toString()} label="Copy Timestamp" />
        </div>
      </div>

      {/* Mode toggle */}
      <div className="flex gap-1 rounded-lg border border-slate-200 dark:border-slate-600 overflow-hidden w-fit">
        <button onClick={() => setMode("toDate")} className={`px-4 py-2 text-sm font-medium ${mode === "toDate" ? "bg-indigo-600 text-white" : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300"}`}>
          Timestamp → Date
        </button>
        <button onClick={() => setMode("toTimestamp")} className={`px-4 py-2 text-sm font-medium ${mode === "toTimestamp" ? "bg-indigo-600 text-white" : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300"}`}>
          Date → Timestamp
        </button>
      </div>

      {mode === "toDate" ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Unix Timestamp</label>
            <input
              type="text"
              value={tsInput}
              onChange={(e) => setTsInput(e.target.value)}
              placeholder="e.g. 1748371200 or 1748371200000"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
            />
            <div className="text-xs text-slate-400 mt-1">Supports seconds (10 digits) and milliseconds (13 digits)</div>
          </div>
          {tsDate && !isNaN(tsDate.getTime()) && (
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "UTC", value: formatDate(tsDate) },
                { label: "Local", value: formatLocal(tsDate) },
                { label: "ISO 8601", value: tsDate.toISOString() },
                { label: "Relative", value: relativeTime(tsDate) },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{item.label}</div>
                    <div className="text-sm font-mono text-slate-800 dark:text-slate-200">{item.value}</div>
                  </div>
                  <CopyButton text={item.value} label="Copy" />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date & Time</label>
            <input
              type="datetime-local"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {dateTs && !isNaN(dateTs) && (
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Seconds", value: dateTs.toString() },
                { label: "Milliseconds", value: (dateTs * 1000).toString() },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{item.label}</div>
                    <div className="text-sm font-mono text-slate-800 dark:text-slate-200">{item.value}</div>
                  </div>
                  <CopyButton text={item.value} label="Copy" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
