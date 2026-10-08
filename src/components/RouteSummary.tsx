import { CheckCircle2, Clock3, Footprints, MapPinned, Route as RouteIcon } from 'lucide-react';
import type { RouteData } from '../types/route';
import { pathLength } from '../utils/distance';
import { formatDistance, formatDuration, pointLabel } from '../utils/format';

export default function RouteSummary({ route }: { route: RouteData }) {
  const rows = [
    { icon: MapPinned, label: 'From', value: pointLabel(route.origin) },
    { icon: MapPinned, label: 'To', value: pointLabel(route.destination) },
  ];
  return (
    <section className="card" aria-label="Route information">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ok/10 text-ok"><CheckCircle2 size={20} aria-hidden /></span>
        <div className="min-w-0">
          <p className="font-bold">Route ready</p>
          <p className="mt-0.5 text-sm text-muted">The route has been rebuilt and is ready for export.</p>
        </div>
      </div>
      <div className="mt-5 rounded-xl border border-line bg-canvas p-4">
        <div className="space-y-3">
          {rows.map(({ icon: Icon, label, value }) => (
            <div key={label} className="grid grid-cols-[20px_42px_minmax(0,1fr)] items-start gap-2">
              <Icon size={17} className={label === 'From' ? 'text-brand' : 'text-bad'} aria-hidden />
              <span className="text-xs font-bold uppercase tracking-wide text-muted">{label}</span>
              <span className="min-w-0 break-words text-sm font-semibold">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="stat"><RouteIcon size={16} aria-hidden /><span>{formatDistance(route.distance ?? pathLength(route.geometry))}</span><small>Distance</small></div>
        <div className="stat"><Clock3 size={16} aria-hidden /><span>{route.duration !== undefined ? formatDuration(route.duration) : '—'}</span><small>Duration</small></div>
        <div className="stat col-span-2 sm:col-span-1"><Footprints size={16} aria-hidden /><span>{route.geometry.length.toLocaleString()}</span><small>Track points</small></div>
      </div>
    </section>
  );
}
