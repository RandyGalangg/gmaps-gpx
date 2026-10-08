import { Suspense, lazy, useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import RouteInput from '../components/RouteInput';
import GPXSettings from '../components/GPXSettings';
import RouteSummary from '../components/RouteSummary';
import DownloadButton from '../components/DownloadButton';
import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import HowItWorks from '../components/HowItWorks';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import { useRouteConverter } from '../hooks/useRouteConverter';

const RouteMap = lazy(() => import('../components/RouteMap'));

export default function Home() {
  const c = useRouteConverter();
  const [url, setUrl] = useState('');

  return (
    <>
      <Header />
      <main>
        <Hero />
        <section id="converter" className="mx-auto max-w-[1160px] px-4 pb-16 sm:px-6 lg:pb-20">
          <div className="converter-shell">
            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div className="space-y-5">
                <RouteInput value={url} onChange={setUrl} onSubmit={() => void c.convert(url)} status={c.status} />
                {c.route && <GPXSettings settings={c.settings} onChange={c.setSettings} />}
              </div>
              <div className="min-w-0">
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="eyebrow">Preview</p>
                    <h2 className="mt-1 text-xl font-bold tracking-tight md:text-2xl">Your route</h2>
                  </div>
                  {c.status === 'success' && <span className="status-pill">Ready to export</span>}
                </div>
                <div aria-live="polite" className="space-y-5">
                  {c.status === 'idle' && <EmptyState />}
                  {c.status === 'loading' && <LoadingState stage={c.stage} />}
                  {c.status === 'error' && c.error && <ErrorState code={c.error} />}
                  {c.status === 'success' && c.route && c.gpx && (
                    <>
                      <RouteSummary route={c.route} />
                      <Suspense fallback={<div className="card h-[300px] md:h-[440px]" aria-busy="true">Loading map...</div>}>
                        <RouteMap route={c.route} />
                      </Suspense>
                      <DownloadButton xml={c.gpx.xml} valid={c.gpx.valid} filename={c.settings.filename} onReset={() => { c.reset(); setUrl(''); }} />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
