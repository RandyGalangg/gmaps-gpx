import { useState } from 'react';
import type { FormEvent } from 'react';
import { CheckCircle2, Clipboard, Loader2, Sparkles } from 'lucide-react';
import { validateInput } from '../utils/validation';
import type { Status } from '../hooks/useRouteConverter';

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  status: Status;
}

export default function RouteInput({ value, onChange, onSubmit, status }: Props) {
  const [touched, setTouched] = useState(false);
  const validity = validateInput(value);
  const loading = status === 'loading';
  const showError = touched && validity !== 'valid';
  const message = validity === 'empty' ? 'Paste a Google Maps route URL.' : 'Please enter a valid Google Maps route URL.';

  const paste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange(text.trim());
      setTouched(true);
    } catch {
      document.getElementById('route-url')?.focus();
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (validity === 'valid' && !loading) onSubmit();
  };

  return (
    <form onSubmit={submit} className="card card-featured" noValidate>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-brand"><Sparkles size={16} aria-hidden /><span className="text-xs font-bold uppercase tracking-[0.12em]">Start here</span></div>
          <label htmlFor="route-url" className="block text-lg font-bold tracking-tight">Paste your Google Maps route</label>
          <p className="mt-1 text-sm text-muted">Short links from the Google Maps app are supported.</p>
        </div>
      </div>
      <div className="relative">
        <input
          id="route-url"
          type="url"
          inputMode="url"
          autoComplete="off"
          value={value}
          disabled={loading}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="https://maps.app.goo.gl/..."
          aria-invalid={showError}
          aria-describedby="route-url-msg"
          className={`field field-lg pr-12 ${showError ? 'border-bad' : validity === 'valid' ? 'border-ok' : ''}`}
        />
        {validity === 'valid' ? <CheckCircle2 size={19} aria-hidden className="absolute right-4 top-4 text-ok" /> : (
          <button type="button" onClick={() => void paste()} disabled={loading} aria-label="Paste from clipboard" className="absolute right-1.5 top-1.5 grid h-10 w-10 place-items-center rounded-lg text-muted hover:bg-canvas hover:text-ink">
            <Clipboard size={18} aria-hidden />
          </button>
        )}
      </div>
      <p id="route-url-msg" role={showError ? 'alert' : undefined} className={`mt-2 min-h-5 text-sm ${showError ? 'text-bad' : 'text-muted'}`}>
        {showError ? message : 'Supports Google Maps links, including maps.app.goo.gl shortened links.'}
      </p>
      <button type="submit" disabled={loading} className="btn-primary mt-5">
        {loading && <Loader2 size={18} className="animate-spin" aria-hidden />}
        {loading ? 'Building your route...' : 'Convert to GPX'}
      </button>
    </form>
  );
}
