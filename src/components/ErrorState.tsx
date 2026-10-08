import { AlertTriangle, RefreshCw } from 'lucide-react';
import type { AppErrorCode } from '../types/route';

const COPY: Record<AppErrorCode, { title: string; help: string }> = {
  INVALID_URL: { title: 'Please enter a valid Google Maps route URL.', help: 'Open your route in Google Maps, then copy the full address from the browser bar.' },
  UNSUPPORTED_URL: { title: 'This Google Maps link format is not currently supported.', help: 'Shortened links (maps.app.goo.gl), transit routes and non-directions links cannot be read. Open the link in a browser and copy the long google.com/maps/dir/... address instead.' },
  NO_ROUTE: { title: "We couldn't determine the route geometry from this link.", help: 'The link needs at least a start and an end point. Use the Directions view in Google Maps and copy that URL.' },
  ROUTE_UNAVAILABLE: { title: "We couldn't determine the route geometry from this link.", help: 'No route was found between these points for this travel mode. Try a link with stops that are closer to a road or path.' },
  GEOCODE_FAILED: { title: "We couldn't determine the route geometry from this link.", help: 'One of the place names could not be located. Try a link that uses exact coordinates or a more specific place name.' },
  NETWORK: { title: 'Connection failed. Please try again.', help: 'Check your internet connection and retry.' },
  API: { title: "We couldn't retrieve the route right now. Please try again.", help: 'The public routing service may be busy. Wait a moment and retry.' },
};

export default function ErrorState({ code }: { code: AppErrorCode }) {
  const { title, help } = COPY[code];
  return (
    <div className="card min-h-[200px] border-bad/30 bg-bad/[0.02]" role="alert">
      <div className="flex gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-bad/10 text-bad"><AlertTriangle size={19} aria-hidden /></span>
        <div>
          <p className="font-semibold">{title}</p>
          <p className="mt-1 text-sm leading-6 text-muted">{help}</p>
          <button type="button" onClick={() => window.location.reload()} className="btn-secondary mt-5 sm:w-auto"><RefreshCw size={16} aria-hidden /> Try again</button>
        </div>
      </div>
    </div>
  );
}
