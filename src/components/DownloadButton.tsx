import { Download } from 'lucide-react';
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
    <div className="space-y-3">
      {!valid && <p role="alert" className="text-bad">GPX generation failed because the route data is incomplete.</p>}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={download} disabled={!valid} className="btn-primary"><Download size={18} aria-hidden /> Download GPX</button>
        <button type="button" onClick={onReset} className="btn-secondary">Convert another route</button>
      </div>
    </div>
  );
}
