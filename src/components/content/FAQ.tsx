"use client";

export function FAQ({ items }: { items: { question: string; answer: string }[] }) {
  if (!items.length) return null;
  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {items.map((item, i) => (
          <details key={i} className="group border border-slate-200 rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-slate-800 hover:bg-slate-50 transition-colors">
              {item.question}
              <span className="ml-2 text-slate-400 group-open:rotate-180 transition-transform">
                &#9662;
              </span>
            </summary>
            <div className="px-4 pb-4 text-slate-600 leading-relaxed">{item.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
