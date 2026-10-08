import { Map, MousePointerClick } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="card min-h-[280px] border-dashed bg-white/70">
      <div className="flex h-full min-h-[245px] flex-col items-center justify-center text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand/10 text-brand"><Map size={27} aria-hidden /></span>
        <p className="mt-4 font-bold">Your route preview starts here</p>
        <p className="mt-1 max-w-xs text-sm leading-6 text-muted">Paste a Google Maps directions link on the left and we’ll show the rebuilt route here.</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-muted"><MousePointerClick size={14} aria-hidden /> Nothing is sent until you convert.</span>
      </div>
    </div>
  );
}
