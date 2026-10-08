import { ArrowDownRight, Sparkles } from 'lucide-react';
export default function Hero(){
  const go=()=>{const el=document.getElementById('route-url');el?.scrollIntoView({block:'center'});el?.focus({preventScroll:true})};
  return <section id="top" className="hero-v2">
    <div className="shell hero-v2-inner">
      <div className="mono-label mb-6 flex items-center gap-3"><span>GOOGLE MAPS</span><span className="h-px w-12 bg-ink/20"/><span className="text-brand">GPX CONVERTER</span></div>
      <h1 className="hero-title">TURN MAPS<br/><span className="accent">INTO TRACKS.</span></h1>
      <p className="hero-sub mt-7">Convert a Google Maps directions link into a clean, portable GPX track for your GPS, cycling computer, or navigation app.</p>
      <div className="mt-8 flex flex-wrap items-center gap-3"><button onClick={go} className="btn-primary">Build my GPX <ArrowDownRight size={18}/></button><span className="mono-label flex items-center gap-2"><Sparkles size={14} className="text-brand"/> Free · No account</span></div>
      <div className="mt-12 flex flex-wrap gap-2"><span className="rounded-full border-2 border-ink bg-surface px-3 py-1.5 text-xs font-black">DRIVING</span><span className="rounded-full border-2 border-ink bg-surface px-3 py-1.5 text-xs font-black">CYCLING</span><span className="rounded-full border-2 border-ink bg-surface px-3 py-1.5 text-xs font-black">WALKING</span></div>
      <div className="hero-v2-art" aria-hidden><div className="route"/><div className="route2"/><i className="pin p1"/><i className="pin p2"/><i className="pin p3"/><div className="label">ROUTE STATUS / <b>READY</b></div></div>
      <div className="absolute bottom-8 left-4 right-4 hidden justify-between border-t-2 border-ink pt-3 text-[10px] font-black uppercase tracking-[.18em] text-ink/40 sm:flex"><span>01 / INPUT</span><span>02 / ROUTE</span><span>03 / EXPORT</span></div>
    </div>
  </section>
}