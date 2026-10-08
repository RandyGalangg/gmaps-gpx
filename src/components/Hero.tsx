import { ArrowDownRight, Check, Compass, MapPin, Sparkles } from 'lucide-react';

export default function Hero() {
  const go=()=>{const el=document.getElementById('route-url');el?.scrollIntoView({block:'center'});el?.focus({preventScroll:true});};
  return <section id="top" className="hero-section">
    <div className="map-pattern" aria-hidden/>
    <div className="hero-route hero-route-one" aria-hidden><span/><i/><b/></div>
    <div className="hero-route hero-route-two" aria-hidden><span/><i/><b/></div>
    <div className="hero-card route-sticker" aria-hidden><Compass size={18}/><span>ROUTE<br/><strong>READY</strong></span></div>
    <div className="hero-card coordinate-sticker" aria-hidden><MapPin size={16}/><span>-8.5891, 115.1077</span></div>
    <div className="relative mx-auto max-w-[1180px] px-4 pb-20 pt-16 sm:px-6 md:pb-24 md:pt-20 lg:pb-28 lg:pt-24">
      <div className="max-w-[850px]">
        <div className="mb-7 inline-flex -rotate-1 items-center gap-2 rounded-full border-2 border-ink bg-lime-300 px-3.5 py-2 text-xs font-black uppercase tracking-[0.12em] text-ink shadow-[4px_4px_0_#111827]"><Sparkles size={14}/> Free · No account · No API key</div>
        <h1 className="text-[50px] font-black leading-[.88] tracking-[-.065em] sm:text-6xl md:text-8xl lg:text-[100px]">TURN MAPS<br/><span className="text-brand">INTO GPX.</span></h1>
        <p className="mt-7 max-w-[650px] text-lg font-medium leading-7 text-ink/65 sm:text-xl md:text-[22px] md:leading-8">Convert a Google Maps route into a clean, portable GPX file — ready for your GPS, cycling computer, or navigation app.</p>
        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
          <button type="button" onClick={go} className="btn-primary w-full rotate-[-1deg] shadow-[5px_5px_0_#111827] sm:w-auto">Convert a route <ArrowDownRight size={18}/></button>
          <div className="flex flex-wrap gap-2.5">{['DRIVING','CYCLING','WALKING'].map((mode,i)=><span key={mode} className={`mode-chip ${i===1?'mode-chip-active':''}`}><Check size={14}/> {mode}</span>)}</div>
        </div>
      </div>
      <div className="mt-14 grid max-w-[760px] grid-cols-3 border-y-2 border-ink/10 py-4 text-center sm:text-left sm:flex sm:gap-8">
        <div><p className="text-xl font-black">1 link</p><p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-ink/45">Input</p></div>
        <div><p className="text-xl font-black">3 modes</p><p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-ink/45">Supported</p></div>
        <div><p className="text-xl font-black">GPX 1.1</p><p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-ink/45">Export</p></div>
      </div>
    </div>
  </section>