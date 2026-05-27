import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/Toast";
import { CommandPalette } from "@/components/CommandPalette";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} - Free Online Tools`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/favicon.svg",
  },
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
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans transition-colors">
        <ToastProvider>
          <Header />
          <CommandPalette />
          <div className="flex-1">{children}</div>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
