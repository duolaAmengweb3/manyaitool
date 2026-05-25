import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">This tool doesn&apos;t exist yet.</p>
      <Link href="/" className="text-blue-600 hover:underline font-medium">
        Browse all tools
      </Link>
    </main>
  );
}
