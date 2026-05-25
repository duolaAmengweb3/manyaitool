"use client";

import { useState } from "react";
import { TextInput, TextOutput, ToggleGroup, ClearButton, ErrorAlert } from "@/components/ui";

export default function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState("format");
  const [indent, setIndent] = useState(2);

  const process = (text: string, m: string) => {
    if (!text.trim()) {
      setOutput("");
      setError("");
      return;
    }
    try {
      const parsed = JSON.parse(text);
      setOutput(m === "minify" ? JSON.stringify(parsed) : JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e) {
      setOutput("");
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  };

  const handleInputChange = (v: string) => {
    setInput(v);
    process(v, mode);
  };

  const handleModeChange = (m: string) => {
    setMode(m);
    process(input, m);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        <ToggleGroup
          options={[
            { label: "Format", value: "format" },
            { label: "Minify", value: "minify" },
          ]}
          value={mode}
          onChange={handleModeChange}
        />
        {mode === "format" && (
          <label className="flex items-center gap-2 text-sm text-gray-600">
            Indent:
            <select
              value={indent}
              onChange={(e) => { setIndent(Number(e.target.value)); process(input, mode); }}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
            </select>
          </label>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <TextInput value={input} onChange={handleInputChange} placeholder="Paste your JSON here..." monospace />
        <TextOutput value={output} placeholder="Formatted output..." monospace />
      </div>
      <ErrorAlert message={error} />
      <ClearButton onClear={() => { setInput(""); setOutput(""); setError(""); }} />
    </div>
  );
}
