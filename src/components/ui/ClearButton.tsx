"use client";

export function ClearButton({ onClear, label = "Clear" }: { onClear: () => void; label?: string }) {
  return (
    <button
      onClick={onClear}
      className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
    >
      {label}
    </button>
  );
}
