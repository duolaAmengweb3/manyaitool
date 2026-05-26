import Link from "next/link";
import { getAllMetas } from "@/tools";

export function RelatedTools({ slugs }: { slugs: string[] }) {
  const allTools = getAllMetas();
  const related = slugs
    .map((s) => allTools.find((t) => t.slug === s))
    .filter(Boolean);

  if (!related.length) return null;
  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Tools</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((tool) => (
          <Link
            key={tool!.slug}
            href={`/tools/${tool!.slug}`}
            className="block p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-indigo-600">{tool!.shortTitle}</h3>
            <p className="text-sm text-slate-500 mt-1 line-clamp-2">{tool!.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
