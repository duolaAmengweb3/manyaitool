"use client";

import { useState } from "react";
import { CopyButton, ClearButton } from "@/components/ui";

const LOREM_WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" ");

function randomWords(count: number): string {
  return Array.from({ length: count }, () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]).join(" ");
}

function generateSentence(): string {
  const s = randomWords(8 + Math.floor(Math.random() * 12));
  return s.charAt(0).toUpperCase() + s.slice(1) + ".";
}

function generateParagraph(): string {
  return Array.from({ length: 4 + Math.floor(Math.random() * 4) }, generateSentence).join(" ");
}

export default function LoremIpsumTool() {
  const [count, setCount] = useState(3);
  const [unit, setUnit] = useState("paragraphs");
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState("");

  const generate = () => {
    let result = "";
    if (unit === "paragraphs") result = Array.from({ length: count }, generateParagraph).join("\n\n");
    else if (unit === "sentences") result = Array.from({ length: count }, generateSentence).join(" ");
    else { result = randomWords(count); result = result.charAt(0).toUpperCase() + result.slice(1) + "."; }
    if (startWithLorem) result = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + result;
    setOutput(result);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        <label className="flex items-center gap-2 text-sm">
          Generate
          <input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Math.max(1, Number(e.target.value)))} className="w-20 px-2 py-1 border border-gray-300 rounded" />
          <select value={unit} onChange={(e) => setUnit(e.target.value)} className="px-2 py-1 border border-gray-300 rounded">
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" checked={startWithLorem} onChange={(e) => setStartWithLorem(e.target.checked)} className="rounded" />
          Start with &quot;Lorem ipsum...&quot;
        </label>
      </div>
      <button onClick={generate} className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">Generate</button>
      {output && (
        <div>
          <textarea value={output} readOnly rows={12} className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 resize-y outline-none" />
          <div className="flex gap-2 mt-2">
            <CopyButton text={output} />
            <ClearButton onClear={() => setOutput("")} />
          </div>
        </div>
      )}
    </div>
  );
}
