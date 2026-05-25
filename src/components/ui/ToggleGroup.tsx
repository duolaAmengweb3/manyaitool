"use client";

export function ToggleGroup({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            value === opt.value
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
