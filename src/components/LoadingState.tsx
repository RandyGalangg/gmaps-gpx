import { Check, Loader2 } from 'lucide-react';
import type { Stage } from '../hooks/useRouteConverter';

const STAGES: { id: Stage; label: string }[] = [
  { id: 'analyzing', label: 'Analyzing link' },
  { id: 'resolving', label: 'Resolving route' },
  { id: 'generating', label: 'Generating GPX' },
];

export default function LoadingState({ stage }: { stage: Stage }) {
  const current = STAGES.findIndex((s) => s.id === stage);
  return (
    <div className="card min-h-[280px]" role="status" aria-live="polite">
      <ol className="space-y-4">
        {STAGES.map((s, i) => (
          <li key={s.id} className={`flex min-h-11 items-center gap-3 ${i > current ? 'text-muted' : ''}`}>
            {i < current ? <Check size={20} className="text-ok" aria-hidden /> : i === current ? <Loader2 size={20} className="animate-spin text-brand" aria-hidden /> : <span className="h-5 w-5 rounded-full border border-line" aria-hidden />}
            <span className={i === current ? 'font-semibold' : ''}>{s.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
