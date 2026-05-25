import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
          {SITE_NAME}
        </Link>
        <nav className="text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">All Tools</Link>
        </nav>
      </div>
    </header>
  );
}
