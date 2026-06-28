import { Metadata } from "next";
import Link from "next/link";
import { NATIONAL_DAYS, resolveDate, CATEGORY_LABELS, type DayCategory } from "@/data/national-days";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const metadata: Metadata = {
  title: { absolute: "National Days Calendar 2026 - Full List of Dates" },
  description: "The complete 2026 national days calendar. Browse every National Day — donut, coffee, pizza, taco and more — with exact dates, countdowns, and calendar export.",
  keywords: ["national days calendar", "list of national days", "national days 2026", "national food days", "what national days are there"],
  alternates: { canonical: `${SITE_URL}/national-days` },
  openGraph: { title: "National Days Calendar 2026", description: "Every National Day with exact 2026 dates and countdowns.", url: `${SITE_URL}/national-days`, siteName: SITE_NAME, type: "website" },
};

export default function NationalDaysHub() {
  const cats: DayCategory[] = ["food", "fun", "health", "awareness"];
  const byCat = cats.map((c) => ({
    cat: c,
    days: NATIONAL_DAYS.filter((d) => d.category === c)
      .map((d) => ({ ...d, date: resolveDate(d.rule, 2026) }))
      .sort((a, b) => a.date.getTime() - b.date.getTime()),
  }));

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "National Days" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <nav className="text-sm text-slate-400 mb-6 flex items-center gap-1.5">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-200">National Days</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
          National Days Calendar 2026
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg mb-4">
          Every National Day with its exact 2026 date. Tap any day for the full date, future years, a live countdown, and one-click calendar export.
        </p>
        <p className="mb-8">
          <Link href="/tools/national-days-calendar" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
            → What national day is it today?
          </Link>
        </p>

        <div className="space-y-10">
          {byCat.map(({ cat, days }) => (
            <section key={cat}>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{CATEGORY_LABELS[cat]}</h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {days.map((d) => (
                  <Link key={d.slug} href={`/national-days/${d.slug}`} className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors">
                    <span className="text-xs text-slate-400 w-14 shrink-0 tabular-nums">{MONTHS[d.date.getMonth()]} {d.date.getDate()}</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{d.name}</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
