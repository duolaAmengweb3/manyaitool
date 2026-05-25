"use client";

export function FAQ({ items }: { items: { question: string; answer: string }[] }) {
  if (!items.length) return null;
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {items.map((item, i) => (
          <details key={i} className="group border border-gray-200 rounded-lg">
            <summary className="flex items-center justify-between p-4 cursor-pointer font-medium hover:bg-gray-50">
              {item.question}
              <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">
                &#9662;
              </span>
            </summary>
            <div className="px-4 pb-4 text-gray-600">{item.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
