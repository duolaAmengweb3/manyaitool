import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  NATIONAL_DAYS,
  resolveDate,
  CATEGORY_LABELS,
  type NationalDay,
} from "@/data/national-days";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import DayCountdown from "@/components/DayCountdown";

export const dynamic = "force-static";
export const dynamicParams = false;

const YEARS = [2026, 2027, 2028];
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function fmtFull(d: Date) {
  return `${WEEKDAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export function generateStaticParams() {
  return NATIONAL_DAYS.map((d) => ({ slug: d.slug }));
}

function getDay(slug: string): NationalDay | undefined {
  return NATIONAL_DAYS.find((d) => d.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const day = getDay(slug);
  if (!day) return {};
  const d2026 = resolveDate(day.rule, 2026);
  const dateStr = `${MONTHS[d2026.getMonth()]} ${d2026.getDate()}, 2026`;
  let title = `${day.name} 2026 - Date & Countdown`;
  if (title.length > 60) title = `${day.name} 2026`;
  const description = `When is ${day.name}? In 2026 it falls on ${dateStr}. See the exact date, a live countdown, future dates, and add it to your calendar — free.`;
  return {
    title: { absolute: title },
    description,
    keywords: [day.name.toLowerCase(), `${day.name.toLowerCase()} 2026`, `when is ${day.name.toLowerCase()}`, `${day.name.toLowerCase()} date`],
    alternates: { canonical: `${SITE_URL}/national-days/${day.slug}` },
    openGraph: { title, description, url: `${SITE_URL}/national-days/${day.slug}`, siteName: SITE_NAME, type: "website" },
  };
}

export default async function NationalDayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const day = getDay(slug);
  if (!day) return notFound();

  const dates = YEARS.map((y) => ({ year: y, date: resolveDate(day.rule, y) }));
  const main = dates[0];
  const related = NATIONAL_DAYS.filter((d) => d.category === day.category && d.slug !== day.slug).slice(0, 6);

  const faq = [
    { q: `When is ${day.name} 2026?`, a: `${day.name} 2026 is on ${fmtFull(main.date)}.` },
    { q: `When is ${day.name} 2027?`, a: `In 2027, ${day.name} falls on ${fmtFull(dates[1].date)}.` },
    { q: day.rule.type === "fixed"
        ? `Is ${day.name} always on the same date?`
        : `Why does the date of ${day.name} change each year?`,
      a: day.rule.type === "fixed"
        ? `Yes. ${day.name} is observed on the same calendar date every year: ${MONTHS[main.date.getMonth()]} ${main.date.getDate()}.`
        : `${day.name} is defined by a rule rather than a fixed date, so the calendar date shifts each year. This page computes the correct date for every year automatically.` },
    ...(day.disputed ? [{ q: `Is there more than one date for ${day.name}?`, a: day.disputed }] : []),
  ];

  const eventLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: day.name,
    startDate: `${main.year}-${String(main.date.getMonth() + 1).padStart(2, "0")}-${String(main.date.getDate()).padStart(2, "0")}`,
    description: day.blurb,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    url: `${SITE_URL}/national-days/${day.slug}`,
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "National Days", item: `${SITE_URL}/national-days` },
      { "@type": "ListItem", position: 3, name: day.name },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <main className="max-w-3xl mx-auto px-4 py-8">
        <nav className="text-sm text-slate-400 mb-6 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span>/</span>
          <Link href="/national-days" className="hover:text-indigo-600 dark:hover:text-indigo-400">National Days</Link>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-200">{day.name}</span>
        </nav>

        <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3 bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
          {CATEGORY_LABELS[day.category]}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
          {day.name} 2026
        </h1>

        {/* answer-first hero */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white mb-6">
          <p className="text-xl sm:text-2xl font-bold">{day.name} 2026 is on {fmtFull(main.date)}.</p>
          {day.disputed && <p className="text-amber-50 text-sm mt-2">Note: {day.disputed}</p>}
          <div className="mt-4">
            <DayCountdown name={day.name} year={main.year} month={main.date.getMonth() + 1} day={main.date.getDate()} description={day.blurb} />
          </div>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">About {day.name}</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{day.blurb}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{day.name} Dates by Year</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                  <th className="py-2 pr-4 font-medium">Year</th>
                  <th className="py-2 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {dates.map((d) => (
                  <tr key={d.year} className="border-b border-slate-100 dark:border-slate-800">
                    <td className="py-2 pr-4 font-medium text-slate-900 dark:text-white">{d.year}</td>
                    <td className="py-2 text-slate-600 dark:text-slate-300">{fmtFull(d.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

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

          {related.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Related National Days</h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {related.map((r) => (
                  <Link key={r.slug} href={`/national-days/${r.slug}`} className="px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    {r.name}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="pt-2">
            <Link href="/national-days" className="text-indigo-600 dark:text-indigo-400 hover:underline">← Browse all National Days</Link>
            <span className="mx-2 text-slate-300">·</span>
            <Link href="/tools/national-days-calendar" className="text-indigo-600 dark:text-indigo-400 hover:underline">What national day is today?</Link>
          </section>
        </div>
      </main>
    </>
  );
}
