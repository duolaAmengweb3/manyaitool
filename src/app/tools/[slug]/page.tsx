import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMetaBySlug, getAllSlugs } from "@/tools";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ToolJsonLd } from "@/components/seo/JsonLd";
import ToolPageClient from "./client";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllSlugs().map((s) => ({ slug: s }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getMetaBySlug(slug);
  if (!tool) return {};

  const fullTitle = `${tool.title} | ${SITE_NAME}`;
  const title = fullTitle.length > 60 ? tool.title : fullTitle;

  return {
    title: { absolute: title },
    description: tool.description,
    keywords: tool.keywords,
    alternates: { canonical: `${SITE_URL}/tools/${tool.slug}` },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: `${SITE_URL}/tools/${tool.slug}`,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      description: tool.description,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getMetaBySlug(slug);
  if (!tool) return notFound();

  return (
    <>
      <ToolJsonLd tool={tool} />
      <ToolPageClient slug={slug} />
    </>
  );
}
