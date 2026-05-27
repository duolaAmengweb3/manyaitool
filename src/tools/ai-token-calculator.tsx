"use client";

import { useState, useMemo } from "react";
import { models, providers, PRICING_UPDATED, type ModelPricing } from "@/data/model-pricing";
import { CopyButton } from "@/components/ui";
import { encode } from "gpt-tokenizer";

function countTokens(text: string, model: ModelPricing): number {
  if (!text) return 0;
  if (model.tokenizer === "openai") {
    try {
      return encode(text).length;
    } catch {
      return Math.ceil(text.length / 4);
    }
  }
  return Math.ceil(text.length / 4);
}

function formatCost(cost: number): string {
  if (cost < 0.001) return `$${cost.toFixed(6)}`;
  if (cost < 0.01) return `$${cost.toFixed(4)}`;
  if (cost < 1) return `$${cost.toFixed(3)}`;
  return `$${cost.toFixed(2)}`;
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

const SCENARIOS = [
  { label: "Chatbot", icon: "💬", calls: 1000, avgTokens: 500 },
  { label: "Content Gen", icon: "📝", calls: 100, avgTokens: 2000 },
  { label: "RAG Search", icon: "🔍", calls: 5000, avgTokens: 200 },
  { label: "AI Agent", icon: "🤖", calls: 50, avgTokens: 10000 },
];

export default function AiTokenCalculatorTool() {
  const [text, setText] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const [outputTokens, setOutputTokens] = useState(500);
  const [cacheEnabled, setCacheEnabled] = useState(false);
  const [sortBy, setSortBy] = useState<"total" | "input" | "output">("total");
  const [dailyCalls, setDailyCalls] = useState(100);
  const [inputMode, setInputMode] = useState<"text" | "number">("text");
  const [manualTokens, setManualTokens] = useState(1000);

  const model = models.find((m) => m.id === selectedModel) || models[0];

  const inputTokens = inputMode === "text" ? countTokens(text, model) : manualTokens;
  const words = inputMode === "text" ? (text.trim() ? text.trim().split(/\s+/).length : 0) : Math.round(manualTokens * 0.75);
  const chars = inputMode === "text" ? text.length : manualTokens * 4;

  const inputCostPer1M = cacheEnabled && model.cachedInputPrice ? model.cachedInputPrice : model.inputPrice;
  const inputCost = (inputTokens / 1_000_000) * inputCostPer1M;
  const outputCost = (outputTokens / 1_000_000) * model.outputPrice;
  const totalCost = inputCost + outputCost;

  const contextPercent = model.contextWindow > 0 ? (inputTokens / model.contextWindow) * 100 : 0;

  const dollarBuysTokens = totalCost > 0 ? Math.floor(inputTokens / totalCost) : 0;
  const dollarBuysRequests = totalCost > 0 ? Math.floor(1 / totalCost) : 0;

  const comparison = useMemo(() => {
    return models.map((m) => {
      const ip = cacheEnabled && m.cachedInputPrice ? m.cachedInputPrice : m.inputPrice;
      const ic = (inputTokens / 1_000_000) * ip;
      const oc = (outputTokens / 1_000_000) * m.outputPrice;
      return { model: m, inputCost: ic, outputCost: oc, total: ic + oc };
    }).sort((a, b) => sortBy === "input" ? a.inputCost - b.inputCost : sortBy === "output" ? a.outputCost - b.outputCost : a.total - b.total);
  }, [inputTokens, outputTokens, cacheEnabled, sortBy]);

  const cheapest = comparison[0];

  return (
    <div className="space-y-6">
      {/* Model selector + input mode */}
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Model</label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {providers.map((p) => (
              <optgroup key={p} label={p}>
                {models.filter((m) => m.provider === p).map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div className="flex gap-1 rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden">
          <button onClick={() => setInputMode("text")} className={`px-3 py-2 text-sm font-medium ${inputMode === "text" ? "bg-indigo-600 text-white" : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300"}`}>Text</button>
          <button onClick={() => setInputMode("number")} className={`px-3 py-2 text-sm font-medium ${inputMode === "number" ? "bg-indigo-600 text-white" : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300"}`}>Token Count</button>
        </div>
      </div>

      {/* Input area */}
      {inputMode === "text" ? (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your prompt or text here to count tokens..."
          rows={6}
          className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 resize-y outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
        />
      ) : (
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Input Tokens</label>
          <input
            type="number"
            value={manualTokens}
            onChange={(e) => setManualTokens(Math.max(0, Number(e.target.value)))}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      )}

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{formatNumber(inputTokens)}</div>
          <div className="text-xs text-slate-500">Input Tokens {model.tokenizer === "approximate" && <span className="text-amber-500">(est.)</span>}</div>
        </div>
        <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <div className="text-2xl font-bold text-slate-700 dark:text-slate-300">{formatNumber(words)}</div>
          <div className="text-xs text-slate-500">Words</div>
        </div>
        <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <div className="text-2xl font-bold text-slate-700 dark:text-slate-300">{formatNumber(chars)}</div>
          <div className="text-xs text-slate-500">Characters</div>
        </div>
        <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <div className="text-2xl font-bold text-slate-700 dark:text-slate-300">{contextPercent.toFixed(1)}%</div>
          <div className="text-xs text-slate-500">of {(model.contextWindow / 1000).toFixed(0)}K context</div>
        </div>
      </div>

      {/* Context window bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${contextPercent > 80 ? "bg-red-500" : contextPercent > 50 ? "bg-amber-500" : "bg-indigo-500"}`}
          style={{ width: `${Math.min(contextPercent, 100)}%` }}
        />
      </div>

      {/* Output slider + cost */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Expected Output: <span className="text-indigo-600 dark:text-indigo-400 font-bold">{formatNumber(outputTokens)} tokens</span>
          </label>
          <input
            type="range"
            min={0}
            max={10000}
            step={50}
            value={outputTokens}
            onChange={(e) => setOutputTokens(Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>0</span>
            <div className="flex gap-2">
              {[100, 500, 2000, 5000].map((v) => (
                <button key={v} onClick={() => setOutputTokens(v)} className="hover:text-indigo-600">{v}</button>
              ))}
            </div>
            <span>10K</span>
          </div>
        </div>

        <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">Total Cost</span>
            <label className="flex items-center gap-2 text-xs text-slate-500">
              <input type="checkbox" checked={cacheEnabled} onChange={(e) => setCacheEnabled(e.target.checked)} className="accent-indigo-600 rounded" />
              Prompt Caching
            </label>
          </div>
          <div className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">{formatCost(totalCost)}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 space-y-0.5">
            <div>Input: {formatCost(inputCost)} · Output: {formatCost(outputCost)}</div>
            {dollarBuysRequests > 0 && <div>≈ <strong>${"1"}</strong> buys <strong>{formatNumber(dollarBuysRequests)}</strong> similar requests</div>}
          </div>
          {cacheEnabled && model.cachedInputPrice && (
            <div className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium">
              Caching saves {Math.round((1 - model.cachedInputPrice / model.inputPrice) * 100)}% on input costs
            </div>
          )}
        </div>
      </div>

      {/* Model comparison table */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">All Models Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-2 px-3 font-medium text-slate-600 dark:text-slate-400">Model</th>
                <th className="text-right py-2 px-3 font-medium text-slate-600 dark:text-slate-400 cursor-pointer hover:text-indigo-600" onClick={() => setSortBy("input")}>Input {sortBy === "input" && "↓"}</th>
                <th className="text-right py-2 px-3 font-medium text-slate-600 dark:text-slate-400 cursor-pointer hover:text-indigo-600" onClick={() => setSortBy("output")}>Output {sortBy === "output" && "↓"}</th>
                <th className="text-right py-2 px-3 font-medium text-slate-600 dark:text-slate-400 cursor-pointer hover:text-indigo-600" onClick={() => setSortBy("total")}>Total {sortBy === "total" && "↓"}</th>
                <th className="text-right py-2 px-3 font-medium text-slate-600 dark:text-slate-400">$/1M in</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr
                  key={row.model.id}
                  className={`border-b border-slate-100 dark:border-slate-800 ${row.model.id === selectedModel ? "bg-indigo-50 dark:bg-indigo-900/20" : ""} ${i === 0 ? "text-green-700 dark:text-green-400 font-medium" : ""}`}
                >
                  <td className="py-2 px-3">
                    <span className="text-xs text-slate-400 mr-1">{row.model.provider}</span>
                    {row.model.name}
                    {i === 0 && <span className="ml-1 text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded-full">Cheapest</span>}
                  </td>
                  <td className="py-2 px-3 text-right font-mono">{formatCost(row.inputCost)}</td>
                  <td className="py-2 px-3 text-right font-mono">{formatCost(row.outputCost)}</td>
                  <td className="py-2 px-3 text-right font-mono font-bold">{formatCost(row.total)}</td>
                  <td className="py-2 px-3 text-right font-mono text-slate-500">${row.model.inputPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scenario calculator */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">Cost Projection</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {SCENARIOS.map((s) => (
            <button
              key={s.label}
              onClick={() => { setDailyCalls(s.calls); setOutputTokens(s.avgTokens); }}
              className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 mb-4">
          <label className="text-sm text-slate-600 dark:text-slate-400">Daily API calls:</label>
          <input
            type="number"
            value={dailyCalls}
            onChange={(e) => setDailyCalls(Math.max(0, Number(e.target.value)))}
            className="w-28 px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <div className="text-xl font-bold text-slate-800 dark:text-slate-200">{formatCost(totalCost * dailyCalls)}</div>
            <div className="text-xs text-slate-500">per day</div>
          </div>
          <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <div className="text-xl font-bold text-slate-800 dark:text-slate-200">{formatCost(totalCost * dailyCalls * 30)}</div>
            <div className="text-xs text-slate-500">per month</div>
          </div>
          <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <div className="text-xl font-bold text-slate-800 dark:text-slate-200">{formatCost(totalCost * dailyCalls * 365)}</div>
            <div className="text-xs text-slate-500">per year</div>
          </div>
        </div>
      </div>

      <div className="text-xs text-slate-400 dark:text-slate-500 text-right">
        Pricing updated: {PRICING_UPDATED} · OpenAI models: exact tokenization · Others: estimated (~4 chars/token, ±15%)
      </div>
    </div>
  );
}
