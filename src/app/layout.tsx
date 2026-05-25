import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} - Free Online Tools`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-gray-50 font-sans">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
