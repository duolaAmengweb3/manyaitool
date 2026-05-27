"use client";

import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import { useDarkMode } from "@/lib/hooks";

export function Header() {
  const { isDark, toggle } = useDarkMode();

  return (
    <header className="bg-slate-900 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <img src="/branding/logo-library/manyaitool-logo-transparent.png" alt={SITE_NAME} className="h-9 sm:h-10" />
        </Link>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              const event = new KeyboardEvent("keydown", { key: "k", metaKey: true });
              window.dispatchEvent(event);
            }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-slate-400 text-sm hover:bg-white/15 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
            <kbd className="text-xs bg-white/10 px-1.5 py-0.5 rounded">⌘K</kbd>
          </button>
          <button
            onClick={toggle}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <Link href="/" className="text-sm text-slate-300 hover:text-white transition-colors">
            All Tools
          </Link>
        </div>
      </div>
    </header>
  );
}
