import { Download, RotateCcw } from 'lucide-react';
import { sanitizeFilename } from '../utils/filename';

interface Props {
  xml: string;
  valid: boolean;
  filename: string;
  onReset: () => void;
}

export default function DownloadButton({ xml, valid, filename, onReset }: Props) {
  const download = () => {
    if (!valid) return;
    const url = URL.createObjectURL(new Blob([xml], { type: 'application/gpx+xml' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = sanitizeFilename(filename);
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <div className="rounded-2xl border border-brand/20 bg-brand/[0.04] p-5 sm:p-6">
      {!valid && <p role="alert" className="mb-3 text-sm text-bad">GPX generation failed because the route data is incomplete.</p>}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-bold">Ready to take it with you?</p>
          <p className="mt-0.5 text-sm text-muted">Download the GPX file and import it into your device.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button type="button" onClick={download} disabled={!valid} className="btn-primary"><Download size={18} aria-hidden /> Download GPX</button>
          <button type="button" onClick={onReset} className="btn-secondary"><RotateCcw size={17} aria-hidden /> New route</button>
        </div>
      </div>
    </div>
  );
}
