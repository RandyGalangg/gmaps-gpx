import { Check, Loader2 } from 'lucide-react';
import type { Stage } from '../hooks/useRouteConverter';

const STAGES: { id: Stage; label: string }[] = [
  { id: 'analyzing', label: 'Analyzing your link' },
  { id: 'resolving', label: 'Finding the route' },
  { id: 'generating', label: 'Building GPX file' },
];

export default function LoadingState({ stage }: { stage: Stage }) {
  const current = STAGES.findIndex((s) => s.id === stage);
  return (
    <div className="card min-h-[280px]" role="status" aria-live="polite">
      <div className="mb-6">
        <p className="font-bold">Building your GPX</p>
        <p className="mt-1 text-sm text-muted">This usually takes a few seconds.</p>
      </div>
      <ol className="space-y-2">
        {STAGES.map((s, i) => (
          <li key={s.id} className={`flex min-h-12 items-center gap-3 rounded-xl px-3 ${i === current ? 'bg-brand/5' : ''} ${i > current ? 'text-muted' : ''}`}>
            {i < current ? <span className="grid h-7 w-7 place-items-center rounded-full bg-ok/10"><Check size={16} className="text-ok" aria-hidden /></span> : i === current ? <span className="grid h-7 w-7 place-items-center rounded-full bg-brand/10"><Loader2 size={16} className="animate-spin text-brand" aria-hidden /></span> : <span className="h-7 w-7 rounded-full border border-line" aria-hidden />}
            <span className={i === current ? 'font-semibold' : ''}>{s.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
