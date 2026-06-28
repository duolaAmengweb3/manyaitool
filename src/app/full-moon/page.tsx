import { Metadata } from "next";
import Link from "next/link";
import { getMoonPages } from "@/data/moon-pages";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: { absolute: "Full Moon 2026 - Calendar, Dates, Names & Times" },
  description: "Full moon 2026 hub: the complete calendar, every month's full moon, the May blue moon, and all three supermoons — with exact dates, times and names.",
  keywords: ["full moon 2026", "full moon calendar", "full moon dates 2026", "full moon names", "next full moon"],
  alternates: { canonical: `${SITE_URL}/full-moon` },
  openGraph: { title: "Full Moon 2026", description: "Every 2026 full moon with dates, names and times.", url: `${SITE_URL}/full-moon`, siteName: SITE_NAME, type: "website" },
};

export default function FullMoonHub() {
  const pages = getMoonPages();
  const year = pages.filter((p) => p.kind === "year");
  const months = pages.filter((p) => p.kind === "month");
  const events = pages.filter((p) => p.kind === "event");

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Full Moon" },
    ],
  };

  const Group = ({ title, list }: { title: string; list: typeof pages }) => (
    <section>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{title}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {list.map((p) => (
          <Link key={p.slug} href={`/full-moon/${p.slug}`} className="px-4 py-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors">
            {p.h1}
          </Link>
        ))}
      </div>
    </section>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <nav className="text-sm text-slate-400 mb-6 flex items-center gap-1.5">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-200">Full Moon</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">Full Moon 2026</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg mb-4">
          All 13 full moons of 2026 with exact dates, traditional names, three supermoons and the May blue moon. Pick a month or event for details and calendar export.
        </p>
        <p className="mb-8">
          <Link href="/tools/moon-phase-calendar" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">→ Is it a full moon tonight? Check the live moon phase</Link>
        </p>

        <div className="space-y-10">
          <Group title="2026 Calendar" list={year} />
          <Group title="By Month" list={months} />
          <Group title="Special Moons" list={events} />
        </div>
      </main>
    </>
  );
}
