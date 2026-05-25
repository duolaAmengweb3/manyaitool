"use client";

import { useState } from "react";

export default function WordCounterTool() {
  const [text, setText] = useState("");

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.trim() ? text.split(/[.!?]+\s*/g).filter(Boolean).length : 0;
  const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter((p) => p.trim()).length : 0;
  const readingTime = Math.max(1, Math.ceil(words / 225));

  const stats = [
    { label: "Words", value: words },
    { label: "Characters", value: chars },
    { label: "No Spaces", value: charsNoSpaces },
    { label: "Sentences", value: sentences },
    { label: "Paragraphs", value: paragraphs },
    { label: "Reading Time", value: `${readingTime} min` },
  ];

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing or paste your text here..."
        rows={10}
        className="w-full p-3 border border-gray-300 rounded-lg resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
      />
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
