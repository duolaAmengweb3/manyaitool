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
      <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((tool) => (
          <Link
            key={tool!.slug}
            href={`/tools/${tool!.slug}`}
            className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <h3 className="font-semibold text-blue-600">{tool!.shortTitle}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{tool!.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
