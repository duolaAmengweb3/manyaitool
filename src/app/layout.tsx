import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteChrome } from "@/components/site/SiteChrome";
import { ToastProvider } from "@/components/ui/Toast";
import { CommandPalette } from "@/components/CommandPalette";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/constants";
import "./globals.css";

// 本地化的 Onest(latin 变量字体)，从 Google 中国镜像下载存进 src/app/fonts/，
// 构建不再依赖 Google Fonts(根治 next/font 拉不到 Google 的坑)。
const onest = localFont({
  src: "./fonts/onest-latin.woff2",
  weight: "100 900",
  variable: "--font-onest",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} - Free Online Tools`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: "/branding/logo-library/manyaitool-logo-yellow.png", width: 800, height: 400 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${onest.variable}`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#FFFDF7] text-[#0b0b0b] font-sans">
        <ToastProvider>
          <CommandPalette />
          <SiteChrome>{children}</SiteChrome>
        </ToastProvider>
      </body>
    </html>
  );
}
