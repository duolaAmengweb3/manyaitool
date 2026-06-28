import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getMoonPages, getMoonPage } from "@/data/moon-pages";
import { FULL_MOONS_2026 } from "@/lib/moon-data";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";
export const dynamicParams = false;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function fmt(dateIso: string) {
  const m = parseInt(dateIso.slice(5, 7), 10) - 1;
  const d = parseInt(dateIso.slice(8, 10), 10);
  return `${MONTHS[m]} ${d}, 2026`;
}

export function generateStaticParams() {
  return getMoonPages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getMoonPage(slug);
  if (!page) return {};
  return {
    title: { absolute: page.title },
    description: page.metaDesc,
    keywords: [page.h1.toLowerCase(), `${page.h1.toLowerCase()} date`, "full moon 2026"],
    alternates: { canonical: `${SITE_URL}/full-moon/${page.slug}` },
    openGraph: { title: page.title, description: page.metaDesc, url: `${SITE_URL}/full-moon/${page.slug}`, siteName: SITE_NAME, type: "website" },
  };
}

export default async function FullMoonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getMoonPage(slug);
  if (!page) return notFound();

  const others = getMoonPages().filter((p) => p.slug !== page.slug && p.kind !== "year").slice(0, 12);

  const faq = page.moons.map((mn) => ({
    q: `When is the ${mn.name} in 2026?`,
    a: `The ${mn.name} reaches its full phase on ${fmt(mn.date)} at ${mn.etTime} ET. ${mn.note}`,
  }));

  const eventsLd = page.moons.map((mn) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${mn.name} (Full Moon)`,
    startDate: mn.date,
    description: mn.note,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    url: `${SITE_URL}/full-moon/${page.slug}`,
  }));
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Full Moon", item: `${SITE_URL}/full-moon` },
      { "@type": "ListItem", position: 3, name: page.h1 },
    ],
  };
  const faqLd = faq.length
    ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }
    : null;

  return (
    <>
      {eventsLd.map((e, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(e) }} />
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}

      <main className="max-w-3xl mx-auto px-4 py-8">
        <nav className="text-sm text-slate-400 mb-6 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span>/</span>
          <Link href="/full-moon" className="hover:text-indigo-600 dark:hover:text-indigo-400">Full Moon</Link>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-200">{page.h1}</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">{page.h1}</h1>

        {/* answer-first */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl p-6 text-white mb-6">
          {page.moons.slice(0, 3).map((mn) => (
            <p key={mn.date} className="text-lg sm:text-xl font-semibold mb-1">
              🌕 {mn.name}: {fmt(mn.date)} at {mn.etTime} ET
              {mn.supermoon ? " · Supermoon" : ""}{mn.blueMoon ? " · Blue Moon" : ""}{mn.eclipse ? ` · ${mn.eclipse}` : ""}
            </p>
          ))}
        </div>

        <div className="space-y-10">
          <section>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{page.blurb}</p>
          </section>

          {page.kind === "year" && (
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">All 2026 Full Moons</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                    <th className="py-2 pr-4 font-medium">Date (ET)</th>
                    <th className="py-2 pr-4 font-medium">Name</th>
                    <th className="py-2 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {FULL_MOONS_2026.map((mn) => (
                    <tr key={mn.date} className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-2 pr-4 whitespace-nowrap text-slate-700 dark:text-slate-300">{fmt(mn.date)}, {mn.etTime}</td>
                      <td className="py-2 pr-4 font-medium text-slate-900 dark:text-white">{mn.name}</td>
                      <td className="py-2 text-slate-500 dark:text-slate-400">{[mn.supermoon && "Supermoon", mn.blueMoon && "Blue Moon", mn.microMoon && "Micromoon", mn.eclipse].filter(Boolean).join(" · ") || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {faq.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faq.map((f, i) => (
                  <div key={i}>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{f.q}</h3>
                    <p className="text-slate-600 dark:text-slate-300">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">More Full Moon Pages</h2>
            <div className="grid sm:grid-cols-3 gap-2">
              {others.map((p) => (
                <Link key={p.slug} href={`/full-moon/${p.slug}`} className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  {p.h1}
                </Link>
              ))}
            </div>
          </section>

          <section className="pt-2">
            <Link href="/full-moon" className="text-indigo-600 dark:text-indigo-400 hover:underline">← All full moon pages</Link>
            <span className="mx-2 text-slate-300">·</span>
            <Link href="/tools/moon-phase-calendar" className="text-indigo-600 dark:text-indigo-400 hover:underline">Is it a full moon tonight?</Link>
          </section>
        </div>
      </main>
    </>
  );
}
