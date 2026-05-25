"use client";

import { useState } from "react";
import { TextInput, TextOutput, ToggleGroup, ClearButton, ErrorAlert } from "@/components/ui";

export default function Base64EncoderTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState("encode");

  const process = (text: string, m: string) => {
    if (!text) { setOutput(""); setError(""); return; }
    try {
      setOutput(m === "encode" ? btoa(unescape(encodeURIComponent(text))) : decodeURIComponent(escape(atob(text))));
      setError("");
    } catch {
      setOutput("");
      setError(m === "encode" ? "Failed to encode input" : "Invalid Base64 string");
    }
  };

  const handleInputChange = (v: string) => { setInput(v); process(v, mode); };
  const handleModeChange = (m: string) => { setMode(m); setInput(""); setOutput(""); setError(""); };

  return (
    <div className="space-y-4">
      <ToggleGroup
        options={[{ label: "Encode", value: "encode" }, { label: "Decode", value: "decode" }]}
        value={mode}
        onChange={handleModeChange}
      />
      <div className="grid md:grid-cols-2 gap-4">
        <TextInput value={input} onChange={handleInputChange} placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."} monospace />
        <TextOutput value={output} placeholder={mode === "encode" ? "Base64 output..." : "Decoded text..."} monospace />
      </div>
      <ErrorAlert message={error} />
      <ClearButton onClear={() => { setInput(""); setOutput(""); setError(""); }} />
    </div>
  );
}
