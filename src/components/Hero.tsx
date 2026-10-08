import { ArrowDownRight, Check, Compass, Sparkles } from 'lucide-react';

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

      <div className="hero-orbit" aria-hidden>
        <div className="absolute left-[18%] top-[35%] h-5 w-5 rounded-full border-4 border-ink bg-brand" />
        <div className="absolute right-[10%] top-[21%] h-4 w-4 rounded-full border-2 border-ink bg-surface" />
        <div className="absolute left-[48%] bottom-[14%] h-3 w-3 rounded-full bg-lime-400" />
        <div className="hero-orbit-label"><span /> ROUTE / READY</div>
      </div>

      <div className="relative mx-auto max-w-[1180px] px-4 pb-20 pt-14 sm:px-6 md:pb-24 md:pt-20 lg:pb-28 lg:pt-24">
        <div className="max-w-[900px]">
          <div className="mb-6 inline-flex -rotate-1 items-center gap-2 border-2 border-ink bg-lime-300 px-3.5 py-2 text-xs font-black uppercase tracking-[0.12em] text-ink shadow-[4px_4px_0_#111827]">
            <Sparkles size={14} /> Free · No account · No API key
          </div>

          <div className="mb-5 flex items-end gap-4">
            <span className="hidden text-xs font-black uppercase tracking-[0.2em] text-ink/35 sm:block">01 / CONVERTER</span>
            <span className="h-px w-16 bg-ink/20 sm:w-24" />
            <span className="text-xs font-black uppercase tracking-[0.18em] text-brand">GOOGLE MAPS → GPX</span>
          </div>

          <h1 className="max-w-[880px] text-[52px] font-black leading-[.84] tracking-[-.07em] sm:text-7xl md:text-8xl lg:text-[108px]">
            YOUR ROUTE.<br />
            <span className="text-brand">YOUR GPX.</span>
          </h1>

          <p className="mt-7 max-w-[650px] text-lg font-medium leading-7 text-ink/65 sm:text-xl md:text-[22px] md:leading-8">
            Turn a Google Maps directions link into a clean, portable GPX track for your GPS, cycling computer, or navigation app.
          </p>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
            <button type="button" onClick={go} className="btn-primary w-full rotate-[-1deg] shadow-[5px_5px_0_#111827] sm:w-auto">
              Build my GPX <ArrowDownRight size={18} />
            </button>
            <div className="flex flex-wrap gap-2.5">
              {['DRIVING', 'CYCLING', 'WALKING'].map((mode, i) => (
                <span key={mode} className={`mode-chip ${i === 1 ? 'mode-chip-active' : ''}`}>
                  <Check size={14} /> {mode}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex max-w-[820px] flex-wrap items-center gap-3 border-y-2 border-ink/10 py-4">
          <span className="border-2 border-ink bg-surface px-3 py-2 text-xs font-black">01 / LINK</span>
          <span className="text-ink/30">→</span>
          <span className="border-2 border-ink bg-surface px-3 py-2 text-xs font-black">02 / ROUTE</span>
          <span className="text-ink/30">→</span>
          <span className="border-2 border-ink bg-brand px-3 py-2 text-xs font-black text-white">03 / GPX 1.1</span>
        </div>
      </div>
    </section>
  );
}
