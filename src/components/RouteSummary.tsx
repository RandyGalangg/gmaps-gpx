import { CheckCircle2 } from 'lucide-react';
import type { RouteData } from '../types/route';
import { pathLength } from '../utils/distance';
import { formatDistance, formatDuration, pointLabel } from '../utils/format';

export default function RouteSummary({ route }: { route: RouteData }) {
  const rows: [string, string][] = [
    ['Origin', pointLabel(route.origin)],
    ['Destination', pointLabel(route.destination)],
    ['Distance', formatDistance(route.distance ?? pathLength(route.geometry))],
    ['Duration', route.duration !== undefined ? formatDuration(route.duration) : 'Not available'],
    ['Track points', route.geometry.length.toLocaleString()],
  ];
  return (
    <section className="card" aria-label="Route information">
      <p className="mb-4 flex items-center gap-2 font-semibold text-ok"><CheckCircle2 size={20} aria-hidden /> GPX Ready</p>
      <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
        {rows.map(([k, v]) => (
          <div key={k} className="min-w-0">
            <dt className="text-sm text-muted">{k}</dt>
            <dd className="break-words font-medium">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
