"use client";

import { useEffect } from "react";
import { getMetaBySlug } from "@/tools";
import { getToolComponent } from "@/tools/components";
import { CATEGORY_LABELS } from "@/lib/constants";
import { FAQ } from "@/components/content/FAQ";
import { RelatedTools } from "@/components/content/RelatedTools";
import { useRecentTools } from "@/lib/hooks";
import Link from "next/link";

const CATEGORY_COLORS: Record<string, string> = {
  developer: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  text: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
  design: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  converter: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  generator: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  calculator: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
};

export default function ToolPageClient({ slug }: { slug: string }) {
  const tool = getMetaBySlug(slug);
  const Tool = getToolComponent(slug);
  const { addRecent } = useRecentTools();

  useEffect(() => {
    if (slug) addRecent(slug);
  }, [slug]);

  if (!tool || !Tool) return null;

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <nav className="text-sm text-slate-400 mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
        <span>/</span>
        <span>{CATEGORY_LABELS[tool.category] || tool.category}</span>
        <span>/</span>
        <span className="text-slate-700 dark:text-slate-200">{tool.shortTitle}</span>
      </nav>

      <div className="mb-6">
        <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3 ${CATEGORY_COLORS[tool.category] || "bg-slate-100 text-slate-600"}`}>
          {CATEGORY_LABELS[tool.category] || tool.category}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">{tool.title}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">{tool.description}</p>
      </div>

      <div className="mb-14 p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200/50 dark:shadow-none">
        <Tool />
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">What is {tool.shortTitle}?</h2>
          <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
            {tool.content.whatIs.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </section>

        {tool.content.explained && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">How {tool.shortTitle} Works</h2>
            <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
              {tool.content.explained.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>
        )}

        {tool.content.useCases && tool.content.useCases.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Common Use Cases</h2>
            <ul className="space-y-3">
              {tool.content.useCases.map((uc, i) => (
                <li key={i} className="flex gap-2.5 text-slate-600 dark:text-slate-300">
                  <span className="text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5">&#8226;</span>
                  {uc}
                </li>
              ))}
            </ul>
          </section>
        )}

        {tool.content.howToUse.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">How to Use</h2>
            <ol className="space-y-3">
              {tool.content.howToUse.map((step, i) => (
                <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-300">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-semibold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {tool.content.features.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Features</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {tool.content.features.map((f, i) => (
                <li key={i} className="flex gap-2.5 text-slate-600 dark:text-slate-300">
                  <svg className="w-5 h-5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </section>
        )}

        {tool.content.tips && tool.content.tips.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Tips & Best Practices</h2>
            <ul className="space-y-3">
              {tool.content.tips.map((tip, i) => (
                <li key={i} className="flex gap-2.5 text-slate-600 dark:text-slate-300">
                  <span className="text-amber-500 shrink-0 mt-0.5">💡</span>
                  {tip}
                </li>
              ))}
            </ul>
          </section>
        )}

        <FAQ items={tool.content.faq} />

        <RelatedTools slugs={tool.content.relatedSlugs} />
      </div>
    </main>
  );
}
