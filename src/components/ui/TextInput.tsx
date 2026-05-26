"use client";

export function TextInput({
  value,
  onChange,
  placeholder = "",
  rows = 10,
  monospace = false,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  monospace?: boolean;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg resize-y focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 ${
        monospace ? "font-mono text-sm" : ""
      }`}
    />
  );
}
