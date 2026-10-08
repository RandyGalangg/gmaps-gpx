import { Suspense, lazy, useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import RouteInput from '../components/RouteInput';
import GPXSettings from '../components/GPXSettings';
import RouteSummary from '../components/RouteSummary';
import DownloadButton from '../components/DownloadButton';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import HowItWorks from '../components/HowItWorks';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import { useRouteConverter } from '../hooks/useRouteConverter';
const RouteMap=lazy(()=>import('../components/RouteMap'));
export default function Home(){
 const c=useRouteConverter();const [url,setUrl]=useState('');
 return <><Header/><main><Hero/>
  <section id="converter" className="ref-section"><div className="shell ref-section-inner">
   <div className="mb-10 text-center"><p className="eyebrow">Simple by design</p><h2 className="ref-heading mt-3">One link.<br/><span className="text-purple">One track.</span></h2><p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-muted">Paste your Google Maps route and turn it into a GPX file in a few seconds.</p></div>
   <div className="converter-ref">
    <div className="ref-card converter-copy"><p className="eyebrow">01 / Paste your route</p><h3 className="mt-4 text-4xl font-extrabold leading-none tracking-[-.055em] md:text-6xl">Start with<br/>a Maps link.</h3><p className="mt-5 max-w-md text-sm leading-6 text-muted">Directions links, including shortened links from the Google Maps app, are supported.</p><div className="mt-8"><RouteInput value={url} onChange={setUrl} onSubmit={()=>void c.convert(url)} status={c.status}/></div>{c.route&&<div className="mt-6"><GPXSettings settings={c.settings} onChange={c.setSettings}/></div>}</div>
    <div className="ref-card converter-form"><p className="eyebrow">02 / Your route</p><div className="mt-4" aria-live="polite">
      {c.status==='idle'&&<div className="route-preview-ref"><span className="preview-label">ROUTE PREVIEW</span><i className="preview-point one"/><i className="preview-point two"/><i className="preview-point three"/><div className="absolute inset-0 grid place-items-center text-center"><div><p className="text-2xl font-extrabold tracking-tight">Your route appears here.</p><p className="mt-2 text-sm text-muted">Paste a link to get started.</p></div></div></div>}
      {c.status==='loading'&&<LoadingState stage={c.stage}/>}
      {c.status==='error'&&c.error&&<ErrorState code={c.error}/>}
      {c.status==='success'&&c.route&&c.gpx&&<div className="space-y-5"><RouteSummary route={c.route}/><Suspense fallback={<div className="route-preview-ref grid place-items-center">Loading map…</div>}><div className="route-map-v2"><RouteMap route={c.route}/></div></Suspense><DownloadButton xml={c.gpx.xml} valid={c.gpx.valid} filename={c.settings.filename} onReset={()=>{c.reset();setUrl('')}}/></div>}
    </div></div>
   </div>
  </div></section>
  <HowItWorks/><FAQ/></main><Footer/></>
}