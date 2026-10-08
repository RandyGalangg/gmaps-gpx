import { ArrowDownRight, Check, Compass, MapPin } from 'lucide-react';

export default function Hero() {
  const go = () => {
    const el = document.getElementById('route-url');
    el?.scrollIntoView({ block: 'center' });
    el?.focus({ preventScroll: true });
  };

  return (
    <section id="top" className="hero-section">
      <div className="map-pattern" aria-hidden />
      <div className="hero-route hero-route-one" aria-hidden><span /><i /><b /></div>
      <div className="hero-route hero-route-two" aria-hidden><span /><i /><b /></div>
      <div className="hero-card route-sticker" aria-hidden>
        <Compass size={18} />
        <span>ROUTE<br /><strong>READY</strong></span>
      </div>
      <div className="hero-card coordinate-sticker" aria-hidden>
        <MapPin size={16} />
        <span>-8.5891, 115.1077</span>
      </div>
      <div className="relative mx-auto max-w-[1180px] px-4 pb-20 pt-16 sm:px-6 md:pb-28 md:pt-20 lg:pt-24">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex -rotate-1 items-center gap-2 rounded-full border-2 border-ink bg-lime-300 px-3.5 py-2 text-xs font-black uppercase tracking-[0.12em] text-ink shadow-[4px_4px_0_#0f172a]">
            Free tool · No account · No API key
          </div>
          <h1 className="max-w-4xl text-[46px] font-black leading-[0.9] tracking-[-0.06em] md:text-7xl lg:text-[92px]">
            YOUR ROUTE.<br />
            <span className="text-brand">YOUR GPX.</span>
          </h1>
          <div className="mt-7 flex max-w-3xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-lg font-medium leading-7 text-ink/65 md:text-xl">
              Turn a Google Maps route into a portable GPX file. Preview the path, tweak your export, and take it anywhere.
            </p>
            <button type="button" onClick={go} className="btn-primary shrink-0 rotate-[-1deg] shadow-[5px_5px_0_#0f172a]">
              Convert a route <ArrowDownRight size={18} aria-hidden />
            </button>
          </div>
          <div className="mt-10 flex flex-wrap gap-3 text-sm font-bold">
            {['DRIVING', 'CYCLING', 'WALKING'].map((mode, i) => <span key={mode} className={`mode-chip ${i === 1 ? 'mode-chip-active' : ''}`}><Check size={14} /> {mode}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
