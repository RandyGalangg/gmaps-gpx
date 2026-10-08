import type { GpxSettings } from '../types/gpx';
import { sanitizeFilename } from '../utils/filename';

interface Props {
  settings: GpxSettings;
  onChange: (s: GpxSettings) => void;
}

export default function GPXSettings({ settings, onChange }: Props) {
  const set = <K extends keyof GpxSettings>(k: K, v: GpxSettings[K]) => onChange({ ...settings, [k]: v });
  return (
    <section className="card" aria-labelledby="settings-h">
      <h2 id="settings-h" className="mb-4 text-lg font-semibold">GPX Settings</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="gpx-name" className="mb-1.5 block text-sm font-semibold">Route name</label>
          <input id="gpx-name" className="field" maxLength={120} value={settings.name} onChange={(e) => set('name', e.target.value)} />
        </div>
        <div>
          <label htmlFor="gpx-file" className="mb-1.5 block text-sm font-semibold">Filename</label>
          <input id="gpx-file" className="field" maxLength={120} value={settings.filename} onChange={(e) => set('filename', e.target.value)} aria-describedby="gpx-file-hint" />
          <p id="gpx-file-hint" className="mt-1.5 break-all text-sm text-muted">Saves as {sanitizeFilename(settings.filename)}</p>
        </div>
        <fieldset className="space-y-1">
          <legend className="sr-only">Include in file</legend>
          {([['includeTrack', 'Include track'], ['includeWaypoints', 'Include waypoints']] as const).map(([k, label]) => (
            <label key={k} className="flex min-h-11 cursor-pointer items-center gap-3 text-base">
              <input type="checkbox" className="h-5 w-5 accent-brand" checked={settings[k]} onChange={(e) => set(k, e.target.checked)} />
              {label}
            </label>
          ))}
        </fieldset>
      </div>
    </section>
  );
}
