"use client";

import { useState } from "react";
import { CopyButton, ClearButton, ErrorAlert } from "@/components/ui";

function decodeJwt(token: string) {
  const parts = token.trim().split(".");
  if (parts.length !== 3) throw new Error("Invalid JWT: must have 3 parts separated by dots");

  const decode = (s: string) => {
    const padded = s.replace(/-/g, "+").replace(/_/g, "/");
    const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
    return JSON.parse(atob(padded + pad));
  };

  const header = decode(parts[0]);
  const payload = decode(parts[1]);

  return { header, payload, signature: parts[2] };
}

function formatTime(ts: number): string {
  const d = new Date(ts * 1000);
  const now = Date.now();
  const diff = ts * 1000 - now;
  const expired = diff < 0;
  const label = expired ? "expired" : "from now";
  const abs = Math.abs(diff);
  const mins = Math.floor(abs / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  const relative = days > 0 ? `${days}d ${hours % 24}h` : hours > 0 ? `${hours}h ${mins % 60}m` : `${mins}m`;
  return `${d.toISOString().replace("T", " ").slice(0, 19)} UTC (${relative} ${label})`;
}

export default function JwtDecoderTool() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ header: any; payload: any; signature: string } | null>(null);

  const handleDecode = (val: string) => {
    setInput(val);
    if (!val.trim()) { setResult(null); setError(""); return; }
    try {
      const decoded = decodeJwt(val);
      setResult(decoded);
      setError("");
    } catch (e) {
      setResult(null);
      setError(e instanceof Error ? e.message : "Failed to decode JWT");
    }
  };

  const headerJson = result ? JSON.stringify(result.header, null, 2) : "";
  const payloadJson = result ? JSON.stringify(result.payload, null, 2) : "";

  const exp = result?.payload?.exp;
  const iat = result?.payload?.iat;
  const isExpired = exp ? exp * 1000 < Date.now() : false;

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={(e) => handleDecode(e.target.value)}
        placeholder="Paste your JWT token here (eyJhbGciOiJIUzI1NiIs...)"
        rows={4}
        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 resize-y outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm break-all"
      />
      <ErrorAlert message={error} />

      {result && (
        <div className="space-y-4">
          {/* Status badges */}
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
              Algorithm: {result.header.alg || "unknown"}
            </span>
            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
              Type: {result.header.typ || "JWT"}
            </span>
            {exp && (
              <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${isExpired ? "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400" : "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400"}`}>
                {isExpired ? "Expired" : "Valid"}
              </span>
            )}
          </div>

          {/* Time info */}
          {(iat || exp) && (
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm space-y-1">
              {iat && <div><span className="text-slate-500 dark:text-slate-400">Issued at:</span> <span className="text-slate-800 dark:text-slate-200 font-mono">{formatTime(iat)}</span></div>}
              {exp && <div><span className="text-slate-500 dark:text-slate-400">Expires:</span> <span className={`font-mono ${isExpired ? "text-red-600 dark:text-red-400" : "text-slate-800 dark:text-slate-200"}`}>{formatTime(exp)}</span></div>}
            </div>
          )}

          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Header</h3>
              <CopyButton text={headerJson} label="Copy" />
            </div>
            <pre className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm font-mono text-slate-800 dark:text-slate-200 overflow-x-auto">{headerJson}</pre>
          </div>

          {/* Payload */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Payload</h3>
              <CopyButton text={payloadJson} label="Copy" />
            </div>
            <pre className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm font-mono text-slate-800 dark:text-slate-200 overflow-x-auto">{payloadJson}</pre>
          </div>

          {/* Signature */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Signature</h3>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm font-mono text-slate-500 dark:text-slate-400 break-all">{result.signature}</div>
          </div>
        </div>
      )}

      {input && <ClearButton onClear={() => { setInput(""); setResult(null); setError(""); }} />}
    </div>
  );
}
