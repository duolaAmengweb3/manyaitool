"use client";

import { CopyButton } from "./CopyButton";

export function TextOutput({
  value,
  placeholder = "Output will appear here...",
  rows = 10,
  monospace = false,
}: {
  value: string;
  placeholder?: string;
  rows?: number;
  monospace?: boolean;
}) {
  return (
    <div className="relative">
      <textarea
        value={value}
        readOnly
        placeholder={placeholder}
        rows={rows}
        className={`w-full p-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900/50 resize-y outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 ${
          monospace ? "font-mono text-sm" : ""
        }`}
      />
      {value && (
        <div className="absolute top-2 right-2">
          <CopyButton text={value} label="Copy" />
        </div>
      )}
    </div>
  );
}
