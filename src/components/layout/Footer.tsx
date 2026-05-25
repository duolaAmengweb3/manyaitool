import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} {SITE_NAME}. All tools run entirely in your browser. No data is sent to any server.
      </div>
    </footer>
  );
}
