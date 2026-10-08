import { useState } from 'react';
import type { FormEvent } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
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

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (validity === 'valid' && !loading) onSubmit();
  };

  return (
    <form onSubmit={submit} className="card" noValidate>
      <label htmlFor="route-url" className="mb-2 block text-sm font-semibold">Google Maps Route URL</label>
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
          placeholder="Paste your Google Maps route link..."
          aria-invalid={showError}
          aria-describedby="route-url-msg"
          className={`field pr-10 ${showError ? 'border-bad' : validity === 'valid' ? 'border-ok' : ''}`}
        />
        {validity === 'valid' && <CheckCircle2 size={18} aria-hidden className="absolute right-3 top-3.5 text-ok" />}
      </div>
      <p id="route-url-msg" role={showError ? 'alert' : undefined} className={`mt-2 min-h-5 text-sm ${showError ? 'text-bad' : 'text-muted'}`}>
        {showError ? message : 'Supports Google Maps links, including maps.app.goo.gl shortened links.'}
      </p>
      <button type="submit" disabled={loading} className="btn-primary mt-4">
        {loading && <Loader2 size={18} className="animate-spin" aria-hidden />}
        {loading ? 'Processing route...' : 'Convert to GPX'}
      </button>
    </form>
  );
}
