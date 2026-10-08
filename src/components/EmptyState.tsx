import { Map, MousePointerClick, Route as RouteIcon } from 'lucide-react';
export default function EmptyState() {
  return <div className="card min-h-[280px] border-dashed bg-surface/70"><div className="flex h-full min-h-[245px] flex-col items-center justify-center text-center">
    <div className="relative"><span className="grid h-16 w-16 place-items-center rounded-2xl border-2 border-ink bg-lime-300 text-ink shadow-[4px_4px_0_#0f172a]"><Map size={27}/></span><span className="absolute -right-3 -top-2 grid h-7 w-7 place-items-center rounded-full bg-brand text-white shadow-[2px_2px_0_#0f172a]"><RouteIcon size={13}/></span></div>
    <p className="mt-5 font-black">Your route preview starts here</p><p className="mt-1 max-w-xs text-sm font-medium leading-6 text-ink/50">Paste a Google Maps directions link on the left and we’ll show the rebuilt route here.</p>
    <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-ink/45"><MousePointerClick size={14}/> Nothing is sent until you convert.</span>
  </div></div>;
}
