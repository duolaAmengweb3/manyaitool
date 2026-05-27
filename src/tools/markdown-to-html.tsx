"use client";

import { useState, useMemo } from "react";
import { marked } from "marked";
import { CopyButton, ClearButton } from "@/components/ui";

const SAMPLE = `# Hello World

This is a **Markdown** demo with *italic* text.

## Features

- List item one
- List item two
- List item three

### Code Example

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> This is a blockquote.

Visit [ManyAITool](https://manyaitool.com) for more tools.`;

export default function MarkdownToHtmlTool() {
  const [input, setInput] = useState("");
  const [tab, setTab] = useState<"html" | "preview">("preview");

  const html = useMemo(() => {
    if (!input) return "";
    try {
      return marked.parse(input, { async: false }) as string;
    } catch {
      return "<p>Error parsing Markdown</p>";
    }
  }, [input]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setInput(SAMPLE)}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Load example
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Markdown</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste Markdown here..."
            rows={16}
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 resize-y outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex gap-1 rounded-lg border border-slate-200 dark:border-slate-600 overflow-hidden">
              <button onClick={() => setTab("preview")} className={`px-3 py-1 text-sm font-medium ${tab === "preview" ? "bg-indigo-600 text-white" : "text-slate-600 dark:text-slate-300"}`}>Preview</button>
              <button onClick={() => setTab("html")} className={`px-3 py-1 text-sm font-medium ${tab === "html" ? "bg-indigo-600 text-white" : "text-slate-600 dark:text-slate-300"}`}>HTML</button>
            </div>
            {html && <CopyButton text={html} label="Copy HTML" />}
          </div>
          {tab === "preview" ? (
            <div
              className="p-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 min-h-[384px] prose prose-sm dark:prose-invert max-w-none overflow-auto"
              dangerouslySetInnerHTML={{ __html: html || '<p class="text-slate-400">Preview will appear here...</p>' }}
            />
          ) : (
            <textarea
              value={html}
              readOnly
              rows={16}
              placeholder="HTML output..."
              className="w-full p-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 resize-y outline-none font-mono text-sm"
            />
          )}
        </div>
      </div>
      {input && <ClearButton onClear={() => setInput("")} />}
    </div>
  );
}
