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
const RouteMap=lazy(()=>import('../components/RouteMap'));
export default function Home(){
 const c=useRouteConverter(); const [url,setUrl]=useState('');
 return <><Header/><main><Hero/>
 <section id="converter" className="converter-v2">
  <div className="shell">
   <div className="converter-grid">
    <div className="converter-column">
      <div className="mono-label mb-4">01 / YOUR ROUTE</div>
      <h2 className="text-4xl font-black leading-none tracking-[-.05em] md:text-6xl">Start with<br/><span className="text-brand">one link.</span></h2>
      <p className="mt-5 max-w-md text-sm font-medium leading-6 text-ink/55">Paste a Google Maps directions URL. Shortened app links are supported.</p>
      <div className="mt-9"><RouteInput value={url} onChange={setUrl} onSubmit={()=>void c.convert(url)} status={c.status}/></div>
      {c.route&&<div className="mt-6"><GPXSettings settings={c.settings} onChange={c.setSettings}/></div>}
    </div>
    <div className="converter-column">
      <div className="mono-label mb-4">02 / ROUTE PREVIEW</div>
      <div aria-live="polite">
       {c.status==='idle'&&<div className="route-placeholder"><div className="dot d1"/><div className="dot d2"/><div className="dot d3"/><div className="relative z-10 text-center"><p className="text-lg font-black">Your route lives here.</p><p className="mt-1 text-sm text-ink/45">Build a route to preview the track.</p></div></div>}
       {c.status==='loading'&&<LoadingState stage={c.stage}/>}
       {c.status==='error'&&c.error&&<ErrorState code={c.error}/>}
       {c.status==='success'&&c.route&&c.gpx&&<div className="space-y-5"><RouteSummary route={c.route}/><Suspense fallback={<div className="route-placeholder">Loading map…</div>}><div className="route-map-v2"><RouteMap route={c.route}/></div></Suspense><DownloadButton xml={c.gpx.xml} valid={c.gpx.valid} filename={c.settings.filename} onReset={()=>{c.reset();setUrl('')}}/></div>}
      </div>
    </div>
   </div>
  </div>
 </section>
 <HowItWorks/><FAQ/></main><Footer/></>
}