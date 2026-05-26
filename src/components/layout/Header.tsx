import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export function Header() {
  return (
    <header className="bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white hover:text-indigo-300 transition-colors">
          {SITE_NAME}
        </Link>
        <nav className="flex items-center gap-6 text-sm text-slate-300">
          <Link href="/" className="hover:text-white transition-colors">All Tools</Link>
        </nav>
      </div>
    </header>
  );
}
