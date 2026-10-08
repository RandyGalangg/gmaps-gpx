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
        <section id="converter" className="mx-auto max-w-[1240px] px-4 pb-12 sm:px-6">
          <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="space-y-6">
              <RouteInput value={url} onChange={setUrl} onSubmit={() => void c.convert(url)} status={c.status} />
              {c.route && <GPXSettings settings={c.settings} onChange={c.setSettings} />}
            </div>
            <div className="min-w-0 space-y-6">
              <h2 className="text-xl font-bold md:text-2xl">Route Preview</h2>
              <div aria-live="polite" className="space-y-6">
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
        </section>
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
