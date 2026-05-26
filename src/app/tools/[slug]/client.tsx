"use client";

import { getMetaBySlug } from "@/tools";
import { getToolComponent } from "@/tools/components";
import { CATEGORY_LABELS } from "@/lib/constants";
import { FAQ } from "@/components/content/FAQ";
import { RelatedTools } from "@/components/content/RelatedTools";
import Link from "next/link";

const CATEGORY_COLORS: Record<string, string> = {
  developer: "bg-indigo-100 text-indigo-700",
  text: "bg-teal-100 text-teal-700",
  design: "bg-violet-100 text-violet-700",
  converter: "bg-amber-100 text-amber-700",
  generator: "bg-rose-100 text-rose-700",
  calculator: "bg-blue-100 text-blue-700",
};

export default function ToolPageClient({ slug }: { slug: string }) {
  const tool = getMetaBySlug(slug);
  const Tool = getToolComponent(slug);

  if (!tool || !Tool) return null;

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <nav className="text-sm text-slate-400 mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <span>/</span>
        <span>{CATEGORY_LABELS[tool.category] || tool.category}</span>
        <span>/</span>
        <span className="text-slate-700">{tool.shortTitle}</span>
      </nav>

      <div className="mb-6">
        <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3 ${CATEGORY_COLORS[tool.category] || "bg-slate-100 text-slate-600"}`}>
          {CATEGORY_LABELS[tool.category] || tool.category}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-2">{tool.title}</h1>
        <p className="text-slate-500 text-lg">{tool.description}</p>
      </div>

      <div className="mb-14 p-8 bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50">
        <Tool />
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What is {tool.shortTitle}?</h2>
          <p className="text-slate-600 leading-relaxed">{tool.content.whatIs}</p>
        </section>

        {tool.content.howToUse.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How to Use</h2>
            <ol className="space-y-3">
              {tool.content.howToUse.map((step, i) => (
                <li key={i} className="flex gap-3 text-slate-600">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold flex items-center justify-center">
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
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Features</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {tool.content.features.map((f, i) => (
                <li key={i} className="flex gap-2.5 text-slate-600">
                  <svg className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
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
