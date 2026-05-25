"use client";

export function ClearButton({ onClear, label = "Clear" }: { onClear: () => void; label?: string }) {
  return (
    <button
      onClick={onClear}
      className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
    >
      {label}
    </button>
  );
}
