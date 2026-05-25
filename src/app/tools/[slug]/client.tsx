"use client";

import { getMetaBySlug } from "@/tools";
import { getToolComponent } from "@/tools/components";
import { CATEGORY_LABELS } from "@/lib/constants";
import { FAQ } from "@/components/content/FAQ";
import { RelatedTools } from "@/components/content/RelatedTools";
import Link from "next/link";

export default function ToolPageClient({ slug }: { slug: string }) {
  const tool = getMetaBySlug(slug);
  const Tool = getToolComponent(slug);

  if (!tool || !Tool) return null;

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        {" / "}
        <span>{CATEGORY_LABELS[tool.category] || tool.category}</span>
        {" / "}
        <span className="text-gray-800">{tool.shortTitle}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-2">{tool.title}</h1>
      <p className="text-gray-600 mb-8">{tool.description}</p>

      <div className="mb-12 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
        <Tool />
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-3">What is {tool.shortTitle}?</h2>
          <p className="text-gray-600 leading-relaxed">{tool.content.whatIs}</p>
        </section>

        {tool.content.howToUse.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-3">How to Use</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              {tool.content.howToUse.map((step, i) => <li key={i}>{step}</li>)}
            </ol>
          </section>
        )}

        {tool.content.features.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-3">Features</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {tool.content.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </section>
        )}

        <FAQ items={tool.content.faq} />

        <RelatedTools slugs={tool.content.relatedSlugs} />
      </div>
    </main>
  );
}
