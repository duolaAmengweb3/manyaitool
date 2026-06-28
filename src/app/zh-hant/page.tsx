import type { Metadata } from "next";
import { SiteHome } from "@/components/site/SiteHome";
import { HomeJsonLd } from "@/components/seo/HomeJsonLd";
import { HOME_META, HREFLANG_ALTERNATES } from "@/lib/i18n";

export const metadata: Metadata = {
  title: { absolute: HOME_META["zh-Hant"].title },
  description: HOME_META["zh-Hant"].description,
  alternates: {
    canonical: "/zh-hant",
    languages: HREFLANG_ALTERNATES,
  },
};

export default function Page() {
  return (
    <>
      <HomeJsonLd lang="zh-Hant" />
      <SiteHome lang="zh-Hant" />
    </>
  );
}
