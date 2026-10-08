import { Route } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="card flex min-h-[280px] flex-col items-center justify-center text-center">
      <span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-canvas text-muted"><Route size={28} aria-hidden /></span>
      <p className="text-lg font-semibold">Your route will appear here</p>
      <p className="mt-1 max-w-xs text-muted">Paste a Google Maps route to generate a GPX file.</p>
    </div>
  );
}
