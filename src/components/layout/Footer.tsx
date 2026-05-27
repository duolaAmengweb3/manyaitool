import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <img src="/branding/logo-library/manyaitool-logo-transparent.png" alt={SITE_NAME} className="h-7 mb-3" />
            <p className="text-slate-400 text-sm leading-relaxed">
              Free online tools that run entirely in your browser. No data is ever uploaded to any server.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Popular Tools</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tools/json-formatter" className="text-slate-400 hover:text-indigo-300 transition-colors">JSON Formatter</Link></li>
              <li><Link href="/tools/word-counter" className="text-slate-400 hover:text-indigo-300 transition-colors">Word Counter</Link></li>
              <li><Link href="/tools/base64-encoder" className="text-slate-400 hover:text-indigo-300 transition-colors">Base64 Encoder</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">More Tools</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tools/color-picker" className="text-slate-400 hover:text-indigo-300 transition-colors">Color Picker</Link></li>
              <li><Link href="/tools/lorem-ipsum-generator" className="text-slate-400 hover:text-indigo-300 transition-colors">Lorem Ipsum Generator</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <span>&copy; {new Date().getFullYear()} {SITE_NAME}</span>
          <span>100% private — all tools run in your browser. Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-400 text-xs">⌘K</kbd> to search.</span>
        </div>
      </div>
    </footer>
  );
}
