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
      className={`w-full p-3 border border-gray-300 rounded-lg resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
        monospace ? "font-mono text-sm" : ""
      }`}
    />
  );
}
