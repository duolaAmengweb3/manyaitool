import Link from "next/link"
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react"
import type { GeoPage } from "@/data/geo-pages"
import { SITE_URL } from "@/lib/constants"

export function GeoBusinessPage({ page }: { page: GeoPage }) {
  const primaryExternal = page.primaryCta.href.startsWith("http")
  const secondaryExternal = page.secondaryCta.href.startsWith("http")

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.metaTitle,
      url: `${SITE_URL}${page.href}`,
      description: page.description,
      inLanguage: "en",
      isPartOf: {
        "@type": "WebSite",
        name: "Doraemon Toolbox",
        url: SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ]

  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="relative overflow-hidden border-b-[3px] border-black bg-black text-white">
        <img
          src={page.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-45"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.88),rgba(0,0,0,.62),rgba(0,0,0,.26))]" />
        <div className="relative container mx-auto flex min-h-[480px] flex-col justify-center px-4 py-20">
          <p className="mb-4 max-w-fit border-2 border-white bg-[#FFC224] px-3 py-1 text-sm font-black uppercase text-black">
            {page.eyebrow}
          </p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-white/88 md:text-xl">
            {page.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={page.primaryCta.href}
              target={primaryExternal ? "_blank" : undefined}
              rel={primaryExternal ? "noopener noreferrer" : undefined}
              className="inline-flex items-center justify-center gap-2 rounded-lg border-[3px] border-black bg-[#FFC224] px-6 py-4 text-base font-black text-black shadow-brutal-sm transition hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              {page.primaryCta.label}
              {primaryExternal ? <ExternalLink className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
            </Link>
            <Link
              href={page.secondaryCta.href}
              target={secondaryExternal ? "_blank" : undefined}
              rel={secondaryExternal ? "noopener noreferrer" : undefined}
              className="inline-flex items-center justify-center gap-2 rounded-lg border-[3px] border-white bg-transparent px-6 py-4 text-base font-black text-white transition hover:bg-white hover:text-black"
            >
              {page.secondaryCta.label}
              {secondaryExternal ? <ExternalLink className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b-[3px] border-black bg-white">
        <div className="container mx-auto grid gap-0 px-4 md:grid-cols-3">
          {page.stats.map((stat) => (
            <div key={stat.label} className="border-black py-7 md:border-r-[3px] md:px-6 md:first:border-l-[3px]">
              <p className="text-sm font-black uppercase text-[#6b6b6b]">{stat.label}</p>
              <p className="mt-2 text-3xl font-black tracking-tight">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4 py-14 md:py-18">
        <section className="grid gap-8 lg:grid-cols-2">
          {page.sections.map((section) => (
            <article key={section.title} className="rounded-[10px] border-[3px] border-black bg-white p-6 shadow-brutal-sm md:p-8">
              <h2 className="text-2xl font-black tracking-tight md:text-3xl">{section.title}</h2>
              <p className="mt-4 text-base font-semibold leading-8 text-[#393939]">{section.body}</p>
              <ul className="mt-6 space-y-3">
                {section.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm font-bold leading-7 text-[#202020]">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-[#2F81F7]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="mt-14">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl font-black tracking-tight md:text-4xl">Proof points</h2>
            <Link href="/case-studies" className="text-sm font-black underline decoration-[3px] underline-offset-4">
              View all cases
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {page.proof.map((item) => (
              <article key={item.title} className="rounded-[10px] border-[3px] border-black bg-[#FFF3D1] p-5 shadow-brutal-sm">
                <h3 className="text-lg font-black">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#393939]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-5 lg:grid-cols-[1fr_2fr]">
          <div className="rounded-[10px] border-[3px] border-black bg-[#0B0B0B] p-6 text-white shadow-brutal-sm">
            <h2 className="text-2xl font-black">FAQ for AI search</h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-white/75">
              Short answers written for both humans and answer engines.
            </p>
          </div>
          <div className="space-y-4">
            {page.faqs.map((item) => (
              <article key={item.question} className="rounded-[10px] border-[3px] border-black bg-white p-5 shadow-brutal-sm">
                <h3 className="text-lg font-black">{item.question}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#393939]">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
