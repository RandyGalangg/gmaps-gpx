import { FileText, Settings2 } from 'lucide-react';
import type { GpxSettings } from '../types/gpx';
import { sanitizeFilename } from '../utils/filename';

interface Props { settings: GpxSettings; onChange: (s: GpxSettings) => void; }

export default function GPXSettings({ settings, onChange }: Props) {
  const set = <K extends keyof GpxSettings>(k: K, v: GpxSettings[K]) => onChange({ ...settings, [k]: v });
  return (
    <section className="card" aria-labelledby="settings-h">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand"><FileText size={18} aria-hidden /></span>
          <div><p className="eyebrow">03 / Optional</p><h2 id="settings-h" className="font-black">GPX file settings</h2></div>
        </div>
        <Settings2 size={18} className="text-ink/30" aria-hidden />
      </div>
      <div className="space-y-4">
        <div><label htmlFor="gpx-name" className="mb-1.5 block text-sm font-bold">Route name</label><input id="gpx-name" className="field" maxLength={120} value={settings.name} onChange={(e) => set('name', e.target.value)} /></div>
        <div><label htmlFor="gpx-file" className="mb-1.5 block text-sm font-bold">Filename</label><input id="gpx-file" className="field" maxLength={120} value={settings.filename} onChange={(e) => set('filename', e.target.value)} aria-describedby="gpx-file-hint" /><p id="gpx-file-hint" className="mt-1.5 break-all text-xs font-medium text-ink/45">Saves as {sanitizeFilename(settings.filename)}</p></div>
        <fieldset className="space-y-1 border-t border-line pt-4"><legend className="mb-1 text-sm font-bold">Include in file</legend>{([['includeTrack','Track'],['includeWaypoints','Waypoints']] as const).map(([k,label]) => <label key={k} className="flex min-h-11 cursor-pointer items-center gap-3 text-sm font-medium"><input type="checkbox" className="h-5 w-5 accent-brand" checked={settings[k]} onChange={(e)=>set(k,e.target.checked)} />{label}</label>)}</fieldset>
      </div>
    </section>
  );
}
