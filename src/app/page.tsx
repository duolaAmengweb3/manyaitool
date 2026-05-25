import Link from "next/link";
import { getMetasByCategory } from "@/tools";

export default function HomePage() {
  const categories = getMetasByCategory();

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">Free Online Tools</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Fast, free, and private. All tools run entirely in your browser — no data is ever sent to a server.
        </p>
      </div>

      {categories.map((cat) => (
        <section key={cat.category} className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-gray-800">{cat.label}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="block p-5 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-1">{tool.shortTitle}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
