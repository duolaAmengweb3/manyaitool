"use client";

import { useState } from "react";
import Link from "next/link";
import { getMetasByCategory, getAllMetas, getMetaBySlug } from "@/tools";
import { useRecentTools, useFavorites } from "@/lib/hooks";

const CATEGORY_COLORS: Record<string, string> = {
  developer: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  text: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
  design: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  converter: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  generator: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  calculator: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
};

const TOOL_VISUALS: Record<string, { gradient: string; icon: React.ReactNode }> = {
  "json-formatter": {
    gradient: "from-amber-400 to-orange-500",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>,
  },
  "word-counter": {
    gradient: "from-teal-400 to-emerald-500",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>,
  },
  "base64-encoder": {
    gradient: "from-blue-400 to-indigo-500",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" /></svg>,
  },
  "color-picker": {
    gradient: "from-pink-400 to-rose-500",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" /></svg>,
  },
  "lorem-ipsum-generator": {
    gradient: "from-violet-400 to-purple-500",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>,
  },
  "ai-token-calculator": {
    gradient: "from-cyan-400 to-blue-500",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm0 16a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg>,
  },
  "jwt-decoder": {
    gradient: "from-emerald-400 to-teal-500",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" /></svg>,
  },
  "markdown-to-html": {
    gradient: "from-sky-400 to-blue-500",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>,
  },
  "timestamp-converter": {
    gradient: "from-orange-400 to-red-500",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>,
  },
  "svg-to-png": {
    gradient: "from-fuchsia-400 to-pink-500",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>,
  },
  "image-to-base64": {
    gradient: "from-lime-400 to-green-500",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>,
  },
};

const TOOL_TAGLINES: Record<string, string> = {
  "json-formatter": "Beautify, minify, and validate JSON in one click",
  "word-counter": "Words, characters, sentences, and reading time — live as you type",
  "base64-encoder": "Encode and decode Base64 with full Unicode support",
  "color-picker": "Pick any color, get HEX, RGB, and HSL instantly",
  "lorem-ipsum-generator": "Placeholder text by paragraphs, sentences, or word count",
  "ai-token-calculator": "Compare costs across GPT-4, Claude, Gemini, and 20+ models",
  "jwt-decoder": "Decode tokens, check expiry, inspect claims in seconds",
  "markdown-to-html": "Side-by-side Markdown editor with live HTML preview",
  "timestamp-converter": "Unix epoch to human date and back, with live clock",
  "svg-to-png": "Upload SVG, choose scale and background, download PNG",
  "image-to-base64": "Get Base64, data URI, HTML tag, and CSS code from any image",
};

function ToolCard({ slug, isFav, onToggleFav }: { slug: string; isFav: boolean; onToggleFav: () => void }) {
  const tool = getMetaBySlug(slug);
  if (!tool) return null;
  return (
    <div className="group relative block p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-0.5 transition-all duration-200">
      <button
        onClick={(e) => { e.preventDefault(); onToggleFav(); }}
        className="absolute top-4 right-4 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      >
        <svg className={`w-5 h-5 ${isFav ? "text-amber-400 fill-amber-400" : "text-slate-300 dark:text-slate-600"}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill={isFav ? "currentColor" : "none"}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      </button>
      <Link href={`/tools/${tool.slug}`} className="block">
        <div className="flex items-start gap-4">
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${TOOL_VISUALS[tool.slug]?.gradient || "from-slate-400 to-slate-500"} flex items-center justify-center text-white shadow-sm shrink-0`}>
            {TOOL_VISUALS[tool.slug]?.icon || <span className="text-lg font-bold">?</span>}
          </div>
          <div className="min-w-0 pr-6">
            <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1">
              {tool.shortTitle}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{TOOL_TAGLINES[tool.slug] || tool.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function HomePage() {
  const categories = getMetasByCategory();
  const allTools = getAllMetas();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const { recent } = useRecentTools();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const filtered = allTools.filter((tool) => {
    const matchSearch = !search || tool.shortTitle.toLowerCase().includes(search.toLowerCase()) || tool.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "all" || tool.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const categoryList = [
    { key: "all", label: "All" },
    ...categories.map((c) => ({ key: c.category, label: c.label })),
  ];

  const recentTools = recent.filter((s) => allTools.some((t) => t.slug === s));
  const favTools = favorites.filter((s) => allTools.some((t) => t.slug === s));

  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            {allTools.length} tools &middot; 100% free &middot; No signup
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Format, Convert, Calculate<br className="hidden sm:block" />
            <span className="text-indigo-400">— All in Your Browser</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            JSON formatting, token counting, image converting, and more. Open a tool, paste your data, get results instantly. Nothing leaves your device.
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

      <section className="max-w-6xl mx-auto px-4 py-12 space-y-10">
        {recentTools.length === 0 && favTools.length === 0 && !search && activeCategory === "all" && (
          <div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              Popular — start here
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Not sure where to begin? These are the most-used tools.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {["json-formatter", "ai-token-calculator", "word-counter"].map((slug) => (
                <ToolCard key={slug} slug={slug} isFav={isFavorite(slug)} onToggleFav={() => toggleFavorite(slug)} />
              ))}
            </div>
          </div>
        )}

        {recentTools.length > 0 && !search && activeCategory === "all" && (
          <div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Recently Used
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {recentTools.map((slug) => (
                <ToolCard key={slug} slug={slug} isFav={isFavorite(slug)} onToggleFav={() => toggleFavorite(slug)} />
              ))}
            </div>
          </div>
        )}

        {favTools.length > 0 && !search && activeCategory === "all" && (
          <div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="currentColor"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
              Favorites
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {favTools.map((slug) => (
                <ToolCard key={slug} slug={slug} isFav onToggleFav={() => toggleFavorite(slug)} />
              ))}
            </div>
          </div>
        )}

        <div>
          {(recentTools.length > 0 || favTools.length > 0) && !search && activeCategory === "all" && (
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">All Tools</h2>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((tool) => (
              <ToolCard key={tool.slug} slug={tool.slug} isFav={isFavorite(tool.slug)} onToggleFav={() => toggleFavorite(tool.slug)} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              No tools found matching &quot;{search}&quot;
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h2 className="text-center text-lg font-semibold text-slate-800 dark:text-slate-200 mb-8">Why people choose ManyAITool</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Your data stays with you</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Every tool runs in your browser. We never see, store, or transmit your data. Paste sensitive code or API keys with confidence.</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Results in milliseconds</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">No loading spinners, no server roundtrips. Paste and get your result instantly. Works offline too — try turning off your WiFi.</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </div>
              <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1">No ads, no signup, no nonsense</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Just open and use. No account required, no cookie banners, no premium upsells blocking features. Every tool is completely free.</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
