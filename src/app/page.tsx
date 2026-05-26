"use client";

import { useState } from "react";
import Link from "next/link";
import { getMetasByCategory, getAllMetas } from "@/tools";

const CATEGORY_COLORS: Record<string, string> = {
  developer: "bg-indigo-100 text-indigo-700",
  text: "bg-teal-100 text-teal-700",
  design: "bg-violet-100 text-violet-700",
  converter: "bg-amber-100 text-amber-700",
  generator: "bg-rose-100 text-rose-700",
  calculator: "bg-blue-100 text-blue-700",
};

const TOOL_ICONS: Record<string, string> = {
  "json-formatter": "{ }",
  "word-counter": "Aa",
  "base64-encoder": "B64",
  "color-picker": "#",
  "lorem-ipsum-generator": "Li",
};

export default function HomePage() {
  const categories = getMetasByCategory();
  const allTools = getAllMetas();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = allTools.filter((tool) => {
    const matchSearch = !search || tool.shortTitle.toLowerCase().includes(search.toLowerCase()) || tool.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "all" || tool.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const categoryList = [
    { key: "all", label: "All" },
    ...categories.map((c) => ({ key: c.category, label: c.label })),
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Free Online Tools
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Fast, free, and private. All tools run entirely in your browser — no data is ever sent to a server.
          </p>
          <div className="max-w-xl mx-auto relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tools... (e.g. JSON, Base64, Color)"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white/15 transition-all"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categoryList.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.key
                    ? "bg-indigo-500 text-white"
                    : "bg-white/10 text-slate-300 hover:bg-white/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group block p-6 bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-indigo-50 flex items-center justify-center text-lg font-bold text-slate-500 group-hover:text-indigo-600 transition-colors shrink-0">
                  {TOOL_ICONS[tool.slug] || "?"}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {tool.shortTitle}
                    </h3>
                  </div>
                  <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 ${CATEGORY_COLORS[tool.category] || "bg-slate-100 text-slate-600"}`}>
                    {tool.category}
                  </span>
                  <p className="text-sm text-slate-500 line-clamp-2">{tool.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            No tools found matching &quot;{search}&quot;
          </div>
        )}
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8 grid sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <div className="font-semibold text-slate-800 text-sm">100% Private</div>
            <div className="text-xs text-slate-500">No data leaves your browser</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div className="font-semibold text-slate-800 text-sm">Instant Results</div>
            <div className="text-xs text-slate-500">All processing happens client-side</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div className="font-semibold text-slate-800 text-sm">Always Free</div>
            <div className="text-xs text-slate-500">No signup, no limits, no ads</div>
          </div>
        </div>
      </section>
    </>
  );
}
