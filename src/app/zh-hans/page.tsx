import type { Metadata } from "next";
import { SiteHome } from "@/components/site/SiteHome";
import { HomeJsonLd } from "@/components/seo/HomeJsonLd";
import { HOME_META, HREFLANG_ALTERNATES } from "@/lib/i18n";

export const metadata: Metadata = {
  title: { absolute: HOME_META["zh-Hans"].title },
  description: HOME_META["zh-Hans"].description,
  alternates: {
    canonical: "/zh-hans",
    languages: HREFLANG_ALTERNATES,
  },
};

export default function Page() {
  return (
    <>
      <HomeJsonLd lang="zh-Hans" />
      <SiteHome lang="zh-Hans" />
    </>
  );
}
