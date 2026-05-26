"use client";

import { useToast } from "./Toast";

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const toast = useToast();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    toast("Copied to clipboard!");
  };

  return (
    <button
      onClick={handleCopy}
      disabled={!text}
      className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
      {label}
    </button>
  );
}
