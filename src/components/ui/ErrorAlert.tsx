export function ErrorAlert({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
      {message}
    </div>
  );
}
